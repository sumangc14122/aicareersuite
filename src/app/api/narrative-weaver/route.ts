// // src/app/api/narrative-weaver/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { openai } from "@/lib/openai"; // Your OpenAI client setup
// import { ResumeJSON } from "@/components/ATSScore"; // Adjust path if necessary

// export const runtime = "nodejs";

// // --- INTERFACES ---
// interface NarrativeWeaverRequestBody {
//   resumeData: ResumeJSON;
//   jobDescription?: string;
//   socraticAnswers?: Record<string, string>;
//   action: "generate_initial_narrative" | "explore_what_if" | "find_hidden_gems";
//   whatIfScenario?: string;
//   currentNarrative?: string; // Context for "explore_what_if"
// }

// interface GoldenThreadEvidence {
//   section:
//     | "summary"
//     | "workExperience"
//     | "skills"
//     | "education"
//     | "volunteering"
//     | "certification";
//   itemId?: string; // e.g., for work experience: "CompanyName_PositionTitle"
//   bulletIndex?: number;
//   skillName?: string;
//   textSnippet: string; // The actual text from the resume
// }

// interface WeavingSuggestion {
//   type:
//     | "coverLetterOpening"
//     | "linkedInAbout"
//     | "interviewSTAR"
//     | "resumeSummaryUpdate"
//     | "generalTip";
//   suggestionText: string; // General advice
//   exampleSnippet?: string; // AI-generated example text
//   // relevantExperienceIds?: string[]; // Future: link to resume parts
// }

// interface InitialNarrativeResult {
//   careerNarrative: string;
//   goldenThread: string;
//   goldenThreadEvidence: GoldenThreadEvidence[];
//   keyThemes: Array<{ theme: string; evidence: string }>;
//   hiddenGemsTeaser: string; // Teaser for the dedicated "find_hidden_gems" action
//   weavingSuggestions: WeavingSuggestion[];
//   whatIfStarters: string[];
// }

// interface WhatIfResult {
//   adaptedNarrative: string;
//   keyTransferableSkills: string[];
//   pivotPoints: string[];
// }

// interface HiddenGem {
//   gem: string;
//   reasoning: string;
//   suggestion: string;
// }
// interface HiddenGemsResult {
//   hiddenGems: HiddenGem[];
// }

// // --- SOCRATIC QUESTIONS (mirrored from client for prompt context if needed) ---
// const socraticQuestionTexts: Record<string, string> = {
//   q1: "Reflecting on your experiences in this resume, what single achievement are you most proud of and why was it significant?",
//   q2: "What underlying passion or core value seems to connect many of your roles or projects?",
//   q3: "If you had to describe your unique professional approach in one sentence, what would it be?",
//   q4: "Beyond specific job titles, what kind of problems do you enjoy solving the most?",
// };

// // --- API HANDLER ---
// export async function POST(req: NextRequest) {
//   // console.log("Narrative Weaver API route hit.");
//   try {
//     const body = (await req.json()) as NarrativeWeaverRequestBody;
//     const {
//       resumeData,
//       jobDescription,
//       socraticAnswers,
//       action,
//       whatIfScenario,
//       currentNarrative,
//     } = body;

//     if (!resumeData) {
//       return NextResponse.json(
//         { error: "Missing resumeData" },
//         { status: 400 },
//       );
//     }

//     let prompt = "";
//     let modelToUse = "gpt-4-turbo-preview"; // Recommended for quality
//     let temperature = 0.4; // Default temperature

//     const socraticInsightsText = socraticAnswers
//       ? Object.entries(socraticAnswers)
//           .map(
//             ([key, value]) =>
//               `User's reflection on "${socraticQuestionTexts[key] || `Question ${key}`}":\n"${value}"`,
//           )
//           .join("\n\n")
//       : "No Socratic answers provided by the user.";

//     // --- ACTION: GENERATE INITIAL NARRATIVE ---
//     if (action === "generate_initial_narrative") {
//       // console.log("Action: generate_initial_narrative");
//       if (!socraticAnswers) {
//         return NextResponse.json(
//           {
//             error: "Missing Socratic answers for initial narrative generation",
//           },
//           { status: 400 },
//         );
//       }
//       prompt = `
//         SYSTEM:
//         You are "NarrativeStrategistAI v2.2", an expert career coach and storyteller. Your mission is to help
//         individuals uncover and articulate a powerful, authentic, and adaptable career narrative.
//         Analyze the provided resume, optional job description, and user's reflective answers to Socratic questions.
//         Output ONLY the valid JSON object as specified below. Do not include any introductory or concluding text, markdown, or backticks.

//         TASK:
//         Based on all inputs, generate a comprehensive narrative analysis.

//         1.  **Career Narrative (careerNarrative):**
//             *   Craft a compelling 3-5 sentence professional story (max 120 words).
//             *   This should be an engaging, personalized summary highlighting key transformations, core motivations, and unique value propositions.
//             *   Subtly weave in elements from their Socratic answers.
//             *   If a job description is provided, strongly align the narrative with its key requirements and company culture hints.

//         2.  **Golden Thread (goldenThread):**
//             *   Identify and articulate a concise phrase or sentence (max 25 words) that encapsulates the core, recurring theme, driving passion, or unique value proposition evident across their experiences and reflections.

//         3.  **Golden Thread Evidence (goldenThreadEvidence):**
//             *   Identify 3-4 specific phrases, bullet points, or skill mentions from the provided Resume JSON that MOST STRONGLY support the identified 'goldenThread'.
//             *   For each piece of evidence:
//                 *   "section": (string) Resume section (e.g., "summary", "workExperience", "skills", "education").
//                 *   "itemId": (string, optional) For work experience, use "CompanyName_PositionTitle"; for education, "SchoolName_DegreeName". For skills, use the skill itself.
//                 *   "bulletIndex": (number, optional for "workExperience" or "volunteering") 0-based index of the specific bullet.
//                 *   "textSnippet": (string) The exact text snippet (max 20-25 words) from the resume.

//         4.  **Key Themes/Pillars (keyThemes):**
//             *   Identify 3 dominant themes/pillars (e.g., "Strategic Problem Solving," "Data-Driven Innovation").
//             *   For each: { "theme": "string", "evidence": "string (1-2 sentence explanation from resume/answers)" }

//         5.  **Hidden Gems Teaser (hiddenGemsTeaser):**
//             *   A short string (1-2 sentences) hinting at 1-2 undervalued skills/experiences, to encourage using the "Find Hidden Gems" feature.

//         6.  **Narrative Weaving Suggestions (weavingSuggestions):**
//             *   Provide 3 actionable suggestions. Each suggestion object should have:
//                 *   "type": (string) "coverLetterOpening", "linkedInAbout", "interviewSTAR", "resumeSummaryUpdate", or "generalTip".
//                 *   "suggestionText": (string) The general advice.
//                 *   "exampleSnippet": (string, optional) A concrete example text snippet AI generates based on the narrative/thread.

//         7.  **"What If?" Starting Points (whatIfStarters):**
//             *   An array of 2-3 brief string prompts for the user to explore alternative career angles.

//         JSON OUTPUT SCHEMA:
//         {
//           "careerNarrative": "string",
//           "goldenThread": "string",
//           "goldenThreadEvidence": [ { "section": "string", "itemId": "string"?, "bulletIndex": number?, "skillName": "string"?, "textSnippet": "string" } ],
//           "keyThemes": [ { "theme": "string", "evidence": "string" } ],
//           "hiddenGemsTeaser": "string",
//           "weavingSuggestions": [ { "type": "string", "suggestionText": "string", "exampleSnippet": "string"? } ],
//           "whatIfStarters": ["string"]
//         }

//         Ensure ALL fields are populated. 'goldenThreadEvidence' should have 3-4 items.

//         INPUT - Candidate's Resume JSON:
//         ${JSON.stringify(resumeData, null, 2)}

//         ${jobDescription ? `INPUT - Target Job Description:\n"""${jobDescription}"""` : "No specific job description provided. Focus on a general strong narrative."}

//         INPUT - Candidate's Socratic Answers:
//         """${socraticInsightsText}"""

//         OUTPUT JSON ONLY:
//       `;
//       temperature = 0.45;
//     }
//     // --- ACTION: EXPLORE "WHAT IF?" ---
//     else if (action === "explore_what_if") {
//       // console.log("Action: explore_what_if");
//       if (!whatIfScenario) {
//         return NextResponse.json(
//           { error: 'Missing whatIfScenario for "explore_what_if" action' },
//           { status: 400 },
//         );
//       }
//       prompt = `
//         SYSTEM:
//         You are "ScenarioStrategistAI v1.1", an AI career adaptability coach.
//         Reframe a candidate's assets for a new hypothetical scenario.
//         Output ONLY the valid JSON object as specified.

//         TASK:
//         Given the resume, current narrative (if any), and a "What If?" scenario, generate:
//         1.  adaptedNarrative: Revised career narrative (3-4 sentences, max 80 words) for the "What If?" scenario, emphasizing relevant skills/experiences from the original resume.
//         2.  keyTransferableSkills: Array of 3-5 key skills (strings) from their resume particularly relevant to the "What If?" scenario.
//         3.  pivotPoints: Array of 1-2 brief, actionable suggestions (strings) on reframing existing experiences for this new scenario.

//         JSON OUTPUT SCHEMA:
//         {
//           "adaptedNarrative": "string",
//           "keyTransferableSkills": ["string"],
//           "pivotPoints": ["string"]
//         }

//         INPUT - Candidate's Resume JSON:
//         ${JSON.stringify(resumeData, null, 2)}

//         ${currentNarrative ? `INPUT - Candidate's Current Narrative (for context):\n"""${currentNarrative}"""` : "No current narrative provided; adapt based on resume."}

//         INPUT - "What If" Scenario to Explore:
//         """${whatIfScenario}"""

//         OUTPUT JSON ONLY:
//       `;
//       temperature = 0.6;
//     }
//     // --- ACTION: FIND HIDDEN GEMS ---
//     else if (action === "find_hidden_gems") {
//       // console.log("Action: find_hidden_gems");
//       prompt = `
//         SYSTEM:
//         You are "InsightMinerAI v1.2", an AI career coach skilled at spotting undervalued assets.
//         Analyze a resume (and optional job description) to identify "hidden gems" – underemphasized but valuable experiences, skills, or achievements.
//         Output ONLY the valid JSON object as specified.

//         TASK:
//         Generate:
//         1.  hiddenGems: An array of 2-4 objects. Each object:
//             {
//               "gem": "string (Concise description of the skill/experience/achievement)",
//               "reasoning": "string (Why this is a gem, its value, and relevance to the job description if provided, or general career value)",
//               "suggestion": "string (Concrete advice on how to better highlight this gem in applications or interviews)"
//             }

//         JSON OUTPUT SCHEMA:
//         {
//           "hiddenGems": [ { "gem": "string", "reasoning": "string", "suggestion": "string" } ]
//         }

//         Prioritize gems showing unique combinations, quantifiable impact, leadership, initiative, or skills aligned with a provided job description or modern workplaces.

//         INPUT - Candidate's Resume JSON:
//         ${JSON.stringify(resumeData, null, 2)}

//         ${jobDescription ? `INPUT - Target Job Description (for context):\n"""${jobDescription}"""` : "No specific job description provided. Focus on generally valuable hidden gems."}

//         OUTPUT JSON ONLY:
//       `;
//       temperature = 0.35;
//     } else {
//       console.error("Invalid action specified in API call:", action);
//       return NextResponse.json(
//         { error: "Invalid action specified" },
//         { status: 400 },
//       );
//     }

//     // console.log(`Sending prompt to OpenAI for action: ${action}. Model: ${modelToUse}, Temp: ${temperature}`);
//     const resp = await openai.chat.completions.create({
//       model: modelToUse,
//       messages: [{ role: "user", content: prompt }],
//       temperature: temperature,
//       // For newer models that guarantee JSON output when this is set:
//       // response_format: { type: "json_object" },
//     });

//     let rawResponse = resp.choices[0].message.content?.trim() || "";
//     // console.log(`Raw OpenAI response for ${action} (first 300 chars):`, rawResponse.substring(0, 300) + (rawResponse.length > 300 ? "..." : ""));

//     // Clean potential markdown code block fences
//     if (rawResponse.startsWith("```json"))
//       rawResponse = rawResponse.substring(7);
//     else if (rawResponse.startsWith("```"))
//       rawResponse = rawResponse.substring(3);
//     if (rawResponse.endsWith("```"))
//       rawResponse = rawResponse.substring(0, rawResponse.length - 3);
//     rawResponse = rawResponse.trim();

//     try {
//       const result = JSON.parse(rawResponse);
//       // console.log(`Successfully parsed JSON for ${action}.`);
//       return NextResponse.json(result);
//     } catch (parseError: any) {
//       console.error(`JSON Parse Error for ${action}:`, parseError.message);
//       console.error(
//         "Problematic raw string from OpenAI that failed parsing:",
//         rawResponse,
//       );
//       return NextResponse.json(
//         {
//           error: `Failed to parse AI response for ${action} as JSON.`,
//           details: parseError.message,
//           rawResponsePreview: rawResponse.substring(0, 500),
//         },
//         { status: 500 },
//       );
//     }
//   } catch (
//     error: any // Outer try-catch for request processing errors
//   ) {
//     console.error(
//       `Error in /api/narrative-weaver handling action '${req.method === "POST" && req.body ? (await req.clone().json()).action : "unknown"}':`,
//       error,
//     );
//     return NextResponse.json(
//       {
//         error: "An error occurred while processing your request.",
//         details: error.message,
//         stack: error.stack,
//       },
//       { status: 500 },
//     );
//   }
// }

// src/app/api/narrative-weaver/route.ts
import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { ResumeJSON } from "@/components/ATSScore";

// --- INTERFACES ---
interface NarrativeWeaverRequestBody {
  resumeData: ResumeJSON;
  jobDescription?: string;
  socraticAnswers?: Record<string, string>;
  action: "generate_initial_narrative" | "explore_what_if" | "find_hidden_gems";
  whatIfScenario?: string;
  currentNarrative?: string;
}

interface GoldenThreadEvidence {
  section:
    | "summary"
    | "workExperience"
    | "skills"
    | "education"
    | "volunteering"
    | "certification";
  itemId?: string;
  bulletIndex?: number;
  skillName?: string;
  textSnippet: string;
}

interface WeavingSuggestion {
  type:
    | "coverLetterOpening"
    | "linkedInAbout"
    | "interviewSTAR"
    | "resumeSummaryUpdate"
    | "generalTip";
  suggestionText: string;
  exampleSnippet?: string;
}

interface InitialNarrativeResult {
  careerNarrative: string;
  goldenThread: string;
  goldenThreadEvidence: GoldenThreadEvidence[];
  keyThemes: Array<{ theme: string; evidence: string }>;
  hiddenGemsTeaser: string;
  weavingSuggestions: WeavingSuggestion[];
  whatIfStarters: string[];
}

interface WhatIfResult {
  adaptedNarrative: string;
  keyTransferableSkills: string[];
  pivotPoints: string[];
}

interface HiddenGemsResult {
  hiddenGems: Array<{
    gem: string;
    reasoning: string;
    suggestion: string;
  }>;
}

// --- SOCRATIC QUESTIONS ---
const socraticQuestionTexts: Record<string, string> = {
  q1: "Reflecting on your experiences in this resume, what single achievement are you most proud of and why was it significant?",
  q2: "What underlying passion or core value seems to connect many of your roles or projects?",
  q3: "If you had to describe your unique professional approach in one sentence, what would it be?",
  q4: "Beyond specific job titles, what kind of problems do you enjoy solving the most?",
};

// --- API HANDLER ---
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as NarrativeWeaverRequestBody;
    const {
      resumeData,
      jobDescription,
      socraticAnswers,
      action,
      whatIfScenario,
      currentNarrative,
    } = body;

    if (!resumeData) {
      return NextResponse.json(
        { error: "Missing resumeData" },
        { status: 400 },
      );
    }

    let prompt = "";
    const modelToUse = "gpt-4-turbo-preview";
    let temperature = 0.4;

    const socraticInsightsText = socraticAnswers
      ? Object.entries(socraticAnswers)
          .map(
            ([key, value]) =>
              `User's reflection on "${socraticQuestionTexts[key] || `Question ${key}`}":\n"${value}"`,
          )
          .join("\n\n")
      : "No Socratic answers provided by the user.";

    // --- ACTION: GENERATE INITIAL NARRATIVE ---
    if (action === "generate_initial_narrative") {
      if (!socraticAnswers) {
        return NextResponse.json(
          {
            error: "Missing Socratic answers for initial narrative generation",
          },
          { status: 400 },
        );
      }
      prompt = `
        SYSTEM:
        You are "NarrativeStrategistAI v2.2", an expert career coach and storyteller. Your mission is to help
        individuals uncover and articulate a powerful, authentic, and adaptable career narrative.
        Analyze the provided resume, optional job description, and user's reflective answers to Socratic questions.
        Output ONLY the valid JSON object as specified below. Do not include any introductory or concluding text, markdown, or backticks.

        TASK:
        Based on all inputs, generate a comprehensive narrative analysis.

        1.  **Career Narrative (careerNarrative):**
            *   Craft a compelling 3-5 sentence professional story (max 120 words).
            *   This should be an engaging, personalized summary highlighting key transformations, core motivations, and unique value propositions.
            *   Subtly weave in elements from their Socratic answers.
            *   If a job description is provided, strongly align the narrative with its key requirements and company culture hints.

        2.  **Golden Thread (goldenThread):**
            *   Identify and articulate a concise phrase or sentence (max 25 words) that encapsulates the core, recurring theme, driving passion, or unique value proposition evident across their experiences and reflections.

        3.  **Golden Thread Evidence (goldenThreadEvidence):**
            *   Identify 3-4 specific phrases, bullet points, or skill mentions from the provided Resume JSON that MOST STRONGLY support the identified 'goldenThread'.
            *   For each piece of evidence:
                *   "section": (string) Resume section (e.g., "summary", "workExperience", "skills", "education").
                *   "itemId": (string, optional) For work experience, use "CompanyName_PositionTitle"; for education, "SchoolName_DegreeName". For skills, use the skill itself.
                *   "bulletIndex": (number, optional for "workExperience" or "volunteering") 0-based index of the specific bullet.
                *   "textSnippet": (string) The exact text snippet (max 20-25 words) from the resume.

        4.  **Key Themes/Pillars (keyThemes):**
            *   Identify 3 dominant themes/pillars (e.g., "Strategic Problem Solving," "Data-Driven Innovation").
            *   For each: { "theme": "string", "evidence": "string (1-2 sentence explanation from resume/answers)" }

        5.  **Hidden Gems Teaser (hiddenGemsTeaser):**
            *   A short string (1-2 sentences) hinting at 1-2 undervalued skills/experiences, to encourage using the "Find Hidden Gems" feature.

        6.  **Narrative Weaving Suggestions (weavingSuggestions):**
            *   Provide 3 actionable suggestions. Each suggestion object should have:
                *   "type": (string) "coverLetterOpening", "linkedInAbout", "interviewSTAR", "resumeSummaryUpdate", or "generalTip".
                *   "suggestionText": (string) The general advice.
                *   "exampleSnippet": (string, optional) A concrete example text snippet AI generates based on the narrative/thread.

        7.  **"What If?" Starting Points (whatIfStarters):**
            *   An array of 2-3 brief string prompts for the user to explore alternative career angles.

        JSON OUTPUT SCHEMA:
        {
          "careerNarrative": "string",
          "goldenThread": "string",
          "goldenThreadEvidence": [ { "section": "string", "itemId": "string"?, "bulletIndex": number?, "skillName": "string"?, "textSnippet": "string" } ],
          "keyThemes": [ { "theme": "string", "evidence": "string" } ],
          "hiddenGemsTeaser": "string",
          "weavingSuggestions": [ { "type": "string", "suggestionText": "string", "exampleSnippet": "string"? } ],
          "whatIfStarters": ["string"]
        }

        Ensure ALL fields are populated. 'goldenThreadEvidence' should have 3-4 items.

        INPUT - Candidate's Resume JSON:
        ${JSON.stringify(resumeData, null, 2)}

        ${jobDescription ? `INPUT - Target Job Description:\n"""${jobDescription}"""` : "No specific job description provided. Focus on a general strong narrative."}

        INPUT - Candidate's Socratic Answers:
        """${socraticInsightsText}"""

        OUTPUT JSON ONLY:
      `;
      temperature = 0.45;
    }
    // --- ACTION: EXPLORE "WHAT IF?" ---
    else if (action === "explore_what_if") {
      if (!whatIfScenario) {
        return NextResponse.json(
          { error: 'Missing whatIfScenario for "explore_what_if" action' },
          { status: 400 },
        );
      }
      prompt = `
        SYSTEM:
        You are "ScenarioStrategistAI v1.1", an AI career adaptability coach.
        Reframe a candidate's assets for a new hypothetical scenario.
        Output ONLY the valid JSON object as specified.

        TASK:
        Given the resume, current narrative (if any), and a "What If?" scenario, generate:
        1.  adaptedNarrative: Revised career narrative (3-4 sentences, max 80 words) for the "What If?" scenario, emphasizing relevant skills/experiences from the original resume.
        2.  keyTransferableSkills: Array of 3-5 key skills (strings) from their resume particularly relevant to the "What If?" scenario.
        3.  pivotPoints: Array of 1-2 brief, actionable suggestions (strings) on reframing existing experiences for this new scenario.

        JSON OUTPUT SCHEMA:
        {
          "adaptedNarrative": "string",
          "keyTransferableSkills": ["string"],
          "pivotPoints": ["string"]
        }

        INPUT - Candidate's Resume JSON:
        ${JSON.stringify(resumeData, null, 2)}

        ${currentNarrative ? `INPUT - Candidate's Current Narrative (for context):\n"""${currentNarrative}"""` : "No current narrative provided; adapt based on resume."}

        INPUT - "What If" Scenario to Explore:
        """${whatIfScenario}"""
        
        OUTPUT JSON ONLY:
      `;
      temperature = 0.6;
    }
    // --- ACTION: FIND HIDDEN GEMS ---
    else if (action === "find_hidden_gems") {
      prompt = `
        SYSTEM:
        You are "InsightMinerAI v1.2", an AI career coach skilled at spotting undervalued assets.
        Analyze a resume (and optional job description) to identify "hidden gems" – underemphasized but valuable experiences, skills, or achievements.
        Output ONLY the valid JSON object as specified.

        TASK:
        Generate:
        1.  hiddenGems: An array of 2-4 objects. Each object:
            {
              "gem": "string (Concise description of the skill/experience/achievement)",
              "reasoning": "string (Why this is a gem, its value, and relevance to the job description if provided, or general career value)",
              "suggestion": "string (Concrete advice on how to better highlight this gem in applications or interviews)"
            }
        
        JSON OUTPUT SCHEMA:
        {
          "hiddenGems": [ { "gem": "string", "reasoning": "string", "suggestion": "string" } ]
        }

        Prioritize gems showing unique combinations, quantifiable impact, leadership, initiative, or skills aligned with a provided job description or modern workplaces.

        INPUT - Candidate's Resume JSON:
        ${JSON.stringify(resumeData, null, 2)}

        ${jobDescription ? `INPUT - Target Job Description (for context):\n"""${jobDescription}"""` : "No specific job description provided. Focus on generally valuable hidden gems."}
        
        OUTPUT JSON ONLY:
      `;
      temperature = 0.35;
    } else {
      console.error("Invalid action specified in API call:", action);
      return NextResponse.json(
        { error: "Invalid action specified" },
        { status: 400 },
      );
    }

    const resp = await openai.chat.completions.create({
      model: modelToUse,
      messages: [{ role: "user", content: prompt }],
      temperature,
    });

    let rawResponse = resp.choices[0].message.content?.trim() || "";

    // Clean potential markdown code block fences
    if (rawResponse.startsWith("```json"))
      rawResponse = rawResponse.substring(7);
    else if (rawResponse.startsWith("```"))
      rawResponse = rawResponse.substring(3);
    if (rawResponse.endsWith("```"))
      rawResponse = rawResponse.substring(0, rawResponse.length - 3);
    rawResponse = rawResponse.trim();

    try {
      // Type the result based on the action
      let result: InitialNarrativeResult | WhatIfResult | HiddenGemsResult;
      if (action === "generate_initial_narrative") {
        result = JSON.parse(rawResponse) as InitialNarrativeResult;
      } else if (action === "explore_what_if") {
        result = JSON.parse(rawResponse) as WhatIfResult;
      } else {
        result = JSON.parse(rawResponse) as HiddenGemsResult;
      }
      return NextResponse.json(result);
    } catch (parseError: unknown) {
      console.error(`JSON Parse Error for ${action}:`, parseError);
      console.error(
        "Problematic raw string from OpenAI that failed parsing:",
        rawResponse,
      );
      return NextResponse.json(
        {
          error: `Failed to parse AI response for ${action} as JSON.`,
          details:
            parseError instanceof Error ? parseError.message : "Unknown error",
          rawResponsePreview: rawResponse.substring(0, 500),
        },
        { status: 500 },
      );
    }
  } catch (error: unknown) {
    console.error(
      `Error in /api/narrative-weaver handling action '${
        req.method === "POST" && req.body
          ? (await req.clone().json()).action
          : "unknown"
      }':`,
      error,
    );
    return NextResponse.json(
      {
        error: "An error occurred while processing your request.",
        details: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 },
    );
  }
}
