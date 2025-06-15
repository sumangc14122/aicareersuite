// // "use client";

// // import React, { useState, useEffect } from "react";
// // import { useUser } from "@clerk/nextjs";
// // import Image from "next/image";
// // import Link from "next/link";

// // import {
// //   motion,
// //   AnimatePresence,
// //   useScroll,
// //   useTransform,
// // } from "framer-motion";
// // import { Button } from "@/components/ui/button";
// // import {
// //   FileText,
// //   Send,
// //   Brain,
// //   ClipboardList,
// //   Globe,
// //   MessageCircle,
// //   ChevronLeft,
// //   ChevronRight,
// //   Star,
// //   Award,
// //   Rocket,
// //   Mic,
// //   // Users,
// //   Network,
// //   TrendingUp,
// //   // Instagram,
// //   Twitter,
// //   Mail,
// //   Award as TrustBadge,
// //   User,
// // } from "lucide-react";
// // import logo from "@/assets/logo.png";
// // import resumePreview from "@/assets/resume-preview.jpg";
// // import amazonLogo from "@/logos/amazon.svg";
// // import appleLogo from "@/logos/apple.svg";
// // import bookingLogo from "@/logos/booking.svg";
// // import googleLogo from "@/logos/google.svg";
// // import metaLogo from "@/logos/meta.svg";
// // // import amazonLogoDark from "@/logos/amazon-dark.svg";
// // // import appleLogoDark from "@/logos/apple-dark.svg";
// // // import bookingLogoDark from "@/logos/booking-dark.svg";
// // // import googleLogoDark from "@/logos/google-dark.svg";
// // // import metaLogoDark from "@/logos/meta-dark.svg";

// // interface Blog {
// //   id: string;
// //   title: string;
// //   summary: string;
// // }
// // interface Review {
// //   id: string;
// //   description?: string;
// // }
// // interface Story {
// //   id: string;
// //   title: string;
// //   excerpt: string;
// // }

// // // Pre-generate particle properties with consistent string values
// // const generateParticles = (count: number) => {
// //   return Array.from({ length: count }, (_, i) => ({
// //     width: `${5 + (i % 10) * 0.5}px`,
// //     height: `${5 + (i % 8) * 0.5}px`,
// //     top: `${(i * 5) % 100}%`,
// //     left: `${(i * 7) % 100}%`,
// //   }));
// // };

// // const particles = generateParticles(20);

// // const featureCards = [
// //   {
// //     icon: <FileText size={20} className="text-blue-400" />,
// //     title: "AI Resume Builder",
// //     desc: "Craft ATS-optimized resumes effortlessly—completely free! Use modern templates and export as PDF in minutes.",
// //     hoverInfo:
// //       "Step-by-step wizard + modern templates: build, style & export PDFs.",
// //     href: "/resumes",
// //     previewImage:
// //       "https://airesumeimages.s3.us-east-1.amazonaws.com/localhost_3001_editor_resumeId%3Dcma9r2ppd000ssjeur7z6gj7m%26step%3Deducation.png",
// //   },
// //   {
// //     icon: <Send size={20} className="text-teal-400" />,
// //     title: "Cover Letter Generator",
// //     desc: "Generate tailored cover letters in seconds—100% free! Answer a few prompts for a personalized letter.",
// //     hoverInfo:
// //       "Answer a few prompts → receive a tailored cover letter instantly.",
// //     href: "/cover-letter",
// //     previewImage:
// //       "https://airesumeimages.s3.us-east-1.amazonaws.com/localhost_3001_cover-letter.png",
// //   },
// //   {
// //     icon: <ClipboardList size={20} className="text-peach-400" />,
// //     title: "Resume Audit",
// //     desc: "Get AI-powered resume feedback instantly—for free! Optimize for ATS, readability, and keywords.",
// //     hoverInfo: "ATS-score, readability & keyword health: instant PDF feedback.",
// //     href: "/audit",
// //     previewImage:
// //       "https://airesumeimages.s3.us-east-1.amazonaws.com/localhost_3001_audit.png",
// //   },
// //   {
// //     icon: <Globe size={20} className="text-blue-400" />,
// //     title: "Job Tracker",
// //     desc: "Track your job applications seamlessly—for free! Organize deadlines, notes, and statuses.",
// //     hoverInfo:
// //       "Manage deadlines, links, interview notes & statuses all in one place.",
// //     href: "/job-tracker",
// //     previewImage:
// //       "https://airesumeimages.s3.us-east-1.amazonaws.com/localhost_3001_job-tracker.png",
// //   },
// //   {
// //     icon: <Brain size={20} className="text-teal-400" />,
// //     title: "Resume Lab",
// //     desc: "Enhance your resume with AI suggestions—no charge! Edit and rewrite live with GPT-4 power.",
// //     hoverInfo: "Select, rewrite & annotate your resume live with GPT-4 power.",
// //     href: "/resume-lab",
// //     previewImage:
// //       "https://airesumeimages.s3.us-east-1.amazonaws.com/localhost_3001_resume-lab+(1).png",
// //   },
// //   {
// //     icon: <FileText size={20} className="text-peach-400" />,
// //     title: "Profile Hub",
// //     desc: "Showcase your professional profile—completely free! Build a public profile and share success stories.",
// //     hoverInfo:
// //       "Build a public profile, post success stories & request reviews.",
// //     href: "/profile/reviews/create",
// //     previewImage:
// //       "https://airesumeimages.s3.us-east-1.amazonaws.com/localhost_3001_profile_user_2wAqP10NByHsUH6Aas6VsjzraH2.png",
// //   },
// //   {
// //     icon: <MessageCircle size={20} className="text-blue-400" />,
// //     title: "AI Chat Bot",
// //     desc: "Get 1:1 career coaching anytime—for free! Ask about resumes, interviews, and more.",
// //     hoverInfo: "Chat 1:1 for resume tips, interview prep, coding Qs & more.",
// //     href: "/chat",
// //     previewImage:
// //       "https://airesumeimages.s3.us-east-1.amazonaws.com/localhost_3001_chat.png",
// //   },
// //   {
// //     icon: <Mic size={20} className="text-teal-400" />,
// //     title: "AI Interview Simulator",
// //     desc: "Practice with personalized, audio-first interviews—free! Get feedback, EQ scores, and progress tracking.",
// //     hoverInfo: "TTS questions, STT answers, STAR feedback, EQ scores & badges.",
// //     href: "/interview-simulator",
// //     previewImage:
// //       "https://airesumeimages.s3.us-east-1.amazonaws.com/localhost_3001_interview-simulator.png",
// //     isNew: true,
// //   },
// // ];

// // const jobSeekerJourney = [
// //   {
// //     hurdle: "Crafting a Standout Resume",
// //     solution:
// //       "Use our AI Resume Builder to create an ATS-optimized resume in minutes with guided steps and modern templates.",
// //     icon: <FileText size={32} className="text-blue-400" />,
// //   },
// //   {
// //     hurdle: "Writing a Tailored Cover Letter",
// //     solution:
// //       "Generate a personalized cover letter in seconds with our Cover Letter Generator—just answer a few prompts!",
// //     icon: <Send size={32} className="text-teal-400" />,
// //   },
// //   {
// //     hurdle: "Preparing for Interviews",
// //     solution:
// //       "Practice with our new AI Interview Simulator—get personalized questions, audio feedback, and EQ analytics to ace your interview.",
// //     icon: <Mic size={32} className="text-peach-400" />,
// //   },
// //   {
// //     hurdle: "Tracking Job Applications",
// //     solution:
// //       "Stay organized with our Job Tracker—manage deadlines, notes, and statuses all in one place, for free.",
// //     icon: <Globe size={32} className="text-blue-400" />,
// //   },
// //   {
// //     hurdle: "Networking & Building a Profile",
// //     solution:
// //       "Showcase your achievements with Profile Hub—build a public profile and connect with professionals.",
// //     icon: <Network size={32} className="text-teal-400" />,
// //   },
// //   {
// //     hurdle: "Growing Your Career",
// //     solution:
// //       "Get ongoing support with our AI Chat Bot—receive career advice and strategies to advance your career.",
// //     icon: <TrendingUp size={32} className="text-peach-400" />,
// //   },
// // ];

// // const testimonials = [
// //   {
// //     quote:
// //       "AI Career Suite helped me land my dream job at Google! The resume builder and interview simulator were game-changers.",
// //     author: "Sarah M., Software Engineer",
// //   },
// //   {
// //     quote:
// //       "I love how easy it is to track my applications and get feedback. This platform is a must-have for any job seeker!",
// //     author: "James L., Marketing Manager",
// //   },
// //   {
// //     quote:
// //       "The AI Chat Bot gave me personalized advice that boosted my confidence. I got hired within a month!",
// //     author: "Priya K., Data Analyst",
// //   },
// // ];

// // const faqs = [
// //   {
// //     question: "Is AI Career Suite really free?",
// //     answer:
// //       "Yes, all our core features are completely free with no hidden fees. Sign up to explore!",
// //   },
// //   {
// //     question: "How does the AI work?",
// //     answer:
// //       "We use advanced GPT-4 technology to provide personalized resume building, interview practice, and career advice.",
// //   },
// //   {
// //     question: "Can I export my resume?",
// //     answer:
// //       "Yes, you can export your resume as a PDF using our AI Resume Builder at any time.",
// //   },
// // ];

// // export default function HomeContent({
// //   blogs,
// //   reviews,
// //   successStories,
// // }: {
// //   blogs: Blog[];
// //   reviews: Review[];
// //   successStories: Story[];
// // }) {
// //   const { isSignedIn } = useUser();
// //   const [showCookieBanner, setShowCookieBanner] = useState(false);
// //   const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
// //   const { scrollY } = useScroll();
// //   const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.5]);
// //   const heroScale = useTransform(scrollY, [0, 300], [1, 0.95]);

// //   useEffect(() => {
// //     if (!localStorage.getItem("cookiesAccepted")) {
// //       setShowCookieBanner(true);
// //     }
// //   }, []);

// //   const acceptCookies = () => {
// //     localStorage.setItem("cookiesAccepted", "yes");
// //     setShowCookieBanner(false);
// //   };

// //   const handleNextFeature = () => {
// //     setCurrentFeatureIndex((p) => (p + 1) % featureCards.length);
// //   };

// //   const handlePrevFeature = () => {
// //     setCurrentFeatureIndex(
// //       (p) => (p - 1 + featureCards.length) % featureCards.length,
// //     );
// //   };

// //   return (
// //     <main className="relative min-h-screen overflow-hidden bg-gray-50 text-gray-800">
// //       {/* Floating Particles */}
// //       <div className="pointer-events-none fixed inset-0">
// //         {particles.map((particle, i) => (
// //           <motion.div
// //             key={i}
// //             className={`absolute rounded-full opacity-40 ${i % 2 === 0 ? "bg-blue-300" : "bg-teal-300"}`}
// //             style={{
// //               width: particle.width,
// //               height: particle.height,
// //               top: particle.top,
// //               left: particle.left,
// //             }}
// //             animate={{
// //               y: [0, -100, 0],
// //               opacity: [0.4, 0.7, 0.4],
// //               transition: {
// //                 duration: 5 + parseInt(particle.width) / 10,
// //                 repeat: Infinity,
// //                 ease: "easeInOut",
// //               },
// //             }}
// //           />
// //         ))}
// //       </div>

// //       {/* Sticky Try Now Button */}
// //       <motion.div
// //         className="fixed bottom-6 right-6 z-50"
// //         initial={{ scale: 0 }}
// //         animate={{ scale: 1 }}
// //         transition={{ duration: 0.5, delay: 1 }}
// //       >
// //         <Link href={isSignedIn ? "/audit" : "/sign-up"}>
// //           <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
// //             <Button className="flex items-center gap-2 rounded-full border border-blue-400 bg-blue-300 px-6 py-3 text-gray-800 shadow-md shadow-blue-300/30 transition-all duration-300 hover:bg-blue-400">
// //               <Rocket size={20} />
// //               {isSignedIn ? "My Profile" : "Try Now"}
// //             </Button>
// //           </motion.div>
// //         </Link>
// //       </motion.div>

// //       {/* Nav */}
// //       <nav className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-md">
// //         <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
// //           <Link href="/" className="flex items-center gap-2">
// //             <Image src={logo} alt="Logo" width={32} height={32} />
// //             <span className="text-xl font-bold text-blue-400">
// //               AI Career Suite
// //             </span>
// //           </Link>
// //           <div className="flex gap-4">
// //             {!isSignedIn ? (
// //               <>
// //                 <Link href="/sign-in">
// //                   <Button
// //                     variant="ghost"
// //                     className="text-blue-500 hover:text-blue-600"
// //                   >
// //                     Sign In
// //                   </Button>
// //                 </Link>
// //                 <Link href="/sign-up">
// //                   <motion.div
// //                     whileHover={{ scale: 1.1 }}
// //                     whileTap={{ scale: 0.9 }}
// //                   >
// //                     <Button className="rounded-full border border-blue-400 bg-blue-300 px-4 py-2 text-gray-800 shadow-blue-300/30 transition-all duration-300 hover:bg-blue-400">
// //                       Get Started
// //                     </Button>
// //                   </motion.div>
// //                 </Link>
// //               </>
// //             ) : (
// //               <Link href="/audit">
// //                 <Button
// //                   variant="ghost"
// //                   className="text-blue-500 hover:text-blue-600"
// //                 >
// //                   My Profile
// //                 </Button>
// //               </Link>
// //             )}
// //           </div>
// //         </div>
// //       </nav>

// //       {/* Hero */}
// //       <motion.section
// //         style={{ opacity: heroOpacity, scale: heroScale }}
// //         className="relative bg-gradient-to-b from-blue-50 to-teal-50 pb-20 pt-24"
// //       >
// //         <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 md:flex-row">
// //           <motion.div
// //             initial={{ opacity: 0, x: -100 }}
// //             animate={{ opacity: 1, x: 0 }}
// //             transition={{ duration: 0.8 }}
// //             className="text-center md:w-1/2 md:text-left"
// //           >
// //             <motion.h1
// //               className="mb-6 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-5xl font-extrabold leading-tight text-transparent md:text-6xl"
// //               initial={{ y: 20, opacity: 0 }}
// //               animate={{ y: 0, opacity: 1 }}
// //               transition={{ duration: 0.8, staggerChildren: 0.05 }}
// //             >
// //               {"Your All-in-One Career Companion".split("").map((c, i) => (
// //                 <motion.span
// //                   key={i}
// //                   variants={{
// //                     hidden: { opacity: 0, y: 20 },
// //                     visible: { opacity: 1, y: 0 },
// //                   }}
// //                 >
// //                   {c}
// //                 </motion.span>
// //               ))}
// //             </motion.h1>
// //             <p className="mb-6 text-lg leading-relaxed text-gray-600">
// //               From crafting standout resumes to acing interviews and growing
// //               your career—AI Career Suite supports you every step of the way,
// //               for free.
// //             </p>

// //             {!isSignedIn ? (
// //               <Link href="/sign-up">
// //                 <motion.div
// //                   whileHover={{ scale: 1.1 }}
// //                   whileTap={{ scale: 0.9 }}
// //                 >
// //                   <Button className="rounded-full border border-blue-400 bg-blue-300 px-8 py-3 text-gray-800 shadow-blue-300/30 transition-all duration-300 hover:bg-blue-400">
// //                     Start for Free
// //                   </Button>
// //                 </motion.div>
// //               </Link>
// //             ) : (
// //               <Link href="/audit">
// //                 <motion.div
// //                   whileHover={{ scale: 1.1 }}
// //                   whileTap={{ scale: 0.9 }}
// //                 >
// //                   <Button className="rounded-full border border-blue-400 bg-blue-300 px-8 py-3 text-gray-800 shadow-blue-300/30 transition-all duration-300 hover:bg-blue-400">
// //                     My Profile
// //                   </Button>
// //                 </motion.div>
// //               </Link>
// //             )}
// //           </motion.div>
// //           <motion.div
// //             initial={{ opacity: 0, x: 100 }}
// //             animate={{ opacity: 1, x: 0 }}
// //             transition={{ duration: 0.8, delay: 0.2 }}
// //             className="md:w-1/2"
// //           >
// //             <motion.div
// //               whileHover={{ scale: 1.05, rotate: 2 }}
// //               className="relative"
// //             >
// //               <Image
// //                 src={resumePreview}
// //                 alt="Career Tools Preview"
// //                 className="rounded-xl border border-blue-100 shadow-md"
// //               />
// //               <motion.div
// //                 className="absolute inset-0 rounded-xl bg-blue-200/20"
// //                 animate={{ opacity: [0.2, 0.4, 0.2] }}
// //                 transition={{ duration: 3, repeat: Infinity }}
// //               />
// //             </motion.div>
// //           </motion.div>
// //         </div>
// //       </motion.section>

// //       <div className="mx-auto max-w-7xl px-4">
// //         <hr className="border-t border-dashed border-blue-200" />
// //       </div>

// //       {/* Quick Preview */}
// //       <section className="bg-blue-50 py-20">
// //         <div className="mx-auto max-w-7xl px-4">
// //           <motion.h2
// //             initial={{ opacity: 0, y: 20 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.5 }}
// //             className="mb-12 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-center text-5xl font-bold leading-tight text-transparent"
// //           >
// //             Your Career, Supercharged in 3 Steps
// //           </motion.h2>
// //           <div className="grid gap-10 md:grid-cols-3">
// //             {[
// //               {
// //                 step: "1. Build Your Profile",
// //                 desc: "Create a professional resume and profile with AI-powered tools in minutes.",
// //               },
// //               {
// //                 step: "2. Prepare with AI",
// //                 desc: "Practice interviews and get feedback with our AI Interview Simulator.",
// //               },
// //               {
// //                 step: "3. Grow & Succeed",
// //                 desc: "Track applications, network, and get career advice—all in one place.",
// //               },
// //             ].map((item, i) => (
// //               <motion.div
// //                 key={i}
// //                 initial={{ opacity: 0, y: 50 }}
// //                 whileInView={{ opacity: 1, y: 0 }}
// //                 whileHover={{ scale: 1.05, rotate: 1 }}
// //                 transition={{ duration: 0.5, delay: i * 0.2 }}
// //                 className="rounded-xl border border-blue-100 bg-white p-6 text-center shadow-md hover:shadow-blue-300/30"
// //               >
// //                 <div className="mb-4 text-2xl font-bold text-blue-400">
// //                   {item.step}
// //                 </div>
// //                 <p className="leading-relaxed text-gray-600">{item.desc}</p>
// //               </motion.div>
// //             ))}
// //           </div>
// //           <div className="mt-8 text-center">
// //             {!isSignedIn ? (
// //               <Link href="/sign-up">
// //                 <motion.div
// //                   whileHover={{ scale: 1.1 }}
// //                   whileTap={{ scale: 0.9 }}
// //                 >
// //                   <Button className="rounded-full border border-blue-400 bg-blue-300 px-8 py-3 text-gray-800 shadow-blue-300/30 transition-all duration-300 hover:bg-blue-400">
// //                     Get Started Now
// //                   </Button>
// //                 </motion.div>
// //               </Link>
// //             ) : (
// //               <Link href="/audit">
// //                 <motion.div
// //                   whileHover={{ scale: 1.1 }}
// //                   whileTap={{ scale: 0.9 }}
// //                 >
// //                   <Button className="rounded-full border border-blue-400 bg-blue-300 px-8 py-3 text-gray-800 shadow-blue-300/30 transition-all duration-300 hover:bg-blue-400">
// //                     My Profile
// //                   </Button>
// //                 </motion.div>
// //               </Link>
// //             )}
// //           </div>
// //         </div>
// //       </section>

// //       {/* <li>
// //         <Link href="/wizard">🎩 Resume Wizard</Link>
// //       </li> */}

// //       <div className="mx-auto max-w-7xl px-4">
// //         <hr className="border-t border-dashed border-blue-200" />
// //       </div>

// //       {/* Job Seeker Journey */}
// //       <section className="bg-gradient-to-r from-blue-100 to-teal-100 py-20">
// //         <div className="mx-auto max-w-7xl px-4">
// //           <motion.h2
// //             initial={{ opacity: 0, y: 20 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.5 }}
// //             className="mb-12 text-center text-5xl font-bold leading-tight text-gray-800"
// //           >
// //             Your Career Journey, Supported Every Step
// //           </motion.h2>
// //           <div className="relative">
// //             {/* Adjust the vertical line to stop at the content */}
// //             <div
// //               className="absolute left-1/2 hidden w-1 -translate-x-1/2 bg-blue-300 md:block"
// //               style={{ height: `${jobSeekerJourney.length * 150}px` }} // Adjust height based on content
// //             ></div>
// //             {jobSeekerJourney.map((stage, i) => (
// //               <motion.div
// //                 key={i}
// //                 initial={{ opacity: 0, y: 50 }}
// //                 whileInView={{ opacity: 1, y: 0 }}
// //                 transition={{ duration: 0.5, delay: i * 0.2 }}
// //                 className={`mb-12 flex flex-col items-center gap-8 md:flex-row ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
// //               >
// //                 <div className="text-center md:w-1/2 md:text-left">
// //                   <div className="mb-4 flex items-center justify-center gap-4 md:justify-start">
// //                     {stage.icon}
// //                     <h3 className="text-xl font-semibold text-blue-500">
// //                       Challenge: {stage.hurdle}
// //                     </h3>
// //                   </div>
// //                   <p className="leading-relaxed text-gray-600">
// //                     {stage.solution}
// //                   </p>
// //                 </div>
// //                 <div className="text-center md:w-1/2">
// //                   <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-300 font-bold text-gray-800">
// //                     {i + 1}
// //                   </div>
// //                 </div>
// //               </motion.div>
// //             ))}
// //             <motion.div
// //               className="mt-12 text-center"
// //               initial={{ opacity: 0 }}
// //               whileInView={{ opacity: 1 }}
// //               transition={{ duration: 0.5 }}
// //             >
// //               <div className="mb-4 h-4 w-full rounded-full bg-gray-200">
// //                 <motion.div
// //                   className="h-4 rounded-full bg-blue-400"
// //                   initial={{ width: "0%" }}
// //                   whileInView={{ width: "100%" }}
// //                   transition={{ duration: 2, ease: "easeInOut" }}
// //                 />
// //               </div>
// //               <p className="mb-4 text-lg text-blue-500">
// //                 Complete your journey with AI Career Suite!
// //               </p>
// //               {!isSignedIn ? (
// //                 <Link href="/sign-up">
// //                   <motion.div
// //                     whileHover={{ scale: 1.1 }}
// //                     whileTap={{ scale: 0.9 }}
// //                   >
// //                     <Button className="rounded-full border border-blue-400 bg-blue-300 px-8 py-3 text-gray-800 shadow-blue-300/30 transition-all duration-300 hover:bg-blue-400">
// //                       Start Your Journey
// //                     </Button>
// //                   </motion.div>
// //                 </Link>
// //               ) : (
// //                 <Link href="/resume-lab">
// //                   <motion.div
// //                     whileHover={{ scale: 1.1 }}
// //                     whileTap={{ scale: 0.9 }}
// //                   >
// //                     <Button className="rounded-full border border-blue-400 bg-blue-300 px-8 py-3 text-gray-800 shadow-blue-300/30 transition-all duration-300 hover:bg-blue-400">
// //                       My Profile
// //                     </Button>
// //                   </motion.div>
// //                 </Link>
// //               )}
// //             </motion.div>
// //           </div>
// //         </div>
// //       </section>

// //       <div className="mx-auto max-w-7xl px-4">
// //         <hr className="border-t border-dashed border-blue-200" />
// //       </div>

// //       {/* Testimonials */}
// //       <section className="bg-white py-20">
// //         <div className="mx-auto max-w-7xl px-4">
// //           <motion.h2
// //             initial={{ opacity: 0, y: 20 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.5 }}
// //             className="mb-12 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-center text-5xl font-bold leading-tight text-transparent"
// //           >
// //             What Our Users Say
// //           </motion.h2>
// //           <div className="grid gap-10 md:grid-cols-3">
// //             {testimonials.map((testimonial, i) => (
// //               <motion.div
// //                 key={i}
// //                 initial={{ opacity: 0, y: 50 }}
// //                 whileInView={{ opacity: 1, y: 0 }}
// //                 whileHover={{ scale: 1.05, rotate: 1 }}
// //                 transition={{ duration: 0.5, delay: i * 0.2 }}
// //                 className="rounded-xl border border-blue-100 bg-blue-50 p-6 text-center shadow-md hover:shadow-blue-300/30"
// //               >
// //                 <div className="mb-4 flex justify-center">
// //                   <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
// //                     <User size={24} className="text-gray-500" />
// //                   </div>
// //                 </div>
// //                 <p className="mb-4 italic leading-relaxed text-gray-600">{`"${testimonial.quote}"`}</p>
// //                 <p className="font-semibold text-blue-500">
// //                   {testimonial.author}
// //                 </p>
// //               </motion.div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       <div className="mx-auto max-w-7xl px-4">
// //         <hr className="border-t border-dashed border-blue-200" />
// //       </div>

// //       {/* Why Choose Us */}
// //       <section className="bg-gradient-to-r from-teal-100 to-blue-100 py-20">
// //         <div className="mx-auto max-w-7xl px-4">
// //           <motion.h2
// //             initial={{ opacity: 0, y: 20 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.5 }}
// //             className="mb-12 text-center text-5xl font-bold leading-tight text-gray-800"
// //           >
// //             Why Choose AI Career Suite?
// //           </motion.h2>
// //           <div className="grid gap-10 md:grid-cols-3">
// //             {[
// //               {
// //                 icon: <Star size={32} className="text-blue-400" />,
// //                 title: "Cutting-Edge AI",
// //                 desc: "Leverage GPT-4 powered tools for unmatched precision and personalization.",
// //               },
// //               {
// //                 icon: <Award size={32} className="text-teal-400" />,
// //                 title: "Proven Success",
// //                 desc: "Trusted by thousands to land jobs at top companies worldwide.",
// //               },
// //               {
// //                 icon: <Rocket size={32} className="text-peach-400" />,
// //                 title: "All-in-One Platform",
// //                 desc: "Support for every career stage—from applications to growth.",
// //               },
// //             ].map((item, i) => (
// //               <motion.div
// //                 key={i}
// //                 initial={{ opacity: 0, y: 50 }}
// //                 whileInView={{ opacity: 1, y: 0 }}
// //                 whileHover={{ scale: 1.05, rotate: 1 }}
// //                 transition={{ duration: 0.5, delay: i * 0.2 }}
// //                 className="rounded-xl border border-teal-100 bg-white p-6 text-center shadow-md hover:shadow-teal-300/30"
// //               >
// //                 <div className="mb-4 text-blue-400">{item.icon}</div>
// //                 <h3 className="mb-2 text-xl font-semibold text-gray-800">
// //                   {item.title}
// //                 </h3>
// //                 <p className="leading-relaxed text-gray-600">{item.desc}</p>
// //               </motion.div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       <div className="mx-auto max-w-7xl px-4">
// //         <hr className="border-t border-dashed border-blue-200" />
// //       </div>

// //       {/* Feature Spotlight */}
// //       <section className="relative bg-white py-20">
// //         <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-teal-100 opacity-20" />
// //         <div className="relative z-10 mx-auto max-w-7xl px-4">
// //           <motion.h2
// //             initial={{ opacity: 0, y: 20 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.5 }}
// //             className="mb-12 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-center text-5xl font-bold leading-tight text-transparent"
// //           >
// //             Explore Our Cutting-Edge Features
// //           </motion.h2>
// //           <div className="relative">
// //             <AnimatePresence mode="wait">
// //               <motion.div
// //                 key={currentFeatureIndex}
// //                 initial={{ opacity: 0, x: 50 }}
// //                 animate={{ opacity: 1, x: 0 }}
// //                 exit={{ opacity: 0, x: -50 }}
// //                 transition={{ duration: 0.5 }}
// //                 className="flex flex-col items-center gap-8 rounded-xl border border-blue-100 bg-white p-8 shadow-md md:flex-row"
// //               >
// //                 <div className="md:w-1/2">
// //                   <div className="mb-4 flex items-center gap-4">
// //                     {featureCards[currentFeatureIndex].icon}
// //                     <h3 className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-2xl font-semibold text-transparent">
// //                       {featureCards[currentFeatureIndex].title}
// //                       {featureCards[currentFeatureIndex].isNew && (
// //                         <span className="ml-2 rounded-full bg-teal-300 px-2 py-1 text-xs font-semibold text-gray-800">
// //                           New!
// //                         </span>
// //                       )}
// //                     </h3>
// //                   </div>
// //                   <p className="mb-4 leading-relaxed text-gray-600">
// //                     {featureCards[currentFeatureIndex].desc}
// //                   </p>
// //                   <p className="mb-4 text-sm leading-relaxed text-gray-500">
// //                     {featureCards[currentFeatureIndex].hoverInfo}
// //                   </p>
// //                   <div className="mb-4 flex items-center gap-3">
// //                     <span className="rounded-full bg-teal-300 px-3 py-1 text-xs font-semibold text-gray-800">
// //                       Everything is Free!
// //                     </span>
// //                     <span className="text-sm text-blue-500">
// //                       No hidden fees.
// //                     </span>
// //                   </div>
// //                   <Link href={featureCards[currentFeatureIndex].href}>
// //                     <motion.div
// //                       whileHover={{ scale: 1.1 }}
// //                       whileTap={{ scale: 0.9 }}
// //                     >
// //                       <Button className="border border-blue-400 bg-blue-300 text-gray-800 shadow-md transition-all duration-300 hover:bg-blue-400 hover:shadow-blue-300/50">
// //                         Try Now
// //                       </Button>
// //                     </motion.div>
// //                   </Link>
// //                 </div>
// //                 <motion.div
// //                   className="relative overflow-y-auto rounded-lg shadow-md md:w-1/2"
// //                   style={{
// //                     maxHeight: "400px",
// //                     scrollbarWidth: "thin",
// //                     scrollbarColor: "#93c5fd #f3f4f6",
// //                   }}
// //                   whileHover={{ scale: 1.02 }}
// //                 >
// //                   <img
// //                     src={featureCards[currentFeatureIndex].previewImage}
// //                     alt={`${featureCards[currentFeatureIndex].title} Preview`}
// //                     width={800}
// //                     height={600}
// //                     className="w-full rounded-lg object-contain"
// //                   />
// //                   <motion.div
// //                     className="absolute inset-0 rounded-lg bg-blue-200/10"
// //                     animate={{ opacity: [0.1, 0.3, 0.1] }}
// //                     transition={{ duration: 2, repeat: Infinity }}
// //                   />
// //                 </motion.div>
// //               </motion.div>
// //             </AnimatePresence>
// //             {/* Navigation Buttons */}
// //             <motion.div
// //               className="absolute left-0 top-1/2 z-10 -translate-y-1/2"
// //               whileHover={{ scale: 1.1 }}
// //               whileTap={{ scale: 0.9 }}
// //             >
// //               <Button
// //                 onClick={handlePrevFeature}
// //                 className="rounded-full bg-blue-300 p-2 text-gray-800 shadow-md transition-all duration-300 hover:bg-blue-400 hover:shadow-blue-300/50"
// //               >
// //                 <ChevronLeft size={20} />
// //               </Button>
// //             </motion.div>
// //             <motion.div
// //               className="absolute right-0 top-1/2 z-10 -translate-y-1/2"
// //               whileHover={{ scale: 1.1 }}
// //               whileTap={{ scale: 0.9 }}
// //             >
// //               <Button
// //                 onClick={handleNextFeature}
// //                 className="rounded-full bg-blue-300 p-2 text-gray-800 shadow-md transition-all duration-300 hover:bg-blue-400 hover:shadow-blue-300/50"
// //               >
// //                 <ChevronRight size={20} />
// //               </Button>
// //             </motion.div>
// //           </div>
// //         </div>
// //       </section>

// //       <div className="mx-auto max-w-7xl px-4">
// //         <hr className="border-t border-dashed border-blue-200" />
// //       </div>

// //       {/* All Features */}
// //       <section className="bg-blue-50 py-20">
// //         <div className="mx-auto max-w-7xl px-4">
// //           <motion.h2
// //             initial={{ opacity: 0, y: 20 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.5 }}
// //             className="mb-12 text-center text-5xl font-bold leading-tight text-gray-800"
// //           >
// //             Discover All Features
// //           </motion.h2>
// //           <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
// //             {featureCards.map((f, i) => (
// //               <Link key={i} href={f.href}>
// //                 <motion.div
// //                   whileHover={{ scale: 1.05, rotate: 1 }}
// //                   initial={{ opacity: 0, y: 50 }}
// //                   whileInView={{ opacity: 1, y: 0 }}
// //                   transition={{ duration: 0.5, delay: i * 0.1 }}
// //                   className="rounded-xl border border-blue-100 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-blue-300/30"
// //                 >
// //                   <div className="mb-4">{f.icon}</div>
// //                   <h3 className="mb-2 text-xl font-semibold text-gray-800">
// //                     {f.title}
// //                     {f.isNew && (
// //                       <span className="ml-2 rounded-full bg-teal-300 px-2 py-1 text-xs font-semibold text-gray-800">
// //                         New!
// //                       </span>
// //                     )}
// //                   </h3>
// //                   <p className="mb-4 leading-relaxed text-gray-600">{f.desc}</p>
// //                   <p className="text-sm leading-relaxed text-gray-500 opacity-0 transition-opacity group-hover:opacity-100">
// //                     {f.hoverInfo}
// //                   </p>
// //                 </motion.div>
// //               </Link>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       <div className="mx-auto max-w-7xl px-4">
// //         <hr className="border-t border-dashed border-blue-200" />
// //       </div>

// //       {/* CTA Banner */}
// //       <section className="bg-gradient-to-r from-blue-200 to-teal-200 py-20">
// //         <div className="mx-auto max-w-7xl px-4 text-center">
// //           <motion.h2
// //             initial={{ opacity: 0, y: 20 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.5 }}
// //             className="mb-4 text-5xl font-bold leading-tight text-gray-800"
// //           >
// //             Ready to Transform Your Career?
// //           </motion.h2>
// //           <motion.p
// //             initial={{ opacity: 0, y: 20 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.5, delay: 0.2 }}
// //             className="mb-6 text-lg leading-relaxed text-gray-600"
// //           >
// //             Join thousands of professionals using AI to land their dream jobs
// //             and grow their careers—all for free!
// //           </motion.p>
// //           <Link href={isSignedIn ? "/audit" : "/sign-up"}>
// //             <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
// //               <Button className="rounded-full border border-blue-400 bg-white px-8 py-3 text-blue-600 shadow-blue-300/30 transition-all duration-300 hover:bg-blue-50">
// //                 {isSignedIn ? "My Profile" : "Sign Up Now"}
// //               </Button>
// //             </motion.div>
// //           </Link>
// //         </div>
// //       </section>

// //       <div className="mx-auto max-w-7xl px-4">
// //         <hr className="border-t border-dashed border-blue-200" />
// //       </div>

// //       {/* Trusted By */}
// //       <section className="bg-white py-12">
// //         <div className="mx-auto max-w-7xl px-4 text-center">
// //           <p className="mb-2 text-gray-600">Trusted by Top Companies</p>
// //           <p className="mb-6 text-sm text-gray-500">
// //             Empowering professionals worldwide since 2023
// //           </p>
// //           <div className="flex flex-wrap justify-center gap-8">
// //             {[amazonLogo, metaLogo, appleLogo, googleLogo, bookingLogo].map(
// //               (src, idx) => (
// //                 <motion.div
// //                   key={idx}
// //                   whileHover={{ scale: 1.1 }}
// //                   className="relative h-12 w-32 opacity-70 hover:opacity-100"
// //                 >
// //                   <Image src={src} alt="" fill className="object-contain" />
// //                 </motion.div>
// //               ),
// //             )}
// //           </div>
// //         </div>
// //       </section>

// //       <div className="mx-auto max-w-7xl px-4">
// //         <hr className="border-t border-dashed border-blue-200" />
// //       </div>

// //       {/* Featured Statistic
// //       <section className="bg-blue-50 py-12">
// //         <div className="mx-auto max-w-7xl px-4 text-center">
// //           <motion.div
// //             initial={{ opacity: 0, scale: 0.8 }}
// //             whileInView={{ opacity: 1, scale: 1 }}
// //             transition={{ duration: 0.8 }}
// //             className="rounded-xl border border-blue-100 bg-white p-8 shadow-md"
// //           >
// //             <h3 className="mb-4 text-4xl font-bold text-blue-400">10,000+</h3>
// //             <p className="text-lg leading-relaxed text-gray-600">
// //               Users Helped to Land Their Dream Jobs
// //             </p>
// //           </motion.div>
// //         </div>
// //       </section> */}

// //       <div className="mx-auto max-w-7xl px-4">
// //         <hr className="border-t border-dashed border-blue-200" />
// //       </div>

// //       {/* Blogs & Reviews */}
// //       <section className="bg-white py-20">
// //         <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-2">
// //           <div>
// //             <h2 className="mb-4 text-2xl font-bold text-gray-800">
// //               Latest Public Blogs
// //             </h2>
// //             {blogs.length > 0 && (
// //               <motion.div
// //                 initial={{ opacity: 0, y: 20 }}
// //                 whileInView={{ opacity: 1, y: 0 }}
// //                 transition={{ duration: 0.5 }}
// //                 className="mb-4 rounded-lg bg-blue-50 p-6"
// //               >
// //                 <h3 className="mb-2 text-xl font-semibold text-blue-500">
// //                   Featured: {blogs[0].title}
// //                 </h3>
// //                 <p className="leading-relaxed text-gray-600">
// //                   {blogs[0].summary}
// //                 </p>
// //               </motion.div>
// //             )}
// //             <ul className="space-y-4">
// //               {blogs.slice(1).map((b) => (
// //                 <motion.li
// //                   key={b.id}
// //                   whileHover={{ scale: 1.02 }}
// //                   className="rounded-lg bg-blue-50 p-4"
// //                 >
// //                   <h3 className="font-semibold text-gray-800">{b.title}</h3>
// //                   <p className="leading-relaxed text-gray-600">{b.summary}</p>
// //                 </motion.li>
// //               ))}
// //             </ul>
// //           </div>
// //           <div>
// //             <div className="mb-4 flex items-center justify-between">
// //               <h2 className="text-2xl font-bold text-gray-800">
// //                 Resume Review Requests
// //               </h2>
// //               <Link href="/profile/reviews/create">
// //                 <motion.div
// //                   whileHover={{ scale: 1.1 }}
// //                   whileTap={{ scale: 0.9 }}
// //                 >
// //                   <Button className="bg-blue-300 text-sm text-gray-800 hover:bg-blue-400">
// //                     Request a Review
// //                   </Button>
// //                 </motion.div>
// //               </Link>
// //             </div>
// //             <ul className="space-y-4">
// //               {reviews.map((r) => (
// //                 <motion.li
// //                   key={r.id}
// //                   whileHover={{ scale: 1.02 }}
// //                   className="flex items-center justify-between rounded-lg bg-blue-50 p-4"
// //                 >
// //                   <span className="truncate text-gray-600">
// //                     {r.description || "No description"}
// //                   </span>
// //                   <Send size={20} className="text-peach-400" />
// //                 </motion.li>
// //               ))}
// //             </ul>
// //           </div>
// //         </div>
// //       </section>

// //       <div className="mx-auto max-w-7xl px-4">
// //         <hr className="border-t border-dashed border-blue-200" />
// //       </div>

// //       {/* Success Stories */}
// //       <section className="bg-teal-50 py-20">
// //         <div className="mx-auto max-w-7xl px-4">
// //           <div className="mb-4 flex items-center justify-between">
// //             <h2 className="text-2xl font-bold text-gray-800">
// //               Success Stories
// //             </h2>
// //             <Link href="/profile/reviews/create">
// //               <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
// //                 <Button className="bg-blue-300 text-sm text-gray-800 hover:bg-blue-400">
// //                   Share Your Story
// //                 </Button>
// //               </motion.div>
// //             </Link>
// //           </div>
// //           <ul className="space-y-4">
// //             {successStories.map((s) => (
// //               <motion.li
// //                 key={s.id}
// //                 whileHover={{ scale: 1.02 }}
// //                 className="rounded-lg bg-white p-4"
// //               >
// //                 <h3 className="font-semibold text-blue-500">{s.title}</h3>
// //                 <p className="mt-2 leading-relaxed text-gray-600">
// //                   {s.excerpt}
// //                 </p>
// //               </motion.li>
// //             ))}
// //           </ul>
// //         </div>
// //       </section>

// //       <div className="mx-auto max-w-7xl px-4">
// //         <hr className="border-t border-dashed border-blue-200" />
// //       </div>

// //       {/* FAQ Section */}
// //       <section className="bg-white py-20">
// //         <div className="mx-auto max-w-7xl px-4">
// //           <motion.h2
// //             initial={{ opacity: 0, y: 20 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.5 }}
// //             className="mb-12 text-center text-5xl font-bold leading-tight text-gray-800"
// //           >
// //             Frequently Asked Questions
// //           </motion.h2>
// //           <div className="grid gap-6 md:grid-cols-2">
// //             {faqs.map((faq, i) => (
// //               <motion.div
// //                 key={i}
// //                 initial={{ opacity: 0, y: 20 }}
// //                 whileInView={{ opacity: 1, y: 0 }}
// //                 whileHover={{ scale: 1.05 }}
// //                 transition={{ duration: 0.5, delay: i * 0.1 }}
// //                 className="rounded-xl border border-blue-100 bg-blue-50 p-6 shadow-md hover:shadow-blue-300/30"
// //               >
// //                 <h3 className="mb-2 text-xl font-semibold text-blue-500">
// //                   {faq.question}
// //                 </h3>
// //                 <p className="leading-relaxed text-gray-600">{faq.answer}</p>
// //               </motion.div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       <div className="mx-auto max-w-7xl px-4">
// //         <hr className="border-t border-dashed border-blue-200" />
// //       </div>

// //       {/* Footer */}
// //       <footer className="bg-blue-50 py-8 text-gray-600">
// //         <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-4">
// //           <div>
// //             <h4 className="mb-2 font-semibold text-gray-800">
// //               AI Career Suite
// //             </h4>
// //             <p className="leading-relaxed">Your all-in-one career companion.</p>
// //             <div className="mt-4 flex items-center gap-2">
// //               <TrustBadge size={20} className="text-blue-400" />
// //               {/* <p className="text-sm">Trusted by 10,000+ Users</p> */}
// //             </div>
// //           </div>
// //           <div>
// //             <h4 className="mb-2 font-semibold text-gray-800">Legal</h4>
// //             <ul className="space-y-1">
// //               <li>
// //                 <Link href="/legal/terms-of-use" className="hover:underline">
// //                   Terms of Use
// //                 </Link>
// //               </li>
// //               <li>
// //                 <Link href="/legal/privacy-policy" className="hover:underline">
// //                   Privacy Policy
// //                 </Link>
// //               </li>
// //               <li>
// //                 <Link href="/legal/data-policy" className="hover:underline">
// //                   Data Policy
// //                 </Link>
// //               </li>
// //               <li>
// //                 <Link href="/legal/ai-usage-policy" className="hover:underline">
// //                   AI Usage Policy
// //                 </Link>
// //               </li>
// //               <li>
// //                 <Link
// //                   href="/legal/user-generated-content"
// //                   className="hover:underline"
// //                 >
// //                   User-Generated Content Terms
// //                 </Link>
// //               </li>
// //               <li>
// //                 <button
// //                   onClick={() => setShowCookieBanner(true)}
// //                   className="hover:underline"
// //                 >
// //                   Cookie Settings
// //                 </button>
// //               </li>
// //             </ul>
// //           </div>
// //           <div>
// //             <h4 className="mb-2 font-semibold text-gray-800">Follow Us</h4>
// //             <div className="flex gap-4">
// //               <a
// //                 href="https://www.tiktok.com/@suman.gc79?_t=ZS-8wEqcco3w1Q&_r=1"
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //               >
// //                 <svg
// //                   width="20"
// //                   height="20"
// //                   viewBox="0 0 24 24"
// //                   fill="currentColor"
// //                   className="hover:text-blue-500"
// //                 >
// //                   <path d="M12.5 2C10.567 2 9 3.567 9 5.5V15.5C9 17.433 10.567 19 12.5 19C14.433 19 16 17.433 16 15.5V10H13V13.5C13 13.776 12.776 14 12.5 14C12.224 14 12 13.776 12 13.5V5.5C12 5.224 12.224 5 12.5 5C12.776 5 13 5.224 13 5.5V9H16V5.5C16 3.567 14.433 2 12.5 2Z" />
// //                 </svg>
// //               </a>
// //               <a
// //                 href="https://www.linkedin.com/in/ai-career-suite-741282364?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //               >
// //                 <svg
// //                   width="20"
// //                   height="20"
// //                   viewBox="0 0 24 24"
// //                   fill="currentColor"
// //                   className="hover:text-blue-500"
// //                 >
// //                   <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.012-3.05-1.864-3.05-1.865 0-2.134 1.454-2.134 2.962v5.692h-3v-11h2.879v1.548h.041c.398-.753 1.369-1.547 2.816-1.547 3.015 0 3.574 1.984 3.574 4.565v6.434z" />
// //                 </svg>
// //               </a>
// //               <a
// //                 href="https://x.com/aicareersuite?s=21&t=wQUX5cEWdSj5KmBQyxYmKw"
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //               >
// //                 <Twitter size={20} className="hover:text-blue-500" />
// //               </a>
// //             </div>
// //           </div>
// //           <div>
// //             <h4 className="mb-2 font-semibold text-gray-800">Stay Updated</h4>
// //             <p className="mb-2 leading-relaxed">Subscribe to our newsletter:</p>
// //             <div className="flex gap-2">
// //               <input
// //                 type="email"
// //                 placeholder="Your email"
// //                 className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-600 focus:border-blue-300 focus:outline-none"
// //               />
// //               <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
// //                 <Button className="bg-blue-300 text-gray-800 hover:bg-blue-400">
// //                   <Mail size={16} />
// //                 </Button>
// //               </motion.div>
// //             </div>
// //             <Link
// //               href="/contact"
// //               className="mt-4 block text-sm hover:underline"
// //             >
// //               Contact Us
// //             </Link>
// //           </div>
// //         </div>
// //         <p className="mt-8 text-center text-xs text-gray-500">
// //           Last Updated: May 10, 2025
// //         </p>
// //       </footer>

// //       {/* Cookie Banner */}
// //       <AnimatePresence>
// //         {showCookieBanner && (
// //           <motion.div
// //             initial={{ y: 50, opacity: 0 }}
// //             animate={{ y: 0, opacity: 1 }}
// //             exit={{ y: 50, opacity: 0 }}
// //             className="fixed bottom-4 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 rounded-lg bg-white p-4 shadow-md"
// //           >
// //             <p className="text-sm leading-relaxed text-gray-600">
// //               We use cookies to improve your experience. By continuing you
// //               accept our{" "}
// //               <Link href="/legal/privacy-policy" className="underline">
// //                 Privacy Policy
// //               </Link>{" "}
// //               and{" "}
// //               <Link href="/legal/privacy-policy" className="underline">
// //                 Cookie Policy
// //               </Link>
// //               .
// //             </p>
// //             <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
// //               <Button
// //                 size="sm"
// //                 onClick={acceptCookies}
// //                 className="mt-4 bg-blue-300 text-gray-800 hover:bg-blue-400"
// //               >
// //                 Got it
// //               </Button>
// //             </motion.div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //     </main>
// //   );

// // }

// "use client";

// import React, { useState, useEffect } from "react";
// import { useUser } from "@clerk/nextjs";
// import Image from "next/image";
// import Link from "next/link";
// import { motion, AnimatePresence } from "framer-motion";

// import { Button } from "@/components/ui/button";
// import {
//   FileText, // Resume Builder, Cover Letter
//   Wand2, // Resume Wizard (as a key feature)
//   ClipboardList, // Audit
//   Mic, // Interview Simulator
//   Brain,
//   Mail, // Resume Lab
//   Globe, // Job Tracker
//   Star,
//   CheckCircle,
//   ArrowRight,
//   Award,
//   User,
//   Facebook,
//   Youtube,
//   Twitter,
//   Linkedin,
//   ChevronDown,
//   Menu,
//   X,
//   Edit3,
//   MoveRight,
// } from "lucide-react";

// // Assets
// import logo from "@/assets/logo.png";

// // Company Logos (if used elsewhere)
// // import amazonLogo from "@/logos/amazon.svg";
// // import appleLogo from "@/logos/apple.svg";
// // import googleLogo from "@/logos/google.svg";
// // import metaLogo from "@/logos/meta.svg";

// // SECTION: Data Interfaces
// interface Testimonial {
//   quote: string;
//   author: string;
//   role: string;
// }

// interface KeyFeature {
//   icon: React.ElementType;
//   title: string;
//   description: string;
//   href: string;
//   themeColorClass?: string;
//   badge?: string;
// }

// // SECTION: Homepage Content Configuration

// const KEY_FEATURES_DATA: KeyFeature[] = [
//   {
//     icon: Wand2,
//     title: "Resume Wizard Pro",
//     description:
//       "Intelligent, step-by-step guidance to craft a perfect, ATS-optimized resume.",
//     href: "/wizard",
//     themeColorClass:
//       "group-hover:border-blue-500 dark:group-hover:border-blue-400",
//     badge: "New",
//   },
//   {
//     icon: FileText,
//     title: "AI Resume Builder",
//     description:
//       "Classic builder with AI suggestions for impactful content and professional templates.",
//     href: "/resumes",
//     themeColorClass:
//       "group-hover:border-teal-500 dark:group-hover:border-teal-400",
//   },
//   {
//     icon: Mic,
//     title: "Interview Simulator",
//     description:
//       "Practice interviews with AI, get instant feedback on answers and communication style.",
//     href: "/interview-simulator",
//     themeColorClass:
//       "group-hover:border-indigo-500 dark:group-hover:border-indigo-400",
//   },
//   {
//     icon: ClipboardList,
//     title: "Resume Audit & Score",
//     description:
//       "Upload your resume for an instant AI-powered analysis and improvement suggestions.",
//     href: "/audit",
//     themeColorClass:
//       "group-hover:border-pink-500 dark:group-hover:border-pink-400",
//   },
//   {
//     icon: Brain,
//     title: "Resume Lab",
//     description:
//       "Advanced AI editing tools to refine every detail of your resume for maximum impact.",
//     href: "/resume-lab",
//     themeColorClass:
//       "group-hover:border-purple-500 dark:group-hover:border-purple-400",
//   },
//   {
//     icon: Globe,
//     title: "Smart Job Tracker",
//     description:
//       "Organize applications, track deadlines, and manage your job search pipeline efficiently.",
//     href: "/job-tracker",
//     themeColorClass:
//       "group-hover:border-green-500 dark:group-hover:border-green-400",
//   },
// ];

// // const TikTokIcon = () => (
// //   <svg
// //     width="18" // Standardize size with other icons
// //     height="18"
// //     viewBox="0 0 28 28" // Common TikTok SVG viewBox
// //     fill="currentColor"
// //     xmlns="http://www.w3.org/2000/svg"
// //   >
// //     <path d="M22.9912 7.19822C22.2834 7.19822 21.6684 6.67603 21.6684 6.0208V2.48301C21.6684 1.92041 21.1462 1.58118 20.5836 1.58118H17.0458C16.4832 1.58118 16.144 2.10337 16.144 2.66597V13.4381C16.144 14.3779 15.3114 15.2105 14.3716 15.2105H10.4147C9.47487 15.2105 8.73505 14.3779 8.73505 13.4381V2.66597C8.73505 2.10337 8.21286 1.58118 7.65026 1.58118H4.20524C3.64264 1.58118 3.21063 2.10337 3.21063 2.66597V17.6335C3.21063 22.9468 7.39226 27.1284 12.7055 27.1284C18.0187 27.1284 22.2003 22.9468 22.2003 17.6335V10.709C22.2003 10.0538 22.6223 9.53161 23.1849 9.53161H25.4993C26.0619 9.53161 26.4011 9.00942 26.4011 8.44682V7.19822H22.9912Z" />
// //   </svg>
// // );

// const PROCESS_STEPS_DATA = [
//   {
//     icon: Edit3,
//     title: "Craft & Optimize",
//     description: "Build standout resumes and cover letters with AI precision.",
//   },
//   {
//     icon: Mic,
//     title: "Prepare & Practice",
//     description: "Ace interviews with our AI simulator and targeted feedback.",
//   },
//   {
//     icon: CheckCircle,
//     title: "Track & Succeed",
//     description: "Manage your job search and gain insights for career growth.",
//   },
// ];

// const TESTIMONIALS_DATA: Testimonial[] = [
//   {
//     quote:
//       "AI Career Suite revolutionized my job application process. The tools are intuitive and incredibly effective.",
//     author: "Jessica Chen",
//     role: "Marketing Director",
//   },
//   {
//     quote:
//       "The level of detail and AI assistance is unparalleled. I felt so much more confident going into interviews.",
//     author: "David Miller",
//     role: "Lead Software Engineer",
//   },
//   {
//     quote:
//       "From crafting the perfect resume to tracking applications, this platform has it all. A must-have!",
//     author: "Aisha Khan",
//     role: "UX Lead",
//   },
// ];

// const FAQ_DATA_LIST = [
//   {
//     question: "What makes AI Career Suite different?",
//     answer:
//       "We offer a comprehensive, AI-powered toolkit covering every stage of your job search, with a strong focus on quality, ease of use, and providing core features for free.",
//   },
//   {
//     question: "How accurate is the AI for resume building and interview prep?",
//     answer:
//       "Our AI is trained on vast datasets and modern best practices to provide highly relevant and effective suggestions, significantly improving your chances of success.",
//   },
//   {
//     question: "Is it really free to use the core tools?",
//     answer:
//       "Yes! We believe everyone deserves access to high-quality career tools. Our core features, including the Resume Wizard and AI Resume Builder, are free.",
//   },
//   {
//     question: "How is my personal data protected?",
//     answer:
//       "We prioritize your data security and privacy. All data is encrypted, and we adhere to strict data protection policies. Please see our Privacy Policy for full details.",
//   },
// ];

// // SECTION: Framer Motion Variants
// const sectionVariants = {
//   hidden: { opacity: 0, y: 40 },
//   visible: (i: number = 0) => ({
//     opacity: 1,
//     y: 0,
//     transition: {
//       delay: i * 0.1,
//       duration: 0.7,
//       ease: "easeOut",
//     },
//   }),
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.6,
//       ease: "easeOut",
//     },
//   },
// };

// const cardHoverEffect = {
//   y: -5,
//   transition: { duration: 0.2, ease: "easeOut" },
// };

// // SECTION: Simple Navbar
// const SimpleNavbar = ({ isSignedIn }: { isSignedIn: boolean | undefined }) => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const navLinkClass =
//     "text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors px-3 py-2 rounded-md";
//   const mobileNavLinkClass =
//     "block text-base font-medium text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 py-2.5 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors";

//   return (
//     <motion.nav
//       className={`fixed left-0 right-0 top-0 z-[100] transition-all duration-300 ease-out ${
//         isScrolled
//           ? "border-b border-gray-200 bg-white/95 shadow-md backdrop-blur-lg dark:border-gray-700/60 dark:bg-gray-900/95"
//           : "border-b border-transparent bg-transparent dark:bg-transparent"
//       }`}
//     >
//       <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
//         <Link href="/" className="group flex items-center gap-2">
//           <Image
//             src={logo}
//             alt="AI Career Suite Logo"
//             width={32}
//             height={32}
//             className="rounded-md transition-transform duration-300 group-hover:rotate-[15deg]"
//           />
//           <span className="text-xl font-bold text-gray-800 dark:text-white">
//             AI<span className="text-blue-600 dark:text-blue-400">Career</span>
//             Suite
//           </span>
//         </Link>
//         <div className="hidden items-center gap-1 md:flex">
//           <Link href="/wizard" className={navLinkClass}>
//             Resume Wizard
//           </Link>
//           <Link href="/features" className={navLinkClass}>
//             More Tools
//           </Link>
//           {isSignedIn ? (
//             <Link href="/resumes">
//               <Button
//                 className="ml-2 bg-blue-600 px-4 text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md dark:bg-blue-500 dark:hover:bg-blue-600"
//                 size="sm"
//               >
//                 Dashboard
//               </Button>
//             </Link>
//           ) : (
//             <>
//               <Link href="/sign-in" className={navLinkClass}>
//                 Sign In
//               </Link>
//               <Link href="/sign-up">
//                 <Button
//                   className="ml-2 bg-blue-600 px-4 text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md dark:bg-blue-500 dark:hover:bg-blue-600"
//                   size="sm"
//                 >
//                   Sign Up Free
//                 </Button>
//               </Link>
//             </>
//           )}
//         </div>
//         <div className="md:hidden">
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             aria-label="Toggle menu"
//             className="text-gray-700 dark:text-gray-300"
//           >
//             {mobileMenuOpen ? (
//               <X className="h-6 w-6" />
//             ) : (
//               <Menu className="h-6 w-6" />
//             )}
//           </Button>
//         </div>
//       </div>
//       <AnimatePresence>
//         {mobileMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.25, ease: "easeOut" }}
//             className="absolute w-full border-t border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800 md:hidden"
//           >
//             <div className="space-y-1 px-4 py-4">
//               <Link
//                 href="/wizard"
//                 className={mobileNavLinkClass}
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 Resume Wizard
//               </Link>
//               <Link
//                 href="/features"
//                 className={mobileNavLinkClass}
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 More Tools
//               </Link>
//               <div className="space-y-2 pt-3">
//                 {isSignedIn ? (
//                   <Link
//                     href="/resumes"
//                     className="block"
//                     onClick={() => setMobileMenuOpen(false)}
//                   >
//                     <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
//                       Dashboard
//                     </Button>
//                   </Link>
//                 ) : (
//                   <>
//                     <Link
//                       href="/sign-in"
//                       className="block"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       <Button
//                         variant="outline"
//                         className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
//                       >
//                         Sign In
//                       </Button>
//                     </Link>
//                     <Link
//                       href="/sign-up"
//                       className="block"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
//                         Sign Up Free
//                       </Button>
//                     </Link>
//                   </>
//                 )}
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.nav>
//   );
// };

// // SECTION: Main Component
// export default function HomeContent() {
//   const { isSignedIn } = useUser();
//   const [showCookieBanner, setShowCookieBanner] = useState(false);
//   const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

//   useEffect(() => {
//     if (
//       typeof window !== "undefined" &&
//       !localStorage.getItem("cookiesAcceptedV5")
//     ) {
//       const timer = setTimeout(() => setShowCookieBanner(true), 2500);
//       return () => clearTimeout(timer);
//     }
//   }, []);

//   const acceptCookies = () => {
//     localStorage.setItem("cookiesAcceptedV5", "yes");
//     setShowCookieBanner(false);
//   };

//   const toggleFaq = (index: number) =>
//     setOpenFaqIndex(openFaqIndex === index ? null : index);

//   const primaryCtaLink = isSignedIn ? "/resumes" : "/sign-up";
//   const primaryCtaText = isSignedIn
//     ? "Go to Your Dashboard"
//     : "Get Started Free";

//   return (
//     <div className="min-h-screen overflow-x-hidden bg-white text-gray-900 antialiased dark:bg-gray-900 dark:text-gray-100">
//       <SimpleNavbar isSignedIn={isSignedIn} />

//       {/* Hero Section */}
//       <motion.section
//         className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-50 pb-16 pt-24 text-center dark:bg-gray-900 md:pb-20 md:pt-32"
//         variants={sectionVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <div
//           className="absolute inset-0 opacity-30 dark:opacity-20"
//           style={{
//             backgroundImage:
//               "radial-gradient(circle at 10% 20%, hsla(217, 80%, 90%, 0.5) 0px, transparent 50%), radial-gradient(circle at 90% 80%, hsla(170, 70%, 90%, 0.4) 0px, transparent 50%)",
//           }}
//         />
//         <div className="container relative z-10 mx-auto px-4 sm:px-6">
//           <motion.div variants={itemVariants}>
//             <Award className="mx-auto mb-5 h-12 w-12 text-blue-600 dark:text-blue-400 sm:h-14 sm:w-14" />
//           </motion.div>
//           <motion.h1
//             variants={itemVariants}
//             className="mb-6 text-4xl font-extrabold !leading-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl"
//           >
//             Build Your Dream Career, <br className="hidden sm:block" />
//             <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-teal-300">
//               Smarter & Faster
//             </span>
//           </motion.h1>
//           <motion.p
//             variants={itemVariants}
//             className="mx-auto mb-10 max-w-2xl text-lg text-gray-600 dark:text-gray-300 md:text-xl"
//           >
//             Leverage cutting-edge AI to craft perfect resumes, ace interviews,
//             and navigate your job search with confidence. All essential tools,
//             completely free.
//           </motion.p>
//           <motion.div
//             variants={itemVariants}
//             className="flex flex-col items-center justify-center gap-4 sm:flex-row"
//           >
//             <Link href={primaryCtaLink}>
//               <Button
//                 size="lg"
//                 className="group w-full transform rounded-lg bg-blue-600 px-8 py-3.5 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-700 hover:shadow-blue-500/30 dark:bg-blue-500 dark:hover:bg-blue-600 dark:hover:shadow-blue-400/30 sm:w-auto"
//               >
//                 {primaryCtaText}{" "}
//                 <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
//               </Button>
//             </Link>
//             <Link href="/wizard">
//               <Button
//                 size="lg"
//                 variant="outline"
//                 className="group w-full transform rounded-lg border-gray-300 px-8 py-3.5 text-lg font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:scale-105 hover:border-gray-400 hover:bg-gray-100 hover:shadow-md dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-gray-800 sm:w-auto"
//               >
//                 Try Resume Wizard{" "}
//                 <Wand2 className="ml-2 h-5 w-5 text-blue-500 transition-transform group-hover:scale-110" />
//               </Button>
//             </Link>
//           </motion.div>
//         </div>
//       </motion.section>

//       {/* Process/How It Works Section */}
//       <motion.section
//         className="border-y border-gray-100 bg-white py-16 dark:border-gray-800 dark:bg-gray-900 md:py-24"
//         variants={sectionVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.15 }}
//       >
//         <div className="container mx-auto px-4 sm:px-6">
//           <motion.h2
//             variants={itemVariants}
//             className="mb-4 text-center text-3xl font-bold text-gray-900 dark:text-white md:text-4xl"
//           >
//             Achieve Your Career Goals, Effortlessly
//           </motion.h2>
//           <motion.p
//             variants={itemVariants}
//             className="mx-auto mb-12 max-w-xl text-center text-lg text-gray-600 dark:text-gray-300 md:mb-16"
//           >
//             Our platform streamlines your job search with a simple, powerful
//             process.
//           </motion.p>
//           <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-3">
//             {PROCESS_STEPS_DATA.map((step, idx) => (
//               <motion.div
//                 key={step.title}
//                 variants={itemVariants}
//                 custom={idx}
//                 className="p-6 text-center"
//               >
//                 <div className="mb-5 inline-flex items-center justify-center rounded-full bg-blue-100 p-4 shadow-md dark:bg-blue-900/50">
//                   <step.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
//                 </div>
//                 <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
//                   {step.title}
//                 </h3>
//                 <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
//                   {step.description}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </motion.section>

//       {/* Key Features Grid Section */}
//       <motion.section
//         className="bg-gray-50 py-20 dark:bg-gray-800/70 md:py-28"
//         variants={sectionVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.1 }}
//       >
//         <div className="container mx-auto px-4 sm:px-6">
//           <motion.h2
//             variants={itemVariants}
//             className="mb-5 text-center text-3xl font-bold text-gray-900 dark:text-white md:text-4xl"
//           >
//             Your AI-Powered Career Toolkit
//           </motion.h2>
//           <motion.p
//             variants={itemVariants}
//             className="mx-auto mb-12 max-w-xl text-center text-lg text-gray-600 dark:text-gray-300 md:mb-16"
//           >
//             Explore a comprehensive suite of tools designed to give you a
//             competitive edge at every career stage.
//           </motion.p>
//           <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//             {KEY_FEATURES_DATA.map((feature, idx) => (
//               <motion.div
//                 key={feature.title}
//                 variants={itemVariants}
//                 custom={idx}
//                 whileHover={cardHoverEffect}
//                 className={`group flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 ease-out dark:border-gray-700 dark:bg-gray-800 ${
//                   feature.themeColorClass ||
//                   "group-hover:border-gray-400 dark:group-hover:border-gray-500"
//                 }`}
//               >
//                 <div className="mb-4 flex items-center justify-between">
//                   <div className="rounded-lg bg-gray-100 p-2.5 transition-colors group-hover:bg-opacity-80 dark:bg-gray-700/50">
//                     <feature.icon
//                       className={`h-7 w-7 text-gray-700 transition-transform group-hover:scale-110 dark:text-gray-300 ${
//                         feature.themeColorClass
//                           ? feature.themeColorClass.replace("border-", "text-")
//                           : "group-hover:text-blue-500"
//                       }`}
//                     />
//                   </div>
//                   {feature.badge && (
//                     <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-700 dark:bg-blue-700/50 dark:text-blue-300">
//                       {feature.badge}
//                     </span>
//                   )}
//                 </div>
//                 <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
//                   {feature.title}
//                 </h3>
//                 <p className="mb-5 flex-grow text-sm leading-relaxed text-gray-600 dark:text-gray-400">
//                   {feature.description}
//                 </p>
//                 <Link href={feature.href} className="mt-auto block">
//                   <Button
//                     variant="outline"
//                     className="w-full rounded-md px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 group-hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:group-hover:bg-blue-900/30"
//                   >
//                     Explore Tool{" "}
//                     <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
//                   </Button>
//                 </Link>
//               </motion.div>
//             ))}
//           </div>
//           <motion.div variants={itemVariants} className="mt-16 text-center">
//             <Link href="/features">
//               <Button
//                 size="lg"
//                 className="group rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg dark:bg-blue-500 dark:hover:bg-blue-600"
//               >
//                 View All Features{" "}
//                 <MoveRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
//               </Button>
//             </Link>
//           </motion.div>
//         </div>
//       </motion.section>

//       {/* Testimonials Section */}
//       <motion.section
//         className="bg-white py-20 dark:bg-gray-900 md:py-28"
//         variants={sectionVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.1 }}
//       >
//         <div className="container mx-auto px-6">
//           <motion.h2
//             variants={itemVariants}
//             className="mb-16 text-center text-3xl font-bold text-gray-900 dark:text-white md:mb-20 md:text-4xl"
//           >
//             Success Stories from Our Community
//           </motion.h2>
//           <div className="grid gap-8 md:grid-cols-3">
//             {TESTIMONIALS_DATA.map((testimonial, idx) => (
//               <motion.div
//                 key={idx}
//                 variants={itemVariants}
//                 custom={idx}
//                 whileHover={cardHoverEffect}
//                 className="flex flex-col rounded-xl border border-gray-200/70 bg-gray-50 p-6 shadow-lg dark:border-gray-700/60 dark:bg-gray-800/60 md:p-8"
//               >
//                 <div className="mb-4 flex">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       className="h-5 w-5 fill-current text-yellow-400"
//                     />
//                   ))}
//                 </div>
//                 <p className="text-md mb-5 flex-grow italic leading-relaxed text-gray-700 dark:text-gray-300">
//                   &quot;{testimonial.quote}&quot;
//                 </p>
//                 <div className="mt-auto flex items-center border-t border-gray-200 pt-4 dark:border-gray-700/50">
//                   <User className="mr-3 h-10 w-10 rounded-full bg-gray-200 p-2 text-gray-500 dark:bg-gray-700 dark:text-gray-400" />
//                   <div>
//                     <p className="font-semibold text-gray-900 dark:text-white">
//                       {testimonial.author}
//                     </p>
//                     <p className="text-sm text-gray-500 dark:text-gray-400">
//                       {testimonial.role}
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </motion.section>

//       {/* FAQ Section */}
//       <motion.section
//         className="bg-gray-50 py-20 dark:bg-gray-800/70 md:py-28"
//         variants={sectionVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.1 }}
//       >
//         <div className="container mx-auto max-w-3xl px-6">
//           <motion.h2
//             variants={itemVariants}
//             className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white md:mb-16 md:text-4xl"
//           >
//             Frequently Asked Questions
//           </motion.h2>
//           <motion.div
//             className="space-y-4"
//             variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
//           >
//             {FAQ_DATA_LIST.map((faq, index) => (
//               <motion.div
//                 key={index}
//                 variants={itemVariants}
//                 className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg dark:border-gray-700/80 dark:bg-gray-800"
//               >
//                 <button
//                   onClick={() => toggleFaq(index)}
//                   className="flex w-full items-center justify-between p-5 text-left font-medium text-gray-800 transition-colors duration-200 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-700/50"
//                   aria-expanded={openFaqIndex === index}
//                   aria-controls={`faq-content-${index}`}
//                 >
//                   <span className="text-md">{faq.question}</span>
//                   <ChevronDown
//                     className={`h-5 w-5 transform transition-transform duration-300 ease-in-out ${
//                       openFaqIndex === index
//                         ? "rotate-180 text-blue-500"
//                         : "text-gray-400"
//                     }`}
//                   />
//                 </button>
//                 <AnimatePresence>
//                   {openFaqIndex === index && (
//                     <motion.div
//                       id={`faq-content-${index}`}
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: "auto" }}
//                       exit={{ opacity: 0, height: 0 }}
//                       transition={{ duration: 0.3, ease: "easeOut" }}
//                       className="border-t border-gray-200 dark:border-gray-700"
//                     >
//                       <p className="p-5 pt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
//                         {faq.answer}
//                       </p>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </motion.section>

//       {/* Final CTA Section */}
//       <motion.section
//         className="bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 py-20 dark:from-blue-500 dark:via-blue-600 dark:to-teal-500 md:py-28"
//         variants={sectionVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.2 }}
//       >
//         <div className="container mx-auto px-6 text-center">
//           <motion.h2
//             variants={itemVariants}
//             className="mb-6 text-3xl font-bold text-white md:text-4xl"
//           >
//             Ready to Fast-Track Your Career?
//           </motion.h2>
//           <motion.p
//             variants={itemVariants}
//             className="mx-auto mb-10 max-w-xl text-lg text-blue-100 dark:text-teal-100"
//           >
//             Unlock your potential with AI Career Suite. Sign up for free and
//             experience the future of job searching and career development.
//           </motion.p>
//           <motion.div variants={itemVariants}>
//             <Link href={primaryCtaLink}>
//               <Button
//                 size="lg"
//                 className="group transform rounded-lg bg-white px-10 py-3.5 text-lg font-semibold text-blue-600 shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-gray-50 hover:shadow-gray-100/50 dark:text-teal-600"
//               >
//                 {primaryCtaText}{" "}
//                 <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
//               </Button>
//             </Link>
//           </motion.div>
//         </div>
//       </motion.section>

//       {/* Footer */}
//       <footer className="border-t border-gray-200 bg-gray-100 py-16 dark:border-gray-700/50 dark:bg-gray-800/90">
//         <div className="container mx-auto px-6">
//           <div className="grid gap-10 text-sm md:grid-cols-4">
//             <div className="md:col-span-2">
//               <Link href="/" className="mb-4 flex items-center gap-2.5">
//                 <Image
//                   src={logo}
//                   alt="AI Career Suite Logo"
//                   width={36}
//                   height={36}
//                   className="rounded-md"
//                 />
//                 <span className="text-xl font-semibold text-gray-800 dark:text-white">
//                   AI Career Suite
//                 </span>
//               </Link>
//               <p className="max-w-md leading-relaxed text-gray-600 dark:text-gray-400">
//                 Your intelligent partner for building a successful career,
//                 powered by cutting-edge AI technology.
//               </p>
//             </div>
//             <div>
//               <h4 className="text-md mb-4 font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
//                 Company
//               </h4>
//               <ul className="space-y-2.5">
//                 <li>
//                   <Link
//                     href="/features"
//                     className="text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
//                   >
//                     Features
//                   </Link>
//                 </li>
//                 {/* <li> */}
//                 {/* <Link
//                     href="/about"
//                     className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
//                   >
//                     About Us
//                   </Link> */}
//                 {/* </li> */}
//                 {/* <li>
//                   <Link
//                     href="/pricing"
//                     className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
//                   >
//                     Pricing
//                   </Link>
//                 </li> */}
//               </ul>
//             </div>
//             <div>
//               <h4 className="text-md mb-4 font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
//                 Legal & Support
//               </h4>
//               <ul className="space-y-2.5">
//                 <li>
//                   <Link
//                     href="/legal/terms-of-use"
//                     className="text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
//                   >
//                     Terms of Use
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/legal/privacy-policy"
//                     className="text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
//                   >
//                     Privacy Policy
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/legal/data-policy"
//                     className="text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
//                   >
//                     Data Policy
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/legal/ai-usage-policy"
//                     className="text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
//                   >
//                     AI Usage Policy
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/legal/user-generated-content"
//                     className="text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
//                   >
//                     User Content Terms
//                   </Link>
//                 </li>
//                 <li>
//                   <button
//                     onClick={() => {
//                       setShowCookieBanner(true);
//                       localStorage.removeItem("cookiesAcceptedV5");
//                     }}
//                     className="text-left text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
//                   >
//                     Cookie Settings
//                   </button>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="mt-12 flex flex-col items-center justify-between border-t border-gray-200 pt-10 text-xs text-gray-500 dark:border-gray-700/50 dark:text-gray-400 sm:flex-row">
//             <p>
//               © {new Date().getFullYear()} AI Career Suite. All rights
//               reserved.
//             </p>
//             <div className="mt-4 flex space-x-5 sm:mt-0">
//               <a
//                 href="https://x.com/aicareersuite"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="Twitter"
//                 className="transition-colors hover:text-blue-500 dark:hover:text-blue-400"
//               >
//                 <Twitter size={18} />
//               </a>
//               <a
//                 href="https://www.linkedin.com/company/ai-career-suite/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="LinkedIn"
//                 className="transition-colors hover:text-blue-500 dark:hover:text-blue-400"
//               >
//                 <Linkedin size={18} />
//               </a>
//               <a
//                 href="https://www.facebook.com/share/1EsyxPvNoH/?mibextid=wwXIfr" // Replace with your Facebook URL
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="Facebook"
//                 className="text-gray-500 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
//               >
//                 <Facebook size={18} />
//               </a>
//               {/* <a
//     href="https://www.tiktok.com/@aicareersuite" // Replace with your TikTok URL
//     target="_blank"
//     rel="noopener noreferrer"
//     aria-label="TikTok"
//     className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
//   >
//     <TikTokIcon />
//   </a> */}
//               <a
//                 href="https://www.youtube.com/@AICareerSuite" // Replace with your YouTube URL
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="YouTube"
//                 className="text-gray-500 transition-colors hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500"
//               >
//                 <Youtube size={18} />
//               </a>
//               <a
//                 href="mailto:airesumes579@gmail.com"
//                 aria-label="Email"
//                 className="text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
//               >
//                 <Mail size={18} />
//               </a>
//             </div>
//           </div>
//         </div>
//       </footer>

//       {/* Cookie Banner */}
//       <AnimatePresence>
//         {showCookieBanner && (
//           <motion.div
//             initial={{ y: "110%", opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             exit={{ y: "110%", opacity: 0 }}
//             transition={{
//               type: "spring",
//               stiffness: 300,
//               damping: 30,
//               duration: 0.4,
//             }}
//             className="fixed bottom-0 left-0 right-0 z-[200] border-t border-slate-700 bg-slate-800 p-4 text-white shadow-2xl dark:border-slate-800 dark:bg-black sm:p-5"
//           >
//             <div className="container mx-auto flex flex-col items-center justify-between gap-3 sm:gap-4 md:flex-row">
//               <p className="flex-grow text-center text-sm leading-relaxed text-slate-300 dark:text-slate-400 md:text-left">
//                 🍪 We use cookies to enhance your experience and for analytics.
//                 By clicking &quot;Accept All&quot;, you consent to our use of
//                 cookies. Learn more in our{" "}
//                 <Link
//                   href="/legal/privacy-policy"
//                   className="font-medium underline hover:text-blue-300"
//                 >
//                   Privacy Policy
//                 </Link>
//                 .
//               </p>
//               <div className="mt-3 flex flex-shrink-0 gap-2 sm:gap-3 md:mt-0">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => {
//                     /* TODO: Implement actual preference management or just dismiss */
//                     setShowCookieBanner(false);
//                   }}
//                   className="border-slate-600 px-3 py-1.5 text-slate-300 hover:bg-slate-700 hover:text-white dark:border-slate-500 dark:hover:bg-slate-600 sm:px-4"
//                 >
//                   Manage Preferences
//                 </Button>
//                 <Button
//                   size="sm"
//                   onClick={acceptCookies}
//                   className="rounded-md bg-blue-500 px-4 py-1.5 text-white hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500 sm:px-5"
//                 >
//                   Accept All
//                 </Button>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  FileText,
  Wand2,
  ClipboardList,
  Mic,
  Brain,
  Mail,
  Globe,
  Star,
  CheckCircle,
  ArrowRight,
  Award,
  User,
  Facebook,
  Youtube,
  Twitter,
  Linkedin,
  ChevronDown,
  Menu,
  X,
  Edit3,
  MoveRight,
} from "lucide-react";

// Assets
import logo from "@/assets/logo.png";

// SECTION: Data Interfaces
interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

interface KeyFeature {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
  themeColorClass?: string;
  badge?: string;
}

// SECTION: Homepage Content Configuration

const KEY_FEATURES_DATA: KeyFeature[] = [
  {
    icon: Wand2,
    title: "Resume Wizard Pro",
    description:
      "Intelligent, step-by-step guidance to craft a perfect, ATS-optimized resume.",
    href: "/wizard",
    themeColorClass:
      "group-hover:border-blue-500 dark:group-hover:border-blue-400",
    badge: "New",
  },
  {
    icon: FileText,
    title: "AI Resume Builder",
    description:
      "Classic builder with AI suggestions for impactful content and professional templates.",
    href: "/resumes",
    themeColorClass:
      "group-hover:border-teal-500 dark:group-hover:border-teal-400",
  },
  {
    icon: Mic,
    title: "Interview Simulator",
    description:
      "Practice interviews with AI, get instant feedback on answers and communication style.",
    href: "/interview-simulator",
    themeColorClass:
      "group-hover:border-indigo-500 dark:group-hover:border-indigo-400",
  },
  {
    icon: ClipboardList,
    title: "Resume Audit & Score",
    description:
      "Upload your resume for an instant AI-powered analysis and improvement suggestions.",
    href: "/audit",
    themeColorClass:
      "group-hover:border-pink-500 dark:group-hover:border-pink-400",
  },
  {
    icon: Brain,
    title: "Resume Lab",
    description:
      "Advanced AI editing tools to refine every detail of your resume for maximum impact.",
    href: "/resume-lab",
    themeColorClass:
      "group-hover:border-purple-500 dark:group-hover:border-purple-400",
  },
  {
    icon: Globe,
    title: "Smart Job Tracker",
    description:
      "Organize applications, track deadlines, and manage your job search pipeline efficiently.",
    href: "/job-tracker",
    themeColorClass:
      "group-hover:border-green-500 dark:group-hover:border-green-400",
  },
];

const PROCESS_STEPS_DATA = [
  {
    icon: Edit3,
    title: "Craft & Optimize",
    description: "Build standout resumes and cover letters with AI precision.",
  },
  {
    icon: Mic,
    title: "Prepare & Practice",
    description: "Ace interviews with our AI simulator and targeted feedback.",
  },
  {
    icon: CheckCircle,
    title: "Track & Succeed",
    description: "Manage your job search and gain insights for career growth.",
  },
];

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    quote:
      "AI Career Suite revolutionized my job application process. The tools are intuitive and incredibly effective.",
    author: "Jessica Chen",
    role: "Marketing Director",
  },
  {
    quote:
      "The level of detail and AI assistance is unparalleled. I felt so much more confident going into interviews.",
    author: "David Miller",
    role: "Lead Software Engineer",
  },
  {
    quote:
      "From crafting the perfect resume to tracking applications, this platform has it all. A must-have!",
    author: "Aisha Khan",
    role: "UX Lead",
  },
];

const FAQ_DATA_LIST = [
  {
    question: "What makes AI Career Suite different?",
    answer:
      "We offer a comprehensive, AI-powered toolkit covering every stage of your job search, with a strong focus on quality, ease of use, and providing core features for free.",
  },
  {
    question: "How accurate is the AI for resume building and interview prep?",
    answer:
      "Our AI is trained on vast datasets and modern best practices to provide highly relevant and effective suggestions, significantly improving your chances of success.",
  },
  {
    question: "Is it really free to use the core tools?",
    answer:
      "Yes! We believe everyone deserves access to high-quality career tools. Our core features, including the Resume Wizard and AI Resume Builder, are free.",
  },
  {
    question: "How is my personal data protected?",
    answer:
      "We prioritize your data security and privacy. All data is encrypted, and we adhere to strict data protection policies. Please see our Privacy Policy for full details.",
  },
];

// SECTION: Framer Motion Variants
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
      ease: "easeOut",
    },
  }),
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const cardHoverEffect = {
  y: -5,
  transition: { duration: 0.2, ease: "easeOut" },
};

// SECTION: Simple Navbar
const SimpleNavbar = ({ isSignedIn }: { isSignedIn: boolean | undefined }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClass =
    "text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors px-3 py-2 rounded-md";
  const mobileNavLinkClass =
    "block text-base font-medium text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 py-2.5 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors";

  return (
    <motion.nav
      className={`fixed left-0 right-0 top-0 z-[100] transition-all duration-300 ease-out ${
        isScrolled
          ? "border-b border-gray-200 bg-white/95 shadow-md backdrop-blur-lg dark:border-gray-700/60 dark:bg-gray-900/95"
          : "border-b border-transparent bg-transparent dark:bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2">
          <Image
            src={logo}
            alt="AI Career Suite Logo"
            width={32}
            height={32}
            className="rounded-md transition-transform duration-300 group-hover:rotate-[15deg]"
          />
          <span className="text-xl font-bold text-gray-800 dark:text-white">
            AI<span className="text-blue-600 dark:text-blue-400">Career</span>
            Suite
          </span>
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          <Link href="/wizard" className={navLinkClass}>
            Resume Wizard
          </Link>
          <Link href="/features" className={navLinkClass}>
            More Tools
          </Link>
          {isSignedIn ? (
            <Link href="/wizard">
              <Button
                className="ml-2 bg-blue-600 px-4 text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md dark:bg-blue-500 dark:hover:bg-blue-600"
                size="sm"
              >
                Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/sign-in" className={navLinkClass}>
                Sign In
              </Link>
              <Link href="/sign-up">
                <Button
                  className="ml-2 bg-blue-600 px-4 text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md dark:bg-blue-500 dark:hover:bg-blue-600"
                  size="sm"
                >
                  Sign Up Free
                </Button>
              </Link>
            </>
          )}
        </div>
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="text-gray-700 dark:text-gray-300"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute w-full border-t border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800 md:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              <Link
                href="/wizard"
                className={mobileNavLinkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                Resume Wizard
              </Link>
              <Link
                href="/features"
                className={mobileNavLinkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                More Tools
              </Link>
              <div className="space-y-2 pt-3">
                {isSignedIn ? (
                  <Link
                    href="/wizard"
                    className="block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/sign-in"
                      className="block"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button
                        variant="outline"
                        className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link
                      href="/sign-up"
                      className="block"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                        Sign Up Free
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// SECTION: Main Component
export default function HomeContent() {
  const { isSignedIn } = useUser();
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      !localStorage.getItem("cookiesAcceptedV5")
    ) {
      const timer = setTimeout(() => setShowCookieBanner(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookiesAcceptedV5", "yes");
    setShowCookieBanner(false);
  };

  const toggleFaq = (index: number) =>
    setOpenFaqIndex(openFaqIndex === index ? null : index);

  const primaryCtaLink = isSignedIn ? "/wizard" : "/sign-up";
  const primaryCtaText = isSignedIn
    ? "Go to Your Dashboard"
    : "Get Started Free";

  const heroItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-gray-900 antialiased dark:bg-gray-900 dark:text-gray-100">
      <SimpleNavbar isSignedIn={isSignedIn} />

      {/* Hero Section */}
      <motion.section
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-50 pb-16 pt-24 text-center dark:bg-gray-900 md:pb-20 md:pt-32"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <div
          className="absolute inset-0 opacity-30 dark:opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 10% 20%, hsla(217, 80%, 90%, 0.5) 0px, transparent 50%), radial-gradient(circle at 90% 80%, hsla(170, 70%, 90%, 0.4) 0px, transparent 50%)",
          }}
        />
        <div className="container relative z-10 mx-auto px-4 sm:px-6">
          <motion.div variants={heroItemVariants} custom={0}>
            <Award className="mx-auto mb-5 h-12 w-12 text-blue-600 dark:text-blue-400 sm:h-14 sm:w-14" />
          </motion.div>
          <motion.h1
            variants={heroItemVariants}
            custom={1}
            className="mb-6 text-4xl font-extrabold !leading-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl"
          >
            Build Your Dream Career, <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-teal-300">
              Smarter & Faster
            </span>
          </motion.h1>
          <motion.p
            variants={heroItemVariants}
            custom={2}
            className="mx-auto mb-10 max-w-2xl text-lg text-gray-600 dark:text-gray-300 md:text-xl"
          >
            Leverage cutting-edge AI to craft perfect resumes, ace interviews,
            and navigate your job search with confidence. All essential tools,
            completely free.
          </motion.p>
          <motion.div
            variants={heroItemVariants}
            custom={3}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href={primaryCtaLink}>
              <Button
                size="lg"
                className="group w-full transform rounded-lg bg-blue-600 px-8 py-3.5 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-700 hover:shadow-blue-500/30 dark:bg-blue-500 dark:hover:bg-blue-600 dark:hover:shadow-blue-400/30 sm:w-auto"
              >
                {primaryCtaText}{" "}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/wizard">
              <Button
                size="lg"
                variant="outline"
                className="group w-full transform rounded-lg border-gray-300 px-8 py-3.5 text-lg font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:scale-105 hover:border-gray-400 hover:bg-gray-100 hover:shadow-md dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-gray-800 sm:w-auto"
              >
                Try Resume Wizard{" "}
                <Wand2 className="ml-2 h-5 w-5 text-blue-500 transition-transform group-hover:scale-110" />
              </Button>
            </Link>
          </motion.div>
        </div>
        {/* Scroll Down Indicator */}
        <motion.div
          variants={heroItemVariants}
          custom={4}
          className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 transform cursor-pointer sm:bottom-8 md:bottom-10"
          onClick={() => {
            document
              .getElementById("how-it-works")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          title="Scroll down for more"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: 1,
            }}
          >
            <ChevronDown className="h-8 w-8 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 sm:h-10 sm:w-10" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Process/How It Works Section */}
      <motion.section
        id="how-it-works"
        className="border-y border-gray-100 bg-white py-16 dark:border-gray-800 dark:bg-gray-900 md:py-24"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.h2
            variants={itemVariants}
            className="mb-4 text-center text-3xl font-bold text-gray-900 dark:text-white md:text-4xl"
          >
            Achieve Your Career Goals, Effortlessly
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mx-auto mb-12 max-w-xl text-center text-lg text-gray-600 dark:text-gray-300 md:mb-16"
          >
            Our platform streamlines your job search with a simple, powerful
            process.
          </motion.p>
          <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-3">
            {PROCESS_STEPS_DATA.map((step, idx) => (
              <motion.div
                key={step.title}
                variants={itemVariants}
                custom={idx}
                className="p-6 text-center"
              >
                <div className="mb-5 inline-flex items-center justify-center rounded-full bg-blue-100 p-4 shadow-md dark:bg-blue-900/50">
                  <step.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Key Features Grid Section */}
      <motion.section
        className="bg-gray-50 py-20 dark:bg-gray-800/70 md:py-28"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.h2
            variants={itemVariants}
            className="mb-5 text-center text-3xl font-bold text-gray-900 dark:text-white md:text-4xl"
          >
            Your AI-Powered Career Toolkit
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mx-auto mb-12 max-w-xl text-center text-lg text-gray-600 dark:text-gray-300 md:mb-16"
          >
            Explore a comprehensive suite of tools designed to give you a
            competitive edge at every career stage.
          </motion.p>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {KEY_FEATURES_DATA.map((feature, idx) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                custom={idx}
                whileHover={cardHoverEffect}
                className={`group flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 ease-out dark:border-gray-700 dark:bg-gray-800 ${
                  feature.themeColorClass ||
                  "group-hover:border-gray-400 dark:group-hover:border-gray-500"
                }`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="rounded-lg bg-gray-100 p-2.5 transition-colors group-hover:bg-opacity-80 dark:bg-gray-700/50">
                    <feature.icon
                      className={`h-7 w-7 text-gray-700 transition-transform group-hover:scale-110 dark:text-gray-300 ${
                        feature.themeColorClass
                          ? feature.themeColorClass.replace("border-", "text-")
                          : "group-hover:text-blue-500"
                      }`}
                    />
                  </div>
                  {feature.badge && (
                    <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-700 dark:bg-blue-700/50 dark:text-blue-300">
                      {feature.badge}
                    </span>
                  )}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mb-5 flex-grow text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
                <Link href={feature.href} className="mt-auto block">
                  <Button
                    variant="outline"
                    className="w-full rounded-md px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 group-hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:group-hover:bg-blue-900/30"
                  >
                    Explore Tool{" "}
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
          <motion.div variants={itemVariants} className="mt-16 text-center">
            <Link href="/features">
              <Button
                size="lg"
                className="group rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                View All Features{" "}
                <MoveRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        className="bg-white py-20 dark:bg-gray-900 md:py-28"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="container mx-auto px-6">
          <motion.h2
            variants={itemVariants}
            className="mb-16 text-center text-3xl font-bold text-gray-900 dark:text-white md:mb-20 md:text-4xl"
          >
            Success Stories from Our Community
          </motion.h2>
          <div className="grid gap-8 md:grid-cols-3">
            {TESTIMONIALS_DATA.map((testimonial, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                custom={idx}
                whileHover={cardHoverEffect}
                className="flex flex-col rounded-xl border border-gray-200/70 bg-gray-50 p-6 shadow-lg dark:border-gray-700/60 dark:bg-gray-800/60 md:p-8"
              >
                <div className="mb-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-current text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-md mb-5 flex-grow italic leading-relaxed text-gray-700 dark:text-gray-300">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="mt-auto flex items-center border-t border-gray-200 pt-4 dark:border-gray-700/50">
                  <User className="mr-3 h-10 w-10 rounded-full bg-gray-200 p-2 text-gray-500 dark:bg-gray-700 dark:text-gray-400" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        className="bg-gray-50 py-20 dark:bg-gray-800/70 md:py-28"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="container mx-auto max-w-3xl px-6">
          <motion.h2
            variants={itemVariants}
            className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white md:mb-16 md:text-4xl"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.div
            className="space-y-4"
            variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          >
            {FAQ_DATA_LIST.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg dark:border-gray-700/80 dark:bg-gray-800"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between p-5 text-left font-medium text-gray-800 transition-colors duration-200 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-700/50"
                  aria-expanded={openFaqIndex === index}
                  aria-controls={`faq-content-${index}`}
                >
                  <span className="text-md">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 transform transition-transform duration-300 ease-in-out ${
                      openFaqIndex === index
                        ? "rotate-180 text-blue-500"
                        : "text-gray-400"
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaqIndex === index && (
                    <motion.div
                      id={`faq-content-${index}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="border-t border-gray-200 dark:border-gray-700"
                    >
                      <p className="p-5 pt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section
        className="bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 py-20 dark:from-blue-500 dark:via-blue-600 dark:to-teal-500 md:py-28"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            variants={itemVariants}
            className="mb-6 text-3xl font-bold text-white md:text-4xl"
          >
            Ready to Fast-Track Your Career?
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mx-auto mb-10 max-w-xl text-lg text-blue-100 dark:text-teal-100"
          >
            Unlock your potential with AI Career Suite. Sign up for free and
            experience the future of job searching and career development.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link href={primaryCtaLink}>
              <Button
                size="lg"
                className="group transform rounded-lg bg-white px-10 py-3.5 text-lg font-semibold text-blue-600 shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-gray-50 hover:shadow-gray-100/50 dark:text-teal-600"
              >
                {primaryCtaText}{" "}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-100 py-16 dark:border-gray-700/50 dark:bg-gray-800/90">
        <div className="container mx-auto px-6">
          <div className="grid gap-10 text-sm md:grid-cols-4">
            <div className="md:col-span-2">
              <Link href="/" className="mb-4 flex items-center gap-2.5">
                <Image
                  src={logo}
                  alt="AI Career Suite Logo"
                  width={36}
                  height={36}
                  className="rounded-md"
                />
                <span className="text-xl font-semibold text-gray-800 dark:text-white">
                  AI Career Suite
                </span>
              </Link>
              <p className="max-w-md leading-relaxed text-gray-600 dark:text-gray-400">
                Your intelligent partner for building a successful career,
                powered by cutting-edge AI technology.
              </p>
            </div>
            <div>
              <h4 className="text-md mb-4 font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Company
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="/features"
                    className="text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                  >
                    Features
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-md mb-4 font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Legal & Support
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="/legal/terms-of-use"
                    className="text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                  >
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/privacy-policy"
                    className="text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/data-policy"
                    className="text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                  >
                    Data Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/ai-usage-policy"
                    className="text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                  >
                    AI Usage Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/user-generated-content"
                    className="text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                  >
                    User Content Terms
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setShowCookieBanner(true);
                      localStorage.removeItem("cookiesAcceptedV5");
                    }}
                    className="text-left text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                  >
                    Cookie Settings
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-between border-t border-gray-200 pt-10 text-xs text-gray-500 dark:border-gray-700/50 dark:text-gray-400 sm:flex-row">
            <p>
              © {new Date().getFullYear()} AI Career Suite. All rights
              reserved.
            </p>
            <div className="mt-4 flex space-x-5 sm:mt-0">
              <a
                href="https://x.com/aicareersuite"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="transition-colors hover:text-blue-500 dark:hover:text-blue-400"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://www.linkedin.com/company/ai-career-suite/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="transition-colors hover:text-blue-500 dark:hover:text-blue-400"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://www.facebook.com/share/1EsyxPvNoH/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-gray-500 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.youtube.com/@AICareerSuite"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-gray-500 transition-colors hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500"
              >
                <Youtube size={18} />
              </a>
              <a
                href="mailto:airesumes579@gmail.com"
                aria-label="Email"
                className="text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Cookie Banner */}
      <AnimatePresence>
        {showCookieBanner && (
          <motion.div
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "110%", opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.4,
            }}
            className="fixed bottom-0 left-0 right-0 z-[200] border-t border-slate-700 bg-slate-800 p-4 text-white shadow-2xl dark:border-slate-800 dark:bg-black sm:p-5"
          >
            <div className="container mx-auto flex flex-col items-center justify-between gap-3 sm:gap-4 md:flex-row">
              <p className="flex-grow text-center text-sm leading-relaxed text-slate-300 dark:text-slate-400 md:text-left">
                🍪 We use cookies to enhance your experience and for analytics.
                By clicking &quot;Accept All&quot;, you consent to our use of
                cookies. Learn more in our{" "}
                <Link
                  href="/legal/privacy-policy"
                  className="font-medium underline hover:text-blue-300"
                >
                  Privacy Policy
                </Link>
                .
              </p>
              <div className="mt-3 flex flex-shrink-0 gap-2 sm:gap-3 md:mt-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowCookieBanner(false);
                  }}
                  className="border-slate-600 px-3 py-1.5 text-slate-300 hover:bg-slate-700 hover:text-white dark:border-slate-500 dark:hover:bg-slate-600 sm:px-4"
                >
                  Manage Preferences
                </Button>
                <Button
                  size="sm"
                  onClick={acceptCookies}
                  className="rounded-md bg-blue-500 px-4 py-1.5 text-white hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500 sm:px-5"
                >
                  Accept All
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
