// src/app/api/admin/submissions/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireRole } from "@/lib/auth/server";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  status:            z.enum(["APPROVED", "REJECTED"]),
  acceptedReach:     z.number().int().min(0).optional(),
  adminNotes:        z.string().optional().nullable(),
  engagementRate:    z.number().min(0).max(100).optional(),
  submittedLikes:    z.number().int().min(0).optional(),
  submittedComments: z.number().int().min(0).optional(),
  submittedShares:   z.number().int().min(0).optional(),
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

    // ── Was this submission already APPROVED before this PATCH? ──────────
    // If yes, this is a reach-update re-approval — content counters must NOT
    // be incremented again, only the reach delta is credited.
    const wasAlreadyApproved = submission.status === "APPROVED";

    // ── Reach delta ───────────────────────────────────────────────────────
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
        // Fresh approval — credit the full submitted reach
        reachToCredit    = submission.submittedReach;
        newAcceptedReach = submission.submittedReach;
      }
      // If wasAlreadyApproved and no reach fields set, reachToCredit stays 0
    }

    // ── Engagement rate resolution ────────────────────────────────────────
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

    // ── Update submission ─────────────────────────────────────────────────
    const updated = await prisma.submission.update({
      where: { id },
      data: {
        status:                data.status,
        adminNotes:            data.adminNotes ?? null,
        acceptedReach:         newAcceptedReach,
        pendingReach:          null,
        previousAcceptedReach: null,
        ...(data.status === "APPROVED" && {
          engagementRate:    resolvedEngagementRate,
          submittedLikes:    data.submittedLikes    ?? null,
          submittedComments: data.submittedComments ?? null,
          submittedShares:   data.submittedShares   ?? null,
        }),
      },
    });

    // ── Update creator profile ────────────────────────────────────────────
    if (data.status === "APPROVED") {
      const profile = await prisma.creatorProfile.findUnique({
        where: { userId: submission.userId },
      });

      if (profile) {
        // ── Content counters: only increment on FRESH approvals ──────────
        // Re-approvals (reach updates on already-approved submissions) must
        // never touch content counters — that's what caused the stacking bug.
        const rankWindowIncrements: any = {};
        const totalIncrements: any      = {};

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

        // ── Weighted average engagement ───────────────────────────────────
        let newProfileEngagement = profile.engagementRate;

        if (newAcceptedReach > 0) {
          const approvedSubs = await prisma.submission.findMany({
            where: {
              userId: submission.userId,
              status: "APPROVED",
              id:     { not: id }, // exclude self (still old status in DB)
            },
            select: { acceptedReach: true, engagementRate: true },
          });

          const allSubs = [
            ...approvedSubs,
            { acceptedReach: newAcceptedReach, engagementRate: resolvedEngagementRate },
          ];

          const totalWeight = allSubs.reduce((sum, s) => sum + (s.acceptedReach ?? 0), 0);
          if (totalWeight > 0) {
            const weightedSum = allSubs.reduce(
              (sum, s) => sum + (s.engagementRate ?? 0) * (s.acceptedReach ?? 0),
              0
            );
            newProfileEngagement = weightedSum / totalWeight;
          }
        }

        // Only update profile if there's something to change
        const hasCounterChanges =
          Object.keys(rankWindowIncrements).length > 0 ||
          Object.keys(totalIncrements).length > 0;

        await prisma.creatorProfile.update({
          where: { userId: submission.userId },
          data: {
            ...(reachToCredit !== 0 && {
              currentRankReach:  { increment: reachToCredit },
              totalReachAllTime: { increment: reachToCredit },
            }),
            engagementRate: newProfileEngagement,
            ...(hasCounterChanges && {
              ...rankWindowIncrements,
              ...totalIncrements,
            }),
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
  };
  return map[ct] ?? "postCount";
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}