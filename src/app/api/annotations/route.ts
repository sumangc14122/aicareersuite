// // import { NextResponse } from "next/server";
// // import prisma from "@/lib/prisma";
// // import { currentUser } from "@clerk/nextjs/server";

// // export async function GET() {
// //   const user = await currentUser();
// // //   if (!user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// //   if (!user?.id) return NextResponse.json([],);

// //   const profile = await prisma.profile.findUnique({ where: { userId: user.id } });
// //   if (!profile) return NextResponse.json([], { status: 200 });
// // //   NextResponse.json({ error: "Profile not found" }, { status: 404 });

// //   const list = await prisma.annotation.findMany({
// //     where: { profileId: profile.id },
// //     orderBy: { createdAt: "desc" },
// //   });
// //   return NextResponse.json(list);
// // }

// // export async function POST(request: Request) {
// //   const user = await currentUser();
// //   if (!user?.id) return NextResponse.json([], { status: 200 });
// //   const { snippet, comment } = await request.json();
// //   if (!snippet || !comment) {
// //     return NextResponse.json({ error: "Missing fields" }, { status: 400 });
// //   }

// //   const profile = await prisma.profile.findUnique({ where: { userId: user.id } });
// //   if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 200 });

// //   const ann = await prisma.annotation.create({
// //     data: { profileId: profile.id, snippet, comment },
// //   });
// //   return NextResponse.json(ann);
// // }

// // src/app/api/annotations/route.ts
// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { currentUser } from "@clerk/nextjs/server";

// export async function GET() {
//   const user = await currentUser();
//   if (!user?.id) return NextResponse.json([], { status: 200 });

//   const profile = await prisma.profile.findUnique({ where: { userId: user.id } });
//   if (!profile) return NextResponse.json([], { status: 200 });

//   const list = await prisma.annotation.findMany({
//     where: { profileId: profile.id },
//     orderBy: { createdAt: "desc" },
//   });
//   return NextResponse.json(list);
// }

// export async function POST(request: Request) {
//   const user = await currentUser();
//   if (!user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { snippet, comment } = await request.json();
//   if (!snippet || !comment) {
//     return NextResponse.json({ error: "Missing fields" }, { status: 400 });
//   }

//   const profile = await prisma.profile.findUnique({ where: { userId: user.id } });
//   if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

//   const ann = await prisma.annotation.create({
//     data: { profileId: profile.id, snippet, comment },
//   });
//   return NextResponse.json(ann);
// }

// src/app/api/annotations/route.ts
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

  const list = await prisma.annotation.findMany({
    where: { profileId: profile.id },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(list);
}

export async function POST(request: Request) {
  const user = await currentUser();
  if (!user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { snippet, comment } = await request.json();
  if (!snippet || !comment) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Upsert profile if missing
  const profile = await prisma.profile.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      name: user.firstName ?? "New User",
      isPublic: false,
    },
  });

  const ann = await prisma.annotation.create({
    data: { profileId: profile.id, snippet, comment },
  });
  return NextResponse.json(ann);
}
