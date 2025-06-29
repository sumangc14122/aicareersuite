// // src/app/profile/[id]/posts/[postId]/page.tsx

// import React from "react";
// import Link from "next/link";
// import prisma from "@/lib/prisma";
// import ShareProfileButton from "@/components/ShareProfileButton";
// import { currentUser } from "@clerk/nextjs/server";

// type Props = {
//   params: {
//     id: string; // Clerk userId for the profile
//     postId: string; // the Post.cuid()
//   };
// };

// export default async function PostPage({ params }: Props) {
//   // Next.js App Router requires awaiting params
//   const { id, postId } = await params;

//   // Who's viewing?
//   const viewer = await currentUser();
//   const currentUserId = viewer?.id;

//   // 1) Load the profile
//   const profile = await prisma.profile.findUnique({
//     where: { userId: id },
//   });

//   // 2) Guard: profile must exist, and be public or owned by viewer
//   if (!profile || (profile.userId !== currentUserId && !profile.isPublic)) {
//     return (
//       <div className="mx-auto max-w-md py-8 text-center text-gray-500">
//         Profile not found or is private.
//       </div>
//     );
//   }

//   // 3) Load the post
//   const post = await prisma.post.findUnique({
//     where: { id: postId },
//   });

//   // 4) Guard: post must exist and belong to this profile
//   if (!post || post.profileId !== profile.id) {
//     return (
//       <div className="mx-auto max-w-md py-8 text-center text-gray-500">
//         Post not found.
//       </div>
//     );
//   }

//   // Determine display name
//   const displayName = post.isAnonymous ? "Anonymous" : profile.name;

//   // Format date
//   const date = new Date(post.createdAt).toLocaleDateString();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 px-4 py-12 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-2xl space-y-6 rounded-xl bg-white p-8 shadow-lg">
//         {/* Back & Share */}
//         <div className="flex items-center justify-between">
//           <Link
//             href={`/profile/${id}`}
//             className="text-sm text-teal-600 hover:underline"
//           >
//             ← Back to Profile
//           </Link>
//           <div className="flex gap-2">
//             <ShareProfileButton />
//           </div>
//         </div>

//         {/* Title */}
//         {post.title && (
//           <h1 className="text-2xl font-bold text-gray-900">{post.title}</h1>
//         )}

//         {/* Meta */}
//         <div className="text-sm text-gray-600">
//           <span>{date}</span>
//           <span className="mx-2">•</span>
//           <span>{displayName}</span>
//         </div>

//         {/* Content */}
//         <div className="prose max-w-full whitespace-pre-wrap text-gray-800">
//           {post.content}
//         </div>
//         {currentUserId === profile.userId && (
//           <Link
//             href={`/profile/${id}/posts/${postId}/edit`}
//             className="text-sm text-teal-600 hover:underline"
//           >
//             Edit Post
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// }

import React from "react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import ShareProfileButton from "@/components/ShareProfileButton";
import { currentUser } from "@clerk/nextjs/server";

type Props = {
  params: Promise<{
    id: string; // Clerk userId for the profile
    postId: string; // the Post.cuid()
  }>;
};

export default async function PostPage({ params }: Props) {
  const { id, postId } = await params; // Already correct

  // Who's viewing?
  const viewer = await currentUser();
  const currentUserId = viewer?.id;

  // 1) Load the profile
  const profile = await prisma.profile.findUnique({
    where: { userId: id },
  });

  // 2) Guard: profile must exist, and be public or owned by viewer
  if (!profile || (profile.userId !== currentUserId && !profile.isPublic)) {
    return (
      <div className="mx-auto max-w-md py-8 text-center text-gray-500">
        Profile not found or is private.
      </div>
    );
  }

  // 3) Load the post
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  // 4) Guard: post must exist and belong to this profile
  if (!post || post.profileId !== profile.id) {
    return (
      <div className="mx-auto max-w-md py-8 text-center text-gray-500">
        Post not found.
      </div>
    );
  }

  // Determine display name
  const displayName = post.isAnonymous ? "Anonymous" : profile.name;

  // Format date
  const date = new Date(post.createdAt).toLocaleDateString();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl space-y-6 rounded-xl bg-white p-8 shadow-lg">
        {/* Back & Share */}
        <div className="flex items-center justify-between">
          <Link
            href={`/profile/${id}`}
            className="text-sm text-teal-600 hover:underline"
          >
            ← Back to Profile
          </Link>
          <div className="flex gap-2">
            <ShareProfileButton />
          </div>
        </div>

        {/* Title */}
        {post.title && (
          <h1 className="text-2xl font-bold text-gray-900">{post.title}</h1>
        )}

        {/* Meta */}
        <div className="text-sm text-gray-600">
          <span>{date}</span>
          <span className="mx-2">•</span>
          <span>{displayName}</span>
        </div>

        {/* Content */}
        <div className="prose max-w-full whitespace-pre-wrap text-gray-800">
          {post.content}
        </div>
        {currentUserId === profile.userId && (
          <Link
            href={`/profile/${id}/posts/${postId}/edit`}
            className="text-sm text-teal-600 hover:underline"
          >
            Edit Post
          </Link>
        )}
      </div>
    </div>
  );
}
