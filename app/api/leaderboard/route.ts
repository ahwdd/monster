// src/app/api/leaderboard/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const profiles = await prisma.creatorProfile.findMany({
      where:   { status: "APPROVED", isActive: true },
      orderBy: { totalReachAllTime: "desc" },
      take:    5,
      select: {
        id:                true,
        nickname:          true,
        rank:              true,
        totalReachAllTime: true,
        currentRankReach:  true,
        channelLogo:       true,
        user: {
          select: { firstName: true, lastName: true },
        },
      },
    });

    return NextResponse.json({ success: true, data: profiles });
  } catch (error) {
    console.error("Leaderboard error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}