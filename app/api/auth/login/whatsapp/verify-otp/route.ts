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

    let response = await fetch(
      `${process.env.HUB_BASE_URL}/api/auth/login/whatsapp/verify-otp`,
      {
        method:  "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body:    JSON.stringify(validatedData),
      }
    );
    let data = await response.json();

    if (response.status === 422 || !data.success) {
      const registerRes = await fetch(
        `${process.env.HUB_BASE_URL}/api/auth/register/whatsapp/verify-otp`,
        {
          method:  "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body:    JSON.stringify(validatedData),
        }
      );
      const registerData = await registerRes.json();

      if (!registerData.success || !registerData.data?.access_token) {
        // Neither login nor register worked — return original error
        return NextResponse.json(data, { status: response.status });
      }

      // Swap to the register response from here on
      response = registerRes;
      data     = registerData;
    }

    if (data.success && data.data?.user && data.data?.access_token) {
      const ext      = data.data.user;
      const phoneKey = extractPhoneKey(validatedData.phone);
      const cleanEmail = sanitizeEmail(ext.email, validatedData.phone);

      let localUser = await findUserByContact(cleanEmail, validatedData.phone);

      if (localUser) {
        // ── Existing local user: update + issue token ─────────────────────
        const nameParts = ext.name ? String(ext.name).trim().split(/\s+/) : null;
        const updateData: any = {
          ...(nameParts
            ? { firstName: nameParts[0], lastName: nameParts.slice(1).join(" ") || nameParts[0] }
            : {}),
          phone:      validatedData.phone,
          phoneKey,
          isVerified: true,
          isActive:   true,
          externalId: ext.id?.toString(),
          provider:   "whatsapp",
          lastLogin:  new Date(),
        };

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

      // ── No local user: store pending cookie and ask for name ─────────────
      const pending = {
        access_token:  data.data.access_token,
        refresh_token: data.data.refresh_token ?? null,
        token_type:    data.data.token_type    ?? "Bearer",
        email:         cleanEmail,
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
        maxAge:   60 * 10,
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