// // // import React from "react";
// // // import Link from "next/link";
// // // import prisma from "@/lib/prisma";
// // // import { currentUser } from "@clerk/nextjs/server";
// // // import PortfolioList from "@/components/PortfolioList";
// // // import ShareProfileButton from "@/components/ShareProfileButton";
// // // import Image from "next/image";

// // // interface ProfilePageProps {
// // //   params: Promise<{ id: string }>;
// // // }

// // // export default async function ProfilePage({ params }: ProfilePageProps) {
// // //   const { id: profileUserIdToView } = await params;
// // //   const viewer = await currentUser();
// // //   const currentLoggedInUserId = viewer?.id;

// // //   const p = await prisma.profile.findUnique({
// // //     where: { userId: profileUserIdToView },
// // //   });

// // //   if (!p) {
// // //     return (
// // //       <div className="mx-auto max-w-md py-12 text-center text-gray-600 dark:text-gray-300">
// // //         Profile not found.
// // //       </div>
// // //     );
// // //   }

// // //   if (!p.isPublic && p.userId !== currentLoggedInUserId) {
// // //     return (
// // //       <div className="mx-auto max-w-md py-12 text-center text-gray-600 dark:text-gray-300">
// // //         This profile is private.
// // //       </div>
// // //     );
// // //   }

// // //   const [stories, blogs, reviewRequests, livingPortfolios] = await Promise.all([
// // //     prisma.post.findMany({
// // //       where: { profileId: p.id, type: "SUCCESS" },
// // //       orderBy: { createdAt: "desc" },
// // //     }),
// // //     prisma.post.findMany({
// // //       where: { profileId: p.id, type: "BLOG" },
// // //       orderBy: { createdAt: "desc" },
// // //     }),
// // //     prisma.reviewRequest.findMany({
// // //       where: { profileId: p.id },
// // //       orderBy: { createdAt: "desc" },
// // //     }),
// // //     prisma.livingPortfolio.findMany({
// // //       where: { profileId: p.id },
// // //       orderBy: { updatedAt: "desc" },
// // //       select: {
// // //         id: true,
// // //         title: true,
// // //         isPublic: true,
// // //         slug: true,
// // //         updatedAt: true,
// // //       },
// // //     }),
// // //   ]);

// // //   const initials = p.name
// // //     .split(" ")
// // //     .map((n) => n[0])
// // //     .join("")
// // //     .substring(0, 2)
// // //     .toUpperCase();
// // //   const skills =
// // //     p.skills
// // //       ?.split(",")
// // //       .map((s) => s.trim())
// // //       .filter(Boolean) || [];
// // //   let projects: { name: string; link: string }[] = [];
// // //   try {
// // //     if (p.projects) {
// // //       const parsedProjects = JSON.parse(p.projects);
// // //       if (Array.isArray(parsedProjects)) {
// // //         projects = parsedProjects.filter(
// // //           (proj) =>
// // //             typeof proj === "object" &&
// // //             proj !== null &&
// // //             "name" in proj &&
// // //             "link" in proj,
// // //         );
// // //       }
// // //     }
// // //   } catch (e) {
// // //     console.error("Profile projects parse error:", e);
// // //   }

// // //   const formatDateTime = (date: Date | string) => {
// // //     const d = new Date(date);
// // //     const day = String(d.getDate()).padStart(2, "0");
// // //     const month = String(d.getMonth() + 1).padStart(2, "0");
// // //     const year = d.getFullYear();
// // //     const hours = String(d.getHours()).padStart(2, "0");
// // //     const minutes = String(d.getMinutes()).padStart(2, "0");
// // //     return `${day}/${month}/${year} ${hours}:${minutes}`;
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-b from-teal-50 via-gray-50 via-gray-800/50 to-teal-100 px-4 py-12 dark:from-gray-800 dark:to-gray-900 sm:px-6 lg:px-8">
// // //       <div className="mx-auto max-w-5xl">
// // //         {/* Hero Section */}
// // //         <div className="mb-10 rounded-2xl bg-white p-8 shadow-2xl dark:border dark:border-gray-600 dark:bg-gray-700/50">
// // //           <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-start">
// // //             <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
// // //               {p.profilePicture ? (
// // //                 <Image
// // //                   src={p.profilePicture}
// // //                   alt={p.name}
// // //                   width={24}
// // //                   height={24}
// // //                   className="h-24 w-24 rounded-full border-4 border-teal-500 object-cover shadow-lg dark:border-teal-400"
// // //                 />
// // //               ) : (
// // //                 <div className="flex h-24 w-24 items-center justify-center rounded-full bg-teal-600 text-3xl font-bold text-white shadow-lg dark:bg-teal-500">
// // //                   {initials}
// // //                 </div>
// // //               )}
// // //               <div className="text-center sm:text-left">
// // //                 <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
// // //                   {p.name}
// // //                 </h1>
// // //                 {p.tagline && (
// // //                   <p className="mt-1.5 text-lg italic text-gray-600 dark:text-gray-300">
// // //                     {p.tagline}
// // //                   </p>
// // //                 )}
// // //               </div>
// // //             </div>
// // //             <div className="mt-4 flex flex-shrink-0 gap-3 sm:mt-0">
// // //               <ShareProfileButton profileId={p.id} profileName={p.name} />
// // //               {currentLoggedInUserId === p.userId && (
// // //                 <Link
// // //                   href="/profile/create"
// // //                   className="rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition duration-200 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:hover:bg-teal-500"
// // //                 >
// // //                   Edit Profile
// // //                 </Link>
// // //               )}
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Main Content */}
// // //         <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
// // //           {/* Left Column */}
// // //           <div className="space-y-8 lg:col-span-1">
// // //             {/* About Section */}
// // //             {p.bio && (
// // //               <div className="rounded-2xl bg-white p-6 shadow-xl dark:border dark:border-gray-600 dark:bg-gray-700/50">
// // //                 <h2 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-900 dark:border-gray-600 dark:text-gray-100">
// // //                   About
// // //                 </h2>
// // //                 <p className="prose prose-sm max-w-none break-words leading-relaxed text-gray-700 dark:prose-invert dark:text-gray-300">
// // //                   {p.bio}
// // //                 </p>
// // //                 <ul className="mt-5 space-y-2.5 text-sm text-gray-600 dark:text-gray-300">
// // //                   {p.jobTitle && (
// // //                     <li>
// // //                       <strong>Title:</strong> {p.jobTitle}
// // //                     </li>
// // //                   )}
// // //                   {p.socialLink && (
// // //                     <li>
// // //                       <strong>Social:</strong>{" "}
// // //                       <a
// // //                         href={p.socialLink}
// // //                         target="_blank"
// // //                         rel="noopener noreferrer"
// // //                         className="break-all text-teal-600 hover:underline dark:text-teal-400"
// // //                       >
// // //                         {p.socialLink}
// // //                       </a>
// // //                     </li>
// // //                   )}
// // //                   {p.industry && (
// // //                     <li>
// // //                       <strong>Industry:</strong> {p.industry}
// // //                     </li>
// // //                   )}
// // //                 </ul>
// // //               </div>
// // //             )}
// // //             {/* Skills */}
// // //             {skills.length > 0 && (
// // //               <div className="rounded-2xl bg-white p-6 shadow-xl dark:border dark:border-gray-600 dark:bg-gray-700/50">
// // //                 <h2 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-900 dark:border-gray-600 dark:text-gray-100">
// // //                   Skills
// // //                 </h2>
// // //                 <ul className="flex flex-wrap gap-2.5">
// // //                   {skills.map((skill) => (
// // //                     <li
// // //                       key={skill}
// // //                       className="rounded-full bg-teal-100 px-3.5 py-1.5 text-xs font-medium text-teal-700 shadow-sm dark:bg-teal-800/60 dark:text-teal-200"
// // //                     >
// // //                       {skill}
// // //                     </li>
// // //                   ))}
// // //                 </ul>
// // //               </div>
// // //             )}
// // //             {/* Projects */}
// // //             {projects.length > 0 && (
// // //               <div className="rounded-2xl bg-white p-6 shadow-xl dark:border dark:border-gray-600 dark:bg-gray-700/50">
// // //                 <h2 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-900 dark:border-gray-600 dark:text-gray-100">
// // //                   Featured Projects
// // //                 </h2>
// // //                 <ul className="space-y-3">
// // //                   {projects.map((proj, idx) => (
// // //                     <li key={idx} className="text-sm">
// // //                       <a
// // //                         href={proj.link}
// // //                         target="_blank"
// // //                         rel="noopener noreferrer"
// // //                         className="font-medium text-teal-600 hover:underline dark:text-teal-400"
// // //                       >
// // //                         {proj.name}
// // //                       </a>
// // //                     </li>
// // //                   ))}
// // //                 </ul>
// // //               </div>
// // //             )}
// // //           </div>

// // //           {/* Right Column */}
// // //           <div className="space-y-10 lg:col-span-2">
// // //             {/* Living Portfolios */}
// // //             {(currentLoggedInUserId === p.userId ||
// // //               livingPortfolios.some((lp) => lp.isPublic)) && (
// // //               <div className="rounded-2xl bg-white p-6 shadow-xl dark:border dark:border-gray-600 dark:bg-gray-700/50">
// // //                 <div className="mb-5 flex flex-col items-start justify-between gap-3 border-b border-gray-200 pb-3 dark:border-gray-600 sm:flex-row sm:items-center">
// // //                   <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
// // //                     Living Portfolios
// // //                   </h2>
// // //                   {currentLoggedInUserId === p.userId && (
// // //                     <Link
// // //                       href={`/wizard?step=3`}
// // //                       className="self-end rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition duration-200 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 sm:self-center"
// // //                     >
// // //                       + Create New Portfolio
// // //                     </Link>
// // //                   )}
// // //                 </div>
// // //                 <PortfolioList
// // //                   initialPortfolios={livingPortfolios.filter(
// // //                     (lp) => lp.isPublic || currentLoggedInUserId === p.userId,
// // //                   )}
// // //                   profileOwnerId={p.userId}
// // //                   currentUserId={currentLoggedInUserId}
// // //                 />
// // //               </div>
// // //             )}

// // //             {/* Success Stories */}
// // //             <div className="rounded-2xl bg-white p-6 shadow-xl dark:border dark:border-gray-600 dark:bg-gray-700/50">
// // //               <h2 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-900 dark:border-gray-600 dark:text-gray-100">
// // //                 Success Stories
// // //               </h2>
// // //               {stories.length === 0 ? (
// // //                 <p className="text-gray-500 dark:text-gray-400">
// // //                   No stories yet.
// // //                 </p>
// // //               ) : (
// // //                 <ul className="space-y-4">
// // //                   {stories.map((s) => (
// // //                     <li
// // //                       key={s.id}
// // //                       className="rounded-lg border border-gray-200 p-4 transition duration-200 hover:bg-gray-50/50 dark:border-gray-600 dark:hover:bg-gray-600/30"
// // //                     >
// // //                       <div className="mb-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
// // //                         <span>{formatDateTime(s.createdAt)}</span>
// // //                         <span>{s.isAnonymous ? "Anonymous" : p.name}</span>
// // //                       </div>
// // //                       {s.title && (
// // //                         <h3 className="mb-1.5 break-words font-semibold text-gray-800 dark:text-gray-100">
// // //                           {s.title}
// // //                         </h3>
// // //                       )}
// // //                       <div className="flex items-end justify-between">
// // //                         <p className="whitespace-pre-wrap break-words text-sm text-gray-700 dark:text-gray-300">
// // //                           {s.content}
// // //                         </p>
// // //                         {currentLoggedInUserId === p.userId && (
// // //                           <Link
// // //                             href={`/profile/${profileUserIdToView}/posts/${s.id}/edit`}
// // //                             className="ml-4 whitespace-nowrap rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-700 transition duration-200 hover:bg-teal-200 dark:bg-teal-800/60 dark:text-teal-200 dark:hover:bg-teal-700/60"
// // //                           >
// // //                             Edit
// // //                           </Link>
// // //                         )}
// // //                       </div>
// // //                     </li>
// // //                   ))}
// // //                 </ul>
// // //               )}
// // //             </div>

// // //             {/* Blog Posts */}
// // //             <div className="rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-700">
// // //               <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
// // //                 Blog Posts
// // //               </h2>
// // //               {blogs.length === 0 ? (
// // //                 <p className="text-gray-500 dark:text-gray-400">
// // //                   No blog posts yet.
// // //                 </p>
// // //               ) : (
// // //                 <ul className="space-y-4">
// // //                   {blogs.map((b) => {
// // //                     const snippet =
// // //                       b.content.length > 150
// // //                         ? b.content.slice(0, 150) + "…"
// // //                         : b.content;
// // //                     return (
// // //                       <li
// // //                         key={b.id}
// // //                         className="rounded-lg border border-gray-200 p-4 transition duration-200 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-600"
// // //                       >
// // //                         <div className="mb-1 flex justify-between">
// // //                           <h3 className="break-words text-lg font-semibold text-gray-900 dark:text-gray-100">
// // //                             {b.title}
// // //                           </h3>
// // //                           <span className="text-sm text-gray-600 dark:text-gray-400">
// // //                             {formatDateTime(new Date(b.createdAt))}
// // //                           </span>
// // //                         </div>
// // //                         <p className="mb-2 whitespace-pre-wrap break-words text-gray-600 dark:text-gray-300">
// // //                           {snippet}
// // //                         </p>
// // //                         <div className="flex items-center justify-between">
// // //                           <Link
// // //                             href={`/profile/${profileUserIdToView}/posts/${b.id}`}
// // //                             className="text-sm text-teal-600 hover:underline dark:text-teal-400"
// // //                           >
// // //                             Read more
// // //                           </Link>
// // //                           {currentLoggedInUserId === p.userId && (
// // //                             <Link
// // //                               href={`/profile/${profileUserIdToView}/posts/${b.id}/edit`}
// // //                               className="rounded-full bg-teal-100 px-3 py-1 text-sm font-medium text-teal-700 hover:bg-teal-200 dark:bg-teal-800 dark:text-teal-200 dark:hover:bg-teal-700"
// // //                             >
// // //                               Edit
// // //                             </Link>
// // //                           )}
// // //                         </div>
// // //                       </li>
// // //                     );
// // //                   })}
// // //                 </ul>
// // //               )}
// // //             </div>

// // //             {/* Resume Review Requests */}
// // //             <div className="rounded-lg bg-white p-6 shadow">
// // //               <h2 className="mb-4 text-xl font-semibold">
// // //                 Resume Review Requests
// // //               </h2>
// // //               {currentLoggedInUserId === p.userId && (
// // //                 <Link
// // //                   href={`/profile/${profileUserIdToView}/reviews/create`}
// // //                   className="mb-4 inline-block rounded bg-teal-600 px-4 py-2 text-white"
// // //                 >
// // //                   Ask for Review
// // //                 </Link>
// // //               )}
// // //               {reviewRequests.length === 0 ? (
// // //                 <p className="text-gray-500">No review requests yet.</p>
// // //               ) : (
// // //                 <ul className="space-y-4">
// // //                   {reviewRequests.map((r) => (
// // //                     <li key={r.id} className="rounded border p-4">
// // //                       <div className="mb-2 flex justify-between text-sm text-gray-600">
// // //                         <span>{new Date(r.createdAt).toLocaleString()}</span>
// // //                         <span
// // //                           className={
// // //                             r.isPublic ? "text-green-600" : "text-red-600"
// // //                           }
// // //                         >
// // //                           {r.isPublic ? "Public" : "Private"}
// // //                         </span>
// // //                       </div>
// // //                       <p className="mb-2">
// // //                         <strong>Resume:</strong>{" "}
// // //                         <a
// // //                           href={r.resumeUrl}
// // //                           target="_blank"
// // //                           rel="noreferrer"
// // //                           className="text-teal-600 hover:underline"
// // //                         >
// // //                           View
// // //                         </a>
// // //                       </p>
// // //                       {r.description && <p className="mb-2">{r.description}</p>}
// // //                       <Link
// // //                         href={`/profile/${profileUserIdToView}/reviews/${r.id}`}
// // //                         className="text-teal-600 hover:underline"
// // //                       >
// // //                         View & Comment
// // //                       </Link>
// // //                     </li>
// // //                   ))}
// // //                 </ul>
// // //               )}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // src/app/(main)/profile/[id]/page.tsx
// // import React from "react";
// // // import Link from "next/link";
// // import prisma from "@/lib/prisma";
// // // import { currentUser } from "@clerk/nextjs/server";
// // // import PortfolioList from "@/components/PortfolioList";
// // // import ShareProfileButton from "@/components/ShareProfileButton";
// // // import Image from "next/image";

// // interface ProfilePageProps {
// //   params: { id: string }; // <<<< CHANGED HERE: No Promise
// // }

// // export default async function ProfilePage({ params }: ProfilePageProps) {
// //   const { id: profileUserIdToView } = params; // <<<< CHANGED HERE: No await
// //   // const viewer = await currentUser();
// //   // ... rest of your component logic remains the same for now for this test
// //   // ... (prisma calls, etc.)
// //   const p = await prisma.profile.findUnique({
// //     where: { userId: profileUserIdToView },
// //   });

// //   if (!p) {
// //     return (
// //       <div className="mx-auto max-w-md py-12 text-center text-gray-600 dark:text-gray-300">
// //         Profile not found.
// //       </div>
// //     );
// //   }
// //   // ... rest of the component ...
// //   return (
// //     <div>
// //       Profile for: {profileUserIdToView}
// //       {/* ... your existing JSX ... */}
// //     </div>
// //   );
// // }

// // src/app/(main)/profile/[id]/page.tsx
// import React from "react";
// import Link from "next/link";
// import prisma from "@/lib/prisma";
// import { currentUser } from "@clerk/nextjs/server";
// import PortfolioList from "@/components/PortfolioList";
// import ShareProfileButton from "@/components/ShareProfileButton";
// import Image from "next/image";

// interface ProfilePageProps {
//   params: Promise<{ id: string }>; // Define params as a Promise
// }

// export default async function ProfilePage({ params }: ProfilePageProps) {
//   const { id: profileUserIdToView } = await params; // Await the params to resolve
//   const viewer = await currentUser();
//   const currentLoggedInUserId = viewer?.id;

//   const p = await prisma.profile.findUnique({
//     where: { userId: profileUserIdToView },
//   });

//   if (!p) {
//     return (
//       <div className="mx-auto max-w-md py-12 text-center text-gray-600 dark:text-gray-300">
//         Profile not found.
//       </div>
//     );
//   }

//   if (!p.isPublic && p.userId !== currentLoggedInUserId) {
//     return (
//       <div className="mx-auto max-w-md py-12 text-center text-gray-600 dark:text-gray-300">
//         This profile is private.
//       </div>
//     );
//   }

//   const [stories, blogs, reviewRequests, livingPortfolios] = await Promise.all([
//     prisma.post.findMany({
//       where: { profileId: p.id, type: "SUCCESS" },
//       orderBy: { createdAt: "desc" },
//     }),
//     prisma.post.findMany({
//       where: { profileId: p.id, type: "BLOG" },
//       orderBy: { createdAt: "desc" },
//     }),
//     prisma.reviewRequest.findMany({
//       where: { profileId: p.id },
//       orderBy: { createdAt: "desc" },
//     }),
//     prisma.livingPortfolio.findMany({
//       where: { profileId: p.id },
//       orderBy: { updatedAt: "desc" },
//       select: {
//         id: true,
//         title: true,
//         isPublic: true,
//         slug: true,
//         updatedAt: true,
//       },
//     }),
//   ]);

//   const initials = p.name
//     .split(" ")
//     .map((n) => n[0])
//     .join("")
//     .substring(0, 2)
//     .toUpperCase();
//   const skills =
//     p.skills
//       ?.split(",")
//       .map((s) => s.trim())
//       .filter(Boolean) || [];
//   let projects: { name: string; link: string }[] = [];
//   try {
//     if (p.projects) {
//       const parsedProjects = JSON.parse(p.projects);
//       if (Array.isArray(parsedProjects)) {
//         projects = parsedProjects.filter(
//           (proj) =>
//             typeof proj === "object" &&
//             proj !== null &&
//             "name" in proj &&
//             "link" in proj,
//         );
//       }
//     }
//   } catch (e) {
//     console.error("Profile projects parse error:", e);
//   }

//   const formatDateTime = (date: Date | string) => {
//     const d = new Date(date);
//     const day = String(d.getDate()).padStart(2, "0");
//     const month = String(d.getMonth() + 1).padStart(2, "0");
//     const year = d.getFullYear();
//     const hours = String(d.getHours()).padStart(2, "0");
//     const minutes = String(d.getMinutes()).padStart(2, "0");
//     return `${day}/${month}/${year} ${hours}:${minutes}`;
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-teal-50 via-gray-50 via-gray-800/50 to-teal-100 px-4 py-12 dark:from-gray-800 dark:to-gray-900 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-5xl">
//         {/* Hero Section */}
//         <div className="mb-10 rounded-2xl bg-white p-8 shadow-2xl dark:border dark:border-gray-600 dark:bg-gray-700/50">
//           <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-start">
//             <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
//               {p.profilePicture ? (
//                 <Image
//                   src={p.profilePicture}
//                   alt={p.name}
//                   width={24}
//                   height={24}
//                   className="h-24 w-24 rounded-full border-4 border-teal-500 object-cover shadow-lg dark:border-teal-400"
//                 />
//               ) : (
//                 <div className="flex h-24 w-24 items-center justify-center rounded-full bg-teal-600 text-3xl font-bold text-white shadow-lg dark:bg-teal-500">
//                   {initials}
//                 </div>
//               )}
//               <div className="text-center sm:text-left">
//                 <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
//                   {p.name}
//                 </h1>
//                 {p.tagline && (
//                   <p className="mt-1.5 text-lg italic text-gray-600 dark:text-gray-300">
//                     {p.tagline}
//                   </p>
//                 )}
//               </div>
//             </div>
//             <div className="mt-4 flex flex-shrink-0 gap-3 sm:mt-0">
//               <ShareProfileButton profileId={p.id} profileName={p.name} />
//               {currentLoggedInUserId === p.userId && (
//                 <Link
//                   href="/profile/create"
//                   className="rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition duration-200 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:hover:bg-teal-500"
//                 >
//                   Edit Profile
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
//           {/* Left Column */}
//           <div className="space-y-8 lg:col-span-1">
//             {/* About Section */}
//             {p.bio && (
//               <div className="rounded-2xl bg-white p-6 shadow-xl dark:border dark:border-gray-600 dark:bg-gray-700/50">
//                 <h2 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-900 dark:border-gray-600 dark:text-gray-100">
//                   About
//                 </h2>
//                 <p className="prose prose-sm max-w-none break-words leading-relaxed text-gray-700 dark:prose-invert dark:text-gray-300">
//                   {p.bio}
//                 </p>
//                 <ul className="mt-5 space-y-2.5 text-sm text-gray-600 dark:text-gray-300">
//                   {p.jobTitle && (
//                     <li>
//                       <strong>Title:</strong> {p.jobTitle}
//                     </li>
//                   )}
//                   {p.socialLink && (
//                     <li>
//                       <strong>Social:</strong>{" "}
//                       <a
//                         href={p.socialLink}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="break-all text-teal-600 hover:underline dark:text-teal-400"
//                       >
//                         {p.socialLink}
//                       </a>
//                     </li>
//                   )}
//                   {p.industry && (
//                     <li>
//                       <strong>Industry:</strong> {p.industry}
//                     </li>
//                   )}
//                 </ul>
//               </div>
//             )}
//             {/* Skills */}
//             {skills.length > 0 && (
//               <div className="rounded-2xl bg-white p-6 shadow-xl dark:border dark:border-gray-600 dark:bg-gray-700/50">
//                 <h2 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-900 dark:border-gray-600 dark:text-gray-100">
//                   Skills
//                 </h2>
//                 <ul className="flex flex-wrap gap-2.5">
//                   {skills.map((skill) => (
//                     <li
//                       key={skill}
//                       className="rounded-full bg-teal-100 px-3.5 py-1.5 text-xs font-medium text-teal-700 shadow-sm dark:bg-teal-800/60 dark:text-teal-200"
//                     >
//                       {skill}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//             {/* Projects */}
//             {projects.length > 0 && (
//               <div className="rounded-2xl bg-white p-6 shadow-xl dark:border dark:border-gray-600 dark:bg-gray-700/50">
//                 <h2 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-900 dark:border-gray-600 dark:text-gray-100">
//                   Featured Projects
//                 </h2>
//                 <ul className="space-y-3">
//                   {projects.map((proj, idx) => (
//                     <li key={idx} className="text-sm">
//                       <a
//                         href={proj.link}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="font-medium text-teal-600 hover:underline dark:text-teal-400"
//                       >
//                         {proj.name}
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>

//           {/* Right Column */}
//           <div className="space-y-10 lg:col-span-2">
//             {/* Living Portfolios */}
//             {(currentLoggedInUserId === p.userId ||
//               livingPortfolios.some((lp) => lp.isPublic)) && (
//               <div className="rounded-2xl bg-white p-6 shadow-xl dark:border dark:border-gray-600 dark:bg-gray-700/50">
//                 <div className="mb-5 flex flex-col items-start justify-between gap-3 border-b border-gray-200 pb-3 dark:border-gray-600 sm:flex-row sm:items-center">
//                   <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
//                     Living Portfolios
//                   </h2>
//                   {currentLoggedInUserId === p.userId && (
//                     <Link
//                       href={`/wizard?step=3`}
//                       className="self-end rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition duration-200 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 sm:self-center"
//                     >
//                       + Create New Portfolio
//                     </Link>
//                   )}
//                 </div>
//                 <PortfolioList
//                   initialPortfolios={livingPortfolios.filter(
//                     (lp) => lp.isPublic || currentLoggedInUserId === p.userId,
//                   )}
//                   profileOwnerId={p.userId}
//                   currentUserId={currentLoggedInUserId}
//                 />
//               </div>
//             )}

//             {/* Success Stories */}
//             <div className="rounded-2xl bg-white p-6 shadow-xl dark:border dark:border-gray-600 dark:bg-gray-700/50">
//               <h2 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-900 dark:border-gray-600 dark:text-gray-100">
//                 Success Stories
//               </h2>
//               {stories.length === 0 ? (
//                 <p className="text-gray-500 dark:text-gray-400">
//                   No stories yet.
//                 </p>
//               ) : (
//                 <ul className="space-y-4">
//                   {stories.map((s) => (
//                     <li
//                       key={s.id}
//                       className="rounded-lg border border-gray-200 p-4 transition duration-200 hover:bg-gray-50/50 dark:border-gray-600 dark:hover:bg-gray-600/30"
//                     >
//                       <div className="mb-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
//                         <span>{formatDateTime(s.createdAt)}</span>
//                         <span>{s.isAnonymous ? "Anonymous" : p.name}</span>
//                       </div>
//                       {s.title && (
//                         <h3 className="mb-1.5 break-words font-semibold text-gray-800 dark:text-gray-100">
//                           {s.title}
//                         </h3>
//                       )}
//                       <div className="flex items-end justify-between">
//                         <p className="whitespace-pre-wrap break-words text-sm text-gray-700 dark:text-gray-300">
//                           {s.content}
//                         </p>
//                         {currentLoggedInUserId === p.userId && (
//                           <Link
//                             href={`/profile/${profileUserIdToView}/posts/${s.id}/edit`}
//                             className="ml-4 whitespace-nowrap rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-700 transition duration-200 hover:bg-teal-200 dark:bg-teal-800/60 dark:text-teal-200 dark:hover:bg-teal-700/60"
//                           >
//                             Edit
//                           </Link>
//                         )}
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>

//             {/* Blog Posts */}
//             <div className="rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-700">
//               <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
//                 Blog Posts
//               </h2>
//               {blogs.length === 0 ? (
//                 <p className="text-gray-500 dark:text-gray-400">
//                   No blog posts yet.
//                 </p>
//               ) : (
//                 <ul className="space-y-4">
//                   {blogs.map((b) => {
//                     const snippet =
//                       b.content.length > 150
//                         ? b.content.slice(0, 150) + "…"
//                         : b.content;
//                     return (
//                       <li
//                         key={b.id}
//                         className="rounded-lg border border-gray-200 p-4 transition duration-200 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-600"
//                       >
//                         <div className="mb-1 flex justify-between">
//                           <h3 className="break-words text-lg font-semibold text-gray-900 dark:text-gray-100">
//                             {b.title}
//                           </h3>
//                           <span className="text-sm text-gray-600 dark:text-gray-400">
//                             {formatDateTime(new Date(b.createdAt))}
//                           </span>
//                         </div>
//                         <p className="mb-2 whitespace-pre-wrap break-words text-gray-600 dark:text-gray-300">
//                           {snippet}
//                         </p>
//                         <div className="flex items-center justify-between">
//                           <Link
//                             href={`/profile/${profileUserIdToView}/posts/${b.id}`}
//                             className="text-sm text-teal-600 hover:underline dark:text-teal-400"
//                           >
//                             Read more
//                           </Link>
//                           {currentLoggedInUserId === p.userId && (
//                             <Link
//                               href={`/profile/${profileUserIdToView}/posts/${b.id}/edit`}
//                               className="rounded-full bg-teal-100 px-3 py-1 text-sm font-medium text-teal-700 hover:bg-teal-200 dark:bg-teal-800 dark:text-teal-200 dark:hover:bg-teal-700"
//                             >
//                               Edit
//                             </Link>
//                           )}
//                         </div>
//                       </li>
//                     );
//                   })}
//                 </ul>
//               )}
//             </div>

//             {/* Resume Review Requests */}
//             <div className="rounded-lg bg-white p-6 shadow">
//               <h2 className="mb-4 text-xl font-semibold">Resume Review Requests</h2>
//               {currentLoggedInUserId === p.userId && (
//                 <Link
//                   href={`/profile/${profileUserIdToView}/reviews/create`}
//                   className="mb-4 inline-block rounded bg-teal-600 px-4 py-2 text-white"
//                 >
//                   Ask for Review
//                 </Link>
//               )}
//               {reviewRequests.length === 0 ? (
//                 <p className="text-gray-500">No review requests yet.</p>
//               ) : (
//                 <ul className="space-y-4">
//                   {reviewRequests.map((r) => (
//                     <li key={r.id} className="rounded border p-4">
//                       <div className="mb-2 flex justify-between text-sm text-gray-600">
//                         <span>{new Date(r.createdAt).toLocaleString()}</span>
//                         <span
//                           className={
//                             r.isPublic ? "text-green-600" : "text-red-600"
//                           }
//                         >
//                           {r.isPublic ? "Public" : "Private"}
//                         </span>
//                       </div>
//                       <p className="mb-2">
//                         <strong>Resume:</strong>{" "}
//                         <a
//                           href={r.resumeUrl}
//                           target="_blank"
//                           rel="noreferrer"
//                           className="text-teal-600 hover:underline"
//                         >
//                           View
//                         </a>
//                       </p>
//                       {r.description && <p className="mb-2">{r.description}</p>}
//                       <Link
//                         href={`/profile/${profileUserIdToView}/reviews/${r.id}`}
//                         className="text-teal-600 hover:underline"
//                       >
//                         View & Comment
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/app/(main)/profile/[id]/page.tsx
import React from "react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import PortfolioList from "@/components/PortfolioList";
import ShareProfileButton from "@/components/ShareProfileButton";
import Image from "next/image";

interface ProfilePageProps {
  params: Promise<{ id: string }>; // Define params as a Promise
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id: profileUserIdToView } = await params; // Await the params to resolve
  const viewer = await currentUser();
  const currentLoggedInUserId = viewer?.id;

  const p = await prisma.profile.findUnique({
    where: { userId: profileUserIdToView },
  });

  if (!p) {
    return (
      <div className="mx-auto max-w-md py-12 text-center text-gray-600 dark:text-gray-300">
        Profile not found.
      </div>
    );
  }

  if (!p.isPublic && p.userId !== currentLoggedInUserId) {
    return (
      <div className="mx-auto max-w-md py-12 text-center text-gray-600 dark:text-gray-300">
        This profile is private.
      </div>
    );
  }

  const [stories, blogs, reviewRequests, livingPortfolios] = await Promise.all([
    prisma.post.findMany({
      where: { profileId: p.id, type: "SUCCESS" },
      orderBy: { createdAt: "desc" },
    }),
    prisma.post.findMany({
      where: { profileId: p.id, type: "BLOG" },
      orderBy: { createdAt: "desc" },
    }),
    prisma.reviewRequest.findMany({
      where: { profileId: p.id },
      orderBy: { createdAt: "desc" },
    }),
    prisma.livingPortfolio.findMany({
      where: { profileId: p.id },
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        title: true,
        isPublic: true,
        slug: true,
        updatedAt: true,
      },
    }),
  ]);

  const initials = p.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
  const skills =
    p.skills
      ?.split(",")
      .map((s) => s.trim())
      .filter(Boolean) || [];
  let projects: { name: string; link: string }[] = [];
  try {
    if (p.projects) {
      const parsedProjects = JSON.parse(p.projects);
      if (Array.isArray(parsedProjects)) {
        projects = parsedProjects.filter(
          (proj) =>
            typeof proj === "object" &&
            proj !== null &&
            "name" in proj &&
            "link" in proj,
        );
      }
    }
  } catch (e) {
    console.error("Profile projects parse error:", e);
  }

  const formatDateTime = (date: Date | string) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-gray-50 via-gray-800/50 to-teal-100 px-4 py-12 dark:from-gray-800 dark:to-gray-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Hero Section */}
        <div className="mb-10 rounded-2xl bg-white p-8 shadow-2xl dark:border dark:border-gray-600 dark:bg-gray-700/50">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-start">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
              {p.profilePicture ? (
                <Image
                  src={p.profilePicture}
                  alt={p.name}
                  width={24}
                  height={24}
                  className="h-24 w-24 rounded-full border-4 border-teal-500 object-cover shadow-lg dark:border-teal-400"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-teal-600 text-3xl font-bold text-white shadow-lg dark:bg-teal-500">
                  {initials}
                </div>
              )}
              <div className="text-center sm:text-left">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                  {p.name}
                </h1>
                {p.tagline && (
                  <p className="mt-1.5 text-lg italic text-gray-600 dark:text-gray-300">
                    {p.tagline}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-4 flex flex-shrink-0 gap-3 sm:mt-0">
              <ShareProfileButton profileId={p.id} profileName={p.name} />
              {currentLoggedInUserId === p.userId && (
                <Link
                  href="/profile/create"
                  className="rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition duration-200 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:hover:bg-teal-500"
                >
                  Edit Profile
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-8 lg:col-span-1">
            {/* About Section */}
            {p.bio && (
              <div className="rounded-2xl bg-white p-6 shadow-xl dark:border dark:border-gray-600 dark:bg-gray-700/50">
                <h2 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-900 dark:border-gray-600 dark:text-gray-100">
                  About
                </h2>
                <p className="prose prose-sm max-w-none break-words leading-relaxed text-gray-700 dark:prose-invert dark:text-gray-300">
                  {p.bio}
                </p>
                <ul className="mt-5 space-y-2.5 text-sm text-gray-600 dark:text-gray-300">
                  {p.jobTitle && (
                    <li>
                      <strong>Title:</strong> {p.jobTitle}
                    </li>
                  )}
                  {p.socialLink && (
                    <li>
                      <strong>Social:</strong>{" "}
                      <a
                        href={p.socialLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="break-all text-teal-600 hover:underline dark:text-teal-400"
                      >
                        {p.socialLink}
                      </a>
                    </li>
                  )}
                  {p.industry && (
                    <li>
                      <strong>Industry:</strong> {p.industry}
                    </li>
                  )}
                </ul>
              </div>
            )}
            {/* Skills */}
            {skills.length > 0 && (
              <div className="rounded-2xl bg-white p-6 shadow-xl dark:border dark:border-gray-600 dark:bg-gray-700/50">
                <h2 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-900 dark:border-gray-600 dark:text-gray-100">
                  Skills
                </h2>
                <ul className="flex flex-wrap gap-2.5">
                  {skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full bg-teal-100 px-3.5 py-1.5 text-xs font-medium text-teal-700 shadow-sm dark:bg-teal-800/60 dark:text-teal-200"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Projects */}
            {projects.length > 0 && (
              <div className="rounded-2xl bg-white p-6 shadow-xl dark:border dark:border-gray-600 dark:bg-gray-700/50">
                <h2 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-900 dark:border-gray-600 dark:text-gray-100">
                  Featured Projects
                </h2>
                <ul className="space-y-3">
                  {projects.map((proj, idx) => (
                    <li key={idx} className="text-sm">
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-teal-600 hover:underline dark:text-teal-400"
                      >
                        {proj.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-10 lg:col-span-2">
            {/* Living Portfolios */}
            {(currentLoggedInUserId === p.userId ||
              livingPortfolios.some((lp) => lp.isPublic)) && (
              <div className="rounded-2xl bg-white p-6 shadow-xl dark:border dark:border-gray-600 dark:bg-gray-700/50">
                <div className="mb-5 flex flex-col items-start justify-between gap-3 border-b border-gray-200 pb-3 dark:border-gray-600 sm:flex-row sm:items-center">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    Living Portfolios
                  </h2>
                  {currentLoggedInUserId === p.userId && (
                    <Link
                      href={`/wizard?step=3`}
                      className="self-end rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition duration-200 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 sm:self-center"
                    >
                      + Create New Portfolio
                    </Link>
                  )}
                </div>
                <PortfolioList
                  initialPortfolios={livingPortfolios.filter(
                    (lp) => lp.isPublic || currentLoggedInUserId === p.userId,
                  )}
                  profileOwnerId={p.userId}
                  currentUserId={currentLoggedInUserId}
                />
              </div>
            )}

            {/* Success Stories */}
            <div className="rounded-2xl bg-white p-6 shadow-xl dark:border dark:border-gray-600 dark:bg-gray-700/50">
              <h2 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-900 dark:border-gray-600 dark:text-gray-100">
                Success Stories
              </h2>
              {stories.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">
                  No stories yet.
                </p>
              ) : (
                <ul className="space-y-4">
                  {stories.map((s) => (
                    <li
                      key={s.id}
                      className="rounded-lg border border-gray-200 p-4 transition duration-200 hover:bg-gray-50/50 dark:border-gray-600 dark:hover:bg-gray-600/30"
                    >
                      <div className="mb-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>{formatDateTime(s.createdAt)}</span>
                        <span>{s.isAnonymous ? "Anonymous" : p.name}</span>
                      </div>
                      {s.title && (
                        <h3 className="mb-1.5 break-words font-semibold text-gray-800 dark:text-gray-100">
                          {s.title}
                        </h3>
                      )}
                      <div className="flex items-end justify-between">
                        <p className="whitespace-pre-wrap break-words text-sm text-gray-700 dark:text-gray-300">
                          {s.content}
                        </p>
                        {currentLoggedInUserId === p.userId && (
                          <Link
                            href={`/profile/${profileUserIdToView}/posts/${s.id}/edit`}
                            className="ml-4 whitespace-nowrap rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-700 transition duration-200 hover:bg-teal-200 dark:bg-teal-800/60 dark:text-teal-200 dark:hover:bg-teal-700/60"
                          >
                            Edit
                          </Link>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Blog Posts */}
            <div className="rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-700">
              <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
                Blog Posts
              </h2>
              {blogs.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">
                  No blog posts yet.
                </p>
              ) : (
                <ul className="space-y-4">
                  {blogs.map((b) => {
                    const snippet =
                      b.content.length > 150
                        ? b.content.slice(0, 150) + "…"
                        : b.content;
                    return (
                      <li
                        key={b.id}
                        className="rounded-lg border border-gray-200 p-4 transition duration-200 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-600"
                      >
                        <div className="mb-1 flex justify-between">
                          <h3 className="break-words text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {b.title}
                          </h3>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {formatDateTime(new Date(b.createdAt))}
                          </span>
                        </div>
                        <p className="mb-2 whitespace-pre-wrap break-words text-gray-600 dark:text-gray-300">
                          {snippet}
                        </p>
                        <div className="flex items-center justify-between">
                          <Link
                            href={`/profile/${profileUserIdToView}/posts/${b.id}`}
                            className="text-sm text-teal-600 hover:underline dark:text-teal-400"
                          >
                            Read more
                          </Link>
                          {currentLoggedInUserId === p.userId && (
                            <Link
                              href={`/profile/${profileUserIdToView}/posts/${b.id}/edit`}
                              className="rounded-full bg-teal-100 px-3 py-1 text-sm font-medium text-teal-700 hover:bg-teal-200 dark:bg-teal-800 dark:text-teal-200 dark:hover:bg-teal-700"
                            >
                              Edit
                            </Link>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Resume Review Requests */}
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-4 text-xl font-semibold">
                Resume Review Requests
              </h2>
              {currentLoggedInUserId === p.userId && (
                <Link
                  href={`/profile/${profileUserIdToView}/reviews/create`}
                  className="mb-4 inline-block rounded bg-teal-600 px-4 py-2 text-white"
                >
                  Ask for Review
                </Link>
              )}
              {reviewRequests.length === 0 ? (
                <p className="text-gray-500">No review requests yet.</p>
              ) : (
                <ul className="space-y-4">
                  {reviewRequests.map((r) => (
                    <li key={r.id} className="rounded border p-4">
                      <div className="mb-2 flex justify-between text-sm text-gray-600">
                        <span>{new Date(r.createdAt).toLocaleString()}</span>
                        <span
                          className={
                            r.isPublic ? "text-green-600" : "text-red-600"
                          }
                        >
                          {r.isPublic ? "Public" : "Private"}
                        </span>
                      </div>
                      <p className="mb-2">
                        <strong>Resume:</strong>{" "}
                        <a
                          href={r.resumeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-teal-600 hover:underline"
                        >
                          View
                        </a>
                      </p>
                      {r.description && <p className="mb-2">{r.description}</p>}
                      <Link
                        href={`/profile/${profileUserIdToView}/reviews/${r.id}`}
                        className="text-teal-600 hover:underline"
                      >
                        View & Comment
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
