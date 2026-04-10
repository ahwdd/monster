// app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAuthToken, removeAuthCookie } from "@/lib/auth/server";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const token      = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : await getAuthToken();

    if (token) {
      await fetch(`${process.env.HUB_BASE_URL}/api/logout`, {
        method:  "POST",
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      }).catch(() => {}); // don't fail if hub is unreachable
    }

    await removeAuthCookie();
    return NextResponse.json({ success: true, message: "Logged out successfully" });
  } catch {
    await removeAuthCookie();
    return NextResponse.json({ success: true, message: "Logged out successfully" });
  }
}