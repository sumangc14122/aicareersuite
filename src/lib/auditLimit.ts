// src/lib/auditLimit.ts

import prisma from "@/lib/prisma";
import { subDays } from "date-fns";

export async function canAuditToday(userId: string): Promise<boolean> {
  const since = subDays(new Date(), 1); // last 24 hours
  const count = await prisma.auditLog.count({
    where: {
      userId,
      createdAt: { gte: since },
    },
  });
  return count < 10;
}

// ✅ Updated function with fileUrl required
export async function logAudit(
  userId: string,
  type: "resume" | "cover",
  fileUrl: string,
) {
  return prisma.auditLog.create({
    data: {
      userId,
      type,
      fileUrl,
    },
  });
}
