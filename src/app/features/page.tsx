// // app/features/page.tsx
// "use client";

// import React from "react";
// import Link from "next/link";
// import Image, { StaticImageData } from "next/image";
// import { useUser } from "@clerk/nextjs";
// import { motion } from "framer-motion";

// import { Button } from "@/components/ui/button";
// import {
//   FileText,
//   Send,
//   Brain,
//   ClipboardList,
//   Globe,
//   MessageCircle,
//   Mic,
//   User as ProfileUserIcon, // Renamed to avoid conflict if 'User' from Clerk is used
//   Network,
//   TrendingUp,
//   Check,
//   ArrowRight,
//   Sparkles,
//   Wand2, // For AI Resume Wizard
//   BarChart, // For Audit
//   Settings, // For Profile Settings
//   Edit,     // For Profile Posts/Create
//   Search,   // For Job Tracker (more specific than Globe)
//   CalendarDays, // For Job Tracker
//   Lightbulb, // For AI Suggestions/Lab
//   ShieldCheck, // For Data Privacy
// } from "lucide-react";

// // Placeholder for feature preview images - replace with actual paths or URLs
// // It's good practice to have these images optimized and consistently sized.
// // Example: import resumeBuilderPreview from "@/assets/features/resume-builder-preview.png";

// interface FeatureDetail {
//   icon: React.ElementType;
//   title: string;
//   description: string;
//   href: string;
//   ctaText?: string;
//   isNew?: boolean;
//   themeColor?: string; // e.g., "text-blue-500"
//   previewImage?: StaticImageData | string; // Optional
// }

// interface FeatureCategory {
//   id: string;
//   title: string;
//   description: string;
//   icon: React.ElementType;
//   features: FeatureDetail[];
// }

// const ALL_FEATURES_DATA: FeatureCategory[] = [
//   {
//     id: "document-crafting",
//     title: "Resume & Document Crafting",
//     description: "Create professional, ATS-optimized resumes and compelling cover letters that get noticed.",
//     icon: FileText,
//     features: [
//       {
//         icon: Wand2,
//         title: "AI Resume Wizard",
//         description: "Guided, step-by-step process to build your perfect resume with AI assistance.",
//         href: "/wizard",
//         ctaText: "Start Building",
//         themeColor: "text-blue-600 dark:text-blue-400",
//       },
//       {
//         icon: FileText,
//         title: "Advanced Resume Builder",
//         description: "Fine-tune every detail with our full-featured editor and modern templates.",
//         href: "/resumes",
//         ctaText: "Open Editor",
//         themeColor: "text-blue-600 dark:text-blue-400",
//       },
//       {
//         icon: Send,
//         title: "AI Cover Letter Generator",
//         description: "Generate personalized cover letters tailored to specific job applications in seconds.",
//         href: "/cover-letter",
//         ctaText: "Write Letter",
//         themeColor: "text-teal-600 dark:text-teal-400",
//       },
//       {
//         icon: BarChart,
//         title: "Instant Resume Audit",
//         description: "Get AI-powered feedback on your resume's ATS compatibility, readability, and keywords.",
//         href: "/audit",
//         ctaText: "Audit Now",
//         themeColor: "text-indigo-600 dark:text-indigo-400",
//       },
//     ],
//   },
//   {
//     id: "interview-prep",
//     title: "Interview Preparation Suite",
//     description: "Practice, get feedback, and build confidence to ace any job interview.",
//     icon: Mic,
//     features: [
//       {
//         icon: Mic,
//         title: "AI Interview Simulator",
//         description: "Audio-first mock interviews with personalized questions and real-time feedback.",
//         href: "/interview-simulator",
//         ctaText: "Practice Now",
//         isNew: true,
//         themeColor: "text-red-500 dark:text-red-400",
//       },
//       {
//         icon: Lightbulb,
//         title: "Interview Question Library",
//         description: "Access a vast library of common and role-specific interview questions.",
//         href: "/interview-questions", // Placeholder link
//         ctaText: "Browse Questions",
//         themeColor: "text-yellow-500 dark:text-yellow-400",
//       },
//       {
//         icon: Brain,
//         title: "Behavioral Analysis (Coming Soon)",
//         description: "Understand your non-verbal cues and speaking patterns for holistic improvement.",
//         href: "#",
//         ctaText: "Learn More",
//         isNew: true,
//         themeColor: "text-gray-500",
//       },
//     ],
//   },
//   {
//     id: "job-management",
//     title: "Job Search Management",
//     description: "Organize your job applications, track progress, and stay on top of your search.",
//     icon: Search,
//     features: [
//       {
//         icon: ClipboardList,
//         title: "Job Application Tracker",
//         description: "Manage applications, deadlines, contacts, and interview notes in one place.",
//         href: "/job-tracker",
//         ctaText: "Track Jobs",
//         themeColor: "text-green-600 dark:text-green-400",
//       },
//       {
//         icon: CalendarDays,
//         title: "Deadline Reminders",
//         description: "Never miss an application deadline or interview with smart reminders.",
//         href: "/job-tracker", // Part of job tracker
//         ctaText: "Set Reminders",
//         themeColor: "text-green-600 dark:text-green-400",
//       },
//     ],
//   },
//   {
//     id: "profile-networking",
//     title: "Professional Profile & Networking",
//     description: "Build your online presence, showcase your skills, and connect with opportunities.",
//     icon: ProfileUserIcon,
//     features: [
//       {
//         icon: ProfileUserIcon,
//         title: "Public Profile Hub",
//         description: "Create a shareable professional profile to showcase your achievements.",
//         href: "/profile/create", // Or link to view own profile if exists
//         ctaText: "Build Profile",
//         themeColor: "text-purple-600 dark:text-purple-400",
//       },
//       {
//         icon: Edit,
//         title: "Share Success Stories & Posts",
//         description: "Publish articles, project highlights, and career milestones.",
//         href: "/profile/posts/create",
//         ctaText: "Create Post",
//         themeColor: "text-purple-600 dark:text-purple-400",
//       },
//       {
//         icon: MessageCircle, // Changed from FileText for review requests
//         title: "Request Resume Reviews",
//         description: "Get valuable feedback on your resume from peers or mentors within the community.",
//         href: "/profile/reviews/create",
//         ctaText: "Request Review",
//         themeColor: "text-pink-500 dark:text-pink-400",
//       },
//     ],
//   },
//   {
//     id: "ai-enhancements",
//     title: "AI-Powered Enhancements",
//     description: "Leverage cutting-edge AI to gain insights and refine your career materials.",
//     icon: Sparkles,
//     features: [
//       {
//         icon: Brain, // Kept Brain for Resume Lab as it's about "thinking" with AI
//         title: "Resume Lab (GPT-4 Editing)",
//         description: "Live, AI-assisted resume editing and content generation with GPT-4.",
//         href: "/resume-lab",
//         ctaText: "Enter Lab",
//         themeColor: "text-orange-500 dark:text-orange-400",
//       },
//       {
//         icon: MessageCircle, // For AI Chat
//         title: "AI Career Chatbot",
//         description: "Get instant answers to career questions, resume tips, and interview advice.",
//         href: "/chat",
//         ctaText: "Ask AI",
//         themeColor: "text-sky-500 dark:text-sky-400",
//       },
//     ],
//   },
// ];

// const JOB_SEEKER_JOURNEY_STAGES = [
//   {
//     stage: "1. Crafting Your Application",
//     description: "Build a powerful resume and cover letter that stand out to recruiters and pass ATS scans.",
//     icon: FileText,
//     relevantFeatures: ["AI Resume Wizard", "AI Cover Letter Generator", "Instant Resume Audit"],
//     themeColor: "text-blue-500",
//   },
//   {
//     stage: "2. Preparing for Interviews",
//     description: "Practice common questions, simulate real interviews, and get feedback to boost your confidence.",
//     icon: Mic,
//     relevantFeatures: ["AI Interview Simulator", "Interview Question Library"],
//     themeColor: "text-teal-500",
//   },
//   {
//     stage: "3. Managing Your Search",
//     description: "Stay organized by tracking applications, deadlines, and contacts efficiently.",
//     icon: Search,
//     relevantFeatures: ["Job Application Tracker", "Deadline Reminders"],
//     themeColor: "text-indigo-500",
//   },
//   {
//     stage: "4. Building Your Brand",
//     description: "Showcase your skills and experience with a professional online profile and engaging content.",
//     icon: ProfileUserIcon,
//     relevantFeatures: ["Public Profile Hub", "Share Success Stories"],
//     themeColor: "text-purple-500",
//   },
//   {
//     stage: "5. Continuous Improvement",
//     description: "Leverage AI for ongoing advice, resume enhancements, and staying ahead in your career.",
//     icon: TrendingUp,
//     relevantFeatures: ["Resume Lab", "AI Career Chatbot"],
//     themeColor: "text-red-500",
//   },
// ];

// // Framer Motion Variants
// const fadeIn = {
//   initial: { opacity: 0, y: 20 },
//   animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//   exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
// };

// const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
//   initial: {},
//   animate: {
//     transition: {
//       staggerChildren,
//       delayChildren,
//     },
//   },
// });

// export default function FeaturesPage() {
//   const { isSignedIn } = useUser();
//   const primaryCtaLink = isSignedIn ? "/resumes" : "/sign-up";
//   const primaryCtaText = isSignedIn ? "Go to My Dashboard" : "Get Started for Free";

//   return (
//     <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
//       {/* Hero Section for Features Page */}
//       <motion.section
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.8 }}
//         className="py-20 md:py-28 bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900/80 text-center"
//       >
//         <div className="container mx-auto px-6">
//           <motion.div variants={fadeIn} initial="initial" animate="animate">
//             <Sparkles className="mx-auto mb-4 h-12 w-12 text-blue-500 dark:text-blue-400" />
//             <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
//               Discover the Power of
//               <span className="block sm:inline bg-gradient-to-r from-blue-600 to-teal-500 dark:from-blue-400 dark:to-teal-300 bg-clip-text text-transparent"> AI Career Suite</span>
//             </h1>
//             <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
//               Explore our comprehensive suite of AI-powered tools designed to support you at every stage of your career journey—from crafting the perfect resume to acing interviews and beyond.
//             </p>
//             <Link href={primaryCtaLink}>
//               <Button size="lg" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-10 py-3 rounded-lg text-lg font-semibold shadow-lg hover:shadow-blue-500/30 dark:hover:shadow-blue-400/30 transition-all duration-300">
//                 {primaryCtaText} <ArrowRight className="ml-2 h-5 w-5" />
//               </Button>
//             </Link>
//           </motion.div>
//         </div>
//       </motion.section>

//       {/* Features by Category Section */}
//       {ALL_FEATURES_DATA.map((category, categoryIndex) => (
//         <section
//           key={category.id}
//           className={`py-16 md:py-20 ${categoryIndex % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800/70'}`}
//         >
//           <div className="container mx-auto px-6">
//             <motion.div
//               variants={staggerContainer(0.2)}
//               initial="initial"
//               whileInView="animate"
//               viewport={{ once: true, amount: 0.2 }}
//             >
//               <motion.div variants={fadeIn} className="text-center mb-12 md:mb-16 max-w-2xl mx-auto">
//                 <category.icon className={`h-12 w-12 ${category.features[0]?.themeColor || 'text-blue-500'} mx-auto mb-4`} />
//                 <h2 className="text-3xl md:text-4xl font-bold mb-3">{category.title}</h2>
//                 <p className="text-gray-600 dark:text-gray-300 text-md md:text-lg">{category.description}</p>
//               </motion.div>

//               <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {category.features.map((feature) => (
//                   <motion.div
//                     key={feature.title}
//                     variants={fadeIn}
//                     className="flex flex-col bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
//                   >
//                     <div className="flex items-center mb-4">
//                       <feature.icon className={`h-8 w-8 mr-3 ${feature.themeColor || 'text-gray-700 dark:text-gray-300'}`} />
//                       <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
//                       {feature.isNew && (
//                         <span className="ml-auto text-xs bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100 font-semibold px-2 py-0.5 rounded-full">NEW</span>
//                       )}
//                     </div>
//                     <p className="text-gray-600 dark:text-gray-300 text-sm mb-5 flex-grow leading-relaxed">{feature.description}</p>
//                     <Link href={feature.href} className="mt-auto">
//                       <Button
//                         variant="outline"
//                         className={`w-full ${feature.themeColor ? `border-current ${feature.themeColor} hover:bg-opacity-10 dark:hover:bg-opacity-10` : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
//                       >
//                         {feature.ctaText || "Explore Feature"} <ArrowRight className="ml-2 h-4 w-4" />
//                       </Button>
//                     </Link>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           </div>
//         </section>
//       ))}

//       {/* Job Seeker Journey Section */}
//       <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
//         <div className="container mx-auto px-6">
//           <motion.div
//             variants={staggerContainer()}
//             initial="initial"
//             whileInView="animate"
//             viewport={{ once: true, amount: 0.1 }}
//           >
//             <motion.div variants={fadeIn} className="text-center mb-12 md:mb-16">
//               <TrendingUp className="h-12 w-12 text-blue-500 dark:text-blue-400 mx-auto mb-4" />
//               <h2 className="text-3xl md:text-4xl font-bold mb-3">Your Career Journey, Empowered</h2>
//               <p className="text-gray-600 dark:text-gray-300 md:text-lg max-w-2xl mx-auto">
//                 AI Career Suite supports you at every pivotal moment of your job search and professional growth.
//               </p>
//             </motion.div>

//             {/* --- REVISED TIMELINE STRUCTURE --- */}
//             <div className="relative max-w-3xl mx-auto"> {/* Constrain width for better centering */}
//               {/* Vertical timeline bar - ensure it spans the height of its content */}
//               <div
//                 className="absolute left-1/2 top-0 bottom-0 w-1 bg-blue-200 dark:bg-blue-700/50 transform -translate-x-1/2 hidden md:block"
//                 aria-hidden="true"
//               ></div>

//               {JOB_SEEKER_JOURNEY_STAGES.map((item, index) => (
//                 <div key={item.stage} className="mb-12 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-x-8 md:items-start relative last:mb-0">
//                   {/* Dot - Positioned with grid and then fine-tuned */}
//                   <div
//                     className={`hidden md:flex justify-center items-start row-start-1 ${
//                       index % 2 === 0 ? 'col-start-2' : 'col-start-2' // Always in the middle column
//                     } relative`} // Added relative for easier z-index if needed later
//                     style={{ paddingTop: 'calc(1.5rem + 2px)' }} // Initial offset to align with top of card text roughly (1.5rem is card's p-6)
//                   >
//                     <div
//                       className={`w-4 h-4 rounded-full ${item.themeColor} bg-current border-[3px] border-gray-50 dark:border-gray-800 ring-1 ${item.themeColor.replace('text-', 'ring-')} z-10`}
//                     ></div>
//                   </div>

//                   {/* Content Card */}
//                   <motion.div
//                     variants={fadeIn}
//                     className={`row-start-1 ${ // Ensure card and dot are in the same conceptual "row"
//                       index % 2 === 0
//                         ? 'md:col-start-1 md:text-right' // Even items on the left
//                         : 'md:col-start-3 md:text-left'  // Odd items on the right
//                     }`}
//                   >
//                     <div className={`p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 w-full`}>
//                       <item.icon className={`h-8 w-8 ${item.themeColor} mb-3 ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`} />
//                       <h3 className={`text-xl font-semibold mb-2 text-gray-900 dark:text-white`}>{item.stage}</h3>
//                       <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{item.description}</p>
//                       <div className={`mt-3 space-x-1 space-y-1 flex flex-wrap ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
//                         {item.relevantFeatures.map(featureName => (
//                           <span key={featureName} className="inline-block bg-gray-100 dark:bg-gray-700 text-xs text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full mb-1">
//                             {featureName}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   </motion.div>
//                 </div>
//               ))}
//             </div>
//              {/* --- END OF REVISED TIMELINE STRUCTURE --- */}
//           </motion.div>
//         </div>
//       </section>

//       {/* Data Privacy & Security (Optional but good for trust) */}
//       <section className="py-16 md:py-20 bg-white dark:bg-gray-900">
//           <div className="container mx-auto px-6 text-center">
//             <motion.div
//               variants={fadeIn}
//               initial="initial"
//               whileInView="animate"
//               viewport={{ once: true, amount: 0.5 }}
//             >
//               <ShieldCheck className="h-12 w-12 text-green-500 dark:text-green-400 mx-auto mb-4" />
//               <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Data, Your Control</h2>
//               <p className="text-gray-600 dark:text-gray-300 md:text-lg max-w-2xl mx-auto mb-8">
//                 We are committed to protecting your privacy and ensuring the security of your data. Learn more about our data practices and how we empower you.
//               </p>
//               <Link href="/legal/privacy-policy">
//                 <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-900/30">
//                   Read Our Privacy Policy
//                 </Button>
//               </Link>
//             </motion.div>
//           </div>
//       </section>

//       {/* Final CTA Section */}
//       <section className="py-20 md:py-28 bg-gradient-to-r from-blue-600 to-teal-500 dark:from-blue-500 dark:to-teal-400 text-white">
//         <div className="container mx-auto px-6 text-center">
//           <motion.div
//             variants={staggerContainer(0.3)}
//             initial="initial"
//             whileInView="animate"
//             viewport={{ once: true, amount: 0.3 }}
//           >
//             <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
//               Ready to Unlock Your Career Potential?
//             </motion.h2>
//             <motion.p variants={fadeIn} className="text-lg md:text-xl text-blue-100 dark:text-teal-100 max-w-2xl mx-auto mb-10">
//               Join thousands of successful professionals who have transformed their careers with AI Career Suite. Sign up for free and start building your future today.
//             </motion.p>
//             <motion.div variants={fadeIn}>
//               <Link href={primaryCtaLink}>
//                 <Button
//                   size="lg"
//                   className="bg-white hover:bg-gray-100 text-blue-600 dark:text-teal-500 px-12 py-3.5 rounded-lg text-lg font-semibold shadow-2xl hover:shadow-gray-400/30 dark:hover:shadow-gray-500/30 transform hover:scale-105 transition-all duration-300"
//                 >
//                   {primaryCtaText} <ArrowRight className="ml-2 h-5 w-5" />
//                 </Button>
//               </Link>
//             </motion.div>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// }

// app/features/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import { StaticImageData } from "next/image";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  FileText,
  Send,
  Brain,
  ClipboardList,
  // Globe,
  MessageCircle,
  Mic,
  User as ProfileUserIcon,
  // Network,
  TrendingUp,
  // Check,
  ArrowRight,
  Sparkles,
  Wand2,
  BarChart,
  // Settings,
  Edit,
  Search,
  CalendarDays,
  Lightbulb,
  ShieldCheck,
  LayoutGrid,
} from "lucide-react";

// Placeholder for feature preview images
// Example: import resumeBuilderPreview from "@/assets/features/resume-builder-preview.png";

interface FeatureDetail {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
  ctaText?: string;
  isNew?: boolean;
  themeColor?: string;
  previewImage?: StaticImageData | string;
}

interface FeatureCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  features: FeatureDetail[];
}

const ALL_FEATURES_DATA: FeatureCategory[] = [
  {
    id: "document-crafting",
    title: "Resume & Document Crafting",
    description:
      "Create professional, ATS-optimized resumes and compelling cover letters that get noticed.",
    icon: FileText,
    features: [
      {
        icon: Wand2,
        title: "AI Resume Wizard",
        description:
          "Guided, step-by-step process to build your perfect resume with AI assistance.",
        href: "/wizard",
        ctaText: "Start Building",
        themeColor: "text-blue-600 dark:text-blue-400",
      },
      {
        icon: FileText,
        title: "Advanced Resume Builder",
        description:
          "Fine-tune every detail with our full-featured editor and modern templates.",
        href: "/resumes",
        ctaText: "Open Editor",
        themeColor: "text-blue-600 dark:text-blue-400",
      },
      {
        icon: Send,
        title: "AI Cover Letter Generator",
        description:
          "Generate personalized cover letters tailored to specific job applications in seconds.",
        href: "/cover-letter",
        ctaText: "Write Letter",
        themeColor: "text-teal-600 dark:text-teal-400",
      },
      {
        icon: BarChart,
        title: "Instant Resume Audit",
        description:
          "Get AI-powered feedback on your resume's ATS compatibility, readability, and keywords.",
        href: "/audit",
        ctaText: "Audit Now",
        themeColor: "text-indigo-600 dark:text-indigo-400",
      },
    ],
  },
  {
    id: "interview-prep",
    title: "Interview Preparation Suite",
    description:
      "Practice, get feedback, and build confidence to ace any job interview.",
    icon: Mic,
    features: [
      {
        icon: Mic,
        title: "AI Interview Simulator",
        description:
          "Audio-first mock interviews with personalized questions and real-time feedback.",
        href: "/interview-simulator",
        ctaText: "Practice Now",
        isNew: true,
        themeColor: "text-red-500 dark:text-red-400",
      },
      {
        icon: Lightbulb,
        title: "Interview Question Library",
        description:
          "Access a vast library of common and role-specific interview questions.",
        href: "/interview-simulator",
        ctaText: "Browse Questions",
        themeColor: "text-yellow-500 dark:text-yellow-400",
      },
      {
        icon: Brain,
        title: "Behavioral Analysis (Coming Soon)",
        description:
          "Understand your non-verbal cues and speaking patterns for holistic improvement.",
        href: "#",
        isNew: true,
        themeColor: "text-gray-500",
      },
    ],
  },
  {
    id: "job-management",
    title: "Job Search Management",
    description:
      "Organize your job applications, track progress, and stay on top of your search.",
    icon: Search,
    features: [
      {
        icon: ClipboardList,
        title: "Job Application Tracker",
        description:
          "Manage applications, deadlines, contacts, and interview notes in one place.",
        href: "/job-tracker",
        ctaText: "Track Jobs",
        themeColor: "text-green-600 dark:text-green-400",
      },
      {
        icon: CalendarDays,
        title: "Deadline Reminders",
        description:
          "Never miss an application deadline or interview with smart reminders.",
        href: "/job-tracker",
        ctaText: "Set Reminders",
        themeColor: "text-green-600 dark:text-green-400",
      },
    ],
  },
  {
    id: "profile-networking",
    title: "Professional Profile & Networking",
    description:
      "Build your online presence, showcase your skills, and connect with opportunities.",
    icon: ProfileUserIcon,
    features: [
      {
        icon: ProfileUserIcon,
        title: "Public Profile Hub",
        description:
          "Create a shareable professional profile to showcase your achievements.",
        href: "/profile/create",
        ctaText: "Build Profile",
        themeColor: "text-purple-600 dark:text-purple-400",
      },
      {
        icon: Edit,
        title: "Share Success Stories & Posts",
        description:
          "Publish articles, project highlights, and career milestones.",
        href: "/profile/posts/create",
        ctaText: "Create Post",
        themeColor: "text-purple-600 dark:text-purple-400",
      },
      {
        icon: MessageCircle,
        title: "Request Resume Reviews",
        description:
          "Get valuable feedback on your resume from peers or mentors within the community.",
        href: "/profile/reviews/create",
        ctaText: "Request Review",
        themeColor: "text-pink-500 dark:text-pink-400",
      },
    ],
  },
  {
    id: "ai-enhancements",
    title: "AI-Powered Enhancements",
    description:
      "Leverage cutting-edge AI to gain insights and refine your career materials.",
    icon: Sparkles,
    features: [
      {
        icon: Brain,
        title: "Resume Lab (GPT-4 Editing)",
        description:
          "Live, AI-assisted resume editing and content generation with GPT-4.",
        href: "/resume-lab",
        ctaText: "Enter Lab",
        themeColor: "text-orange-500 dark:text-orange-400",
      },
      {
        icon: LayoutGrid, // <<< NEW FEATURE ICON
        title: "AI Portfolio Generator",
        description:
          "Build a stunning online portfolio to showcase your projects, skills, and experience with AI assistance.",
        href: "/wizard", // <<< CHOOSE YOUR DESIRED HREF
        ctaText: "Create Portfolio",
        themeColor: "text-purple-600 dark:text-purple-400", // <<< CHOOSE A THEME COLOR
        isNew: true, // Optional: if it's a new feature
      },
      {
        icon: MessageCircle,
        title: "AI Career Chatbot",
        description:
          "Get instant answers to career questions, resume tips, and interview advice.",
        href: "/chat",
        ctaText: "Ask AI",
        themeColor: "text-sky-500 dark:text-sky-400",
      },
    ],
  },
];

const JOB_SEEKER_JOURNEY_STAGES = [
  {
    stage: "1. Crafting Your Application",
    description:
      "Build a powerful resume and cover letter that stand out to recruiters and pass ATS scans.",
    icon: FileText,
    relevantFeatures: [
      "AI Resume Wizard",
      "AI Cover Letter Generator",
      "Instant Resume Audit",
    ],
    themeColor: "text-blue-500",
    ringColor: "ring-blue-500", // Explicit ring color
  },
  {
    stage: "2. Preparing for Interviews",
    description:
      "Practice common questions, simulate real interviews, and get feedback to boost your confidence.",
    icon: Mic,
    relevantFeatures: ["AI Interview Simulator", "Interview Question Library"],
    themeColor: "text-teal-500",
    ringColor: "ring-teal-500",
  },
  {
    stage: "3. Managing Your Search",
    description:
      "Stay organized by tracking applications, deadlines, and contacts efficiently.",
    icon: Search,
    relevantFeatures: ["Job Application Tracker", "Deadline Reminders"],
    themeColor: "text-indigo-500",
    ringColor: "ring-indigo-500",
  },
  {
    stage: "4. Building Your Brand",
    description:
      "Showcase your skills and experience with a professional online profile and engaging content.",
    icon: ProfileUserIcon,
    relevantFeatures: ["Public Profile Hub", "Share Success Stories"],
    themeColor: "text-purple-500",
    ringColor: "ring-purple-500",
  },
  {
    stage: "5. Continuous Improvement",
    description:
      "Leverage AI for ongoing advice, resume enhancements, and staying ahead in your career.",
    icon: TrendingUp,
    relevantFeatures: ["Resume Lab", "AI Career Chatbot"],
    themeColor: "text-red-500",
    ringColor: "ring-red-500",
  },
];

// Framer Motion Variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export default function FeaturesPage() {
  const { isSignedIn } = useUser();
  const primaryCtaLink = isSignedIn ? "/resumes" : "/sign-up";
  const primaryCtaText = isSignedIn
    ? "Go to My Dashboard"
    : "Get Started for Free";

  return (
    <div className="bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-200">
      {/* Hero Section for Features Page */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-br from-blue-50 via-white to-teal-50 py-20 text-center dark:from-gray-900 dark:via-gray-800 dark:to-gray-900/80 md:py-28"
      >
        <div className="container mx-auto px-6">
          <motion.div variants={fadeIn} initial="initial" animate="animate">
            <Sparkles className="mx-auto mb-4 h-12 w-12 text-blue-500 dark:text-blue-400" />
            <h1 className="mb-6 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
              Discover the Power of
              <span className="block bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-teal-300 sm:inline">
                {" "}
                AI Career Suite
              </span>
            </h1>
            <p className="mx-auto mb-10 max-w-3xl text-lg text-gray-600 dark:text-gray-300 md:text-xl">
              Explore our comprehensive suite of AI-powered tools designed to
              support you at every stage of your career journey—from crafting
              the perfect resume to acing interviews and beyond.
            </p>
            <Link href={primaryCtaLink}>
              <Button
                size="lg"
                className="rounded-lg bg-blue-600 px-10 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-blue-500/30 dark:bg-blue-500 dark:hover:bg-blue-600 dark:hover:shadow-blue-400/30"
              >
                {primaryCtaText} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Features by Category Section */}
      {ALL_FEATURES_DATA.map((category, categoryIndex) => (
        <section
          key={category.id}
          className={`py-16 md:py-20 ${categoryIndex % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800/70"}`}
        >
          <div className="container mx-auto px-6">
            <motion.div
              variants={staggerContainer(0.2)}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div
                variants={fadeIn}
                className="mx-auto mb-12 max-w-2xl text-center md:mb-16"
              >
                <category.icon
                  className={`h-12 w-12 ${category.features[0]?.themeColor || "text-blue-500"} mx-auto mb-4`}
                />
                <h2 className="mb-3 text-3xl font-bold md:text-4xl">
                  {category.title}
                </h2>
                <p className="text-md text-gray-600 dark:text-gray-300 md:text-lg">
                  {category.description}
                </p>
              </motion.div>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {category.features.map((feature) => (
                  <motion.div
                    key={feature.title}
                    variants={fadeIn}
                    className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
                  >
                    <div className="mb-4 flex items-center">
                      <feature.icon
                        className={`mr-3 h-8 w-8 ${feature.themeColor || "text-gray-700 dark:text-gray-300"}`}
                      />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {feature.title}
                      </h3>
                      {feature.isNew && (
                        <span className="ml-auto rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700 dark:bg-green-700 dark:text-green-100">
                          NEW
                        </span>
                      )}
                    </div>
                    <p className="mb-5 flex-grow text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                    <Link href={feature.href} className="mt-auto">
                      <Button
                        variant="outline"
                        className={`w-full ${feature.themeColor ? `border-current ${feature.themeColor} hover:bg-opacity-10 dark:hover:bg-opacity-10` : "border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"}`}
                      >
                        {feature.ctaText || "Explore Feature"}{" "}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* --- Job Seeker Journey Section --- REVISED STRUCTURE --- */}
      <section className="bg-gray-50 py-16 dark:bg-gray-800 md:py-24">
        <div className="container mx-auto px-6">
          <motion.div
            variants={staggerContainer()}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div
              variants={fadeIn}
              className="mb-12 text-center md:mb-16"
            >
              <TrendingUp className="mx-auto mb-4 h-12 w-12 text-blue-500 dark:text-blue-400" />
              <h2 className="mb-3 text-3xl font-bold md:text-4xl">
                Your Career Journey, Empowered
              </h2>
              <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-300 md:text-lg">
                AI Career Suite supports you at every pivotal moment of your job
                search and professional growth.
              </p>
            </motion.div>

            <div className="relative mx-auto max-w-3xl">
              {" "}
              {/* Constrain width and center */}
              {/* Vertical timeline bar */}
              <div
                className="absolute bottom-0 left-1/2 top-0 hidden w-1 -translate-x-1/2 transform bg-blue-200 dark:bg-blue-700/50 md:block"
                aria-hidden="true"
              ></div>
              {JOB_SEEKER_JOURNEY_STAGES.map((item, index) => (
                <div
                  key={item.stage}
                  className="relative mb-8 items-start last:mb-0 md:mb-12 md:grid md:grid-cols-2 md:gap-x-12"
                >
                  {/* Dot - Positioned relative to this item's top, then shifted to center */}
                  <div
                    className="absolute left-1/2 top-0 hidden -translate-x-1/2 transform md:block"
                    style={{
                      marginTop: "1.75rem",
                    }} /* Adjust this for precise vertical alignment */
                  >
                    <div
                      className={`h-4 w-4 rounded-full ${item.themeColor} border-[3px] border-gray-50 bg-current ring-1 dark:border-gray-800 ${item.ringColor} z-10`}
                    ></div>
                  </div>

                  {/* Content Card */}
                  {/* Determine if content is left or right */}
                  {index % 2 === 0 ? (
                    // EVEN - Content on LEFT, Spacer on RIGHT
                    <>
                      <motion.div variants={fadeIn} className="md:text-right">
                        <div className="ml-auto inline-block w-full rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800 md:max-w-md">
                          <item.icon
                            className={`h-8 w-8 ${item.themeColor} mb-3 md:ml-auto`}
                          />
                          <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                            {item.stage}
                          </h3>
                          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                            {item.description}
                          </p>
                          <div className="mt-3 flex flex-wrap space-x-1 space-y-1 md:justify-end">
                            {item.relevantFeatures.map((featureName) => (
                              <span
                                key={featureName}
                                className="mb-1 inline-block rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                              >
                                {featureName}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                      <div className="hidden md:block"></div>{" "}
                      {/* Spacer for the right side */}
                    </>
                  ) : (
                    // ODD - Spacer on LEFT, Content on RIGHT
                    <>
                      <div className="hidden md:block"></div>{" "}
                      {/* Spacer for the left side */}
                      <motion.div variants={fadeIn} className="md:text-left">
                        <div className="mr-auto inline-block w-full rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800 md:max-w-md">
                          <item.icon
                            className={`h-8 w-8 ${item.themeColor} mb-3 md:mr-auto`}
                          />
                          <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                            {item.stage}
                          </h3>
                          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                            {item.description}
                          </p>
                          <div className="mt-3 flex flex-wrap space-x-1 space-y-1 md:justify-start">
                            {item.relevantFeatures.map((featureName) => (
                              <span
                                key={featureName}
                                className="mb-1 inline-block rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                              >
                                {featureName}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      {/* --- END OF Job Seeker Journey Section --- */}

      {/* Data Privacy & Security */}
      <section className="bg-white py-16 dark:bg-gray-900 md:py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            variants={fadeIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.5 }}
          >
            <ShieldCheck className="mx-auto mb-4 h-12 w-12 text-green-500 dark:text-green-400" />
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Your Data, Your Control
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-gray-600 dark:text-gray-300 md:text-lg">
              We are committed to protecting your privacy and ensuring the
              security of your data. Learn more about our data practices and how
              we empower you.
            </p>
            <Link href="/legal/privacy-policy">
              <Button
                variant="outline"
                className="border-green-500 text-green-600 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-900/30"
              >
                Read Our Privacy Policy
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-teal-500 py-20 text-white dark:from-blue-500 dark:to-teal-400 md:py-28">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            variants={staggerContainer(0.3)}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2
              variants={fadeIn}
              className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl"
            >
              Ready to Unlock Your Career Potential?
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="mx-auto mb-10 max-w-2xl text-lg text-blue-100 dark:text-teal-100 md:text-xl"
            >
              Join thousands of successful professionals who have transformed
              their careers with AI Career Suite. Sign up for free and start
              building your future today.
            </motion.p>
            <motion.div variants={fadeIn}>
              <Link href={primaryCtaLink}>
                <Button
                  size="lg"
                  className="transform rounded-lg bg-white px-12 py-3.5 text-lg font-semibold text-blue-600 shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-gray-100 hover:shadow-gray-400/30 dark:text-teal-500 dark:hover:shadow-gray-500/30"
                >
                  {primaryCtaText} <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
