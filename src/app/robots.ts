import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/sign-in/",
        "/sign-up/",
        "/portfolio/",
        "/portfolio-editor/",
        "/editor/",
        "/profile/",
        "/wizard/",
        "/chat/",
        "/audit/",
        "/billing/",
        "/cover-letter/",
        "/resumes/",
        "/interview-simulator/",
        "/job-tracker/",
        "/resume-lab/",
      ],
    },
    sitemap: `${process.env.NEXT_PUBLIC_APP_URL}/sitemap.xml`,
    host: process.env.NEXT_PUBLIC_APP_URL,
  };
}
