import { NextResponse } from "next/server";
import { generateCoverLetter } from "@/lib/openai";
import prisma from "@/lib/prisma";
import slugify from "slugify";

export async function GET() {
  try {
    const title = "Top Tips for Crafting the Perfect Resume in 2025";
    const summary =
      "Learn how to tailor your resume for modern ATS systems, including key formatting tips and phrasing strategies.";

    const aiContent = await generateCoverLetter(
      "Write a short career blog article on: " + title,
    );

    const blog = await prisma.blog.create({
      data: {
        title,
        slug: slugify(title, { lower: true }),
        summary,
        content: aiContent,
      },
    });

    return NextResponse.json(blog);
  } catch (err) {
    console.error("[BLOG_GENERATE]", err);
    return new NextResponse("Failed to generate blog", { status: 500 });
  }
}
