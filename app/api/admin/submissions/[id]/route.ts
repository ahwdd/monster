// src/app/api/admin/submissions/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/server";
import { prisma } from "@/lib/prisma";
import { calculateSubmissionPoints, getLevelFromPoints, getLevelProgress } from "@/lib/utils/points";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authHeader = request.headers.get("authorization") ?? undefined;
  try {
    await requireRole(["ADMIN"], authHeader);
    const { id }  = await params;
    const body    = await request.json();

    const submission = await prisma.submission.findUnique({ where: { id } });
    if (!submission) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });

    const updated = await prisma.submission.update({
      where: { id },
      data:  {
        isApproved:  body.isApproved  ?? submission.isApproved,
        adminNotes:  body.adminNotes  ?? submission.adminNotes,
        rank:        body.rank        ?? submission.rank,
        pointsAwarded: body.rank
          ? calculateSubmissionPoints({
              totalViews:         submission.totalViews,
              totalReach:         submission.totalReach,
              monsterAppearances: submission.monsterAppearances,
              rank:               body.rank,
            })
          : submission.pointsAwarded,
      },
    });

    // Recalculate and update the creator's profile totals
    const allApproved = await prisma.submission.findMany({
      where: { userId: submission.userId, isApproved: true },
    });

    const totalPoints = allApproved.reduce((sum, s) => sum + s.pointsAwarded, 0);
    const totalViews  = allApproved.reduce((sum, s) => sum + s.totalViews,    0);
    const totalReach  = allApproved.reduce((sum, s) => sum + s.totalReach,    0);
    const streamCount = allApproved.filter((s) => s.contentTypes.includes("STREAM")).length;
    const shortCount  = allApproved.filter((s) => s.contentTypes.includes("SHORT")).length;
    const reelCount   = allApproved.filter((s) => s.contentTypes.includes("REEL")).length;

    await prisma.creatorProfile.updateMany({
      where: { userId: submission.userId },
      data: {
        totalPoints,
        totalViews,
        totalReach,
        streamCount,
        shortCount,
        reelCount,
        currentLevel:  getLevelFromPoints(totalPoints),
        levelProgress: getLevelProgress(totalPoints),
      },
    });

    return NextResponse.json({ success: true, data: updated });
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