// src/app/api/admin/dashboard/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/server";
import { prisma }      from "@/lib/prisma";
import { checkRankUpEligibility, getNextRank } from "@/lib/utils/rank";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization") ?? undefined;
  try {
    await requireRole(["ADMIN"], authHeader);

    const [
      totalCreators,
      pendingRegistrations,
      pendingSubmissions,
      approvedCreators,
      platformStats,
      allProfiles,
    ] = await Promise.all([
      prisma.creatorProfile.count(),
      prisma.creatorProfile.count({ where: { status: "PENDING" } }),
      prisma.submission.count({ where: { status: "PENDING" } }),
      prisma.creatorProfile.findMany({
        where: { status: "APPROVED" },
        select: { rank: true },
      }),
      // Aggregate platform stats from PlatformStat table
      (prisma as any).platformStat.findMany({
        select: {
          platform:      true,
          contentTypes:  true,
          acceptedReach: true,
          engagementRate: true,
          qualityRating:  true,
        },
      }),
      // For rank-up eligibility count
      prisma.creatorProfile.findMany({
        where: { status: "APPROVED", rank: { not: "COLD" } },
        select: {
          rank: true, currentRankReach: true, approvedAt: true,
          pictureCount: true, storyCount: true, reelCount: true,
          longVideoCount: true, postCount: true,
        },
      }),
    ]);

    // Rank distribution
    const rankDist: Record<string, number> = {};
    approvedCreators.forEach((c) => {
      rankDist[c.rank] = (rankDist[c.rank] ?? 0) + 1;
    });

    // Platform aggregation
    const platformAgg: Record<string, { reach: number; count: number; engTotal: number; qualTotal: number; qualCount: number }> = {};
    const contentTypeAgg: Record<string, { reach: number; count: number }> = {};

    for (const stat of platformStats) {
      const p = stat.platform;
      if (!platformAgg[p]) platformAgg[p] = { reach: 0, count: 0, engTotal: 0, qualTotal: 0, qualCount: 0 };
      platformAgg[p].reach    += stat.acceptedReach ?? 0;
      platformAgg[p].engTotal += (stat.engagementRate ?? 0) * (stat.acceptedReach ?? 0);
      platformAgg[p].count    += 1;
      if (stat.qualityRating != null) {
        platformAgg[p].qualTotal += stat.qualityRating;
        platformAgg[p].qualCount += 1;
      }

      for (const ct of (stat.contentTypes ?? [])) {
        if (!contentTypeAgg[ct]) contentTypeAgg[ct] = { reach: 0, count: 0 };
        contentTypeAgg[ct].reach += stat.acceptedReach ?? 0;
        contentTypeAgg[ct].count += 1;
      }
    }

    const platforms = Object.entries(platformAgg).map(([platform, v]) => ({
      platform,
      totalReach:      v.reach,
      submissionCount: v.count,
      avgEngagement:   v.reach > 0 ? v.engTotal / v.reach : 0,
      avgQuality:      v.qualCount > 0 ? v.qualTotal / v.qualCount : null,
    })).sort((a, b) => b.totalReach - a.totalReach);

    const contentTypes = Object.entries(contentTypeAgg).map(([type, v]) => ({
      type,
      totalReach:      v.reach,
      submissionCount: v.count,
      avgReach:        v.count > 0 ? Math.round(v.reach / v.count) : 0,
    })).sort((a, b) => b.totalReach - a.totalReach);

    // Eligible for rank-up count
    const eligibleCount = allProfiles.filter((p) => {
      const e = checkRankUpEligibility(p.rank, p.currentRankReach, p.approvedAt, {
        pictureCount: p.pictureCount, storyCount: p.storyCount, reelCount: p.reelCount,
        longVideoCount: p.longVideoCount, postCount: p.postCount,
      });
      return e.reachOk; // at minimum reach-eligible
    }).length;

    return NextResponse.json({
      success: true,
      data: {
        totalCreators,
        pendingRegistrations,
        pendingSubmissions,
        eligibleForRankUp: eligibleCount,
        rankDistribution:  rankDist,
        platforms,
        contentTypes,
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Authentication required") {
      return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 });
    }
    if (error instanceof Error && error.message === "Insufficient permissions") {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }
    console.error("Admin dashboard error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}