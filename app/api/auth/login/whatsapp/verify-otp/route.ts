// src/app/api/auth/login/whatsapp/verify-otp/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { setAuthCookie } from "@/lib/auth/server";
import { findUserByContact, safeUserSelect, sanitizeEmail } from "@/lib/utils/auth";
import { extractPhoneKey } from "@/lib/utils/phoneKey";

const schema = z.object({
  phone: z.string().min(10, "Valid phone number is required"),
  otp:   z.string().length(6, "OTP must be 6 digits"),
});

export async function POST(request: NextRequest) {
  try {
    const body          = await request.json();
    const validatedData = schema.parse(body);

    const response = await fetch(
      `${process.env.HUB_BASE_URL}/api/auth/login/whatsapp/verify-otp`,
      {
        method:  "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body:    JSON.stringify(validatedData),
      }
    );
    const data = await response.json();

    if (data.success && data.data?.user && data.data?.access_token) {
      const ext      = data.data.user;
      const phoneKey = extractPhoneKey(validatedData.phone);

      // Sanitize email — discard Hub auto-generated fake emails
      const cleanEmail = sanitizeEmail(ext.email, validatedData.phone);

      let localUser = await findUserByContact(cleanEmail, validatedData.phone);

      if (localUser) {
        // ── Existing user: update + issue token as normal ─────────────────
        const nameParts = ext.name ? String(ext.name).trim().split(/\s+/) : null;
        const updateData: any = {
          ...(nameParts ? { firstName: nameParts[0], lastName: nameParts.slice(1).join(" ") || nameParts[0] } : {}),
          phone:      validatedData.phone,
          phoneKey,
          isVerified: true,
          isActive:   true,
          externalId: ext.id?.toString(),
          provider:   "whatsapp",
          lastLogin:  new Date(),
        };

        // Only update email if Hub returned a real one and it won't conflict
        if (cleanEmail && cleanEmail !== localUser.email) {
          const conflict = await prisma.user.findFirst({
            where: { email: cleanEmail, id: { not: localUser.id } },
          });
          if (!conflict) updateData.email = cleanEmail;
        }

        localUser = await prisma.user.update({
          where:  { id: localUser.id },
          data:   updateData,
          select: safeUserSelect,
        });

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

      // ── New user: cannot create yet — we don't have their name ───────────
      // WhatsApp Hub responses sometimes include a name but it's often a phone
      // number or empty string, so we always ask to be safe and consistent
      // with the email flow.
      const pending = {
        access_token:  data.data.access_token,
        refresh_token: data.data.refresh_token ?? null,
        token_type:    data.data.token_type    ?? "Bearer",
        email:         cleanEmail,   // null if fake/missing
        phone:         validatedData.phone,
        phoneKey,
        externalId:    ext.id?.toString() ?? null,
        provider:      "whatsapp",
      };

      const store = await cookies();
      store.set("pending_auth", JSON.stringify(pending), {
        httpOnly: true,
        secure:   process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge:   60 * 10, // 10 minutes
        path:     "/",
      });

      return NextResponse.json({ success: true, requiresName: true });
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("login/whatsapp/verify-otp error:", error);
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