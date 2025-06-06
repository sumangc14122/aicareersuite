// // // src/app/portfolio-editor/[idOrAction]/page.tsx
// // "use client";

// // import React, { useState, useEffect } from "react";
// // import { useParams, useRouter, useSearchParams } from "next/navigation";
// // import axios from "axios";
// // import { useUser } from "@clerk/nextjs";

// // import Link from "next/link";

// // import {
// //   ArrowLeft,
// //   Plus,
// //   Trash2,
// //   GripVertical,
// //   FolderKanban,
// //   FileText,
// //   Palette,
// //   Eye,
// //   Settings2,
// //   Edit3 as EditIcon,
// //   ChevronDown,
// //   ChevronUp,
// //   Layers,
// //   MessageSquareQuote,
// //   Briefcase,
// //   Brain,
// //   Zap,
// //   Sparkles,
// //   ListChecks,
// //   UserCircle,
// //   GraduationCap,
// //   Gift,
// //   ShieldCheck,
// //   ThumbsUp,
// //   Info,
// //   // Link as LinkIcon,
// //   // RefreshCw, // Added RefreshCw
// // } from "lucide-react";

// // // DND-Kit Imports
// // import {
// //   DndContext,
// //   closestCenter,
// //   KeyboardSensor,
// //   PointerSensor,
// //   useSensor,
// //   useSensors,
// //   DragEndEvent,
// // } from "@dnd-kit/core";
// // import {
// //   arrayMove,
// //   SortableContext,
// //   sortableKeyboardCoordinates,
// //   verticalListSortingStrategy,
// //   useSortable,
// // } from "@dnd-kit/sortable";
// // import { CSS } from "@dnd-kit/utilities";

// // import { ResumeJSON } from "@/components/ATSScore";
// // import {
// //   InitialNarrativeResult,
// //   WhatIfResult,
// //   HiddenGemsResult,
// // } from "@/components/NarrativeWeaver";

// // // --- Interfaces ---
// // interface ShowcaseItem {
// //   id: string;
// //   name: string;
// //   description: string;
// //   link?: string;
// //   skillsUsed?: string[];
// // }
// // interface ShowcaseSectionData {
// //   id: string;
// //   title: string;
// //   items: ShowcaseItem[];
// // }
// // interface LivingPortfolioDisplaySettings {
// //   contact: {
// //     showFullName: boolean;
// //     showEmail: boolean;
// //     showPhone: boolean;
// //     showLocation: boolean;
// //     showLinkedIn: boolean;
// //     showPhoto: boolean;
// //   };
// //   sections: {
// //     showSummary: boolean;
// //     showSkills: boolean;
// //     showWorkExperience: boolean;
// //     showEducation: boolean;
// //     showVolunteering: boolean;
// //     showCertifications: boolean;
// //     showReferences: boolean;
// //   };
// //   narrativeSuite: {
// //     showCareerNarrative: boolean;
// //     showGoldenThread: boolean;
// //     showKeyThemes: boolean;
// //     showHiddenGems: boolean;
// //   };
// // }

// // interface LivingPortfolioSettings {
// //   title: string;
// //   slug?: string;
// //   isPublic: boolean;
// //   theme: string;
// //   displaySettings: LivingPortfolioDisplaySettings;
// //   publicFullName?: string;
// //   publicJobTitle?: string;
// //   publicEmail?: string;
// //   publicPhone?: string;
// //   publicLocation?: string;
// //   publicLinkedInUrl?: string;
// //   publicSummary?: string;
// //   publicSkills?: string[];
// //   publicWorkExperiences?: ResumeJSON["workExperiences"];
// //   publicEducations?: ResumeJSON["educations"];
// //   publicVolunteering?: ResumeJSON["volunteering"];
// //   publicCertifications?: ResumeJSON["certifications"];
// //   publicCareerNarrative?: string;
// //   publicGoldenThread?: string;
// //   publicGoldenThreadEvidence?: InitialNarrativeResult["goldenThreadEvidence"];
// //   publicKeyThemes?: InitialNarrativeResult["keyThemes"];
// //   publicHiddenGems?: HiddenGemsResult;
// //   selectedPublicWhatIfs: Array<{
// //     scenarioText: string;
// //     adaptedResult: WhatIfResult;
// //   }>;
// //   showcaseSections: Array<ShowcaseSectionData>;
// // }

// // interface SourceResumeDraftData {
// //   id: string;
// //   title?: string | null;
// //   wizardPersonalData?: (ResumeJSON["personal"] & { jobTitle?: string }) | null;
// //   wizardSummary?: string | null;
// //   wizardSkills?: string[] | null;
// //   wizardWorkExperiences?: ResumeJSON["workExperiences"] | null;
// //   wizardEducations?: ResumeJSON["educations"] | null;
// //   wizardVolunteering?: ResumeJSON["volunteering"] | null;
// //   wizardCertifications?: ResumeJSON["certifications"] | null;
// //   aiCareerNarrative?: string | null;
// //   aiGoldenThread?: string | null;
// //   aiGoldenThreadEvidence?:
// //     | InitialNarrativeResult["goldenThreadEvidence"]
// //     | null;
// //   aiKeyThemes?: InitialNarrativeResult["keyThemes"] | null;
// //   aiHiddenGemsResultJson?: HiddenGemsResult | null;
// //   aiWhatIfResultsCache?: Array<{
// //     scenarioText: string;
// //     result: WhatIfResult;
// //   }> | null;
// // }
// // interface ExistingLivingPortfolioData extends LivingPortfolioSettings {
// //   id: string;
// //   sourceResumeDraftId: string;
// // }

// // const defaultDisplaySettingsConst: LivingPortfolioDisplaySettings = {
// //   contact: {
// //     showFullName: true,
// //     showEmail: true,
// //     showPhone: true,
// //     showLocation: true,
// //     showLinkedIn: true,
// //     showPhoto: false,
// //   },
// //   sections: {
// //     showSummary: true,
// //     showSkills: true,
// //     showWorkExperience: true,
// //     showEducation: true,
// //     showVolunteering: true,
// //     showCertifications: true,
// //     showReferences: false,
// //   },
// //   narrativeSuite: {
// //     showCareerNarrative: true,
// //     showGoldenThread: true,
// //     showKeyThemes: true,
// //     showHiddenGems: true,
// //   },
// // };

// // const initialPortfolioSettingsShell: LivingPortfolioSettings = {
// //   title: "",
// //   slug: "",
// //   isPublic: true,
// //   theme: "default",
// //   displaySettings: JSON.parse(JSON.stringify(defaultDisplaySettingsConst)),
// //   selectedPublicWhatIfs: [],
// //   showcaseSections: [],
// //   publicFullName: undefined,
// //   publicJobTitle: undefined,
// //   publicEmail: undefined,
// //   publicPhone: undefined,
// //   publicLocation: undefined,
// //   publicLinkedInUrl: undefined,
// //   publicSummary: undefined,
// //   publicSkills: [],
// //   publicWorkExperiences: [],
// //   publicEducations: [],
// //   publicVolunteering: [],
// //   publicCertifications: [],
// //   publicCareerNarrative: undefined,
// //   publicGoldenThread: undefined,
// //   publicGoldenThreadEvidence: [],
// //   publicKeyThemes: [],
// //   publicHiddenGems: undefined,
// // };

// // const availableThemes = [
// //   { id: "default", name: "Default Professional" },
// //   { id: "modern-dark", name: "Modern Dark" },
// //   { id: "creative-light", name: "Creative Light" },
// //   { id: "minimalist-focus", name: "Minimalist Focus" },
// // ];
// // const inputBaseClass =
// //   "block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-150";
// // const checkboxLabelClass =
// //   "flex items-center space-x-2.5 cursor-pointer text-sm py-1 text-gray-700 hover:text-indigo-700 transition-colors";
// // const checkboxClass =
// //   "h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 focus:ring-offset-1 shadow-sm";
// // const sectionCardClass = "bg-white p-6 sm:p-8 rounded-xl shadow-xl";
// // const sectionTitleClass =
// //   "text-2xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-4 flex items-center gap-3";
// // const subSectionTitleClass = "text-lg font-semibold text-gray-700 mb-3";
// // const textareaBaseClass =
// //   "block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-150 resize-y";
// // const primaryButtonClass =
// //   "inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors";
// // const secondaryButtonClass =
// //   "inline-flex items-center justify-center px-5 py-2.5 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition-colors";
// // const iconButtonClass =
// //   "p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors";

// // const EditorCollapsibleSection: React.FC<{
// //   title: string;
// //   children: React.ReactNode;
// //   icon?: React.ReactNode;
// //   initiallyOpen?: boolean;
// //   isVisible?: boolean;
// // }> = ({ title, children, icon, initiallyOpen = false, isVisible = true }) => {
// //   const [isOpen, setIsOpen] = useState(initiallyOpen);
// //   if (!isVisible) return null;
// //   return (
// //     <div className="my-4 overflow-hidden rounded-lg border border-gray-300 bg-slate-50/70 shadow-sm transition-all duration-300 ease-in-out hover:shadow-md">
// //       <button
// //         type="button"
// //         onClick={() => setIsOpen(!isOpen)}
// //         className="flex w-full items-center justify-between p-4 text-left font-medium text-gray-800 transition-colors hover:bg-slate-100 focus:outline-none"
// //       >
// //         <span className="text-md flex items-center">
// //           {icon && (
// //             <span className="mr-2.5 text-indigo-600 opacity-80">{icon}</span>
// //           )}
// //           {title}
// //         </span>
// //         {isOpen ? (
// //           <ChevronUp size={20} className="text-gray-500" />
// //         ) : (
// //           <ChevronDown size={20} className="text-gray-500" />
// //         )}
// //       </button>
// //       {isOpen && (
// //         <div className="space-y-4 border-t border-gray-200 bg-white p-5">
// //           {children}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // function SortableShowcaseItem({
// //   sectionId,
// //   item,
// //   updateShowcaseItem,
// //   deleteShowcaseItem,
// // }: {
// //   sectionId: string;
// //   item: ShowcaseItem;
// //   updateShowcaseItem: (
// //     sectionId: string,
// //     itemId: string,
// //     field: keyof Omit<ShowcaseItem, "id">,
// //     value: string | string[],
// //   ) => void;
// //   deleteShowcaseItem: (sectionId: string, itemId: string) => void;
// // }) {
// //   const {
// //     attributes,
// //     listeners,
// //     setNodeRef,
// //     transform,
// //     transition,
// //     isDragging,
// //   } = useSortable({
// //     id: item.id,
// //     data: { type: "item", sectionId: sectionId },
// //   });
// //   const style = {
// //     transform: CSS.Transform.toString(transform),
// //     transition,
// //     opacity: isDragging ? 0.7 : 1,
// //     zIndex: isDragging ? 100 : "auto",
// //   };
// //   return (
// //     <div
// //       ref={setNodeRef}
// //       style={style}
// //       className="group relative mb-4 space-y-4 rounded-lg border border-gray-300 bg-white p-5 shadow-md transition-shadow hover:shadow-lg"
// //     >
// //       <div className="flex items-start justify-between">
// //         <div
// //           {...attributes}
// //           {...listeners}
// //           className={`-ml-1.5 cursor-grab touch-none p-1.5 text-gray-400 hover:text-gray-600`}
// //         >
// //           {" "}
// //           <GripVertical size={20} />{" "}
// //         </div>
// //         <div className="ml-2 flex-grow space-y-3">
// //           <div>
// //             <label
// //               htmlFor={`itemName-${sectionId}-${item.id}`}
// //               className="mb-1 block text-xs font-semibold text-gray-600"
// //             >
// //               Item Name*
// //             </label>
// //             <input
// //               id={`itemName-${sectionId}-${item.id}`}
// //               type="text"
// //               value={item.name}
// //               onChange={(e) =>
// //                 updateShowcaseItem(sectionId, item.id, "name", e.target.value)
// //               }
// //               placeholder="E.g., Customer Churn Prediction Model"
// //               className={`${inputBaseClass} py-2.5 text-sm`}
// //             />
// //           </div>
// //           <div>
// //             <label
// //               htmlFor={`itemDesc-${sectionId}-${item.id}`}
// //               className="mb-1 block text-xs font-semibold text-gray-600"
// //             >
// //               Description*
// //             </label>
// //             <textarea
// //               id={`itemDesc-${sectionId}-${item.id}`}
// //               value={item.description}
// //               onChange={(e) =>
// //                 updateShowcaseItem(
// //                   sectionId,
// //                   item.id,
// //                   "description",
// //                   e.target.value,
// //                 )
// //               }
// //               placeholder="Detailed description..."
// //               rows={4}
// //               className={`${textareaBaseClass} min-h-[80px] py-2.5 text-sm`}
// //             />
// //           </div>
// //           <div>
// //             <label
// //               htmlFor={`itemLink-${sectionId}-${item.id}`}
// //               className="mb-1 block text-xs font-semibold text-gray-600"
// //             >
// //               Link (Optional)
// //             </label>
// //             <input
// //               id={`itemLink-${sectionId}-${item.id}`}
// //               type="url"
// //               value={item.link || ""}
// //               onChange={(e) =>
// //                 updateShowcaseItem(sectionId, item.id, "link", e.target.value)
// //               }
// //               placeholder="https://github.com/..."
// //               className={`${inputBaseClass} py-2.5 text-sm`}
// //             />
// //           </div>
// //           <div>
// //             <label
// //               htmlFor={`itemSkills-${sectionId}-${item.id}`}
// //               className="mb-1 block text-xs font-semibold text-gray-600"
// //             >
// //               Skills Used (comma-separated)
// //             </label>
// //             <textarea
// //               id={`itemSkills-${sectionId}-${item.id}`}
// //               value={(item.skillsUsed || []).join(",")}
// //               onChange={(e) => {
// //                 const skillsArray = e.target.value.split(",");
// //                 updateShowcaseItem(
// //                   sectionId,
// //                   item.id,
// //                   "skillsUsed",
// //                   skillsArray,
// //                 );
// //               }}
// //               placeholder="React, Node.js, Project Management"
// //               rows={2}
// //               className={`${textareaBaseClass} min-h-[60px] py-2.5 text-sm`}
// //             />
// //           </div>
// //         </div>
// //         <button
// //           type="button"
// //           onClick={() => deleteShowcaseItem(sectionId, item.id)}
// //           className={`${iconButtonClass} ml-2 !text-red-500 hover:!bg-red-100 hover:!text-red-700`}
// //           title="Delete Item"
// //         >
// //           <Trash2 size={18} />
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // function SortableShowcaseSection({
// //   section,
// //   children,
// //   updateShowcaseSectionTitle,
// //   deleteShowcaseSection,
// // }: {
// //   section: ShowcaseSectionData;
// //   children: React.ReactNode;
// //   updateShowcaseSectionTitle: (sectionId: string, newTitle: string) => void;
// //   deleteShowcaseSection: (sectionId: string) => void;
// // }) {
// //   const {
// //     attributes,
// //     listeners,
// //     setNodeRef,
// //     transform,
// //     transition,
// //     isDragging,
// //   } = useSortable({ id: section.id, data: { type: "section" } });
// //   const style = {
// //     transform: CSS.Transform.toString(transform),
// //     transition,
// //     opacity: isDragging ? 0.8 : 1,
// //     boxShadow: isDragging ? "0 10px 20px rgba(0,0,0,0.1)" : "",
// //     zIndex: isDragging ? 100 : "auto",
// //   };
// //   return (
// //     <div
// //       ref={setNodeRef}
// //       style={style}
// //       className="space-y-5 rounded-xl border-2 border-gray-200 bg-slate-50 p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl"
// //     >
// //       <div className="mb-5 flex items-center border-b-2 border-gray-300 pb-3">
// //         <div
// //           {...attributes}
// //           {...listeners}
// //           className={`-ml-2 mr-2 cursor-grab p-2 ${iconButtonClass} touch-none text-gray-400 hover:text-gray-700`}
// //         >
// //           {" "}
// //           <GripVertical size={24} />{" "}
// //         </div>
// //         <input
// //           type="text"
// //           value={section.title}
// //           onChange={(e) =>
// //             updateShowcaseSectionTitle(section.id, e.target.value)
// //           }
// //           placeholder="Section Title"
// //           className="w-full flex-grow border-0 border-b-2 border-transparent bg-transparent p-2 text-xl font-semibold placeholder-gray-500 outline-none focus:border-indigo-500 focus:ring-0"
// //         />
// //         <button
// //           type="button"
// //           onClick={() => deleteShowcaseSection(section.id)}
// //           className={`${iconButtonClass} ml-4 !text-red-500 hover:!bg-red-100 hover:!text-red-700`}
// //           title="Delete Section"
// //         >
// //           {" "}
// //           <Trash2 size={20} />{" "}
// //         </button>
// //       </div>
// //       {children}
// //     </div>
// //   );
// // }

// // export default function PortfolioEditorPage() {
// //   const router = useRouter();
// //   const params = useParams();
// //   const searchParams = useSearchParams();
// //   const { user, isLoaded: isUserLoaded } = useUser();
// //   // const idOrActionParam = params.idOrAction as string;
// //   const idOrActionParam = params?.idOrAction as string | undefined;

// //   const [isLoadingPage, setIsLoadingPage] = useState(true);
// //   const [isProcessing, setIsProcessing] = useState(false);
// //   const [error, setError] = useState<string | null>(null);
// //   const [successMessage, setSuccessMessage] = useState<string | null>(null);
// //   const [sourceDraft, setSourceDraft] = useState<SourceResumeDraftData | null>(
// //     null,
// //   );
// //   const [portfolioSettings, setPortfolioSettings] =
// //     useState<LivingPortfolioSettings | null>(() =>
// //       JSON.parse(JSON.stringify(initialPortfolioSettingsShell)),
// //     );
// //   const [editingPortfolioId, setEditingPortfolioId] = useState<string | null>(
// //     null,
// //   );

// //   const sensors = useSensors(
// //     useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
// //     useSensor(KeyboardSensor, {
// //       coordinateGetter: sortableKeyboardCoordinates,
// //     }),
// //   );

// //   useEffect(() => {
// //     if (!idOrActionParam || !isUserLoaded) return;
// //     if (!user) {
// //       router.push("/sign-in");
// //       return;
// //     }

// //     const loadData = async () => {
// //       setIsLoadingPage(true);
// //       setError(null);
// //       // setSuccessMessage(null);
// //       setEditingPortfolioId(null);
// //       setSourceDraft(null);
// //       let tempPortfolioSettings: LivingPortfolioSettings;

// //       try {
// //         let draftDataToUse: SourceResumeDraftData | null = null;

// //         if (idOrActionParam === "new") {
// //           const draftIdQuery = searchParams?.get("draftId");
// //           if (!draftIdQuery)
// //             throw new Error("Resume Draft ID required for new portfolio.");
// //           const draftRes = await axios.get(
// //             `/api/resume-drafts/${draftIdQuery}`,
// //           );
// //           draftDataToUse = draftRes.data.draft as SourceResumeDraftData;
// //           if (!draftDataToUse)
// //             throw new Error("Failed to fetch source resume draft.");

// //           tempPortfolioSettings = {
// //             title: `${draftDataToUse.wizardPersonalData?.fullName || "My"} Portfolio`,
// //             ...JSON.parse(JSON.stringify(initialPortfolioSettingsShell)),
// //           };

// //           const ds = tempPortfolioSettings.displaySettings;
// //           if (draftDataToUse.wizardPersonalData) {
// //             tempPortfolioSettings.publicFullName = ds.contact.showFullName
// //               ? draftDataToUse.wizardPersonalData.fullName
// //               : undefined;
// //             tempPortfolioSettings.publicJobTitle =
// //               draftDataToUse.wizardPersonalData.jobTitle || undefined;
// //             tempPortfolioSettings.publicEmail = ds.contact.showEmail
// //               ? draftDataToUse.wizardPersonalData.email
// //               : undefined;
// //             tempPortfolioSettings.publicPhone = ds.contact.showPhone
// //               ? draftDataToUse.wizardPersonalData.phone
// //               : undefined;
// //             tempPortfolioSettings.publicLocation = ds.contact.showLocation
// //               ? `${draftDataToUse.wizardPersonalData.city}, ${draftDataToUse.wizardPersonalData.country}`.replace(
// //                   /^, |, $/g,
// //                   "",
// //                 )
// //               : undefined;
// //             tempPortfolioSettings.publicLinkedInUrl = ds.contact.showLinkedIn
// //               ? draftDataToUse.wizardPersonalData.linkedinUrl
// //               : undefined;
// //           }
// //           tempPortfolioSettings.publicSummary = ds.sections.showSummary
// //             ? draftDataToUse.wizardSummary || ""
// //             : "";
// //           tempPortfolioSettings.publicSkills = ds.sections.showSkills
// //             ? draftDataToUse.wizardSkills || []
// //             : [];
// //           tempPortfolioSettings.publicWorkExperiences = ds.sections
// //             .showWorkExperience
// //             ? draftDataToUse.wizardWorkExperiences || []
// //             : [];
// //           tempPortfolioSettings.publicEducations = ds.sections.showEducation
// //             ? draftDataToUse.wizardEducations || []
// //             : [];
// //           tempPortfolioSettings.publicVolunteering = ds.sections
// //             .showVolunteering
// //             ? draftDataToUse.wizardVolunteering || []
// //             : [];
// //           tempPortfolioSettings.publicCertifications = ds.sections
// //             .showCertifications
// //             ? draftDataToUse.wizardCertifications || []
// //             : [];
// //           tempPortfolioSettings.publicCareerNarrative = ds.narrativeSuite
// //             .showCareerNarrative
// //             ? draftDataToUse.aiCareerNarrative || ""
// //             : "";
// //           tempPortfolioSettings.publicGoldenThread = ds.narrativeSuite
// //             .showGoldenThread
// //             ? draftDataToUse.aiGoldenThread || ""
// //             : "";
// //           tempPortfolioSettings.publicGoldenThreadEvidence =
// //             ds.narrativeSuite.showGoldenThread &&
// //             draftDataToUse.aiGoldenThreadEvidence
// //               ? draftDataToUse.aiGoldenThreadEvidence
// //               : [];
// //           tempPortfolioSettings.publicKeyThemes =
// //             ds.narrativeSuite.showKeyThemes && draftDataToUse.aiKeyThemes
// //               ? draftDataToUse.aiKeyThemes
// //               : [];
// //           tempPortfolioSettings.publicHiddenGems =
// //             ds.narrativeSuite.showHiddenGems &&
// //             draftDataToUse.aiHiddenGemsResultJson
// //               ? draftDataToUse.aiHiddenGemsResultJson
// //               : undefined;
// //         } else {
// //           setEditingPortfolioId(idOrActionParam);
// //           const portfolioRes = await axios.get(
// //             `/api/living-portfolios/edit/${idOrActionParam}`,
// //           );
// //           const existingPortfolio: ExistingLivingPortfolioData =
// //             portfolioRes.data.portfolio;
// //           if (!existingPortfolio)
// //             throw new Error("Portfolio to edit not found or access denied.");

// //           tempPortfolioSettings = {
// //             title: existingPortfolio.title,
// //             slug: existingPortfolio.slug || "",
// //             isPublic: existingPortfolio.isPublic,
// //             theme: existingPortfolio.theme,
// //             displaySettings: {
// //               // Deep merge with defaults to ensure all keys are present
// //               contact: {
// //                 ...defaultDisplaySettingsConst.contact,
// //                 ...(existingPortfolio.displaySettings?.contact || {}),
// //               },
// //               sections: {
// //                 ...defaultDisplaySettingsConst.sections,
// //                 ...(existingPortfolio.displaySettings?.sections || {}),
// //               },
// //               narrativeSuite: {
// //                 ...defaultDisplaySettingsConst.narrativeSuite,
// //                 ...(existingPortfolio.displaySettings?.narrativeSuite || {}),
// //               },
// //             },
// //             publicFullName: existingPortfolio.publicFullName,
// //             publicJobTitle: existingPortfolio.publicJobTitle,
// //             publicEmail: existingPortfolio.publicEmail,
// //             publicPhone: existingPortfolio.publicPhone,
// //             publicLocation: existingPortfolio.publicLocation,
// //             publicLinkedInUrl: existingPortfolio.publicLinkedInUrl,
// //             publicSummary: existingPortfolio.publicSummary || "",
// //             publicSkills: existingPortfolio.publicSkills || [],
// //             publicWorkExperiences:
// //               existingPortfolio.publicWorkExperiences || [],
// //             publicEducations: existingPortfolio.publicEducations || [],
// //             publicVolunteering: existingPortfolio.publicVolunteering || [],
// //             publicCertifications: existingPortfolio.publicCertifications || [],
// //             publicCareerNarrative:
// //               existingPortfolio.publicCareerNarrative || "",
// //             publicGoldenThread: existingPortfolio.publicGoldenThread || "",
// //             publicGoldenThreadEvidence:
// //               existingPortfolio.publicGoldenThreadEvidence || [],
// //             publicKeyThemes: existingPortfolio.publicKeyThemes || [],
// //             publicHiddenGems: existingPortfolio.publicHiddenGems || undefined,
// //             selectedPublicWhatIfs:
// //               existingPortfolio.selectedPublicWhatIfs || [],
// //             showcaseSections: existingPortfolio.showcaseSections || [],
// //           };

// //           if (existingPortfolio.sourceResumeDraftId) {
// //             const draftRes = await axios.get(
// //               `/api/resume-drafts/${existingPortfolio.sourceResumeDraftId}`,
// //             );
// //             draftDataToUse = draftRes.data.draft as SourceResumeDraftData;
// //           }
// //         }
// //         setSourceDraft(draftDataToUse);
// //         setPortfolioSettings(tempPortfolioSettings);
// //       } catch (err: unknown) {
// //         console.error("Error in Portfolio Editor data fetching:", err);
// //         setError(
// //           err instanceof Error ? err.message : "Failed to load editor data."
// //         );
// //       } finally {
// //         setIsLoadingPage(false);
// //       }
// //     };
// //     if (idOrActionParam && isUserLoaded && user) loadData();
// //   }, [idOrActionParam, searchParams, user, isUserLoaded, router]);

// //   const handleSettingChange = (
// //     field: keyof LivingPortfolioSettings | "displaySettings",
// //     pathOrValue: string | boolean | string[],
// //     valueForDisplaySetting?: boolean,
// //   ) => {
// //     setPortfolioSettings((prev) => {
// //       if (!prev) return null;
// //       if (field !== "displaySettings") {
// //         return {
// //           ...prev,
// //           [field as keyof LivingPortfolioSettings]: pathOrValue,
// //         };
// //       } else {
// //         const pathString = pathOrValue as string;
// //         const value = valueForDisplaySetting;
// //         const keys = pathString.split(".");
// //         if (keys.length === 2) {
// //           const parentKey = keys[0] as keyof LivingPortfolioDisplaySettings;
// //           const childKey = keys[1];
// //           if (
// //             prev.displaySettings &&
// //             parentKey in prev.displaySettings &&
// //             childKey in prev.displaySettings[parentKey]
// //           ) {
// //             return {
// //               ...prev,
// //               displaySettings: {
// //                 ...prev.displaySettings,
// //                 [parentKey]: {
// //                   ...prev.displaySettings[parentKey],
// //                   [childKey]: value,
// //                 },
// //               },
// //             };
// //           }
// //         }
// //         console.warn("Invalid path for displaySettings update:", pathString);
// //         return prev;
// //       }
// //     });
// //   };

// //   // const handlePublicContentChange = (
// //   //   field: keyof LivingPortfolioSettings,
// //   //   value: any,
// //   // ) => {
// //   //   setPortfolioSettings((prev) => (prev ? { ...prev, [field]: value } : null));
// //   // };

// //   type PublicContentValue =
// //   | string
// //   | string[]
// //   | ResumeJSON["workExperiences"]
// //   | ResumeJSON["educations"]
// //   | ResumeJSON["volunteering"]
// //   | ResumeJSON["certifications"]
// //   | string | null
// //   | InitialNarrativeResult["goldenThreadEvidence"]
// //   | InitialNarrativeResult["keyThemes"]
// //   | HiddenGemsResult
// //   | Array<{ scenarioText: string; adaptedResult: WhatIfResult }>;

// // const handlePublicContentChange = (
// //   field: keyof LivingPortfolioSettings,
// //   value: PublicContentValue,
// // ) => {
// //   setPortfolioSettings((prev) => (prev ? { ...prev, [field]: value } : null));
// // };

// //   // const handleWorkExperienceBulletChange = (
// //   //   expIndex: number,
// //   //   bulletIndex: number,
// //   //   newValue: string,
// //   // ) => {
// //   //   setPortfolioSettings((prev) => {
// //   //     if (!prev || !prev.publicWorkExperiences) return prev;
// //   //     const newWorkExperiences = JSON.parse(
// //   //       JSON.stringify(prev.publicWorkExperiences),
// //   //     );
// //   //     if (
// //   //       newWorkExperiences[expIndex] &&
// //   //       newWorkExperiences[expIndex].bullets
// //   //     ) {
// //   //       newWorkExperiences[expIndex].bullets[bulletIndex] = newValue;
// //   //     }
// //   //     return { ...prev, publicWorkExperiences: newWorkExperiences };
// //   //   });
// //   // };
// //   // const addWorkExperienceBullet = (expIndex: number) => {
// //   //   setPortfolioSettings((prev) => {
// //   //     if (!prev || !prev.publicWorkExperiences) return prev;
// //   //     const newWorkExperiences = JSON.parse(
// //   //       JSON.stringify(prev.publicWorkExperiences),
// //   //     );
// //   //     if (newWorkExperiences[expIndex]) {
// //   //       if (!newWorkExperiences[expIndex].bullets) {
// //   //         newWorkExperiences[expIndex].bullets = [];
// //   //       }
// //   //       newWorkExperiences[expIndex].bullets.push("");
// //   //     }
// //   //     return { ...prev, publicWorkExperiences: newWorkExperiences };
// //   //   });
// //   // };
// //   // const deleteWorkExperienceBullet = (
// //   //   expIndex: number,
// //   //   bulletIndex: number,
// //   // ) => {
// //   //   setPortfolioSettings((prev) => {
// //   //     if (!prev || !prev.publicWorkExperiences) return prev;
// //   //     const newWorkExperiences = JSON.parse(
// //   //       JSON.stringify(prev.publicWorkExperiences),
// //   //     );
// //   //     if (
// //   //       newWorkExperiences[expIndex] &&
// //   //       newWorkExperiences[expIndex].bullets
// //   //     ) {
// //   //       newWorkExperiences[expIndex].bullets.splice(bulletIndex, 1);
// //   //     }
// //   //     return { ...prev, publicWorkExperiences: newWorkExperiences };
// //   //   });
// //   // };

// //   const handleToggleWhatIf = (whatIfItemFromDraft: {
// //     scenarioText: string;
// //     result: WhatIfResult;
// //   }) => {
// //     setPortfolioSettings((prev) => {
// //       if (!prev) return null;
// //       const { scenarioText, result } = whatIfItemFromDraft;
// //       const currentSelected = prev.selectedPublicWhatIfs;
// //       const existingIndex = currentSelected.findIndex(
// //         (item) => item.scenarioText === scenarioText,
// //       );
// //       if (existingIndex > -1) {
// //         return {
// //           ...prev,
// //           selectedPublicWhatIfs: currentSelected.filter(
// //             (_, i) => i !== existingIndex,
// //           ),
// //         };
// //       } else {
// //         return {
// //           ...prev,
// //           selectedPublicWhatIfs: [
// //             ...currentSelected,
// //             { scenarioText, adaptedResult: result },
// //           ],
// //         };
// //       }
// //     });
// //   };

// //   const addShowcaseSection = () =>
// //     setPortfolioSettings((prev) =>
// //       prev
// //         ? {
// //             ...prev,
// //             showcaseSections: [
// //               ...prev.showcaseSections,
// //               {
// //                 id: `section-${Date.now()}`,
// //                 title: "New Showcase Section",
// //                 items: [],
// //               },
// //             ],
// //           }
// //         : null,
// //     );
// //   const updateShowcaseSectionTitle = (sectionId: string, newTitle: string) =>
// //     setPortfolioSettings((prev) =>
// //       prev
// //         ? {
// //             ...prev,
// //             showcaseSections: prev.showcaseSections.map((s) =>
// //               s.id === sectionId ? { ...s, title: newTitle } : s,
// //             ),
// //           }
// //         : null,
// //     );
// //   const deleteShowcaseSection = (sectionId: string) => {
// //     if (window.confirm("Delete section?")) {
// //       setPortfolioSettings((prev) =>
// //         prev
// //           ? {
// //               ...prev,
// //               showcaseSections: prev.showcaseSections.filter(
// //                 (s) => s.id !== sectionId,
// //               ),
// //             }
// //           : null,
// //       );
// //     }
// //   };
// //   const addShowcaseItem = (sectionId: string) =>
// //     setPortfolioSettings((prev) =>
// //       prev
// //         ? {
// //             ...prev,
// //             showcaseSections: prev.showcaseSections.map((s) =>
// //               s.id === sectionId
// //                 ? {
// //                     ...s,
// //                     items: [
// //                       ...s.items,
// //                       {
// //                         id: `item-${Date.now()}`,
// //                         name: "New Item",
// //                         description: "",
// //                         skillsUsed: [],
// //                       },
// //                     ],
// //                   }
// //                 : s,
// //             ),
// //           }
// //         : null,
// //     );
// //   const updateShowcaseItem = (
// //     sectionId: string,
// //     itemId: string,
// //     field: keyof Omit<ShowcaseItem, "id">,
// //     value: string | string[],
// //   ) => {
// //     setPortfolioSettings((prev) =>
// //       prev
// //         ? {
// //             ...prev,
// //             showcaseSections: prev.showcaseSections.map((s) =>
// //               s.id === sectionId
// //                 ? {
// //                     ...s,
// //                     items: s.items.map((i) =>
// //                       i.id === itemId ? { ...i, [field]: value } : i,
// //                     ),
// //                   }
// //                 : s,
// //             ),
// //           }
// //         : null,
// //     );
// //   };
// //   const deleteShowcaseItem = (sectionId: string, itemId: string) => {
// //     if (window.confirm("Delete item?")) {
// //       setPortfolioSettings((prev) =>
// //         prev
// //           ? {
// //               ...prev,
// //               showcaseSections: prev.showcaseSections.map((s) =>
// //                 s.id === sectionId
// //                   ? { ...s, items: s.items.filter((i) => i.id !== itemId) }
// //                   : s,
// //               ),
// //             }
// //           : null,
// //       );
// //     }
// //   };

// //   const handleDragEnd = (event: DragEndEvent) => {
// //     const { active, over } = event;
// //     if (!over || !portfolioSettings) return;
// //     const activeId = active.id as string;
// //     const overId = over.id as string;
// //     const activeType = active.data.current?.type as string;
// //     if (activeType === "section" && activeId !== overId) {
// //       setPortfolioSettings((prev) =>
// //         prev
// //           ? {
// //               ...prev,
// //               showcaseSections: arrayMove(
// //                 prev.showcaseSections,
// //                 prev.showcaseSections.findIndex((s) => s.id === activeId),
// //                 prev.showcaseSections.findIndex((s) => s.id === overId),
// //               ),
// //             }
// //           : null,
// //       );
// //     } else if (activeType === "item") {
// //       const activeSectionId = active.data.current?.sectionId as string;
// //       setPortfolioSettings((prev) =>
// //         prev
// //           ? {
// //               ...prev,
// //               showcaseSections: prev.showcaseSections.map((section) =>
// //                 section.id === activeSectionId
// //                   ? {
// //                       ...section,
// //                       items: arrayMove(
// //                         section.items,
// //                         section.items.findIndex((i) => i.id === activeId),
// //                         section.items.findIndex((i) => i.id === overId),
// //                       ),
// //                     }
// //                   : section,
// //               ),
// //             }
// //           : null,
// //       );
// //     }
// //   };

// //   const handleSaveOrPublish = async () => {
// //     if (!portfolioSettings) {
// //       setError("Settings not loaded.");
// //       return;
// //     }
// //     if (!editingPortfolioId && !sourceDraft) {
// //       setError("Source draft missing for new portfolio.");
// //       return;
// //     }
// //     setIsProcessing(true);
// //     setSuccessMessage(null);
// //     setError(null);

// //     const cleanedShowcaseSections = portfolioSettings.showcaseSections.map((s) => ({
// //       ...s,
// //       items: s.items.map((i) => ({
// //         ...i,
// //         skillsUsed: (i.skillsUsed || []).map((sk) => sk.trim()).filter(Boolean),
// //       })),
// //     }));

// //     const payload: LivingPortfolioSettings & { sourceResumeDraftId?: string } = {
// //       ...portfolioSettings,
// //       showcaseSections: cleanedShowcaseSections,
// //       publicSkills: (portfolioSettings.publicSkills || [])
// //         .map((s) => s.trim())
// //         .filter(Boolean),
// //       publicWorkExperiences:
// //         portfolioSettings.publicWorkExperiences?.map((exp) => ({
// //           ...exp,
// //           bullets: (exp.bullets || []).map((b) => b.trim()).filter(Boolean),
// //         })) || [],
// //       publicVolunteering:
// //         portfolioSettings.publicVolunteering?.map((vol) => ({
// //           ...vol,
// //           bullets: ((vol as { bullets?: string[] }).bullets || [])
// //             .map((b: string) => b.trim())
// //             .filter(Boolean),
// //         })) || [],
// //       sourceResumeDraftId: editingPortfolioId ? undefined : sourceDraft?.id,
// //     };

// //     try {
// //       let response;
// //       let portfolioLinkID = editingPortfolioId;
// //       let portfolioUrl: string;

// //       if (editingPortfolioId) {
// //         response = await axios.put(
// //           `/api/living-portfolios/${editingPortfolioId}`,
// //           payload,
// //         );
// //         portfolioUrl = `${window.location.origin}/portfolio/${response.data.portfolioSlug || editingPortfolioId}`;
// //         setSuccessMessage(`Portfolio updated successfully! Shareable Link: ${portfolioUrl}`);
// //       } else {
// //         if (!payload.sourceResumeDraftId)
// //           throw new Error("Source draft ID missing for new portfolio.");
// //         response = await axios.post("/api/living-portfolios/publish", payload);
// //         portfolioLinkID = response.data.portfolioId;
// //         portfolioUrl = `${window.location.origin}/portfolio/${response.data.portfolioSlug || portfolioLinkID}`;
// //         setSuccessMessage(`Portfolio published successfully! Shareable Link: ${portfolioUrl}`);
// //         setEditingPortfolioId(portfolioLinkID);
// //         router.replace(`/portfolio-editor/${portfolioLinkID}`, {
// //           scroll: false,
// //         });
// //       }
// //     } catch (err: unknown) {
// //       console.error(
// //         "Error saving/publishing portfolio:",
// //         err instanceof Error ? err.message : "Unknown error",
// //       );
// //       setError(
// //         err instanceof Error
// //           ? `Failed to save portfolio: ${err.message}`
// //           : "Failed to save portfolio. Please try again.",
// //       );
// //     } finally {
// //       setIsProcessing(false);
// //     }
// //   };

// //   // const handleSaveOrPublish = async () => {
// //   //   if (!portfolioSettings) {
// //   //     setError("Settings not loaded.");
// //   //     return;
// //   //   }
// //   //   if (!editingPortfolioId && !sourceDraft) {
// //   //     setError("Source draft missing for new portfolio.");
// //   //     return;
// //   //   }
// //   //   setIsProcessing(true);
// //   //   setSuccessMessage(null);
// //   //   setError(null);

// //   //   const cleanedShowcaseSections = portfolioSettings.showcaseSections.map(
// //   //     (s) => ({
// //   //       ...s,
// //   //       items: s.items.map((i) => ({
// //   //         ...i,
// //   //         skillsUsed: (i.skillsUsed || [])
// //   //           .map((sk) => sk.trim())
// //   //           .filter(Boolean),
// //   //       })),
// //   //     }),
// //   //   );
// //   //   // const payload: LivingPortfolioSettings & { sourceResumeDraftId?: string } =
// //   //   //   {
// //   //   //     ...portfolioSettings, // Spread all current settings including editable public fields
// //   //   //     showcaseSections: cleanedShowcaseSections,
// //   //   //     publicSkills: (portfolioSettings.publicSkills || [])
// //   //   //       .map((s) => s.trim())
// //   //   //       .filter(Boolean),
// //   //   //     // Ensure complex array fields like workExperiences also get their bullets trimmed
// //   //   //     publicWorkExperiences:
// //   //   //       portfolioSettings.publicWorkExperiences?.map((exp) => ({
// //   //   //         ...exp,
// //   //   //         bullets: (exp.bullets || []).map((b) => b.trim()).filter(Boolean),
// //   //   //       })) || [],
// //   //   //     publicVolunteering:
// //   //   //       portfolioSettings.publicVolunteering?.map((vol) => ({
// //   //   //         ...vol,
// //   //   //         bullets: ((vol as any).bullets || [])
// //   //   //           .map((b: string) => b.trim())
// //   //   //           .filter(Boolean),
// //   //   //       })) || [],
// //   //   //     sourceResumeDraftId: editingPortfolioId ? undefined : sourceDraft?.id, // Only for new
// //   //   //   };

// //   //   const payload: LivingPortfolioSettings & { sourceResumeDraftId?: string } = {
// //   //     ...portfolioSettings, // Spread all current settings including editable public fields
// //   //     showcaseSections: cleanedShowcaseSections,
// //   //     publicSkills: (portfolioSettings.publicSkills || [])
// //   //       .map((s) => s.trim())
// //   //       .filter(Boolean),
// //   //     // Ensure complex array fields like workExperiences also get their bullets trimmed
// //   //     publicWorkExperiences:
// //   //       portfolioSettings.publicWorkExperiences?.map((exp) => ({
// //   //         ...exp,
// //   //         bullets: (exp.bullets || []).map((b) => b.trim()).filter(Boolean),
// //   //       })) || [],
// //   //     publicVolunteering:
// //   //       portfolioSettings.publicVolunteering?.map((vol) => ({
// //   //         ...vol,
// //   //         bullets: ((vol as { bullets?: string[] }).bullets || [])
// //   //           .map((b: string) => b.trim())
// //   //           .filter(Boolean),
// //   //       })) || [],
// //   //     sourceResumeDraftId: editingPortfolioId ? undefined : sourceDraft?.id, // Only for new
// //   //   };

// //   //   try {
// //   //     let response;
// //   //     let portfolioLinkID = editingPortfolioId;
// //   //     if (editingPortfolioId) {
// //   //       response = await axios.put(
// //   //         `/api/living-portfolios/${editingPortfolioId}`,
// //   //         payload,
// //   //       );
// //   //       setSuccessMessage(`Portfolio updated successfully!`);
// //   //     } else {
// //   //       if (!payload.sourceResumeDraftId)
// //   //         throw new Error("Source draft ID missing for new portfolio.");
// //   //       response = await axios.post("/api/living-portfolios/publish", payload);
// //   //       portfolioLinkID = response.data.portfolioId;
// //   //       setEditingPortfolioId(portfolioLinkID);
// //   //       setSuccessMessage(`Portfolio published successfully!`);
// //   //       router.replace(`/portfolio-editor/${portfolioLinkID}`, {
// //   //         scroll: false,
// //   //       });
// //   //     }
// //   //     const portfolioUrl = `${window.location.origin}/portfolio/${response.data.portfolioSlug || editingPortfolioId}`;
// //   //     setSuccessMessage(
// //   //       (prev) => `${prev || ""} Shareable Link: ${portfolioUrl}`,
// //   //     );
// //   //   } catch (err: unknown) {
// //   //     console.error(
// //   //       "Error saving/publishing portfolio:",
// //   //       err instanceof Error ? err.message : "Unknown error"
// //   //     );
// //   //   } finally {
// //   //     setIsProcessing(false);
// //   //   }
// //   // };

// //   if (isLoadingPage) {
// //     return (
// //       <div className="flex min-h-screen animate-pulse items-center justify-center text-xl font-semibold text-gray-700">
// //         Loading Portfolio Editor...
// //       </div>
// //     );
// //   }
// //   if (error && !portfolioSettings) {
// //     return (
// //       <div className="mx-auto my-10 max-w-2xl rounded-lg border-2 border-red-200 bg-red-50 p-8 text-center text-red-700 shadow-lg">
// //         <h2 className="mb-3 text-2xl font-semibold">
// //           Oops! Something went wrong.
// //         </h2>
// //         <p className="text-md mb-4">{error}</p>
// //         <button
// //           onClick={() =>
// //             router.push(
// //               idOrActionParam === "new"
// //                 ? "/wizard"
// //                 : user
// //                   ? `/profile/${user.id}`
// //                   : "/",
// //             )
// //           }
// //           className="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
// //         >
// //           {" "}
// //           {idOrActionParam === "new"
// //             ? "Go back to Wizard"
// //             : "Go to My Profile"}{" "}
// //         </button>
// //       </div>
// //     );
// //   }
// //   if (idOrActionParam === "new" && !sourceDraft && portfolioSettings) {
// //     return (
// //       <div className="mx-auto my-10 max-w-2xl rounded-lg border-2 border-yellow-200 bg-yellow-50 p-8 text-center text-lg text-yellow-800 shadow-lg">
// //         <h2 className="mb-3 text-2xl font-semibold">Missing Information</h2>
// //         <p className="text-md mb-4">
// //           {error || "Could not load the source resume draft for new portfolio."}
// //         </p>
// //         <button
// //           onClick={() => router.push("/wizard")}
// //           className="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
// //         >
// //           Go back to Wizard
// //         </button>
// //       </div>
// //     );
// //   }
// //   if (!portfolioSettings) {
// //     return (
// //       <div className="mx-auto my-10 max-w-2xl rounded-lg border-2 border-gray-200 bg-gray-100 p-8 text-center text-lg text-gray-700 shadow-lg">
// //         <h2 className="mb-3 text-2xl font-semibold">Unable to Load Editor</h2>
// //         <p className="text-md mb-4">
// //           Portfolio data could not be initialized. Please try again.
// //         </p>
// //         <button
// //           onClick={() =>
// //             router.push(
// //               editingPortfolioId && user?.id
// //                 ? `/profile/${user.id}`
// //                 : "/wizard",
// //             )
// //           }
// //           className="mt-4 rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow transition-colors hover:bg-indigo-700"
// //         >
// //           {" "}
// //           {editingPortfolioId ? "Go to My Profile" : "Go back to Wizard"}{" "}
// //         </button>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="mx-auto min-h-screen max-w-7xl bg-slate-100 px-4 py-10 font-sans sm:px-6 sm:py-16 lg:px-8">
// //       <button
// //         onClick={() =>
// //           router.push(
// //             editingPortfolioId && user?.id ? `/profile/${user.id}` : "/wizard",
// //           )
// //         }
// //         className="group mb-10 inline-flex items-center text-sm font-medium text-indigo-700 transition-colors hover:text-indigo-900"
// //       >
// //         <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
// //         {editingPortfolioId ? "Back to My Profile" : "Back to Resume Wizard"}
// //       </button>
// //       <header className="mb-12 border-b-2 border-gray-300 pb-6">
// //         <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
// //           {editingPortfolioId
// //             ? "Edit Living Portfolio"
// //             : "Create New Living Portfolio"}
// //         </h1>
// //         {sourceDraft?.title && (
// //           <p className="mt-2 text-lg text-gray-600">
// //             Based on Resume Draft:{" "}
// //             <span className="font-semibold text-gray-800">
// //             &quot;{sourceDraft.title}&quot;
// //             </span>
// //           </p>
// //         )}
// //       </header>

// //       {successMessage && (
// //         <div className="animate-fadeIn mb-8 rounded-md border-l-4 border-green-500 bg-green-50 p-4 text-green-700 shadow-lg">
// //           {" "}
// //           <div className="flex">
// //             {" "}
// //             <div className="py-1">
// //               <Sparkles className="mr-4 h-6 w-6 text-green-500" />
// //             </div>{" "}
// //             <div>
// //               {" "}
// //               <p className="text-lg font-bold">
// //                 {editingPortfolioId
// //                   ? "Portfolio Updated!"
// //                   : "Portfolio Published!"}
// //               </p>{" "}
// //               <div
// //                 className="mt-1 text-sm"
// //                 dangerouslySetInnerHTML={{
// //                   __html: successMessage.replace(
// //                     /Shareable Link: (http[s]?:\/\/[^\s]+)/,
// //                     'Shareable Link: <a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline hover:text-blue-700 font-medium">$1</a>',
// //                   ),
// //                 }}
// //               />{" "}
// //             </div>{" "}
// //           </div>{" "}
// //         </div>
// //       )}
// //       {error && !successMessage && (
// //         <div className="animate-fadeIn mb-8 rounded-md border-l-4 border-red-500 bg-red-50 p-4 text-red-700 shadow-lg">
// //           <span className="font-bold">Error:</span> {error}
// //         </div>
// //       )}

// //       <div className="grid grid-cols-1 gap-x-10 gap-y-12 lg:grid-cols-3">
// //         <DndContext
// //           sensors={sensors}
// //           collisionDetection={closestCenter}
// //           onDragEnd={handleDragEnd}
// //         >
// //           <div className="space-y-10 lg:col-span-2">
// //             <section className={sectionCardClass}>
// //               <h2 className={`${sectionTitleClass} mb-2`}>
// //                 <Settings2 size={28} className="mr-3 text-indigo-600" />{" "}
// //                 Portfolio Details
// //               </h2>
// //               <div className="space-y-6 pt-4">
// //                 <div>
// //                   <label
// //                     htmlFor="portfolioTitle"
// //                     className="mb-1.5 block text-sm font-semibold text-gray-700"
// //                   >
// //                     Portfolio Title*
// //                   </label>
// //                   <input
// //                     type="text"
// //                     id="portfolioTitle"
// //                     value={portfolioSettings.title}
// //                     onChange={(e) =>
// //                       handleSettingChange("title", e.target.value)
// //                     }
// //                     className={inputBaseClass}
// //                   />
// //                 </div>
// //                 <div>
// //                   <label
// //                     htmlFor="portfolioSlug"
// //                     className="mb-1.5 block text-sm font-semibold text-gray-700"
// //                   >
// //                     Custom URL Slug (Optional)
// //                   </label>
// //                   <div className="mt-1 flex rounded-md shadow-sm">
// //                     <span className="inline-flex items-center whitespace-nowrap rounded-l-md border border-r-0 border-gray-300 bg-gray-100 px-3 text-gray-500 sm:text-sm">
// //                       {typeof window !== "undefined"
// //                         ? `${window.location.origin}/portfolio/`
// //                         : "/portfolio/"}
// //                     </span>
// //                     <input
// //                       type="text"
// //                       id="portfolioSlug"
// //                       value={portfolioSettings.slug || ""}
// //                       onChange={(e) =>
// //                         handleSettingChange(
// //                           "slug",
// //                           e.target.value.toLowerCase().replace(/\s+/g, "-"),
// //                         )
// //                       }
// //                       placeholder="your-unique-slug"
// //                       className={`${inputBaseClass} !rounded-l-none focus:z-10`}
// //                     />
// //                   </div>
// //                   <p className="mt-1.5 text-xs text-gray-500">
// //                     Lowercase letters, numbers, hyphens. Auto-formats. Blank for
// //                     unique ID.
// //                   </p>
// //                 </div>
// //                 <div>
// //                   <label
// //                     htmlFor="portfolioTheme"
// //                     className="mb-1.5 block text-sm font-semibold text-gray-700"
// //                   >
// //                     <Palette size={18} className="mr-2 inline text-gray-500" />
// //                     Portfolio Theme
// //                   </label>
// //                   <select
// //                     id="portfolioTheme"
// //                     name="theme"
// //                     value={portfolioSettings.theme}
// //                     onChange={(e) =>
// //                       handleSettingChange("theme", e.target.value)
// //                     }
// //                     className={`${inputBaseClass} appearance-none`}
// //                   >
// //                     {availableThemes.map((themeOption) => (
// //                       <option key={themeOption.id} value={themeOption.id}>
// //                         {" "}
// //                         {themeOption.name}{" "}
// //                       </option>
// //                     ))}
// //                   </select>
// //                 </div>
// //                 <div className="pt-2">
// //                   <label className={`${checkboxLabelClass} !text-base`}>
// //                     <input
// //                       type="checkbox"
// //                       checked={portfolioSettings.isPublic}
// //                       onChange={(e) =>
// //                         handleSettingChange("isPublic", e.target.checked)
// //                       }
// //                       className={`${checkboxClass} h-5 w-5 !text-green-600 focus:ring-green-500`}
// //                     />
// //                     <span className="font-semibold text-gray-800">
// //                       Make this Portfolio Publicly Shareable
// //                     </span>
// //                   </label>
// //                 </div>
// //               </div>
// //             </section>

// //             <section className={sectionCardClass}>
// //               <h2 className={`${sectionTitleClass}`}>
// //                 <EditIcon size={28} className="mr-3 text-indigo-600" /> Edit
// //                 Portfolio Content
// //               </h2>
// //               <p className="-mt-4 mb-6 text-sm text-gray-500">
// //                 Tailor content for this portfolio. Visibility is controlled in
// //                 the next section.
// //               </p>
// //               <div className="space-y-4">
// //                 <EditorCollapsibleSection
// //                   title="Contact Information"
// //                   icon={<UserCircle />}
// //                   isVisible={true}
// //                   initiallyOpen={false}
// //                 >
// //                   <div className="space-y-3 p-2">
// //                     {portfolioSettings.displaySettings?.contact
// //                       ?.showFullName && (
// //                       <div>
// //                         <label className="mb-0.5 block text-xs font-medium capitalize text-gray-600">
// //                           Full Name
// //                         </label>
// //                         <input
// //                           type="text"
// //                           value={portfolioSettings.publicFullName || ""}
// //                           onChange={(e) =>
// //                             handlePublicContentChange(
// //                               "publicFullName",
// //                               e.target.value,
// //                             )
// //                           }
// //                           className={inputBaseClass}
// //                           placeholder="Full Name for portfolio display"
// //                         />
// //                       </div>
// //                     )}
// //                     {/* Assuming jobTitle is always editable if contact section is generally visible, or add specific toggle if needed for jobTitle itself*/}
// //                     <div>
// //                       <label className="mb-0.5 block text-xs font-medium capitalize text-gray-600">
// //                         Job Title / Headline
// //                       </label>
// //                       <input
// //                         type="text"
// //                         value={portfolioSettings.publicJobTitle || ""}
// //                         onChange={(e) =>
// //                           handlePublicContentChange(
// //                             "publicJobTitle",
// //                             e.target.value,
// //                           )
// //                         }
// //                         className={inputBaseClass}
// //                         placeholder="Your professional headline"
// //                       />
// //                     </div>
// //                     {portfolioSettings.displaySettings?.contact?.showEmail && (
// //                       <div>
// //                         <label className="mb-0.5 block text-xs font-medium capitalize text-gray-600">
// //                           Email
// //                         </label>
// //                         <input
// //                           type="email"
// //                           value={portfolioSettings.publicEmail || ""}
// //                           onChange={(e) =>
// //                             handlePublicContentChange(
// //                               "publicEmail",
// //                               e.target.value,
// //                             )
// //                           }
// //                           className={inputBaseClass}
// //                           placeholder="Contact email"
// //                         />
// //                       </div>
// //                     )}
// //                     {portfolioSettings.displaySettings?.contact?.showPhone && (
// //                       <div>
// //                         <label className="mb-0.5 block text-xs font-medium capitalize text-gray-600">
// //                           Phone
// //                         </label>
// //                         <input
// //                           type="tel"
// //                           value={portfolioSettings.publicPhone || ""}
// //                           onChange={(e) =>
// //                             handlePublicContentChange(
// //                               "publicPhone",
// //                               e.target.value,
// //                             )
// //                           }
// //                           className={inputBaseClass}
// //                           placeholder="Contact phone"
// //                         />
// //                       </div>
// //                     )}
// //                     {portfolioSettings.displaySettings?.contact
// //                       ?.showLocation && (
// //                       <div>
// //                         <label className="mb-0.5 block text-xs font-medium capitalize text-gray-600">
// //                           Location
// //                         </label>
// //                         <input
// //                           type="text"
// //                           value={portfolioSettings.publicLocation || ""}
// //                           onChange={(e) =>
// //                             handlePublicContentChange(
// //                               "publicLocation",
// //                               e.target.value,
// //                             )
// //                           }
// //                           className={inputBaseClass}
// //                           placeholder="City, Country"
// //                         />
// //                       </div>
// //                     )}
// //                     {portfolioSettings.displaySettings?.contact
// //                       ?.showLinkedIn && (
// //                       <div>
// //                         <label className="mb-0.5 block text-xs font-medium capitalize text-gray-600">
// //                           LinkedIn URL
// //                         </label>
// //                         <input
// //                           type="url"
// //                           value={portfolioSettings.publicLinkedInUrl || ""}
// //                           onChange={(e) =>
// //                             handlePublicContentChange(
// //                               "publicLinkedInUrl",
// //                               e.target.value,
// //                             )
// //                           }
// //                           className={inputBaseClass}
// //                           placeholder="LinkedIn Profile URL"
// //                         />
// //                       </div>
// //                     )}
// //                     {Object.values(
// //                       portfolioSettings.displaySettings?.contact || {},
// //                     ).every((v) => !v) && (
// //                       <p className="text-xs italic text-gray-500">
// //                         No contact fields are set to visible. Enable them in
// //                         &quot;Content Visibility&quot; to edit their content here.
// //                       </p>
// //                     )}
// //                   </div>
// //                 </EditorCollapsibleSection>

// //                 <EditorCollapsibleSection
// //                   title="Summary"
// //                   icon={<FileText />}
// //                   isVisible={
// //                     portfolioSettings.displaySettings?.sections?.showSummary
// //                   }
// //                   initiallyOpen={
// //                     !!portfolioSettings.displaySettings?.sections?.showSummary
// //                   }
// //                 >
// //                   <textarea
// //                     value={portfolioSettings.publicSummary || ""}
// //                     onChange={(e) =>
// //                       handlePublicContentChange("publicSummary", e.target.value)
// //                     }
// //                     rows={6}
// //                     className={textareaBaseClass}
// //                     placeholder="Portfolio Summary"
// //                   />
// //                   {sourceDraft?.wizardSummary &&
// //                     portfolioSettings.publicSummary !==
// //                       sourceDraft.wizardSummary && (
// //                       <button
// //                         type="button"
// //                         onClick={() =>
// //                           handlePublicContentChange(
// //                             "publicSummary",
// //                             sourceDraft.wizardSummary || "",
// //                           )
// //                         }
// //                         className="mt-1.5 text-xs text-indigo-600 hover:underline"
// //                       >
// //                         Reset to draft summary
// //                       </button>
// //                     )}
// //                 </EditorCollapsibleSection>

// //                 <EditorCollapsibleSection
// //                   title="Skills"
// //                   icon={<Layers />}
// //                   isVisible={
// //                     portfolioSettings.displaySettings?.sections?.showSkills
// //                   }
// //                 >
// //                   <label className="mb-1 block text-xs font-medium text-gray-600">
// //                     Skills (comma-separated)
// //                   </label>
// //                   <textarea
// //                     value={(portfolioSettings.publicSkills || []).join(", ")}
// //                     onChange={(e) =>
// //                       handlePublicContentChange(
// //                         "publicSkills",
// //                         e.target.value.split(",").map((s) => s.trim()),
// //                       )
// //                     }
// //                     rows={3}
// //                     className={textareaBaseClass}
// //                     placeholder="e.g., React, Project Management"
// //                   />
// //                   {sourceDraft?.wizardSkills &&
// //                     JSON.stringify(
// //                       portfolioSettings.publicSkills
// //                         ?.map((s) => s.trim())
// //                         .filter(Boolean),
// //                     ) !==
// //                       JSON.stringify(
// //                         (sourceDraft.wizardSkills || [])
// //                           .map((s) => s.trim())
// //                           .filter(Boolean),
// //                       ) && (
// //                       <button
// //                         type="button"
// //                         onClick={() =>
// //                           handlePublicContentChange(
// //                             "publicSkills",
// //                             sourceDraft.wizardSkills || [],
// //                           )
// //                         }
// //                         className="mt-1.5 text-xs text-indigo-600 hover:underline"
// //                       >
// //                         Reset to draft skills
// //                       </button>
// //                     )}
// //                 </EditorCollapsibleSection>

// //                 {[
// //                   "WorkExperience",
// //                   "Education",
// //                   "Volunteering",
// //                   "Certifications",
// //                 ].map((sectionKey) => {
// //                   const displayKey =
// //                     `show${sectionKey}` as keyof LivingPortfolioDisplaySettings["sections"];
// //                   if (
// //                     portfolioSettings.displaySettings?.sections?.[displayKey]
// //                   ) {
// //                     const IconComponent =
// //                       sectionKey === "WorkExperience"
// //                         ? Briefcase
// //                         : sectionKey === "Education"
// //                           ? GraduationCap
// //                           : sectionKey === "Volunteering"
// //                             ? Gift
// //                             : ShieldCheck;
// //                     return (
// //                       <EditorCollapsibleSection
// //                         key={`edit-${sectionKey}`}
// //                         title={`Public ${sectionKey.replace(/([A-Z])/g, " $1").trim()} (Snapshot)`}
// //                         icon={<IconComponent />}
// //                         isVisible={true}
// //                       >
// //                         <div className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 p-3">
// //                           <Info
// //                             size={20}
// //                             className="mt-0.5 flex-shrink-0 text-amber-600"
// //                           />
// //                           <p className="text-xs italic text-gray-700">
// //                             Content for{" "}
// //                             <strong>
// //                               {sectionKey
// //                                 .replace(/([A-Z])/g, " $1")
// //                                 .toLowerCase()}
// //                             </strong>{" "}
// //                             is snapshotted from your resume draft. To edit
// //                             individual items (e.g., specific jobs, degrees,
// //                             bullets), please update your{" "}
// //                             <Link
// //                               href={`/wizard?step=3`}
// //                               className="font-medium text-indigo-600 hover:underline"
// //                             >
// //                               Resume Draft in the Wizard
// //                             </Link>
// //                             .
// //                           </p>
// //                         </div>
// //                       </EditorCollapsibleSection>
// //                     );
// //                   }
// //                   return null;
// //                 })}

// //                 {portfolioSettings.displaySettings?.narrativeSuite
// //                   ?.showCareerNarrative && (
// //                   <EditorCollapsibleSection
// //                     title="Career Narrative"
// //                     icon={<MessageSquareQuote />}
// //                   >
// //                     <textarea
// //                       value={portfolioSettings.publicCareerNarrative || ""}
// //                       onChange={(e) =>
// //                         handlePublicContentChange(
// //                           "publicCareerNarrative",
// //                           e.target.value,
// //                         )
// //                       }
// //                       rows={5}
// //                       className={textareaBaseClass}
// //                     />
// //                     {sourceDraft?.aiCareerNarrative &&
// //                       portfolioSettings.publicCareerNarrative !==
// //                         sourceDraft.aiCareerNarrative && (
// //                         <button
// //                           type="button"
// //                           onClick={() =>
// //                             handlePublicContentChange(
// //                               "publicCareerNarrative",
// //                               sourceDraft.aiCareerNarrative || "",
// //                             )
// //                           }
// //                           className="mt-1.5 text-xs text-indigo-600 hover:underline"
// //                         >
// //                           Reset to AI narrative
// //                         </button>
// //                       )}
// //                   </EditorCollapsibleSection>
// //                 )}
// //                 {portfolioSettings.displaySettings?.narrativeSuite
// //                   ?.showGoldenThread && (
// //                   <EditorCollapsibleSection
// //                     title="Golden Thread"
// //                     icon={<Zap />}
// //                   >
// //                     <input
// //                       type="text"
// //                       value={portfolioSettings.publicGoldenThread || ""}
// //                       onChange={(e) =>
// //                         handlePublicContentChange(
// //                           "publicGoldenThread",
// //                           e.target.value,
// //                         )
// //                       }
// //                       className={inputBaseClass}
// //                     />
// //                     {sourceDraft?.aiGoldenThread &&
// //                       portfolioSettings.publicGoldenThread !==
// //                         sourceDraft.aiGoldenThread && (
// //                         <button
// //                           type="button"
// //                           onClick={() =>
// //                             handlePublicContentChange(
// //                               "publicGoldenThread",
// //                               sourceDraft.aiGoldenThread || "",
// //                             )
// //                           }
// //                           className="mt-1.5 text-xs text-indigo-600 hover:underline"
// //                         >
// //                           Reset to AI golden thread
// //                         </button>
// //                       )}
// //                   </EditorCollapsibleSection>
// //                 )}
// //                 {portfolioSettings.displaySettings?.narrativeSuite
// //                   ?.showKeyThemes && (
// //                   <EditorCollapsibleSection
// //                     title="Key Themes (Snapshot)"
// //                     icon={<Sparkles />}
// //                   >
// //                     {" "}
// //                     <div className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 p-3">
// //                       <Info
// //                         size={16}
// //                         className="mt-0.5 flex-shrink-0 text-amber-600"
// //                       />
// //                       <p className="text-xs italic text-gray-500">
// //                         Content from draft. Edit via AI Suite in Wizard.
// //                       </p>
// //                     </div>{" "}
// //                   </EditorCollapsibleSection>
// //                 )}
// //                 {portfolioSettings.displaySettings?.narrativeSuite
// //                   ?.showHiddenGems && (
// //                   <EditorCollapsibleSection
// //                     title="Hidden Gems (Snapshot)"
// //                     icon={<ThumbsUp />}
// //                   >
// //                     {" "}
// //                     <div className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 p-3">
// //                       <Info
// //                         size={16}
// //                         className="mt-0.5 flex-shrink-0 text-amber-600"
// //                       />
// //                       <p className="text-xs italic text-gray-500">
// //                         Content from draft. Edit via AI Suite in Wizard.
// //                       </p>
// //                     </div>{" "}
// //                   </EditorCollapsibleSection>
// //                 )}
// //                 {portfolioSettings.displaySettings?.narrativeSuite
// //                   ?.showGoldenThread &&
// //                   portfolioSettings.publicGoldenThreadEvidence &&
// //                   portfolioSettings.publicGoldenThreadEvidence.length > 0 && (
// //                     <EditorCollapsibleSection
// //                       title="Golden Thread Evidence (Snapshot)"
// //                       icon={<ListChecks />}
// //                     >
// //                       {" "}
// //                       <div className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 p-3">
// //                         <Info
// //                           size={16}
// //                           className="mt-0.5 flex-shrink-0 text-amber-600"
// //                         />
// //                         <p className="text-xs italic text-gray-500">
// //                           Content from draft. Edit via AI Suite in Wizard.
// //                         </p>
// //                       </div>{" "}
// //                     </EditorCollapsibleSection>
// //                   )}
// //               </div>
// //             </section>

// //             <section className={sectionCardClass}>
// //               <h2 className={`${sectionTitleClass} mb-2`}>
// //                 <Eye size={28} className="mr-3 text-indigo-600" /> Content
// //                 Visibility Toggles
// //               </h2>
// //               <p className="-mt-4 mb-6 text-sm text-gray-500">
// //                 Choose which sections will appear on your public portfolio.
// //               </p>
// //               <div className="space-y-6 pt-4">
// //                 <div>
// //                   {" "}
// //                   <h3 className={subSectionTitleClass}>
// //                     Contact Information:
// //                   </h3>{" "}
// //                   <div className="grid grid-cols-2 gap-x-6 gap-y-3 pt-1 md:grid-cols-3">
// //                     {" "}
// //                     {(
// //                       Object.keys(
// //                         portfolioSettings.displaySettings.contact,
// //                       ) as Array<
// //                         keyof LivingPortfolioDisplaySettings["contact"]
// //                       >
// //                     ).map((key) => (
// //                       <label
// //                         key={`ds-contact-${key}`}
// //                         className={checkboxLabelClass}
// //                       >
// //                         {" "}
// //                         <input
// //                           type="checkbox"
// //                           checked={
// //                             !!portfolioSettings.displaySettings.contact[key]
// //                           }
// //                           onChange={(e) =>
// //                             handleSettingChange(
// //                               "displaySettings",
// //                               `contact.${key}`,
// //                               e.target.checked,
// //                             )
// //                           }
// //                           className={checkboxClass}
// //                         />{" "}
// //                         <span>
// //                           {key
// //                             .substring(4)
// //                             .replace(/([A-Z])/g, " $1")
// //                             .trim()}
// //                         </span>{" "}
// //                       </label>
// //                     ))}{" "}
// //                   </div>{" "}
// //                 </div>
// //                 <div className="border-t border-gray-200 pt-5">
// //                   {" "}
// //                   <h3 className={subSectionTitleClass}>
// //                     Standard Resume Sections:
// //                   </h3>{" "}
// //                   <div className="grid grid-cols-2 gap-x-6 gap-y-3 pt-1 md:grid-cols-3">
// //                     {" "}
// //                     {(
// //                       Object.keys(
// //                         portfolioSettings.displaySettings.sections,
// //                       ) as Array<
// //                         keyof LivingPortfolioDisplaySettings["sections"]
// //                       >
// //                     ).map((key) => (
// //                       <label
// //                         key={`ds-section-${key}`}
// //                         className={checkboxLabelClass}
// //                       >
// //                         {" "}
// //                         <input
// //                           type="checkbox"
// //                           checked={
// //                             !!portfolioSettings.displaySettings.sections[key]
// //                           }
// //                           onChange={(e) =>
// //                             handleSettingChange(
// //                               "displaySettings",
// //                               `sections.${key}`,
// //                               e.target.checked,
// //                             )
// //                           }
// //                           className={checkboxClass}
// //                         />{" "}
// //                         <span>
// //                           {key
// //                             .substring(4)
// //                             .replace(/([A-Z])/g, " $1")
// //                             .trim()}
// //                         </span>{" "}
// //                       </label>
// //                     ))}{" "}
// //                   </div>{" "}
// //                 </div>
// //                 {sourceDraft?.aiCareerNarrative && (
// //                   <div className="border-t border-gray-200 pt-5">
// //                     {" "}
// //                     <h3 className={subSectionTitleClass}>
// //                       AI Narrative Suite Elements:
// //                     </h3>{" "}
// //                     <div className="grid grid-cols-2 gap-x-6 gap-y-3 pt-1 md:grid-cols-3">
// //                       {" "}
// //                       {(
// //                         Object.keys(
// //                           portfolioSettings.displaySettings.narrativeSuite,
// //                         ) as Array<
// //                           keyof LivingPortfolioDisplaySettings["narrativeSuite"]
// //                         >
// //                       ).map((key) => (
// //                         <label
// //                           key={`ds-narrative-${key}`}
// //                           className={checkboxLabelClass}
// //                         >
// //                           {" "}
// //                           <input
// //                             type="checkbox"
// //                             checked={
// //                               !!portfolioSettings.displaySettings
// //                                 .narrativeSuite[key]
// //                             }
// //                             onChange={(e) =>
// //                               handleSettingChange(
// //                                 "displaySettings",
// //                                 `narrativeSuite.${key}`,
// //                                 e.target.checked,
// //                               )
// //                             }
// //                             className={checkboxClass}
// //                           />{" "}
// //                           <span>
// //                             {key
// //                               .substring(4)
// //                               .replace(/([A-Z])/g, " $1")
// //                               .trim()}
// //                           </span>{" "}
// //                         </label>
// //                       ))}{" "}
// //                     </div>{" "}
// //                   </div>
// //                 )}
// //               </div>
// //             </section>

// //             {sourceDraft?.aiWhatIfResultsCache &&
// //               sourceDraft.aiWhatIfResultsCache.length > 0 && (
// //                 <section className={sectionCardClass}>
// //                   <h2 className={`${sectionTitleClass} mb-2`}>
// //                     <Brain size={28} className="mr-3 text-indigo-600" />{" "}
// //                     Showcase &quot;What If?&quot; Scenarios
// //                   </h2>
// //                   <p className="mb-4 pt-2 text-sm text-gray-600">
// //                     Select AI-generated scenarios from your resume draft to
// //                     include.
// //                   </p>
// //                   <div className="max-h-80 space-y-1.5 overflow-y-auto rounded-lg border bg-slate-50 p-4 shadow-inner">
// //                     {sourceDraft.aiWhatIfResultsCache.map((whatIfItem) => (
// //                       <label
// //                         key={`editor-whatif-${whatIfItem.scenarioText.replace(/\s+/g, "-")}`}
// //                         className={`${checkboxLabelClass} block w-full rounded-md border border-gray-200 p-3 transition-colors hover:border-indigo-200 hover:bg-indigo-100`}
// //                       >
// //                         <input
// //                           type="checkbox"
// //                           checked={portfolioSettings.selectedPublicWhatIfs.some(
// //                             (pwi) =>
// //                               pwi.scenarioText === whatIfItem.scenarioText,
// //                           )}
// //                           onChange={() => handleToggleWhatIf(whatIfItem)}
// //                           className={`${checkboxClass} mr-3 !text-teal-600 focus:ring-teal-500`}
// //                         />
// //                         <span
// //                           className="font-medium text-gray-800"
// //                           title={whatIfItem.scenarioText}
// //                         >
// //                           &quot;{whatIfItem.scenarioText}&quot;
// //                         </span>
// //                       </label>
// //                     ))}
// //                   </div>
// //                 </section>
// //               )}

// //             <section className={`${sectionCardClass} space-y-6`}>
// //               {" "}
// //               {/* Showcase Sections */}
// //               <div className="flex flex-col justify-between gap-3 border-b border-gray-200 pb-4 sm:flex-row sm:items-center">
// //                 <h2 className={`${sectionTitleClass} mb-0 border-b-0 pb-0`}>
// //                   <Layers size={28} className="mr-3 text-indigo-600" /> Custom
// //                   Showcase Sections
// //                 </h2>
// //                 <button
// //                   type="button"
// //                   onClick={addShowcaseSection}
// //                   className="flex shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-blue-700"
// //                 >
// //                   {" "}
// //                   <Plus size={18} /> Add New Section{" "}
// //                 </button>
// //               </div>
// //               {portfolioSettings.showcaseSections.length === 0 && (
// //                 <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-8 text-center">
// //                   {" "}
// //                   <FolderKanban
// //                     className="mx-auto h-12 w-12 text-gray-400"
// //                     strokeWidth={1.5}
// //                   />{" "}
// //                   <h3 className="mt-2 text-lg font-medium text-gray-900">
// //                     No showcase sections yet
// //                   </h3>{" "}
// //                   <p className="mt-1 text-sm text-gray-500">
// //                     Add a section to highlight projects, skills, or experiences.
// //                   </p>{" "}
// //                 </div>
// //               )}
// //               <div className="space-y-8">
// //                 <SortableContext
// //                   items={portfolioSettings.showcaseSections.map((s) => s.id)}
// //                   strategy={verticalListSortingStrategy}
// //                 >
// //                   {portfolioSettings.showcaseSections.map((section) => (
// //                     <SortableShowcaseSection
// //                       key={section.id}
// //                       section={section}
// //                       updateShowcaseSectionTitle={updateShowcaseSectionTitle}
// //                       deleteShowcaseSection={deleteShowcaseSection}
// //                     >
// //                       {section.items.length === 0 && (
// //                         <p className="py-3 text-center text-sm italic text-gray-500">
// //                           No items. Click &quot;+ Add Item&quot; below.
// //                         </p>
// //                       )}
// //                       <div className="space-y-1">
// //                         <SortableContext
// //                           items={section.items.map((i) => i.id)}
// //                           strategy={verticalListSortingStrategy}
// //                         >
// //                           {section.items.map((item) => (
// //                             <SortableShowcaseItem
// //                               key={item.id}
// //                               sectionId={section.id}
// //                               item={item}
// //                               updateShowcaseItem={updateShowcaseItem}
// //                               deleteShowcaseItem={deleteShowcaseItem}
// //                             />
// //                           ))}
// //                         </SortableContext>
// //                       </div>
// //                       <button
// //                         type="button"
// //                         onClick={() => addShowcaseItem(section.id)}
// //                         className="mt-4 flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow transition-colors hover:bg-indigo-600"
// //                       >
// //                         {" "}
// //                         <Plus size={16} strokeWidth={3} /> Add Item                        {" "}
// //                       </button>
// //                     </SortableShowcaseSection>
// //                   ))}
// //                 </SortableContext>
// //               </div>
// //             </section>

// //             {successMessage && (
// //               <div className="animate-fadeIn mb-8 rounded-md border-l-4 border-green-500 bg-green-50 p-4 text-green-700 shadow-lg">
// //                 {" "}
// //                 <div className="flex">
// //                   {" "}
// //                   <div className="py-1">
// //                     <Sparkles className="mr-4 h-6 w-6 text-green-500" />
// //                   </div>{" "}
// //                   <div>
// //                     {" "}
// //                     <p className="text-lg font-bold">
// //                       {editingPortfolioId
// //                         ? "Portfolio Updated!"
// //                         : "Portfolio Published!"}
// //                     </p>{" "}
// //                     <div
// //                       className="mt-1 text-sm"
// //                       dangerouslySetInnerHTML={{
// //                         __html: successMessage.replace(
// //                           /Shareable Link: (http[s]?:\/\/[^\s]+)/,
// //                           'Shareable Link: <a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline hover:text-blue-700 font-medium">$1</a>',
// //                         ),
// //                       }}
// //                     />{" "}
// //                   </div>{" "}
// //                 </div>{" "}
// //               </div>
// //             )}
// //             {error && !successMessage && (
// //               <div className="animate-fadeIn mb-8 rounded-md border-l-4 border-red-500 bg-red-50 p-4 text-red-700 shadow-lg">
// //                 <span className="font-bold">Error:</span> {error}
// //               </div>
// //             )}

// //             <div className="mt-12 flex flex-col items-center justify-end gap-4 border-t-2 border-gray-300 pt-10 sm:flex-row">
// //               <button
// //                 type="button"
// //                 onClick={() => router.back()}
// //                 className={secondaryButtonClass}
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 onClick={handleSaveOrPublish}
// //                 disabled={isProcessing || isLoadingPage}
// //                 className={`${primaryButtonClass} min-w-[240px] text-lg`}
// //               >
// //                 {isProcessing
// //                   ? "Processing..."
// //                   : editingPortfolioId
// //                     ? "Update Portfolio"
// //                     : "Save & Publish Portfolio"}
// //               </button>
// //             </div>
// //           </div>
// //         </DndContext>

// //         <aside className="space-y-6 lg:col-span-1">
// //           <div className="sticky top-10 rounded-xl border border-slate-300 bg-slate-200 p-6 shadow-xl">
// //             <h3 className="mb-4 flex items-center border-b-2 border-slate-400 pb-3 text-xl font-bold text-gray-800">
// //               <FileText size={24} className="mr-3 text-slate-700" /> Source
// //               Draft Context
// //             </h3>
// //             {sourceDraft?.wizardPersonalData?.fullName && (
// //               <p className="mb-2 text-sm">
// //                 <strong className="font-semibold text-slate-700">Name:</strong>{" "}
// //                 {sourceDraft.wizardPersonalData.fullName}
// //               </p>
// //             )}
// //             {sourceDraft?.wizardSummary && (
// //               <div className="mb-3">
// //                 <strong className="mb-0.5 block text-sm font-semibold text-slate-700">
// //                   Summary Snippet:
// //                 </strong>{" "}
// //                 <p className="rounded-md bg-white p-2 text-xs italic text-gray-700 shadow-sm">
// //                 &quot;{sourceDraft.wizardSummary.substring(0, 150)}...&quot;
// //                 </p>
// //               </div>
// //             )}
// //             {sourceDraft?.aiCareerNarrative && (
// //               <div className="mb-3">
// //                 <strong className="mb-0.5 block text-sm font-semibold text-slate-700">
// //                   AI Narrative Snippet:
// //                 </strong>{" "}
// //                 <p className="rounded-md bg-white p-2 text-xs italic text-gray-700 shadow-sm">
// //                 &quot;{sourceDraft.aiCareerNarrative.substring(0, 150)}...&quot;
// //                 </p>
// //               </div>
// //             )}
// //             {sourceDraft?.aiGoldenThread && (
// //               <p className="mb-3 text-sm">
// //                 <strong className="font-semibold text-slate-700">
// //                   Golden Thread:
// //                 </strong>{" "}
// //                 <span className="font-semibold italic text-purple-700">
// //                   {sourceDraft.aiGoldenThread}
// //                 </span>
// //               </p>
// //             )}
// //             <p className="mt-5 border-t border-slate-400 pt-3 text-xs text-slate-600">
// //               Read-only view of your resume draft. Use the editor on the left to
// //               build your Living Portfolio.
// //             </p>
// //           </div>
// //         </aside>
// //       </div>
// //     </div>
// //   );
// // }

// // src/app/portfolio-editor/[idOrAction]/page.tsx
// "use client";

// import React, { useState, useEffect } from "react";
// import { useParams, useRouter, useSearchParams } from "next/navigation";
// import axios,{ AxiosError }  from "axios";
// import { useUser } from "@clerk/nextjs";
// import Link from "next/link";
// import {
//   ArrowLeft,
//   Plus,
//   Trash2,
//   GripVertical,
//   FolderKanban,
//   FileText,
//   Palette,
//   Eye,
//   Settings2,
//   Edit3 as EditIcon,
//   ChevronDown,
//   ChevronUp,
//   Layers,
//   MessageSquareQuote,
//   Briefcase,
//   Brain,
//   Zap,
//   Sparkles,
//   ListChecks,
//   UserCircle,
//   GraduationCap,
//   Gift,
//   ShieldCheck,
//   ThumbsUp,
//   Info,
// } from "lucide-react";
// import {
//   DndContext,
//   closestCenter,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
//   DragEndEvent,
// } from "@dnd-kit/core";
// import {
//   arrayMove,
//   SortableContext,
//   sortableKeyboardCoordinates,
//   verticalListSortingStrategy,
//   useSortable,
// } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import { ResumeJSON } from "@/components/ATSScore";
// import {
//   InitialNarrativeResult,
//   WhatIfResult,
//   HiddenGemsResult,
// } from "@/components/NarrativeWeaver";

// // --- Interfaces ---
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
// interface LivingPortfolioSettings {
//   title: string;
//   slug?: string | null | undefined;
//   isPublic: boolean;
//   theme: string;
//   displaySettings: LivingPortfolioDisplaySettings;
//   publicFullName?: string;
//   publicJobTitle?: string;
//   publicEmail?: string;
//   publicPhone?: string;
//   publicLocation?: string;
//   publicLinkedInUrl?: string;
//   publicSummary?: string;
//   publicSkills?: string[];
//   publicWorkExperiences?: ResumeJSON["workExperiences"];
//   publicEducations?: ResumeJSON["educations"];
//   publicVolunteering?: ResumeJSON["volunteering"];
//   publicCertifications?: ResumeJSON["certifications"];
//   publicCareerNarrative?: string;
//   publicGoldenThread?: string;
//   publicGoldenThreadEvidence?: InitialNarrativeResult["goldenThreadEvidence"];
//   publicKeyThemes?: InitialNarrativeResult["keyThemes"];
//   publicHiddenGems?: HiddenGemsResult;
//   selectedPublicWhatIfs: Array<{
//     scenarioText: string;
//     adaptedResult: WhatIfResult;
//   }>;
//   showcaseSections: Array<ShowcaseSectionData>;
// }
// interface SourceResumeDraftData {
//   id: string;
//   title?: string | null;
//   wizardPersonalData?: (ResumeJSON["personal"] & { jobTitle?: string }) | null;
//   wizardSummary?: string | null;
//   wizardSkills?: string[] | null;
//   wizardWorkExperiences?: ResumeJSON["workExperiences"] | null;
//   wizardEducations?: ResumeJSON["educations"] | null;
//   wizardVolunteering?: ResumeJSON["volunteering"] | null;
//   wizardCertifications?: ResumeJSON["certifications"] | null;
//   aiCareerNarrative?: string | null;
//   aiGoldenThread?: string | null;
//   aiGoldenThreadEvidence?: InitialNarrativeResult["goldenThreadEvidence"] | null;
//   aiKeyThemes?: InitialNarrativeResult["keyThemes"] | null;
//   aiHiddenGemsResultJson?: HiddenGemsResult | null;
//   aiWhatIfResultsCache?: Array<{
//     scenarioText: string;
//     result: WhatIfResult;
//   }> | null;
// }
// interface ExistingLivingPortfolioData extends LivingPortfolioSettings {
//   id: string;
//   sourceResumeDraftId: string;
// }

// const defaultDisplaySettingsConst: LivingPortfolioDisplaySettings = {
//   contact: {
//     showFullName: true,
//     showEmail: true,
//     showPhone: true,
//     showLocation: true,
//     showLinkedIn: true,
//     showPhoto: false,
//   },
//   sections: {
//     showSummary: true,
//     showSkills: true,
//     showWorkExperience: true,
//     showEducation: true,
//     showVolunteering: true,
//     showCertifications: true,
//     showReferences: false,
//   },
//   narrativeSuite: {
//     showCareerNarrative: true,
//     showGoldenThread: true,
//     showKeyThemes: true,
//     showHiddenGems: true,
//   },
// };

// const initialPortfolioSettingsShell: LivingPortfolioSettings = {
//   title: "",
//   slug: "",
//   isPublic: true,
//   theme: "default",
//   displaySettings: JSON.parse(JSON.stringify(defaultDisplaySettingsConst)),
//   selectedPublicWhatIfs: [],
//   showcaseSections: [],
//   publicFullName: undefined,
//   publicJobTitle: undefined,
//   publicEmail: undefined,
//   publicPhone: undefined,
//   publicLocation: undefined,
//   publicLinkedInUrl: undefined,
//   publicSummary: undefined,
//   publicSkills: [],
//   publicWorkExperiences: [],
//   publicEducations: [],
//   publicVolunteering: [],
//   publicCertifications: [],
//   publicCareerNarrative: undefined,
//   publicGoldenThread: undefined,
//   publicGoldenThreadEvidence: [],
//   publicKeyThemes: [],
//   publicHiddenGems: undefined,
// };

// const availableThemes = [
//   { id: "default", name: "Default Professional" },
//   { id: "modern-dark", name: "Modern Dark" },
//   { id: "creative-light", name: "Creative Light" },
//   { id: "minimalist-focus", name: "Minimalist Focus" },
// ];
// const inputBaseClass =
//   "block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-150";
// const checkboxLabelClass =
//   "flex items-center space-x-2.5 cursor-pointer text-sm py-1 text-gray-700 hover:text-indigo-700 transition-colors";
// const checkboxClass =
//   "h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 focus:ring-offset-1 shadow-sm";
// const sectionCardClass = "bg-white p-6 sm:p-8 rounded-xl shadow-xl";
// const sectionTitleClass =
//   "text-2xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-4 flex items-center gap-3";
// const subSectionTitleClass = "text-lg font-semibold text-gray-700 mb-3";
// const textareaBaseClass =
//   "block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-150 resize-y";
// const primaryButtonClass =
//   "inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors";
// const secondaryButtonClass =
//   "inline-flex items-center justify-center px-5 py-2.5 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition-colors";
// const iconButtonClass =
//   "p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors";

// const EditorCollapsibleSection: React.FC<{
//   title: string;
//   children: React.ReactNode;
//   icon?: React.ReactNode;
//   initiallyOpen?: boolean;
//   isVisible?: boolean;
// }> = ({ title, children, icon, initiallyOpen = false, isVisible = true }) => {
//   const [isOpen, setIsOpen] = useState(initiallyOpen);
//   if (!isVisible) return null;
//   return (
//     <div className="my-4 overflow-hidden rounded-lg border border-gray-300 bg-slate-50/70 shadow-sm transition-all duration-300 ease-in-out hover:shadow-md">
//       <button
//         type="button"
//         onClick={() => setIsOpen(!isOpen)}
//         className="flex w-full items-center justify-between p-4 text-left font-medium text-gray-800 transition-colors hover:bg-slate-100 focus:outline-none"
//       >
//         <span className="text-md flex items-center">
//           {icon && (
//             <span className="mr-2.5 text-indigo-600 opacity-80">{icon}</span>
//           )}
//           {title}
//         </span>
//         {isOpen ? (
//           <ChevronUp size={20} className="text-gray-500" />
//         ) : (
//           <ChevronDown size={20} className="text-gray-500" />
//         )}
//       </button>
//       {isOpen && (
//         <div className="space-y-4 border-t border-gray-200 bg-white p-5">
//           {children}
//         </div>
//       )}
//     </div>
//   );
// };

// function SortableShowcaseItem({
//   sectionId,
//   item,
//   updateShowcaseItem,
//   deleteShowcaseItem,
// }: {
//   sectionId: string;
//   item: ShowcaseItem;
//   updateShowcaseItem: (
//     sectionId: string,
//     itemId: string,
//     field: keyof Omit<ShowcaseItem, "id">,
//     value: string | string[],
//   ) => void;
//   deleteShowcaseItem: (sectionId: string, itemId: string) => void;
// }) {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//     isDragging,
//   } = useSortable({
//     id: item.id,
//     data: { type: "item", sectionId: sectionId },
//   });
//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     opacity: isDragging ? 0.7 : 1,
//     zIndex: isDragging ? 100 : "auto",
//   };
//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       className="group relative mb-4 space-y-4 rounded-lg border border-gray-300 bg-white p-5 shadow-md transition-shadow hover:shadow-lg"
//     >
//       <div className="flex items-start justify-between">
//         <div
//           {...attributes}
//           {...listeners}
//           className={`-ml-1.5 cursor-grab touch-none p-1.5 text-gray-400 hover:text-gray-600`}
//         >
//           <GripVertical size={20} />
//         </div>
//         <div className="ml-2 flex-grow space-y-3">
//           <div>
//             <label
//               htmlFor={`itemName-${sectionId}-${item.id}`}
//               className="mb-1 block text-xs font-semibold text-gray-600"
//             >
//               Item Name*
//             </label>
//             <input
//               id={`itemName-${sectionId}-${item.id}`}
//               type="text"
//               value={item.name}
//               onChange={(e) =>
//                 updateShowcaseItem(sectionId, item.id, "name", e.target.value)
//               }
//               placeholder="E.g., Customer Churn Prediction Model"
//               className={`${inputBaseClass} py-2.5 text-sm`}
//             />
//           </div>
//           <div>
//             <label
//               htmlFor={`itemDesc-${sectionId}-${item.id}`}
//               className="mb-1 block text-xs font-semibold text-gray-600"
//             >
//               Description*
//             </label>
//             <textarea
//               id={`itemDesc-${sectionId}-${item.id}`}
//               value={item.description}
//               onChange={(e) =>
//                 updateShowcaseItem(
//                   sectionId,
//                   item.id,
//                   "description",
//                   e.target.value,
//                 )
//               }
//               placeholder="Detailed description..."
//               rows={4}
//               className={`${textareaBaseClass} min-h-[80px] py-2.5 text-sm`}
//             />
//           </div>
//           <div>
//             <label
//               htmlFor={`itemLink-${sectionId}-${item.id}`}
//               className="mb-1 block text-xs font-semibold text-gray-600"
//             >
//               Link (Optional)
//             </label>
//             <input
//               id={`itemLink-${sectionId}-${item.id}`}
//               type="url"
//               value={item.link || ""}
//               onChange={(e) =>
//                 updateShowcaseItem(sectionId, item.id, "link", e.target.value)
//               }
//               placeholder="https://github.com/..."
//               className={`${inputBaseClass} py-2.5 text-sm`}
//             />
//           </div>
//           <div>
//             <label
//               htmlFor={`itemSkills-${sectionId}-${item.id}`}
//               className="mb-1 block text-xs font-semibold text-gray-600"
//             >
//               Skills Used (comma-separated)
//             </label>
//             <textarea
//               id={`itemSkills-${sectionId}-${item.id}`}
//               value={(item.skillsUsed || []).join(",")}
//               onChange={(e) => {
//                 const skillsArray = e.target.value.split(",");
//                 updateShowcaseItem(
//                   sectionId,
//                   item.id,
//                   "skillsUsed",
//                   skillsArray,
//                 );
//               }}
//               placeholder="React, Node.js, Project Management"
//               rows={2}
//               className={`${textareaBaseClass} min-h-[60px] py-2.5 text-sm`}
//             />
//           </div>
//         </div>
//         <button
//           type="button"
//           onClick={() => deleteShowcaseItem(sectionId, item.id)}
//           className={`${iconButtonClass} ml-2 !text-red-500 hover:!bg-red-100 hover:!text-red-700`}
//           title="Delete Item"
//         >
//           <Trash2 size={18} />
//         </button>
//       </div>
//     </div>
//   );
// }

// function SortableShowcaseSection({
//   section,
//   children,
//   updateShowcaseSectionTitle,
//   deleteShowcaseSection,
// }: {
//   section: ShowcaseSectionData;
//   children: React.ReactNode;
//   updateShowcaseSectionTitle: (sectionId: string, newTitle: string) => void;
//   deleteShowcaseSection: (sectionId: string) => void;
// }) {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//     isDragging,
//   } = useSortable({ id: section.id, data: { type: "section" } });
//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     opacity: isDragging ? 0.8 : 1,
//     boxShadow: isDragging ? "0 10px 20px rgba(0,0,0,0.1)" : "",
//     zIndex: isDragging ? 100 : "auto",
//   };
//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       className="space-y-5 rounded-xl border-2 border-gray-200 bg-slate-50 p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl"
//     >
//       <div className="mb-5 flex items-center border-b-2 border-gray-300 pb-3">
//         <div
//           {...attributes}
//           {...listeners}
//           className={`-ml-2 mr-2 cursor-grab p-2 ${iconButtonClass} touch-none text-gray-400 hover:text-gray-700`}
//         >
//           <GripVertical size={24} />
//         </div>
//         <input
//           type="text"
//           value={section.title}
//           onChange={(e) =>
//             updateShowcaseSectionTitle(section.id, e.target.value)
//           }
//           placeholder="Section Title"
//           className="w-full flex-grow border-0 border-b-2 border-transparent bg-transparent p-2 text-xl font-semibold placeholder-gray-500 outline-none focus:border-indigo-500 focus:ring-0"
//         />
//         <button
//           type="button"
//           onClick={() => deleteShowcaseSection(section.id)}
//           className={`${iconButtonClass} ml-4 !text-red-500 hover:!bg-red-100 hover:!text-red-700`}
//           title="Delete Section"
//         >
//           <Trash2 size={20} />
//         </button>
//       </div>
//       {children}
//     </div>
//   );
// }

// export default function PortfolioEditorPage() {
//   const router = useRouter();
//   const params = useParams();
//   const searchParams = useSearchParams();
//   const { user, isLoaded: isUserLoaded } = useUser();
//   const idOrActionParam = params?.idOrAction as string | undefined;

//   const [isLoadingPage, setIsLoadingPage] = useState(true);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const [portfolioUrl, setPortfolioUrl] = useState<string | null>(null); // New state for shareable link
//   const [sourceDraft, setSourceDraft] = useState<SourceResumeDraftData | null>(null);
//   const [portfolioSettings, setPortfolioSettings] = useState<LivingPortfolioSettings | null>(() =>
//     JSON.parse(JSON.stringify(initialPortfolioSettingsShell)),
//   );
//   const [editingPortfolioId, setEditingPortfolioId] = useState<string | null>(null);

//   const sensors = useSensors(
//     useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     }),
//   );

//   useEffect(() => {
//     if (!idOrActionParam || !isUserLoaded) return;
//     if (!user) {
//       router.push("/sign-in");
//       return;
//     }

//     const loadData = async () => {
//       setIsLoadingPage(true);
//       setError(null);
//       // Do not reset successMessage or portfolioUrl to preserve them after navigation
//       setEditingPortfolioId(null);
//       setSourceDraft(null);
//       let tempPortfolioSettings: LivingPortfolioSettings;

//       try {
//         let draftDataToUse: SourceResumeDraftData | null = null;

//         if (idOrActionParam === "new") {
//           const draftIdQuery = searchParams?.get("draftId");
//           if (!draftIdQuery)
//             throw new Error("Resume Draft ID required for new portfolio.");
//           const draftRes = await axios.get(`/api/resume-drafts/${draftIdQuery}`);
//           draftDataToUse = draftRes.data.draft as SourceResumeDraftData;
//           if (!draftDataToUse)
//             throw new Error("Failed to fetch source resume draft.");

//           tempPortfolioSettings = {
//             title: `${draftDataToUse.wizardPersonalData?.fullName || "My"} Portfolio`,
//             ...JSON.parse(JSON.stringify(initialPortfolioSettingsShell)),
//           };

//           const ds = tempPortfolioSettings.displaySettings;
//           if (draftDataToUse.wizardPersonalData) {
//             tempPortfolioSettings.publicFullName = ds.contact.showFullName
//               ? draftDataToUse.wizardPersonalData.fullName
//               : undefined;
//             tempPortfolioSettings.publicJobTitle =
//               draftDataToUse.wizardPersonalData.jobTitle || undefined;
//             tempPortfolioSettings.publicEmail = ds.contact.showEmail
//               ? draftDataToUse.wizardPersonalData.email
//               : undefined;
//             tempPortfolioSettings.publicPhone = ds.contact.showPhone
//               ? draftDataToUse.wizardPersonalData.phone
//               : undefined;
//             tempPortfolioSettings.publicLocation = ds.contact.showLocation
//               ? `${draftDataToUse.wizardPersonalData.city}, ${draftDataToUse.wizardPersonalData.country}`.replace(/^, |, $/g, "")
//               : undefined;
//             tempPortfolioSettings.publicLinkedInUrl = ds.contact.showLinkedIn
//               ? draftDataToUse.wizardPersonalData.linkedinUrl
//               : undefined;
//           }
//           tempPortfolioSettings.publicSummary = ds.sections.showSummary
//             ? draftDataToUse.wizardSummary || ""
//             : "";
//           tempPortfolioSettings.publicSkills = ds.sections.showSkills
//             ? draftDataToUse.wizardSkills || []
//             : [];
//           tempPortfolioSettings.publicWorkExperiences = ds.sections.showWorkExperience
//             ? draftDataToUse.wizardWorkExperiences || []
//             : [];
//           tempPortfolioSettings.publicEducations = ds.sections.showEducation
//             ? draftDataToUse.wizardEducations || []
//             : [];
//           tempPortfolioSettings.publicVolunteering = ds.sections.showVolunteering
//             ? draftDataToUse.wizardVolunteering || []
//             : [];
//           tempPortfolioSettings.publicCertifications = ds.sections.showCertifications
//             ? draftDataToUse.wizardCertifications || []
//             : [];
//           tempPortfolioSettings.publicCareerNarrative = ds.narrativeSuite.showCareerNarrative
//             ? draftDataToUse.aiCareerNarrative || ""
//             : "";
//           tempPortfolioSettings.publicGoldenThread = ds.narrativeSuite.showGoldenThread
//             ? draftDataToUse.aiGoldenThread || ""
//             : "";
//           tempPortfolioSettings.publicGoldenThreadEvidence =
//             ds.narrativeSuite.showGoldenThread && draftDataToUse.aiGoldenThreadEvidence
//               ? draftDataToUse.aiGoldenThreadEvidence
//               : [];
//           tempPortfolioSettings.publicKeyThemes =
//             ds.narrativeSuite.showKeyThemes && draftDataToUse.aiKeyThemes
//               ? draftDataToUse.aiKeyThemes
//               : [];
//           tempPortfolioSettings.publicHiddenGems =
//             ds.narrativeSuite.showHiddenGems && draftDataToUse.aiHiddenGemsResultJson
//               ? draftDataToUse.aiHiddenGemsResultJson
//               : undefined;
//         } else {
//           setEditingPortfolioId(idOrActionParam);
//           const portfolioRes = await axios.get(`/api/living-portfolios/edit/${idOrActionParam}`);
//           const existingPortfolio: ExistingLivingPortfolioData = portfolioRes.data.portfolio;
//           if (!existingPortfolio)
//             throw new Error("Portfolio to edit not found or access denied.");

//           tempPortfolioSettings = {
//             title: existingPortfolio.title,
//             slug: existingPortfolio.slug || "",
//             isPublic: existingPortfolio.isPublic,
//             theme: existingPortfolio.theme,
//             displaySettings: {
//               contact: {
//                 ...defaultDisplaySettingsConst.contact,
//                 ...(existingPortfolio.displaySettings?.contact || {}),
//               },
//               sections: {
//                 ...defaultDisplaySettingsConst.sections,
//                 ...(existingPortfolio.displaySettings?.sections || {}),
//               },
//               narrativeSuite: {
//                 ...defaultDisplaySettingsConst.narrativeSuite,
//                 ...(existingPortfolio.displaySettings?.narrativeSuite || {}),
//               },
//             },
//             publicFullName: existingPortfolio.publicFullName,
//             publicJobTitle: existingPortfolio.publicJobTitle,
//             publicEmail: existingPortfolio.publicEmail,
//             publicPhone: existingPortfolio.publicPhone,
//             publicLocation: existingPortfolio.publicLocation,
//             publicLinkedInUrl: existingPortfolio.publicLinkedInUrl,
//             publicSummary: existingPortfolio.publicSummary || "",
//             publicSkills: existingPortfolio.publicSkills || [],
//             publicWorkExperiences: existingPortfolio.publicWorkExperiences || [],
//             publicEducations: existingPortfolio.publicEducations || [],
//             publicVolunteering: existingPortfolio.publicVolunteering || [],
//             publicCertifications: existingPortfolio.publicCertifications || [],
//             publicCareerNarrative: existingPortfolio.publicCareerNarrative || "",
//             publicGoldenThread: existingPortfolio.publicGoldenThread || "",
//             publicGoldenThreadEvidence: existingPortfolio.publicGoldenThreadEvidence || [],
//             publicKeyThemes: existingPortfolio.publicKeyThemes || [],
//             publicHiddenGems: existingPortfolio.publicHiddenGems || undefined,
//             selectedPublicWhatIfs: existingPortfolio.selectedPublicWhatIfs || [],
//             showcaseSections: existingPortfolio.showcaseSections || [],
//           };

//           // Set portfolioUrl for existing portfolio
//           const url = `${window.location.origin}/portfolio/${existingPortfolio.slug || idOrActionParam}`;
//           setPortfolioUrl(url);

//           if (existingPortfolio.sourceResumeDraftId) {
//             const draftRes = await axios.get(`/api/resume-drafts/${existingPortfolio.sourceResumeDraftId}`);
//             draftDataToUse = draftRes.data.draft as SourceResumeDraftData;
//           }
//         }
//         setSourceDraft(draftDataToUse);
//         setPortfolioSettings(tempPortfolioSettings);
//       } catch (err: unknown) {
//         console.error("Error in Portfolio Editor data fetching:", err);
//         setError(err instanceof Error ? err.message : "Failed to load editor data.");
//       } finally {
//         setIsLoadingPage(false);
//       }
//     };
//     if (idOrActionParam && isUserLoaded && user) loadData();
//   }, [idOrActionParam, searchParams, user, isUserLoaded, router]);

//   const handleSettingChange = (
//     field: keyof LivingPortfolioSettings | "displaySettings",
//     pathOrValue: string | boolean | string[],
//     valueForDisplaySetting?: boolean,
//   ) => {
//     setPortfolioSettings((prev) => {
//       if (!prev) return null;
//       if (field !== "displaySettings") {
//         return {
//           ...prev,
//           [field as keyof LivingPortfolioSettings]: pathOrValue,
//         };
//       } else {
//         const pathString = pathOrValue as string;
//         const value = valueForDisplaySetting;
//         const keys = pathString.split(".");
//         if (keys.length === 2) {
//           const parentKey = keys[0] as keyof LivingPortfolioDisplaySettings;
//           const childKey = keys[1];
//           if (
//             prev.displaySettings &&
//             parentKey in prev.displaySettings &&
//             childKey in prev.displaySettings[parentKey]
//           ) {
//             return {
//               ...prev,
//               displaySettings: {
//                 ...prev.displaySettings,
//                 [parentKey]: {
//                   ...prev.displaySettings[parentKey],
//                   [childKey]: value,
//                 },
//               },
//             };
//           }
//         }
//         console.warn("Invalid path for displaySettings update:", pathString);
//         return prev;
//       }
//     });
//   };

//   type PublicContentValue =
//     | string
//     | string[]
//     | ResumeJSON["workExperiences"]
//     | ResumeJSON["educations"]
//     | ResumeJSON["volunteering"]
//     | ResumeJSON["certifications"]
//     | string | null
//     | InitialNarrativeResult["goldenThreadEvidence"]
//     | InitialNarrativeResult["keyThemes"]
//     | HiddenGemsResult
//     | Array<{ scenarioText: string; adaptedResult: WhatIfResult }>;

//   const handlePublicContentChange = (
//     field: keyof LivingPortfolioSettings,
//     value: PublicContentValue,
//   ) => {
//     setPortfolioSettings((prev) => (prev ? { ...prev, [field]: value } : null));
//   };

//   const handleToggleWhatIf = (whatIfItemFromDraft: {
//     scenarioText: string;
//     result: WhatIfResult;
//   }) => {
//     setPortfolioSettings((prev) => {
//       if (!prev) return null;
//       const { scenarioText, result } = whatIfItemFromDraft;
//       const currentSelected = prev.selectedPublicWhatIfs;
//       const existingIndex = currentSelected.findIndex(
//         (item) => item.scenarioText === scenarioText,
//       );
//       if (existingIndex > -1) {
//         return {
//           ...prev,
//           selectedPublicWhatIfs: currentSelected.filter(
//             (_, i) => i !== existingIndex,
//           ),
//         };
//       } else {
//         return {
//           ...prev,
//           selectedPublicWhatIfs: [
//             ...currentSelected,
//             { scenarioText, adaptedResult: result },
//           ],
//         };
//       }
//     });
//   };

//   const addShowcaseSection = () =>
//     setPortfolioSettings((prev) =>
//       prev
//         ? {
//             ...prev,
//             showcaseSections: [
//               ...prev.showcaseSections,
//               {
//                 id: `section-${Date.now()}`,
//                 title: "New Showcase Section",
//                 items: [],
//               },
//             ],
//           }
//         : null,
//     );
//   const updateShowcaseSectionTitle = (sectionId: string, newTitle: string) =>
//     setPortfolioSettings((prev) =>
//       prev
//         ? {
//             ...prev,
//             showcaseSections: prev.showcaseSections.map((s) =>
//               s.id === sectionId ? { ...s, title: newTitle } : s,
//             ),
//           }
//         : null,
//     );
//   const deleteShowcaseSection = (sectionId: string) => {
//     if (window.confirm("Delete section?")) {
//       setPortfolioSettings((prev) =>
//         prev
//           ? {
//               ...prev,
//               showcaseSections: prev.showcaseSections.filter(
//                 (s) => s.id !== sectionId,
//               ),
//             }
//           : null,
//       );
//     }
//   };
//   const addShowcaseItem = (sectionId: string) =>
//     setPortfolioSettings((prev) =>
//       prev
//         ? {
//             ...prev,
//             showcaseSections: prev.showcaseSections.map((s) =>
//               s.id === sectionId
//                 ? {
//                     ...s,
//                     items: [
//                       ...s.items,
//                       {
//                         id: `item-${Date.now()}`,
//                         name: "New Item",
//                         description: "",
//                         skillsUsed: [],
//                       },
//                     ],
//                   }
//                 : s,
//             ),
//           }
//         : null,
//     );
//   const updateShowcaseItem = (
//     sectionId: string,
//     itemId: string,
//     field: keyof Omit<ShowcaseItem, "id">,
//     value: string | string[],
//   ) => {
//     setPortfolioSettings((prev) =>
//       prev
//         ? {
//             ...prev,
//             showcaseSections: prev.showcaseSections.map((s) =>
//               s.id === sectionId
//                 ? {
//                     ...s,
//                     items: s.items.map((i) =>
//                       i.id === itemId ? { ...i, [field]: value } : i,
//                     ),
//                   }
//                 : s,
//             ),
//           }
//         : null,
//     );
//   };
//   const deleteShowcaseItem = (sectionId: string, itemId: string) => {
//     if (window.confirm("Delete item?")) {
//       setPortfolioSettings((prev) =>
//         prev
//           ? {
//               ...prev,
//               showcaseSections: prev.showcaseSections.map((s) =>
//                 s.id === sectionId
//                   ? { ...s, items: s.items.filter((i) => i.id !== itemId) }
//                   : s,
//               ),
//             }
//           : null,
//       );
//     }
//   };

//   const handleDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event;
//     if (!over || !portfolioSettings) return;
//     const activeId = active.id as string;
//     const overId = over.id as string;
//     const activeType = active.data.current?.type as string;
//     if (activeType === "section" && activeId !== overId) {
//       setPortfolioSettings((prev) =>
//         prev
//           ? {
//               ...prev,
//               showcaseSections: arrayMove(
//                 prev.showcaseSections,
//                 prev.showcaseSections.findIndex((s) => s.id === activeId),
//                 prev.showcaseSections.findIndex((s) => s.id === overId),
//               ),
//             }
//           : null,
//       );
//     } else if (activeType === "item") {
//       const activeSectionId = active.data.current?.sectionId as string;
//       setPortfolioSettings((prev) =>
//         prev
//           ? {
//               ...prev,
//               showcaseSections: prev.showcaseSections.map((section) =>
//                 section.id === activeSectionId
//                   ? {
//                       ...section,
//                       items: arrayMove(
//                         section.items,
//                         section.items.findIndex((i) => i.id === activeId),
//                         section.items.findIndex((i) => i.id === overId),
//                       ),
//                     }
//                   : section,
//               ),
//             }
//           : null,
//       );
//     }
//   };

//   const handleSaveOrPublish = async () => {
//     if (!portfolioSettings) {
//       setError("Settings not loaded. Cannot save.");
//       return;
//     }

//     setIsProcessing(true);
//     // ----> CLEAR BOTH MESSAGES AT THE START <----
//     setSuccessMessage(null);
//     setError(null);

//     if (!portfolioSettings.title || portfolioSettings.title.trim() === "") {
//       setError("Portfolio Title is required. Please enter a title for your portfolio.");
//       const titleInput = document.getElementById('portfolioTitle');
//       if (titleInput) titleInput.focus();
//       return;
//     }

//     if (!editingPortfolioId && !sourceDraft?.id) {
//       setError("Source resume draft is missing or invalid for a new portfolio. Cannot save.");
//       return;
//     }

//     setIsProcessing(true);
//     setSuccessMessage(null);
//     setError(null);

//     // 1. Transformations that WERE in your original code:
//     const cleanedShowcaseSections = portfolioSettings.showcaseSections.map(section => ({
//       ...section,
//       title: section.title.trim(), // Keep title trim for section
//       items: section.items.map(item => ({
//         ...item,
//         name: item.name.trim(), // Keep name trim for item
//         description: item.description.trim(), // Keep description trim
//         link: item.link?.trim() || undefined,
//         skillsUsed: (item.skillsUsed || []).map(skill => skill.trim()).filter(Boolean), // This was in your original
//       })),
//     })).filter(section => section.title);

//     // Construct the payload based on spreading portfolioSettings and applying original overrides
//     // This approach avoids the TypeScript errors from trying to access potentially non-existent deep properties.
//     const payloadForApi: LivingPortfolioSettings & { sourceResumeDraftId?: string } = {
//       ...portfolioSettings, // Start with all current settings

//       // Override with specifically cleaned/processed fields from your original logic
//       title: portfolioSettings.title.trim(), // Keep top-level title trim
//       slug: portfolioSettings.slug === null ? null : (portfolioSettings.slug?.trim() || ""), // Keep slug processing

//       showcaseSections: cleanedShowcaseSections,

//       publicSkills: (portfolioSettings.publicSkills || []).map(s => s.trim()).filter(Boolean),

//       publicWorkExperiences: portfolioSettings.publicWorkExperiences?.map(exp => ({
//         ...exp, // Spread the original work experience item
//         // Only transform 'bullets' as per original logic
//         bullets: (exp.bullets || []).map(b => b.trim()).filter(Boolean),
//         // DO NOT add .trim() to exp.company, exp.jobTitle etc. here unless they were in your original code
//       })) || [],

//       // publicEducations will be sent as-is from portfolioSettings via the spread.
//       // No deep property trimming will be applied here unless you add it explicitly.

//       publicVolunteering: portfolioSettings.publicVolunteering?.map(vol => ({
//         ...vol, // Spread the original volunteering item
//         // Only transform 'bullets' as per original logic
//         bullets: ((vol as any).bullets || []).map((b: string) => b.trim()).filter(Boolean),
//         // DO NOT add .trim() to vol.organization, vol.role etc. here
//       })) || [],

//       // publicCertifications will be sent as-is from portfolioSettings via the spread.
//       // No deep property trimming (like for issuingOrganization) will be applied here.

//       // Other fields from portfolioSettings (like publicFullName, publicEmail, publicSummary, etc.)
//       // will also be sent as-is. If you want to trim them, you'd add them explicitly:
//       // publicSummary: portfolioSettings.publicSummary?.trim() || undefined,
//       // For now, adhering to "only what was in original code" for deep transformations.
//     };

//     if (!editingPortfolioId && sourceDraft?.id) {
//       payloadForApi.sourceResumeDraftId = sourceDraft.id;
//     }
//     // Note: The 'Partial<LivingPortfolioSettings>' type used in my previous, more detailed mapping
//     // is not strictly necessary here because we are spreading the full 'portfolioSettings' object
//     // which already conforms to 'LivingPortfolioSettings'.

//     try {
//       let response;
//       let newPortfolioUrl: string;

//       if (editingPortfolioId) {
//         response = await axios.put(`/api/living-portfolios/${editingPortfolioId}`, payloadForApi);
//         const returnedSlug = response.data.portfolioSlug || editingPortfolioId;
//         newPortfolioUrl = `${window.location.origin}/portfolio/${returnedSlug}`;
//         setSuccessMessage(`Portfolio updated successfully!`);
//         setPortfolioUrl(newPortfolioUrl);
//         setError(null); // Explicitly clear error on success
//         if (response.data.portfolioSlug && portfolioSettings.slug !== response.data.portfolioSlug) {
//             handleSettingChange("slug", response.data.portfolioSlug);
//         }
//       } else {
//         if (!payloadForApi.sourceResumeDraftId) {
//           throw new Error("Source draft ID is essential for creating a new portfolio.");
//         }
//         response = await axios.post("/api/living-portfolios/publish", payloadForApi);
//         const newPortfolioId = response.data.portfolioId;
//         const returnedSlug = response.data.portfolioSlug || newPortfolioId;
//         newPortfolioUrl = `${window.location.origin}/portfolio/${returnedSlug}`;
//         setSuccessMessage(`Portfolio published successfully! Your portfolio is now live.`);
//         setPortfolioUrl(newPortfolioUrl);
//         setEditingPortfolioId(newPortfolioId);
//         router.replace(`/portfolio-editor/${newPortfolioId}`, { scroll: false });
//       }
//       setError(null);

//     } catch (err: unknown) {
//       // ... (error handling logic remains the same as in the previous full response)
//       console.error("Error saving/publishing portfolio (raw error object):", err);
//       let userFriendlyError = "Failed to save portfolio. An unexpected error occurred. Please try again.";

//       if (axios.isAxiosError(err)) {
//         const axiosError = err as AxiosError<any>;

//         if (axiosError.response) {
//           const status = axiosError.response.status;
//           const responseData = axiosError.response.data;

//           console.error("API Error Status:", status);
//           console.error("API Error Response Data:", responseData);

//           if (status === 409) {
//             if (responseData && responseData.errorType === "DUPLICATE_SLUG") {
//               userFriendlyError = responseData.message || "This custom URL slug is already in use. Please choose a different one.";
//               const slugInput = document.getElementById('portfolioSlug');
//               if (slugInput) slugInput.focus();
//             } else if (responseData && responseData.errorType === "UNIQUE_CONSTRAINT_VIOLATION") {
//                  userFriendlyError = responseData.message || "A piece of information conflicts with existing data. Please review your inputs.";
//             } else if (responseData && (responseData.error || responseData.message)) {
//               userFriendlyError = `Conflict: ${responseData.error || responseData.message}`;
//             } else {
//               userFriendlyError = "A conflict occurred while saving. This might be due to an existing URL slug or other conflicting data.";
//             }
//           } else if (status === 400) {
//             if (responseData && responseData.errorType === "VALIDATION_ERROR") {
//                 userFriendlyError = responseData.message || `Invalid input for ${responseData.field || 'a field'}.`;
//                 if (responseData.field === "title") {
//                     const titleInput = document.getElementById('portfolioTitle');
//                     if (titleInput) titleInput.focus();
//                 } else if (responseData.field === "slug") {
//                     const slugInput = document.getElementById('portfolioSlug');
//                     if (slugInput) slugInput.focus();
//                 }
//             } else if (responseData && (responseData.error || responseData.message)) {
//               userFriendlyError = `Invalid input: ${responseData.error || responseData.message}`;
//             } else {
//               userFriendlyError = "The server could not process your request due to invalid data. Please check all fields.";
//             }
//           } else if (status === 401) {
//             userFriendlyError = "Authentication failed. You might need to sign in again.";
//           } else if (status === 403) {
//             userFriendlyError = "You do not have permission to perform this action.";
//           } else if (status >= 500) {
//             userFriendlyError = "A server error occurred while saving your portfolio. Please try again later.";
//           } else if (axiosError.message) {
//             userFriendlyError = `Failed to save portfolio: ${axiosError.message}`;
//           }
//         } else if (axiosError.request) {
//           userFriendlyError = "No response from the server. Please check your internet connection and try again.";
//         } else {
//           userFriendlyError = `Error setting up the save request: ${axiosError.message}`;
//         }
//       } else if (err instanceof Error) {
//         userFriendlyError = `An error occurred: ${err.message}`;
//       }

//       setError(userFriendlyError);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   if (isLoadingPage) {
//     return (
//       <div className="flex min-h-screen animate-pulse items-center justify-center text-xl font-semibold text-gray-700">
//         Loading Portfolio Editor...
//       </div>
//     );
//   }
//   if (error && !portfolioSettings) {
//     return (
//       <div className="mx-auto my-10 max-w-2xl rounded-lg border-2 border-red-200 bg-red-50 p-8 text-center text-red-700 shadow-lg">
//         <h2 className="mb-3 text-2xl font-semibold">
//           Oops! Something went wrong.
//         </h2>
//         <p className="text-md mb-4">{error}</p>
//         <button
//           onClick={() =>
//             router.push(
//               idOrActionParam === "new"
//                 ? "/wizard"
//                 : user
//                   ? `/profile/${user.id}`
//                   : "/",
//             )
//           }
//           className="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
//         >
//           {idOrActionParam === "new" ? "Go back to Wizard" : "Go to My Profile"}
//         </button>
//       </div>
//     );
//   }
//   if (idOrActionParam === "new" && !sourceDraft && portfolioSettings) {
//     return (
//       <div className="mx-auto my-10 max-w-2xl rounded-lg border-2 border-yellow-200 bg-yellow-50 p-8 text-center text-lg text-yellow-800 shadow-lg">
//         <h2 className="mb-3 text-2xl font-semibold">Missing Information</h2>
//         <p className="text-md mb-4">
//           {error || "Could not load the source resume draft for new portfolio."}
//         </p>
//         <button
//           onClick={() => router.push("/wizard")}
//           className="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
//         >
//           Go back to Wizard
//         </button>
//       </div>
//     );
//   }
//   if (!portfolioSettings) {
//     return (
//       <div className="mx-auto my-10 max-w-2xl rounded-lg border-2 border-gray-200 bg-gray-100 p-8 text-center text-lg text-gray-700 shadow-lg">
//         <h2 className="mb-3 text-2xl font-semibold">Unable to Load Editor</h2>
//         <p className="text-md mb-4">
//           Portfolio data could not be initialized. Please try again.
//         </p>
//         <button
//           onClick={() =>
//             router.push(
//               editingPortfolioId && user?.id ? `/profile/${user.id}` : "/wizard",
//             )
//           }
//           className="mt-4 rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow transition-colors hover:bg-indigo-700"
//         >
//           {editingPortfolioId ? "Go to My Profile" : "Go back to Wizard"}
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto min-h-screen max-w-7xl bg-slate-100 px-4 py-10 font-sans sm:px-6 sm:py-16 lg:px-8">
//       <button
//         onClick={() =>
//           router.push(
//             editingPortfolioId && user?.id ? `/profile/${user.id}` : "/wizard",
//           )
//         }
//         className="group mb-10 inline-flex items-center text-sm font-medium text-indigo-700 transition-colors hover:text-indigo-900"
//       >
//         <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
//         {editingPortfolioId ? "Back to My Profile" : "Back to Resume Wizard"}
//       </button>
//       <header className="mb-12 border-b-2 border-gray-300 pb-6">
//         <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
//           {editingPortfolioId ? "Edit Living Portfolio" : "Create New Living Portfolio"}
//         </h1>
//         {sourceDraft?.title && (
//           <p className="mt-2 text-lg text-gray-600">
//             Based on Resume Draft:{" "}
//             <span className="font-semibold text-gray-800">&quot;{sourceDraft.title}&quot;</span>
//           </p>
//         )}
//       </header>

//       {(successMessage || portfolioUrl) && (
//         <div className="animate-fadeIn mb-8 rounded-md border-l-4 border-green-500 bg-green-50 p-4 text-green-700 shadow-lg">
//           <div className="flex">
//             <div className="py-1">
//               <Sparkles className="mr-4 h-6 w-6 text-green-500" />
//             </div>
//             <div>
//               <p className="text-lg font-bold">
//                 {editingPortfolioId ? "Portfolio Updated!" : "Portfolio Published!"}
//               </p>
//               {successMessage && (
//                 <p className="mt-1 text-sm">{successMessage}</p>
//               )}
//               {portfolioUrl && (
//                 <div className="mt-1 text-sm">
//                   Shareable Link:{" "}
//                   <a
//                     href={portfolioUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 underline hover:text-blue-700 font-medium"
//                   >
//                     {portfolioUrl}
//                   </a>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//       {error && !successMessage && (
//         <div className="animate-fadeIn mb-8 rounded-md border-l-4 border-red-500 bg-red-50 p-4 text-red-700 shadow-lg">
//           <span className="font-bold">Error:</span> {error}
//         </div>
//       )}

//       <div className="grid grid-cols-1 gap-x-10 gap-y-12 lg:grid-cols-3">
//         <DndContext
//           sensors={sensors}
//           collisionDetection={closestCenter}
//           onDragEnd={handleDragEnd}
//         >
//           <div className="space-y-10 lg:col-span-2">
//             <section className={sectionCardClass}>
//               <h2 className={`${sectionTitleClass} mb-2`}>
//                 <Settings2 size={28} className="mr-3 text-indigo-600" /> Portfolio Details
//               </h2>
//               <div className="space-y-6 pt-4">
//                 <div>
//                   <label
//                     htmlFor="portfolioTitle"
//                     className="mb-1.5 block text-sm font-semibold text-gray-700"
//                   >
//                     Portfolio Title*
//                   </label>
//                   <input
//                     type="text"
//                     id="portfolioTitle"
//                     value={portfolioSettings.title}
//                     onChange={(e) => handleSettingChange("title", e.target.value)}
//                     className={inputBaseClass}
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="portfolioSlug"
//                     className="mb-1.5 block text-sm font-semibold text-gray-700"
//                   >
//                     Custom URL Slug (Optional)
//                   </label>
//                   <div className="mt-1 flex rounded-md shadow-sm">
//                     <span className="inline-flex items-center whitespace-nowrap rounded-l-md border border-r-0 border-gray-300 bg-gray-100 px-3 text-gray-500 sm:text-sm">
//                       {typeof window !== "undefined"
//                         ? `${window.location.origin}/portfolio/`
//                         : "/portfolio/"}
//                     </span>
//                     <input
//                       type="text"
//                       id="portfolioSlug"
//                       value={portfolioSettings.slug || ""}
//                       onChange={(e) =>
//                         handleSettingChange("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"))
//                       }
//                       placeholder="your-unique-slug"
//                       className={`${inputBaseClass} !rounded-l-none focus:z-10`}
//                     />
//                   </div>
//                   <p className="mt-1.5 text-xs text-gray-500">
//                     Lowercase letters, numbers, hyphens. Auto-formats. Blank for unique ID.
//                   </p>
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="portfolioTheme"
//                     className="mb-1.5 block text-sm font-semibold text-gray-700"
//                   >
//                     <Palette size={18} className="mr-2 inline text-gray-500" />
//                     Portfolio Theme
//                   </label>
//                   <select
//                     id="portfolioTheme"
//                     name="theme"
//                     value={portfolioSettings.theme}
//                     onChange={(e) => handleSettingChange("theme", e.target.value)}
//                     className={`${inputBaseClass} appearance-none`}
//                   >
//                     {availableThemes.map((themeOption) => (
//                       <option key={themeOption.id} value={themeOption.id}>
//                         {themeOption.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="pt-2">
//                   <label className={`${checkboxLabelClass} !text-base`}>
//                     <input
//                       type="checkbox"
//                       checked={portfolioSettings.isPublic}
//                       onChange={(e) => handleSettingChange("isPublic", e.target.checked)}
//                       className={`${checkboxClass} h-5 w-5 !text-green-600 focus:ring-green-500`}
//                     />
//                     <span className="font-semibold text-gray-800">
//                       Make this Portfolio Publicly Shareable
//                     </span>
//                   </label>
//                 </div>
//               </div>
//             </section>

//             <section className={sectionCardClass}>
//               <h2 className={`${sectionTitleClass}`}>
//                 <EditIcon size={28} className="mr-3 text-indigo-600" /> Edit Portfolio Content
//               </h2>
//               <p className="-mt-4 mb-6 text-sm text-gray-500">
//                 Tailor content for this portfolio. Visibility is controlled in the next section.
//               </p>
//               <div className="space-y-4">
//                 <EditorCollapsibleSection
//                   title="Contact Information"
//                   icon={<UserCircle />}
//                   isVisible={true}
//                   initiallyOpen={false}
//                 >
//                   <div className="space-y-3 p-2">
//                     {portfolioSettings.displaySettings?.contact?.showFullName && (
//                       <div>
//                         <label className="mb-0.5 block text-xs font-medium capitalize text-gray-600">
//                           Full Name
//                         </label>
//                         <input
//                           type="text"
//                           value={portfolioSettings.publicFullName || ""}
//                           onChange={(e) =>
//                             handlePublicContentChange("publicFullName", e.target.value)
//                           }
//                           className={inputBaseClass}
//                           placeholder="Full Name for portfolio display"
//                         />
//                       </div>
//                     )}
//                     <div>
//                       <label className="mb-0.5 block text-xs font-medium capitalize text-gray-600">
//                         Job Title / Headline
//                       </label>
//                       <input
//                         type="text"
//                         value={portfolioSettings.publicJobTitle || ""}
//                         onChange={(e) =>
//                           handlePublicContentChange("publicJobTitle", e.target.value)
//                         }
//                         className={inputBaseClass}
//                         placeholder="Your professional headline"
//                       />
//                     </div>
//                     {portfolioSettings.displaySettings?.contact?.showEmail && (
//                       <div>
//                         <label className="mb-0.5 block text-xs font-medium capitalize text-gray-600">
//                           Email
//                         </label>
//                         <input
//                           type="email"
//                           value={portfolioSettings.publicEmail || ""}
//                           onChange={(e) =>
//                             handlePublicContentChange("publicEmail", e.target.value)
//                           }
//                           className={inputBaseClass}
//                           placeholder="Contact email"
//                         />
//                       </div>
//                     )}
//                     {portfolioSettings.displaySettings?.contact?.showPhone && (
//                       <div>
//                         <label className="mb-0.5 block text-xs font-medium capitalize text-gray-600">
//                           Phone
//                         </label>
//                         <input
//                           type="tel"
//                           value={portfolioSettings.publicPhone || ""}
//                           onChange={(e) =>
//                             handlePublicContentChange("publicPhone", e.target.value)
//                           }
//                           className={inputBaseClass}
//                           placeholder="Contact phone"
//                         />
//                       </div>
//                     )}
//                     {portfolioSettings.displaySettings?.contact?.showLocation && (
//                       <div>
//                         <label className="mb-0.5 block text-xs font-medium capitalize text-gray-600">
//                           Location
//                         </label>
//                         <input
//                           type="text"
//                           value={portfolioSettings.publicLocation || ""}
//                           onChange={(e) =>
//                             handlePublicContentChange("publicLocation", e.target.value)
//                           }
//                           className={inputBaseClass}
//                           placeholder="City, Country"
//                         />
//                       </div>
//                     )}
//                     {portfolioSettings.displaySettings?.contact?.showLinkedIn && (
//                       <div>
//                         <label className="mb-0.5 block text-xs font-medium capitalize text-gray-600">
//                           LinkedIn URL
//                         </label>
//                         <input
//                           type="url"
//                           value={portfolioSettings.publicLinkedInUrl || ""}
//                           onChange={(e) =>
//                             handlePublicContentChange("publicLinkedInUrl", e.target.value)
//                           }
//                           className={inputBaseClass}
//                           placeholder="LinkedIn Profile URL"
//                         />
//                       </div>
//                     )}
//                     {Object.values(portfolioSettings.displaySettings?.contact || {}).every(
//                       (v) => !v
//                     ) && (
//                       <p className="text-xs italic text-gray-500">
//                         No contact fields are set to visible. Enable them in
//                         &quot;Content Visibility&quot; to edit their content here.
//                       </p>
//                     )}
//                   </div>
//                 </EditorCollapsibleSection>

//                 <EditorCollapsibleSection
//                   title="Summary"
//                   icon={<FileText />}
//                   isVisible={portfolioSettings.displaySettings?.sections?.showSummary}
//                   initiallyOpen={!!portfolioSettings.displaySettings?.sections?.showSummary}
//                 >
//                   <textarea
//                     value={portfolioSettings.publicSummary || ""}
//                     onChange={(e) =>
//                       handlePublicContentChange("publicSummary", e.target.value)
//                     }
//                     rows={6}
//                     className={textareaBaseClass}
//                     placeholder="Portfolio Summary"
//                   />
//                   {sourceDraft?.wizardSummary &&
//                     portfolioSettings.publicSummary !== sourceDraft.wizardSummary && (
//                       <button
//                         type="button"
//                         onClick={() =>
//                           handlePublicContentChange("publicSummary", sourceDraft.wizardSummary || "")
//                         }
//                         className="mt-1.5 text-xs text-indigo-600 hover:underline"
//                       >
//                         Reset to draft summary
//                       </button>
//                     )}
//                 </EditorCollapsibleSection>

//                 <EditorCollapsibleSection
//                   title="Skills"
//                   icon={<Layers />}
//                   isVisible={portfolioSettings.displaySettings?.sections?.showSkills}
//                 >
//                   <label className="mb-1 block text-xs font-medium text-gray-600">
//                     Skills (comma-separated)
//                   </label>
//                   <textarea
//                     value={(portfolioSettings.publicSkills || []).join(", ")}
//                     onChange={(e) =>
//                       handlePublicContentChange(
//                         "publicSkills",
//                         e.target.value.split(",").map((s) => s.trim()),
//                       )
//                     }
//                     rows={3}
//                     className={textareaBaseClass}
//                     placeholder="e.g., React, Project Management"
//                   />
//                   {sourceDraft?.wizardSkills &&
//                     JSON.stringify(
//                       portfolioSettings.publicSkills?.map((s) => s.trim()).filter(Boolean),
//                     ) !==
//                       JSON.stringify(
//                         (sourceDraft.wizardSkills || []).map((s) => s.trim()).filter(Boolean),
//                       ) && (
//                       <button
//                         type="button"
//                         onClick={() =>
//                           handlePublicContentChange("publicSkills", sourceDraft.wizardSkills || [])
//                         }
//                         className="mt-1.5 text-xs text-indigo-600 hover:underline"
//                       >
//                         Reset to draft skills
//                       </button>
//                     )}
//                 </EditorCollapsibleSection>

//                 {[
//                   "WorkExperience",
//                   "Education",
//                   "Volunteering",
//                   "Certifications",
//                 ].map((sectionKey) => {
//                   const displayKey =
//                     `show${sectionKey}` as keyof LivingPortfolioDisplaySettings["sections"];
//                   if (portfolioSettings.displaySettings?.sections?.[displayKey]) {
//                     const IconComponent =
//                       sectionKey === "WorkExperience"
//                         ? Briefcase
//                         : sectionKey === "Education"
//                           ? GraduationCap
//                           : sectionKey === "Volunteering"
//                             ? Gift
//                             : ShieldCheck;
//                     return (
//                       <EditorCollapsibleSection
//                         key={`edit-${sectionKey}`}
//                         title={`Public ${sectionKey.replace(/([A-Z])/g, " $1").trim()} (Snapshot)`}
//                         icon={<IconComponent />}
//                         isVisible={true}
//                       >
//                         <div className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 p-3">
//                           <Info size={20} className="mt-0.5 flex-shrink-0 text-amber-600" />
//                           <p className="text-xs italic text-gray-700">
//                             Content for{" "}
//                             <strong>{sectionKey.replace(/([A-Z])/g, " $1").toLowerCase()}</strong>{" "}
//                             is snapshotted from your resume draft. To edit individual items (e.g.,
//                             specific jobs, degrees, bullets), please update your{" "}
//                             <Link
//                               href={`/wizard?step=3`}
//                               className="font-medium text-indigo-600 hover:underline"
//                             >
//                               Resume Draft in the Wizard
//                             </Link>
//                             .
//                           </p>
//                         </div>
//                       </EditorCollapsibleSection>
//                     );
//                   }
//                   return null;
//                 })}

//                 {portfolioSettings.displaySettings?.narrativeSuite?.showCareerNarrative && (
//                   <EditorCollapsibleSection title="Career Narrative" icon={<MessageSquareQuote />}>
//                     <textarea
//                       value={portfolioSettings.publicCareerNarrative || ""}
//                       onChange={(e) =>
//                         handlePublicContentChange("publicCareerNarrative", e.target.value)
//                       }
//                       rows={5}
//                       className={textareaBaseClass}
//                     />
//                     {sourceDraft?.aiCareerNarrative &&
//                       portfolioSettings.publicCareerNarrative !== sourceDraft.aiCareerNarrative && (
//                         <button
//                           type="button"
//                           onClick={() =>
//                             handlePublicContentChange(
//                               "publicCareerNarrative",
//                               sourceDraft.aiCareerNarrative || "",
//                             )
//                           }
//                           className="mt-1.5 text-xs text-indigo-600 hover:underline"
//                         >
//                           Reset to AI narrative
//                         </button>
//                       )}
//                   </EditorCollapsibleSection>
//                 )}
//                 {portfolioSettings.displaySettings?.narrativeSuite?.showGoldenThread && (
//                   <EditorCollapsibleSection title="Golden Thread" icon={<Zap />}>
//                     <input
//                       type="text"
//                       value={portfolioSettings.publicGoldenThread || ""}
//                       onChange={(e) =>
//                         handlePublicContentChange("publicGoldenThread", e.target.value)
//                       }
//                       className={inputBaseClass}
//                     />
//                     {sourceDraft?.aiGoldenThread &&
//                       portfolioSettings.publicGoldenThread !== sourceDraft.aiGoldenThread && (
//                         <button
//                           type="button"
//                           onClick={() =>
//                             handlePublicContentChange("publicGoldenThread", sourceDraft.aiGoldenThread || "")
//                           }
//                           className="mt-1.5 text-xs text-indigo-600 hover:underline"
//                         >
//                           Reset to AI golden thread
//                         </button>
//                       )}
//                   </EditorCollapsibleSection>
//                 )}
//                 {portfolioSettings.displaySettings?.narrativeSuite?.showKeyThemes && (
//                   <EditorCollapsibleSection title="Key Themes (Snapshot)" icon={<Sparkles />}>
//                     <div className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 p-3">
//                       <Info size={16} className="mt-0.5 flex-shrink-0 text-amber-600" />
//                       <p className="text-xs italic text-gray-500">
//                         Content from draft. Edit via AI Suite in Wizard.
//                       </p>
//                     </div>
//                   </EditorCollapsibleSection>
//                 )}
//                 {portfolioSettings.displaySettings?.narrativeSuite?.showHiddenGems && (
//                   <EditorCollapsibleSection title="Hidden Gems (Snapshot)" icon={<ThumbsUp />}>
//                     <div className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 p-3">
//                       <Info size={16} className="mt-0.5 flex-shrink-0 text-amber-600" />
//                       <p className="text-xs italic text-gray-500">
//                         Content from draft. Edit via AI Suite in Wizard.
//                       </p>
//                     </div>
//                   </EditorCollapsibleSection>
//                 )}
//                 {portfolioSettings.displaySettings?.narrativeSuite?.showGoldenThread &&
//                   portfolioSettings.publicGoldenThreadEvidence &&
//                   portfolioSettings.publicGoldenThreadEvidence.length > 0 && (
//                     <EditorCollapsibleSection
//                       title="Golden Thread Evidence (Snapshot)"
//                       icon={<ListChecks />}
//                     >
//                       <div className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 p-3">
//                         <Info size={16} className="mt-0.5 flex-shrink-0 text-amber-600" />
//                         <p className="text-xs italic text-gray-500">
//                           Content from draft. Edit via AI Suite in Wizard.
//                         </p>
//                       </div>
//                     </EditorCollapsibleSection>
//                   )}
//               </div>
//             </section>

//             <section className={sectionCardClass}>
//               <h2 className={`${sectionTitleClass} mb-2`}>
//                 <Eye size={28} className="mr-3 text-indigo-600" /> Content Visibility Toggles
//               </h2>
//               <p className="-mt-4 mb-6 text-sm text-gray-500">
//                 Choose which sections will appear on your public portfolio.
//               </p>
//               <div className="space-y-6 pt-4">
//                 <div>
//                   <h3 className={subSectionTitleClass}>Contact Information:</h3>
//                   <div className="grid grid-cols-2 gap-x-6 gap-y-3 pt-1 md:grid-cols-3">
//                     {(
//                       Object.keys(portfolioSettings.displaySettings.contact) as Array<
//                         keyof LivingPortfolioDisplaySettings["contact"]
//                       >
//                     ).map((key) => (
//                       <label key={`ds-contact-${key}`} className={checkboxLabelClass}>
//                         <input
//                           type="checkbox"
//                           checked={!!portfolioSettings.displaySettings.contact[key]}
//                           onChange={(e) =>
//                             handleSettingChange("displaySettings", `contact.${key}`, e.target.checked)
//                           }
//                           className={checkboxClass}
//                         />
//                         <span>{key.substring(4).replace(/([A-Z])/g, " $1").trim()}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="border-t border-gray-200 pt-5">
//                   <h3 className={subSectionTitleClass}>Standard Resume Sections:</h3>
//                   <div className="grid grid-cols-2 gap-x-6 gap-y-3 pt-1 md:grid-cols-3">
//                     {(
//                       Object.keys(portfolioSettings.displaySettings.sections) as Array<
//                         keyof LivingPortfolioDisplaySettings["sections"]
//                       >
//                     ).map((key) => (
//                       <label key={`ds-section-${key}`} className={checkboxLabelClass}>
//                         <input
//                           type="checkbox"
//                           checked={!!portfolioSettings.displaySettings.sections[key]}
//                           onChange={(e) =>
//                             handleSettingChange("displaySettings", `sections.${key}`, e.target.checked)
//                           }
//                           className={checkboxClass}
//                         />
//                         <span>{key.substring(4).replace(/([A-Z])/g, " $1").trim()}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//                 {sourceDraft?.aiCareerNarrative && (
//                   <div className="border-t border-gray-200 pt-5">
//                     <h3 className={subSectionTitleClass}>AI Narrative Suite Elements:</h3>
//                     <div className="grid grid-cols-2 gap-x-6 gap-y-3 pt-1 md:grid-cols-3">
//                       {(
//                         Object.keys(portfolioSettings.displaySettings.narrativeSuite) as Array<
//                           keyof LivingPortfolioDisplaySettings["narrativeSuite"]
//                         >
//                       ).map((key) => (
//                         <label key={`ds-narrative-${key}`} className={checkboxLabelClass}>
//                           <input
//                             type="checkbox"
//                             checked={!!portfolioSettings.displaySettings.narrativeSuite[key]}
//                             onChange={(e) =>
//                               handleSettingChange(
//                                 "displaySettings",
//                                 `narrativeSuite.${key}`,
//                                 e.target.checked,
//                               )
//                             }
//                             className={checkboxClass}
//                           />
//                           <span>{key.substring(4).replace(/([A-Z])/g, " $1").trim()}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </section>

//             {sourceDraft?.aiWhatIfResultsCache && sourceDraft.aiWhatIfResultsCache.length > 0 && (
//               <section className={sectionCardClass}>
//                 <h2 className={`${sectionTitleClass} mb-2`}>
//                   <Brain size={28} className="mr-3 text-indigo-600" /> Showcase &quot;What If?&quot;
//                   Scenarios
//                 </h2>
//                 <p className="mb-4 pt-2 text-sm text-gray-600">
//                   Select AI-generated scenarios from your resume draft to include.
//                 </p>
//                 <div className="max-h-80 space-y-1.5 overflow-y-auto rounded-lg border bg-slate-50 p-4 shadow-inner">
//                   {sourceDraft.aiWhatIfResultsCache.map((whatIfItem) => (
//                     <label
//                       key={`editor-whatif-${whatIfItem.scenarioText.replace(/\s+/g, "-")}`}
//                       className={`${checkboxLabelClass} block w-full rounded-md border border-gray-200 p-3 transition-colors hover:border-indigo-200 hover:bg-indigo-100`}
//                     >
//                       <input
//                         type="checkbox"
//                         checked={portfolioSettings.selectedPublicWhatIfs.some(
//                           (pwi) => pwi.scenarioText === whatIfItem.scenarioText,
//                         )}
//                         onChange={() => handleToggleWhatIf(whatIfItem)}
//                         className={`${checkboxClass} mr-3 !text-teal-600 focus:ring-teal-500`}
//                       />
//                       <span className="font-medium text-gray-800" title={whatIfItem.scenarioText}>
//                         &quot;{whatIfItem.scenarioText}&quot;
//                       </span>
//                     </label>
//                   ))}
//                 </div>
//               </section>
//             )}

//             <section className={`${sectionCardClass} space-y-6`}>
//               <div className="flex flex-col justify-between gap-3 border-b border-gray-200 pb-4 sm:flex-row sm:items-center">
//                 <h2 className={`${sectionTitleClass} mb-0 border-b-0 pb-0`}>
//                   <Layers size={28} className="mr-3 text-indigo-600" /> Custom Showcase Sections
//                 </h2>
//                 <button
//                   type="button"
//                   onClick={addShowcaseSection}
//                   className="flex shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-blue-700"
//                 >
//                   <Plus size={18} /> Add New Section
//                 </button>
//               </div>
//               {portfolioSettings.showcaseSections.length === 0 && (
//                 <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-8 text-center">
//                   <FolderKanban className="mx-auto h-12 w-12 text-gray-400" strokeWidth={1.5} />
//                   <h3 className="mt-2 text-lg font-medium text-gray-900">
//                     No showcase sections yet
//                   </h3>
//                   <p className="mt-1 text-sm text-gray-500">
//                     Add a section to highlight projects, skills, or experiences.
//                   </p>
//                 </div>
//               )}
//               <div className="space-y-8">
//                 <SortableContext
//                   items={portfolioSettings.showcaseSections.map((s) => s.id)}
//                   strategy={verticalListSortingStrategy}
//                 >
//                   {portfolioSettings.showcaseSections.map((section) => (
//                     <SortableShowcaseSection
//                       key={section.id}
//                       section={section}
//                       updateShowcaseSectionTitle={updateShowcaseSectionTitle}
//                       deleteShowcaseSection={deleteShowcaseSection}
//                     >
//                       {section.items.length === 0 && (
//                         <p className="py-3 text-center text-sm italic text-gray-500">
//                           No items. Click &quot;+ Add Item&quot; below.
//                         </p>
//                       )}
//                       <div className="space-y-1">
//                         <SortableContext
//                           items={section.items.map((i) => i.id)}
//                           strategy={verticalListSortingStrategy}
//                         >
//                           {section.items.map((item) => (
//                             <SortableShowcaseItem
//                               key={item.id}
//                               sectionId={section.id}
//                               item={item}
//                               updateShowcaseItem={updateShowcaseItem}
//                               deleteShowcaseItem={deleteShowcaseItem}
//                             />
//                           ))}
//                         </SortableContext>
//                       </div>
//                       <button
//                         type="button"
//                         onClick={() => addShowcaseItem(section.id)}
//                         className="mt-4 flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow transition-colors hover:bg-indigo-600"
//                       >
//                         <Plus size={16} strokeWidth={3} /> Add Item
//                       </button>
//                     </SortableShowcaseSection>
//                   ))}
//                 </SortableContext>
//               </div>
//             </section>

//             {(successMessage || portfolioUrl) && (
//         <div className="animate-fadeIn mb-8 rounded-md border-l-4 border-green-500 bg-green-50 p-4 text-green-700 shadow-lg">
//           <div className="flex">
//             <div className="py-1">
//               <Sparkles className="mr-4 h-6 w-6 text-green-500" />
//             </div>
//             <div>
//               <p className="text-lg font-bold">
//                 {editingPortfolioId ? "Portfolio Updated!" : "Portfolio Published!"}
//               </p>
//               {successMessage && (
//                 <p className="mt-1 text-sm">{successMessage}</p>
//               )}
//               {portfolioUrl && (
//                 <div className="mt-1 text-sm">
//                   Shareable Link:{" "}
//                   <a
//                     href={portfolioUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 underline hover:text-blue-700 font-medium"
//                   >
//                     {portfolioUrl}
//                   </a>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//       {error && !successMessage && (
//         <div className="animate-fadeIn mb-8 rounded-md border-l-4 border-red-500 bg-red-50 p-4 text-red-700 shadow-lg">
//           <span className="font-bold">Error:</span> {error}
//         </div>
//       )}

//             <div className="mt-12 flex flex-col items-center justify-end gap-4 border-t-2 border-gray-300 pt-10 sm:flex-row">
//               <button
//                 type="button"
//                 onClick={() => router.back()}
//                 className={secondaryButtonClass}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSaveOrPublish}
//                 disabled={isProcessing || isLoadingPage}
//                 className={`${primaryButtonClass} min-w-[240px] text-lg`}
//               >
//                 {isProcessing
//                   ? "Processing..."
//                   : editingPortfolioId
//                     ? "Update Portfolio"
//                     : "Save & Publish Portfolio"}
//               </button>
//             </div>
//           </div>
//         </DndContext>

//         <aside className="space-y-6 lg:col-span-1">
//           <div className="sticky top-10 rounded-xl border border-slate-300 bg-slate-200 p-6 shadow-xl">
//             <h3 className="mb-4 flex items-center border-b-2 border-slate-400 pb-3 text-xl font-bold text-gray-800">
//               <FileText size={24} className="mr-3 text-slate-700" /> Source Draft Context
//             </h3>
//             {sourceDraft?.wizardPersonalData?.fullName && (
//               <p className="mb-2 text-sm">
//                 <strong className="font-semibold text-slate-700">Name:</strong>{" "}
//                 {sourceDraft.wizardPersonalData.fullName}
//               </p>
//             )}
//             {sourceDraft?.wizardSummary && (
//               <div className="mb-3">
//                 <strong className="mb-0.5 block text-sm font-semibold text-slate-700">
//                   Summary Snippet:
//                 </strong>
//                 <p className="rounded-md bg-white p-2 text-xs italic text-gray-700 shadow-sm">
//                   &quot;{sourceDraft.wizardSummary.substring(0, 150)}...&quot;
//                 </p>
//               </div>
//             )}
//             {sourceDraft?.aiCareerNarrative && (
//               <div className="mb-3">
//                 <strong className="mb-0.5 block text-sm font-semibold text-slate-700">
//                   AI Narrative Snippet:
//                 </strong>
//                 <p className="rounded-md bg-white p-2 text-xs italic text-gray-700 shadow-sm">
//                   &quot;{sourceDraft.aiCareerNarrative.substring(0, 150)}...&quot;
//                 </p>
//               </div>
//             )}
//             {sourceDraft?.aiGoldenThread && (
//               <p className="mb-3 text-sm">
//                 <strong className="font-semibold text-slate-700">Golden Thread:</strong>{" "}
//                 <span className="font-semibold italic text-purple-700">
//                   {sourceDraft.aiGoldenThread}
//                 </span>
//               </p>
//             )}
//             <p className="mt-5 border-t border-slate-400 pt-3 text-xs text-slate-600">
//               Read-only view of your resume draft. Use the editor on the left to build your Living
//               Portfolio.
//             </p>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Trash2,
  GripVertical,
  FolderKanban,
  FileText,
  Palette,
  Eye,
  Settings2,
  Edit3 as EditIcon,
  ChevronDown,
  ChevronUp,
  Layers,
  MessageSquareQuote,
  Briefcase,
  Brain,
  Zap,
  Sparkles,
  ListChecks,
  UserCircle,
  GraduationCap,
  Gift,
  ShieldCheck,
  ThumbsUp,
  Info,
} from "lucide-react";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { ResumeJSON } from "@/components/ATSScore";
import {
  InitialNarrativeResult,
  WhatIfResult,
  HiddenGemsResult,
} from "@/components/NarrativeWeaver";

// --- Interfaces ---
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
interface LivingPortfolioSettings {
  title: string;
  slug?: string | null | undefined;
  isPublic: boolean;
  theme: string;
  displaySettings: LivingPortfolioDisplaySettings;
  publicFullName?: string;
  publicJobTitle?: string;
  publicEmail?: string;
  publicPhone?: string;
  publicLocation?: string;
  publicLinkedInUrl?: string;
  publicSummary?: string;
  publicSkills?: string[];
  publicWorkExperiences?: ResumeJSON["workExperiences"];
  publicEducations?: ResumeJSON["educations"];
  publicVolunteering?: ResumeJSON["volunteering"];
  publicCertifications?: ResumeJSON["certifications"];
  publicCareerNarrative?: string;
  publicGoldenThread?: string;
  publicGoldenThreadEvidence?: InitialNarrativeResult["goldenThreadEvidence"];
  publicKeyThemes?: InitialNarrativeResult["keyThemes"];
  publicHiddenGems?: HiddenGemsResult;
  selectedPublicWhatIfs: Array<{
    scenarioText: string;
    adaptedResult: WhatIfResult;
  }>;
  showcaseSections: Array<ShowcaseSectionData>;
}
interface SourceResumeDraftData {
  id: string;
  title?: string | null;
  wizardPersonalData?: (ResumeJSON["personal"] & { jobTitle?: string }) | null;
  wizardSummary?: string | null;
  wizardSkills?: string[] | null;
  wizardWorkExperiences?: ResumeJSON["workExperiences"] | null;
  wizardEducations?: ResumeJSON["educations"] | null;
  wizardVolunteering?: ResumeJSON["volunteering"] | null;
  wizardCertifications?: ResumeJSON["certifications"] | null;
  aiCareerNarrative?: string | null;
  aiGoldenThread?: string | null;
  aiGoldenThreadEvidence?:
    | InitialNarrativeResult["goldenThreadEvidence"]
    | null;
  aiKeyThemes?: InitialNarrativeResult["keyThemes"] | null;
  aiHiddenGemsResultJson?: HiddenGemsResult | null;
  aiWhatIfResultsCache?: Array<{
    scenarioText: string;
    result: WhatIfResult;
  }> | null;
}
interface ExistingLivingPortfolioData extends LivingPortfolioSettings {
  id: string;
  sourceResumeDraftId: string;
}

// --- Constants & Defaults ---
const defaultDisplaySettingsConst: LivingPortfolioDisplaySettings = {
  contact: {
    showFullName: true,
    showEmail: true,
    showPhone: true,
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
};
const initialPortfolioSettingsShell: LivingPortfolioSettings = {
  title: "",
  slug: "",
  isPublic: true,
  theme: "default",
  displaySettings: JSON.parse(JSON.stringify(defaultDisplaySettingsConst)),
  selectedPublicWhatIfs: [],
  showcaseSections: [],
  publicFullName: undefined,
  publicJobTitle: undefined,
  publicEmail: undefined,
  publicPhone: undefined,
  publicLocation: undefined,
  publicLinkedInUrl: undefined,
  publicSummary: undefined,
  publicSkills: [],
  publicWorkExperiences: [],
  publicEducations: [],
  publicVolunteering: [],
  publicCertifications: [],
  publicCareerNarrative: undefined,
  publicGoldenThread: undefined,
  publicGoldenThreadEvidence: [],
  publicKeyThemes: [],
  publicHiddenGems: undefined,
};
const availableThemes = [
  { id: "default", name: "Default Professional" },
  { id: "modern-dark", name: "Modern Dark" },
  { id: "creative-light", name: "Creative Light" },
  { id: "minimalist-focus", name: "Minimalist Focus" },
];
const inputBaseClass =
  "block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-150";
const checkboxLabelClass =
  "flex items-center space-x-2.5 cursor-pointer text-sm py-1 text-gray-700 hover:text-indigo-700 transition-colors";
const checkboxClass =
  "h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 focus:ring-offset-1 shadow-sm";
const sectionCardClass = "bg-white p-6 sm:p-8 rounded-xl shadow-xl";
const sectionTitleClass =
  "text-2xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-4 flex items-center gap-3";
const subSectionTitleClass = "text-lg font-semibold text-gray-700 mb-3";
const textareaBaseClass =
  "block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-150 resize-y";
const primaryButtonClass =
  "inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors";
const secondaryButtonClass =
  "inline-flex items-center justify-center px-5 py-2.5 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition-colors";
const iconButtonClass =
  "p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors";

// ===== Helper to check slug availability in real time =====
/**
 * Calls GET /api/living-portfolios/check-slug?slug=…
 * Returns true if no existing portfolio has this slug.
 */
async function checkSlugAvailability(slug: string): Promise<boolean> {
  try {
    const res = await axios.get<{ available: boolean }>(
      `/api/living-portfolios/check-slug?slug=${encodeURIComponent(slug)}`,
    );
    return res.data.available;
  } catch (err) {
    console.error("Error checking slug availability:", err);
    return false;
  }
}

// ===== Collapsible Section Component =====
const EditorCollapsibleSection: React.FC<{
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  initiallyOpen?: boolean;
  isVisible?: boolean;
}> = ({ title, children, icon, initiallyOpen = false, isVisible = true }) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  if (!isVisible) return null;
  return (
    <div className="my-4 overflow-hidden rounded-lg border border-gray-300 bg-slate-50/70 shadow-sm transition-all duration-300 ease-in-out hover:shadow-md">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-4 text-left font-medium text-gray-800 transition-colors hover:bg-slate-100 focus:outline-none"
      >
        <span className="text-md flex items-center">
          {icon && (
            <span className="mr-2.5 text-indigo-600 opacity-80">{icon}</span>
          )}
          {title}
        </span>
        {isOpen ? (
          <ChevronUp size={20} className="text-gray-500" />
        ) : (
          <ChevronDown size={20} className="text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="space-y-4 border-t border-gray-200 bg-white p-5">
          {children}
        </div>
      )}
    </div>
  );
};

// ===== Sortable Showcase Item =====
function SortableShowcaseItem({
  sectionId,
  item,
  updateShowcaseItem,
  deleteShowcaseItem,
}: {
  sectionId: string;
  item: ShowcaseItem;
  updateShowcaseItem: (
    sectionId: string,
    itemId: string,
    field: keyof Omit<ShowcaseItem, "id">,
    value: string | string[],
  ) => void;
  deleteShowcaseItem: (sectionId: string, itemId: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
    data: { type: "item", sectionId: sectionId },
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
    zIndex: isDragging ? 100 : "auto",
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative mb-4 space-y-4 rounded-lg border border-gray-300 bg-white p-5 shadow-md transition-shadow hover:shadow-lg"
    >
      <div className="flex items-start justify-between">
        <div
          {...attributes}
          {...listeners}
          className={`-ml-1.5 cursor-grab touch-none p-1.5 text-gray-400 hover:text-gray-600`}
        >
          <GripVertical size={20} />
        </div>
        <div className="ml-2 flex-grow space-y-3">
          <div>
            <label
              htmlFor={`itemName-${sectionId}-${item.id}`}
              className="mb-1 block text-xs font-semibold text-gray-600"
            >
              Item Name*
            </label>
            <input
              id={`itemName-${sectionId}-${item.id}`}
              type="text"
              value={item.name}
              onChange={(e) =>
                updateShowcaseItem(sectionId, item.id, "name", e.target.value)
              }
              placeholder="E.g., Customer Churn Prediction Model"
              className={`${inputBaseClass} py-2.5 text-sm`}
            />
          </div>
          <div>
            <label
              htmlFor={`itemDesc-${sectionId}-${item.id}`}
              className="mb-1 block text-xs font-semibold text-gray-600"
            >
              Description*
            </label>
            <textarea
              id={`itemDesc-${sectionId}-${item.id}`}
              value={item.description}
              onChange={(e) =>
                updateShowcaseItem(
                  sectionId,
                  item.id,
                  "description",
                  e.target.value,
                )
              }
              placeholder="Detailed description..."
              rows={4}
              className={`${textareaBaseClass} min-h-[80px] py-2.5 text-sm`}
            />
          </div>
          <div>
            <label
              htmlFor={`itemLink-${sectionId}-${item.id}`}
              className="mb-1 block text-xs font-semibold text-gray-600"
            >
              Link (Optional)
            </label>
            <input
              id={`itemLink-${sectionId}-${item.id}`}
              type="url"
              value={item.link || ""}
              onChange={(e) =>
                updateShowcaseItem(sectionId, item.id, "link", e.target.value)
              }
              placeholder="https://github.com/..."
              className={`${inputBaseClass} py-2.5 text-sm`}
            />
          </div>
          <div>
            <label
              htmlFor={`itemSkills-${sectionId}-${item.id}`}
              className="mb-1 block text-xs font-semibold text-gray-600"
            >
              Skills Used (comma-separated)
            </label>
            <textarea
              id={`itemSkills-${sectionId}-${item.id}`}
              value={(item.skillsUsed || []).join(",")}
              onChange={(e) => {
                const skillsArray = e.target.value.split(",");
                updateShowcaseItem(
                  sectionId,
                  item.id,
                  "skillsUsed",
                  skillsArray,
                );
              }}
              placeholder="React, Node.js, Project Management"
              rows={2}
              className={`${textareaBaseClass} min-h-[60px] py-2.5 text-sm`}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={() => deleteShowcaseItem(sectionId, item.id)}
          className={`${iconButtonClass} ml-2 !text-red-500 hover:!bg-red-100 hover:!text-red-700`}
          title="Delete Item"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}

// ===== Sortable Showcase Section =====
function SortableShowcaseSection({
  section,
  children,
  updateShowcaseSectionTitle,
  deleteShowcaseSection,
}: {
  section: ShowcaseSectionData;
  children: React.ReactNode;
  updateShowcaseSectionTitle: (sectionId: string, newTitle: string) => void;
  deleteShowcaseSection: (sectionId: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id, data: { type: "section" } });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    boxShadow: isDragging ? "0 10px 20px rgba(0,0,0,0.1)" : "",
    zIndex: isDragging ? 100 : "auto",
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="space-y-5 rounded-xl border-2 border-gray-200 bg-slate-50 p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl"
    >
      <div className="mb-5 flex items-center border-b-2 border-gray-300 pb-3">
        <div
          {...attributes}
          {...listeners}
          className={`-ml-2 mr-2 cursor-grab p-2 ${iconButtonClass} touch-none text-gray-400 hover:text-gray-700`}
        >
          <GripVertical size={24} />
        </div>
        <input
          type="text"
          value={section.title}
          onChange={(e) =>
            updateShowcaseSectionTitle(section.id, e.target.value)
          }
          placeholder="Section Title"
          className="w-full flex-grow border-0 border-b-2 border-transparent bg-transparent p-2 text-xl font-semibold placeholder-gray-500 outline-none focus:border-indigo-500 focus:ring-0"
        />
        <button
          type="button"
          onClick={() => deleteShowcaseSection(section.id)}
          className={`${iconButtonClass} ml-4 !text-red-500 hover:!bg-red-100 hover:!text-red-700`}
          title="Delete Section"
        >
          <Trash2 size={20} />
        </button>
      </div>
      {children}
    </div>
  );
}

// ===== Main Component =====
export default function PortfolioEditorPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const { user, isLoaded: isUserLoaded } = useUser();
  const idOrActionParam = params?.idOrAction as string | undefined;
  const [originalSlug, setOriginalSlug] = useState<string | null>(null);

  // ===== Page State =====
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [portfolioUrl, setPortfolioUrl] = useState<string | null>(null);
  const [sourceDraft, setSourceDraft] = useState<SourceResumeDraftData | null>(
    null,
  );
  const [portfolioSettings, setPortfolioSettings] =
    useState<LivingPortfolioSettings | null>(() =>
      JSON.parse(JSON.stringify(initialPortfolioSettingsShell)),
    );
  const [editingPortfolioId, setEditingPortfolioId] = useState<string | null>(
    null,
  );

  // ===== New slug-validation state =====
  const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null);
  const [slugChecking, setSlugChecking] = useState(false);
  const [slugError, setSlugError] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // ===== Load data on mount / when idOrActionParam changes =====
  useEffect(() => {
    if (!idOrActionParam || !isUserLoaded) return;
    if (!user) {
      router.push("/sign-in");
      return;
    }

    const loadData = async () => {
      setIsLoadingPage(true);
      setError(null);
      // Do not reset successMessage or portfolioUrl to preserve them if navigating within the editor
      setEditingPortfolioId(null);
      setSourceDraft(null);

      let tempPortfolioSettings: LivingPortfolioSettings;
      try {
        let draftDataToUse: SourceResumeDraftData | null = null;

        if (idOrActionParam === "new") {
          // Creating a new portfolio from a resume draft
          const draftIdQuery = searchParams?.get("draftId");
          if (!draftIdQuery)
            throw new Error("Resume Draft ID required for new portfolio.");

          const draftRes = await axios.get(
            `/api/resume-drafts/${draftIdQuery}`,
          );
          draftDataToUse = draftRes.data.draft as SourceResumeDraftData;
          if (!draftDataToUse)
            throw new Error("Failed to fetch source resume draft.");

          tempPortfolioSettings = {
            title: `${draftDataToUse.wizardPersonalData?.fullName || "My"} Portfolio`,
            ...JSON.parse(JSON.stringify(initialPortfolioSettingsShell)),
          };

          const ds = tempPortfolioSettings.displaySettings;
          if (draftDataToUse.wizardPersonalData) {
            tempPortfolioSettings.publicFullName = ds.contact.showFullName
              ? draftDataToUse.wizardPersonalData.fullName
              : undefined;
            tempPortfolioSettings.publicJobTitle =
              draftDataToUse.wizardPersonalData.jobTitle || undefined;
            tempPortfolioSettings.publicEmail = ds.contact.showEmail
              ? draftDataToUse.wizardPersonalData.email
              : undefined;
            tempPortfolioSettings.publicPhone = ds.contact.showPhone
              ? draftDataToUse.wizardPersonalData.phone
              : undefined;
            tempPortfolioSettings.publicLocation = ds.contact.showLocation
              ? `${draftDataToUse.wizardPersonalData.city}, ${draftDataToUse.wizardPersonalData.country}`.replace(
                  /^, |, $/g,
                  "",
                )
              : undefined;
            tempPortfolioSettings.publicLinkedInUrl = ds.contact.showLinkedIn
              ? draftDataToUse.wizardPersonalData.linkedinUrl
              : undefined;
          }
          tempPortfolioSettings.publicSummary = ds.sections.showSummary
            ? draftDataToUse.wizardSummary || ""
            : "";
          tempPortfolioSettings.publicSkills = ds.sections.showSkills
            ? draftDataToUse.wizardSkills || []
            : [];
          tempPortfolioSettings.publicWorkExperiences = ds.sections
            .showWorkExperience
            ? draftDataToUse.wizardWorkExperiences || []
            : [];
          tempPortfolioSettings.publicEducations = ds.sections.showEducation
            ? draftDataToUse.wizardEducations || []
            : [];
          tempPortfolioSettings.publicVolunteering = ds.sections
            .showVolunteering
            ? draftDataToUse.wizardVolunteering || []
            : [];
          tempPortfolioSettings.publicCertifications = ds.sections
            .showCertifications
            ? draftDataToUse.wizardCertifications || []
            : [];
          tempPortfolioSettings.publicCareerNarrative = ds.narrativeSuite
            .showCareerNarrative
            ? draftDataToUse.aiCareerNarrative || ""
            : "";
          tempPortfolioSettings.publicGoldenThread = ds.narrativeSuite
            .showGoldenThread
            ? draftDataToUse.aiGoldenThread || ""
            : "";
          tempPortfolioSettings.publicGoldenThreadEvidence =
            ds.narrativeSuite.showGoldenThread &&
            draftDataToUse.aiGoldenThreadEvidence
              ? draftDataToUse.aiGoldenThreadEvidence
              : [];
          tempPortfolioSettings.publicKeyThemes =
            ds.narrativeSuite.showKeyThemes && draftDataToUse.aiKeyThemes
              ? draftDataToUse.aiKeyThemes
              : [];
          tempPortfolioSettings.publicHiddenGems =
            ds.narrativeSuite.showHiddenGems &&
            draftDataToUse.aiHiddenGemsResultJson
              ? draftDataToUse.aiHiddenGemsResultJson
              : undefined;
        } else {
          // Editing an existing portfolio
          setEditingPortfolioId(idOrActionParam);
          const portfolioRes = await axios.get(
            `/api/living-portfolios/edit/${idOrActionParam}`,
          );
          const existingPortfolio: ExistingLivingPortfolioData =
            portfolioRes.data.portfolio;
          if (!existingPortfolio)
            throw new Error("Portfolio to edit not found or access denied.");

          tempPortfolioSettings = {
            title: existingPortfolio.title,
            slug: existingPortfolio.slug || "",
            isPublic: existingPortfolio.isPublic,
            theme: existingPortfolio.theme,
            displaySettings: {
              contact: {
                ...defaultDisplaySettingsConst.contact,
                ...(existingPortfolio.displaySettings?.contact || {}),
              },
              sections: {
                ...defaultDisplaySettingsConst.sections,
                ...(existingPortfolio.displaySettings?.sections || {}),
              },
              narrativeSuite: {
                ...defaultDisplaySettingsConst.narrativeSuite,
                ...(existingPortfolio.displaySettings?.narrativeSuite || {}),
              },
            },
            publicFullName: existingPortfolio.publicFullName,
            publicJobTitle: existingPortfolio.publicJobTitle,
            publicEmail: existingPortfolio.publicEmail,
            publicPhone: existingPortfolio.publicPhone,
            publicLocation: existingPortfolio.publicLocation,
            publicLinkedInUrl: existingPortfolio.publicLinkedInUrl,
            publicSummary: existingPortfolio.publicSummary || "",
            publicSkills: existingPortfolio.publicSkills || [],
            publicWorkExperiences:
              existingPortfolio.publicWorkExperiences || [],
            publicEducations: existingPortfolio.publicEducations || [],
            publicVolunteering: existingPortfolio.publicVolunteering || [],
            publicCertifications: existingPortfolio.publicCertifications || [],
            publicCareerNarrative:
              existingPortfolio.publicCareerNarrative || "",
            publicGoldenThread: existingPortfolio.publicGoldenThread || "",
            publicGoldenThreadEvidence:
              existingPortfolio.publicGoldenThreadEvidence || [],
            publicKeyThemes: existingPortfolio.publicKeyThemes || [],
            publicHiddenGems: existingPortfolio.publicHiddenGems || undefined,
            selectedPublicWhatIfs:
              existingPortfolio.selectedPublicWhatIfs || [],
            showcaseSections: existingPortfolio.showcaseSections || [],
          };

          // Set portfolioUrl for existing portfolio (so we can display “Shareable Link”)
          const url = `${window.location.origin}/portfolio/${
            existingPortfolio.slug || idOrActionParam
          }`;
          setPortfolioUrl(url);
          setOriginalSlug(existingPortfolio.slug || null);

          if (existingPortfolio.sourceResumeDraftId) {
            const draftRes = await axios.get(
              `/api/resume-drafts/${existingPortfolio.sourceResumeDraftId}`,
            );
            setOriginalSlug(existingPortfolio.slug || null);

            draftDataToUse = draftRes.data.draft as SourceResumeDraftData;
          }
        }

        setSourceDraft(draftDataToUse);
        setPortfolioSettings(tempPortfolioSettings);
      } catch (err: unknown) {
        console.error("Error in Portfolio Editor data fetching:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load editor data.",
        );
      } finally {
        setIsLoadingPage(false);
      }
    };

    if (idOrActionParam && isUserLoaded && user) loadData();
  }, [idOrActionParam, searchParams, user, isUserLoaded, router]);

  // ===== Debounced slug availability check =====
  useEffect(() => {
    const rawSlug = portfolioSettings?.slug?.trim() || "";
    if (!rawSlug) {
      setSlugAvailable(null);
      setSlugChecking(false);
      setSlugError(null);
      return;
    }

    if (originalSlug && rawSlug === originalSlug) {
      setSlugAvailable(true);
      setSlugError(null);
      setSlugChecking(false);
      return;
    }

    let isCancelled = false;
    setSlugChecking(true);
    setSlugAvailable(null);
    setSlugError(null);

    const timer = setTimeout(async () => {
      const available = await checkSlugAvailability(rawSlug);
      if (!isCancelled) {
        setSlugAvailable(available);
        setSlugError(
          available
            ? null
            : "This URL slug is already in use. Please choose another one.",
        );
        setSlugChecking(false);
      }
    }, 500);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [portfolioSettings?.slug]);

  // ===== Helper to update top‐level and displaySettings fields =====
  const handleSettingChange = (
    field: keyof LivingPortfolioSettings | "displaySettings",
    pathOrValue: string | boolean | string[],
    valueForDisplaySetting?: boolean,
  ) => {
    setPortfolioSettings((prev) => {
      if (!prev) return null;
      if (field !== "displaySettings") {
        return {
          ...prev,
          [field as keyof LivingPortfolioSettings]: pathOrValue,
        };
      } else {
        const pathString = pathOrValue as string;
        const value = valueForDisplaySetting!;
        const keys = pathString.split(".");
        if (keys.length === 2) {
          const parentKey = keys[0] as keyof LivingPortfolioDisplaySettings;
          const childKey = keys[1];
          if (
            prev.displaySettings &&
            parentKey in prev.displaySettings &&
            childKey in prev.displaySettings[parentKey]
          ) {
            return {
              ...prev,
              displaySettings: {
                ...prev.displaySettings,
                [parentKey]: {
                  ...prev.displaySettings[parentKey],
                  [childKey]: value,
                },
              },
            };
          }
        }
        console.warn("Invalid path for displaySettings update:", pathString);
        return prev;
      }
    });
  };

  // ===== Helper to update public content fields (strings, arrays, etc.) =====
  type PublicContentValue =
    | string
    | string[]
    | ResumeJSON["workExperiences"]
    | ResumeJSON["educations"]
    | ResumeJSON["volunteering"]
    | ResumeJSON["certifications"]
    | string
    | null
    | InitialNarrativeResult["goldenThreadEvidence"]
    | InitialNarrativeResult["keyThemes"]
    | HiddenGemsResult
    | Array<{ scenarioText: string; adaptedResult: WhatIfResult }>;

  const handlePublicContentChange = (
    field: keyof LivingPortfolioSettings,
    value: PublicContentValue,
  ) => {
    setPortfolioSettings((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  // ===== Toggle “What If?” checkboxes =====
  const handleToggleWhatIf = (whatIfItemFromDraft: {
    scenarioText: string;
    result: WhatIfResult;
  }) => {
    setPortfolioSettings((prev) => {
      if (!prev) return null;
      const { scenarioText, result } = whatIfItemFromDraft;
      const currentSelected = prev.selectedPublicWhatIfs;
      const existingIndex = currentSelected.findIndex(
        (item) => item.scenarioText === scenarioText,
      );
      if (existingIndex > -1) {
        return {
          ...prev,
          selectedPublicWhatIfs: currentSelected.filter(
            (_, i) => i !== existingIndex,
          ),
        };
      } else {
        return {
          ...prev,
          selectedPublicWhatIfs: [
            ...currentSelected,
            { scenarioText, adaptedResult: result },
          ],
        };
      }
    });
  };

  // ===== Showcase Sections logic =====
  const addShowcaseSection = () =>
    setPortfolioSettings((prev) =>
      prev
        ? {
            ...prev,
            showcaseSections: [
              ...prev.showcaseSections,
              {
                id: `section-${Date.now()}`,
                title: "New Showcase Section",
                items: [],
              },
            ],
          }
        : null,
    );
  const updateShowcaseSectionTitle = (sectionId: string, newTitle: string) =>
    setPortfolioSettings((prev) =>
      prev
        ? {
            ...prev,
            showcaseSections: prev.showcaseSections.map((s) =>
              s.id === sectionId ? { ...s, title: newTitle } : s,
            ),
          }
        : null,
    );
  const deleteShowcaseSection = (sectionId: string) => {
    if (window.confirm("Delete section?")) {
      setPortfolioSettings((prev) =>
        prev
          ? {
              ...prev,
              showcaseSections: prev.showcaseSections.filter(
                (s) => s.id !== sectionId,
              ),
            }
          : null,
      );
    }
  };
  const addShowcaseItem = (sectionId: string) =>
    setPortfolioSettings((prev) =>
      prev
        ? {
            ...prev,
            showcaseSections: prev.showcaseSections.map((s) =>
              s.id === sectionId
                ? {
                    ...s,
                    items: [
                      ...s.items,
                      {
                        id: `item-${Date.now()}`,
                        name: "New Item",
                        description: "",
                        skillsUsed: [],
                      },
                    ],
                  }
                : s,
            ),
          }
        : null,
    );
  const updateShowcaseItem = (
    sectionId: string,
    itemId: string,
    field: keyof Omit<ShowcaseItem, "id">,
    value: string | string[],
  ) => {
    setPortfolioSettings((prev) =>
      prev
        ? {
            ...prev,
            showcaseSections: prev.showcaseSections.map((s) =>
              s.id === sectionId
                ? {
                    ...s,
                    items: s.items.map((i) =>
                      i.id === itemId ? { ...i, [field]: value } : i,
                    ),
                  }
                : s,
            ),
          }
        : null,
    );
  };
  const deleteShowcaseItem = (sectionId: string, itemId: string) => {
    if (window.confirm("Delete item?")) {
      setPortfolioSettings((prev) =>
        prev
          ? {
              ...prev,
              showcaseSections: prev.showcaseSections.map((s) =>
                s.id === sectionId
                  ? { ...s, items: s.items.filter((i) => i.id !== itemId) }
                  : s,
              ),
            }
          : null,
      );
    }
  };

  // ===== Drag & Drop logic =====
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || !portfolioSettings) return;
    const activeId = active.id as string;
    const overId = over.id as string;
    const activeType = active.data.current?.type as string;
    if (activeType === "section" && activeId !== overId) {
      setPortfolioSettings((prev) =>
        prev
          ? {
              ...prev,
              showcaseSections: arrayMove(
                prev.showcaseSections,
                prev.showcaseSections.findIndex((s) => s.id === activeId),
                prev.showcaseSections.findIndex((s) => s.id === overId),
              ),
            }
          : null,
      );
    } else if (activeType === "item") {
      const activeSectionId = active.data.current?.sectionId as string;
      setPortfolioSettings((prev) =>
        prev
          ? {
              ...prev,
              showcaseSections: prev.showcaseSections.map((section) =>
                section.id === activeSectionId
                  ? {
                      ...section,
                      items: arrayMove(
                        section.items,
                        section.items.findIndex((i) => i.id === activeId),
                        section.items.findIndex((i) => i.id === overId),
                      ),
                    }
                  : section,
              ),
            }
          : null,
      );
    }
  };

  // ===== Save or Publish Handler =====
  const handleSaveOrPublish = async () => {
    if (!portfolioSettings) {
      setError("Settings not loaded. Cannot save.");
      return;
    }

    // 0. Front-end slug collision check
    const rawSlug = portfolioSettings.slug?.trim() || "";
    if (rawSlug && slugAvailable === false) {
      setError(
        "This custom URL slug is already in use. Please choose a different one.",
      );
      const slugInput = document.getElementById("portfolioSlug");
      if (slugInput) slugInput.focus();
      return;
    }

    setIsProcessing(true);
    setSuccessMessage(null);
    setError(null);

    if (!portfolioSettings.title || portfolioSettings.title.trim() === "") {
      setError(
        "Portfolio Title is required. Please enter a title for your portfolio.",
      );
      const titleInput = document.getElementById("portfolioTitle");
      if (titleInput) titleInput.focus();
      setIsProcessing(false);
      return;
    }

    if (!editingPortfolioId && !sourceDraft?.id) {
      setError(
        "Source resume draft is missing or invalid for a new portfolio. Cannot save.",
      );
      setIsProcessing(false);
      return;
    }

    // Trim and clean up each section and item exactly as before
    const cleanedShowcaseSections = portfolioSettings.showcaseSections
      .map((section) => ({
        ...section,
        title: section.title.trim(),
        items: section.items.map((item) => ({
          ...item,
          name: item.name.trim(),
          description: item.description.trim(),
          link: item.link?.trim() || undefined,
          skillsUsed: (item.skillsUsed || [])
            .map((skill) => skill.trim())
            .filter(Boolean),
        })),
      }))
      .filter((section) => section.title);

    // Build payloadForApi
    const payloadForApi: LivingPortfolioSettings & {
      sourceResumeDraftId?: string;
    } = {
      ...portfolioSettings,
      title: portfolioSettings.title.trim(),
      slug:
        portfolioSettings.slug === null
          ? null
          : portfolioSettings.slug?.trim() || "",
      showcaseSections: cleanedShowcaseSections,
      publicSkills: (portfolioSettings.publicSkills || [])
        .map((s) => s.trim())
        .filter(Boolean),
      publicWorkExperiences:
        portfolioSettings.publicWorkExperiences?.map((exp) => ({
          ...exp,
          bullets: (exp.bullets || []).map((b) => b.trim()).filter(Boolean),
        })) || [],
      publicVolunteering:
        portfolioSettings.publicVolunteering?.map((vol) => ({
          ...vol,
          bullets: ((vol as any).bullets || [])
            .map((b: string) => b.trim())
            .filter(Boolean),
        })) || [],
      // publicEducations and publicCertifications remain as-is
    };

    if (!editingPortfolioId && sourceDraft?.id) {
      payloadForApi.sourceResumeDraftId = sourceDraft.id;
    }

    try {
      let response;
      let newPortfolioUrl: string;

      if (editingPortfolioId) {
        response = await axios.put(
          `/api/living-portfolios/${editingPortfolioId}`,
          payloadForApi,
        );
        const returnedSlug =
          (response.data as any).portfolioSlug || editingPortfolioId;
        newPortfolioUrl = `${window.location.origin}/portfolio/${returnedSlug}`;
        setSuccessMessage(`Portfolio updated successfully!`);
        setPortfolioUrl(newPortfolioUrl);
        setError(null);
        if (
          (response.data as any).portfolioSlug &&
          portfolioSettings.slug !== (response.data as any).portfolioSlug
        ) {
          handleSettingChange("slug", (response.data as any).portfolioSlug);
        }
      } else {
        if (!payloadForApi.sourceResumeDraftId) {
          throw new Error(
            "Source draft ID is essential for creating a new portfolio.",
          );
        }
        response = await axios.post(
          "/api/living-portfolios/publish",
          payloadForApi,
        );
        const newPortfolioId = (response.data as any).portfolioId;
        const returnedSlug =
          (response.data as any).portfolioSlug || newPortfolioId;
        newPortfolioUrl = `${window.location.origin}/portfolio/${returnedSlug}`;
        setSuccessMessage(
          `Portfolio published successfully! Your portfolio is now live.`,
        );
        setPortfolioUrl(newPortfolioUrl);
        setEditingPortfolioId(newPortfolioId);
        router.replace(`/portfolio-editor/${newPortfolioId}`, {
          scroll: false,
        });
      }
      setError(null);
    } catch (err: unknown) {
      console.error(
        "Error saving/publishing portfolio (raw error object):",
        err,
      );
      let userFriendlyError =
        "Failed to save portfolio. An unexpected error occurred. Please try again.";

      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<any>;
        if (axiosError.response) {
          const status = axiosError.response.status;
          const responseData = axiosError.response.data;

          console.error("API Error Status:", status);
          console.error("API Error Response Data:", responseData);

          if (status === 409) {
            if (responseData && responseData.errorType === "DUPLICATE_SLUG") {
              userFriendlyError =
                responseData.message ||
                "This custom URL slug is already in use. Please choose a different one.";
              const slugInput = document.getElementById("portfolioSlug");
              if (slugInput) slugInput.focus();
            } else if (
              responseData &&
              responseData.errorType === "UNIQUE_CONSTRAINT_VIOLATION"
            ) {
              userFriendlyError =
                responseData.message ||
                "A piece of information conflicts with existing data. Please review your inputs.";
            } else if (
              responseData &&
              (responseData.error || responseData.message)
            ) {
              userFriendlyError = `Conflict: ${
                responseData.error || responseData.message
              }`;
            } else {
              userFriendlyError =
                "A conflict occurred while saving. This might be due to an existing URL slug or other conflicting data.";
            }
          } else if (status === 400) {
            if (responseData && responseData.errorType === "VALIDATION_ERROR") {
              userFriendlyError =
                responseData.message ||
                `Invalid input for ${responseData.field || "a field"}.`;
              if (responseData.field === "title") {
                const titleInput = document.getElementById("portfolioTitle");
                if (titleInput) titleInput.focus();
              } else if (responseData.field === "slug") {
                const slugInput = document.getElementById("portfolioSlug");
                if (slugInput) slugInput.focus();
              }
            } else if (
              responseData &&
              (responseData.error || responseData.message)
            ) {
              userFriendlyError = `Invalid input: ${
                responseData.error || responseData.message
              }`;
            } else {
              userFriendlyError =
                "The server could not process your request due to invalid data. Please check all fields.";
            }
          } else if (status === 401) {
            userFriendlyError =
              "Authentication failed. You might need to sign in again.";
          } else if (status === 403) {
            userFriendlyError =
              "You do not have permission to perform this action.";
          } else if (status >= 500) {
            userFriendlyError =
              "A server error occurred while saving your portfolio. Please try again later.";
          } else if (axiosError.message) {
            userFriendlyError = `Failed to save portfolio: ${axiosError.message}`;
          }
        } else if (axiosError.request) {
          userFriendlyError =
            "No response from the server. Please check your internet connection and try again.";
        } else {
          userFriendlyError = `Error setting up the save request: ${
            axiosError.message
          }`;
        }
      } else if (err instanceof Error) {
        userFriendlyError = `An error occurred: ${err.message}`;
      }

      setError(userFriendlyError);
    } finally {
      setIsProcessing(false);
    }
  };

  // ===== Render: Loading / Error / Editor Form =====
  if (isLoadingPage) {
    return (
      <div className="flex min-h-screen animate-pulse items-center justify-center text-xl font-semibold text-gray-700">
        Loading Portfolio Editor...
      </div>
    );
  }
  if (error && !portfolioSettings) {
    return (
      <div className="mx-auto my-10 max-w-2xl rounded-lg border-2 border-red-200 bg-red-50 p-8 text-center text-red-700 shadow-lg">
        <h2 className="mb-3 text-2xl font-semibold">
          Oops! Something went wrong.
        </h2>
        <p className="text-md mb-4">{error}</p>
        <button
          onClick={() =>
            router.push(
              idOrActionParam === "new"
                ? "/wizard"
                : user
                  ? `/profile/${user.id}`
                  : "/",
            )
          }
          className="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
        >
          {idOrActionParam === "new" ? "Go back to Wizard" : "Go to My Profile"}
        </button>
      </div>
    );
  }
  if (idOrActionParam === "new" && !sourceDraft && portfolioSettings) {
    return (
      <div className="mx-auto my-10 max-w-2xl rounded-lg border-2 border-yellow-200 bg-yellow-50 p-8 text-center text-lg text-yellow-800 shadow-lg">
        <h2 className="mb-3 text-2xl font-semibold">Missing Information</h2>
        <p className="text-md mb-4">
          {error || "Could not load the source resume draft for new portfolio."}
        </p>
        <button
          onClick={() => router.push("/wizard")}
          className="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
        >
          Go back to Wizard
        </button>
      </div>
    );
  }
  if (!portfolioSettings) {
    return (
      <div className="mx-auto my-10 max-w-2xl rounded-lg border-2 border-gray-200 bg-gray-100 p-8 text-center text-lg text-gray-700 shadow-lg">
        <h2 className="mb-3 text-2xl font-semibold">Unable to Load Editor</h2>
        <p className="text-md mb-4">
          Portfolio data could not be initialized. Please try again.
        </p>
        <button
          onClick={() =>
            router.push(
              editingPortfolioId && user?.id
                ? `/profile/${user.id}`
                : "/wizard",
            )
          }
          className="mt-4 rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow transition-colors hover:bg-indigo-700"
        >
          {editingPortfolioId ? "Go to My Profile" : "Go back to Wizard"}
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-7xl bg-slate-100 px-4 py-10 font-sans sm:px-6 sm:py-16 lg:px-8">
      {/* ← Back Button */}
      <button
        onClick={() =>
          router.push(
            editingPortfolioId && user?.id ? `/profile/${user.id}` : "/wizard",
          )
        }
        className="group mb-10 inline-flex items-center text-sm font-medium text-indigo-700 transition-colors hover:text-indigo-900"
      >
        <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
        {editingPortfolioId ? "Back to My Profile" : "Back to Resume Wizard"}
      </button>

      {/* Header */}
      <header className="mb-12 border-b-2 border-gray-300 pb-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          {editingPortfolioId
            ? "Edit Living Portfolio"
            : "Create New Living Portfolio"}
        </h1>
        {sourceDraft?.title && (
          <p className="mt-2 text-lg text-gray-600">
            Based on Resume Draft:{" "}
            <span className="font-semibold text-gray-800">
              &quot;{sourceDraft.title}&quot;
            </span>
          </p>
        )}
      </header>

      {/* Success / Error Notifications */}
      {(successMessage || portfolioUrl) && (
        <div className="animate-fadeIn mb-8 rounded-md border-l-4 border-green-500 bg-green-50 p-4 text-green-700 shadow-lg">
          <div className="flex">
            <div className="py-1">
              <Sparkles className="mr-4 h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-lg font-bold">
                {editingPortfolioId
                  ? "Portfolio Updated!"
                  : "Portfolio Published!"}
              </p>
              {successMessage && (
                <p className="mt-1 text-sm">{successMessage}</p>
              )}
              {portfolioUrl && (
                <div className="mt-1 text-sm">
                  Shareable Link:{" "}
                  <a
                    href={portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-600 underline hover:text-blue-700"
                  >
                    {portfolioUrl}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {error && !successMessage && (
        <div className="animate-fadeIn mb-8 rounded-md border-l-4 border-red-500 bg-red-50 p-4 text-red-700 shadow-lg">
          <span className="font-bold">Error:</span> {error}
        </div>
      )}

      {/* Grid Layout: Editor Form + Sidebar */}
      <div className="grid grid-cols-1 gap-x-10 gap-y-12 lg:grid-cols-3">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          {/* ===== Left/Main Column ===== */}
          <div className="space-y-10 lg:col-span-2">
            {/* ---- Portfolio Details Section ---- */}
            <section className={sectionCardClass}>
              <h2 className={`${sectionTitleClass} mb-2`}>
                <Settings2 size={28} className="mr-3 text-indigo-600" />{" "}
                Portfolio Details
              </h2>
              <div className="space-y-6 pt-4">
                {/* Title Input */}
                <div>
                  <label
                    htmlFor="portfolioTitle"
                    className="mb-1.5 block text-sm font-semibold text-gray-700"
                  >
                    Portfolio Title*
                  </label>
                  <input
                    type="text"
                    id="portfolioTitle"
                    value={portfolioSettings.title}
                    onChange={(e) =>
                      handleSettingChange("title", e.target.value)
                    }
                    className={inputBaseClass}
                  />
                </div>

                {/* Slug Input (with inline availability feedback) */}
                <div>
                  <label
                    htmlFor="portfolioSlug"
                    className="mb-1.5 block text-sm font-semibold text-gray-700"
                  >
                    Custom URL Slug (Optional)
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center whitespace-nowrap rounded-l-md border border-r-0 border-gray-300 bg-gray-100 px-3 text-gray-500 sm:text-sm">
                      {typeof window !== "undefined"
                        ? `${window.location.origin}/portfolio/`
                        : "/portfolio/"}
                    </span>
                    <input
                      type="text"
                      id="portfolioSlug"
                      value={portfolioSettings.slug || ""}
                      onChange={(e) => {
                        const formatted = e.target.value
                          .toLowerCase()
                          .replace(/\s+/g, "-");
                        handleSettingChange("slug", formatted);
                      }}
                      placeholder="your-unique-slug"
                      className={`${inputBaseClass} !rounded-l-none focus:z-10`}
                      aria-invalid={slugAvailable === false}
                      aria-describedby="slug-error-text"
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-gray-500">
                    Lowercase letters, numbers, hyphens. Auto-formats. Blank for
                    unique ID.
                  </p>
                  {slugChecking && portfolioSettings.slug?.trim() !== "" && (
                    <p className="mt-1 text-xs text-indigo-600">
                      Checking availability…
                    </p>
                  )}
                  {slugError && (
                    <p
                      id="slug-error-text"
                      className="mt-1 text-xs font-medium text-red-600"
                    >
                      {slugError}
                    </p>
                  )}
                </div>

                {/* Theme Selector */}
                <div>
                  <label
                    htmlFor="portfolioTheme"
                    className="mb-1.5 block text-sm font-semibold text-gray-700"
                  >
                    <Palette size={18} className="mr-2 inline text-gray-500" />
                    Portfolio Theme
                  </label>
                  <select
                    id="portfolioTheme"
                    name="theme"
                    value={portfolioSettings.theme}
                    onChange={(e) =>
                      handleSettingChange("theme", e.target.value)
                    }
                    className={`${inputBaseClass} appearance-none`}
                  >
                    {availableThemes.map((themeOption) => (
                      <option key={themeOption.id} value={themeOption.id}>
                        {themeOption.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Public Toggle */}
                <div className="pt-2">
                  <label className={`${checkboxLabelClass} !text-base`}>
                    <input
                      type="checkbox"
                      checked={portfolioSettings.isPublic}
                      onChange={(e) =>
                        handleSettingChange("isPublic", e.target.checked)
                      }
                      className={`${checkboxClass} h-5 w-5 !text-green-600 focus:ring-green-500`}
                    />
                    <span className="font-semibold text-gray-800">
                      Make this Portfolio Publicly Shareable
                    </span>
                  </label>
                </div>
              </div>
            </section>

            {/* ---- Edit Portfolio Content Section ---- */}
            <section className={sectionCardClass}>
              <h2 className={`${sectionTitleClass}`}>
                <EditIcon size={28} className="mr-3 text-indigo-600" /> Edit
                Portfolio Content
              </h2>
              <p className="-mt-4 mb-6 text-sm text-gray-500">
                Tailor content for this portfolio. Visibility is controlled in
                the next section.
              </p>
              <div className="space-y-4">
                {/* Contact Information */}
                <EditorCollapsibleSection
                  title="Contact Information"
                  icon={<UserCircle />}
                  isVisible={true}
                  initiallyOpen={false}
                >
                  <div className="space-y-3 p-2">
                    {portfolioSettings.displaySettings.contact.showFullName && (
                      <div>
                        <label className="mb-0.5 block text-xs font-medium capitalize text-gray-600">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={portfolioSettings.publicFullName || ""}
                          onChange={(e) =>
                            handlePublicContentChange(
                              "publicFullName",
                              e.target.value,
                            )
                          }
                          className={inputBaseClass}
                          placeholder="Full Name for portfolio display"
                        />
                      </div>
                    )}
                    <div>
                      <label className="mb-0.5 block text-xs font-medium capitalize text-gray-600">
                        Job Title / Headline
                      </label>
                      <input
                        type="text"
                        value={portfolioSettings.publicJobTitle || ""}
                        onChange={(e) =>
                          handlePublicContentChange(
                            "publicJobTitle",
                            e.target.value,
                          )
                        }
                        className={inputBaseClass}
                        placeholder="Your professional headline"
                      />
                    </div>
                    {portfolioSettings.displaySettings.contact.showEmail && (
                      <div>
                        <label className="mb-0.5 block text-xs font-medium capitalize text-gray-600">
                          Email
                        </label>
                        <input
                          type="email"
                          value={portfolioSettings.publicEmail || ""}
                          onChange={(e) =>
                            handlePublicContentChange(
                              "publicEmail",
                              e.target.value,
                            )
                          }
                          className={inputBaseClass}
                          placeholder="Contact email"
                        />
                      </div>
                    )}
                    {portfolioSettings.displaySettings.contact.showPhone && (
                      <div>
                        <label className="mb-0.5 block text-xs font-medium capitalize text-gray-600">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={portfolioSettings.publicPhone || ""}
                          onChange={(e) =>
                            handlePublicContentChange(
                              "publicPhone",
                              e.target.value,
                            )
                          }
                          className={inputBaseClass}
                          placeholder="Contact phone"
                        />
                      </div>
                    )}
                    {portfolioSettings.displaySettings.contact.showLocation && (
                      <div>
                        <label className="mb-0.5 block text-xs font-medium capitalize text-gray-600">
                          Location
                        </label>
                        <input
                          type="text"
                          value={portfolioSettings.publicLocation || ""}
                          onChange={(e) =>
                            handlePublicContentChange(
                              "publicLocation",
                              e.target.value,
                            )
                          }
                          className={inputBaseClass}
                          placeholder="City, Country"
                        />
                      </div>
                    )}
                    {portfolioSettings.displaySettings.contact.showLinkedIn && (
                      <div>
                        <label className="mb-0.5 block text-xs font-medium capitalize text-gray-600">
                          LinkedIn URL
                        </label>
                        <input
                          type="url"
                          value={portfolioSettings.publicLinkedInUrl || ""}
                          onChange={(e) =>
                            handlePublicContentChange(
                              "publicLinkedInUrl",
                              e.target.value,
                            )
                          }
                          className={inputBaseClass}
                          placeholder="LinkedIn Profile URL"
                        />
                      </div>
                    )}
                    {Object.values(
                      portfolioSettings.displaySettings.contact,
                    ).every((v) => !v) && (
                      <p className="text-xs italic text-gray-500">
                        No contact fields are set to visible. Enable them in{" "}
                        &quot;Content Visibility&quot; to edit their content
                        here.
                      </p>
                    )}
                  </div>
                </EditorCollapsibleSection>

                {/* Summary */}
                <EditorCollapsibleSection
                  title="Summary"
                  icon={<FileText />}
                  isVisible={
                    portfolioSettings.displaySettings.sections.showSummary
                  }
                  initiallyOpen={
                    !!portfolioSettings.displaySettings.sections.showSummary
                  }
                >
                  <textarea
                    value={portfolioSettings.publicSummary || ""}
                    onChange={(e) =>
                      handlePublicContentChange("publicSummary", e.target.value)
                    }
                    rows={6}
                    className={textareaBaseClass}
                    placeholder="Portfolio Summary"
                  />
                  {sourceDraft?.wizardSummary &&
                    portfolioSettings.publicSummary !==
                      sourceDraft.wizardSummary && (
                      <button
                        type="button"
                        onClick={() =>
                          handlePublicContentChange(
                            "publicSummary",
                            sourceDraft.wizardSummary || "",
                          )
                        }
                        className="mt-1.5 text-xs text-indigo-600 hover:underline"
                      >
                        Reset to draft summary
                      </button>
                    )}
                </EditorCollapsibleSection>

                {/* Skills */}
                <EditorCollapsibleSection
                  title="Skills"
                  icon={<Layers />}
                  isVisible={
                    portfolioSettings.displaySettings.sections.showSkills
                  }
                >
                  <label className="mb-1 block text-xs font-medium text-gray-600">
                    Skills (comma-separated)
                  </label>
                  <textarea
                    value={(portfolioSettings.publicSkills || []).join(", ")}
                    onChange={(e) =>
                      handlePublicContentChange(
                        "publicSkills",
                        e.target.value
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean),
                      )
                    }
                    rows={3}
                    className={textareaBaseClass}
                    placeholder="e.g., React, Project Management"
                  />
                  {sourceDraft?.wizardSkills &&
                    JSON.stringify(
                      (portfolioSettings.publicSkills || [])
                        .map((s) => s.trim())
                        .filter(Boolean),
                    ) !==
                      JSON.stringify(
                        (sourceDraft.wizardSkills || [])
                          .map((s) => s.trim())
                          .filter(Boolean),
                      ) && (
                      <button
                        type="button"
                        onClick={() =>
                          handlePublicContentChange(
                            "publicSkills",
                            sourceDraft.wizardSkills || [],
                          )
                        }
                        className="mt-1.5 text-xs text-indigo-600 hover:underline"
                      >
                        Reset to draft skills
                      </button>
                    )}
                </EditorCollapsibleSection>

                {/* Work Experience / Education / Volunteering / Certifications (snapshots) */}
                {[
                  "WorkExperience",
                  "Education",
                  "Volunteering",
                  "Certifications",
                ].map((sectionKey) => {
                  const displayKey =
                    `show${sectionKey}` as keyof LivingPortfolioDisplaySettings["sections"];
                  if (portfolioSettings.displaySettings.sections[displayKey]) {
                    const IconComponent =
                      sectionKey === "WorkExperience"
                        ? Briefcase
                        : sectionKey === "Education"
                          ? GraduationCap
                          : sectionKey === "Volunteering"
                            ? Gift
                            : ShieldCheck;
                    return (
                      <EditorCollapsibleSection
                        key={`edit-${sectionKey}`}
                        title={`Public ${sectionKey.replace(/([A-Z])/g, " $1").trim()} (Snapshot)`}
                        icon={<IconComponent />}
                        isVisible={true}
                      >
                        <div className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 p-3">
                          <Info
                            size={20}
                            className="mt-0.5 flex-shrink-0 text-amber-600"
                          />
                          <p className="text-xs italic text-gray-700">
                            Content for{" "}
                            <strong>
                              {sectionKey
                                .replace(/([A-Z])/g, " $1")
                                .toLowerCase()}
                            </strong>{" "}
                            is snapshotted from your resume draft. To edit
                            individual items (e.g., specific jobs, degrees,
                            bullets), please update your{" "}
                            <Link
                              href={`/wizard?step=3`}
                              className="font-medium text-indigo-600 hover:underline"
                            >
                              Resume Draft in the Wizard
                            </Link>
                            .
                          </p>
                        </div>
                      </EditorCollapsibleSection>
                    );
                  }
                  return null;
                })}

                {/* Career Narrative */}
                {portfolioSettings.displaySettings.narrativeSuite
                  .showCareerNarrative && (
                  <EditorCollapsibleSection
                    title="Career Narrative"
                    icon={<MessageSquareQuote />}
                  >
                    <textarea
                      value={portfolioSettings.publicCareerNarrative || ""}
                      onChange={(e) =>
                        handlePublicContentChange(
                          "publicCareerNarrative",
                          e.target.value,
                        )
                      }
                      rows={5}
                      className={textareaBaseClass}
                    />
                    {sourceDraft?.aiCareerNarrative &&
                      portfolioSettings.publicCareerNarrative !==
                        sourceDraft.aiCareerNarrative && (
                        <button
                          type="button"
                          onClick={() =>
                            handlePublicContentChange(
                              "publicCareerNarrative",
                              sourceDraft.aiCareerNarrative || "",
                            )
                          }
                          className="mt-1.5 text-xs text-indigo-600 hover:underline"
                        >
                          Reset to AI narrative
                        </button>
                      )}
                  </EditorCollapsibleSection>
                )}
                {/* Golden Thread */}
                {portfolioSettings.displaySettings.narrativeSuite
                  .showGoldenThread && (
                  <EditorCollapsibleSection
                    title="Golden Thread"
                    icon={<Zap />}
                  >
                    <input
                      type="text"
                      value={portfolioSettings.publicGoldenThread || ""}
                      onChange={(e) =>
                        handlePublicContentChange(
                          "publicGoldenThread",
                          e.target.value,
                        )
                      }
                      className={inputBaseClass}
                    />
                    {sourceDraft?.aiGoldenThread &&
                      portfolioSettings.publicGoldenThread !==
                        sourceDraft.aiGoldenThread && (
                        <button
                          type="button"
                          onClick={() =>
                            handlePublicContentChange(
                              "publicGoldenThread",
                              sourceDraft.aiGoldenThread || "",
                            )
                          }
                          className="mt-1.5 text-xs text-indigo-600 hover:underline"
                        >
                          Reset to AI golden thread
                        </button>
                      )}
                  </EditorCollapsibleSection>
                )}
                {/* Key Themes */}
                {portfolioSettings.displaySettings.narrativeSuite
                  .showKeyThemes && (
                  <EditorCollapsibleSection
                    title="Key Themes (Snapshot)"
                    icon={<Sparkles />}
                  >
                    <div className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 p-3">
                      <Info
                        size={16}
                        className="mt-0.5 flex-shrink-0 text-amber-600"
                      />
                      <p className="text-xs italic text-gray-500">
                        Content from draft. Edit via AI Suite in Wizard.
                      </p>
                    </div>
                  </EditorCollapsibleSection>
                )}
                {/* Hidden Gems */}
                {portfolioSettings.displaySettings.narrativeSuite
                  .showHiddenGems && (
                  <EditorCollapsibleSection
                    title="Hidden Gems (Snapshot)"
                    icon={<ThumbsUp />}
                  >
                    <div className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 p-3">
                      <Info
                        size={16}
                        className="mt-0.5 flex-shrink-0 text-amber-600"
                      />
                      <p className="text-xs italic text-gray-500">
                        Content from draft. Edit via AI Suite in Wizard.
                      </p>
                    </div>
                  </EditorCollapsibleSection>
                )}
                {/* Golden Thread Evidence */}
                {portfolioSettings.displaySettings.narrativeSuite
                  .showGoldenThread &&
                  portfolioSettings.publicGoldenThreadEvidence &&
                  portfolioSettings.publicGoldenThreadEvidence.length > 0 && (
                    <EditorCollapsibleSection
                      title="Golden Thread Evidence (Snapshot)"
                      icon={<ListChecks />}
                    >
                      <div className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 p-3">
                        <Info
                          size={16}
                          className="mt-0.5 flex-shrink-0 text-amber-600"
                        />
                        <p className="text-xs italic text-gray-500">
                          Content from draft. Edit via AI Suite in Wizard.
                        </p>
                      </div>
                    </EditorCollapsibleSection>
                  )}
              </div>
            </section>

            {/* ---- Content Visibility Toggles Section ---- */}
            <section className={sectionCardClass}>
              <h2 className={`${sectionTitleClass} mb-2`}>
                <Eye size={28} className="mr-3 text-indigo-600" /> Content
                Visibility Toggles
              </h2>
              <p className="-mt-4 mb-6 text-sm text-gray-500">
                Choose which sections will appear on your public portfolio.
              </p>
              <div className="space-y-6 pt-4">
                {/* Contact Info Toggles */}
                <div>
                  <h3 className={subSectionTitleClass}>Contact Information:</h3>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3 pt-1 md:grid-cols-3">
                    {(
                      Object.keys(
                        portfolioSettings.displaySettings.contact,
                      ) as Array<
                        keyof LivingPortfolioDisplaySettings["contact"]
                      >
                    ).map((key) => (
                      <label
                        key={`ds-contact-${key}`}
                        className={checkboxLabelClass}
                      >
                        <input
                          type="checkbox"
                          checked={
                            !!portfolioSettings.displaySettings.contact[key]
                          }
                          onChange={(e) =>
                            handleSettingChange(
                              "displaySettings",
                              `contact.${key}`,
                              e.target.checked,
                            )
                          }
                          className={checkboxClass}
                        />
                        <span>
                          {key
                            .substring(4)
                            .replace(/([A-Z])/g, " $1")
                            .trim()}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Standard Resume Section Toggles */}
                <div className="border-t border-gray-200 pt-5">
                  <h3 className={subSectionTitleClass}>
                    Standard Resume Sections:
                  </h3>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3 pt-1 md:grid-cols-3">
                    {(
                      Object.keys(
                        portfolioSettings.displaySettings.sections,
                      ) as Array<
                        keyof LivingPortfolioDisplaySettings["sections"]
                      >
                    ).map((key) => (
                      <label
                        key={`ds-section-${key}`}
                        className={checkboxLabelClass}
                      >
                        <input
                          type="checkbox"
                          checked={
                            !!portfolioSettings.displaySettings.sections[key]
                          }
                          onChange={(e) =>
                            handleSettingChange(
                              "displaySettings",
                              `sections.${key}`,
                              e.target.checked,
                            )
                          }
                          className={checkboxClass}
                        />
                        <span>
                          {key
                            .substring(4)
                            .replace(/([A-Z])/g, " $1")
                            .trim()}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* AI Narrative Suite Toggles */}
                {sourceDraft?.aiCareerNarrative && (
                  <div className="border-t border-gray-200 pt-5">
                    <h3 className={subSectionTitleClass}>
                      AI Narrative Suite Elements:
                    </h3>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-3 pt-1 md:grid-cols-3">
                      {(
                        Object.keys(
                          portfolioSettings.displaySettings.narrativeSuite,
                        ) as Array<
                          keyof LivingPortfolioDisplaySettings["narrativeSuite"]
                        >
                      ).map((key) => (
                        <label
                          key={`ds-narrative-${key}`}
                          className={checkboxLabelClass}
                        >
                          <input
                            type="checkbox"
                            checked={
                              !!portfolioSettings.displaySettings
                                .narrativeSuite[key]
                            }
                            onChange={(e) =>
                              handleSettingChange(
                                "displaySettings",
                                `narrativeSuite.${key}`,
                                e.target.checked,
                              )
                            }
                            className={checkboxClass}
                          />
                          <span>
                            {key
                              .substring(4)
                              .replace(/([A-Z])/g, " $1")
                              .trim()}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* ---- AI “What If?” Scenarios Section (if any) ---- */}
            {sourceDraft?.aiWhatIfResultsCache &&
              sourceDraft.aiWhatIfResultsCache.length > 0 && (
                <section className={sectionCardClass}>
                  <h2 className={`${sectionTitleClass} mb-2`}>
                    <Brain size={28} className="mr-3 text-indigo-600" />{" "}
                    Showcase &quot;What If?&quot; Scenarios
                  </h2>
                  <p className="mb-4 pt-2 text-sm text-gray-600">
                    Select AI-generated scenarios from your resume draft to
                    include.
                  </p>
                  <div className="max-h-80 space-y-1.5 overflow-y-auto rounded-lg border bg-slate-50 p-4 shadow-inner">
                    {sourceDraft.aiWhatIfResultsCache.map((whatIfItem) => (
                      <label
                        key={`editor-whatif-${whatIfItem.scenarioText.replace(
                          /\s+/g,
                          "-",
                        )}`}
                        className={`${checkboxLabelClass} block w-full rounded-md border border-gray-200 p-3 transition-colors hover:border-indigo-200 hover:bg-indigo-100`}
                      >
                        <input
                          type="checkbox"
                          checked={portfolioSettings.selectedPublicWhatIfs.some(
                            (pwi) =>
                              pwi.scenarioText === whatIfItem.scenarioText,
                          )}
                          onChange={() => handleToggleWhatIf(whatIfItem)}
                          className={`${checkboxClass} mr-3 !text-teal-600 focus:ring-teal-500`}
                        />
                        <span
                          className="font-medium text-gray-800"
                          title={whatIfItem.scenarioText}
                        >
                          &quot;{whatIfItem.scenarioText}&quot;
                        </span>
                      </label>
                    ))}
                  </div>
                </section>
              )}

            {/* ---- Custom Showcase Sections ---- */}
            <section className={`${sectionCardClass} space-y-6`}>
              <div className="flex flex-col justify-between gap-3 border-b border-gray-200 pb-4 sm:flex-row sm:items-center">
                <h2 className={`${sectionTitleClass} mb-0 border-b-0 pb-0`}>
                  <Layers size={28} className="mr-3 text-indigo-600" /> Custom
                  Showcase Sections
                </h2>
                <button
                  type="button"
                  onClick={addShowcaseSection}
                  className="flex shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-blue-700"
                >
                  <Plus size={18} /> Add New Section
                </button>
              </div>
              {portfolioSettings.showcaseSections.length === 0 && (
                <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-8 text-center">
                  <FolderKanban
                    className="mx-auto h-12 w-12 text-gray-400"
                    strokeWidth={1.5}
                  />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">
                    No showcase sections yet
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Add a section to highlight projects, skills, or experiences.
                  </p>
                </div>
              )}
              <div className="space-y-8">
                <SortableContext
                  items={portfolioSettings.showcaseSections.map((s) => s.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {portfolioSettings.showcaseSections.map((section) => (
                    <SortableShowcaseSection
                      key={section.id}
                      section={section}
                      updateShowcaseSectionTitle={updateShowcaseSectionTitle}
                      deleteShowcaseSection={deleteShowcaseSection}
                    >
                      {section.items.length === 0 && (
                        <p className="py-3 text-center text-sm italic text-gray-500">
                          No items. Click &quot;+ Add Item&quot; below.
                        </p>
                      )}
                      <div className="space-y-1">
                        <SortableContext
                          items={section.items.map((i) => i.id)}
                          strategy={verticalListSortingStrategy}
                        >
                          {section.items.map((item) => (
                            <SortableShowcaseItem
                              key={item.id}
                              sectionId={section.id}
                              item={item}
                              updateShowcaseItem={updateShowcaseItem}
                              deleteShowcaseItem={deleteShowcaseItem}
                            />
                          ))}
                        </SortableContext>
                      </div>
                      <button
                        type="button"
                        onClick={() => addShowcaseItem(section.id)}
                        className="mt-4 flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow transition-colors hover:bg-indigo-600"
                      >
                        <Plus size={16} strokeWidth={3} /> Add Item
                      </button>
                    </SortableShowcaseSection>
                  ))}
                </SortableContext>
              </div>
            </section>

            {/* Repeat success & error notifications below (so they stay visible if user scrolls) */}
            {(successMessage || portfolioUrl) && (
              <div className="animate-fadeIn mb-8 rounded-md border-l-4 border-green-500 bg-green-50 p-4 text-green-700 shadow-lg">
                <div className="flex">
                  <div className="py-1">
                    <Sparkles className="mr-4 h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-lg font-bold">
                      {editingPortfolioId
                        ? "Portfolio Updated!"
                        : "Portfolio Published!"}
                    </p>
                    {successMessage && (
                      <p className="mt-1 text-sm">{successMessage}</p>
                    )}
                    {portfolioUrl && (
                      <div className="mt-1 text-sm">
                        Shareable Link:{" "}
                        <a
                          href={portfolioUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-blue-600 underline hover:text-blue-700"
                        >
                          {portfolioUrl}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            {error && !successMessage && (
              <div className="animate-fadeIn mb-8 rounded-md border-l-4 border-red-500 bg-red-50 p-4 text-red-700 shadow-lg">
                <span className="font-bold">Error:</span> {error}
              </div>
            )}

            {/* ---- Bottom “Cancel / Save & Publish” Buttons ---- */}
            <div className="mt-12 flex flex-col items-center justify-end gap-4 border-t-2 border-gray-300 pt-10 sm:flex-row">
              <button
                type="button"
                onClick={() => router.back()}
                className={secondaryButtonClass}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveOrPublish}
                disabled={isProcessing || isLoadingPage}
                className={`${primaryButtonClass} min-w-[240px] text-lg`}
              >
                {isProcessing
                  ? "Processing..."
                  : editingPortfolioId
                    ? "Update Portfolio"
                    : "Save & Publish Portfolio"}
              </button>
            </div>
          </div>
        </DndContext>

        {/* ===== Sidebar: Source Draft Context ===== */}
        <aside className="space-y-6 lg:col-span-1">
          <div className="sticky top-10 rounded-xl border border-slate-300 bg-slate-200 p-6 shadow-xl">
            <h3 className="mb-4 flex items-center border-b-2 border-slate-400 pb-3 text-xl font-bold text-gray-800">
              <FileText size={24} className="mr-3 text-slate-700" /> Source
              Draft Context
            </h3>
            {sourceDraft?.wizardPersonalData?.fullName && (
              <p className="mb-2 text-sm">
                <strong className="font-semibold text-slate-700">Name:</strong>{" "}
                {sourceDraft.wizardPersonalData.fullName}
              </p>
            )}
            {sourceDraft?.wizardSummary && (
              <div className="mb-3">
                <strong className="mb-0.5 block text-sm font-semibold text-slate-700">
                  Summary Snippet:
                </strong>
                <p className="rounded-md bg-white p-2 text-xs italic text-gray-700 shadow-sm">
                  &quot;{sourceDraft.wizardSummary.substring(0, 150)}...&quot;
                </p>
              </div>
            )}
            {sourceDraft?.aiCareerNarrative && (
              <div className="mb-3">
                <strong className="mb-0.5 block text-sm font-semibold text-slate-700">
                  AI Narrative Snippet:
                </strong>
                <p className="rounded-md bg-white p-2 text-xs italic text-gray-700 shadow-sm">
                  &quot;{sourceDraft.aiCareerNarrative.substring(0, 150)}
                  ...&quot;
                </p>
              </div>
            )}
            {sourceDraft?.aiGoldenThread && (
              <p className="mb-3 text-sm">
                <strong className="font-semibold text-slate-700">
                  Golden Thread:
                </strong>{" "}
                <span className="font-semibold italic text-purple-700">
                  {sourceDraft.aiGoldenThread}
                </span>
              </p>
            )}
            <p className="mt-5 border-t border-slate-400 pt-3 text-xs text-slate-600">
              Read-only view of your resume draft. Use the editor on the left to
              build your Living Portfolio.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
