// // scripts/pinecone-embed.ts

// import { Pinecone } from "@pinecone-database/pinecone";
// import { OpenAI } from "openai";
// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// import { promises as fs } from "fs";
// import path from "path";
// import dotenv from "dotenv";

// // Load environment variables
// dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// // --- CONFIGURATION ---
// const KNOWLEDGE_BASE_DIR = path.resolve(process.cwd(), "src/data/kb");
// const CHUNK_SIZE = 1000; // Size of text chunks in characters
// const CHUNK_OVERLAP = 200; // Overlap between chunks
// const BATCH_SIZE = 100; // Number of vectors to upsert at a time

// // Initialize clients
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
// const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
// const pineconeIndex = pinecone.index(process.env.PINECONE_INDEX_NAME!);

// // Function to read all files from a directory
// async function getKnowledgeBaseDocs(dirPath: string): Promise<{ text: string; source: string }[]> {
//   const entries = await fs.readdir(dirPath, { withFileTypes: true });
//   const files = await Promise.all(
//     entries.map(async (entry) => {
//       const fullPath = path.join(dirPath, entry.name);
//       if (entry.isDirectory()) {
//         return getKnowledgeBaseDocs(fullPath);
//       } else if (entry.isFile() && path.extname(entry.name) === ".md") {
//         const text = await fs.readFile(fullPath, "utf-8");
//         return [{ text, source: entry.name }];
//       }
//       return [];
//     }),
//   );
//   return files.flat();
// }

// async function main() {
//   console.log("Starting knowledge base indexing process...");

//   // 1. Load documents from the file system
//   const documents = await getKnowledgeBaseDocs(KNOWLEDGE_BASE_DIR);
//   console.log(`Loaded ${documents.length} documents.`);

//   // 2. Initialize text splitter
//   const textSplitter = new RecursiveCharacterTextSplitter({
//     chunkSize: CHUNK_SIZE,
//     chunkOverlap: CHUNK_OVERLAP,
//   });

//   // 3. Split documents into chunks
//   const chunks = await textSplitter.splitDocuments(
//     documents.map((doc) => ({ pageContent: doc.text, metadata: { source: doc.source } })),
//   );
//   console.log(`Split documents into ${chunks.length} chunks.`);

//   // 4. Create embeddings and prepare vectors in batches
//   console.log("Creating embeddings and preparing vectors...");
//   for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
//     const batchChunks = chunks.slice(i, i + BATCH_SIZE);
    
//     const embeddingResponse = await openai.embeddings.create({
//       model: "text-embedding-3-small",
//       input: batchChunks.map((chunk) => chunk.pageContent),
//     });

//     const vectors = batchChunks.map((chunk, j) => ({
//       id: `${chunk.metadata.source}-${i + j}`, // Create a unique ID
//       values: embeddingResponse.data[j].embedding,
//       metadata: {
//         text: chunk.pageContent,
//         source: chunk.metadata.source,
//       },
//     }));

//     // 5. Upsert vectors to Pinecone
//     console.log(`Upserting batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(chunks.length / BATCH_SIZE)}...`);
//     await pineconeIndex.upsert(vectors);
//   }

//   console.log("✅ Indexing complete!");
// }

// main().catch((error) => {
//   console.error("❌ An error occurred during indexing:", error);
// });


// scripts/pinecone-embed.ts (Upgraded with Metadata)

import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAI } from "openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { promises as fs } from "fs";
import path from "path";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// --- CONFIGURATION ---
const KNOWLEDGE_BASE_DIR = path.resolve(process.cwd(), "src/data/kb");
const CHUNK_SIZE = 1000;
const CHUNK_OVERLAP = 200;
const BATCH_SIZE = 100;

// Initialize clients
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
const pineconeIndex = pinecone.index(process.env.PINECONE_INDEX_NAME!);

// Function to read all files and determine their type from folder structure
async function getKnowledgeBaseDocs(dirPath: string): Promise<{ text: string; source: string; type: string }[]> {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        return getKnowledgeBaseDocs(fullPath);
      } else if (entry.isFile() && path.extname(entry.name) === ".md") {
        const text = await fs.readFile(fullPath, "utf-8");
        const parentDir = path.basename(path.dirname(fullPath)); // e.g., 'features', 'legal'
        const type = parentDir.includes('faq') ? 'general' : parentDir; // Assign type based on folder
        return [{ text, source: entry.name, type }];
      }
      return [];
    }),
  );
  return files.flat();
}

async function main() {
  // console.log("Starting knowledge base indexing process...");

  // 1. Clear existing vectors to ensure a fresh index (optional but recommended for updates)
  // console.log("Clearing existing vectors from index...");
  await pineconeIndex.deleteAll();
  // console.log("Index cleared.");

  // 2. Load documents with type metadata
  const documents = await getKnowledgeBaseDocs(KNOWLEDGE_BASE_DIR);
  // console.log(`Loaded ${documents.length} documents.`);

  // 3. Initialize text splitter
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: CHUNK_SIZE,
    chunkOverlap: CHUNK_OVERLAP,
  });

  // 4. Split documents into chunks
  const chunks = await textSplitter.splitDocuments(
    documents.map((doc) => ({ 
      pageContent: doc.text, 
      metadata: { source: doc.source, type: doc.type } // Pass metadata through
    })),
  );
  // console.log(`Split documents into ${chunks.length} chunks.`);

  // 5. Create embeddings and prepare vectors in batches
  // console.log("Creating embeddings and preparing vectors...");
  for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
    const batchChunks = chunks.slice(i, i + BATCH_SIZE);
    
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: batchChunks.map((chunk) => chunk.pageContent),
    });

    const vectors = batchChunks.map((chunk, j) => ({
      id: `${chunk.metadata.source}-${i + j}`,
      values: embeddingResponse.data[j].embedding,
      metadata: {
        text: chunk.pageContent,
        source: chunk.metadata.source,
        type: (chunk.metadata as any).type, // Include the type in the final metadata
      },
    }));

    // 6. Upsert vectors to Pinecone
    // console.log(`Upserting batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(chunks.length / BATCH_SIZE)}...`);
    await pineconeIndex.upsert(vectors);
  }

  // console.log("✅ Indexing complete!");
}

main().catch((error) => {
  console.error("❌ An error occurred during indexing:", error);
});