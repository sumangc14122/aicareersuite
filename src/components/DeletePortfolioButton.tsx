// src/components/DeletePortfolioButton.tsx
"use client";

import React, { useState } from "react";
import axios from "axios";
// import { useRouter } from "next/navigation"; // Or use to refresh data

interface DeletePortfolioButtonProps {
  portfolioId: string;
  portfolioTitle: string;
  onDeleted: (portfolioId: string) => void; // Callback to update the list on the profile page
}

export default function DeletePortfolioButton({
  portfolioId,
  portfolioTitle,
  onDeleted,
}: DeletePortfolioButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // const router = useRouter(); // To refresh data if needed

  const handleDelete = async () => {
    if (
      !window.confirm(
        `Are you sure you want to delete the portfolio "${portfolioTitle}"? This action cannot be undone, and the public link will no longer work.`,
      )
    ) {
      return;
    }

    setIsDeleting(true);
    setError(null);
    try {
      await axios.delete(`/api/living-portfolios/${portfolioId}`);
      onDeleted(portfolioId); // Notify parent to remove from list
      // Optionally, show a success toast/notification
      // router.refresh(); // If you want to trigger a server-side data refresh for the whole page
    } catch (err: unknown) {
      console.error("Error deleting portfolio:", err);
      setError(
        // err.response?.data?.error ||
        // err.message ||
        "Failed to delete portfolio.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="rounded-md bg-red-50 px-2.5 py-1.5 text-xs font-medium text-red-600 transition duration-200 hover:bg-red-100 disabled:opacity-70 dark:bg-red-800/30 dark:text-red-400 dark:hover:bg-red-700/40"
        title="Delete this portfolio"
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </>
  );
}
