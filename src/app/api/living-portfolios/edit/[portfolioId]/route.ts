// // src/app/api/living-portfolios/edit/[portfolioId]/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";
// import prisma from "@/lib/prisma";

// export const runtime = "nodejs";

// export async function GET(
//   req: NextRequest,
//   { params }: { params: { portfolioId: string } },
// ) {
//   const { userId: clerkUserId } = await auth();
//   const { portfolioId } = await params; // No need for await here

//   if (!clerkUserId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   if (!portfolioId) {
//     return NextResponse.json(
//       { error: "Portfolio ID is missing." },
//       { status: 400 },
//     );
//   }

//   try {
//     const profile = await prisma.profile.findUnique({
//       where: { userId: clerkUserId },
//     });

//     if (!profile) {
//       return NextResponse.json(
//         { error: "User profile not found." },
//         { status: 404 },
//       );
//     }

//     const livingPortfolio = await prisma.livingPortfolio.findUnique({
//       where: { id: portfolioId },
//     });

//     if (!livingPortfolio) {
//       return NextResponse.json(
//         { error: "Living Portfolio not found." },
//         { status: 404 },
//       );
//     }

//     // Check ownership
//     if (livingPortfolio.profileId !== profile.id) {
//       return NextResponse.json(
//         { error: "Forbidden: You do not own this portfolio." },
//         { status: 403 },
//       );
//     }

//     // Return the full portfolio data for editing
//     return NextResponse.json({ portfolio: livingPortfolio }, { status: 200 });
//   } catch (error: unknown) {
//     console.error(
//       `Error fetching living portfolio ${portfolioId} for edit:`,
//       error,
//     );
//     return NextResponse.json(
//       {
//         error: `Failed to fetch living portfolio for editing.`,
//         details: error instanceof Error ? error.message : "Unknown error",
//       },
//       { status: 500 },
//     );
//   }
// }

// src/app/api/living-portfolios/edit/[portfolioId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { userId: clerkUserId } = await auth();
  const portfolioId = req.nextUrl.pathname.split("/").pop();

  if (!clerkUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!portfolioId) {
    return NextResponse.json(
      { error: "Portfolio ID is missing." },
      { status: 400 },
    );
  }

  try {
    const profile = await prisma.profile.findUnique({
      where: { userId: clerkUserId },
    });

    if (!profile) {
      return NextResponse.json(
        { error: "User profile not found." },
        { status: 404 },
      );
    }

    const livingPortfolio = await prisma.livingPortfolio.findUnique({
      where: { id: portfolioId },
    });

    if (!livingPortfolio) {
      return NextResponse.json(
        { error: "Living Portfolio not found." },
        { status: 404 },
      );
    }

    // Check ownership
    if (livingPortfolio.profileId !== profile.id) {
      return NextResponse.json(
        { error: "Forbidden: You do not own this portfolio." },
        { status: 403 },
      );
    }

    // Return the full portfolio data for editing
    return NextResponse.json({ portfolio: livingPortfolio }, { status: 200 });
  } catch (error: unknown) {
    console.error(
      `Error fetching living portfolio ${portfolioId} for edit:`,
      error,
    );
    return NextResponse.json(
      {
        error: `Failed to fetch living portfolio for editing.`,
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
