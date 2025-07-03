import { OpenAI } from "openai";
import { Pinecone } from "@pinecone-database/pinecone";

// Initialize clients securely
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
const pineconeIndex = pinecone.index(process.env.PINECONE_INDEX_NAME!);

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const lastUserMessage = messages[messages.length - 1].content;

    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: lastUserMessage,
    });
    const embedding = embeddingResponse.data[0].embedding;

    const queryResponse = await pineconeIndex.query({
      vector: embedding,
      topK: 4,
      includeMetadata: true,
    });

    const relevantContext = queryResponse.matches
      .map((match) => match.metadata?.text)
      .join("\n\n---\n\n");

    const systemPromptContent = `You are an expert AI assistant for "AI Resume Pro". Your tone is helpful, professional, and encouraging.
    
    Use the provided context to answer questions about AI Resume Pro's features, legal policies, or how to use the site.
    
    If the user asks a general career question (like "how do I write a good summary?"), answer it based on your general knowledge. This is "Ask AI" mode.
    Even when answering general questions, if you can subtly and relevantly connect it back to a feature of AI Resume Pro, do so.
    
    - If the user's mode is "faq", prioritize answering based on the provided CONTEXT. If the context doesn't have the answer, state that you don't have specific information.
    - If the mode is "ai", feel free to answer broader career questions using general knowledge, but still use the CONTEXT if the question is about AI Resume Pro.

    CONTEXT:
    ---
    ${relevantContext}
    ---
    `;

    const systemPrompt = {
      role: "system" as const,
      content: systemPromptContent,
    };

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      stream: true,
      messages: [systemPrompt, ...messages],
    });

    // Create the exact stream format that useChat expects
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          // let messageId = `msg-${Date.now()}`;

          for await (const chunk of response) {
            const content = chunk.choices[0]?.delta?.content;

            if (content) {
              // Format as the AI SDK expects: "0:content\n"
              const formattedData = `0:"${content.replace(/"/g, '\\"').replace(/\n/g, "\\n")}"\n`;
              controller.enqueue(encoder.encode(formattedData));
            }

            // Handle the end of stream
            if (chunk.choices[0]?.finish_reason) {
              // Send the final message metadata
              const finishData = `d:{"finishReason":"${chunk.choices[0].finish_reason}","usage":{"promptTokens":0,"completionTokens":0}}\n`;
              controller.enqueue(encoder.encode(finishData));
              break;
            }
          }
          controller.close();
        } catch (error) {
          console.error("Stream error:", error);
          const errorMessage =
            error instanceof Error ? error.message : "Unknown error occurred";
          const errorData = `3:${JSON.stringify({ error: errorMessage })}\n`;
          controller.enqueue(encoder.encode(errorData));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("An error occurred in the chat API:", error);
    return new Response("An internal error occurred.", { status: 500 });
  }
}
