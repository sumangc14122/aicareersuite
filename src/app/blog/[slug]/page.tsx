// // import prisma from "@/lib/prisma";
// // import { notFound } from "next/navigation";
// // import { Metadata } from "next";

// // export async function generateMetadata({
// //   params,
// // }: {
// //   params: { slug: string };
// // }): Promise<Metadata> {
// //   const { slug } = await params; // ✅ destructure after
// //   const blog = await prisma.blog.findUnique({
// //     where: { slug },
// //   });

// //   if (!blog) return {};

// //   return {
// //     title: blog.title,
// //     description: blog.summary,
// //   };
// // }

// import prisma from "@/lib/prisma";
// import { notFound } from "next/navigation";
// import { Metadata } from "next";

// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string };
// }): Promise<Metadata> {
//   const { slug } = params; // ✅ fixed
//   const blog = await prisma.blog.findUnique({
//     where: { slug },
//   });

//   if (!blog) {
//     notFound();
//   }

//   return {
//     title: blog.title,
//     description: blog.summary || "",
//   };
// }

// export default async function BlogPostPage({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const { slug } = await params; // ✅ destructure after
//   const blog = await prisma.blog.findUnique({
//     where: { slug },
//   });

//   if (!blog) return notFound();

//   return (
//     <main className="mx-auto max-w-3xl px-4 py-12">
//       <h1 className="mb-4 text-3xl font-bold">{blog.title}</h1>
//       <p className="mb-6 text-gray-600">{blog.summary}</p>
//       <article className="prose dark:prose-invert">
//         {blog.content.split("\n").map((line, i) => (
//           <p key={i}>{line}</p>
//         ))}
//       </article>
//     </main>
//   );
// }

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const blog = await prisma.blog.findUnique({
    where: { slug },
  });

  if (!blog) {
    notFound();
  }

  return {
    title: blog.title,
    description: blog.summary || "",
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const blog = await prisma.blog.findUnique({
    where: { slug },
  });

  if (!blog) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold">{blog.title}</h1>
      <p className="mb-6 text-gray-600">{blog.summary}</p>
      <article className="prose dark:prose-invert">
        {blog.content.split("\n").map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </article>
    </main>
  );
}
