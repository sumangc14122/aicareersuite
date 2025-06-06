"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
// import axios from "axios";

export default function CreateReviewRequestPage() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();

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
    if (!resumeUrl) {
      setError("Resume URL is required");
      return;
    }
    try {
      //   const res = await axios.post("/api/reviews", {
      //     resumeUrl,
      //     description,
      //     isPublic,
      //   });
      // go back to profile, where your new request will now appear
      router.push(`/profile/${user.id}`);
    } catch (err: unknown) {
      console.error(err);
      if (typeof err === "object" && err !== null && "message" in err) {
        setError(
          (err as { message?: string }).message || "Failed to create request",
        );
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
