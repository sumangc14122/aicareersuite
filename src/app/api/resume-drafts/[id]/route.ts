// // // // src/app/api/resume-drafts/[id]/route.ts
// // // import { NextRequest, NextResponse } from 'next/server';
// // // import { auth } from '@clerk/nextjs/server';
// // // import prisma from '@/lib/prisma'; // Ensure this path is correct and prisma is default exported
// // // import { ResumeDraftPayload } from '../type'; // Adjust path if types.ts is in the parent folder

// // // export const runtime = 'nodejs';

// // // // --- GET Handler: Fetch a specific ResumeDraft ---
// // // export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
// // //   const { userId: clerkUserId } = await auth(); // auth() is synchronous for Route Handlers in App Router
// // //   const { id: draftId } = await params;      // Standard destructuring

// // //   if (!clerkUserId) {
// // //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
// // //   }

// // //   if (!draftId) {
// // //     return NextResponse.json({ error: 'Draft ID is missing.' }, { status: 400 });
// // //   }

// // //   try {
// // //     const draft = await prisma.resumeDraft.findUnique({
// // //       where: { id: draftId },
// // //       include: {
// // //         profile: { // Include profile to verify ownership
// // //           select: { userId: true } // Only select userId from profile for this check
// // //         },
// // //       },
// // //     });

// // //     if (!draft) {
// // //       return NextResponse.json({ error: 'Resume draft not found.' }, { status: 404 });
// // //     }

// // //     if (draft.profile.userId !== clerkUserId) {
// // //       return NextResponse.json({ error: 'Forbidden: You do not own this resume draft.' }, { status: 403 });
// // //     }

// // //     // Exclude the profile from the returned draft data to avoid sending unnecessary user info
// // //     const { profile, ...draftData } = draft;

// // //     return NextResponse.json({ draft: draftData }, { status: 200 });

// // //   } catch (error: any) {
// // //     console.error(`Error fetching resume draft ${draftId}:`, error);
// // //     return NextResponse.json(
// // //       { error: `Failed to fetch resume draft.`, details: error.message },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }

// // // // --- PUT Handler: Update an existing ResumeDraft ---
// // // export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
// // //   const { id: draftId } = await params;       // Standard destructuring
// // //   const { userId: clerkUserId } = await auth(); // auth() is synchronous

// // //   if (!clerkUserId) {
// // //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
// // //   }
// // //   if (!draftId) {
// // //     return NextResponse.json({ error: 'Draft ID is missing.' }, { status: 400 });
// // //   }

// // //   try {
// // //     const payload: ResumeDraftPayload = await req.json();

// // //     // Verify ownership of the draft
// // //     const existingDraft = await prisma.resumeDraft.findUnique({
// // //       where: { id: draftId },
// // //       include: {
// // //         profile: { // Include profile to check userId
// // //           select: { userId: true }
// // //         }
// // //       },
// // //     });

// // //     if (!existingDraft) {
// // //       return NextResponse.json({ error: 'Resume draft not found to update.' }, { status: 404 });
// // //     }

// // //     if (existingDraft.profile.userId !== clerkUserId) {
// // //       return NextResponse.json({ error: 'Forbidden: You do not own this resume draft to update.' }, { status: 403 });
// // //     }

// // //     // Update the ResumeDraft
// // //     // Use nullish coalescing (??) to keep existing values if payload fields are undefined
// // //     // For JSON fields, Prisma handles undefined well by not updating the field.
// // //     // If you want to explicitly set a JSON field to null, the payload should send null.
// // //     const updatedDraft = await prisma.resumeDraft.update({
// // //       where: { id: draftId },
// // //       data: {
// // //         title: payload.title ?? existingDraft.title,

// // //         wizardPersonalData: payload.wizardPersonalData ?? existingDraft.wizardPersonalData,
// // //         wizardSummary: payload.wizardSummary ?? existingDraft.wizardSummary,
// // //         wizardSkills: payload.wizardSkills ?? existingDraft.wizardSkills,
// // //         wizardWorkExperiences: payload.wizardWorkExperiences ?? existingDraft.wizardWorkExperiences,
// // //         wizardEducations: payload.wizardEducations ?? existingDraft.wizardEducations,
// // //         wizardVolunteering: payload.wizardVolunteering ?? existingDraft.wizardVolunteering,
// // //         wizardCertifications: payload.wizardCertifications ?? existingDraft.wizardCertifications,
// // //         wizardReferences: payload.wizardReferences ?? existingDraft.wizardReferences,

// // //         aiCareerNarrative: payload.aiCareerNarrative ?? existingDraft.aiCareerNarrative,
// // //         aiGoldenThread: payload.aiGoldenThread ?? existingDraft.aiGoldenThread,
// // //         aiGoldenThreadEvidence: payload.aiGoldenThreadEvidence ?? existingDraft.aiGoldenThreadEvidence,
// // //         aiKeyThemes: payload.aiKeyThemes ?? existingDraft.aiKeyThemes,
// // //         aiHiddenGemsResultJson: payload.aiHiddenGemsResultJson ?? existingDraft.aiHiddenGemsResultJson,
// // //         aiWeavingSuggestions: payload.aiWeavingSuggestions ?? existingDraft.aiWeavingSuggestions,
// // //         aiWhatIfStarters: payload.aiWhatIfStarters ?? existingDraft.aiWhatIfStarters,
// // //         aiWhatIfResultsCache: payload.aiWhatIfResultsCache ?? existingDraft.aiWhatIfResultsCache,
// // //         // profileId is not updatable here, it's set on creation
// // //       },
// // //     });

// // //     return NextResponse.json({
// // //       message: 'Resume draft updated successfully!',
// // //       id: updatedDraft.id,
// // //       // You could return the updatedDraft object if the client needs it
// // //       // draft: updatedDraft
// // //     }, { status: 200 });

// // //   } catch (error: any) {
// // //     console.error(`Error updating resume draft ${draftId}:`, error);
// // //     return NextResponse.json(
// // //       { error: `Failed to update resume draft.`, details: error.message, stack: error.stack },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }

// // // src/app/api/resume-drafts/[id]/route.ts
// // import { NextRequest, NextResponse } from "next/server";
// // import { auth } from "@clerk/nextjs/server";
// // import prisma from "@/lib/prisma"; // Ensure this path is correct and prisma is default exported
// // import { ResumeDraftPayload } from "../type"; // Adjust path if types.ts is in the parent folder

// // export const runtime = "nodejs";

// // // --- GET Handler: Fetch a specific ResumeDraft ---
// // export async function GET(
// //   req: NextRequest,
// //   { params }: { params: { id: string } },
// // ) {
// //   const { userId: clerkUserId } = await auth(); // auth() is synchronous for Route Handlers in App Router
// //   const { id: draftId } = await params; // Standard destructuring

// //   if (!clerkUserId) {
// //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// //   }

// //   if (!draftId) {
// //     return NextResponse.json(
// //       { error: "Draft ID is missing." },
// //       { status: 400 },
// //     );
// //   }

// //   try {
// //     const draft = await prisma.resumeDraft.findUnique({
// //       where: { id: draftId },
// //       include: {
// //         profile: {
// //           // Include profile to verify ownership
// //           select: { userId: true }, // Only select userId from profile for this check
// //         },
// //       },
// //     });

// //     if (!draft) {
// //       return NextResponse.json(
// //         { error: "Resume draft not found." },
// //         { status: 404 },
// //       );
// //     }

// //     if (draft.profile.userId !== clerkUserId) {
// //       return NextResponse.json(
// //         { error: "Forbidden: You do not own this resume draft." },
// //         { status: 403 },
// //       );
// //     }

// //     // Exclude the profile from the returned draft data to avoid sending unnecessary user info
// //     const { profile, ...draftData } = draft;

// //     return NextResponse.json({ draft: draftData }, { status: 200 });
// //   } catch (error: any) {
// //     console.error(`Error fetching resume draft ${draftId}:`, error);
// //     return NextResponse.json(
// //       { error: `Failed to fetch resume draft.`, details: error.message },
// //       { status: 500 },
// //     );
// //   }
// // }

// // // --- PUT Handler: Update an existing ResumeDraft ---
// // export async function PUT(
// //   req: NextRequest,
// //   { params }: { params: { id: string } },
// // ) {
// //   const { id: draftId } = await params; // Standard destructuring
// //   const { userId: clerkUserId } = await auth(); // auth() is synchronous

// //   if (!clerkUserId) {
// //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// //   }
// //   if (!draftId) {
// //     return NextResponse.json(
// //       { error: "Draft ID is missing." },
// //       { status: 400 },
// //     );
// //   }

// //   try {
// //     const payload: ResumeDraftPayload = await req.json();

// //     // Verify ownership of the draft
// //     const existingDraft = await prisma.resumeDraft.findUnique({
// //       where: { id: draftId },
// //       include: {
// //         profile: {
// //           // Include profile to check userId
// //           select: { userId: true },
// //         },
// //       },
// //     });

// //     if (!existingDraft) {
// //       return NextResponse.json(
// //         { error: "Resume draft not found to update." },
// //         { status: 404 },
// //       );
// //     }

// //     if (existingDraft.profile.userId !== clerkUserId) {
// //       return NextResponse.json(
// //         { error: "Forbidden: You do not own this resume draft to update." },
// //         { status: 403 },
// //       );
// //     }

// //     // Helper function to safely handle JSON values
// //     const safeJsonValue = (newValue: any, existingValue: any) => {
// //       if (newValue !== undefined) {
// //         return newValue ? JSON.parse(JSON.stringify(newValue)) : newValue;
// //       }
// //       return existingValue
// //         ? JSON.parse(JSON.stringify(existingValue))
// //         : existingValue;
// //     };

// //     // Update the ResumeDraft
// //     // Use nullish coalescing (??) to keep existing values if payload fields are undefined
// //     // For JSON fields, we need to handle type conversion properly
// //     const updatedDraft = await prisma.resumeDraft.update({
// //       where: { id: draftId },
// //       data: {
// //         title: payload.title ?? existingDraft.title,

// //         wizardPersonalData: safeJsonValue(
// //           payload.wizardPersonalData,
// //           existingDraft.wizardPersonalData,
// //         ),
// //         wizardSummary: safeJsonValue(
// //           payload.wizardSummary,
// //           existingDraft.wizardSummary,
// //         ),
// //         wizardSkills: safeJsonValue(
// //           payload.wizardSkills,
// //           existingDraft.wizardSkills,
// //         ),
// //         wizardWorkExperiences: safeJsonValue(
// //           payload.wizardWorkExperiences,
// //           existingDraft.wizardWorkExperiences,
// //         ),
// //         wizardEducations: safeJsonValue(
// //           payload.wizardEducations,
// //           existingDraft.wizardEducations,
// //         ),
// //         wizardVolunteering: safeJsonValue(
// //           payload.wizardVolunteering,
// //           existingDraft.wizardVolunteering,
// //         ),
// //         wizardCertifications: safeJsonValue(
// //           payload.wizardCertifications,
// //           existingDraft.wizardCertifications,
// //         ),
// //         wizardReferences: safeJsonValue(
// //           payload.wizardReferences,
// //           existingDraft.wizardReferences,
// //         ),

// //         aiCareerNarrative: safeJsonValue(
// //           payload.aiCareerNarrative,
// //           existingDraft.aiCareerNarrative,
// //         ),
// //         aiGoldenThread: safeJsonValue(
// //           payload.aiGoldenThread,
// //           existingDraft.aiGoldenThread,
// //         ),
// //         aiGoldenThreadEvidence: safeJsonValue(
// //           payload.aiGoldenThreadEvidence,
// //           existingDraft.aiGoldenThreadEvidence,
// //         ),
// //         aiKeyThemes: safeJsonValue(
// //           payload.aiKeyThemes,
// //           existingDraft.aiKeyThemes,
// //         ),
// //         aiHiddenGemsResultJson: safeJsonValue(
// //           payload.aiHiddenGemsResultJson,
// //           existingDraft.aiHiddenGemsResultJson,
// //         ),
// //         aiWeavingSuggestions: safeJsonValue(
// //           payload.aiWeavingSuggestions,
// //           existingDraft.aiWeavingSuggestions,
// //         ),
// //         aiWhatIfStarters: safeJsonValue(
// //           payload.aiWhatIfStarters,
// //           existingDraft.aiWhatIfStarters,
// //         ),
// //         aiWhatIfResultsCache: safeJsonValue(
// //           payload.aiWhatIfResultsCache,
// //           existingDraft.aiWhatIfResultsCache,
// //         ),
// //         // profileId is not updatable here, it's set on creation
// //       },
// //     });

// //     return NextResponse.json(
// //       {
// //         message: "Resume draft updated successfully!",
// //         id: updatedDraft.id,
// //         // You could return the updatedDraft object if the client needs it
// //         // draft: updatedDraft
// //       },
// //       { status: 200 },
// //     );
// //   } catch (error: any) {
// //     console.error(`Error updating resume draft ${draftId}:`, error);
// //     return NextResponse.json(
// //       {
// //         error: `Failed to update resume draft.`,
// //         details: error.message,
// //         stack: error.stack,
// //       },
// //       { status: 500 },
// //     );
// //   }
// // }

// // src/app/api/resume-drafts/[id]/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";
// import prisma from "@/lib/prisma";
// import { Prisma } from "@prisma/client";

// // --- ResumeDraftPayload Type ---
// interface ResumeDraftPayload {
//   title?: string;
//   wizardPersonalData?: Prisma.InputJsonValue;
//   wizardSummary?: string | null;
//   wizardSkills?: string[];
//   wizardWorkExperiences?: Prisma.InputJsonValue;
//   wizardEducations?: Prisma.InputJsonValue;
//   wizardVolunteering?: Prisma.InputJsonValue;
//   wizardCertifications?: Prisma.InputJsonValue;
//   wizardReferences?: Prisma.InputJsonValue;
//   aiCareerNarrative?: string | null;
//   aiGoldenThread?: string | null;
//   aiGoldenThreadEvidence?: Prisma.InputJsonValue;
//   aiKeyThemes?: Prisma.InputJsonValue;
//   aiHiddenGemsResultJson?: Prisma.InputJsonValue;
//   aiWeavingSuggestions?: Prisma.InputJsonValue;
//   aiWhatIfStarters?: Prisma.InputJsonValue;
//   aiWhatIfResultsCache?: Prisma.InputJsonValue;
// }

// export const runtime = "nodejs";

// // --- GET Handler: Fetch a specific ResumeDraft ---
// export async function GET(
//   req: NextRequest,
//   { params }: { params: { id: string } },
// ) {
//   const { userId: clerkUserId } = await auth();
//   const { id: draftId } = await params;

//   if (!clerkUserId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   if (!draftId) {
//     return NextResponse.json(
//       { error: "Draft ID is missing." },
//       { status: 400 },
//     );
//   }

//   try {
//     const draft = await prisma.resumeDraft.findUnique({
//       where: { id: draftId },
//       include: {
//         profile: {
//           select: { userId: true },
//         },
//       },
//     });

//     if (!draft) {
//       return NextResponse.json(
//         { error: "Resume draft not found." },
//         { status: 404 },
//       );
//     }

//     if (draft.profile.userId !== clerkUserId) {
//       return NextResponse.json(
//         { error: "Forbidden: You do not own this resume draft." },
//         { status: 403 },
//       );
//     }

//     // Exclude profile from the returned data
//     const { ...draftData } = draft;

//     return NextResponse.json({ draft: draftData }, { status: 200 });
//   } catch (error: unknown) {
//     console.error(`Error fetching resume draft ${draftId}:`, error);
//     return NextResponse.json(
//       {
//         error: `Failed to fetch resume draft.`,
//         details: error instanceof Error ? error.message : "Unknown error",
//       },
//       { status: 500 },
//     );
//   }
// }

// // --- PUT Handler: Update an existing ResumeDraft ---
// export async function PUT(
//   req: NextRequest,
//   { params }: { params: { id: string } },
// ) {
//   const { id: draftId } = params;
//   const { userId: clerkUserId } = await auth();

//   if (!clerkUserId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }
//   if (!draftId) {
//     return NextResponse.json(
//       { error: "Draft ID is missing." },
//       { status: 400 },
//     );
//   }

//   try {
//     const payload: ResumeDraftPayload = await req.json();

//     // Verify ownership of the draft
//     const existingDraft = await prisma.resumeDraft.findUnique({
//       where: { id: draftId },
//       include: {
//         profile: {
//           select: { userId: true },
//         },
//       },
//     });

//     if (!existingDraft) {
//       return NextResponse.json(
//         { error: "Resume draft not found to update." },
//         { status: 404 },
//       );
//     }

//     if (existingDraft.profile.userId !== clerkUserId) {
//       return NextResponse.json(
//         { error: "Forbidden: You do not own this resume draft to update." },
//         { status: 403 },
//       );
//     }

//     // Helper function for JSON fields
//     const safeJsonValue = (
//       newValue: Prisma.InputJsonValue | undefined,
//       existingValue: Prisma.JsonValue | undefined,
//     ): Prisma.InputJsonValue | undefined => {
//       if (newValue !== undefined) {
//         return newValue ? JSON.parse(JSON.stringify(newValue)) : undefined;
//       }
//       return existingValue !== undefined
//         ? JSON.parse(JSON.stringify(existingValue))
//         : undefined;
//     };

//     // Helper function for string fields
//     const safeStringValue = (
//       newValue: string | null | undefined,
//       existingValue: string | null,
//     ): string | null | undefined => {
//       return newValue !== undefined ? newValue : existingValue;
//     };

//     // Helper function for string array fields
//     const safeStringArrayValue = (
//       newValue: string[] | undefined,
//       existingValue: string[] | null,
//     ): string[] | undefined => {
//       return newValue !== undefined ? newValue : existingValue ?? undefined;
//     };

//     // Update the ResumeDraft
//     const updatedDraft = await prisma.resumeDraft.update({
//       where: { id: draftId },
//       data: {
//         title: payload.title ?? existingDraft.title,

//         wizardPersonalData: safeJsonValue(
//           payload.wizardPersonalData,
//           existingDraft.wizardPersonalData,
//         ),
//         wizardSummary: safeStringValue(
//           payload.wizardSummary,
//           existingDraft.wizardSummary,
//         ),
//         wizardSkills: safeStringArrayValue(
//           payload.wizardSkills,
//           existingDraft.wizardSkills,
//         ),
//         wizardWorkExperiences: safeJsonValue(
//           payload.wizardWorkExperiences,
//           existingDraft.wizardWorkExperiences,
//         ),
//         wizardEducations: safeJsonValue(
//           payload.wizardEducations,
//           existingDraft.wizardEducations,
//         ),
//         wizardVolunteering: safeJsonValue(
//           payload.wizardVolunteering,
//           existingDraft.wizardVolunteering,
//         ),
//         wizardCertifications: safeJsonValue(
//           payload.wizardCertifications,
//           existingDraft.wizardCertifications,
//         ),
//         wizardReferences: safeJsonValue(
//           payload.wizardReferences,
//           existingDraft.wizardReferences,
//         ),

//         aiCareerNarrative: safeStringValue(
//           payload.aiCareerNarrative,
//           existingDraft.aiCareerNarrative,
//         ),
//         aiGoldenThread: safeStringValue(
//           payload.aiGoldenThread,
//           existingDraft.aiGoldenThread,
//         ),
//         aiGoldenThreadEvidence: safeJsonValue(
//           payload.aiGoldenThreadEvidence,
//           existingDraft.aiGoldenThreadEvidence,
//         ),
//         aiKeyThemes: safeJsonValue(
//           payload.aiKeyThemes,
//           existingDraft.aiKeyThemes,
//         ),
//         aiHiddenGemsResultJson: safeJsonValue(
//           payload.aiHiddenGemsResultJson,
//           existingDraft.aiHiddenGemsResultJson,
//         ),
//         aiWeavingSuggestions: safeJsonValue(
//           payload.aiWeavingSuggestions,
//           existingDraft.aiWeavingSuggestions,
//         ),
//         aiWhatIfStarters: safeJsonValue(
//           payload.aiWhatIfStarters,
//           existingDraft.aiWhatIfStarters,
//         ),
//         aiWhatIfResultsCache: safeJsonValue(
//           payload.aiWhatIfResultsCache,
//           existingDraft.aiWhatIfResultsCache,
//         ),
//       },
//     });

//     return NextResponse.json(
//       {
//         message: "Resume draft updated successfully!",
//         id: updatedDraft.id,
//       },
//       { status: 200 },
//     );
//   } catch (error: unknown) {
//     console.error(`Error updating resume draft ${draftId}:`, error);
//     return NextResponse.json(
//       {
//         error: `Failed to update resume draft.`,
//         details: error instanceof Error ? error.message : "Unknown error",
//         stack: error instanceof Error ? error.stack : undefined,
//       },
//       { status: 500 },
//     );
//   }
// }

// src/app/api/resume-drafts/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// --- ResumeDraftPayload Type ---
interface ResumeDraftPayload {
  title?: string;
  wizardPersonalData?: Prisma.InputJsonValue;
  wizardSummary?: string | null;
  wizardSkills?: string[];
  wizardWorkExperiences?: Prisma.InputJsonValue;
  wizardEducations?: Prisma.InputJsonValue;
  wizardVolunteering?: Prisma.InputJsonValue;
  wizardCertifications?: Prisma.InputJsonValue;
  wizardReferences?: Prisma.InputJsonValue;
  aiCareerNarrative?: string | null;
  aiGoldenThread?: string | null;
  aiGoldenThreadEvidence?: Prisma.InputJsonValue;
  aiKeyThemes?: Prisma.InputJsonValue;
  aiHiddenGemsResultJson?: Prisma.InputJsonValue;
  aiWeavingSuggestions?: Prisma.InputJsonValue;
  aiWhatIfStarters?: Prisma.InputJsonValue;
  aiWhatIfResultsCache?: Prisma.InputJsonValue;
}

export const runtime = "nodejs";

// --- GET Handler: Fetch a specific ResumeDraft ---
export async function GET(req: NextRequest) {
  const { userId: clerkUserId } = await auth();
  const draftId = req.nextUrl.pathname.split("/").pop();

  if (!clerkUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!draftId) {
    return NextResponse.json(
      { error: "Draft ID is missing." },
      { status: 400 },
    );
  }

  try {
    const draft = await prisma.resumeDraft.findUnique({
      where: { id: draftId },
      include: {
        profile: {
          select: { userId: true },
        },
      },
    });

    if (!draft) {
      return NextResponse.json(
        { error: "Resume draft not found." },
        { status: 404 },
      );
    }

    if (draft.profile.userId !== clerkUserId) {
      return NextResponse.json(
        { error: "Forbidden: You do not own this resume draft." },
        { status: 403 },
      );
    }

    // Exclude profile from the returned data
    const { ...draftData } = draft;

    return NextResponse.json({ draft: draftData }, { status: 200 });
  } catch (error: unknown) {
    console.error(`Error fetching resume draft ${draftId}:`, error);
    return NextResponse.json(
      {
        error: `Failed to fetch resume draft.`,
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// --- PUT Handler: Update an existing ResumeDraft ---
export async function PUT(req: NextRequest) {
  const draftId = req.nextUrl.pathname.split("/").pop();
  const { userId: clerkUserId } = await auth();

  if (!clerkUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!draftId) {
    return NextResponse.json(
      { error: "Draft ID is missing." },
      { status: 400 },
    );
  }

  try {
    const payload: ResumeDraftPayload = await req.json();

    // Verify ownership of the draft
    const existingDraft = await prisma.resumeDraft.findUnique({
      where: { id: draftId },
      include: {
        profile: {
          select: { userId: true },
        },
      },
    });

    if (!existingDraft) {
      return NextResponse.json(
        { error: "Resume draft not found to update." },
        { status: 404 },
      );
    }

    if (existingDraft.profile.userId !== clerkUserId) {
      return NextResponse.json(
        { error: "Forbidden: You do not own this resume draft to update." },
        { status: 403 },
      );
    }

    // Helper function for JSON fields
    const safeJsonValue = (
      newValue: Prisma.InputJsonValue | undefined,
      existingValue: Prisma.JsonValue | undefined,
    ): Prisma.InputJsonValue | undefined => {
      if (newValue !== undefined) {
        return newValue ? JSON.parse(JSON.stringify(newValue)) : undefined;
      }
      return existingValue !== undefined
        ? JSON.parse(JSON.stringify(existingValue))
        : undefined;
    };

    // Helper function for string fields
    const safeStringValue = (
      newValue: string | null | undefined,
      existingValue: string | null,
    ): string | null | undefined => {
      return newValue !== undefined ? newValue : existingValue;
    };

    // Helper function for string array fields
    const safeStringArrayValue = (
      newValue: string[] | undefined,
      existingValue: string[] | null,
    ): string[] | undefined => {
      return newValue !== undefined ? newValue : (existingValue ?? undefined);
    };

    // Update the ResumeDraft
    const updatedDraft = await prisma.resumeDraft.update({
      where: { id: draftId },
      data: {
        title: payload.title ?? existingDraft.title,

        wizardPersonalData: safeJsonValue(
          payload.wizardPersonalData,
          existingDraft.wizardPersonalData,
        ),
        wizardSummary: safeStringValue(
          payload.wizardSummary,
          existingDraft.wizardSummary,
        ),
        wizardSkills: safeStringArrayValue(
          payload.wizardSkills,
          existingDraft.wizardSkills,
        ),
        wizardWorkExperiences: safeJsonValue(
          payload.wizardWorkExperiences,
          existingDraft.wizardWorkExperiences,
        ),
        wizardEducations: safeJsonValue(
          payload.wizardEducations,
          existingDraft.wizardEducations,
        ),
        wizardVolunteering: safeJsonValue(
          payload.wizardVolunteering,
          existingDraft.wizardVolunteering,
        ),
        wizardCertifications: safeJsonValue(
          payload.wizardCertifications,
          existingDraft.wizardCertifications,
        ),
        wizardReferences: safeJsonValue(
          payload.wizardReferences,
          existingDraft.wizardReferences,
        ),

        aiCareerNarrative: safeStringValue(
          payload.aiCareerNarrative,
          existingDraft.aiCareerNarrative,
        ),
        aiGoldenThread: safeStringValue(
          payload.aiGoldenThread,
          existingDraft.aiGoldenThread,
        ),
        aiGoldenThreadEvidence: safeJsonValue(
          payload.aiGoldenThreadEvidence,
          existingDraft.aiGoldenThreadEvidence,
        ),
        aiKeyThemes: safeJsonValue(
          payload.aiKeyThemes,
          existingDraft.aiKeyThemes,
        ),
        aiHiddenGemsResultJson: safeJsonValue(
          payload.aiHiddenGemsResultJson,
          existingDraft.aiHiddenGemsResultJson,
        ),
        aiWeavingSuggestions: safeJsonValue(
          payload.aiWeavingSuggestions,
          existingDraft.aiWeavingSuggestions,
        ),
        aiWhatIfStarters: safeJsonValue(
          payload.aiWhatIfStarters,
          existingDraft.aiWhatIfStarters,
        ),
        aiWhatIfResultsCache: safeJsonValue(
          payload.aiWhatIfResultsCache,
          existingDraft.aiWhatIfResultsCache,
        ),
      },
    });

    return NextResponse.json(
      {
        message: "Resume draft updated successfully!",
        id: updatedDraft.id,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error(`Error updating resume draft ${draftId}:`, error);
    return NextResponse.json(
      {
        error: `Failed to update resume draft.`,
        details: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 },
    );
  }
}
