import React from "react";
import JobTracker from "./JobTracker";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Job Tracker",
  description: "Keep track of your job applications and interviews.",
  openGraph: {
    title: "Job Tracker",
    description: "Keep track of your job applications and interviews.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Job Tracker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Job Tracker",
    description: "Keep track of your job applications and interviews.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Job Tracker",
      },
    ],
  },
};
function page() {
  return <JobTracker />;
}

export default page;
