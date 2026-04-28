// src/app/api/admin/submissions/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireRole } from "@/lib/auth/server";
import { prisma } from "@/lib/prisma";
import { CONTENT_TYPE_TO_FIELD } from "@/lib/data/program";

const REJECTION_REASONS = [
  "LOW_QUALITY",
  "WRONG_CONTENT_TYPE",
  "INSUFFICIENT_REACH",
  "GUIDELINE_VIOLATION",
  "DUPLICATE",
  "OTHER",
] as const;

const schema = z.object({
  status:            z.enum(["APPROVED", "REJECTED"]),
  acceptedReach:     z.number().int().min(0).optional(),
  adminNotes:        z.string().optional().nullable(),
  rejectionReason:   z.enum(REJECTION_REASONS).optional().nullable(),
  engagementRate:    z.number().min(0).max(100).optional(),
  submittedLikes:    z.number().int().min(0).optional(),
  submittedComments: z.number().int().min(0).optional(),
  submittedShares:   z.number().int().min(0).optional(),
  qualityRating:     z.number().min(0.5).max(5).optional().nullable(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authHeader = request.headers.get("authorization") ?? undefined;
  try {
    await requireRole(["ADMIN"], authHeader);
    const { id } = await params;

    const submission = await prisma.submission.findUnique({ where: { id } });
    if (!submission) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }

    const body = await request.json();
    const data = schema.parse(body);

    const wasAlreadyApproved = submission.status === "APPROVED";

    let reachToCredit    = 0;
    let newAcceptedReach = submission.acceptedReach;

    if (data.status === "APPROVED") {
      if (data.acceptedReach !== undefined) {
        reachToCredit    = data.acceptedReach - submission.acceptedReach;
        newAcceptedReach = data.acceptedReach;
      } else if (submission.pendingReach !== null && submission.pendingReach !== undefined) {
        const prev    = submission.previousAcceptedReach ?? submission.acceptedReach;
        reachToCredit = submission.pendingReach - prev;
        newAcceptedReach = submission.pendingReach;
      } else if (!wasAlreadyApproved) {
        reachToCredit    = submission.submittedReach;
        newAcceptedReach = submission.submittedReach;
      }
    }

    let resolvedEngagementRate = 0;
    if (data.status === "APPROVED") {
      const hasRaw =
        data.submittedLikes    !== undefined ||
        data.submittedComments !== undefined ||
        data.submittedShares   !== undefined;
      if (hasRaw && newAcceptedReach > 0) {
        const interactions =
          (data.submittedLikes    ?? 0) +
          (data.submittedComments ?? 0) +
          (data.submittedShares   ?? 0);
        resolvedEngagementRate = Math.min(100, (interactions / newAcceptedReach) * 100);
      } else if (data.engagementRate !== undefined) {
        resolvedEngagementRate = data.engagementRate;
      }
    }

    const updated = await prisma.submission.update({
      where: { id },
      data: {
        status:                data.status,
        adminNotes:            data.adminNotes ?? null,
        acceptedReach:         data.status === "APPROVED" ? newAcceptedReach : submission.acceptedReach,
        pendingReach:          null,
        previousAcceptedReach: null,
        rejectionReason:       data.status === "REJECTED" ? (data.rejectionReason ?? null) : null,
        ...(data.status === "APPROVED" && {
          engagementRate:    resolvedEngagementRate,
          qualityRating:     data.qualityRating ?? null,
          submittedLikes:    data.submittedLikes    ?? null,
          submittedComments: data.submittedComments ?? null,
          submittedShares:   data.submittedShares   ?? null,
        }),
      },
    });

    const profile = await prisma.creatorProfile.findUnique({
      where: { userId: submission.userId },
    });

    if (profile) {
      // ── CASE 1: REJECTION of a previously APPROVED submission ─────────
      if (data.status === "REJECTED" && wasAlreadyApproved) {
        const reachToRemove = submission.acceptedReach;

        const contentDecrements: Record<string, unknown> = {};
        const totalDecrements:   Record<string, unknown> = {};

        submission.contentTypes.forEach((ct) => {
          const field      = CONTENT_TYPE_TO_FIELD[ct] ?? "postCount";
          const totalField = `total${capitalize(field)}`;

          const currentVal      = (profile as Record<string, unknown>)[field];
          const currentTotalVal = (profile as Record<string, unknown>)[totalField];

          if (typeof currentVal === "number" && currentVal > 0) {
            contentDecrements[field] = { decrement: 1 };
          } else {
            contentDecrements[field] = 0;
          }

          if (typeof currentTotalVal === "number" && currentTotalVal > 0) {
            totalDecrements[totalField] = { decrement: 1 };
          } else {
            totalDecrements[totalField] = 0;
          }
        });

        const remainingApproved = await prisma.submission.findMany({
          where: {
            userId: submission.userId,
            status: "APPROVED",
            id:     { not: id },
          },
          select: { acceptedReach: true, engagementRate: true },
        });

        let newProfileEngagement = 0;
        const totalWeight = remainingApproved.reduce((s, x) => s + (x.acceptedReach ?? 0), 0);
        if (totalWeight > 0) {
          newProfileEngagement = remainingApproved.reduce(
            (s, x) => s + (x.engagementRate ?? 0) * (x.acceptedReach ?? 0), 0
          ) / totalWeight;
        }

        await prisma.creatorProfile.update({
          where: { userId: submission.userId },
          data: {
            currentRankReach:  { decrement: reachToRemove },
            totalReachAllTime: { decrement: reachToRemove },
            engagementRate:    newProfileEngagement,
            ...contentDecrements,
            ...totalDecrements,
          },
        });

        await (prisma as any).platformStat.deleteMany({
          where: { submissionId: id },
        });
      }

      // ── CASE 2: APPROVAL (fresh or re-approval) ───────────────────────
      if (data.status === "APPROVED") {
        const rankWindowIncrements: Record<string, unknown> = {};
        const totalIncrements:      Record<string, unknown> = {};

        if (!wasAlreadyApproved) {
          const contentCounts: Record<string, number> = {};
          submission.contentTypes.forEach((ct) => {
            const field = CONTENT_TYPE_TO_FIELD[ct] ?? "postCount";
            contentCounts[field] = (contentCounts[field] ?? 0) + 1;
          });

          Object.entries(contentCounts).forEach(([field, count]) => {
            const totalField = `total${capitalize(field)}`;

            const currentVal      = (profile as Record<string, unknown>)[field];
            const currentTotalVal = (profile as Record<string, unknown>)[totalField];

            if (currentVal === null || currentVal === undefined) {
              rankWindowIncrements[field] = count;
            } else {
              rankWindowIncrements[field] = { increment: count };
            }

            if (currentTotalVal === null || currentTotalVal === undefined) {
              totalIncrements[totalField] = count;
            } else {
              totalIncrements[totalField] = { increment: count };
            }
          });
        }

        // Weighted average engagement
        let newProfileEngagement = profile.engagementRate;
        if (newAcceptedReach > 0) {
          const approvedSubs = await prisma.submission.findMany({
            where: { userId: submission.userId, status: "APPROVED", id: { not: id } },
            select: { acceptedReach: true, engagementRate: true },
          });
          const allSubs = [
            ...approvedSubs,
            { acceptedReach: newAcceptedReach, engagementRate: resolvedEngagementRate },
          ];
          const totalWeight = allSubs.reduce((s, x) => s + (x.acceptedReach ?? 0), 0);
          if (totalWeight > 0) {
            newProfileEngagement = allSubs.reduce(
              (s, x) => s + (x.engagementRate ?? 0) * (x.acceptedReach ?? 0), 0
            ) / totalWeight;
          }
        }

        const hasCounterChanges = Object.keys(rankWindowIncrements).length > 0;

        await prisma.creatorProfile.update({
          where: { userId: submission.userId },
          data: {
            ...(reachToCredit !== 0 && {
              currentRankReach:  { increment: reachToCredit },
              totalReachAllTime: { increment: reachToCredit },
            }),
            engagementRate: newProfileEngagement,
            ...(hasCounterChanges && { ...rankWindowIncrements, ...totalIncrements }),
          },
        });

        await (prisma as any).platformStat.upsert({
          where:  { submissionId: id },
          create: {
            userId:        submission.userId,
            submissionId:  id,
            platform:      submission.platform,
            contentTypes:  submission.contentTypes,
            acceptedReach: newAcceptedReach,
            engagementRate: resolvedEngagementRate,
            qualityRating:  data.qualityRating ?? null,
            rank:           profile.rank,
          },
          update: {
            acceptedReach:  newAcceptedReach,
            engagementRate: resolvedEngagementRate,
            qualityRating:  data.qualityRating ?? null,
          },
        });
      }
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error);
      return NextResponse.json(
        { success: false, error: "Validation failed", details: error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    if (error instanceof Error && error.message === "Authentication required") {
      return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 });
    }
    if (error instanceof Error && error.message === "Insufficient permissions") {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }
    console.error("Admin submission PATCH error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

function capitalize(s: string) { return s.charAt(0).toUpperCase() + s.slice(1); }