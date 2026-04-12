// app/api/auth/login/email/send-otp/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Valid email is required"),
  name:  z.string().optional(), // optional — passed from signup page
});

const NOT_REGISTERED_MESSAGES = [
  "not registered",
  "not found",
];

function isNotRegistered(data: any): boolean {
  const msg      = (data?.message ?? "").toLowerCase();
  const emailErr = (data?.errors?.email ?? []).join(" ").toLowerCase();
  return NOT_REGISTERED_MESSAGES.some(
    (s) => msg.includes(s) || emailErr.includes(s)
  );
}

export async function POST(request: NextRequest) {
  try {
    const body          = await request.json();
    const validatedData = schema.parse(body);

    const loginRes = await fetch(
      `${process.env.HUB_BASE_URL}/api/auth/login/email/send-otp`,
      {
        method:  "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body:    JSON.stringify({ email: validatedData.email }),
      }
    );
    const loginData = await loginRes.json();

    if (loginData.success) {
      return NextResponse.json(loginData, { status: loginRes.status });
    }

    if (isNotRegistered(loginData)) {
      const registerRes = await fetch(
        `${process.env.HUB_BASE_URL}/api/auth/register/email/send-otp`,
        {
          method:  "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body:    JSON.stringify({
            email: validatedData.email,
            name:  validatedData.name || "Monster Creator",
          }),
        }
      );

      const text = await registerRes.text();
      let registerData: any;
      try { registerData = JSON.parse(text); } catch { registerData = { success: false }; }

      return NextResponse.json(registerData, { status: registerRes.status });
    }

    return NextResponse.json(loginData, { status: loginRes.status });

  } catch (error) {
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