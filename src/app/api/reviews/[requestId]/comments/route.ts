// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { currentUser } from "@clerk/nextjs/server";

// export async function POST(
//   request: Request,
//   { params }: { params: { requestId: string } },
// ) {
//   const { requestId } = await params;
//   const viewer = await currentUser();
//   if (!viewer?.id) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   // ensure the review request exists
//   const req = await prisma.reviewRequest.findUnique({
//     where: { id: requestId },
//   });
//   if (!req) {
//     return NextResponse.json({ error: "Not found" }, { status: 404 });
//   }

//   // find the reviewer's profile
//   const profile = await prisma.profile.findUnique({
//     where: { userId: viewer.id },
//   });
//   if (!profile) {
//     return NextResponse.json({ error: "Profile not found" }, { status: 404 });
//   }

//   const { content, section } = await request.json();
//   const comment = await prisma.reviewComment.create({
//     data: {
//       requestId,
//       reviewerProfileId: profile.id,
//       content,
//       section,
//     },
//   });
//   return NextResponse.json(comment);
// }

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ requestId: string }> },
) {
  const { requestId } = await params;
  const viewer = await currentUser();
  if (!viewer?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Ensure the review request exists
  const req = await prisma.reviewRequest.findUnique({
    where: { id: requestId },
  });
  if (!req) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Find the reviewer's profile
  const profile = await prisma.profile.findUnique({
    where: { userId: viewer.id },
  });
  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  const { content, section } = await request.json();
  const comment = await prisma.reviewComment.create({
    data: {
      requestId,
      reviewerProfileId: profile.id,
      content,
      section,
    },
  });
  return NextResponse.json(comment);
}
