// // src/types/pdf-parse.d.ts
// declare module "pdf-parse" {
//   // you can add more specific types here if you like,
//   // but for now “any” is enough:
//   const parse: any;
//   export default parse;
// }

// src/types/pdf-parse.d.ts
declare module "pdf-parse" {
  interface PDFData {
    numpages: number;
    numrender: number;
    info: {
      PDFFormatVersion?: string;
      IsAcroFormPresent?: boolean;
      IsXFAPresent?: boolean;
      Title?: string;
      Author?: string;
      Subject?: string;
      Keywords?: string;
      Creator?: string;
      Producer?: string;
      CreationDate?: string;
      ModDate?: string;
      [key: string]: unknown;
    };
    metadata: {
      [key: string]: unknown;
    } | null;
    version: string;
    text: string;
  }

  interface PDFParseOptions {
    pagerender?: (pageData: {
      getTextContent(): Promise<{
        items: Array<{
          str: string;
          [key: string]: unknown;
        }>;
      }>;
    }) => Promise<string>;
    max?: number;
    version?: string;
  }

  function parse(
    dataBuffer: Buffer | Uint8Array,
    options?: PDFParseOptions,
  ): Promise<PDFData>;

  export default parse;
}
