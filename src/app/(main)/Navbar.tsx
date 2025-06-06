// // // // // // // // "use client";

// // // // // // // // import logo from "@/assets/logo.png";
// // // // // // // // import ThemeToggle from "@/components/ThemeToggle";
// // // // // // // // import { UserButton } from "@clerk/nextjs";
// // // // // // // // import { dark } from "@clerk/themes";
// // // // // // // // import { CreditCard } from "lucide-react";
// // // // // // // // import { useTheme } from "next-themes";
// // // // // // // // import Image from "next/image";
// // // // // // // // import Link from "next/link";
// // // // // // // // import { Button } from "@/components/ui/button"; // 👈 Add this line

// // // // // // // // export default function Navbar() {
// // // // // // // //   const { theme } = useTheme();

// // // // // // // //   return (
// // // // // // // //     <header className="shadow-sm">
// // // // // // // //       <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 p-3">
// // // // // // // //         <Link href="/resumes" className="flex items-center gap-2">
// // // // // // // //           <Image
// // // // // // // //             src={logo}
// // // // // // // //             alt="Logo"
// // // // // // // //             width={35}
// // // // // // // //             height={35}
// // // // // // // //             className="rounded-full"
// // // // // // // //           />
// // // // // // // //           <span className="text-xl font-bold tracking-tight">
// // // // // // // //             AI Resume Builder
// // // // // // // //           </span>
// // // // // // // //         </Link>
// // // // // // // //         <div className="flex items-center gap-3">
// // // // // // // //         <Link href="/cover-letter" className="text-gray-700 hover:text-gray-900">
// // // // // // // //             Cover Letter
// // // // // // // //           </Link>

// // // // // // // //           <Link href="/audit">
// // // // // // // //   <Button variant="ghost">Audit Resume</Button>
// // // // // // // // </Link>

// // // // // // // //           <Link href="/job-tracker" className="block px-4 py-2 hover:bg-gray-200 rounded">
// // // // // // // //   🧾 Job Tracker
// // // // // // // // </Link>
// // // // // // // //           <ThemeToggle />
// // // // // // // //           <UserButton
// // // // // // // //             appearance={{
// // // // // // // //               baseTheme: theme === "dark" ? dark : undefined,
// // // // // // // //               elements: {
// // // // // // // //                 avatarBox: {
// // // // // // // //                   width: 35,
// // // // // // // //                   height: 35,
// // // // // // // //                 },
// // // // // // // //               },
// // // // // // // //             }}
// // // // // // // //           >
// // // // // // // //             <UserButton.MenuItems>
// // // // // // // //               <UserButton.Link
// // // // // // // //                 label="Billing"
// // // // // // // //                 labelIcon={<CreditCard className="size-4" />}
// // // // // // // //                 href="/billing"
// // // // // // // //               />
// // // // // // // //             </UserButton.MenuItems>
// // // // // // // //           </UserButton>
// // // // // // // //         </div>
// // // // // // // //       </div>
// // // // // // // //     </header>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // "use client";

// // // // // // // import logo from "@/assets/logo.png";
// // // // // // // import ThemeToggle from "@/components/ThemeToggle";
// // // // // // // import { UserButton } from "@clerk/nextjs";
// // // // // // // import { dark } from "@clerk/themes";
// // // // // // // import { CreditCard, Settings, LogOut, User, Info } from "lucide-react";
// // // // // // // import { useTheme } from "next-themes";
// // // // // // // import Image from "next/image";
// // // // // // // import Link from "next/link";
// // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // import { useAuth } from "@clerk/nextjs"; // For subscription status (optional)
// // // // // // // import { useState } from "react";

// // // // // // // export default function Navbar() {
// // // // // // //   const { theme } = useTheme();
// // // // // // //   // const { user } = useAuth(); // Optional: For subscription status
// // // // // // //   const [isMenuOpen, setIsMenuOpen] = useState(false);

// // // // // // //   // Simulated subscription status (replace with real logic if integrated)
// // // // // // //   // const isProUser = user?.publicMetadata?.subscription === "pro" || false;
// // // // // // //   const auditsRemaining = 5; // Replace with actual API call if available

// // // // // // //   return (
// // // // // // //     <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-800">
// // // // // // //       <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
// // // // // // //         {/* Logo and Brand */}
// // // // // // //         <Link href="/resumes" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
// // // // // // //           <Image
// // // // // // //             src={logo}
// // // // // // //             alt="AI Resume Builder Logo"
// // // // // // //             width={40}
// // // // // // //             height={40}
// // // // // // //             className="rounded-full"
// // // // // // //           />
// // // // // // //           <div>
// // // // // // //             <span className="text-xl font-extrabold text-indigo-900 dark:text-teal-300 tracking-tight">
// // // // // // //               AI Resume Builder
// // // // // // //             </span>
// // // // // // //             <p className="text-xs text-gray-600 dark:text-gray-400">Your Career, Optimized</p>
// // // // // // //           </div>
// // // // // // //         </Link>

// // // // // // //         {/* Navigation and Actions */}
// // // // // // //         <div className="flex items-center gap-4">
// // // // // // //           {/* Desktop Navigation */}
// // // // // // //           <nav className="hidden md:flex items-center gap-4">
// // // // // // //             <Link
// // // // // // //               href="/cover-letter"
// // // // // // //               className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium px-3 py-2 rounded-md transition-colors"
// // // // // // //             >
// // // // // // //               Cover Letter
// // // // // // //             </Link>
// // // // // // //             <Link
// // // // // // //               href="/audit"
// // // // // // //               className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium px-3 py-2 rounded-md transition-colors flex items-center"
// // // // // // //               title="Get an AI-powered audit with personalized suggestions"
// // // // // // //             >
// // // // // // //               📊 Audit Resume
// // // // // // //             </Link>
// // // // // // //             <Link
// // // // // // //               href="/job-tracker"
// // // // // // //               className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium px-3 py-2 rounded-md transition-colors flex items-center"
// // // // // // //             >
// // // // // // //               📋 Job Tracker
// // // // // // //             </Link>
// // // // // // //           </nav>

// // // // // // //           {/* Mobile Menu Toggle */}
// // // // // // //           <button
// // // // // // //             className="md:hidden text-gray-700 dark:text-gray-300 hover:text-teal-600 p-2 rounded-md"
// // // // // // //             onClick={() => setIsMenuOpen(!isMenuOpen)}
// // // // // // //           >
// // // // // // //             <svg
// // // // // // //               className="w-6 h-6"
// // // // // // //               fill="none"
// // // // // // //               stroke="currentColor"
// // // // // // //               viewBox="0 0 24 24"
// // // // // // //             >
// // // // // // //               <path
// // // // // // //                 strokeLinecap="round"
// // // // // // //                 strokeLinejoin="round"
// // // // // // //                 strokeWidth={2}
// // // // // // //                 d="M4 6h16M4 12h16m-7 6h7"
// // // // // // //               />
// // // // // // //             </svg>
// // // // // // //           </button>

// // // // // // //           {/* Mobile Menu */}
// // // // // // //           {isMenuOpen && (
// // // // // // //             <div className="absolute top-16 right-4 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg md:hidden">
// // // // // // //               <Link
// // // // // // //                 href="/cover-letter"
// // // // // // //                 className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
// // // // // // //                 onClick={() => setIsMenuOpen(false)}
// // // // // // //               >
// // // // // // //                 Cover Letter
// // // // // // //               </Link>
// // // // // // //               <Link
// // // // // // //                 href="/audit"
// // // // // // //                 className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
// // // // // // //                 onClick={() => setIsMenuOpen(false)}
// // // // // // //               >
// // // // // // //                 📊 Audit Resume
// // // // // // //               </Link>
// // // // // // //               <Link
// // // // // // //                 href="/job-tracker"
// // // // // // //                 className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
// // // // // // //                 onClick={() => setIsMenuOpen(false)}
// // // // // // //               >
// // // // // // //                 📋 Job Tracker
// // // // // // //               </Link>
// // // // // // //             </div>
// // // // // // //           )}

// // // // // // //           {/* Theme Toggle and User Section */}
// // // // // // //           <div className="flex items-center gap-2">
// // // // // // //             <ThemeToggle />
// // // // // // //             <div className="relative">
// // // // // // //               <UserButton
// // // // // // //                 appearance={{
// // // // // // //                   baseTheme: theme === "dark" ? dark : undefined,
// // // // // // //                   elements: {
// // // // // // //                     avatarBox: {
// // // // // // //                       width: 35,
// // // // // // //                       height: 35,
// // // // // // //                     },
// // // // // // //                   },
// // // // // // //                 }}
// // // // // // //               >
// // // // // // //                 <UserButton.MenuItems>
// // // // // // //                   <UserButton.Link
// // // // // // //                     label="Profile"
// // // // // // //                     labelIcon={<User className="size-4" />}
// // // // // // //                     href="/profile"
// // // // // // //                   />
// // // // // // //                   <UserButton.Link
// // // // // // //                     label="Billing"
// // // // // // //                     labelIcon={<CreditCard className="size-4" />}
// // // // // // //                     href="/billing"
// // // // // // //                   />
// // // // // // //                   {/* <UserButton.Link
// // // // // // //                     label="Settings"
// // // // // // //                     labelIcon={<Settings className="size-4" />}
// // // // // // //                     href="/settings"
// // // // // // //                   /> */}
// // // // // // //                   {/* <UserButton.Link
// // // // // // //                     label="Logout"
// // // // // // //                     labelIcon={<LogOut className="size-4" />}
// // // // // // //                     href="/sign-out"
// // // // // // //                   /> */}
// // // // // // //                 </UserButton.MenuItems>
// // // // // // //               </UserButton>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     </header>
// // // // // // //   );
// // // // // // // }

// // // // // // "use client";

// // // // // // import logo from "@/assets/logo.png";
// // // // // // import ThemeToggle from "@/components/ThemeToggle";
// // // // // // import { UserButton } from "@clerk/nextjs";
// // // // // // import { dark } from "@clerk/themes";
// // // // // // import { CreditCard } from "lucide-react";
// // // // // // import { useTheme } from "next-themes";
// // // // // // import Image from "next/image";
// // // // // // import Link from "next/link";
// // // // // // import { Button } from "@/components/ui/button";
// // // // // // import MobileMenu from "./MobileMenu"; // New client component for mobile menu

// // // // // // export default function Navbar() {
// // // // // //   const { theme } = useTheme();

// // // // // //   return (
// // // // // //     <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-800">
// // // // // //       <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
// // // // // //         <Link href="/resumes" className="flex items-center gap-2">
// // // // // //           <Image
// // // // // //             src={logo}
// // // // // //             alt="Logo"
// // // // // //             width={35}
// // // // // //             height={35}
// // // // // //             className="rounded-full"
// // // // // //           />
// // // // // //           <span className="text-xl font-bold tracking-tight">
// // // // // //             AI Resume Builder
// // // // // //           </span>
// // // // // //         </Link>
// // // // // //         <div className="flex items-center gap-3">
// // // // // //           <nav className="hidden md:flex items-center gap-3">
// // // // // //             <Link href="/resumes" className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400">
// // // // // //               Resume Builder
// // // // // //             </Link>
// // // // // //             <Link href="/cover-letter" className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400">
// // // // // //               Cover Letter
// // // // // //             </Link>
// // // // // //             <Link href="/audit" className="block px-4 py-2 hover:bg-gray-200 rounded">Audit Resume
// // // // // //             </Link>
// // // // // //             <Link href="/job-tracker" className="block px-4 py-2 hover:bg-gray-200 rounded">
// // // // // //               Job Tracker
// // // // // //             </Link>
// // // // // //           </nav>
// // // // // //           <MobileMenu />
// // // // // //           <ThemeToggle />
// // // // // //           <UserButton
// // // // // //             appearance={{
// // // // // //               baseTheme: theme === "dark" ? dark : undefined,
// // // // // //               elements: {
// // // // // //                 avatarBox: {
// // // // // //                   width: 35,
// // // // // //                   height: 35,
// // // // // //                 },
// // // // // //               },
// // // // // //             }}
// // // // // //           >
// // // // // //             <UserButton.MenuItems>
// // // // // //               <UserButton.Link
// // // // // //                 label="Billing"
// // // // // //                 labelIcon={<CreditCard className="size-4" />}
// // // // // //                 href="/billing"
// // // // // //               />
// // // // // //             </UserButton.MenuItems>
// // // // // //           </UserButton>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </header>
// // // // // //   );
// // // // // // }

// // // // // "use client";

// // // // // import logo from "@/assets/logo.png";
// // // // // import ThemeToggle from "@/components/ThemeToggle";
// // // // // import { UserButton } from "@clerk/nextjs";
// // // // // import { dark } from "@clerk/themes";
// // // // // import { CreditCard } from "lucide-react";
// // // // // import { useTheme } from "next-themes";
// // // // // import Image from "next/image";
// // // // // import Link from "next/link";
// // // // // import MobileMenu from "./MobileMenu";
// // // // // import { useUser } from "@clerk/nextjs";

// // // // // export default function Navbar() {
// // // // //   const { theme } = useTheme();
// // // // //   const user = useUser();

// // // // //   return (
// // // // //     <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-800">
// // // // //       <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
// // // // //         <Link href="/resumes" className="flex items-center gap-2">
// // // // //           <Image
// // // // //             src={logo}
// // // // //             alt="Logo"
// // // // //             width={35}
// // // // //             height={35}
// // // // //             className="rounded-full"
// // // // //           />
// // // // //           <span className="text-xl font-bold tracking-tight">
// // // // //             AI Resume Builder
// // // // //           </span>
// // // // //         </Link>
// // // // //         <div className="flex items-center gap-3">
// // // // //           <nav className="hidden md:flex items-center gap-4">

// // // // //             <Link
// // // // //   href="/profile/create"
// // // // //   className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium text-sm px-3 py-2 rounded-md transition-colors"
// // // // // >
// // // // //   Profile Settings
// // // // // </Link>
// // // // // {user?.id && (
// // // // //             <Link
// // // // //               href={`/profile/${user.id}`}
// // // // //               className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium text-sm px-3 py-2 rounded-md transition-colors"
// // // // //             >
// // // // //               View Profile
// // // // //             </Link>
// // // // // )}

// // // // //           </nav>
// // // // //           <MobileMenu />
// // // // //           <ThemeToggle />
// // // // //           <UserButton
// // // // //             appearance={{
// // // // //               baseTheme: theme === "dark" ? dark : undefined,
// // // // //               elements: {
// // // // //                 avatarBox: {
// // // // //                   width: 35,
// // // // //                   height: 35,
// // // // //                 },
// // // // //               },
// // // // //             }}
// // // // //           >
// // // // //             <UserButton.MenuItems>
// // // // //               <UserButton.Link
// // // // //                 label="Billing"
// // // // //                 labelIcon={<CreditCard className="size-4" />}
// // // // //                 href="/billing"
// // // // //               />
// // // // //             </UserButton.MenuItems>
// // // // //           </UserButton>
// // // // //         </div>
// // // // //       </div>
// // // // //     </header>
// // // // //   );
// // // // // }

// // // // // src/components/Navbar.tsx
// // // // "use client";

// // // // import logo from "@/assets/logo.png";
// // // // import ThemeToggle from "@/components/ThemeToggle";
// // // // import { UserButton } from "@clerk/nextjs";
// // // // import { dark } from "@clerk/themes";
// // // // import { CreditCard } from "lucide-react";
// // // // import { useTheme } from "next-themes";
// // // // import Image from "next/image";
// // // // import Link from "next/link";
// // // // import MobileMenu from "./MobileMenu";
// // // // import { useUser } from "@clerk/nextjs";

// // // // export default function Navbar() {
// // // //   const { theme } = useTheme();
// // // //   const { isSignedIn, user } = useUser();

// // // //   return (
// // // //     <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-800">
// // // //       <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
// // // //         <Link href="/resumes" className="flex items-center gap-2">
// // // //           <Image
// // // //             src={logo}
// // // //             alt="Logo"
// // // //             width={35}
// // // //             height={35}
// // // //             className="rounded-full"
// // // //           />
// // // //           <span className="text-xl font-bold tracking-tight">
// // // //             AI Resume Builder
// // // //           </span>
// // // //         </Link>
// // // //         <div className="flex items-center gap-3">
// // // //           <nav className="hidden md:flex items-center gap-4">

// // // //           <Link
// // // //               href="/resumes"
// // // //               className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium text-sm px-3 py-2 rounded-md transition-colors"
// // // //             >
// // // //               📄 Resume Builder
// // // //             </Link>
// // // //             <Link
// // // //               href="/cover-letter"
// // // //               className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium text-sm px-3 py-2 rounded-md transition-colors"
// // // //             >
// // // //               ✉️ Cover Letter
// // // //             </Link>
// // // //             <Link
// // // //               href="/audit"
// // // //               className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium text-sm px-3 py-2 rounded-md transition-colors"
// // // //               title="Get an AI-powered audit with personalized suggestions"
// // // //             >
// // // //               📊 Audit Resume
// // // //             </Link>
// // // //             <Link
// // // //               href="/job-tracker"
// // // //               className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium text-sm px-3 py-2 rounded-md transition-colors"
// // // //             >
// // // //               📋 Job Tracker
// // // //             </Link>

// // // //             <Link
// // // //               href="/profile/create"
// // // //               className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium text-sm px-3 py-2 rounded-md transition-colors"
// // // //             >
// // // //               Profile Settings
// // // //             </Link>

// // // //             {isSignedIn && user?.id && (
// // // //               <Link
// // // //                 href={`/profile/${user.id}`}
// // // //                 className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium text-sm px-3 py-2 rounded-md transition-colors"
// // // //               >
// // // //                 View Profile
// // // //               </Link>
// // // //             )}

// // // // {isSignedIn && user?.id && (
// // // //               <Link
// // // //                 href="/profile/posts/create"
// // // //                 className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium text-sm px-3 py-2 rounded-md transition-colors"
// // // //               >
// // // //                 New Post
// // // //               </Link>

// // // //             )}
// // // // {isSignedIn && user?.id && (
// // // // <Link href="/profile/reviews/create" className="…">
// // // //   Ask for Resume Review
// // // // </Link>
// // // // )}

// // // // {isSignedIn && user?.id && (
// // // // <Link href="/resume-lab" className="…">
// // // //   Resume Lab
// // // // </Link>
// // // // )}

// // // //           </nav>

// // // //           <MobileMenu />
// // // //           <ThemeToggle />
// // // //           <UserButton
// // // //             appearance={{
// // // //               baseTheme: theme === "dark" ? dark : undefined,
// // // //               elements: {
// // // //                 avatarBox: { width: 35, height: 35 },
// // // //               },
// // // //             }}
// // // //           >
// // // //             <UserButton.MenuItems>
// // // //               <UserButton.Link
// // // //                 label="Billing"
// // // //                 labelIcon={<CreditCard className="size-4" />}
// // // //                 href="/billing"
// // // //               />
// // // //             </UserButton.MenuItems>
// // // //           </UserButton>
// // // //         </div>
// // // //       </div>
// // // //     </header>
// // // //   );
// // // // }

// // "use client";

// // import logo from "@/assets/logo.png";
// // import ThemeToggle from "@/components/ThemeToggle";
// // import { UserButton } from "@clerk/nextjs";
// // import { dark } from "@clerk/themes";
// // import { CreditCard, User, FileText, Edit, MessageSquare } from "lucide-react";
// // import { useTheme } from "next-themes";
// // import Image from "next/image";
// // import Link from "next/link";
// // import MobileMenu from "./MobileMenu";
// // import { useUser } from "@clerk/nextjs";
// // import { useState } from "react";

// // export default function Navbar() {
// //   const { theme } = useTheme();
// //   const { isSignedIn, user } = useUser();
// //   const [isProfileHubOpen, setIsProfileHubOpen] = useState(false);

// //   return (
// //     <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-md dark:border-gray-800 dark:bg-gray-900">
// //       <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
// //         <Link href="/" className="flex items-center gap-2">
// //           <Image
// //             src={logo}
// //             alt="AI Resume Builder Logo"
// //             width={35}
// //             height={35}
// //             className="rounded-full"
// //           />
// //           <span className="text-xl font-bold tracking-tight">
// //             AI Career Suite
// //           </span>
// //         </Link>
// //         <div className="flex items-center gap-3">
// //           <nav className="hidden items-center gap-4 md:flex">
// //             <Link
// //               href="/resumes"
// //               className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400"
// //             >
// //               📄 Resume Builder
// //             </Link>
// //             <Link
// //               href="/cover-letter"
// //               className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400"
// //             >
// //               ✉️ Cover Letter
// //             </Link>
// //             <Link
// //               href="/audit"
// //               className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400"
// //               title="Get an AI-powered audit with personalized suggestions"
// //             >
// //               📊 Audit Resume
// //             </Link>
// //             <Link
// //               href="/job-tracker"
// //               className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400"
// //             >
// //               📋 Job Tracker
// //             </Link>
// //             {isSignedIn && user?.id && (
// //               <Link
// //                 href="/resume-lab"
// //                 className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400"
// //               >
// //                 🧪 Resume Lab
// //               </Link>
// //             )}
// //             {isSignedIn && (
// //               <div className="relative">
// //                 <button
// //                   onClick={() => setIsProfileHubOpen(!isProfileHubOpen)}
// //                   className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400"
// //                   aria-expanded={isProfileHubOpen}
// //                   aria-haspopup="true"
// //                 >
// //                   <User className="h-4 w-4" /> Profile Hub
// //                 </button>
// //                 {isProfileHubOpen && (
// //                   <div className="absolute left-0 top-full mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
// //                     <Link
// //                       href="/profile/create"
// //                       className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
// //                       onClick={() => setIsProfileHubOpen(false)}
// //                     >
// //                       <Edit className="h-4 w-4" /> Profile Settings
// //                     </Link>
// //                     <Link
// //                       href={`/profile/${user?.id}`}
// //                       className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
// //                       onClick={() => setIsProfileHubOpen(false)}
// //                     >
// //                       <User className="h-4 w-4" /> View Profile
// //                     </Link>
// //                     <Link
// //                       href="/profile/posts/create"
// //                       className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
// //                       onClick={() => setIsProfileHubOpen(false)}
// //                     >
// //                       <MessageSquare className="h-4 w-4" /> New Post
// //                     </Link>
// //                     <Link
// //                       href="/profile/reviews/create"
// //                       className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
// //                       onClick={() => setIsProfileHubOpen(false)}
// //                     >
// //                       <FileText className="h-4 w-4" /> Resume Review
// //                     </Link>
// //                     <Link
// //                       href="/chat"
// //                       className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
// //                       onClick={() => setIsProfileHubOpen(false)}
// //                     >
// //                       <FileText className="h-4 w-4" /> AI ChatBot
// //                     </Link>
// //                   </div>
// //                 )}
// //               </div>
// //             )}
// //           </nav>
// //           <MobileMenu />
// //           <ThemeToggle />
// //           <UserButton
// //             appearance={{
// //               baseTheme: theme === "dark" ? dark : undefined,
// //               elements: {
// //                 avatarBox: { width: 35, height: 35 },
// //               },
// //             }}
// //           >
// //             <UserButton.MenuItems>
// //               <UserButton.Link
// //                 label="Billing"
// //                 labelIcon={<CreditCard className="size-4" />}
// //                 href="/billing"
// //               />
// //             </UserButton.MenuItems>
// //           </UserButton>
// //         </div>
// //       </div>
// //     </header>
// //   );
// // }

// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import { useTheme } from "next-themes";
// import { useUser, UserButton } from "@clerk/nextjs";
// import { dark } from "@clerk/themes";
// import ThemeToggle from "@/components/ThemeToggle";
// import MobileMenu from "./MobileMenu";
// import logo from "@/assets/logo.png";
// import {
//   FileText,
//   PenTool,
//   Briefcase,
//   Brain,
//   User,
//   Settings,
//   MessageSquare,
//   CreditCard,
//   BarChart,
// } from "lucide-react";

// // Feature groups with action-oriented naming
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

// export default function Navbar() {
//   const pathname = usePathname();
//   const { theme } = useTheme();
//   const { isSignedIn, user } = useUser();
//   const [openGroup, setOpenGroup] = useState<string | null>(null);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const groupRefs = useRef<Record<string, HTMLDivElement | null>>({});
//   const profileRef = useRef<HTMLDivElement>(null);

//   // Close dropdowns on outside click
//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (
//         openGroup &&
//         !groupRefs.current[openGroup]?.contains(e.target as Node)
//       ) {
//         setOpenGroup(null);
//       }
//       if (
//         profileOpen &&
//         profileRef.current &&
//         !profileRef.current.contains(e.target as Node)
//       ) {
//         setProfileOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [openGroup, profileOpen]);

//   return (
//     <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
//       <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
//         {/* Logo Section */}
//         <Link href="/" className="group flex items-center gap-2">
//           <Image
//             src={logo}
//             alt="AI Career Suite Logo"
//             width={40}
//             height={40}
//             className="rounded-full transition-transform group-hover:scale-105"
//           />
//           <span className="hidden text-xl font-semibold tracking-tight text-gray-900 dark:text-white sm:inline">
//             AI Career Suite
//           </span>
//         </Link>

//         {/* Desktop Navigation */}
//         <nav className="hidden items-center space-x-8 md:flex">
//           {NAV_GROUPS.map((group) => {
//             const visibleItems = group.items.filter(
//               (item) => !item.auth || isSignedIn,
//             );
//             if (!visibleItems.length) return null;
//             const isOpen = openGroup === group.key;
//             return (
//               <div
//                 key={group.key}
//                 className="relative"
//                 ref={(el) => {
//                   groupRefs.current[group.key] = el;
//                 }}
//               >
//                 <button
//                   onClick={() => setOpenGroup(isOpen ? null : group.key)}
//                   className="flex items-center gap-1 text-base font-medium tracking-tight text-gray-700 transition-colors hover:text-teal-500 dark:text-gray-200 dark:hover:text-teal-400"
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
//                   <div className="animate-fadeIn absolute top-full mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800">
//                     {visibleItems.map((item) => {
//                       const isActive = pathname === item.href;
//                       const Icon = item.icon;
//                       return (
//                         <Link
//                           key={item.href}
//                           href={item.href}
//                           onClick={() => setOpenGroup(null)}
//                           className={`flex items-center gap-3 px-4 py-2.5 text-base tracking-tight transition-colors ${
//                             isActive
//                               ? "bg-teal-50 text-teal-500 dark:bg-teal-900/30"
//                               : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
//                           }`}
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
//         </nav>

//         {/* Right Controls */}
//         <div className="flex items-center gap-3">
//           <ThemeToggle />
//           {isSignedIn && (
//             <>
//               {/* UserButton visible on all screen sizes */}
//               <UserButton
//                 appearance={{
//                   baseTheme: theme === "dark" ? dark : undefined,
//                   elements: { avatarBox: { width: 36, height: 36 } },
//                 }}
//                 afterSignOutUrl="/"
//               >
//                 <UserButton.MenuItems>
//                   <UserButton.Link
//                     label="Billing"
//                     labelIcon={<CreditCard className="h-4 w-4" />}
//                     href="/billing"
//                   />
//                 </UserButton.MenuItems>
//               </UserButton>
//               {/* Profile dropdown for desktop */}
//               <div className="relative hidden md:block" ref={profileRef}>
//                 <button
//                   onClick={() => setProfileOpen(!profileOpen)}
//                   className="flex items-center gap-1.5 text-base font-medium tracking-tight text-gray-700 transition-colors hover:text-teal-500 dark:text-gray-200 dark:hover:text-teal-400"
//                 >
//                   <User className="h-4 w-4" />
//                   Profile
//                   <svg
//                     className={`h-4 w-4 transform transition-transform ${profileOpen ? "rotate-180" : ""}`}
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
//                 {profileOpen && (
//                   <div className="animate-fadeIn absolute right-0 top-full mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800">
//                     <Link
//                       href="/profile/create"
//                       onClick={() => setProfileOpen(false)}
//                       className="flex items-center gap-3 px-4 py-2.5 text-base tracking-tight text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
//                     >
//                       <Settings className="h-4 w-4" />
//                       Settings
//                     </Link>
//                     <Link
//                       href={`/profile/${user?.id}`}
//                       onClick={() => setProfileOpen(false)}
//                       className="flex items-center gap-3 px-4 py-2.5 text-base tracking-tight text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
//                     >
//                       <User className="h-4 w-4" />
//                       View Profile
//                     </Link>
//                     <Link
//                       href="/profile/posts/create"
//                       onClick={() => setProfileOpen(false)}
//                       className="flex items-center gap-3 px-4 py-2.5 text-base tracking-tight text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
//                     >
//                       <MessageSquare className="h-4 w-4" />
//                       Create Post
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             </>
//           )}
//           <MobileMenu />
//         </div>
//       </div>
//       {/* Bottom border highlight */}
//       <div className="h-0.5 bg-gradient-to-r from-teal-500/30 via-teal-500 to-teal-500/30"></div>

//       {/* Tailwind Animation for Dropdowns */}
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
//     </header>
//   );
// }

"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useUser, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import ThemeToggle from "@/components/ThemeToggle";
import MobileMenu from "./MobileMenu";
import logo from "@/assets/logo.png";

import {
  FileText,
  PenTool,
  Briefcase,
  Brain,
  User,
  Settings,
  MessageSquare,
  // CreditCard,
  BarChart,
  Wand2, // For AI Resume
  Mic, // For Interview Prep
  ChevronDown, // Explicit chevron
} from "lucide-react";

// Define types for navigation configuration
interface NavLinkConfig {
  type: "link";
  label: string;
  href: string;
  icon?: React.ElementType; // Icon for the link itself (optional)
  badge?: string;
  auth?: boolean; // If the link itself requires auth
}

interface NavGroupConfig {
  type: "group";
  key: string;
  label: string;
  items: Array<{
    label: string;
    href: string;
    icon: React.ElementType;
    badge?: string;
    auth?: boolean;
  }>;
  auth?: boolean; // If the entire group requires auth
}

type TopLevelNavItemConfig = NavLinkConfig | NavGroupConfig;

const TOP_LEVEL_NAV_CONFIG: TopLevelNavItemConfig[] = [
  {
    type: "link",
    label: "AI Resume",
    href: "/wizard",
    icon: Wand2, // Display icon next to the top-level link
    badge: "Magic",
  },
  {
    type: "group",
    key: "build",
    label: "Build",
    items: [
      { label: "Build Resume", href: "/resumes", icon: FileText },
      { label: "Write Cover Letter", href: "/cover-letter", icon: PenTool },
    ],
  },
  {
    type: "group",
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
    type: "group",
    key: "ai-tools", // Renamed from AI Enhance
    label: "AI Tools",
    items: [
      // AI Resume is now top-level
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

const PROFILE_DROPDOWN_ITEMS = [
  { label: "Settings", href: "/profile/create", icon: Settings },
  { label: "View Profile", href: "/profile/:userId", icon: User },
  { label: "Create Post", href: "/profile/posts/create", icon: MessageSquare },
];

export default function Navbar() {
  const pathname = usePathname() || "";
  const { theme } = useTheme();
  const { isSignedIn, user } = useUser();
  const [openDropdownKey, setOpenDropdownKey] = useState<string | null>(null);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openDropdownKey &&
        dropdownRefs.current[openDropdownKey] &&
        !dropdownRefs.current[openDropdownKey]!.contains(event.target as Node)
      ) {
        // Check if the click was on the button that opened the dropdown
        const buttonForOpenedDropdown = dropdownRefs.current[
          openDropdownKey
        ]?.parentElement?.querySelector(
          `button[aria-controls="${openDropdownKey}"]`,
        );
        if (
          buttonForOpenedDropdown &&
          buttonForOpenedDropdown.contains(event.target as Node)
        ) {
          return; // Do not close if clicking the same button again (it will toggle)
        }
        setOpenDropdownKey(null);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenDropdownKey(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [openDropdownKey]);

  const toggleDropdown = (key: string) => {
    setOpenDropdownKey(openDropdownKey === key ? null : key);
  };

  const closeAllDropdowns = () => {
    setOpenDropdownKey(null);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2"
          onClick={closeAllDropdowns}
        >
          <Image
            src={logo}
            alt="AI Career Suite Logo"
            width={40}
            height={40}
            className="rounded-full transition-transform group-hover:scale-105"
          />
          <span className="hidden text-xl font-semibold tracking-tight text-gray-900 dark:text-white sm:inline">
            AI Career Suite
          </span>
        </Link>

        <nav className="hidden flex-grow items-center justify-center space-x-4 md:flex lg:space-x-6">
          {TOP_LEVEL_NAV_CONFIG.map((navItem) => {
            if (navItem.auth && !isSignedIn) return null;

            if (navItem.type === "link") {
              const Icon = navItem.icon;
              const isActive =
                pathname === navItem.href ||
                (navItem.href !== "/" && pathname.startsWith(navItem.href));
              return (
                <Link
                  key={navItem.label}
                  href={navItem.href}
                  onClick={closeAllDropdowns}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-2 text-base font-medium tracking-tight transition-colors ${
                    isActive
                      ? "bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400"
                      : "text-gray-700 hover:text-teal-500 dark:text-gray-200 dark:hover:text-teal-400"
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {navItem.label}
                  {navItem.badge && (
                    <span className="ml-1 rounded-full bg-teal-100 px-2 py-0.5 text-xs text-teal-800 dark:bg-teal-700 dark:text-teal-100">
                      {navItem.badge}
                    </span>
                  )}
                </Link>
              );
            }

            if (navItem.type === "group") {
              const visibleItems = navItem.items.filter(
                (item) => !item.auth || isSignedIn,
              );
              if (!visibleItems.length && navItem.auth && !isSignedIn)
                return null; // Hide group if all items auth-locked
              if (!visibleItems.length && !navItem.auth) return null; // Hide group if no items (and group itself not auth-locked)

              const isOpen = openDropdownKey === navItem.key;
              return (
                // <div key={navItem.key} className="relative" ref={(el) => (dropdownRefs.current[navItem.key] = el)}>
                <div
                  key={navItem.key}
                  className="relative"
                  ref={(el) => {
                    dropdownRefs.current[navItem.key] = el;
                  }}
                >
                  <button
                    onClick={() => toggleDropdown(navItem.key)}
                    aria-expanded={isOpen}
                    aria-controls={navItem.key}
                    className="flex items-center gap-1 rounded-md px-3 py-2 text-base font-medium tracking-tight text-gray-700 transition-colors hover:text-teal-500 dark:text-gray-200 dark:hover:text-teal-400"
                  >
                    {navItem.label}
                    <ChevronDown
                      className={`h-4 w-4 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div
                      id={navItem.key}
                      className="animate-fadeIn absolute top-full z-40 mt-2 w-60 rounded-lg border border-gray-200 bg-white py-1 shadow-xl dark:border-gray-700 dark:bg-gray-800" // Added z-40
                    >
                      {visibleItems.map((item) => {
                        const Icon = item.icon;
                        const isActive =
                          pathname === item.href ||
                          (item.href !== "/" && pathname.startsWith(item.href));
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={closeAllDropdowns}
                            className={`flex items-center gap-3 px-4 py-2.5 text-base tracking-tight transition-colors ${
                              isActive
                                ? "bg-teal-50 text-teal-600 dark:bg-teal-900/50 dark:text-teal-300"
                                : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                            }`}
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
            }
            return null;
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <ThemeToggle />
          {isSignedIn && (
            <>
              {/* <div className="relative hidden md:block" ref={el => (dropdownRefs.current["profile"] = el)}> */}
              <div
                className="relative hidden md:block"
                ref={(el) => {
                  dropdownRefs.current["profile"] = el;
                }}
              >
                <button
                  onClick={() => toggleDropdown("profile")}
                  aria-expanded={openDropdownKey === "profile"}
                  aria-controls="profile"
                  className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-base font-medium tracking-tight text-gray-700 transition-colors hover:bg-gray-100 hover:text-teal-500 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-teal-400"
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                  <ChevronDown
                    className={`h-4 w-4 transform transition-transform ${openDropdownKey === "profile" ? "rotate-180" : ""}`}
                  />
                </button>
                {openDropdownKey === "profile" && (
                  <div
                    id="profile"
                    className="animate-fadeIn absolute right-0 top-full z-40 mt-2 w-60 rounded-lg border border-gray-200 bg-white py-1 shadow-xl dark:border-gray-700 dark:bg-gray-800" // Added z-40
                  >
                    {PROFILE_DROPDOWN_ITEMS.map((item) => {
                      const Icon = item.icon;
                      const href =
                        item.href.includes(":userId") && user?.id
                          ? item.href.replace(":userId", user.id)
                          : item.href;
                      const isActive = pathname === href;
                      return (
                        <Link
                          key={item.label}
                          href={href}
                          onClick={closeAllDropdowns}
                          className={`flex items-center gap-3 px-4 py-2.5 text-base tracking-tight transition-colors ${
                            isActive
                              ? "bg-teal-50 text-teal-600 dark:bg-teal-900/50 dark:text-teal-300"
                              : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
              <UserButton
                appearance={{
                  baseTheme: theme === "dark" ? dark : undefined,
                  elements: { avatarBox: { width: 36, height: 36 } },
                }}
                afterSignOutUrl="/"
              />
            </>
          )}
          <div className="md:hidden">
            {" "}
            {/* MobileMenu toggle is part of MobileMenu component */}
            <MobileMenu />
          </div>
        </div>
      </div>
      <div className="h-0.5 bg-gradient-to-r from-teal-500/30 via-teal-500 to-teal-500/30 opacity-75"></div>
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
    </header>
  );
}
