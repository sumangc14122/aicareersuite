import React from "react";
import ResumeWizard from "./ResumeWizard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume Wizard",
  description: "Create your resume step by step with our wizard.",
  openGraph: {
    title: "Resume Wizard",
    description: "Create your resume step by step with our wizard.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Resume Wizard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume Wizard",
    description: "Create your resume step by step with our wizard.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Resume Wizard",
      },
    ],
  },
};
function page() {
  return <ResumeWizard />;
}

export default page;
