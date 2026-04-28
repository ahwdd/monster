// src/app/api/admin/rank-downs/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z }           from "zod";
import { requireRole } from "@/lib/auth/server";
import { prisma }      from "@/lib/prisma";

const RANK_ORDER = ["UNRANKED", "ROOKIE", "RISING", "COLD"] as const;

function getPreviousRank(rank: string): string | null {
  const idx = RANK_ORDER.indexOf(rank as any);
  if (idx <= 0) return null;
  return RANK_ORDER[idx - 1];
}

const schema = z.object({
  snapshotKey: z.string().optional().nullable(),
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authHeader = request.headers.get("authorization") ?? undefined;
  try {
    await requireRole(["ADMIN"], authHeader);
    const { id } = await params;

    const profile = await prisma.creatorProfile.findUnique({ where: { id } });
    if (!profile) {
      return NextResponse.json({ success: false, error: "Creator not found" }, { status: 404 });
    }

    const prevRank = getPreviousRank(profile.rank);
    if (!prevRank) {
      return NextResponse.json(
        { success: false, error: "Already at lowest rank (UNRANKED)" },
        { status: 400 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const data = schema.parse(body);

    let snapshotData: any = null;

    if (data.snapshotKey) {
      snapshotData = await (prisma as any).monthlySnapshot.findUnique({
        where: { userId_month: { userId: profile.userId, month: data.snapshotKey } },
      });
    } else {
      // Auto-find the most recent pre-rank-up snapshot for the PREVIOUS rank
      const snap = await (prisma as any).monthlySnapshot.findFirst({
        where: {
          userId: profile.userId,
          month:  { startsWith: `rankup-pre-${prevRank}-` },
        },
        orderBy: { createdAt: "desc" },
      });
      snapshotData = snap;
    }

    const reachAccumulatedSinceRankUp = profile.currentRankReach;

    let updateData: any = {
      rank:       prevRank,
      rankedUpAt: null,
    };

    if (snapshotData) {
      updateData = {
        ...updateData,
        currentRankReach: snapshotData.reach,
        engagementRate:   snapshotData.engagementRate,
        commitmentScore:  snapshotData.commitmentScore,
        adminGradeScore:  snapshotData.adminGradeScore,
        
        totalReachAllTime: Math.max(0,
          profile.totalReachAllTime - reachAccumulatedSinceRankUp + snapshotData.reach),
      };

      // (it didn't store them), so we leave them at 0 — admin can use Repair Tool  to recalculate from approved submissions.
      // Note in response so admin knows to run repair.
    } else {
      updateData = {
        ...updateData,
        currentRankReach: 0,
        engagementRate:   0,
        commitmentScore:  0,
        adminGradeScore:  0,
        pictureCount:     0,
        storyCount:       0,
        reelCount:        0,
        longVideoCount:   0,
        postCount:        0,
        totalReachAllTime: Math.max(0, profile.totalReachAllTime - reachAccumulatedSinceRankUp),
      };
    }

    const updated = await prisma.creatorProfile.update({
      where: { id },
      data:  updateData,
    });

    if (snapshotData) { // prevent double applying it
      await (prisma as any).monthlySnapshot.delete({
        where: { userId_month: { userId: profile.userId, month: snapshotData.month } },
      });
    }

    return NextResponse.json({
      success: true,
      data: updated,
      message:          `Demoted from ${profile.rank} to ${prevRank}`,
      restoredFromSnap: !!snapshotData,
      needsRepair:      !!snapshotData,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
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
    console.error("Rank-down error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}