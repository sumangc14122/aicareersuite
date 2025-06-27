"use client";

import { useUser } from "@clerk/nextjs";
import React from "react";
import { SimpleNavbar } from "./HomeContent";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { isSignedIn } = useUser();
  return (
    <>
      <SimpleNavbar isSignedIn={isSignedIn} />
      <div className="flex h-[100vh] w-[100vw] flex-col items-center justify-center gap-5 lg:gap-10">
        <h1 className="text-3xl text-red-500 md:text-5xl xl:text-6xl">
          Something went wrong!
        </h1>
        <div className="flex flex-col gap-2 md:flex-row md:gap-3">
          <Link href="/">
            <Button className="ml-2 bg-blue-600 px-4 text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md dark:bg-blue-500 dark:hover:bg-blue-600">
              Go to Dashboard
            </Button>
          </Link>
          <Button
            className="ml-2 bg-blue-600 px-4 text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md dark:bg-blue-500 dark:hover:bg-blue-600"
            onClick={() => reset()}
          >
            Try Again
          </Button>
        </div>
      </div>
    </>
  );
}

export default Error;
