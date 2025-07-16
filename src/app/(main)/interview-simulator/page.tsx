import React from "react";
import InterviewSimulator from "./InterviewSimulator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interview Simulator",
  description: "Practice your interview skills with our AI-powered simulator.",
  openGraph: {
    title: "Interview Simulator",
    description:
      "Practice your interview skills with our AI-powered simulator.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Interview Simulator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interview Simulator",
    description:
      "Practice your interview skills with our AI-powered simulator.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Interview Simulator",
      },
    ],
  },
};

function page() {
  return <InterviewSimulator />;
}

export default page;
