// src/app/api/submissions/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAuth } from "@/lib/auth/server";
import { prisma } from "@/lib/prisma";
import {
  calculateSubmissionPoints,
  getLevelFromPoints,
  getLevelProgress,
} from "@/lib/utils/points";

const PENDING_CAP = 5;

const schema = z.object({
  platform:           z.enum(["FACEBOOK","INSTAGRAM","KICK","TIKTOK","TWITCH","YOUTUBE"]),
  contentLink:        z.string().url("Content link must be a valid URL"),
  contentTypes:       z.array(z.enum(["STREAM","SHORT","REEL"])).min(1),
  monsterAppearances: z.array(z.enum(["MONSTER_THEME","LAYOUT","LOGO","MONSTER_PRODUCTS"])).min(1),
  totalReach:         z.number().int().min(0),
  totalViews:         z.number().int().min(0),
  statsScreenshotUrl: z.string().url().optional().nullable(),
});

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization") ?? undefined;
  try {
    const currentUser = await requireAuth(authHeader);

    // Must have completed Form 1
    const profile = await prisma.creatorProfile.findUnique({
      where: { userId: currentUser.id },
    });
    if (!profile) {
      return NextResponse.json(
        { success: false, error: "Complete your creator registration first." },
        { status: 403 }
      );
    }

    // ── 5-pending cap ────────────────────────────────────────
    const pendingCount = await prisma.submission.count({
      where: { userId: currentUser.id, isApproved: false },
    });
    if (pendingCount >= PENDING_CAP) {
      return NextResponse.json(
        {
          success:      false,
          error:        "PENDING_LIMIT_REACHED",
          pendingCount,
          cap:          PENDING_CAP,
        },
        { status: 429 }
      );
    }

    const body          = await request.json();
    const validatedData = schema.parse(body);

    const points = calculateSubmissionPoints({
      totalViews:         validatedData.totalViews,
      totalReach:         validatedData.totalReach,
      monsterAppearances: validatedData.monsterAppearances,
      rank:               profile.rank,
    });

    const submission = await prisma.submission.create({
      data: {
        userId:             currentUser.id,
        rank:               profile.rank,
        platform:           validatedData.platform,
        contentLink:        validatedData.contentLink,
        contentTypes:       validatedData.contentTypes,
        monsterAppearances: validatedData.monsterAppearances,
        totalReach:         validatedData.totalReach,
        totalViews:         validatedData.totalViews,
        statsScreenshotUrl: validatedData.statsScreenshotUrl ?? null,
        pointsAwarded:      points,
        isApproved:         false,
      },
    });

    return NextResponse.json({ success: true, data: submission }, { status: 201 });
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
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization") ?? undefined;
  try {
    const currentUser = await requireAuth(authHeader);

    const submissions = await prisma.submission.findMany({
      where:   { userId: currentUser.id },
      orderBy: { createdAt: "desc" },
    });

    const pendingCount = submissions.filter((s) => !s.isApproved).length;

    return NextResponse.json({
      success: true,
      data:    submissions,
      pendingCount,
      cap:     PENDING_CAP,
      canSubmit: pendingCount < PENDING_CAP,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Authentication required") {
      return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 });
    }
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}