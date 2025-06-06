"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ResumeJSON } from "./ATSScore"; // Adjust path as needed
// Example icons from lucide-react (ensure you have it installed: npm install lucide-react)
import { debounce } from "lodash";

import {
  // Lightbulb,
  Zap,
  BookOpen,
  // MessageCircle,
  Target,
  Brain,
  Link2,
  RefreshCw,
  Search,
  Edit3,
  Wand2,
  Sparkles,
  // Palette,
} from "lucide-react";

// --- EXPORTED INTERFACES ---
export interface GoldenThreadEvidence {
  section: string;
  itemId?: string;
  bulletIndex?: number;
  skillName?: string;
  textSnippet: string;
  elementId?: string;
  x?: number;
  y?: number;
}

export interface WeavingSuggestion {
  type:
    | "coverLetterOpening"
    | "linkedInAbout"
    | "interviewSTAR"
    | "resumeSummaryUpdate"
    | "generalTip";
  suggestionText: string;
  exampleSnippet?: string;
}

export interface InitialNarrativeResult {
  careerNarrative: string;
  goldenThread: string;
  goldenThreadEvidence: GoldenThreadEvidence[];
  keyThemes: Array<{ theme: string; evidence: string }>;
  hiddenGemsTeaser: string;
  weavingSuggestions: WeavingSuggestion[];
  whatIfStarters: string[];
}

export interface WhatIfResult {
  adaptedNarrative: string;
  keyTransferableSkills: string[];
  pivotPoints: string[];
}

export interface HiddenGem {
  gem: string;
  reasoning: string;
  suggestion: string;
}
export interface HiddenGemsResult {
  hiddenGems: HiddenGem[];
}
// --- END EXPORTED INTERFACES ---

interface NarrativeWeaverProps {
  resumeData: ResumeJSON;
  jobDescription?: string;
  onClose: () => void;
  onNarrativeUpdate: (data: {
    initialNarrative?: InitialNarrativeResult;
    whatIfs?: Array<{ scenarioText: string; result: WhatIfResult }>;
    hiddenGems?: HiddenGemsResult;
  }) => void;
  resumeDraftId?: string | null;
}

const initialSocraticQuestions: {
  id: string;
  questionText: string;
  placeholder: string;
}[] = [
  {
    id: "q1",
    questionText:
      "Reflecting on your experiences, what single achievement are you most proud of and why was it significant?",
    placeholder:
      "e.g., 'Successfully launched Product X, exceeding targets by 20%...'",
  },
  {
    id: "q2",
    questionText:
      "What underlying passion or core value seems to be a common thread in your most impactful roles or projects?",
    placeholder:
      "e.g., 'A deep commitment to user-centric design and innovation...'",
  },
  {
    id: "q3",
    questionText:
      "If you had to describe your unique professional approach or 'superpower' in one sentence, what would it be?",
    placeholder:
      "e.g., 'My ability to translate complex data into actionable strategies...'",
  },
  {
    id: "q4",
    questionText:
      "Looking ahead, what kind of problems genuinely excite you to solve, irrespective of job titles?",
    placeholder:
      "e.g., 'Tackling challenges in sustainable technology or leveraging AI for social good...'",
  },
];

// --- HELPER COMPONENTS ---
const NarrativeSection: React.FC<{
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  titleColor?: string;
  bgColor?: string;
  borderColor?: string;
  titleSize?: string;
}> = ({
  title,
  children,
  icon,
  titleColor = "text-gray-800",
  bgColor = "bg-white/70",
  borderColor = "border-gray-300/50",
  titleSize = "text-lg sm:text-xl",
}) => (
  <div
    className={`p-4 sm:p-5 ${bgColor} rounded-xl border shadow-lg backdrop-blur-sm ${borderColor}`}
  >
    <h3
      className={`${titleSize} font-semibold ${titleColor} mb-2.5 flex items-center`}
    >
      {icon && <span className="mr-2.5 text-xl opacity-70">{icon}</span>}
      {title}
    </h3>
    <div className="space-y-2 text-sm leading-relaxed text-gray-700">
      {children}
    </div>
  </div>
);

const WeavingLoader: React.FC = () => (
  <div className="flex flex-col items-center justify-center space-y-3">
    <svg
      width="56"
      height="56"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto"
    >
      <g fill="none" strokeWidth="6">
        <circle cx="50" cy="50" r="44" stroke="#E9D5FF" strokeOpacity="0.5" />{" "}
        {/* Lighter purple track */}
        <path
          d="M50 6 A44 44 0 0 1 94 50"
          stroke="#A855F7"
          strokeLinecap="round"
        >
          {" "}
          {/* Darker purple arc */}
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur="1s"
            repeatCount="indefinite"
          />
        </path>
      </g>
    </svg>
    {/* <Sparkles className="w-8 h-8 text-purple-500 animate-pulse" /> */}
  </div>
);

const generateElementId = (
  section: string,
  itemIdentifier?: string | number,
  bulletIndex?: number,
  skillName?: string,
): string => {
  let base = section.replace(/\s+/g, "-").toLowerCase();
  if (itemIdentifier !== undefined) {
    base += `-${String(itemIdentifier)
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-")
      .toLowerCase()}`;
  }
  if (bulletIndex !== undefined) {
    base += `-bullet-${bulletIndex}`;
  }
  if (skillName) {
    base += `-skill-${skillName.replace(/\s+/g, "-").toLowerCase()}`;
  }
  return base || `el-${Math.random().toString(36).substring(2, 9)}`;
};

// --- MAIN COMPONENT ---
export default function NarrativeWeaver({
  resumeData,
  jobDescription,
  onClose,
  onNarrativeUpdate,
}: NarrativeWeaverProps) {
  const [socraticAnswers, setSocraticAnswers] = useState<
    Record<string, string>
  >({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [, setInternalWhatIfCache] = useState<
    Array<{ scenarioText: string; result: WhatIfResult }>
  >([]);

  const [currentInitialNarrative, setCurrentInitialNarrative] =
    useState<InitialNarrativeResult | null>(null);
  const [whatIfInput, setWhatIfInput] = useState("");
  const [currentWhatIfScenario, setCurrentWhatIfScenario] = useState("");
  const [currentWhatIfResult, setCurrentWhatIfResult] =
    useState<WhatIfResult | null>(null);
  const [currentHiddenGemsResult, setCurrentHiddenGemsResult] =
    useState<HiddenGemsResult | null>(null);

  const [view, setView] = useState<"socratic" | "results">("socratic");
  const [elementPositions, setElementPositions] = useState<
    Record<string, { x: number; y: number }>
  >({});
  const resumeDisplayRef = useRef<HTMLDivElement>(null);

  const [showEditorModal, setShowEditorModal] = useState(false);
  const [editorContent, setEditorContent] = useState({
    title: "",
    initialText: "",
  });

  // Process the API response for initial narrative and set up element IDs
  const processAndSetInitialNarrativeForDisplay = (
    data: InitialNarrativeResult,
  ) => {
    const processedData = { ...data };
    if (data.goldenThreadEvidence) {
      processedData.goldenThreadEvidence = data.goldenThreadEvidence.map(
        (ev, index) => ({
          ...ev,
          // Construct a more robust itemId from the actual data if AI doesn't provide it perfectly
          itemId:
            ev.itemId ||
            (ev.section === "workExperience"
              ? `${resumeData.workExperiences?.[index]?.company || "company"}_${resumeData.workExperiences?.[index]?.position || "position"}`
              : ev.section === "education"
                ? `${resumeData.educations?.[index]?.school || "school"}_${resumeData.educations?.[index]?.degree || "degree"}`
                : ev.skillName || `item-${index}`),
          elementId: generateElementId(
            ev.section,
            ev.itemId || `item-${index}`,
            ev.bulletIndex,
            ev.skillName,
          ),
        }),
      );
    }
    setCurrentInitialNarrative(processedData);
  };

  // Calculate positions for the Golden Thread visualizer
  useEffect(() => {
    if (
      view === "results" &&
      currentInitialNarrative?.goldenThreadEvidence &&
      resumeDisplayRef.current
    ) {
      const newPositions: Record<string, { x: number; y: number }> = {};
      const containerRect = resumeDisplayRef.current.getBoundingClientRect();

      currentInitialNarrative.goldenThreadEvidence.forEach((evidence) => {
        if (evidence.elementId) {
          const elem = document.getElementById(evidence.elementId);
          if (elem) {
            const rect = elem.getBoundingClientRect();
            newPositions[evidence.elementId] = {
              x: rect.left - containerRect.left + rect.width / 2,
              y: rect.top - containerRect.top + rect.height / 2,
            };
          } else {
            console.warn(
              `NarrativeWeaver: Element not found for Golden Thread ID: ${evidence.elementId}`,
            );
          }
        }
      });
      setElementPositions(newPositions);
    }
  }, [view, currentInitialNarrative]); // Rerun when view or narrative data changes

  const handleAnswerChange = (questionId: string, answer: string) => {
    setSocraticAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const submitSocraticAnswers = async () => {
    setIsLoading(true);
    setError(null);
    setCurrentInitialNarrative(null);
    setCurrentWhatIfResult(null);
    setCurrentWhatIfScenario("");
    setWhatIfInput("");
    setCurrentHiddenGemsResult(null);
    try {
      const response = await axios.post("/api/narrative-weaver", {
        resumeData,
        jobDescription,
        socraticAnswers,
        action: "generate_initial_narrative",
      });
      processAndSetInitialNarrativeForDisplay(response.data);
      onNarrativeUpdate({ initialNarrative: response.data });
      setView("results");
    } catch {
      setError(
        // err.response?.data?.error ||
        // err.response?.data?.details ||
        // err.message ||
        "Failed to generate initial narrative.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // const exploreWhatIf = async (scenarioToExplore?: string) => {
  //   const scenario = scenarioToExplore || whatIfInput;
  //   if (!scenario.trim()) {
  //     setError("Please enter or select a 'What If' scenario to explore.");
  //     return;
  //   }
  //   setIsLoading(true); setError(null); setCurrentWhatIfResult(null);
  //   setCurrentWhatIfScenario(scenario);
  //   try {
  //     const response = await axios.post('/api/narrative-weaver', {
  //       resumeData, currentNarrative: currentInitialNarrative?.careerNarrative, whatIfScenario: scenario, action: "explore_what_if",
  //     });
  //     setCurrentWhatIfResult(response.data);
  //     // Update parent with new WhatIf cache (append or update)
  //     onNarrativeUpdate({
  //       whatIfs: (prevCache = []) => { // Expects onNarrativeUpdate to handle functional update for whatIfs
  //           const existingIndex = prevCache.findIndex(item => item.scenarioText === scenario);
  //           if (existingIndex > -1) {
  //               const updatedCache = [...prevCache];
  //               updatedCache[existingIndex] = { scenarioText: scenario, result: response.data };
  //               return updatedCache;
  //           }
  //           return [...prevCache, { scenarioText: scenario, result: response.data }];
  //       }
  //     });
  //     if (scenarioToExplore) setWhatIfInput(scenarioToExplore); // Pre-fill if button was clicked
  //   } catch (err: any) {
  //     setError(err.response?.data?.error || err.response?.data?.details || err.message || "Failed to explore 'What If' scenario.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const [ setWhatIfs] = useState<
  //   Array<{ scenarioText: string; result: WhatIfResult }>
  // >([]);
  // const [, setWhatIfs] = useState<{ scenarioText: string; result: WhatIfResult }[]>([]);

  // const exploreWhatIf = async (scenarioToExplore?: string) => {
  //   const scenario = scenarioToExplore || whatIfInput;
  //   if (!scenario.trim()) {
  //     setError("Please enter or select a 'What If' scenario to explore.");
  //     return;
  //   }
  //   setIsLoading(true); // Or setIsLoadingAI(true) if you have that
  //   setError(null);
  //   setCurrentWhatIfResult(null); // Local display state for the current one
  //   setCurrentWhatIfScenario(scenario); // Local display state

  //   try {
  //     const response = await axios.post("/api/narrative-weaver", {
  //       resumeData,
  //       currentNarrative: currentInitialNarrative?.careerNarrative,
  //       whatIfScenario: scenario,
  //       action: "explore_what_if",
  //     });

  //     const newWhatIfResult = response.data as WhatIfResult;
  //     setCurrentWhatIfResult(newWhatIfResult); // Update local state for immediate display if needed

  //     // Update the internal cache
  //     let updatedCache: Array<{ scenarioText: string; result: WhatIfResult }>;
  //     setInternalWhatIfCache(prevCache => {
  //         const existingIndex = prevCache.findIndex(item => item.scenarioText === scenario);
  //         if (existingIndex > -1) {
  //             updatedCache = [...prevCache];
  //             updatedCache[existingIndex] = { scenarioText: scenario, result: newWhatIfResult };
  //         } else {
  //             updatedCache = [...prevCache, { scenarioText: scenario, result: newWhatIfResult }];
  //         }
  //         // Now, call onNarrativeUpdate with the complete updated array
  //         onNarrativeUpdate({ whatIfs: updatedCache });
  //         return updatedCache; // Return for setInternalWhatIfCache
  //     });

  //     if (scenarioToExplore) setWhatIfInput(scenarioToExplore);

  //   } catch {
  //     setError(
  //       // err.response?.data?.error ||
  //       // err.response?.data?.details ||
  //       // err.message ||
  //       "Failed to explore 'What If' scenario.",
  //     );
  //   } finally {
  //     setIsLoading(false); // Or setIsLoadingAI(false)
  //   }
  // };

  const debouncedNarrativeUpdate = debounce(onNarrativeUpdate, 100);

  const exploreWhatIf = async (scenarioToExplore?: string) => {
    const scenario = scenarioToExplore || whatIfInput;
    if (!scenario.trim()) {
      setError("Please enter or select a 'What If' scenario to explore.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setCurrentWhatIfResult(null);
    setCurrentWhatIfScenario(scenario);

    try {
      const response = await axios.post("/api/narrative-weaver", {
        resumeData,
        currentNarrative: currentInitialNarrative?.careerNarrative,
        whatIfScenario: scenario,
        action: "explore_what_if",
      });

      const newWhatIfResult = response.data as WhatIfResult;
      setCurrentWhatIfResult(newWhatIfResult);

      let updatedCache: Array<{ scenarioText: string; result: WhatIfResult }>;
      setInternalWhatIfCache((prevCache) => {
        const existingIndex = prevCache.findIndex(
          (item) => item.scenarioText === scenario,
        );
        if (existingIndex > -1) {
          updatedCache = [...prevCache];
          updatedCache[existingIndex] = {
            scenarioText: scenario,
            result: newWhatIfResult,
          };
        } else {
          updatedCache = [
            ...prevCache,
            { scenarioText: scenario, result: newWhatIfResult },
          ];
        }
        // Use debounced version to batch updates
        debouncedNarrativeUpdate({ whatIfs: updatedCache });
        return updatedCache;
      });

      if (scenarioToExplore) setWhatIfInput(scenarioToExplore);
    } catch {
      setError("Failed to explore 'What If' scenario.");
    } finally {
      setIsLoading(false);
    }
  };

  // const exploreWhatIf = async (scenarioToExplore?: string) => {
  //   const scenario = scenarioToExplore || whatIfInput;
  //   if (!scenario.trim()) {
  //     setError("Please enter or select a 'What If' scenario to explore.");
  //     return;
  //   }
  //   setIsLoading(true);
  //   setError(null);
  //   setCurrentWhatIfResult(null);
  //   setCurrentWhatIfScenario(scenario);

  //   try {
  //     const response = await axios.post("/api/narrative-weaver", {
  //       resumeData,
  //       currentNarrative: currentInitialNarrative?.careerNarrative,
  //       whatIfScenario: scenario,
  //       action: "explore_what_if",
  //     });

  //     const newWhatIf = { scenarioText: scenario, result: response.data };

  //     setWhatIfs((prev) => {
  //       const existingIndex = prev.findIndex(
  //         (item) => item.scenarioText === scenario,
  //       );
  //       let updatedCache;
  //       if (existingIndex > -1) {
  //         updatedCache = [...prev];
  //         updatedCache[existingIndex] = newWhatIf;
  //       } else {
  //         updatedCache = [...prev, newWhatIf];
  //       }
  //       onNarrativeUpdate({ whatIfs: updatedCache });
  //       return updatedCache;
  //     });

  //     if (scenarioToExplore) setWhatIfInput(scenarioToExplore); // Pre-fill if button clicked
  //   } catch {
  //     setError(
  //       // err.response?.data?.error ||
  //         // err.response?.data?.details ||
  //         // err.message ||
  //         "Failed to explore 'What If' scenario.",
  //     );
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const findHiddenGems = async () => {
    setIsLoading(true);
    setError(null);
    setCurrentHiddenGemsResult(null);
    try {
      const response = await axios.post("/api/narrative-weaver", {
        resumeData,
        jobDescription,
        action: "find_hidden_gems",
      });
      setCurrentHiddenGemsResult(response.data);
      onNarrativeUpdate({ hiddenGems: response.data });
    } catch {
      setError(
        // err.response?.data?.error ||
        // err.response?.data?.details ||
        // err.message ||
        "Failed to find hidden gems.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resetToSocratic = () => {
    setCurrentInitialNarrative(null);
    setSocraticAnswers({});
    setWhatIfInput("");
    setCurrentWhatIfScenario("");
    setCurrentWhatIfResult(null);
    setCurrentHiddenGemsResult(null);
    setError(null);
    setView("socratic");
    onNarrativeUpdate({
      initialNarrative: undefined,
      whatIfs: [],
      hiddenGems: undefined,
    }); // Clear parent state too
  };

  const loadingMessages = [
    "Weaving your unique career threads...",
    "Analyzing your unique strengths...",
    "Uncovering insights from your journey...",
    "Crafting your compelling professional story...",
    "Polishing your narrative...",
  ];
  const [currentLoadingMessage, setCurrentLoadingMessage] = useState(
    loadingMessages[0],
  );

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;
    if (isLoading) {
      setCurrentLoadingMessage(loadingMessages[0]);
      let i = 1;
      intervalId = setInterval(() => {
        setCurrentLoadingMessage(loadingMessages[i % loadingMessages.length]);
        i++;
      }, 2200);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isLoading, loadingMessages]); // Only depend on isLoading

  // const loadingMessages = [
  //   "Weaving your unique career threads...",
  //   "Analyzing your unique strengths...",
  //   "Uncovering insights from your journey...",
  //   "Crafting your compelling professional story...",
  //   "Polishing your narrative...",
  // ];
  // const [currentLoadingMessage, setCurrentLoadingMessage] = useState(
  //   loadingMessages[0],
  // );

  // useEffect(() => {
  //   let intervalId: NodeJS.Timeout | undefined = undefined;
  //   if (isLoading) {
  //     setCurrentLoadingMessage(loadingMessages[0]);
  //     let i = 1;
  //     intervalId = setInterval(() => {
  //       setCurrentLoadingMessage(loadingMessages[i % loadingMessages.length]);
  //       i++;
  //     }, 2200);
  //   }
  //   return () => {
  //     if (intervalId) clearInterval(intervalId);
  //   };
  // }, [isLoading]); // Only depends on isLoading

  const handleWeavingSuggestionAction = (suggestion: WeavingSuggestion) => {
    let draftTitle = "Drafting Help";
    let draftText =
      suggestion.exampleSnippet ||
      `Consider this for your ${suggestion.type}:\n"${suggestion.suggestionText}"`;

    if (suggestion.type === "linkedInAbout") {
      draftTitle = "Draft for LinkedIn 'About' Section";
      draftText =
        suggestion.exampleSnippet ||
        `Building on my golden thread of "${currentInitialNarrative?.goldenThread}", my journey has been about...`;
    } else if (suggestion.type === "coverLetterOpening") {
      draftTitle = "Draft for Cover Letter Opening";
      draftText =
        suggestion.exampleSnippet ||
        `Dear [Hiring Manager name],\n\nMy passion for ${currentInitialNarrative?.goldenThread} aligns perfectly with...\n\n(Based on your narrative: ${currentInitialNarrative?.careerNarrative?.substring(0, 80)}...)`;
    } else if (suggestion.type === "interviewSTAR") {
      draftTitle = "STAR Method Thought Starter";
      draftText =
        suggestion.exampleSnippet ||
        `When asked about "${currentInitialNarrative?.goldenThread}", consider this STAR structure:\nSituation: ...\nTask: ...\nAction: ...\nResult: ...`;
    }
    setEditorContent({ title: draftTitle, initialText: draftText });
    setShowEditorModal(true);
  };

  const renderSimplifiedResumeForThread = () => {
    if (!resumeData || !currentInitialNarrative?.goldenThreadEvidence) {
      return (
        <p className="p-4 text-center text-xs italic text-gray-500">
          Narrative insights are needed to visualize connections.
        </p>
      );
    }
    if (currentInitialNarrative.goldenThreadEvidence.length === 0) {
      return (
        <p className="p-4 text-center text-xs italic text-gray-500">
          AI could not pinpoint specific resume snippets for the Golden Thread
          visualization.
        </p>
      );
    }

    return (
      <div className="max-h-[200px] space-y-2 overflow-y-auto p-3 text-xs leading-snug">
        {currentInitialNarrative.goldenThreadEvidence.map((evidence) => (
          <div
            key={evidence.elementId || evidence.textSnippet}
            id={evidence.elementId}
            className={`rounded-md p-1.5 transition-all duration-200 ${elementPositions[evidence.elementId!] ? "bg-purple-100/80 ring-1 ring-purple-300" : "bg-gray-100/50"}`}
          >
            <span className="mb-0.5 block text-[10px] font-semibold uppercase tracking-wide text-purple-700/80">
              {evidence.section.replace(/([A-Z])/g, " $1")}:
            </span>
            <span className="text-gray-600">{evidence.textSnippet}</span>
          </div>
        ))}
      </div>
    );
  };

  // --- JSX Return ---
  return (
    <div className="animate-fadeInUp mx-auto my-8 max-w-4xl rounded-xl bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4 text-gray-800 shadow-2xl sm:p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="flex items-center bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
          <Wand2 size={36} className="mr-3 text-purple-600 opacity-80" /> AI
          Career Narrative Suite
        </h2>
        <button
          onClick={onClose}
          className="rounded-full p-1.5 text-gray-500 transition-colors hover:bg-gray-900/10 hover:text-gray-800"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {isLoading && (
        <div className="flex min-h-[300px] flex-col items-center justify-center space-y-4 py-12 text-center">
          <WeavingLoader />
          <p className="animate-pulse text-lg font-medium text-purple-700">
            {currentLoadingMessage}
          </p>
        </div>
      )}
      {error && (
        <div className="my-4 rounded-lg border-2 border-red-200 bg-red-100 p-3 text-sm text-red-700 shadow-md">
          {error}
        </div>
      )}

      {view === "socratic" && !isLoading && !currentInitialNarrative && (
        <>
          <p className="mb-6 text-sm text-gray-600 sm:text-base">
            Answer these reflective questions. Your insights will help our AI
            craft your unique and compelling career story. Be thoughtful and
            specific!
          </p>
          <div className="mb-8 space-y-5">
            {initialSocraticQuestions.map((q) => (
              <div key={q.id}>
                <label
                  htmlFor={q.id}
                  className="mb-1.5 block text-sm font-semibold text-gray-700"
                >
                  {q.questionText}
                </label>
                <textarea
                  id={q.id}
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 p-3 text-sm placeholder-gray-400 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                  placeholder={q.placeholder}
                  value={socraticAnswers[q.id] || ""}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                />
              </div>
            ))}
          </div>
          <button
            onClick={submitSocraticAnswers}
            disabled={
              isLoading ||
              Object.values(socraticAnswers).some((ans) => !ans?.trim())
            }
            className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-base font-semibold text-white shadow-md transition-all hover:from-purple-700 hover:to-pink-700 disabled:cursor-not-allowed disabled:opacity-60 sm:text-lg"
          >
            <Sparkles size={20} className="mr-2" /> Weave My Initial Narrative
          </button>
        </>
      )}

      {view === "results" && currentInitialNarrative && !isLoading && (
        <div className="space-y-6">
          <NarrativeSection
            title="Your Career Narrative"
            icon={<BookOpen />}
            titleColor="text-purple-700"
            bgColor="bg-purple-50/70"
            borderColor="border-purple-200"
          >
            <p className="whitespace-pre-wrap">
              {currentInitialNarrative.careerNarrative}
            </p>
          </NarrativeSection>

          <NarrativeSection
            title="Your Golden Thread"
            icon={<Zap />}
            titleColor="text-pink-700"
            bgColor="bg-pink-50/70"
            borderColor="border-pink-200"
          >
            <p className="text-lg font-semibold italic">
              {currentInitialNarrative.goldenThread}
            </p>
          </NarrativeSection>

          {currentInitialNarrative.goldenThreadEvidence &&
            currentInitialNarrative.goldenThreadEvidence.length > 0 && (
              <NarrativeSection
                title="Golden Thread Visualized"
                icon={<Link2 />}
                titleColor="text-gray-700"
                bgColor="bg-gray-100/70"
                borderColor="border-gray-300/70"
              >
                <p className="mb-2 text-xs text-gray-500">
                  Key resume snippets supporting your &apos;Golden Thread&apos;.
                  Lines indicate conceptual connections.
                </p>
                <div
                  ref={resumeDisplayRef}
                  className="relative min-h-[100px] rounded-md border border-dashed border-purple-400/50 p-2"
                >
                  {renderSimplifiedResumeForThread()}
                  <svg
                    className="pointer-events-none absolute left-0 top-0 h-full w-full"
                    style={{ overflow: "visible" }}
                  >
                    <defs>
                      <marker
                        id="goldenThreadArrow"
                        markerWidth="6"
                        markerHeight="4.5"
                        refX="5"
                        refY="2.25"
                        orient="auto"
                        markerUnits="strokeWidth"
                      >
                        <path d="M0,0 L6,2.25 L0,4.5 z" fill="#a855f7" />
                      </marker>
                    </defs>
                    {currentInitialNarrative.goldenThreadEvidence.map(
                      (evidence, index, arr) => {
                        const startPos = elementPositions[evidence.elementId!];
                        const endPos =
                          index < arr.length - 1
                            ? elementPositions[arr[index + 1].elementId!]
                            : index > 0
                              ? elementPositions[arr[0].elementId!]
                              : null; // Loop back to first for last element
                        if (!startPos) return null;
                        const dot = (
                          <circle
                            key={`dot-${evidence.elementId}`}
                            cx={startPos.x}
                            cy={startPos.y}
                            r="4"
                            fill="#a855f7"
                            fillOpacity="0.6"
                            stroke="#fff"
                            strokeWidth="1"
                          />
                        );
                        if (endPos && index < arr.length - 1) {
                          // Only draw lines between consecutive points for now
                          const midX = (startPos.x + endPos.x) / 2;
                          const midY = (startPos.y + endPos.y) / 2;
                          const controlOffsetX =
                            Math.abs(endPos.y - startPos.y) *
                            0.2 *
                            (index % 2 === 0 ? 1 : -1); // Simple curve
                          const controlOffsetY =
                            Math.abs(endPos.x - startPos.x) *
                            0.2 *
                            (index % 2 === 0 ? -1 : 1);
                          return (
                            <g key={`thread-${evidence.elementId}`}>
                              {dot}
                              <path
                                d={`M ${startPos.x} ${startPos.y} Q ${midX + controlOffsetX} ${midY + controlOffsetY}, ${endPos.x} ${endPos.y}`}
                                stroke="#a855f7"
                                strokeWidth="1.5"
                                fill="none"
                                strokeDasharray="4 2"
                                markerEnd={
                                  index === arr.length - 2
                                    ? "url(#goldenThreadArrow)"
                                    : ""
                                }
                              />
                            </g>
                          );
                        }
                        return dot;
                      },
                    )}
                  </svg>
                </div>
              </NarrativeSection>
            )}

          {currentInitialNarrative.keyThemes?.length > 0 && (
            <NarrativeSection
              title="Key Themes / Pillars"
              icon={<Target />}
              titleColor="text-indigo-700"
              bgColor="bg-indigo-50/70"
              borderColor="border-indigo-200/80"
            >
              <ul className="space-y-2.5">
                {currentInitialNarrative.keyThemes.map((item, i) => (
                  <li
                    key={`theme-${i}`}
                    className="rounded-lg border border-indigo-100/80 bg-white/80 p-3 shadow-sm"
                  >
                    <strong className="mb-0.5 block font-semibold text-indigo-800">
                      {item.theme}:
                    </strong>
                    <span className="text-sm text-gray-600">
                      {item.evidence}
                    </span>
                  </li>
                ))}
              </ul>
            </NarrativeSection>
          )}

          {currentInitialNarrative.weavingSuggestions?.length > 0 && (
            <NarrativeSection
              title="Actionable Weaving Suggestions"
              icon={<Edit3 />}
              titleColor="text-sky-700"
              bgColor="bg-sky-50/70"
              borderColor="border-sky-200/80"
            >
              <ul className="space-y-2.5">
                {currentInitialNarrative.weavingSuggestions.map(
                  (suggestionItem, i) => (
                    <li
                      key={`sug-${i}`}
                      className="flex items-center justify-between gap-2 rounded-lg border border-sky-100/80 bg-white/80 p-3 shadow-sm"
                    >
                      <span className="flex-1 text-gray-700">
                        {suggestionItem.suggestionText}
                      </span>
                      {suggestionItem.exampleSnippet && (
                        <button
                          onClick={() =>
                            handleWeavingSuggestionAction(suggestionItem)
                          }
                          className="ml-3 flex-shrink-0 rounded-full bg-sky-500 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition-colors hover:bg-sky-600"
                        >
                          Draft Helper
                        </button>
                      )}
                    </li>
                  ),
                )}
              </ul>
            </NarrativeSection>
          )}

          <div className="pt-4 text-center">
            <button
              onClick={resetToSocratic}
              className="mx-auto flex items-center justify-center rounded-lg border border-purple-500 px-5 py-2 text-sm font-medium text-purple-600 shadow-sm transition-all hover:bg-purple-100/70 hover:shadow-md"
            >
              <RefreshCw size={16} className="mr-2" /> Start Over / Refine
              Answers
            </button>
          </div>

          {/* "What If?" Section */}
          {currentInitialNarrative.whatIfStarters?.length > 0 && (
            <div className="mt-6 border-t border-purple-300/50 pt-6">
              <h3 className="mb-2 flex items-center bg-gradient-to-r from-teal-600 to-cyan-500 bg-clip-text text-xl font-semibold text-transparent">
                <Brain size={24} className="mr-2 text-teal-500" /> &quot;What
                If?&quot; Scenario Explorer
              </h3>
              <p className="mb-3 text-xs text-gray-500">
                Click a suggestion or type your own scenario below:
              </p>
              <div className="mb-4 flex flex-wrap gap-2">
                {currentInitialNarrative.whatIfStarters.map((starter, i) => (
                  <button
                    key={`whatif-starter-${i}`}
                    onClick={() => exploreWhatIf(starter)}
                    disabled={isLoading}
                    className="rounded-full bg-cyan-100/80 px-3.5 py-1.5 text-xs font-medium text-cyan-800 shadow-sm transition-colors hover:bg-cyan-200/80 hover:shadow-md disabled:opacity-60"
                  >
                    {starter}
                  </button>
                ))}
              </div>
              <textarea
                placeholder="Or type your own scenario (e.g., 'a leadership role in a non-profit focused on sustainability')"
                rows={2}
                className="mb-3 w-full rounded-lg border border-gray-300 p-2.5 text-sm placeholder-gray-400 shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500"
                value={whatIfInput}
                onChange={(e) => setWhatIfInput(e.target.value)}
              />
              <button
                onClick={() => exploreWhatIf()}
                disabled={isLoading || !whatIfInput.trim()}
                className="w-full rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:from-teal-600 hover:to-cyan-600 disabled:opacity-60 sm:w-auto"
              >
                {isLoading && currentWhatIfScenario === whatIfInput
                  ? "Exploring..."
                  : "Explore Custom Scenario"}
              </button>
              {currentWhatIfResult && currentWhatIfScenario && !isLoading && (
                <div className="animate-fadeInUp mt-4 space-y-4">
                  <NarrativeSection
                    title={`Adapted Narrative for: "${currentWhatIfScenario}"`}
                    icon="🎭"
                    titleColor="text-teal-700"
                    bgColor="bg-teal-50/70"
                    borderColor="border-teal-200/80"
                  >
                    <p className="whitespace-pre-wrap">
                      {currentWhatIfResult.adaptedNarrative}
                    </p>
                  </NarrativeSection>
                  <NarrativeSection
                    title="Key Transferable Skills"
                    icon="🔗"
                    titleColor="text-teal-700"
                    bgColor="bg-teal-50/70"
                    borderColor="border-teal-200/80"
                  >
                    <ul className="list-inside list-disc pl-1">
                      {currentWhatIfResult.keyTransferableSkills.map(
                        (skill, i) => (
                          <li key={`wif-skill-${i}`}>{skill}</li>
                        ),
                      )}
                    </ul>
                  </NarrativeSection>
                  <NarrativeSection
                    title="Experience Pivot Points"
                    icon="🔄"
                    titleColor="text-teal-700"
                    bgColor="bg-teal-50/70"
                    borderColor="border-teal-200/80"
                  >
                    <ul className="list-inside list-disc pl-1">
                      {currentWhatIfResult.pivotPoints.map((point, i) => (
                        <li key={`wif-pivot-${i}`}>{point}</li>
                      ))}
                    </ul>
                  </NarrativeSection>
                </div>
              )}
            </div>
          )}

          {/* "Hidden Gems" Section */}
          <div className="mt-6 border-t border-purple-300/50 pt-6">
            <h3 className="mb-3 flex items-center bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-xl font-semibold text-transparent">
              <Search size={24} className="mr-2 text-amber-500" />
              Uncover Hidden Gems
            </h3>
            {currentInitialNarrative.hiddenGemsTeaser &&
              !currentHiddenGemsResult && (
                <p className="mb-3 text-sm italic text-gray-600">
                  AI Teaser: &quot;{currentInitialNarrative.hiddenGemsTeaser}
                  &quot;
                </p>
              )}
            <button
              onClick={findHiddenGems}
              disabled={isLoading}
              className="w-full rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:from-amber-600 hover:to-orange-600 disabled:opacity-60 sm:w-auto"
            >
              {isLoading && !currentHiddenGemsResult
                ? "Searching for Gems..."
                : currentHiddenGemsResult
                  ? "Refresh Hidden Gems"
                  : "💎 Reveal My Hidden Gems"}
            </button>
            {currentHiddenGemsResult && !isLoading && (
              <div className="animate-fadeInUp mt-4 space-y-4">
                {currentHiddenGemsResult.hiddenGems.map((item, i) => (
                  <NarrativeSection
                    key={`gem-item-${i}`}
                    title={`${item.gem}`}
                    icon="💡"
                    titleColor="text-amber-700"
                    bgColor="bg-amber-50/70"
                    borderColor="border-amber-200/80"
                  >
                    <p>
                      <strong className="font-medium text-amber-800">
                        Why it&apos;s valuable:
                      </strong>{" "}
                      {item.reasoning}
                    </p>
                    <p className="mt-1">
                      <strong className="font-medium text-amber-800">
                        Suggestion:
                      </strong>{" "}
                      {item.suggestion}
                    </p>
                  </NarrativeSection>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {showEditorModal && (
        <div className="animate-fadeInUp fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md scale-100 transform space-y-4 rounded-xl bg-white p-5 opacity-100 shadow-2xl transition-all sm:max-w-lg sm:p-6">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-800">
                {editorContent.title}
              </h4>
              <button
                onClick={() => setShowEditorModal(false)}
                className="rounded-full p-1.5 text-gray-500 hover:bg-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <textarea
              rows={10}
              className="w-full rounded-md border border-gray-300 p-2.5 text-sm placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
              defaultValue={editorContent.initialText}
              placeholder="AI generated draft will appear here..."
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowEditorModal(false)}
                className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const modalTextarea =
                    document.querySelector<HTMLTextAreaElement>(
                      'div[class*="fixed inset-0"] textarea',
                    );
                  if (modalTextarea)
                    navigator.clipboard.writeText(modalTextarea.value);
                  else navigator.clipboard.writeText(editorContent.initialText);
                  alert("Draft copied to clipboard!"); // Consider using a less intrusive toast notification
                  setShowEditorModal(false);
                }}
                className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-purple-700"
              >
                Copy Draft & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
