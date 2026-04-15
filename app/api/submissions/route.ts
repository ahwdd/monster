// src/app/api/submissions/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAuth } from "@/lib/auth/server";
import { prisma } from "@/lib/prisma";

const PENDING_CAP = 5;

const schema = z.object({
  platform:           z.enum(["FACEBOOK","INSTAGRAM","KICK","TIKTOK","TWITCH","YOUTUBE"]),
  contentLink:        z.string().url(),
  contentTypes:       z.array(z.enum(["PICTURE","STORY","REEL","LONG_VIDEO","POST"])).min(1),
  monsterAppearances: z.array(z.enum(["MONSTER_THEME","LAYOUT","LOGO","MONSTER_PRODUCTS"])).min(1),
  submittedReach:     z.number().int().min(0),
  statsScreenshotUrl: z.string().url().optional().nullable(),
});

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization") ?? undefined;
  try {
    const currentUser = await requireAuth(authHeader);

    const profile = await prisma.creatorProfile.findUnique({
      where: { userId: currentUser.id },
    });
    if (!profile) {
      return NextResponse.json({ success: false, error: "Complete registration first." }, { status: 403 });
    }
    if (profile.status !== "APPROVED") {
      return NextResponse.json({ success: false, error: "Registration not yet approved." }, { status: 403 });
    }

    const pendingCount = await prisma.submission.count({
      where: { userId: currentUser.id, status: "PENDING" },
    });
    if (pendingCount >= PENDING_CAP) {
      return NextResponse.json(
        { success: false, error: "PENDING_LIMIT_REACHED", pendingCount, cap: PENDING_CAP },
        { status: 429 }
      );
    }

    const body = await request.json();
    const data = schema.parse(body);

    const submission = await prisma.submission.create({
      data: {
        userId:             currentUser.id,
        nickname:           profile.nickname,
        rank:               profile.rank,
        platform:           data.platform,
        contentLink:        data.contentLink,
        contentTypes:       data.contentTypes,
        monsterAppearances: data.monsterAppearances,
        submittedReach:     data.submittedReach,
        acceptedReach:      0,
        pendingReach:       null,
        statsScreenshotUrl: data.statsScreenshotUrl ?? null,
        status:             "PENDING",
        isEdited:           false,
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
    console.error("Submission error:", error);
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

    const pendingCount = submissions.filter((s) => s.status === "PENDING").length;

    return NextResponse.json({
      success: true,
      data: submissions,
      pendingCount,
      cap:      PENDING_CAP,
      canSubmit: pendingCount < PENDING_CAP,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Authentication required") {
      return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 });
    }
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}