// import OpenAI from "openai";

// const openai = new OpenAI();

// export default openai;

// export async function generateCoverLetter(
//   templatePrompt: string,
//   rateModel = "gpt-3.5-turbo",
// ): Promise<string> {
//   const resp = await openai.chat.completions.create({
//     model: rateModel,
//     messages: [
//       { role: "system", content: "You are an expert career coach." },
//       { role: "user", content: templatePrompt },
//     ],
//   });
//   return resp.choices[0].message?.content.trim() || "";
// }

import OpenAI from "openai";

// const openai = new OpenAI();

// export default openai;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default openai;
export { openai };

export async function generateCoverLetter(
  templatePrompt: string,
  rateModel = "gpt-3.5-turbo",
): Promise<string> {
  const resp = await openai.chat.completions.create({
    model: rateModel,
    messages: [
      { role: "system", content: "You are an expert career coach." },
      { role: "user", content: templatePrompt },
    ],
  });

  const message = resp.choices?.[0]?.message;
  return message?.content?.trim?.() ?? "No content generated.";
}
