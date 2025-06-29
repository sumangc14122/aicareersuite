import type { NextApiRequest, NextApiResponse } from "next";
import { generateCoverLetter } from "../../lib/openai";
import { coverLetterTemplates } from "../../templates/coverLetterTemplates";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  const { templateId, details } = req.body as {
    templateId: string;
    details: {
      name: string;
      role: string;
      company: string;
      achievements?: string;
    };
  };
  const template = coverLetterTemplates.find((t) => t.id === templateId);
  if (!template) {
    return res.status(400).json({ error: "Invalid template ID" });
  }
  const prompt = template.prompt(details);
  const letter = await generateCoverLetter(prompt);
  res.status(200).json({ letter });
}
