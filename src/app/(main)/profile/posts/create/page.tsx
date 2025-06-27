// // "use client";

// // import { useState } from "react";
// // import { useRouter } from "next/navigation";
// // import { useUser } from "@clerk/nextjs";
// // import axios from "axios";

// // export default function CreateSuccessStoryPage() {
// //   const { isSignedIn, user } = useUser();
// //   const router = useRouter();

// //   const [title, setTitle]           = useState("");
// //   const [content, setContent]       = useState("");
// //   const [isAnonymous, setAnonymous] = useState(false);
// //   const [error, setError]           = useState<string | null>(null);

// //   if (!isSignedIn) {
// //     return <p className="p-8 text-center">Please sign in to post a story.</p>;
// //   }

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     try {
// //       await axios.post("/api/posts", {
// //         userId:      user.id,
// //         title,
// //         content,
// //         isAnonymous,
// //         type: "SUCCESS",
// //       });
// //       // back to your own profile after posting
// //       router.push(`/profile/${user.id}`);
// //     } catch (err: any) {
// //       console.error(err);
// //       setError(err.response?.data?.error || "Failed to post");
// //     }
// //   };

// //   return (
// //     <div className="max-w-lg mx-auto py-8">
// //       <h1 className="text-2xl font-bold mb-4">Share a Success Story</h1>
// //       {error && (
// //         <div className="mb-4 p-2 bg-red-100 text-red-800 rounded">{error}</div>
// //       )}
// //       <form onSubmit={handleSubmit} className="space-y-4">
// //         <label className="block">
// //           Title (optional)
// //           <input
// //             value={title}
// //             onChange={(e) => setTitle(e.target.value)}
// //             className="mt-1 block w-full rounded border px-3 py-2"
// //             placeholder="e.g. Landed my dream role at Acme"
// //           />
// //         </label>
// //         <label className="block">
// //           Your Story
// //           <textarea
// //             value={content}
// //             onChange={(e) => setContent(e.target.value)}
// //             required
// //             className="mt-1 block w-full rounded border px-3 py-2"
// //             rows={5}
// //             placeholder="Tell us what happened..."
// //           />
// //         </label>
// //         <label className="inline-flex items-center gap-2">
// //           <input
// //             type="checkbox"
// //             checked={isAnonymous}
// //             onChange={(e) => setAnonymous(e.target.checked)}
// //           />
// //           Post anonymously
// //         </label>
// //         <button
// //           type="submit"
// //           className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700"
// //         >
// //           Publish Story
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useUser } from "@clerk/nextjs";
// import axios from "axios";
// import MarkdownEditor from "@/components/MarkdownEditor";

// const POST_TYPES = [
//   { value: "SUCCESS", label: "Success Story" },
//   { value: "BLOG",    label: "Blog Post" },
// ];

// export default function CreatePostPage() {
//   const { isSignedIn, user } = useUser();
//   const router = useRouter();

//   const [type, setType]         = useState<"SUCCESS" | "BLOG">("SUCCESS");
//   const [title, setTitle]       = useState("");
//   const [content, setContent]   = useState("");
//   const [isAnonymous, setAnon]  = useState(false);
//   const [error, setError]       = useState<string | null>(null);

//   if (!isSignedIn) {
//     return <p className="p-8 text-center">Please sign in to post.</p>;
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!content.trim()) {
//       setError("Content cannot be empty.");
//       return;
//     }
//     try {
//       await axios.post("/api/posts", {
//         userId:      user.id,
//         type,
//         title:       title.trim() || null,
//         content:     content.trim(),
//         isAnonymous,
//       });
//       router.push(`/profile/${user.id}`);
//     } catch  (err) {
//       console.error(err);
//       setError(err.response?.data?.error || "Failed to post");
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto py-8">
//       <h1 className="text-2xl font-bold mb-4">
//         {type === "SUCCESS" ? "Share a Success Story" : "Write a Blog Post"}
//       </h1>

//       {error && (
//         <div className="mb-4 p-2 bg-red-100 text-red-800 rounded">
//           {error}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Type selector */}
//         <label className="block">
//           <span className="font-medium">Post type</span>
//           <select
//             value={type}
//             onChange={e => setType(e.target.value as any)}
//             className="mt-1 block w-full rounded border px-3 py-2"
//           >
//             {POST_TYPES.map(opt => (
//               <option key={opt.value} value={opt.value}>
//                 {opt.label}
//               </option>
//             ))}
//           </select>
//         </label>

//         {/* Title (optional for SUCCESS, required for BLOG) */}
//         <label className="block">
//           <span className="font-medium">
//             Title {type === "BLOG" && <span className="text-red-500">*</span>}
//           </span>
//           <input
//             value={title}
//             onChange={e => setTitle(e.target.value)}
//             placeholder={
//               type === "SUCCESS"
//                 ? "Optional summary (e.g. Landed my dream role...)"
//                 : "Blog title"
//             }
//             className="mt-1 block w-full rounded border px-3 py-2"
//             required={type === "BLOG"}
//           />
//         </label>

//         {/* Content */}
//         <label className="block">
//           <span className="font-medium">Content <span className="text-red-500">*</span></span>
//           <MarkdownEditor
//             value={content}
//             onChange={setContent}
//           />
//         </label>

//         {/* Anonymous checkbox */}
//         <label className="inline-flex items-center gap-2">
//           <input
//             type="checkbox"
//             checked={isAnonymous}
//             onChange={e => setAnon(e.target.checked)}
//           />
//           Post anonymously
//         </label>

//         <button
//           type="submit"
//           className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700"
//         >
//           {type === "SUCCESS" ? "Publish Story" : "Publish Blog"}
//         </button>
//       </form>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
// import MarkdownEditor from "@/components/MarkdownEditor";

const POST_TYPES = [
  { value: "SUCCESS", label: "Success Story" },
  { value: "BLOG", label: "Blog Post" },
];

export default function CreatePostPage() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  const [type, setType] = useState<"SUCCESS" | "BLOG">("SUCCESS");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAnonymous, setAnon] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isSignedIn) {
    return <p className="p-8 text-center">Please sign in to post.</p>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      setError("Content cannot be empty.");
      return;
    }
    try {
      await axios.post("/api/posts", {
        userId: user.id,
        type,
        title: title.trim() || null,
        content: content.trim(),
        isAnonymous,
      });
      router.push(`/profile/${user.id}`);
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Failed to post");
      } else {
        setError("Failed to post");
      }
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center py-8">
      <h1 className="mb-4 text-2xl font-bold">
        {type === "SUCCESS" ? "Share a Success Story" : "Write a Blog Post"}
      </h1>

      {error && (
        <div className="mb-4 rounded bg-red-100 p-2 text-red-800">{error}</div>
      )}

      <form
        onSubmit={handleSubmit}
        className="w-full space-y-4 p-8 md:w-1/2 lg:w-2/5"
      >
        {/* Type selector */}
        <label className="block">
          <span className="font-medium">Post type</span>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as "SUCCESS" | "BLOG")}
            className="mt-1 block w-full rounded border px-3 py-2"
          >
            {POST_TYPES.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>

        {/* Title (optional for SUCCESS, required for BLOG) */}
        <label className="block">
          <span className="font-medium">
            Title {type === "BLOG" && <span className="text-red-500">*</span>}
          </span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={
              type === "SUCCESS"
                ? "Optional summary (e.g. Landed my dream role...)"
                : "Blog title"
            }
            className="mt-1 block w-full rounded border px-3 py-2"
            required={type === "BLOG"}
          />
        </label>

        {/* Content */}
        <label className="block">
          <span className="font-medium">
            Content <span className="text-red-500">*</span>
          </span>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            required
            className="mt-1 block w-full rounded border px-3 py-2"
          />
        </label>

        {/* Anonymous checkbox */}
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => setAnon(e.target.checked)}
          />
          Post anonymously
        </label>

        <button
          type="submit"
          className="w-full rounded bg-teal-600 py-2 text-white hover:bg-teal-700"
        >
          {type === "SUCCESS" ? "Publish Story" : "Publish Blog"}
        </button>
      </form>
    </div>
  );
}
