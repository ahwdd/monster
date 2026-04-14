// src/app/api/admin/registrations/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization") ?? undefined;
  try {
    await requireRole(["ADMIN"], authHeader);

    const params     = new URL(request.url).searchParams;
    const page       = Math.max(1, parseInt(params.get("page")  ?? "1",  10));
    const limit      = Math.min(50, parseInt(params.get("limit") ?? "15", 10));
    const skip       = (page - 1) * limit;
    const isApproved = params.get("isApproved");

    const where: any = {};
    if (isApproved === "true")  where.isApproved = true;
    if (isApproved === "false") where.isApproved = false;

    const [data, total] = await Promise.all([
      prisma.creatorProfile.findMany({
        where, skip, take: limit,
        orderBy: { joinedAt: "desc" },
        include: {
          user: {
            select: {
              firstName: true, lastName: true,
              email: true, phone: true, phoneKey: true,
            },
          },
        },
      }),
      prisma.creatorProfile.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
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