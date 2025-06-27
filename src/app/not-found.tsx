"use client";

import React from "react";
import { SimpleNavbar } from "./HomeContent";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Notfound() {
  const { isSignedIn } = useUser();
  return (
    <>
      <SimpleNavbar isSignedIn={isSignedIn} />
      <div className="flex h-[100vh] w-[100vw] flex-col items-center justify-center gap-5 lg:gap-10">
        <h1 className="text-3xl text-blue-500 md:text-5xl xl:text-6xl">
          Oops! page not found
        </h1>
        <Link href="/">
          <Button
            className="ml-2 bg-blue-600 px-4 text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md dark:bg-blue-500 dark:hover:bg-blue-600"
            variant="default"
          >
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </>
  );
}

export default Notfound;
