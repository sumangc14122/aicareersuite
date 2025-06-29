// import prisma from "@/lib/prisma";
// import { getAuth } from "@clerk/nextjs/server";

// export default async function handler(req, res) {
//   if (req.method !== "GET") return res.status(405).end();
//   const { userId } = getAuth(req);

//   if (!userId) return res.status(401).json({ error: "Unauthorized" });

//   try {
//     const jobs = await prisma.jobApplication.findMany({
//       where: { userId },
//       orderBy: { appliedDate: "desc" },
//     });
//     res.status(200).json(jobs);
//   } catch {
//     res.status(500).json({ error: "Error fetching job applications" });
//   }
// }

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") return res.status(405).end();

  const { userId } = getAuth(req);

  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const jobs = await prisma.jobApplication.findMany({
      where: { userId },
      orderBy: { appliedDate: "desc" },
    });
    res.status(200).json(jobs);
  } catch (error) {
    console.error("❌ Error fetching job applications:", error);
    res.status(500).json({ error: "Error fetching job applications" });
  }
}
