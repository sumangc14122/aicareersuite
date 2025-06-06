// // // // / src/app/api/living-portfolios/[portfolioId]/route.ts
// // // import { NextRequest, NextResponse } from "next/server";
// // // import { auth } from "@clerk/nextjs/server";
// // // import prisma from "@/lib/prisma";
// // // import type { ResumeJSON } from "@/components/ATSScore";
// // // import type { InitialNarrativeResult, HiddenGemsResult, WhatIfResult } from "@/components/NarrativeWeaver";

// // // interface ShowcaseItem {
// // //   id: string;
// // //   name: string;
// // //   description: string;
// // //   link?: string;
// // //   skillsUsed?: string[];
// // // }

// // // interface ShowcaseSectionData {
// // //   id: string;
// // //   title: string;
// // //   items: ShowcaseItem[];
// // // }

// // // interface LivingPortfolioDisplaySettings {
// // //   contact: {
// // //     showFullName: boolean;
// // //     showEmail: boolean;
// // //     showPhone: boolean;
// // //     showLocation: boolean;
// // //     showLinkedIn: boolean;
// // //     showPhoto: boolean;
// // //   };
// // //   sections: {
// // //     showSummary: boolean;
// // //     showSkills: boolean;
// // //     showWorkExperience: boolean;
// // //     showEducation: boolean;
// // //     showVolunteering: boolean;
// // //     showCertifications: boolean;
// // //     showReferences: boolean;
// // //   };
// // //   narrativeSuite: {
// // //     showCareerNarrative: boolean;
// // //     showGoldenThread: boolean;
// // //     showKeyThemes: boolean;
// // //     showHiddenGems: boolean;
// // //   };
// // // }

// // // interface LivingPortfolioUpdatePayload {
// // //   title?: string;
// // //   slug?: string | null;
// // //   isPublic?: boolean;
// // //   theme?: string;
// // //   displaySettings?: LivingPortfolioDisplaySettings;
// // //   publicFullName?: string;
// // //   publicJobTitle?: string;
// // //   publicEmail?: string;
// // //   publicPhone?: string;
// // //   publicLocation?: string;
// // //   publicLinkedInUrl?: string;
// // //   publicSummary?: string;
// // //   publicSkills?: string[];
// // //   publicWorkExperiences?: ResumeJSON["workExperiences"];
// // //   publicEducations?: ResumeJSON["educations"];
// // //   publicVolunteering?: ResumeJSON["volunteering"];
// // //   publicCertifications?: ResumeJSON["certifications"];
// // //   publicCareerNarrative?: string;
// // //   publicGoldenThread?: string;
// // //   publicGoldenThreadEvidence?: InitialNarrativeResult["goldenThreadEvidence"];
// // //   publicKeyThemes?: InitialNarrativeResult["keyThemes"];
// // //   publicHiddenGems?: HiddenGemsResult;
// // //   publicWhatIfScenarios?: Array<{
// // //     scenarioText: string;
// // //     adaptedResult: WhatIfResult;
// // //   }>;
// // //   showcaseSections?: ShowcaseSectionData[];
// // //   selectedPublicWhatIfs?: Array<{
// // //     scenarioText: string;
// // //     adaptedResult: WhatIfResult;
// // //   }>;
// // // }

// // // export const runtime = "nodejs";

// // // export async function PUT(req: NextRequest) {
// // //   const { userId: clerkUserId } = await auth();
// // //   const portfolioId = req.nextUrl.pathname.split("/").pop();

// // //   if (!clerkUserId) {
// // //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// // //   }
// // //   if (!portfolioId) {
// // //     return NextResponse.json(
// // //       { error: "Portfolio ID missing" },
// // //       { status: 400 },
// // //     );
// // //   }

// // //   try {
// // //     const payload: LivingPortfolioUpdatePayload = await req.json();

// // //     const profile = await prisma.profile.findUnique({
// // //       where: { userId: clerkUserId },
// // //     });
// // //     if (!profile) {
// // //       return NextResponse.json({ error: "Profile not found" }, { status: 404 });
// // //     }

// // //     const existingPortfolio = await prisma.livingPortfolio.findUnique({
// // //       where: { id: portfolioId },
// // //     });

// // //     if (!existingPortfolio) {
// // //       return NextResponse.json(
// // //         { error: "Portfolio not found" },
// // //         { status: 404 },
// // //       );
// // //     }
// // //     if (existingPortfolio.profileId !== profile.id) {
// // //       return NextResponse.json(
// // //         { error: "Forbidden: You do not own this portfolio" },
// // //         { status: 403 },
// // //       );
// // //     }

// // //     const updatedPortfolio = await prisma.livingPortfolio.update({
// // //       where: { id: portfolioId },
// // //       data: {
// // //         title: payload.title ?? existingPortfolio.title,
// // //         slug: payload.slug === null ? null : (payload.slug ?? existingPortfolio.slug),
// // //         isPublic: payload.isPublic ?? existingPortfolio.isPublic,
// // //         theme: payload.theme ?? existingPortfolio.theme,
// // //         displaySettings: payload.displaySettings
// // //           ? JSON.parse(JSON.stringify(payload.displaySettings))
// // //           : existingPortfolio.displaySettings,
// // //         publicFullName: payload.publicFullName ?? existingPortfolio.publicFullName,
// // //         publicJobTitle: payload.publicJobTitle ?? existingPortfolio.publicJobTitle,
// // //         publicEmail: payload.publicEmail ?? existingPortfolio.publicEmail,
// // //         publicPhone: payload.publicPhone ?? existingPortfolio.publicPhone,
// // //         publicLocation: payload.publicLocation ?? existingPortfolio.publicLocation,
// // //         publicLinkedInUrl: payload.publicLinkedInUrl ?? existingPortfolio.publicLinkedInUrl,
// // //         publicSummary: payload.publicSummary ?? existingPortfolio.publicSummary,
// // //         publicSkills: payload.publicSkills
// // //           ? JSON.parse(JSON.stringify(payload.publicSkills))
// // //           : existingPortfolio.publicSkills,
// // //         publicWorkExperiences: payload.publicWorkExperiences
// // //           ? JSON.parse(JSON.stringify(payload.publicWorkExperiences))
// // //           : existingPortfolio.publicWorkExperiences,
// // //         publicEducations: payload.publicEducations
// // //           ? JSON.parse(JSON.stringify(payload.publicEducations))
// // //           : existingPortfolio.publicEducations,
// // //         publicVolunteering: payload.publicVolunteering
// // //           ? JSON.parse(JSON.stringify(payload.publicVolunteering))
// // //           : existingPortfolio.publicVolunteering,
// // //         publicCertifications: payload.publicCertifications
// // //           ? JSON.parse(JSON.stringify(payload.publicCertifications))
// // //           : existingPortfolio.publicCertifications,
// // //         publicCareerNarrative: payload.publicCareerNarrative ?? existingPortfolio.publicCareerNarrative,
// // //         publicGoldenThread: payload.publicGoldenThread ?? existingPortfolio.publicGoldenThread,
// // //         publicGoldenThreadEvidence: payload.publicGoldenThreadEvidence
// // //           ? JSON.parse(JSON.stringify(payload.publicGoldenThreadEvidence))
// // //           : existingPortfolio.publicGoldenThreadEvidence,
// // //         publicKeyThemes: payload.publicKeyThemes
// // //           ? JSON.parse(JSON.stringify(payload.publicKeyThemes))
// // //           : existingPortfolio.publicKeyThemes,
// // //         publicHiddenGems: payload.publicHiddenGems
// // //           ? JSON.parse(JSON.stringify(payload.publicHiddenGems))
// // //           : existingPortfolio.publicHiddenGems,
// // //         publicWhatIfScenarios: payload.publicWhatIfScenarios
// // //           ? JSON.parse(JSON.stringify(payload.publicWhatIfScenarios))
// // //           : payload.selectedPublicWhatIfs
// // //             ? JSON.parse(JSON.stringify(payload.selectedPublicWhatIfs))
// // //             : existingPortfolio.publicWhatIfScenarios,
// // //         showcaseSections: payload.showcaseSections
// // //           ? JSON.parse(JSON.stringify(payload.showcaseSections))
// // //           : existingPortfolio.showcaseSections,
// // //       },
// // //     });

// // //     return NextResponse.json(
// // //       {
// // //         message: "Living Portfolio updated successfully!",
// // //         portfolioId: updatedPortfolio.id,
// // //         portfolioSlug: updatedPortfolio.slug,
// // //       },
// // //       { status: 200 },
// // //     );
// // //   } catch (error: unknown) {
// // //     console.error(`Error updating living portfolio ${portfolioId}:`, error);
// // //     if (error instanceof Error && "code" in error && error.code === "P2002") {
// // //       return NextResponse.json(
// // //         {
// // //           error:
// // //             "This URL slug is already taken by another portfolio. Please choose a different one.",
// // //         },
// // //         { status: 409 },
// // //       );
// // //     }
// // //     return NextResponse.json(
// // //       {
// // //         error: "Failed to update living portfolio.",
// // //         details: error instanceof Error ? error.message : "Unknown error",
// // //       },
// // //       { status: 500 },
// // //     );
// // //   }
// // // }

// // // export async function DELETE(req: NextRequest) {
// // //   const { userId: clerkUserId } = await auth();
// // //   const portfolioId = req.nextUrl.pathname.split("/").pop();

// // //   if (!clerkUserId) {
// // //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// // //   }

// // //   if (!portfolioId) {
// // //     return NextResponse.json(
// // //       { error: "Portfolio ID is missing." },
// // //       { status: 400 },
// // //     );
// // //   }

// // //   try {
// // //     const profile = await prisma.profile.findUnique({
// // //       where: { userId: clerkUserId },
// // //     });

// // //     if (!profile) {
// // //       return NextResponse.json(
// // //         { error: "User profile not found." },
// // //         { status: 404 },
// // //       );
// // //     }

// // //     const livingPortfolio = await prisma.livingPortfolio.findUnique({
// // //       where: { id: portfolioId },
// // //     });

// // //     if (!livingPortfolio) {
// // //       return NextResponse.json(
// // //         { error: "Living Portfolio not found." },
// // //         { status: 404 },
// // //       );
// // //     }

// // //     if (livingPortfolio.profileId !== profile.id) {
// // //       return NextResponse.json(
// // //         { error: "Forbidden: You do not own this portfolio." },
// // //         { status: 403 },
// // //       );
// // //     }

// // //     await prisma.livingPortfolio.delete({
// // //       where: { id: portfolioId },
// // //     });

// // //     return NextResponse.json(
// // //       { message: "Living Portfolio deleted successfully." },
// // //       { status: 200 },
// // //     );
// // //   } catch (error: unknown) {
// // //     console.error(`Error deleting living portfolio ${portfolioId}:`, error);
// // //     if (error instanceof Error && "code" in error && error.code === "P2025") {
// // //       return NextResponse.json(
// // //         { error: "Portfolio not found or already deleted." },
// // //         { status: 404 },
// // //       );
// // //     }
// // //     return NextResponse.json(
// // //       {
// // //         error: "Failed to delete living portfolio.",
// // //         details: error instanceof Error ? error.message : "Unknown error",
// // //       },
// // //       { status: 500 },
// // //     );
// // //   }
// // // }

// // // /src/app/api/living-portfolios/[portfolioId]/route.ts
// // import { NextRequest, NextResponse } from "next/server";
// // import { auth } from "@clerk/nextjs/server";
// // import prisma from "@/lib/prisma";
// // import type { ResumeJSON } from "@/components/ATSScore";
// // import type {
// //   InitialNarrativeResult,
// //   HiddenGemsResult,
// //   WhatIfResult,
// // } from "@/components/NarrativeWeaver";
// // import { Prisma } from "@prisma/client";

// // // --- Interfaces ---
// // interface ShowcaseItem { id: string; name: string; description: string; link?: string; skillsUsed?: string[]; }
// // interface ShowcaseSectionData { id: string; title: string; items: ShowcaseItem[]; }
// // interface LivingPortfolioDisplaySettings { contact: { showFullName: boolean; showEmail: boolean; showPhone: boolean; showLocation: boolean; showLinkedIn: boolean; showPhoto: boolean; }; sections: { showSummary: boolean; showSkills: boolean; showWorkExperience: boolean; showEducation: boolean; showVolunteering: boolean; showCertifications: boolean; showReferences: boolean; }; narrativeSuite: { showCareerNarrative: boolean; showGoldenThread: boolean; showKeyThemes: boolean; showHiddenGems: boolean; }; }
// // interface LivingPortfolioUpdatePayload { title?: string; slug?: string | null; isPublic?: boolean; theme?: string; displaySettings?: LivingPortfolioDisplaySettings | null; publicFullName?: string | null; publicJobTitle?: string | null; publicEmail?: string | null; publicPhone?: string | null; publicLocation?: string | null; publicLinkedInUrl?: string | null; publicSummary?: string | null; publicSkills?: string[] | null; publicWorkExperiences?: ResumeJSON["workExperiences"] | null; publicEducations?: ResumeJSON["educations"] | null; publicVolunteering?: ResumeJSON["volunteering"] | null; publicCertifications?: ResumeJSON["certifications"] | null; publicCareerNarrative?: string | null; publicGoldenThread?: string | null; publicGoldenThreadEvidence?: InitialNarrativeResult["goldenThreadEvidence"] | null; publicKeyThemes?: InitialNarrativeResult["keyThemes"] | null; publicHiddenGems?: HiddenGemsResult | null; publicWhatIfScenarios?: Array<{ scenarioText: string; adaptedResult: WhatIfResult; }> | null; selectedPublicWhatIfs?: Array<{ scenarioText: string; adaptedResult: WhatIfResult; }> | null; showcaseSections?: ShowcaseSectionData[] | null; }

// // export const runtime = "nodejs";

// // // Reverted to your ORIGINAL function signature
// // export async function PUT(req: NextRequest) {
// //   try {
// //     const { userId: clerkUserId } = await auth(); // Clerk auth
// //     const portfolioId = req.nextUrl.pathname.split("/").pop(); // Your original way to get ID

// //     if (!clerkUserId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// //     if (!portfolioId) return NextResponse.json({ error: "Portfolio ID missing" }, { status: 400 });

// //     const payload: LivingPortfolioUpdatePayload = await req.json();

// //     if (payload.title !== undefined && (payload.title === null || payload.title.trim() === "")) {
// //         return NextResponse.json({ errorType: "VALIDATION_ERROR", message: "Portfolio Title cannot be empty.", field: "title" }, { status: 400 });
// //     }

// //     const profile = await prisma.profile.findUnique({ where: { userId: clerkUserId } });
// //     if (!profile) return NextResponse.json({ error: "User profile not found." }, { status: 404 });

// //     const existingPortfolio = await prisma.livingPortfolio.findUnique({ where: { id: portfolioId } });
// //     if (!existingPortfolio) return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });
// //     if (existingPortfolio.profileId !== profile.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

// //     let finalSlug: string | null = existingPortfolio.slug;
// //     if (payload.slug !== undefined) {
// //       if (payload.slug === null || payload.slug.trim() === "") {
// //         finalSlug = null;
// //       } else {
// //         const trimmedSlug = payload.slug.trim();
// //         if (trimmedSlug !== existingPortfolio.slug) {
// //           const slugExists = await prisma.livingPortfolio.findUnique({ where: { slug: trimmedSlug } });
// //           if (slugExists && slugExists.id !== portfolioId) {
// //             return NextResponse.json({ errorType: "DUPLICATE_SLUG", message: "Slug already in use.", field: "slug" }, { status: 409 });
// //           }
// //           finalSlug = trimmedSlug;
// //         }
// //       }
// //     }

// //     // Using your original data assignment structure with nullish coalescing and JSON.parse/stringify
// //     const dataForUpdate: Prisma.LivingPortfolioUpdateInput = {
// //       title: payload.title !== undefined ? payload.title : existingPortfolio.title,
// //       slug: payload.slug !== undefined ? finalSlug : existingPortfolio.slug, // Use processed finalSlug if payload had slug
// //       isPublic: payload.isPublic ?? existingPortfolio.isPublic,
// //       theme: payload.theme ?? existingPortfolio.theme,
// //       displaySettings: payload.displaySettings !== undefined
// //         ? (payload.displaySettings === null ? Prisma.DbNull : JSON.parse(JSON.stringify(payload.displaySettings)))
// //         : existingPortfolio.displaySettings,
// //       publicFullName: payload.publicFullName ?? existingPortfolio.publicFullName,
// //       publicJobTitle: payload.publicJobTitle ?? existingPortfolio.publicJobTitle,
// //       publicEmail: payload.publicEmail ?? existingPortfolio.publicEmail,
// //       publicPhone: payload.publicPhone ?? existingPortfolio.publicPhone,
// //       publicLocation: payload.publicLocation ?? existingPortfolio.publicLocation,
// //       publicLinkedInUrl: payload.publicLinkedInUrl ?? existingPortfolio.publicLinkedInUrl,
// //       publicSummary: payload.publicSummary ?? existingPortfolio.publicSummary,
// //       publicSkills: payload.publicSkills !== undefined
// //         ? (payload.publicSkills === null ? Prisma.DbNull : JSON.parse(JSON.stringify(payload.publicSkills)))
// //         : existingPortfolio.publicSkills,
// //       publicWorkExperiences: payload.publicWorkExperiences !== undefined
// //         ? (payload.publicWorkExperiences === null ? Prisma.DbNull : JSON.parse(JSON.stringify(payload.publicWorkExperiences)))
// //         : existingPortfolio.publicWorkExperiences,
// //       publicEducations: payload.publicEducations !== undefined
// //         ? (payload.publicEducations === null ? Prisma.DbNull : JSON.parse(JSON.stringify(payload.publicEducations)))
// //         : existingPortfolio.publicEducations,
// //       publicVolunteering: payload.publicVolunteering !== undefined
// //         ? (payload.publicVolunteering === null ? Prisma.DbNull : JSON.parse(JSON.stringify(payload.publicVolunteering)))
// //         : existingPortfolio.publicVolunteering,
// //       publicCertifications: payload.publicCertifications !== undefined
// //         ? (payload.publicCertifications === null ? Prisma.DbNull : JSON.parse(JSON.stringify(payload.publicCertifications)))
// //         : existingPortfolio.publicCertifications,
// //       publicCareerNarrative: payload.publicCareerNarrative ?? existingPortfolio.publicCareerNarrative,
// //       publicGoldenThread: payload.publicGoldenThread ?? existingPortfolio.publicGoldenThread,
// //       publicGoldenThreadEvidence: payload.publicGoldenThreadEvidence !== undefined
// //         ? (payload.publicGoldenThreadEvidence === null ? Prisma.DbNull : JSON.parse(JSON.stringify(payload.publicGoldenThreadEvidence)))
// //         : existingPortfolio.publicGoldenThreadEvidence,
// //       publicKeyThemes: payload.publicKeyThemes !== undefined
// //         ? (payload.publicKeyThemes === null ? Prisma.DbNull : JSON.parse(JSON.stringify(payload.publicKeyThemes)))
// //         : existingPortfolio.publicKeyThemes,
// //       publicHiddenGems: payload.publicHiddenGems !== undefined
// //         ? (payload.publicHiddenGems === null ? Prisma.DbNull : JSON.parse(JSON.stringify(payload.publicHiddenGems)))
// //         : existingPortfolio.publicHiddenGems,
// //       // Using your original logic for publicWhatIfScenarios
// //       publicWhatIfScenarios: payload.publicWhatIfScenarios !== undefined
// //         ? (payload.publicWhatIfScenarios === null ? Prisma.DbNull : JSON.parse(JSON.stringify(payload.publicWhatIfScenarios)))
// //         : payload.selectedPublicWhatIfs !== undefined
// //           ? (payload.selectedPublicWhatIfs === null ? Prisma.DbNull : JSON.parse(JSON.stringify(payload.selectedPublicWhatIfs)))
// //           : existingPortfolio.publicWhatIfScenarios,
// //       showcaseSections: payload.showcaseSections !== undefined
// //         ? (payload.showcaseSections === null ? Prisma.DbNull : JSON.parse(JSON.stringify(payload.showcaseSections)))
// //         : existingPortfolio.showcaseSections,
// //     };

// //     // Filter out fields from dataForUpdate that were not in the payload to truly only update sent fields
// //     // This step is important if you want `?? existingPortfolio.field` to only apply if the field
// //     // was *truly missing* from payload, not just if payload.field was undefined.
// //     // However, your original data construction directly uses `??`, implying direct merge.
// //     // The current dataForUpdate is fine if you intend to update with existingPortfolio value if payload is missing a field.
// //     // For a stricter "only update what's in payload" approach:
// //     const strictDataForUpdate: Partial<Prisma.LivingPortfolioUpdateInput> = {};
// //     (Object.keys(payload) as Array<keyof LivingPortfolioUpdatePayload>).forEach(key => {
// //         if (payload[key] !== undefined && key in dataForUpdate) { // Check if key is also in our mapped dataForUpdate
// //             (strictDataForUpdate as any)[key] = (dataForUpdate as any)[key];
// //         }
// //     });
// //     // Special handling for slug as it's processed separately
// //     if (payload.slug !== undefined) {
// //         strictDataForUpdate.slug = finalSlug;
// //     }
// //      if (payload.title !== undefined) { // Ensure title is included if it was in payload
// //         strictDataForUpdate.title = dataForUpdate.title;
// //     }

// //     if (Object.keys(strictDataForUpdate).length === 0) {
// //       // If only slug was provided and it didn't change, strictDataForUpdate might be just {slug: existingSlug}
// //       // Or if no relevant fields were in payload.
// //       if (payload.slug === undefined || finalSlug === existingPortfolio.slug) {
// //          return NextResponse.json(
// //             { message: "No actual changes detected to update.", portfolioId: existingPortfolio.id, portfolioSlug: existingPortfolio.slug },
// //             { status: 200 },
// //           );
// //       }
// //     }

// //     const updatedPortfolio = await prisma.livingPortfolio.update({
// //       where: { id: portfolioId },
// //       data: Object.keys(strictDataForUpdate).length > 0 ? strictDataForUpdate : { slug: finalSlug }, // Ensure slug updates if it's the only change
// //     });

// //     return NextResponse.json(
// //       { message: "Living Portfolio updated successfully!", portfolioId: updatedPortfolio.id, portfolioSlug: updatedPortfolio.slug },
// //       { status: 200 },
// //     );

// //   } catch (error: unknown) {
// //     const portfolioIdForErrorLog = req.nextUrl.pathname.split("/").pop() || 'unknown_id';
// //     console.error(`Error updating living portfolio ${portfolioIdForErrorLog}:`, error);

// //     if (error instanceof Prisma.PrismaClientKnownRequestError) {
// //       if (error.code === "P2002") {
// //         const targetFields = error.meta?.target as string[] | undefined;
// //         if (targetFields && targetFields.includes("slug")) {
// //           return NextResponse.json({ errorType: "DUPLICATE_SLUG", message: "This custom URL slug is already in use.", field: "slug" }, { status: 409 });
// //         } else {
// //           return NextResponse.json({ errorType: "UNIQUE_CONSTRAINT_VIOLATION", message: `A unique piece of information is already in use: ${targetFields?.join(", ") || "Unknown field"}.`, details: error.message }, { status: 409 });
// //         }
// //       } else if (error.code === "P2025") {
// //         return NextResponse.json({ error: "Portfolio to update not found." }, { status: 404 });
// //       }
// //     }
// //     return NextResponse.json({ error: "Failed to update living portfolio.", details: error instanceof Error ? error.message : "An unknown error occurred" }, { status: 500 });
// //   }
// // }

// // // Reverted to your ORIGINAL function signature
// // export async function DELETE(req: NextRequest) {
// //   try {
// //     const { userId: clerkUserId } = await auth();
// //     const portfolioId = req.nextUrl.pathname.split("/").pop();

// //     if (!clerkUserId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// //     if (!portfolioId) return NextResponse.json({ error: "Portfolio ID missing." }, { status: 400 });

// //     const profile = await prisma.profile.findUnique({ where: { userId: clerkUserId } });
// //     if (!profile) return NextResponse.json({ error: "User profile not found." }, { status: 404 });

// //     const livingPortfolio = await prisma.livingPortfolio.findFirst({
// //       where: { id: portfolioId, profileId: profile.id },
// //     });
// //     if (!livingPortfolio) return NextResponse.json({ error: "Living Portfolio not found or access denied." }, { status: 404 });

// //     await prisma.livingPortfolio.delete({ where: { id: portfolioId } });

// //     return NextResponse.json({ message: "Living Portfolio deleted successfully." }, { status: 200 });
// //   } catch (error: unknown) {
// //     const portfolioIdForErrorLog = req.nextUrl.pathname.split("/").pop() || 'unknown_id';
// //     console.error(`Error deleting living portfolio ${portfolioIdForErrorLog}:`, error);
// //     if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
// //       return NextResponse.json({ error: "Portfolio not found or already deleted." }, { status: 404 });
// //     }
// //     return NextResponse.json({ error: "Failed to delete living portfolio.", details: error instanceof Error ? error.message : "An unknown error occurred" }, { status: 500 });
// //   }
// // }

// // src/app/api/living-portfolios/[portfolioId]/route.ts

// import { NextRequest, NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";
// import prisma from "@/lib/prisma";
// import type { ResumeJSON } from "@/components/ATSScore";
// import type {
//   InitialNarrativeResult,
//   HiddenGemsResult,
//   WhatIfResult,
// } from "@/components/NarrativeWeaver";
// import { Prisma } from "@prisma/client";

// // --- Interfaces (unchanged) ---
// interface ShowcaseItem {
//   id: string;
//   name: string;
//   description: string;
//   link?: string;
//   skillsUsed?: string[];
// }
// interface ShowcaseSectionData {
//   id: string;
//   title: string;
//   items: ShowcaseItem[];
// }
// interface LivingPortfolioDisplaySettings {
//   contact: {
//     showFullName: boolean;
//     showEmail: boolean;
//     showPhone: boolean;
//     showLocation: boolean;
//     showLinkedIn: boolean;
//     showPhoto: boolean;
//   };
//   sections: {
//     showSummary: boolean;
//     showSkills: boolean;
//     showWorkExperience: boolean;
//     showEducation: boolean;
//     showVolunteering: boolean;
//     showCertifications: boolean;
//     showReferences: boolean;
//   };
//   narrativeSuite: {
//     showCareerNarrative: boolean;
//     showGoldenThread: boolean;
//     showKeyThemes: boolean;
//     showHiddenGems: boolean;
//   };
// }
// interface LivingPortfolioUpdatePayload {
//   title?: string;
//   slug?: string | null;
//   isPublic?: boolean;
//   theme?: string;
//   displaySettings?: LivingPortfolioDisplaySettings | null;
//   publicFullName?: string | null;
//   publicJobTitle?: string | null;
//   publicEmail?: string | null;
//   publicPhone?: string | null;
//   publicLocation?: string | null;
//   publicLinkedInUrl?: string | null;
//   publicSummary?: string | null;
//   publicSkills?: string[] | null;
//   publicWorkExperiences?: ResumeJSON["workExperiences"] | null;
//   publicEducations?: ResumeJSON["educations"] | null;
//   publicVolunteering?: ResumeJSON["volunteering"] | null;
//   publicCertifications?: ResumeJSON["certifications"] | null;
//   publicCareerNarrative?: string | null;
//   publicGoldenThread?: string | null;
//   publicGoldenThreadEvidence?: InitialNarrativeResult["goldenThreadEvidence"] | null;
//   publicKeyThemes?: InitialNarrativeResult["keyThemes"] | null;
//   publicHiddenGems?: HiddenGemsResult | null;
//   publicWhatIfScenarios?: Array<{ scenarioText: string; adaptedResult: WhatIfResult }> | null;
//   selectedPublicWhatIfs?: Array<{ scenarioText: string; adaptedResult: WhatIfResult }> | null;
//   showcaseSections?: ShowcaseSectionData[] | null;
// }

// export const runtime = "nodejs";

// // ─── PUT Handler ─────────────────────────────────────────────────
// export async function PUT(req: NextRequest) {
//   try {
//     const { userId: clerkUserId } = await auth();
//     const portfolioId = req.nextUrl.pathname.split("/").pop();

//     if (!clerkUserId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }
//     if (!portfolioId) {
//       return NextResponse.json({ error: "Portfolio ID missing" }, { status: 400 });
//     }

//     const payload: LivingPortfolioUpdatePayload = await req.json();

//     // Title validation (if provided)
//     if (
//       payload.title !== undefined &&
//       (payload.title === null || payload.title.trim() === "")
//     ) {
//       return NextResponse.json(
//         {
//           errorType: "VALIDATION_ERROR",
//           message: "Portfolio Title cannot be empty.",
//           field: "title",
//         },
//         { status: 400 }
//       );
//     }

//     // Fetch profile
//     const profile = await prisma.profile.findUnique({
//       where: { userId: clerkUserId },
//     });
//     if (!profile) {
//       return NextResponse.json({ error: "User profile not found." }, { status: 404 });
//     }

//     // Fetch existing portfolio
//     const existingPortfolio = await prisma.livingPortfolio.findUnique({
//       where: { id: portfolioId },
//     });
//     if (!existingPortfolio) {
//       return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });
//     }
//     if (existingPortfolio.profileId !== profile.id) {
//       return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//     }

//     // ===== Slug‐collision logic (client already does a real-time check, but we re‐check here) =====
//     let finalSlug: string | null = existingPortfolio.slug;
//     if (payload.slug !== undefined) {
//       if (payload.slug === null || payload.slug.trim() === "") {
//         finalSlug = null;
//       } else {
//         const trimmedSlug = payload.slug.trim();
//         if (trimmedSlug !== existingPortfolio.slug) {
//           // See if that slug is already used by another portfolio
//           const slugExists = await prisma.livingPortfolio.findUnique({
//             where: { slug: trimmedSlug },
//           });
//           if (slugExists && slugExists.id !== portfolioId) {
//             return NextResponse.json(
//               {
//                 errorType: "DUPLICATE_SLUG",
//                 message: "Slug already in use.",
//                 field: "slug",
//               },
//               { status: 409 }
//             );
//           }
//           finalSlug = trimmedSlug;
//         }
//       }
//     }

//     // ===== Build dataForUpdate exactly as before, using nullish coalescing & DB JSON when provided =====
//     const dataForUpdate: Prisma.LivingPortfolioUpdateInput = {
//       title:
//         payload.title !== undefined ? payload.title : existingPortfolio.title,
//       slug:
//         payload.slug !== undefined ? finalSlug : existingPortfolio.slug,
//       isPublic: payload.isPublic ?? existingPortfolio.isPublic,
//       theme: payload.theme ?? existingPortfolio.theme,
//       displaySettings:
//         payload.displaySettings !== undefined
//           ? payload.displaySettings === null
//             ? Prisma.DbNull
//             : JSON.parse(JSON.stringify(payload.displaySettings))
//           : existingPortfolio.displaySettings,
//       publicFullName:
//         payload.publicFullName ?? existingPortfolio.publicFullName,
//       publicJobTitle:
//         payload.publicJobTitle ?? existingPortfolio.publicJobTitle,
//       publicEmail: payload.publicEmail ?? existingPortfolio.publicEmail,
//       publicPhone: payload.publicPhone ?? existingPortfolio.publicPhone,
//       publicLocation: payload.publicLocation ?? existingPortfolio.publicLocation,
//       publicLinkedInUrl:
//         payload.publicLinkedInUrl ?? existingPortfolio.publicLinkedInUrl,
//       publicSummary: payload.publicSummary ?? existingPortfolio.publicSummary,
//       publicSkills:
//         payload.publicSkills !== undefined
//           ? payload.publicSkills === null
//             ? Prisma.DbNull
//             : JSON.parse(JSON.stringify(payload.publicSkills))
//           : existingPortfolio.publicSkills,
//       publicWorkExperiences:
//         payload.publicWorkExperiences !== undefined
//           ? payload.publicWorkExperiences === null
//             ? Prisma.DbNull
//             : JSON.parse(JSON.stringify(payload.publicWorkExperiences))
//           : existingPortfolio.publicWorkExperiences,
//       publicEducations:
//         payload.publicEducations !== undefined
//           ? payload.publicEducations === null
//             ? Prisma.DbNull
//             : JSON.parse(JSON.stringify(payload.publicEducations))
//           : existingPortfolio.publicEducations,
//       publicVolunteering:
//         payload.publicVolunteering !== undefined
//           ? payload.publicVolunteering === null
//             ? Prisma.DbNull
//             : JSON.parse(JSON.stringify(payload.publicVolunteering))
//           : existingPortfolio.publicVolunteering,
//       publicCertifications:
//         payload.publicCertifications !== undefined
//           ? payload.publicCertifications === null
//             ? Prisma.DbNull
//             : JSON.parse(JSON.stringify(payload.publicCertifications))
//           : existingPortfolio.publicCertifications,
//       publicCareerNarrative:
//         payload.publicCareerNarrative ?? existingPortfolio.publicCareerNarrative,
//       publicGoldenThread:
//         payload.publicGoldenThread ?? existingPortfolio.publicGoldenThread,
//       publicGoldenThreadEvidence:
//         payload.publicGoldenThreadEvidence !== undefined
//           ? payload.publicGoldenThreadEvidence === null
//             ? Prisma.DbNull
//             : JSON.parse(JSON.stringify(payload.publicGoldenThreadEvidence))
//           : existingPortfolio.publicGoldenThreadEvidence,
//       publicKeyThemes:
//         payload.publicKeyThemes !== undefined
//           ? payload.publicKeyThemes === null
//             ? Prisma.DbNull
//             : JSON.parse(JSON.stringify(payload.publicKeyThemes))
//           : existingPortfolio.publicKeyThemes,
//       publicHiddenGems:
//         payload.publicHiddenGems !== undefined
//           ? payload.publicHiddenGems === null
//             ? Prisma.DbNull
//             : JSON.parse(JSON.stringify(payload.publicHiddenGems))
//           : existingPortfolio.publicHiddenGems,
//       publicWhatIfScenarios:
//         payload.publicWhatIfScenarios !== undefined
//           ? payload.publicWhatIfScenarios === null
//             ? Prisma.DbNull
//             : JSON.parse(JSON.stringify(payload.publicWhatIfScenarios))
//           : payload.selectedPublicWhatIfs !== undefined
//           ? payload.selectedPublicWhatIfs === null
//             ? Prisma.DbNull
//             : JSON.parse(JSON.stringify(payload.selectedPublicWhatIfs))
//           : existingPortfolio.publicWhatIfScenarios,
//       showcaseSections:
//         payload.showcaseSections !== undefined
//           ? payload.showcaseSections === null
//             ? Prisma.DbNull
//             : JSON.parse(JSON.stringify(payload.showcaseSections))
//           : existingPortfolio.showcaseSections,
//     };

//     // ===== “Strict” filter so we only update exactly the fields the user provided =====
//     const strictDataForUpdate: Partial<Prisma.LivingPortfolioUpdateInput> = {};
//     (Object.keys(payload) as Array<keyof LivingPortfolioUpdatePayload>).forEach(
//       (key) => {
//         if (
//           payload[key] !== undefined &&
//           key in dataForUpdate
//         ) {
//           (strictDataForUpdate as any)[key] = (dataForUpdate as any)[key];
//         }
//       }
//     );

//     // Always include slug if it was provided, even if it didn’t change
//     if (payload.slug !== undefined) {
//       strictDataForUpdate.slug = finalSlug;
//     }
//     // Always include title if provided
//     if (payload.title !== undefined) {
//       strictDataForUpdate.title = dataForUpdate.title;
//     }

//     // If no actual changes found (and slug didn’t change either), return 200 “no-op”
//     if (
//       Object.keys(strictDataForUpdate).length === 0 &&
//       (payload.slug === undefined || finalSlug === existingPortfolio.slug)
//     ) {
//       return NextResponse.json(
//         {
//           message: "No actual changes detected to update.",
//           portfolioId: existingPortfolio.id,
//           portfolioSlug: existingPortfolio.slug,
//         },
//         { status: 200 }
//       );
//     }

//     // Perform the update
//     const updatedPortfolio = await prisma.livingPortfolio.update({
//       where: { id: portfolioId },
//       data:
//         Object.keys(strictDataForUpdate).length > 0
//           ? strictDataForUpdate
//           : { slug: finalSlug }, // fallback
//     });

//     return NextResponse.json(
//       {
//         message: "Living Portfolio updated successfully!",
//         portfolioId: updatedPortfolio.id,
//         portfolioSlug: updatedPortfolio.slug,
//       },
//       { status: 200 }
//     );
//   } catch (error: unknown) {
//     const portfolioIdForErrorLog =
//       req.nextUrl.pathname.split("/").pop() || "unknown_id";
//     console.error(
//       `Error updating living portfolio ${portfolioIdForErrorLog}:`,
//       error
//     );

//     // If Prisma complains about unique constraint on slug:
//     if (error instanceof Prisma.PrismaClientKnownRequestError) {
//       if (error.code === "P2002") {
//         const targetFields = error.meta?.target as string[] | undefined;
//         if (targetFields && targetFields.includes("slug")) {
//           return NextResponse.json(
//             {
//               errorType: "DUPLICATE_SLUG",
//               message: "This custom URL slug is already in use.",
//               field: "slug",
//             },
//             { status: 409 }
//           );
//         } else {
//           return NextResponse.json(
//             {
//               errorType: "UNIQUE_CONSTRAINT_VIOLATION",
//               message: `A unique piece of information is already in use: ${
//                 targetFields?.join(", ") || "Unknown field"
//               }.`,
//               details: error.message,
//             },
//             { status: 409 }
//           );
//         }
//       } else if (error.code === "P2025") {
//         // Record not found
//         return NextResponse.json(
//           { error: "Portfolio to update not found." },
//           { status: 404 }
//         );
//       }
//     }

//     return NextResponse.json(
//       {
//         error: "Failed to update living portfolio.",
//         details: error instanceof Error ? error.message : "An unknown error occurred",
//       },
//       { status: 500 }
//     );
//   }
// }

// // ─── DELETE Handler (unchanged except for better error typing) ─────────────────────────────────────────────────────
// export async function DELETE(req: NextRequest) {
//   try {
//     const { userId: clerkUserId } = await auth();
//     const portfolioId = req.nextUrl.pathname.split("/").pop();

//     if (!clerkUserId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }
//     if (!portfolioId) {
//       return NextResponse.json({ error: "Portfolio ID missing." }, { status: 400 });
//     }

//     const profile = await prisma.profile.findUnique({
//       where: { userId: clerkUserId },
//     });
//     if (!profile) {
//       return NextResponse.json({ error: "User profile not found." }, { status: 404 });
//     }

//     const livingPortfolio = await prisma.livingPortfolio.findFirst({
//       where: { id: portfolioId, profileId: profile.id },
//     });
//     if (!livingPortfolio) {
//       return NextResponse.json(
//         { error: "Living Portfolio not found or access denied." },
//         { status: 404 }
//       );
//     }

//     await prisma.livingPortfolio.delete({ where: { id: portfolioId } });
//     return NextResponse.json(
//       { message: "Living Portfolio deleted successfully." },
//       { status: 200 }
//     );
//   } catch (error: unknown) {
//     const portfolioIdForErrorLog =
//       req.nextUrl.pathname.split("/").pop() || "unknown_id";
//     console.error(
//       `Error deleting living portfolio ${portfolioIdForErrorLog}:`,
//       error
//     );
//     if (
//       error instanceof Prisma.PrismaClientKnownRequestError &&
//       error.code === "P2025"
//     ) {
//       return NextResponse.json(
//         { error: "Portfolio not found or already deleted." },
//         { status: 404 }
//       );
//     }
//     return NextResponse.json(
//       {
//         error: "Failed to delete living portfolio.",
//         details: error instanceof Error ? error.message : "An unknown error occurred",
//       },
//       { status: 500 }
//     );
//   }
// }

// src/app/api/living-portfolios/[portfolioId]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import type { ResumeJSON } from "@/components/ATSScore";
import type {
  InitialNarrativeResult,
  HiddenGemsResult,
  WhatIfResult,
} from "@/components/NarrativeWeaver";
import { Prisma } from "@prisma/client";

// --- Interfaces (unchanged) ---
interface ShowcaseItem {
  id: string;
  name: string;
  description: string;
  link?: string;
  skillsUsed?: string[];
}
interface ShowcaseSectionData {
  id: string;
  title: string;
  items: ShowcaseItem[];
}
interface LivingPortfolioDisplaySettings {
  contact: {
    showFullName: boolean;
    showEmail: boolean;
    showPhone: boolean;
    showLocation: boolean;
    showLinkedIn: boolean;
    showPhoto: boolean;
  };
  sections: {
    showSummary: boolean;
    showSkills: boolean;
    showWorkExperience: boolean;
    showEducation: boolean;
    showVolunteering: boolean;
    showCertifications: boolean;
    showReferences: boolean;
  };
  narrativeSuite: {
    showCareerNarrative: boolean;
    showGoldenThread: boolean;
    showKeyThemes: boolean;
    showHiddenGems: boolean;
  };
}
interface LivingPortfolioUpdatePayload {
  title?: string;
  slug?: string | null;
  isPublic?: boolean;
  theme?: string;
  displaySettings?: LivingPortfolioDisplaySettings | null;
  publicFullName?: string | null;
  publicJobTitle?: string | null;
  publicEmail?: string | null;
  publicPhone?: string | null;
  publicLocation?: string | null;
  publicLinkedInUrl?: string | null;
  publicSummary?: string | null;
  publicSkills?: string[] | null;
  publicWorkExperiences?: ResumeJSON["workExperiences"] | null;
  publicEducations?: ResumeJSON["educations"] | null;
  publicVolunteering?: ResumeJSON["volunteering"] | null;
  publicCertifications?: ResumeJSON["certifications"] | null;
  publicCareerNarrative?: string | null;
  publicGoldenThread?: string | null;
  publicGoldenThreadEvidence?:
    | InitialNarrativeResult["goldenThreadEvidence"]
    | null;
  publicKeyThemes?: InitialNarrativeResult["keyThemes"] | null;
  publicHiddenGems?: HiddenGemsResult | null;
  publicWhatIfScenarios?: Array<{
    scenarioText: string;
    adaptedResult: WhatIfResult;
  }> | null;
  selectedPublicWhatIfs?: Array<{
    scenarioText: string;
    adaptedResult: WhatIfResult;
  }> | null;
  showcaseSections?: ShowcaseSectionData[] | null;
}

export const runtime = "nodejs";

// ─── PUT Handler ─────────────────────────────────────────────────
export async function PUT(req: NextRequest) {
  try {
    const { userId: clerkUserId } = await auth();
    const portfolioId = req.nextUrl.pathname.split("/").pop();

    if (!clerkUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!portfolioId) {
      return NextResponse.json(
        { error: "Portfolio ID missing" },
        { status: 400 },
      );
    }

    const payload: LivingPortfolioUpdatePayload = await req.json();

    // Title validation (if provided)
    if (
      payload.title !== undefined &&
      (payload.title === null || payload.title.trim() === "")
    ) {
      return NextResponse.json(
        {
          errorType: "VALIDATION_ERROR",
          message: "Portfolio Title cannot be empty.",
          field: "title",
        },
        { status: 400 },
      );
    }

    // Fetch profile
    const profile = await prisma.profile.findUnique({
      where: { userId: clerkUserId },
    });
    if (!profile) {
      return NextResponse.json(
        { error: "User profile not found." },
        { status: 404 },
      );
    }

    // Fetch existing portfolio
    const existingPortfolio = await prisma.livingPortfolio.findUnique({
      where: { id: portfolioId },
    });
    if (!existingPortfolio) {
      return NextResponse.json(
        { error: "Portfolio not found" },
        { status: 404 },
      );
    }
    if (existingPortfolio.profileId !== profile.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // ===== Slug‐collision logic (client already does a real-time check, but we re‐check here) =====
    let finalSlug: string | null = existingPortfolio.slug;
    if (payload.slug !== undefined) {
      if (payload.slug === null || payload.slug.trim() === "") {
        finalSlug = null;
      } else {
        const trimmedSlug = payload.slug.trim();
        if (trimmedSlug !== existingPortfolio.slug) {
          // See if that slug is already used by another portfolio
          const slugExists = await prisma.livingPortfolio.findUnique({
            where: { slug: trimmedSlug },
          });
          if (slugExists && slugExists.id !== portfolioId) {
            return NextResponse.json(
              {
                errorType: "DUPLICATE_SLUG",
                message: "Slug already in use.",
                field: "slug",
              },
              { status: 409 },
            );
          }
          finalSlug = trimmedSlug;
        }
      }
    }

    // ===== Build dataForUpdate exactly as before, using nullish coalescing & DB JSON when provided =====
    const dataForUpdate: Prisma.LivingPortfolioUpdateInput = {
      title:
        payload.title !== undefined ? payload.title : existingPortfolio.title,
      slug: payload.slug !== undefined ? finalSlug : existingPortfolio.slug,
      isPublic: payload.isPublic ?? existingPortfolio.isPublic,
      theme: payload.theme ?? existingPortfolio.theme,
      displaySettings:
        payload.displaySettings !== undefined
          ? payload.displaySettings === null
            ? Prisma.DbNull
            : JSON.parse(JSON.stringify(payload.displaySettings))
          : existingPortfolio.displaySettings,
      publicFullName:
        payload.publicFullName ?? existingPortfolio.publicFullName,
      publicJobTitle:
        payload.publicJobTitle ?? existingPortfolio.publicJobTitle,
      publicEmail: payload.publicEmail ?? existingPortfolio.publicEmail,
      publicPhone: payload.publicPhone ?? existingPortfolio.publicPhone,
      publicLocation:
        payload.publicLocation ?? existingPortfolio.publicLocation,
      publicLinkedInUrl:
        payload.publicLinkedInUrl ?? existingPortfolio.publicLinkedInUrl,
      publicSummary: payload.publicSummary ?? existingPortfolio.publicSummary,
      publicSkills:
        payload.publicSkills !== undefined
          ? payload.publicSkills === null
            ? Prisma.DbNull
            : JSON.parse(JSON.stringify(payload.publicSkills))
          : existingPortfolio.publicSkills,
      publicWorkExperiences:
        payload.publicWorkExperiences !== undefined
          ? payload.publicWorkExperiences === null
            ? Prisma.DbNull
            : JSON.parse(JSON.stringify(payload.publicWorkExperiences))
          : existingPortfolio.publicWorkExperiences,
      publicEducations:
        payload.publicEducations !== undefined
          ? payload.publicEducations === null
            ? Prisma.DbNull
            : JSON.parse(JSON.stringify(payload.publicEducations))
          : existingPortfolio.publicEducations,
      publicVolunteering:
        payload.publicVolunteering !== undefined
          ? payload.publicVolunteering === null
            ? Prisma.DbNull
            : JSON.parse(JSON.stringify(payload.publicVolunteering))
          : existingPortfolio.publicVolunteering,
      publicCertifications:
        payload.publicCertifications !== undefined
          ? payload.publicCertifications === null
            ? Prisma.DbNull
            : JSON.parse(JSON.stringify(payload.publicCertifications))
          : existingPortfolio.publicCertifications,
      publicCareerNarrative:
        payload.publicCareerNarrative ??
        existingPortfolio.publicCareerNarrative,
      publicGoldenThread:
        payload.publicGoldenThread ?? existingPortfolio.publicGoldenThread,
      publicGoldenThreadEvidence:
        payload.publicGoldenThreadEvidence !== undefined
          ? payload.publicGoldenThreadEvidence === null
            ? Prisma.DbNull
            : JSON.parse(JSON.stringify(payload.publicGoldenThreadEvidence))
          : existingPortfolio.publicGoldenThreadEvidence,
      publicKeyThemes:
        payload.publicKeyThemes !== undefined
          ? payload.publicKeyThemes === null
            ? Prisma.DbNull
            : JSON.parse(JSON.stringify(payload.publicKeyThemes))
          : existingPortfolio.publicKeyThemes,
      publicHiddenGems:
        payload.publicHiddenGems !== undefined
          ? payload.publicHiddenGems === null
            ? Prisma.DbNull
            : JSON.parse(JSON.stringify(payload.publicHiddenGems))
          : existingPortfolio.publicHiddenGems,
      publicWhatIfScenarios:
        payload.publicWhatIfScenarios !== undefined
          ? payload.publicWhatIfScenarios === null
            ? Prisma.DbNull
            : JSON.parse(JSON.stringify(payload.publicWhatIfScenarios))
          : payload.selectedPublicWhatIfs !== undefined
            ? payload.selectedPublicWhatIfs === null
              ? Prisma.DbNull
              : JSON.parse(JSON.stringify(payload.selectedPublicWhatIfs))
            : existingPortfolio.publicWhatIfScenarios,
      showcaseSections:
        payload.showcaseSections !== undefined
          ? payload.showcaseSections === null
            ? Prisma.DbNull
            : JSON.parse(JSON.stringify(payload.showcaseSections))
          : existingPortfolio.showcaseSections,
    };

    // ===== “Strict” filter so we only update exactly the fields the user provided =====
    const strictDataForUpdate: Partial<Prisma.LivingPortfolioUpdateInput> = {};
    (Object.keys(payload) as Array<keyof LivingPortfolioUpdatePayload>).forEach(
      (key) => {
        if (payload[key] !== undefined && key in dataForUpdate) {
          (strictDataForUpdate as any)[key] = (dataForUpdate as any)[key];
        }
      },
    );

    // Always include slug if it was provided, even if it didn’t change
    if (payload.slug !== undefined) {
      strictDataForUpdate.slug = finalSlug;
    }
    // Always include title if provided
    if (payload.title !== undefined) {
      strictDataForUpdate.title = dataForUpdate.title;
    }

    // If no actual changes found (and slug didn’t change either), return 200 “no-op”
    if (
      Object.keys(strictDataForUpdate).length === 0 &&
      (payload.slug === undefined || finalSlug === existingPortfolio.slug)
    ) {
      return NextResponse.json(
        {
          message: "No actual changes detected to update.",
          portfolioId: existingPortfolio.id,
          portfolioSlug: existingPortfolio.slug,
        },
        { status: 200 },
      );
    }

    // Perform the update
    const updatedPortfolio = await prisma.livingPortfolio.update({
      where: { id: portfolioId },
      data:
        Object.keys(strictDataForUpdate).length > 0
          ? strictDataForUpdate
          : { slug: finalSlug }, // fallback
    });

    return NextResponse.json(
      {
        message: "Living Portfolio updated successfully!",
        portfolioId: updatedPortfolio.id,
        portfolioSlug: updatedPortfolio.slug,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    const portfolioIdForErrorLog =
      req.nextUrl.pathname.split("/").pop() || "unknown_id";
    console.error(
      `Error updating living portfolio ${portfolioIdForErrorLog}:`,
      error,
    );

    // If Prisma complains about unique constraint on slug:
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const targetFields = error.meta?.target as string[] | undefined;
        if (targetFields && targetFields.includes("slug")) {
          return NextResponse.json(
            {
              errorType: "DUPLICATE_SLUG",
              message: "This custom URL slug is already in use.",
              field: "slug",
            },
            { status: 409 },
          );
        } else {
          return NextResponse.json(
            {
              errorType: "UNIQUE_CONSTRAINT_VIOLATION",
              message: `A unique piece of information is already in use: ${
                targetFields?.join(", ") || "Unknown field"
              }.`,
              details: error.message,
            },
            { status: 409 },
          );
        }
      } else if (error.code === "P2025") {
        // Record not found
        return NextResponse.json(
          { error: "Portfolio to update not found." },
          { status: 404 },
        );
      }
    }

    return NextResponse.json(
      {
        error: "Failed to update living portfolio.",
        details:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 },
    );
  }
}

// ─── DELETE Handler (unchanged except for better error typing) ─────────────────────────────────────────────────────
export async function DELETE(req: NextRequest) {
  try {
    const { userId: clerkUserId } = await auth();
    const portfolioId = req.nextUrl.pathname.split("/").pop();

    if (!clerkUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!portfolioId) {
      return NextResponse.json(
        { error: "Portfolio ID missing." },
        { status: 400 },
      );
    }

    const profile = await prisma.profile.findUnique({
      where: { userId: clerkUserId },
    });
    if (!profile) {
      return NextResponse.json(
        { error: "User profile not found." },
        { status: 404 },
      );
    }

    const livingPortfolio = await prisma.livingPortfolio.findFirst({
      where: { id: portfolioId, profileId: profile.id },
    });
    if (!livingPortfolio) {
      return NextResponse.json(
        { error: "Living Portfolio not found or access denied." },
        { status: 404 },
      );
    }

    await prisma.livingPortfolio.delete({ where: { id: portfolioId } });
    return NextResponse.json(
      { message: "Living Portfolio deleted successfully." },
      { status: 200 },
    );
  } catch (error: unknown) {
    const portfolioIdForErrorLog =
      req.nextUrl.pathname.split("/").pop() || "unknown_id";
    console.error(
      `Error deleting living portfolio ${portfolioIdForErrorLog}:`,
      error,
    );
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { error: "Portfolio not found or already deleted." },
        { status: 404 },
      );
    }
    return NextResponse.json(
      {
        error: "Failed to delete living portfolio.",
        details:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 },
    );
  }
}
