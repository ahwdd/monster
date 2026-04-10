// app/api/auth/register/whatsapp/send-otp/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name:      z.string().min(1, "Name is required"),
  phone:     z.string().min(10, "Valid phone number is required"),
  phone_key: z.string().min(1, "Country code is required"),
});

export async function POST(request: NextRequest) {
  try {
    const body          = await request.json();
    const validatedData = schema.parse(body);

    const response = await fetch(`${process.env.HUB_BASE_URL}/api/auth/register/whatsapp/send-otp`, {
      method:  "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body:    JSON.stringify(validatedData),
    });

    const text = await response.text();
    let data: any;
    try { data = JSON.parse(text); } catch { data = text; }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, message: "Validation failed", errors: error.flatten().fieldErrors }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}