// // // import prisma from "@/lib/prisma";
// // // import { getAuth } from "@clerk/nextjs/server";

// // // export default async function handler(req, res) {
// // //   if (req.method !== "PUT") return res.status(405).end();
// // //   const { userId } = getAuth(req);

// // //   if (!userId) return res.status(401).json({ error: "Unauthorized" });

// // //   const { id, ...updateData } = req.body;

// // //   try {
// // //     const updated = await prisma.jobApplication.update({
// // //       where: { id },
// // //       data: updateData,
// // //     });
// // //     res.status(200).json(updated);
// // //   } catch (error) {
// // //     res.status(500).json({ error: "Error updating job application" });
// // //   }
// // // }

// // import prisma  from "@/lib/prisma";
// // import { getAuth } from "@clerk/nextjs/server";

// // export default async function handler(req, res) {
// //   if (req.method !== "PUT") return res.status(405).end();

// //   const { userId } = getAuth(req);
// //   if (!userId) return res.status(401).json({ error: "Unauthorized" });

// //   const { id, ...updateData } = req.body;

// //   try {
// //     const updated = await prisma.jobApplication.update({
// //       where: { id },
// //       data: updateData,
// //     });

// //     res.status(200).json(updated);
// //   } catch (error) {
// //     console.error("Update error:", error);
// //     res.status(500).json({ error: "Failed to update job." });
// //   }
// // }

// import prisma from "@/lib/prisma";
// import { getAuth } from "@clerk/nextjs/server";

// // function isValidDate(dateStr) {
// //   const d = new Date(dateStr);
// //   return !isNaN(d.getTime());
// // }

// function isValidDate(dateStr: string): boolean {
//   const d = new Date(dateStr);
//   return !isNaN(d.getTime());
// }

// export default async function handler(req, res) {
//   if (req.method !== "PUT") return res.status(405).end();
//   const { userId } = getAuth(req);
//   if (!userId) return res.status(401).json({ error: "Unauthorized" });

//   const {
//     id,
//     companyName,
//     jobTitle,
//     coverLetterUrl,
//     resumeUrl,
//     applyLink,
//     submitted,
//     followUp,
//     finalResult,
//     mistakeNotes,
//     resultDate,
//     appliedDate,
//     reminderDate,
//   } = req.body;

//   try {
//     const updated = await prisma.jobApplication.update({
//       where: { id },
//       data: {
//         companyName,
//         jobTitle,
//         coverLetterUrl,
//         resumeUrl,
//         applyLink,
//         submitted,
//         followUp,
//         finalResult,
//         mistakeNotes,
//         resultDate: isValidDate(resultDate) ? new Date(resultDate) : null,
//         appliedDate: isValidDate(appliedDate) ? new Date(appliedDate) : null,
//         reminderDate: isValidDate(reminderDate) ? new Date(reminderDate) : null,
//       },
//     });

//     return res.status(200).json(updated);
//   } catch (error) {
//     console.error("❌ Update error:", error);
//     return res.status(500).json({ error: "Failed to update job entry." });
//   }
// }

// src/pages/api/job-applications/update.ts

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

// ✅ Explicit type for the date validation helper
function isValidDate(dateStr: string): boolean {
  const d = new Date(dateStr);
  return !isNaN(d.getTime());
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "PUT") return res.status(405).end();

  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  const {
    id,
    companyName,
    jobTitle,
    coverLetterUrl,
    resumeUrl,
    applyLink,
    submitted,
    followUp,
    finalResult,
    mistakeNotes,
    resultDate,
    appliedDate,
    reminderDate,
  } = req.body;

  try {
    const updated = await prisma.jobApplication.update({
      where: { id },
      data: {
        companyName,
        jobTitle,
        coverLetterUrl,
        resumeUrl,
        applyLink,
        submitted,
        followUp,
        finalResult,
        mistakeNotes,
        // resultDate: isValidDate(resultDate) ? new Date(resultDate) : null,
        // appliedDate: isValidDate(appliedDate) ? new Date(appliedDate) : null,
        // reminderDate: isValidDate(reminderDate) ? new Date(reminderDate) : null,
        ...(isValidDate(resultDate) && { resultDate: new Date(resultDate) }),
        ...(isValidDate(appliedDate) && { appliedDate: new Date(appliedDate) }),
        ...(isValidDate(reminderDate) && {
          reminderDate: new Date(reminderDate),
        }),
      },
    });

    return res.status(200).json(updated);
  } catch (error) {
    console.error("❌ Update error:", error);
    return res.status(500).json({ error: "Failed to update job entry." });
  }
}
