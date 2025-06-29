// // // src/app/api/posts/[postId]/route.ts
// // import { NextResponse } from "next/server";
// // import prisma from "@/lib/prisma";
// // import { currentUser } from "@clerk/nextjs/server";

// // export async function GET(
// //   request: Request,
// //   { params }: { params: { postId: string } }
// // ) {
// //   const post = await prisma.post.findUnique({
// //     where: { id: params.postId },
// //   });
// //   if (!post) {
// //     return NextResponse.json({ error: "Not found" }, { status: 404 });
// //   }
// //   return NextResponse.json(post);
// // }

// // export async function PATCH(
// //   request: Request,
// //   { params }: { params: { postId: string } }
// // ) {
// //   // only the owner may edit
// //   const viewer = await currentUser();
// //   const postId = params.postId;

// //   // fetch to verify ownership
// //   const existing = await prisma.post.findUnique({
// //     where: { id: postId },
// //   });
// //   if (!existing) {
// //     return NextResponse.json({ error: "Not found" }, { status: 404 });
// //   }
// //   if (viewer?.id !== existing.profileId /* or check via profile.userId */) {
// //     return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
// //   }

// //   const { title, content, isAnonymous } = await request.json();
// //   const updated = await prisma.post.update({
// //     where: { id: postId },
// //     data: { title, content, isAnonymous },
// //   });
// //   return NextResponse.json(updated);
// // }

// // src/app/api/posts/[postId]/route.ts
// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { currentUser } from "@clerk/nextjs/server";

// export async function GET(
//   _req: Request,
//   { params }: { params: { postId: string } },
// ) {
//   // await params before destructuring
//   const { postId } = await params;

//   const post = await prisma.post.findUnique({
//     where: { id: postId },
//   });
//   if (!post) {
//     return NextResponse.json({ error: "Not found" }, { status: 404 });
//   }
//   return NextResponse.json(post);
// }

// export async function PATCH(
//   req: Request,
//   { params }: { params: { postId: string } },
// ) {
//   const { postId } = await params;

//   // ensure only the owner can edit
//   const viewer = await currentUser();
//   const existing = await prisma.post.findUnique({
//     where: { id: postId },
//   });
//   if (!existing) {
//     return NextResponse.json({ error: "Not found" }, { status: 404 });
//   }

//   // lookup the profile to verify ownership
//   const profile = await prisma.profile.findUnique({
//     where: { id: existing.profileId },
//   });
//   if (!profile || profile.userId !== viewer?.id) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
//   }

//   const { title, content, isAnonymous } = await req.json();
//   const updated = await prisma.post.update({
//     where: { id: postId },
//     data: { title, content, isAnonymous },
//   });
//   return NextResponse.json(updated);
// }

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ postId: string }> },
) {
  const { postId } = await params;

  const post = await prisma.post.findUnique({
    where: { id: postId },
  });
  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(post);
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ postId: string }> },
) {
  const { postId } = await params;

  // Ensure only the owner can edit
  const viewer = await currentUser();
  const existing = await prisma.post.findUnique({
    where: { id: postId },
  });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Lookup the profile to verify ownership
  const profile = await prisma.profile.findUnique({
    where: { id: existing.profileId },
  });
  if (!profile || profile.userId !== viewer?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { title, content, isAnonymous } = await req.json();
  const updated = await prisma.post.update({
    where: { id: postId },
    data: { title, content, isAnonymous },
  });
  return NextResponse.json(updated);
}
