// src/lib/auth/server.ts
import { cookies } from "next/headers";
import { prisma }  from "@/lib/prisma";

const verificationCache = new Map<string, { ts: number; data: any }>();
const CACHE_TTL   = Number(process.env.HUB_VERIFY_CACHE_TTL_SEC || 30) * 1000;
const MAX_RETRIES = 3;

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
      id:                  true,
      channelLogo:         true,
      platforms:           true,
      platformLinks:       true,
      primarySocialLink:   true,
      contentType:         true,
      followers:           true,
      eventAttendance:     true,
      rank:                true,
      status:              true,
      adminNotes:          true,
      approvedAt:          true,
      currentRankReach:    true,
      totalReachAllTime:   true,
      pictureCount:        true,
      storyCount:          true,
      reelCount:           true,
      longVideoCount:      true,
      postCount:           true,
      totalPictureCount:   true,
      totalStoryCount:     true,
      totalReelCount:      true,
      totalLongVideoCount: true,
      totalPostCount:      true,
      engagementRate:      true,
      commitmentScore:     true,
      adminGradeScore:     true,
      isActive:            true,
      joinedAt:            true,
    },
  },
} as const;

export type UserSession = {
  id:         string;
  email?:     string | null;
  phone?:     string | null;
  phoneKey?:  string | null;
  firstName:  string;
  lastName:   string;
  username:   string;
  role:       string;
  isVerified: boolean;
  isActive:   boolean;
  externalId?: string | null;
  provider?:  string | null;
  createdAt:  Date;
  updatedAt:  Date;
  lastLogin?: Date | null;
  profile?: {
    id:                  string;
    channelLogo?:        string | null;
    platforms:           string[];
    platformLinks:       { platform: string; url: string }[];
    primarySocialLink?:  string;
    contentType:         string;
    followers:           number;
    eventAttendance:     string;
    rank:                string;
    status:              "PENDING" | "APPROVED" | "REJECTED";
    adminNotes?:         string | null;
    approvedAt?:         Date | null;
    currentRankReach:    number;
    totalReachAllTime:   number;
    pictureCount:        number;
    storyCount:          number;
    reelCount:           number;
    longVideoCount:      number;
    postCount:           number;
    totalPictureCount:   number;
    totalStoryCount:     number;
    totalReelCount:      number;
    totalLongVideoCount: number;
    totalPostCount:      number;
    engagementRate:      number;
    commitmentScore:     number;
    adminGradeScore:     number;
    isActive:            boolean;
    joinedAt?:           Date | null;
  } | null;
};

export async function setAuthCookie(token: string) {
  try {
    const store = await cookies();
    const opts = {
      httpOnly: false,
      secure:   process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      maxAge:   60 * 60 * 24 * 7,
      path:     "/",
    };
    store.set("token",      token, opts);
    store.set("auth-token", token, opts);
    return true;
  } catch {
    return false;
  }
}

export async function removeAuthCookie() {
  try {
    const store = await cookies();
    store.delete("token");
    store.delete("auth-token");
    return true;
  } catch {
    return false;
  }
}

export async function getAuthToken(): Promise<string | null> {
  try {
    const store = await cookies();
    return store.get("token")?.value ?? store.get("auth-token")?.value ?? null;
  } catch {
    return null;
  }
}

async function fetchWithTimeout(url: string, opts: RequestInit, ms: number) {
  const ctrl = new AbortController();
  const t    = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, { ...opts, signal: ctrl.signal });
    clearTimeout(t);
    return res;
  } catch (e) {
    clearTimeout(t);
    throw e;
  }
}

async function verifyExternalToken(token: string): Promise<any | null> {
  const cached = verificationCache.get(token);
  if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.data;

  const base = process.env.HUB_BASE_URL;
  if (!base) return null;

  const url     = new URL("/api/user", base).toString();
  const timeout = Number(process.env.HUB_FETCH_TIMEOUT_MS || 10000);

  for (let i = 1; i <= MAX_RETRIES; i++) {
    try {
      const res = await fetchWithTimeout(url, {
        method:  "GET",
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      }, timeout);
      if (!res.ok) return null;
      const body = await res.json().catch(() => null);
      const user = body?.data?.user ?? null;
      verificationCache.set(token, { ts: Date.now(), data: user });
      return user;
    } catch {
      await new Promise(r => setTimeout(r, 200 * Math.pow(2, i - 1)));
    }
  }
  return null;
}

export async function getCurrentUser(authHeader?: string): Promise<UserSession | null> {
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.substring(7)
    : await getAuthToken();
  if (!token) return null;

  const externalUser = await verifyExternalToken(token);
  if (!externalUser) return null;

  const where: any[] = [];
  if (externalUser.email) where.push({ email: externalUser.email.toLowerCase().trim() });
  if (externalUser.phone) where.push({ phone: externalUser.phone });
  if (externalUser.id)    where.push({ externalId: externalUser.id.toString() });
  if (where.length === 0) return null;

  const local = await prisma.user.findFirst({
    where:  { OR: where },
    select: safeUserSelect,
  });
  if (!local || !local.isActive) return null;
  return local as unknown as UserSession;
}

export async function requireAuth(authHeader?: string): Promise<UserSession> {
  const user = await getCurrentUser(authHeader);
  if (!user) throw new Error("Authentication required");
  return user;
}

export async function requireRole(roles: string[], authHeader?: string): Promise<UserSession> {
  const user = await requireAuth(authHeader);
  if (!roles.includes(user.role)) throw new Error("Insufficient permissions");
  return user;
}