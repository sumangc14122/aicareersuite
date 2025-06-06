import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });
    return NextResponse.json(blogs);
  } catch (err) {
    console.error("Failed to fetch blogs", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
