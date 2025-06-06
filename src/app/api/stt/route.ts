import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  // parse incoming Multipart/FormData
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof Blob)) {
    return NextResponse.json(
      { error: "No audio file provided" },
      { status: 400 },
    );
  }

  try {
    // pass the Blob directly to the SDK
    const transcription = await openai.audio.transcriptions.create({
      file, // the Blob from formData
      model: "whisper-1",
    });

    return NextResponse.json({ text: transcription.text });
  } catch (err) {
    console.error("STT error:", err);
    return NextResponse.json(
      { error: "Whisper transcription failed" },
      { status: 500 },
    );
  }
}
