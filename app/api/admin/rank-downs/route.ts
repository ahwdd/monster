// src/app/api/admin/rank-downs/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireRole }  from "@/lib/auth/server";
import { prisma }       from "@/lib/prisma";
import { checkRankUpEligibility } from "@/lib/utils/rank";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization") ?? undefined;
  try {
    await requireRole(["ADMIN"], authHeader);

    const profiles = await prisma.creatorProfile.findMany({
      where:  { status: "APPROVED", rank: { not: "UNRANKED" } },
      include: {
        user: { select: { firstName: true, lastName: true, email: true, phone: true } },
      },
      orderBy: { rankedUpAt: "desc" },
    });

    const enriched = profiles.map((p) => {
      const elig = checkRankUpEligibility(
        p.rank,
        p.currentRankReach,
        p.approvedAt,
        {
          pictureCount: p.pictureCount, storyCount: p.storyCount, reelCount: p.reelCount, 
          longVideoCount: p.longVideoCount, postCount: p.postCount,
          liveCount: p.liveCount, streamCount: p.streamCount
        }
      );

      return { ...p, eligibility: elig };
    });

    const snapshotKeys = await (prisma as any).monthlySnapshot.findMany({
      where: {
        userId:  { in: profiles.map((p) => p.userId) },
        month:   { startsWith: "rankup-pre-" },
      },
      orderBy: { createdAt: "desc" },
      select: { userId: true, month: true, createdAt: true },
    });

    const latestSnapshot: Record<string, string> = {};
    for (const snap of snapshotKeys) {
      if (!latestSnapshot[snap.userId]) {
        latestSnapshot[snap.userId] = snap.month;
      }
    }

    const result = enriched.map((p) => ({
      ...p,
      latestSnapshotKey: latestSnapshot[p.userId] ?? null,
    }));

    return NextResponse.json({ success: true, data: result });
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