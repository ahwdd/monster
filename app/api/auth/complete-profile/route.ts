// src/app/api/auth/complete-profile/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { cookies } from "next/headers";
import { setAuthCookie, safeUserSelect } from "@/lib/auth/server";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").trim(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name } = schema.parse(body);

    // Read the pending auth cookie
    const store      = await cookies();
    const raw        = store.get("pending_auth")?.value;
    if (!raw) {
      return NextResponse.json(
        { success: false, message: "Session expired. Please sign in again." },
        { status: 401 }
      );
    }

    let pending: {
      access_token:  string;
      refresh_token: string | null;
      token_type:    string;
      email:         string;
      phone:         string | null;
      phoneKey:      string | null;
      externalId:    string | null;
      provider:      string;
    };

    try {
      pending = JSON.parse(raw);
    } catch {
      store.delete("pending_auth");
      return NextResponse.json(
        { success: false, message: "Invalid session. Please sign in again." },
        { status: 401 }
      );
    }

    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0];
    const lastName  = nameParts.slice(1).join(" ") || firstName;

    // Check for an existing user by email or externalId —
    // previous failed create attempts (or a race) may have already inserted a record.
    const where: any[] = [];
    if (pending.email)      where.push({ email:      pending.email });
    if (pending.externalId) where.push({ externalId: pending.externalId });
    if (pending.phone)      where.push({ phone:      pending.phone });

    const existing = where.length
      ? await prisma.user.findFirst({ where: { OR: where }, select: safeUserSelect })
      : null;

    let localUser;

    if (existing) {
      // User already exists (from a previous failed attempt) — just update the name + login time.
      localUser = await prisma.user.update({
        where: { id: existing.id },
        data:  { firstName, lastName, lastLogin: new Date(), isVerified: true, isActive: true },
        select: safeUserSelect,
      });
    } else {
      // Truly new user — create without phone/phoneKey when null to avoid
      // the non-sparse unique index collision on User_phone_key.
      localUser = await prisma.user.create({
        data: {
          firstName,
          lastName,
          username:   `${firstName.toLowerCase()}-${Date.now()}`,
          email:      pending.email,
          ...(pending.phone ? { phone: pending.phone, phoneKey: pending.phoneKey } : {}),
          isVerified: true,
          isActive:   true,
          role:       "USER",
          externalId: pending.externalId ?? undefined,
          provider:   pending.provider,
          lastLogin:  new Date(),
        },
        select: safeUserSelect,
      });
    }

    // Issue real auth cookies and clear pending
    await setAuthCookie(pending.access_token);
    store.delete("pending_auth");

    return NextResponse.json({
      success: true,
      data: {
        user:          localUser,
        access_token:  pending.access_token,
        refresh_token: pending.refresh_token,
        token_type:    pending.token_type,
      },
    });
  } catch (error) {
    console.error("complete-profile error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors: error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}