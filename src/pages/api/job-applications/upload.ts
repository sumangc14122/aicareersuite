// // // import formidable from "formidable";
// // // import fs from "fs";
// // // import path from "path";

// // // export const config = {
// // //   api: {
// // //     bodyParser: false,
// // //   },
// // // };

// // // export default async function handler(req, res) {
// // //   if (req.method !== "POST") return res.status(405).end();

// // //   const uploadDir = path.join(process.cwd(), "public", "uploads");
// // //   fs.mkdirSync(uploadDir, { recursive: true });

// // //   const form = formidable({
// // //     multiples: false,
// // //     uploadDir,
// // //     keepExtensions: true,
// // //   });

// // //   form.parse(req, (err, fields, files) => {
// // //     if (err) return res.status(500).json({ error: "Upload failed" });

// // //     const file = files.file;
// // //     const filename = path.basename(file[0].filepath);

// // //     return res.status(200).json({ url: `/uploads/${filename}` });
// // //   });
// // // }

// // import type { NextApiRequest, NextApiResponse } from "next";
// // import formidable from "formidable";
// // import fs from "fs";
// // import path from "path";

// // export const config = {
// //   api: {
// //     bodyParser: false,
// //   },
// // };

// // export default async function handler(
// //   req: NextApiRequest,
// //   res: NextApiResponse,
// // ) {
// //   if (req.method !== "POST") return res.status(405).end();

// //   const uploadDir = path.join(process.cwd(), "public", "uploads");
// //   fs.mkdirSync(uploadDir, { recursive: true });

// //   const form = formidable({
// //     multiples: false,
// //     uploadDir,
// //     keepExtensions: true,
// //   });

// //   form.parse(req, (err, fields, files) => {
// //     if (err) return res.status(500).json({ error: "Upload failed" });

// //     const file = files.file;
// //     const filename = Array.isArray(file)
// //       ? path.basename(file[0].filepath)
// //       : path.basename(file.filepath);

// //     return res.status(200).json({ url: `/uploads/${filename}` });
// //   });
// // }

// import type { NextApiRequest, NextApiResponse } from "next";
// import formidable from "formidable";
// import fs from "fs";
// import path from "path";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   if (req.method !== "POST") return res.status(405).end();

//   const uploadDir = path.join(process.cwd(), "public", "uploads");
//   fs.mkdirSync(uploadDir, { recursive: true });

//   const form = formidable({
//     multiples: false,
//     uploadDir,
//     keepExtensions: true,
//   });

//   form.parse(req, (err, fields, files) => {
//     if (err) return res.status(500).json({ error: "Upload failed" });

//     const file = files.file;

//     if (!file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     const filename = Array.isArray(file)
//       ? path.basename(file[0].filepath)
//       : path.basename(file.filepath);

//     return res.status(200).json({ url: `/uploads/${filename}` });
//   });
// }

import type { NextApiRequest, NextApiResponse } from "next";
import formidable, { File } from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") return res.status(405).end();

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  fs.mkdirSync(uploadDir, { recursive: true });

  const form = formidable({
    multiples: false,
    uploadDir,
    keepExtensions: true,
  });

  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).json({ error: "Upload failed" });

    const fileField = files.file;
    if (!fileField) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Cast it as formidable.File or formidable.File[]
    const file = Array.isArray(fileField)
      ? (fileField[0] as File)
      : (fileField as File);

    const filename = path.basename(file.filepath);

    return res.status(200).json({ url: `/uploads/${filename}` });
  });
}
