// src/app/api/admin/creators/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z }           from "zod";
import { requireRole } from "@/lib/auth/server";
import { prisma }      from "@/lib/prisma";

const scoreSchema = z.object({
  commitmentScore: z.number().min(0).max(15).optional(),
  adminGradeScore: z.number().min(0).max(30).optional(),
  adminNote:       z.string().optional().nullable(),
}).refine(
  (d) => d.commitmentScore !== undefined || d.adminGradeScore !== undefined || d.adminNote !== undefined,
  { message: "Provide at least one field to update" }
);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authHeader = request.headers.get("authorization") ?? undefined;
  try {
    await requireRole(["ADMIN"], authHeader);
    const { id } = await params;

    const profile = await prisma.creatorProfile.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true, firstName: true, lastName: true,
            email: true, phone: true, username: true,
            role: true, createdAt: true,
          },
        },
      },
    });

    if (!profile) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }

    const [submissions, snapshots, platformStats] = await Promise.all([
      prisma.submission.findMany({
        where: { userId: profile.userId },
        orderBy: { createdAt: "desc" },
      }),
      prisma.monthlySnapshot.findMany({
        where: { userId: profile.userId },
        orderBy: { month: "asc" },
      }),
      (prisma as any).platformStat.findMany({
        where: { userId: profile.userId },
        orderBy: { approvedAt: "desc" },
      }),
    ]);

    return NextResponse.json({ success: true, data: { profile, submissions, snapshots, platformStats } });
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

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authHeader = request.headers.get("authorization") ?? undefined;
  try {
    await requireRole(["ADMIN"], authHeader);
    const { id } = await params;

    const body = await request.json();
    const data = scoreSchema.parse(body);

    const profile = await prisma.creatorProfile.findUnique({ where: { id } });
    if (!profile) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }

    const updated = await prisma.creatorProfile.update({
      where: { id },
      data: {
        ...(data.commitmentScore !== undefined && { commitmentScore: data.commitmentScore }),
        ...(data.adminGradeScore !== undefined && { adminGradeScore: data.adminGradeScore }),
        ...(data.adminNote       !== undefined && { adminNote: data.adminNote }),
      },
    });

    return NextResponse.json({ success: true, data: updated });
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
    if (error instanceof Error && error.message === "Insufficient permissions") {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }
    console.error("Admin creator PATCH error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}