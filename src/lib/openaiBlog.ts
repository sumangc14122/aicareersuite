import { OpenAI } from "openai";
import slugify from "slugify";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function generateBlog() {
  const titlePrompt = `Give me a short and catchy blog title about career, job search, or resume tips`;
  const contentPrompt = (title: string) =>
    `Write a blog article (200 words) titled "${title}" with a short summary and practical advice.`;

  const titleResp = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: titlePrompt }],
  });

  const title = titleResp.choices[0].message.content!;
  const contentResp = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: contentPrompt(title) }],
  });

  const content = contentResp.choices[0].message.content!;
  const [summary] = content.split("\n\n");

  return {
    title: title.trim(),
    slug: slugify(title, { lower: true }),
    summary: summary.trim(),
    content: content.trim(),
  };
}
