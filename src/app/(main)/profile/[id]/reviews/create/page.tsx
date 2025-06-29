// // src/app/(main)/profile/[id]/reviews/create/page.tsx
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useUser } from "@clerk/nextjs";

// export default function CreateReviewPage({ params }: { params: { id: string } }) {
//   const { id } = params;
//   const { user } = useUser();
//   const router = useRouter();

//   const [resumeUrl, setResumeUrl] = useState("");
//   const [description, setDescription] = useState("");
//   const [isPublic, setIsPublic] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!resumeUrl) {
//       setError("Please upload a resume URL");
//       return;
//     }
//     try {
//       const res = await fetch("/api/review-requests", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ resumeUrl, description, isPublic }),
//       });
//       if (!res.ok) throw new Error(await res.text());

//       // ← THESE TWO LINES
//       router.push(`/profile/${user!.id}`);
//       router.refresh();
//     } catch (err: any) {
//       setError(err.message || "Failed to submit");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4">
//       {error && <div className="text-red-600">{error}</div>}

//       <label className="block">
//         Resume URL
//         <input
//           type="url"
//           value={resumeUrl}
//           onChange={(e) => setResumeUrl(e.target.value)}
//           className="mt-1 block w-full rounded border px-2 py-1"
//           required
//         />
//       </label>

//       <label className="block">
//         Notes (optional)
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="mt-1 block w-full rounded border px-2 py-1"
//         />
//       </label>

//       <label className="inline-flex items-center gap-2">
//         <input
//           type="checkbox"
//           checked={isPublic}
//           onChange={(e) => setIsPublic(e.target.checked)}
//         />
//         Public?
//       </label>

//       <button
//         type="submit"
//         className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
//       >
//         Submit Review Request
//       </button>
//     </form>
//   );
// }

// src/app/(main)/profile/[id]/reviews/create/page.tsx
"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function CreateReviewRequestPage() {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const params = useParams();
  const profileId = params?.id as string;

  const [resumeUrl, setResumeUrl] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [error, setError] = useState<string | null>(null);

  if (!isSignedIn) {
    return (
      <p className="p-8 text-center">Please sign in to request a review.</p>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!resumeUrl.trim()) {
      setError("Resume URL is required");
      return;
    }

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeUrl: resumeUrl.trim(),
          description: description.trim() || null,
          isPublic,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || res.statusText);
      }
      // Go back to the profile and refresh its data
      router.push(`/profile/${profileId}`);
      router.refresh();
    } catch (err) {
      console.error("Review request failed:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to create request");
      }
    }
  };

  return (
    <div className="mx-auto max-w-lg py-8">
      <h1 className="mb-4 text-2xl font-bold">Request Resume Review</h1>

      {error && (
        <div className="mb-4 rounded-md bg-red-100 p-2 text-red-800">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          Resume URL
          <input
            type="url"
            value={resumeUrl}
            onChange={(e) => setResumeUrl(e.target.value)}
            required
            className="mt-1 block w-full rounded border px-3 py-2"
            placeholder="https://…/resume.pdf"
          />
        </label>

        <label className="block">
          Instructions / Description (optional)
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded border px-3 py-2"
            rows={3}
            placeholder="Any particular areas you want feedback on..."
          />
        </label>

        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="mr-2"
          />
          Make request visible to everyone
        </label>

        <button
          type="submit"
          className="w-full rounded bg-indigo-600 py-2 text-white hover:bg-indigo-700"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}
