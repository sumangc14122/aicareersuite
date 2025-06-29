// src/app/api/resume-drafts/types.ts

// Import necessary types from your components, as they are part of the payload
import { ResumeJSON } from "@/components/ATSScore";

import {
  WhatIfResult,
  HiddenGemsResult,
  GoldenThreadEvidence,
  WeavingSuggestion,
} from "@/components/NarrativeWeaver"; // Assuming these are exported from NarrativeWeaver.tsx

// Define the shape of the data that comes from the client for ResumeDraft operations
export interface ResumeDraftPayload {
  title?: string; // Optional, as it might default on client

  // Data from ResumeJSON structure
  wizardPersonalData?: ResumeJSON["personal"];
  wizardSummary?: string;
  wizardSkills?: string[];
  wizardWorkExperiences?: ResumeJSON["workExperiences"];
  wizardEducations?: ResumeJSON["educations"];
  wizardVolunteering?: ResumeJSON["volunteering"];
  wizardCertifications?: ResumeJSON["certifications"];
  wizardReferences?: ResumeJSON["references"];

  // AI Generated Narrative Suite Data
  aiCareerNarrative?: string;
  aiGoldenThread?: string;
  aiGoldenThreadEvidence?: GoldenThreadEvidence[]; // Ensure this matches Prisma's Json[]
  aiKeyThemes?: Array<{ theme: string; evidence: string }>; // Ensure this matches Prisma's Json[]
  aiHiddenGemsResultJson?: HiddenGemsResult; // Full object, matches Prisma's Json
  aiWeavingSuggestions?: WeavingSuggestion[]; // Matches Prisma's Json[]
  aiWhatIfStarters?: string[]; // Matches Prisma's Json[]
  aiWhatIfResultsCache?: Array<{ scenarioText: string; result: WhatIfResult }>; // Matches Prisma's Json[]
}
