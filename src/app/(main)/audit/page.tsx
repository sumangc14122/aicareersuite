import React from "react";
import ResumeAuditPage from "./ResumeAuditPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume Audit",
  description: "Get AI-powered feedback on your resume.",
  openGraph: {
    title: "Resume Audit",
    description: "Get AI-powered feedback on your resume.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Resume Audit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume Audit",
    description: "Get AI-powered feedback on your resume.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Resume Audit",
      },
    ],
  },
};
function page() {
  return <ResumeAuditPage />;
}

export default page;
