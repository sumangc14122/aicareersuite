// // "use client";

// // import { useState, useEffect } from "react";
// // import { useRouter, useParams } from "next/navigation";
// // import { useUser } from "@clerk/nextjs";
// // import axios from "axios";

// // export default function EditPostPage() {
// //   const { id, postId } = useParams();  // id = profile userId, postId = post.cuid()
// //   const { isSignedIn } = useUser();
// //   const router = useRouter();

// //   const [title, setTitle]         = useState("");
// //   const [content, setContent]     = useState("");
// //   const [isAnonymous, setAnon]    = useState(false);
// //   const [type, setType]           = useState<"SUCCESS"|"BLOG">("SUCCESS");
// //   const [loaded, setLoaded]       = useState(false);
// //   const [error, setError]         = useState<string|null>(null);

// //   useEffect(() => {
// //     if (!postId) return;
// //     fetch(`/api/posts/${postId}`)
// //       .then(res => res.json())
// //       .then(post => {
// //         setType(post.type);
// //         setTitle(post.title || "");
// //         setContent(post.content);
// //         setAnon(post.isAnonymous);
// //       })
// //       .catch(() => setError("Failed to load post"))
// //       .finally(() => setLoaded(true));
// //   }, [postId]);

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!content.trim()) {
// //       setError("Content cannot be empty.");
// //       return;
// //     }
// //     try {
// //       await axios.patch(`/api/posts/${postId}`, {
// //         title:       title.trim() || null,
// //         content:     content.trim(),
// //         isAnonymous,
// //       });
// //       router.push(`/profile/${id}`);
// //     } catch {
// //       setError(e.response?.data?.error || "Update failed");
// //     }
// //   };

// //   if (!isSignedIn) {
// //     return <p className="p-8 text-center">Please sign in to edit.</p>;
// //   }
// //   if (!loaded) {
// //     return <p className="p-8 text-center">Loading…</p>;
// //   }

// //   return (
// //     <div className="max-w-lg mx-auto py-8">
// //       <h1 className="text-2xl font-bold mb-4">
// //         {type === "SUCCESS" ? "Edit Success Story" : "Edit Blog Post"}
// //       </h1>
// //       {error && (
// //         <div className="mb-4 p-2 bg-red-100 text-red-800 rounded">
// //           {error}
// //         </div>
// //       )}
// //       <form onSubmit={handleSubmit} className="space-y-4">
// //         {/* Optional: allow changing type */}
// //         <label className="block">
// //           <span className="font-medium">Type</span>
// //           <select
// //             value={type}
// //             onChange={e => setType(e.target.value as any)}
// //             className="mt-1 block w-full rounded border px-3 py-2"
// //           >
// //             <option value="SUCCESS">Success Story</option>
// //             <option value="BLOG">Blog Post</option>
// //           </select>
// //         </label>

// //         <label className="block">
// //           <span className="font-medium">
// //             Title {type==="BLOG" && <span className="text-red-500">*</span>}
// //           </span>
// //           <input
// //             value={title}
// //             onChange={e => setTitle(e.target.value)}
// //             placeholder={type==="SUCCESS"
// //               ? "Optional summary"
// //               : "Blog title"}
// //             className="mt-1 block w-full rounded border px-3 py-2"
// //             required={type==="BLOG"}
// //           />
// //         </label>

// //         <label className="block">
// //           <span className="font-medium">Content <span className="text-red-500">*</span></span>
// //           <textarea
// //             value={content}
// //             onChange={e => setContent(e.target.value)}
// //             rows={6}
// //             required
// //             className="mt-1 block w-full rounded border px-3 py-2"
// //           />
// //         </label>

// //         <label className="inline-flex items-center gap-2">
// //           <input
// //             type="checkbox"
// //             checked={isAnonymous}
// //             onChange={e => setAnon(e.target.checked)}
// //           />
// //           Post anonymously
// //         </label>

// //         <button
// //           type="submit"
// //           className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700"
// //         >
// //           Update {type === "SUCCESS" ? "Story" : "Blog"}
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }

// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { useUser } from "@clerk/nextjs";
// import axios from "axios";

// export default function EditPostPage() {
//   // const { id, postId } = useParams(); // id = profile userId, postId = post.cuid()
//   const { id, postId } = useParams() as { id: string; postId: string };

//   const { isSignedIn } = useUser();
//   const router = useRouter();

//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [isAnonymous, setAnon] = useState(false);
//   const [type, setType] = useState<"SUCCESS" | "BLOG">("SUCCESS");
//   const [loaded, setLoaded] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!postId) return;
//     fetch(`/api/posts/${postId}`)
//       .then((res) => res.json())
//       .then((post) => {
//         setType(post.type);
//         setTitle(post.title || "");
//         setContent(post.content);
//         setAnon(post.isAnonymous);
//       })
//       .catch(() => setError("Failed to load post"))
//       .finally(() => setLoaded(true));
//   }, [postId]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!content.trim()) {
//       setError("Content cannot be empty.");
//       return;
//     }
//   //   try {
//   //     await axios.patch(`/api/posts/${postId}`, {
//   //       title: title.trim() || null,
//   //       content: content.trim(),
//   //       isAnonymous,
//   //     });
//   //     router.push(`/profile/${id}`);
//   //   } catch (e) {
//   //     setError(e.response?.data?.error || "Update failed");
//   //   }
//   // };

//   try {
//     await axios.patch(`/api/posts/${postId}`, {
//       title: title.trim() || null,
//       content: content.trim(),
//       isAnonymous,
//     });
//     router.push(`/profile/${id}`);
//   } catch (e) {
//     if (axios.isAxiosError(e)) {
//       setError(e.response?.data?.error || "Update failed");
//     } else {
//       setError("Update failed");
//     }
//   };

//   if (!isSignedIn) {
//     return <p className="p-8 text-center">Please sign in to edit.</p>;
//   }
//   if (!loaded) {
//     return <p className="p-8 text-center">Loading…</p>;
//   }

//   return (
//     <div className="mx-auto max-w-lg py-8">
//       <h1 className="mb-4 text-2xl font-bold">
//         {type === "SUCCESS" ? "Edit Success Story" : "Edit Blog Post"}
//       </h1>
//       {error && (
//         <div className="mb-4 rounded bg-red-100 p-2 text-red-800">{error}</div>
//       )}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Optional: allow changing type */}
//         <label className="block">
//           <span className="font-medium">Type</span>
//           <select
//             value={type}
//             onChange={(e) => setType(e.target.value as "SUCCESS" | "BLOG")}
//             className="mt-1 block w-full rounded border px-3 py-2"
//           >
//             <option value="SUCCESS">Success Story</option>
//             <option value="BLOG">Blog Post</option>
//           </select>
//         </label>

//         <label className="block">
//           <span className="font-medium">
//             Title {type === "BLOG" && <span className="text-red-500">*</span>}
//           </span>
//           <input
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder={type === "SUCCESS" ? "Optional summary" : "Blog title"}
//             className="mt-1 block w-full rounded border px-3 py-2"
//             required={type === "BLOG"}
//           />
//         </label>

//         <label className="block">
//           <span className="font-medium">
//             Content <span className="text-red-500">*</span>
//           </span>
//           <textarea
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             rows={6}
//             required
//             className="mt-1 block w-full rounded border px-3 py-2"
//           />
//         </label>

//         <label className="inline-flex items-center gap-2">
//           <input
//             type="checkbox"
//             checked={isAnonymous}
//             onChange={(e) => setAnon(e.target.checked)}
//           />
//           Post anonymously
//         </label>

//         <button
//           type="submit"
//           className="w-full rounded bg-teal-600 py-2 text-white hover:bg-teal-700"
//         >
//           Update {type === "SUCCESS" ? "Story" : "Blog"}
//         </button>
//       </form>
//     </div>
//   );
// }
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

export default function EditPostPage() {
  const { id, postId } = useParams() as { id: string; postId: string };
  const { isSignedIn } = useUser();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAnonymous, setAnon] = useState(false);
  const [type, setType] = useState<"SUCCESS" | "BLOG">("SUCCESS");
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) return;
    fetch(`/api/posts/${postId}`)
      .then((res) => res.json())
      .then((post) => {
        setType(post.type);
        setTitle(post.title || "");
        setContent(post.content);
        setAnon(post.isAnonymous);
      })
      .catch(() => setError("Failed to load post"))
      .finally(() => setLoaded(true));
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      setError("Content cannot be empty.");
      return;
    }

    try {
      await axios.patch(`/api/posts/${postId}`, {
        title: title.trim() || null,
        content: content.trim(),
        isAnonymous,
      });
      router.push(`/profile/${id}`);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setError(e.response?.data?.error || "Update failed");
      } else {
        setError("Update failed");
      }
    }
  }; // ← closes handleSubmit

  if (!isSignedIn) {
    return <p className="p-8 text-center">Please sign in to edit.</p>;
  }
  if (!loaded) {
    return <p className="p-8 text-center">Loading…</p>;
  }

  return (
    <div className="mx-auto max-w-lg py-8">
      <h1 className="mb-4 text-2xl font-bold">
        {type === "SUCCESS" ? "Edit Success Story" : "Edit Blog Post"}
      </h1>
      {error && (
        <div className="mb-4 rounded bg-red-100 p-2 text-red-800">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="font-medium">Type</span>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as "SUCCESS" | "BLOG")}
            className="mt-1 block w-full rounded border px-3 py-2"
          >
            <option value="SUCCESS">Success Story</option>
            <option value="BLOG">Blog Post</option>
          </select>
        </label>

        <label className="block">
          <span className="font-medium">
            Title {type === "BLOG" && <span className="text-red-500">*</span>}
          </span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={type === "SUCCESS" ? "Optional summary" : "Blog title"}
            className="mt-1 block w-full rounded border px-3 py-2"
            required={type === "BLOG"}
          />
        </label>

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
          Update {type === "SUCCESS" ? "Story" : "Blog"}
        </button>
      </form>
    </div>
  );
}
