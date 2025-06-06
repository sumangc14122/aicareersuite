// import { NextResponse } from "next/server";
// import OpenAI from "openai";

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

// export async function POST(req: Request) {
//   const { persona, question } = await req.json();

//   const prompt = `
// You are now role-playing as the candidate answering:
// "${question}"
// Use the persona "${persona}" to craft your answer.
// Then provide 2–3 bullet points on how well the interviewer asked that question
// (clarity, depth, relevance).
// Reply with JSON:
// {
//   "answer": string,
//   "questionFeedback": [string]
// }
// `;

//   const resp = await openai.chat.completions.create({
//     model: "gpt-4-turbo",
//     messages: [{ role: "user", content: prompt }],
//     temperature: 0.7,
//   });

//   let data;
//   try {
//     data = JSON.parse(resp.choices[0].message.content.trim());
//   } catch {
//     data = {
//       answer: resp.choices[0].message.content.trim(),
//       questionFeedback: [],
//     };
//   }

//   return NextResponse.json(data);
// }

import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  const { persona, question } = await req.json();

  const prompt = `
You are now role-playing as the candidate answering:
"${question}"
Use the persona "${persona}" to craft your answer.
Then provide 2–3 bullet points on how well the interviewer asked that question 
(clarity, depth, relevance).
Reply with JSON:
{ 
  "answer": string,
  "questionFeedback": [string]
}
`;

  const resp = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  const content = resp.choices?.[0]?.message?.content;
  const trimmed = content?.trim() || "";

  let data;
  try {
    data = JSON.parse(trimmed);
  } catch {
    data = {
      answer: trimmed,
      questionFeedback: [],
    };
  }

  return NextResponse.json(data);
}
