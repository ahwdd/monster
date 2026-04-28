// src/app/api/admin/snapshots/[userId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/server";
import { prisma }      from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const authHeader = request.headers.get("authorization") ?? undefined;
  try {
    await requireRole(["ADMIN"], authHeader);
    const { userId } = await params;

    const profile = await prisma.creatorProfile.findUnique({ where: { userId } });
    if (!profile) {
      return NextResponse.json({ success: false, error: "Creator not found" }, { status: 404 });
    }

    const month = new Date().toISOString().slice(0, 7); // "YYYY-MM"

    const startOfMonth = new Date(`${month}-01T00:00:00.000Z`);
    const endOfMonth   = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);

    const approvedSubs = await prisma.submission.count({
      where: {
        userId,
        status:    "APPROVED",
        updatedAt: { gte: startOfMonth, lt: endOfMonth },
      },
    });

    const snapshot = await prisma.monthlySnapshot.upsert({
      where:  { userId_month: { userId, month } },
      create: {
        userId,
        month,
        rank:           profile.rank,
        reach:          profile.currentRankReach,
        totalReach:     profile.totalReachAllTime,
        engagementRate: profile.engagementRate,
        commitmentScore: profile.commitmentScore,
        adminGradeScore: profile.adminGradeScore,
        approvedSubs,
      },
      update: {
        rank:           profile.rank,
        reach:          profile.currentRankReach,
        totalReach:     profile.totalReachAllTime,
        engagementRate: profile.engagementRate,
        commitmentScore: profile.commitmentScore,
        adminGradeScore: profile.adminGradeScore,
        approvedSubs,
      },
    });

    return NextResponse.json({ success: true, data: snapshot });
  } catch (error) {
    if (error instanceof Error && error.message === "Authentication required") {
      return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 });
    }
    if (error instanceof Error && error.message === "Insufficient permissions") {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }
    console.error("Snapshot error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}