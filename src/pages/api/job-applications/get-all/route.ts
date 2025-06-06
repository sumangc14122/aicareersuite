import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // or wherever your prisma client is

export async function GET() {
  try {
    const jobs = await prisma.jobApplication.findMany({
      orderBy: { appliedDate: "desc" },
    });
    return NextResponse.json(jobs);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 },
    );
  }
}
