// src/app/api/admin/repair/route.ts

import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/server";
import { prisma }      from "@/lib/prisma";
import { CONTENT_TYPE_TO_FIELD } from "@/lib/data/program";

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization") ?? undefined;
  try {
    await requireRole(["ADMIN"], authHeader);

    const body = await request.json().catch(() => ({}));
    const targetUserId: string | undefined = body?.userId;

    // ── Fetch profiles to repair ──────────────────────────────────────────
    const profiles = await prisma.creatorProfile.findMany({
      where: targetUserId ? { userId: targetUserId } : undefined,
      select: {
        id:     true,
        userId: true,
        rank:   true,
        // Current (possibly wrong) values — logged for diff
        currentRankReach: true,
        totalReachAllTime: true,
        pictureCount: true, storyCount: true, reelCount: true, longVideoCount: true,
        postCount: true, streamCount: true, liveCount:  true,
        totalPictureCount: true, totalStoryCount: true, totalReelCount: true,
        totalLongVideoCount: true, totalPostCount: true, totalLiveCount: true, totalStreamCount: true,
        engagementRate: true,
      },
    });

    if (profiles.length === 0) {
      return NextResponse.json({ success: false, error: "No profiles found" }, { status: 404 });
    }

    const results: any[] = [];

    for (const profile of profiles) {
      // ── Fetch all approved submissions for this user ────────────────────
      const approvedSubs = await prisma.submission.findMany({
        where:  { userId: profile.userId, status: "APPROVED" },
        select: {
          contentTypes:   true,
          acceptedReach:  true,
          engagementRate: true,
          rank:           true,
        },
      });

      // ── Recalculate content counters ────────────────────────────────────
      // Rank-window counters: only submissions made at the creator's CURRENT rank
      // Total counters: all approved submissions ever
      const rankWindowCounts: Record<string, number> = {
        pictureCount: 0, storyCount: 0, reelCount: 0, longVideoCount: 0,
        postCount: 0, streamCount: 0, liveCount: 0
      };
      const totalCounts: Record<string, number> = {
        totalPictureCount: 0, totalStoryCount: 0, totalReelCount: 0, totalLongVideoCount: 0,
        totalPostCount: 0, totalStreamCount: 0, totalLiveCount: 0
      };

      let recalcCurrentReach  = 0;
      let recalcTotalReach    = 0;

      for (const sub of approvedSubs) {
        // All approved submissions count toward total reach
        recalcTotalReach += sub.acceptedReach ?? 0;

        // Rank-window: only submissions at the creator's current rank
        const isCurrentRank = sub.rank === profile.rank;
        if (isCurrentRank) {
          recalcCurrentReach += sub.acceptedReach ?? 0;
        }

        // Content counters
        for (const ct of sub.contentTypes) {
          const field = CONTENT_TYPE_TO_FIELD[ct] ?? "postCount"
          totalCounts[`total${capitalize(field)}`] =
            (totalCounts[`total${capitalize(field)}`] ?? 0) + 1;

          if (isCurrentRank) {
            rankWindowCounts[field] = (rankWindowCounts[field] ?? 0) + 1;
          }
        }
      }

      // ── Recalculate weighted average engagement ─────────────────────────
      const subsWithEng = approvedSubs.filter(
        (s) => s.engagementRate != null && (s.acceptedReach ?? 0) > 0
      );
      let recalcEngagement = 0;
      if (subsWithEng.length > 0) {
        const totalWeight = subsWithEng.reduce((sum, s) => sum + (s.acceptedReach ?? 0), 0);
        if (totalWeight > 0) {
          const weightedSum = subsWithEng.reduce(
            (sum, s) => sum + (s.engagementRate ?? 0) * (s.acceptedReach ?? 0),
            0
          );
          recalcEngagement = weightedSum / totalWeight;
        }
      }

      // ── Build diff for logging ──────────────────────────────────────────
      const before = {
        currentRankReach:    profile.currentRankReach,
        totalReachAllTime:   profile.totalReachAllTime,
        pictureCount: profile.pictureCount, storyCount: profile.storyCount, reelCount: profile.reelCount,
        longVideoCount: profile.longVideoCount, postCount: profile.postCount,
        streamCount: profile.streamCount, liveCount: profile.liveCount,
        totalPictureCount: profile.totalPictureCount, totalStoryCount: profile.totalStoryCount,
        totalReelCount: profile.totalReelCount, totalLongVideoCount: profile.totalLongVideoCount,
        totalPostCount: profile.totalPostCount, totalStreamCount: profile.totalStreamCount,
        totalLiveCount: profile.totalLiveCount,
        engagementRate:      profile.engagementRate,
      };

      const after = {
        currentRankReach:    recalcCurrentReach,
        totalReachAllTime:   recalcTotalReach,
        ...rankWindowCounts,
        ...totalCounts,
        engagementRate:      recalcEngagement,
      };

      // ── Apply correction ────────────────────────────────────────────────
      await prisma.creatorProfile.update({
        where: { id: profile.id },
        data:  after,
      });

      results.push({
        userId:  profile.userId,
        profileId: profile.id,
        rank:    profile.rank,
        approvedSubmissions: approvedSubs.length,
        before,
        after,
      });
    }

    return NextResponse.json({
      success:  true,
      repaired: profiles.length,
      results,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Authentication required") {
      return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 });
    }
    if (error instanceof Error && error.message === "Insufficient permissions") {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }
    console.error("Repair route error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}