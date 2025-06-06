// src/lib/readFileContent.ts
// import { PDFLoader } from "langchain/document_loaders/fs/pdf";
// import { DocxLoader } from "langchain/document_loaders/fs/docx";

// import { PDFLoader } from "langchain/document_loaders/fs/pdf";
// import { DocxLoader } from "langchain/document_loaders/fs/docx";

import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";

import path from "path";

export async function readFileContent(
  filepath: string,
  filename: string,
): Promise<string> {
  const extension = path.extname(filename).toLowerCase();

  if (extension === ".pdf") {
    const loader = new PDFLoader(filepath);
    const docs = await loader.load();
    return docs.map((d) => d.pageContent).join("\n");
  }

  if (extension === ".docx" || extension === ".doc") {
    const loader = new DocxLoader(filepath);
    const docs = await loader.load();
    return docs.map((d) => d.pageContent).join("\n");
  }

  throw new Error("Unsupported file format");
}
