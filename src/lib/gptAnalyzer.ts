import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function analyzeTextWithGPT(
  text: string,
  type: string,
  jobDescription: string = "",
): Promise<string> {
  const prompt = `
You are an expert ${type === "resume" ? "resume auditor" : "cover letter reviewer"} with 15+ years of experience in HR and recruitment for a professionals. Evaluate the following ${type} content for a premium, paid service, providing highly personalized, actionable, and industry-specific feedback.

Document:
"""${text}"""

${
  jobDescription
    ? `Job Description:
"""
${jobDescription}
"""
Compare the document against the job description to assess keyword relevance, skill alignment, and overall fit.`
    : "No job description provided. Evaluate based on general best practices for ${type} documents."
}

Evaluate the document across the following metrics (score 1–10):
1. Formatting: Consistency in layout, spacing, fonts.
2. Keyword Relevance: Presence of job-specific keywords${jobDescription ? " (based on job description)" : ""}.
3. Grammar & Language: Correctness of grammar, spelling, punctuation.
4. Length: Appropriateness for the document type (resume: 1–2 pages; cover letter: 3–4 paragraphs).
5. Visual Hierarchy: Structure, spacing, alignment for readability.
6. Tone Appropriateness: Confident, concise, formal tone suitable for the role.
7. Action-Oriented Language: Use of active verbs and quantifiable achievements.
8. ATS Compatibility: Suitability for Applicant Tracking Systems (e.g., standard headings, no tables).
9. Personalisation: How well the document reflects the candidate’s unique value proposition.
10. Impact Quantification: Use of measurable results to demonstrate impact.
11. Skill Alignment: Alignment of listed skills with job requirements${jobDescription ? " (based on job description)" : ""}.
12. Redundancy: Avoidance of repetitive phrases or overused words.
13. Readability: Ease of reading, avoiding long sentences or jargon.

Calculate an **Overall Score** as a weighted average (Keywords, Skill Alignment, and ATS Compatibility are weighted 1.5x due to their importance for hiring). Provide a percentile ranking compared to industry standards (e.g., "Top 20% for HSEQ roles").

List:
- **Strengths** (top 3, with specific examples from the document).
- **Weaknesses** (top 3, with specific examples from the document).
- **Suggestions for Improvement** (5 concise, actionable points with examples where applicable).
- **Keyword Gap Analysis** (if job description is provided): List 2–3 missing keywords and suggest where to add them.
- **ATS Tips** (2–3 specific tips for better ATS parsing).

Format the response as follows:

Overall Score: X/100 (Percentile: Top Y% for [industry] roles)

Formatting: X/10  
Keywords: X/10  
Grammar: X/10  
Length: X/10  
Visual Hierarchy: X/10  
Tone: X/10  
Action Language: X/10  
ATS Compatibility: X/10  
Personalisation: X/10  
Impact Quantification: X/10  
Skill Alignment: X/10  
Redundancy: X/10  
Readability: X/10  

Strengths:
- [Example from document]
- [Example from document]
- [Example from document]

Weaknesses:
- [Example from document]
- [Example from document]
- [Example from document]

Suggestions:
- [Actionable suggestion with example]
- [Actionable suggestion with example]
- [Actionable suggestion with example]
- [Actionable suggestion with example]
- [Actionable suggestion with example]

${
  jobDescription
    ? `Keyword Gap Analysis:
- [Missing keyword]: [Where to add]
- [Missing keyword]: [Where to add]`
    : ""
}

ATS Tips:
- [Tip 1]
- [Tip 2]
`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  return response.choices[0].message?.content || "No result returned.";
}
