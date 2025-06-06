// src/components/AddCommentForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Props {
  requestId: string;
}

export default function AddCommentForm({ requestId }: Props) {
  const router = useRouter();
  const [section, setSection] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      setError("Comment cannot be empty");
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(`/api/reviews/${requestId}/comments`, {
        section: section.trim() || null,
        content: content.trim(),
      });
      // clear form
      setSection("");
      setContent("");
      setError(null);
      // refresh the page data
      router.refresh();
      //   } catch (err) {
      //     setError(err.response?.data?.error || "Failed to post comment");
      //   } finally {
      //     setSubmitting(false);
      //   }
      // };
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const errorObj = err as { response?: { data?: { error?: string } } };
        setError(errorObj.response?.data?.error || "Failed to post comment");
      } else {
        setError("Failed to post comment");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      {error && <div className="text-red-600">{error}</div>}
      <label className="block">
        Section (optional)
        <input
          value={section}
          onChange={(e) => setSection(e.target.value)}
          className="mt-1 block w-full rounded border px-3 py-2"
          placeholder="e.g. Education, Skills"
        />
      </label>
      <label className="block">
        Your Feedback
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 block w-full rounded border px-3 py-2"
          rows={4}
          required
        />
      </label>
      <button
        type="submit"
        disabled={submitting}
        className="rounded bg-teal-600 px-4 py-2 text-white hover:bg-teal-700 disabled:opacity-50"
      >
        {submitting ? "Posting…" : "Post Feedback"}
      </button>
    </form>
  );
}
