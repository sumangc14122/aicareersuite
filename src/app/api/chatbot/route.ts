// // // import { NextResponse } from "next/server";
// // // import { OpenAI } from "openai";
// // // import { currentUser } from "@clerk/nextjs/server";
// // // import prisma from "@/lib/prisma";

// // // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

// // // export async function POST(req: Request) {
// // //   const user = await currentUser();
// // //   if (!user?.id) {
// // //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// // //   }

// // //   // Check subscription
// // //   const profile = await prisma.profile.findUnique({ where: { userId: user.id } });
// // //   if (!profile?.isPro) {
// // //     return NextResponse.json({ error: "Pro subscription required" }, { status: 402 });
// // //   }

// // //   const { message } = await req.json();
// // //   if (!message) {
// // //     return NextResponse.json({ error: "Missing message" }, { status: 400 });
// // //   }

// // //   const chat = await openai.chat.completions.create({
// // //     model: "gpt-3.5-turbo",
// // //     messages: [{ role: "user", content: message }],
// // //   });
// // //   const reply = chat.choices[0].message?.content?.trim() || "";

// // //   return NextResponse.json({ reply });
// // // }

// // import { NextResponse } from "next/server";
// // import prisma from "@/lib/prisma";
// // import { currentUser } from "@clerk/nextjs/server";
// // // import { OpenAI } from "openai";

// // // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

// // export async function POST(req: Request) {
// //   const user = await currentUser();
// //   if (!user?.id) {
// //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// //   }

// //   // ← bypass in dev
// //   let isPro = false;
// //   if (process.env.NODE_ENV === "development") {
// //     isPro = true;
// //   } else {
// //     const profile = await prisma.profile.findUnique({
// //       where: { userId: user.id },
// //     });
// //     isPro = !!profile?.isPro;
// //   }

// //   if (!isPro) {
// //     return NextResponse.json(
// //       { error: "Pro subscription required" },
// //       { status: 402 },
// //     );
// //   }

// //   // const { message } = await req.json();
// //   // … rest of your GPT logic …
// // }

// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { currentUser } from "@clerk/nextjs/server";

// // Removed: import { OpenAI } from "openai";

// // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

// export async function POST(req: Request) {
//   void req;
//   const user = await currentUser();
//   if (!user?.id) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   // ← bypass in dev
//   let isPro = false;
//   if (process.env.NODE_ENV === "development") {
//     isPro = true;
//   } else {
//     const profile = await prisma.profile.findUnique({
//       where: { userId: user.id },
//     });
//     isPro = !!profile?.isPro;
//   }

//   if (!isPro) {
//     return NextResponse.json(
//       { error: "Pro subscription required" },
//       { status: 402 },
//     );
//   }

//   // const { message } = await req.json();
//   // … rest of your GPT logic …
// }

import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const user = await currentUser();
  if (!user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { message } = await req.json();
  if (!message) {
    return NextResponse.json({ error: "Missing message" }, { status: 400 });
  }

  // Placeholder for chat logic (replace with actual AI service if needed)
  const reply = `You said: ${message}. I'm a simple echo bot for now!`;

  return NextResponse.json({ reply });
}
