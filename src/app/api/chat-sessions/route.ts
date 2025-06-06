// src/app/api/chat-sessions/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

// // GET /api/chat-sessions
// export async function GET() {
//   // return _all_ sessions for now (you can filter by profile later)
//   const sessions = await prisma.chatSession.findMany({
//     orderBy: { createdAt: "desc" },
//   });
//   return NextResponse.json(sessions);
// }

export async function GET() {
  const user = await currentUser();
  if (!user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const profile = await prisma.profile.findUnique({
    where: { userId: user.id },
  });
  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  // 🔒 only sessions for *this* profile
  const sessions = await prisma.chatSession.findMany({
    where: { profileId: profile.id },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(sessions);
}

// POST /api/chat-sessions
export async function POST(req: Request) {
  const user = await currentUser();
  if (!user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const profile = await prisma.profile.findUnique({
    where: { userId: user.id },
  });
  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  const { name, topic } = await req.json();
  if (!name || !topic) {
    return NextResponse.json(
      { error: "Missing name or topic" },
      { status: 400 },
    );
  }

  const session = await prisma.chatSession.create({
    data: {
      name,
      topic,
      profileId: profile.id,
    },
  });

  return NextResponse.json(session);
}
