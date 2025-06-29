// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { currentUser } from "@clerk/nextjs/server";

// // export async function DELETE(
// //   req: Request,
// //   { params }: { params: { sessionId: string; messageId: string } }
// // ) {
// //   // ✅ here, params.sessionId and params.messageId are just strings
// //   const { sessionId, messageId } = params;

// export async function DELETE(
//   req: Request,
//   { params }: { params: { sessionId: string; messageId: string } },
// ) {
//   // await the params proxy before reading
//   const { sessionId, messageId } = await params;

//   const user = await currentUser();
//   if (!user?.id) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   // authorize: make sure the session belongs to this user
//   const profile = await prisma.profile.findUnique({
//     where: { userId: user.id },
//   });
//   const session = await prisma.chatSession.findUnique({
//     where: { id: sessionId },
//   });
//   if (!profile || !session || session.profileId !== profile.id) {
//     return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//   }

//   // delete the message
//   await prisma.chatMessage.delete({
//     where: { id: messageId },
//   });

//   return NextResponse.json({ success: true });
// }

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ sessionId: string; messageId: string }> },
) {
  const { sessionId, messageId } = await params;

  const user = await currentUser();
  if (!user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Authorize: make sure the session belongs to this user
  const profile = await prisma.profile.findUnique({
    where: { userId: user.id },
  });
  const session = await prisma.chatSession.findUnique({
    where: { id: sessionId },
  });
  if (!profile || !session || session.profileId !== profile.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Delete the message
  await prisma.chatMessage.delete({
    where: { id: messageId },
  });

  return NextResponse.json({ success: true });
}
