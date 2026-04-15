// src/app/api/admin/rank-ups/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireRole } from "@/lib/auth/server";
import { prisma } from "@/lib/prisma";
import { getNextRank } from "@/lib/utils/rank";

const schema = z.object({
  forceRankUp:  z.boolean().default(false),
  adminNotes:   z.string().optional().nullable(),
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

    const nextRank = getNextRank(profile.rank);
    if (!nextRank) {
      return NextResponse.json({ success: false, error: "Already at max rank (COLD)" }, { status: 400 });
    }

    const body = await request.json();
    const data = schema.parse(body);

    const isPromotingToCold = nextRank === "COLD";

    const updated = await prisma.creatorProfile.update({
      where: { id },
      data: {
        rank:             nextRank,
        rankedUpAt:       new Date(),
        // Reset current-rank reach window (except when becoming COLD)
        currentRankReach: isPromotingToCold ? profile.currentRankReach : 0,
        // Reset current-rank content counts (except when becoming COLD)
        ...(isPromotingToCold ? {} : {
          pictureCount:   0,
          storyCount:     0,
          reelCount:      0,
          longVideoCount: 0,
          postCount:      0,
        }),
      },
    });

    return NextResponse.json({
      success: true,
      data: updated,
      message: `Promoted from ${profile.rank} to ${nextRank}`,
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
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}