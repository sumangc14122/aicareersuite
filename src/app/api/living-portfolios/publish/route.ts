// // // // // src/app/api/living-portfolios/publish/route.ts
// // // // import { NextRequest, NextResponse } from 'next/server';
// // // // import { auth } from '@clerk/nextjs/server';
// // // // import prisma from '@/lib/prisma'; // Your Prisma client

// // // // // Define the payload interface directly here or import if you have it in a types.ts
// // // // // This should match the payload structure sent from page.tsx's publishLivingPortfolio function
// // // // interface WhatIfResult { // Minimal definition, ensure it matches your actual WhatIfResult
// // // //   adaptedNarrative: string;
// // // //   keyTransferableSkills: string[];
// // // //   pivotPoints: string[];
// // // // }

// // // // interface GoldenThreadEvidence { // Minimal definition
// // // //   section: string;
// // // //   textSnippet: string;
// // // //   // Add other fields like itemId, bulletIndex if they are part of the object
// // // // }

// // // // interface HiddenGem { // Minimal definition
// // // //   gem: string;
// // // //   reasoning: string;
// // // //   suggestion: string;
// // // // }

// // // // interface HiddenGemsResultForPayload { // To match Prisma's Json? for aiHiddenGemsResultJson
// // // //     hiddenGems: HiddenGem[];
// // // // }

// // // // export interface LivingPortfolioPublishPayload {
// // // //   sourceResumeDraftId: string;
// // // //   title: string;
// // // //   slug?: string;
// // // //   isPublic: boolean;
// // // //   theme: string;
// // // //   displaySettings: {
// // // //     contact: { showEmail: boolean; showPhone: boolean; showLocation: boolean; showLinkedIn: boolean; showPhoto: boolean; };
// // // //     sections: { showSummary: boolean; showSkills: boolean; showWorkExperience: boolean; showEducation: boolean; showVolunteering: boolean; showCertifications: boolean; showReferences: boolean; };
// // // //     narrativeSuite: { showCareerNarrative: boolean; showGoldenThread: boolean; showKeyThemes: boolean; showHiddenGems: boolean; };
// // // //   };
// // // //   publicFullName?: string;
// // // //   publicJobTitle?: string;
// // // //   publicEmail?: string;
// // // //   publicPhone?: string;
// // // //   publicLocation?: string;
// // // //   publicLinkedInUrl?: string;
// // // //   publicSummary?: string;
// // // //   publicSkills?: string[];
// // // //   publicWorkExperiences?: any[]; // Prisma expects Json, so any[] or a more specific type
// // // //   publicEducations?: any[];
// // // //   publicVolunteering?: any[];
// // // //   publicCertifications?: any[];
// // // //   publicCareerNarrative?: string;
// // // //   publicGoldenThread?: string;
// // // //   publicGoldenThreadEvidence?: GoldenThreadEvidence[];
// // // //   publicKeyThemes?: Array<{ theme: string; evidence: string }>;
// // // //   publicHiddenGems?: HiddenGemsResultForPayload; // Matches the full object
// // // //   publicWhatIfScenarios?: Array<{ scenarioText: string, adaptedResult: WhatIfResult }>;
// // // //   showcaseSections?: Array<{ title: string, items: Array<{name: string, description: string, link?: string, skillsUsed?: string[]}> }>;
// // // // }

// // // // export const runtime = 'nodejs';

// // // // export async function POST(req: NextRequest) {
// // // //   const { userId: clerkUserId } = await auth();

// // // //   if (!clerkUserId) {
// // // //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
// // // //   }

// // // //   try {
// // // //     const payload: LivingPortfolioPublishPayload = await req.json();
// // // //     console.log("Received payload for /api/living-portfolios/publish:", JSON.stringify(payload, null, 2));

// // // //     // Basic validation of required fields from payload
// // // //     const {
// // // //       sourceResumeDraftId,
// // // //       title,
// // // //       // slug is optional
// // // //       isPublic,
// // // //       theme,
// // // //       displaySettings,
// // // //       // public... fields are optional based on displaySettings
// // // //     } = payload;

// // // //     if (!sourceResumeDraftId || !title || typeof isPublic !== 'boolean' || !theme || !displaySettings) {
// // // //       return NextResponse.json({ error: 'Missing required fields in portfolio payload.' }, { status: 400 });
// // // //     }

// // // //     // 1. Find the user's profile
// // // //     const profile = await prisma.profile.findUnique({
// // // //       where: { userId: clerkUserId },
// // // //     });

// // // //     if (!profile) {
// // // //       // This case should ideally be handled during user creation/onboarding
// // // //       // For robustness, you might create a profile here if it's essential for proceeding.
// // // //       console.error(`Profile not found for authenticated userId: ${clerkUserId}. Cannot create LivingPortfolio.`);
// // // //       return NextResponse.json({ error: 'User profile not found. Please complete your profile setup.' }, { status: 404 });
// // // //     }

// // // //     // 2. Verify ResumeDraft exists and belongs to the user
// // // //     const resumeDraft = await prisma.resumeDraft.findUnique({
// // // //       where: { id: sourceResumeDraftId },
// // // //     });

// // // //     if (!resumeDraft) {
// // // //       return NextResponse.json({ error: 'Source resume draft not found.' }, { status: 404 });
// // // //     }
// // // //     if (resumeDraft.profileId !== profile.id) {
// // // //       return NextResponse.json({ error: 'Forbidden: You do not own the source resume draft.' }, { status: 403 });
// // // //     }

// // // //     // 3. Create the LivingPortfolio record
// // // //     // Ensure all `Json?` fields in Prisma are handled correctly if payload fields are undefined
// // // //     const newPortfolio = await prisma.livingPortfolio.create({
// // // //       data: {
// // // //         profileId: profile.id,
// // // //         sourceResumeDraftId: sourceResumeDraftId,
// // // //         title: title,
// // // //         slug: payload.slug || undefined, // Prisma will handle unique constraint if slug is provided and not null
// // // //         isPublic: isPublic,
// // // //         theme: theme,
// // // //         displaySettings: displaySettings as any, // Cast to any if Prisma complains about specific JSON structure

// // // //         publicFullName: payload.publicFullName || undefined,
// // // //         publicJobTitle: payload.publicJobTitle || undefined,
// // // //         publicEmail: payload.publicEmail || undefined,
// // // //         publicPhone: payload.publicPhone || undefined,
// // // //         publicLocation: payload.publicLocation || undefined,
// // // //         publicLinkedInUrl: payload.publicLinkedInUrl || undefined,
// // // //         publicSummary: payload.publicSummary || undefined,
// // // //         publicSkills: payload.publicSkills || [], // Default to empty array if undefined
// // // //         publicWorkExperiences: payload.publicWorkExperiences || undefined,
// // // //         publicEducations: payload.publicEducations || undefined,
// // // //         publicVolunteering: payload.publicVolunteering || undefined,
// // // //         publicCertifications: payload.publicCertifications || undefined,
// // // //         publicCareerNarrative: payload.publicCareerNarrative || undefined,
// // // //         publicGoldenThread: payload.publicGoldenThread || undefined,
// // // //         publicGoldenThreadEvidence: payload.publicGoldenThreadEvidence || undefined,
// // // //         publicKeyThemes: payload.publicKeyThemes || undefined,
// // // //         publicHiddenGems: payload.publicHiddenGems || undefined,
// // // //         publicWhatIfScenarios: payload.publicWhatIfScenarios || undefined,
// // // //         showcaseSections: payload.showcaseSections || undefined,
// // // //       },
// // // //     });

// // // //     console.log("Successfully created LivingPortfolio:", newPortfolio.id);

// // // //     // 4. Return success response
// // // //     return NextResponse.json({
// // // //       message: 'Living Portfolio published successfully!',
// // // //       portfolioId: newPortfolio.id,
// // // //       portfolioSlug: newPortfolio.slug,
// // // //     }, { status: 201 });

// // // //   } catch (error: any) {
// // // //     console.error('Error publishing Living Portfolio:', error);
// // // //     // Handle Prisma unique constraint error for slug specifically
// // // //     if (error.code === 'P2002' && error.meta?.target?.includes('slug')) {
// // // //         return NextResponse.json(
// // // //             { error: 'A portfolio with this slug already exists. Please choose a different one or leave it blank to auto-generate.' },
// // // //             { status: 409 } // Conflict
// // // //         );
// // // //     }
// // // //     return NextResponse.json(
// // // //       { error: 'Failed to publish Living Portfolio.', details: error.message, stack: error.stack },
// // // //       { status: 500 }
// // // //     );
// // // //   }
// // // // }

// // // import { NextRequest, NextResponse } from "next/server";
// // // import { auth } from "@clerk/nextjs/server";
// // // import prisma from "@/lib/prisma";

// // // // ─── Type Definitions ────────────────────────────────────────────
// // // export interface WhatIfResult {
// // //   adaptedNarrative: string;
// // //   keyTransferableSkills: string[];
// // //   pivotPoints: string[];
// // // }

// // // export interface GoldenThreadEvidence {
// // //   section: string;
// // //   textSnippet: string;
// // // }

// // // export interface HiddenGem {
// // //   gem: string;
// // //   reasoning: string;
// // //   suggestion: string;
// // // }

// // // export interface HiddenGemsResultForPayload {
// // //   hiddenGems: HiddenGem[];
// // // }

// // // export interface LivingPortfolioPublishPayload {
// // //   sourceResumeDraftId: string;
// // //   title: string;
// // //   slug?: string;
// // //   isPublic: boolean;
// // //   theme: string;
// // //   displaySettings: {
// // //     contact: {
// // //       showEmail: boolean;
// // //       showPhone: boolean;
// // //       showLocation: boolean;
// // //       showLinkedIn: boolean;
// // //       showPhoto: boolean;
// // //     };
// // //     sections: {
// // //       showSummary: boolean;
// // //       showSkills: boolean;
// // //       showWorkExperience: boolean;
// // //       showEducation: boolean;
// // //       showVolunteering: boolean;
// // //       showCertifications: boolean;
// // //       showReferences: boolean;
// // //     };
// // //     narrativeSuite: {
// // //       showCareerNarrative: boolean;
// // //       showGoldenThread: boolean;
// // //       showKeyThemes: boolean;
// // //       showHiddenGems: boolean;
// // //     };
// // //   };
// // //   publicFullName?: string;
// // //   publicJobTitle?: string;
// // //   publicEmail?: string;
// // //   publicPhone?: string;
// // //   publicLocation?: string;
// // //   publicLinkedInUrl?: string;
// // //   publicSummary?: string;
// // //   publicSkills?: string[];
// // //   publicWorkExperiences?: any[];
// // //   publicEducations?: any[];
// // //   publicVolunteering?: any[];
// // //   publicCertifications?: any[];
// // //   publicCareerNarrative?: string;
// // //   publicGoldenThread?: string;
// // //   publicGoldenThreadEvidence?: GoldenThreadEvidence[];
// // //   publicKeyThemes?: Array<{ theme: string; evidence: string }>;
// // //   publicHiddenGems?: HiddenGemsResultForPayload;
// // //   publicWhatIfScenarios?: Array<{
// // //     scenarioText: string;
// // //     adaptedResult: WhatIfResult;
// // //   }>;
// // //   showcaseSections?: Array<{
// // //     title: string;
// // //     items: Array<{
// // //       name: string;
// // //       description: string;
// // //       link?: string;
// // //       skillsUsed?: string[];
// // //     }>;
// // //   }>;
// // // }

// // // // ─── Helpers ────────────────────────────────────────────────────
// // // function safeJson<T>(value: T): any {
// // //   return value ? JSON.parse(JSON.stringify(value)) : undefined;
// // // }

// // // export const runtime = "nodejs";

// // // export async function POST(req: NextRequest) {
// // //   const { userId: clerkUserId } = await auth();

// // //   if (!clerkUserId) {
// // //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// // //   }

// // //   try {
// // //     const payload: LivingPortfolioPublishPayload = await req.json();
// // //     console.log(
// // //       "Received payload for /api/living-portfolios/publish:",
// // //       JSON.stringify(payload, null, 2),
// // //     );

// // //     const { sourceResumeDraftId, title, isPublic, theme, displaySettings } =
// // //       payload;

// // //     if (
// // //       !sourceResumeDraftId ||
// // //       !title ||
// // //       typeof isPublic !== "boolean" ||
// // //       !theme ||
// // //       !displaySettings
// // //     ) {
// // //       return NextResponse.json(
// // //         { error: "Missing required fields in portfolio payload." },
// // //         { status: 400 },
// // //       );
// // //     }

// // //     const profile = await prisma.profile.findUnique({
// // //       where: { userId: clerkUserId },
// // //     });

// // //     if (!profile) {
// // //       console.error(`Profile not found for userId: ${clerkUserId}`);
// // //       return NextResponse.json(
// // //         {
// // //           error: "User profile not found. Please complete your profile setup.",
// // //         },
// // //         { status: 404 },
// // //       );
// // //     }

// // //     const resumeDraft = await prisma.resumeDraft.findUnique({
// // //       where: { id: sourceResumeDraftId },
// // //     });

// // //     if (!resumeDraft) {
// // //       return NextResponse.json(
// // //         { error: "Source resume draft not found." },
// // //         { status: 404 },
// // //       );
// // //     }

// // //     if (resumeDraft.profileId !== profile.id) {
// // //       return NextResponse.json(
// // //         { error: "Forbidden: You do not own the source resume draft." },
// // //         { status: 403 },
// // //       );
// // //     }

// // //     const newPortfolio = await prisma.livingPortfolio.create({
// // //       data: {
// // //         profileId: profile.id,
// // //         sourceResumeDraftId,
// // //         title,
// // //         slug: payload.slug || undefined,
// // //         isPublic,
// // //         theme,
// // //         displaySettings: safeJson(payload.displaySettings),

// // //         publicFullName: payload.publicFullName,
// // //         publicJobTitle: payload.publicJobTitle,
// // //         publicEmail: payload.publicEmail,
// // //         publicPhone: payload.publicPhone,
// // //         publicLocation: payload.publicLocation,
// // //         publicLinkedInUrl: payload.publicLinkedInUrl,
// // //         publicSummary: payload.publicSummary,
// // //         publicSkills: payload.publicSkills || [],
// // //         publicWorkExperiences: safeJson(payload.publicWorkExperiences),
// // //         publicEducations: safeJson(payload.publicEducations),
// // //         publicVolunteering: safeJson(payload.publicVolunteering),
// // //         publicCertifications: safeJson(payload.publicCertifications),
// // //         publicCareerNarrative: payload.publicCareerNarrative,
// // //         publicGoldenThread: payload.publicGoldenThread,
// // //         publicGoldenThreadEvidence: safeJson(
// // //           payload.publicGoldenThreadEvidence,
// // //         ),
// // //         publicKeyThemes: safeJson(payload.publicKeyThemes),
// // //         publicHiddenGems: safeJson(payload.publicHiddenGems),
// // //         publicWhatIfScenarios: safeJson(payload.publicWhatIfScenarios),
// // //         showcaseSections: safeJson(payload.showcaseSections),
// // //       },
// // //     });

// // //     console.log("Successfully created LivingPortfolio:", newPortfolio.id);

// // //     return NextResponse.json(
// // //       {
// // //         message: "Living Portfolio published successfully!",
// // //         portfolioId: newPortfolio.id,
// // //         portfolioSlug: newPortfolio.slug,
// // //       },
// // //       { status: 201 },
// // //     );
// // //   } catch (error: any) {
// // //     console.error("Error publishing Living Portfolio:", error);

// // //     if (error.code === "P2002" && error.meta?.target?.includes("slug")) {
// // //       return NextResponse.json(
// // //         {
// // //           error:
// // //             "A portfolio with this slug already exists. Please choose a different one or leave it blank to auto-generate.",
// // //         },
// // //         { status: 409 },
// // //       );
// // //     }

// // //     return NextResponse.json(
// // //       {
// // //         error: "Failed to publish Living Portfolio.",
// // //         details: error.message,
// // //         stack: error.stack,
// // //       },
// // //       { status: 500 },
// // //     );
// // //   }
// // // }

// // // src/app/api/living-portfolios/publish/route.ts
// // import { NextRequest, NextResponse } from "next/server";
// // import { auth } from "@clerk/nextjs/server";
// // import prisma from "@/lib/prisma";
// // import { Prisma } from "@prisma/client";

// // // ─── Type Definitions ────────────────────────────────────────────
// // export interface WhatIfResult {
// //   adaptedNarrative: string;
// //   keyTransferableSkills: string[];
// //   pivotPoints: string[];
// // }

// // export interface GoldenThreadEvidence {
// //   section: string;
// //   textSnippet: string;
// // }

// // export interface HiddenGem {
// //   gem: string;
// //   reasoning: string;
// //   suggestion: string;
// // }

// // export interface HiddenGemsResultForPayload {
// //   hiddenGems: HiddenGem[];
// // }

// // // Specific interfaces for JSON fields
// // export interface WorkExperience {
// //   id?: string;
// //   company: string;
// //   position: string;
// //   startDate: string;
// //   endDate?: string;
// //   description?: string;
// // }

// // export interface Education {
// //   id?: string;
// //   institution: string;
// //   degree: string;
// //   fieldOfStudy: string;
// //   startDate: string;
// //   endDate?: string;
// // }

// // export interface Volunteering {
// //   id?: string;
// //   organization: string;
// //   role: string;
// //   startDate: string;
// //   endDate?: string;
// //   description?: string;
// // }

// // export interface Certification {
// //   id?: string;
// //   name: string;
// //   issuingOrganization: string;
// //   issueDate: string;
// //   expirationDate?: string;
// // }

// // export interface LivingPortfolioPublishPayload {
// //   sourceResumeDraftId: string;
// //   title: string;
// //   slug?: string;
// //   isPublic: boolean;
// //   theme: string;
// //   displaySettings: {
// //     contact: {
// //       showEmail: boolean;
// //       showPhone: boolean;
// //       showLocation: boolean;
// //       showLinkedIn: boolean;
// //       showPhoto: boolean;
// //     };
// //     sections: {
// //       showSummary: boolean;
// //       showSkills: boolean;
// //       showWorkExperience: boolean;
// //       showEducation: boolean;
// //       showVolunteering: boolean;
// //       showCertifications: boolean;
// //       showReferences: boolean;
// //     };
// //     narrativeSuite: {
// //       showCareerNarrative: boolean;
// //       showGoldenThread: boolean;
// //       showKeyThemes: boolean;
// //       showHiddenGems: boolean;
// //     };
// //   };
// //   publicFullName?: string;
// //   publicJobTitle?: string;
// //   publicEmail?: string;
// //   publicPhone?: string;
// //   publicLocation?: string;
// //   publicLinkedInUrl?: string;
// //   publicSummary?: string;
// //   publicSkills?: string[];
// //   // Use specific types for type safety, but they’ll be serialized to InputJsonValue
// //   publicWorkExperiences?: WorkExperience[];
// //   publicEducations?: Education[];
// //   publicVolunteering?: Volunteering[];
// //   publicCertifications?: Certification[];
// //   publicCareerNarrative?: string;
// //   publicGoldenThread?: string;
// //   publicGoldenThreadEvidence?: GoldenThreadEvidence[];
// //   publicKeyThemes?: Array<{ theme: string; evidence: string }>;
// //   publicHiddenGems?: HiddenGemsResultForPayload;
// //   publicWhatIfScenarios?: Array<{
// //     scenarioText: string;
// //     adaptedResult: WhatIfResult;
// //   }>;
// //   showcaseSections?: Array<{
// //     title: string;
// //     items: Array<{
// //       name: string;
// //       description: string;
// //       link?: string;
// //       skillsUsed?: string[];
// //     }>;
// //   }>;
// // }

// // // ─── Helpers ────────────────────────────────────────────────────
// // function safeJson<T>(value: T): Prisma.InputJsonValue | undefined {
// //   return value ? JSON.parse(JSON.stringify(value)) : undefined;
// // }

// // export const runtime = "nodejs";

// // export async function POST(req: NextRequest) {
// //   const { userId: clerkUserId } = await auth();

// //   if (!clerkUserId) {
// //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// //   }

// //   try {
// //     const payload: LivingPortfolioPublishPayload = await req.json();
// //     // console.log(
// //     //   "Received payload for /api/living-portfolios/publish:",
// //     //   JSON.stringify(payload, null, 2),
// //     // );

// //     const { sourceResumeDraftId, title, isPublic, theme, displaySettings } =
// //       payload;

// //     if (
// //       !sourceResumeDraftId ||
// //       !title ||
// //       typeof isPublic !== "boolean" ||
// //       !theme ||
// //       !displaySettings
// //     ) {
// //       return NextResponse.json(
// //         { error: "Missing required fields in portfolio payload." },
// //         { status: 400 },
// //       );
// //     }

// //     const profile = await prisma.profile.findUnique({
// //       where: { userId: clerkUserId },
// //     });

// //     if (!profile) {
// //       console.error(`Profile not found for userId: ${clerkUserId}`);
// //       return NextResponse.json(
// //         {
// //           error: "User profile not found. Please complete your profile setup.",
// //         },
// //         { status: 404 },
// //       );
// //     }

// //     const resumeDraft = await prisma.resumeDraft.findUnique({
// //       where: { id: sourceResumeDraftId },
// //     });

// //     if (!resumeDraft) {
// //       return NextResponse.json(
// //         { error: "Source resume draft not found." },
// //         { status: 404 },
// //       );
// //     }

// //     if (resumeDraft.profileId !== profile.id) {
// //       return NextResponse.json(
// //         { error: "Forbidden: You do not own the source resume draft." },
// //         { status: 403 },
// //       );
// //     }

// //     const newPortfolio = await prisma.livingPortfolio.create({
// //       data: {
// //         profileId: profile.id,
// //         sourceResumeDraftId,
// //         title,
// //         slug: payload.slug || undefined,
// //         isPublic,
// //         theme,
// //         displaySettings: safeJson(payload.displaySettings),

// //         publicFullName: payload.publicFullName,
// //         publicJobTitle: payload.publicJobTitle,
// //         publicEmail: payload.publicEmail,
// //         publicPhone: payload.publicPhone,
// //         publicLocation: payload.publicLocation,
// //         publicLinkedInUrl: payload.publicLinkedInUrl,
// //         publicSummary: payload.publicSummary,
// //         publicSkills: payload.publicSkills || [],
// //         publicWorkExperiences: safeJson(payload.publicWorkExperiences),
// //         publicEducations: safeJson(payload.publicEducations),
// //         publicVolunteering: safeJson(payload.publicVolunteering),
// //         publicCertifications: safeJson(payload.publicCertifications),
// //         publicCareerNarrative: payload.publicCareerNarrative,
// //         publicGoldenThread: payload.publicGoldenThread,
// //         publicGoldenThreadEvidence: safeJson(
// //           payload.publicGoldenThreadEvidence,
// //         ),
// //         publicKeyThemes: safeJson(payload.publicKeyThemes),
// //         publicHiddenGems: safeJson(payload.publicHiddenGems),
// //         publicWhatIfScenarios: safeJson(payload.publicWhatIfScenarios),
// //         showcaseSections: safeJson(payload.showcaseSections),
// //       },
// //     });

// //     // console.log("Successfully created LivingPortfolio:", newPortfolio.id);

// //     return NextResponse.json(
// //       {
// //         message: "Living Portfolio published successfully!",
// //         portfolioId: newPortfolio.id,
// //         portfolioSlug: newPortfolio.slug,
// //       },
// //       { status: 201 },
// //     );
// //   } catch (error: unknown) {
// //     console.error("Error publishing Living Portfolio:", error);

// //     if (
// //       error instanceof Error &&
// //       "code" in error &&
// //       error.code === "P2002" &&
// //       "meta" in error &&
// //       error.meta &&
// //       typeof error.meta === "object" &&
// //       "target" in error.meta &&
// //       Array.isArray(error.meta.target) &&
// //       error.meta.target.includes("slug")
// //     ) {
// //       return NextResponse.json(
// //         {
// //           error:
// //             "A portfolio with this slug already exists. Please choose a different one or leave it blank to auto-generate.",
// //         },
// //         { status: 409 },
// //       );
// //     }

// //     return NextResponse.json(
// //       {
// //         error: "Failed to publish Living Portfolio.",
// //         details: error instanceof Error ? error.message : "Unknown error",
// //         stack: error instanceof Error ? error.stack : undefined,
// //       },
// //       { status: 500 },
// //     );
// //   }
// // }

// // src/app/api/living-portfolios/publish/route.ts

// import { NextRequest, NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";
// import prisma from "@/lib/prisma";
// import { Prisma } from "@prisma/client";

// // ─── Type Definitions ────────────────────────────────────────────
// export interface WhatIfResult {
//   adaptedNarrative: string;
//   keyTransferableSkills: string[];
//   pivotPoints: string[];
// }

// export interface GoldenThreadEvidence {
//   section: string;
//   textSnippet: string;
// }

// export interface HiddenGem {
//   gem: string;
//   reasoning: string;
//   suggestion: string;
// }

// export interface HiddenGemsResultForPayload {
//   hiddenGems: HiddenGem[];
// }

// // Specific interfaces for JSON fields
// export interface WorkExperience {
//   id?: string;
//   company: string;
//   position: string;
//   startDate: string;
//   endDate?: string;
//   description?: string;
// }

// export interface Education {
//   id?: string;
//   institution: string;
//   degree: string;
//   fieldOfStudy: string;
//   startDate: string;
//   endDate?: string;
// }

// export interface Volunteering {
//   id?: string;
//   organization: string;
//   role: string;
//   startDate: string;
//   endDate?: string;
//   description?: string;
// }

// export interface Certification {
//   id?: string;
//   name: string;
//   issuingOrganization: string;
//   issueDate: string;
//   expirationDate?: string;
// }

// export interface LivingPortfolioPublishPayload {
//   sourceResumeDraftId: string;
//   title: string;
//   slug?: string;
//   isPublic: boolean;
//   theme: string;
//   displaySettings: {
//     contact: {
//       showEmail: boolean;
//       showPhone: boolean;
//       showLocation: boolean;
//       showLinkedIn: boolean;
//       showPhoto: boolean;
//     };
//     sections: {
//       showSummary: boolean;
//       showSkills: boolean;
//       showWorkExperience: boolean;
//       showEducation: boolean;
//       showVolunteering: boolean;
//       showCertifications: boolean;
//       showReferences: boolean;
//     };
//     narrativeSuite: {
//       showCareerNarrative: boolean;
//       showGoldenThread: boolean;
//       showKeyThemes: boolean;
//       showHiddenGems: boolean;
//     };
//   };
//   publicFullName?: string;
//   publicJobTitle?: string;
//   publicEmail?: string;
//   publicPhone?: string;
//   publicLocation?: string;
//   publicLinkedInUrl?: string;
//   publicSummary?: string;
//   publicSkills?: string[];
//   publicWorkExperiences?: WorkExperience[];
//   publicEducations?: Education[];
//   publicVolunteering?: Volunteering[];
//   publicCertifications?: Certification[];
//   publicCareerNarrative?: string;
//   publicGoldenThread?: string;
//   publicGoldenThreadEvidence?: GoldenThreadEvidence[];
//   publicKeyThemes?: Array<{ theme: string; evidence: string }>;
//   publicHiddenGems?: HiddenGemsResultForPayload;
//   publicWhatIfScenarios?: Array<{
//     scenarioText: string;
//     adaptedResult: WhatIfResult;
//   }>;
//   showcaseSections?: Array<{
//     title: string;
//     items: Array<{
//       name: string;
//       description: string;
//       link?: string;
//       skillsUsed?: string[];
//     }>;
//   }>;
// }

// // ─── Helpers ────────────────────────────────────────────────────
// function safeJson<T>(value: T): Prisma.InputJsonValue | undefined {
//   return value ? JSON.parse(JSON.stringify(value)) : undefined;
// }

// export const runtime = "nodejs";

// export async function POST(req: NextRequest) {
//   const { userId: clerkUserId } = await auth();

//   if (!clerkUserId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const payload: LivingPortfolioPublishPayload = await req.json();
//     const { sourceResumeDraftId, title, isPublic, theme, displaySettings } =
//       payload;

//     // Basic validation
//     if (
//       !sourceResumeDraftId ||
//       !title ||
//       typeof isPublic !== "boolean" ||
//       !theme ||
//       !displaySettings
//     ) {
//       return NextResponse.json(
//         { error: "Missing required fields in portfolio payload." },
//         { status: 400 }
//       );
//     }

//     // Ensure user has a profile
//     const profile = await prisma.profile.findUnique({
//       where: { userId: clerkUserId },
//     });
//     if (!profile) {
//       console.error(`Profile not found for userId: ${clerkUserId}`);
//       return NextResponse.json(
//         {
//           error: "User profile not found. Please complete your profile setup.",
//         },
//         { status: 404 }
//       );
//     }

//     // Ensure resume draft exists and belongs to the user
//     const resumeDraft = await prisma.resumeDraft.findUnique({
//       where: { id: sourceResumeDraftId },
//     });
//     if (!resumeDraft) {
//       return NextResponse.json(
//         { error: "Source resume draft not found." },
//         { status: 404 }
//       );
//     }
//     if (resumeDraft.profileId !== profile.id) {
//       return NextResponse.json(
//         { error: "Forbidden: You do not own the source resume draft." },
//         { status: 403 }
//       );
//     }

//     // Attempt to create the new portfolio
//     const newPortfolio = await prisma.livingPortfolio.create({
//       data: {
//         profileId: profile.id,
//         sourceResumeDraftId,
//         title,
//         slug: payload.slug || undefined,
//         isPublic,
//         theme,
//         displaySettings: safeJson(payload.displaySettings),

//         publicFullName: payload.publicFullName,
//         publicJobTitle: payload.publicJobTitle,
//         publicEmail: payload.publicEmail,
//         publicPhone: payload.publicPhone,
//         publicLocation: payload.publicLocation,
//         publicLinkedInUrl: payload.publicLinkedInUrl,
//         publicSummary: payload.publicSummary,
//         publicSkills: payload.publicSkills || [],
//         publicWorkExperiences: safeJson(payload.publicWorkExperiences),
//         publicEducations: safeJson(payload.publicEducations),
//         publicVolunteering: safeJson(payload.publicVolunteering),
//         publicCertifications: safeJson(payload.publicCertifications),
//         publicCareerNarrative: payload.publicCareerNarrative,
//         publicGoldenThread: payload.publicGoldenThread,
//         publicGoldenThreadEvidence: safeJson(
//           payload.publicGoldenThreadEvidence
//         ),
//         publicKeyThemes: safeJson(payload.publicKeyThemes),
//         publicHiddenGems: safeJson(payload.publicHiddenGems),
//         publicWhatIfScenarios: safeJson(payload.publicWhatIfScenarios),
//         showcaseSections: safeJson(payload.showcaseSections),
//       },
//     });

//     return NextResponse.json(
//       {
//         message: "Living Portfolio published successfully!",
//         portfolioId: newPortfolio.id,
//         portfolioSlug: newPortfolio.slug,
//       },
//       { status: 201 }
//     );
//   } catch (error: unknown) {
//     console.error("Error publishing Living Portfolio:", error);

//     // Catch a Prisma unique-constraint error on `slug`
//     if (
//       error instanceof Prisma.PrismaClientKnownRequestError &&
//       error.code === "P2002" &&
//       Array.isArray(error.meta?.target) &&
//       (error.meta.target as string[]).includes("slug")
//     ) {
//       return NextResponse.json(
//         {
//           errorType: "DUPLICATE_SLUG",
//           message:
//             "A portfolio with this slug already exists. Please choose a different one or leave it blank to auto-generate.",
//         },
//         { status: 409 }
//       );
//     }

//     // Fallback 500
//     return NextResponse.json(
//       {
//         error: "Failed to publish Living Portfolio.",
//         details: error instanceof Error ? error.message : "Unknown error",
//       },
//       { status: 500 }
//     );
//   }
// }

// src/app/api/living-portfolios/publish/route.ts

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// ─── Type Definitions ────────────────────────────────────────────
export interface WhatIfResult {
  adaptedNarrative: string;
  keyTransferableSkills: string[];
  pivotPoints: string[];
}

export interface GoldenThreadEvidence {
  section: string;
  textSnippet: string;
}

export interface HiddenGem {
  gem: string;
  reasoning: string;
  suggestion: string;
}

export interface HiddenGemsResultForPayload {
  hiddenGems: HiddenGem[];
}

// Specific interfaces for JSON fields
export interface WorkExperience {
  id?: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface Education {
  id?: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
}

export interface Volunteering {
  id?: string;
  organization: string;
  role: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface Certification {
  id?: string;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  expirationDate?: string;
}

export interface LivingPortfolioPublishPayload {
  sourceResumeDraftId: string;
  title: string;
  slug?: string;
  isPublic: boolean;
  theme: string;
  displaySettings: {
    contact: {
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
  };
  publicFullName?: string;
  publicJobTitle?: string;
  publicEmail?: string;
  publicPhone?: string;
  publicLocation?: string;
  publicLinkedInUrl?: string;
  publicSummary?: string;
  publicSkills?: string[];
  publicWorkExperiences?: WorkExperience[];
  publicEducations?: Education[];
  publicVolunteering?: Volunteering[];
  publicCertifications?: Certification[];
  publicCareerNarrative?: string;
  publicGoldenThread?: string;
  publicGoldenThreadEvidence?: GoldenThreadEvidence[];
  publicKeyThemes?: Array<{ theme: string; evidence: string }>;
  publicHiddenGems?: HiddenGemsResultForPayload;
  publicWhatIfScenarios?: Array<{
    scenarioText: string;
    adaptedResult: WhatIfResult;
  }>;
  showcaseSections?: Array<{
    title: string;
    items: Array<{
      name: string;
      description: string;
      link?: string;
      skillsUsed?: string[];
    }>;
  }>;
}

// ─── Helpers ────────────────────────────────────────────────────
function safeJson<T>(value: T): Prisma.InputJsonValue | undefined {
  return value ? JSON.parse(JSON.stringify(value)) : undefined;
}

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { userId: clerkUserId } = await auth();

  if (!clerkUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload: LivingPortfolioPublishPayload = await req.json();
    const { sourceResumeDraftId, title, isPublic, theme, displaySettings } =
      payload;

    // Basic validation
    if (
      !sourceResumeDraftId ||
      !title ||
      typeof isPublic !== "boolean" ||
      !theme ||
      !displaySettings
    ) {
      return NextResponse.json(
        { error: "Missing required fields in portfolio payload." },
        { status: 400 },
      );
    }

    // Ensure user has a profile
    const profile = await prisma.profile.findUnique({
      where: { userId: clerkUserId },
    });
    if (!profile) {
      console.error(`Profile not found for userId: ${clerkUserId}`);
      return NextResponse.json(
        {
          error: "User profile not found. Please complete your profile setup.",
        },
        { status: 404 },
      );
    }

    // Ensure resume draft exists and belongs to the user
    const resumeDraft = await prisma.resumeDraft.findUnique({
      where: { id: sourceResumeDraftId },
    });
    if (!resumeDraft) {
      return NextResponse.json(
        { error: "Source resume draft not found." },
        { status: 404 },
      );
    }
    if (resumeDraft.profileId !== profile.id) {
      return NextResponse.json(
        { error: "Forbidden: You do not own the source resume draft." },
        { status: 403 },
      );
    }

    // Attempt to create the new portfolio
    const newPortfolio = await prisma.livingPortfolio.create({
      data: {
        profileId: profile.id,
        sourceResumeDraftId,
        title,
        slug: payload.slug || undefined,
        isPublic,
        theme,
        displaySettings: safeJson(payload.displaySettings),

        publicFullName: payload.publicFullName,
        publicJobTitle: payload.publicJobTitle,
        publicEmail: payload.publicEmail,
        publicPhone: payload.publicPhone,
        publicLocation: payload.publicLocation,
        publicLinkedInUrl: payload.publicLinkedInUrl,
        publicSummary: payload.publicSummary,
        publicSkills: payload.publicSkills || [],
        publicWorkExperiences: safeJson(payload.publicWorkExperiences),
        publicEducations: safeJson(payload.publicEducations),
        publicVolunteering: safeJson(payload.publicVolunteering),
        publicCertifications: safeJson(payload.publicCertifications),
        publicCareerNarrative: payload.publicCareerNarrative,
        publicGoldenThread: payload.publicGoldenThread,
        publicGoldenThreadEvidence: safeJson(
          payload.publicGoldenThreadEvidence,
        ),
        publicKeyThemes: safeJson(payload.publicKeyThemes),
        publicHiddenGems: safeJson(payload.publicHiddenGems),
        publicWhatIfScenarios: safeJson(payload.publicWhatIfScenarios),
        showcaseSections: safeJson(payload.showcaseSections),
      },
    });

    return NextResponse.json(
      {
        message: "Living Portfolio published successfully!",
        portfolioId: newPortfolio.id,
        portfolioSlug: newPortfolio.slug,
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error("Error publishing Living Portfolio:", error);

    // Catch a Prisma unique-constraint error on `slug`
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002" &&
      Array.isArray(error.meta?.target) &&
      (error.meta.target as string[]).includes("slug")
    ) {
      return NextResponse.json(
        {
          errorType: "DUPLICATE_SLUG",
          message:
            "A portfolio with this slug already exists. Please choose a different one or leave it blank to auto-generate.",
        },
        { status: 409 },
      );
    }

    // Fallback 500
    return NextResponse.json(
      {
        error: "Failed to publish Living Portfolio.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
