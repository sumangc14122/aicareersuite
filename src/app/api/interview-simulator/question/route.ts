// // import { NextResponse } from "next/server";
// // import OpenAI from "openai";

// // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

// // export async function POST(req: Request) {
// //   const { role, questionNumber } = await req.json();

// //   const prompt = `
// //     Provide a relevant and engaging interview question (${questionNumber}/5) for the position of "${role}".
// //     Each question should explore different competencies clearly (technical, behavioural, situational).
// //   `;

// //   const completion = await openai.chat.completions.create({
// //     model: "gpt-3.5-turbo",
// //     messages: [{ role: "user", content: prompt }],
// //     temperature: 0.7,
// //   });

// //   const question = completion.choices[0].message.content.trim();
// //   return NextResponse.json({ question });
// // }

// import { NextResponse } from 'next/server';
// import OpenAI from 'openai';

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

// export async function POST(req: Request) {
//   const { role, jobDescription, userInfo, questionNumber } = await req.json();

//   const prompt = `
// You are an expert interview coach.
// Session details:
// • Role: ${role}
// • Job description: ${jobDescription}
// • Candidate background: ${userInfo}
// Now generate question ${questionNumber}/5:
// Focus on different competencies (technical, behavioural, situational) tailored to the above context.
//   `.trim();

//   const resp = await openai.chat.completions.create({
//     model: 'gpt-3.5-turbo',
//     messages: [{ role: 'user', content: prompt }],
//     temperature: 0.7,
//   });
//   const question = resp.choices[0].message.content.trim();

//   return NextResponse.json({ question });
// }

import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  const { role, jobDescription, userInfo, questionNumber, persona } =
    await req.json();

  const prompt = `
You are now acting as the interviewer with the persona: "${persona}".
Context:
- Role: ${role}
- Job Description: ${jobDescription}
- Candidate Background: ${userInfo}

Please generate a unique, relevant interview question (${questionNumber}/5) 
tailored to that persona’s style (e.g. jargon, tone, era-specific for Legacy modes).
Respond with the question text only.
  `.trim();

  const resp = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  // const question = resp.choices[0].message.content.trim();
  // return NextResponse.json({ question });

  const content = resp.choices?.[0]?.message?.content;
  const question = content?.trim() || "No question generated.";

  return NextResponse.json({ question });
}
