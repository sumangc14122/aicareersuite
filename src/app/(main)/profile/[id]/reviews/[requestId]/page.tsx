// import React from "react";
// import Link from "next/link";
// import prisma from "@/lib/prisma";
// import { currentUser } from "@clerk/nextjs/server";
// import AddCommentForm from "@/components/AddCommentForm"; // see below

// type Props = { params: { id: string; requestId: string } };

// export default async function ReviewPage({ params }: Props) {
//   const { id, requestId } = await params;
//   const viewer = await currentUser();
//   const currentUserId = viewer?.id;

//   // Load profile and request
//   const profile = await prisma.profile.findUnique({ where: { userId: id } });
//   if (!profile || (profile.userId !== currentUserId && !profile.isPublic)) {
//     return (
//       <p className="p-8 text-center text-gray-500">Profile not accessible.</p>
//     );
//   }

//   const req = await prisma.reviewRequest.findUnique({
//     where: { id: requestId },
//     include: {
//       comments: {
//         orderBy: { createdAt: "desc" },
//         include: { reviewerProfile: true },
//       },
//     },
//   });
//   if (!req || (!req.isPublic && currentUserId !== profile.userId)) {
//     return (
//       <p className="p-8 text-center text-gray-500">
//         Request not found or private.
//       </p>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-2xl space-y-6 rounded-lg bg-white p-8 shadow">
//         <Link
//           href={`/profile/${id}`}
//           className="text-sm text-indigo-600 hover:underline"
//         >
//           ← Back to Profile
//         </Link>

//         <h1 className="text-2xl font-bold">Resume Review</h1>
//         <a
//           href={req.resumeUrl}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="mb-4 block text-indigo-600 hover:underline"
//         >
//           View Resume
//         </a>
//         {req.description && <p className="mb-4">{req.description}</p>}

//         <h2 className="text-xl font-semibold">Feedback</h2>
//         {req.comments.length === 0 ? (
//           <p className="text-gray-500">No comments yet.</p>
//         ) : (
//           <ul className="space-y-4">
//             {req.comments.map((c) => (
//               <li key={c.id} className="rounded border p-3">
//                 <div className="mb-1 flex justify-between text-sm text-gray-600">
//                   <span>{new Date(c.createdAt).toLocaleDateString()}</span>
//                   <span>{c.reviewerProfile.name}</span>
//                 </div>
//                 {c.section && (
//                   <p className="text-sm italic text-gray-700">
//                     Section: {c.section}
//                   </p>
//                 )}
//                 <p>{c.content}</p>
//               </li>
//             ))}
//           </ul>
//         )}

//         <AddCommentForm requestId={req.id} />
//       </div>
//     </div>
//   );
// }

import React from "react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import AddCommentForm from "@/components/AddCommentForm";

type Props = {
  params: Promise<{ id: string; requestId: string }>;
};

export default async function ReviewPage({ params }: Props) {
  const { id, requestId } = await params;
  const viewer = await currentUser();
  const currentUserId = viewer?.id;

  // Load profile and request
  const profile = await prisma.profile.findUnique({ where: { userId: id } });
  if (!profile || (profile.userId !== currentUserId && !profile.isPublic)) {
    return (
      <p className="p-8 text-center text-gray-500">Profile not accessible.</p>
    );
  }

  const req = await prisma.reviewRequest.findUnique({
    where: { id: requestId },
    include: {
      comments: {
        orderBy: { createdAt: "desc" },
        include: { reviewerProfile: true },
      },
    },
  });
  if (!req || (!req.isPublic && currentUserId !== profile.userId)) {
    return (
      <p className="p-8 text-center text-gray-500">
        Request not found or private.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl space-y-6 rounded-lg bg-white p-8 shadow">
        <Link
          href={`/profile/${id}`}
          className="text-sm text-indigo-600 hover:underline"
        >
          ← Back to Profile
        </Link>

        <h1 className="text-2xl font-bold">Resume Review</h1>
        <a
          href={req.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-4 block text-indigo-600 hover:underline"
        >
          View Resume
        </a>
        {req.description && <p className="mb-4">{req.description}</p>}

        <h2 className="text-xl font-semibold">Feedback</h2>
        {req.comments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          <ul className="space-y-4">
            {req.comments.map((c) => (
              <li key={c.id} className="rounded border p-3">
                <div className="mb-1 flex justify-between text-sm text-gray-600">
                  <span>{new Date(c.createdAt).toLocaleDateString()}</span>
                  <span>{c.reviewerProfile.name}</span>
                </div>
                {c.section && (
                  <p className="text-sm italic text-gray-700">
                    Section: {c.section}
                  </p>
                )}
                <p>{c.content}</p>
              </li>
            ))}
          </ul>
        )}

        <AddCommentForm requestId={req.id} />
      </div>
    </div>
  );
}
