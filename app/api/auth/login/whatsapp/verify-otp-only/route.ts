// src/app/api/auth/login/whatsapp/verify-otp-only/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAuth } from "@/lib/auth/server";

const schema = z.object({
  phone: z.string().min(10, "Valid phone number is required"),
  otp:   z.string().length(6, "OTP must be 6 digits"),
});

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization") ?? undefined;
    const currentUser = await requireAuth(authHeader);

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

    if (!data.success) {
      return NextResponse.json(
        { success: false, error: data.message || "Invalid OTP code" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success:     true,
      message:     "OTP verified successfully",
      accessToken: data.data?.access_token,
      userId:      currentUser.id,
    });
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
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}