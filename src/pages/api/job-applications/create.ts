// // import prisma from "@/lib/prisma";
// // import { getAuth } from "@clerk/nextjs/server";

// // function isValidDate(dateStr) {
// //     const d = new Date(dateStr);
// //     return !isNaN(d.getTime());
// //   }

// // export default async function handler(req, res) {
// //   if (req.method !== "POST") return res.status(405).end();
// //   const { userId } = getAuth(req);

// //   if (!userId) return res.status(401).json({ error: "Unauthorized" });

// //   try {
// //     const job = await prisma.jobApplication.create({
// //       data: {
// //         userId,
// //         companyName: req.body.companyName,
// //         jobTitle: req.body.jobTitle,
// //         coverLetterUrl: req.body.coverLetterUrl || null,
// //         resumeUrl: req.body.resumeUrl || null,
// //         applyLink: req.body.applyLink || null,
// //         submitted: req.body.submitted ?? false,
// //         followUp: req.body.followUp ?? false,
// //         finalResult: req.body.finalResult || null,
// //         mistakeNotes: req.body.mistakeNotes || null,
// //         resultDate: isValidDate(req.body.resultDate) ? new Date(req.body.resultDate) : null,
// //         appliedDate: isValidDate(req.body.appliedDate) ? new Date(req.body.appliedDate) : new Date(),
// //     },
// //     });

// //     return res.status(200).json(job);
// //   } catch (error) {
// //     console.error("❌ Error in job application creation:", error);
// //     return res.status(500).json({ error: "Failed to create job entry." });
// //   }
// // }

// import prisma from "@/lib/prisma";
// import { getAuth } from "@clerk/nextjs/server";

// // function isValidDate(dateStr) {
// //   const d = new Date(dateStr);
// //   return !isNaN(d.getTime());
// // }

// function isValidDate(dateStr: string) {
//   const d = new Date(dateStr);
//   return !isNaN(d.getTime());
// }

// export default async function handler(req, res) {
//   if (req.method !== "POST") return res.status(405).end();
//   const { userId } = getAuth(req);

//   if (!userId) return res.status(401).json({ error: "Unauthorized" });

//   try {
//     const appliedDate = isValidDate(req.body.appliedDate)
//       ? new Date(req.body.appliedDate)
//       : new Date();

//     // ✅ Add reminderDate: 7 days after appliedDate if followUp is true
//     // const reminderDate =
//     //   req.body.followUp && appliedDate
//     //     ? new Date(appliedDate.getTime() + 7 * 24 * 60 * 60 * 1000)
//     //     : null;

//     const job = await prisma.jobApplication.create({
//       data: {
//         userId,
//         companyName: req.body.companyName,
//         jobTitle: req.body.jobTitle,
//         coverLetterUrl: req.body.coverLetterUrl || null,
//         resumeUrl: req.body.resumeUrl || null,
//         applyLink: req.body.applyLink || null,
//         submitted: req.body.submitted ?? false,
//         followUp: req.body.followUp ?? false,
//         finalResult: req.body.finalResult || null,
//         mistakeNotes: req.body.mistakeNotes || null,
//         resultDate: isValidDate(req.body.resultDate)
//           ? new Date(req.body.resultDate)
//           : null,
//         appliedDate, // reuse parsed date
//         // reminderDate, // ✅ New field added
//         reminderDate: isValidDate(req.body.reminderDate)
//           ? new Date(req.body.reminderDate)
//           : null,
//       },
//     });

//     return res.status(200).json(job);
//   } catch (error) {
//     console.error("❌ Error in job application creation:", error);
//     return res.status(500).json({ error: "Failed to create job entry." });
//   }
// }

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

function isValidDate(dateStr: string) {
  const d = new Date(dateStr);
  return !isNaN(d.getTime());
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") return res.status(405).end();

  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const appliedDate = isValidDate(req.body.appliedDate)
      ? new Date(req.body.appliedDate)
      : new Date();

    const job = await prisma.jobApplication.create({
      data: {
        userId,
        companyName: req.body.companyName,
        jobTitle: req.body.jobTitle,
        coverLetterUrl: req.body.coverLetterUrl || null,
        resumeUrl: req.body.resumeUrl || null,
        applyLink: req.body.applyLink || null,
        submitted: req.body.submitted ?? false,
        followUp: req.body.followUp ?? false,
        finalResult: req.body.finalResult || null,
        mistakeNotes: req.body.mistakeNotes || null,
        resultDate: isValidDate(req.body.resultDate)
          ? new Date(req.body.resultDate)
          : null,
        appliedDate,
        reminderDate: isValidDate(req.body.reminderDate)
          ? new Date(req.body.reminderDate)
          : null,
      },
    });

    return res.status(200).json(job);
  } catch (error) {
    console.error("❌ Error in job application creation:", error);
    return res.status(500).json({ error: "Failed to create job entry." });
  }
}
