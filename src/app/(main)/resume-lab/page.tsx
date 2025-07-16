// src/app/resume-lab/page.tsx

import ResumeLab from "@/components/ResumeLab";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interactive Resume Lab",
  description: "Experiment with different resume formats and styles.",
  openGraph: {
    title: "Interactive Resume Lab",
    description: "Experiment with different resume formats and styles.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Interactive Resume Lab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interactive Resume Lab",
    description: "Experiment with different resume formats and styles.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Interactive Resume Lab",
      },
    ],
  },
};
export default function ResumeLabPage() {
  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold">Interactive Resume Lab</h1>
      <ResumeLab />
    </div>
  );
}
