// // // create a new chat‐session
// // import { NextResponse } from "next/server";
// // import prisma from "@/lib/prisma";

// // export async function POST(req: Request) {
// //   const { name, topic } = await req.json();
// //   const session = await prisma.chatSession.create({
// //     data: { name, topic },
// //   });
// //   return NextResponse.json(session);
// // }

// // export async function GET() {
// //   // list all sessions (you may want to filter by user later)
// //   const sessions = await prisma.chatSession.findMany({
// //     orderBy: { createdAt: "desc" },
// //   });
// //   return NextResponse.json(sessions);
// // }

// // app/api/chat-sessions/[sessionId]/route.ts
// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { currentUser } from "@clerk/nextjs/server";

// export async function DELETE(
//   req: Request,
//   { params }: { params: { sessionId: string } }
// ) {
//   // 🚨 you must await params in App Router
//   const { sessionId } = await params;

//   // only allow the session's owner to delete
//   const user = await currentUser();
//   if (!user?.id) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   // find the session & verify profile match
//   const session = await prisma.chatSession.findUnique({
//     where: { id: sessionId },
//   });
//   if (!session || session.profileId !== user.id) {
//     return NextResponse.json({ error: "Not found or forbidden" }, { status: 404 });
//   }

//   // delete all messages first (optional if you have cascade delete)
//   await prisma.chatMessage.deleteMany({
//     where: { sessionId },
//   });

//   // then delete the session
//   await prisma.chatSession.delete({
//     where: { id: sessionId },
//   });

//   return NextResponse.json({ success: true });
// }

// // src/app/api/chat-sessions/[sessionId]/route.ts
// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { currentUser } from "@clerk/nextjs/server";

// export async function DELETE(
//   req: Request,
//   context: { params: { sessionId: string } },
// ) {
//   // 1️⃣ pull the raw params out
//   const { sessionId } = await context.params;

//   // 2️⃣ ensure user is signed in
//   const user = await currentUser();
//   if (!user?.id) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   // 3️⃣ load this user’s profile
//   const profile = await prisma.profile.findUnique({
//     where: { userId: user.id },
//   });
//   if (!profile) {
//     return NextResponse.json({ error: "Profile not found" }, { status: 404 });
//   }

//   // 4️⃣ verify that chatSession exists & belongs to them
//   const session = await prisma.chatSession.findUnique({
//     where: { id: sessionId },
//   });
//   if (!session || session.profileId !== profile.id) {
//     return NextResponse.json(
//       { error: "Not found or forbidden" },
//       { status: 404 },
//     );
//   }

//   // 5️⃣ delete all its messages first (foreign‐key constraint)
//   await prisma.chatMessage.deleteMany({
//     where: { sessionId: sessionId },
//   });

//   // 6️⃣ delete the session itself
//   await prisma.chatSession.delete({
//     where: { id: sessionId },
//   });

//   return NextResponse.json({ success: true }, { status: 200 });
// }

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ sessionId: string }> },
) {
  // 1️⃣ Pull the raw params out
  const { sessionId } = await params;

  // 2️⃣ Ensure user is signed in
  const user = await currentUser();
  if (!user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 3️⃣ Load this user’s profile
  const profile = await prisma.profile.findUnique({
    where: { userId: user.id },
  });
  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  // 4️⃣ Verify that chatSession exists & belongs to them
  const session = await prisma.chatSession.findUnique({
    where: { id: sessionId },
  });
  if (!session || session.profileId !== profile.id) {
    return NextResponse.json(
      { error: "Not found or forbidden" },
      { status: 404 },
    );
  }

  // 5️⃣ Delete all its messages first (foreign-key constraint)
  await prisma.chatMessage.deleteMany({
    where: { sessionId: sessionId },
  });

  // 6️⃣ Delete the session itself
  await prisma.chatSession.delete({
    where: { id: sessionId },
  });

  return NextResponse.json({ success: true }, { status: 200 });
}
