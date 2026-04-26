// src/app/api/admin/repair/list/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/server";
import { prisma }      from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization") ?? undefined;
  try {
    await requireRole(["ADMIN"], authHeader);

    const profiles = await prisma.creatorProfile.findMany({
      select: {
        id:       true,
        userId:   true,
        realName: true,
        nickname: true,
        user: {
          select: {
            email: true,
            phone: true,
          },
        },
      },
      orderBy: { joinedAt: "desc" },
    });

    const data = profiles.map((p) => ({
      userId:   p.userId,
      name:     p.realName,
      nickname: p.nickname,
      contact:
        p.user.email && !p.user.email.includes("@temp.monster")
          ? p.user.email
          : (p.user.phone ?? ""),
    }));

    return NextResponse.json({ success: true, data });
  } catch (error) {
    if (error instanceof Error && error.message === "Authentication required") {
      return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 });
    }
    if (error instanceof Error && error.message === "Insufficient permissions") {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}