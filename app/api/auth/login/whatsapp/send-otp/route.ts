// app/api/auth/login/whatsapp/send-otp/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  phone:     z.string().min(10, "Valid phone number is required"),
  phone_key: z.string().min(1,  "Country code is required"),
});

const NOT_REGISTERED_MESSAGES = [
  "not found",
  "not registered",
];

function isNotRegistered(data: any): boolean {
  const msg = (data?.message ?? "").toLowerCase();
  const phoneErr = (data?.errors?.phone ?? [])
    .join(" ")
    .toLowerCase();
  return NOT_REGISTERED_MESSAGES.some(
    (s) => msg.includes(s) || phoneErr.includes(s)
  );
}

export async function POST(request: NextRequest) {
  try {
    const body          = await request.json();
    const validatedData = schema.parse(body);

    const loginRes = await fetch(
      `${process.env.HUB_BASE_URL}/api/auth/login/whatsapp/send-otp`,
      {
        method:  "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body:    JSON.stringify(validatedData),
      }
    );
    const loginData = await loginRes.json();

    if (loginData.success) {
      return NextResponse.json(loginData, { status: loginRes.status });
    }

    if (isNotRegistered(loginData)) {
      const registerRes = await fetch(
        `${process.env.HUB_BASE_URL}/api/auth/register/whatsapp/send-otp`,
        {
          method:  "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body:    JSON.stringify({
            name:      "Monster Creator",
            phone:     validatedData.phone,
            phone_key: validatedData.phone_key,
          }),
        }
      );

      const text = await registerRes.text();
      let registerData: any;
      try { registerData = JSON.parse(text); } catch { registerData = { success: false }; }

      // Return register result (success or failure) to the client
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