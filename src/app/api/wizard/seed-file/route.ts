import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import pdfParse from "pdf-parse/lib/pdf-parse.js";


export const config = { api: { bodyParser: false } };

export async function POST(req: Request) {
  try {
    // 1) Parse the multipart form
    const formData = await req.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "No file uploaded. Please attach a PDF or DOCX." },
        { status: 400 },
      );
    }

    // 2) Turn upload into Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // 3) Runtime-require the parsers
    const lower = file.name.toLowerCase();
    let text: string;
    if (lower.endsWith(".pdf")) {
      // const pdfParse = eval("require")("pdf-parse") as (
      //   buf: Buffer,
      // ) => Promise<{ text: string }>;
      // const parsed = await pdfParse(buffer);
//       const { default: pdfParse } = await import("pdf-parse");
// const parsed                = await pdfParse(buffer);
//       text = parsed.text;
const parsed = await pdfParse(buffer);
text = parsed.text;
    } else if (lower.endsWith(".docx") || lower.endsWith(".doc")) {
      const mammoth = eval("require")("mammoth") as {
        extractRawText: (opts: {
          buffer: Buffer;
        }) => Promise<{ value: string }>;
      };
      const { value } = await mammoth.extractRawText({ buffer });
      text = value;
    } else {
      return NextResponse.json(
        { error: "Unsupported file type. Only PDF or DOCX allowed." },
        { status: 400 },
      );
    }

    // 4) Send to OpenAI to parse into JSON
    const prompt = `
You are a parser. Given the full resume text, output JSON:
{
  "summary": "...",
  "workExperiences": [
    { "position":"", "company":"", "startDate":"YYYY-MM", "endDate":"YYYY-MM or Present", "bullets":["...", ...] }
  ],
  "educations": [
    { "degree":"", "school":"", "startDate":"YYYY-MM", "endDate":"YYYY-MM" }
  ],
  "skills":["...", "...", ...]
}

Resume text:
"""${text}"""
`;

    const aiRes = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
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

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      console.error("Invalid JSON from AI:", raw);
      return NextResponse.json(
        { error: "AI returned malformed JSON." },
        { status: 500 },
      );
    }

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("❌ seed-file error:", err);
    return NextResponse.json(
      { error: "Failed to process uploaded file." },
      { status: 500 },
    );
  }
}

// // src/app/api/wizard/seed-file/route.ts
// import { NextResponse } from "next/server";
// import { openai } from "@/lib/openai"; // Assuming this is your configured OpenAI client

// // REMOVE THE FOLLOWING LINE - IT IS DEPRECATED
// // export const config = { api: { bodyParser: false } };

// export async function POST(req: Request) {
//   try {
//     // 1) Parse the multipart form
//     const formData = await req.formData();
//     const file = formData.get("file"); // 'file' should be the name attribute of your file input

//     if (!(file instanceof File)) {
//       return NextResponse.json(
//         { error: "No file uploaded or file is not in the expected format. Please attach a PDF, DOC, or DOCX." },
//         { status: 400 },
//       );
//     }

//     // 2) Turn upload into Buffer
//     const buffer = Buffer.from(await file.arrayBuffer());

//     // 3) Runtime-require the parsers (consider static imports if possible for better tree-shaking and performance)
//     const lowerFileName = file.name.toLowerCase();
//     let text: string;

//     if (lowerFileName.endsWith(".pdf")) {
//       // Dynamically import pdf-parse
//       const pdfParseModule = await import("pdf-parse");
//       const pdfParse = pdfParseModule.default; // Access the default export
//       const parsed = await pdfParse(buffer);
//       text = parsed.text;
//     } else if (lowerFileName.endsWith(".docx") || lowerFileName.endsWith(".doc")) {
//       // Dynamically import mammoth
//       const mammothModule = await import("mammoth");
//       const mammoth = mammothModule.default; // Access the default export
//       const { value } = await mammoth.extractRawText({ buffer });
//       text = value;
//     } else {
//       return NextResponse.json(
//         { error: "Unsupported file type. Only PDF, DOC, or DOCX allowed." },
//         { status: 400 },
//       );
//     }

//     // 4) Send to OpenAI to parse into JSON
//     const prompt = `
// You are a parser. Given the full resume text, output JSON:
// {
//   "summary": "...",
//   "workExperiences": [
//     { "position":"", "company":"", "startDate":"YYYY-MM", "endDate":"YYYY-MM or Present", "bullets":["...", ...] }
//   ],
//   "educations": [
//     { "degree":"", "school":"", "startDate":"YYYY-MM", "endDate":"YYYY-MM" }
//   ],
//   "skills":["...", "...", ...]
// }

// Resume text:
// """${text}"""
// `;

//     const aiRes = await openai.chat.completions.create({
//       model: "gpt-4o-mini", // Or your preferred model
//       messages: [{ role: "user", content: prompt }],
//       temperature: 0,
//       // response_format: { type: "json_object" }, // Consider using JSON mode if supported by the model for more reliable JSON
//     });

//     const content = aiRes.choices[0]?.message?.content;

//     if (!content) {
//       return NextResponse.json(
//         { error: "No content in AI response." },
//         { status: 500 },
//       );
//     }

//     // Attempt to clean up potential markdown code fences for JSON
//     const raw = content
//       .replace(/^```(?:json)?\s*/, "") // Remove leading ```json or ```
//       .replace(/\s*```$/, "")        // Remove trailing ```
//       .trim();

//     let parsedJson;
//     try {
//       parsedJson = JSON.parse(raw);
//     } catch (e) {
//       console.error("Invalid JSON from AI:", raw, e);
//       return NextResponse.json(
//         { error: "AI returned malformed JSON. Please try re-uploading or ensure the document format is clean." },
//         { status: 500 },
//       );
//     }

//     return NextResponse.json(parsedJson);
//   } catch (err) {
//     console.error("❌ seed-file error:", err);
//     // Provide a more generic error to the client for security
//     // let errorMessage = "Failed to process uploaded file.";
//     // if (err instanceof Error) {
//     //     // You might want to log err.message server-side but not expose it directly
//     //     // if it contains sensitive details.
//     //     console.error("Detailed error:", err.message);
//     // }
//     // return NextResponse.json(
//     //   { error: errorMessage },
//     //   { status: 500 },
//     // );
//   }
// }
