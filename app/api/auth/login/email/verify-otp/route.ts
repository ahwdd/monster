// src/app/api/auth/login/email/verify-otp/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { cookies } from "next/headers";
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
      const ext        = data.data.user;
      const cleanEmail = validatedData.email.toLowerCase().trim();

      // Phone from Hub — only trust if it looks like a real number
      let phoneKey: string | null = null;
      let cleanPhone: string | null = null;
      if (ext.phone && ext.phone.startsWith("+") && ext.phone.length >= 10) {
        cleanPhone = ext.phone;
        phoneKey   = extractPhoneKey(ext.phone);
      }

      const localUser = await findUserByContact(cleanEmail, cleanPhone);

      if (localUser) {
        const updateData: any = {
          isVerified: true,
          isActive:   true,
          externalId: ext.id?.toString(),
          provider:   "email",
          lastLogin:  new Date(),
        };

        if (cleanPhone && cleanPhone !== localUser.phone) {
          const conflict = await prisma.user.findFirst({
            where: { phone: cleanPhone, id: { not: localUser.id } },
          });
          if (!conflict) {
            updateData.phone    = cleanPhone;
            updateData.phoneKey = phoneKey;
          }
        }

        const updated = await prisma.user.update({
          where:  { id: localUser.id },
          data:   updateData,
          select: safeUserSelect,
        });

        await setAuthCookie(data.data.access_token);
        return NextResponse.json({
          success: true,
          message: data.message,
          data: {
            user:          updated,
            access_token:  data.data.access_token,
            refresh_token: data.data.refresh_token,
            token_type:    data.data.token_type,
          },
        });
      }

      const pending = {
        access_token:  data.data.access_token,
        refresh_token: data.data.refresh_token ?? null,
        token_type:    data.data.token_type    ?? "Bearer",
        email:         cleanEmail,
        phone:         cleanPhone,
        phoneKey,
        externalId:    ext.id?.toString() ?? null,
        provider:      "email",
      };

      const store = await cookies();
      store.set("pending_auth", JSON.stringify(pending), {
        httpOnly: true,
        secure:   process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge:   60 * 10, // 10 minutes — enough time to enter a name
        path:     "/",
      });

      return NextResponse.json({ success: true, requiresName: true });
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