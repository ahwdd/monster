// src/app/api/auth/login/email/verify-otp/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { setAuthCookie } from "@/lib/auth/server";
import { findUserByContact, safeUserSelect } from "@/lib/utils/auth";
import { extractPhoneKey } from "@/lib/utils/phoneKey";

const schema = z.object({
  email: z.string().email("Valid email is required"),
  otp:   z.string().length(6, "OTP must be 6 digits"),
});

export async function POST(request: NextRequest) {
  try {
    const body          = await request.json();
    const validatedData = schema.parse(body);

    const response = await fetch(
      `${process.env.HUB_BASE_URL}/api/auth/login/email/verify-otp`,
      {
        method:  "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body:    JSON.stringify(validatedData),
      }
    );
    const data = await response.json();

    if (data.success && data.data?.user && data.data?.access_token) {
      const ext = data.data.user;

      const nameParts = ext.name ? ext.name.trim().split(" ") : ["Unknown", "User"];
      const firstName = nameParts[0];
      const lastName  = nameParts.slice(1).join(" ") || firstName;

      // Phone from Hub — only trust if it's a real phone number
      let phoneKey: string | null = null;
      let cleanPhone: string | null = null;
      if (ext.phone && ext.phone.startsWith("+") && ext.phone.length >= 10) {
        cleanPhone = ext.phone;
        phoneKey   = extractPhoneKey(ext.phone);
      }

      // Email is always real here — user typed it
      const cleanEmail = validatedData.email.toLowerCase().trim();

      let localUser = await findUserByContact(cleanEmail, cleanPhone);

      if (!localUser) {
        localUser = await prisma.user.create({
          data: {
            firstName,
            lastName,
            username:   `${firstName.toLowerCase()}-${Date.now()}`,
            email:      cleanEmail,
            phone:      cleanPhone,
            phoneKey,
            isVerified: true,
            isActive:   true,
            role:       "USER",
            externalId: ext.id?.toString(),
            provider:   "email",
            lastLogin:  new Date(),
          },
          select: safeUserSelect,
        });
      } else {
        const updateData: any = {
          firstName,
          lastName,
          isVerified: true,
          isActive:   true,
          externalId: ext.id?.toString(),
          provider:   "email",
          lastLogin:  new Date(),
        };
        // Only update phone if Hub returned a real one and it won't conflict
        if (cleanPhone && cleanPhone !== localUser.phone) {
          const conflict = await prisma.user.findFirst({
            where: { phone: cleanPhone, id: { not: localUser.id } },
          });
          if (!conflict) {
            updateData.phone    = cleanPhone;
            updateData.phoneKey = phoneKey;
          }
        }
        localUser = await prisma.user.update({
          where:  { id: localUser.id },
          data:   updateData,
          select: safeUserSelect,
        });
      }

      await setAuthCookie(data.data.access_token);

      return NextResponse.json({
        success: true,
        message: data.message,
        data: {
          user:          localUser,
          access_token:  data.data.access_token,
          refresh_token: data.data.refresh_token,
          token_type:    data.data.token_type,
        },
      });
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("login/email/verify-otp error:", error);
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