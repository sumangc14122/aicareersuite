// // // src/app/portfolio/[identifier]/page.tsx
// // import prisma from "@/lib/prisma";
// // import { notFound } from "next/navigation";
// // import { Metadata } from "next";
// // import { clsx } from "clsx";
// // import React, { Suspense } from "react";
// // import { currentUser } from "@clerk/nextjs/server";
// // import Link from "next/link";

// // // Icons from lucide-react
// // import {
// //   Briefcase,
// //   GraduationCap,
// //   Sparkles,
// //   Zap,
// //   ChevronRight,
// //   ExternalLink,
// //   Youtube,
// //   Link as LinkIcon,
// //   Lightbulb,
// //   Award,
// //   Brain,
// //   ThumbsUp,
// //   Eye,
// //   Mail,
// //   Phone,
// //   Linkedin,
// //   MapPin,
// //   Gift,
// //   ShieldCheck,
// //   Edit,
// //   Lock,
// // } from "lucide-react";

// // import { AnimatedSection } from "@/components/AnimatedSection";
// // import { TableOfContents } from "@/components/TableOfContents";

// // import { ResumeJSON } from "@/components/ATSScore";
// // import {
// //   WhatIfResult,
// //   GoldenThreadEvidence as AIGoldenThreadEvidence,
// //   HiddenGemsResult,
// //   InitialNarrativeResult,
// // } from "@/components/NarrativeWeaver";

// // // --- Helper to check if a string is a UUID ---
// // function isUuid(s: string): boolean {
// //   if (!s) return false;
// //   const uuidRegex =
// //     /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
// //   return uuidRegex.test(s);
// // }

// // // --- PortfolioData Interface & defaultDisplaySettings ---
// // interface PortfolioDisplaySettings {
// //   contact: {
// //     showEmail?: boolean;
// //     showPhone?: boolean;
// //     showLocation?: boolean;
// //     showLinkedIn?: boolean;
// //     showPhoto?: boolean;
// //   };
// //   sections: {
// //     showSummary?: boolean;
// //     showSkills?: boolean;
// //     showWorkExperience?: boolean;
// //     showEducation?: boolean;
// //     showVolunteering?: boolean;
// //     showCertifications?: boolean;
// //     showReferences?: boolean;
// //   };
// //   narrativeSuite: {
// //     showCareerNarrative?: boolean;
// //     showGoldenThread?: boolean;
// //     showKeyThemes?: boolean;
// //     showHiddenGems?: boolean;
// //   };
// // }
// // interface PortfolioShowcaseItem {
// //   id: string;
// //   name: string;
// //   description: string;
// //   link?: string;
// //   skillsUsed?: string[];
// // }
// // interface PortfolioShowcaseSection {
// //   id: string;
// //   title: string;
// //   items: PortfolioShowcaseItem[];
// // }
// // interface VolunteeringItem {
// //   organization?: string;
// //   role?: string;
// //   startDate?: string;
// //   endDate?: string;
// //   bullets?: string[];
// //   [key: string]: unknown; // For flexibility with JSON fields
// // }
// // interface PortfolioData {
// //   id: string;
// //   title: string;
// //   isPublic: boolean;
// //   theme: string;
// //   publicFullName?: string | null;
// //   publicJobTitle?: string | null;
// //   publicEmail?: string | null;
// //   publicPhone?: string | null;
// //   publicLocation?: string | null;
// //   publicLinkedInUrl?: string | null;
// //   publicSummary?: string | null;
// //   publicSkills?: string[] | null;
// //   publicWorkExperiences?: ResumeJSON["workExperiences"] | null;
// //   publicEducations?: ResumeJSON["educations"] | null;
// //   publicVolunteering?: VolunteeringItem[] | null;
// //   publicCertifications?: ResumeJSON["certifications"] | null;
// //   publicCareerNarrative?: string | null;
// //   publicGoldenThread?: string | null;
// //   publicGoldenThreadEvidence?: AIGoldenThreadEvidence[] | null;
// //   publicKeyThemes?: InitialNarrativeResult["keyThemes"] | null;
// //   publicHiddenGems?: HiddenGemsResult | null;
// //   publicWhatIfScenarios?: Array<{
// //     scenarioText: string;
// //     adaptedResult: WhatIfResult;
// //   }> | null;
// //   showcaseSections?: PortfolioShowcaseSection[] | null;
// //   displaySettings?: PortfolioDisplaySettings | null;
// //   isOwnerViewing?: boolean | null | undefined; // Updated to allow null
// // }

// // const defaultDisplaySettings: PortfolioDisplaySettings = {
// //   contact: {
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

// // async function getPortfolioData(
// //   identifier: string,
// // // ): Promise<(PortfolioData & { isOwnerViewing?: boolean }) | null | undefined> {
// // ): Promise<(PortfolioData & { isOwnerViewing?: boolean | null | undefined }) | null> {
// //   let portfolioRecord;
// //   const viewer = await currentUser();

// //   if (isUuid(identifier)) {
// //     portfolioRecord = await prisma.livingPortfolio.findUnique({
// //       where: { id: identifier },
// //       include: { profile: { select: { userId: true } } },
// //     });
// //   } else {
// //     portfolioRecord = await prisma.livingPortfolio.findUnique({
// //       where: { slug: identifier },
// //       include: { profile: { select: { userId: true } } },
// //     });
// //   }

// //   if (!portfolioRecord) {
// //     return null;
// //   }

// //   const isOwner = viewer && portfolioRecord.profile?.userId === viewer.id;

// //   if (!portfolioRecord.isPublic && !isOwner) {
// //     return null;
// //   }

// //   const displaySettings =
// //     (portfolioRecord.displaySettings as PortfolioDisplaySettings | null) ||
// //     defaultDisplaySettings;

// //   return {
// //     id: portfolioRecord.id,
// //     title: portfolioRecord.title,
// //     isPublic: portfolioRecord.isPublic,
// //     theme: portfolioRecord.theme || "default",
// //     isOwnerViewing: isOwner,
// //     publicFullName: portfolioRecord.publicFullName,
// //     publicJobTitle: portfolioRecord.publicJobTitle,
// //     publicEmail: portfolioRecord.publicEmail,
// //     publicPhone: portfolioRecord.publicPhone,
// //     publicLocation: portfolioRecord.publicLocation,
// //     publicLinkedInUrl: portfolioRecord.publicLinkedInUrl,
// //     publicSummary: portfolioRecord.publicSummary,
// //     publicSkills: portfolioRecord.publicSkills as string[] | null,
// //     publicWorkExperiences: portfolioRecord.publicWorkExperiences as
// //       | ResumeJSON["workExperiences"]
// //       | null,
// //     publicEducations: portfolioRecord.publicEducations as
// //       | ResumeJSON["educations"]
// //       | null,
// //     publicVolunteering: portfolioRecord.publicVolunteering as
// //       | VolunteeringItem[]
// //       | null,
// //     publicCertifications: portfolioRecord.publicCertifications as
// //       | ResumeJSON["certifications"]
// //       | null,
// //     publicCareerNarrative: portfolioRecord.publicCareerNarrative,
// //     publicGoldenThread: portfolioRecord.publicGoldenThread,
// //     publicGoldenThreadEvidence: portfolioRecord.publicGoldenThreadEvidence as
// //       | AIGoldenThreadEvidence[]
// //       | null,
// //     publicKeyThemes: portfolioRecord.publicKeyThemes as
// //       | InitialNarrativeResult["keyThemes"]
// //       | null,
// //     publicHiddenGems: portfolioRecord.publicHiddenGems as HiddenGemsResult | null,
// //     publicWhatIfScenarios: portfolioRecord.publicWhatIfScenarios as Array<{
// //       scenarioText: string;
// //       adaptedResult: WhatIfResult;
// //     }> | null,
// //     showcaseSections: portfolioRecord.showcaseSections as
// //       | PortfolioShowcaseSection[]
// //       | null,
// //     displaySettings: displaySettings,
// //   };
// // }

// // // export async function generateMetadata({
// // //   params,
// // // }: {
// // //   params: { identifier: string };
// // // }): Promise<Metadata> {
// // //   const { identifier } = params;
// // //   if (!identifier) return { title: "Portfolio Not Found" };
// // //   const portfolio = await getPortfolioData(identifier);
// // //   if (!portfolio) return { title: "Portfolio Not Found" };
// // //   return {
// // //     title: `${portfolio.publicFullName || portfolio.title || "Career Portfolio"} | Resume Wizard Pro`,
// // //     description:
// // //       portfolio.publicSummary ||
// // //       `View the interactive career portfolio of ${portfolio.publicFullName || portfolio.title}. Created with Resume Wizard Pro.`,
// // //   };
// // // }

// // export async function generateMetadata({
// //   params,
// // }: {
// //   params: Record<string, string>;
// // }): Promise<Metadata> {
// //   const { identifier } = params;
// //   if (!identifier) return { title: "Portfolio Not Found" };
// //   const portfolio = await getPortfolioData(identifier);
// //   if (!portfolio) return { title: "Portfolio Not Found" };
// //   return {
// //     title: `${portfolio.publicFullName || portfolio.title || "Career Portfolio"} | Resume Wizard Pro`,
// //     description:
// //       portfolio.publicSummary ||
// //       `View the interactive career portfolio of ${portfolio.publicFullName || portfolio.title}. Created with Resume Wizard Pro.`,
// //   };
// // }

// // // This class is your original base for card-like sections.
// // // Themes in globals.css will target `.portfolio-section` for overrides.
// // const sectionCardClass = "bg-white p-6 sm:p-8 rounded-xl shadow-xl";
// // // Your original title class, themes will target `.portfolio-section-title`
// // const sectionTitleClassPublic = "text-3xl md:text-4xl font-bold text-gray-800";

// // const PortfolioSectionWrapper: React.FC<{
// //   id: string;
// //   title?: string;
// //   children: React.ReactNode;
// //   isVisible?: boolean;
// //   className?: string;
// //   icon?: React.ReactNode;
// //   titleClassName?: string;
// //   contentClassName?: string;
// //   animationDelay?: number;
// // }> = ({
// //   id,
// //   title,
// //   children,
// //   isVisible = true,
// //   className = "",
// //   icon,
// //   titleClassName = "",
// //   contentClassName = "",
// //   animationDelay = 0,
// // }) => {
// //   if (!isVisible) return null;

// //   const hasContent =
// //     React.Children.count(children) > 0 ||
// //     (Array.isArray(children) &&
// //       children.length > 0 &&
// //       children.some((child) => child !== null && child !== undefined));
// //   if (!title && !hasContent) return null;

// //   return (
// //     // The `className` prop (e.g., sectionCardClass) provides the base card styling.
// //     // Added `portfolio-section` for generic theme targeting from globals.css.
// //     <AnimatedSection
// //       id={id}
// //       delay={animationDelay}
// //       className={clsx("portfolio-section", "py-8 md:py-10", className)}
// //     >
// //       {title && (
// //         <div className="mb-6 flex items-center md:mb-8">
// //           {/* THEME HOOK for icon color/style */}
// //           {icon && (
// //             <span
// //               className={clsx(
// //                 "portfolio-section-icon",
// //                 "mr-4 flex-shrink-0 scale-125 text-indigo-600",
// //               )}
// //             >
// //               {icon}
// //             </span>
// //           )}
// //           {/* THEME HOOK for title color/style, uses sectionTitleClassPublic as base */}
// //           <h2
// //             className={clsx(
// //               "portfolio-section-title",
// //               sectionTitleClassPublic,
// //               titleClassName,
// //             )}
// //           >
// //             {title}
// //           </h2>
// //         </div>
// //       )}
// //       {hasContent ? (
// //         // THEME HOOK for prose content styling
// //         <div
// //           className={clsx(
// //             "portfolio-prose",
// //             "prose prose-slate max-w-none leading-relaxed text-gray-700 lg:prose-lg",
// //             contentClassName,
// //           )}
// //         >
// //           {children}
// //         </div>
// //       ) : title ? (
// //         <p className="italic text-gray-500">
// //           No content to display for this section.
// //         </p>
// //       ) : null}
// //     </AnimatedSection>
// //   );
// // };

// // // Helper to identify YouTube links (remains the same, but usage changes to simple link)
// // function getYouTubeVideoId(url: string): string | null {
// //   const regExp =
// //     /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
// //   const match = url.match(regExp);
// //   return match && match[2].length === 11 ? match[2] : null;
// // }

// // export default async function LivingPortfolioPage({
// //   params,
// // }: {
// //   params: Record<string, string>;
// // }): Promise<JSX.Element> {
// //   const { identifier } = params;
// //   if (!identifier) notFound();
// //   const portfolio = await getPortfolioData(identifier);
// //   if (!portfolio) notFound();

// //   const ds = portfolio.displaySettings || defaultDisplaySettings;
// //   const hasContactInfo =
// //     ds.contact?.showEmail ||
// //     ds.contact?.showLinkedIn ||
// //     ds.contact?.showLocation ||
// //     ds.contact?.showPhone;
// //   const currentTheme = portfolio.theme || "default";

// //   const tocItems: {
// //     id: string;
// //     title: string;
// //     level: number;
// //     icon?: React.ReactNode;
// //   }[] = [];
// //   const animationDelaysMap = new Map<string, number>();
// //   let currentDelay = 0.1;
// //   const delayIncrement = 0.15;

// //   const addSectionToTocAndDelay = (
// //     condition: boolean | undefined | null,
// //     id: string,
// //     title: string,
// //     icon?: React.ReactNode,
// //     level: number = 1,
// //   ) => {
// //     if (condition) {
// //       tocItems.push({ id, title, level, icon });
// //       animationDelaysMap.set(id, currentDelay);
// //       currentDelay += delayIncrement;
// //     }
// //   };

// //   addSectionToTocAndDelay(true, "hero", "Top Section", <Eye />);
// //   addSectionToTocAndDelay(
// //     ds.narrativeSuite?.showCareerNarrative && !!portfolio.publicCareerNarrative,
// //     "hero-narrative",
// //     "Career Narrative",
// //     <Eye />,
// //   );
// //   addSectionToTocAndDelay(
// //     ds.narrativeSuite?.showGoldenThread && !!portfolio.publicGoldenThread,
// //     "golden-thread",
// //     "Golden Thread",
// //     <Zap />,
// //   );
// //   addSectionToTocAndDelay(
// //     ds.sections?.showSummary && !!portfolio.publicSummary,
// //     "summary",
// //     "Professional Summary",
// //     <Briefcase />,
// //   );
// //   addSectionToTocAndDelay(
// //     ds.narrativeSuite?.showKeyThemes &&
// //       !!portfolio.publicKeyThemes &&
// //       portfolio.publicKeyThemes.length > 0,
// //     "key-themes",
// //     "Key Themes",
// //     <Sparkles />,
// //   );
// //   addSectionToTocAndDelay(
// //     ds.sections?.showSkills &&
// //       !!portfolio.publicSkills &&
// //       portfolio.publicSkills.length > 0,
// //     "skills",
// //     "Skills",
// //     <Lightbulb />,
// //   );
// //   addSectionToTocAndDelay(
// //     ds.sections?.showWorkExperience &&
// //       !!portfolio.publicWorkExperiences &&
// //       portfolio.publicWorkExperiences.length > 0,
// //     "experience",
// //     "Experience",
// //     <Briefcase />,
// //   );

// //   let mainShowcaseAddedToToc = false;
// //   if (portfolio.showcaseSections && portfolio.showcaseSections.length > 0) {
// //     portfolio.showcaseSections.forEach((sec) => {
// //       if (sec.items && sec.items.length > 0) {
// //         if (!mainShowcaseAddedToToc) {
// //           addSectionToTocAndDelay(true, "showcase-main", "Showcase", <Award />);
// //           mainShowcaseAddedToToc = true;
// //         }
// //         addSectionToTocAndDelay(
// //           true,
// //           `showcase-${sec.id}`,
// //           sec.title,
// //           <ChevronRight />,
// //           2,
// //         );
// //       }
// //     });
// //   }

// //   addSectionToTocAndDelay(
// //     ds.sections?.showEducation &&
// //       !!portfolio.publicEducations &&
// //       portfolio.publicEducations.length > 0,
// //     "education",
// //     "Education",
// //     <GraduationCap />,
// //   );
// //   addSectionToTocAndDelay(
// //     ds.sections?.showVolunteering &&
// //       !!portfolio.publicVolunteering &&
// //       portfolio.publicVolunteering.length > 0,
// //     "volunteering",
// //     "Volunteering",
// //     <Gift />,
// //   );
// //   addSectionToTocAndDelay(
// //     ds.sections?.showCertifications &&
// //       !!portfolio.publicCertifications &&
// //       portfolio.publicCertifications.length > 0,
// //     "certifications",
// //     "Certifications",
// //     <ShieldCheck />,
// //   );
// //   addSectionToTocAndDelay(
// //     !!portfolio.publicWhatIfScenarios &&
// //       portfolio.publicWhatIfScenarios.length > 0,
// //     "what-if",
// //     '"What If?" Scenarios',
// //     <Brain />,
// //   );
// //   addSectionToTocAndDelay(
// //     ds.narrativeSuite?.showHiddenGems &&
// //       !!portfolio.publicHiddenGems &&
// //       portfolio.publicHiddenGems.hiddenGems.length > 0,
// //     "hidden-gems",
// //     "Hidden Gems",
// //     <ThumbsUp />,
// //   );

// //   return (
// //     // THEME HOOK: Root theme class applied here
// //     <div
// //       className={clsx(
// //         "min-h-screen font-sans", // Base font
// //         `theme-${currentTheme}`, // Applies theme like theme-default, theme-modern-dark
// //         // Original gradient, themes might override body/html or this div's background
// //         "bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200",
// //       )}
// //     >
// //       <Suspense fallback={null}>
// //         <TableOfContents items={tocItems} />
// //       </Suspense>

// //       {portfolio.isOwnerViewing && !portfolio.isPublic && (
// //         <div className="sticky top-0 z-40 border-b-2 border-yellow-400 bg-yellow-100 p-4 text-center text-sm text-yellow-800 shadow-md">
// //           <div className="container mx-auto flex items-center justify-center gap-2">
// //             <Lock size={16} />
// //             You are viewing this portfolio in **Private Preview Mode**. It is
// //             not yet visible to others.
// //             <Link
// //               href={`/portfolio-editor/${portfolio.id}`}
// //               className="ml-3 rounded-md bg-yellow-500 px-3 py-1 text-xs font-semibold text-white shadow transition-colors hover:bg-yellow-600"
// //             >
// //               Edit & Publish
// //             </Link>
// //           </div>
// //         </div>
// //       )}

// //       {portfolio.isOwnerViewing && (
// //         <div className="fixed bottom-6 right-6 z-50 lg:bottom-8 lg:right-8">
// //           <Link
// //             href={`/portfolio-editor/${portfolio.id}`}
// //             className="flex transform items-center gap-2 rounded-full bg-indigo-600 px-5 py-3 text-white shadow-xl transition-all duration-200 ease-in-out hover:scale-105 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
// //             title="Edit this Portfolio"
// //           >
// //             <Edit size={18} />
// //             <span className="text-sm font-medium">Edit Portfolio</span>
// //           </Link>
// //         </div>
// //       )}

// //       {/* THEME HOOK: Main content container */}
// //       <div
// //         className={clsx(
// //           "portfolio-page-container", // Generic class for themes to target page content area
// //           "container mx-auto overflow-x-hidden px-4 py-12 md:py-20",
// //           "max-w-5xl",
// //           "lg:pl-20", // Original layout classes
// //         )}
// //       >
// //         {/* --- Hero Section --- */}
// //         {/* THEME HOOK: Hero section block */}
// //         <AnimatedSection
// //           id="hero"
// //           delay={animationDelaysMap.get("hero") || 0}
// //           className={clsx(
// //             "portfolio-header", // Generic class for themes to target header
// //             "mb-16 rounded-xl bg-white p-6 text-center shadow-2xl md:mb-24", // Original styling
// //           )}
// //         >
// //           {ds.contact?.showPhoto && (
// //             // Avatar styling can be enhanced per theme by targeting .portfolio-header .avatar-initials-bg etc.
// //             <div
// //               className={clsx(
// //                 "mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full shadow-lg ring-4 sm:h-36 sm:w-36",
// //                 "bg-indigo-100 ring-white", // Default avatar style
// //                 "avatar-container", // More specific class if needed for theme
// //               )}
// //             >
// //               <span
// //                 className={clsx(
// //                   "text-5xl font-semibold",
// //                   "text-indigo-600", // Default initials color
// //                   "avatar-initials", // More specific class
// //                 )}
// //               >
// //                 {portfolio.publicFullName
// //                   ?.split(" ")
// //                   .map((n) => n[0])
// //                   .join("")
// //                   .toUpperCase() || "U"}
// //               </span>
// //             </div>
// //           )}
// //           {/* h1 and p are children of .portfolio-header, styled by theme CSS */}
// //           <h1 className="mb-3 text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
// //             {portfolio.publicFullName || portfolio.title}
// //           </h1>
// //           {portfolio.publicJobTitle && (
// //             <p className="mb-6 text-xl font-semibold text-indigo-700 sm:text-2xl">
// //               {portfolio.publicJobTitle}
// //             </p>
// //           )}
// //           {hasContactInfo && (
// //             // THEME HOOK: Contact info block
// //             <div
// //               className={clsx(
// //                 "portfolio-contact-info", // Generic class for themes
// //                 "mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-gray-600", // Original styling
// //               )}
// //             >
// //               {/* THEME HOOK: Individual contact links */}
// //               {ds.contact?.showEmail && portfolio.publicEmail && (
// //                 <a
// //                   href={`mailto:${portfolio.publicEmail}`}
// //                   className={clsx(
// //                     "portfolio-link",
// //                     "flex items-center text-sm transition-colors hover:text-indigo-700 sm:text-base",
// //                   )}
// //                 >
// //                   <Mail size={18} className="mr-1.5 text-indigo-500" />{" "}
// //                   {portfolio.publicEmail}
// //                 </a>
// //               )}
// //               {ds.contact?.showPhone && portfolio.publicPhone && (
// //                 <span className="flex items-center text-sm sm:text-base">
// //                   <Phone size={18} className="mr-1.5 text-indigo-500" />{" "}
// //                   {portfolio.publicPhone}
// //                 </span>
// //               )}
// //               {ds.contact?.showLocation && portfolio.publicLocation && (
// //                 <span className="flex items-center text-sm sm:text-base">
// //                   <MapPin size={18} className="mr-1.5 text-indigo-500" />{" "}
// //                   {portfolio.publicLocation}
// //                 </span>
// //               )}
// //               {ds.contact?.showLinkedIn && portfolio.publicLinkedInUrl && (
// //                 <a
// //                   href={portfolio.publicLinkedInUrl}
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   className={clsx(
// //                     "portfolio-link",
// //                     "flex items-center text-sm font-medium text-indigo-700 transition-colors hover:text-indigo-800 sm:text-base",
// //                   )}
// //                 >
// //                   <Linkedin size={18} className="mr-1.5" /> LinkedIn Profile
// //                 </a>
// //               )}
// //             </div>
// //           )}
// //         </AnimatedSection>

// //         {/* --- Career Narrative --- */}
// //         <PortfolioSectionWrapper
// //           id="hero-narrative"
// //           title="My Career Narrative"
// //           isVisible={
// //             ds.narrativeSuite?.showCareerNarrative &&
// //             !!portfolio.publicCareerNarrative
// //           }
// //           className={sectionCardClass}
// //           icon={<Eye size={32} />}
// //           animationDelay={animationDelaysMap.get("hero-narrative")}
// //         >
// //           <p className="mx-auto max-w-3xl text-lg italic leading-relaxed text-gray-700 md:text-xl">
// //           &quot;{portfolio.publicCareerNarrative}&quot;
// //           </p>
// //         </PortfolioSectionWrapper>

// //         {/* --- Golden Thread --- */}
// //         <PortfolioSectionWrapper
// //           id="golden-thread"
// //           isVisible={
// //             ds.narrativeSuite?.showGoldenThread &&
// //             !!portfolio.publicGoldenThread
// //           }
// //           // This section has distinct styling from sectionCardClass.
// //           // Themes can target its .portfolio-section-title, .portfolio-section-icon, .portfolio-prose
// //           className="rounded-xl border border-indigo-200 bg-indigo-50 p-8 text-center shadow-xl md:p-12"
// //           icon={<Zap size={36} className="mx-auto mb-4 text-indigo-600" />} // Icon color is specific, themes can override .portfolio-section-icon
// //           animationDelay={animationDelaysMap.get("golden-thread")}
// //         >
// //           <h3 className="mb-3 text-xl font-semibold text-indigo-700">
// //             My Golden Thread
// //           </h3>{" "}
// //           {/* This is not using .portfolio-section-title, so styled independently or via .theme-X .golden-thread-subtitle */}
// //           <p className="mx-auto max-w-3xl text-2xl font-medium italic text-gray-800 md:text-3xl">
// //           &quot;{portfolio.publicGoldenThread}&quot;
// //           </p>
// //           {ds.narrativeSuite?.showGoldenThread &&
// //             portfolio.publicGoldenThreadEvidence &&
// //             portfolio.publicGoldenThreadEvidence.length > 0 && (
// //               <div className="mx-auto mt-8 max-w-xl text-left">
// //                 <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-indigo-700">
// //                   Evidence From My Journey:
// //                 </h4>
// //                 <ul className="space-y-3">
// //                   {" "}
// //                   {/* Increased space slightly */}
// //                   {portfolio.publicGoldenThreadEvidence.map((ev, i) => (
// //                     // Evidence items can be targeted by theme e.g. .theme-X .golden-thread-evidence-item
// //                     <li
// //                       key={`gte-${i}`}
// //                       className="flex items-start rounded-lg bg-white p-4 text-sm text-gray-700 shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
// //                     >
// //                       <ChevronRight
// //                         size={20}
// //                         className="mr-2.5 mt-0.5 flex-shrink-0 text-indigo-500"
// //                       />
// //                       <div>
// //                         <strong className="font-semibold text-indigo-800">
// //                           {ev.section.replace(/([A-Z])/g, " $1").trim()}:
// //                         </strong>{" "}
// //                         {ev.textSnippet}
// //                       </div>
// //                     </li>
// //                   ))}
// //                 </ul>
// //               </div>
// //             )}
// //         </PortfolioSectionWrapper>

// //         {/* --- Professional Summary --- */}
// //         <PortfolioSectionWrapper
// //           id="summary"
// //           title="Professional Summary"
// //           isVisible={ds.sections?.showSummary && !!portfolio.publicSummary}
// //           icon={<Briefcase size={32} />}
// //           className={sectionCardClass}
// //           animationDelay={animationDelaysMap.get("summary")}
// //         >
// //           <p className="whitespace-pre-line">{portfolio.publicSummary}</p>
// //         </PortfolioSectionWrapper>

// //         {/* --- Key Themes & Pillars --- */}
// //         <PortfolioSectionWrapper
// //           id="key-themes"
// //           title="Key Themes & Pillars"
// //           isVisible={
// //             ds.narrativeSuite?.showKeyThemes &&
// //             !!portfolio.publicKeyThemes &&
// //             portfolio.publicKeyThemes.length > 0
// //           }
// //           icon={<Sparkles size={32} />}
// //           className={sectionCardClass}
// //           animationDelay={animationDelaysMap.get("key-themes")}
// //         >
// //           <div className="mt-2 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
// //             {portfolio.publicKeyThemes?.map((themeObj, i) => (
// //               // Inner theme cards can be targeted by .theme-X .key-theme-card
// //               <div
// //                 key={`theme-${i}`}
// //                 className={clsx(
// //                   "key-theme-card",
// //                   "transform rounded-lg p-6 shadow-lg transition-shadow hover:-translate-y-1 hover:shadow-xl",
// //                   "border border-indigo-200 bg-indigo-50", // Default card style
// //                 )}
// //               >
// //                 <h3
// //                   className={clsx(
// //                     "key-theme-card-title",
// //                     "mb-2 text-xl font-semibold",
// //                     "text-indigo-700",
// //                   )}
// //                 >
// //                   {themeObj.theme}
// //                 </h3>
// //                 <p
// //                   className={clsx(
// //                     "key-theme-card-text",
// //                     "text-sm leading-normal",
// //                     "text-gray-600",
// //                   )}
// //                 >
// //                   {themeObj.evidence}
// //                 </p>
// //               </div>
// //             ))}
// //           </div>
// //         </PortfolioSectionWrapper>

// //         {/* --- Core Skills & Competencies --- */}
// //         <PortfolioSectionWrapper
// //           id="skills"
// //           title="Core Skills & Competencies"
// //           isVisible={
// //             ds.sections?.showSkills &&
// //             !!portfolio.publicSkills &&
// //             portfolio.publicSkills.length > 0
// //           }
// //           icon={<Lightbulb size={32} />}
// //           className={sectionCardClass}
// //           animationDelay={animationDelaysMap.get("skills")}
// //         >
// //           <div className="flex flex-wrap gap-3">
// //             {portfolio.publicSkills?.map((skill, i) => (
// //               // THEME HOOK: skill-tag
// //               <span
// //                 key={`skill-${i}`}
// //                 className={clsx(
// //                   "skill-tag", // Generic class for themes
// //                   // Default styling from original file, themes will override .skill-tag
// //                   "cursor-default rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-800 shadow-md transition-colors hover:bg-indigo-200",
// //                 )}
// //               >
// //                 {skill}
// //               </span>
// //             ))}
// //           </div>
// //         </PortfolioSectionWrapper>

// //         {/* --- Professional Experience --- */}
// //         {/* THEME HOOK: Added .experience-timeline-item for specific targeting */}
// //         <PortfolioSectionWrapper
// //           id="experience"
// //           title="Professional Experience"
// //           isVisible={
// //             ds.sections?.showWorkExperience &&
// //             !!portfolio.publicWorkExperiences &&
// //             portfolio.publicWorkExperiences.length > 0
// //           }
// //           icon={<Briefcase size={32} />}
// //           className={sectionCardClass}
// //           animationDelay={animationDelaysMap.get("experience")}
// //         >
// //           {/* THEME HOOK: class for the timeline line */}
// //           <div
// //             className={clsx(
// //               "experience-timeline-line",
// //               "relative mt-2 space-y-10 before:absolute before:inset-0 before:z-0 before:ml-3.5 before:w-1 before:rounded-full before:bg-indigo-200 before:content-['']",
// //             )}
// //           >
// //             {portfolio.publicWorkExperiences?.map((exp, i) => (
// //               <div
// //                 key={`work-${i}`}
// //                 className={clsx(
// //                   "experience-timeline-item",
// //                   "group relative py-4 pl-12 transition-all",
// //                 )}
// //               >
// //                 {/* THEME HOOK: class for timeline dot */}
// //                 <div
// //                   className={clsx(
// //                     "experience-timeline-dot",
// //                     "absolute left-0 top-1 z-10 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-indigo-600 shadow-md ring-2 ring-indigo-300 transition-transform group-hover:scale-110",
// //                   )}
// //                 >
// //                   <Briefcase size={14} className="text-white" />
// //                 </div>
// //                 <h3 className="mb-0.5 text-2xl font-bold text-gray-800">
// //                   {exp.position}
// //                 </h3>
// //                 <p className="mb-1 text-lg font-semibold text-indigo-700">
// //                   {exp.company}
// //                 </p>
// //                 <p className="mb-4 text-sm text-gray-500">
// //                   {exp.startDate} - {exp.endDate || "Present"}
// //                 </p>
// //                 <ul className="list-none space-y-2.5">
// //                   {exp.bullets?.map((bullet, j) => (
// //                     <li
// //                       key={`bullet-work-${i}-${j}`}
// //                       className="flex items-start leading-relaxed text-gray-700"
// //                     >
// //                       <ChevronRight
// //                         size={20}
// //                         className="mr-2 mt-1 flex-shrink-0 text-indigo-500"
// //                       />{" "}
// //                       {bullet}
// //                     </li>
// //                   ))}
// //                 </ul>
// //               </div>
// //             ))}
// //           </div>
// //         </PortfolioSectionWrapper>

// //         {/* --- Showcase Sections --- */}
// //         {portfolio.showcaseSections &&
// //           portfolio.showcaseSections.length > 0 &&
// //           portfolio.showcaseSections.some(
// //             (sec) => sec.items && sec.items.length > 0,
// //           ) && (
// //             <div id="showcase-main">
// //               {portfolio.showcaseSections
// //                 .filter((sec) => sec.items && sec.items.length > 0)
// //                 .map((showcase) => (
// //                   <PortfolioSectionWrapper
// //                     key={`showcase-${showcase.id}`}
// //                     id={`showcase-${showcase.id}`}
// //                     title={showcase.title}
// //                     icon={<Award size={32} />}
// //                     isVisible={true}
// //                     className={sectionCardClass}
// //                     animationDelay={animationDelaysMap.get(
// //                       `showcase-${showcase.id}`,
// //                     )}
// //                   >
// //                     <div className="mt-2 space-y-10">
// //                       {showcase.items.map((item) => {
// //                         const youtubeVideoId = item.link
// //                           ? getYouTubeVideoId(item.link)
// //                           : null;
// //                         return (
// //                           // THEME HOOK: Added .showcase-item for specific targeting
// //                           <div
// //                             key={`showcase-item-${showcase.id}-${item.id}`}
// //                             className={clsx(
// //                               "showcase-item",
// //                               "transform rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-shadow duration-300 hover:scale-[1.02] hover:shadow-2xl",
// //                             )}
// //                           >
// //                             <h3 className="mb-2 text-2xl font-semibold text-gray-800">
// //                               {item.name}
// //                             </h3>
// //                             {item.link && (
// //                               <a
// //                                 href={
// //                                   item.link.startsWith("http")
// //                                     ? item.link
// //                                     : `https://${item.link}`
// //                                 }
// //                                 target="_blank"
// //                                 rel="noopener noreferrer"
// //                                 // THEME HOOK: .portfolio-link
// //                                 className={clsx(
// //                                   "portfolio-link",
// //                                   "group mb-3 inline-flex items-center text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-800",
// //                                 )}
// //                               >
// //                                 {youtubeVideoId ? (
// //                                   <>
// //                                     <Youtube size={16} className="mr-1.5" />{" "}
// //                                     View on YouTube
// //                                   </>
// //                                 ) : (
// //                                   <>
// //                                     <LinkIcon size={14} className="mr-1.5" />{" "}
// //                                     View Project/Resource
// //                                   </>
// //                                 )}
// //                                 <ExternalLink
// //                                   size={14}
// //                                   className="ml-1.5 transition-transform group-hover:translate-x-0.5"
// //                                 />
// //                               </a>
// //                             )}
// //                             <p className="mb-4 whitespace-pre-line leading-relaxed text-gray-700">
// //                               {item.description}
// //                             </p>
// //                             {item.skillsUsed && item.skillsUsed.length > 0 && (
// //                               <div>
// //                                 <strong className="text-sm font-semibold uppercase tracking-wider text-gray-600">
// //                                   Skills Leveraged:
// //                                 </strong>
// //                                 <div className="mt-2 flex flex-wrap gap-2.5">
// //                                   {item.skillsUsed.map((skill) => (
// //                                     // These are sub-skill tags, might be styled differently than main .skill-tag by themes
// //                                     <span
// //                                       key={skill}
// //                                       className="rounded-full bg-slate-200 px-3 py-1.5 text-xs font-medium text-slate-800 shadow-sm"
// //                                     >
// //                                       {skill}
// //                                     </span>
// //                                   ))}
// //                                 </div>
// //                               </div>
// //                             )}
// //                           </div>
// //                         );
// //                       })}
// //                     </div>
// //                   </PortfolioSectionWrapper>
// //                 ))}
// //             </div>
// //           )}

// //         {/* --- Education --- */}
// //         {/* THEME HOOK: Added .education-timeline-item for specific targeting (similar to experience) */}
// //         <PortfolioSectionWrapper
// //           id="education"
// //           title="Education & Credentials"
// //           isVisible={
// //             ds.sections?.showEducation &&
// //             !!portfolio.publicEducations &&
// //             portfolio.publicEducations.length > 0
// //           }
// //           icon={<GraduationCap size={32} />}
// //           className={sectionCardClass}
// //           animationDelay={animationDelaysMap.get("education")}
// //         >
// //           {/* THEME HOOK: class for the timeline line */}
// //           <div
// //             className={clsx(
// //               "education-timeline-line",
// //               "relative mt-2 space-y-8 before:absolute before:inset-0 before:z-0 before:ml-3.5 before:w-1 before:rounded-full before:bg-indigo-200 before:content-['']",
// //             )}
// //           >
// //             {portfolio.publicEducations?.map((edu, i) => (
// //               <div
// //                 key={`edu-${i}`}
// //                 className={clsx(
// //                   "education-timeline-item",
// //                   "group relative py-4 pl-12 transition-all",
// //                 )}
// //               >
// //                 {/* THEME HOOK: class for timeline dot */}
// //                 <div
// //                   className={clsx(
// //                     "education-timeline-dot",
// //                     "absolute left-0 top-1 z-10 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-indigo-600 shadow-md ring-2 ring-indigo-300 transition-transform group-hover:scale-110",
// //                   )}
// //                 >
// //                   <GraduationCap size={14} className="text-white" />
// //                 </div>
// //                 <h3 className="text-xl font-semibold text-gray-800">
// //                   {edu.degree}
// //                 </h3>
// //                 <p className="text-md font-medium text-indigo-600">
// //                   {edu.school}
// //                 </p>
// //                 <p className="mt-1 text-sm text-gray-500">
// //                   {edu.startDate} - {edu.endDate || "Graduated"}
// //                 </p>
// //               </div>
// //             ))}
// //           </div>
// //         </PortfolioSectionWrapper>

// //         {/* --- Volunteering --- */}
// //         <PortfolioSectionWrapper
// //           id="volunteering"
// //           title="Volunteering Experience"
// //           isVisible={
// //             ds.sections?.showVolunteering &&
// //             !!portfolio.publicVolunteering &&
// //             portfolio.publicVolunteering.length > 0
// //           }
// //           icon={<Gift size={32} />}
// //           className={sectionCardClass}
// //           animationDelay={animationDelaysMap.get("volunteering")}
// //         >
// //           <div className="mt-2 space-y-8">
// //             {portfolio.publicVolunteering?.map((vol: VolunteeringItem, i) => (
// //               // THEME HOOK: .volunteering-item
// //               <div
// //                 key={`vol-${i}`}
// //                 className={clsx(
// //                   "volunteering-item",
// //                   "rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-md transition-shadow hover:shadow-lg",
// //                 )}
// //               >
// //                 <h3 className="text-xl font-semibold text-gray-800">
// //                   {vol.role}
// //                 </h3>
// //                 <p className="text-md font-medium text-indigo-600">
// //                   {vol.organization}
// //                 </p>
// //                 <p className="mb-2 mt-1 text-sm text-gray-500">
// //                   {vol.startDate} - {vol.endDate || "Present"}
// //                 </p>
// //                 {vol.bullets && vol.bullets.length > 0 && (
// //                   <ul className="list-none space-y-1.5 pl-1">
// //                     {vol.bullets?.map((bullet: string, j: number) => (
// //                       <li
// //                         key={`bullet-vol-${i}-${j}`}
// //                         className="flex items-start text-sm text-gray-600"
// //                       >
// //                         <ChevronRight
// //                           size={16}
// //                           className="mr-1.5 mt-0.5 flex-shrink-0 text-indigo-400"
// //                         />
// //                         {bullet}
// //                       </li>
// //                     ))}
// //                   </ul>
// //                 )}
// //               </div>
// //             ))}
// //           </div>
// //         </PortfolioSectionWrapper>

// //         {/* --- Certifications --- */}
// //         <PortfolioSectionWrapper
// //           id="certifications"
// //           title="Certifications"
// //           isVisible={
// //             ds.sections?.showCertifications &&
// //             !!portfolio.publicCertifications &&
// //             portfolio.publicCertifications.length > 0
// //           }
// //           icon={<ShieldCheck size={32} />}
// //           className={sectionCardClass}
// //           animationDelay={animationDelaysMap.get("certifications")}
// //         >
// //           <div className="mt-2 space-y-6">
// //             {portfolio.publicCertifications?.map((cert, i) => (
// //               // THEME HOOK: .certification-item
// //               <div
// //                 key={`cert-${i}`}
// //                 className={clsx(
// //                   "certification-item",
// //                   "rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-md transition-shadow hover:shadow-lg",
// //                 )}
// //               >
// //                 <h3 className="text-xl font-semibold text-gray-800">
// //                   {cert.title}
// //                 </h3>
// //                 <p className="text-md font-medium text-indigo-600">
// //                   {cert.issuer}
// //                 </p>
// //                 <p className="mt-1 text-sm text-gray-500">{cert.date}</p>
// //               </div>
// //             ))}
// //           </div>
// //         </PortfolioSectionWrapper>

// //         {/* --- "What If?" Scenarios --- */}
// //         {/* This section has unique styling, not sectionCardClass. Themes can target .what-if-section-container and .what-if-item */}
// //         <PortfolioSectionWrapper
// //           id="what-if"
// //           title='"What If?" Career Explorations'
// //           isVisible={
// //             !!portfolio.publicWhatIfScenarios &&
// //             portfolio.publicWhatIfScenarios.length > 0
// //           }
// //           icon={<Brain size={32} />}
// //           className={clsx(
// //             "what-if-section-container",
// //             "rounded-xl bg-slate-200/70 p-6 sm:p-8",
// //           )}
// //           animationDelay={animationDelaysMap.get("what-if")}
// //         >
// //           <div className="space-y-8">
// //             {portfolio.publicWhatIfScenarios?.map((scenario, i) => (
// //               <div
// //                 key={`whatif-${i}`}
// //                 className={clsx(
// //                   "what-if-item",
// //                   "rounded-lg border border-teal-200 bg-white p-6 shadow-xl",
// //                 )}
// //               >
// //                 <h3 className="mb-3 text-xl font-semibold italic text-teal-700">
// //                 &quot;{scenario.scenarioText}&quot;
// //                 </h3>
// //                 <p className="mb-4 leading-relaxed text-gray-700">
// //                   {scenario.adaptedResult.adaptedNarrative}
// //                 </p>
// //                 <div className="mb-3">
// //                   <h4 className="text-md mb-1 font-semibold text-teal-600">
// //                     Key Transferable Skills:
// //                   </h4>
// //                   <ul className="list-inside list-disc space-y-0.5 pl-5 text-sm text-teal-700">
// //                     {scenario.adaptedResult.keyTransferableSkills.map(
// //                       (skill, sIdx) => (
// //                         <li key={`wif-skill-${i}-${sIdx}`}>{skill}</li>
// //                       ),
// //                     )}
// //                   </ul>
// //                 </div>
// //                 <div>
// //                   <h4 className="text-md mb-1 font-semibold text-teal-600">
// //                     Pivot Points:
// //                   </h4>
// //                   <ul className="list-inside list-disc space-y-0.5 pl-5 text-sm text-teal-700">
// //                     {scenario.adaptedResult.pivotPoints.map((point, pIdx) => (
// //                       <li key={`wif-point-${i}-${pIdx}`}>{point}</li>
// //                     ))}
// //                   </ul>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </PortfolioSectionWrapper>

// //         {/* --- Hidden Gems --- */}
// //         {/* This section has unique styling. Themes can target .hidden-gems-section-container and .hidden-gem-item */}
// //         <PortfolioSectionWrapper
// //           id="hidden-gems"
// //           title="Key Insights & Hidden Gems"
// //           isVisible={
// //             ds.narrativeSuite?.showHiddenGems &&
// //             !!portfolio.publicHiddenGems &&
// //             portfolio.publicHiddenGems.hiddenGems.length > 0
// //           }
// //           icon={<ThumbsUp size={32} />}
// //           className={clsx(
// //             "hidden-gems-section-container",
// //             "rounded-xl bg-indigo-50 p-6 sm:p-8",
// //           )}
// //           animationDelay={animationDelaysMap.get("hidden-gems")}
// //         >
// //           <div className="space-y-6">
// //             {portfolio.publicHiddenGems?.hiddenGems.map((gem, i) => (
// //               <div
// //                 key={`gem-${i}`}
// //                 className={clsx(
// //                   "hidden-gem-item",
// //                   "rounded-lg border border-amber-300 bg-white p-5 shadow-xl",
// //                 )}
// //               >
// //                 <h3 className="mb-2 flex items-center text-xl font-semibold text-amber-700">
// //                   <Lightbulb size={20} className="mr-2 text-amber-500" />{" "}
// //                   {gem.gem}
// //                 </h3>
// //                 <p className="mt-1 text-sm text-gray-700">
// //                   <strong className="font-medium text-amber-800">
// //                     Why it&apos;s valuable:
// //                   </strong>{" "}
// //                   {gem.reasoning}
// //                 </p>
// //                 <p className="mt-2 text-sm text-gray-700">
// //                   <strong className="font-medium text-amber-800">
// //                     Suggestion:
// //                   </strong>{" "}
// //                   {gem.suggestion}
// //                 </p>
// //               </div>
// //             ))}
// //           </div>
// //         </PortfolioSectionWrapper>

// //         <footer className="mt-20 border-t-2 border-gray-300 py-10 text-center">
// //           <p className="text-sm text-gray-500">
// //             © {new Date().getFullYear()}{" "}
// //             {portfolio.publicFullName || portfolio.title}.{" "}
// //           </p>
// //           <p className="mt-1 text-xs text-gray-400">
// //             Portfolio generated with Resume Wizard Pro.
// //           </p>
// //         </footer>
// //       </div>
// //     </div>
// //   );
// // }

// // src/app/portfolio/[identifier]/page.tsx
// import prisma from "@/lib/prisma";
// import { notFound } from "next/navigation";
// import { Metadata } from "next";
// import { clsx } from "clsx";
// import React, { Suspense } from "react";
// import { currentUser } from "@clerk/nextjs/server";
// import Link from "next/link";

// // Icons from lucide-react
// import {
//   Briefcase,
//   GraduationCap,
//   Sparkles,
//   Zap,
//   ChevronRight,
//   ExternalLink,
//   Youtube,
//   Link as LinkIcon,
//   Lightbulb,
//   Award,
//   Brain,
//   ThumbsUp,
//   Eye,
//   Mail,
//   Phone,
//   Linkedin,
//   MapPin,
//   Gift,
//   ShieldCheck,
//   Edit,
//   Lock,
// } from "lucide-react";

// import { AnimatedSection } from "@/components/AnimatedSection";
// import { TableOfContents } from "@/components/TableOfContents";

// import { ResumeJSON } from "@/components/ATSScore";
// import {
//   WhatIfResult,
//   GoldenThreadEvidence as AIGoldenThreadEvidence,
//   HiddenGemsResult,
//   InitialNarrativeResult,
// } from "@/components/NarrativeWeaver";

// // ── Helper to check if a string is a UUID ──
// function isUuid(s: string): boolean {
//   if (!s) return false;
//   const uuidRegex =
//     /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
//   return uuidRegex.test(s);
// }

// // ── Interfaces ──
// interface PortfolioDisplaySettings {
//   contact: {
//     showEmail?: boolean;
//     showPhone?: boolean;
//     showLocation?: boolean;
//     showLinkedIn?: boolean;
//     showPhoto?: boolean;
//   };
//   sections: {
//     showSummary?: boolean;
//     showSkills?: boolean;
//     showWorkExperience?: boolean;
//     showEducation?: boolean;
//     showVolunteering?: boolean;
//     showCertifications?: boolean;
//     showReferences?: boolean;
//   };
//   narrativeSuite: {
//     showCareerNarrative?: boolean;
//     showGoldenThread?: boolean;
//     showKeyThemes?: boolean;
//     showHiddenGems?: boolean;
//   };
// }
// interface PortfolioShowcaseItem {
//   id: string;
//   name: string;
//   description: string;
//   link?: string;
//   skillsUsed?: string[];
// }
// interface PortfolioShowcaseSection {
//   id: string;
//   title: string;
//   items: PortfolioShowcaseItem[];
// }
// interface VolunteeringItem {
//   organization?: string;
//   role?: string;
//   startDate?: string;
//   endDate?: string;
//   bullets?: string[];
//   [key: string]: unknown; // For flexibility
// }
// interface PortfolioData {
//   id: string;
//   title: string;
//   isPublic: boolean;
//   theme: string;
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
//   publicVolunteering?: VolunteeringItem[] | null;
//   publicCertifications?: ResumeJSON["certifications"] | null;
//   publicCareerNarrative?: string | null;
//   publicGoldenThread?: string | null;
//   publicGoldenThreadEvidence?: AIGoldenThreadEvidence[] | null;
//   publicKeyThemes?: InitialNarrativeResult["keyThemes"] | null;
//   publicHiddenGems?: HiddenGemsResult | null;
//   publicWhatIfScenarios?: Array<{
//     scenarioText: string;
//     adaptedResult: WhatIfResult;
//   }> | null;
//   showcaseSections?: PortfolioShowcaseSection[] | null;
//   displaySettings?: PortfolioDisplaySettings | null;
//   isOwnerViewing?: boolean | null | undefined;
// }

// const defaultDisplaySettings: PortfolioDisplaySettings = {
//   contact: {
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

// // ── Fetch and assemble everything from Prisma ──
// async function getPortfolioData(
//   identifier: string
// ): Promise<(PortfolioData & { isOwnerViewing?: boolean | null }) | null> {
//   let portfolioRecord = null;
//   const viewer = await currentUser();

//   if (isUuid(identifier)) {
//     portfolioRecord = await prisma.livingPortfolio.findUnique({
//       where: { id: identifier },
//       include: { profile: { select: { userId: true } } },
//     });
//   } else {
//     portfolioRecord = await prisma.livingPortfolio.findUnique({
//       where: { slug: identifier },
//       include: { profile: { select: { userId: true } } },
//     });
//   }

//   if (!portfolioRecord) return null;

//   const isOwner = !!(
//     viewer &&
//     portfolioRecord.profile?.userId === viewer.id
//   );
//   if (!portfolioRecord.isPublic && !isOwner) {
//     return null;
//   }

//   const displaySettings =
//     (portfolioRecord.displaySettings as PortfolioDisplaySettings | null) ||
//     defaultDisplaySettings;

//   return {
//     id: portfolioRecord.id,
//     title: portfolioRecord.title,
//     isPublic: portfolioRecord.isPublic,
//     theme: portfolioRecord.theme || "default",
//     isOwnerViewing: isOwner,
//     publicFullName: portfolioRecord.publicFullName,
//     publicJobTitle: portfolioRecord.publicJobTitle,
//     publicEmail: portfolioRecord.publicEmail,
//     publicPhone: portfolioRecord.publicPhone,
//     publicLocation: portfolioRecord.publicLocation,
//     publicLinkedInUrl: portfolioRecord.publicLinkedInUrl,
//     publicSummary: portfolioRecord.publicSummary,
//     publicSkills: portfolioRecord.publicSkills as string[] | null,
//     publicWorkExperiences: portfolioRecord
//       .publicWorkExperiences as ResumeJSON["workExperiences"] | null,
//     publicEducations: portfolioRecord
//       .publicEducations as ResumeJSON["educations"] | null,
//     publicVolunteering: portfolioRecord
//       .publicVolunteering as VolunteeringItem[] | null,
//     publicCertifications: portfolioRecord
//       .publicCertifications as ResumeJSON["certifications"] | null,
//     publicCareerNarrative: portfolioRecord.publicCareerNarrative,
//     publicGoldenThread: portfolioRecord.publicGoldenThread,
//     publicGoldenThreadEvidence: portfolioRecord
//       .publicGoldenThreadEvidence as AIGoldenThreadEvidence[] | null,
//     publicKeyThemes: portfolioRecord
//       .publicKeyThemes as InitialNarrativeResult["keyThemes"] | null,
//     publicHiddenGems: portfolioRecord.publicHiddenGems as HiddenGemsResult | null,
//     publicWhatIfScenarios: portfolioRecord.publicWhatIfScenarios as Array<{
//       scenarioText: string;
//       adaptedResult: WhatIfResult;
//     }> | null,
//     showcaseSections: portfolioRecord
//       .showcaseSections as PortfolioShowcaseSection[] | null,
//     displaySettings,
//   };
// }

// // ── generateMetadata must accept “params” as a plain object (no Promise) ──
// export async function generateMetadata({
//   params,
// }: {
//   params: { identifier: string };
// }): Promise<Metadata> {
//   const { identifier } = params;
//   if (!identifier) return { title: "Portfolio Not Found" };

//   const portfolio = await getPortfolioData(identifier);
//   if (!portfolio) return { title: "Portfolio Not Found" };

//   return {
//     title: `${
//       portfolio.publicFullName || portfolio.title || "Career Portfolio"
//     } | Resume Wizard Pro`,
//     description:
//       portfolio.publicSummary ||
//       `View the interactive career portfolio of ${
//         portfolio.publicFullName || portfolio.title
//       }. Created with Resume Wizard Pro.`,
//   };
// }

// // ── A minimal “section wrapper” component ──
// const sectionCardClass = "bg-white p-6 sm:p-8 rounded-xl shadow-xl";
// const sectionTitleClassPublic = "text-3xl md:text-4xl font-bold text-gray-800";
// const PortfolioSectionWrapper: React.FC<{
//   id: string;
//   title?: string;
//   children: React.ReactNode;
//   isVisible?: boolean;
//   className?: string;
//   icon?: React.ReactNode;
//   titleClassName?: string;
//   contentClassName?: string;
//   animationDelay?: number;
// }> = ({
//   id,
//   title,
//   children,
//   isVisible = true,
//   className = "",
//   icon,
//   titleClassName = "",
//   contentClassName = "",
//   animationDelay = 0,
// }) => {
//   if (!isVisible) return null;

//   const hasContent =
//     React.Children.count(children) > 0 ||
//     (Array.isArray(children) &&
//       children.length > 0 &&
//       children.some((child) => child != null));
//   if (!title && !hasContent) return null;

//   return (
//     <AnimatedSection
//       id={id}
//       delay={animationDelay}
//       className={clsx("portfolio-section", "py-8 md:py-10", className)}
//     >
//       {title && (
//         <div className="mb-6 flex items-center md:mb-8">
//           {icon && (
//             <span
//               className={clsx(
//                 "portfolio-section-icon",
//                 "mr-4 flex-shrink-0 scale-125 text-indigo-600"
//               )}
//             >
//               {icon}
//             </span>
//           )}
//           <h2
//             className={clsx(
//               "portfolio-section-title",
//               sectionTitleClassPublic,
//               titleClassName
//             )}
//           >
//             {title}
//           </h2>
//         </div>
//       )}
//       {hasContent ? (
//         <div
//           className={clsx(
//             "portfolio-prose",
//             "prose prose-slate max-w-none leading-relaxed text-gray-700 lg:prose-lg",
//             contentClassName
//           )}
//         >
//           {children}
//         </div>
//       ) : (
//         title && <p className="italic text-gray-500">No content to display.</p>
//       )}
//     </AnimatedSection>
//   );
// };

// // ── YouTube‐ID helper ──
// function getYouTubeVideoId(url: string): string | null {
//   const regExp =
//     /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
//   const match = url.match(regExp);
//   return match && match[2].length === 11 ? match[2] : null;
// }

// // ── THE PAGE ITSELF ──
// // Note: no “: Promise<JSX.Element>” annotation here—Next.js infers that automatically.
// export default async function LivingPortfolioPage({
//   params,
// }: {
//   params: { identifier: string };
//   searchParams?: never;
// }) {
//   const { identifier } = params;
//   if (!identifier) notFound();

//   const portfolio = await getPortfolioData(identifier);
//   if (!portfolio) notFound();

//   const ds = portfolio.displaySettings || defaultDisplaySettings;
//   const hasContactInfo =
//     ds.contact?.showEmail ||
//     ds.contact?.showLinkedIn ||
//     ds.contact?.showLocation ||
//     ds.contact?.showPhone;
//   const currentTheme = portfolio.theme || "default";

//   // Build up a simple “table of contents” for Suspense
//   const tocItems: {
//     id: string;
//     title: string;
//     level: number;
//     icon?: React.ReactNode;
//   }[] = [];
//   const animationDelaysMap = new Map<string, number>();
//   let currentDelay = 0.1;
//   const delayIncrement = 0.15;

//   function addSection(
//     condition: boolean | undefined | null,
//     id: string,
//     title: string,
//     icon?: React.ReactNode,
//     level: number = 1
//   ) {
//     if (condition) {
//       tocItems.push({ id, title, level, icon });
//       animationDelaysMap.set(id, currentDelay);
//       currentDelay += delayIncrement;
//     }
//   }

//   addSection(true, "hero", "Top Section", <Eye />);
//   addSection(
//     ds.narrativeSuite?.showCareerNarrative && !!portfolio.publicCareerNarrative,
//     "hero-narrative",
//     "Career Narrative",
//     <Eye />
//   );
//   addSection(
//     ds.narrativeSuite?.showGoldenThread && !!portfolio.publicGoldenThread,
//     "golden-thread",
//     "Golden Thread",
//     <Zap />
//   );
//   addSection(
//     ds.sections?.showSummary && !!portfolio.publicSummary,
//     "summary",
//     "Professional Summary",
//     <Briefcase />
//   );
//   addSection(
//     ds.narrativeSuite?.showKeyThemes &&
//       !!portfolio.publicKeyThemes &&
//       portfolio.publicKeyThemes.length > 0,
//     "key-themes",
//     "Key Themes",
//     <Sparkles />
//   );
//   addSection(
//     ds.sections?.showSkills &&
//       !!portfolio.publicSkills &&
//       portfolio.publicSkills.length > 0,
//     "skills",
//     "Skills",
//     <Lightbulb />
//   );
//   addSection(
//     ds.sections?.showWorkExperience &&
//       !!portfolio.publicWorkExperiences &&
//       portfolio.publicWorkExperiences.length > 0,
//     "experience",
//     "Experience",
//     <Briefcase />
//   );

//   let showcaseRootAdded = false;
//   if (portfolio.showcaseSections && portfolio.showcaseSections.length > 0) {
//     for (const sec of portfolio.showcaseSections) {
//       if (sec.items && sec.items.length > 0) {
//         if (!showcaseRootAdded) {
//           addSection(true, "showcase-main", "Showcase", <Award />);
//           showcaseRootAdded = true;
//         }
//         addSection(true, `showcase-${sec.id}`, sec.title, <ChevronRight />, 2);
//       }
//     }
//   }

//   addSection(
//     ds.sections?.showEducation &&
//       !!portfolio.publicEducations &&
//       portfolio.publicEducations.length > 0,
//     "education",
//     "Education",
//     <GraduationCap />
//   );
//   addSection(
//     ds.sections?.showVolunteering &&
//       !!portfolio.publicVolunteering &&
//       portfolio.publicVolunteering.length > 0,
//     "volunteering",
//     "Volunteering",
//     <Gift />
//   );
//   addSection(
//     ds.sections?.showCertifications &&
//       !!portfolio.publicCertifications &&
//       portfolio.publicCertifications.length > 0,
//     "certifications",
//     "Certifications",
//     <ShieldCheck />
//   );
//   addSection(
//     !!portfolio.publicWhatIfScenarios &&
//       portfolio.publicWhatIfScenarios.length > 0,
//     "what-if",
//     '"What If?" Scenarios',
//     <Brain />
//   );
//   addSection(
//     ds.narrativeSuite?.showHiddenGems &&
//       !!portfolio.publicHiddenGems &&
//       portfolio.publicHiddenGems.hiddenGems.length > 0,
//     "hidden-gems",
//     "Hidden Gems",
//     <ThumbsUp />
//   );

//   return (
//     // THEME HOOK: apply a root‐level “theme‐X” class so your CSS can override
//     <div
//       className={clsx(
//         "min-h-screen font-sans",
//         `theme-${currentTheme}`,
//         "bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200"
//       )}
//     >
//       <Suspense fallback={null}>
//         <TableOfContents items={tocItems} />
//       </Suspense>

//       {portfolio.isOwnerViewing && !portfolio.isPublic && (
//         <div className="sticky top-0 z-40 border-b-2 border-yellow-400 bg-yellow-100 p-4 text-center text-sm text-yellow-800 shadow-md">
//           <div className="container mx-auto flex items-center justify-center gap-2">
//             <Lock size={16} />
//             You are viewing this portfolio in <strong>Private Preview Mode</strong>.
//             <Link
//               href={`/portfolio-editor/${portfolio.id}`}
//               className="ml-3 rounded-md bg-yellow-500 px-3 py-1 text-xs font-semibold text-white shadow hover:bg-yellow-600"
//             >
//               Edit & Publish
//             </Link>
//           </div>
//         </div>
//       )}

//       {portfolio.isOwnerViewing && (
//         <div className="fixed bottom-6 right-6 z-50 lg:bottom-8 lg:right-8">
//           <Link
//             href={`/portfolio-editor/${portfolio.id}`}
//             className="flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-3 text-white shadow-xl transition-transform hover:scale-105 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//             title="Edit this Portfolio"
//           >
//             <Edit size={18} />
//             <span className="text-sm font-medium">Edit Portfolio</span>
//           </Link>
//         </div>
//       )}

//       <div
//         className={clsx(
//           "portfolio-page-container",
//           "container mx-auto overflow-x-hidden px-4 py-12 md:py-20",
//           "max-w-5xl",
//           "lg:pl-20"
//         )}
//       >
//         {/* ── Hero Section ── */}
//         <AnimatedSection
//           id="hero"
//           delay={animationDelaysMap.get("hero") || 0}
//           className={clsx(
//             "portfolio-header",
//             "mb-16 rounded-xl bg-white p-6 text-center shadow-2xl md:mb-24"
//           )}
//         >
//           {ds.contact?.showPhoto && (
//             <div
//               className={clsx(
//                 "mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full shadow-lg ring-4 sm:h-36 sm:w-36",
//                 "bg-indigo-100 ring-white",
//                 "avatar-container"
//               )}
//             >
//               <span
//                 className={clsx(
//                   "text-5xl font-semibold",
//                   "text-indigo-600",
//                   "avatar-initials"
//                 )}
//               >
//                 {portfolio.publicFullName
//                   ?.split(" ")
//                   .map((n) => n[0])
//                   .join("")
//                   .toUpperCase() || "U"}
//               </span>
//             </div>
//           )}

//           <h1 className="mb-3 text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
//             {portfolio.publicFullName || portfolio.title}
//           </h1>
//           {portfolio.publicJobTitle && (
//             <p className="mb-6 text-xl font-semibold text-indigo-700 sm:text-2xl">
//               {portfolio.publicJobTitle}
//             </p>
//           )}

//           {hasContactInfo && (
//             <div
//               className={clsx(
//                 "portfolio-contact-info",
//                 "mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-gray-600"
//               )}
//             >
//               {ds.contact?.showEmail && portfolio.publicEmail && (
//                 <a
//                   href={`mailto:${portfolio.publicEmail}`}
//                   className="flex items-center text-sm hover:text-indigo-700 sm:text-base"
//                 >
//                   <Mail size={18} className="mr-1.5 text-indigo-500" />{" "}
//                   {portfolio.publicEmail}
//                 </a>
//               )}
//               {ds.contact?.showPhone && portfolio.publicPhone && (
//                 <span className="flex items-center text-sm sm:text-base">
//                   <Phone size={18} className="mr-1.5 text-indigo-500" />{" "}
//                   {portfolio.publicPhone}
//                 </span>
//               )}
//               {ds.contact?.showLocation && portfolio.publicLocation && (
//                 <span className="flex items-center text-sm sm:text-base">
//                   <MapPin size={18} className="mr-1.5 text-indigo-500" />{" "}
//                   {portfolio.publicLocation}
//                 </span>
//               )}
//               {ds.contact?.showLinkedIn && portfolio.publicLinkedInUrl && (
//                 <a
//                   href={portfolio.publicLinkedInUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center text-sm font-medium text-indigo-700 hover:text-indigo-800 sm:text-base"
//                 >
//                   <Linkedin size={18} className="mr-1.5" /> LinkedIn Profile
//                 </a>
//               )}
//             </div>
//           )}
//         </AnimatedSection>

//         {/* ── Career Narrative ── */}
//         <PortfolioSectionWrapper
//           id="hero-narrative"
//           title="My Career Narrative"
//           isVisible={
//             ds.narrativeSuite?.showCareerNarrative &&
//             !!portfolio.publicCareerNarrative
//           }
//           className={sectionCardClass}
//           icon={<Eye size={32} />}
//           animationDelay={animationDelaysMap.get("hero-narrative")}
//         >
//           <p className="mx-auto max-w-3xl text-lg italic leading-relaxed text-gray-700 md:text-xl">
//             &quot;{portfolio.publicCareerNarrative}&quot;
//           </p>
//         </PortfolioSectionWrapper>

//         {/* ── Golden Thread ── */}
//         <PortfolioSectionWrapper
//           id="golden-thread"
//           isVisible={
//             ds.narrativeSuite?.showGoldenThread &&
//             !!portfolio.publicGoldenThread
//           }
//           className="rounded-xl border border-indigo-200 bg-indigo-50 p-8 text-center shadow-xl md:p-12"
//           icon={<Zap size={36} className="mx-auto mb-4 text-indigo-600" />}
//           animationDelay={animationDelaysMap.get("golden-thread")}
//         >
//           <h3 className="mb-3 text-xl font-semibold text-indigo-700">
//             My Golden Thread
//           </h3>
//           <p className="mx-auto max-w-3xl text-2xl font-medium italic text-gray-800 md:text-3xl">
//             &quot;{portfolio.publicGoldenThread}&quot;
//           </p>
//           {ds.narrativeSuite?.showGoldenThread &&
//             portfolio.publicGoldenThreadEvidence &&
//             portfolio.publicGoldenThreadEvidence.length > 0 && (
//               <div className="mx-auto mt-8 max-w-xl text-left">
//                 <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-indigo-700">
//                   Evidence From My Journey:
//                 </h4>
//                 <ul className="space-y-3">
//                   {portfolio.publicGoldenThreadEvidence.map((ev, i) => (
//                     <li
//                       key={`gte-${i}`}
//                       className="flex items-start rounded-lg bg-white p-4 text-sm text-gray-700 shadow-lg hover:scale-[1.02] hover:shadow-xl transition-all"
//                     >
//                       <ChevronRight
//                         size={20}
//                         className="mr-2.5 mt-0.5 flex-shrink-0 text-indigo-500"
//                       />
//                       <div>
//                         <strong className="font-semibold text-indigo-800">
//                           {ev.section.replace(/([A-Z])/g, " $1").trim()}:
//                         </strong>{" "}
//                         {ev.textSnippet}
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//         </PortfolioSectionWrapper>

//         {/* ── Professional Summary ── */}
//         <PortfolioSectionWrapper
//           id="summary"
//           title="Professional Summary"
//           isVisible={ds.sections?.showSummary && !!portfolio.publicSummary}
//           icon={<Briefcase size={32} />}
//           className={sectionCardClass}
//           animationDelay={animationDelaysMap.get("summary")}
//         >
//           <p className="whitespace-pre-line">{portfolio.publicSummary}</p>
//         </PortfolioSectionWrapper>

//         {/* ── Key Themes & Pillars ── */}
//         <PortfolioSectionWrapper
//           id="key-themes"
//           title="Key Themes & Pillars"
//           isVisible={
//             ds.narrativeSuite?.showKeyThemes &&
//             !!portfolio.publicKeyThemes &&
//             portfolio.publicKeyThemes.length > 0
//           }
//           icon={<Sparkles size={32} />}
//           className={sectionCardClass}
//           animationDelay={animationDelaysMap.get("key-themes")}
//         >
//           <div className="mt-2 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {portfolio.publicKeyThemes?.map((themeObj, i) => (
//               <div
//                 key={`theme-${i}`}
//                 className={clsx(
//                   "key-theme-card",
//                   "transform rounded-lg p-6 shadow-lg transition-shadow hover:-translate-y-1 hover:shadow-xl",
//                   "border border-indigo-200 bg-indigo-50"
//                 )}
//               >
//                 <h3
//                   className={clsx(
//                     "key-theme-card-title",
//                     "mb-2 text-xl font-semibold",
//                     "text-indigo-700"
//                   )}
//                 >
//                   {themeObj.theme}
//                 </h3>
//                 <p
//                   className={clsx(
//                     "key-theme-card-text",
//                     "text-sm leading-normal",
//                     "text-gray-600"
//                   )}
//                 >
//                   {themeObj.evidence}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </PortfolioSectionWrapper>

//         {/* ── Core Skills & Competencies ── */}
//         <PortfolioSectionWrapper
//           id="skills"
//           title="Core Skills & Competencies"
//           isVisible={
//             ds.sections?.showSkills &&
//             !!portfolio.publicSkills &&
//             portfolio.publicSkills.length > 0
//           }
//           icon={<Lightbulb size={32} />}
//           className={sectionCardClass}
//           animationDelay={animationDelaysMap.get("skills")}
//         >
//           <div className="flex flex-wrap gap-3">
//             {portfolio.publicSkills?.map((skill, i) => (
//               <span
//                 key={`skill-${i}`}
//                 className={clsx(
//                   "skill-tag",
//                   "cursor-default rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-800 shadow-md hover:bg-indigo-200 transition-colors"
//                 )}
//               >
//                 {skill}
//               </span>
//             ))}
//           </div>
//         </PortfolioSectionWrapper>

//         {/* ── Professional Experience ── */}
//         <PortfolioSectionWrapper
//           id="experience"
//           title="Professional Experience"
//           isVisible={
//             ds.sections?.showWorkExperience &&
//             !!portfolio.publicWorkExperiences &&
//             portfolio.publicWorkExperiences.length > 0
//           }
//           icon={<Briefcase size={32} />}
//           className={sectionCardClass}
//           animationDelay={animationDelaysMap.get("experience")}
//         >
//           <div
//             className={clsx(
//               "experience-timeline-line",
//               "relative mt-2 space-y-10 before:absolute before:inset-0 before:z-0 before:ml-3.5 before:w-1 before:rounded-full before:bg-indigo-200 before:content-['']"
//             )}
//           >
//             {portfolio.publicWorkExperiences?.map((exp, i) => (
//               <div
//                 key={`work-${i}`}
//                 className={clsx(
//                   "experience-timeline-item",
//                   "group relative py-4 pl-12 transition-all"
//                 )}
//               >
//                 <div
//                   className={clsx(
//                     "experience-timeline-dot",
//                     "absolute left-0 top-1 z-10 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-indigo-600 shadow-md ring-2 ring-indigo-300 transition-transform group-hover:scale-110"
//                   )}
//                 >
//                   <Briefcase size={14} className="text-white" />
//                 </div>
//                 <h3 className="mb-0.5 text-2xl font-bold text-gray-800">
//                   {exp.position}
//                 </h3>
//                 <p className="mb-1 text-lg font-semibold text-indigo-700">
//                   {exp.company}
//                 </p>
//                 <p className="mb-4 text-sm text-gray-500">
//                   {exp.startDate} - {exp.endDate || "Present"}
//                 </p>
//                 <ul className="list-none space-y-2.5">
//                   {exp.bullets?.map((bullet, j) => (
//                     <li
//                       key={`bullet-work-${i}-${j}`}
//                       className="flex items-start leading-relaxed text-gray-700"
//                     >
//                       <ChevronRight
//                         size={20}
//                         className="mr-2 mt-1 flex-shrink-0 text-indigo-500"
//                       />{" "}
//                       {bullet}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </PortfolioSectionWrapper>

//         {/* ── Showcase Sections ── */}
//         {portfolio.showcaseSections &&
//           portfolio.showcaseSections.length > 0 &&
//           portfolio.showcaseSections.some(
//             (sec) => sec.items && sec.items.length > 0
//           ) && (
//             <div id="showcase-main">
//               {portfolio.showcaseSections
//                 .filter((sec) => sec.items && sec.items.length > 0)
//                 .map((showcase) => (
//                   <PortfolioSectionWrapper
//                     key={`showcase-${showcase.id}`}
//                     id={`showcase-${showcase.id}`}
//                     title={showcase.title}
//                     icon={<Award size={32} />}
//                     isVisible={true}
//                     className={sectionCardClass}
//                     animationDelay={animationDelaysMap.get(
//                       `showcase-${showcase.id}`
//                     )}
//                   >
//                     <div className="mt-2 space-y-10">
//                       {showcase.items.map((item) => {
//                         const youtubeVideoId = item.link
//                           ? getYouTubeVideoId(item.link)
//                           : null;
//                         return (
//                           <div
//                             key={`showcase-item-${showcase.id}-${item.id}`}
//                             className={clsx(
//                               "showcase-item",
//                               "transform rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-shadow duration-300 hover:scale-[1.02] hover:shadow-2xl"
//                             )}
//                           >
//                             <h3 className="mb-2 text-2xl font-semibold text-gray-800">
//                               {item.name}
//                             </h3>
//                             {item.link && (
//                               <a
//                                 href={
//                                   item.link.startsWith("http")
//                                     ? item.link
//                                     : `https://${item.link}`
//                                 }
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className={clsx(
//                                   "portfolio-link",
//                                   "group mb-3 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
//                                 )}
//                               >
//                                 {youtubeVideoId ? (
//                                   <>
//                                     <Youtube
//                                       size={16}
//                                       className="mr-1.5"
//                                     />{" "}
//                                     View on YouTube
//                                   </>
//                                 ) : (
//                                   <>
//                                     <LinkIcon
//                                       size={14}
//                                       className="mr-1.5"
//                                     />{" "}
//                                     View Project/Resource
//                                   </>
//                                 )}
//                                 <ExternalLink
//                                   size={14}
//                                   className="ml-1.5 transition-transform group-hover:translate-x-0.5"
//                                 />
//                               </a>
//                             )}
//                             <p className="mb-4 whitespace-pre-line leading-relaxed text-gray-700">
//                               {item.description}
//                             </p>
//                             {item.skillsUsed && item.skillsUsed.length > 0 && (
//                               <div>
//                                 <strong className="text-sm font-semibold uppercase tracking-wider text-gray-600">
//                                   Skills Leveraged:
//                                 </strong>
//                                 <div className="mt-2 flex flex-wrap gap-2.5">
//                                   {item.skillsUsed.map((skill) => (
//                                     <span
//                                       key={skill}
//                                       className="rounded-full bg-slate-200 px-3 py-1.5 text-xs font-medium text-slate-800 shadow-sm"
//                                     >
//                                       {skill}
//                                     </span>
//                                   ))}
//                                 </div>
//                               </div>
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </PortfolioSectionWrapper>
//                 ))}
//             </div>
//           )}

//         {/* ── Education ── */}
//         <PortfolioSectionWrapper
//           id="education"
//           title="Education & Credentials"
//           isVisible={
//             ds.sections?.showEducation &&
//             !!portfolio.publicEducations &&
//             portfolio.publicEducations.length > 0
//           }
//           icon={<GraduationCap size={32} />}
//           className={sectionCardClass}
//           animationDelay={animationDelaysMap.get("education")}
//         >
//           <div
//             className={clsx(
//               "education-timeline-line",
//               "relative mt-2 space-y-8 before:absolute before:inset-0 before:z-0 before:ml-3.5 before:w-1 before:rounded-full before:bg-indigo-200 before:content-['']"
//             )}
//           >
//             {portfolio.publicEducations?.map((edu, i) => (
//               <div
//                 key={`edu-${i}`}
//                 className={clsx(
//                   "education-timeline-item",
//                   "group relative py-4 pl-12 transition-all"
//                 )}
//               >
//                 <div
//                   className={clsx(
//                     "education-timeline-dot",
//                     "absolute left-0 top-1 z-10 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-indigo-600 shadow-md ring-2 ring-indigo-300 transition-transform group-hover:scale-110"
//                   )}
//                 >
//                   <GraduationCap size={14} className="text-white" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-800">
//                   {edu.degree}
//                 </h3>
//                 <p className="text-md font-medium text-indigo-600">
//                   {edu.school}
//                 </p>
//                 <p className="mt-1 text-sm text-gray-500">
//                   {edu.startDate} - {edu.endDate || "Graduated"}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </PortfolioSectionWrapper>

//         {/* ── Volunteering Experience ── */}
//         <PortfolioSectionWrapper
//           id="volunteering"
//           title="Volunteering Experience"
//           isVisible={
//             ds.sections?.showVolunteering &&
//             !!portfolio.publicVolunteering &&
//             portfolio.publicVolunteering.length > 0
//           }
//           icon={<Gift size={32} />}
//           className={sectionCardClass}
//           animationDelay={animationDelaysMap.get("volunteering")}
//         >
//           <div className="mt-2 space-y-8">
//             {portfolio.publicVolunteering?.map(
//               (vol: VolunteeringItem, i) => (
//                 <div
//                   key={`vol-${i}`}
//                   className={clsx(
//                     "volunteering-item",
//                     "rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-md hover:shadow-lg transition-shadow"
//                   )}
//                 >
//                   <h3 className="text-xl font-semibold text-gray-800">
//                     {vol.role}
//                   </h3>
//                   <p className="text-md font-medium text-indigo-600">
//                     {vol.organization}
//                   </p>
//                   <p className="mb-2 mt-1 text-sm text-gray-500">
//                     {vol.startDate} - {vol.endDate || "Present"}
//                   </p>
//                   {vol.bullets && vol.bullets.length > 0 && (
//                     <ul className="list-none space-y-1.5 pl-1">
//                       {vol.bullets.map((bullet: string, j: number) => (
//                         <li
//                           key={`bullet-vol-${i}-${j}`}
//                           className="flex items-start text-sm text-gray-600"
//                         >
//                           <ChevronRight
//                             size={16}
//                             className="mr-1.5 mt-0.5 flex-shrink-0 text-indigo-400"
//                           />
//                           {bullet}
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//               )
//             )}
//           </div>
//         </PortfolioSectionWrapper>

//         {/* ── Certifications ── */}
//         <PortfolioSectionWrapper
//           id="certifications"
//           title="Certifications"
//           isVisible={
//             ds.sections?.showCertifications &&
//             !!portfolio.publicCertifications &&
//             portfolio.publicCertifications.length > 0
//           }
//           icon={<ShieldCheck size={32} />}
//           className={sectionCardClass}
//           animationDelay={animationDelaysMap.get("certifications")}
//         >
//           <div className="mt-2 space-y-6">
//             {portfolio.publicCertifications?.map((cert, i) => (
//               <div
//                 key={`cert-${i}`}
//                 className={clsx(
//                   "certification-item",
//                   "rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-md hover:shadow-lg transition-shadow"
//                 )}
//               >
//                 <h3 className="text-xl font-semibold text-gray-800">
//                   {cert.title}
//                 </h3>
//                 <p className="text-md font-medium text-indigo-600">
//                   {cert.issuer}
//                 </p>
//                 <p className="mt-1 text-sm text-gray-500">
//                   {cert.date}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </PortfolioSectionWrapper>

//         {/* ── “What If?” Scenarios ── */}
//         <PortfolioSectionWrapper
//           id="what-if"
//           title='"What If?" Career Explorations'
//           isVisible={
//             !!portfolio.publicWhatIfScenarios &&
//             portfolio.publicWhatIfScenarios.length > 0
//           }
//           icon={<Brain size={32} />}
//           className={clsx(
//             "what-if-section-container",
//             "rounded-xl bg-slate-200/70 p-6 sm:p-8"
//           )}
//           animationDelay={animationDelaysMap.get("what-if")}
//         >
//           <div className="space-y-8">
//             {portfolio.publicWhatIfScenarios?.map((scenario, i) => (
//               <div
//                 key={`whatif-${i}`}
//                 className={clsx(
//                   "what-if-item",
//                   "rounded-lg border border-teal-200 bg-white p-6 shadow-xl"
//                 )}
//               >
//                 <h3 className="mb-3 text-xl font-semibold italic text-teal-700">
//                   &quot;{scenario.scenarioText}&quot;
//                 </h3>
//                 <p className="mb-4 leading-relaxed text-gray-700">
//                   {scenario.adaptedResult.adaptedNarrative}
//                 </p>
//                 <div className="mb-3">
//                   <h4 className="text-md mb-1 font-semibold text-teal-600">
//                     Key Transferable Skills:
//                   </h4>
//                   <ul className="list-inside list-disc space-y-0.5 pl-5 text-sm text-teal-700">
//                     {scenario.adaptedResult.keyTransferableSkills.map(
//                       (skill, sIdx) => <li key={`wif-skill-${i}-${sIdx}`}>{skill}</li>
//                     )}
//                   </ul>
//                 </div>
//                 <div>
//                   <h4 className="text-md mb-1 font-semibold text-teal-600">
//                     Pivot Points:
//                   </h4>
//                   <ul className="list-inside list-disc space-y-0.5 pl-5 text-sm text-teal-700">
//                     {scenario.adaptedResult.pivotPoints.map((point, pIdx) => (
//                       <li key={`wif-point-${i}-${pIdx}`}>{point}</li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </PortfolioSectionWrapper>

//         {/* ── Hidden Gems ── */}
//         <PortfolioSectionWrapper
//           id="hidden-gems"
//           title="Key Insights & Hidden Gems"
//           isVisible={
//             ds.narrativeSuite?.showHiddenGems &&
//             !!portfolio.publicHiddenGems &&
//             portfolio.publicHiddenGems.hiddenGems.length > 0
//           }
//           icon={<ThumbsUp size={32} />}
//           className={clsx(
//             "hidden-gems-section-container",
//             "rounded-xl bg-indigo-50 p-6 sm:p-8"
//           )}
//           animationDelay={animationDelaysMap.get("hidden-gems")}
//         >
//           <div className="space-y-6">
//             {portfolio.publicHiddenGems?.hiddenGems.map((gem, i) => (
//               <div
//                 key={`gem-${i}`}
//                 className={clsx(
//                   "hidden-gem-item",
//                   "rounded-lg border border-amber-300 bg-white p-5 shadow-xl"
//                 )}
//               >
//                 <h3 className="mb-2 flex items-center text-xl font-semibold text-amber-700">
//                   <Lightbulb size={20} className="mr-2 text-amber-500" />{" "}
//                   {gem.gem}
//                 </h3>
//                 <p className="mt-1 text-sm text-gray-700">
//                   <strong className="font-medium text-amber-800">
//                     Why it’s valuable:
//                   </strong>{" "}
//                   {gem.reasoning}
//                 </p>
//                 <p className="mt-2 text-sm text-gray-700">
//                   <strong className="font-medium text-amber-800">
//                     Suggestion:
//                   </strong>{" "}
//                   {gem.suggestion}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </PortfolioSectionWrapper>

//         <footer className="mt-20 border-t-2 border-gray-300 py-10 text-center">
//           <p className="text-sm text-gray-500">
//             © {new Date().getFullYear()}{" "}
//             {portfolio.publicFullName || portfolio.title}.
//           </p>
//           <p className="mt-1 text-xs text-gray-400">
//             Portfolio generated with Resume Wizard Pro.
//           </p>
//         </footer>
//       </div>
//     </div>
//   );
// }

// src/app/portfolio/[identifier]/page.tsx
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { clsx } from "clsx";
import React, { Suspense } from "react";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

// Icons from lucide-react
import {
  Briefcase,
  GraduationCap,
  Sparkles,
  Zap,
  ChevronRight,
  ExternalLink,
  Youtube,
  Link as LinkIcon,
  Lightbulb,
  Award,
  Brain,
  ThumbsUp,
  Eye,
  Mail,
  Phone,
  Linkedin,
  MapPin,
  Gift,
  ShieldCheck,
  Edit,
  Lock,
  type LucideProps,
} from "lucide-react";

import { AnimatedSection } from "@/components/AnimatedSection";
import { TableOfContents } from "@/components/TableOfContents";
// import type  NextPageProps  from "next/app"; // App Router page props type

import { ResumeJSON } from "@/components/ATSScore";
import {
  WhatIfResult,
  GoldenThreadEvidence as AIGoldenThreadEvidence,
  HiddenGemsResult,
  InitialNarrativeResult,
} from "@/components/NarrativeWeaver";

// ── Helper to check if a string is a UUID ──
function isUuid(s: string): boolean {
  if (!s) return false;
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(s);
}

// ── Interfaces ──
interface PortfolioDisplaySettings {
  contact: {
    showEmail?: boolean;
    showPhone?: boolean;
    showLocation?: boolean;
    showLinkedIn?: boolean;
    showPhoto?: boolean;
  };
  sections: {
    showSummary?: boolean;
    showSkills?: boolean;
    showWorkExperience?: boolean;
    showEducation?: boolean;
    showVolunteering?: boolean;
    showCertifications?: boolean;
    showReferences?: boolean;
  };
  narrativeSuite: {
    showCareerNarrative?: boolean;
    showGoldenThread?: boolean;
    showKeyThemes?: boolean;
    showHiddenGems?: boolean;
  };
}
interface PortfolioShowcaseItem {
  id: string;
  name: string;
  description: string;
  link?: string;
  skillsUsed?: string[];
}
interface PortfolioShowcaseSection {
  id: string;
  title: string;
  items: PortfolioShowcaseItem[];
}
interface VolunteeringItem {
  organization?: string;
  role?: string;
  startDate?: string;
  endDate?: string;
  bullets?: string[];
  [key: string]: unknown; // For flexibility
}
interface PortfolioData {
  id: string;
  title: string;
  isPublic: boolean;
  theme: string;
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
  publicVolunteering?: VolunteeringItem[] | null;
  publicCertifications?: ResumeJSON["certifications"] | null;
  publicCareerNarrative?: string | null;
  publicGoldenThread?: string | null;
  publicGoldenThreadEvidence?: AIGoldenThreadEvidence[] | null;
  publicKeyThemes?: InitialNarrativeResult["keyThemes"] | null;
  publicHiddenGems?: HiddenGemsResult | null;
  publicWhatIfScenarios?: Array<{
    scenarioText: string;
    adaptedResult: WhatIfResult;
  }> | null;
  showcaseSections?: PortfolioShowcaseSection[] | null;
  displaySettings?: PortfolioDisplaySettings | null;
  isOwnerViewing: boolean; // Made non-optional as it's always set
}

const defaultDisplaySettings: PortfolioDisplaySettings = {
  contact: {
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

// ── Fetch and assemble everything from Prisma ──
async function getPortfolioData(
  identifier: string,
): Promise<PortfolioData | null> {
  // Return type simplified
  let portfolioRecord = null;
  const viewer = await currentUser();

  if (isUuid(identifier)) {
    portfolioRecord = await prisma.livingPortfolio.findUnique({
      where: { id: identifier },
      include: { profile: { select: { userId: true } } },
    });
  } else {
    portfolioRecord = await prisma.livingPortfolio.findUnique({
      where: { slug: identifier },
      include: { profile: { select: { userId: true } } },
    });
  }

  if (!portfolioRecord) return null;

  const isOwner = !!(viewer && portfolioRecord.profile?.userId === viewer.id);
  if (!portfolioRecord.isPublic && !isOwner) {
    return null;
  }

  const displaySettings =
    (portfolioRecord.displaySettings as PortfolioDisplaySettings | null) ||
    defaultDisplaySettings;

  return {
    id: portfolioRecord.id,
    title: portfolioRecord.title,
    isPublic: portfolioRecord.isPublic,
    theme: portfolioRecord.theme || "default",
    isOwnerViewing: isOwner, // This is a boolean
    publicFullName: portfolioRecord.publicFullName,
    publicJobTitle: portfolioRecord.publicJobTitle,
    publicEmail: portfolioRecord.publicEmail,
    publicPhone: portfolioRecord.publicPhone,
    publicLocation: portfolioRecord.publicLocation,
    publicLinkedInUrl: portfolioRecord.publicLinkedInUrl,
    publicSummary: portfolioRecord.publicSummary,
    publicSkills: portfolioRecord.publicSkills as string[] | null,
    publicWorkExperiences: portfolioRecord.publicWorkExperiences as
      | ResumeJSON["workExperiences"]
      | null,
    publicEducations: portfolioRecord.publicEducations as
      | ResumeJSON["educations"]
      | null,
    publicVolunteering: portfolioRecord.publicVolunteering as
      | VolunteeringItem[]
      | null,
    publicCertifications: portfolioRecord.publicCertifications as
      | ResumeJSON["certifications"]
      | null,
    publicCareerNarrative: portfolioRecord.publicCareerNarrative,
    publicGoldenThread: portfolioRecord.publicGoldenThread,
    publicGoldenThreadEvidence: portfolioRecord.publicGoldenThreadEvidence as
      | AIGoldenThreadEvidence[]
      | null,
    publicKeyThemes: portfolioRecord.publicKeyThemes as
      | InitialNarrativeResult["keyThemes"]
      | null,
    publicHiddenGems:
      portfolioRecord.publicHiddenGems as HiddenGemsResult | null,
    publicWhatIfScenarios: portfolioRecord.publicWhatIfScenarios as Array<{
      scenarioText: string;
      adaptedResult: WhatIfResult;
    }> | null,
    showcaseSections: portfolioRecord.showcaseSections as
      | PortfolioShowcaseSection[]
      | null,
    displaySettings,
  };
}

// Define a common props type for the page and metadata function
// type PortfolioPageProps = {
//   params: { identifier: string };
//   searchParams: { [key: string]: string | string[] | undefined };
// };

// ── generateMetadata must accept “params” (and optionally searchParams) ──
// export async function generateMetadata(
//   { params }: PortfolioPageProps // Use the common type
// ): Promise<Metadata> {
// export async function generateMetadata({ params }: { params: { identifier: string } }): Promise<Metadata> {
export async function generateMetadata({
  params,
}: {
  params: any;
}): Promise<Metadata> {
  // export async function generateMetadata({ params }: { params: { identifier: string } }): Promise<Metadata> {
  const { identifier } = await params;
  if (!identifier) return { title: "Portfolio Not Found" };

  const portfolio = await getPortfolioData(identifier);
  if (!portfolio) return { title: "Portfolio Not Found" };

  return {
    title: `${
      portfolio.publicFullName || portfolio.title || "Career Portfolio"
    } | Resume Wizard Pro`,
    description:
      portfolio.publicSummary ||
      `View the interactive career portfolio of ${
        portfolio.publicFullName || portfolio.title
      }. Created with Resume Wizard Pro.`,

    openGraph: {
      title: `${
        portfolio.publicFullName || portfolio.title || "Career Portfolio"
      } | Resume Wizard Pro`,
      description:
        portfolio.publicSummary ||
        `View the interactive career portfolio of ${
          portfolio.publicFullName || portfolio.title
        }. Created with Resume Wizard Pro.`,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_APP_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "AI Resume Builder",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${
        portfolio.publicFullName || portfolio.title || "Career Portfolio"
      } | Resume Wizard Pro`,
      description:
        portfolio.publicSummary ||
        `View the interactive career portfolio of ${
          portfolio.publicFullName || portfolio.title
        }. Created with Resume Wizard Pro.`,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_APP_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "AI Resume Builder",
        },
      ],
    },
  };
}

// ── A minimal “section wrapper” component ──
const sectionCardClass = "bg-white p-6 sm:p-8 rounded-xl shadow-xl";
const sectionTitleClassPublic = "text-3xl md:text-4xl font-bold text-gray-800";
const PortfolioSectionWrapper: React.FC<{
  id: string;
  title?: string;
  children: React.ReactNode;
  isVisible?: boolean;
  className?: string;
  icon?: React.ReactNode;
  titleClassName?: string;
  contentClassName?: string;
  animationDelay?: number;
}> = ({
  id,
  title,
  children,
  isVisible = true,
  className = "",
  icon,
  titleClassName = "",
  contentClassName = "",
  animationDelay = 0,
}) => {
  if (!isVisible) return null;

  const hasContent =
    React.Children.count(children) > 0 ||
    (Array.isArray(children) &&
      children.length > 0 &&
      children.some((child) => child != null));
  if (!title && !hasContent) return null;

  return (
    <AnimatedSection
      id={id}
      delay={animationDelay}
      className={clsx("portfolio-section", "py-8 md:py-10", className)}
    >
      {title && (
        <div className="mb-6 flex items-center md:mb-8">
          {icon && (
            <span
              className={clsx(
                "portfolio-section-icon",
                "mr-4 flex-shrink-0 scale-125 text-indigo-600",
              )}
            >
              {icon}
            </span>
          )}
          <h2
            className={clsx(
              "portfolio-section-title",
              sectionTitleClassPublic,
              titleClassName,
            )}
          >
            {title}
          </h2>
        </div>
      )}
      {hasContent ? (
        <div
          className={clsx(
            "portfolio-prose",
            "prose prose-slate max-w-none leading-relaxed text-gray-700 lg:prose-lg",
            contentClassName,
          )}
        >
          {children}
        </div>
      ) : (
        title && <p className="italic text-gray-500">No content to display.</p>
      )}
    </AnimatedSection>
  );
};

// ── YouTube‐ID helper ──
function getYouTubeVideoId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

// ── THE PAGE ITSELF ──
// export default async function LivingPortfolioPage(
//   { params, }: PortfolioPageProps // Use the common type
// ) {
// export default async function LivingPortfolioPage({ params }: { params: { identifier: string } }) {
// export default async function LivingPortfolioPage({ params }: { params: { identifier: string } }) {
export default async function LivingPortfolioPage({ params }: { params: any }) {
  const { identifier } = await params;
  if (!identifier) notFound();

  const portfolio = await getPortfolioData(identifier);
  if (!portfolio) notFound();

  const ds = portfolio.displaySettings || defaultDisplaySettings;
  const hasContactInfo =
    ds.contact?.showEmail ||
    ds.contact?.showLinkedIn ||
    ds.contact?.showLocation ||
    ds.contact?.showPhone;
  const currentTheme = portfolio.theme || "default";

  // Build up a simple “table of contents” for Suspense
  const tocItems: {
    id: string;
    title: string;
    level: number;
    icon?: React.ReactElement<LucideProps>;
  }[] = [];
  const animationDelaysMap = new Map<string, number>();
  let currentDelay = 0.1;
  const delayIncrement = 0.15;

  function addSection(
    condition: boolean | undefined | null,
    id: string,
    title: string,
    iconElement?: React.ReactElement<LucideProps>,
    level: number = 1,
  ) {
    if (condition) {
      tocItems.push({ id, title, level, icon: iconElement });
      animationDelaysMap.set(id, currentDelay);
      currentDelay += delayIncrement;
    }
  }

  addSection(true, "hero", "Top Section", <Eye />);
  addSection(
    ds.narrativeSuite?.showCareerNarrative && !!portfolio.publicCareerNarrative,
    "hero-narrative",
    "Career Narrative",
    <Eye />,
  );
  addSection(
    ds.narrativeSuite?.showGoldenThread && !!portfolio.publicGoldenThread,
    "golden-thread",
    "Golden Thread",
    <Zap />,
  );
  addSection(
    ds.sections?.showSummary && !!portfolio.publicSummary,
    "summary",
    "Professional Summary",
    <Briefcase />,
  );
  addSection(
    ds.narrativeSuite?.showKeyThemes &&
      !!portfolio.publicKeyThemes &&
      portfolio.publicKeyThemes.length > 0,
    "key-themes",
    "Key Themes",
    <Sparkles />,
  );
  addSection(
    ds.sections?.showSkills &&
      !!portfolio.publicSkills &&
      portfolio.publicSkills.length > 0,
    "skills",
    "Skills",
    <Lightbulb />,
  );
  addSection(
    ds.sections?.showWorkExperience &&
      !!portfolio.publicWorkExperiences &&
      portfolio.publicWorkExperiences.length > 0,
    "experience",
    "Experience",
    <Briefcase />,
  );

  let showcaseRootAdded = false;
  if (portfolio.showcaseSections && portfolio.showcaseSections.length > 0) {
    for (const sec of portfolio.showcaseSections) {
      if (sec.items && sec.items.length > 0) {
        if (!showcaseRootAdded) {
          addSection(true, "showcase-main", "Showcase", <Award />);
          showcaseRootAdded = true;
        }
        addSection(true, `showcase-${sec.id}`, sec.title, <ChevronRight />, 2);
      }
    }
  }

  addSection(
    ds.sections?.showEducation &&
      !!portfolio.publicEducations &&
      portfolio.publicEducations.length > 0,
    "education",
    "Education",
    <GraduationCap />,
  );
  addSection(
    ds.sections?.showVolunteering &&
      !!portfolio.publicVolunteering &&
      portfolio.publicVolunteering.length > 0,
    "volunteering",
    "Volunteering",
    <Gift />,
  );
  addSection(
    ds.sections?.showCertifications &&
      !!portfolio.publicCertifications &&
      portfolio.publicCertifications.length > 0,
    "certifications",
    "Certifications",
    <ShieldCheck />,
  );
  addSection(
    !!portfolio.publicWhatIfScenarios &&
      portfolio.publicWhatIfScenarios.length > 0,
    "what-if",
    '"What If?" Scenarios',
    <Brain />,
  );
  addSection(
    ds.narrativeSuite?.showHiddenGems &&
      !!portfolio.publicHiddenGems &&
      portfolio.publicHiddenGems.hiddenGems.length > 0,
    "hidden-gems",
    "Hidden Gems",
    <ThumbsUp />,
  );

  return (
    // THEME HOOK: apply a root‐level “theme‐X” class so your CSS can override
    <div
      className={clsx(
        "min-h-screen font-sans",
        `theme-${currentTheme}`,
        "bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200",
      )}
    >
      <Suspense fallback={null}>
        <TableOfContents items={tocItems} />
      </Suspense>

      {portfolio.isOwnerViewing && !portfolio.isPublic && (
        <div className="sticky top-0 z-40 border-b-2 border-yellow-400 bg-yellow-100 p-4 text-center text-sm text-yellow-800 shadow-md">
          <div className="container mx-auto flex items-center justify-center gap-2">
            <Lock size={16} />
            You are viewing this portfolio in{" "}
            <strong>Private Preview Mode</strong>.
            <Link
              href={`/portfolio-editor/${portfolio.id}`}
              className="ml-3 rounded-md bg-yellow-500 px-3 py-1 text-xs font-semibold text-white shadow hover:bg-yellow-600"
            >
              Edit & Publish
            </Link>
          </div>
        </div>
      )}

      {portfolio.isOwnerViewing && (
        <div className="fixed bottom-6 right-6 z-50 lg:bottom-8 lg:right-8">
          <Link
            href={`/portfolio-editor/${portfolio.id}`}
            className="flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-3 text-white shadow-xl transition-transform hover:scale-105 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            title="Edit this Portfolio"
          >
            <Edit size={18} />
            <span className="text-sm font-medium">Edit Portfolio</span>
          </Link>
        </div>
      )}

      <div
        className={clsx(
          "portfolio-page-container",
          "container mx-auto overflow-x-hidden px-4 py-12 md:py-20",
          "max-w-5xl",
          "lg:pl-20",
        )}
      >
        {/* ── Hero Section ── */}
        <AnimatedSection
          id="hero"
          delay={animationDelaysMap.get("hero") || 0}
          className={clsx(
            "portfolio-header",
            "mb-16 rounded-xl bg-white p-6 text-center shadow-2xl md:mb-24",
          )}
        >
          {ds.contact?.showPhoto && (
            <div
              className={clsx(
                "mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full shadow-lg ring-4 sm:h-36 sm:w-36",
                "bg-indigo-100 ring-white",
                "avatar-container",
              )}
            >
              <span
                className={clsx(
                  "text-5xl font-semibold",
                  "text-indigo-600",
                  "avatar-initials",
                )}
              >
                {portfolio.publicFullName
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase() || "U"}
              </span>
            </div>
          )}

          <h1 className="mb-3 text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
            {portfolio.publicFullName || portfolio.title}
          </h1>
          {portfolio.publicJobTitle && (
            <p className="mb-6 text-xl font-semibold text-indigo-700 sm:text-2xl">
              {portfolio.publicJobTitle}
            </p>
          )}

          {hasContactInfo && (
            <div
              className={clsx(
                "portfolio-contact-info",
                "mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-gray-600",
              )}
            >
              {ds.contact?.showEmail && portfolio.publicEmail && (
                <a
                  href={`mailto:${portfolio.publicEmail}`}
                  className="flex items-center text-sm hover:text-indigo-700 sm:text-base"
                >
                  <Mail size={18} className="mr-1.5 text-indigo-500" />{" "}
                  {portfolio.publicEmail}
                </a>
              )}
              {ds.contact?.showPhone && portfolio.publicPhone && (
                <span className="flex items-center text-sm sm:text-base">
                  <Phone size={18} className="mr-1.5 text-indigo-500" />{" "}
                  {portfolio.publicPhone}
                </span>
              )}
              {ds.contact?.showLocation && portfolio.publicLocation && (
                <span className="flex items-center text-sm sm:text-base">
                  <MapPin size={18} className="mr-1.5 text-indigo-500" />{" "}
                  {portfolio.publicLocation}
                </span>
              )}
              {ds.contact?.showLinkedIn && portfolio.publicLinkedInUrl && (
                <a
                  href={portfolio.publicLinkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm font-medium text-indigo-700 hover:text-indigo-800 sm:text-base"
                >
                  <Linkedin size={18} className="mr-1.5" /> LinkedIn Profile
                </a>
              )}
            </div>
          )}
        </AnimatedSection>

        {/* ── Career Narrative ── */}
        <PortfolioSectionWrapper
          id="hero-narrative"
          title="My Career Narrative"
          isVisible={
            ds.narrativeSuite?.showCareerNarrative &&
            !!portfolio.publicCareerNarrative
          }
          className={sectionCardClass}
          icon={<Eye size={32} />}
          animationDelay={animationDelaysMap.get("hero-narrative")}
        >
          <p className="mx-auto max-w-3xl text-lg italic leading-relaxed text-gray-700 md:text-xl">
            &quot;{portfolio.publicCareerNarrative}&quot;
          </p>
        </PortfolioSectionWrapper>

        {/* ── Golden Thread ── */}
        <PortfolioSectionWrapper
          id="golden-thread"
          isVisible={
            ds.narrativeSuite?.showGoldenThread &&
            !!portfolio.publicGoldenThread
          }
          className="rounded-xl border border-indigo-200 bg-indigo-50 p-8 text-center shadow-xl md:p-12"
          icon={<Zap size={36} className="mx-auto mb-4 text-indigo-600" />}
          animationDelay={animationDelaysMap.get("golden-thread")}
        >
          <h3 className="mb-3 text-xl font-semibold text-indigo-700">
            My Golden Thread
          </h3>
          <p className="mx-auto max-w-3xl text-2xl font-medium italic text-gray-800 md:text-3xl">
            &quot;{portfolio.publicGoldenThread}&quot;
          </p>
          {ds.narrativeSuite?.showGoldenThread &&
            portfolio.publicGoldenThreadEvidence &&
            portfolio.publicGoldenThreadEvidence.length > 0 && (
              <div className="mx-auto mt-8 max-w-xl text-left">
                <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-indigo-700">
                  Evidence From My Journey:
                </h4>
                <ul className="space-y-3">
                  {portfolio.publicGoldenThreadEvidence.map((ev, i) => (
                    <li
                      key={`gte-${i}`}
                      className="flex items-start rounded-lg bg-white p-4 text-sm text-gray-700 shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
                    >
                      <ChevronRight
                        size={20}
                        className="mr-2.5 mt-0.5 flex-shrink-0 text-indigo-500"
                      />
                      <div>
                        <strong className="font-semibold text-indigo-800">
                          {ev.section.replace(/([A-Z])/g, " $1").trim()}:
                        </strong>{" "}
                        {ev.textSnippet}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </PortfolioSectionWrapper>

        {/* ── Professional Summary ── */}
        <PortfolioSectionWrapper
          id="summary"
          title="Professional Summary"
          isVisible={ds.sections?.showSummary && !!portfolio.publicSummary}
          icon={<Briefcase size={32} />}
          className={sectionCardClass}
          animationDelay={animationDelaysMap.get("summary")}
        >
          <p className="whitespace-pre-line">{portfolio.publicSummary}</p>
        </PortfolioSectionWrapper>

        {/* ── Key Themes & Pillars ── */}
        <PortfolioSectionWrapper
          id="key-themes"
          title="Key Themes & Pillars"
          isVisible={
            ds.narrativeSuite?.showKeyThemes &&
            !!portfolio.publicKeyThemes &&
            portfolio.publicKeyThemes.length > 0
          }
          icon={<Sparkles size={32} />}
          className={sectionCardClass}
          animationDelay={animationDelaysMap.get("key-themes")}
        >
          <div className="mt-2 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {portfolio.publicKeyThemes?.map((themeObj, i) => (
              <div
                key={`theme-${i}`}
                className={clsx(
                  "key-theme-card",
                  "transform rounded-lg p-6 shadow-lg transition-shadow hover:-translate-y-1 hover:shadow-xl",
                  "border border-indigo-200 bg-indigo-50",
                )}
              >
                <h3
                  className={clsx(
                    "key-theme-card-title",
                    "mb-2 text-xl font-semibold",
                    "text-indigo-700",
                  )}
                >
                  {themeObj.theme}
                </h3>
                <p
                  className={clsx(
                    "key-theme-card-text",
                    "text-sm leading-normal",
                    "text-gray-600",
                  )}
                >
                  {themeObj.evidence}
                </p>
              </div>
            ))}
          </div>
        </PortfolioSectionWrapper>

        {/* ── Core Skills & Competencies ── */}
        <PortfolioSectionWrapper
          id="skills"
          title="Core Skills & Competencies"
          isVisible={
            ds.sections?.showSkills &&
            !!portfolio.publicSkills &&
            portfolio.publicSkills.length > 0
          }
          icon={<Lightbulb size={32} />}
          className={sectionCardClass}
          animationDelay={animationDelaysMap.get("skills")}
        >
          <div className="flex flex-wrap gap-3">
            {portfolio.publicSkills?.map((skill, i) => (
              <span
                key={`skill-${i}`}
                className={clsx(
                  "skill-tag",
                  "cursor-default rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-800 shadow-md transition-colors hover:bg-indigo-200",
                )}
              >
                {skill}
              </span>
            ))}
          </div>
        </PortfolioSectionWrapper>

        {/* ── Professional Experience ── */}
        <PortfolioSectionWrapper
          id="experience"
          title="Professional Experience"
          isVisible={
            ds.sections?.showWorkExperience &&
            !!portfolio.publicWorkExperiences &&
            portfolio.publicWorkExperiences.length > 0
          }
          icon={<Briefcase size={32} />}
          className={sectionCardClass}
          animationDelay={animationDelaysMap.get("experience")}
        >
          <div
            className={clsx(
              "experience-timeline-line",
              "relative mt-2 space-y-10 before:absolute before:inset-0 before:z-0 before:ml-3.5 before:w-1 before:rounded-full before:bg-indigo-200 before:content-['']",
            )}
          >
            {portfolio.publicWorkExperiences?.map((exp, i) => (
              <div
                key={`work-${i}`}
                className={clsx(
                  "experience-timeline-item",
                  "group relative py-4 pl-12 transition-all",
                )}
              >
                <div
                  className={clsx(
                    "experience-timeline-dot",
                    "absolute left-0 top-1 z-10 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-indigo-600 shadow-md ring-2 ring-indigo-300 transition-transform group-hover:scale-110",
                  )}
                >
                  <Briefcase size={14} className="text-white" />
                </div>
                <h3 className="mb-0.5 text-2xl font-bold text-gray-800">
                  {exp.position}
                </h3>
                <p className="mb-1 text-lg font-semibold text-indigo-700">
                  {exp.company}
                </p>
                <p className="mb-4 text-sm text-gray-500">
                  {exp.startDate} - {exp.endDate || "Present"}
                </p>
                <ul className="list-none space-y-2.5">
                  {exp.bullets?.map((bullet, j) => (
                    <li
                      key={`bullet-work-${i}-${j}`}
                      className="flex items-start leading-relaxed text-gray-700"
                    >
                      <ChevronRight
                        size={20}
                        className="mr-2 mt-1 flex-shrink-0 text-indigo-500"
                      />{" "}
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </PortfolioSectionWrapper>

        {/* ── Showcase Sections ── */}
        {portfolio.showcaseSections &&
          portfolio.showcaseSections.length > 0 &&
          portfolio.showcaseSections.some(
            (sec) => sec.items && sec.items.length > 0,
          ) && (
            <div id="showcase-main">
              {portfolio.showcaseSections
                .filter((sec) => sec.items && sec.items.length > 0)
                .map((showcase) => (
                  <PortfolioSectionWrapper
                    key={`showcase-${showcase.id}`}
                    id={`showcase-${showcase.id}`}
                    title={showcase.title}
                    icon={<Award size={32} />}
                    isVisible={true}
                    className={sectionCardClass}
                    animationDelay={animationDelaysMap.get(
                      `showcase-${showcase.id}`,
                    )}
                  >
                    <div className="mt-2 space-y-10">
                      {showcase.items.map((item) => {
                        const youtubeVideoId = item.link
                          ? getYouTubeVideoId(item.link)
                          : null;
                        return (
                          <div
                            key={`showcase-item-${showcase.id}-${item.id}`}
                            className={clsx(
                              "showcase-item",
                              "transform rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-shadow duration-300 hover:scale-[1.02] hover:shadow-2xl",
                            )}
                          >
                            <h3 className="mb-2 text-2xl font-semibold text-gray-800">
                              {item.name}
                            </h3>
                            {item.link && (
                              <a
                                href={
                                  item.link.startsWith("http")
                                    ? item.link
                                    : `https://${item.link}`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className={clsx(
                                  "portfolio-link",
                                  "group mb-3 inline-flex items-center text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-800",
                                )}
                              >
                                {youtubeVideoId ? (
                                  <>
                                    <Youtube size={16} className="mr-1.5" />{" "}
                                    View on YouTube
                                  </>
                                ) : (
                                  <>
                                    <LinkIcon size={14} className="mr-1.5" />{" "}
                                    View Project/Resource
                                  </>
                                )}
                                <ExternalLink
                                  size={14}
                                  className="ml-1.5 transition-transform group-hover:translate-x-0.5"
                                />
                              </a>
                            )}
                            <p className="mb-4 whitespace-pre-line leading-relaxed text-gray-700">
                              {item.description}
                            </p>
                            {item.skillsUsed && item.skillsUsed.length > 0 && (
                              <div>
                                <strong className="text-sm font-semibold uppercase tracking-wider text-gray-600">
                                  Skills Leveraged:
                                </strong>
                                <div className="mt-2 flex flex-wrap gap-2.5">
                                  {item.skillsUsed.map((skill) => (
                                    <span
                                      key={skill}
                                      className="rounded-full bg-slate-200 px-3 py-1.5 text-xs font-medium text-slate-800 shadow-sm"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </PortfolioSectionWrapper>
                ))}
            </div>
          )}

        {/* ── Education ── */}
        <PortfolioSectionWrapper
          id="education"
          title="Education & Credentials"
          isVisible={
            ds.sections?.showEducation &&
            !!portfolio.publicEducations &&
            portfolio.publicEducations.length > 0
          }
          icon={<GraduationCap size={32} />}
          className={sectionCardClass}
          animationDelay={animationDelaysMap.get("education")}
        >
          <div
            className={clsx(
              "education-timeline-line",
              "relative mt-2 space-y-8 before:absolute before:inset-0 before:z-0 before:ml-3.5 before:w-1 before:rounded-full before:bg-indigo-200 before:content-['']",
            )}
          >
            {portfolio.publicEducations?.map((edu, i) => (
              <div
                key={`edu-${i}`}
                className={clsx(
                  "education-timeline-item",
                  "group relative py-4 pl-12 transition-all",
                )}
              >
                <div
                  className={clsx(
                    "education-timeline-dot",
                    "absolute left-0 top-1 z-10 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-indigo-600 shadow-md ring-2 ring-indigo-300 transition-transform group-hover:scale-110",
                  )}
                >
                  <GraduationCap size={14} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {edu.degree}
                </h3>
                <p className="text-md font-medium text-indigo-600">
                  {edu.school}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {edu.startDate} - {edu.endDate || "Graduated"}
                </p>
              </div>
            ))}
          </div>
        </PortfolioSectionWrapper>

        {/* ── Volunteering Experience ── */}
        <PortfolioSectionWrapper
          id="volunteering"
          title="Volunteering Experience"
          isVisible={
            ds.sections?.showVolunteering &&
            !!portfolio.publicVolunteering &&
            portfolio.publicVolunteering.length > 0
          }
          icon={<Gift size={32} />}
          className={sectionCardClass}
          animationDelay={animationDelaysMap.get("volunteering")}
        >
          <div className="mt-2 space-y-8">
            {portfolio.publicVolunteering?.map((vol: VolunteeringItem, i) => (
              <div
                key={`vol-${i}`}
                className={clsx(
                  "volunteering-item",
                  "rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-md transition-shadow hover:shadow-lg",
                )}
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {vol.role}
                </h3>
                <p className="text-md font-medium text-indigo-600">
                  {vol.organization}
                </p>
                <p className="mb-2 mt-1 text-sm text-gray-500">
                  {vol.startDate} - {vol.endDate || "Present"}
                </p>
                {vol.bullets && vol.bullets.length > 0 && (
                  <ul className="list-none space-y-1.5 pl-1">
                    {vol.bullets.map((bullet: string, j: number) => (
                      <li
                        key={`bullet-vol-${i}-${j}`}
                        className="flex items-start text-sm text-gray-600"
                      >
                        <ChevronRight
                          size={16}
                          className="mr-1.5 mt-0.5 flex-shrink-0 text-indigo-400"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </PortfolioSectionWrapper>

        {/* ── Certifications ── */}
        <PortfolioSectionWrapper
          id="certifications"
          title="Certifications"
          isVisible={
            ds.sections?.showCertifications &&
            !!portfolio.publicCertifications &&
            portfolio.publicCertifications.length > 0
          }
          icon={<ShieldCheck size={32} />}
          className={sectionCardClass}
          animationDelay={animationDelaysMap.get("certifications")}
        >
          <div className="mt-2 space-y-6">
            {portfolio.publicCertifications?.map((cert, i) => (
              <div
                key={`cert-${i}`}
                className={clsx(
                  "certification-item",
                  "rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-md transition-shadow hover:shadow-lg",
                )}
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {cert.title}
                </h3>
                <p className="text-md font-medium text-indigo-600">
                  {cert.issuer}
                </p>
                <p className="mt-1 text-sm text-gray-500">{cert.date}</p>
              </div>
            ))}
          </div>
        </PortfolioSectionWrapper>

        {/* ── “What If?” Scenarios ── */}
        <PortfolioSectionWrapper
          id="what-if"
          title='"What If?" Career Explorations'
          isVisible={
            !!portfolio.publicWhatIfScenarios &&
            portfolio.publicWhatIfScenarios.length > 0
          }
          icon={<Brain size={32} />}
          className={clsx(
            "what-if-section-container",
            "rounded-xl bg-slate-200/70 p-6 sm:p-8",
          )}
          animationDelay={animationDelaysMap.get("what-if")}
        >
          <div className="space-y-8">
            {portfolio.publicWhatIfScenarios?.map((scenario, i) => (
              <div
                key={`whatif-${i}`}
                className={clsx(
                  "what-if-item",
                  "rounded-lg border border-teal-200 bg-white p-6 shadow-xl",
                )}
              >
                <h3 className="mb-3 text-xl font-semibold italic text-teal-700">
                  &quot;{scenario.scenarioText}&quot;
                </h3>
                <p className="mb-4 leading-relaxed text-gray-700">
                  {scenario.adaptedResult.adaptedNarrative}
                </p>
                <div className="mb-3">
                  <h4 className="text-md mb-1 font-semibold text-teal-600">
                    Key Transferable Skills:
                  </h4>
                  <ul className="list-inside list-disc space-y-0.5 pl-5 text-sm text-teal-700">
                    {scenario.adaptedResult.keyTransferableSkills.map(
                      (skill, sIdx) => (
                        <li key={`wif-skill-${i}-${sIdx}`}>{skill}</li>
                      ),
                    )}
                  </ul>
                </div>
                <div>
                  <h4 className="text-md mb-1 font-semibold text-teal-600">
                    Pivot Points:
                  </h4>
                  <ul className="list-inside list-disc space-y-0.5 pl-5 text-sm text-teal-700">
                    {scenario.adaptedResult.pivotPoints.map((point, pIdx) => (
                      <li key={`wif-point-${i}-${pIdx}`}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </PortfolioSectionWrapper>

        {/* ── Hidden Gems ── */}
        <PortfolioSectionWrapper
          id="hidden-gems"
          title="Key Insights & Hidden Gems"
          isVisible={
            ds.narrativeSuite?.showHiddenGems &&
            !!portfolio.publicHiddenGems &&
            portfolio.publicHiddenGems.hiddenGems.length > 0
          }
          icon={<ThumbsUp size={32} />}
          className={clsx(
            "hidden-gems-section-container",
            "rounded-xl bg-indigo-50 p-6 sm:p-8",
          )}
          animationDelay={animationDelaysMap.get("hidden-gems")}
        >
          <div className="space-y-6">
            {portfolio.publicHiddenGems?.hiddenGems.map((gem, i) => (
              <div
                key={`gem-${i}`}
                className={clsx(
                  "hidden-gem-item",
                  "rounded-lg border border-amber-300 bg-white p-5 shadow-xl",
                )}
              >
                <h3 className="mb-2 flex items-center text-xl font-semibold text-amber-700">
                  <Lightbulb size={20} className="mr-2 text-amber-500" />{" "}
                  {gem.gem}
                </h3>
                <p className="mt-1 text-sm text-gray-700">
                  <strong className="font-medium text-amber-800">
                    Why it’s valuable:
                  </strong>{" "}
                  {gem.reasoning}
                </p>
                <p className="mt-2 text-sm text-gray-700">
                  <strong className="font-medium text-amber-800">
                    Suggestion:
                  </strong>{" "}
                  {gem.suggestion}
                </p>
              </div>
            ))}
          </div>
        </PortfolioSectionWrapper>

        <footer className="mt-20 border-t-2 border-gray-300 py-10 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()}{" "}
            {portfolio.publicFullName || portfolio.title}.
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Portfolio generated with Resume Wizard Pro.
          </p>
        </footer>
      </div>
    </div>
  );
}
