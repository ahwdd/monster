// src/app/api/submissions/mine/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/server";
import { prisma }      from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization") ?? undefined;
  try {
    const currentUser = await requireAuth(authHeader);

    const submissions = await prisma.submission.findMany({
      where:   { userId: currentUser.id },
      orderBy: { createdAt: "desc" },
      select: {
        id:                    true,
        platform:              true,
        contentLink:           true,
        contentTypes:          true,
        monsterAppearances:    true,
        submittedReach:        true,
        acceptedReach:         true,
        pendingReach:          true,
        previousAcceptedReach: true,
        statsScreenshotUrl:    true,
        rank:                  true,
        status:                true,
        adminNotes:            true,
        isEdited:              true,
        createdAt:             true,
        updatedAt:             true,
      },
    });

    const pendingCount = submissions.filter((s) => s.status === "PENDING").length;

    return NextResponse.json({
      success: true,
      data: submissions,
      pendingCount,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Authentication required") {
      return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 });
    }
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}