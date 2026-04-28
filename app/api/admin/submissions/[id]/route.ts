// src/app/api/admin/submissions/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireRole } from "@/lib/auth/server";
import { prisma } from "@/lib/prisma";

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
      // Subtract the reach that was credited and reverse the content counters.
      if (data.status === "REJECTED" && wasAlreadyApproved) {
        const reachToRemove = submission.acceptedReach; // what was credited

        const contentDecrements: any = {};
        const totalDecrements:   any = {};
        submission.contentTypes.forEach((ct) => {
          const field = contentTypeToField(ct);
          contentDecrements[field]                   = { decrement: 1 };
          totalDecrements[`total${capitalize(field)}`] = { decrement: 1 };
        });

        // Recalculate weighted average engagement excluding this submission
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

        // Also remove the PlatformStat record for this submission
        await (prisma as any).platformStat.deleteMany({
          where: { submissionId: id },
        });
      }

      // ── CASE 2: APPROVAL (fresh or re-approval) ───────────────────────
      if (data.status === "APPROVED") {
        // Content counters: only increment on FRESH approvals
        // (wasAlreadyApproved = false means it was PENDING or REJECTED before)
        const rankWindowIncrements: any = {};
        const totalIncrements:      any = {};

        if (!wasAlreadyApproved) {
          const contentCounts: Record<string, number> = {};
          submission.contentTypes.forEach((ct) => {
            const field = contentTypeToField(ct);
            contentCounts[field] = (contentCounts[field] ?? 0) + 1;
          });
          Object.entries(contentCounts).forEach(([field, count]) => {
            rankWindowIncrements[field]                   = { increment: count };
            totalIncrements[`total${capitalize(field)}`] = { increment: count };
          });
        }

        // Weighted average engagement across all approved submissions
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

        // Upsert PlatformStat
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

function contentTypeToField(ct: string): string {
  const map: Record<string, string> = {
    PICTURE:    "pictureCount",
    STORY:      "storyCount",
    REEL:       "reelCount",
    LONG_VIDEO: "longVideoCount",
    POST:       "postCount",
    LIVE:       "liveCount",
    STREAM:     "streamCount",
  };
  return map[ct] ?? "postCount";
}

function capitalize(s: string) { return s.charAt(0).toUpperCase() + s.slice(1); }