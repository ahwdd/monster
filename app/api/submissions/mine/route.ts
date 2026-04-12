// src/app/api/submissions/mine/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization") ?? undefined;
  try {
    const currentUser = await requireAuth(authHeader);

    const submissions = await prisma.submission.findMany({
      where:   { userId: currentUser.id },
      orderBy: { createdAt: "desc" },
      select: {
        id:                 true,
        platform:           true,
        contentLink:        true,
        contentTypes:       true,
        monsterAppearances: true,
        totalReach:         true,
        totalViews:         true,
        pointsAwarded:      true,
        rank:               true,
        isApproved:         true,
        createdAt:          true,
      },
    });

    return NextResponse.json({ success: true, data: submissions });
  } catch (error) {
    if (error instanceof Error && error.message === "Authentication required") {
      return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 });
    }
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}