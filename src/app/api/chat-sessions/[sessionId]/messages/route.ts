// // src/app/api/chat-sessions/[sessionId]/messages/route.ts
// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { currentUser } from "@clerk/nextjs/server";
// import { OpenAI } from "openai";

// // GET messages in a session
// export async function GET(
//   _req: Request,
//   // { params }: { params: Promise<{ sessionId: string }> },
//   { params }: { params: { sessionId: string } }

// ) {
//   // unpack the promise-based params
//   const { sessionId } =  params;

//   // 1) verify session exists
//   const session = await prisma.chatSession.findUnique({
//     where: { id: sessionId },
//   });
//   if (!session) {
//     return NextResponse.json([], { status: 200 });
//   }

//   // 2) (optional) enforce ownership
//   const user = await currentUser();
//   if (!user?.id) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }
//   const profile = await prisma.profile.findUnique({
//     where: { userId: user.id },
//   });
//   if (!profile || profile.id !== session.profileId) {
//     return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//   }

//   // 3) fetch the messages
//   const messages = await prisma.chatMessage.findMany({
//     where: { sessionId },
//     orderBy: { createdAt: "asc" },
//   });

//   return NextResponse.json(messages);
// }

// // POST a new message (and have the AI reply)
// export async function POST(
//   req: Request,
//   // { params }: { params: Promise<{ sessionId: string }> },
//   { params }: { params: { sessionId: string } }

// ) {
//   const { sessionId } = params;
//   const { content } = await req.json();
//   if (!content) {
//     return NextResponse.json({ error: "Missing content" }, { status: 400 });
//   }

//   // verify session & ownership
//   const session = await prisma.chatSession.findUnique({
//     where: { id: sessionId },
//   });
//   if (!session) {
//     return NextResponse.json({ error: "Session not found" }, { status: 404 });
//   }
//   const user = await currentUser();
//   if (!user?.id) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }
//   const profile = await prisma.profile.findUnique({
//     where: { userId: user.id },
//   });
//   if (!profile || profile.id !== session.profileId) {
//     return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//   }

//   // save the user's message
//   const userMessage = await prisma.chatMessage.create({
//     data: { sessionId, role: "user", content },
//   });

//   // call OpenAI
//   const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
//   const completion = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     messages: [
//       {
//         role: "system",
//         content:
//           "You are a professional career coach and technical interviewer when asked about coding or programming languages. Only answer job-related or interview questions. Always format responses with clear headings and numbered steps or bullet points. When asked for coding questions, generate 5 Python problems at the requested difficulty, each with:\n\n• **Problem #:** a concise problem statement.\n• **Solution:** a complete, working Python function.\n• **Explanation:** a brief walkthrough of the approach.\n\nAfter listing all, include a “Next Steps” section suggesting how to practice or expand on these problems.",
//       },
//       { role: "user", content },
//     ],
//     temperature: 0.7,
//     max_tokens: 500,
//   });
//   const aiContent = completion.choices[0].message.content;

//   // save the AI reply
//   const aiMessage = await prisma.chatMessage.create({
//     data: { sessionId, role: "assistant", content: aiContent },
//   });

//   // return both so the client can update immediately
//   return NextResponse.json([userMessage, aiMessage]);
// }

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { OpenAI } from "openai";

// GET messages in a session
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ sessionId: string }> },
) {
  // Unpack the promise-based params
  const { sessionId } = await params;

  // 1) Verify session exists
  const session = await prisma.chatSession.findUnique({
    where: { id: sessionId },
  });
  if (!session) {
    return NextResponse.json([], { status: 200 });
  }

  // 2) (Optional) Enforce ownership
  const user = await currentUser();
  if (!user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const profile = await prisma.profile.findUnique({
    where: { userId: user.id },
  });
  if (!profile || profile.id !== session.profileId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // 3) Fetch the messages
  const messages = await prisma.chatMessage.findMany({
    where: { sessionId },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(messages);
}

// POST a new message (and have the AI reply)
export async function POST(
  req: Request,
  { params }: { params: Promise<{ sessionId: string }> },
) {
  const { sessionId } = await params;
  const { content } = await req.json();
  if (!content) {
    return NextResponse.json({ error: "Missing content" }, { status: 400 });
  }

  // Verify session & ownership
  const session = await prisma.chatSession.findUnique({
    where: { id: sessionId },
  });
  if (!session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }
  const user = await currentUser();
  if (!user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const profile = await prisma.profile.findUnique({
    where: { userId: user.id },
  });
  if (!profile || profile.id !== session.profileId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Save the user's message
  const userMessage = await prisma.chatMessage.create({
    data: { sessionId, role: "user", content },
  });

  // Call OpenAI
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a professional career coach and technical interviewer when asked about coding or programming languages. Only answer job-related or interview questions. Always format responses with clear headings and numbered steps or bullet points. When asked for coding questions, generate 5 Python problems at the requested difficulty, each with:\n\n• **Problem #:** a concise problem statement.\n• **Solution:** a complete, working Python function.\n• **Explanation:** a brief walkthrough of the approach.\n\nAfter listing all, include a “Next Steps” section suggesting how to practice or expand on these problems.",
      },
      { role: "user", content },
    ],
    temperature: 0.7,
    max_tokens: 500,
  });
  const aiContent = completion.choices[0].message.content;

  // Save the AI reply
  const aiMessage = await prisma.chatMessage.create({
    data: { sessionId, role: "assistant", content: aiContent! },
  });

  // Return both so the client can update immediately
  return NextResponse.json([userMessage, aiMessage]);
}
