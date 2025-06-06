// // // // src/app/portfolio/edit/[portfolioIdOrNew]/page.tsx
// // // "use client"; // This page will be highly interactive for editing

// // // import React, { useState, useEffect } from 'react';
// // // import { useParams, useRouter, useSearchParams } from 'next/navigation';
// // // import axios from 'axios';
// // // import { useUser } from '@clerk/nextjs';

// // // // Import your necessary types (ensure paths are correct)
// // // import { ResumeJSON } from '@/components/ATSScore'; // For ResumeDraft structure
// // // import {
// // //     InitialNarrativeResult,
// // //     WhatIfResult,
// // //     HiddenGemsResult
// // // } from '@/components/NarrativeWeaver';

// // // // Define types for this page's state and data
// // // interface ShowcaseItem {
// // //   name: string;
// // //   description: string;
// // //   link?: string;
// // //   skillsUsed?: string[];
// // // }
// // // interface ShowcaseSectionData {
// // //   id: string; // For React keys
// // //   title: string;
// // //   items: ShowcaseItem[];
// // // }

// // // interface LivingPortfolioSettings { // This will be our main editable state
// // //   title: string;
// // //   slug?: string;
// // //   isPublic: boolean;
// // //   theme: string;
// // //   displaySettings: {
// // //     contact: { showEmail: boolean; showPhone: boolean; showLocation: boolean; showLinkedIn: boolean; showPhoto: boolean; };
// // //     sections: { showSummary: boolean; showSkills: boolean; showWorkExperience: boolean; showEducation: boolean; showVolunteering: boolean; showCertifications: boolean; showReferences: boolean; };
// // //     narrativeSuite: { showCareerNarrative: boolean; showGoldenThread: boolean; showKeyThemes: boolean; showHiddenGems: boolean; };
// // //   };
// // //   selectedPublicWhatIfs: Array<{ scenarioText: string, adaptedResult: WhatIfResult }>;
// // //   showcaseSections: Array<ShowcaseSectionData>;
// // // }

// // // // Type for the data fetched from ResumeDraft
// // // interface SourceResumeDraftData {
// // //   id: string;
// // //   title?: string | null;
// // //   wizardPersonalData?: ResumeJSON['personal'] | null;
// // //   wizardSummary?: string | null;
// // //   wizardSkills?: string[] | null;
// // //   wizardWorkExperiences?: ResumeJSON['workExperiences'] | null;
// // //   wizardEducations?: ResumeJSON['educations'] | null;
// // //   wizardVolunteering?: ResumeJSON['volunteering'] | null;
// // //   wizardCertifications?: ResumeJSON['certifications'] | null;
// // //   // AI Data from Draft
// // //   aiCareerNarrative?: string | null;
// // //   aiGoldenThread?: string | null;
// // //   aiGoldenThreadEvidence?: InitialNarrativeResult['goldenThreadEvidence'] | null;
// // //   aiKeyThemes?: InitialNarrativeResult['keyThemes'] | null;
// // //   aiHiddenGemsResultJson?: HiddenGemsResult | null;
// // //   aiWhatIfResultsCache?: Array<{ scenarioText: string, result: WhatIfResult }> | null;
// // // }

// // // const defaultPortfolioSettings: Omit<LivingPortfolioSettings, 'title'> = { // Omit title as it will be set from draft/existing
// // //     slug: '',
// // //     isPublic: false,
// // //     theme: "default",
// // //     displaySettings: {
// // //         contact: { showEmail: true, showPhone: false, showLocation: true, showLinkedIn: true, showPhoto: false },
// // //         sections: { showSummary: true, showSkills: true, showWorkExperience: true, showEducation: true, showVolunteering: false, showCertifications: false, showReferences: false },
// // //         narrativeSuite: { showCareerNarrative: true, showGoldenThread: true, showKeyThemes: true, showHiddenGems: false }
// // //     },
// // //     selectedPublicWhatIfs: [],
// // //     showcaseSections: [],
// // // };

// // // export default function PortfolioEditorPage() {
// // //   const router = useRouter();
// // //   const params = useParams() ?? {}; // fallback to empty object
// // //   const searchParams = useSearchParams(); // keep this one
// // //   const { user, isLoaded: isUserLoaded } = useUser();

// // //   const portfolioIdOrNew = (params as Record<string, string>).portfolioIdOrNew || '';
// // //   const sourceDraftIdFromQuery = searchParams?.get('draftId') || '';

// // //   const [isLoading, setIsLoading] = useState(true);
// // //   const [error, setError] = useState<string | null>(null);
// // //   const [sourceDraft, setSourceDraft] = useState<SourceResumeDraftData | null>(null);
// // //   const [portfolioSettings, setPortfolioSettings] = useState<LivingPortfolioSettings | null>(null);
// // //   const [existingPortfolioId, setExistingPortfolioId] = useState<string | null>(null); // To know if we are editing or creating

// // //   const [saveStatus, setSaveStatus] = useState<string | null>(null);

// // //   // Fetch data on mount
// // //   useEffect(() => {
// // //     if (!isUserLoaded) return;
// // //     if (!user && portfolioIdOrNew !== 'new') { // If trying to edit, but not logged in
// // //         router.push('/sign-in'); // Or your login page
// // //         return;
// // //     }

// // //     const fetchData = async () => {
// // //       setIsLoading(true);
// // //       setError(null);
// // //       try {
// // //         if (portfolioIdOrNew === 'new') {
// // //           // Creating a NEW portfolio based on a ResumeDraft
// // //           if (!sourceDraftIdFromQuery) {
// // //             setError("Source Resume Draft ID is missing. Cannot create a new portfolio.");
// // //             setIsLoading(false);
// // //             return;
// // //           }
// // //           // Fetch the source ResumeDraft data
// // //           const draftRes = await axios.get(`/api/resume-drafts/${sourceDraftIdFromQuery}`);
// // //           setSourceDraft(draftRes.data.draft);
// // //           setPortfolioSettings({
// // //             title: `${draftRes.data.draft?.wizardPersonalData?.fullName || 'My'} Portfolio`,
// // //             ...defaultPortfolioSettings
// // //           });
// // //           setExistingPortfolioId(null); // Mark as new portfolio creation
// // //         } else {
// // //           // Editing an EXISTING portfolio
// // //           setExistingPortfolioId(portfolioIdOrNew);
// // //           const portfolioRes = await axios.get(`/api/living-portfolios/edit/${portfolioIdOrNew}`); // New API endpoint needed
// // //           const existingPortfolio = portfolioRes.data.portfolio;
// // //           setPortfolioSettings({
// // //             title: existingPortfolio.title,
// // //             slug: existingPortfolio.slug || '',
// // //             isPublic: existingPortfolio.isPublic,
// // //             theme: existingPortfolio.theme,
// // //             displaySettings: existingPortfolio.displaySettings,
// // //             selectedPublicWhatIfs: existingPortfolio.publicWhatIfScenarios || [],
// // //             showcaseSections: existingPortfolio.showcaseSections || [],
// // //           });
// // //           // Also fetch its source draft for context (e.g., to pick WhatIfs from)
// // //           if (existingPortfolio.sourceResumeDraftId) {
// // //             const draftRes = await axios.get(`/api/resume-drafts/${existingPortfolio.sourceResumeDraftId}`);
// // //             setSourceDraft(draftRes.data.draft);
// // //           }
// // //         }
// // //       } catch (err: any) {
// // //         console.error("Error fetching data for portfolio editor:", err);
// // //         setError(err.response?.data?.error || err.message || "Failed to load data.");
// // //       } finally {
// // //         setIsLoading(false);
// // //       }
// // //     };

// // //     fetchData();
// // //   }, [portfolioIdOrNew, sourceDraftIdFromQuery, router, user, isUserLoaded]);

// // //   // --- Handlers for portfolioSettings (title, slug, displaySettings, whatIfs, showcaseSections) ---
// // //   // These will be identical to the ones you had in page.tsx for LivingPortfolioSettings
// // //   const handleSettingChange = (
// // //     section: keyof LivingPortfolioSettings['displaySettings'] | 'title' | 'slug' | 'isPublic' | 'theme',
// // //     key: string,
// // //     value: any
// // //   ) => {
// // //     setPortfolioSettings(prev => prev ? {
// // //       ...prev,
// // //       ...( (section === 'title' || section === 'slug' || section === 'isPublic' || section === 'theme')
// // //            ? { [section]: value }
// // //            : { displaySettings: {
// // //                 ...prev.displaySettings,
// // //                 [section as keyof LivingPortfolioSettings['displaySettings']]: {

// // //                   ...prev.displaySettings[section as keyof LivingPortfolioSettings['displaySettings']],
// // //                   [key]: value,
// // //                 },
// // //               }
// // //             }
// // //       )
// // //     } : null);
// // //   };

// // //   const handleToggleWhatIf = (whatIfItemFromDraft: { scenarioText: string, result: WhatIfResult }) => {
// // //     if (!portfolioSettings) return;
// // //     const { scenarioText, result } = whatIfItemFromDraft;
// // //     const currentSelected = portfolioSettings.selectedPublicWhatIfs;
// // //     const existingIndex = currentSelected.findIndex(item => item.scenarioText === scenarioText);

// // //     if (existingIndex > -1) {
// // //       setPortfolioSettings(prev => prev ? { ...prev, selectedPublicWhatIfs: currentSelected.filter((_, i) => i !== existingIndex) } : null);
// // //     } else {
// // //       setPortfolioSettings(prev => prev ? { ...prev, selectedPublicWhatIfs: [...currentSelected, { scenarioText, adaptedResult: result }] } : null);
// // //     }
// // //   };

// // //   // --- Showcase Section Handlers (copy these from your page.tsx implementation) ---
// // //   const addShowcaseSection = () => { /* ... updates portfolioSettings.showcaseSections ... */ };
// // //   // const updateShowcaseSectionTitle = (sectionId: string, newTitle: string) => { /* ... */ };
// // //   // const deleteShowcaseSection = (sectionId: string) => { /* ... */ };
// // //   // const addShowcaseItem = (sectionId: string) => { /* ... */ };
// // //   // const updateShowcaseItem = (sectionId: string, itemIndex: number, field: keyof ShowcaseItem, value: string | string[]) => { /* ... */ };
// // //   // const deleteShowcaseItem = (sectionId: string, itemIndex: number) => { /* ... */ };
// // //   // // --- End Showcase Section Handlers ---

// // //   const handleSaveOrPublish = async () => {
// // //     if (!portfolioSettings || (!sourceDraft && !existingPortfolioId)) {
// // //       setError("Portfolio data or source draft is not loaded correctly.");
// // //       return;
// // //     }
// // //     if (!sourceDraftIdFromQuery && !existingPortfolioId) {
// // //         setError("Cannot save/publish: Missing source draft ID for new portfolio or existing portfolio ID.");
// // //         return;
// // //     }

// // //     setIsLoading(true); // Use general loading for save/publish action
// // //     setSaveStatus(null);
// // //     setError(null);

// // //     // Construct the payload based on current portfolioSettings and sourceDraft info
// // //     const publishPayload = {
// // //       sourceResumeDraftId: sourceDraft?.id || (portfolioSettings as any).sourceResumeDraftId || sourceDraftIdFromQuery, // Needs careful handling based on edit/new
// // //       title: portfolioSettings.title,
// // //       slug: portfolioSettings.slug || undefined,
// // //       isPublic: portfolioSettings.isPublic,
// // //       theme: portfolioSettings.theme,
// // //       displaySettings: portfolioSettings.displaySettings,

// // //       publicFullName: portfolioSettings.displaySettings.contact.showPhoto && sourceDraft?.wizardPersonalData ? sourceDraft.wizardPersonalData.fullName : undefined,
// // //       publicJobTitle: (sourceDraft?.wizardPersonalData as any)?.jobTitle,
// // //       publicEmail: portfolioSettings.displaySettings.contact.showEmail && sourceDraft?.wizardPersonalData ? sourceDraft.wizardPersonalData.email : undefined,
// // //       publicPhone: portfolioSettings.displaySettings.contact.showPhone && sourceDraft?.wizardPersonalData ? sourceDraft.wizardPersonalData.phone : undefined,
// // //       publicLocation: portfolioSettings.displaySettings.contact.showLocation && sourceDraft?.wizardPersonalData ? `${sourceDraft.wizardPersonalData.city}, ${sourceDraft.wizardPersonalData.country}`.replace(/^, |, $/g, '') : undefined,
// // //       publicLinkedInUrl: portfolioSettings.displaySettings.contact.showLinkedIn && sourceDraft?.wizardPersonalData ? sourceDraft.wizardPersonalData.linkedinUrl : undefined,

// // //       publicSummary: portfolioSettings.displaySettings.sections.showSummary ? sourceDraft?.wizardSummary : undefined,
// // //       publicSkills: portfolioSettings.displaySettings.sections.showSkills ? sourceDraft?.wizardSkills : [],
// // //       publicWorkExperiences: portfolioSettings.displaySettings.sections.showWorkExperience ? sourceDraft?.wizardWorkExperiences : [],
// // //       publicEducations: portfolioSettings.displaySettings.sections.showEducation ? sourceDraft?.wizardEducations : [],
// // //       publicVolunteering: portfolioSettings.displaySettings.sections.showVolunteering ? sourceDraft?.wizardVolunteering : [],
// // //       publicCertifications: portfolioSettings.displaySettings.sections.showCertifications ? sourceDraft?.wizardCertifications : [],

// // //       publicCareerNarrative: portfolioSettings.displaySettings.narrativeSuite.showCareerNarrative ? sourceDraft?.aiCareerNarrative : undefined,
// // //       publicGoldenThread: portfolioSettings.displaySettings.narrativeSuite.showGoldenThread ? sourceDraft?.aiGoldenThread : undefined,
// // //       publicGoldenThreadEvidence: (portfolioSettings.displaySettings.narrativeSuite.showGoldenThread && sourceDraft?.aiGoldenThreadEvidence) ? sourceDraft.aiGoldenThreadEvidence : undefined,
// // //       publicKeyThemes: portfolioSettings.displaySettings.narrativeSuite.showKeyThemes ? sourceDraft?.aiKeyThemes : undefined,
// // //       publicHiddenGems: portfolioSettings.displaySettings.narrativeSuite.showHiddenGems ? sourceDraft?.aiHiddenGemsResultJson : undefined,

// // //       publicWhatIfScenarios: portfolioSettings.selectedPublicWhatIfs,
// // //       showcaseSections: portfolioSettings.showcaseSections,
// // //     };

// // //     try {
// // //       let response;
// // //       if (existingPortfolioId) {
// // //         // Update existing portfolio
// // //         response = await axios.put(`/api/living-portfolios/${existingPortfolioId}`, publishPayload);
// // //         setSaveStatus("Portfolio updated successfully!");
// // //       } else {
// // //         // Create new portfolio
// // //         response = await axios.post('/api/living-portfolios/publish', publishPayload);
// // //         setSaveStatus(`Portfolio published! Link: ${window.location.origin}/portfolio/${response.data.portfolioSlug || response.data.portfolioId}`);
// // //         setExistingPortfolioId(response.data.portfolioId); // Update state to reflect it's now an existing portfolio
// // //         router.replace(`/portfolio/edit/${response.data.portfolioId}`); // Update URL to edit mode
// // //       }
// // //       console.log("Portfolio Save/Publish Response:", response.data);
// // //       // Optionally redirect to the public portfolio page or show a persistent success message
// // //     } catch (err: any) {
// // //       console.error("Error saving/publishing portfolio:", err);
// // //       setError(err.response?.data?.error || err.message || "Failed to save/publish portfolio.");
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   if (isLoading && !sourceDraft && !portfolioSettings) { // Adjusted loading condition
// // //     return <div className="flex justify-center items-center min-h-screen">Loading portfolio editor...</div>;
// // //   }
// // //   if (error) {
// // //     return <div className="p-8 text-red-600 text-center">Error: {error} <button onClick={() => router.push('/wizard')} className="ml-2 text-blue-600 underline">Go back to Wizard</button></div>;
// // //   }
// // //   if (!portfolioSettings || (!sourceDraft && portfolioIdOrNew === 'new')) {
// // //     return <div className="p-8 text-center">Could not load portfolio data or source draft. <button onClick={() => router.push('/wizard')} className="ml-2 text-blue-600 underline">Go back to Wizard</button></div>;
// // //   }

// // //   // --- UI Rendering for the Portfolio Editor Page ---
// // //   return (
// // //     <div className="max-w-4xl mx-auto p-4 sm:p-8 font-sans">
// // //       <header className="mb-8">
// // //         <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
// // //           {existingPortfolioId ? "Edit Living Portfolio" : "Create New Living Portfolio"}
// // //         </h1>
// // //         {sourceDraft?.title && <p className="text-sm text-gray-500">Based on draft: &quot;{sourceDraft.title}&quot;</p>}
// // //       </header>

// // //       {saveStatus && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">{saveStatus}</div>}
// // //       {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}

// // //       {/* Portfolio Settings Form */}
// // //       <div className="space-y-6 bg-white p-6 rounded-lg shadow-xl">
// // //         <div>
// // //           <label htmlFor="portfolioTitle" className="block text-sm font-medium text-gray-700">Portfolio Title</label>
// // //           <input
// // //             type="text" id="portfolioTitle"
// // //             value={portfolioSettings.title}
// // //             onChange={(e) => handleSettingChange('title', 'title', e.target.value)}
// // //             className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
// // //           />
// // //         </div>

// // //         {/* Slug, Theme, IsPublic Checkbox */}
// // //         {/* ... Add inputs for slug, theme dropdown, isPublic checkbox ... */}
// // //         {/* Example for isPublic: */}
// // //         <label className="flex items-center space-x-2 cursor-pointer">
// // //             <input type="checkbox" checked={portfolioSettings.isPublic} onChange={(e) => handleSettingChange('isPublic', 'isPublic', e.target.checked)} className="h-4 w-4 text-green-600"/>
// // //             <span className="text-sm font-medium text-gray-700">Make Publicly Shareable</span>
// // //         </label>

// // //         {/* Display Settings Checkboxes (Contact, Sections, Narrative Suite) */}
// // //         {/* You would replicate the checkbox groups you had in page.tsx's Step 4 here */}
// // //         {/* Example for one group: */}
// // //         <fieldset className="pt-4 border-t mt-4">
// // //             <legend className="text-lg font-medium text-gray-900">Content Visibility</legend>
// // //             <div className="mt-2 space-y-3">
// // //                 <h4 className="text-md font-medium text-gray-700">Resume Sections:</h4>
// // //                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2">
// // //                 {(Object.keys(portfolioSettings.displaySettings.sections) as Array<keyof LivingPortfolioSettings['displaySettings']['sections']>)
// // //                     .map(key => (
// // //                         <label key={`ds-section-${key}`} className="flex items-center space-x-2 cursor-pointer text-sm">
// // //                             <input type="checkbox" checked={!!portfolioSettings.displaySettings.sections[key]} onChange={(e) => handleSettingChange('sections', key, e.target.checked)} className="h-4 w-4 text-indigo-600"/>
// // //                             <span>{key.substring(4).replace(/([A-Z])/g, ' $1').trim()}</span>
// // //                         </label>
// // //                 ))}
// // //                 </div>
// // //                 {/* ... Repeat for 'contact' and 'narrativeSuite' display settings ... */}
// // //             </div>
// // //         </fieldset>

// // //         {/* What If Scenarios Selection */}
// // //         {sourceDraft?.aiWhatIfResultsCache && sourceDraft.aiWhatIfResultsCache.length > 0 && (
// // //           <div className="pt-4 border-t mt-4">
// // //             <h4 className="text-md font-medium text-gray-700">Include &quot;What If?&quot; Scenarios:</h4>
// // //             <p className="text-xs text-gray-500 mb-2">Select from the AI-generated scenarios from your resume draft.</p>
// // //             <div className="max-h-60 overflow-y-auto space-y-1.5 p-2 border rounded-md">
// // //               {sourceDraft.aiWhatIfResultsCache.map((whatIfItem, index) => (
// // //                 <label key={`editor-whatif-${index}`} className="flex items-center space-x-2 cursor-pointer p-1.5 hover:bg-gray-100 text-sm">
// // //                   <input
// // //                     type="checkbox"
// // //                     checked={portfolioSettings.selectedPublicWhatIfs.some(pwi => pwi.scenarioText === whatIfItem.scenarioText)}
// // //                     onChange={() => handleToggleWhatIf(whatIfItem)}
// // //                     className="h-4 w-4 text-teal-600"
// // //                   />
// // //                   <span className="truncate" title={whatIfItem.scenarioText}>&quot;{whatIfItem.scenarioText.substring(0,60)}...&quot;</span>
// // //                 </label>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* --- Showcase Sections UI (Placeholder - You'll add the full UI here) --- */}
// // //         <div className="space-y-4 pt-4 border-t mt-4">
// // //             <div className="flex justify-between items-center">
// // //                 <h4 className="text-lg font-medium text-gray-700">Showcase Sections</h4>
// // //                 <button type="button" onClick={addShowcaseSection} className="/* ... your add button style ... */">
// // //                 + Add Section
// // //                 </button>
// // //             </div>
// // //             {/* ... Map portfolioSettings.showcaseSections to render the editor UI for them ... */}
// // //             {/* This will be the complex UI with inputs for section title, items, item details etc. */}
// // //             {/* Use the functions: updateShowcaseSectionTitle, deleteShowcaseSection, addShowcaseItem, updateShowcaseItem, deleteShowcaseItem */}
// // //         </div>
// // //         {/* --- End Showcase Sections UI Placeholder --- */}

// // //         <div className="pt-6 border-t">
// // //           <button
// // //             onClick={handleSaveOrPublish}
// // //             disabled={isLoading}
// // //             className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 disabled:opacity-70 flex items-center justify-center"
// // //           >
// // //             {isLoading ? "Saving..." : (existingPortfolioId ? "Update Portfolio" : "Save & Publish Portfolio")}
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // src/app/portfolio-editor/[idOrAction]/page.tsx
// // "use client";

// // import React, { useState, useEffect } from 'react';
// // import { useParams, useRouter, useSearchParams } from 'next/navigation';
// // import axios from 'axios';
// // import { useUser } from '@clerk/nextjs';

// // // DND-Kit Imports
// // import {
// //   DndContext,
// //   closestCenter,
// //   KeyboardSensor,
// //   PointerSensor,
// //   useSensor,
// //   useSensors,
// //   DragEndEvent,
// // } from '@dnd-kit/core';
// // import {
// //   arrayMove,
// //   SortableContext,
// //   sortableKeyboardCoordinates,
// //   verticalListSortingStrategy,
// //   useSortable,
// // } from '@dnd-kit/sortable';
// // import { CSS } from '@dnd-kit/utilities';

// // // Lucide Icons
// // import {
// //     ArrowLeft, Plus, Trash2, GripVertical, FolderKanban, FileText, Palette, Eye, Settings2,
// //     Edit3 as EditIcon, ChevronDown, ChevronUp, Layers, MessageSquareQuote, Briefcase, Brain, Zap,
// //     UserCircle, GraduationCap, Gift, ShieldCheck, ThumbsUp, Info, Link as LinkIcon, RefreshCw, Sparkles, ListChecks
// // } from 'lucide-react';

// // import { ResumeJSON } from '@/components/ATSScore';
// // import { InitialNarrativeResult, WhatIfResult, HiddenGemsResult } from '@/components/NarrativeWeaver';

// // // --- Interfaces ---
// // interface ShowcaseItem { id: string; name: string; description: string; link?: string; skillsUsed?: string[]; }
// // interface ShowcaseSectionData { id: string; title: string; items: ShowcaseItem[]; }
// // interface LivingPortfolioDisplaySettings { contact: { showEmail: boolean; showPhone: boolean; showLocation: boolean; showLinkedIn: boolean; showPhoto: boolean; }; sections: { showSummary: boolean; showSkills: boolean; showWorkExperience: boolean; showEducation: boolean; showVolunteering: boolean; showCertifications: boolean; showReferences: boolean; }; narrativeSuite: { showCareerNarrative: boolean; showGoldenThread: boolean; showKeyThemes: boolean; showHiddenGems: boolean; }; }

// // interface LivingPortfolioSettings {
// //   title: string; slug?: string; isPublic: boolean; theme: string;
// //   displaySettings: LivingPortfolioDisplaySettings;
// //   publicFullName?: string; publicJobTitle?: string; publicEmail?: string; publicPhone?: string; publicLocation?: string; publicLinkedInUrl?: string;
// //   publicSummary?: string; publicSkills?: string[];
// //   publicWorkExperiences?: ResumeJSON['workExperiences'];
// //   publicEducations?: ResumeJSON['educations'];
// //   publicVolunteering?: ResumeJSON['volunteering'];
// //   publicCertifications?: ResumeJSON['certifications'];
// //   publicCareerNarrative?: string; publicGoldenThread?: string;
// //   publicGoldenThreadEvidence?: InitialNarrativeResult['goldenThreadEvidence'];
// //   publicKeyThemes?: InitialNarrativeResult['keyThemes'];
// //   publicHiddenGems?: HiddenGemsResult;
// //   selectedPublicWhatIfs: Array<{ scenarioText: string, adaptedResult: WhatIfResult }>;
// //   showcaseSections: Array<ShowcaseSectionData>;
// // }

// // // Adding jobTitle to wizardPersonalData within SourceResumeDraftData for type safety
// // interface WizardPersonalDataWithJobTitle extends ResumeJSON['personal'] {
// //     jobTitle?: string;
// // }
// // interface SourceResumeDraftData {
// //     id: string; title?: string | null;
// //     wizardPersonalData?: WizardPersonalDataWithJobTitle | null;
// //     wizardSummary?: string | null; wizardSkills?: string[] | null;
// //     wizardWorkExperiences?: ResumeJSON['workExperiences'] | null;
// //     wizardEducations?: ResumeJSON['educations'] | null;
// //     wizardVolunteering?: ResumeJSON['volunteering'] | null;
// //     wizardCertifications?: ResumeJSON['certifications'] | null;
// //     aiCareerNarrative?: string | null; aiGoldenThread?: string | null;
// //     aiGoldenThreadEvidence?: InitialNarrativeResult['goldenThreadEvidence'] | null;
// //     aiKeyThemes?: InitialNarrativeResult['keyThemes'] | null;
// //     aiHiddenGemsResultJson?: HiddenGemsResult | null;
// //     aiWhatIfResultsCache?: Array<{ scenarioText: string, result: WhatIfResult }> | null;
// // }
// // interface ExistingLivingPortfolioData extends LivingPortfolioSettings { id: string; sourceResumeDraftId: string; }

// // const defaultDisplaySettingsConst: LivingPortfolioDisplaySettings = {
// //     contact: { showEmail: true, showPhone: true, showLocation: true, showLinkedIn: true, showPhoto: false },
// //     sections: { showSummary: true, showSkills: true, showWorkExperience: true, showEducation: true, showVolunteering: true, showCertifications: true, showReferences: false },
// //     narrativeSuite: { showCareerNarrative: true, showGoldenThread: true, showKeyThemes: true, showHiddenGems: true }
// // };

// // const initialPortfolioSettingsShell: LivingPortfolioSettings = {
// //     title: "Loading Portfolio...",
// //     slug: '', isPublic: true, theme: "default",
// //     displaySettings: JSON.parse(JSON.stringify(defaultDisplaySettingsConst)),
// //     selectedPublicWhatIfs: [], showcaseSections: [],
// //     publicFullName: undefined, publicJobTitle: undefined, publicEmail: undefined, publicPhone: undefined, publicLocation: undefined, publicLinkedInUrl: undefined,
// //     publicSummary: undefined, publicSkills: [], publicWorkExperiences: [], publicEducations: [],
// //     publicVolunteering: [], publicCertifications: [], publicCareerNarrative: undefined,
// //     publicGoldenThread: undefined, publicGoldenThreadEvidence: [], publicKeyThemes: [], publicHiddenGems: undefined,
// // };

// // const availableThemes = [ { id: 'default', name: 'Default Professional' }, { id: 'modern-dark', name: 'Modern Dark' }, { id: 'creative-light', name: 'Creative Light' }, { id: 'minimalist-focus', name: 'Minimalist Focus' }, ];
// // const inputBaseClass = "block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-150";
// // const checkboxLabelClass = "flex items-center space-x-2.5 cursor-pointer text-sm py-1 text-gray-700 hover:text-indigo-700 transition-colors";
// // const checkboxClass = "h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 focus:ring-offset-1 shadow-sm";
// // const sectionCardClass = "bg-white p-6 sm:p-8 rounded-xl shadow-xl";
// // const sectionTitleClass = "text-2xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-4 flex items-center gap-3";
// // const subSectionTitleClass = "text-lg font-semibold text-gray-700 mb-3";
// // const textareaBaseClass = "block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-150 resize-y";
// // const primaryButtonClass = "inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors";
// // const secondaryButtonClass = "inline-flex items-center justify-center px-5 py-2.5 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition-colors";
// // const iconButtonClass = "p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors";

// // const EditorCollapsibleSection: React.FC<{title: string, children: React.ReactNode, icon?: React.ReactNode, initiallyOpen?: boolean, isVisible?: boolean}> =
// //   ({ title, children, icon, initiallyOpen = false, isVisible = true }) => {
// //     const [isOpen, setIsOpen] = useState(initiallyOpen);
// //     useEffect(() => { setIsOpen(initiallyOpen); }, [initiallyOpen]); // Sync with prop
// //     if (!isVisible) return null;
// //     return (
// //         <div className="border border-gray-300 rounded-lg bg-slate-50/70 overflow-hidden my-4 transition-all duration-300 ease-in-out shadow-sm hover:shadow-md">
// //             <button type="button" onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center p-4 text-left text-gray-800 hover:bg-slate-100 focus:outline-none font-medium transition-colors" >
// //                 <span className="flex items-center text-md"> {icon && <span className="mr-2.5 text-indigo-600 opacity-80">{icon}</span>} {title} </span>
// //                 {isOpen ? <ChevronUp size={20} className="text-gray-500"/> : <ChevronDown size={20} className="text-gray-500"/>}
// //             </button>
// //             {isOpen && <div className="p-5 border-t border-gray-200 bg-white space-y-4">{children}</div>}
// //         </div>
// //     );
// // };

// // function SortableShowcaseItem({ sectionId, item, updateShowcaseItem, deleteShowcaseItem }: { sectionId: string; item: ShowcaseItem; updateShowcaseItem: (sectionId: string, itemId: string, field: keyof Omit<ShowcaseItem, 'id'>, value: string | string[]) => void; deleteShowcaseItem: (sectionId: string, itemId: string) => void; }) {
// //   const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id, data: { type: 'item', sectionId: sectionId } });
// //   const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.7 : 1, zIndex: isDragging ? 100 : 'auto' };
// //   return (
// //     <div ref={setNodeRef} style={style} className="p-5 border border-gray-300 rounded-lg space-y-4 bg-white relative group shadow-md hover:shadow-lg transition-shadow mb-4">
// //       <div className="flex items-start justify-between">
// //         <div {...attributes} {...listeners} className={`cursor-grab p-1.5 -ml-1.5 text-gray-400 hover:text-gray-600 touch-none`}> <GripVertical size={20} /> </div>
// //         <div className="flex-grow ml-2 space-y-3">
// //           <div><label htmlFor={`itemName-${sectionId}-${item.id}`} className="block text-xs font-semibold text-gray-600 mb-1">Item Name*</label><input id={`itemName-${sectionId}-${item.id}`} type="text" value={item.name} onChange={(e) => updateShowcaseItem(sectionId, item.id, 'name', e.target.value)} placeholder="E.g., Customer Churn Prediction Model" className={`${inputBaseClass} text-sm py-2.5`} /></div>
// //           <div><label htmlFor={`itemDesc-${sectionId}-${item.id}`} className="block text-xs font-semibold text-gray-600 mb-1">Description*</label><textarea id={`itemDesc-${sectionId}-${item.id}`} value={item.description} onChange={(e) => updateShowcaseItem(sectionId, item.id, 'description', e.target.value)} placeholder="Detailed description..." rows={4} className={`${textareaBaseClass} text-sm min-h-[80px] py-2.5`} /></div>
// //           <div><label htmlFor={`itemLink-${sectionId}-${item.id}`} className="block text-xs font-semibold text-gray-600 mb-1">Link (Optional)</label><input id={`itemLink-${sectionId}-${item.id}`} type="url" value={item.link || ''} onChange={(e) => updateShowcaseItem(sectionId, item.id, 'link', e.target.value)} placeholder="https://github.com/..." className={`${inputBaseClass} text-sm py-2.5`} /></div>
// //           <div>
// //             <label htmlFor={`itemSkills-${sectionId}-${item.id}`} className="block text-xs font-semibold text-gray-600 mb-1">Skills Used (comma-separated)</label>
// //             <textarea id={`itemSkills-${sectionId}-${item.id}`} value={(item.skillsUsed || []).join(', ')}
// //                 onChange={(e) => { const skillsArray = e.target.value.split(','); updateShowcaseItem(sectionId, item.id, 'skillsUsed', skillsArray); }}
// //                 placeholder="React, Node.js, Project Management" rows={2} className={`${textareaBaseClass} text-sm min-h-[60px] py-2.5`}
// //             />
// //           </div>
// //         </div>
// //         <button type="button" onClick={() => deleteShowcaseItem(sectionId, item.id)} className={`${iconButtonClass} !text-red-500 hover:!text-red-700 hover:!bg-red-100 ml-2`} title="Delete Item"><Trash2 size={18} /></button>
// //       </div>
// //     </div>);
// // }

// // function SortableShowcaseSection({ section, children, updateShowcaseSectionTitle, deleteShowcaseSection }: { section: ShowcaseSectionData; children: React.ReactNode; updateShowcaseSectionTitle: (sectionId: string, newTitle: string) => void; deleteShowcaseSection: (sectionId: string) => void;}) {
// //   const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: section.id, data: { type: 'section' } });
// //   const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.8 : 1, boxShadow: isDragging ? '0 10px 20px rgba(0,0,0,0.1)' : '', zIndex: isDragging ? 100 : 'auto' };
// //   return (
// //     <div ref={setNodeRef} style={style} className="p-6 border-2 border-gray-200 rounded-xl bg-slate-50 space-y-5 shadow-lg hover:shadow-xl transition-shadow duration-300">
// //         <div className="flex items-center border-b-2 border-gray-300 pb-3 mb-5">
// //             <div {...attributes} {...listeners} className={`cursor-grab p-2 -ml-2 mr-2 ${iconButtonClass} touch-none text-gray-400 hover:text-gray-700`}> <GripVertical size={24} /> </div>
// //             <input type="text" value={section.title} onChange={(e) => updateShowcaseSectionTitle(section.id, e.target.value)} placeholder="Section Title" className="text-xl font-semibold p-2 border-0 border-b-2 border-transparent focus:border-indigo-500 outline-none flex-grow focus:ring-0 placeholder-gray-500 w-full bg-transparent" />
// //             <button type="button" onClick={() => deleteShowcaseSection(section.id)} className={`${iconButtonClass} !text-red-500 hover:!text-red-700 hover:!bg-red-100 ml-4`} title="Delete Section"> <Trash2 size={20} /> </button>
// //         </div>
// //         {children}
// //     </div>);
// // }

// // export default function PortfolioEditorPage() {
// //   const router = useRouter();
// //   const params = useParams();
// //   const searchParams = useSearchParams();
// //   const { user, isLoaded: isUserLoaded } = useUser();
// //   const idOrActionParam = params.idOrAction as string;

// //   const [isLoadingPage, setIsLoadingPage] = useState(true);
// //   const [isProcessing, setIsProcessing] = useState(false);
// //   const [error, setError] = useState<string | null>(null);
// //   const [successMessage, setSuccessMessage] = useState<string | null>(null);
// //   const [sourceDraft, setSourceDraft] = useState<SourceResumeDraftData | null>(null);
// //   const [portfolioSettings, setPortfolioSettings] = useState<LivingPortfolioSettings>(
// //     () => JSON.parse(JSON.stringify(initialPortfolioSettingsShell))
// //   );
// //   const [editingPortfolioId, setEditingPortfolioId] = useState<string | null>(null);

// //   const sensors = useSensors( useSensor(PointerSensor, {activationConstraint: { distance: 8 }}), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates, }) );

// //   useEffect(() => {
// //     if (!idOrActionParam || !isUserLoaded) return;
// //     if (!user) { router.push('/sign-in'); return; }

// //     const loadData = async () => {
// //       setIsLoadingPage(true); setError(null); setSuccessMessage(null);
// //       setEditingPortfolioId(null); setSourceDraft(null);
// //       let tempPortfolioSettings: LivingPortfolioSettings;

// //       try {
// //         let draftDataToUse: SourceResumeDraftData | null = null;

// //         if (idOrActionParam === 'new') {
// //           const draftIdQuery = searchParams.get('draftId');
// //           if (!draftIdQuery) throw new Error("Resume Draft ID required for new portfolio.");
// //           const draftRes = await axios.get(`/api/resume-drafts/${draftIdQuery}`);
// //           draftDataToUse = draftRes.data.draft as SourceResumeDraftData;
// //           if (!draftDataToUse) throw new Error("Failed to fetch source resume draft.");

// //           tempPortfolioSettings = {
// //             title: `${draftDataToUse.wizardPersonalData?.fullName || 'My'} Portfolio`,
// //             ...JSON.parse(JSON.stringify(initialPortfolioSettingsShell))
// //           };

// //           const ds = tempPortfolioSettings.displaySettings;
// //           if (draftDataToUse.wizardPersonalData) {
// //             if (ds.contact.showFullName) tempPortfolioSettings.publicFullName = draftDataToUse.wizardPersonalData.fullName; else tempPortfolioSettings.publicFullName = undefined;
// //             tempPortfolioSettings.publicJobTitle = draftDataToUse.wizardPersonalData.jobTitle || undefined;
// //             if (ds.contact.showEmail) tempPortfolioSettings.publicEmail = draftDataToUse.wizardPersonalData.email; else tempPortfolioSettings.publicEmail = undefined;
// //             if (ds.contact.showPhone) tempPortfolioSettings.publicPhone = draftDataToUse.wizardPersonalData.phone; else tempPortfolioSettings.publicPhone = undefined;
// //             if (ds.contact.showLocation) tempPortfolioSettings.publicLocation = `${draftDataToUse.wizardPersonalData.city}, ${draftDataToUse.wizardPersonalData.country}`.replace(/^, |, $/g, ''); else tempPortfolioSettings.publicLocation = undefined;
// //             if (ds.contact.showLinkedIn) tempPortfolioSettings.publicLinkedInUrl = draftDataToUse.wizardPersonalData.linkedinUrl; else tempPortfolioSettings.publicLinkedInUrl = undefined;
// //           }
// //           tempPortfolioSettings.publicSummary = ds.sections.showSummary ? draftDataToUse.wizardSummary || "" : "";
// //           tempPortfolioSettings.publicSkills = ds.sections.showSkills ? (draftDataToUse.wizardSkills || []) : [];
// //           tempPortfolioSettings.publicWorkExperiences = ds.sections.showWorkExperience ? (draftDataToUse.wizardWorkExperiences || []) : [];
// //           tempPortfolioSettings.publicEducations = ds.sections.showEducation ? (draftDataToUse.wizardEducations || []) : [];
// //           tempPortfolioSettings.publicVolunteering = ds.sections.showVolunteering ? (draftDataToUse.wizardVolunteering || []) : [];
// //           tempPortfolioSettings.publicCertifications = ds.sections.showCertifications ? (draftDataToUse.wizardCertifications || []) : [];
// //           tempPortfolioSettings.publicCareerNarrative = ds.narrativeSuite.showCareerNarrative ? draftDataToUse.aiCareerNarrative || "" : "";
// //           tempPortfolioSettings.publicGoldenThread = ds.narrativeSuite.showGoldenThread ? draftDataToUse.aiGoldenThread || "" : "";
// //           tempPortfolioSettings.publicGoldenThreadEvidence = (ds.narrativeSuite.showGoldenThread && draftDataToUse.aiGoldenThreadEvidence) ? draftDataToUse.aiGoldenThreadEvidence : [];
// //           tempPortfolioSettings.publicKeyThemes = (ds.narrativeSuite.showKeyThemes && draftDataToUse.aiKeyThemes) ? draftDataToUse.aiKeyThemes : [];
// //           tempPortfolioSettings.publicHiddenGems = (ds.narrativeSuite.showHiddenGems && draftDataToUse.aiHiddenGemsResultJson) ? draftDataToUse.aiHiddenGemsResultJson : undefined;

// //         } else {
// //           setEditingPortfolioId(idOrActionParam);
// //           const portfolioRes = await axios.get(`/api/living-portfolios/edit/${idOrActionParam}`);
// //           const existingPortfolio: ExistingLivingPortfolioData = portfolioRes.data.portfolio;
// //           if (!existingPortfolio) throw new Error("Portfolio to edit not found or access denied.");

// //           tempPortfolioSettings = {
// //             title: existingPortfolio.title, slug: existingPortfolio.slug || '', isPublic: existingPortfolio.isPublic, theme: existingPortfolio.theme,
// //             displaySettings: {
// //                 contact: {...defaultDisplaySettingsConst.contact, ...(existingPortfolio.displaySettings?.contact || {})},
// //                 sections: {...defaultDisplaySettingsConst.sections, ...(existingPortfolio.displaySettings?.sections || {})},
// //                 narrativeSuite: {...defaultDisplaySettingsConst.narrativeSuite, ...(existingPortfolio.displaySettings?.narrativeSuite || {})},
// //             },
// //             publicFullName: existingPortfolio.publicFullName, publicJobTitle: existingPortfolio.publicJobTitle,
// //             publicEmail: existingPortfolio.publicEmail, publicPhone: existingPortfolio.publicPhone,
// //             publicLocation: existingPortfolio.publicLocation, publicLinkedInUrl: existingPortfolio.publicLinkedInUrl,
// //             publicSummary: existingPortfolio.publicSummary || '', publicSkills: existingPortfolio.publicSkills || [],
// //             publicWorkExperiences: existingPortfolio.publicWorkExperiences || [], publicEducations: existingPortfolio.publicEducations || [],
// //             publicVolunteering: existingPortfolio.publicVolunteering || [], publicCertifications: existingPortfolio.publicCertifications || [],
// //             publicCareerNarrative: existingPortfolio.publicCareerNarrative || '', publicGoldenThread: existingPortfolio.publicGoldenThread || '',
// //             publicGoldenThreadEvidence: existingPortfolio.publicGoldenThreadEvidence || [], publicKeyThemes: existingPortfolio.publicKeyThemes || [],
// //             publicHiddenGems: existingPortfolio.publicHiddenGems || undefined,
// //             selectedPublicWhatIfs: existingPortfolio.selectedPublicWhatIfs || [], showcaseSections: existingPortfolio.showcaseSections || [],
// //           };

// //           if (existingPortfolio.sourceResumeDraftId) {
// //             const draftRes = await axios.get(`/api/resume-drafts/${existingPortfolio.sourceResumeDraftId}`);
// //             draftDataToUse = draftRes.data.draft as SourceResumeDraftData;
// //           }
// //         }
// //         setSourceDraft(draftDataToUse);
// //         setPortfolioSettings(tempPortfolioSettings);

// //       } catch (err: any) {
// //         console.error("Error in Portfolio Editor data fetching:", err);
// //         setError(err.response?.data?.error || err.message || "Failed to load editor data.");
// //       }
// //       finally { setIsLoadingPage(false); }
// //     };
// //     if(idOrActionParam && isUserLoaded && user) loadData();
// //   }, [idOrActionParam, searchParams, user, isUserLoaded, router]);

// //   const handleSettingChange = (
// //     field: keyof LivingPortfolioSettings | 'displaySettings',
// //     pathOrValue: string | boolean | string[],
// //     valueForDisplaySetting?: boolean
// //   ) => {
// //     setPortfolioSettings(prev => {
// //         if (!prev) return null;
// //         if (field !== 'displaySettings') {
// //             return { ...prev, [field as keyof LivingPortfolioSettings]: pathOrValue };
// //         } else {
// //             const pathString = pathOrValue as string;
// //             const value = valueForDisplaySetting;
// //             const keys = pathString.split('.');
// //             if (keys.length === 2) {
// //                 const parentKey = keys[0] as keyof LivingPortfolioDisplaySettings;
// //                 const childKey = keys[1];
// //                 if (prev.displaySettings && parentKey in prev.displaySettings && childKey in prev.displaySettings[parentKey]) {
// //                     return {
// //                         ...prev,
// //                         displaySettings: {
// //                             ...prev.displaySettings,
// //                             [parentKey]: {
// //                                 // @ts-ignore
// //                                 ...prev.displaySettings[parentKey],
// //                                 [childKey]: value,
// //                             },
// //                         },
// //                     };
// //                 }
// //             }
// //             console.warn("Invalid path for displaySettings update:", pathString);
// //             return prev;
// //         }
// //     });
// //   };

// //   const handlePublicContentChange = (field: keyof LivingPortfolioSettings, value: any) => {
// //     setPortfolioSettings(prev => prev ? ({ ...prev, [field]: value }) : null);
// //   };

// //   const handleWorkExperienceBulletChange = (expIndex: number, bulletIndex: number, newValue: string) => {
// //     setPortfolioSettings(prev => {
// //         if (!prev || !prev.publicWorkExperiences) return prev;
// //         const newWorkExperiences = JSON.parse(JSON.stringify(prev.publicWorkExperiences));
// //         if (newWorkExperiences[expIndex] && newWorkExperiences[expIndex].bullets) {
// //             newWorkExperiences[expIndex].bullets[bulletIndex] = newValue;
// //         }
// //         return { ...prev, publicWorkExperiences: newWorkExperiences };
// //     });
// //   };
// //    const addWorkExperienceBullet = (expIndex: number) => {
// //     setPortfolioSettings(prev => {
// //       if (!prev || !prev.publicWorkExperiences) return prev;
// //       const newWorkExperiences = JSON.parse(JSON.stringify(prev.publicWorkExperiences));
// //       if (newWorkExperiences[expIndex]) {
// //         if (!newWorkExperiences[expIndex].bullets) { newWorkExperiences[expIndex].bullets = []; }
// //         newWorkExperiences[expIndex].bullets.push("");
// //       }
// //       return { ...prev, publicWorkExperiences: newWorkExperiences };
// //     });
// //   };
// //   const deleteWorkExperienceBullet = (expIndex: number, bulletIndex: number) => {
// //     setPortfolioSettings(prev => {
// //       if (!prev || !prev.publicWorkExperiences) return prev;
// //       const newWorkExperiences = JSON.parse(JSON.stringify(prev.publicWorkExperiences));
// //       if (newWorkExperiences[expIndex] && newWorkExperiences[expIndex].bullets) {
// //         newWorkExperiences[expIndex].bullets.splice(bulletIndex, 1);
// //       }
// //       return { ...prev, publicWorkExperiences: newWorkExperiences };
// //     });
// //   };

// //   const handleToggleWhatIf = (whatIfItemFromDraft: { scenarioText: string, result: WhatIfResult }) => {
// //     setPortfolioSettings(prev => {
// //         if (!prev) return null;
// //         const { scenarioText, result } = whatIfItemFromDraft;
// //         const currentSelected = prev.selectedPublicWhatIfs;
// //         const existingIndex = currentSelected.findIndex(item => item.scenarioText === scenarioText);
// //         if (existingIndex > -1) { return { ...prev, selectedPublicWhatIfs: currentSelected.filter((_, i) => i !== existingIndex) }; }
// //         else { return { ...prev, selectedPublicWhatIfs: [...currentSelected, { scenarioText, adaptedResult: result }] }; }
// //     });
// //   };

// //   const addShowcaseSection = () => setPortfolioSettings(prev => prev ? ({ ...prev, showcaseSections: [...prev.showcaseSections, { id: `section-${Date.now()}`, title: "New Showcase Section", items: [] }] }) : null);
// //   const updateShowcaseSectionTitle = (sectionId: string, newTitle: string) => setPortfolioSettings(prev => prev ? ({ ...prev, showcaseSections: prev.showcaseSections.map(s => s.id === sectionId ? { ...s, title: newTitle } : s)}) : null);
// //   const deleteShowcaseSection = (sectionId: string) => { if (window.confirm("Delete section?")) { setPortfolioSettings(prev => prev ? ({ ...prev, showcaseSections: prev.showcaseSections.filter(s => s.id !== sectionId)}) : null); }};
// //   const addShowcaseItem = (sectionId: string) => setPortfolioSettings(prev => prev ? ({ ...prev, showcaseSections: prev.showcaseSections.map(s => s.id === sectionId ? { ...s, items: [...s.items, { id: `item-${Date.now()}`, name: "New Item", description: "", skillsUsed: [] }] } : s)}) : null);
// //   const updateShowcaseItem = (sectionId: string, itemId: string, field: keyof Omit<ShowcaseItem, 'id'>, value: string | string[]) => { setPortfolioSettings(prev => prev ? ({ ...prev, showcaseSections: prev.showcaseSections.map(s => s.id === sectionId ? { ...s, items: s.items.map(i => i.id === itemId ? { ...i, [field]: value } : i) } : s)}) : null); };
// //   const deleteShowcaseItem = (sectionId: string, itemId: string) => { if (window.confirm("Delete item?")) {setPortfolioSettings(prev => prev ? ({ ...prev, showcaseSections: prev.showcaseSections.map(s => s.id === sectionId ? { ...s, items: s.items.filter(i => i.id !== itemId) } : s)}) : null); }};

// //   const handleDragEnd = (event: DragEndEvent) => {
// //     const { active, over } = event;
// //     if (!over || !portfolioSettings) return;
// //     const activeId = active.id as string; const overId = over.id as string;
// //     const activeType = active.data.current?.type as string;
// //     if (activeType === 'section' && activeId !== overId) { setPortfolioSettings(prev => prev ? ({ ...prev, showcaseSections: arrayMove(prev.showcaseSections, prev.showcaseSections.findIndex(s => s.id === activeId), prev.showcaseSections.findIndex(s => s.id === overId)) }) : null); }
// //     else if (activeType === 'item') {
// //       const activeSectionId = active.data.current?.sectionId as string;
// //       setPortfolioSettings(prev => prev ? ({ ...prev, showcaseSections: prev.showcaseSections.map(section => section.id === activeSectionId ? { ...section, items: arrayMove(section.items, section.items.findIndex(i => i.id === activeId), section.items.findIndex(i => i.id === overId)) } : section)}) : null);
// //     }
// //   };

// //   const handleSaveOrPublish = async () => {
// //     if (!portfolioSettings) { setError("Settings not loaded."); return; }
// //     if (!editingPortfolioId && !sourceDraft) { setError("Source draft missing for new portfolio."); return; }
// //     setIsProcessing(true); setSuccessMessage(null); setError(null);

// //     const cleanedShowcaseSections = portfolioSettings.showcaseSections.map(s => ({...s, items: s.items.map(i => ({...i, skillsUsed: (i.skillsUsed || []).map(sk => sk.trim()).filter(Boolean)}))}));
// //     const payload: LivingPortfolioSettings & { sourceResumeDraftId?: string } = {
// //       ...portfolioSettings, // This now includes all the public... fields directly
// //       showcaseSections: cleanedShowcaseSections,
// //       publicSkills: (portfolioSettings.publicSkills || []).map(s=>s.trim()).filter(Boolean),
// //       publicWorkExperiences: portfolioSettings.publicWorkExperiences?.map(exp => ({ ...exp, bullets: (exp.bullets || []).map(b => b.trim()).filter(Boolean) })) || [],
// //       publicVolunteering: portfolioSettings.publicVolunteering?.map(vol => ({ ...vol, bullets: ((vol as any).bullets || []).map((b:string) => b.trim()).filter(Boolean) })) || [],
// //       sourceResumeDraftId: editingPortfolioId ? undefined : sourceDraft?.id, // Only for new
// //     };

// //     try {
// //       let response; let portfolioLinkID = editingPortfolioId;
// //       if (editingPortfolioId) {
// //         response = await axios.put(`/api/living-portfolios/${editingPortfolioId}`, payload);
// //         setSuccessMessage(`Portfolio updated successfully!`);
// //       } else {
// //         if (!payload.sourceResumeDraftId) throw new Error("Source draft ID missing for new portfolio.");
// //         response = await axios.post('/api/living-portfolios/publish', payload);
// //         portfolioLinkID = response.data.portfolioId;
// //         setEditingPortfolioId(portfolioLinkID);
// //         setSuccessMessage(`Portfolio published successfully!`);
// //         router.replace(`/portfolio-editor/${portfolioLinkID}`, { scroll: false });
// //       }
// //       const portfolioUrl = `${window.location.origin}/portfolio/${response.data.portfolioSlug || portfolioLinkID}`;
// //       setSuccessMessage(prev => `${prev || ''} Shareable Link: ${portfolioUrl}`);
// //     } catch (err: any) {
// //       console.error("Error saving/publishing portfolio:", err.response?.data || err.message || err);
// //       if (err.response && err.response.status === 409) { setError(err.response.data.error || "URL slug taken."); }
// //       else { setError(err.response?.data?.error || err.message || "Failed to save/publish."); }
// //     }
// //     finally { setIsProcessing(false); }
// //   };

// //   if (isLoadingPage) { return <div className="flex justify-center items-center min-h-screen text-xl font-semibold text-gray-700 animate-pulse">Loading Portfolio Editor...</div>; }
// //   if (error && !portfolioSettings) { return <div className="max-w-2xl mx-auto my-10 p-8 text-red-700 bg-red-50 border-2 border-red-200 rounded-lg text-center shadow-lg"><h2 className="text-2xl font-semibold mb-3">Oops! Something went wrong.</h2><p className="text-md mb-4">{error}</p><button onClick={() => router.push(idOrActionParam === 'new' ? '/wizard' : (user ? `/profile/${user.id}` : '/'))} className="mt-4 px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700"> {idOrActionParam === 'new' ? 'Go back to Wizard' : 'Go to My Profile'} </button></div>; }
// //   if (idOrActionParam === 'new' && !sourceDraft && portfolioSettings) { return <div className="max-w-2xl mx-auto my-10 p-8 text-center text-lg text-yellow-800 bg-yellow-50 border-2 border-yellow-200 rounded-lg shadow-lg"><h2 className="text-2xl font-semibold mb-3">Missing Information</h2><p className="text-md mb-4">{error || "Could not load the source resume draft for new portfolio."}</p><button onClick={() => router.push('/wizard')} className="mt-4 px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700">Go back to Wizard</button></div>; }
// //   if (!portfolioSettings ) { return <div className="max-w-2xl mx-auto my-10 p-8 text-center text-lg text-gray-700 bg-gray-100 border-2 border-gray-200 rounded-lg shadow-lg"><h2 className="text-2xl font-semibold mb-3">Unable to Load Editor</h2><p className="text-md mb-4">Portfolio data could not be initialized. Please try again.</p><button onClick={() => router.push(editingPortfolioId && user?.id ? `/profile/${user.id}` : '/wizard')} className="mt-4 px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors shadow"> {editingPortfolioId ? "Go to My Profile" : "Go back to Wizard"} </button></div>; }

// //   return (
// //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 font-sans bg-slate-100 min-h-screen">
// //       <button
// //         onClick={() => router.push(editingPortfolioId && user?.id ? `/profile/${user.id}` : '/wizard')}
// //         className="mb-10 inline-flex items-center text-sm font-medium text-indigo-700 hover:text-indigo-900 transition-colors group"
// //       >
// //         <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
// //         {editingPortfolioId ? "Back to My Profile" : "Back to Resume Wizard"}
// //       </button>
// //       <header className="mb-12 pb-6 border-b-2 border-gray-300">
// //         <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
// //           {editingPortfolioId ? "Edit Living Portfolio" : "Create New Living Portfolio"}
// //         </h1>
// //         {sourceDraft?.title && <p className="text-lg text-gray-600 mt-2">Based on Resume Draft: <span className="font-semibold text-gray-800">"{sourceDraft.title}"</span></p>}
// //       </header>

// //       {successMessage && ( <div className="p-4 mb-8 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-md shadow-lg animate-fadeIn"> <div className="flex"> <div className="py-1"><Sparkles className="h-6 w-6 text-green-500 mr-4" /></div> <div> <p className="font-bold text-lg">{editingPortfolioId ? 'Portfolio Updated!' : 'Portfolio Published!'}</p> <div className="text-sm mt-1" dangerouslySetInnerHTML={{ __html: successMessage.replace(/Shareable Link: (http[s]?:\/\/[^\s]+)/, 'Shareable Link: <a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline hover:text-blue-700 font-medium">$1</a>') }} /> </div> </div> </div> )}
// //       {error && !successMessage && <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md shadow-lg animate-fadeIn"><span className="font-bold">Error:</span> {error}</div>}

// //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-10 gap-y-12">
// //         <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
// //             <div className="lg:col-span-2 space-y-10">

// //             <section className={sectionCardClass}>
// //                 <h2 className={`${sectionTitleClass} mb-2`}><Settings2 size={28} className="mr-3 text-indigo-600" /> Portfolio Details</h2>
// //                 <div className="space-y-6 pt-4">
// //                   <div><label htmlFor="portfolioTitle" className="block text-sm font-semibold text-gray-700 mb-1.5">Portfolio Title*</label><input type="text" id="portfolioTitle" value={portfolioSettings.title} onChange={(e) => handleSettingChange('title', e.target.value)} className={inputBaseClass} /></div>
// //                   <div><label htmlFor="portfolioSlug" className="block text-sm font-semibold text-gray-700 mb-1.5">Custom URL Slug (Optional)</label><div className="mt-1 flex rounded-md shadow-sm"><span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-100 text-gray-500 sm:text-sm whitespace-nowrap">{typeof window !== 'undefined' ? `${window.location.origin}/portfolio/` : '/portfolio/'}</span><input type="text" id="portfolioSlug" value={portfolioSettings.slug || ''} onChange={(e) => handleSettingChange('slug', e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''))} placeholder="your-unique-slug" className={`${inputBaseClass} !rounded-l-none focus:z-10`} /></div><p className="mt-1.5 text-xs text-gray-500">Lowercase letters, numbers, hyphens. Auto-formats. Blank for unique ID.</p></div>
// //                   <div><label htmlFor="portfolioTheme" className="block text-sm font-semibold text-gray-700 mb-1.5"><Palette size={18} className="inline mr-2 text-gray-500" />Portfolio Theme</label><select id="portfolioTheme" name="theme" value={portfolioSettings.theme} onChange={(e) => handleSettingChange('theme', e.target.value)} className={`${inputBaseClass} appearance-none`}>{availableThemes.map(themeOption => ( <option key={themeOption.id} value={themeOption.id}> {themeOption.name} </option> ))}</select></div>
// //                   <div className="pt-2"><label className={`${checkboxLabelClass} !text-base`}><input type="checkbox" checked={portfolioSettings.isPublic} onChange={(e) => handleSettingChange('isPublic', e.target.checked)} className={`${checkboxClass} h-5 w-5 !text-green-600 focus:ring-green-500`}/><span className="font-semibold text-gray-800">Make this Portfolio Publicly Shareable</span></label></div>
// //                 </div>
// //             </section>

// //             <section className={sectionCardClass}>
// //                 <h2 className={`${sectionTitleClass}`}><EditIcon size={28} className="mr-3 text-indigo-600" /> Edit Portfolio Content</h2>
// //                 <p className="text-sm text-gray-500 mb-6 -mt-4">Tailor content for this portfolio. Visibility is controlled in the next section.</p>
// //                 <div className="space-y-4">
// //                     <EditorCollapsibleSection title="Contact Information" icon={<UserCircle />} isVisible={true} initiallyOpen={false}>
// //                         <div className="space-y-3 p-2">
// //                             {portfolioSettings.displaySettings?.contact?.showFullName && <div><label className="block text-xs font-medium text-gray-600 capitalize mb-0.5">Full Name</label><input type="text" value={portfolioSettings.publicFullName || ''} onChange={e => handlePublicContentChange('publicFullName', e.target.value)} className={inputBaseClass} placeholder="Full Name for portfolio display"/></div>}
// //                             {true && <div><label className="block text-xs font-medium text-gray-600 capitalize mb-0.5">Job Title / Headline</label><input type="text" value={portfolioSettings.publicJobTitle || ''} onChange={e => handlePublicContentChange('publicJobTitle', e.target.value)} className={inputBaseClass} placeholder="Your professional headline"/></div>}
// //                             {portfolioSettings.displaySettings?.contact?.showEmail && <div><label className="block text-xs font-medium text-gray-600 capitalize mb-0.5">Email</label><input type="email" value={portfolioSettings.publicEmail || ''} onChange={e => handlePublicContentChange('publicEmail', e.target.value)} className={inputBaseClass} placeholder="Contact email"/></div>}
// //                             {portfolioSettings.displaySettings?.contact?.showPhone && <div><label className="block text-xs font-medium text-gray-600 capitalize mb-0.5">Phone</label><input type="tel" value={portfolioSettings.publicPhone || ''} onChange={e => handlePublicContentChange('publicPhone', e.target.value)} className={inputBaseClass} placeholder="Contact phone"/></div>}
// //                             {portfolioSettings.displaySettings?.contact?.showLocation && <div><label className="block text-xs font-medium text-gray-600 capitalize mb-0.5">Location</label><input type="text" value={portfolioSettings.publicLocation || ''} onChange={e => handlePublicContentChange('publicLocation', e.target.value)} className={inputBaseClass} placeholder="City, Country"/></div>}
// //                             {portfolioSettings.displaySettings?.contact?.showLinkedIn && <div><label className="block text-xs font-medium text-gray-600 capitalize mb-0.5">LinkedIn URL</label><input type="url" value={portfolioSettings.publicLinkedInUrl || ''} onChange={e => handlePublicContentChange('publicLinkedInUrl', e.target.value)} className={inputBaseClass} placeholder="LinkedIn Profile URL"/></div>}
// //                             {Object.values(portfolioSettings.displaySettings?.contact || {}).every(v => !v) && <p className="text-xs text-gray-500 italic">No contact fields are set to visible. Enable them in "Content Visibility" to edit their content here.</p>}
// //                         </div>
// //                     </EditorCollapsibleSection>

// //                     <EditorCollapsibleSection title="Summary" icon={<FileText />} isVisible={portfolioSettings.displaySettings?.sections?.showSummary} initiallyOpen={!!portfolioSettings.displaySettings?.sections?.showSummary}>
// //                         <textarea value={portfolioSettings.publicSummary || ''} onChange={(e) => handlePublicContentChange('publicSummary', e.target.value)} rows={6} className={textareaBaseClass} placeholder="Portfolio Summary"/>
// //                          {sourceDraft?.wizardSummary && portfolioSettings.publicSummary !== sourceDraft.wizardSummary && (<button type="button" onClick={() => handlePublicContentChange('publicSummary', sourceDraft.wizardSummary || '')} className="text-xs text-indigo-600 hover:underline mt-1.5">Reset to draft summary</button>)}
// //                     </EditorCollapsibleSection>

// //                     <EditorCollapsibleSection title="Skills" icon={<Layers />} isVisible={portfolioSettings.displaySettings?.sections?.showSkills}>
// //                         <label className="block text-xs font-medium text-gray-600 mb-1">Skills (comma-separated)</label>
// //                         <textarea value={(portfolioSettings.publicSkills || []).join(', ')} onChange={(e) => handlePublicContentChange('publicSkills', e.target.value.split(',').map(s=>s.trim()))} rows={3} className={textareaBaseClass} placeholder="e.g., React, Project Management"/>
// //                         {sourceDraft?.wizardSkills && JSON.stringify(portfolioSettings.publicSkills?.map(s=>s.trim()).filter(Boolean)) !== JSON.stringify((sourceDraft.wizardSkills || []).map(s=>s.trim()).filter(Boolean)) && (<button type="button" onClick={() => handlePublicContentChange('publicSkills', sourceDraft.wizardSkills || [])} className="text-xs text-indigo-600 hover:underline mt-1.5">Reset to draft skills</button>)}
// //                     </EditorCollapsibleSection>

// //                     {['WorkExperience', 'Education', 'Volunteering', 'Certifications'].map(sectionKey => {
// //                         const displayKey = `show${sectionKey}` as keyof LivingPortfolioDisplaySettings['sections'];
// //                         if (portfolioSettings.displaySettings?.sections?.[displayKey]) {
// //                             const IconComponent = sectionKey === 'WorkExperience' ? Briefcase : sectionKey === 'Education' ? GraduationCap : sectionKey === 'Volunteering' ? Gift : ShieldCheck;
// //                             return (
// //                                 <EditorCollapsibleSection
// //                                     key={`edit-${sectionKey}`}
// //                                     title={`Public ${sectionKey.replace(/([A-Z])/g, ' $1').trim()} (Snapshot)`}
// //                                     icon={<IconComponent />}
// //                                     isVisible={true} >
// //                                     <div className="p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start gap-2">
// //                                         <Info size={20} className="text-amber-600 flex-shrink-0 mt-0.5"/>
// //                                         <p className="text-xs text-gray-700 italic">
// //                                             Content for <strong>{sectionKey.replace(/([A-Z])/g, ' $1').toLowerCase()}</strong> is snapshotted from your resume draft.
// //                                             To edit individual items (e.g., specific jobs, degrees, bullets), please update your <Link href={`/wizard?step=3`} className="font-medium text-indigo-600 hover:underline">Resume Draft in the Wizard</Link>.
// //                                         </p>
// //                                     </div>
// //                                 </EditorCollapsibleSection>
// //                             );
// //                         }
// //                         return null;
// //                     })}

// //                     {portfolioSettings.displaySettings?.narrativeSuite?.showCareerNarrative && (
// //                         <EditorCollapsibleSection title="Career Narrative" icon={<MessageSquareQuote />}>
// //                             <textarea value={portfolioSettings.publicCareerNarrative || ''} onChange={(e) => handlePublicContentChange('publicCareerNarrative', e.target.value)} rows={5} className={textareaBaseClass}/>
// //                              {sourceDraft?.aiCareerNarrative && portfolioSettings.publicCareerNarrative !== sourceDraft.aiCareerNarrative && (<button type="button" onClick={() => handlePublicContentChange('publicCareerNarrative', sourceDraft.aiCareerNarrative || '')} className="text-xs text-indigo-600 hover:underline mt-1.5">Reset to AI narrative</button>)}
// //                         </EditorCollapsibleSection>
// //                     )}
// //                     {portfolioSettings.displaySettings?.narrativeSuite?.showGoldenThread && (
// //                         <EditorCollapsibleSection title="Golden Thread" icon={<Zap />}>
// //                             <input type="text" value={portfolioSettings.publicGoldenThread || ''} onChange={(e) => handlePublicContentChange('publicGoldenThread', e.target.value)} className={inputBaseClass}/>
// //                              {sourceDraft?.aiGoldenThread && portfolioSettings.publicGoldenThread !== sourceDraft.aiGoldenThread && (<button type="button" onClick={() => handlePublicContentChange('publicGoldenThread', sourceDraft.aiGoldenThread || '')} className="text-xs text-indigo-600 hover:underline mt-1.5">Reset to AI golden thread</button>)}
// //                         </EditorCollapsibleSection>
// //                     )}
// //                     {portfolioSettings.displaySettings?.narrativeSuite?.showKeyThemes && ( <EditorCollapsibleSection title="Key Themes (Snapshot)" icon={<Sparkles />} > <div className="p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start gap-2"><Info size={16} className="text-amber-600 flex-shrink-0 mt-0.5"/><p className="text-xs text-gray-500 italic">Content from draft. Edit via AI Suite in Wizard.</p></div> </EditorCollapsibleSection> )}
// //                     {portfolioSettings.displaySettings?.narrativeSuite?.showHiddenGems && ( <EditorCollapsibleSection title="Hidden Gems (Snapshot)" icon={<ThumbsUp />} >  <div className="p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start gap-2"><Info size={16} className="text-amber-600 flex-shrink-0 mt-0.5"/><p className="text-xs text-gray-500 italic">Content from draft. Edit via AI Suite in Wizard.</p></div> </EditorCollapsibleSection> )}
// //                     {portfolioSettings.displaySettings?.narrativeSuite?.showGoldenThread && portfolioSettings.publicGoldenThreadEvidence && portfolioSettings.publicGoldenThreadEvidence.length > 0 && (
// //                         <EditorCollapsibleSection title="Golden Thread Evidence (Snapshot)" icon={<ListChecks />} > <div className="p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start gap-2"><Info size={16} className="text-amber-600 flex-shrink-0 mt-0.5"/><p className="text-xs text-gray-500 italic">Content from draft. Edit via AI Suite in Wizard.</p></div> </EditorCollapsibleSection>
// //                     )}
// //                 </div>
// //             </section>

// //             <section className={sectionCardClass}>
// //                 <h2 className={`${sectionTitleClass} mb-2`}><Eye size={28} className="mr-3 text-indigo-600" /> Content Visibility Toggles</h2>
// //                 <p className="text-sm text-gray-500 mb-6 -mt-4">Choose which sections will appear on your public portfolio.</p>
// //                 <div className="space-y-6 pt-4">
// //                     <div> <h3 className={subSectionTitleClass}>Contact Information:</h3> <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3 pt-1"> {(Object.keys(portfolioSettings.displaySettings.contact) as Array<keyof LivingPortfolioDisplaySettings['contact']>).map(key => ( <label key={`ds-contact-${key}`} className={checkboxLabelClass}> <input type="checkbox" checked={!!portfolioSettings.displaySettings.contact[key]} onChange={(e) => handleSettingChange('displaySettings', `contact.${key}`, e.target.checked)} className={checkboxClass}/> <span>{key.substring(4).replace(/([A-Z])/g, ' $1').trim()}</span> </label> ))} </div> </div>
// //                     <div className="pt-5 border-t border-gray-200"> <h3 className={subSectionTitleClass}>Standard Resume Sections:</h3> <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3 pt-1"> {(Object.keys(portfolioSettings.displaySettings.sections) as Array<keyof LivingPortfolioDisplaySettings['sections']>).map(key => ( <label key={`ds-section-${key}`} className={checkboxLabelClass}> <input type="checkbox" checked={!!portfolioSettings.displaySettings.sections[key]} onChange={(e) => handleSettingChange('displaySettings', `sections.${key}`, e.target.checked)} className={checkboxClass}/> <span>{key.substring(4).replace(/([A-Z])/g, ' $1').trim()}</span> </label> ))} </div> </div>
// //                     {sourceDraft?.aiCareerNarrative && ( <div className="pt-5 border-t border-gray-200"> <h3 className={subSectionTitleClass}>AI Narrative Suite Elements:</h3> <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3 pt-1"> {(Object.keys(portfolioSettings.displaySettings.narrativeSuite) as Array<keyof LivingPortfolioDisplaySettings['narrativeSuite']>).map(key => ( <label key={`ds-narrative-${key}`} className={checkboxLabelClass}> <input type="checkbox" checked={!!portfolioSettings.displaySettings.narrativeSuite[key]} onChange={(e) => handleSettingChange('displaySettings', `narrativeSuite.${key}`, e.target.checked)} className={checkboxClass}/> <span>{key.substring(4).replace(/([A-Z])/g, ' $1').trim()}</span> </label> ))} </div> </div> )}
// //                 </div>
// //             </section>

// //             {sourceDraft?.aiWhatIfResultsCache && sourceDraft.aiWhatIfResultsCache.length > 0 && (
// //                 <section className={sectionCardClass}>
// //                 <h2 className={`${sectionTitleClass} mb-2`}><Brain size={28} className="mr-3 text-indigo-600" /> Showcase "What If?" Scenarios</h2>
// //                 <p className="text-sm text-gray-600 mb-4 pt-2">Select AI-generated scenarios from your resume draft to include.</p>
// //                 <div className="max-h-80 overflow-y-auto space-y-1.5 p-4 border bg-slate-50 rounded-lg shadow-inner">
// //                     {sourceDraft.aiWhatIfResultsCache.map((whatIfItem) => (
// //                     <label key={`editor-whatif-${whatIfItem.scenarioText.replace(/\s+/g, '-')}`} className={`${checkboxLabelClass} p-3 hover:bg-indigo-100 rounded-md transition-colors block w-full border border-gray-200 hover:border-indigo-200`}>
// //                         <input type="checkbox" checked={portfolioSettings.selectedPublicWhatIfs.some(pwi => pwi.scenarioText === whatIfItem.scenarioText)} onChange={() => handleToggleWhatIf(whatIfItem)} className={`${checkboxClass} !text-teal-600 focus:ring-teal-500 mr-3`}/>
// //                         <span className="text-gray-800 font-medium" title={whatIfItem.scenarioText}>"{whatIfItem.scenarioText}"</span>
// //                     </label>
// //                     ))}
// //                 </div>
// //                 </section>
// //             )}

// //             <section className={`${sectionCardClass} space-y-6`}> {/* Showcase Sections */}
// //                 <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-gray-200 pb-4">
// //                     <h2 className={`${sectionTitleClass} mb-0 pb-0 border-b-0`}><Layers size={28} className="mr-3 text-indigo-600" /> Custom Showcase Sections</h2>
// //                     <button type="button" onClick={addShowcaseSection} className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 shadow-md flex items-center gap-2 transition-colors shrink-0"> <Plus size={18} /> Add New Section </button>
// //                 </div>
// //                 {portfolioSettings.showcaseSections.length === 0 && ( <div className="text-center py-8 px-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300"> <FolderKanban className="mx-auto h-12 w-12 text-gray-400" strokeWidth={1.5} /> <h3 className="mt-2 text-lg font-medium text-gray-900">No showcase sections yet</h3> <p className="mt-1 text-sm text-gray-500">Add a section to highlight projects, skills, or experiences.</p> </div> )}
// //                 <div className="space-y-8">
// //                     <SortableContext items={portfolioSettings.showcaseSections.map(s => s.id)} strategy={verticalListSortingStrategy}>
// //                         {portfolioSettings.showcaseSections.map((section) => (
// //                             <SortableShowcaseSection key={section.id} section={section} updateShowcaseSectionTitle={updateShowcaseSectionTitle} deleteShowcaseSection={deleteShowcaseSection}>
// //                                 {section.items.length === 0 && <p className="text-sm text-gray-500 italic text-center py-3">No items. Click "+ Add Item" below.</p>}
// //                                 <div className="space-y-1">
// //                                     <SortableContext items={section.items.map(i => i.id)} strategy={verticalListSortingStrategy}>
// //                                         {section.items.map((item) => ( <SortableShowcaseItem key={item.id} sectionId={section.id} item={item} updateShowcaseItem={updateShowcaseItem} deleteShowcaseItem={deleteShowcaseItem} /> ))}
// //                                     </SortableContext>
// //                                 </div>
// //                                 <button type="button" onClick={() => addShowcaseItem(section.id)} className="mt-4 px-4 py-2 bg-indigo-500 text-white text-sm font-semibold rounded-lg hover:bg-indigo-600 shadow flex items-center gap-2 transition-colors"> <Plus size={16} strokeWidth={3} /> Add Item to "{section.title.length > 20 ? section.title.substring(0,20) + '...' : section.title}" </button>
// //                             </SortableShowcaseSection>
// //                         ))}
// //                     </SortableContext>
// //                 </div>
// //             </section>

// //             <div className="pt-10 border-t-2 border-gray-300 mt-12 flex flex-col sm:flex-row justify-end items-center gap-4">
// //               <button type="button" onClick={() => router.back()} className={secondaryButtonClass}>Cancel</button>
// //               <button onClick={handleSaveOrPublish} disabled={isProcessing || isLoadingPage} className={`${primaryButtonClass} min-w-[240px] text-lg`}>
// //                 {isProcessing ? "Processing..." : (editingPortfolioId ? "Update Portfolio" : "Save & Publish Portfolio")}
// //               </button>
// //             </div>
// //             </div>
// //         </DndContext>

// //         <aside className="lg:col-span-1 space-y-6">
// //             <div className="p-6 bg-slate-200 rounded-xl shadow-xl sticky top-10 border border-slate-300">
// //                 <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-slate-400 pb-3 flex items-center">
// //                     <FileText size={24} className="mr-3 text-slate-700" /> Source Draft Context
// //                 </h3>
// //                 {sourceDraft?.wizardPersonalData?.fullName && <p className="text-sm mb-2"><strong className="text-slate-700 font-semibold">Name:</strong> {sourceDraft.wizardPersonalData.fullName}</p>}
// //                 {sourceDraft?.wizardSummary && <div className="mb-3"><strong className="text-slate-700 text-sm font-semibold block mb-0.5">Summary Snippet:</strong> <p className="text-xs italic text-gray-700 bg-white p-2 rounded-md shadow-sm">"{sourceDraft.wizardSummary.substring(0,150)}..."</p></div>}
// //                 {sourceDraft?.aiCareerNarrative && <div className="mb-3"><strong className="text-slate-700 text-sm font-semibold block mb-0.5">AI Narrative Snippet:</strong> <p className="text-xs italic text-gray-700 bg-white p-2 rounded-md shadow-sm">"{sourceDraft.aiCareerNarrative.substring(0,150)}..."</p></div>}
// //                 {sourceDraft?.aiGoldenThread && <p className="text-sm mb-3"><strong className="text-slate-700 font-semibold">Golden Thread:</strong> <span className="italic text-purple-700 font-semibold">{sourceDraft.aiGoldenThread}</span></p>}
// //                 <p className="text-xs text-slate-600 mt-5 border-t border-slate-400 pt-3">Read-only view of your resume draft. Use the editor on the left to build your Living Portfolio.</p>
// //             </div>
// //         </aside>
// //       </div>
// //     </div>
// //   );
// // }

// src/app/portfolio-editor/[idOrAction]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

// DND-Kit Imports
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

// Lucide Icons
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
  UserCircle,
  GraduationCap,
  Gift,
  ShieldCheck,
  ThumbsUp,
  Info,
  Sparkles,
  ListChecks,
} from "lucide-react";

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
    showEmail: boolean;
    showPhone: boolean;
    showLocation: boolean;
    showLinkedIn: boolean;
    showPhoto: boolean;
    showFullName: boolean;
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
  slug?: string;
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

// interface WizardPersonalDataWithJobTitle extends Omit<ResumeJSON['personal'], 'fullName'> {
//   fullName?: string;
//   jobTitle?: string;
// }

interface WizardPersonalDataWithJobTitle {
  fullName?: string; // Added to fix fullName error
  jobTitle?: string;
  email?: string;
  phone?: string;
  city?: string;
  country?: string;
  linkedinUrl?: string;
  [key: string]: unknown; // Allow additional fields for flexibility
}

interface SourceResumeDraftData {
  id: string;
  title?: string | null;
  wizardPersonalData?: WizardPersonalDataWithJobTitle | null;
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

const defaultDisplaySettingsConst: LivingPortfolioDisplaySettings = {
  contact: {
    showEmail: true,
    showPhone: true,
    showLocation: true,
    showLinkedIn: true,
    showPhoto: false,
    showFullName: true,
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

const EditorCollapsibleSection: React.FC<{
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  initiallyOpen?: boolean;
  isVisible?: boolean;
}> = ({ title, children, icon, initiallyOpen = false, isVisible = true }) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  useEffect(() => {
    setIsOpen(initiallyOpen);
  }, [initiallyOpen]); // Sync with prop
  if (!isVisible) return null;
  return (
    <div className="my-4 overflow-hidden rounded-lg border border-gray-300 bg-slate-50/70 shadow-sm transition-all duration-300 ease-in-out hover:shadow-md">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-4 text-left font-medium text-gray-800 transition-colors hover:bg-slate-100 focus:outline-none"
      >
        <span className="text-md flex items-center">
          {" "}
          {icon && (
            <span className="mr-2.5 text-indigo-600 opacity-80">{icon}</span>
          )}{" "}
          {title}{" "}
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
          {" "}
          <GripVertical size={20} />{" "}
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
              value={(item.skillsUsed || []).join(", ")}
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
          {" "}
          <GripVertical size={24} />{" "}
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
          {" "}
          <Trash2 size={20} />{" "}
        </button>
      </div>
      {children}
    </div>
  );
}

export default function PortfolioEditorPage() {
  const router = useRouter();
  const params = useParams() ?? { idOrAction: "" };
  const searchParams = useSearchParams() ?? new URLSearchParams();
  const { user, isLoaded: isUserLoaded } = useUser();
  const idOrActionParam = params.idOrAction as string;

  const searchParamsString = searchParams.toString();

  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [sourceDraft, setSourceDraft] = useState<SourceResumeDraftData | null>(
    null,
  );
  const [portfolioSettings, setPortfolioSettings] =
    useState<LivingPortfolioSettings>(
      JSON.parse(JSON.stringify(initialPortfolioSettingsShell)),
    );
  const [editingPortfolioId, setEditingPortfolioId] = useState<string | null>(
    null,
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    if (!idOrActionParam || !isUserLoaded) return;
    if (!user) {
      router.push("/sign-in");
      return;
    }

    const loadData = async () => {
      setIsLoadingPage(true);
      setError(null);
      setSuccessMessage(null);
      setEditingPortfolioId(null);
      setSourceDraft(null);
      let tempPortfolioSettings: LivingPortfolioSettings = JSON.parse(
        JSON.stringify(initialPortfolioSettingsShell),
      );

      try {
        let draftDataToUse: SourceResumeDraftData | null = null;

        if (idOrActionParam === "new") {
          const draftIdQuery = searchParams.get("draftId");
          if (!draftIdQuery)
            throw new Error("Resume Draft ID required for new portfolio.");
          const draftRes = await axios.get(
            `/api/resume-drafts/${draftIdQuery}`,
          );
          draftDataToUse = draftRes.data.draft as SourceResumeDraftData;
          if (!draftDataToUse)
            throw new Error("Failed to fetch source resume draft.");

          tempPortfolioSettings = {
            ...tempPortfolioSettings,
            title: `${draftDataToUse.wizardPersonalData?.fullName || "My"} Portfolio`,
          };

          const ds = tempPortfolioSettings.displaySettings;
          if (draftDataToUse.wizardPersonalData) {
            if (ds.contact.showFullName)
              tempPortfolioSettings.publicFullName =
                draftDataToUse.wizardPersonalData.fullName;
            else tempPortfolioSettings.publicFullName = undefined;
            tempPortfolioSettings.publicJobTitle =
              draftDataToUse.wizardPersonalData.jobTitle || undefined;
            if (ds.contact.showEmail)
              tempPortfolioSettings.publicEmail =
                draftDataToUse.wizardPersonalData.email;
            else tempPortfolioSettings.publicEmail = undefined;
            if (ds.contact.showPhone)
              tempPortfolioSettings.publicPhone =
                draftDataToUse.wizardPersonalData.phone;
            else tempPortfolioSettings.publicPhone = undefined;
            if (ds.contact.showLocation)
              tempPortfolioSettings.publicLocation =
                `${draftDataToUse.wizardPersonalData.city}, ${draftDataToUse.wizardPersonalData.country}`.replace(
                  /^, |, $/g,
                  "",
                );
            else tempPortfolioSettings.publicLocation = undefined;
            if (ds.contact.showLinkedIn)
              tempPortfolioSettings.publicLinkedInUrl =
                draftDataToUse.wizardPersonalData.linkedinUrl;
            else tempPortfolioSettings.publicLinkedInUrl = undefined;
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

          if (existingPortfolio.sourceResumeDraftId) {
            const draftRes = await axios.get(
              `/api/resume-drafts/${existingPortfolio.sourceResumeDraftId}`,
            );
            draftDataToUse = draftRes.data.draft as SourceResumeDraftData;
          }
        }
        setSourceDraft(draftDataToUse);
        setPortfolioSettings(tempPortfolioSettings);
      } catch (err: unknown) {
        console.error("Error in Portfolio Editor data fetching:", err);
        // setError(err.response?.data?.error || err.message || "Failed to load editor data.");
      } finally {
        setIsLoadingPage(false);
      }
    };
    if (idOrActionParam && isUserLoaded && user) loadData();
  }, [
    idOrActionParam,
    searchParamsString,
    user,
    isUserLoaded,
    router,
    searchParams,
  ]);

  // const handleSettingChange = (
  //   field: keyof LivingPortfolioSettings | 'displaySettings',
  //   pathOrValue: string | boolean | string[],
  //   valueForDisplaySetting?: boolean
  // ) => {
  //   setPortfolioSettings(prev => {
  //     const newSettings = {...prev};
  //     if (field !== 'displaySettings') {
  //       (newSettings as any)[field] = pathOrValue;
  //     } else {
  //       const pathString = pathOrValue as string;
  //       const value = valueForDisplaySetting;
  //       const keys = pathString.split('.');
  //       if (keys.length === 2) {
  //         const parentKey = keys[0] as keyof LivingPortfolioDisplaySettings;
  //         const childKey = keys[1] as string;
  //         if (newSettings.displaySettings && parentKey in newSettings.displaySettings) {
  //           (newSettings.displaySettings[parentKey] as any)[childKey] = value;
  //         }
  //       }
  //     }
  //     return newSettings;
  //   });
  // };

  const handleSettingChange = (
    field: keyof LivingPortfolioSettings | "displaySettings",
    pathOrValue: string | boolean | string[],
    valueForDisplaySetting?: boolean,
  ) => {
    setPortfolioSettings((prev) => {
      const newSettings = { ...prev };

      if (field !== "displaySettings") {
        // We know “pathOrValue” is a top‐level value (string | boolean | string[]), so we assign it.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (newSettings as any)[field] = pathOrValue;
      } else {
        const pathString = pathOrValue as string;
        const value = valueForDisplaySetting;
        const keys = pathString.split(".");
        if (keys.length === 2) {
          const parentKey =
            keys[0] as keyof LivingPortfolioSettings["displaySettings"];
          const childKey = keys[1];

          if (
            newSettings.displaySettings &&
            parentKey in newSettings.displaySettings
          ) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (newSettings.displaySettings[parentKey] as any)[childKey] = value;
          }
        }
      }

      return newSettings;
    });
  };

  // const handlePublicContentChange = (field: keyof LivingPortfolioSettings, value: any) => {
  //   setPortfolioSettings(prev => ({ ...prev, [field]: value }));
  // };

  const handlePublicContentChange = <T extends keyof LivingPortfolioSettings>(
    field: T,
    value: LivingPortfolioSettings[T],
  ) => {
    setPortfolioSettings((prev) => ({ ...prev, [field]: value }));
  };

  // const handleWorkExperienceBulletChange = (expIndex: number, bulletIndex: number, newValue: string) => {
  //   setPortfolioSettings(prev => {
  //     if (!prev || !prev.publicWorkExperiences) return prev;
  //     const newWorkExperiences = [...prev.publicWorkExperiences];
  //     if (newWorkExperiences[expIndex] && newWorkExperiences[expIndex].bullets) {
  //       newWorkExperiences[expIndex] = {
  //         ...newWorkExperiences[expIndex],
  //         bullets: [...newWorkExperiences[expIndex].bullets]
  //       };
  //       newWorkExperiences[expIndex].bullets[bulletIndex] = newValue;
  //     }
  //     return { ...prev, publicWorkExperiences: newWorkExperiences };
  //   });
  // };

  // const addWorkExperienceBullet = (expIndex: number) => {
  //   setPortfolioSettings(prev => {
  //     if (!prev || !prev.publicWorkExperiences) return prev;
  //     const newWorkExperiences = [...prev.publicWorkExperiences];
  //     if (newWorkExperiences[expIndex]) {
  //       newWorkExperiences[expIndex] = {
  //         ...newWorkExperiences[expIndex],
  //         bullets: [...(newWorkExperiences[expIndex].bullets || []), ""]
  //       };
  //     }
  //     return { ...prev, publicWorkExperiences: newWorkExperiences };
  //   });
  // };

  // const deleteWorkExperienceBullet = (expIndex: number, bulletIndex: number) => {
  //   setPortfolioSettings(prev => {
  //     if (!prev || !prev.publicWorkExperiences) return prev;
  //     const newWorkExperiences = [...prev.publicWorkExperiences];
  //     if (newWorkExperiences[expIndex] && newWorkExperiences[expIndex].bullets) {
  //       newWorkExperiences[expIndex] = {
  //         ...newWorkExperiences[expIndex],
  //         bullets: newWorkExperiences[expIndex].bullets.filter((_, i) => i !== bulletIndex)
  //       };
  //     }
  //     return { ...prev, publicWorkExperiences: newWorkExperiences };
  //   });
  // };

  const handleToggleWhatIf = (whatIfItemFromDraft: {
    scenarioText: string;
    result: WhatIfResult;
  }) => {
    setPortfolioSettings((prev) => {
      if (!prev) return prev;
      const { scenarioText, result } = whatIfItemFromDraft;
      const currentSelected = [...prev.selectedPublicWhatIfs];
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
      }
      return {
        ...prev,
        selectedPublicWhatIfs: [
          ...currentSelected,
          { scenarioText, adaptedResult: result },
        ],
      };
    });
  };

  const addShowcaseSection = () =>
    setPortfolioSettings((prev) => ({
      ...prev,
      showcaseSections: [
        ...prev.showcaseSections,
        {
          id: `section-${Date.now()}`,
          title: "New Showcase Section",
          items: [],
        },
      ],
    }));

  const updateShowcaseSectionTitle = (sectionId: string, newTitle: string) =>
    setPortfolioSettings((prev) => ({
      ...prev,
      showcaseSections: prev.showcaseSections.map((s) =>
        s.id === sectionId ? { ...s, title: newTitle } : s,
      ),
    }));

  const deleteShowcaseSection = (sectionId: string) => {
    if (window.confirm("Delete section?")) {
      setPortfolioSettings((prev) => ({
        ...prev,
        showcaseSections: prev.showcaseSections.filter(
          (s) => s.id !== sectionId,
        ),
      }));
    }
  };

  const addShowcaseItem = (sectionId: string) =>
    setPortfolioSettings((prev) => ({
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
    }));

  const updateShowcaseItem = (
    sectionId: string,
    itemId: string,
    field: keyof Omit<ShowcaseItem, "id">,
    value: string | string[],
  ) => {
    setPortfolioSettings((prev) => ({
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
    }));
  };

  const deleteShowcaseItem = (sectionId: string, itemId: string) => {
    if (window.confirm("Delete item?")) {
      setPortfolioSettings((prev) => ({
        ...prev,
        showcaseSections: prev.showcaseSections.map((s) =>
          s.id === sectionId
            ? {
                ...s,
                items: s.items.filter((i) => i.id !== itemId),
              }
            : s,
        ),
      }));
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || !portfolioSettings) return;
    const activeId = active.id as string;
    const overId = over.id as string;
    const activeType = active.data.current?.type as string;

    if (activeType === "section" && activeId !== overId) {
      const oldIndex = portfolioSettings.showcaseSections.findIndex(
        (s) => s.id === activeId,
      );
      const newIndex = portfolioSettings.showcaseSections.findIndex(
        (s) => s.id === overId,
      );
      setPortfolioSettings((prev) => ({
        ...prev,
        showcaseSections: arrayMove(prev.showcaseSections, oldIndex, newIndex),
      }));
    } else if (activeType === "item") {
      const activeSectionId = active.data.current?.sectionId as string;
      const section = portfolioSettings.showcaseSections.find(
        (s) => s.id === activeSectionId,
      );
      if (!section) return;

      const oldIndex = section.items.findIndex((i) => i.id === activeId);
      const newIndex = section.items.findIndex((i) => i.id === overId);

      setPortfolioSettings((prev) => ({
        ...prev,
        showcaseSections: prev.showcaseSections.map((s) =>
          s.id === activeSectionId
            ? {
                ...s,
                items: arrayMove(s.items, oldIndex, newIndex),
              }
            : s,
        ),
      }));
    }
  };

  const handleSaveOrPublish = async () => {
    if (!portfolioSettings) {
      setError("Settings not loaded.");
      return;
    }
    if (!editingPortfolioId && !sourceDraft) {
      setError("Source draft missing for new portfolio.");
      return;
    }
    setIsProcessing(true);
    setSuccessMessage(null);
    setError(null);

    const cleanedShowcaseSections = portfolioSettings.showcaseSections.map(
      (s) => ({
        ...s,
        items: s.items.map((i) => ({
          ...i,
          skillsUsed: (i.skillsUsed || [])
            .map((sk) => sk.trim())
            .filter(Boolean),
        })),
      }),
    );

    // const payload: LivingPortfolioSettings & { sourceResumeDraftId?: string } = {
    //   ...portfolioSettings,
    //   showcaseSections: cleanedShowcaseSections,
    //   publicSkills: (portfolioSettings.publicSkills || []).map(s => s.trim()).filter(Boolean),
    //   publicWorkExperiences: portfolioSettings.publicWorkExperiences?.map(exp => ({
    //     ...exp,
    //     bullets: (exp.bullets || []).map(b => b.trim()).filter(Boolean)
    //   })) || [],
    //   publicVolunteering: portfolioSettings.publicVolunteering?.map(vol => ({
    //     ...vol,
    //     bullets: ((vol as any).bullets || []).map((b: string) => b.trim()).filter(Boolean)
    //   })) || [],
    //   sourceResumeDraftId: editingPortfolioId ? undefined : sourceDraft?.id,
    // };

    const payload: LivingPortfolioSettings & { sourceResumeDraftId?: string } =
      {
        ...portfolioSettings,
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
            bullets: (vol.bullets || []).map((b) => b.trim()).filter(Boolean),
          })) || [],
        sourceResumeDraftId: editingPortfolioId ? undefined : sourceDraft?.id,
      };

    try {
      let response;
      let finalPortfolioIdForLink = editingPortfolioId; // Use for link construction
      let finalPortfolioSlugForLink: string | null | undefined =
        portfolioSettings.slug; // Start with current slug

      if (editingPortfolioId) {
        // console.log(`Attempting to PUT to /api/living-portfolios/${editingPortfolioId} with payload:`, payload);
        response = await axios.put(
          `/api/living-portfolios/${editingPortfolioId}`,
          payload,
        );
        // The response from PUT should ideally also return the updated slug if it changed, and the ID.
        finalPortfolioIdForLink =
          response.data.portfolioId || editingPortfolioId;
        finalPortfolioSlugForLink = response.data.portfolioSlug; // Get potentially updated slug
        setSuccessMessage(`Portfolio updated successfully!`);
      } else {
        // CREATE new portfolio
        if (!payload.sourceResumeDraftId && sourceDraft?.id) {
          // Ensure sourceResumeDraftId is in payload for POST
          payload.sourceResumeDraftId = sourceDraft.id;
        }
        if (!payload.sourceResumeDraftId) {
          throw new Error(
            "Source draft ID is essential for new portfolio creation.",
          );
        }

        // console.log("Attempting to POST to /api/living-portfolios/publish with payload:", payload);
        response = await axios.post("/api/living-portfolios/publish", payload);

        finalPortfolioIdForLink = response.data.portfolioId;
        finalPortfolioSlugForLink = response.data.portfolioSlug;

        setEditingPortfolioId(finalPortfolioIdForLink); // Switch to "edit" mode for this newly created portfolio
        setSuccessMessage(`Portfolio published successfully!`);
        // Update URL to reflect it's now an existing portfolio being edited, without full page reload
        router.replace(`/portfolio-editor/${finalPortfolioIdForLink}`, {
          scroll: false,
        });
      }

      // Construct the URL using the definitive ID/slug from the API response
      const portfolioUrl = `${window.location.origin}/portfolio/${finalPortfolioSlugForLink || finalPortfolioIdForLink}`;

      // Update the success message to include the link
      // We use the message set just above and append to it.
      // No need for setSuccessMessage(prev => ...) here, as we can just set the complete message.
      setSuccessMessage(
        `${editingPortfolioId ? "Portfolio updated" : "Portfolio published"} successfully! Shareable Link: ${portfolioUrl}`,
      );

      // console.log("Portfolio Save/Publish Response:", response.data);
    } catch {
      console.error("Error saving/publishing portfolio:");
      // err.response?.data || err.message || err);
      // if (err.response && err.response.status === 409) {
      //   setError(err.response.data.error || "This URL slug is already taken. Please choose a different one or leave it blank.");
      // } else {
      //   setError(err.response?.data?.error || err.message || "Failed to save/publish portfolio.");
      // }
      setSuccessMessage(null); // Clear success message on error
    } finally {
      setIsProcessing(false);
    }
  };

  //   try {
  //     let response;
  //     let portfolioLinkID = editingPortfolioId;
  //     let finalPortfolioIdForLink = editingPortfolioId; // Use for link construction
  //     let finalPortfolioSlugForLink: string | null | undefined = portfolioSettings.slug; // Start with current slug

  //     if (editingPortfolioId) {
  //       response = await axios.put(`/api/living-portfolios/${editingPortfolioId}`, payload);
  //       finalPortfolioIdForLink = response.data.portfolioId || editingPortfolioId;
  //       finalPortfolioSlugForLink = response.data.portfolioSlug; // Get potentially updated slug
  //       setSuccessMessage(`Portfolio updated successfully!`);
  //       setSuccessMessage(`Portfolio updated successfully!`);
  //     } else {
  //       if (!payload.sourceResumeDraftId) throw new Error("Source draft ID missing for new portfolio.");
  //       response = await axios.post('/api/living-portfolios/publish', payload);
  //       portfolioLinkID = response.data.portfolioId;
  //       setEditingPortfolioId(portfolioLinkID);
  //       setSuccessMessage(`Portfolio published successfully!`);
  //       router.replace(`/portfolio-editor/${portfolioLinkID}`, { scroll: false });
  //     }

  //     const portfolioUrl = `${window.location.origin}/portfolio/${response.data.portfolioSlug || portfolioLinkID}`;
  //     setSuccessMessage(prev => `${prev || ''} Shareable Link: ${portfolioUrl}`);
  //   } catch {
  //     console.error("Error saving/publishing portfolio:");
  //   }
  //   finally { setIsProcessing(false); }
  // };

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

      {successMessage && (
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
              <div
                className="mt-1 text-sm"
                dangerouslySetInnerHTML={{
                  __html: successMessage.replace(
                    /Shareable Link: (http[s]?:\/\/[^\s]+)/,
                    'Shareable Link: <a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline hover:text-blue-700 font-medium">$1</a>',
                  ),
                }}
              />
            </div>
          </div>
        </div>
      )}

      {error && !successMessage && (
        <div className="animate-fadeIn mb-8 rounded-md border-l-4 border-red-500 bg-red-50 p-4 text-red-700 shadow-lg">
          <span className="font-bold">Error:</span> {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-x-10 gap-y-12 lg:grid-cols-3">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="space-y-10 lg:col-span-2">
            <section className={sectionCardClass}>
              <h2 className={`${sectionTitleClass} mb-2`}>
                <Settings2 size={28} className="mr-3 text-indigo-600" />{" "}
                Portfolio Details
              </h2>
              <div className="space-y-6 pt-4">
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
                      onChange={(e) =>
                        handleSettingChange(
                          "slug",
                          e.target.value
                            .toLowerCase()
                            .replace(/\s+/g, "-")
                            .replace(/[^a-z0-9-]/g, ""),
                        )
                      }
                      placeholder="your-unique-slug"
                      className={`${inputBaseClass} !rounded-l-none focus:z-10`}
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-gray-500">
                    Lowercase letters, numbers, hyphens. Auto-formats. Blank for
                    unique ID.
                  </p>
                </div>
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
                <EditorCollapsibleSection
                  title="Contact Information"
                  icon={<UserCircle />}
                  isVisible={true}
                  initiallyOpen={false}
                >
                  <div className="space-y-3 p-2">
                    {portfolioSettings.displaySettings?.contact
                      ?.showFullName && (
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
                    {true && (
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
                    )}
                    {portfolioSettings.displaySettings?.contact?.showEmail && (
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
                    {portfolioSettings.displaySettings?.contact?.showPhone && (
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
                    {portfolioSettings.displaySettings?.contact
                      ?.showLocation && (
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
                    {portfolioSettings.displaySettings?.contact
                      ?.showLinkedIn && (
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
                      portfolioSettings.displaySettings?.contact || {},
                    ).every((v) => !v) && (
                      <p className="text-xs italic text-gray-500">
                        No contact fields are set to visible. Enable them in
                        &quot;Content Visibility&quot; to edit their content
                        here.
                      </p>
                    )}
                  </div>
                </EditorCollapsibleSection>

                <EditorCollapsibleSection
                  title="Summary"
                  icon={<FileText />}
                  isVisible={
                    portfolioSettings.displaySettings?.sections?.showSummary
                  }
                  initiallyOpen={
                    !!portfolioSettings.displaySettings?.sections?.showSummary
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

                <EditorCollapsibleSection
                  title="Skills"
                  icon={<Layers />}
                  isVisible={
                    portfolioSettings.displaySettings?.sections?.showSkills
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
                        e.target.value.split(",").map((s) => s.trim()),
                      )
                    }
                    rows={3}
                    className={textareaBaseClass}
                    placeholder="e.g., React, Project Management"
                  />
                  {sourceDraft?.wizardSkills &&
                    JSON.stringify(
                      portfolioSettings.publicSkills
                        ?.map((s) => s.trim())
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

                {[
                  "WorkExperience",
                  "Education",
                  "Volunteering",
                  "Certifications",
                ].map((sectionKey) => {
                  const displayKey =
                    `show${sectionKey}` as keyof LivingPortfolioDisplaySettings["sections"];
                  if (
                    portfolioSettings.displaySettings?.sections?.[displayKey]
                  ) {
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

                {portfolioSettings.displaySettings?.narrativeSuite
                  ?.showCareerNarrative && (
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

                {portfolioSettings.displaySettings?.narrativeSuite
                  ?.showGoldenThread && (
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

                {portfolioSettings.displaySettings?.narrativeSuite
                  ?.showKeyThemes && (
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

                {portfolioSettings.displaySettings?.narrativeSuite
                  ?.showHiddenGems && (
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

                {portfolioSettings.displaySettings?.narrativeSuite
                  ?.showGoldenThread &&
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

            <section className={sectionCardClass}>
              <h2 className={`${sectionTitleClass} mb-2`}>
                <Eye size={28} className="mr-3 text-indigo-600" /> Content
                Visibility Toggles
              </h2>
              <p className="-mt-4 mb-6 text-sm text-gray-500">
                Choose which sections will appear on your public portfolio.
              </p>
              <div className="space-y-6 pt-4">
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
                        key={`editor-whatif-${whatIfItem.scenarioText.replace(/\s+/g, "-")}`}
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
                        <Plus size={16} strokeWidth={3} />
                        Add Item to &quot;
                        {section.title.length > 20
                          ? section.title.substring(0, 20) + "..."
                          : section.title}
                        &quot;
                      </button>
                    </SortableShowcaseSection>
                  ))}
                </SortableContext>
              </div>
            </section>

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
                </strong>
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

// "use client";

// import React, { useState, useEffect } from 'react';
// import { useParams, useRouter, useSearchParams } from 'next/navigation';
// import axios from 'axios';
// import { useUser } from '@clerk/nextjs';

// // DND-Kit Imports
// import {
//   DndContext,
//   closestCenter,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
//   DragEndEvent,
// } from '@dnd-kit/core';
// import {
//   arrayMove,
//   SortableContext,
//   sortableKeyboardCoordinates,
//   verticalListSortingStrategy,
//   useSortable,
// } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';

// // Lucide Icons
// import {
//   ArrowLeft, Plus, Trash2, GripVertical, FolderKanban, FileText, Palette, Eye, Settings2,
//   Edit3 as EditIcon, ChevronDown, ChevronUp, Layers, MessageSquareQuote, Briefcase, Brain, Zap,
//   UserCircle, GraduationCap, Gift, ShieldCheck, ThumbsUp, Info, Link as LinkIcon, RefreshCw, Sparkles, ListChecks
// } from 'lucide-react';

// import { ResumeJSON } from '@/components/ATSScore';
// import { InitialNarrativeResult, WhatIfResult, HiddenGemsResult } from '@/components/NarrativeWeaver';

// // --- Interfaces ---
// interface ShowcaseItem { id: string; name: string; description: string; link?: string; skillsUsed?: string[]; }
// interface ShowcaseSectionData { id: string; title: string; items: ShowcaseItem[]; }
// interface LivingPortfolioDisplaySettings {
//   contact: {
//     showEmail: boolean;
//     showPhone: boolean;
//     showLocation: boolean;
//     showLinkedIn: boolean;
//     showPhoto: boolean;
//     showFullName: boolean; // Added to fix showFullName error
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
//   slug?: string;
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
//   publicWorkExperiences?: ResumeJSON['workExperiences'];
//   publicEducations?: ResumeJSON['educations'];
//   publicVolunteering?: ResumeJSON['volunteering'];
//   publicCertifications?: ResumeJSON['certifications'];
//   publicCareerNarrative?: string;
//   publicGoldenThread?: string;
//   publicGoldenThreadEvidence?: InitialNarrativeResult['goldenThreadEvidence'];
//   publicKeyThemes?: InitialNarrativeResult['keyThemes'];
//   publicHiddenGems?: HiddenGemsResult;
//   selectedPublicWhatIfs: Array<{ scenarioText: string, adaptedResult: WhatIfResult }>;
//   showcaseSections: Array<ShowcaseSectionData>;
// }

// // Define WizardPersonalDataWithJobTitle explicitly to avoid extension error
// interface WizardPersonalDataWithJobTitle {
//   fullName?: string; // Added to fix fullName error
//   jobTitle?: string;
//   email?: string;
//   phone?: string;
//   city?: string;
//   country?: string;
//   linkedinUrl?: string;
//   [key: string]: any; // Allow additional fields for flexibility
// }

// interface SourceResumeDraftData {
//   id: string;
//   title?: string | null;
//   wizardPersonalData?: WizardPersonalDataWithJobTitle | null;
//   wizardSummary?: string | null;
//   wizardSkills?: string[] | null;
//   wizardWorkExperiences?: ResumeJSON['workExperiences'] | null;
//   wizardEducations?: ResumeJSON['educations'] | null;
//   wizardVolunteering?: ResumeJSON['volunteering'] | null;
//   wizardCertifications?: ResumeJSON['certifications'] | null;
//   aiCareerNarrative?: string | null;
//   aiGoldenThread?: string | null;
//   aiGoldenThreadEvidence?: InitialNarrativeResult['goldenThreadEvidence'] | null;
//   aiKeyThemes?: InitialNarrativeResult['keyThemes'] | null;
//   aiHiddenGemsResultJson?: HiddenGemsResult | null;
//   aiWhatIfResultsCache?: Array<{ scenarioText: string, result: WhatIfResult }> | null;
// }

// interface ExistingLivingPortfolioData extends LivingPortfolioSettings {
//   id: string;
//   sourceResumeDraftId: string;
// }

// const defaultDisplaySettingsConst: LivingPortfolioDisplaySettings = {
//   contact: {
//     showEmail: true,
//     showPhone: true,
//     showLocation: true,
//     showLinkedIn: true,
//     showPhoto: false,
//     showFullName: true // Added to match usage
//   },
//   sections: {
//     showSummary: true,
//     showSkills: true,
//     showWorkExperience: true,
//     showEducation: true,
//     showVolunteering: true,
//     showCertifications: true,
//     showReferences: false
//   },
//   narrativeSuite: {
//     showCareerNarrative: true,
//     showGoldenThread: true,
//     showKeyThemes: true,
//     showHiddenGems: true
//   }
// };

// const initialPortfolioSettingsShell: LivingPortfolioSettings = {
//   title: "Loading Portfolio...",
//   slug: '',
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
//   { id: 'default', name: 'Default Professional' },
//   { id: 'modern-dark', name: 'Modern Dark' },
//   { id: 'creative-light', name: 'Creative Light' },
//   { id: 'minimalist-focus', name: 'Minimalist Focus' },
// ];
// const inputBaseClass = "block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-150";
// const checkboxLabelClass = "flex items-center space-x-2.5 cursor-pointer text-sm py-1 text-gray-700 hover:text-indigo-700 transition-colors";
// const checkboxClass = "h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 focus:ring-offset-1 shadow-sm";
// const sectionCardClass = "bg-white p-6 sm:p-8 rounded-xl shadow-xl";
// const sectionTitleClass = "text-2xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-4 flex items-center gap-3";
// const subSectionTitleClass = "text-lg font-semibold text-gray-700 mb-3";
// const textareaBaseClass = "block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-150 resize-y";
// const primaryButtonClass = "inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors";
// const secondaryButtonClass = "inline-flex items-center justify-center px-5 py-2.5 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition-colors";
// const iconButtonClass = "p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors";

// const EditorCollapsibleSection: React.FC<{
//   title: string,
//   children: React.ReactNode,
//   icon?: React.ReactNode,
//   initiallyOpen?: boolean,
//   isVisible?: boolean
// }> = ({ title, children, icon, initiallyOpen = false, isVisible = true }) => {
//   const [isOpen, setIsOpen] = useState(initiallyOpen);
//   useEffect(() => { setIsOpen(initiallyOpen); }, [initiallyOpen]); // Sync with prop
//   if (!isVisible) return null;
//   return (
//     <div className="border border-gray-300 rounded-lg bg-slate-50/70 overflow-hidden my-4 transition-all duration-300 ease-in-out shadow-sm hover:shadow-md">
//       <button
//         type="button"
//         onClick={() => setIsOpen(!isOpen)}
//         className="w-full flex justify-between items-center p-4 text-left text-gray-800 hover:bg-slate-100 focus:outline-none font-medium transition-colors"
//       >
//         <span className="flex items-center text-md">
//           {icon && <span className="mr-2.5 text-indigo-600 opacity-80">{icon}</span>}
//           {title}
//         </span>
//         {isOpen ? <ChevronUp size={20} className="text-gray-500"/> : <ChevronDown size={20} className="text-gray-500"/>}
//       </button>
//       {isOpen && <div className="p-5 border-t border-gray-200 bg-white space-y-4">{children}</div>}
//     </div>
//   );
// };

// function SortableShowcaseItem({
//   sectionId,
//   item,
//   updateShowcaseItem,
//   deleteShowcaseItem
// }: {
//   sectionId: string;
//   item: ShowcaseItem;
//   updateShowcaseItem: (sectionId: string, itemId: string, field: keyof Omit<ShowcaseItem, 'id'>, value: string | string[]) => void;
//   deleteShowcaseItem: (sectionId: string, itemId: string) => void;
// }) {
//   const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id, data: { type: 'item', sectionId: sectionId } });
//   const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.7 : 1, zIndex: isDragging ? 100 : 'auto' };
//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       className="p-5 border border-gray-300 rounded-lg space-y-4 bg-white relative group shadow-md hover:shadow-lg transition-shadow mb-4"
//     >
//       <div className="flex items-start justify-between">
//         <div {...attributes} {...listeners} className={`cursor-grab p-1.5 -ml-1.5 text-gray-400 hover:text-gray-600 touch-none`}>
//           <GripVertical size={20} />
//         </div>
//         <div className="flex-grow ml-2 space-y-3">
//           <div>
//             <label htmlFor={`itemName-${sectionId}-${item.id}`} className="block text-xs font-semibold text-gray-600 mb-1">Item Name*</label>
//             <input
//               id={`itemName-${sectionId}-${item.id}`}
//               type="text"
//               value={item.name}
//               onChange={(e) => updateShowcaseItem(sectionId, item.id, 'name', e.target.value)}
//               placeholder="E.g., Customer Churn Prediction Model"
//               className={`${inputBaseClass} text-sm py-2.5`}
//             />
//           </div>
//           <div>
//             <label htmlFor={`itemDesc-${sectionId}-${item.id}`} className="block text-xs font-semibold text-gray-600 mb-1">Description*</label>
//             <textarea
//               id={`itemDesc-${sectionId}-${item.id}`}
//               value={item.description}
//               onChange={(e) => updateShowcaseItem(sectionId, item.id, 'description', e.target.value)}
//               placeholder="Detailed description..."
//               rows={4}
//               className={`${textareaBaseClass} text-sm min-h-[80px] py-2.5`}
//             />
//           </div>
//           <div>
//             <label htmlFor={`itemLink-${sectionId}-${item.id}`} className="block text-xs font-semibold text-gray-600 mb-1">Link (Optional)</label>
//             <input
//               id={`itemLink-${sectionId}-${item.id}`}
//               type="url"
//               value={item.link || ''}
//               onChange={(e) => updateShowcaseItem(sectionId, item.id, 'link', e.target.value)}
//               placeholder="https://github.com/..."
//               className={`${inputBaseClass} text-sm py-2.5`}
//             />
//           </div>
//           <div>
//             <label htmlFor={`itemSkills-${sectionId}-${item.id}`} className="block text-xs font-semibold text-gray-600 mb-1">Skills Used (comma-separated)</label>
//             <textarea
//               id={`itemSkills-${sectionId}-${item.id}`}
//               value={(item.skillsUsed || []).join(', ')}
//               onChange={(e) => {
//                 const skillsArray = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
//                 updateShowcaseItem(sectionId, item.id, 'skillsUsed', skillsArray);
//               }}
//               placeholder="React, Node.js, Project Management"
//               rows={2}
//               className={`${textareaBaseClass} text-sm min-h-[60px] py-2.5`}
//             />
//           </div>
//         </div>
//         <button
//           type="button"
//           onClick={() => deleteShowcaseItem(sectionId, item.id)}
//           className={`${iconButtonClass} !text-red-500 hover:!text-red-700 hover:!bg-red-100 ml-2`}
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
//   deleteShowcaseSection
// }: {
//   section: ShowcaseSectionData;
//   children: React.ReactNode;
//   updateShowcaseSectionTitle: (sectionId: string, newTitle: string) => void;
//   deleteShowcaseSection: (sectionId: string) => void;
// }) {
//   const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: section.id, data: { type: 'section' } });
//   const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.8 : 1, boxShadow: isDragging ? '0 10px 20px rgba(0,0,0,0.1)' : '', zIndex: isDragging ? 100 : 'auto' };
//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       className="p-6 border-2 border-gray-200 rounded-xl bg-slate-50 space-y-5 shadow-lg hover:shadow-xl transition-shadow duration-300"
//     >
//       <div className="flex items-center border-b-2 border-gray-300 pb-3 mb-5">
//         <div {...attributes} {...listeners} className={`cursor-grab p-2 -ml-2 mr-2 ${iconButtonClass} touch-none text-gray-400 hover:text-gray-700`}>
//           <GripVertical size={24} />
//         </div>
//         <input
//           type="text"
//           value={section.title}
//           onChange={(e) => updateShowcaseSectionTitle(section.id, e.target.value)}
//           placeholder="Section Title"
//           className="text-xl font-semibold p-2 border-0 border-b-2 border-transparent focus:border-indigo-500 outline-none flex-grow focus:ring-0 placeholder-gray-500 w-full bg-transparent"
//         />
//         <button
//           type="button"
//           onClick={() => deleteShowcaseSection(section.id)}
//           className={`${iconButtonClass} !text-red-500 hover:!text-red-700 hover:!bg-red-100 ml-4`}
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
//   const params = useParams() ?? {}; // Fallback to empty object to fix params null error
//   const searchParams = useSearchParams();
//   const { user, isLoaded: isUserLoaded } = useUser();
//   const idOrActionParam = (params as Record<string, string>).idOrAction || '';

//   const [isLoadingPage, setIsLoadingPage] = useState(true);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const [sourceDraft, setSourceDraft] = useState<SourceResumeDraftData | null>(null);
//   const [portfolioSettings, setPortfolioSettings] = useState<LivingPortfolioSettings>(
//     JSON.parse(JSON.stringify(initialPortfolioSettingsShell))
//   );
//   const [editingPortfolioId, setEditingPortfolioId] = useState<string | null>(null);

//   const sensors = useSensors(
//     useSensor(PointerSensor, {activationConstraint: { distance: 8 }}),
//     useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
//   );

//   useEffect(() => {
//     if (!idOrActionParam || !isUserLoaded) return;
//     if (!user) { router.push('/sign-in'); return; }

//     const loadData = async () => {
//       setIsLoadingPage(true);
//       setError(null);
//       setSuccessMessage(null);
//       setEditingPortfolioId(null);
//       setSourceDraft(null);
//       let tempPortfolioSettings: LivingPortfolioSettings;

//       try {
//         let draftDataToUse: SourceResumeDraftData | null = null;

//         if (idOrActionParam === 'new') {
//           const draftIdQuery = searchParams?.get('draftId'); // Safe access to fix searchParams null error
//           if (!draftIdQuery) throw new Error("Resume Draft ID required for new portfolio.");
//           const draftRes = await axios.get(`/api/resume-drafts/${draftIdQuery}`);
//           draftDataToUse = draftRes.data.draft as SourceResumeDraftData;
//           if (!draftDataToUse) throw new Error("Failed to fetch source resume draft.");

//           tempPortfolioSettings = {
//             title: `${draftDataToUse.wizardPersonalData?.fullName || 'My'} Portfolio`,
//             ...JSON.parse(JSON.stringify(initialPortfolioSettingsShell))
//           };

//           const ds = tempPortfolioSettings.displaySettings;
//           if (draftDataToUse.wizardPersonalData) {
//             tempPortfolioSettings.publicFullName = ds.contact.showFullName ? draftDataToUse.wizardPersonalData.fullName : undefined;
//             tempPortfolioSettings.publicJobTitle = draftDataToUse.wizardPersonalData.jobTitle || undefined;
//             tempPortfolioSettings.publicEmail = ds.contact.showEmail ? draftDataToUse.wizardPersonalData.email : undefined;
//             tempPortfolioSettings.publicPhone = ds.contact.showPhone ? draftDataToUse.wizardPersonalData.phone : undefined;
//             tempPortfolioSettings.publicLocation = ds.contact.showLocation ? `${draftDataToUse.wizardPersonalData.city || ''}, ${draftDataToUse.wizardPersonalData.country || ''}`.replace(/^, |, $/g, '') : undefined;
//             tempPortfolioSettings.publicLinkedInUrl = ds.contact.showLinkedIn ? draftDataToUse.wizardPersonalData.linkedinUrl : undefined;
//           }
//           tempPortfolioSettings.publicSummary = ds.sections.showSummary ? draftDataToUse.wizardSummary || "" : "";
//           tempPortfolioSettings.publicSkills = ds.sections.showSkills ? (draftDataToUse.wizardSkills || []) : [];
//           tempPortfolioSettings.publicWorkExperiences = ds.sections.showWorkExperience ? (draftDataToUse.wizardWorkExperiences || []) : [];
//           tempPortfolioSettings.publicEducations = ds.sections.showEducation ? (draftDataToUse.wizardEducations || []) : [];
//           tempPortfolioSettings.publicVolunteering = ds.sections.showVolunteering ? (draftDataToUse.wizardVolunteering || []) : [];
//           tempPortfolioSettings.publicCertifications = ds.sections.showCertifications ? (draftDataToUse.wizardCertifications || []) : [];
//           tempPortfolioSettings.publicCareerNarrative = ds.narrativeSuite.showCareerNarrative ? draftDataToUse.aiCareerNarrative || "" : "";
//           tempPortfolioSettings.publicGoldenThread = ds.narrativeSuite.showGoldenThread ? draftDataToUse.aiGoldenThread || "" : "";
//           tempPortfolioSettings.publicGoldenThreadEvidence = (ds.narrativeSuite.showGoldenThread && draftDataToUse.aiGoldenThreadEvidence) ? draftDataToUse.aiGoldenThreadEvidence : [];
//           tempPortfolioSettings.publicKeyThemes = (ds.narrativeSuite.showKeyThemes && draftDataToUse.aiKeyThemes) ? draftDataToUse.aiKeyThemes : [];
//           tempPortfolioSettings.publicHiddenGems = (ds.narrativeSuite.showHiddenGems && draftDataToUse.aiHiddenGemsResultJson) ? draftDataToUse.aiHiddenGemsResultJson : undefined;

//         } else {
//           setEditingPortfolioId(idOrActionParam);
//           const portfolioRes = await axios.get(`/api/living-portfolios/edit/${idOrActionParam}`);
//           const existingPortfolio: ExistingLivingPortfolioData = portfolioRes.data.portfolio;
//           if (!existingPortfolio) throw new Error("Portfolio to edit not found or access denied.");

//           tempPortfolioSettings = {
//             title: existingPortfolio.title,
//             slug: existingPortfolio.slug || '',
//             isPublic: existingPortfolio.isPublic,
//             theme: existingPortfolio.theme,
//             displaySettings: {
//               contact: {...defaultDisplaySettingsConst.contact, ...(existingPortfolio.displaySettings?.contact || {})},
//               sections: {...defaultDisplaySettingsConst.sections, ...(existingPortfolio.displaySettings?.sections || {})},
//               narrativeSuite: {...defaultDisplaySettingsConst.narrativeSuite, ...(existingPortfolio.displaySettings?.narrativeSuite || {})},
//             },
//             publicFullName: existingPortfolio.publicFullName,
//             publicJobTitle: existingPortfolio.publicJobTitle,
//             publicEmail: existingPortfolio.publicEmail,
//             publicPhone: existingPortfolio.publicPhone,
//             publicLocation: existingPortfolio.publicLocation,
//             publicLinkedInUrl: existingPortfolio.publicLinkedInUrl,
//             publicSummary: existingPortfolio.publicSummary || '',
//             publicSkills: existingPortfolio.publicSkills || [],
//             publicWorkExperiences: existingPortfolio.publicWorkExperiences || [],
//             publicEducations: existingPortfolio.publicEducations || [],
//             publicVolunteering: existingPortfolio.publicVolunteering || [],
//             publicCertifications: existingPortfolio.publicCertifications || [],
//             publicCareerNarrative: existingPortfolio.publicCareerNarrative || '',
//             publicGoldenThread: existingPortfolio.publicGoldenThread || '',
//             publicGoldenThreadEvidence: existingPortfolio.publicGoldenThreadEvidence || [],
//             publicKeyThemes: existingPortfolio.publicKeyThemes || [],
//             publicHiddenGems: existingPortfolio.publicHiddenGems || undefined,
//             selectedPublicWhatIfs: existingPortfolio.selectedPublicWhatIfs || [],
//             showcaseSections: existingPortfolio.showcaseSections || [],
//           };

//           if (existingPortfolio.sourceResumeDraftId) {
//             const draftRes = await axios.get(`/api/resume-drafts/${existingPortfolio.sourceResumeDraftId}`);
//             draftDataToUse = draftRes.data.draft as SourceResumeDraftData;
//           }
//         }
//         setSourceDraft(draftDataToUse);
//         setPortfolioSettings(tempPortfolioSettings);

//       } catch (err: unknown) {
//         console.error("Error in Portfolio Editor data fetching:", err);
//         const errorMessage = err instanceof Error ? err.message : "Failed to load editor data.";
//         setError(errorMessage);
//       }
//       finally { setIsLoadingPage(false); }
//     };
//     if(idOrActionParam && isUserLoaded && user) loadData();
//   }, [idOrActionParam, searchParams, user, isUserLoaded, router]);

//   const handleSettingChange = (
//     field: keyof LivingPortfolioSettings | 'displaySettings',
//     pathOrValue: string | boolean | string[],
//     valueForDisplaySetting?: boolean
//   ) => {
//     setPortfolioSettings(prev => {
//       if (field !== 'displaySettings') {
//         return { ...prev, [field as keyof LivingPortfolioSettings]: pathOrValue };
//       } else {
//         const pathString = pathOrValue as string;
//         const value = valueForDisplaySetting;
//         const keys = pathString.split('.');
//         if (keys.length === 2) {
//           const parentKey = keys[0] as keyof LivingPortfolioDisplaySettings;
//           const childKey = keys[1];
//           if (parentKey in prev.displaySettings && childKey in prev.displaySettings[parentKey]) {
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

//   const handlePublicContentChange = (field: keyof LivingPortfolioSettings, value: unknown) => {
//     setPortfolioSettings(prev => ({ ...prev, [field]: value }));
//   };

//   const handleWorkExperienceBulletChange = (expIndex: number, bulletIndex: number, newValue: string) => {
//     setPortfolioSettings(prev => {
//       if (!prev.publicWorkExperiences) return prev;
//       const newWorkExperiences = JSON.parse(JSON.stringify(prev.publicWorkExperiences));
//       if (newWorkExperiences[expIndex] && newWorkExperiences[expIndex].bullets) {
//         newWorkExperiences[expIndex].bullets[bulletIndex] = newValue;
//       }
//       return { ...prev, publicWorkExperiences: newWorkExperiences };
//     });
//   };

//   const addWorkExperienceBullet = (expIndex: number) => {
//     setPortfolioSettings(prev => {
//       if (!prev.publicWorkExperiences) return prev;
//       const newWorkExperiences = JSON.parse(JSON.stringify(prev.publicWorkExperiences));
//       if (newWorkExperiences[expIndex]) {
//         if (!newWorkExperiences[expIndex].bullets) { newWorkExperiences[expIndex].bullets = []; }
//         newWorkExperiences[expIndex].bullets.push("");
//       }
//       return { ...prev, publicWorkExperiences: newWorkExperiences };
//     });
//   };

//   const deleteWorkExperienceBullet = (expIndex: number, bulletIndex: number) => {
//     setPortfolioSettings(prev => {
//       if (!prev.publicWorkExperiences) return prev;
//       const newWorkExperiences = JSON.parse(JSON.stringify(prev.publicWorkExperiences));
//       if (newWorkExperiences[expIndex] && newWorkExperiences[expIndex].bullets) {
//         newWorkExperiences[expIndex].bullets.splice(bulletIndex, 1);
//       }
//       return { ...prev, publicWorkExperiences: newWorkExperiences };
//     });
//   };

//   const handleToggleWhatIf = (whatIfItemFromDraft: { scenarioText: string, result: WhatIfResult }) => {
//     setPortfolioSettings(prev => {
//       const { scenarioText, result } = whatIfItemFromDraft;
//       const currentSelected = prev.selectedPublicWhatIfs;
//       const existingIndex = currentSelected.findIndex(item => item.scenarioText === scenarioText);
//       if (existingIndex > -1) {
//         return { ...prev, selectedPublicWhatIfs: currentSelected.filter((_, i) => i !== existingIndex) };
//       } else {
//         return { ...prev, selectedPublicWhatIfs: [...currentSelected, { scenarioText, adaptedResult: result }] };
//       }
//     });
//   };

//   const addShowcaseSection = () => setPortfolioSettings(prev => ({
//     ...prev,
//     showcaseSections: [...prev.showcaseSections, { id: `section-${Date.now()}`, title: "New Showcase Section", items: [] }]
//   }));

//   const updateShowcaseSectionTitle = (sectionId: string, newTitle: string) => setPortfolioSettings(prev => ({
//     ...prev,
//     showcaseSections: prev.showcaseSections.map(s => s.id === sectionId ? { ...s, title: newTitle } : s)
//   }));

//   const deleteShowcaseSection = (sectionId: string) => {
//     if (window.confirm("Delete section?")) {
//       setPortfolioSettings(prev => ({
//         ...prev,
//         showcaseSections: prev.showcaseSections.filter(s => s.id !== sectionId)
//       }));
//     }
//   };

//   const addShowcaseItem = (sectionId: string) => setPortfolioSettings(prev => ({
//     ...prev,
//     showcaseSections: prev.showcaseSections.map(s => s.id === sectionId ? {
//       ...s,
//       items: [...s.items, { id: `item-${Date.now()}`, name: "New Item", description: "", skillsUsed: [] }]
//     } : s)
//   }));

//   const updateShowcaseItem = (sectionId: string, itemId: string, field: keyof Omit<ShowcaseItem, 'id'>, value: string | string[]) => {
//     setPortfolioSettings(prev => ({
//       ...prev,
//       showcaseSections: prev.showcaseSections.map(s => s.id === sectionId ? {
//         ...s,
//         items: s.items.map(i => i.id === itemId ? { ...i, [field]: value } : i)
//       } : s)
//     }));
//   };

//   const deleteShowcaseItem = (sectionId: string, itemId: string) => {
//     if (window.confirm("Delete item?")) {
//       setPortfolioSettings(prev => ({
//         ...prev,
//         showcaseSections: prev.showcaseSections.map(s => s.id === sectionId ? {
//           ...s,
//           items: s.items.filter(i => i.id !== itemId)
//         } : s)
//       }));
//     }
//   };

//   const handleDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event;
//     if (!over) return;
//     const activeId = active.id as string;
//     const overId = over.id as string;
//     const activeType = active.data.current?.type as string;
//     if (activeType === 'section' && activeId !== overId) {
//       setPortfolioSettings(prev => ({
//         ...prev,
//         showcaseSections: arrayMove(prev.showcaseSections, prev.showcaseSections.findIndex(s => s.id === activeId), prev.showcaseSections.findIndex(s => s.id === overId))
//       }));
//     } else if (activeType === 'item') {
//       const activeSectionId = active.data.current?.sectionId as string;
//       setPortfolioSettings(prev => ({
//         ...prev,
//         showcaseSections: prev.showcaseSections.map(section => section.id === activeSectionId ? {
//           ...section,
//           items: arrayMove(section.items, section.items.findIndex(i => i.id === activeId), section.items.findIndex(i => i.id === overId))
//         } : section)
//       }));
//     }
//   };

//   const handleSaveOrPublish = async () => {
//     if (!portfolioSettings) { setError("Settings not loaded."); return; }
//     if (!editingPortfolioId && !sourceDraft) { setError("Source draft missing for new portfolio."); return; }
//     setIsProcessing(true);
//     setSuccessMessage(null);
//     setError(null);

//     const cleanedShowcaseSections = portfolioSettings.showcaseSections.map(s => ({
//       ...s,
//       items: s.items.map(i => ({
//         ...i,
//         skillsUsed: (i.skillsUsed || []).map(sk => sk.trim()).filter(Boolean)
//       }))
//     }));
//     const payload: LivingPortfolioSettings & { sourceResumeDraftId?: string } = {
//       ...portfolioSettings,
//       showcaseSections: cleanedShowcaseSections,
//       publicSkills: (portfolioSettings.publicSkills || []).map(s => s.trim()).filter(Boolean),
//       publicWorkExperiences: portfolioSettings.publicWorkExperiences?.map(exp => ({
//         ...exp,
//         bullets: (exp.bullets || []).map(b => b.trim()).filter(Boolean)
//       })) || [],
//       publicVolunteering: portfolioSettings.publicVolunteering?.map(vol => ({
//         ...vol,
//         bullets: (vol.bullets || []).map((b: string) => b.trim()).filter(Boolean)
//       })) || [],
//       sourceResumeDraftId: editingPortfolioId ? undefined : sourceDraft?.id,
//     };

//     try {
//       let response;
//       let portfolioLinkID = editingPortfolioId;
//       if (editingPortfolioId) {
//         response = await axios.put(`/api/living-portfolios/${editingPortfolioId}`, payload);
//         setSuccessMessage(`Portfolio updated successfully!`);
//       } else {
//         if (!payload.sourceResumeDraftId) throw new Error("Source draft ID missing for new portfolio.");
//         response = await axios.post('/api/living-portfolios/publish', payload);
//         portfolioLinkID = response.data.portfolioId;
//         setEditingPortfolioId(portfolioLinkID);
//         setSuccessMessage(`Portfolio published successfully!`);
//         router.replace(`/portfolio-editor/${portfolioLinkID}`, { scroll: false });
//       }
//       const portfolioUrl = `${window.location.origin}/portfolio/${response.data.portfolioSlug || portfolioLinkID}`;
//       setSuccessMessage(prev => `${prev || ''} Shareable Link: ${portfolioUrl}`);
//     } catch (err: unknown) {
//       console.error("Error saving/publishing portfolio:", err);
//       const errorMessage = err instanceof Error ? err.message : "Failed to save/publish.";
//       if (err instanceof Error && 'response' in err && err.response && 'status' in err.response && err.response.status === 409) {
//         setError((err.response.data as { error?: string }).error || "URL slug taken.");
//       } else {
//         setError(errorMessage);
//       }
//     }
//     finally { setIsProcessing(false); }
//   };

//   if (isLoadingPage) {
//     return <div className="flex justify-center items-center min-h-screen text-xl font-semibold text-gray-700 animate-pulse">Loading Portfolio Editor...</div>;
//   }
//   if (error && !portfolioSettings) {
//     return (
//       <div className="max-w-2xl mx-auto my-10 p-8 text-red-700 bg-red-50 border-2 border-red-200 rounded-lg text-center shadow-lg">
//         <h2 className="text-2xl font-semibold mb-3">Oops! Something went wrong.</h2>
//         <p className="text-md mb-4">{error}</p>
//         <button
//           onClick={() => router.push(idOrActionParam === 'new' ? '/wizard' : (user ? `/profile/${user.id}` : '/'))}
//           className="mt-4 px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700"
//         >
//           {idOrActionParam === 'new' ? 'Go back to Wizard' : 'Go to My Profile'}
//         </button>
//       </div>
//     );
//   }
//   if (idOrActionParam === 'new' && !sourceDraft && portfolioSettings) {
//     return (
//       <div className="max-w-2xl mx-auto my-10 p-8 text-center text-lg text-yellow-800 bg-yellow-50 border-2 border-yellow-200 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-semibold mb-3">Missing Information</h2>
//         <p className="text-md mb-4">{error || "Could not load the source resume draft for new portfolio."}</p>
//         <button
//           onClick={() => router.push('/wizard')}
//           className="mt-4 px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700"
//         >
//           Go back to Wizard
//         </button>
//       </div>
//     );
//   }
//   if (!portfolioSettings) {
//     return (
//       <div className="max-w-2xl mx-auto my-10 p-8 text-center text-lg text-gray-700 bg-gray-100 border-2 border-gray-200 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-semibold mb-3">Unable to Load Editor</h2>
//         <p className="text-md mb-4">Portfolio data could not be initialized. Please try again.</p>
//         <button
//           onClick={() => router.push(editingPortfolioId && user?.id ? `/profile/${user.id}` : '/wizard')}
//           className="mt-4 px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors shadow"
//         >
//           {editingPortfolioId ? "Go to My Profile" : "Go back to Wizard"}
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 font-sans bg-slate-100 min-h-screen">
//       <button
//         onClick={() => router.push(editingPortfolioId && user?.id ? `/profile/${user.id}` : '/wizard')}
//         className="mb-10 inline-flex items-center text-sm font-medium text-indigo-700 hover:text-indigo-900 transition-colors group"
//       >
//         <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
//         {editingPortfolioId ? "Back to My Profile" : "Back to Resume Wizard"}
//       </button>
//       <header className="mb-12 pb-6 border-b-2 border-gray-300">
//         <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
//           {editingPortfolioId ? "Edit Living Portfolio" : "Create New Living Portfolio"}
//         </h1>
//         {sourceDraft?.title && <p className="text-lg text-gray-600 mt-2">Based on Resume Draft: <span className="font-semibold text-gray-800">"{sourceDraft.title}"</span></p>}
//       </header>

//       {successMessage && (
//         <div className="p-4 mb-8 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-md shadow-lg animate-fadeIn">
//           <div className="flex">
//             <div className="py-1"><Sparkles className="h-6 w-6 text-green-500 mr-4" /></div>
//             <div>
//               <p className="font-bold text-lg">{editingPortfolioId ? 'Portfolio Updated!' : 'Portfolio Published!'}</p>
//               <div className="text-sm mt-1" dangerouslySetInnerHTML={{
//                 __html: successMessage.replace(/Shareable Link: (http[s]?:\/\/[^\s]+)/, 'Shareable Link: <a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline hover:text-blue-700 font-medium">$1</a>')
//               }} />
//             </div>
//           </div>
//         </div>
//       )}
//       {error && !successMessage && <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md shadow-lg animate-fadeIn"><span className="font-bold">Error:</span> {error}</div>}

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-10 gap-y-12">
//         <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//           <div className="lg:col-span-2 space-y-10">

//             <section className={sectionCardClass}>
//               <h2 className={`${sectionTitleClass} mb-2`}><Settings2 size={28} className="mr-3 text-indigo-600" /> Portfolio Details</h2>
//               <div className="space-y-6 pt-4">
//                 <div>
//                   <label htmlFor="portfolioTitle" className="block text-sm font-semibold text-gray-700 mb-1.5">Portfolio Title*</label>
//                   <input
//                     type="text"
//                     id="portfolioTitle"
//                     value={portfolioSettings.title}
//                     onChange={(e) => handleSettingChange('title', e.target.value)}
//                     className={inputBaseClass}
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="portfolioSlug" className="block text-sm font-semibold text-gray-700 mb-1.5">Custom URL Slug (Optional)</label>
//                   <div className="mt-1 flex rounded-md shadow-sm">
//                     <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-100 text-gray-500 sm:text-sm whitespace-nowrap">
//                       {typeof window !== 'undefined' ? `${window.location.origin}/portfolio/` : '/portfolio/'}
//                     </span>
//                     <input
//                       type="text"
//                       id="portfolioSlug"
//                       value={portfolioSettings.slug || ''}
//                       onChange={(e) => handleSettingChange('slug', e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''))}
//                       placeholder="your-unique-slug"
//                       className={`${inputBaseClass} !rounded-l-none focus:z-10`}
//                     />
//                   </div>
//                   <p className="mt-1.5 text-xs text-gray-500">Lowercase letters, numbers, hyphens. Auto-formats. Blank for unique ID.</p>
//                 </div>
//                 <div>
//                   <label htmlFor="portfolioTheme" className="block text-sm font-semibold text-gray-700 mb-1.5"><Palette size={18} className="inline mr-2 text-gray-500" />Portfolio Theme</label>
//                   <select
//                     id="portfolioTheme"
//                     name="theme"
//                     value={portfolioSettings.theme}
//                     onChange={(e) => handleSettingChange('theme', e.target.value)}
//                     className={`${inputBaseClass} appearance-none`}
//                   >
//                     {availableThemes.map(themeOption => (
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
//                       onChange={(e) => handleSettingChange('isPublic', e.target.checked)}
//                       className={`${checkboxClass} h-5 w-5 !text-green-600 focus:ring-green-500`}
//                     />
//                     <span className="font-semibold text-gray-800">Make this Portfolio Publicly Shareable</span>
//                   </label>
//                 </div>
//               </div>
//             </section>

//             <section className={sectionCardClass}>
//               <h2 className={`${sectionTitleClass}`}><EditIcon size={28} className="mr-3 text-indigo-600" /> Edit Portfolio Content</h2>
//               <p className="text-sm text-gray-500 mb-6 -mt-4">Tailor content for this portfolio. Visibility is controlled in the next section.</p>
//               <div className="space-y-4">
//                 <EditorCollapsibleSection title="Contact Information" icon={<UserCircle />} isVisible={true} initiallyOpen={false}>
//                   <div className="space-y-3 p-2">
//                     {portfolioSettings.displaySettings.contact.showFullName && (
//                       <div>
//                         <label className="block text-xs font-medium text-gray-600 capitalize mb-0.5">Full Name</label>
//                         <input
//                           type="text"
//                           value={portfolioSettings.publicFullName || ''}
//                           onChange={e => handlePublicContentChange('publicFullName', e.target.value)}
//                           className={inputBaseClass}
//                           placeholder="Full Name for portfolio display"
//                         />
//                       </div>
//                     )}
//                     {true && (
//                       <div>
//                         <label className="block text-xs font-medium text-gray-600 capitalize mb-0.5">Job Title / Headline</label>
//                         <input
//                           type="text"
//                           value={portfolioSettings.publicJobTitle || ''}
//                           onChange={e => handlePublicContentChange('publicJobTitle', e.target.value)}
//                           className={inputBaseClass}
//                           placeholder="Your professional headline"
//                         />
//                       </div>
//                     )}
//                     {portfolioSettings.displaySettings.contact.showEmail && (
//                       <div>
//                         <label className="block text-xs font-medium text-gray-600 capitalize mb-0.5">Email</label>
//                         <input
//                           type="email"
//                           value={portfolioSettings.publicEmail || ''}
//                           onChange={e => handlePublicContentChange('publicEmail', e.target.value)}
//                           className={inputBaseClass}
//                           placeholder="Contact email"
//                         />
//                       </div>
//                     )}
//                     {portfolioSettings.displaySettings.contact.showPhone && (
//                       <div>
//                         <label className="block text-xs font-medium text-gray-600 capitalize mb-0.5">Phone</label>
//                         <input
//                           type="tel"
//                           value={portfolioSettings.publicPhone || ''}
//                           onChange={e => handlePublicContentChange('publicPhone', e.target.value)}
//                           className={inputBaseClass}
//                           placeholder="Contact phone"
//                         />
//                       </div>
//                     )}
//                     {portfolioSettings.displaySettings.contact.showLocation && (
//                       <div>
//                         <label className="block text-xs font-medium text-gray-600 capitalize mb-0.5">Location</label>
//                         <input
//                           type="text"
//                           value={portfolioSettings.publicLocation || ''}
//                           onChange={e => handlePublicContentChange('publicLocation', e.target.value)}
//                           className={inputBaseClass}
//                           placeholder="City, Country"
//                         />
//                       </div>
//                     )}
//                     {portfolioSettings.displaySettings.contact.showLinkedIn && (
//                       <div>
//                         <label className="block text-xs font-medium text-gray-600 capitalize mb-0.5">LinkedIn URL</label>
//                         <input
//                           type="url"
//                           value={portfolioSettings.publicLinkedInUrl || ''}
//                           onChange={e => handlePublicContentChange('publicLinkedInUrl', e.target.value)}
//                           className={inputBaseClass}
//                           placeholder="LinkedIn Profile URL"
//                         />
//                       </div>
//                     )}
//                     {Object.values(portfolioSettings.displaySettings.contact || {}).every(v => !v) && (
//                       <p className="text-xs text-gray-500 italic">No contact fields are set to visible. Enable them in "Content Visibility" to edit their content here.</p>
//                     )}
//                   </div>
//                 </EditorCollapsibleSection>

//                 <EditorCollapsibleSection
//                   title="Summary"
//                   icon={<FileText />}
//                   isVisible={portfolioSettings.displaySettings.sections.showSummary}
//                   initiallyOpen={!!portfolioSettings.displaySettings.sections.showSummary}
//                 >
//                   <textarea
//                     value={portfolioSettings.publicSummary || ''}
//                     onChange={(e) => handlePublicContentChange('publicSummary', e.target.value)}
//                     rows={6}
//                     className={textareaBaseClass}
//                     placeholder="Portfolio Summary"
//                   />
//                   {sourceDraft?.wizardSummary && portfolioSettings.publicSummary !== sourceDraft.wizardSummary && (
//                     <button
//                       type="button"
//                       onClick={() => handlePublicContentChange('publicSummary', sourceDraft.wizardSummary || '')}
//                       className="text-xs text-indigo-600 hover:underline mt-1.5"
//                     >
//                       Reset to draft summary
//                     </button>
//                   )}
//                 </EditorCollapsibleSection>

//                 <EditorCollapsibleSection
//                   title="Skills"
//                   icon={<Layers />}
//                   isVisible={portfolioSettings.displaySettings.sections.showSkills}
//                 >
//                   <label className="block text-xs font-medium text-gray-600 mb-1">Skills (comma-separated)</label>
//                   <textarea
//                     value={(portfolioSettings.publicSkills || []).join(', ')}
//                     onChange={(e) => handlePublicContentChange('publicSkills', e.target.value.split(',').map(s=>s.trim()))}
//                     rows={3}
//                     className={textareaBaseClass}
//                     placeholder="e.g., React, Project Management"
//                   />
//                   {sourceDraft?.wizardSkills && JSON.stringify(portfolioSettings.publicSkills?.map(s=>s.trim()).filter(Boolean)) !== JSON.stringify((sourceDraft.wizardSkills || []).map(s=>s.trim()).filter(Boolean)) && (
//                     <button
//                       type="button"
//                       onClick={() => handlePublicContentChange('publicSkills', sourceDraft.wizardSkills || [])}
//                       className="text-xs text-indigo-600 hover:underline mt-1.5"
//                     >
//                       Reset to draft skills
//                     </button>
//                   )}
//                 </EditorCollapsibleSection>

//                 {['WorkExperience', 'Education', 'Volunteering', 'Certifications'].map(sectionKey => {
//                   const displayKey = `show${sectionKey}` as keyof LivingPortfolioDisplaySettings['sections'];
//                   if (portfolioSettings.displaySettings.sections[displayKey]) {
//                     const IconComponent = sectionKey === 'WorkExperience' ? Briefcase : sectionKey === 'Education' ? GraduationCap : sectionKey === 'Volunteering' ? Gift : ShieldCheck;
//                     return (
//                       <EditorCollapsibleSection
//                         key={`edit-${sectionKey}`}
//                         title={`Public ${sectionKey.replace(/([A-Z])/g, ' $1').trim()} (Snapshot)`}
//                         icon={<IconComponent />}
//                         isVisible={true}
//                       >
//                         <div className="p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start gap-2">
//                           <Info size={20} className="text-amber-600 flex-shrink-0 mt-0.5"/>
//                           <p className="text-xs text-gray-700 italic">
//                             Content for <strong>{sectionKey.replace(/([A-Z])/g, ' $1').toLowerCase()}</strong> is snapshotted from your resume draft.
//                             To edit individual items (e.g., specific jobs, degrees, bullets), please update your <a href={`/wizard?step=3`} className="font-medium text-indigo-600 hover:underline">Resume Draft in the Wizard</a>.
//                           </p>
//                         </div>
//                       </EditorCollapsibleSection>
//                     );
//                   }
//                   return null;
//                 })}

//                 {portfolioSettings.displaySettings.narrativeSuite.showCareerNarrative && (
//                   <EditorCollapsibleSection title="Career Narrative" icon={<MessageSquareQuote />}>
//                     <textarea
//                       value={portfolioSettings.publicCareerNarrative || ''}
//                       onChange={(e) => handlePublicContentChange('publicCareerNarrative', e.target.value)}
//                       rows={5}
//                       className={textareaBaseClass}
//                     />
//                     {sourceDraft?.aiCareerNarrative && portfolioSettings.publicCareerNarrative !== sourceDraft.aiCareerNarrative && (
//                       <button
//                         type="button"
//                         onClick={() => handlePublicContentChange('publicCareerNarrative', sourceDraft.aiCareerNarrative || '')}
//                         className="text-xs text-indigo-600 hover:underline mt-1.5"
//                       >
//                         Reset to AI narrative
//                       </button>
//                     )}
//                   </EditorCollapsibleSection>
//                 )}
//                 {portfolioSettings.displaySettings.narrativeSuite.showGoldenThread && (
//                   <EditorCollapsibleSection title="Golden Thread" icon={<Zap />}>
//                     <input
//                       type="text"
//                       value={portfolioSettings.publicGoldenThread || ''}
//                       onChange={(e) => handlePublicContentChange('publicGoldenThread', e.target.value)}
//                       className={inputBaseClass}
//                     />
//                     {sourceDraft?.aiGoldenThread && portfolioSettings.publicGoldenThread !== sourceDraft.aiGoldenThread && (
//                       <button
//                         type="button"
//                         onClick={() => handlePublicContentChange('publicGoldenThread', sourceDraft.aiGoldenThread || '')}
//                         className="text-xs text-indigo-600 hover:underline mt-1.5"
//                       >
//                         Reset to AI golden thread
//                       </button>
//                     )}
//                   </EditorCollapsibleSection>
//                 )}
//                 {portfolioSettings.displaySettings.narrativeSuite.showKeyThemes && (
//                   <EditorCollapsibleSection title="Key Themes (Snapshot)" icon={<Sparkles />} >
//                     <div className="p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start gap-2">
//                       <Info size={16} className="text-amber-600 flex-shrink-0 mt-0.5"/>
//                       <p className="text-xs text-gray-500 italic">Content from draft. Edit via AI Suite in Wizard.</p>
//                     </div>
//                   </EditorCollapsibleSection>
//                 )}
//                 {portfolioSettings.displaySettings.narrativeSuite.showHiddenGems && (
//                   <EditorCollapsibleSection title="Hidden Gems (Snapshot)" icon={<ThumbsUp />} >
//                     <div className="p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start gap-2">
//                       <Info size={16} className="text-amber-600 flex-shrink-0 mt-0.5"/>
//                       <p className="text-xs text-gray-500 italic">Content from draft. Edit via AI Suite in Wizard.</p>
//                     </div>
//                   </EditorCollapsibleSection>
//                 )}
//                 {portfolioSettings.displaySettings.narrativeSuite.showGoldenThread && portfolioSettings.publicGoldenThreadEvidence && portfolioSettings.publicGoldenThreadEvidence.length > 0 && (
//                   <EditorCollapsibleSection title="Golden Thread Evidence (Snapshot)" icon={<ListChecks />} >
//                     <div className="p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start gap-2">
//                       <Info size={16} className="text-amber-600 flex-shrink-0 mt-0.5"/>
//                       <p className="text-xs text-gray-500 italic">Content from draft. Edit via AI Suite in Wizard.</p>
//                     </div>
//                   </EditorCollapsibleSection>
//                 )}
//               </div>
//             </section>

//             <section className={sectionCardClass}>
//               <h2 className={`${sectionTitleClass} mb-2`}><Eye size={28} className="mr-3 text-indigo-600" /> Content Visibility Toggles</h2>
//               <p className="text-sm text-gray-500 mb-6 -mt-4">Choose which sections will appear on your public portfolio.</p>
//               <div className="space-y-6 pt-4">
//                 <div>
//                   <h3 className={subSectionTitleClass}>Contact Information:</h3>
//                   <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3 pt-1">
//                     {(Object.keys(portfolioSettings.displaySettings.contact) as Array<keyof LivingPortfolioDisplaySettings['contact']>).map(key => (
//                       <label key={`ds-contact-${key}`} className={checkboxLabelClass}>
//                         <input
//                           type="checkbox"
//                           checked={!!portfolioSettings.displaySettings.contact[key]}
//                           onChange={(e) => handleSettingChange('displaySettings', `contact.${key}`, e.target.checked)}
//                           className={checkboxClass}
//                         />
//                         <span>{key.substring(4).replace(/([A-Z])/g, ' $1').trim()}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="pt-5 border-t border-gray-200">
//                   <h3 className={subSectionTitleClass}>Standard Resume Sections:</h3>
//                   <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3 pt-1">
//                     {(Object.keys(portfolioSettings.displaySettings.sections) as Array<keyof LivingPortfolioDisplaySettings['sections']>).map(key => (
//                       <label key={`ds-section-${key}`} className={checkboxLabelClass}>
//                         <input
//                           type="checkbox"
//                           checked={!!portfolioSettings.displaySettings.sections[key]}
//                           onChange={(e) => handleSettingChange('displaySettings', `sections.${key}`, e.target.checked)}
//                           className={checkboxClass}
//                         />
//                         <span>{key.substring(4).replace(/([A-Z])/g, ' $1').trim()}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//                 {sourceDraft?.aiCareerNarrative && (
//                   <div className="pt-5 border-t border-gray-200">
//                     <h3 className={subSectionTitleClass}>AI Narrative Suite Elements:</h3>
//                     <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3 pt-1">
//                       {(Object.keys(portfolioSettings.displaySettings.narrativeSuite) as Array<keyof LivingPortfolioDisplaySettings['narrativeSuite']>).map(key => (
//                         <label key={`ds-narrative-${key}`} className={checkboxLabelClass}>
//                           <input
//                             type="checkbox"
//                             checked={!!portfolioSettings.displaySettings.narrativeSuite[key]}
//                             onChange={(e) => handleSettingChange('displaySettings', `narrativeSuite.${key}`, e.target.checked)}
//                             className={checkboxClass}
//                           />
//                           <span>{key.substring(4).replace(/([A-Z])/g, ' $1').trim()}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </section>

//             {sourceDraft?.aiWhatIfResultsCache && sourceDraft.aiWhatIfResultsCache.length > 0 && (
//               <section className={sectionCardClass}>
//                 <h2 className={`${sectionTitleClass} mb-2`}><Brain size={28} className="mr-3 text-indigo-600" /> Showcase "What If?" Scenarios</h2>
//                 <p className="text-sm text-gray-600 mb-4 pt-2">Select AI-generated scenarios from your resume draft to include.</p>
//                 <div className="max-h-80 overflow-y-auto space-y-1.5 p-4 border bg-slate-50 rounded-lg shadow-inner">
//                   {sourceDraft.aiWhatIfResultsCache.map((whatIfItem) => (
//                     <label
//                       key={`editor-whatif-${whatIfItem.scenarioText.replace(/\s+/g, '-')}`}
//                       className={`${checkboxLabelClass} p-3 hover:bg-indigo-100 rounded-md transition-colors block w-full border border-gray-200 hover:border-indigo-200`}
//                     >
//                       <input
//                         type="checkbox"
//                         checked={portfolioSettings.selectedPublicWhatIfs.some(pwi => pwi.scenarioText === whatIfItem.scenarioText)}
//                         onChange={() => handleToggleWhatIf(whatIfItem)}
//                         className={`${checkboxClass} !text-teal-600 focus:ring-teal-500 mr-3`}
//                       />
//                       <span className="text-gray-800 font-medium" title={whatIfItem.scenarioText}>"{whatIfItem.scenarioText}"</span>
//                     </label>
//                   ))}
//                 </div>
//               </section>
//             )}

//             <section className={`${sectionCardClass} space-y-6`}> {/* Showcase Sections */}
//               <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-gray-200 pb-4">
//                 <h2 className={`${sectionTitleClass} mb-0 pb-0 border-b-0`}><Layers size={28} className="mr-3 text-indigo-600" /> Custom Showcase Sections</h2>
//                 <button
//                   type="button"
//                   onClick={addShowcaseSection}
//                   className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 shadow-md flex items-center gap-2 transition-colors shrink-0"
//                 >
//                   <Plus size={18} /> Add New Section
//                 </button>
//               </div>
//               {portfolioSettings.showcaseSections.length === 0 && (
//                 <div className="text-center py-8 px-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
//                   <FolderKanban className="mx-auto h-12 w-12 text-gray-400" strokeWidth={1.5} />
//                   <h3 className="mt-2 text-lg font-medium text-gray-900">No showcase sections yet</h3>
//                   <p className="mt-1 text-sm text-gray-500">Add a section to highlight projects, skills, or experiences.</p>
//                 </div>
//               )}
//               <div className="space-y-8">
//                 <SortableContext items={portfolioSettings.showcaseSections.map(s => s.id)} strategy={verticalListSortingStrategy}>
//                   {portfolioSettings.showcaseSections.map((section) => (
//                     <SortableShowcaseSection
//                       key={section.id}
//                       section={section}
//                       updateShowcaseSectionTitle={updateShowcaseSectionTitle}
//                       deleteShowcaseSection={deleteShowcaseSection}
//                     >
//                       {section.items.length === 0 && <p className="text-sm text-gray-500 italic text-center py-3">No items. Click "+ Add Item" below.</p>}
//                       <div className="space-y-1">
//                         <SortableContext items={section.items.map(i => i.id)} strategy={verticalListSortingStrategy}>
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
//                         className="mt-4 px-4 py-2 bg-indigo-500 text-white text-sm font-semibold rounded-lg hover:bg-indigo-600 shadow flex items-center gap-2 transition-colors"
//                       >
//                         <Plus size={16} strokeWidth={3} />
//                         Add Item to "{section.title.length > 20 ? section.title.substring(0,20) + '...' : section.title}"
//                       </button>
//                     </SortableShowcaseSection>
//                   ))}
//                 </SortableContext>
//               </div>
//             </section>

//             <div className="pt-10 border-t-2 border-gray-300 mt-12 flex flex-col sm:flex-row justify-end items-center gap-4">
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
//                 {isProcessing ? "Processing..." : (editingPortfolioId ? "Update Portfolio" : "Save & Publish Portfolio")}
//               </button>
//             </div>
//           </div>
//         </DndContext>

//         <aside className="lg:col-span-1 space-y-6">
//           <div className="p-6 bg-slate-200 rounded-xl shadow-xl sticky top-10 border border-slate-300">
//             <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-slate-400 pb-3 flex items-center">
//               <FileText size={24} className="mr-3 text-slate-700" /> Source Draft Context
//             </h3>
//             {sourceDraft?.wizardPersonalData?.fullName && <p className="text-sm mb-2"><strong className="text-slate-700 font-semibold">Name:</strong> {sourceDraft.wizardPersonalData.fullName}</p>}
//             {sourceDraft?.wizardSummary && <div className="mb-3"><strong className="text-slate-700 text-sm font-semibold block mb-0.5">Summary Snippet:</strong> <p className="text-xs italic text-gray-700 bg-white p-2 rounded-md shadow-sm">"{sourceDraft.wizardSummary.substring(0,150)}..."</p></div>}
//             {sourceDraft?.aiCareerNarrative && <div className="mb-3"><strong className="text-slate-700 text-sm font-semibold block mb-0.5">AI Narrative Snippet:</strong> <p className="text-xs italic text-gray-700 bg-white p-2 rounded-md shadow-sm">"{sourceDraft.aiCareerNarrative.substring(0,150)}..."</p></div>}
//             {sourceDraft?.aiGoldenThread && <p className="text-sm mb-3"><strong className="text-slate-700 font-semibold">Golden Thread:</strong> <span className="italic text-purple-700 font-semibold">{sourceDraft.aiGoldenThread}</span></p>}
//             <p className="text-xs text-slate-600 mt-5 border-t border-slate-400 pt-3">Read-only view of your resume draft. Use the editor on the left to build your Living Portfolio.</p>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// }
