// New file: src/app/api/living-portfolios/check-slug/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug")?.trim().toLowerCase() || "";

    if (!slug) {
      return NextResponse.json(
        { error: "Missing slug parameter." },
        { status: 400 },
      );
    }

    // Look for any existing portfolio with this slug
    const existing = await prisma.livingPortfolio.findUnique({
      where: { slug },
      select: { id: true },
    });

    return NextResponse.json({ available: existing === null }, { status: 200 });
  } catch (err) {
    console.error("Error in check-slug:", err);
    return NextResponse.json(
      { available: false, error: "Server error occurred." },
      { status: 500 },
    );
  }
}
