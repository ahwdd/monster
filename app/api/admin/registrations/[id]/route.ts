// src/app/api/admin/registrations/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireRole } from "@/lib/auth/server";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  status:     z.enum(["APPROVED","REJECTED"]),
  adminNotes: z.string().optional().nullable(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authHeader = request.headers.get("authorization") ?? undefined;
  try {
    await requireRole(["ADMIN"], authHeader);
    const { id } = await params;

    const profile = await prisma.creatorProfile.findUnique({ where: { id } });
    if (!profile) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }

    const body = await request.json();
    const data = schema.parse(body);

    const updated = await prisma.creatorProfile.update({
      where: { id },
      data: {
        status:     data.status,
        adminNotes: data.adminNotes ?? null,
        // Set approvedAt only on first approval (don't reset month clock on re-approve)
        ...(data.status === "APPROVED" && !profile.approvedAt
          ? { approvedAt: new Date() }
          : {}),
      },
      include: {
        user: { select: { firstName: true, lastName: true, email: true, phone: true } },
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
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}