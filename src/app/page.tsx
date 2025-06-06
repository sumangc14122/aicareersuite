// src/app/page.tsx
import HomeContent from "./HomeContent";
import prisma from "@/lib/prisma";

export default async function Page() {
  // 1️⃣ Latest 5 public blog-type posts
  const rawPosts = await prisma.post.findMany({
    where: { type: "BLOG", isAnonymous: false },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  // 2️⃣ Latest 5 public review requests
  const rawReviews = await prisma.reviewRequest.findMany({
    where: { isPublic: true },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  // 3️⃣ Latest 5 public SUCCESS stories
  const rawSuccess = await prisma.post.findMany({
    where: { type: "SUCCESS", isAnonymous: false },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  // Helper to stringify dates
  const iso = (d: Date) => d.toISOString();

  const blogs = rawPosts.map((p) => ({
    id: p.id,
    title: p.title ?? "(no title)",
    summary: p.content.length > 150 ? p.content.slice(0, 150) + "…" : p.content,
    createdAt: iso(p.createdAt),
  }));

  const reviews = rawReviews.map((r) => ({
    id: r.id,
    resumeUrl: r.resumeUrl,
    description: r.description ?? "",
    createdAt: iso(r.createdAt),
  }));

  // const successStories = rawSuccess.map((s) => ({
  //   id: s.id,
  //   title: s.title ?? "(no title)",
  //   summary: s.content.length > 150 ? s.content.slice(0, 150) + "…" : s.content,
  //   createdAt: iso(s.createdAt),
  // }));

  const successStories = rawSuccess.map((s) => ({
    id: s.id,
    title: s.title ?? "(no title)",
    excerpt: s.content.length > 150 ? s.content.slice(0, 150) + "…" : s.content,
    createdAt: iso(s.createdAt), // optional if your Story type doesn't include this
  }));

  return <HomeContent />;
}
