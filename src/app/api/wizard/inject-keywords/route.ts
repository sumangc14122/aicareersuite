import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";

export async function POST(req: Request) {
  const { resume, missingKeywords, level, injectSummary, injectSkills } =
    await req.json();

  const intensity = ["low", "medium", "high"][Math.min(2, Math.max(0, level))];
  const sections = [];
  if (injectSummary) sections.push("Summary");
  if (injectSkills) sections.push("Skills array");
  if (!sections.length) sections.push("Summary", "Skills array");

  const prompt = `
You are a JSON generator. ONLY return the updated résumé JSON, no extra words.

Résumé JSON:
${JSON.stringify(resume, null, 2)}

Missing keywords:
${JSON.stringify(missingKeywords)}

Inject those keywords into the résumé’s ${sections.join(" and ")} 
using a ${intensity}-intensity approach:
- low → sprinkle a few naturally
- medium → add a moderate number
- high → weave them throughout

Respond with only the full résumé JSON.
`;

  const aiRes = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are a JSON generator. ONLY return JSON.",
      },
      { role: "user", content: prompt.trim() },
    ],
    temperature: 0.7,
  });

  const content = aiRes.choices[0]?.message?.content;

  if (!content) {
    return NextResponse.json(
      { error: "No content in AI response." },
      { status: 500 },
    );
  }

  const raw = content
    .replace(/```(?:json)?/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    const updated = JSON.parse(raw);
    return NextResponse.json(updated);
  } catch {
    console.error("inject-keywords parse error", raw);
    return NextResponse.json(
      { error: "Invalid JSON from AI" },
      { status: 500 },
    );
  }
}
