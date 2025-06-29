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
// import logo from "@/assets/logo.png";

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
  { label: "Create Profile", href: "/profile/create", icon: Settings },
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
            src="/assets/logo.png"
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
