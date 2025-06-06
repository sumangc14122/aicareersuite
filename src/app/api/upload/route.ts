// src/app/api/upload/route.ts
import { NextResponse } from "next/server";
import { Buffer } from "buffer";

export async function POST(request: Request) {
  // Parse the multipart form
  const formData = await request.formData();
  const file = formData.get("file");
  if (!file || !(file instanceof Blob)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // Read as ArrayBuffer, convert to base64
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const dataUrl = `data:${file.type};base64,${buffer.toString("base64")}`;

  // Return a JSON with the data URI
  return NextResponse.json({ url: dataUrl });
}
