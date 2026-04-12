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
  // profileImage does NOT exist on User — it lives on CreatorProfile as channelLogo
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
      id:              true,
      channelLogo:     true,
      platforms:       true,
      contentType:     true,
      socialMediaLink: true,
      followers:       true,
      eventAttendance: true,
      rank:            true,
      currentLevel:    true,
      totalPoints:     true,
      levelProgress:   true,
      streamCount:     true,
      shortCount:      true,
      reelCount:       true,
      totalReach:      true,
      totalViews:      true,
      isApproved:      true,
      isActive:        true,
      cohortMonth:     true,
      joinedAt:        true,
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