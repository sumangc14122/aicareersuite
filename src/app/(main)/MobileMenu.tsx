// // "use client";

// // import { useState } from "react";
// // import Link from "next/link";
// // import { useUser } from "@clerk/nextjs";
// // import { User, FileText, Edit, MessageSquare } from "lucide-react";

// // export default function MobileMenu() {
// //   const [isMenuOpen, setIsMenuOpen] = useState(false);
// //   const [isProfileHubOpen, setIsProfileHubOpen] = useState(false);
// //   const { isSignedIn, user } = useUser();

// //   return (
// //     <>
// //       <button
// //         className="rounded-md p-2 text-gray-700 hover:text-teal-600 dark:text-gray-300 md:hidden"
// //         onClick={() => setIsMenuOpen(!isMenuOpen)}
// //         aria-expanded={isMenuOpen}
// //         aria-label="Toggle mobile menu"
// //       >
// //         <svg
// //           className="h-6 w-6"
// //           fill="none"
// //           stroke="currentColor"
// //           viewBox="0 0 24 24"
// //         >
// //           <path
// //             strokeLinecap="round"
// //             strokeLinejoin="round"
// //             strokeWidth={2}
// //             d="M4 6h16M4 12h16m-7 6h7"
// //           />
// //         </svg>
// //       </button>
// //       {isMenuOpen && (
// //         <div className="absolute right-4 top-16 w-48 rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800 md:hidden">
// //           <Link
// //             href="/resumes"
// //             className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
// //             onClick={() => setIsMenuOpen(false)}
// //           >
// //             📄 Resume Builder
// //           </Link>
// //           <Link
// //             href="/cover-letter"
// //             className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
// //             onClick={() => setIsMenuOpen(false)}
// //           >
// //             ✉️ Cover Letter
// //           </Link>
// //           <Link
// //             href="/audit"
// //             className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
// //             onClick={() => setIsMenuOpen(false)}
// //           >
// //             📊 Audit Resume
// //           </Link>
// //           <Link
// //             href="/job-tracker"
// //             className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
// //             onClick={() => setIsMenuOpen(false)}
// //           >
// //             📋 Job Tracker
// //           </Link>
// //           {isSignedIn && user?.id && (
// //             <Link
// //               href="/resume-lab"
// //               className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
// //               onClick={() => setIsMenuOpen(false)}
// //             >
// //               🧪 Resume Lab
// //             </Link>
// //           )}
// //           {isSignedIn && (
// //             <>
// //               <button
// //                 onClick={() => setIsProfileHubOpen(!isProfileHubOpen)}
// //                 className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
// //                 aria-expanded={isProfileHubOpen}
// //                 aria-haspopup="true"
// //               >
// //                 <User className="h-4 w-4" /> Profile Hub
// //               </button>
// //               {isProfileHubOpen && (
// //                 <div className="border-l border-gray-200 pl-4 dark:border-gray-700">
// //                   <Link
// //                     href="/profile/create"
// //                     className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
// //                     onClick={() => {
// //                       setIsMenuOpen(false);
// //                       setIsProfileHubOpen(false);
// //                     }}
// //                   >
// //                     <Edit className="h-4 w-4" /> Profile Settings
// //                   </Link>
// //                   <Link
// //                     href={`/profile/${user?.id}`}
// //                     className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
// //                     onClick={() => {
// //                       setIsMenuOpen(false);
// //                       setIsProfileHubOpen(false);
// //                     }}
// //                   >
// //                     <User className="h-4 w-4" /> View Profile
// //                   </Link>
// //                   <Link
// //                     href="/profile/posts/create"
// //                     className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
// //                     onClick={() => {
// //                       setIsMenuOpen(false);
// //                       setIsProfileHubOpen(false);
// //                     }}
// //                   >
// //                     <MessageSquare className="h-4 w-4" /> New Post
// //                   </Link>
// //                   <Link
// //                     href="/profile/reviews/create"
// //                     className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
// //                     onClick={() => {
// //                       setIsMenuOpen(false);
// //                       setIsProfileHubOpen(false);
// //                     }}
// //                   >
// //                     <FileText className="h-4 w-4" /> Resume Review
// //                   </Link>
// //                   <Link
// //                     href="/chat"
// //                     className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
// //                     onClick={() => {
// //                       setIsMenuOpen(false);
// //                       setIsProfileHubOpen(false);
// //                     }}
// //                   >
// //                     <FileText className="h-4 w-4" /> AI ChatBot
// //                   </Link>
// //                 </div>
// //               )}
// //             </>
// //           )}
// //         </div>
// //       )}
// //     </>
// //   );
// // }

// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { useTheme } from "next-themes";
// import { useUser, UserButton } from "@clerk/nextjs";
// import { dark } from "@clerk/themes";
// import {
//   FileText,
//   PenTool,
//   Briefcase,
//   Brain,
//   User,
//   Settings,
//   MessageSquare,
//   BarChart,
// } from "lucide-react";

// // Feature groups matching Navbar
// const NAV_GROUPS = [
//   {
//     key: "build",
//     label: "Build",
//     items: [
//       { label: "Build Resume", href: "/resumes", icon: FileText },
//       { label: "Write Cover Letter", href: "/cover-letter", icon: PenTool },
//     ],
//   },
//   {
//     key: "track",
//     label: "Track",
//     items: [
//       { label: "Track Jobs", href: "/job-tracker", icon: Briefcase },
//       { label: "Audit Resume", href: "/audit", icon: BarChart },
//       {
//         label: "Review Resume",
//         href: "/profile/reviews/create",
//         icon: FileText,
//       },
//     ],
//   },
//   {
//     key: "ai-enhance",
//     label: "AI Enhance",
//     items: [
//       { label: "Resume Lab", href: "/resume-lab", icon: Brain, auth: true },
//       { label: "AI Chat", href: "/chat", icon: MessageSquare },
//       {
//         label: "Interview Prep",
//         href: "/interview-simulator",
//         icon: MessageSquare,
//         badge: "New",
//       },
//     ],
//   },
// ];

// const PROFILE_ITEMS = [
//   { label: "Settings", href: "/profile/create", icon: Settings },
//   { label: "View Profile", href: "/profile/:userId", icon: User },
//   { label: "Create Post", href: "/profile/posts/create", icon: MessageSquare },
// ];

// export default function MobileMenu() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [openGroup, setOpenGroup] = useState<string | null>(null);
//   const { theme } = useTheme();
//   const { isSignedIn, user } = useUser();

//   const toggleGroup = (key: string) => {
//     setOpenGroup(openGroup === key ? null : key);
//   };

//   return (
//     <>
//       <button
//         className="rounded-md p-2 text-gray-700 hover:text-teal-600 dark:text-gray-300 md:hidden"
//         onClick={() => setIsMenuOpen(!isMenuOpen)}
//         aria-expanded={isMenuOpen}
//         aria-label="Toggle mobile menu"
//       >
//         <svg
//           className="h-6 w-6"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
//           />
//         </svg>
//       </button>
//       {isMenuOpen && (
//         <div className="animate-fadeIn absolute right-4 top-16 w-64 rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800 md:hidden">
//           {NAV_GROUPS.map((group) => {
//             const visibleItems = group.items.filter(
//               (item) => !item.auth || isSignedIn,
//             );
//             if (!visibleItems.length) return null;
//             const isOpen = openGroup === group.key;
//             return (
//               <div key={group.key}>
//                 <button
//                   onClick={() => toggleGroup(group.key)}
//                   className="flex w-full items-center justify-between px-4 py-3 text-base font-medium tracking-tight text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
//                 >
//                   {group.label}
//                   <svg
//                     className={`h-4 w-4 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M19 9l-7 7-7-7"
//                     />
//                   </svg>
//                 </button>
//                 {isOpen && (
//                   <div className="border-l border-gray-200 pl-4 dark:border-gray-700">
//                     {visibleItems.map((item) => {
//                       const Icon = item.icon;
//                       return (
//                         <Link
//                           key={item.href}
//                           href={item.href}
//                           onClick={() => setIsMenuOpen(false)}
//                           className="flex items-center gap-3 px-4 py-2.5 text-base tracking-tight text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
//                         >
//                           <Icon className="h-4 w-4" />
//                           <span>{item.label}</span>
//                           {item.badge && (
//                             <span className="ml-auto rounded-full bg-teal-100 px-2 py-0.5 text-xs text-teal-800 dark:bg-teal-800 dark:text-teal-100">
//                               {item.badge}
//                             </span>
//                           )}
//                         </Link>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//           {isSignedIn && (
//             <div>
//               <button
//                 onClick={() => toggleGroup("profile")}
//                 className="flex w-full items-center justify-between px-4 py-3 text-base font-medium tracking-tight text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
//               >
//                 <UserButton
//                   appearance={{
//                     baseTheme: theme === "dark" ? dark : undefined,
//                     elements: { avatarBox: { width: 24, height: 24 } },
//                   }}
//                   afterSignOutUrl="/"
//                 />
//                 Profile
//                 <svg
//                   className={`h-4 w-4 transform transition-transform ${openGroup === "profile" ? "rotate-180" : ""}`}
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M19 9l-7 7-7-7"
//                   />
//                 </svg>
//               </button>
//               {openGroup === "profile" && (
//                 <div className="border-l border-gray-200 pl-4 dark:border-gray-700">
//                   {PROFILE_ITEMS.map((item) => {
//                     const Icon = item.icon;
//                     return (
//                       <Link
//                         key={item.href}
//                         href={item.href.replace(":userId", user?.id || "")}
//                         onClick={() => setIsMenuOpen(false)}
//                         className="flex items-center gap-3 px-4 py-2.5 text-base tracking-tight text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
//                       >
//                         <Icon className="h-4 w-4" />
//                         {item.label}
//                       </Link>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       )}

//       {/* Tailwind Animation */}
//       <style jsx>{`
//         .animate-fadeIn {
//           animation: fadeIn 0.2s ease-out;
//         }
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(-4px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>
//     </>
//   );
// }

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useUser, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import {
  FileText,
  PenTool,
  Briefcase,
  Brain,
  User,
  Settings,
  MessageSquare,
  BarChart,
  Wand2, // For AI Resume
  Mic, // For Interview Prep
  ChevronDown, // Explicit chevron
} from "lucide-react";

// Feature groups matching Navbar
const NAV_GROUPS_MOBILE = [
  {
    key: "build",
    label: "Build",
    items: [
      { label: "Build Resume", href: "/resumes", icon: FileText },
      { label: "Write Cover Letter", href: "/cover-letter", icon: PenTool },
    ],
  },
  {
    key: "track",
    label: "Track",
    items: [
      { label: "Track Jobs", href: "/job-tracker", icon: Briefcase },
      { label: "Audit Resume", href: "/audit", icon: BarChart },
      {
        label: "Review Resume",
        href: "/profile/reviews/create",
        icon: FileText,
      },
    ],
  },
  {
    key: "ai-tools", // Renamed
    label: "AI Tools",
    items: [
      { label: "AI Resume", href: "/wizard", icon: Wand2, badge: "Magic" }, // Prominent first item
      { label: "Resume Lab", href: "/resume-lab", icon: Brain, auth: true },
      { label: "AI Chat", href: "/chat", icon: MessageSquare },
      {
        label: "Interview Prep",
        href: "/interview-simulator",
        icon: Mic,
        badge: "New",
      },
    ],
  },
];

const PROFILE_ACTION_ITEMS_MOBILE = [
  { label: "Settings", href: "/profile/create", icon: Settings },
  { label: "View Profile", href: "/profile/:userId", icon: User },
  { label: "Create Post", href: "/profile/posts/create", icon: MessageSquare },
];

export default function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openAccordionKey, setOpenAccordionKey] = useState<string | null>(null);
  const { theme } = useTheme();
  const { isSignedIn, user } = useUser();

  const toggleAccordion = (key: string) => {
    setOpenAccordionKey(openAccordionKey === key ? null : key);
  };

  const closeFullMenu = () => {
    setIsMenuOpen(false);
    setOpenAccordionKey(null);
  };

  return (
    <>
      <button
        className="rounded-md p-2 text-gray-700 hover:text-teal-600 dark:text-gray-300 md:hidden"
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
          if (isMenuOpen) setOpenAccordionKey(null); // Reset accordions when closing menu
        }}
        aria-expanded={isMenuOpen}
        aria-label="Toggle mobile menu"
      >
        {isMenuOpen ? (
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        )}
      </button>
      {isMenuOpen && (
        <div className="animate-fadeIn absolute right-4 top-16 z-50 w-72 rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800 md:hidden">
          {" "}
          {/* Ensured z-index */}
          {NAV_GROUPS_MOBILE.map((group) => {
            const visibleItems = group.items.filter(
              (item) => !item.auth || isSignedIn,
            );
            if (!visibleItems.length) return null;
            const isOpen = openAccordionKey === group.key;
            return (
              <div
                key={group.key}
                className="border-b border-gray-200 last:border-b-0 dark:border-gray-700"
              >
                <button
                  onClick={() => toggleAccordion(group.key)}
                  className="flex w-full items-center justify-between px-4 py-3 text-base font-medium tracking-tight text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  {group.label}
                  <ChevronDown
                    className={`h-5 w-5 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className="bg-gray-50 dark:bg-gray-800/50">
                    {visibleItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={closeFullMenu}
                          className="flex items-center gap-3 border-t border-gray-200 px-4 py-3 pl-6 text-base tracking-tight text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"
                        >
                          <Icon className="h-4 w-4 flex-shrink-0" />
                          <span className="flex-grow">{item.label}</span>
                          {item.badge && (
                            <span className="ml-auto flex-shrink-0 rounded-full bg-teal-100 px-2 py-0.5 text-xs text-teal-800 dark:bg-teal-700 dark:text-teal-100">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
          {isSignedIn && (
            <div
              key="profile-actions"
              className="border-b border-gray-200 last:border-b-0 dark:border-gray-700"
            >
              <button
                onClick={() => toggleAccordion("profile-actions")}
                className="flex w-full items-center justify-between px-4 py-3 text-base font-medium tracking-tight text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Profile Actions
                <ChevronDown
                  className={`h-5 w-5 transform transition-transform ${openAccordionKey === "profile-actions" ? "rotate-180" : ""}`}
                />
              </button>
              {openAccordionKey === "profile-actions" && (
                <div className="bg-gray-50 dark:bg-gray-800/50">
                  {PROFILE_ACTION_ITEMS_MOBILE.map((item) => {
                    const Icon = item.icon;
                    const href =
                      item.href.includes(":userId") && user?.id
                        ? item.href.replace(":userId", user.id)
                        : item.href;
                    return (
                      <Link
                        key={item.label}
                        href={href}
                        onClick={closeFullMenu}
                        className="flex items-center gap-3 border-t border-gray-200 px-4 py-3 pl-6 text-base tracking-tight text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          )}
          {isSignedIn && (
            <div className="border-t border-gray-200 px-4 py-3 dark:border-gray-700">
              <UserButton
                appearance={{
                  baseTheme: theme === "dark" ? dark : undefined,
                  elements: {
                    avatarBox: { width: 32, height: 32 }, // Slightly larger for touch
                    userButtonPopoverCard: { width: "250px" },
                  },
                }}
                afterSignOutUrl="/"
              />
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
