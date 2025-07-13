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
]);

// Define sensitive paths to block
const isBlockedPath = (pathname: string) => {
  return (
    pathname.startsWith("/wp-admin") ||
    pathname.startsWith("/wordpress/wp-admin") ||
    pathname.startsWith("/.git") ||
    pathname.startsWith("/.github") ||
    pathname.startsWith("/database") ||
    pathname.startsWith("/credentials") ||
    pathname.startsWith("/config") ||
    pathname.startsWith("/settings") ||
    pathname.startsWith("/env") ||
    pathname.match(/\.yml$/) ||
    pathname.match(/\.xml$/) ||
    pathname.match(/\.sql$/) ||
    pathname.match(/\.log$/) ||
    pathname.match(/\.bak$/) ||
    pathname.match(/\.old$/)
  );
};

// Validate redirect URLs to prevent open redirect attacks
const isSafeRedirectUrl = (url: string) => {
  const allowedDomains = ["www.airesumepro.app", "airesumepro.app"];
  try {
    const urlObj = new URL(url);
    return allowedDomains.includes(urlObj.hostname);
  } catch {
    return false;
  }
};

export default clerkMiddleware(async (auth, request) => {
  const { pathname, searchParams } = request.nextUrl;
  const redirectUrl = searchParams.get("redirect_url");

  // Block access to sensitive paths with a 404
  if (isBlockedPath(pathname)) {
    return new NextResponse("Not Found", { status: 404 });
  }

  // Validate redirect URL if present
  if (redirectUrl && !isSafeRedirectUrl(redirectUrl)) {
    return new NextResponse("Invalid redirect", { status: 400 });
  }

  // Protect non-public routes
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