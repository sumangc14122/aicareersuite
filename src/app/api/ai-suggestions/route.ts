// app/api/ai-suggestions/route.ts
import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 300,
    });

    return NextResponse.json({ text: completion.choices[0].message.content });
  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json({ error: "AI request failed." }, { status: 500 });
  }
}
