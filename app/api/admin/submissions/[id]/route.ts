// src/app/api/admin/submissions/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireRole } from "@/lib/auth/server";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  status:         z.enum(["APPROVED","REJECTED"]),
  acceptedReach:  z.number().int().min(0).optional(),
  adminNotes:     z.string().optional().nullable(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authHeader = request.headers.get("authorization") ?? undefined;
  try {
    await requireRole(["ADMIN"], authHeader);
    const { id } = await params;

    const submission = await prisma.submission.findUnique({ where: { id } });
    if (!submission) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }

    const body = await request.json();
    const data = schema.parse(body);

    let reachToCredit = 0;
    let newAcceptedReach = submission.acceptedReach;

    if (data.status === "APPROVED") {
      if (data.acceptedReach !== undefined) {
        const adminReach = data.acceptedReach;
        const delta      = adminReach - submission.acceptedReach;
        reachToCredit    = delta;
        newAcceptedReach = adminReach;
      } else if (submission.pendingReach !== null && submission.pendingReach !== undefined) {
        const prev    = submission.previousAcceptedReach ?? submission.acceptedReach;
        reachToCredit = submission.pendingReach - prev;
        newAcceptedReach = submission.pendingReach;
      } else {
        reachToCredit    = submission.submittedReach;
        newAcceptedReach = submission.submittedReach;
      }
    }

    const updated = await prisma.submission.update({
      where: { id },
      data: {
        status:               data.status,
        adminNotes:           data.adminNotes ?? null,
        acceptedReach:        newAcceptedReach,
        pendingReach:         null, // clear pending regardless
        previousAcceptedReach:null,
      },
    });

    if (data.status === "APPROVED" && reachToCredit !== 0) {
      const profile = await prisma.creatorProfile.findUnique({
        where: { userId: submission.userId },
      });
      if (profile) {
        const contentCounts: any = {};
        submission.contentTypes.forEach((ct) => {
          const field = contentTypeToField(ct);
          contentCounts[field] = (contentCounts[field] ?? 0) + 1;
        });

        const rankWindowIncrements: any = {};
        const totalIncrements: any = {};
        Object.entries(contentCounts).forEach(([field, count]) => {
          rankWindowIncrements[field]                     = { increment: count as number };
          totalIncrements[`total${capitalize(field)}`]   = { increment: count as number };
        });

        await prisma.creatorProfile.update({
          where: { userId: submission.userId },
          data: {
            currentRankReach:  { increment: reachToCredit },
            totalReachAllTime: { increment: reachToCredit },
            ...rankWindowIncrements,
            ...totalIncrements,
          },
        });
      }
    }

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
    console.error("Admin submission PATCH error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

function contentTypeToField(ct: string): string {
  const map: Record<string, string> = {
    PICTURE:    "pictureCount",
    STORY:      "storyCount",
    REEL:       "reelCount",
    LONG_VIDEO: "longVideoCount",
    POST:       "postCount",
  };
  return map[ct] ?? "postCount";
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}