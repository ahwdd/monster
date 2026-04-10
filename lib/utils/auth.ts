// lib/utils/auth.ts
import { prisma } from "@/lib/prisma";
import { safeUserSelect } from "@/lib/auth/server";

export { safeUserSelect };

export async function findUserByContact(email?: string | null, phone?: string | null) {
  const where: any[] = [];
  if (email) where.push({ email: email.toLowerCase().trim() });
  if (phone) where.push({ phone });
  if (where.length === 0) return null;

  return prisma.user.findFirst({
    where: { OR: where },
    select: safeUserSelect,
  });
}