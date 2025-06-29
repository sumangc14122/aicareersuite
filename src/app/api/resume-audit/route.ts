// src/app/api/resume-audit/route.ts
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
// import { canAuditToday, logAudit } from "@/lib/auditLimit";
import { canAuditToday } from "@/lib/auditLimit";
// import { parseResumeFile } from "@/lib/fileParser";
// import { generateAuditScore } from "@/lib/gptAnalyzer";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File;
  const type = formData.get("type") as string; // resume or cover_letter

  if (!file || !["resume", "cover_letter"].includes(type)) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  if (!(await canAuditToday(userId))) {
    return NextResponse.json(
      { error: "Daily limit exceeded" },
      { status: 403 },
    );
  }

  // const textContent = await parseResumeFile(file);
  // const audit = await generateAuditScore(textContent, type);

  // await logAudit(userId, type); // ✅ You must log type in DB now

  // return NextResponse.json({ audit });
}
