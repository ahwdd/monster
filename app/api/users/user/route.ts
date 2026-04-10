// app/api/users/user/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser, getAuthToken, requireAuth, removeAuthCookie } from "@/lib/auth/server";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization") ?? undefined;
    const token      = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : await getAuthToken();

    if (!token) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    const user = await getCurrentUser(authHeader);

    if (!user) {
      await removeAuthCookie();
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({ success: true, user });
  } catch {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const authHeader = request.headers.get("authorization") ?? undefined;
  try {
    const currentUser = await requireAuth(authHeader);
    const body        = await request.json();

    // Only allow updating safe profile fields — NOT role/isActive/isVerified
    const { firstName, lastName, username, phone, phoneKey, email } = body;

    const { prisma } = await import("@/lib/prisma");
    const { safeUserSelect } = await import("@/lib/utils/auth");

    const updated = await prisma.user.update({
      where:  { id: currentUser.id },
      data:   { firstName, lastName, username, phone, phoneKey, email },
      select: safeUserSelect,
    });

    return NextResponse.json({ success: true, user: updated });
  } catch (error) {
    if (error instanceof Error && error.message === "Authentication required") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}