// import prisma from "@/lib/prisma";
// import { getAuth } from "@clerk/nextjs/server";

// export default async function handler(req, res) {
//   if (req.method !== "DELETE") return res.status(405).end();
//   const { userId } = getAuth(req);

//   const { id } = req.body;

//   if (!userId) return res.status(401).json({ error: "Unauthorized" });

//   try {
//     await prisma.jobApplication.delete({ where: { id } });
//     res.status(200).json({ success: true });
//   } catch {
//     res.status(500).json({ error: "Error deleting job application" });
//   }
// }

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "DELETE") return res.status(405).end();

  const { userId } = getAuth(req);
  const { id } = req.body;

  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    await prisma.jobApplication.delete({ where: { id } });
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Error deleting job:", error);
    res.status(500).json({ error: "Error deleting job application" });
  }
}
