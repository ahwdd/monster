// src/lib/utils/auth.ts
import { prisma } from "@/lib/prisma";

export const safeUserSelect = {
  id:         true,
  email:      true,
  phone:      true,
  phoneKey:   true,
  firstName:  true,
  lastName:   true,
  username:   true,
  role:       true,
  isVerified: true,
  isActive:   true,
  externalId: true,
  provider:   true,
  createdAt:  true,
  updatedAt:  true,
  lastLogin:  true,
  profile: {
    select: {
      id:                 true,
      channelLogo:        true,
      platforms:          true,
      contentType:        true,
      primarySocialLink:  true,
      platformLinks:      true,
      followers:          true,
      eventAttendance:    true,
      rank:               true,
      currentRankReach:   true,
      totalReachAllTime:  true,
      pictureCount:       true,
      storyCount:         true,
      reelCount:          true,
      longVideoCount:     true,
      postCount:          true,
      totalPictureCount:  true,
      totalStoryCount:    true,
      totalReelCount:     true,
      totalLongVideoCount:true,
      totalPostCount:     true,
      status:             true,
      adminNotes:         true,
      approvedAt:         true,
      isActive:           true,
      joinedAt:           true,
    },
  },
} as const;

export async function findUserByContact(
  email?: string | null,
  phone?: string | null
) {
  const where: any[] = [];
  if (email) where.push({ email: email.toLowerCase().trim() });
  if (phone) where.push({ phone });
  if (where.length === 0) return null;

  return prisma.user.findFirst({
    where:  { OR: where },
    select: safeUserSelect,
  });
}

export function isFakeHubEmail(
  email: string | null | undefined,
  phone?: string | null
): boolean {
  if (!email) return false;

  const lower    = email.toLowerCase().trim();
  const [local]  = lower.split("@");

  if (local.startsWith("+")) return true;

  return false;
}

export function sanitizeEmail(
  email: string | null | undefined,
  phone?: string | null
): string | null {
  if (!email) return null;
  if (isFakeHubEmail(email, phone)) return null;
  return email.toLowerCase().trim();
}