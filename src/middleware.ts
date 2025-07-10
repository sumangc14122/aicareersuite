import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/stripe-webhook",
  "/legal(.*)",
  "/features(.*)",
  "/portfolio/(.*)",
  "/api/chat",
  "/sitemap.xml",         
  "/robots.txt",          
  // "/wizard/(.*)",       
]);

// Define suspicious paths you want to block
const isBlockedPath = (pathname: string) => {
  return (
    pathname.startsWith("/wp-admin") ||
    pathname.startsWith("/wordpress/wp-admin")
  );
};

export default clerkMiddleware(async (auth, request) => {
  const { pathname } = request.nextUrl;

  if (isBlockedPath(pathname)) {
    // Immediately return a 404
    return new NextResponse("Not Found", { status: 404 });
  }

  if (!isPublicRoute(request)) {
    await auth.protect();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
