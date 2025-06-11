// // // // src/app/api/resume-drafts/route.ts
// // // import { NextRequest, NextResponse } from 'next/server';
// // // import { auth } from '@clerk/nextjs/server';
// // // import prisma from '@/lib/prisma'; // Your Prisma client
// // // import { ResumeDraftPayload } from './type'; // Import the new payload interface
// // // import type Prisma from '@prisma/client';

// // // export const runtime = 'nodejs';

// // // export async function POST(req: NextRequest) {
// // //   // Get the authenticated user's ID
// // //   const { userId: clerkUserId } = await auth(); // Destructure userId and rename to clerkUserId

// // //   if (!clerkUserId) {
// // //     return NextResponse.json({ error: 'Unauthorized: User not authenticated.' }, { status: 401 });
// // //   }

// // //   try {
// // //     const payload: ResumeDraftPayload = await req.json();

// // //     // Find or create the user's profile
// // //     // Ensure that `userId` in `where` clause is a string
// // //     let profile = await prisma.profile.findUnique({
// // //       where: { userId: clerkUserId },
// // //     });

// // //     if (!profile) {
// // //       // If no profile exists for this user, create one.
// // //       // This is a common pattern, but adjust 'name' and other defaults as per your Profile model requirements.
// // //       console.warn(`Profile not found for userId: ${clerkUserId}. Creating a default profile.`);
// // //       profile = await prisma.profile.create({
// // //         data: {
// // //           userId: clerkUserId,
// // //           name: payload.wizardPersonalData?.fullName || `User ${clerkUserId.substring(0, 8)}`, // Default name
// // //           // Add any other mandatory fields for Profile here with sensible defaults
// // //         },
// // //       });
// // //     }

// // //     // Create the new ResumeDraft
// // //     const newDraft = await prisma.resumeDraft.create({
// // //       data: {
// // //         profileId: profile.id, // Link to the user's profile
// // //         title: payload.title || `${payload.wizardPersonalData?.fullName || 'Untitled'} Resume Draft`,

// // //         // Data from wizard (stored as JSON or direct types)
// // //         // Ensure values are `undefined` if optional and not provided, so Prisma doesn't try to save `null` if the column doesn't allow it.
// // //         // Prisma handles `Json` fields gracefully for `undefined` if the column is optional.
// // //         wizardPersonalData: payload.wizardPersonalData || undefined,
// // //         wizardSummary: payload.wizardSummary || undefined,
// // //         wizardSkills: payload.wizardSkills || [], // Ensure empty array if null/undefined
// // //         wizardWorkExperiences: payload.wizardWorkExperiences || undefined,
// // //         wizardEducations: payload.wizardEducations || undefined,
// // //         wizardVolunteering: payload.wizardVolunteering || undefined,
// // //         wizardCertifications: payload.wizardCertifications || undefined,
// // //         wizardReferences: payload.wizardReferences || undefined,

// // //         // AI Generated Narrative Suite Data (stored as JSON)
// // //         aiCareerNarrative: payload.aiCareerNarrative || undefined,
// // //         aiGoldenThread: payload.aiGoldenThread || undefined,
// // //         aiGoldenThreadEvidence: payload.aiGoldenThreadEvidence || undefined,
// // //         aiKeyThemes: payload.aiKeyThemes || undefined,
// // //         aiHiddenGemsResultJson: payload.aiHiddenGemsResultJson || undefined,
// // //         aiWeavingSuggestions: payload.aiWeavingSuggestions || undefined,
// // //         aiWhatIfStarters: payload.aiWhatIfStarters || undefined,
// // //         // aiWhatIfResultsCache: payload.aiWhatIfResultsCache || undefined,

// // //         aiWhatIfResultsCache: payload.aiWhatIfResultsCache
// // //         ? (payload.aiWhatIfResultsCache as Prisma.InputJsonValue)
// // //         : undefined,
// // //       },
// // //     });

// // //     return NextResponse.json({
// // //       message: 'Resume draft created successfully!',
// // //       id: newDraft.id, // Return the new draft's ID
// // //     }, { status: 201 });

// // //   } catch (error: any) {
// // //     console.error('Error creating resume draft:', error);
// // //     return NextResponse.json(
// // //       { error: 'Failed to create resume draft.', details: error.message },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }

// // // src/app/api/resume-drafts/route.ts
// // import { NextRequest, NextResponse } from "next/server";
// // import { auth } from "@clerk/nextjs/server";
// // import prisma from "@/lib/prisma"; // Your Prisma client
// // import { ResumeDraftPayload } from "./type"; // Import the new payload interface

// // import Prisma from "@prisma/client";

// // type JsonValue =
// //   | string
// //   | number
// //   | boolean
// //   | null
// //   | { [key: string]: JsonValue }
// //   | JsonValue[];

// // export const runtime = "nodejs";

// // export async function POST(req: NextRequest) {
// //   // Get the authenticated user's ID
// //   const { userId: clerkUserId } = await auth(); // Destructure userId and rename to clerkUserId

// //   if (!clerkUserId) {
// //     return NextResponse.json(
// //       { error: "Unauthorized: User not authenticated." },
// //       { status: 401 },
// //     );
// //   }

// //   try {
// //     const payload: ResumeDraftPayload = await req.json();

// //     // Find or create the user's profile
// //     // Ensure that `userId` in `where` clause is a string
// //     let profile = await prisma.profile.findUnique({
// //       where: { userId: clerkUserId },
// //     });

// //     if (!profile) {
// //       // If no profile exists for this user, create one.
// //       // This is a common pattern, but adjust 'name' and other defaults as per your Profile model requirements.
// //       console.warn(
// //         `Profile not found for userId: ${clerkUserId}. Creating a default profile.`,
// //       );
// //       profile = await prisma.profile.create({
// //         data: {
// //           userId: clerkUserId,
// //           name:
// //             payload.wizardPersonalData?.fullName ||
// //             `User ${clerkUserId.substring(0, 8)}`, // Default name
// //           // Add any other mandatory fields for Profile here with sensible defaults
// //         },
// //       });
// //     }

// //     // Helper function to safely serialize JSON values
// //     // const safeJsonValue = (value: any) => {
// //     //   return value ? JSON.parse(JSON.stringify(value)) : undefined;
// //     // };

// //     const safeJsonValue = (value: JsonValue | undefined): JsonValue | undefined => {
// //       return value !== undefined ? JSON.parse(JSON.stringify(value)) : undefined;
// //     };

// //     // Create the new ResumeDraft
// //     const newDraft = await prisma.resumeDraft.create({
// //       data: {
// //         profileId: profile.id, // Link to the user's profile
// //         title:
// //           payload.title ||
// //           `${payload.wizardPersonalData?.fullName || "Untitled"} Resume Draft`,

// //         // Data from wizard (stored as JSON or direct types)
// //         // Apply JSON serialization to all complex types for Prisma compatibility
// //         wizardPersonalData: safeJsonValue(payload.wizardPersonalData),
// //         wizardSummary: safeJsonValue(payload.wizardSummary),
// //         wizardSkills: payload.wizardSkills
// //           ? JSON.parse(JSON.stringify(payload.wizardSkills))
// //           : [], // Ensure empty array if null/undefined
// //         wizardWorkExperiences: safeJsonValue(payload.wizardWorkExperiences),
// //         wizardEducations: safeJsonValue(payload.wizardEducations),
// //         wizardVolunteering: safeJsonValue(payload.wizardVolunteering),
// //         wizardCertifications: safeJsonValue(payload.wizardCertifications),
// //         wizardReferences: safeJsonValue(payload.wizardReferences),

// //         // AI Generated Narrative Suite Data (stored as JSON)
// //         aiCareerNarrative: safeJsonValue(payload.aiCareerNarrative),
// //         aiGoldenThread: safeJsonValue(payload.aiGoldenThread),
// //         aiGoldenThreadEvidence: safeJsonValue(payload.aiGoldenThreadEvidence),
// //         aiKeyThemes: safeJsonValue(payload.aiKeyThemes),
// //         aiHiddenGemsResultJson: safeJsonValue(payload.aiHiddenGemsResultJson),
// //         aiWeavingSuggestions: safeJsonValue(payload.aiWeavingSuggestions),
// //         aiWhatIfStarters: safeJsonValue(payload.aiWhatIfStarters),
// //         aiWhatIfResultsCache: safeJsonValue(payload.aiWhatIfResultsCache),
// //       },
// //     });

// //     return NextResponse.json(
// //       {
// //         message: "Resume draft created successfully!",
// //         id: newDraft.id, // Return the new draft's ID
// //       },
// //       { status: 201 },
// //     );
// //   } catch (error: unknown) {
// //     console.error("Error creating resume draft:", error);
// //     return NextResponse.json(
// //       {
// //         error: "Failed to create resume draft.",
// //         details: error instanceof Error ? error.message : "Unknown error",
// //       },
// //       { status: 500 },
// //     );
// //   }
// // }

// // src/app/api/resume-drafts/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";
// import prisma from "@/lib/prisma";
// import { z } from "zod";

// // --- Custom JSON Types ---
// type InputJsonValue =
//   | string
//   | number
//   | boolean
//   | { [key: string]: InputJsonValue }
//   | InputJsonValue[];

// // --- ResumeDraftPayload Type ---
// interface ResumeDraftPayload {
//   title?: string;
//   wizardPersonalData?: InputJsonValue | null;
//   wizardSummary?: string | null;
//   wizardSkills?: string[] | null;
//   wizardWorkExperiences?: InputJsonValue | null;
//   wizardEducations?: InputJsonValue | null;
//   wizardVolunteering?: InputJsonValue | null;
//   wizardCertifications?: InputJsonValue | null;
//   wizardReferences?: InputJsonValue | null;
//   aiCareerNarrative?: string | null;
//   aiGoldenThread?: string | null;
//   aiGoldenThreadEvidence?: InputJsonValue | null;
//   aiKeyThemes?: InputJsonValue | null;
//   aiHiddenGemsResultJson?: InputJsonValue | null;
//   aiWeavingSuggestions?: InputJsonValue | null;
//   aiWhatIfStarters?: InputJsonValue | null;
//   aiWhatIfResultsCache?: InputJsonValue | null;
// }

// // --- Zod Schema for Validation ---
// const JsonValueSchema: z.ZodType<InputJsonValue> = z.union([
//   z.string(),
//   z.number(),
//   z.boolean(),
//   z.record(z.lazy(() => JsonValueSchema)),
//   z.array(z.lazy(() => JsonValueSchema)),
// ]);

// const ResumeDraftPayloadSchema = z.object({
//   title: z.string().optional(),
//   wizardPersonalData: JsonValueSchema.nullable().optional(),
//   wizardSummary: z.string().nullable().optional(),
//   wizardSkills: z.array(z.string()).nullable().optional(),
//   wizardWorkExperiences: JsonValueSchema.nullable().optional(),
//   wizardEducations: JsonValueSchema.nullable().optional(),
//   wizardVolunteering: JsonValueSchema.nullable().optional(),
//   wizardCertifications: JsonValueSchema.nullable().optional(),
//   wizardReferences: JsonValueSchema.nullable().optional(),
//   aiCareerNarrative: z.string().nullable().optional(),
//   aiGoldenThread: z.string().nullable().optional(),
//   aiGoldenThreadEvidence: JsonValueSchema.nullable().optional(),
//   aiKeyThemes: JsonValueSchema.nullable().optional(),
//   aiHiddenGemsResultJson: JsonValueSchema.nullable().optional(),
//   aiWeavingSuggestions: JsonValueSchema.nullable().optional(),
//   aiWhatIfStarters: JsonValueSchema.nullable().optional(),
//   aiWhatIfResultsCache: JsonValueSchema.nullable().optional(),
// });

// export const runtime = "nodejs";

// export async function POST(req: NextRequest) {
//   const { userId: clerkUserId } = await auth();

//   if (!clerkUserId) {
//     return NextResponse.json(
//       { error: "Unauthorized: User not authenticated." },
//       { status: 401 },
//     );
//   }

//   try {
//     const payload = ResumeDraftPayloadSchema.parse(
//       await req.json(),
//     ) as ResumeDraftPayload;

//     // Find or create the user's profile
//     let profile = await prisma.profile.findUnique({
//       where: { userId: clerkUserId },
//     });

//     if (!profile) {
//       console.warn(
//         `Profile not found for userId: ${clerkUserId}. Creating a default profile.`,
//       );
//       profile = await prisma.profile.create({
//         data: {
//           userId: clerkUserId,
//           name:
//             (payload.wizardPersonalData as { fullName?: string } | null)
//               ?.fullName || `User-${clerkUserId.substring(0, 8)}`,
//         },
//       });
//     }

//     // Helper function for JSON fields
//     const safeJsonValue = (
//       value: InputJsonValue | null | undefined,
//     ): InputJsonValue | null | undefined => {
//       if (value === null) return null;
//       return value !== undefined
//         ? JSON.parse(JSON.stringify(value))
//         : undefined;
//     };

//     // Helper function for string fields
//     const safeStringValue = (
//       value: string | null | undefined,
//     ): string | null | undefined => {
//       return value;
//     };

//     // Helper function for string array fields
//     const safeStringArrayValue = (
//       value: string[] | null | undefined,
//     ): string[] => {
//       return value ?? [];
//     };

//     // Create the new ResumeDraft
//     const newDraft = await prisma.resumeDraft.create({
//       data: {
//         profileId: profile.id,
//         title:
//           payload.title ||
//           `${
//             (payload.wizardPersonalData as { fullName?: string } | null)
//               ?.fullName || "Untitled"
//           } Resume Draft`,

//         wizardPersonalData: safeJsonValue(payload.wizardPersonalData) as any,
//         wizardSummary: safeStringValue(payload.wizardSummary),
//         wizardSkills: safeStringArrayValue(payload.wizardSkills),
//         wizardWorkExperiences: safeJsonValue(
//           payload.wizardWorkExperiences,
//         ) as any,
//         wizardEducations: safeJsonValue(payload.wizardEducations) as any,
//         wizardVolunteering: safeJsonValue(payload.wizardVolunteering) as any,
//         wizardCertifications: safeJsonValue(
//           payload.wizardCertifications,
//         ) as any,
//         wizardReferences: safeJsonValue(payload.wizardReferences) as any,

//         aiCareerNarrative: safeStringValue(payload.aiCareerNarrative),
//         aiGoldenThread: safeStringValue(payload.aiGoldenThread),
//         aiGoldenThreadEvidence: safeJsonValue(
//           payload.aiGoldenThreadEvidence,
//         ) as any,
//         aiKeyThemes: safeJsonValue(payload.aiKeyThemes) as any,
//         aiHiddenGemsResultJson: safeJsonValue(
//           payload.aiHiddenGemsResultJson,
//         ) as any,
//         aiWeavingSuggestions: safeJsonValue(
//           payload.aiWeavingSuggestions,
//         ) as any,
//         aiWhatIfStarters: safeJsonValue(payload.aiWhatIfStarters) as any,
//         aiWhatIfResultsCache: safeJsonValue(
//           payload.aiWhatIfResultsCache,
//         ) as any,
//       },
//     });

//     return NextResponse.json(
//       {
//         message: "Resume draft created successfully!",
//         id: newDraft.id,
//       },
//       { status: 201 },
//     );
//   } catch (error: unknown) {
//     console.error("Error creating resume draft:", error);
//     return NextResponse.json(
//       {
//         error: "Failed to create resume draft.",
//         details: error instanceof Error ? error.message : "Unknown error",
//       },
//       { status: 500 },
//     );
//   }
// }

// // // src/app/api/resume-drafts/route.ts
// // import { NextRequest, NextResponse } from "next/server";
// // import { auth } from "@clerk/nextjs/server";
// // import prisma from "@/lib/prisma";
// // import { z } from "zod";
// // import { Prisma } from "@prisma/client";

// // // --- Custom JSON Types ---
// // type InputJsonValue =
// //   | string
// //   | number
// //   | boolean
// //   | { [key: string]: InputJsonValue }
// //   | InputJsonValue[];

// // // --- ResumeDraftPayload Type ---
// // interface ResumeDraftPayload {
// //   title?: string;
// //   wizardPersonalData?: InputJsonValue | null;
// //   wizardSummary?: string | null;
// //   wizardSkills?: string[] | null;
// //   wizardWorkExperiences?: InputJsonValue | null;
// //   wizardEducations?: InputJsonValue | null;
// //   wizardVolunteering?: InputJsonValue | null;
// //   wizardCertifications?: InputJsonValue | null;
// //   wizardReferences?: InputJsonValue | null;
// //   aiCareerNarrative?: string | null;
// //   aiGoldenThread?: string | null;
// //   aiGoldenThreadEvidence?: InputJsonValue | null;
// //   aiKeyThemes?: InputJsonValue | null;
// //   aiHiddenGemsResultJson?: InputJsonValue | null;
// //   aiWeavingSuggestions?: InputJsonValue | null;
// //   aiWhatIfStarters?: InputJsonValue | null;
// //   aiWhatIfResultsCache?: InputJsonValue | null;
// // }

// // // --- Zod Schema for Validation ---
// // const JsonValueSchema: z.ZodType<InputJsonValue> = z.union([
// //   z.string(),
// //   z.number(),
// //   z.boolean(),
// //   z.record(z.lazy(() => JsonValueSchema)),
// //   z.array(z.lazy(() => JsonValueSchema)),
// // ]);

// // const ResumeDraftPayloadSchema = z.object({
// //   title: z.string().optional(),
// //   wizardPersonalData: JsonValueSchema.nullable().optional(),
// //   wizardSummary: z.string().nullable().optional(),
// //   wizardSkills: z.array(z.string()).nullable().optional(),
// //   wizardWorkExperiences: JsonValueSchema.nullable().optional(),
// //   wizardEducations: JsonValueSchema.nullable().optional(),
// //   wizardVolunteering: JsonValueSchema.nullable().optional(),
// //   wizardCertifications: JsonValueSchema.nullable().optional(),
// //   wizardReferences: JsonValueSchema.nullable().optional(),
// //   aiCareerNarrative: z.string().nullable().optional(),
// //   aiGoldenThread: z.string().nullable().optional(),
// //   aiGoldenThreadEvidence: JsonValueSchema.nullable().optional(),
// //   aiKeyThemes: JsonValueSchema.nullable().optional(),
// //   aiHiddenGemsResultJson: JsonValueSchema.nullable().optional(),
// //   aiWeavingSuggestions: JsonValueSchema.nullable().optional(),
// //   aiWhatIfStarters: JsonValueSchema.nullable().optional(),
// //   aiWhatIfResultsCache: JsonValueSchema.nullable().optional(),
// // });

// // export const runtime = "nodejs";

// // export async function POST(req: NextRequest) {
// //   const { userId: clerkUserId } = await auth();

// //   if (!clerkUserId) {
// //     return NextResponse.json(
// //       { error: "Unauthorized: User not authenticated." },
// //       { status: 401 },
// //     );
// //   }

// //   try {
// //     const payload = ResumeDraftPayloadSchema.parse(await req.json()) as ResumeDraftPayload;

// //     // Find or create the user's profile
// //     let profile = await prisma.profile.findUnique({
// //       where: { userId: clerkUserId },
// //     });

// //     if (!profile) {
// //       console.warn(
// //         `Profile not found for userId: ${clerkUserId}. Creating a default profile.`,
// //       );
// //       profile = await prisma.profile.create({
// //         data: {
// //           userId: clerkUserId,
// //           name:
// //             (payload.wizardPersonalData as { fullName?: string } | null)?.fullName ||
// //             `User-${clerkUserId.substring(0, 8)}`,
// //         },
// //       });
// //     }

// //     // Helper function for JSON fields
// //     // const safeJsonValue = (
// //     //   value: InputJsonValue | null | undefined,
// //     // ): Prisma.InputJsonValue | null | undefined => {
// //     //   if (value === null) return null;
// //     //   return value !== undefined ? JSON.parse(JSON.stringify(value)) : undefined;
// //     // };

// //     const safeJsonValue = (
// //       value: InputJsonValue | null | undefined,
// //     ): Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput | undefined => {
// //       if (value === null) return Prisma.JsonNull;
// //       return value !== undefined ? JSON.parse(JSON.stringify(value)) : undefined;
// //     };

// //     // Helper function for string fields
// //     const safeStringValue = (
// //       value: string | null | undefined,
// //     ): string | null | undefined => {
// //       return value;
// //     };

// //     // Helper function for string array fields
// //     const safeStringArrayValue = (
// //       value: string[] | null | undefined,
// //     ): string[] => {
// //       return value ?? [];
// //     };

// //     // Create the new ResumeDraft
// //     const newDraft = await prisma.resumeDraft.create({
// //       data: {
// //         profileId: profile.id,
// //         title:
// //           payload.title ||
// //           `${
// //             (payload.wizardPersonalData as { fullName?: string } | null)?.fullName ||
// //             "Untitled"
// //           } Resume Draft`,

// //         wizardPersonalData: safeJsonValue(payload.wizardPersonalData),
// //         wizardSummary: safeStringValue(payload.wizardSummary),
// //         wizardSkills: safeStringArrayValue(payload.wizardSkills),
// //         wizardWorkExperiences: safeJsonValue(payload.wizardWorkExperiences),
// //         wizardEducations: safeJsonValue(payload.wizardEducations),
// //         wizardVolunteering: safeJsonValue(payload.wizardVolunteering),
// //         wizardCertifications: safeJsonValue(payload.wizardCertifications),
// //         wizardReferences: safeJsonValue(payload.wizardReferences),

// //         aiCareerNarrative: safeStringValue(payload.aiCareerNarrative),
// //         aiGoldenThread: safeStringValue(payload.aiGoldenThread),
// //         aiGoldenThreadEvidence: safeJsonValue(payload.aiGoldenThreadEvidence),
// //         aiKeyThemes: safeJsonValue(payload.aiKeyThemes),
// //         aiHiddenGemsResultJson: safeJsonValue(payload.aiHiddenGemsResultJson),
// //         aiWeavingSuggestions: safeJsonValue(payload.aiWeavingSuggestions),
// //         aiWhatIfStarters: safeJsonValue(payload.aiWhatIfStarters),
// //         aiWhatIfResultsCache: safeJsonValue(payload.aiWhatIfResultsCache),
// //       },
// //     });

// //     return NextResponse.json(
// //       {
// //         message: "Resume draft created successfully!",
// //         id: newDraft.id,
// //       },
// //       { status: 201 },
// //     );
// //   } catch (error: unknown) {
// //     console.error("Error creating resume draft:", error);
// //     return NextResponse.json(
// //       {
// //         error: "Failed to create resume draft.",
// //         details: error instanceof Error ? error.message : "Unknown error",
// //       },
// //       { status: 500 },
// //     );
// //   }
// // }

// src/app/api/resume-drafts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { Prisma } from "@prisma/client";

// --- Custom JSON Types ---
type InputJsonValue =
  | string
  | number
  | boolean
  | { [key: string]: InputJsonValue }
  | InputJsonValue[];

// --- ResumeDraftPayload Type ---
interface ResumeDraftPayload {
  title?: string;
  wizardPersonalData?: InputJsonValue | null;
  wizardSummary?: string | null;
  wizardSkills?: string[] | null;
  wizardWorkExperiences?: InputJsonValue | null;
  wizardEducations?: InputJsonValue | null;
  wizardVolunteering?: InputJsonValue | null;
  wizardCertifications?: InputJsonValue | null;
  wizardReferences?: InputJsonValue | null;
  aiCareerNarrative?: string | null;
  aiGoldenThread?: string | null;
  aiGoldenThreadEvidence?: InputJsonValue | null;
  aiKeyThemes?: InputJsonValue | null;
  aiHiddenGemsResultJson?: InputJsonValue | null;
  aiWeavingSuggestions?: InputJsonValue | null;
  aiWhatIfStarters?: InputJsonValue | null;
  aiWhatIfResultsCache?: InputJsonValue | null;
}

// --- Zod Schema for Validation ---
const JsonValueSchema: z.ZodType<InputJsonValue> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.record(z.lazy(() => JsonValueSchema)),
  z.array(z.lazy(() => JsonValueSchema)),
]);

const ResumeDraftPayloadSchema = z.object({
  title: z.string().optional(),
  wizardPersonalData: JsonValueSchema.nullable().optional(),
  wizardSummary: z.string().nullable().optional(),
  wizardSkills: z.array(z.string()).nullable().optional(),
  wizardWorkExperiences: JsonValueSchema.nullable().optional(),
  wizardEducations: JsonValueSchema.nullable().optional(),
  wizardVolunteering: JsonValueSchema.nullable().optional(),
  wizardCertifications: JsonValueSchema.nullable().optional(),
  wizardReferences: JsonValueSchema.nullable().optional(),
  aiCareerNarrative: z.string().nullable().optional(),
  aiGoldenThread: z.string().nullable().optional(),
  aiGoldenThreadEvidence: JsonValueSchema.nullable().optional(),
  aiKeyThemes: JsonValueSchema.nullable().optional(),
  aiHiddenGemsResultJson: JsonValueSchema.nullable().optional(),
  aiWeavingSuggestions: JsonValueSchema.nullable().optional(),
  aiWhatIfStarters: JsonValueSchema.nullable().optional(),
  aiWhatIfResultsCache: JsonValueSchema.nullable().optional(),
});

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) {
    return NextResponse.json(
      { error: "Unauthorized: User not authenticated." },
      { status: 401 },
    );
  }

  try {
    const payload = ResumeDraftPayloadSchema.parse(
      await req.json(),
    ) as ResumeDraftPayload;

    // Find or create the user's profile
    let profile = await prisma.profile.findUnique({
      where: { userId: clerkUserId },
    });
    if (!profile) {
      console.warn(
        `Profile not found for userId: ${clerkUserId}. Creating a default profile.`,
      );
      profile = await prisma.profile.create({
        data: {
          userId: clerkUserId,
          name:
            (payload.wizardPersonalData as { fullName?: string } | null)
              ?.fullName || `User-${clerkUserId.substring(0, 8)}`,
        },
      });
    }

    // Helper for JSON fields, typed for Prisma
    // const safeJsonValue = (
    //   value: InputJsonValue | null | undefined
    // ): Prisma.InputJsonValue | Prisma.JsonNull | undefined => {
    //   if (value === null) return Prisma.JsonNull;
    //   if (value === undefined) return undefined;
    //   return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
    // };

    const safeJsonValue = (
      value: InputJsonValue | null | undefined,
    ): Prisma.InputJsonValue | typeof Prisma.JsonNull | undefined => {
      if (value === null) return Prisma.JsonNull;
      if (value === undefined) return undefined;
      return JSON.parse(JSON.stringify(value));
    };

    // Helpers for strings/arrays
    const safeStringValue = (
      value: string | null | undefined,
    ): string | null | undefined => value;
    const safeStringArrayValue = (
      value: string[] | null | undefined,
    ): string[] => value ?? [];

    // Create the new ResumeDraft
    const newDraft = await prisma.resumeDraft.create({
      data: {
        profileId: profile.id,
        title:
          payload.title ||
          `${
            (payload.wizardPersonalData as { fullName?: string } | null)
              ?.fullName || "Untitled"
          } Resume Draft`,

        wizardPersonalData: safeJsonValue(payload.wizardPersonalData),
        wizardSummary: safeStringValue(payload.wizardSummary),
        wizardSkills: safeStringArrayValue(payload.wizardSkills),
        wizardWorkExperiences: safeJsonValue(payload.wizardWorkExperiences),
        wizardEducations: safeJsonValue(payload.wizardEducations),
        wizardVolunteering: safeJsonValue(payload.wizardVolunteering),
        wizardCertifications: safeJsonValue(payload.wizardCertifications),
        wizardReferences: safeJsonValue(payload.wizardReferences),

        aiCareerNarrative: safeStringValue(payload.aiCareerNarrative),
        aiGoldenThread: safeStringValue(payload.aiGoldenThread),
        aiGoldenThreadEvidence: safeJsonValue(payload.aiGoldenThreadEvidence),
        aiKeyThemes: safeJsonValue(payload.aiKeyThemes),
        aiHiddenGemsResultJson: safeJsonValue(payload.aiHiddenGemsResultJson),
        aiWeavingSuggestions: safeJsonValue(payload.aiWeavingSuggestions),
        aiWhatIfStarters: safeJsonValue(payload.aiWhatIfStarters),
        aiWhatIfResultsCache: safeJsonValue(payload.aiWhatIfResultsCache),
      },
    });

    return NextResponse.json(
      {
        message: "Resume draft created successfully!",
        id: newDraft.id,
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error("Error creating resume draft:", error);
    return NextResponse.json(
      {
        error: "Failed to create resume draft.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
