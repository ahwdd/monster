// src/app/api/admin/rank-ups/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/server";
import { prisma } from "@/lib/prisma";
import {
  checkRankUpEligibility,
  getNextRank,
  RANK_THRESHOLDS,
} from "@/lib/utils/rank";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization") ?? undefined;
  try {
    await requireRole(["ADMIN"], authHeader);

    const params = new URL(request.url).searchParams;
    const filter = params.get("filter") ?? "all"; // "all" | "eligible" | "near"

    const profiles = await prisma.creatorProfile.findMany({
      where:  { status: "APPROVED", rank: { not: "COLD" } },
      include: {
        user: { select: { firstName: true, lastName: true, email: true, phone: true } },
      },
      orderBy: { currentRankReach: "desc" },
    });

    const enriched = profiles.map((p) => {
      const elig = checkRankUpEligibility(
        p.rank,
        p.currentRankReach,
        p.approvedAt,
        {
          pictureCount:   p.pictureCount,
          storyCount:     p.storyCount,
          reelCount:      p.reelCount,
          longVideoCount: p.longVideoCount,
          postCount:      p.postCount,
        }
      );
      return { ...p, eligibility: elig, nextRank: getNextRank(p.rank) };
    });

    const filtered = enriched.filter((p) => {
      if (filter === "eligible") return p.eligibility.reachOk;
      if (filter === "near")     return !p.eligibility.reachOk && p.currentRankReach >= (RANK_THRESHOLDS[p.rank] ?? 0) * 0.7;
      return true;
    });

    return NextResponse.json({ success: true, data: filtered });
  } catch (error) {
    if (error instanceof Error && error.message === "Authentication required") {
      return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 });
    }
    if (error instanceof Error && error.message === "Insufficient permissions") {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}