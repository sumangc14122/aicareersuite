import { NextResponse } from "next/server";
import openai from "@/lib/openai";

export async function POST(req: Request) {
  const { winner, loser } = await req.json();
  const prompt = `
You are an expert resume writer.
Improve this bullet to be more concise, impact-focused, and keyword-rich:

Bullet: "${winner}"

Use the loser bullet as context of what to avoid: "${loser}"
Return only the improved bullet single line.
`;
  const resp = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You rewrite resume bullets." },
      { role: "user", content: prompt },
    ],
  });
  const text = resp.choices[0].message?.content?.trim() || winner;
  return NextResponse.json(text);
}
