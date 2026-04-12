// src/app/api/profile/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAuth } from "@/lib/auth/server";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  realName:        z.string().min(2,  "Real name is required"),
  nickname:        z.string().min(1,  "Nickname is required"),
  email:           z.string().email("Valid email required"),
  birthDate:       z.string().min(1,  "Birth date is required"),
  phone:           z.string().min(7,  "Phone is required"),
  nationality:     z.string().min(2,  "Nationality is required"),
  platforms:       z.array(z.enum(["FACEBOOK","INSTAGRAM","KICK","TIKTOK","TWITCH","YOUTUBE"])).min(1),
  channelLogo:     z.string().url("Channel logo must be a valid URL"),
  contentType:     z.string().min(1,  "Content type is required"),
  socialMediaLink: z.string().url("Social media link must be a valid URL"),
  followers:       z.number().int().min(0),
  eventAttendance: z.enum(["YES","SOMETIMES","NO"]),
  discoverySources:z.array(z.enum([
    "FRIEND_RECOMMENDATION","COMMUNITY_MESSAGES","SOCIAL_MEDIA_POSTS","MONSTER_EVENTS",
  ])).default([]),
  whyJoin: z.string().min(10, "Please tell us why you want to join"),
});

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization") ?? undefined;
  try {
    const currentUser = await requireAuth(authHeader);

    // Prevent double-submission
    const existing = await prisma.creatorProfile.findUnique({
      where: { userId: currentUser.id },
    });
    if (existing) {
      return NextResponse.json(
        { success: false, error: "You have already submitted the registration form." },
        { status: 409 }
      );
    }

    const body          = await request.json();
    const validatedData = schema.parse(body);

    const profile = await prisma.creatorProfile.create({
      data: {
        userId:          currentUser.id,
        channelLogo:     validatedData.channelLogo,
        platforms:       validatedData.platforms,
        contentType:     validatedData.contentType,
        socialMediaLink: validatedData.socialMediaLink,
        followers:       validatedData.followers,
        eventAttendance: validatedData.eventAttendance,
        discoverySources:validatedData.discoverySources,
        whyJoin:         validatedData.whyJoin,
        isApproved: false,
        isActive:   true,
        rank:            "UNRANKED",
        currentLevel:    "LEVEL_1",
        totalPoints:     0,
        levelProgress:   0,
        streamCount:     0,
        shortCount:      0,
        reelCount:       0,
        totalReach:      0,
        totalViews:      0,
      },
    });

    // Update user record with form data
    await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        firstName: validatedData.realName.split(" ")[0],
        lastName:  validatedData.realName.split(" ").slice(1).join(" ") || validatedData.realName,
        email:     validatedData.email,
        phone:     validatedData.phone,
      },
    });

    return NextResponse.json({ success: true, data: profile }, { status: 201 });
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
    const profile = await prisma.creatorProfile.findUnique({
      where: { userId: currentUser.id },
    });
    return NextResponse.json({ success: true, data: profile ?? null });
  } catch (error) {
    if (error instanceof Error && error.message === "Authentication required") {
      return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 });
    }
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}