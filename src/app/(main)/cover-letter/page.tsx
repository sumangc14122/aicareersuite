import React from "react";
import CoverLetterPage from "./CoverLetterPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cover Letter Builder",
  description:
    "Create a professional cover letter that will help you land your dream job.",
  openGraph: {
    title: "Cover Letter Builder",
    description:
      "Create a professional cover letter that will help you land your dream job.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Cover Letter Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cover Letter Builder",
    description:
      "Create a professional cover letter that will help you land your dream job.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Cover Letter Builder",
      },
    ],
  },
};
function page() {
  return <CoverLetterPage />;
}

export default page;
