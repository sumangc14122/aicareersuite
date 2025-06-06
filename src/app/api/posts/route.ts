// // handles GET and POST for all posts
// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const userId = searchParams.get("userId");
//   const type   = searchParams.get("type") || "SUCCESS";

//   if (!userId) {
//     return NextResponse.json({ error: "Missing userId" }, { status: 400 });
//   }

//   const posts = await prisma.post.findMany({
//     where: {
//       profile: { userId },
//       type: type as any,
//     },
//     orderBy: { createdAt: "desc" },
//   });
//   return NextResponse.json(posts);
// }

// export async function POST(request: Request) {
//   try {
//     const { userId, title, content, isAnonymous, type } = await request.json();
//     if (!userId || !content) {
//       return NextResponse.json({ error: "Missing fields" }, { status: 400 });
//     }
//     const profile = await prisma.profile.findUnique({ where: { userId } });
//     if (!profile) {
//       return NextResponse.json({ error: "Profile not found" }, { status: 404 });
//     }
//     const post = await prisma.post.create({
//       data: {
//         profileId: profile.id,
//         title,
//         content,
//         isAnonymous,
//         type,
//       },
//     });
//     return NextResponse.json(post);
//   } catch (err) {
//     console.error("POST /api/posts error:", err);
//     return NextResponse.json({ error: "Internal error" }, { status: 500 });
//   }
// }

// handles GET and POST for all posts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Define the PostType union
type PostType = "SUCCESS" | "BLOG";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const typeParam = searchParams.get("type") || "SUCCESS";

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  // Type guard to ensure type is a valid PostType
  const type: PostType =
    typeParam === "SUCCESS" || typeParam === "BLOG" ? typeParam : "SUCCESS";

  const posts = await prisma.post.findMany({
    where: {
      profile: { userId },
      type, // No need for as any, type is now PostType
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  try {
    const { userId, title, content, isAnonymous, type } = await request.json();
    if (!userId || !content) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const profile = await prisma.profile.findUnique({ where: { userId } });
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }
    const post = await prisma.post.create({
      data: {
        profileId: profile.id,
        title,
        content,
        isAnonymous,
        type, // Type is passed as-is, Prisma handles it
      },
    });
    return NextResponse.json(post);
  } catch (err) {
    console.error("POST /api/posts error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
