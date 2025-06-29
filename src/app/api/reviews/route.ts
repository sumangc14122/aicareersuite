// // import { NextResponse } from "next/server";
// // import prisma from "@/lib/prisma";
// // import { currentUser } from "@clerk/nextjs/server";

// // export async function GET(request: Request) {
// //   const { searchParams } = new URL(request.url);
// //   const userId = searchParams.get("userId");
// //   if (!userId) {
// //     return NextResponse.json({ error: "Missing userId" }, { status: 400 });
// //   }
// //   // find that user's profile
// //   const profile = await prisma.profile.findUnique({ where: { userId } });
// //   if (!profile) {
// //     return NextResponse.json({ error: "Profile not found" }, { status: 404 });
// //   }
// //   const reqs = await prisma.reviewRequest.findMany({
// //     where: { profileId: profile.id },
// //     orderBy: { createdAt: "desc" },
// //   });
// //   return NextResponse.json(reqs);
// // }

// // export async function POST(request: Request) {
// //   const viewer = await currentUser();
// //   if (!viewer?.id) {
// //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// //   }

// //   const { resumeUrl, description, isPublic } = await request.json();
// //   // find the requester's profile
// //   const profile = await prisma.profile.findUnique({
// //     where: { userId: viewer.id },
// //   });
// //   if (!profile) {
// //     return NextResponse.json({ error: "Profile not found" }, { status: 404 });
// //   }

// //   const req = await prisma.reviewRequest.create({
// //     data: {
// //       profileId:   profile.id,
// //       resumeUrl,
// //       description,
// //       isPublic,
// //     },
// //   });
// //   return NextResponse.json(req);
// // }

// // List all review-requests for the current user, or create a new one
// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { currentUser } from "@clerk/nextjs/server";

// export async function GET() {
//   const user = await currentUser();
//   if (!user?.id) return NextResponse.json([], { status: 200 });

//   const profile = await prisma.profile.findUnique({
//     where: { userId: user.id },
//   });
//   if (!profile) return NextResponse.json([], { status: 200 });

//   const list = await prisma.reviewRequest.findMany({
//     where: { profileId: profile.id },
//     orderBy: { createdAt: "desc" },
//   });
//   return NextResponse.json(list);
// }

// export async function POST(request: Request) {
//   const user = await currentUser();
//   if (!user?.id) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const { resumeUrl, description, isPublic } = await request.json();
//   if (!resumeUrl) {
//     return NextResponse.json({ error: "Missing resumeUrl" }, { status: 400 });
//   }

//   // look up (or upsert) the Profile row
//   const profile = await prisma.profile.upsert({
//     where: { userId: user.id },
//     update: {},
//     create: {
//       userId:   user.id,
//       name:     user.firstName ?? "New User",
//       isPublic: false,
//     },
//   });

//   // create the review request
//   const rr = await prisma.reviewRequest.create({
//     data: {
//       profileId:  profile.id,
//       resumeUrl,
//       description,
//       isPublic:   isPublic ?? true,
//     },
//   });

//   return NextResponse.json(rr);
// }

// src/app/api/review-requests/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  const user = await currentUser();
  if (!user?.id) return NextResponse.json([], { status: 200 });
  const profile = await prisma.profile.findUnique({
    where: { userId: user.id },
  });
  if (!profile) return NextResponse.json([], { status: 200 });

  const list = await prisma.reviewRequest.findMany({
    where: { profileId: profile.id },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(list);
}

export async function POST(request: Request) {
  const user = await currentUser();
  if (!user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { resumeUrl, description, isPublic } = await request.json();
  if (!resumeUrl)
    return NextResponse.json({ error: "Missing resumeUrl" }, { status: 400 });

  // ensure Profile exists
  const profile = await prisma.profile.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      name: user.firstName ?? "New User",
      isPublic: false,
    },
  });

  const req = await prisma.reviewRequest.create({
    data: {
      profileId: profile.id,
      resumeUrl,
      description,
      isPublic: isPublic ?? true,
    },
  });
  return NextResponse.json(req);
}
