// // // // src/app/api/resume-suggestions/route.ts
// // // import { NextResponse } from "next/server";
// // // import prisma from "@/lib/prisma";
// // // import { currentUser } from "@clerk/nextjs/server";
// // // import { OpenAI } from "openai";

// // // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// // // export async function POST(req: Request) {

// // //     const user = await currentUser();
// // //     if (!user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

// // //   try {
// // //     const { snippet } = await req.json();
// // //     if (!snippet) {
// // //       return NextResponse.json({ error: "No text selected" }, { status: 400 });
// // //     }

// // //     const chat = await openai.chat.completions.create({
// // //       model: "gpt-3.5-turbo",
// // //       messages: [{
// // //         role: "user",
// // //         content: `
// // // You are an AI Resume Coach. Rewrite this resume bullet to be more concise and impactful. ONLY return the rewritten bullet (no explanation):

// // // "${snippet}"
// // //         `.trim(),
// // //       }],
// // //     });

// // //     const text = chat.choices[0].message?.content?.trim() ?? "";

// // //     const suggestion = chat.choices[0].message?.content?.trim() ?? "";
// // //     const profile = await prisma.profile.findUnique({ where: { userId: user.id } });
// // //     if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

// // //     // 5) persist suggestion
// // //     const record = await prisma.suggestion.create({
// // //         data: {
// // //           profileId: profile.id,
// // //           snippet,
// // //           suggestion: text,
// // //         },
// // //       })

// // //       // 6) return both text + new record
// // //       return NextResponse.json({
// // //         id: record.id,
// // //         snippet,
// // //         suggestion: text,
// // //         createdAt: record.createdAt,
// // //       })

// // //     return NextResponse.json({ suggestion });
// // //   } catch (err) {
// // //     console.error("[resume-suggestions] error:", err);
// // //     return NextResponse.json(
// // //       { error: "Failed to get suggestion" },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }

// // // src/app/api/resume-suggestions/route.ts
// // import { NextResponse } from "next/server";
// // import prisma from "@/lib/prisma";
// // import { currentUser } from "@clerk/nextjs/server";
// // import { OpenAI } from "openai";

// // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

// // export async function GET() {
// //   // Return all past suggestions for this user
// //   const user = await currentUser();
// //   if (!user?.id) return NextResponse.json([], { status: 200 });
// //   const profile = await prisma.profile.findUnique({ where: { userId: user.id } });
// //   if (!profile) return NextResponse.json([], { status: 200 });

// //   const list = await prisma.suggestion.findMany({
// //     where: { profileId: profile.id },
// //     orderBy: { createdAt: "desc" },
// //   });
// //   return NextResponse.json(list);
// // }

// // export async function POST(request: Request) {
// //   const user = await currentUser();
// //   if (!user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

// //   const { snippet } = await request.json();
// //   if (!snippet) return NextResponse.json({ error: "Missing snippet" }, { status: 400 });

// //   // Call OpenAI
// //   const chat = await openai.chat.completions.create({
// //     model: "gpt-3.5-turbo",
// //     messages: [
// //       {
// //         role: "user",
// //         content: `You are an AI Resume Coach. Rewrite this resume bullet to be more concise and impactful. ONLY return the rewritten bullet (no explanation):\n\n"${snippet}"`,
// //       },
// //     ],
// //   });
// //   const suggestion = chat.choices[0].message?.content?.trim() || "";

// //   // Persist
// //   const profile = await prisma.profile.findUnique({ where: { userId: user.id } });
// //   if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

// //   const record = await prisma.suggestion.create({
// //     data: { profileId: profile.id, snippet, suggestion },
// //   });

// //   return NextResponse.json({
// //     id: record.id,
// //     snippet: record.snippet,
// //     suggestion: record.suggestion,
// //     createdAt: record.createdAt,
// //   });
// // }

// // src/app/api/resume-suggestions/route.ts
// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { currentUser } from "@clerk/nextjs/server";
// import { OpenAI } from "openai";

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

// export async function POST(request: Request) {
//   const user = await currentUser();
//   if (!user?.id) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }
//   const { snippet } = await request.json();
//   if (!snippet) {
//     return NextResponse.json({ error: "Missing snippet" }, { status: 400 });
//   }

//   // 1) Call OpenAI
//   const chat = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     messages: [
//       {
//         role: "user",
//         content: `You are an AI Resume Coach. Rewrite this resume bullet to be more concise and impactful. ONLY return the rewritten bullet (no explanation):\n\n"${snippet}"`,
//       },
//     ],
//   });
//   const suggestionText = chat.choices[0].message?.content?.trim() || "";

//   // 2) Upsert profile so we always have one
//   const profile = await prisma.profile.upsert({
//     where: { userId: user.id },
//     update: {},
//     create: {
//       userId: user.id,
//       name: user.firstName ?? "New User",
//       isPublic: false,
//     },
//   });

//   // 3) Persist the suggestion
//   const record = await prisma.suggestion.create({
//     data: { profileId: profile.id, snippet, suggestion: suggestionText },
//   });

//   return NextResponse.json({
//     id: record.id,
//     snippet: record.snippet,
//     suggestion: record.suggestion,
//     createdAt: record.createdAt,
//   });
// }

// src/app/api/resume-suggestions/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function GET() {
  const user = await currentUser();
  if (!user?.id) return NextResponse.json([], { status: 200 });

  const profile = await prisma.profile.findUnique({
    where: { userId: user.id },
  });
  if (!profile) return NextResponse.json([], { status: 200 });

  const list = await prisma.suggestion.findMany({
    where: { profileId: profile.id },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(list);
}

export async function POST(request: Request) {
  const user = await currentUser();
  if (!user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { snippet } = await request.json();
  if (!snippet) {
    return NextResponse.json({ error: "Missing snippet" }, { status: 400 });
  }

  // Call OpenAI
  const chat = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `You are an AI Resume Coach. Rewrite this resume bullet to be more concise and impactful. ONLY return the rewritten bullet (no explanation):\n\n"${snippet}"`,
      },
    ],
  });
  const suggestionText = chat.choices[0].message?.content?.trim() || "";

  // Upsert profile
  const profile = await prisma.profile.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      name: user.firstName ?? "New User",
      isPublic: false,
    },
  });

  // Persist suggestion
  const record = await prisma.suggestion.create({
    data: { profileId: profile.id, snippet, suggestion: suggestionText },
  });

  return NextResponse.json({
    id: record.id,
    snippet: record.snippet,
    suggestion: record.suggestion,
    createdAt: record.createdAt,
  });
}
