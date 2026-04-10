// app/api/auth/update-token/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAuth, setAuthCookie } from "@/lib/auth/server";

const schema = z.object({ accessToken: z.string().min(1) });

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization") ?? undefined;
    await requireAuth(authHeader);

    const body          = await request.json();
    const validatedData = schema.parse(body);
    await setAuthCookie(validatedData.accessToken);

    return NextResponse.json({ success: true, message: "Token updated" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: "Validation failed" }, { status: 400 });
    }
    if (error instanceof Error && error.message === "Authentication required") {
      return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 });
    }
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}