// app/api/auth/register/whatsapp/verify-otp/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { setAuthCookie } from "@/lib/auth/server";
import { findUserByContact, safeUserSelect } from "@/lib/utils/auth";

const schema = z.object({
  phone: z.string().min(10, "Valid phone number is required"),
  otp:   z.string().length(6, "OTP must be 6 digits"),
});

export async function POST(request: NextRequest) {
  try {
    const body          = await request.json();
    const validatedData = schema.parse(body);

    const response = await fetch(`${process.env.HUB_BASE_URL}/api/auth/register/whatsapp/verify-otp`, {
      method:  "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body:    JSON.stringify(validatedData),
    });
    const data = await response.json();

    if (data.success && data.data?.user && data.data?.access_token) {
      const ext = data.data.user;

      const nameParts = ext.name ? String(ext.name).trim().split(/\s+/) : ["Unknown", "User"];
      const firstName = nameParts[0] ?? "Unknown";
      const lastName  = nameParts.slice(1).join(" ") || firstName;

      let phoneKey = "+20";
      if (ext.phone?.startsWith("+")) {
        const match = ext.phone.match(/^\+\d{1,3}/);
        if (match) phoneKey = match[0];
      }

      let localUser = await findUserByContact(ext.email, validatedData.phone);

      if (!localUser) {
        localUser = await prisma.user.create({
          data: {
            firstName,
            lastName,
            username:   `${firstName.toLowerCase()}-${Date.now()}`,
            email:      ext.email ? ext.email.toLowerCase().trim() : `${validatedData.phone}@temp.monster`,
            phone:      validatedData.phone,
            phoneKey,
            isVerified: true,
            isActive:   true,
            role:       "USER",
            externalId: ext.id?.toString(),
            provider:   "whatsapp",
            lastLogin:  new Date(),
          },
          select: safeUserSelect,
        });
      } else {
        localUser = await prisma.user.update({
          where: { id: localUser.id },
          data: {
            firstName,
            lastName,
            phone:      validatedData.phone,
            phoneKey,
            email:      ext.email ? ext.email.toLowerCase().trim() : (localUser.email ?? undefined),
            isVerified: true,
            isActive:   true,
            externalId: ext.id?.toString(),
            provider:   "whatsapp",
            lastLogin:  new Date(),
          },
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
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, message: "Validation failed", errors: error.flatten().fieldErrors }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}