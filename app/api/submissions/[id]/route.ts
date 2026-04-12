// src/app/api/admin/submissions/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireRole } from "@/lib/auth/server";
import { prisma } from "@/lib/prisma";
import {
  calculateSubmissionPoints,
  getLevelFromPoints,
  getLevelProgress,
} from "@/lib/utils/points";
import { Rank } from "@/generated/prisma";

const patchSchema = z.object({
  isApproved:   z.boolean().optional(),
  adminNotes:   z.string().optional(),
  rank: z.enum([
    "UNRANKED","ROOKIE_MONSTER","RISING_MONSTER","ELITE_MONSTER","MEGA_MONSTER","COLD_MONSTER",
  ]).optional(),
  pointsOverride: z.number().int().min(0).optional(),
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
      return NextResponse.json({ success: false, error: "Submission not found" }, { status: 404 });
    }

    const body          = await request.json();
    const validatedData = patchSchema.parse(body);

    // Recalculate points if rank changed or pointsOverride given
    const effectiveRank   = validatedData.rank ?? submission.rank;
    const pointsAwarded   = validatedData.pointsOverride != null
      ? validatedData.pointsOverride
      : calculateSubmissionPoints({
          totalViews:         submission.totalViews,
          totalReach:         submission.totalReach,
          monsterAppearances: submission.monsterAppearances,
          rank:               effectiveRank,
        });

    const updated = await prisma.submission.update({
      where: { id },
      data: {
        isApproved:    validatedData.isApproved  ?? submission.isApproved,
        adminNotes:    validatedData.adminNotes  ?? submission.adminNotes,
        rank:          effectiveRank,
        pointsAwarded,
      },
    });

    // Recompute creator profile totals from ALL approved submissions
    const approved = await prisma.submission.findMany({
      where: { userId: submission.userId, isApproved: true },
    });

    const totalPoints = approved.reduce((s, x) => s + x.pointsAwarded, 0);
    const totalViews  = approved.reduce((s, x) => s + x.totalViews,    0);
    const totalReach  = approved.reduce((s, x) => s + x.totalReach,    0);
    const streamCount = approved.filter((x) => x.contentTypes.includes("STREAM")).length;
    const shortCount  = approved.filter((x) => x.contentTypes.includes("SHORT")).length;
    const reelCount   = approved.filter((x) => x.contentTypes.includes("REEL")).length;

    // Determine rank from highest approved submission rank
    const RANK_ORDER = [
      "UNRANKED","ROOKIE_MONSTER","RISING_MONSTER","ELITE_MONSTER","MEGA_MONSTER","COLD_MONSTER",
    ];
    const highestRank = approved.reduce<Rank>((best, x) => {
      return RANK_ORDER.indexOf(x.rank) > RANK_ORDER.indexOf(best) ? x.rank : best;
    }, "UNRANKED");

    await prisma.creatorProfile.updateMany({
      where: { userId: submission.userId },
      data: {
        totalPoints,
        totalViews,
        totalReach,
        streamCount,
        shortCount,
        reelCount,
        rank:          highestRank,
        currentLevel:  getLevelFromPoints(totalPoints),
        levelProgress: getLevelProgress(totalPoints),
      },
    });

    return NextResponse.json({ success: true, data: updated });
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authHeader = request.headers.get("authorization") ?? undefined;
  try {
    await requireRole(["ADMIN"], authHeader);
    const { id } = await params;
    await prisma.submission.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === "Insufficient permissions") {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}