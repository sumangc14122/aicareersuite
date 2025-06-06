// src/app/api/wizard/ats-score/route.ts
import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";

export async function POST(req: Request) {
  const { resume, jobDescription } = await req.json();

  // Build a prompt for GPT to evaluate ATS match
  const prompt = `
You are an ATS evaluator. Given this parsed resume JSON and a job description, 
output JSON with:
- "score": integer 0–100 representing how well the resume matches (keywords & experience)
- "missingKeywords": array of important keywords in the job description NOT found in the resume
- "extraKeywords": array of keywords in the resume that don't appear in the job description but could be valuable

Resume JSON:
${JSON.stringify(resume, null, 2)}

Job Description:
"""${jobDescription}"""
`;

  const aiRes = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0,
  });

  // Strip code fences if any
  // let raw = aiRes.choices[0].message.content.trim();
  // raw = raw.replace(/```(?:json)?/g, "").replace(/```/g, "").trim();

  const content = aiRes.choices[0]?.message?.content;

  if (!content) {
    return NextResponse.json(
      { error: "No content in AI response." },
      { status: 500 },
    );
  }

  let raw = content.trim();
  raw = raw
    .replace(/```(?:json)?/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    const parsed = JSON.parse(raw);
    return NextResponse.json(parsed);
  } catch {
    console.error("ATS JSON parse error:", raw);
    return NextResponse.json(
      { error: "Failed to parse ATS score response." },
      { status: 500 },
    );
  }
}
