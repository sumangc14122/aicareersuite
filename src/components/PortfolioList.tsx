// src/components/PortfolioList.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import DeletePortfolioButton from "./DeletePortfolioButton"; // Import the new button

interface PortfolioItem {
  id: string;
  title: string | null;
  isPublic: boolean;
  slug: string | null;
  updatedAt: Date;
}

interface PortfolioListProps {
  initialPortfolios: PortfolioItem[];
  profileOwnerId: string; // The userId of the profile being viewed
  currentUserId?: string; // The userId of the logged-in viewer
}

const formatDateTime = (date: Date) => {
  /* ... your existing formatDateTime function ... */
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export default function PortfolioList({
  initialPortfolios,
  profileOwnerId,
  currentUserId,
}: PortfolioListProps) {
  const [portfolios, setPortfolios] =
    useState<PortfolioItem[]>(initialPortfolios);

  const handlePortfolioDeleted = (deletedPortfolioId: string) => {
    setPortfolios((prev) => prev.filter((p) => p.id !== deletedPortfolioId));
  };

  if (portfolios.length === 0) {
    return (
      <p className="text-gray-500 dark:text-gray-400">
        No living portfolios created yet.
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {portfolios.map((lp) => (
        <li
          key={lp.id}
          className="flex flex-col items-start justify-between rounded-lg border border-gray-200 p-4 shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-gray-600 dark:hover:bg-gray-700/30 sm:flex-row sm:items-center"
        >
          <div className="mb-3 flex-grow sm:mb-0">
            <Link
              href={`/portfolio/${lp.slug || lp.id}`}
              target="_blank"
              className="text-lg font-semibold text-indigo-600 hover:text-indigo-800 hover:underline dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              {lp.title || "Untitled Portfolio"}
            </Link>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Last updated: {formatDateTime(new Date(lp.updatedAt))}
              <span
                className={`ml-2.5 rounded-full px-2.5 py-1 text-xs font-medium ${lp.isPublic ? "bg-green-100 text-green-700 dark:bg-green-700/30 dark:text-green-300" : "bg-yellow-100 text-yellow-600 dark:bg-yellow-700/30 dark:text-yellow-300"}`}
              >
                {lp.isPublic ? "Public" : "Private"}
              </span>
            </p>
          </div>
          <div className="flex flex-shrink-0 gap-2.5 self-start sm:self-center">
            <Link
              href={`/portfolio/${lp.slug || lp.id}`}
              target="_blank"
              className="rounded-md bg-sky-500 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition duration-200 hover:bg-sky-600"
            >
              View
            </Link>
            {currentUserId === profileOwnerId && ( // Only show Edit & Delete if owner
              <>
                <Link
                  href={`/portfolio-editor/${lp.id}`} // Link to the editor page with the portfolio ID
                  className="rounded-md bg-teal-100 px-3 py-1.5 text-xs font-medium text-teal-700 shadow-sm transition duration-200 hover:bg-teal-200 dark:bg-teal-800/40 dark:text-teal-300 dark:hover:bg-teal-700/50"
                >
                  Edit
                </Link>
                <DeletePortfolioButton
                  portfolioId={lp.id}
                  portfolioTitle={lp.title || "Untitled Portfolio"}
                  onDeleted={handlePortfolioDeleted}
                />
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
