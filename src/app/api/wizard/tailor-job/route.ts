// src/app/api/wizard/tailor-job/route.ts
import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";

export async function POST(req: Request) {
  try {
    const { resume, jobDescription } = await req.json();
    const prompt = `
      SYSTEM:
      You are “ATS-Genius v2”, a seasoned resume optimizer and career-coach
      who writes in concise, results-oriented language (active verbs, numbers,
      impact). Always follow the JSON schema provided and ensure the response is complete.
      Output ONLY the valid JSON object requested, without any surrounding text, backticks, or markdown.
      
      TASK:
      Given ➜ (A) the candidate resume JSON and ➜ (B) the target job-description,
      rewrite ONLY the following three fields in the JSON:
      
      • "summary"        →  3–4 punchy sentences (≈70 words max) that
                            emphasize the candidate’s strongest, *job-matching*
                            achievements and include ≥ 3 exact keywords /
                            phrases pulled from the job-description.
      
      • "workExperiences"[]."bullets"[]
                          →  rewrite EACH bullet for ALL work experience entries so that it:
                            – starts with a power verb
                            – quantifies impact when possible
                            – injects ≥ 1 relevant job keyword
                            – stays ≤ 25 words
                            Preserve bullet count, chronology, and ALL work experience entries.
      
      • "skills"         →  reorder so the 8–12 most
                            job-critical skills appear first
                            (exact casing from the job post if available, otherwise maintain original).
      
      Do NOT add new fields, remove existing ones, or omit any work experience entries.
      Return pure JSON that is valid against this schema, including ALL workExperiences:
      
      {
        "personal": { ... }, // Preserve this structure from input
        "summary":  "string",
        "skills":   ["string"],
        "workExperiences": [
          {
            "position": "string",
            "company":  "string",
            "bullets":  ["string"],
            "startDate": "string", // Or null/undefined if not present
            "endDate": "string"    // Or null/undefined if not present
          }
          // [Important] Repeat the same for ALL work experiences found in the input
        ],
        "educations": [ ... ],     // Preserve this structure from input
        "volunteering": [ ... ],   // Preserve this structure from input
        "certifications": [ ... ], // Preserve this structure from input
        "references": [ ... ]      // Preserve this structure from input
      }
      
      Ensure the response is complete and not truncated, including every work experience entry from the input JSON.
      The output must be a single, valid JSON object and nothing else.
      
      INPUT (A) résumé JSON:
      ${JSON.stringify(resume, null, 2)}
      
      INPUT (B) job description:
      """${jobDescription}"""
    `;

    // console.log("Sending prompt to OpenAI for tailoring...");
    const resp = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview", // Consider gpt-3.5-turbo-0125 or gpt-4-turbo-preview for better JSON adherence
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2, // Lower temperature for more deterministic JSON output
      // response_format: { type: "json_object" }, // Use this if your OpenAI client version supports it for GPT-4 Turbo and newer gpt-3.5-turbo
    });

    let raw = resp.choices[0].message.content?.trim() || "";
    // console.log("Raw OpenAI response:", raw);

    // More robust cleaning of potential markdown code blocks
    if (raw.startsWith("```json")) {
      raw = raw.substring(7);
    } else if (raw.startsWith("```")) {
      raw = raw.substring(3);
    }
    if (raw.endsWith("```")) {
      raw = raw.substring(0, raw.length - 3);
    }
    raw = raw.trim(); // Trim again after removing backticks

    let tailored;
    try {
      tailored = JSON.parse(raw);
    } catch {
      console.error("JSON Parse Error for OpenAI response:");
      console.error("Problematic raw string from OpenAI:", raw);
      // Optionally, try to fix common JSON issues (e.g., trailing commas) here if you want to be very robust,
      // but it's complex. Better to get OpenAI to output valid JSON.
      return NextResponse.json(
        {
          error: "Failed to parse AI response as JSON.",
          rawResponse: raw,
        },
        { status: 500 },
      );
    }

    // console.log("Successfully parsed tailored JSON.");
    return NextResponse.json(tailored);
  } catch (error: unknown) {
    console.error("Error in /api/wizard/tailor-job:", error);
    return NextResponse.json(
      {
        error: "An error occurred during resume tailoring.",
      },
      { status: 500 },
    );
  }
}
