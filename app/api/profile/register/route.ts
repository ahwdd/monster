// src/app/api/profile/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAuth } from "@/lib/auth/server";
import { prisma } from "@/lib/prisma";

const platformLinkSchema = z.object({
  platform: z.enum(["FACEBOOK","INSTAGRAM","KICK","TIKTOK","TWITCH","YOUTUBE"]),
  url:      z.string().url("Invalid URL"),
});


const schema = z.object({
  realName:          z.string().min(2),
  nickname:          z.string().min(1),
  contactEmail:      z.string().email("Invalid email"),
  contactPhone:      z.string().min(7, "Invalid phone number"),
  birthDate:         z.string().min(1),
  nationality:       z.string().min(2),
  residency:         z.string().min(2),
  platforms:         z.array(z.enum(["FACEBOOK","INSTAGRAM","KICK","TIKTOK","TWITCH","YOUTUBE"])).min(1),
  platformLinks:     z.array(platformLinkSchema).min(1),
  primarySocialLink: z.string().url("Invalid primary URL"),
  channelLogo:       z.string().url().optional().nullable(),
  contentType:       z.string().min(1),
  followers:         z.number().int().min(0),
  eventAttendance:   z.enum(["YES","SOMETIMES","NO"]),
  discoverySources:  z.array(z.enum([
    "FRIEND_RECOMMENDATION","COMMUNITY_MESSAGES","SOCIAL_MEDIA_POSTS","MONSTER_EVENTS",
  ])).min(1, "Select at least one"),
  whyJoin:           z.string().optional().nullable(),
});

function profileData(data: z.infer<typeof schema>) {
  return {
    realName:          data.realName,
    contactEmail:      data.contactEmail,
    contactPhone:      data.contactPhone,
    nickname:          data.nickname,
    birthDate:         data.birthDate,
    nationality:       data.nationality,
    residency:         data.residency,
    platforms:         data.platforms,
    platformLinks:     data.platformLinks,
    primarySocialLink: data.primarySocialLink,
    channelLogo:       data.channelLogo ?? null,
    contentType:       data.contentType,
    followers:         data.followers,
    eventAttendance:   data.eventAttendance,
    discoverySources:  data.discoverySources,
    whyJoin:           data.whyJoin ?? null,
  };
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization") ?? undefined;
  try {
    const currentUser = await requireAuth(authHeader);

    const existing = await prisma.creatorProfile.findUnique({
      where: { userId: currentUser.id },
    });

    const body = await request.json();
    const data = schema.parse(body);

    if (existing) {
      if (existing.status === "APPROVED") {
        return NextResponse.json(
          { success: false, error: "ALREADY_APPROVED" },
          { status: 409 }
        );
      }

      const updated = await prisma.creatorProfile.update({
        where: { userId: currentUser.id },
        data: {
          ...profileData(data),
          status:     "PENDING",
          adminNotes: null,
        },
      });

      await prisma.user.update({
        where: { id: currentUser.id },
        data: {
          firstName: data.realName.split(" ")[0],
          lastName:  data.realName.split(" ").slice(1).join(" ") || data.realName,
        },
      });

      return NextResponse.json({ success: true, data: updated });
    }

    const profile = await prisma.creatorProfile.create({
      data: {
        userId: currentUser.id,
        ...profileData(data),
        status:             "PENDING",
        rank:               "UNRANKED",
        currentRankReach:   0,
        totalReachAllTime:  0,
        pictureCount:       0,
        storyCount:         0,
        reelCount:          0,
        longVideoCount:     0,
        postCount:          0,
        totalPictureCount:  0,
        totalStoryCount:    0,
        totalReelCount:     0,
        totalLongVideoCount:0,
        totalPostCount:     0,
        isActive:           true,
      },
    });

    // Only update display name on fresh create too
    await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        firstName: data.realName.split(" ")[0],
        lastName:  data.realName.split(" ").slice(1).join(" ") || data.realName,
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
    console.error("Profile register error:", error);
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