// src/app/api/users/check-email/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization") ?? undefined;
  try {
    const currentUser = await requireAuth(authHeader);
    const email = new URL(request.url).searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const existing = await prisma.user.findFirst({
      where: { email: email.toLowerCase().trim(), id: { not: currentUser.id } },
    });

    return NextResponse.json({ exists: !!existing, available: !existing });
  } catch (error) {
    if (error instanceof Error && error.message === "Authentication required") {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}