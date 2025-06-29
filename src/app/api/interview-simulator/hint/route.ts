// import { NextResponse } from 'next/server';
// import OpenAI from 'openai';

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
// export async function POST(req: Request) {
//   const { question, role, jobDescription, userInfo } = await req.json();
//   const hintPrompt = `
// Provide a concise 2–3 sentence STAR-formatted example answer for the question: "${question}".
// Context:
// Role: ${role}
// Job Description: ${jobDescription}
// Candidate Background: ${userInfo}
// `;
//   const resp = await openai.chat.completions.create({
//     model: 'gpt-3.5-turbo',
//     messages: [{ role: 'user', content: hintPrompt }],
//     temperature: 0.7,
//   });
//   const hint = resp.choices[0].message.content.trim();
//   return NextResponse.json({ hint });
// }

import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  const { question, role, jobDescription, userInfo } = await req.json();

  const hintPrompt = `
Provide a concise 2–3 sentence STAR-formatted example answer for:
"${question}"
Context:
- Role: ${role}
- Job Description: ${jobDescription}
- Candidate Background: ${userInfo}
`;

  const resp = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [{ role: "user", content: hintPrompt }],
    temperature: 0.7,
  });

  // return NextResponse.json({ hint: resp.choices[0].message.content.trim() });

  const content = resp.choices?.[0]?.message?.content;
  const hint = content?.trim() || "No hint generated.";

  return NextResponse.json({ hint });
}
