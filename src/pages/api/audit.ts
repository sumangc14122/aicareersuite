// // // src/pages/api/audit.ts

// // import { getAuth } from "@clerk/nextjs/server"; // ✅
// // import formidable from "formidable";
// // import { readFileContent } from "@/lib/readFileContent";
// // import { analyzeTextWithGPT } from "@/lib/gptAnalyzer";
// // import { canAuditToday, logAudit } from "@/lib/auditLimit";

// // export const config = {
// //   api: {
// //     bodyParser: false,
// //   },
// // };

// // export default async function handler(req: any, res: any) {
// //   if (req.method !== "POST") {
// //     res.status(405).json({ error: "Method not allowed" });
// //     return;
// //   }

// //   const { userId } = getAuth(req); // ✅ No await needed
// //   if (!userId) {
// //     res.status(401).json({ error: "Unauthorized" });
// //     return;
// //   }

// //   const form = formidable({ multiples: false, uploadDir: "/tmp", keepExtensions: true });

// //   form.parse(req, async (err, fields, files) => {
// //     if (err) {
// //       console.error("Form parse error:", err);
// //       res.status(500).json({ error: "File upload failed" });
// //       return;
// //     }

// //     const file = files.file?.[0];
// //     const type = fields.type?.[0] || "resume";

// //     if (!file || !type) {
// //       res.status(400).json({ error: "Missing file or type" });
// //       return;
// //     }

// //     if (!(await canAuditToday(userId))) {
// //       res.status(403).json({ error: "Daily audit limit exceeded" });
// //       return;
// //     }

// //     try {
// //     const jobDescription = fields.jobDescription?.[0] || "";
// //       const text = await readFileContent(file.filepath, file.originalFilename || "");
// //       const result = await analyzeTextWithGPT(text, type,jobDescription);
// //       await logAudit(userId, type, file.newFilename); // or file.filepath if you store absolute
// //       res.status(200).json({ result });
// //     } catch (error) {
// //       console.error("[AUDIT_ERROR]", error);
// //       res.status(500).json({ error: "Audit failed" });
// //     }
// //   });
// // }

// import { getAuth } from "@clerk/nextjs/server";
// import formidable from "formidable";
// import { readFileContent } from "@/lib/readFileContent";
// import { analyzeTextWithGPT } from "@/lib/gptAnalyzer";
// import { canAuditToday, logAudit } from "@/lib/auditLimit";

// import type { NextApiRequest, NextApiResponse } from "next";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// // export default async function handler(req: any, res: any) {
// //   if (req.method !== "POST") {
// //     res.status(405).json({ error: "Method not allowed" });
// //     return;
// //   }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   if (req.method !== "POST") {
//     res.status(405).json({ error: "Method not allowed" });
//     return;
//   }

//   const { userId } = getAuth(req);
//   if (!userId) {
//     res.status(401).json({ error: "Unauthorized" });
//     return;
//   }

//   const form = formidable({
//     multiples: false,
//     uploadDir: "/tmp",
//     keepExtensions: true,
//   });

//   form.parse(req, async (err, fields, files) => {
//     if (err) {
//       console.error("Form parse error:", err);
//       res.status(500).json({ error: "File upload failed" });
//       return;
//     }

//     const file = files.file?.[0];
//     const type = fields.type?.[0] || "resume";
//     const jobDescription = fields.jobDescription?.[0] || "";

//     if (!file || !type) {
//       res.status(400).json({ error: "Missing file or type" });
//       return;
//     }

//     if (!(await canAuditToday(userId))) {
//       res.status(403).json({ error: "Daily audit limit exceeded" });
//       return;
//     }

//     try {
//       const text = await readFileContent(
//         file.filepath,
//         file.originalFilename || "",
//       );
//       const result = await analyzeTextWithGPT(text, type, jobDescription);
//       await logAudit(userId, type, file.newFilename); // Optional: replace with file.filepath if storing file path
//       res.status(200).json({ result });
//     } catch (error) {
//       console.error("[AUDIT_ERROR]", error);
//       res.status(500).json({ error: "Audit failed" });
//     }
//   });
// }

// src/pages/api/audit.ts

import { getAuth } from "@clerk/nextjs/server";
import formidable from "formidable";
import { readFileContent } from "@/lib/readFileContent";
import { analyzeTextWithGPT } from "@/lib/gptAnalyzer";
import { canAuditToday, logAudit } from "@/lib/auditLimit";

import type { NextApiRequest, NextApiResponse } from "next";

// Disable the default body parser to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { userId } = getAuth(req);
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const form = formidable({
    multiples: false,
    uploadDir: "/tmp",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parse error:", err);
      res.status(500).json({ error: "File upload failed" });
      return;
    }

    const file = files.file?.[0];
    const rawType = fields.type?.[0] || "resume";
    const type = rawType === "cover" ? "cover" : "resume"; // ✅ Proper type narrowing
    const jobDescription = fields.jobDescription?.[0] || "";

    if (!file || !type) {
      res.status(400).json({ error: "Missing file or type" });
      return;
    }

    const auditAllowed = await canAuditToday(userId);
    if (!auditAllowed) {
      res.status(403).json({ error: "Daily audit limit exceeded" });
      return;
    }

    try {
      const text = await readFileContent(
        file.filepath,
        file.originalFilename || "",
      );
      const result = await analyzeTextWithGPT(text, type, jobDescription);
      await logAudit(userId, type, file.newFilename); // ✅ Correctly typed
      res.status(200).json({ result });
    } catch (error) {
      console.error("[AUDIT_ERROR]", error);
      res.status(500).json({ error: "Audit failed" });
    }
  });
}
