"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { ATSScore, ResumeJSON, ATSResult } from "@/components/ATSScore";
import { BulletArena } from "@/components/BulletArena";
import GenericTemplate, { TemplateID } from "@/components/GenericTemplate";
import TemplateCarousel from "@/components/TemplateCarousel";
import NarrativeWeaver, {
  InitialNarrativeResult,
  WhatIfResult,
  HiddenGemsResult,
} from "@/components/NarrativeWeaver";
import { useRouter } from "next/navigation";

// function escapeRegExp(s: string) {
//   return s.replace(/[\.*+?^${}()|[\]\\]/g, "\\$&");
// }

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightInjected(
  text: string | undefined,
  keywords: string[],
): React.ReactNode[] {
  if (!text) return [""];
  if (!keywords.length) return [text];
  const pattern = keywords.map(escapeRegExp).join("|");
  const re = new RegExp(`\\b(${pattern})\\b`, "gi");
  const parts = text.split(re);
  return parts.map((chunk, i) =>
    keywords.some((kw) => kw.toLowerCase() === chunk.toLowerCase()) ? (
      <mark
        key={i}
        className="rounded bg-yellow-300 px-1 py-0.5 text-yellow-800 shadow-sm"
      >
        {chunk}
      </mark>
    ) : (
      chunk
    ),
  );
}

// // Debounce utility
// function debounce<T extends (...args: any[]) => void>(
//   func: T,
//   wait: number,
// ): (...args: Parameters<T>) => void {
//   let timeout: NodeJS.Timeout;
//   return (...args: Parameters<T>) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func(...args), wait);
//   };
// }

// Debounce utility
// function debounce<T extends (...args: Args) => void, Args extends any[]>(
//   func: T,
//   wait: number,
// ): (...args: Parameters<T>) => void {
//   let timeout: NodeJS.Timeout;
//   return (...args: Parameters<T>) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func(...args), wait);
//   };
// }

// function debounce<T extends (...args: Args) => void, Args extends unknown[]>(
//   func: T,
//   wait: number,
// ): (...args: Parameters<T>) => void {
//   let timeout: NodeJS.Timeout;
//   return (...args: Parameters<T>) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func(...args), wait);
//   };
// }

// More specific debounce for a function with one argument of a specific type
function debounce<ArgType, F extends (arg: ArgType) => void>(
  func: F,
  wait: number,
): (arg: ArgType) => void {
  let timeout: NodeJS.Timeout;
  return (arg: ArgType) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(arg), wait);
  };
}

// --- INTERFACES ---
interface LivingPortfolioSettings {
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
  selectedPublicWhatIfs: Array<{
    scenarioText: string;
    adaptedResult: WhatIfResult;
  }>;
  showcaseSections: Array<{
    title: string;
    items: Array<{
      name: string;
      description: string;
      link?: string;
      skillsUsed?: string[];
    }>;
  }>;
}

// Main Component
export default function ResumeWizard() {
  const [step, setStep] = useState(0);
  const [resume, setResume] = useState<Partial<ResumeJSON>>({
    personal: {
      fullName: "",
      email: "",
      phone: "",
      city: "",
      country: "",
      linkedinUrl: "",
      jobTitle: "",
    },
    summary: "",
    skills: [],
    workExperiences: [],
    educations: [],
    // volunteering: [{ role: "Community Organizer", organization: "Local Charity Network", startDate: "Jan 2021", endDate: "Present", bullets: ["Organized monthly events for community engagement, increasing participation by 50%.", "Managed volunteer schedules and communications for a team of 15+ volunteers."]}],

    certifications: [],
    references: [],
  });

  const { user, isLoaded } = useUser();
  const router = useRouter(); // For navigation
  const [showNarrativeWeaver, setShowNarrativeWeaver] = useState(false); // To toggle the new UI
  const [mode, setMode] = useState<"text" | "file" | "linkedin">("text");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [htmlSnippet, setHtmlSnippet] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [jobDesc, setJobDesc] = useState("");
  const [loading, setLoading] = useState(false); // General loading
  const [draftSaving, setDraftSaving] = useState(false); // Specific for draft saving
  const [pdfGenerating, setPdfGenerating] = useState(false); // Specific for PDF
  const [atsData, setAtsData] = useState<ATSResult | null>(null);
  const [runKey, setRunKey] = useState(0);
  const [injectLevel, setInjectLevel] = useState(1);
  const [injecting, setInjecting] = useState(false);
  const [injectSummary, setInjectSummary] = useState(true);
  const [injectSkills, setInjectSkills] = useState(true);
  const [injectedKeywordsList, setInjectedKeywordsList] = useState<string[]>(
    [],
  );
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [resumeDraftId, setResumeDraftId] = useState<string | null>(null); // NEW: State to hold the current ResumeDraft ID
  const [linkedinError, setLinkedinError] = useState<string | null>(null);

  // const [setPortfolioPublishedInfo] = useState<{
  //   message: string;
  //   url: string;
  //   id: string;
  //   slug?: string | null; // Add slug here
  // } | null>(null);

  // State for collapsible sections
  const [manualOpen, setManualOpen] = useState(false);
  const [summaryDraft, setSummaryDraft] = useState("");
  const [skillsDraft, setSkillsDraft] = useState("");
  const [expOpen, setExpOpen] = useState(false);
  const [eduOpen, setEduOpen] = useState(false);
  const [volOpen, setVolOpen] = useState(false);
  const [certOpen, setCertOpen] = useState(false);
  const [refOpen, setRefOpen] = useState(false);

  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateID>("modern-minimal"); // Changed default for testing

  // Ref for GenericTemplate
  const templateRef = useRef<HTMLDivElement>(null);

  // For step transition animation
  const [currentStepKey, setCurrentStepKey] = useState(0);

  // State for AI Narrative Suite results from NarrativeWeaver component
  const [aiNarrativeData, setAiNarrativeData] =
    useState<InitialNarrativeResult | null>(null);
  const [aiWhatIfCache, setAiWhatIfCache] = useState<
    Array<{ scenarioText: string; result: WhatIfResult }>
  >([]);
  const [aiHiddenGems, setAiHiddenGems] = useState<HiddenGemsResult | null>(
    null,
  );

  // State for Living Portfolio settings
  const [portfolioSettings, setPortfolioSettings] =
    useState<LivingPortfolioSettings>({
      title: `${resume.personal?.fullName || "My"} Career Portfolio`,
      isPublic: false, // Default to not public
      theme: "default",
      displaySettings: {
        contact: {
          showEmail: true,
          showPhone: false,
          showLocation: true,
          showLinkedIn: true,
          showPhoto: false,
        },
        sections: {
          showSummary: true,
          showSkills: true,
          showWorkExperience: true,
          showEducation: true,
          showVolunteering: true,
          showCertifications: true,
          showReferences: false,
        },
        narrativeSuite: {
          showCareerNarrative: true,
          showGoldenThread: true,
          showKeyThemes: true,
          showHiddenGems: true,
        },
      },
      selectedPublicWhatIfs: [],
      showcaseSections: [],
    });

  // const handleProceedToPortfolioEditor = async () => {
  //   if (!aiNarrativeData?.careerNarrative) {
  //     alert(
  //       "Please launch the AI Career Narrative Suite and generate your narrative insights first. These insights are essential for building your portfolio.",
  //     );
  //     // Optionally, you could auto-launch it here if it's not a disruptive UX:
  //     // setShowNarrativeWeaver(true);
  //     return;
  //   }
  //   setLoading(true); // Use a general loading state for this action
  //   setSaveMessage("Finalizing your resume draft...");
  //   const currentDraftId = await saveResumeDraft(); // saveResumeDraft saves resume + AI data
  //   setLoading(false);

  //   if (currentDraftId) {
  //     setSaveMessage(null); // Clear saving message
  //     // router.push(`/portfolio-editor/${currentDraftId}`); // Navigate to the new editor page
  //     router.push(`/portfolio-editor/new?draftId=${currentDraftId}`); // Use this new route structure
  //   } else {
  //     // saveResumeDraft would have set an error message in the saveMessage state
  //     // No need for an extra alert here if saveMessage is displayed.
  //     // alert("Failed to save the resume draft. Cannot proceed to portfolio customization. Please check messages.");
  //   }
  // };

  // Make sure you have this import if you still use router for other things,

  const handleProceedToPortfolioEditor = async () => {
    if (!aiNarrativeData?.careerNarrative) {
      alert(
        "Please launch the AI Career Narrative Suite and generate your narrative insights first. These insights are essential for building your portfolio.",
      );
      return;
    }
    setLoading(true);
    setSaveMessage("Finalizing your resume draft...");

    const currentDraftId = await saveResumeDraft(); // saveResumeDraft saves resume + AI data
    setLoading(false);

    if (currentDraftId) {
      setSaveMessage(null); // Clear saving message

      const portfolioEditorUrl = `/portfolio-editor/new?draftId=${currentDraftId}`;

      // --- MODIFICATION START ---
      // Open the URL in a new window/tab
      const newWindow = window.open(
        portfolioEditorUrl,
        "_blank",
        "noopener,noreferrer",
      );

      if (newWindow) {
        newWindow.focus(); // Optional: attempt to bring the new window to the front
      } else {
        // Fallback or error message if the popup was blocked
        alert(
          "The portfolio editor tried to open in a new window, but it might have been blocked by your browser. Please check your popup blocker settings. The URL is: " +
            portfolioEditorUrl,
        );
        // As a fallback, you might want to navigate in the current window if the popup fails
        // router.push(portfolioEditorUrl);
        // Or simply do nothing further and let the user handle it with the alert message.
      }
      // --- MODIFICATION END ---
    } else {
      // saveResumeDraft would have set an error message in the saveMessage state
      // No need for an extra alert here if saveMessage is displayed.
      // console.error("Failed to save the resume draft. Cannot proceed to portfolio customization.");
      // The saveMessage state should provide feedback.
    }
  };

  // Effect to update portfolio title when resume name changes
  useEffect(() => {
    if (
      resume.personal?.fullName &&
      portfolioSettings.title === "My Career Portfolio"
    ) {
      // Only update if it's the default
      setPortfolioSettings((prev) => ({
        ...prev,
        title: `${resume.personal?.fullName}'s Career Portfolio`,
      }));
    }
  }, [resume.personal?.fullName, portfolioSettings.title]);

  const next = () =>
    setStep((s) => {
      const nextStep = Math.min(s + 1, 4);
      if (s !== nextStep) setCurrentStepKey(Date.now());
      return nextStep;
    });
  const back = () =>
    setStep((s) => {
      const prevStep = Math.max(s - 1, 0);
      if (s !== prevStep) setCurrentStepKey(Date.now());
      return prevStep;
    });

  const validateEmail = (email: string): boolean => {
    if (!email) return true; // Don't validate if empty, let required check handle it
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // const handleNarrativeWeaverClick = () => {
  //   // Option 1: Navigate to a new page
  //   // router.push('/wizard/narrative-weaver');

  //   // Option 2: Show a modal or a different view within the current page
  //   setShowNarrativeWeaver(true);
  //   // You might want to pass the current resume data to this new view/component
  // };

  const handleNarrativeWeaverClick = (
    e?: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e?.preventDefault(); // Optional: Prevent default behavior if needed
    setShowNarrativeWeaver(true);
  };

  // const handlePersonalChange = (field: string, value: string) => {
  //   setResume((r) => ({
  //     ...r,
  //     personal: { ...(r.personal as any), [field]: value },
  //   }));
  //   if (field === "email") {
  //     setIsEmailValid(validateEmail(value));
  //   }
  // };

  const handlePersonalChange = (
    field: keyof ResumeJSON["personal"],
    value: string,
  ) => {
    setResume((r) => ({
      ...r,
      personal: { ...r.personal, [field]: value } as ResumeJSON["personal"],
    }));
    if (field === "email") {
      setIsEmailValid(validateEmail(value));
    }
  };

  const handleAtsResult = useCallback((data: ATSResult) => {
    setAtsData(data);
  }, []);

  async function importResume() {
    setLoading(true);
    setLinkedinError(null); // ← clear any previous LinkedIn error
    try {
      let res;
      if (mode === "text") {
        res = await axios.post<ResumeJSON>("/api/wizard/seed-text", { text });
      } else if (mode === "file" && file) {
        const form = new FormData();
        form.append("file", file);
        res = await axios.post<ResumeJSON>("/api/wizard/seed-file", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        res = await axios.post<ResumeJSON>("/api/wizard/seed-linkedin", {
          html: htmlSnippet,
        });
      }
      setResume((r) => ({ ...r, ...res!.data }));
      next();
    } catch (e) {
      console.error("Import resume error:", e);
      alert("Failed to import resume. Please check your input and try again.");
    } finally {
      setLoading(false);
    }
  }

  // NEW: Function to save or update the ResumeDraft
  const saveResumeDraft = async () => {
    if (!isLoaded) {
      setSaveMessage("User data not loaded. Please wait.");
      return null;
    }
    if (!user) {
      setSaveMessage("Please log in to save your resume draft.");
      return null;
    }

    setLoading(true);
    setSaveMessage("Saving your resume draft...");

    try {
      // Construct the payload for the ResumeDraft
      const draftPayload = {
        title:
          portfolioSettings.title ||
          `${resume.personal?.fullName || "Untitled"} Resume Draft`,
        wizardPersonalData: resume.personal,
        wizardSummary: resume.summary,
        wizardSkills: resume.skills,
        wizardWorkExperiences: resume.workExperiences,
        wizardEducations: resume.educations,
        wizardVolunteering: resume.volunteering,
        wizardCertifications: resume.certifications,
        wizardReferences: resume.references,
        aiCareerNarrative: aiNarrativeData?.careerNarrative,
        aiGoldenThread: aiNarrativeData?.goldenThread,
        aiGoldenThreadEvidence: aiNarrativeData?.goldenThreadEvidence,
        aiKeyThemes: aiNarrativeData?.keyThemes,
        aiHiddenGemsResultJson: aiHiddenGems, // Full object
        aiWeavingSuggestions: aiNarrativeData?.weavingSuggestions,
        aiWhatIfStarters: aiNarrativeData?.whatIfStarters,
        aiWhatIfResultsCache: aiWhatIfCache, // Full cache
      };

      // let response;
      // if (resumeDraftId) {
      //   response = await axios.put(
      //     `/api/resume-drafts/${resumeDraftId}`,
      //     draftPayload,
      //   );
      // } else {
      //   response = await axios.post("/api/resume-drafts", draftPayload);
      //   setResumeDraftId(response.data.id);
      // }
      let response: { data: { id?: string } };
      if (resumeDraftId) {
        response = await axios.put(
          `/api/resume-drafts/${resumeDraftId}`,
          draftPayload,
        );
      } else {
        response = await axios.post("/api/resume-drafts", draftPayload);
        setResumeDraftId(response.data.id ?? null);
      }
      setSaveMessage("Resume draft saved/updated successfully!");
      // console.log("Resume Draft saved/updated in wizard:", response.data);
      setTimeout(() => setSaveMessage(null), 3000); // Clear message after 3s
      return response.data.id;
    } catch {
      console.error("Failed to save resume draft in wizard:");
      return null;
    } finally {
      setDraftSaving(false);
    }
  };

  // const handlePortfolioSettingChange = (
  //   sectionKey:
  //     | keyof LivingPortfolioSettings["displaySettings"]
  //     | "title"
  //     | "slug"
  //     | "isPublic"
  //     | "theme",
  //   subKey: string, // Key within contact, sections, narrativeSuite, or same as sectionKey for top-level
  //   value: any,
  // ) => {
  //   setPortfolioSettings((prev) => {
  //     if (["title", "slug", "isPublic", "theme"].includes(sectionKey)) {
  //       return { ...prev, [sectionKey]: value };
  //     }
  //     const settingSection =
  //       sectionKey as keyof LivingPortfolioSettings["displaySettings"];
  //     return {
  //       ...prev,
  //       displaySettings: {
  //         ...prev.displaySettings,
  //         [settingSection]: {
  //           ...prev.displaySettings[settingSection],
  //           [subKey]: value,
  //         },
  //       },
  //     };
  //   });
  // };

  // const handleToggleWhatIfForPublic = (whatIfItem: {
  //   scenarioText: string;
  //   result: WhatIfResult;
  // }) => {
  //   setPortfolioSettings((prev) => {
  //     const existingIndex = prev.selectedPublicWhatIfs.findIndex(
  //       (item) => item.scenarioText === whatIfItem.scenarioText,
  //     );
  //     if (existingIndex > -1) {
  //       return {
  //         ...prev,
  //         selectedPublicWhatIfs: prev.selectedPublicWhatIfs.filter(
  //           (_, i) => i !== existingIndex,
  //         ),
  //       };
  //     } else {
  //       return {
  //         ...prev,
  //         selectedPublicWhatIfs: [
  //           ...prev.selectedPublicWhatIfs,
  //           {
  //             scenarioText: whatIfItem.scenarioText,
  //             adaptedResult: whatIfItem.result,
  //           },
  //         ],
  //       };
  //     }
  //   });
  // };

  // const handleNarrativeSuiteUpdate = (data: {
  //   initialNarrative?: InitialNarrativeResult;
  //   whatIfs?:
  //     | Array<{ scenarioText: string; result: WhatIfResult }>
  //     | ((
  //         prevCache: Array<{ scenarioText: string; result: WhatIfResult }>,
  //       ) => Array<{ scenarioText: string; result: WhatIfResult }>);
  //   hiddenGems?: HiddenGemsResult;
  // }) => {
  //   console.log("page.tsx: NarrativeWeaver updated parent state with:", data);
  //   if (data.initialNarrative) {
  //     setAiNarrativeData(data.initialNarrative);
  //   }
  //   if (data.whatIfs) {
  //     if (typeof data.whatIfs === "function") {
  //       setAiWhatIfCache(data.whatIfs); // Pass the function to setState
  //     } else {
  //       setAiWhatIfCache(data.whatIfs); // Directly set the array
  //     }
  //   }
  //   if (data.hiddenGems) {
  //     setAiHiddenGems(data.hiddenGems);
  //   }
  // };

  const handleNarrativeSuiteUpdate = (data: {
    initialNarrative?: InitialNarrativeResult;
    whatIfs?: Array<{ scenarioText: string; result: WhatIfResult }>; // Will now always be an array if present
    hiddenGems?: HiddenGemsResult;
  }) => {
    // console.log("page.tsx: NarrativeWeaver updated parent state with:", data);
    if (data.initialNarrative) {
      setAiNarrativeData(data.initialNarrative);
    }
    if (data.whatIfs) {
      // data.whatIfs is now guaranteed to be an array from NarrativeWeaver
      setAiWhatIfCache(data.whatIfs);
    }
    if (data.hiddenGems) {
      setAiHiddenGems(data.hiddenGems);
    }
  };

  // const handleProceedToPortfolioCustomization = async () => {
  //   if (!aiNarrativeData?.careerNarrative) {
  //     alert(
  //       "Please launch the AI Career Narrative Suite and generate your narrative insights first. These insights are key to building your portfolio.",
  //     );
  //     // Optionally, you could auto-launch it here:
  //     // setShowNarrativeWeaver(true);
  //     return;
  //   }

  //   setLoading(true); // General loading for this action
  //   setSaveMessage("Saving current progress...");
  //   const currentDraftId = await saveResumeDraft(); // Save everything first
  //   setLoading(false);

  //   if (currentDraftId) {
  //     setSaveMessage(null); // Clear saving message
  //     router.push(`/portfolio-editor/${currentDraftId}`);
  //   } else {
  //     // saveResumeDraft would have set an error message
  //     alert(
  //       "Failed to save the resume draft. Cannot proceed to portfolio customization.",
  //     );
  //   }
  // };

  // Corrected tailorResume
  async function tailorResume() {
    setLoading(true);
    try {
      const res = await axios.post<ResumeJSON>("/api/wizard/tailor-job", {
        resume, // Send the current state
        jobDescription: jobDesc,
      });

      setResume((prev) => {
        const newResumeData = res.data; // The data received from the API

        // Start with a spread of the previous state to ensure all sections are carried over
        // and then selectively update sections based on the API response.
        const updatedResume: Partial<ResumeJSON> = { ...prev };

        if (newResumeData.personal)
          updatedResume.personal = {
            ...prev.personal,
            ...newResumeData.personal,
          };
        if (newResumeData.summary !== undefined)
          updatedResume.summary = newResumeData.summary;
        if (newResumeData.skills !== undefined)
          updatedResume.skills = newResumeData.skills;

        // Handle workExperiences
        if (newResumeData.workExperiences) {
          if (
            prev.workExperiences &&
            prev.workExperiences.length === newResumeData.workExperiences.length
          ) {
            // AI returned same number of experiences, merge them
            updatedResume.workExperiences = prev.workExperiences.map(
              (oldExp, idx) => {
                const newExpData = newResumeData.workExperiences[idx];
                return {
                  ...oldExp, // Start with old experience data
                  position: newExpData.position || oldExp.position,
                  company: newExpData.company || oldExp.company,
                  startDate: newExpData.startDate || oldExp.startDate,
                  endDate: newExpData.endDate || oldExp.endDate,
                  bullets: newExpData.bullets || oldExp.bullets, // Update bullets
                };
              },
            );
          } else {
            // AI returned a different number of experiences, or prev experiences didn't exist.
            // In this case, we'll take the AI's version as the new truth for this section.
            // You might want more sophisticated merging or user notification here.
            console.warn(
              "Tailoring changed the number of work experiences. Using AI's version.",
            );
            updatedResume.workExperiences = newResumeData.workExperiences;
          }
        }
        // Similar careful merging for other array sections if the AI can modify them
        if (newResumeData.educations)
          updatedResume.educations = newResumeData.educations; // Or merge similarly if needed
        if (newResumeData.volunteering)
          updatedResume.volunteering = newResumeData.volunteering;
        if (newResumeData.certifications)
          updatedResume.certifications = newResumeData.certifications;
        if (newResumeData.references)
          updatedResume.references = newResumeData.references;

        return updatedResume;
      });

      next();
    } catch (e) {
      console.error("Tailor resume error:", e);
      alert("Failed to tailor resume. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function injectKeywords() {
    if (!atsData?.missingKeywords?.length) return;
    setInjecting(true);
    setInjectedKeywordsList(atsData.missingKeywords);
    try {
      const res = await axios.post<ResumeJSON>("/api/wizard/inject-keywords", {
        resume,
        missingKeywords: atsData.missingKeywords,
        level: injectLevel,
        injectSummary,
        injectSkills,
      });
      setResume(res.data);
      rerunATS();
    } catch (e) {
      console.error("Inject keywords error:", e);
      alert("Failed to inject keywords.");
    } finally {
      setInjecting(false);
    }
  }

  function addSection(type: "volunteering" | "certifications" | "references") {
    setResume((r) => {
      const arr = r[type] || [];
      const newItem =
        type === "volunteering"
          ? {
              role: "",
              organization: "",
              bullets: [""],
              startDate: "",
              endDate: "",
            }
          : type === "certifications"
            ? { title: "", issuer: "", date: "" }
            : { name: "", contact: "" };
      return {
        ...r,
        [type]: [...arr, newItem],
      };
    });
    if (type === "volunteering") setVolOpen(true);
    if (type === "certifications") setCertOpen(true);
    if (type === "references") setRefOpen(true);
  }

  function rerunATS() {
    setInjectedKeywordsList([]);
    setAtsData(null);
    setRunKey((k) => k + 1);
  }

  const cleanUpBulletArray = (rawBullets: string[]): string[] => {
    return rawBullets
      .map((line) => line.replace(/^[\s•-]*?(?=\S)/, "").trim()) // Remove leading markers, then trim
      .filter((line) => line !== ""); // Remove any lines that are now completely empty
  };

  // onChange: Simply update the state with the raw lines from the textarea.
  // The textarea's value prop will display this directly.
  // Cleanup will happen on blur or when Enter is pressed.
  function handleBulletChange(
    idx: number,
    textareaValue: string,
    section: "workExperiences" | "volunteering",
  ) {
    const lines = textareaValue.split(/\r?\n/);
    setResume((r) => ({
      ...r,
      [section]: r[section]?.map((item, i) =>
        i === idx ? { ...item, bullets: lines } : item,
      ),
    }));
  }

  function handleBulletKeyDown(
    idx: number,
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    section: "workExperiences" | "volunteering",
  ) {
    const textarea = e.currentTarget;
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const { selectionStart, value } = textarea;

      // Get current lines, then add a new empty line for the new bullet
      // The visual bullet marker will be handled by GenericTemplate
      const currentBullets = value.split(/\r?\n/);
      const lineIndex =
        value.substring(0, selectionStart).split("\n").length - 1; // Line where Enter was pressed

      // Insert an empty string for the new bullet point after the current line
      currentBullets.splice(lineIndex + 1, 0, "");

      const newValue = currentBullets.join("\n");

      // Update the textarea value directly for immediate cursor feedback
      textarea.value = newValue;

      // Update the React state
      setResume((r) => ({
        ...r,
        [section]: r[section]?.map(
          (item, i) =>
            i === idx ? { ...item, bullets: currentBullets } : item, // currentBullets already has the new empty line
        ),
      }));

      // Set cursor position to the beginning of the new empty line
      setTimeout(() => {
        let newCursorPos = 0;
        for (let k = 0; k <= lineIndex; k++) {
          newCursorPos += currentBullets[k].length + 1; // +1 for newline
        }
        textarea.selectionStart = textarea.selectionEnd = newCursorPos;
        textarea.focus();
      }, 0);
    }
  }

  const formatBulletsOnBlur = (
    idx: number,
    section: "workExperiences" | "volunteering",
  ) => {
    setResume((prevResume) => {
      const currentSectionData = prevResume[section];
      if (!currentSectionData || !currentSectionData[idx]) return prevResume;

      const currentItem = currentSectionData[idx];
      // Ensure bullets is an array, even if undefined initially
      const rawBullets = Array.isArray(currentItem.bullets)
        ? currentItem.bullets
        : [];

      const cleanedBullets = cleanUpBulletArray(rawBullets); // Use the helper

      // If all bullets are empty after cleaning, provide a single empty string
      // to indicate an editable bullet area for the next interaction.
      const finalBullets =
        cleanedBullets.length === 0 &&
        rawBullets.length > 0 &&
        rawBullets.some((b) => b.trim() !== "")
          ? [""] // If there was content before but now all empty, leave one empty string
          : cleanedBullets.length === 0 && rawBullets.length === 0
            ? [""] // If it was initially empty (e.g. new item), ensure one editable line
            : cleanedBullets;

      // Only update if there's an actual change to avoid unnecessary re-renders
      if (
        JSON.stringify(currentItem.bullets) !== JSON.stringify(finalBullets)
      ) {
        const updatedSectionData = currentSectionData.map((item, i) => {
          if (i === idx) {
            return { ...item, bullets: finalBullets };
          }
          return item;
        });
        return { ...prevResume, [section]: updatedSectionData };
      }
      return prevResume;
    });
  };

  async function downloadResumeViaAPI() {
    if (!resume.personal?.fullName || !selectedTemplate) {
      alert("Resume data or template not ready.");
      setPdfGenerating(false); // Ensure this is reset
      return;
    }

    // console.log("Client: Initiating PDF download via API.");
    setPdfGenerating(true);
    setSaveMessage("Generating your PDF..."); // Updated message

    try {
      const response = await axios.post(
        "/api/generate-pdf", // Ensure this matches your API route location
        {
          resumeData: resume as ResumeJSON,
          templateId: selectedTemplate,
        },
        {
          responseType: "blob", // Crucial: expect a binary blob
        },
      );

      // console.log("Client: Received response from API.");
      // console.log("Client: Response status:", response.status);
      // console.log("Client: Response content-type:", response.headers['content-type']);

      // Check if the response is actually a PDF
      if (
        response.status === 200 &&
        response.headers["content-type"] === "application/pdf"
      ) {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        const fileName = `Resume_${(resume.personal?.fullName || "User").replace(/\s+/g, "_")}_${selectedTemplate}.pdf`;
        link.setAttribute("download", fileName);

        document.body.appendChild(link);
        link.click();

        // Clean up
        link.parentNode?.removeChild(link);
        window.URL.revokeObjectURL(url);

        // console.log("Client: PDF download initiated.");
        setSaveMessage("PDF downloaded successfully!");
      } else {
        // If the server sent an error (e.g., JSON error), try to parse and display it
        let errorDetail = "Server returned an unexpected response.";
        try {
          // The response.data might be a blob even for errors, try to read it as text
          const errorText = await (response.data as Blob).text();
          const errorJson = JSON.parse(errorText);
          errorDetail = errorJson.error || errorJson.details || errorText;
          console.error("Client: Server returned error object:", errorJson);
        } catch (e) {
          console.error(
            "Client: Could not parse error response from server.",
            e,
          );
          // If response.data is not a blob or not JSON, it might be plain text
          if (typeof response.data === "string") {
            errorDetail = response.data.substring(0, 200); // Show first 200 chars
          }
        }
        throw new Error(
          `PDF generation failed on server: ${errorDetail} (Status: ${response.status})`,
        );
      }
    } catch (error: unknown) {
      console.error(
        "Client: API PDF Generation Error (axios catch block):",
        error,
      );
      let detailedErrorMessage = (error as Error).message;
      if (
        (error as { response?: { status: number; data: unknown } }).response
      ) {
        // Try to get more details from axios error response
        detailedErrorMessage += ` - Server Status: ${(error as { response: { status: number } }).response.status}`;
        if ((error as { response: { data: unknown } }).response.data) {
          try {
            // If error.response.data is a blob, it needs to be read
            if (
              (error as { response: { data: Blob } }).response.data instanceof
              Blob
            ) {
              const errorText = await (
                error as { response: { data: Blob } }
              ).response.data.text();
              try {
                const errorJson = JSON.parse(errorText);
                detailedErrorMessage += ` - Details: ${errorJson.error || errorJson.details || errorText}`;
              } catch {
                detailedErrorMessage += ` - Server Response: ${errorText.substring(0, 200)}`;
              }
            } else if (
              typeof (error as { response: { data: unknown } }).response
                .data === "object"
            ) {
              detailedErrorMessage += ` - Details: ${(error as { response: { data: { error?: string; details?: string } } }).response.data.error || (error as { response: { data: { details?: string } } }).response.data.details || JSON.stringify((error as { response: { data: unknown } }).response.data)}`;
            } else {
              detailedErrorMessage += ` - Server Response: ${String((error as { response: { data: unknown } }).response.data).substring(0, 200)}`;
            }
          } catch {
            console.error("Client: Could not parse error.response.data");
          }
        }
      }
      setSaveMessage(`Error generating PDF: ${detailedErrorMessage}`);
      alert(`Failed to generate PDF: ${detailedErrorMessage}`);
    } finally {
      setPdfGenerating(false);
      // Do not reset saveMessage here if you want it to persist after error
    }
  }

  // const publishLivingPortfolio = async () => {
  //   console.log(
  //     "Attempting to publish portfolio. Current Settings:",
  //     portfolioSettings,
  //   );
  //   console.log("Current Resume Data for snapshot:", resume);
  //   console.log("Current AI Narrative Data:", aiNarrativeData);
  //   console.log("Current AI What If Cache:", aiWhatIfCache);
  //   console.log("Current AI Hidden Gems:", aiHiddenGems);

  //   if (!resume.personal) {
  //     alert("Personal information is missing from the resume.");
  //     return;
  //   }

  //   setPdfGenerating(true); // Re-use loading state for "publishing"
  //   setSaveMessage(null);
  //   setPortfolioPublishedInfo(null); // Clear old published info

  //   // NEW: Ensure the current draft is saved/updated first to get its ID
  //   const currentResumeDraftId = await saveResumeDraft();
  //   if (!currentResumeDraftId) {
  //     setPdfGenerating(false);
  //     setSaveMessage("Cannot publish portfolio: Resume draft not saved.");
  //     return; // Saving draft failed or user not logged in
  //   }
  //   setSaveMessage("Publishing your Living Portfolio..."); // Update status
  //   try {
  //     const payload = {
  //       sourceResumeDraftId: currentResumeDraftId, // IMPORTANT: Use the actual ID from saveResumeDraft
  //       title: portfolioSettings.title,
  //       slug: portfolioSettings.slug || undefined, // Send undefined if empty
  //       isPublic: portfolioSettings.isPublic,
  //       theme: portfolioSettings.theme,
  //       displaySettings: portfolioSettings.displaySettings,

  //       publicFullName: portfolioSettings.displaySettings.contact.showPhoto
  //         ? resume.personal.fullName
  //         : undefined, // photoUrl not included
  //       publicJobTitle: resume.personal.jobTitle, // This could also be a user-set portfolio title
  //       publicEmail: portfolioSettings.displaySettings.contact.showEmail
  //         ? resume.personal.email
  //         : undefined,
  //       publicPhone: portfolioSettings.displaySettings.contact.showPhone
  //         ? resume.personal.phone
  //         : undefined,
  //       publicLocation: portfolioSettings.displaySettings.contact.showLocation
  //         ? `${resume.personal.city}, ${resume.personal.country}`.replace(
  //             /^, |, $/g,
  //             "",
  //           )
  //         : undefined,
  //       publicLinkedInUrl: portfolioSettings.displaySettings.contact
  //         .showLinkedIn
  //         ? resume.personal.linkedinUrl
  //         : undefined,

  //       publicSummary: portfolioSettings.displaySettings.sections.showSummary
  //         ? resume.summary
  //         : undefined,
  //       publicSkills: portfolioSettings.displaySettings.sections.showSkills
  //         ? resume.skills
  //         : [],
  //       publicWorkExperiences: portfolioSettings.displaySettings.sections
  //         .showWorkExperience
  //         ? resume.workExperiences
  //         : [],
  //       publicEducations: portfolioSettings.displaySettings.sections
  //         .showEducation
  //         ? resume.educations
  //         : [],
  //       publicVolunteering: portfolioSettings.displaySettings.sections
  //         .showVolunteering
  //         ? resume.volunteering
  //         : [],
  //       publicCertifications: portfolioSettings.displaySettings.sections
  //         .showCertifications
  //         ? resume.certifications
  //         : [],

  //       publicCareerNarrative: portfolioSettings.displaySettings.narrativeSuite
  //         .showCareerNarrative
  //         ? aiNarrativeData?.careerNarrative
  //         : undefined,
  //       publicGoldenThread: portfolioSettings.displaySettings.narrativeSuite
  //         .showGoldenThread
  //         ? aiNarrativeData?.goldenThread
  //         : undefined,
  //       publicGoldenThreadEvidence:
  //         portfolioSettings.displaySettings.narrativeSuite.showGoldenThread &&
  //         aiNarrativeData?.goldenThreadEvidence
  //           ? aiNarrativeData.goldenThreadEvidence
  //           : undefined,
  //       publicKeyThemes: portfolioSettings.displaySettings.narrativeSuite
  //         .showKeyThemes
  //         ? aiNarrativeData?.keyThemes
  //         : undefined,
  //       publicHiddenGems: portfolioSettings.displaySettings.narrativeSuite
  //         .showHiddenGems
  //         ? aiHiddenGems
  //         : undefined,

  //       publicWhatIfScenarios: portfolioSettings.selectedPublicWhatIfs,
  //       showcaseSections: portfolioSettings.showcaseSections,
  //     };

  //     //     console.log("Payload for /api/living-portfolios/publish:", JSON.stringify(payload, null, 2));

  //     //     const response = await axios.post('/api/living-portfolios/publish', payload);

  //     //     setSaveMessage(`Living Portfolio published! Shareable link: ${window.location.origin}/portfolio/${response.data.portfolioId}`);
  //     //     // You might want to store response.data.portfolioId if the user can later update this specific portfolio
  //     //     alert(`Portfolio Published! Link: ${window.location.origin}/portfolio/${response.data.portfolioId}`);

  //     //   } catch (error: any) {
  //     //     console.error("Failed to publish Living Portfolio:", error);
  //     //     const errMsg = error.response?.data?.error || error.response?.data?.details || error.message || "Unknown error during publishing.";
  //     //     setSaveMessage(`Error publishing: ${errMsg}`);
  //     //     alert(`Error: ${errMsg}`);
  //     //   } finally {
  //     //     setPdfGenerating(false);
  //     //   }
  //     // };

  //     console.log(
  //       "Payload for /api/living-portfolios/publish:",
  //       JSON.stringify(payload, null, 2),
  //     );
  //     const response = await axios.post(
  //       "/api/living-portfolios/publish",
  //       payload,
  //     );

  //     const portfolioUrl = `${window.location.origin}/portfolio/${response.data.portfolioSlug || response.data.portfolioId}`;

  //     setSaveMessage(null); // Clear "Publishing..." message
  //     setPortfolioPublishedInfo({
  //       // Set the new success info
  //       message: "Living Portfolio published successfully!",
  //       url: portfolioUrl,
  //       id: response.data.portfolioId,
  //       slug: response.data.portfolioSlug,
  //     });
  //     // No need for alert() anymore
  //   } catch (error: unknown) {
  //     console.error("Failed to publish Living Portfolio:", error);
  //     const errMsg =
  //       // error.response?.data?.error ||
  //       // error.response?.data?.details ||
  //       // error.message ||
  //       "Unknown error during publishing.";
  //     setSaveMessage(`Error publishing: ${errMsg}`); // Use saveMessage for errors
  //     setPortfolioPublishedInfo(null); // Clear any previous success
  //   } finally {
  //     setPdfGenerating(false); // Reset processing state
  //   }
  // };

  const inputBaseClass =
    "w-full p-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-1 transition-all duration-200 shadow-sm hover:border-gray-400";
  const primaryButtonClass =
    "px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:bg-blue-800";
  const secondaryButtonClass =
    "px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-100 hover:border-gray-400 active:bg-gray-200 disabled:opacity-50 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md";
  const sectionCardClass = "bg-white p-6 sm:p-8 rounded-xl shadow-xl";

  const personalInfo = resume.personal || {
    fullName: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    linkedinUrl: "",
  };
  const isEmailFieldActuallyInvalid =
    personalInfo.email !== "" && !isEmailValid;
  const isNextDisabled =
    !personalInfo.fullName ||
    !personalInfo.email ||
    !personalInfo.phone ||
    !validateEmail(personalInfo.email); // Validate on check, not just state

  const renderStepContent = () => {
    switch (step) {
      case 0: // Personal Info
        return (
          <section key={currentStepKey} className={sectionCardClass}>
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-semibold text-gray-800 sm:text-3xl">
              <span className="text-3xl text-blue-500">👤</span> Personal
              Information
            </h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Full Name *{" "}
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  className={`${inputBaseClass} focus:border-blue-500 focus:ring-blue-500`}
                  value={personalInfo.fullName || ""}
                  onChange={(e) =>
                    handlePersonalChange("fullName", e.target.value)
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Email *{" "}
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className={`${inputBaseClass} focus:border-blue-500 focus:ring-blue-500 ${isEmailFieldActuallyInvalid ? "border-red-500 ring-1 ring-red-500" : ""}`}
                  value={personalInfo.email || ""}
                  onChange={(e) =>
                    handlePersonalChange("email", e.target.value)
                  }
                  onBlur={(e) => {
                    if (e.target.value !== "") {
                      setIsEmailValid(validateEmail(e.target.value));
                    } else {
                      setIsEmailValid(true);
                    }
                  }}
                />
                {isEmailFieldActuallyInvalid && (
                  <p className="mt-1 text-xs text-red-600">
                    Please enter a valid email address.
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Phone *{" "}
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  className={`${inputBaseClass} focus:border-blue-500 focus:ring-blue-500`}
                  value={personalInfo.phone || ""}
                  onChange={(e) =>
                    handlePersonalChange("phone", e.target.value)
                  }
                />
              </div>
              <div>
                {" "}
                <label
                  htmlFor="city"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  {" "}
                  City{" "}
                </label>{" "}
                <input
                  id="city"
                  type="text"
                  placeholder="Enter your city"
                  className={`${inputBaseClass} focus:border-blue-500 focus:ring-blue-500`}
                  value={personalInfo.city || ""}
                  onChange={(e) => handlePersonalChange("city", e.target.value)}
                />{" "}
              </div>
              <div>
                {" "}
                <label
                  htmlFor="country"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Country{" "}
                </label>{" "}
                <input
                  id="country"
                  type="text"
                  placeholder="Enter your country"
                  className={`${inputBaseClass} focus:border-blue-500 focus:ring-blue-500`}
                  value={personalInfo.country || ""}
                  onChange={(e) =>
                    handlePersonalChange("country", e.target.value)
                  }
                />{" "}
              </div>
              <div>
                {" "}
                <label
                  htmlFor="linkedinUrl"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  {" "}
                  LinkedIn URL (Optional){" "}
                </label>{" "}
                <input
                  id="linkedinUrl"
                  type="url"
                  placeholder="https://linkedin.com/in/yourprofile"
                  className={`${inputBaseClass} focus:border-blue-500 focus:ring-blue-500`}
                  value={personalInfo.linkedinUrl || ""}
                  onChange={(e) =>
                    handlePersonalChange("linkedinUrl", e.target.value)
                  }
                />{" "}
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button
                onClick={next}
                disabled={isNextDisabled}
                className={primaryButtonClass}
                title={
                  isNextDisabled
                    ? !validateEmail(personalInfo.email || "") &&
                      (personalInfo.email || "") !== ""
                      ? "Please enter a valid email address."
                      : "Full Name, Email, and Phone are required."
                    : "Proceed to next step"
                }
              >
                {" "}
                Next <span aria-hidden="true">→</span>{" "}
              </button>
            </div>
          </section>
        );

      case 1: // Import Resume
        return (
          <section key={currentStepKey} className={sectionCardClass}>
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-semibold text-gray-800 sm:text-3xl">
              <span className="text-3xl text-green-500">📄</span> Import Your
              Resume
            </h2>
            <div className="mb-6 flex w-full space-x-2 rounded-lg border border-gray-200 bg-gray-100 p-1 sm:w-auto sm:space-x-3">
              {(["text", "file", "linkedin"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setMode(m);
                    setFile(null);
                    setText("");
                    setHtmlSnippet("");
                  }}
                  className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 sm:flex-none sm:px-5 sm:py-2.5 sm:text-base ${mode === m ? "bg-green-600 text-white shadow-md" : "bg-transparent text-gray-600 hover:bg-gray-200 hover:text-gray-800"}`}
                >
                  {m === "text"
                    ? "Type/Paste"
                    : m === "file"
                      ? "Upload File"
                      : "LinkedIn Data"}
                </button>
              ))}
            </div>
            {mode === "text" && (
              <textarea
                className={`${inputBaseClass} h-48 resize-y focus:border-green-500 focus:ring-green-500 sm:h-56`}
                placeholder="Paste your full resume text here…"
                value={text}
                onChange={(e) => setText(e.target.value)}
                aria-label="Paste resume text"
              />
            )}
            {mode === "file" && (
              <div className="rounded-lg border-2 border-dashed border-gray-300 p-4 text-center transition-colors duration-200 hover:border-green-500">
                <input
                  type="file"
                  id="fileUpload"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
                <label
                  htmlFor="fileUpload"
                  className="flex cursor-pointer flex-col items-center justify-center"
                >
                  <svg
                    className="mb-2 h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <span className="font-medium text-green-600">
                    Choose a file
                  </span>
                  <span className="mt-1 text-sm text-gray-500">
                    or drag and drop
                  </span>
                  <span className="mt-1 text-xs text-gray-400">
                    PDF, DOCX, DOC, TXT
                  </span>
                </label>
                {file && (
                  <p className="mt-3 text-sm text-gray-700">
                    Selected: <span className="font-medium">{file.name}</span>
                  </p>
                )}
              </div>
            )}
            {mode === "linkedin" && (
              <>
                <textarea
                  className={`${inputBaseClass} h-48 resize-y focus:border-green-500 focus:ring-green-500 sm:h-56`}
                  placeholder="Paste your LinkedIn profile page content (HTML or plain text) here…"
                  value={htmlSnippet}
                  onChange={(e) => setHtmlSnippet(e.target.value)}
                  aria-label="Paste LinkedIn profile HTML or text"
                />
                {linkedinError && (
                  <p className="mt-2 text-sm text-red-600">{linkedinError}</p>
                )}
              </>
            )}
            <div className="mt-8 flex flex-col items-center justify-between space-y-3 sm:flex-row sm:space-y-0">
              <button onClick={back} className={secondaryButtonClass}>
                <span aria-hidden="true">←</span> Back
              </button>
              <button
                onClick={importResume}
                disabled={
                  loading ||
                  (mode === "text" && !text) ||
                  (mode === "file" && !file) ||
                  (mode === "linkedin" && !htmlSnippet)
                }
                className={`${primaryButtonClass} bg-green-600 hover:bg-green-700 focus:ring-green-500 active:bg-green-800`}
                title={
                  (mode === "text" && !text) ||
                  (mode === "file" && !file) ||
                  (mode === "linkedin" && !htmlSnippet)
                    ? "Please provide input to import"
                    : "Import your resume"
                }
              >
                {loading ? (
                  <>
                    <svg
                      className="h-5 w-5 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Importing...
                  </>
                ) : (
                  "Import Resume"
                )}
              </button>
            </div>
          </section>
        );
      case 2: // Tailor to Job
        return (
          <section key={currentStepKey} className={sectionCardClass}>
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-semibold text-gray-800 sm:text-3xl">
              <span className="text-3xl text-indigo-500">🎯</span> Tailor to a
              Job Description
            </h2>
            <textarea
              className={`${inputBaseClass} h-56 resize-y focus:border-indigo-500 focus:ring-indigo-500 sm:h-72`}
              placeholder="Paste the full job description here to tailor your resume..."
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              aria-label="Paste job description"
            />
            <div className="mt-8 flex flex-col items-center justify-between space-y-3 sm:flex-row sm:space-y-0">
              <button onClick={back} className={secondaryButtonClass}>
                <span aria-hidden="true">←</span> Back
              </button>
              <button
                onClick={tailorResume}
                disabled={loading || !jobDesc}
                className={`${primaryButtonClass} bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 active:bg-indigo-800`}
                title={
                  !jobDesc
                    ? "Please paste a job description"
                    : "Tailor your resume"
                }
              >
                {loading ? (
                  <>
                    <svg
                      className="h-5 w-5 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Tailoring...
                  </>
                ) : (
                  "Tailor Resume"
                )}
              </button>
            </div>
          </section>
        );
      case 3: // Review & Export
        return (
          <section
            key={currentStepKey}
            className={`${sectionCardClass} space-y-8`}
          >
            <h2 className="flex items-center gap-3 text-2xl font-semibold text-gray-800 sm:text-3xl">
              <span className="text-3xl text-purple-500">🚀</span> Review,
              Refine & Export
            </h2>

            {/* ATS Score */}
            {(resume as ResumeJSON).summary && (
              <div className="rounded-xl border border-gray-200/80 bg-gradient-to-br from-gray-50 to-slate-50 p-1 shadow-lg">
                {/* <ATSScore key={runKey} resume={resume as ResumeJSON} jobDescription={jobDesc} onResult={handleAtsResult} /> */}

                <ATSScore
                  key={runKey}
                  resume={resume as ResumeJSON}
                  jobDescription={jobDesc}
                  onResult={handleAtsResult}
                  runKey={runKey} // <-- Add this!
                />
              </div>
            )}
            {atsData && (
              <button
                onClick={rerunATS}
                className="mx-auto flex items-center gap-1.5 text-sm font-medium text-blue-600 transition-colors duration-200 hover:text-blue-700 hover:underline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M15.312 11.424a5.5 5.5 0 01-9.204 2.75l-2.434 1.622A.75.75 0 012.75 15V6.75a.75.75 0 011.21-.596l2.667 1.778A5.5 5.5 0 0115.312 11.424zM10.5 5.78a.75.75 0 00-1.5 0v2.967l-1.64-1.172a.75.75 0 00-.922 1.17l2.25 1.608a.75.75 0 00.922 0l2.25-1.608a.75.75 0 00-.922-1.17L10.5 8.747V5.78z"
                    clipRule="evenodd"
                  />
                </svg>
                Re-run ATS Analysis
              </button>
            )}

            {/* Keyword Injection */}
            {atsData?.missingKeywords && atsData.missingKeywords.length > 0 && (
              <div className="space-y-5 rounded-xl border-2 border-yellow-200 bg-yellow-50 p-6 shadow-md">
                <h4 className="mb-3 text-xl font-semibold text-yellow-800">
                  Auto-Inject Missing Keywords
                </h4>
                <div className="mb-4 space-y-3 sm:flex sm:items-center sm:gap-6 sm:space-y-0">
                  <label className="flex cursor-pointer items-center gap-2 text-gray-700 transition-colors hover:text-yellow-700">
                    <input
                      type="checkbox"
                      checked={injectSummary}
                      onChange={() => setInjectSummary((b) => !b)}
                      className="h-5 w-5 rounded border-gray-300 text-yellow-600 shadow-sm focus:ring-yellow-500"
                    />
                    Inject into Summary
                  </label>
                  <label className="flex cursor-pointer items-center gap-2 text-gray-700 transition-colors hover:text-yellow-700">
                    <input
                      type="checkbox"
                      checked={injectSkills}
                      onChange={() => setInjectSkills((b) => !b)}
                      className="h-5 w-5 rounded border-gray-300 text-yellow-600 shadow-sm focus:ring-yellow-500"
                    />
                    Inject into Skills
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-sm ${injectLevel === 0 ? "font-bold text-yellow-700" : "text-gray-600"}`}
                  >
                    Low
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={2}
                    step={1}
                    value={injectLevel}
                    onChange={(e) => setInjectLevel(+e.target.value)}
                    className="h-2.5 w-full cursor-pointer appearance-none rounded-lg bg-yellow-200 accent-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-1"
                  />
                  <span
                    className={`text-sm ${injectLevel === 1 ? "font-bold text-yellow-700" : "text-gray-600"}`}
                  >
                    Med
                  </span>
                  <span
                    className={`text-sm ${injectLevel === 2 ? "font-bold text-yellow-700" : "text-gray-600"}`}
                  >
                    High
                  </span>
                </div>
                <p className="mt-1 text-xs italic text-gray-600">
                  Low = sprinkle a few keywords; High = weave more keywords
                  naturally.
                </p>
                <button
                  onClick={injectKeywords}
                  disabled={injecting}
                  className={`${primaryButtonClass} bg-yellow-500 text-yellow-900 hover:bg-yellow-600 hover:text-white focus:ring-yellow-500 active:bg-yellow-700`}
                >
                  {injecting
                    ? "Injecting..."
                    : `Inject ${atsData.missingKeywords.length} Keywords`}
                </button>
              </div>
            )}

            {/* Manual Edit Sections */}
            <CollapsibleSection
              title="Edit Summary & Skills"
              isOpen={manualOpen}
              setIsOpen={(val) => {
                setManualOpen(val);
                if (val) {
                  setSummaryDraft(resume.summary || "");
                  setSkillsDraft((resume.skills || []).join(", "));
                }
              }}
              accentColor="blue"
            >
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="summaryDraft"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Summary
                  </label>
                  <textarea
                    id="summaryDraft"
                    className={`${inputBaseClass} h-36 resize-y focus:border-blue-500 focus:ring-blue-500`}
                    value={summaryDraft}
                    onChange={(e) => setSummaryDraft(e.target.value)}
                    placeholder="Enter your professional summary..."
                  />
                </div>
                <div>
                  <label
                    htmlFor="skillsDraft"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Skills (comma-separated)
                  </label>
                  <input
                    id="skillsDraft"
                    type="text"
                    className={`${inputBaseClass} focus:border-blue-500 focus:ring-blue-500`}
                    value={skillsDraft}
                    onChange={(e) => setSkillsDraft(e.target.value)}
                    placeholder="e.g., Project Management, React, Data Analysis"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      setResume((r) => ({
                        ...r,
                        summary: summaryDraft,
                        skills: skillsDraft
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean),
                      }));
                      setManualOpen(false);
                    }}
                    className={`${primaryButtonClass} bg-green-600 hover:bg-green-700 focus:ring-green-500 active:bg-green-800`}
                  >
                    Save Summary & Skills
                  </button>
                  <button
                    onClick={() => setManualOpen(false)}
                    className={secondaryButtonClass}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </CollapsibleSection>

            {/* Edit Work Experience */}
            <CollapsibleSection
              title="Edit Work Experience"
              isOpen={expOpen}
              setIsOpen={setExpOpen}
              itemsCount={resume.workExperiences?.length}
              accentColor="green"
            >
              {(resume.workExperiences || []).map((we, idx) => (
                <div
                  key={idx}
                  className="group relative mb-6 space-y-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <h5 className="text-md font-semibold text-gray-700">
                      {we.position || "Untitled"} @ {we.company || "Company"}
                    </h5>
                    <button
                      className="rounded-full p-1 text-red-500 opacity-60 transition-all hover:bg-red-100 hover:text-red-700 group-hover:opacity-100"
                      onClick={() => {
                        const copy = [...(resume.workExperiences || [])];
                        copy.splice(idx, 1);
                        setResume((r) => ({ ...r, workExperiences: copy }));
                      }}
                      aria-label={`Remove work experience ${idx + 1}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5"
                      >
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                      </svg>
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Position"
                    value={we.position}
                    onChange={(e) => {
                      const copy = [...(resume.workExperiences || [])];
                      copy[idx].position = e.target.value;
                      setResume((r) => ({ ...r, workExperiences: copy }));
                    }}
                    className={`${inputBaseClass} focus:border-green-500 focus:ring-green-500`}
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    value={we.company}
                    onChange={(e) => {
                      const copy = [...(resume.workExperiences || [])];
                      copy[idx].company = e.target.value;
                      setResume((r) => ({ ...r, workExperiences: copy }));
                    }}
                    className={`${inputBaseClass} focus:border-green-500 focus:ring-green-500`}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Start Date (e.g., Jan 2020)"
                      value={we.startDate || ""}
                      onChange={(e) => {
                        const copy = [...(resume.workExperiences || [])];
                        copy[idx].startDate = e.target.value;
                        setResume((r) => ({ ...r, workExperiences: copy }));
                      }}
                      className={`${inputBaseClass} focus:border-green-500 focus:ring-green-500`}
                    />
                    <input
                      type="text"
                      placeholder="End Date (e.g., Present)"
                      value={we.endDate || ""}
                      onChange={(e) => {
                        const copy = [...(resume.workExperiences || [])];
                        copy[idx].endDate = e.target.value;
                        setResume((r) => ({ ...r, workExperiences: copy }));
                      }}
                      className={`${inputBaseClass} focus:border-green-500 focus:ring-green-500`}
                    />
                  </div>
                  <textarea
                    rows={5}
                    placeholder="Bullets (one per line, start with - )"
                    className={`${inputBaseClass} h-36 resize-y focus:border-green-500 focus:ring-green-500`}
                    value={(resume.workExperiences?.[idx]?.bullets || []).join(
                      "\n",
                    )} // Bind to state
                    onChange={(e) =>
                      handleBulletChange(idx, e.target.value, "workExperiences")
                    }
                    onKeyDown={(e) =>
                      handleBulletKeyDown(idx, e, "workExperiences")
                    }
                    onBlur={() => formatBulletsOnBlur(idx, "workExperiences")}
                  />
                </div>
              ))}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    const copy = [...(resume.workExperiences || [])];
                    copy.push({
                      position: "",
                      company: "",
                      bullets: [""],
                      startDate: "",
                      endDate: "",
                    });
                    setResume((r) => ({ ...r, workExperiences: copy }));
                    setExpOpen(true);
                  }}
                  className={`${primaryButtonClass} mt-2 bg-green-500 text-sm hover:bg-green-600`}
                >
                  + Add Role
                </button>
                <button
                  onClick={() => setExpOpen(false)}
                  className={`${secondaryButtonClass} mt-2 text-sm`}
                >
                  Save Changes
                </button>
              </div>
            </CollapsibleSection>

            {/* Edit Education */}
            <CollapsibleSection
              title="Edit Education"
              isOpen={eduOpen}
              setIsOpen={setEduOpen}
              itemsCount={resume.educations?.length}
              accentColor="purple"
            >
              {/* {(resume.educations || []).map((ed, idx) => (
                <div
                  key={idx}
                  className="group relative mb-6 space-y-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <h5 className="text-md font-semibold text-gray-700">
                      {ed.degree || "Degree"} @ {ed.school || "School"}
                    </h5>
                    <button
                      className="rounded-full p-1 text-red-500 opacity-60 transition-all hover:bg-red-100 hover:text-red-700 group-hover:opacity-100"
                      onClick={() => {
                        const copy = [...(resume.educations || [])];
                        copy.splice(idx, 1);
                        setResume((r) => ({ ...r, educations: copy }));
                      }}
                      aria-label={`Remove education ${idx + 1}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5"
                      >
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                      </svg>
                    </button>
                  </div>
                  {["degree", "school", "startDate", "endDate"].map((f) => (
                    <input
                      key={f}
                      type="text"
                      placeholder={
                        f.charAt(0).toUpperCase() +
                        f.slice(1).replace(/([A-Z])/g, " $1")
                      }
                      value={(ed as any)[f] || ""}
                      onChange={(e) => {
                        const copy = [...(resume.educations || [])];
                        (copy[idx] as any)[f] = e.target.value;
                        setResume((r) => ({ ...r, educations: copy }));
                      }}
                      className={`${inputBaseClass} focus:border-purple-500 focus:ring-purple-500`}
                    />
                  ))}
                </div>
              ))} */}
              {(resume.educations || []).map((ed, idx) => (
                <div
                  key={idx}
                  className="group relative mb-6 space-y-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <h5 className="text-md font-semibold text-gray-700">
                      {ed.degree || "Degree"} @ {ed.school || "School"}
                    </h5>
                    <button
                      className="rounded-full p-1 text-red-500 opacity-60 transition-all hover:bg-red-100 hover:text-red-700 group-hover:opacity-100"
                      onClick={() => {
                        const copy = [...(resume.educations || [])];
                        copy.splice(idx, 1);
                        setResume((r) => ({ ...r, educations: copy }));
                      }}
                      aria-label={`Remove education ${idx + 1}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5"
                      >
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                      </svg>
                    </button>
                  </div>
                  {(["degree", "school", "startDate", "endDate"] as const).map(
                    (f) => (
                      <input
                        key={f}
                        type="text"
                        placeholder={
                          f.charAt(0).toUpperCase() +
                          f.slice(1).replace(/([A-Z])/g, " $1")
                        }
                        value={ed[f] || ""}
                        onChange={(e) => {
                          const copy = [...(resume.educations || [])];
                          copy[idx] = { ...copy[idx], [f]: e.target.value };
                          setResume((r) => ({ ...r, educations: copy }));
                        }}
                        className={`${inputBaseClass} focus:border-purple-500 focus:ring-purple-500`}
                      />
                    ),
                  )}
                </div>
              ))}

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    const copy = [...(resume.educations || [])];
                    copy.push({
                      degree: "",
                      school: "",
                      startDate: "",
                      endDate: "",
                    });
                    setResume((r) => ({ ...r, educations: copy }));
                    setEduOpen(true);
                  }}
                  className={`${primaryButtonClass} mt-2 bg-purple-500 text-sm hover:bg-purple-600`}
                >
                  + Add Education
                </button>
                <button
                  onClick={() => setEduOpen(false)}
                  className={`${secondaryButtonClass} mt-2 text-sm`}
                >
                  Save Changes
                </button>
              </div>
            </CollapsibleSection>

            {/* Resume Preview Sections */}
            <div className="space-y-6 border-t border-gray-200/80 pt-6">
              <h3 className="text-xl font-semibold text-gray-700">
                Resume Preview (Editable Sections Above)
              </h3>
              <ResumePreviewSection title="Personal Details">
                <p className="text-gray-700">
                  <strong>Full Name:</strong> {resume.personal?.fullName}
                </p>
                <p className="text-gray-700">
                  <strong>Email:</strong> {resume.personal?.email}
                </p>
                <p className="text-gray-700">
                  <strong>Phone:</strong> {resume.personal?.phone}
                </p>
                <p className="text-gray-700">
                  <strong>Location:</strong> {resume.personal?.city},{" "}
                  {resume.personal?.country}
                </p>
                {resume.personal?.linkedinUrl && (
                  <p className="text-gray-700">
                    <strong>LinkedIn:</strong>{" "}
                    <a
                      href={resume.personal?.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Profile
                    </a>
                  </p>
                )}
              </ResumePreviewSection>
              <ResumePreviewSection title="Summary">
                <p className="text-justify leading-relaxed text-gray-700">
                  {highlightInjected(resume.summary, injectedKeywordsList)}
                </p>
              </ResumePreviewSection>
              <ResumePreviewSection title="Work Experience">
                {resume.workExperiences?.map((we, i) => (
                  <div
                    key={i}
                    className="mb-4 border-b border-gray-100 pb-2 last:border-b-0"
                  >
                    <strong className="text-gray-800">{we.position}</strong> @{" "}
                    <em className="text-gray-600">{we.company}</em>
                    <p className="text-xs text-gray-500">
                      {we.startDate} - {we.endDate}
                    </p>
                    <ul className="ml-6 mt-2 list-disc space-y-1 text-gray-700">
                      {(we.bullets ?? []).map((b, j) => (
                        <li key={j}>
                          {highlightInjected(b, injectedKeywordsList)}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </ResumePreviewSection>
              <ResumePreviewSection title="Education">
                {resume.educations?.map((ed, i) => (
                  <div key={i} className="mb-2 text-gray-700">
                    <strong>{ed.degree}</strong>, {ed.school}
                    <p className="text-xs text-gray-500">
                      {ed.startDate} — {ed.endDate}
                    </p>
                  </div>
                ))}
              </ResumePreviewSection>
              <ResumePreviewSection title="Skills">
                <div className="flex flex-wrap gap-2">
                  {resume.skills?.map((s, i) => {
                    const isNew = injectedKeywordsList.some(
                      (kw) => kw.toLowerCase() === s.toLowerCase(),
                    );
                    return (
                      <span
                        key={i}
                        className={`rounded-full px-3 py-1 text-sm font-medium shadow-sm ${
                          isNew
                            ? "bg-yellow-200 text-yellow-800 ring-1 ring-yellow-400"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {s}
                      </span>
                    );
                  })}
                </div>
              </ResumePreviewSection>
              {Array.isArray(resume.volunteering) &&
                resume.volunteering.length > 0 && (
                  <ResumePreviewSection title="Volunteering">
                    {resume.volunteering.map((v, i) => (
                      <div
                        key={i}
                        className="mb-4 border-b border-gray-100 pb-2 last:border-b-0"
                      >
                        <strong className="text-gray-800">{v.role}</strong> @{" "}
                        <em className="text-gray-600">{v.organization}</em>
                        <p className="text-xs text-gray-500">
                          {v.startDate} - {v.endDate}
                        </p>
                        <ul className="ml-6 mt-2 list-disc space-y-1 text-gray-700">
                          {(v.bullets ?? []).map((b, j) => (
                            <li key={j}>
                              {highlightInjected(b, injectedKeywordsList)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </ResumePreviewSection>
                )}
              {Array.isArray(resume.certifications) &&
                resume.certifications.length > 0 && (
                  // {resume.?.length > 0 && (
                  <ResumePreviewSection title="Certifications">
                    {resume.certifications.map((c, i) => (
                      <div key={i} className="mb-2 text-gray-700">
                        <strong>{c.title}</strong>, {c.issuer} ({c.date})
                      </div>
                    ))}
                  </ResumePreviewSection>
                )}
              {Array.isArray(resume.references) &&
                resume.references.length > 0 && (
                  // {resume.?.length > 0 && (
                  <ResumePreviewSection title="References">
                    {resume.references.map((r, i) => (
                      <div key={i} className="mb-2 text-gray-700">
                        <strong>{r.name}</strong>, {r.contact}
                      </div>
                    ))}
                  </ResumePreviewSection>
                )}
            </div>

            {/* Bullet Arena */}
            <div className="border-t border-gray-200/80 pt-6">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-700">
                <span className="text-pink-500">🎯</span> Bullet Point Enhancer
              </h3>
              <div className="rounded-xl border border-gray-200/80 bg-white p-4 shadow-lg sm:p-6">
                <BulletArena
                  bullets={
                    resume.workExperiences?.flatMap(
                      (we) =>
                        we.bullets?.map((b) => b.replace(/^-?\s*/, "")) || [],
                    ) || []
                  }
                  onUpdate={debounce((newBullets: string[]) => {
                    setResume((r) => {
                      let bulletIdx = 0;
                      const updatedWorkExperiences = (
                        r.workExperiences || []
                      ).map((we) => {
                        const currentExperienceBulletCount =
                          we.bullets?.length || 0;
                        const updatedExpBullets = newBullets
                          .slice(
                            bulletIdx,
                            bulletIdx + currentExperienceBulletCount,
                          )
                          .map((b) => b.trim())
                          .filter((b) => b !== "");
                        bulletIdx += currentExperienceBulletCount;
                        return {
                          ...we,
                          bullets: updatedExpBullets.map((b) =>
                            b.startsWith("- ") ? b : `- ${b}`,
                          ),
                        };
                      });
                      return { ...r, workExperiences: updatedWorkExperiences };
                    });
                  }, 500)}
                />
              </div>
            </div>

            <div className="mt-10 flex flex-col items-center justify-between border-t border-gray-200/80 pt-6 sm:flex-row">
              <button onClick={back} className={secondaryButtonClass}>
                <span aria-hidden="true">←</span> Back
              </button>
              <div className="mt-4 flex flex-col gap-3 sm:mt-0 sm:flex-row">
                <button
                  onClick={() => window.print()}
                  className={`${secondaryButtonClass} border-purple-500 text-purple-600 hover:bg-purple-50`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 2.75C5 1.784 5.784 1 6.75 1h6.5c.966 0 1.75.784 1.75 1.75v3.552c.377.046.74.14 1.095.272A.75.75 0 0117 7.249v5.502a.75.75 0 01-.805.727 12.67 12.67 0 00-1.095.272v3.552c0 .966-.784 1.75-1.75 1.75h-6.5A1.75 1.75 0 015 17.25V2.75zm0 4.149V17.25h6.5V14.25a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v3h.75a.75.75 0 00.75-.75V7.25a.75.75 0 00-.75-.75h-.75V3.75a.75.75 0 00-.75-.75h-1.5a.75.75 0 00-.75.75v3.5H6.75A.75.75 0 006 6.75v.149zM9.75 10a.75.75 0 01.75-.75h3a.75.75 0 010 1.5h-3a.75.75 0 01-.75-.75zm0 3a.75.75 0 01.75-.75h3a.75.75 0 010 1.5h-3a.75.75 0 01-.75-.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Print Page
                </button>
                <button
                  onClick={next}
                  className={`${primaryButtonClass} bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 active:bg-purple-800`}
                >
                  Customize Sections & Template{" "}
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </section>
        );

      // case 4: // Customize Sections & Template

      //         return (
      //           <section key={currentStepKey} className={`${sectionCardClass} space-y-8`}>
      //             {!showNarrativeWeaver ? (
      //               <>
      //                 <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-1 flex items-center gap-3">
      //                   <span className="text-teal-500 text-3xl">✨</span> Final Touches & Portfolio Configuration
      //                 </h2>
      //                 <p className="text-sm text-gray-500 mb-6">Finalize your resume sections, choose a template, configure and publish your interactive career portfolio.</p>

      //                 {/* Save Message & Download Button (if PDF was generated previously) */}
      //                 {saveMessage && saveMessage.includes("PDF downloaded successfully!") && (
      //                   <div className="p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm">
      //                     <p className="text-green-800 font-medium">{saveMessage}</p>
      //                     <div className="mt-3 flex gap-3">
      //                       <button
      //                         onClick={downloadResumeViaAPI} // Assumes you have this function
      //                         disabled={pdfGenerating}
      //                         className={`${primaryButtonClass} bg-blue-500 hover:bg-blue-600 focus:ring-blue-500`}
      //                       >
      //                         {pdfGenerating ? ( <> {/* Spinner */} Generating PDF...</> ) : ( <> {/* Download Icon */} Download Again </> )}
      //                       </button>
      //                       <button onClick={() => setSaveMessage(null)} className={secondaryButtonClass}>
      //                         Close
      //                       </button>
      //                     </div>
      //                   </div>
      //                 )}

      //                 {/* Add Section Buttons */}
      //                 <div className="flex flex-wrap gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200/80">
      //                   <h3 className="w-full text-lg font-medium text-gray-700 mb-1">Add Optional Sections to Resume:</h3>
      //                   {(["volunteering", "certifications", "references"] as const).map((type) => (
      //                     <button
      //                       key={type}
      //                       onClick={() => addSection(type)}
      //                       className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md text-sm
      //                         ${
      //                           type === "volunteering"
      //                             ? "bg-green-100 text-green-700 hover:bg-green-200 focus:ring-green-500"
      //                             : type === "certifications"
      //                             ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 focus:ring-yellow-500"
      //                             : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 focus:ring-indigo-500"
      //                         }`}
      //                     >
      //                       + Add {type.charAt(0).toUpperCase() + type.slice(1)}
      //                     </button>
      //                   ))}
      //                 </div>

      //                 {/* Editable Optional Sections - Collapsible Sections */}
      //                 {/* Volunteering */}
      //                 {(resume.volunteering && resume.volunteering.length > 0 || volOpen) && (
      //                   <CollapsibleSection
      //                     title="Volunteering Experience"
      //                     isOpen={volOpen}
      //                     setIsOpen={setVolOpen}
      //                     itemsCount={resume.volunteering?.length}
      //                     accentColor="green"
      //                   >
      //                     {resume.volunteering?.map((v, i) => (
      //                       <div key={`vol-edit-${i}`} className="mb-6 p-5 bg-white border border-gray-200 rounded-lg shadow-sm space-y-4 relative group">
      //                         <div className="flex justify-between items-start">
      //                           <h5 className="text-md font-semibold text-gray-700">Volunteering Role #{i + 1}</h5>
      //                           <button
      //                             className="p-1 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full opacity-60 group-hover:opacity-100 transition-all"
      //                             onClick={() => {
      //                               const arr = [...(resume.volunteering || [])];
      //                               arr.splice(i, 1);
      //                               setResume((r) => ({ ...r, volunteering: arr }));
      //                             }}
      //                             aria-label={`Remove volunteering role ${i + 1}`}
      //                           >
      //                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      //                               <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
      //                               </svg>
      //                           </button>
      //                         </div>
      //                         <input
      //                           className={`${inputBaseClass} focus:ring-green-500 focus:border-green-500`}
      //                           placeholder="Role"
      //                           value={v.role}
      //                           onChange={(e) => {
      //                             const arr = [...(resume.volunteering || [])];
      //                             arr[i].role = e.target.value;
      //                             setResume((r) => ({ ...r, volunteering: arr }));
      //                           }}
      //                         />
      //                         <input
      //                           className={`${inputBaseClass} focus:ring-green-500 focus:border-green-500`}
      //                           placeholder="Organization"
      //                           value={v.organization}
      //                           onChange={(e) => {
      //                             const arr = [...(resume.volunteering || [])];
      //                             arr[i].organization = e.target.value;
      //                             setResume((r) => ({ ...r, volunteering: arr }));
      //                           }}
      //                         />
      //                         <div className="grid grid-cols-2 gap-4">
      //                           <input
      //                             type="text"
      //                             placeholder="Start Date (e.g., Jan 2020)"
      //                             value={v.startDate || ""}
      //                             onChange={(e) => {
      //                               const arr = [...(resume.volunteering || [])];
      //                               arr[i].startDate = e.target.value;
      //                               setResume((r) => ({ ...r, volunteering: arr }));
      //                             }}
      //                             className={`${inputBaseClass} focus:ring-green-500 focus:border-green-500`}
      //                           />
      //                           <input
      //                             type="text"
      //                             placeholder="End Date (e.g., Present)"
      //                             value={v.endDate || ""}
      //                             onChange={(e) => {
      //                               const arr = [...(resume.volunteering || [])];
      //                               arr[i].endDate = e.target.value;
      //                               setResume((r) => ({ ...r, volunteering: arr }));
      //                             }}
      //                             className={`${inputBaseClass} focus:ring-green-500 focus:border-green-500`}
      //                           />
      //                         </div>
      //                         <textarea
      //                           className={`${inputBaseClass} h-28 resize-y focus:ring-green-500 focus:border-green-500`}
      //                           placeholder="Bullets (one per line)"
      //                           value={(resume.volunteering?.[i]?.bullets || [""]).join("\n")}
      //                           onChange={(e) => handleBulletChange(i, e.target.value, "volunteering")}
      //                           onKeyDown={(e) => handleBulletKeyDown(i, e, "volunteering")}
      //                           onBlur={() => formatBulletsOnBlur(i, "volunteering")}
      //                         />
      //                       </div>
      //                     ))}
      //                     {/* Add new button inside if the section is open for it */}
      //                     {volOpen && resume.volunteering?.length === 0 && (
      //                       <button onClick={() => addSection("volunteering")} className={`${primaryButtonClass} bg-green-500 hover:bg-green-600 text-sm mt-2`}>
      //                         + Add First Volunteering Role
      //                       </button>
      //                     )}
      //                   </CollapsibleSection>
      //                 )}

      //                 {/* Certifications */}
      //                 {(resume.certifications && resume.certifications.length > 0 || certOpen) && (
      //                   <CollapsibleSection
      //                     title="Certifications"
      //                     isOpen={certOpen}
      //                     setIsOpen={setCertOpen}
      //                     itemsCount={resume.certifications?.length}
      //                     accentColor="yellow"
      //                   >
      //                     {resume.certifications?.map((c, i) => (
      //                       <div key={`cert-edit-${i}`} className="mb-6 p-5 bg-white border border-gray-200 rounded-lg shadow-sm space-y-4 relative group">
      //                         <div className="flex justify-between items-start">
      //                           <h5 className="text-md font-semibold text-gray-700">Certification #{i + 1}</h5>
      //                           <button
      //                             className="p-1 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full opacity-60 group-hover:opacity-100 transition-all"
      //                             onClick={() => {
      //                               const arr = [...(resume.certifications || [])];
      //                               arr.splice(i, 1);
      //                               setResume((r) => ({ ...r, certifications: arr }));
      //                             }}
      //                             aria-label={`Remove certification ${i + 1}`}
      //                           >
      //                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      //                               <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
      //                             </svg>
      //                           </button>
      //                         </div>
      //                         {["title", "issuer", "date"].map((field) => (
      //                           <input
      //                             key={field}
      //                             className={`${inputBaseClass} focus:ring-yellow-500 focus:border-yellow-500`}
      //                             placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
      //                             value={(c as any)[field] || ""}
      //                             onChange={(e) => {
      //                               const arr = [...(resume.certifications || [])];
      //                               (arr[i] as any)[field] = e.target.value;
      //                               setResume((r) => ({ ...r, certifications: arr }));
      //                             }}
      //                           />
      //                         ))}
      //                       </div>
      //                     ))}
      //                     {certOpen && resume.certifications?.length === 0 && (
      //                       <button onClick={() => addSection("certifications")} className={`${primaryButtonClass} bg-yellow-500 hover:bg-yellow-600 text-sm mt-2`}>
      //                         + Add First Certification
      //                       </button>
      //                     )}
      //                   </CollapsibleSection>
      //                 )}

      //                 {/* References */}
      //                 {(resume.references && resume.references.length > 0 || refOpen) && (
      //                   <CollapsibleSection
      //                     title="References"
      //                     isOpen={refOpen}
      //                     setIsOpen={setRefOpen}
      //                     itemsCount={resume.references?.length}
      //                     accentColor="indigo"
      //                   >
      //                     {resume.references?.map((refItem, i) => (
      //                       <div key={`ref-edit-${i}`} className="mb-6 p-5 bg-white border border-gray-200 rounded-lg shadow-sm space-y-4 relative group">
      //                         <div className="flex justify-between items-start">
      //                           <h5 className="text-md font-semibold text-gray-700">Reference #{i + 1}</h5>
      //                           <button
      //                             className="p-1 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full opacity-60 group-hover:opacity-100 transition-all"
      //                             onClick={() => {
      //                               const arr = [...(resume.references || [])];
      //                               arr.splice(i, 1);
      //                               setResume((r) => ({ ...r, references: arr }));
      //                             }}
      //                             aria-label={`Remove reference ${i + 1}`}
      //                           >
      //                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      //                               <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
      //                             </svg>
      //                           </button>
      //                         </div>
      //                         {["name", "contact"].map((field) => (
      //                           <input
      //                             key={field}
      //                             className={`${inputBaseClass} focus:ring-indigo-500 focus:border-indigo-500`}
      //                             placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
      //                             value={(refItem as any)[field] || ""}
      //                             onChange={(e) => {
      //                               const arr = [...(resume.references || [])];
      //                               (arr[i] as any)[field] = e.target.value;
      //                               setResume((r) => ({ ...r, references: arr }));
      //                             }}
      //                           />
      //                         ))}
      //                       </div>
      //                     ))}
      //                     {refOpen && resume.references?.length === 0 && (
      //                       <button onClick={() => addSection("references")} className={`${primaryButtonClass} bg-indigo-500 hover:bg-indigo-600 text-sm mt-2`}>
      //                         + Add First Reference
      //                       </button>
      //                     )}
      //                   </CollapsibleSection>
      //                 )}
      //                 {/* --- End Optional Sections --- */}

      //                 {/* Template Carousel */}
      //                 <div className="pt-6 border-t border-gray-200/80">
      //                   <h3 className="text-xl font-semibold text-gray-700 mb-1">Choose Your Template</h3>
      //                   <p className="text-sm text-gray-500 mb-4">Select a template that best fits your style and industry.</p>
      //                   <TemplateCarousel selected={selectedTemplate} onSelect={(id) => setSelectedTemplate(id)} />
      //                 </div>

      //                 {/* Living Portfolio Configuration UI */}
      //                 <div className="mt-6 pt-6 border-t border-gray-200 space-y-6 bg-slate-50 p-6 rounded-lg shadow">
      //                   <h3 className="text-xl font-semibold text-gray-800">Configure Your Public Living Portfolio</h3>
      //                   <div>
      //                     <label htmlFor="portfolioTitle" className="block text-sm font-medium text-gray-700">Portfolio Title</label>
      //                     <input
      //                       type="text"
      //                       id="portfolioTitle"
      //                       value={portfolioSettings.title}
      //                       onChange={(e) => handlePortfolioSettingChange('title', 'title', e.target.value)}
      //                       className={`${inputBaseClass} mt-1`}
      //                     />
      //                   </div>
      //                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      //                     <div>
      //                       <label className="block text-sm font-medium text-gray-700">Contact Info Visibility</label>
      //                       {(Object.keys(portfolioSettings.displaySettings.contact) as Array<keyof LivingPortfolioSettings['displaySettings']['contact']>).map(key => (
      //                         <label key={`contact-${key}`} className="mt-1 flex items-center space-x-2 cursor-pointer text-sm">
      //                           <input
      //                             type="checkbox"
      //                             checked={!!portfolioSettings.displaySettings.contact[key]}
      //                             onChange={(e) => handlePortfolioSettingChange('contact', key, e.target.checked)}
      //                             className="h-4 w-4"
      //                           />
      //                           <span>{key.substring(4).replace(/([A-Z])/g, ' $1').trim()}</span>
      //                         </label>
      //                       ))}
      //                     </div>
      //                     <div>
      //                       <label className="block text-sm font-medium text-gray-700">Resume Section Visibility</label>
      //                       {(Object.keys(portfolioSettings.displaySettings.sections) as Array<keyof LivingPortfolioSettings['displaySettings']['sections']>).map(key => (
      //                         <label key={`section-${key}`} className="mt-1 flex items-center space-x-2 cursor-pointer text-sm">
      //                           <input
      //                             type="checkbox"
      //                             checked={!!portfolioSettings.displaySettings.sections[key]}
      //                             onChange={(e) => handlePortfolioSettingChange('sections', key, e.target.checked)}
      //                             className="h-4 w-4"
      //                           />
      //                           <span>{key.substring(4).replace(/([A-Z])/g, ' $1').trim()}</span>
      //                         </label>
      //                       ))}
      //                     </div>
      //                     <div>
      //                       <label className="block text-sm font-medium text-gray-700">AI Narrative Suite Visibility</label>
      //                       {(Object.keys(portfolioSettings.displaySettings.narrativeSuite) as Array<keyof LivingPortfolioSettings['displaySettings']['narrativeSuite']>).map(key => (
      //                         <label key={`narrative-${key}`} className="mt-1 flex items-center space-x-2 cursor-pointer text-sm">
      //                           <input
      //                             type="checkbox"
      //                             checked={!!portfolioSettings.displaySettings.narrativeSuite[key]}
      //                             onChange={(e) => handlePortfolioSettingChange('narrativeSuite', key, e.target.checked)}
      //                             className="h-4 w-4"
      //                           />
      //                           <span>{key.substring(4).replace(/([A-Z])/g, ' $1').trim()}</span>
      //                         </label>
      //                       ))}
      //                     </div>
      //                   </div>
      //                   {aiNarrativeData && aiWhatIfCache.length > 0 && (
      //                     <div>
      //                       <h4 className="text-md font-medium text-gray-700 mt-3">Showcase "What If?" Scenarios:</h4>
      //                       <div className="max-h-40 overflow-y-auto space-y-1.5 p-2 border rounded-md mt-1">
      //                         {aiWhatIfCache.map((whatIfItem, index) => (
      //                           <label key={`whatif-public-${index}`} className="flex items-center space-x-2 cursor-pointer p-1.5 hover:bg-gray-100 text-sm">
      //                             <input
      //                               type="checkbox"
      //                               checked={portfolioSettings.selectedPublicWhatIfs.some(pwi => pwi.scenarioText === whatIfItem.scenarioText)}
      //                               onChange={() => handleToggleWhatIfForPublic(whatIfItem)}
      //                               className="h-4 w-4 text-teal-600"
      //                             />
      //                             <span>"{whatIfItem.scenarioText.substring(0, 50)}..."</span>
      //                           </label>
      //                         ))}
      //                       </div>
      //                     </div>
      //                   )}

      //                   <label className="flex items-center space-x-2 cursor-pointer mt-4">
      //                     <input
      //                       type="checkbox"
      //                       checked={portfolioSettings.isPublic}
      //                       onChange={(e) => handlePortfolioSettingChange('isPublic', 'isPublic', e.target.checked)}
      //                       className="h-4 w-4 text-green-600"
      //                     />
      //                     <span className="text-sm font-medium text-gray-700">Make Portfolio Publicly Shareable</span>
      //                   </label>
      //                 </div>

      //                 {/* Career Narrative Weaver Button */}
      //                 <div className="mt-8 pt-6 border-t border-gray-200/80 text-center">
      //                   <h3 className="text-xl font-semibold text-gray-700 mb-4">
      //                     Elevate Your Story!
      //                   </h3>
      //                   <p className="text-gray-600 mb-4">
      //                     Let our AI help you craft a compelling career narrative that ties everything together.
      //                   </p>
      //                   <button
      //                     onClick={handleNarrativeWeaverClick}
      //                     className={`${primaryButtonClass} bg-purple-600 hover:bg-purple-700 active:bg-purple-800 focus:ring-purple-500`}
      //                   >
      //                     🚀 Launch AI Career Narrative Suite ✨
      //                   </button>
      //                 </div>

      //                 {/* Resume Preview with GenericTemplate */}
      //                 <div id="resumePreviewContent" ref={templateRef} className="mt-8 border-2 border-gray-200/80 rounded-xl overflow-hidden shadow-2xl bg-white">
      //                   <GenericTemplate templateId={selectedTemplate} data={resume as ResumeJSON} />
      //                 </div>

      //                 {/* Navigation and Finalize Buttons */}
      //                 <div className="flex flex-col sm:flex-row justify-between items-center mt-10 pt-6 border-t border-gray-200/80">
      //                   <button onClick={back} className={secondaryButtonClass}>
      //                     <span aria-hidden="true">←</span> Back
      //                   </button>
      //                   <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0">
      //                     <button
      //                       onClick={() => window.print()}
      //                       className={`${secondaryButtonClass} border-purple-500 text-purple-600 hover:bg-purple-50`}
      //                     >
      //                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      //                         <path fillRule="evenodd" d="M5 2.75C5 1.784 5.784 1 6.75 1h6.5c.966 0 1.75.784 1.75 1.75v3.552c.377.046.74.14 1.095.272A.75.75 0 0117 7.249v5.502a.75.75 0 01-.805.727 12.67 12.67 0 00-1.095.272v3.552c0 .966-.784 1.75-1.75 1.75h-6.5A1.75 1.75 0 015 17.25V2.75zm0 4.149V17.25h6.5V14.25a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v3h.75a.75.75 0 00.75-.75V7.25a.75.75 0 00-.75-.75h-.75V3.75a.75.75 0 00-.75-.75h-1.5a.75.75 0 00-.75.75v3.5H6.75A.75.75 0 006 6.75v.149zM9.75 10a.75.75 0 01.75-.75h3a.75.75 0 010 1.5h-3a.75.75 0 01-.75-.75zm0 3a.75.75 0 01.75-.75h3a.75.75 0 010 1.5h-3a.75.75 0 01-.75-.75z" clipRule="evenodd" />
      //                       </svg>
      //                       Print Page
      //                     </button>
      //                     <button
      //                       onClick={async () => {
      //                         // First, save the draft to get its ID
      //                         const draftId = await saveResumeDraft();
      //                         if (draftId) {
      //                             // If draft saved successfully, then proceed with PDF download
      //                             await downloadResumeViaAPI();
      //                         }
      //                       }}
      //                       disabled={loading || pdfGenerating}
      //                       className={`${primaryButtonClass} bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-500`}
      //                     >
      //                       {loading && !pdfGenerating ? "Saving Data..." : pdfGenerating ? "Generating PDF..." : "Save Draft & Download PDF"}
      //                     </button>
      //                     <button
      //                       onClick={publishLivingPortfolio}
      //                       disabled={loading || pdfGenerating}
      //                       className={`${primaryButtonClass} bg-green-600 hover:bg-green-700 active:bg-green-800 focus:ring-green-500`}
      //                     >
      //                       {loading && !pdfGenerating ? "Saving Draft..." : pdfGenerating ? "Publishing..." : "Publish Living Portfolio"}
      //                     </button>
      //                   </div>
      //                 </div>
      //               </>
      //             ) : (
      //               <NarrativeWeaver
      //                 resumeData={resume as ResumeJSON}
      //                 jobDescription={jobDesc}
      //                 onNarrativeUpdate={handleNarrativeSuiteUpdate}
      //                 onClose={() => setShowNarrativeWeaver(false)}
      //               />
      //             )}
      //           </section>
      //         );

      // case 4: // Customize Sections & Template

      // return (
      //   <section key={currentStepKey} className={`${sectionCardClass} space-y-8`}>
      //     {!showNarrativeWeaver ? (
      //       <>
      //         <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-1 flex items-center gap-3">
      //           <span className="text-teal-500 text-3xl">✨</span> Final Touches & AI Narrative
      //         </h2>
      //         <p className="text-sm text-gray-500 mb-6">
      //           Finalize optional resume sections, choose a template for PDF downloads, and generate AI-powered narrative insights.
      //           Once your AI narrative is ready, you can proceed to the Portfolio Editor to customize and publish.
      //         </p>

      //         {/* Message Display Area (for draft saving, PDF generation, etc.) */}
      //         {saveMessage && (
      //           <div className={`p-3 mb-6 rounded-md text-sm font-medium ${saveMessage.toLowerCase().includes("error") ? 'bg-red-100 text-red-700 border-red-300' : 'bg-blue-100 text-blue-700 border-blue-300'}`}>
      //               {saveMessage}
      //           </div>
      //         )}
      //         {/* portfolioPublishedInfo display is REMOVED from here, as publishing happens on another page */}

      //         {/* Add Section Buttons & Editable Optional Sections (Volunteering, Certs, Refs) */}
      //         <div className="flex flex-wrap gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200/80">
      //           <h3 className="w-full text-lg font-medium text-gray-700 mb-1">Add Optional Sections to Resume:</h3>
      //           {(["volunteering", "certifications", "references"] as const).map((type) => (
      //             <button  key={type} onClick={() => addSection(type)} className={`px-5 py-2.5 rounded-lg font-medium ...`}>
      //               + Add {type.charAt(0).toUpperCase() + type.slice(1)}
      //             </button>
      //           ))}
      //         </div>
      //         {/* Your CollapsibleSection components for editing these sections */}
      //         {(resume.volunteering && resume.volunteering.length > 0 || volOpen) && ( <CollapsibleSection title="Edit Volunteering" isOpen={volOpen} setIsOpen={setVolOpen} /* ... */ > {/* ... inputs ... */} </CollapsibleSection> )}
      //         {/* ... other collapsible sections ... */}

      //         {/* Template Carousel for PDF */}
      //         <div className="pt-6 border-t border-gray-200/80">
      //           <h3 className="text-xl font-semibold text-gray-700 mb-1">Choose PDF Template</h3>
      //           <TemplateCarousel selected={selectedTemplate} onSelect={(id) => setSelectedTemplate(id)} />
      //         </div>

      //         {/* Career Narrative Weaver Button */}
      //         <div className="mt-8 pt-6 border-t border-gray-200/80 text-center">
      //           <h3 className="text-xl font-semibold text-gray-700 mb-4">
      //             Elevate Your Story! (Required for Portfolio)
      //           </h3>
      //           <p className="text-gray-600 mb-4">
      //             Launch the AI suite to craft a compelling career narrative. This is essential before customizing your Living Portfolio.
      //           </p>
      //           <button
      //             onClick={handleNarrativeWeaverClick}
      //             className={`${primaryButtonClass} bg-purple-600 hover:bg-purple-700 active:bg-purple-800 focus:ring-purple-500`}
      //           >
      //             🚀 Launch AI Career Narrative Suite ✨
      //           </button>
      //         </div>

      //         {/* Display generated AI Narrative Data if available (optional preview) */}
      //         {aiNarrativeData && (
      //             <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
      //                 <h4 className="text-lg font-medium text-indigo-700">AI Narrative Generated:</h4>
      //                 <p className="text-sm text-indigo-600 italic mt-1 truncate">"{aiNarrativeData.careerNarrative?.substring(0, 100)}..."</p>
      //                 <p className="text-sm text-indigo-600 italic mt-1">Golden Thread: "{aiNarrativeData.goldenThread}"</p>
      //                 <button onClick={() => setShowNarrativeWeaver(true)} className="text-xs text-indigo-500 hover:underline mt-2">Revisit Full AI Suite</button>
      //             </div>
      //         )}

      //         {/* Resume Preview with GenericTemplate (for PDF) */}
      //         <div id="resumePreviewContent" ref={templateRef} className="mt-8 border-2 border-gray-200/80 rounded-xl overflow-hidden shadow-2xl bg-white">
      //           <GenericTemplate templateId={selectedTemplate} data={resume as ResumeJSON} />
      //         </div>

      //         {/* Navigation and Finalize Buttons */}
      //         <div className="flex flex-col sm:flex-row justify-between items-center mt-10 pt-6 border-t border-gray-200/80">
      //           <button onClick={back} className={secondaryButtonClass}>
      //             <span aria-hidden="true">←</span> Back
      //           </button>
      //           <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0">
      //             <button onClick={() => window.print()} className={`${secondaryButtonClass} ...`}> {/* ... Print Icon ... */} Print Page </button>
      //             <button
      //               onClick={async () => {
      //                 if (draftSaving || pdfGenerating || loading) return;
      //                 setLoading(true); // General loading for this composite action
      //                 const draftId = await saveResumeDraft();
      //                 if (draftId) await downloadResumeViaAPI();
      //                 setLoading(false);
      //               }}
      //               disabled={draftSaving || pdfGenerating || loading}
      //               className={`${primaryButtonClass} bg-blue-600 ...`}
      //             >
      //               {draftSaving ? "Saving..." : pdfGenerating ? "Generating PDF..." : loading ? "Processing..." : "Save Draft & Download PDF"}
      //             </button>
      //             <button
      //               onClick={handleProceedToPortfolioEditor}
      //               disabled={loading || draftSaving || !aiNarrativeData}
      //               className={`${primaryButtonClass} bg-green-600 hover:bg-green-700 ...`}
      //               title={!aiNarrativeData ? "Please generate AI Narrative first" : "Customize & Publish Your Portfolio"}
      //             >
      //               {loading || draftSaving ? "Processing..." : "Customize & Publish Portfolio"}  <span aria-hidden="true">→</span>
      //             </button>
      //           </div>
      //         </div>
      //       </>
      //     ) : ( // showNarrativeWeaver is true
      //       <NarrativeWeaver
      //         resumeData={resume as ResumeJSON}
      //         jobDescription={jobDesc}
      //         resumeDraftId={resumeDraftId} // Pass current draft ID
      //         onNarrativeUpdate={handleNarrativeSuiteUpdate}
      //         onClose={() => {
      //             setShowNarrativeWeaver(false);
      //             // After NarrativeWeaver closes, re-check if AI data is available
      //             // The button to proceed to portfolio customization will enable/disable based on aiNarrativeData
      //         }}
      //       />
      //     )}
      //   </section>
      // );
      // default:
      // return null;
      // }
      // };

      case 4: // Finalize Resume, AI Narrative, and Proceed to Portfolio Editor
        return (
          <section
            key={currentStepKey}
            className={`${sectionCardClass} space-y-8`}
          >
            {!showNarrativeWeaver ? (
              <>
                <h2 className="mb-1 flex items-center gap-3 text-2xl font-semibold text-gray-800 sm:text-3xl">
                  <span className="text-3xl text-teal-500">✨</span> Finalize
                  Resume & Generate AI Narrative
                </h2>
                <p className="mb-6 text-sm text-gray-500">
                  Review and finalize any optional resume sections and choose
                  your preferred template for PDF downloads. Then, launch the AI
                  suite to generate your career narrative. Once your narrative
                  is ready, you&apos;ll save this complete draft and proceed to
                  the Portfolio Editor to customize and publish your Living
                  Portfolio.
                </p>

                {/* Message Display Area (for draft saving, PDF generation errors, etc.) */}
                {saveMessage && (
                  <div
                    className={`mb-6 rounded-md p-3 text-sm font-medium ${saveMessage.toLowerCase().includes("error") ? "border-red-300 bg-red-100 text-red-700" : "border-blue-300 bg-blue-100 text-blue-700"}`}
                  >
                    {saveMessage}
                  </div>
                )}
                {/* portfolioPublishedInfo display is REMOVED - publishing happens on portfolio-editor page */}

                {/* Add Section Buttons */}
                <div className="flex flex-wrap gap-3 rounded-lg border border-gray-200/80 bg-gray-50 p-4">
                  <h3 className="mb-1 w-full text-lg font-medium text-gray-700">
                    Add Optional Sections to Resume:
                  </h3>
                  {(
                    ["volunteering", "certifications", "references"] as const
                  ).map((type) => (
                    <button
                      key={type}
                      onClick={() => addSection(type)}
                      className={`rounded-lg px-5 py-2.5 text-sm font-medium shadow-sm transition-all duration-200 hover:shadow-md ${
                        type === "volunteering"
                          ? "bg-green-100 text-green-700 hover:bg-green-200 focus:ring-green-500"
                          : type === "certifications"
                            ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 focus:ring-yellow-500"
                            : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 focus:ring-indigo-500"
                      }`}
                    >
                      + Add {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Editable Optional Sections - Collapsible Sections */}
                {/* Volunteering */}
                {((resume.volunteering && resume.volunteering.length > 0) ||
                  volOpen) && (
                  <CollapsibleSection
                    title="Volunteering Experience"
                    isOpen={volOpen}
                    setIsOpen={setVolOpen}
                    itemsCount={resume.volunteering?.length}
                    accentColor="green"
                  >
                    {resume.volunteering?.map((v, i) => (
                      <div
                        key={`vol-edit-${i}`}
                        className="group relative mb-6 space-y-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
                      >
                        <div className="flex items-start justify-between">
                          <h5 className="text-md font-semibold text-gray-700">
                            Volunteering Role #{i + 1}
                          </h5>
                          <button
                            className="rounded-full p-1 text-red-500 opacity-60 transition-all hover:bg-red-100 hover:text-red-700 group-hover:opacity-100"
                            onClick={() => {
                              const arr = [...(resume.volunteering || [])];
                              arr.splice(i, 1);
                              setResume((r) => ({ ...r, volunteering: arr }));
                            }}
                            aria-label={`Remove volunteering role ${i + 1}`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="h-5 w-5"
                            >
                              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                            </svg>
                          </button>
                        </div>
                        <input
                          className={`${inputBaseClass} focus:border-green-500 focus:ring-green-500`}
                          placeholder="Role"
                          value={v.role}
                          onChange={(e) => {
                            const arr = [...(resume.volunteering || [])];
                            arr[i].role = e.target.value;
                            setResume((r) => ({ ...r, volunteering: arr }));
                          }}
                        />
                        <input
                          className={`${inputBaseClass} focus:border-green-500 focus:ring-green-500`}
                          placeholder="Organization"
                          value={v.organization}
                          onChange={(e) => {
                            const arr = [...(resume.volunteering || [])];
                            arr[i].organization = e.target.value;
                            setResume((r) => ({ ...r, volunteering: arr }));
                          }}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="Start Date (e.g., Jan 2020)"
                            value={v.startDate || ""}
                            onChange={(e) => {
                              const arr = [...(resume.volunteering || [])];
                              arr[i].startDate = e.target.value;
                              setResume((r) => ({ ...r, volunteering: arr }));
                            }}
                            className={`${inputBaseClass} focus:border-green-500 focus:ring-green-500`}
                          />
                          <input
                            type="text"
                            placeholder="End Date (e.g., Present)"
                            value={v.endDate || ""}
                            onChange={(e) => {
                              const arr = [...(resume.volunteering || [])];
                              arr[i].endDate = e.target.value;
                              setResume((r) => ({ ...r, volunteering: arr }));
                            }}
                            className={`${inputBaseClass} focus:border-green-500 focus:ring-green-500`}
                          />
                        </div>
                        <textarea
                          className={`${inputBaseClass} h-28 resize-y focus:border-green-500 focus:ring-green-500`}
                          placeholder="Bullets (one per line)"
                          value={(
                            resume.volunteering?.[i]?.bullets || [""]
                          ).join("\n")}
                          onChange={(e) =>
                            handleBulletChange(
                              i,
                              e.target.value,
                              "volunteering",
                            )
                          }
                          onKeyDown={(e) =>
                            handleBulletKeyDown(i, e, "volunteering")
                          }
                          onBlur={() => formatBulletsOnBlur(i, "volunteering")}
                        />
                      </div>
                    ))}
                    {volOpen && resume.volunteering?.length === 0 && (
                      <button
                        onClick={() => addSection("volunteering")}
                        className={`${primaryButtonClass} mt-2 bg-green-500 text-sm hover:bg-green-600`}
                      >
                        + Add First Volunteering Role
                      </button>
                    )}
                  </CollapsibleSection>
                )}

                {/* Certifications */}
                {((resume.certifications && resume.certifications.length > 0) ||
                  certOpen) && (
                  <CollapsibleSection
                    title="Certifications"
                    isOpen={certOpen}
                    setIsOpen={setCertOpen}
                    itemsCount={resume.certifications?.length}
                    accentColor="yellow"
                  >
                    {resume.certifications?.map((c, i) => (
                      <div
                        key={`cert-edit-${i}`}
                        className="group relative mb-6 space-y-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
                      >
                        <div className="flex items-start justify-between">
                          <h5 className="text-md font-semibold text-gray-700">
                            Certification #{i + 1}
                          </h5>
                          <button
                            className="rounded-full p-1 text-red-500 opacity-60 transition-all hover:bg-red-100 hover:text-red-700 group-hover:opacity-100"
                            onClick={() => {
                              const arr = [...(resume.certifications || [])];
                              arr.splice(i, 1);
                              setResume((r) => ({ ...r, certifications: arr }));
                            }}
                            aria-label={`Remove certification ${i + 1}`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="h-5 w-5"
                            >
                              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                            </svg>
                          </button>
                        </div>
                        {/* {["title", "issuer", "date"].map((field) => (
                          <input
                            key={field}
                            className={`${inputBaseClass} focus:border-yellow-500 focus:ring-yellow-500`}
                            placeholder={
                              field.charAt(0).toUpperCase() + field.slice(1)
                            }
                            value={(c as any)[field] || ""}
                            onChange={(e) => {
                              const arr = [...(resume.certifications || [])];
                              (arr[i] as any)[field] = e.target.value;
                              setResume((r) => ({ ...r, certifications: arr }));
                            }}
                          />
                        ))} */}
                        {(["title", "issuer", "date"] as const).map((field) => (
                          <input
                            key={field}
                            className={`${inputBaseClass} focus:border-yellow-500 focus:ring-yellow-500`}
                            placeholder={
                              field.charAt(0).toUpperCase() + field.slice(1)
                            }
                            value={c[field] || ""}
                            onChange={(e) => {
                              const arr = [...(resume.certifications || [])];
                              arr[i] = { ...arr[i], [field]: e.target.value };
                              setResume((r) => ({ ...r, certifications: arr }));
                            }}
                          />
                        ))}
                      </div>
                    ))}
                    {certOpen && resume.certifications?.length === 0 && (
                      <button
                        onClick={() => addSection("certifications")}
                        className={`${primaryButtonClass} mt-2 bg-yellow-500 text-sm hover:bg-yellow-600`}
                      >
                        + Add First Certification
                      </button>
                    )}
                  </CollapsibleSection>
                )}

                {/* References */}
                {((resume.references && resume.references.length > 0) ||
                  refOpen) && (
                  <CollapsibleSection
                    title="References"
                    isOpen={refOpen}
                    setIsOpen={setRefOpen}
                    itemsCount={resume.references?.length}
                    accentColor="indigo"
                  >
                    {resume.references?.map((refItem, i) => (
                      <div
                        key={`ref-edit-${i}`}
                        className="group relative mb-6 space-y-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
                      >
                        <div className="flex items-start justify-between">
                          <h5 className="text-md font-semibold text-gray-700">
                            Reference #{i + 1}
                          </h5>
                          <button
                            className="rounded-full p-1 text-red-500 opacity-60 transition-all hover:bg-red-100 hover:text-red-700 group-hover:opacity-100"
                            onClick={() => {
                              const arr = [...(resume.references || [])];
                              arr.splice(i, 1);
                              setResume((r) => ({ ...r, references: arr }));
                            }}
                            aria-label={`Remove reference ${i + 1}`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="h-5 w-5"
                            >
                              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                            </svg>
                          </button>
                        </div>
                        {/* {["name", "contact"].map((field) => (
                          <input
                            key={field}
                            className={`${inputBaseClass} focus:border-indigo-500 focus:ring-indigo-500`}
                            placeholder={
                              field.charAt(0).toUpperCase() + field.slice(1)
                            }
                            value={(refItem as any)[field] || ""}
                            onChange={(e) => {
                              const arr = [...(resume.references || [])];
                              (arr[i] as any)[field] = e.target.value;
                              setResume((r) => ({ ...r, references: arr }));
                            }}
                          />
                        ))} */}
                        {(["name", "contact"] as const).map((field) => (
                          <input
                            key={field}
                            type="text"
                            placeholder={field}
                            value={resume.references?.[i]?.[field] || ""}
                            onChange={(e) => {
                              const arr = [...(resume.references || [])];
                              arr[i] = { ...arr[i], [field]: e.target.value };
                              setResume((r) => ({ ...r, references: arr }));
                            }}
                          />
                        ))}
                      </div>
                    ))}
                    {refOpen && resume.references?.length === 0 && (
                      <button
                        onClick={() => addSection("references")}
                        className={`${primaryButtonClass} mt-2 bg-indigo-500 text-sm hover:bg-indigo-600`}
                      >
                        + Add First Reference
                      </button>
                    )}
                  </CollapsibleSection>
                )}
                {/* --- End Optional Sections --- */}

                {/* Template Carousel for PDF */}
                <div className="border-t border-gray-200/80 pt-6">
                  <h3 className="mb-1 text-xl font-semibold text-gray-700">
                    Choose PDF Template
                  </h3>
                  <p className="mb-4 text-sm text-gray-500">
                    Select a template for your PDF resume downloads.
                  </p>
                  <TemplateCarousel
                    selected={selectedTemplate}
                    onSelect={(id) => setSelectedTemplate(id)}
                  />
                </div>

                {/* Career Narrative Weaver Button */}
                <div className="mt-8 border-t border-gray-200/80 pt-6 text-center">
                  <h3 className="mb-4 text-xl font-semibold text-gray-700">
                    Elevate Your Story! (Required for Portfolio)
                  </h3>
                  <p className="mb-4 text-gray-600">
                    Launch the AI suite to craft a compelling career narrative.
                    This is essential before customizing your Living Portfolio.
                  </p>
                  <button
                    onClick={handleNarrativeWeaverClick} // This sets showNarrativeWeaver to true
                    className={`${primaryButtonClass} bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 active:bg-purple-800`}
                  >
                    🚀 Launch AI Career Narrative Suite ✨
                  </button>
                </div>

                {/* Display generated AI Narrative Data if available (optional preview) */}
                {aiNarrativeData && (
                  <div className="mt-6 rounded-lg border border-indigo-200 bg-indigo-50 p-4 shadow">
                    <h4 className="text-lg font-medium text-indigo-700">
                      AI Narrative Generated:
                    </h4>
                    <p className="mt-1 text-sm italic text-indigo-600">
                      <strong>Narrative:</strong> &quot;
                      {aiNarrativeData.careerNarrative?.substring(0, 120)}
                      ...&quot;
                    </p>
                    <p className="mt-1 text-sm italic text-indigo-600">
                      <strong>Golden Thread:</strong> &quot;
                      {aiNarrativeData.goldenThread}&quot;
                    </p>
                    <button
                      onClick={() => setShowNarrativeWeaver(true)} // Re-open the weaver
                      className="mt-3 text-xs font-medium text-indigo-600 underline hover:text-indigo-800"
                    >
                      Revisit Full AI Suite & Insights
                    </button>
                  </div>
                )}

                {/* Resume Preview with GenericTemplate (for PDF) */}
                <div
                  id="resumePreviewContent"
                  ref={templateRef}
                  className="mt-8 overflow-hidden rounded-xl border-2 border-gray-200/80 bg-white shadow-2xl"
                >
                  <GenericTemplate
                    templateId={selectedTemplate}
                    data={resume as ResumeJSON}
                  />
                </div>

                {/* Navigation and Finalize Buttons */}
                <div className="mt-10 flex flex-col items-center justify-between border-t border-gray-200/80 pt-6 sm:flex-row">
                  <button onClick={back} className={secondaryButtonClass}>
                    <span aria-hidden="true">←</span> Back
                  </button>
                  <div className="mt-4 flex flex-col gap-3 sm:mt-0 sm:flex-row">
                    {/* <button
                      onClick={() => window.print()}
                      className={`${secondaryButtonClass} border-purple-500 text-purple-600 hover:bg-purple-50`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 2.75C5 1.784 5.784 1 6.75 1h6.5c.966 0 1.75.784 1.75 1.75v3.552c.377.046.74.14 1.095.272A.75.75 0 0117 7.249v5.502a.75.75 0 01-.805.727 12.67 12.67 0 00-1.095.272v3.552c0 .966-.784 1.75-1.75 1.75h-6.5A1.75 1.75 0 015 17.25V2.75zm0 4.149V17.25h6.5V14.25a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v3h.75a.75.75 0 00.75-.75V7.25a.75.75 0 00-.75-.75h-.75V3.75a.75.75 0 00-.75-.75h-1.5a.75.75 0 00-.75.75v3.5H6.75A.75.75 0 006 6.75v.149zM9.75 10a.75.75 0 01.75-.75h3a.75.75 0 010 1.5h-3a.75.75 0 01-.75-.75zm0 3a.75.75 0 01.75-.75h3a.75.75 0 010 1.5h-3a.75.75 0 01-.75-.75z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Print Page
                    </button> */}
                    <a
                      href="/cover-letter"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button
                        // onClick={() => router.push('/cover-letter')}
                        className={`${secondaryButtonClass} border-purple-500 text-purple-600 hover:bg-purple-50`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 2.75C5 1.784 5.784 1 6.75 1h6.5c.966 0 1.75.784 1.75 1.75v3.552c.377.046.74.14 1.095.272A.75.75 0 0117 7.249v5.502a.75.75 0 01-.805.727 12.67 12.67 0 00-1.095.272v3.552c0 .966-.784 1.75-1.75 1.75h-6.5A1.75 1.75 0 015 17.25V2.75zm0 4.149V17.25h6.5V14.25a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v3h.75a.75.75 0 00.75-.75V7.25a.75.75 0 00-.75-.75h-.75V3.75a.75.75 0 00-.75-.75h-1.5a.75.75 0 00-.75.75v3.5H6.75A.75.75 0 006 6.75v.149zM9.75 10a.75.75 0 01.75-.75h3a.75.75 0 010 1.5h-3a.75.75 0 01-.75-.75zm0 3a.75.75 0 01.75-.75h3a.75.75 0 010 1.5h-3a.75.75 0 01-.75-.75z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Generate Cover Letter
                      </button>
                    </a>

                    <button
                      onClick={async () => {
                        if (draftSaving || pdfGenerating || loading) return;
                        setLoading(true);
                        const draftId = await saveResumeDraft();
                        if (draftId) await downloadResumeViaAPI();
                        setLoading(false);
                      }}
                      disabled={draftSaving || pdfGenerating || loading}
                      className={`${primaryButtonClass} bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 active:bg-blue-800`}
                    >
                      {draftSaving
                        ? "Saving..."
                        : pdfGenerating
                          ? "Generating PDF..."
                          : loading
                            ? "Processing..."
                            : "Save Draft & Download PDF"}
                    </button>
                    <button
                      onClick={handleProceedToPortfolioEditor} // Changed action
                      disabled={loading || draftSaving || !aiNarrativeData} // Main condition is AI data
                      className={`${primaryButtonClass} bg-green-600 hover:bg-green-700 focus:ring-green-500 active:bg-green-800`}
                      title={
                        !aiNarrativeData
                          ? "Please generate AI Narrative first to proceed"
                          : "Save Draft & Go to Portfolio Editor"
                      }
                    >
                      {loading || draftSaving
                        ? "Processing..."
                        : "Proceed to Portfolio Editor"}{" "}
                      <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              // showNarrativeWeaver is true
              <NarrativeWeaver
                resumeData={resume as ResumeJSON}
                jobDescription={jobDesc}
                resumeDraftId={resumeDraftId}
                onNarrativeUpdate={handleNarrativeSuiteUpdate}
                onClose={() => {
                  setShowNarrativeWeaver(false);
                }}
              />
            )}
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto min-h-screen w-full max-w-5xl bg-slate-100 p-4 font-sans sm:p-6">
      <header className="my-8 text-center sm:my-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-800 sm:text-5xl">
          Resume <span className="text-blue-600">Wizard</span> Pro
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600">
          Craft your perfect resume with our intelligent, step-by-step guide.
        </p>
      </header>
      <ProgressBar step={step} />
      <main className="mt-8 sm:mt-10">{renderStepContent()}</main>
      <footer className="mt-10 border-t border-gray-200 py-10 text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Resume Wizard Pro. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

// Enhanced ProgressBar Component
function ProgressBar({ step }: { step: number }) {
  const labels = ["Info", "Import", "Tailor", "Review", "Customize"];
  const icons = ["👤", "📄", "🎯", "🚀", "✨"];

  return (
    <div className="mb-10 flex items-center justify-center rounded-xl bg-white p-4 shadow-lg sm:mb-12 sm:p-5">
      <div className="flex items-center overflow-x-auto p-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {labels.map((label, i) => (
          <React.Fragment key={i}>
            <div className="mx-1 flex flex-col items-center text-center sm:mx-2">
              <div
                className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 text-lg font-bold transition-all duration-500 ease-in-out sm:h-12 sm:w-12 sm:text-xl ${i === step ? "scale-110 border-blue-700 bg-blue-600 text-white shadow-lg" : i < step ? "border-green-600 bg-green-500 text-white" : "border-gray-300 bg-gray-200 text-gray-500"}`}
              >
                {i < step ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5 sm:h-6 sm:w-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  icons[i]
                )}
              </div>
              <div
                className={`mt-2.5 whitespace-nowrap text-xs font-medium transition-all duration-300 sm:text-sm ${i === step ? "text-blue-600" : i < step ? "text-green-600" : "text-gray-500"}`}
              >
                {label}
              </div>
            </div>
            {i < labels.length - 1 && (
              <div
                className={`mx-1 h-1.5 w-8 flex-auto rounded-full transition-colors duration-500 ease-in-out sm:mx-2 sm:w-12 md:w-16 lg:w-20 ${i < step ? "bg-green-500" : "bg-gray-200"}`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// Helper for Collapsible Sections (Accordion-like)
interface CollapsibleSectionProps {
  title: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
  itemsCount?: number;
  accentColor?: "blue" | "green" | "yellow" | "purple" | "indigo" | "pink";
}

function CollapsibleSection({
  title,
  isOpen,
  setIsOpen,
  children,
  itemsCount,
  accentColor = "blue",
}: CollapsibleSectionProps) {
  const accentColors = {
    blue: "border-blue-500 hover:bg-blue-50 text-blue-700 focus:ring-blue-400",
    green:
      "border-green-500 hover:bg-green-50 text-green-700 focus:ring-green-400",
    yellow:
      "border-yellow-500 hover:bg-yellow-50 text-yellow-700 focus:ring-yellow-400",
    purple:
      "border-purple-500 hover:bg-purple-50 text-purple-700 focus:ring-purple-400",
    indigo:
      "border-indigo-500 hover:bg-indigo-50 text-indigo-700 focus:ring-indigo-400",
    pink: "border-pink-500 hover:bg-pink-50 text-pink-700 focus:ring-pink-400",
  };
  const currentAccent = accentColors[accentColor] || accentColors.blue;

  return (
    <div
      className={`border ${isOpen ? `border-${accentColor}-300 shadow-lg` : "border-gray-200/80"} overflow-hidden rounded-xl bg-white transition-all duration-300`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full items-center justify-between p-4 text-left text-lg font-semibold sm:p-5 ${currentAccent} rounded-t-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1`}
        aria-expanded={isOpen}
      >
        <span>
          {title}
          {itemsCount !== undefined &&
            itemsCount > 0 && ( // Only show count if > 0
              <span
                className={`ml-2 rounded-full px-2 py-0.5 text-sm font-normal bg-${accentColor}-100 text-${accentColor}-700`}
              >
                {itemsCount} item(s)
              </span>
            )}
        </span>
        <svg
          className={`h-6 w-6 transform transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {/* Conditionally render children only if isOpen to potentially improve performance if sections are complex */}
      {isOpen && (
        <div className="animate-fadeIn border-t border-gray-200/60 bg-slate-50/30 p-4 sm:p-5">
          {children}
        </div>
      )}
    </div>
  );
}

// Helper for Resume Preview Sections
function ResumePreviewSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-6 rounded-lg border border-gray-200/70 bg-gray-50 p-4 shadow-sm">
      <h4 className="mb-2 border-b border-gray-200 pb-2 text-lg font-semibold text-gray-700">
        {title}
      </h4>
      {children}
    </section>
  );
}
