// // src/types/mammoth.d.ts
// declare module "mammoth" {
//   const mammoth: any;
//   export default mammoth;
// }

// src/types/mammoth.d.ts
declare module "mammoth" {
  interface ConvertToHtmlResult {
    value: string;
    messages: Array<{
      type: "warning" | "error" | "info";
      message: string;
    }>;
  }

  interface ConvertToMarkdownResult {
    value: string;
    messages: Array<{
      type: "warning" | "error" | "info";
      message: string;
    }>;
  }

  interface ExtractRawTextResult {
    value: string;
    messages: Array<{
      type: "warning" | "error" | "info";
      message: string;
    }>;
  }

  interface ConvertOptions {
    styleMap?: string[];
    includeEmbeddedStyleMap?: boolean;
    includeDefaultStyleMap?: boolean;
    convertImage?: (image: {
      read(encoding?: string): Promise<Buffer>;
      contentType: string;
    }) => Promise<{ src: string; alt?: string } | undefined>;
    ignoreEmptyParagraphs?: boolean;
    idPrefix?: string;
    transformDocument?: (document: unknown) => unknown;
  }

  interface DocumentInput {
    path?: string;
    buffer?: Buffer | ArrayBuffer | Uint8Array;
  }

  interface Mammoth {
    convertToHtml(
      input: DocumentInput,
      options?: ConvertOptions,
    ): Promise<ConvertToHtmlResult>;

    convertToMarkdown(
      input: DocumentInput,
      options?: ConvertOptions,
    ): Promise<ConvertToMarkdownResult>;

    extractRawText(input: DocumentInput): Promise<ExtractRawTextResult>;

    images: {
      imgElement(
        func: (image: { src: string; alt?: string }) => Record<string, string>,
      ): unknown;
      dataUri: unknown;
    };

    transforms: {
      paragraph(transform: (element: unknown) => unknown): unknown;
      run(transform: (element: unknown) => unknown): unknown;
    };
  }

  const mammoth: Mammoth;
  export default mammoth;
}
