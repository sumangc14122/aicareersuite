import { TemplateID } from "./GenericTemplate"; //

export interface TemplateStyle {
  id: TemplateID;
  name: string;
  headerBg: string; // e.g., 'bg-slate-800 text-white'
  accentBg: string; // e.g., 'bg-sky-100 text-sky-700'
  layout:
    | "single-column"
    | "two-column"
    | "grid"
    | "timeline"
    | "card"
    | "plain"
    | "market-leading"
    | "linkedin-style";
}

export const TEMPLATES: TemplateStyle[] = [
  //
  {
    id: "split-panel",
    name: "Split Panel",
    headerBg: "bg-slate-700 text-white", // Darker, more contrast
    accentBg: "bg-sky-500 text-white", // Sky blue, good contrast with white text
    layout: "two-column",
  },
  {
    id: "timeline",
    name: "Timeline",
    headerBg: "bg-white text-slate-800 border-b border-slate-200", // Clean with border
    accentBg: "bg-teal-600 text-white", // Darker teal
    layout: "timeline",
  },
  {
    id: "card-stack",
    name: "Card Stack",
    headerBg: "bg-indigo-600 text-white",
    accentBg: "bg-indigo-100 text-indigo-700", // Light accent, dark text
    layout: "card",
  },
  {
    id: "modern-minimal", //
    name: "Modern Minimal", //
    headerBg: "bg-white text-gray-900 border-b border-gray-200/80", // Slightly more defined border
    accentBg: "bg-gray-100 text-gray-700", // Softer accent
    layout: "single-column", //
  },
  {
    id: "elegant-grid",
    name: "Elegant Grid",
    headerBg: "bg-purple-700 text-white", // Keep if it works, or try bg-slate-800
    accentBg: "bg-pink-100 text-pink-700", // Lighter pink with dark text
    layout: "grid",
  },
  {
    id: "plain", //
    name: "Plain & Simple", // Slightly more descriptive
    headerBg: "bg-white text-gray-800", //
    accentBg: "bg-gray-200 text-gray-800", // A subtle accent for section titles
    layout: "single-column", //
  },
  {
    id: "market-leading",
    name: "Market Leader",
    headerBg: "bg-gray-800 text-white", // Dark, professional header
    accentBg: "bg-gray-200 text-gray-800", // Subtle accent for section titles
    layout: "single-column",
  },
  {
    id: "linkedin-style",
    name: "LinkedIn Inspired",
    headerBg: "bg-white text-gray-800 border-b border-gray-300", // Standard LinkedIn header
    accentBg: "bg-white text-gray-700", // Section titles almost no background, rely on typography
    layout: "single-column",
  },
];
