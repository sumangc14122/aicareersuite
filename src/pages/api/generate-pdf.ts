// // // // src/pages/api/generate-pdf.ts
// // // import type { NextApiRequest, NextApiResponse } from "next";
// // // import ReactDOMServer from "react-dom/server";
// // // import React from "react";
// // // import GenericTemplate, { TemplateID } from "@/components/GenericTemplate"; // Adjust path
// // // import { ResumeJSON } from "@/components/ATSScore"; // Adjust path
// // // import fs from "fs";
// // // import path from "path";

// // // // Always import/require these, as we might need properties from chromium
// // // // even if using full puppeteer's executable for local dev.
// // // import actualChromium from "@sparticuz/chromium"; // Use an alias to avoid conflict if full puppeteer is also named puppeteer
// // // import core from "puppeteer-core";

// // // export default async function handler(
// // //   req: NextApiRequest,
// // //   res: NextApiResponse,
// // // ) {
// // //   if (req.method !== "POST") {
// // //     res.setHeader("Allow", "POST");
// // //     return res.status(405).end("Method Not Allowed");
// // //   }
// // //   // console.log("PDF generation API route (pages/api) hit.");

// // //   try {
// // //     const { resumeData, templateId } = req.body as {
// // //       resumeData: ResumeJSON;
// // //       templateId: TemplateID;
// // //     };

// // //     if (!resumeData || !templateId) {
// // //       // console.error("Missing resumeData or templateId in request body");
// // //       return res
// // //         .status(400)
// // //         .json({ error: "Missing resumeData or templateId" });
// // //     }
// // //     // console.log(`Received templateId: ${templateId}, User: ${resumeData.personal?.fullName}`);

// // //     const cssPath = path.resolve(process.cwd(), "src", "app", "globals.css");
// // //     let globalCSS = "";
// // //     try {
// // //       // console.log(`Attempting to read CSS from: ${cssPath}`);
// // //       globalCSS = fs.readFileSync(cssPath, "utf-8");
// // //       // console.log(`Successfully read ${globalCSS.length} bytes from globals.css`);
// // //     } catch (err) {
// // //       // console.error(`CRITICAL: Failed to read globals.css from ${cssPath}:`, err);
// // //       return res.status(500).json({ error: "Server CSS configuration error." });
// // //     }

// // //     // console.log("Rendering GenericTemplate to string...");
// // //     let resumeHtmlContent = "";
// // //     try {
// // //       resumeHtmlContent = ReactDOMServer.renderToStaticMarkup(
// // //         React.createElement(GenericTemplate, {
// // //           data: resumeData,
// // //           templateId: templateId,
// // //         }),
// // //       );
// // //     } catch (renderError: any) {
// // //       // console.error("Error during ReactDOMServer.renderToStaticMarkup:", renderError);
// // //       return res
// // //         .status(500)
// // //         .json({
// // //           error: "Failed to render resume component.",
// // //           details: renderError.message,
// // //           stack: renderError.stack,
// // //         });
// // //     }

// // //     if (!resumeHtmlContent) {
// // //       // console.error("Rendered HTML content is empty.");
// // //       return res
// // //         .status(500)
// // //         .json({ error: "Rendered HTML content was empty." });
// // //     }
// // //     // console.log(`Rendered HTML string length: ${resumeHtmlContent.length}`);

// // //     const fullHtml = `
// // //       <!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Resume</title><style>${globalCSS}</style></head>
// // //       <body><div id="resumePreviewContentWrapper">${resumeHtmlContent}</div></body></html>`;

// // //     let browser = null;
// // //     // console.log("Preparing to launch Puppeteer browser...");
// // //     try {
// // //       // let executablePath: string | undefined;
// // //       let puppeteerInstanceToUse: any = core; // Default to puppeteer-core

// // //       // if (process.env.NODE_ENV === 'development') {
// // //       //     try {
// // //       //         const puppeteerFull = require('puppeteer'); // Attempt to require full puppeteer
// // //       //         executablePath = puppeteerFull.executablePath();
// // //       //         puppeteerInstanceToUse = puppeteerFull; // Use the full puppeteer instance
// // //       //         // console.log("Using full Puppeteer's bundled Chromium for local development.");
// // //       //     } catch (e) {
// // //       //         // console.warn("Full puppeteer package not found for local dev. Falling back to chrome-aws-lambda. Ensure CHROME_EXECUTABLE_PATH might be needed if chrome-aws-lambda's path isn't suitable for local system Chrome/Chromium, or install 'puppeteer' as a devDependency.");
// // //       //         executablePath = process.env.CHROME_EXECUTABLE_PATH || (await actualChromium.executablePath);
// // //       //         // puppeteerInstanceToUse remains 'core' in this fallback for dev
// // //       //     }
// // //       // } else { // Production (Vercel etc.)
// // //       //     executablePath = await actualChromium.executablePath;
// // //       //     puppeteerInstanceToUse = core; // Ensure using puppeteer-core with chrome-aws-lambda
// // //       //     // console.log("Using chrome-aws-lambda for production.");
// // //       // }

// // //       // Change the executablePath declaration to include the function type
// // //       let executablePath: string | undefined | (() => Promise<string>);

// // //       if (process.env.NODE_ENV === "development") {
// // //         try {
// // //           const puppeteerFull = require("puppeteer");
// // //           executablePath = puppeteerFull.executablePath();
// // //           puppeteerInstanceToUse = puppeteerFull;
// // //         } catch (e) {
// // //           // Assign the function directly, we'll await it later
// // //           executablePath =
// // //             process.env.CHROME_EXECUTABLE_PATH || actualChromium.executablePath;
// // //         }
// // //       } else {
// // //         // Assign the function directly, we'll await it later
// // //         executablePath = actualChromium.executablePath;
// // //       }

// // //       // Then when you need to use it in launch(), await it if it's a function
// // //       const finalExecutablePath =
// // //         typeof executablePath === "function"
// // //           ? await executablePath()
// // //           : executablePath;

// // //       browser = await puppeteerInstanceToUse.launch({
// // //         args: actualChromium.args,
// // //         executablePath: finalExecutablePath,
// // //         headless: "new",
// // //       });

// // //       if (
// // //         !executablePath &&
// // //         !(
// // //           process.env.NODE_ENV === "development" &&
// // //           puppeteerInstanceToUse.executablePath
// // //         )
// // //       ) {
// // //         // If full puppeteer was used in dev, its executablePath is on puppeteerInstanceToUse directly
// // //         const msg =
// // //           "Chromium executable path could not be determined. Ensure Puppeteer (dev) or chrome-aws-lambda (prod) is correctly set up, or CHROME_EXECUTABLE_PATH env var is set for local system Chrome.";
// // //         // console.error(msg);
// // //         throw new Error(msg);
// // //       }
// // //       // console.log(`Using executablePath: ${executablePath || (puppeteerInstanceToUse.executablePath ? puppeteerInstanceToUse.executablePath() : 'NOT FOUND')}`);

// // //       browser = await puppeteerInstanceToUse.launch({
// // //         args: actualChromium.args, // Always use args from chrome-aws-lambda as they are generally good
// // //         executablePath: executablePath, // This will be from full puppeteer in dev (if found) or chrome-aws-lambda
// // //         // headless: actualChromium.headless, // Use headless config from chrome-aws-lambda (usually true)
// // //         headless: "new", // Use the new headless mode
// // //       });
// // //       // console.log("Browser launched successfully.");

// // //       const page = await browser.newPage();
// // //       await page.setViewport({ width: 1280, height: 1024 }); // Consistent viewport
// // //       await page.setContent(fullHtml, { waitUntil: "networkidle0" });
// // //       await page.emulateMediaType("print");
// // //       // console.log("Page content set and print media emulated.");

// // //       const pdfBuffer = await page.pdf({
// // //         format: "A4",
// // //         printBackground: true,
// // //         margin: { top: "12mm", right: "12mm", bottom: "12mm", left: "12mm" },
// // //       });
// // //       // console.log(`PDF buffer generated, size: ${pdfBuffer.length} bytes.`);

// // //       await browser.close();
// // //       // console.log("Browser closed.");

// // //       // console.log(`PDF buffer generated successfully, size: ${pdfBuffer.length} bytes.`);

// // //       const fileName = `Resume_${(resumeData.personal?.fullName || "User").replace(/\s+/g, "_")}_${templateId}.pdf`;

// // //       // --- MODIFIED RESPONSE SENDING ---
// // //       res.setHeader("Content-Type", "application/pdf");
// // //       res.setHeader(
// // //         "Content-Disposition",
// // //         `attachment; filename="${fileName}"`,
// // //       );
// // //       res.setHeader("Content-Length", pdfBuffer.length.toString());

// // //       // Instead of res.send(pdfBuffer), try res.end(pdfBuffer) or writing to the stream
// // //       // For Node.js Buffers, res.end() is often preferred for binary data.
// // //       res.status(200).end(pdfBuffer);
// // //       // --- END MODIFIED RESPONSE SENDING ---
// // //     } catch (puppeteerError: any) {
// // //       // ... (existing puppeteer error handling)
// // //       // console.error('Puppeteer PDF Generation Error:', puppeteerError);
// // //       if (browser !== null) {
// // //         try {
// // //           await browser.close();
// // //         } catch (e) {
// // //           console.error("Error closing browser after puppeteer error", e);
// // //         }
// // //       }
// // //       // Send a JSON error response if Puppeteer fails
// // //       res
// // //         .status(500)
// // //         .json({
// // //           error: "Puppeteer failed to generate PDF.",
// // //           details: puppeteerError.message,
// // //           stack: puppeteerError.stack,
// // //         });
// // //     }
// // //   } catch (error: any) {
// // //     // console.error('Outer API Route Error:', error);
// // //     res
// // //       .status(500)
// // //       .json({
// // //         error: "Failed to process PDF request.",
// // //         details: error.message,
// // //         stack: error.stack,
// // //       });
// // //   }
// // // }

// // // src/pages/api/generate-pdf.ts
// // import type { NextApiRequest, NextApiResponse } from "next";
// // import ReactDOMServer from "react-dom/server";
// // import React from "react";
// // import GenericTemplate, { TemplateID } from "@/components/GenericTemplate";
// // import { ResumeJSON } from "@/components/ATSScore";
// // import fs from "fs";
// // import path from "path";
// // import actualChromium from "@sparticuz/chromium";
// // import core from "puppeteer-core";
// // import type { Browser as CoreBrowser } from "puppeteer-core";
// // import type { Browser as FullBrowser } from "puppeteer";
// // import chromium from "@sparticuz/chromium";
// // import puppeteer from "puppeteer-core";

// // type Browser = CoreBrowser | FullBrowser;

// // interface PuppeteerInstance {
// //   launch: (options: {
// //     args: string[];
// //     executablePath?: string;
// //     headless?: boolean | "shell";
// //   }) => Promise<Browser>;
// //   executablePath?: () => string;
// // }

// // export default async function handler(
// //   req: NextApiRequest,
// //   res: NextApiResponse,
// // ) {
// //   if (req.method !== "POST") {
// //     res.setHeader("Allow", "POST");
// //     return res.status(405).end("Method Not Allowed");
// //   }

// //   try {
// //     const { resumeData, templateId } = req.body as {
// //       resumeData: ResumeJSON;
// //       templateId: TemplateID;
// //     };

// //     if (!resumeData || !templateId) {
// //       return res
// //         .status(400)
// //         .json({ error: "Missing resumeData or templateId" });
// //     }

// //     const cssPath = path.resolve(process.cwd(), "src", "app", "globals.css");
// //     let globalCSS = "";
// //     try {
// //       globalCSS = fs.readFileSync(cssPath, "utf-8");
// //     } catch {
// //       return res.status(500).json({ error: "Server CSS configuration error." });
// //     }

// //     let resumeHtmlContent = "";
// //     try {
// //       resumeHtmlContent = ReactDOMServer.renderToStaticMarkup(
// //         React.createElement(GenericTemplate, {
// //           data: resumeData,
// //           templateId: templateId,
// //         }),
// //       );
// //     } catch (renderError: unknown) {
// //       const errorMessage =
// //         renderError instanceof Error
// //           ? renderError.message
// //           : "Unknown render error";
// //       const errorStack =
// //         renderError instanceof Error ? renderError.stack : undefined;
// //       return res.status(500).json({
// //         error: "Failed to render resume component.",
// //         details: errorMessage,
// //         stack: errorStack,
// //       });
// //     }

// //     if (!resumeHtmlContent) {
// //       return res
// //         .status(500)
// //         .json({ error: "Rendered HTML content was empty." });
// //     }

// //     const fullHtml = `
// //       <!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Resume</title><style>${globalCSS}</style></head>
// //       <body><div id="resumePreviewContentWrapper">${resumeHtmlContent}</div></body></html>`;

// //     let browser: Browser | null = null;
// //     try {
// //       let puppeteerInstanceToUse: PuppeteerInstance = {
// //         launch: core.launch.bind(core) as PuppeteerInstance["launch"],
// //       };
// //       let executablePath: string | undefined | (() => Promise<string>);

// //       if (process.env.NODE_ENV === "development") {
// //         try {
// //           const { default: puppeteerFull } = await import("puppeteer");
// //           puppeteerInstanceToUse = {
// //             launch: puppeteerFull.launch.bind(
// //               puppeteerFull,
// //             ) as PuppeteerInstance["launch"],
// //             executablePath: puppeteerFull.executablePath.bind(puppeteerFull),
// //           };
// //           executablePath = puppeteerFull.executablePath();
// //         } catch {
// //           executablePath =
// //             process.env.CHROME_EXECUTABLE_PATH || actualChromium.executablePath;
// //         }
// //       } else {
// //         executablePath = actualChromium.executablePath;
// //       }

// //       const finalExecutablePath =
// //         typeof executablePath === "function"
// //           ? await executablePath()
// //           : executablePath;

// //       if (!finalExecutablePath && process.env.NODE_ENV !== "development") {
// //         throw new Error(
// //           "Chromium executable path could not be determined. Ensure chrome-aws-lambda is correctly set up or CHROME_EXECUTABLE_PATH is set.",
// //         );
// //       }

// //       browser = await puppeteerInstanceToUse.launch({
// //         args: actualChromium.args,
// //         executablePath: finalExecutablePath,
// //         headless: true, // Use boolean true instead of "new" for compatibility
// //       });

// //       const page = await browser.newPage();
// //       await page.setViewport({ width: 1280, height: 1024 });
// //       await page.setContent(fullHtml, { waitUntil: "networkidle0" });
// //       await page.emulateMediaType("print");

// //       const pdfBuffer = await page.pdf({
// //         format: "A4",
// //         printBackground: true,
// //         margin: { top: "12mm", right: "12mm", bottom: "12mm", left: "12mm" },
// //       });

// //       await browser.close();
// //       browser = null;

// //       const fileName = `Resume_${(resumeData.personal?.fullName || "User").replace(/\s+/g, "_")}_${templateId}.pdf`;

// //       res.setHeader("Content-Type", "application/pdf");
// //       res.setHeader(
// //         "Content-Disposition",
// //         `attachment; filename="${fileName}"`,
// //       );
// //       res.setHeader("Content-Length", pdfBuffer.length.toString());
// //       res.status(200).end(pdfBuffer);
// //     } catch (puppeteerError: unknown) {
// //       if (browser) {
// //         try {
// //           await browser.close();
// //         } catch (e) {
// //           console.error("Error closing browser after puppeteer error", e);
// //         }
// //       }
// //       const errorMessage =
// //         puppeteerError instanceof Error
// //           ? puppeteerError.message
// //           : "Unknown puppeteer error";
// //       const errorStack =
// //         puppeteerError instanceof Error ? puppeteerError.stack : undefined;
// //       res.status(500).json({
// //         error: "Puppeteer failed to generate PDF.",
// //         details: errorMessage,
// //         stack: errorStack,
// //       });
// //     }
// //   } catch (error: unknown) {
// //     const errorMessage =
// //       error instanceof Error ? error.message : "Unknown error";
// //     const errorStack = error instanceof Error ? error.stack : undefined;
// //     res.status(500).json({
// //       error: "Failed to process PDF request.",
// //       details: errorMessage,
// //       stack: errorStack,
// //     });
// //   }
// // }



// // src/pages/api/generate-pdf.ts
// import type { NextApiRequest, NextApiResponse } from "next";
// import ReactDOMServer from "react-dom/server";
// import React from "react";
// import fs from "fs";
// import path from "path";
// import chromium from "@sparticuz/chromium";
// import puppeteerCore from "puppeteer-core";
// import type { Browser as CoreBrowser } from "puppeteer-core";
// import type { Browser as FullBrowser } from "puppeteer";
// import GenericTemplate, { TemplateID } from "@/components/GenericTemplate";
// import { ResumeJSON } from "@/components/ATSScore";

// type Browser = CoreBrowser | FullBrowser;

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "POST") {
//     res.setHeader("Allow", "POST");
//     return res.status(405).end("Method Not Allowed");
//   }

//   // 1) Parse payload
//   const { resumeData, templateId } = req.body as {
//     resumeData: ResumeJSON;
//     templateId: TemplateID;
//   };

//   if (!resumeData || !templateId) {
//     return res.status(400).json({ error: "Missing resumeData or templateId" });
//   }

//   // 2) Read and inline your global CSS
//   let globalCSS = "";
//   try {
//     const cssPath = path.resolve(process.cwd(), "src", "app", "globals.css");
//     globalCSS = fs.readFileSync(cssPath, "utf-8");
//   } catch {
//     return res
//       .status(500)
//       .json({ error: "Server CSS configuration error." });
//   }

//   // 3) Render your React template to static HTML
//   let resumeHtmlContent: string;
//   try {
//     resumeHtmlContent = ReactDOMServer.renderToStaticMarkup(
//       React.createElement(GenericTemplate, {
//         data: resumeData,
//         templateId,
//       })
//     );
//   } catch (err) {
//     const message = err instanceof Error ? err.message : "Unknown render error";
//     const stack = err instanceof Error ? err.stack : undefined;
//     return res.status(500).json({
//       error: "Failed to render resume component.",
//       details: message,
//       stack,
//     });
//   }

//   if (!resumeHtmlContent) {
//     return res
//       .status(500)
//       .json({ error: "Rendered HTML content was empty." });
//   }

//   const fullHtml = `
//     <!DOCTYPE html>
//     <html lang="en">
//       <head>
//         <meta charset="UTF-8"/>
//         <title>Resume</title>
//         <style>${globalCSS}</style>
//       </head>
//       <body>
//         <div id="resumePreviewContentWrapper">
//           ${resumeHtmlContent}
//         </div>
//       </body>
//     </html>
//   `;

//   // 4) Launch Chromium / Puppeteer
//   let browser: Browser | null = null;
//   try {
//     const isDev = process.env.NODE_ENV === "development";

//     if (isDev) {
//       // in development use full puppeteer package
//       const puppeteerFull = await import("puppeteer");
//       browser = await puppeteerFull.default.launch({ headless: true });
//     } else {
//       // in production use chromium + puppeteer-core
//       const execPath = await chromium.executablePath();
//       if (!execPath) {
//         throw new Error(
//           "Chromium executable path could not be determined."
//         );
//       }
//       browser = await puppeteerCore.launch({
//         args: chromium.args,
//         defaultViewport: chromium.defaultViewport,
//         executablePath: execPath,       // 👈 must be a string
//         headless: chromium.headless,
//       });
//     }

//     const page = await browser.newPage();
//     await page.setContent(fullHtml, { waitUntil: "networkidle0" });
//     await page.emulateMediaType("print");

//     const pdfBuffer = await page.pdf({
//       format: "A4",
//       printBackground: true,
//       margin: { top: "12mm", right: "12mm", bottom: "12mm", left: "12mm" },
//     });

//     await browser.close();
//     browser = null;

//     // 5) Send back PDF
//     const safeName = (resumeData.personal?.fullName || "User")
//       .trim()
//       .replace(/\s+/g, "_");
//     const fileName = `Resume_${safeName}_${templateId}.pdf`;

//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader(
//       "Content-Disposition",
//       `attachment; filename="${fileName}"`
//     );
//     res.status(200).end(pdfBuffer);
//   } catch (err) {
//     // ensure browser is closed
//     if (browser) {
//       try {
//         await browser.close();
//       } catch  (e) {
//         console.log(e)
//       }
//     }
//     console.error("❌ Puppeteer failed:", err);
//     const message = err instanceof Error ? err.message : String(err);
//     return res.status(500).json({
//       error: "Puppeteer failed to generate PDF.",
//       details: message,
//     });
//   }
// }


import type { NextApiRequest, NextApiResponse } from "next";
import ReactDOMServer from "react-dom/server";
import React from "react";
import fs from "fs";
import path from "path";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
import GenericTemplate, { TemplateID } from "@/components/GenericTemplate";
import { ResumeJSON } from "@/components/ATSScore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  // 1) Parse payload
  const { resumeData, templateId } = req.body as {
    resumeData: ResumeJSON;
    templateId: TemplateID;
  };
  if (!resumeData || !templateId) {
    console.error("Missing resumeData or templateId in request body");
    return res.status(400).json({ error: "Missing resumeData or templateId" });
  }

  // 2) Read and inline global CSS
  let globalCSS = "";
  try {
    const cssPath = path.resolve(process.cwd(), "src", "app", "globals.css");
    console.log(`Reading CSS from: ${cssPath}`);
    globalCSS = fs.readFileSync(cssPath, "utf-8");
  } catch (err) {
    console.error("Failed to read globals.css:", err);
    return res.status(500).json({ error: "Server CSS configuration error." });
  }

  // 3) Server-render React template
  let resumeHtmlContent: string;
  try {
    resumeHtmlContent = ReactDOMServer.renderToStaticMarkup(
      React.createElement(GenericTemplate, {
        data: resumeData,
        templateId,
      })
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown render error";
    const stack = err instanceof Error ? err.stack : undefined;
    console.error("Failed to render resume component:", err);
    return res.status(500).json({
      error: "Failed to render resume component.",
      details: message,
      stack,
    });
  }
  if (!resumeHtmlContent) {
    console.error("Rendered HTML content is empty");
    return res.status(500).json({ error: "Rendered HTML content was empty." });
  }

  // 4) Build standalone HTML page
  const fullHtml = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <title>Resume</title>
        <style>${globalCSS}</style>
      </head>
      <body>
        <div id="resumePreviewContentWrapper">
          ${resumeHtmlContent}
        </div>
      </body>
    </html>
  `;

  // 5) Launch headless Chrome
  let browser = null;
  try {
    const isDev = process.env.NODE_ENV === "development";

    if (isDev) {
      // Local development: Use full puppeteer
      try {
        const puppeteerFull = await import("puppeteer");
        browser = await puppeteerFull.default.launch({
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        console.log("Launched full Puppeteer for local development");
      } catch (err) {
        console.warn("Full Puppeteer not found, falling back to chrome-aws-lambda");
        const execPath = await chromium.executablePath();
        if (!execPath) {
          throw new Error("Chromium executable path could not be determined.");
        }
        console.log("Local fallback Chromium path:", execPath);
        browser = await puppeteer.launch({
          args: [...chromium.args, '--no-sandbox', '--disable-setuid-sandbox'],
          defaultViewport: chromium.defaultViewport,
          executablePath: execPath,
          headless: chromium.headless,
        });
      }
    } else {
      // Production: Use chrome-aws-lambda + puppeteer-core
      const execPath = await chromium.executablePath();
      if (!execPath) {
        throw new Error("Chromium executable path could not be determined.");
      }
      console.log("Launching Chromium from:", execPath);
      browser = await puppeteer.launch({
        args: [...chromium.args, '--no-sandbox', '--disable-setuid-sandbox'],
        defaultViewport: chromium.defaultViewport,
        executablePath: execPath,
        headless: chromium.headless,
      });
    }

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 1024 });
    await page.setContent(fullHtml, { waitUntil: "networkidle0" });
    await page.emulateMediaType("print");

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "12mm", right: "12mm", bottom: "12mm", left: "12mm" },
    });

    await browser.close();
    browser = null;

    // 6) Stream back the PDF
    const safeName = (resumeData.personal?.fullName || "User")
      .trim()
      .replace(/\s+/g, "_");
    const fileName = `Resume_${safeName}_${templateId}.pdf`;

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${fileName}"`
    );
    res.setHeader("Content-Length", pdfBuffer.length.toString());
    res.status(200).end(pdfBuffer);
  } catch (err) {
    if (browser) {
      try {
        await browser.close();
      } catch (e) {
        console.error("Error closing browser:", e);
      }
    }
    console.error("❌ Puppeteer failed:", err);
    const message = err instanceof Error ? err.message : String(err);
    const stack = err instanceof Error ? err.stack : undefined;
    return res.status(500).json({
      error: "Puppeteer failed to generate PDF.",
      details: message,
      stack,
    });
  }
}

