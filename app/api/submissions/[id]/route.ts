// src/app/api/submissions/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAuth } from "@/lib/auth/server";
import { prisma } from "@/lib/prisma";

const editSchema = z.object({
  platform:           z.enum(["FACEBOOK","INSTAGRAM","KICK","TIKTOK","TWITCH","YOUTUBE"]).optional(),
  contentLink:        z.string().url().optional(),
  contentTypes:       z.array(z.enum(["PICTURE","STORY","REEL","LONG_VIDEO","POST"])).min(1).optional(),
  monsterAppearances: z.array(z.enum(["MONSTER_THEME","LAYOUT","LOGO","MONSTER_PRODUCTS"])).min(1).optional(),
  statsScreenshotUrl: z.string().url().nullable().optional(),
  submittedReach:     z.number().int().min(0).optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authHeader = request.headers.get("authorization") ?? undefined;
  try {
    const currentUser = await requireAuth(authHeader);
    const { id }      = await params;

    const submission = await prisma.submission.findUnique({ where: { id } });
    if (!submission) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }
    if (submission.userId !== currentUser.id) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const data = editSchema.parse(body);

    const updateData: any = {
      status:   "PENDING",
      isEdited: true,
    };

    if (data.platform           !== undefined) updateData.platform           = data.platform;
    if (data.contentLink        !== undefined) updateData.contentLink        = data.contentLink;
    if (data.contentTypes       !== undefined) updateData.contentTypes       = data.contentTypes;
    if (data.monsterAppearances !== undefined) updateData.monsterAppearances = data.monsterAppearances;
    if (data.statsScreenshotUrl !== undefined) updateData.statsScreenshotUrl = data.statsScreenshotUrl;

    if (data.submittedReach !== undefined) {
      updateData.submittedReach          = data.submittedReach;
      updateData.pendingReach            = data.submittedReach;
      updateData.previousAcceptedReach   = submission.acceptedReach; // snapshot
    }

    const updated = await prisma.submission.update({
      where: { id },
      data:  updateData,
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
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authHeader = request.headers.get("authorization") ?? undefined;
  try {
    const currentUser = await requireAuth(authHeader);
    const { id }      = await params;

    const submission = await prisma.submission.findUnique({ where: { id } });
    if (!submission || submission.userId !== currentUser.id) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: submission });
  } catch (error) {
    if (error instanceof Error && error.message === "Authentication required") {
      return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 });
    }
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}