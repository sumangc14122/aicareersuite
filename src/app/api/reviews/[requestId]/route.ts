// // // import { NextResponse } from "next/server";
// // // import prisma from "@/lib/prisma";

// // // export async function GET(
// // //   _req: Request,
// // //   { params }: { params: { requestId: string } }
// // // ) {
// // //   const { requestId } = await params;
// // //   const req = await prisma.reviewRequest.findUnique({
// // //     where: { id: requestId },
// // //     include: {
// // //       comments: {
// // //         orderBy: { createdAt: "desc" },
// // //         include: { reviewerProfile: true },
// // //       },
// // //     },
// // //   });
// // //   if (!req) {
// // //     return NextResponse.json({ error: "Not found" }, { status: 404 });
// // //   }
// // //   return NextResponse.json(req);
// // // }

// // // Single review-request GET (and you could add PATCH/DELETE here)
// // import { NextResponse } from "next/server";
// // import prisma from "@/lib/prisma";

// // export async function GET(
// //   _request: Request,
// //   { params }: { params: { requestId: string } }
// // ) {
// //   // Next.js App Router requires awaiting any dynamic params
// //   const { requestId } = await params;

// //   const req = await prisma.reviewRequest.findUnique({
// //     where: { id: requestId },
// //     include: {
// //       comments: {
// //         orderBy: { createdAt: "desc" },
// //         include: { reviewerProfile: true },
// //       },
// //     },
// //   });
// //   if (!req) {
// //     return NextResponse.json({ error: "Not found" }, { status: 404 });
// //   }
// //   return NextResponse.json(req);
// // }

// // src/app/api/review-requests/[requestId]/route.ts
// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// export async function GET(
//   _req: Request,
//   { params }: { params: { requestId: string } },
// ) {
//   const { requestId } = await params;
//   const req = await prisma.reviewRequest.findUnique({
//     where: { id: requestId },
//     include: {
//       /* optionally include comments here */
//     },
//   });
//   if (!req) return NextResponse.json({ error: "Not found" }, { status: 404 });
//   return NextResponse.json(req);
// }

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ requestId: string }> },
) {
  // Next.js App Router requires awaiting any dynamic params
  const { requestId } = await params;

  const req = await prisma.reviewRequest.findUnique({
    where: { id: requestId },
    include: {
      comments: {
        orderBy: { createdAt: "desc" },
        include: { reviewerProfile: true },
      },
    },
  });
  if (!req) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(req);
}
