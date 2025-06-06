// // // src/app/api/blogs/create/route.ts
// // import { NextResponse } from "next/server";
// // import { auth } from "@clerk/nextjs/server";
// // import prisma from "@/lib/prisma";
// // import { generateBlogWithOpenAI } from "@/lib/openaiBlog"; // You'll create this

// // export async function POST() {
// //   const { userId } = await auth();
// //   if (!userId) return new NextResponse("Unauthorized", { status: 401 });

// //   const blog = await generateBlogWithOpenAI();

// //   const created = await prisma.blog.create({ data: blog });

// //   return NextResponse.json(created);
// // }

// // src/app/api/blogs/route.ts
// import { NextResponse } from "next/server";

// export async function GET() {
//   const dummyBlogs = [
//     { id: 1, title: "Boost Your Resume with AI", content: "AI can help you build..." },
//     { id: 2, title: "Top 5 Resume Mistakes", content: "Avoid these mistakes..." },
//   ];

//   return NextResponse.json(dummyBlogs);
// }

// src/app/api/blogs/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return NextResponse.json(blogs);
}
