import prisma from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import ResumeEditor from "./ResumeEditor";

export const metadata: Metadata = {
  title: "Design your resume",
};

export default async function Page({
  // params,
  searchParams,
}: {
  params?: Promise<Record<string, never>>;
  searchParams?: Promise<{ resumeId?: string }>;
}) {
  // Await the promises
  // const resolvedParams = params ? await params : {};
  const resolvedSearchParams = searchParams ? await searchParams : {};

  const { resumeId } = resolvedSearchParams;

  const { userId } = await auth();

  if (!userId) return null;

  const resumeToEdit = resumeId
    ? await prisma.resume.findUnique({
        where: { id: resumeId, userId },
        include: resumeDataInclude,
      })
    : null;

  return <ResumeEditor resumeToEdit={resumeToEdit} />;
}
