import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";

export async function POST(req: Request) {
  const { text } = await req.json();

  const prompt = `
You are a parser. Given the full resume text, output JSON:
{
  "summary": "...",
  "workExperiences": [
    { "position":"", "company":"", "startDate":"YYYY-MM", "endDate":"YYYY-MM or Present", "bullets":["..."] }
  ],
  "educations": [
    { "degree":"", "school":"", "startDate":"YYYY-MM", "endDate":"YYYY-MM" }
  ],
  "skills": ["..."]
}

Resume text:
"""${text}"""
`;

  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0,
  });

  const content = res.choices[0]?.message?.content;

  if (!content) {
    return NextResponse.json(
      { error: "No content in OpenAI response." },
      { status: 500 },
    );
  }

  const cleanContent = content
    .replace(/```(?:json)?/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    const parsed = JSON.parse(cleanContent);
    return NextResponse.json(parsed);
  } catch (e) {
    console.error("❌ JSON parse error:", e, "\nRaw content:\n", cleanContent);
    return NextResponse.json(
      { error: "OpenAI returned invalid JSON." },
      { status: 500 },
    );
  }
}
