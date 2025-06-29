// // // // File: src/app/api/interview-simulator/feedback/route.ts
// // // import { NextResponse } from 'next/server';
// // // import OpenAI from 'openai';

// // // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
// // // export async function POST(req: Request) {
// // //   const { role, jobDescription, userInfo, question, transcript } = await req.json();
// // //   const feedbackPrompt = `
// // // You are an expert interviewer coach. Context:
// // // - Role: ${role}
// // // - Job Description: ${jobDescription}
// // // - Candidate Background: ${userInfo}

// // // Question:
// // // ${question}

// // // Candidate Response:
// // // ${transcript}

// // // You are an expert interviewer coach. Reply with **only valid JSON** matching exactly this schema—no markdown, no extra keys:
// // // {
// // //   "situation": "...",
// // //   "task": "...",
// // //   "action": "...",
// // //   "result": "...",
// // //   "suggestions": ["...","...","...","...","..."],
// // //   "score": 0-100,
// // //   "eq": {"confidence":0-100, "enthusiasm":0-100, "empathy":0-100},
// // //   "isAIAnswer": true or false
// // // }
// // // `;
// // //   const resp = await openai.chat.completions.create({
// // //     model: 'gpt-4-turbo',
// // //     messages: [{ role: 'user', content: feedbackPrompt }],
// // //     temperature: 0.6,
// // //   });
// // //   const raw = resp.choices[0].message.content.trim().replace(/```json|```/g, '');
// // //   let data;
// // //   try { data = JSON.parse(raw); } catch {
// // //     data = { situation: '', task: '', action: '', result: raw, suggestions: [], score: 0, eq: { confidence: 0, enthusiasm: 0, empathy: 0 }, isAIAnswer: false };
// // //   }
// // //   return NextResponse.json(data);
// // // }

// // import { NextResponse } from 'next/server';
// // import OpenAI from 'openai';

// // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

// // export async function POST(req: Request) {
// //   const { role, jobDescription, userInfo, question, transcript } = await req.json();

// //   const feedbackPrompt = `
// // You are an expert interviewer coach. Reply with ONLY valid JSON matching this schema (no markdown):

// // {
// //   "situation": string,
// //   "task": string,
// //   "action": string,
// //   "result": string,
// //   "suggestions": [string],
// //   "score": number,
// //   "eq": { "confidence": number, "enthusiasm": number, "empathy": number },
// //   "isAIAnswer": boolean
// // }

// // Context:
// // - Role: ${role}
// // - Job Description: ${jobDescription}
// // - Candidate Background: ${userInfo}

// // Question:
// // ${question}

// // Candidate Response:
// // ${transcript}
// // `;

// //   const resp = await openai.chat.completions.create({
// //     model: 'gpt-3.5-turbo',
// //     messages: [{ role: 'user', content: feedbackPrompt }],
// //     temperature: 0.6,
// //   });

// //   // Strip any ``` fences and parse JSON
// //   const raw = resp.choices[0].message.content
// //     .replace(/```json|```/g, '')
// //     .trim();

// //   let data: any;
// //   try {
// //     data = JSON.parse(raw);
// //   } catch {
// //     data = {
// //       situation: '',
// //       task: '',
// //       action: '',
// //       result: raw,
// //       suggestions: [],
// //       score: 0,
// //       eq: { confidence: 0, enthusiasm: 0, empathy: 0 },
// //       isAIAnswer: false,
// //     };
// //   }

// //   // **Normalize** isAIAnswer if it came back as string
// //   if (typeof data.isAIAnswer === 'string') {
// //     data.isAIAnswer = data.isAIAnswer.trim().toLowerCase() === 'true'
// //       || data.isAIAnswer.trim().toUpperCase() === 'YES';
// //   }

// //   return NextResponse.json(data);
// // }

// import { NextResponse } from 'next/server';
// import OpenAI from 'openai';

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

// export async function POST(req: Request) {
//   const { role, jobDescription, userInfo, question, transcript } = await req.json();

//   const feedbackPrompt = `
// You are an expert interviewer coach. Reply with ONLY valid JSON matching this schema (no markdown):

// {
//   "situation": string,
//   "task": string,
//   "action": string,
//   "result": string,
//   "suggestions": [string],
//   "score": number,
//   "eq": { "confidence": number, "enthusiasm": number, "empathy": number },
//   "competencies": {
//     "technical": number,
//     "behavioral": number,
//     "situational": number,
//     "leadership": number,
//     "communication": number,
//     "cultureFit": number
//   },
//   "isAIAnswer": boolean
// }

// Context:
// - Role: ${role}
// - Job Description: ${jobDescription}
// - Candidate Background: ${userInfo}

// Question:
// ${question}

// Candidate Response:
// ${transcript}
// `;

//   const resp = await openai.chat.completions.create({
//     model: 'gpt-4-turbo',
//     messages: [{ role: 'user', content: feedbackPrompt }],
//     temperature: 0.6,
//   });

//   const raw = resp.choices[0].message.content
//     .replace(/```json|```/g, '')
//     .trim();

//   let data: any;
//   try {
//     data = JSON.parse(raw);
//   } catch {
//     data = {
//       situation: '',
//       task: '',
//       action: '',
//       result: raw,
//       suggestions: [],
//       score: 0,
//       eq: { confidence: 0, enthusiasm: 0, empathy: 0 },
//       isAIAnswer: false,
//     };
//   }

//   // Normalize flag
//   if (typeof data.isAIAnswer === 'string') {
//     data.isAIAnswer = ['true','yes'].includes(data.isAIAnswer.trim().toLowerCase());
//   }

//   return NextResponse.json(data);
// }

import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  const { role, jobDescription, userInfo, question, transcript } =
    await req.json();

  const feedbackPrompt = `
You are an expert interviewer coach. Reply with ONLY valid JSON matching this schema (no markdown):

{
  "situation": string,
  "task": string,
  "action": string,
  "result": string,
  "suggestions": [string],
  "score": number,
  "eq": { "confidence": number, "enthusiasm": number, "empathy": number },
  "competencies": {
    "technical": number,
    "behavioral": number,
    "situational": number,
    "leadership": number,
    "communication": number,
    "cultureFit": number
  },
  "isAIAnswer": boolean
}

Context:
- Role: ${role}
- Job Description: ${jobDescription}
- Candidate Background: ${userInfo}

Question:
${question}

Candidate Response:
${transcript}
`;

  const resp = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [{ role: "user", content: feedbackPrompt }],
    temperature: 0.6,
  });

  interface FeedbackResponse {
    situation: string;
    task: string;
    action: string;
    result: string;
    suggestions: string[];
    score: number;
    eq: {
      confidence: number;
      enthusiasm: number;
      empathy: number;
    };
    competencies: {
      technical: number;
      behavioral: number;
      situational: number;
      leadership: number;
      communication: number;
      cultureFit: number;
    };
    isAIAnswer: boolean | string;
  }

  // const raw = resp.choices[0].message.content
  //   .replace(/```json|```/g, "")
  //   .trim();

  const content = resp.choices?.[0]?.message?.content;
  const raw = content ? content.replace(/```json|```/g, "").trim() : "";

  let data: FeedbackResponse;
  try {
    data = JSON.parse(raw);
  } catch {
    data = {
      situation: "",
      task: "",
      action: "",
      result: raw,
      suggestions: [],
      score: 0,
      eq: { confidence: 0, enthusiasm: 0, empathy: 0 },
      competencies: {
        technical: 0,
        behavioral: 0,
        situational: 0,
        leadership: 0,
        communication: 0,
        cultureFit: 0,
      },
      isAIAnswer: false,
    };
  }

  // // let data: any;
  // let data: FeedbackResponse;

  // try {
  //   data = JSON.parse(raw);
  // } catch {
  //   data = {
  //     situation: '',
  //     task: '',
  //     action: '',
  //     result: raw,
  //     suggestions: [],
  //     score: 0,
  //     eq: { confidence: 0, enthusiasm: 0, empathy: 0 },
  //     competencies: {
  //       technical: 0,
  //       behavioral: 0,
  //       situational: 0,
  //       leadership: 0,
  //       communication: 0,
  //       cultureFit: 0,
  //     },
  //     isAIAnswer: false,
  //   };
  // }

  // Normalize isAIAnswer
  if (typeof data.isAIAnswer === "string") {
    data.isAIAnswer = ["true", "yes"].includes(
      data.isAIAnswer.trim().toLowerCase(),
    );
  }

  return NextResponse.json(data);
}
