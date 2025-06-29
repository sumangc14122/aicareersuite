import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";

export async function POST(req: Request) {
  const { html } = await req.json();
  if (!html || html.length < 10) {
    return NextResponse.json(
      { error: "Please paste at least some LinkedIn profile HTML or text." },
      { status: 400 },
    );
  }

  // Strip tags
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .slice(0, 20000);

  const prompt = `
You are a LinkedIn parser. Extract these fields from this profile text:
- summary
- workExperiences: [{position, company, startDate, endDate, bullets[]}, …]
- educations: [{degree, school, startDate, endDate}, …]
- skills: []

Respond **ONLY** in JSON matching exactly that shape.
  
Profile text:
"""${text}"""
  `;

  const resp = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0,
  });

  const content = resp.choices[0]?.message?.content;

  if (!content) {
    return NextResponse.json(
      { error: "No content in GPT response." },
      { status: 500 },
    );
  }

  const raw = content
    .replace(/```(?:json)?/g, "")
    .replace(/```/g, "")
    .trim();

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    console.error("❌ GPT JSON parse error:", e, "\nRaw:\n", raw);
    return NextResponse.json(
      {
        error:
          "GPT returned invalid JSON. Please try again or adjust your input.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json(parsed);
}
