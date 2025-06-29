// // 'use client';

// // import { useState } from "react";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { Textarea } from "@/components/ui/textarea";
// // import { toast } from "sonner";

// // export default function ResumeAuditPage() {
// //   const [file, setFile] = useState<File | null>(null);
// //   const [docType, setDocType] = useState<"resume" | "cover">("resume");
// //   const [jobDesc, setJobDesc] = useState("");
// //   const [result, setResult] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const [jobDescription, setJobDescription] = useState("");

// //   const handleSubmit = async () => {
// //     if (!file) return toast.error("Please upload a file.");
// //     setLoading(true);
// //     setResult("");

// //     const formData = new FormData();
// //     formData.append("file", file);
// //     formData.append("type", docType);
// //     if (jobDesc.trim()) formData.append("jobDescription", jobDesc);

// //     try {
// //       const res = await fetch("/api/audit", {
// //         method: "POST",
// //         body: formData,
// //       });

// //       if (!res.ok) {
// //         const { error } = await res.json();
// //         throw new Error(error || "Audit failed");
// //       }

// //       const data = await res.json();
// //       setResult(data.result);
// //     } catch (err: any) {
// //       toast.error(err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">
// //       <h1 className="text-3xl font-bold">📊 Resume & Cover Letter Audit</h1>
// //       <p className="text-muted-foreground">Upload your document to receive an AI-generated scorecard and suggestions.</p>

// //       <div className="space-y-3">
// //         <Label>Upload File (PDF or DOCX)</Label>
// //         <Input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setFile(e.target.files?.[0] || null)} />

// // //         <Label>Select Document Type</Label>
// // //         <select
// // //           value={docType}
// // //           onChange={(e) => setDocType(e.target.value as "resume" | "cover")}
// // //           className="w-full border border-gray-300 rounded-md px-3 py-2"
// // //         >
// // //           <option value="resume">Resume</option>
// // //           <option value="cover">Cover Letter</option>
// // //         </select>

// // //         <Label>Optional Job Description</Label>
// // //         <Textarea
// // //           value={jobDescription}
// // //           onChange={(e) => setJobDescription(e.target.value)}
// // //           placeholder="Paste the job description here to help tailor the audit"
// // //         />

// // //         <Button onClick={handleSubmit} disabled={loading} className="mt-4">
// // //           {loading ? "Analyzing..." : "Run Audit"}
// // //         </Button>
// // //       </div>

// // //       {result && (
// // //         <div className="mt-6 border p-4 rounded-md bg-white shadow-sm whitespace-pre-wrap">
// // //           <h3 className="font-bold mb-2">🧠 AI Scorecard:</h3>
// // //           <p>{result}</p>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // "use client";

// // import { useState } from "react";
// // import { Label } from "@/components/ui/label";
// // import { Button } from "@/components/ui/button";
// // import { Textarea } from "@/components/ui/textarea";
// // import { toast } from "sonner";

// // export default function ResumeAuditPage() {
// //   const [file, setFile] = useState<File | null>(null);
// //   const [docType, setDocType] = useState<"resume" | "cover">("resume");
// //   const [jobDescription, setJobDescription] = useState("");
// //   const [result, setResult] = useState("");
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!file) return toast.error("Please upload a file");

// //     const formData = new FormData();
// //     formData.append("file", file);
// //     formData.append("type", docType);
// //     formData.append("jobDescription", jobDescription); // ✅ ADD THIS

// //     setIsSubmitting(true);
// //     setResult(""); // Clear old result

// //     try {
// //       const res = await fetch("/api/audit", {
// //         method: "POST",
// //         body: formData,
// //       });

// //       let data;
// //       try {
// //         data = await res.json();
// //       } catch {
// //         toast.error("Invalid response from server");
// //         return;
// //       }

// //       if (res.status === 403) {
// //         toast.error("🚫 Daily limit exceeded. Upgrade to Pro for unlimited audits.");
// //         return;
// //       }

// //       if (!res.ok) {
// //         toast.error(data?.error || "Something went wrong");
// //         return;
// //       }

// //       setResult(data.result);
// //       toast.success("✅ Audit completed!");
// //     } catch (err: any) {
// //       console.error("Network error:", err);
// //       toast.error("Unexpected network error. Please try again.");
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   return (
// //     <div className="max-w-2xl mx-auto px-4 py-12">
// //       <h1 className="text-3xl font-bold mb-2">📊 Resume & Cover Letter Audit</h1>
// //       <p className="text-gray-600 mb-6">
// //         Upload your document to receive an AI-generated scorecard and suggestions.
// //       </p>

// //       <form onSubmit={handleSubmit} className="space-y-6">
// //         <div>
// //           <Label>Upload File (PDF or DOCX)</Label>
// //           <input
// //             type="file"
// //             accept=".pdf,.docx"
// //             onChange={(e) => setFile(e.target.files?.[0] || null)}
// //             className="block mt-1"
// //           />
// //         </div>

// //         <div>
// //           <Label>Select Document Type</Label>
// //           <select
// //             value={docType}
// //             onChange={(e) => setDocType(e.target.value as "resume" | "cover")}
// //             className="block mt-1 p-2 border border-gray-300 rounded"
// //           >
// //             <option value="resume">Resume</option>
// //             <option value="cover">Cover Letter</option>
// //           </select>
// //         </div>

// //         <div>
// //           <Label>Optional Job Description</Label>
// //           <Textarea
// //             placeholder="Paste the job description for better tailoring..."
// //             value={jobDescription}
// //             onChange={(e) => setJobDescription(e.target.value)}
// //             rows={5}
// //           />
// //         </div>

// //         <Button type="submit" disabled={isSubmitting}>
// //           {isSubmitting ? "Auditing..." : "Run Audit"}
// //         </Button>
// //       </form>

// //       {result && (
// //         <div className="mt-8 bg-white dark:bg-black/10 border border-gray-200 dark:border-gray-800 rounded p-4">
// //           <h2 className="text-xl font-semibold mb-2">🧠 AI Scorecard:</h2>
// //           <pre className="whitespace-pre-wrap text-sm">{result}</pre>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // "use client";

// // import { useState } from "react";
// // import { Label } from "@/components/ui/label";
// // import { Button } from "@/components/ui/button";
// // import { Textarea } from "@/components/ui/textarea";
// // import { toast } from "sonner";
// // import { Info } from "lucide-react";

// // export default function ResumeAuditPage() {
// //   const [file, setFile] = useState<File | null>(null);
// //   const [docType, setDocType] = useState<"resume" | "cover">("resume");
// //   const [jobDescription, setJobDescription] = useState("");
// //   const [result, setResult] = useState("");
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!file) return toast.error("Please upload a file", { icon: "❌" });

// //     const formData = new FormData();
// //     formData.append("file", file);
// //     formData.append("type", docType);
// //     if (jobDescription.trim())
// //       formData.append("jobDescription", jobDescription);

// //     setIsSubmitting(true);
// //     setResult("");

// //     try {
// //       const res = await fetch("/api/audit", {
// //         method: "POST",
// //         body: formData,
// //       });

// //       let data;
// //       try {
// //         data = await res.json();
// //       } catch {
// //         toast.error("Invalid response from server", { icon: "❌" });
// //         return;
// //       }

// //       if (res.status === 403) {
// //         toast.error(
// //           "🚫 Daily limit exceeded. Upgrade to Pro for unlimited audits.",
// //           { icon: "⚠️" },
// //         );
// //         return;
// //       }

// //       if (!res.ok) {
// //         toast.error(data?.error || "Something went wrong", { icon: "❌" });
// //         return;
// //       }

// //       setResult(data.result);
// //       toast.success("✅ Audit completed successfully!", { icon: "✔️" });
// //     } catch (err) {
// //       console.error("Network error:", err);
// //       toast.error("Unexpected network error. Please try again.", {
// //         icon: "❌",
// //       });
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
// //       <div className="mx-auto max-w-3xl px-4 py-12">
// //         {/* Header Section */}
// //         <div className="mb-10 text-center">
// //           <h1 className="mb-2 text-4xl font-extrabold text-indigo-900 dark:text-teal-300">
// //             📊 Resume & Cover Letter Audit
// //           </h1>
// //           <p className="text-lg text-gray-600 dark:text-gray-400">
// //             Elevate your application with an AI-powered audit. Upload your PDF
// //             or DOCX to receive a detailed scorecard, personalized suggestions,
// //             and industry benchmarks.
// //           </p>
// //           <span
// //             className="mt-2 inline-flex cursor-pointer items-center text-sm text-teal-600 hover:underline dark:text-teal-400"
// //             title="Learn how our AI analyzes formatting, keywords, tone, and more to optimize your document for success."
// //           >
// //             <Info className="mr-1 h-4 w-4" /> Learn More
// //           </span>
// //         </div>

// //         {/* Form Section */}
// //         <form
// //           onSubmit={handleSubmit}
// //           className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800"
// //         >
// //           <div>
// //             <Label
// //               htmlFor="file-upload"
// //               className="text-sm font-medium text-gray-700 dark:text-gray-300"
// //             >
// //               Upload File (PDF or DOCX)
// //             </Label>
// //             <input
// //               id="file-upload"
// //               type="file"
// //               accept=".pdf,.docx"
// //               onChange={(e) => setFile(e.target.files?.[0] || null)}
// //               className="mt-2 w-full rounded-md border border-gray-300 p-2 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 dark:border-gray-600"
// //             />
// //             <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
// //               Drag and drop or click to upload.
// //             </p>
// //           </div>

// //           <div>
// //             <Label
// //               htmlFor="doc-type"
// //               className="text-sm font-medium text-gray-700 dark:text-gray-300"
// //             >
// //               Select Document Type
// //             </Label>
// //             <select
// //               id="doc-type"
// //               value={docType}
// //               onChange={(e) => setDocType(e.target.value as "resume" | "cover")}
// //               className="mt-2 w-full rounded-md border border-gray-300 p-2 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 dark:border-gray-600"
// //             >
// //               <option value="resume">Resume</option>
// //               <option value="cover">Cover Letter</option>
// //             </select>
// //           </div>

// //           <div>
// //             <Label
// //               htmlFor="job-desc"
// //               className="text-sm font-medium text-gray-700 dark:text-gray-300"
// //             >
// //               Job Description
// //             </Label>
// //             <Textarea
// //               id="job-desc"
// //               placeholder="Paste the job description for tailored insights..."
// //               value={jobDescription}
// //               onChange={(e) => setJobDescription(e.target.value)}
// //               rows={5}
// //               className="mt-2 w-full rounded-md border border-gray-300 p-2 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 dark:border-gray-600"
// //             />
// //             <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
// //               Enhance accuracy by adding the job posting text.
// //             </p>
// //           </div>

// //           <Button
// //             type="submit"
// //             disabled={isSubmitting}
// //             className="w-full rounded-md bg-teal-600 py-2 font-semibold text-white transition-colors hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-gray-400 dark:bg-teal-500 dark:hover:bg-teal-600"
// //           >
// //             {isSubmitting ? (
// //               <span className="flex items-center justify-center">
// //                 <svg
// //                   className="mr-2 h-5 w-5 animate-spin text-white"
// //                   xmlns="http://www.w3.org/2000/svg"
// //                   fill="none"
// //                   viewBox="0 0 24 24"
// //                 >
// //                   <circle
// //                     className="opacity-25"
// //                     cx="12"
// //                     cy="12"
// //                     r="10"
// //                     stroke="currentColor"
// //                     strokeWidth="4"
// //                   ></circle>
// //                   <path
// //                     className="opacity-75"
// //                     fill="currentColor"
// //                     d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
// //                   ></path>
// //                 </svg>
// //                 Auditing...
// //               </span>
// //             ) : (
// //               "Run Audit"
// //             )}
// //           </Button>
// //         </form>

// //         {/* Result Section */}
// //         {result && (
// //           <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
// //             <div className="mb-4 flex items-center justify-between">
// //               <h2 className="text-xl font-semibold text-indigo-900 dark:text-teal-300">
// //                 🧠 AI Scorecard
// //               </h2>
// //               <Button
// //                 variant="outline"
// //                 size="sm"
// //                 onClick={() => {
// //                   navigator.clipboard.writeText(result);
// //                   toast.success("Copied to clipboard!", { icon: "📋" });
// //                 }}
// //                 className="border-teal-600 text-teal-600 hover:bg-teal-100 dark:border-teal-400 dark:text-teal-400 dark:hover:bg-teal-900"
// //               >
// //                 Copy
// //               </Button>
// //             </div>
// //             <pre className="overflow-x-auto whitespace-pre-wrap rounded-md bg-gray-50 p-4 text-sm text-gray-800 dark:bg-gray-900 dark:text-gray-200">
// //               {result}
// //             </pre>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

//   import { useState, useMemo } from "react";
//   import { Label } from "@/components/ui/label";
//   import { Button } from "@/components/ui/button";
//   import { Textarea } from "@/components/ui/textarea";
//   import { toast } from "sonner";
//   import { Info, Upload } from "lucide-react";
//   import { motion, AnimatePresence } from "framer-motion";
//   import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
//   import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
//   import ReactMarkdown from "react-markdown";
//   import { Progress } from "@/components/ui/progress";

//   export default function ResumeAuditPage() {
//     const [file, setFile] = useState<File | null>(null);
//     const [docType, setDocType] = useState<"resume" | "cover">("resume");
//     const [jobDescription, setJobDescription] = useState("");
//     const [result, setResult] = useState("");
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [expandedSections, setExpandedSections] = useState({
//       strengths: false,
//       weaknesses: false,
//       suggestions: false,
//       keywordGap: false,
//       atsTips: false,
//     });

//     const handleSubmit = async (e: React.FormEvent) => {
//       e.preventDefault();
//       if (!file) return toast.error("Please upload a file", { icon: "❌" });

//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("type", docType);
//       if (jobDescription.trim()) formData.append("jobDescription", jobDescription);

//       setIsSubmitting(true);
//       setResult("");

//       try {
//         const res = await fetch("/api/audit", {
//           method: "POST",
//           body: formData,
//         });

//         let data;
//         try {
//           data = await res.json();
//         } catch {
//           toast.error("Invalid response from server", { icon: "❌" });
//           return;
//         }

//         if (res.status === 403) {
//           toast.error("🚫 Daily limit exceeded. Upgrade to Pro for unlimited audits.", { icon: "⚠️" });
//           return;
//         }

//         if (!res.ok) {
//           toast.error(data?.error || "Something went wrong", { icon: "❌" });
//           return;
//         }

//         setResult(data.result);
//         toast.success("✅ Audit completed successfully!", { icon: "✔️" });
//       } catch (err) {
//         console.error("Network error:", err);
//         toast.error("Unexpected network error. Please try again.", { icon: "❌" });
//       } finally {
//         setIsSubmitting(false);
//       }
//     };

//     // Parse audit result for visualization and suggestions
//     const parseAuditResult = useMemo(() => {
//       if (!result) return null;

//       const metrics = [
//         "Formatting", "Keywords", "Grammar", "Length", "Visual Hierarchy",
//         "Tone", "Action Language", "ATS Compatibility", "Personalisation",
//         "Impact Quantification", "Skill Alignment", "Redundancy", "Readability"
//       ];

//       const scores = metrics.reduce((acc, metric) => {
//         const regex = new RegExp(`${metric}:\\s*(\\d+)/10`);
//         const match = result.match(regex);
//         acc[metric] = match ? parseInt(match[1]) : 0;
//         return acc;
//       }, {} as Record<string, number>);

//       const overallMatch = result.match(/Overall Score:\s*(\d+)/);
//       const percentileMatch = result.match(/Percentile:\s*Top\s*(\d+)%/);

//       // Extract sections for rendering
//       const strengthsMatch = result.match(/Strengths:\n([\s\S]*?)(?=\n\nWeaknesses:)/);
//       const weaknessesMatch = result.match(/Weaknesses:\n([\s\S]*?)(?=\n\nSuggestions:)/);
//       const suggestionsMatch = result.match(/Suggestions:\n([\s\S]*?)(?=\n\n(?:Keyword Gap Analysis:|$))/);
//       const keywordGapMatch = result.match(/Keyword Gap Analysis:\n([\s\S]*?)(?=\n\nATS Tips:|$)/);
//       const atsTipsMatch = result.match(/ATS Tips:\n([\s\S]*?)$/);

//       // Extract low-scoring areas for improvement suggestions
//       const lowScoringAreas = Object.entries(scores)
//         .filter(([_, score]) => score <= 5) // Areas with score <= 5
//         .map(([metric, score]) => ({ metric, score }));

//       return {
//         scores,
//         overallScore: overallMatch ? parseInt(overallMatch[1]) : 0,
//         percentile: percentileMatch ? parseInt(percentileMatch[1]) : 0,
//         strengths: strengthsMatch ? strengthsMatch[1] : "",
//         weaknesses: weaknessesMatch ? weaknessesMatch[1] : "",
//         suggestions: suggestionsMatch ? suggestionsMatch[1] : "",
//         keywordGap: keywordGapMatch ? keywordGapMatch[1] : "",
//         atsTips: atsTipsMatch ? atsTipsMatch[1] : "",
//         lowScoringAreas,
//       };
//     }, [result]);

//     const radarData = parseAuditResult
//       ? [
//           { subject: "Formatting", A: parseAuditResult.scores["Formatting"] * 10 },
//           { subject: "Keywords", A: parseAuditResult.scores["Keywords"] * 10 },
//           { subject: "Grammar", A: parseAuditResult.scores["Grammar"] * 10 },
//           { subject: "Length", A: parseAuditResult.scores["Length"] * 10 },
//           { subject: "Hierarchy", A: parseAuditResult.scores["Visual Hierarchy"] * 10 },
//           { subject: "Tone", A: parseAuditResult.scores["Tone"] * 10 },
//           { subject: "Action", A: parseAuditResult.scores["Action Language"] * 10 },
//           { subject: "ATS", A: parseAuditResult.scores["ATS Compatibility"] * 10 },
//           { subject: "Personalisation", A: parseAuditResult.scores["Personalisation"] * 10 },
//           { subject: "Impact", A: parseAuditResult.scores["Impact Quantification"] * 10 },
//           { subject: "Skills", A: parseAuditResult.scores["Skill Alignment"] * 10 },
//           { subject: "Redundancy", A: parseAuditResult.scores["Redundancy"] * 10 },
//           { subject: "Readability", A: parseAuditResult.scores["Readability"] * 10 },
//         ]
//       : [];

//     const barData = parseAuditResult
//       ? [
//           { name: "Your Score", score: parseAuditResult.overallScore, fill: "#8884d8" },
//           { name: "Industry Avg", score: 75, fill: "#82ca9d" }, // Placeholder average
//         ]
//       : [];

//     const toggleSection = (section: keyof typeof expandedSections) => {
//       setExpandedSections((prev) => ({
//         ...prev,
//         [section]: !prev[section],
//       }));
//     };

//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//         className="min-h-screen bg-gradient-to-br from-indigo-50 via-gray-50 to-teal-50 dark:from-indigo-900 dark:via-gray-900 dark:to-teal-900 text-gray-900 dark:text-gray-100"
//       >
//         <div className="mx-auto max-w-4xl px-6 py-16">
//           {/* Header Section */}
//           <motion.div
//             initial={{ y: -30, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="mb-12 text-center"
//           >
//             <h1 className="mb-3 text-5xl font-extrabold text-indigo-900 dark:text-teal-300 flex items-center justify-center gap-3">
//               <motion.span
//                 animate={{ rotate: [0, 10, -10, 0] }}
//                 transition={{ repeat: Infinity, duration: 2 }}
//               >
//                 📊
//               </motion.span>
//               Resume & Cover Letter Audit
//             </h1>
//             <p className="text-xl text-gray-600 dark:text-gray-400">
//               Elevate your application with an AI-powered audit. Upload your PDF or DOCX to receive a detailed scorecard, personalized suggestions, and industry benchmarks.
//             </p>
//             <span
//               className="mt-3 inline-flex cursor-pointer items-center text-sm text-teal-600 hover:underline dark:text-teal-400"
//               title="Learn how our AI analyzes formatting, keywords, tone, and more to optimize your document for success."
//             >
//               <Info className="mr-1 h-4 w-4" /> Learn More
//             </span>
//           </motion.div>

//           {/* Form Section */}
//           <motion.form
//             onSubmit={handleSubmit}
//             initial={{ scale: 0.95, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//             className="space-y-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-xl dark:border-gray-700 dark:bg-gray-800"
//           >
//             <motion.div
//               whileHover={{ scale: 1.02 }}
//               transition={{ duration: 0.3 }}
//             >
//               <Label
//                 htmlFor="file-upload"
//                 className="text-sm font-medium text-gray-700 dark:text-gray-300"
//               >
//                 Upload File (PDF or DOCX)
//               </Label>
//               <div
//                 className="mt-2 w-full rounded-lg border border-dashed border-gray-300 p-6 text-center hover:border-teal-500 transition-all duration-300"
//                 onDragOver={(e) => e.preventDefault()}
//                 onDrop={(e) => {
//                   e.preventDefault();
//                   const droppedFile = e.dataTransfer.files?.[0];
//                   if (droppedFile && (droppedFile.type === "application/pdf" || droppedFile.name.endsWith(".docx"))) {
//                     setFile(droppedFile);
//                     toast.success("File uploaded successfully!", { icon: "✔️" });
//                   } else {
//                     toast.error("Please upload a PDF or DOCX file.", { icon: "❌" });
//                   }
//                 }}
//               >
//                 <input
//                   id="file-upload"
//                   type="file"
//                   accept=".pdf,.docx"
//                   onChange={(e) => setFile(e.target.files?.[0] || null)}
//                   className="hidden"
//                 />
//                 <label htmlFor="file-upload" className="cursor-pointer">
//                   <motion.div
//                     whileHover={{ y: -5 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <Upload className="mx-auto h-10 w-10 text-gray-400" />
//                   </motion.div>
//                   <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
//                     {file ? file.name : "Drag and drop or click to upload"}
//                   </p>
//                 </label>
//               </div>
//               <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
//                 Supports PDF and DOCX files up to 5MB.
//               </p>
//             </motion.div>

//             <motion.div
//               whileHover={{ scale: 1.02 }}
//               transition={{ duration: 0.3 }}
//             >
//               <Label
//                 htmlFor="doc-type"
//                 className="text-sm font-medium text-gray-700 dark:text-gray-300"
//               >
//                 Select Document Type
//               </Label>
//               <select
//                 id="doc-type"
//                 value={docType}
//                 onChange={(e) => setDocType(e.target.value as "resume" | "cover")}
//                 className="mt-2 w-full rounded-lg border border-gray-300 p-3 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700 transition-all duration-300"
//               >
//                 <option value="resume">Resume</option>
//                 <option value="cover">Cover Letter</option>
//               </select>
//             </motion.div>

//             <motion.div
//               whileHover={{ scale: 1.02 }}
//               transition={{ duration: 0.3 }}
//             >
//               <Label
//                 htmlFor="job-desc"
//                 className="text-sm font-medium text-gray-700 dark:text-gray-300"
//               >
//                 Job Description
//               </Label>
//               <Textarea
//                 id="job-desc"
//                 placeholder="Paste the job description for tailored insights..."
//                 value={jobDescription}
//                 onChange={(e) => setJobDescription(e.target.value)}
//                 rows={6}
//                 className="mt-2 w-full rounded-lg border border-gray-300 p-3 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700 transition-all duration-300"
//               />
//               <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
//                 Enhance accuracy by adding the job posting text (optional).
//               </p>
//             </motion.div>

//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               transition={{ duration: 0.3 }}
//             >
//               <Button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full rounded-lg bg-gradient-to-r from-teal-600 to-indigo-600 py-3 font-semibold text-white hover:from-teal-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-400 dark:from-teal-500 dark:to-indigo-500 dark:hover:from-teal-600 dark:hover:to-indigo-600 transition-all duration-300"
//               >
//                 {isSubmitting ? (
//                   <span className="flex items-center justify-center">
//                     <svg
//                       className="mr-2 h-5 w-5 animate-spin text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       />
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//                       />
//                     </svg>
//                     Auditing...
//                   </span>
//                 ) : (
//                   "Run Audit"
//                 )}
//               </Button>
//             </motion.div>
//           </motion.form>

//           {/* Result Section */}
//           {result && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="mt-10 rounded-2xl border border-gray-200 bg-white p-8 shadow-xl dark:border-gray-700 dark:bg-gray-800"
//             >
//               <div className="mb-6 flex items-center justify-between">
//                 <h2 className="text-2xl font-semibold text-indigo-900 dark:text-teal-300">
//                   🧠 AI Scorecard
//                 </h2>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => {
//                     navigator.clipboard.writeText(result);
//                     toast.success("Copied to clipboard!", { icon: "📋" });
//                   }}
//                   className="border-teal-600 text-teal-600 hover:bg-teal-100 dark:border-teal-400 dark:text-teal-400 dark:hover:bg-teal-900 transition-all duration-300"
//                 >
//                   Copy
//                 </Button>
//               </div>

//               {/* Overall Score with Animated Progress Bar */}
//               {parseAuditResult && (
//                 <motion.div
//                   initial={{ width: 0 }}
//                   animate={{ width: "100%" }}
//                   transition={{ duration: 1, ease: "easeOut" }}
//                   className="mb-6"
//                 >
//                   <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
//                     Overall Score: {parseAuditResult.overallScore}/100
//                   </h3>
//                   <Progress
//                     value={parseAuditResult.overallScore}
//                     className="mt-2 h-3 rounded-full bg-gray-200 dark:bg-gray-700"
//                   />
//                   <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
//                     Percentile: Top {parseAuditResult.percentile}% for your industry
//                   </p>
//                 </motion.div>
//               )}

//               {/* Render Parsed AI Response with Markdown and Interactivity */}
//               {parseAuditResult && (
//                 <div className="space-y-6">
//                   {/* Metrics Scores */}
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
//                       Score Breakdown
//                     </h3>
//                     <div className="grid grid-cols-2 gap-4">
//                       {Object.entries(parseAuditResult.scores).map(([metric, score]) => (
//                         <div key={metric} className="flex justify-between items-center p-2 rounded-lg bg-gray-50 dark:bg-gray-900">
//                           <span className="text-sm text-gray-700 dark:text-gray-300">{metric}</span>
//                           <span className="text-sm font-semibold text-teal-600 dark:text-teal-400">
//                             {score}/10
//                           </span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Strengths */}
//                   <div>
//                     <button
//                       onClick={() => toggleSection("strengths")}
//                       className="w-full flex justify-between items-center p-3 rounded-lg bg-teal-50 dark:bg-teal-900 text-left text-lg font-semibold text-teal-800 dark:text-teal-300"
//                     >
//                       Strengths
//                       <motion.span
//                         animate={{ rotate: expandedSections.strengths ? 180 : 0 }}
//                         transition={{ duration: 0.3 }}
//                       >
//                         ▼
//                       </motion.span>
//                     </button>
//                     <AnimatePresence>
//                       {expandedSections.strengths && (
//                         <motion.div
//                           initial={{ height: 0, opacity: 0 }}
//                           animate={{ height: "auto", opacity: 1 }}
//                           exit={{ height: 0, opacity: 0 }}
//                           transition={{ duration: 0.3 }}
//                           className="mt-2 p-4 rounded-lg bg-gray-50 dark:bg-gray-900"
//                         >
//                           <ReactMarkdown className="prose prose-sm dark:prose-invert">
//                             {parseAuditResult.strengths}
//                           </ReactMarkdown>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </div>

//                   {/* Weaknesses */}
//                   <div>
//                     <button
//                       onClick={() => toggleSection("weaknesses")}
//                       className="w-full flex justify-between items-center p-3 rounded-lg bg-red-50 dark:bg-red-900 text-left text-lg font-semibold text-red-800 dark:text-red-300"
//                     >
//                       Weaknesses
//                       <motion.span
//                         animate={{ rotate: expandedSections.weaknesses ? 180 : 0 }}
//                         transition={{ duration: 0.3 }}
//                       >
//                         ▼
//                       </motion.span>
//                     </button>
//                     <AnimatePresence>
//                       {expandedSections.weaknesses && (
//                         <motion.div
//                           initial={{ height: 0, opacity: 0 }}
//                           animate={{ height: "auto", opacity: 1 }}
//                           exit={{ height: 0, opacity: 0 }}
//                           transition={{ duration: 0.3 }}
//                           className="mt-2 p-4 rounded-lg bg-gray-50 dark:bg-gray-900"
//                         >
//                           <ReactMarkdown className="prose prose-sm dark:prose-invert">
//                             {parseAuditResult.weaknesses}
//                           </ReactMarkdown>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </div>

//                   {/* Suggestions */}
//                   <div>
//                     <button
//                       onClick={() => toggleSection("suggestions")}
//                       className="w-full flex justify-between items-center p-3 rounded-lg bg-indigo-50 dark:bg-indigo-900 text-left text-lg font-semibold text-indigo-800 dark:text-indigo-300"
//                     >
//                       Suggestions for Improvement
//                       <motion.span
//                         animate={{ rotate: expandedSections.suggestions ? 180 : 0 }}
//                         transition={{ duration: 0.3 }}
//                       >
//                         ▼
//                       </motion.span>
//                     </button>
//                     <AnimatePresence>
//                       {expandedSections.suggestions && (
//                         <motion.div
//                           initial={{ height: 0, opacity: 0 }}
//                           animate={{ height: "auto", opacity: 1 }}
//                           exit={{ height: 0, opacity: 0 }}
//                           transition={{ duration: 0.3 }}
//                           className="mt-2 p-4 rounded-lg bg-gray-50 dark:bg-gray-900"
//                         >
//                           <ReactMarkdown className="prose prose-sm dark:prose-invert">
//                             {parseAuditResult.suggestions}
//                           </ReactMarkdown>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </div>

//                   {/* Keyword Gap Analysis (if present) */}
//                   {parseAuditResult.keywordGap && (
//                     <div>
//                       <button
//                         onClick={() => toggleSection("keywordGap")}
//                         className="w-full flex justify-between items-center p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900 text-left text-lg font-semibold text-yellow-800 dark:text-yellow-300"
//                       >
//                         Keyword Gap Analysis
//                         <motion.span
//                           animate={{ rotate: expandedSections.keywordGap ? 180 : 0 }}
//                           transition={{ duration: 0.3 }}
//                         >
//                           ▼
//                         </motion.span>
//                       </button>
//                       <AnimatePresence>
//                         {expandedSections.keywordGap && (
//                           <motion.div
//                             initial={{ height: 0, opacity: 0 }}
//                             animate={{ height: "auto", opacity: 1 }}
//                             exit={{ height: 0, opacity: 0 }}
//                             transition={{ duration: 0.3 }}
//                             className="mt-2 p-4 rounded-lg bg-gray-50 dark:bg-gray-900"
//                           >
//                             <ReactMarkdown className="prose prose-sm dark:prose-invert">
//                               {parseAuditResult.keywordGap}
//                             </ReactMarkdown>
//                           </motion.div>
//                         )}
//                       </AnimatePresence>
//                     </div>
//                   )}

//                   {/* ATS Tips */}
//                   {parseAuditResult.atsTips && (
//                     <div>
//                       <button
//                         onClick={() => toggleSection("atsTips")}
//                         className="w-full flex justify-between items-center p-3 rounded-lg bg-purple-50 dark:bg-purple-900 text-left text-lg font-semibold text-purple-800 dark:text-purple-300"
//                       >
//                         ATS Tips
//                         <motion.span
//                           animate={{ rotate: expandedSections.atsTips ? 180 : 0 }}
//                           transition={{ duration: 0.3 }}
//                         >
//                           ▼
//                         </motion.span>
//                       </button>
//                       <AnimatePresence>
//                         {expandedSections.atsTips && (
//                           <motion.div
//                             initial={{ height: 0, opacity: 0 }}
//                             animate={{ height: "auto", opacity: 1 }}
//                             exit={{ height: 0, opacity: 0 }}
//                             transition={{ duration: 0.3 }}
//                             className="mt-2 p-4 rounded-lg bg-gray-50 dark:bg-gray-900"
//                           >
//                             <ReactMarkdown className="prose prose-sm dark:prose-invert">
//                               {parseAuditResult.atsTips}
//                             </ReactMarkdown>
//                           </motion.div>
//                         )}
//                       </AnimatePresence>
//                     </div>
//                   )}

//                   {/* Improvement Suggestions Based on Low Scores */}
//                   {parseAuditResult.lowScoringAreas.length > 0 && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.6, delay: 0.4 }}
//                       className="mt-8 p-6 rounded-lg bg-teal-50 dark:bg-teal-900"
//                     >
//                       <h3 className="text-lg font-semibold text-teal-800 dark:text-teal-300 mb-4">
//                         🔍 Key Areas to Improve
//                       </h3>
//                       <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
//                         Based on your audit, here are the areas where your {docType} scored 5 or below, along with tailored suggestions to improve:
//                       </p>
//                       <ul className="space-y-3">
//                         {parseAuditResult.lowScoringAreas.map(({ metric, score }) => (
//                           <li key={metric} className="p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
//                             <div className="flex justify-between items-center">
//                               <span className="font-medium text-gray-700 dark:text-gray-300">{metric}</span>
//                               <span className="text-sm font-semibold text-red-600 dark:text-red-400">
//                                 {score}/10
//                               </span>
//                             </div>
//                             <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
//                               {metric === "Formatting" && "Consider standardizing your layout with consistent fonts and spacing."}
//                               {metric === "Keywords" && "Add more job-specific keywords to align with the role you're applying for."}
//                               {metric === "Grammar" && "Run a grammar check to correct spelling and punctuation errors."}
//                               {metric === "Length" && `Ensure your ${docType} is the appropriate length (resume: 1-2 pages, cover letter: 3-4 paragraphs).`}
//                               {metric === "Visual Hierarchy" && "Improve readability with better spacing and section headings."}
//                               {metric === "Tone" && "Adopt a more confident and formal tone suitable for the role."}
//                               {metric === "Action Language" && "Use more active verbs and quantify your achievements (e.g., 'increased sales by 20%')."}
//                               {metric === "ATS Compatibility" && "Avoid tables or complex formatting that might confuse Applicant Tracking Systems."}
//                               {metric === "Personalisation" && "Highlight your unique value proposition to stand out."}
//                               {metric === "Impact Quantification" && "Include measurable results to demonstrate your impact (e.g., 'reduced costs by 15%')."}
//                               {metric === "Skill Alignment" && "Align your listed skills more closely with the job requirements."}
//                               {metric === "Redundancy" && "Remove repetitive phrases and overused buzzwords."}
//                               {metric === "Readability" && "Simplify long sentences and avoid jargon to improve clarity."}
//                             </p>
//                           </li>
//                         ))}
//                       </ul>
//                     </motion.div>
//                   )}

//                   {/* Charts (Moved to End) */}
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6, delay: 0.6 }}
//                     className="mt-10 space-y-8"
//                   >
//                     {/* Radar Chart */}
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
//                         📊 Score Breakdown (Radar View)
//                       </h3>
//                       <ResponsiveContainer width="100%" height={400}>
//                         <RadarChart data={radarData}>
//                           <PolarGrid />
//                           <PolarAngleAxis dataKey="subject" />
//                           <PolarRadiusAxis angle={30} domain={[0, 100]} />
//                           <Tooltip />
//                           <Radar
//                             name="Score"
//                             dataKey="A"
//                             stroke="#8884d8"
//                             fill="#8884d8"
//                             fillOpacity={0.6}
//                           />
//                         </RadarChart>
//                       </ResponsiveContainer>
//                     </div>

//                     {/* Bar Chart */}
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
//                         📈 Industry Benchmark
//                       </h3>
//                       <ResponsiveContainer width="100%" height={300}>
//                         <BarChart data={barData}>
//                           <CartesianGrid strokeDasharray="3 3" />
//                           <XAxis dataKey="name" />
//                           <YAxis domain={[0, 100]} />
//                           <Tooltip />
//                           <Legend />
//                           <Bar dataKey="score" />
//                         </BarChart>
//                       </ResponsiveContainer>
//                       <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
//                         Your overall score compared to the industry average.
//                       </p>
//                     </div>
//                   </motion.div>
//                 </div>
//               )}
//             </motion.div>
//           )}
//         </div>
//       </motion.div>
//     );
//   }

"use client";

import { useState, useMemo } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Info, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import ReactMarkdown from "react-markdown";

export default function ResumeAuditPage() {
  const [file, setFile] = useState<File | null>(null);
  const [docType, setDocType] = useState<"resume" | "cover">("resume");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    strengths: false,
    weaknesses: false,
    suggestions: false,
    keywordGap: false,
    atsTips: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return toast.error("Please upload a file", { icon: "❌" });

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", docType);
    if (jobDescription.trim())
      formData.append("jobDescription", jobDescription);

    setIsSubmitting(true);
    setResult("");

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        body: formData,
      });

      let data;
      try {
        data = await res.json();
      } catch {
        toast.error("Invalid response from server", { icon: "❌" });
        return;
      }

      if (res.status === 403) {
        toast.error(
          "🚫 Daily limit exceeded. Upgrade to Pro for unlimited audits.",
          { icon: "⚠️" },
        );
        return;
      }

      if (!res.ok) {
        toast.error(data?.error || "Something went wrong", { icon: "❌" });
        return;
      }

      setResult(data.result);
      toast.success("✅ Audit completed successfully!", { icon: "✔️" });
    } catch (err) {
      console.error("Network error:", err);
      toast.error("Unexpected network error. Please try again.", {
        icon: "❌",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Parse audit result for visualization and suggestions
  const parseAuditResult = useMemo(() => {
    if (!result) return null;

    const metrics = [
      "Formatting",
      "Keywords",
      "Grammar",
      "Length",
      "Visual Hierarchy",
      "Tone",
      "Action Language",
      "ATS Compatibility",
      "Personalisation",
      "Impact Quantification",
      "Skill Alignment",
      "Redundancy",
      "Readability",
    ];

    const scores = metrics.reduce(
      (acc, metric) => {
        const regex = new RegExp(`${metric}:\\s*(\\d+)/10`);
        const match = result.match(regex);
        acc[metric] = match ? parseInt(match[1]) : 0;
        return acc;
      },
      {} as Record<string, number>,
    );

    const overallMatch = result.match(/Overall Score:\s*(\d+)/);
    const percentileMatch = result.match(/Percentile:\s*Top\s*(\d+)%/);

    // Extract sections for rendering
    const strengthsMatch = result.match(
      /Strengths:\n([\s\S]*?)(?=\n\nWeaknesses:)/,
    );
    const weaknessesMatch = result.match(
      /Weaknesses:\n([\s\S]*?)(?=\n\nSuggestions:)/,
    );
    const suggestionsMatch = result.match(
      /Suggestions:\n([\s\S]*?)(?=\n\n(?:Keyword Gap Analysis:|$))/,
    );
    const keywordGapMatch = result.match(
      /Keyword Gap Analysis:\n([\s\S]*?)(?=\n\nATS Tips:|$)/,
    );
    const atsTipsMatch = result.match(/ATS Tips:\n([\s\S]*?)$/);

    // Extract low-scoring areas for improvement suggestions
    const lowScoringAreas = Object.entries(scores)
      .filter(([, score]) => score <= 5) // Areas with score <= 5
      .map(([metric, score]) => ({ metric, score }));

    return {
      scores,
      overallScore: overallMatch ? parseInt(overallMatch[1]) : 0,
      percentile: percentileMatch ? parseInt(percentileMatch[1]) : 0,
      strengths: strengthsMatch ? strengthsMatch[1] : "",
      weaknesses: weaknessesMatch ? weaknessesMatch[1] : "",
      suggestions: suggestionsMatch ? suggestionsMatch[1] : "",
      keywordGap: keywordGapMatch ? keywordGapMatch[1] : "",
      atsTips: atsTipsMatch ? atsTipsMatch[1] : "",
      lowScoringAreas,
    };
  }, [result]);

  const radarData = parseAuditResult
    ? [
        {
          subject: "Formatting",
          A: parseAuditResult.scores["Formatting"] * 10,
        },
        { subject: "Keywords", A: parseAuditResult.scores["Keywords"] * 10 },
        { subject: "Grammar", A: parseAuditResult.scores["Grammar"] * 10 },
        { subject: "Length", A: parseAuditResult.scores["Length"] * 10 },
        {
          subject: "Hierarchy",
          A: parseAuditResult.scores["Visual Hierarchy"] * 10,
        },
        { subject: "Tone", A: parseAuditResult.scores["Tone"] * 10 },
        {
          subject: "Action",
          A: parseAuditResult.scores["Action Language"] * 10,
        },
        {
          subject: "ATS",
          A: parseAuditResult.scores["ATS Compatibility"] * 10,
        },
        {
          subject: "Personalisation",
          A: parseAuditResult.scores["Personalisation"] * 10,
        },
        {
          subject: "Impact",
          A: parseAuditResult.scores["Impact Quantification"] * 10,
        },
        {
          subject: "Skills",
          A: parseAuditResult.scores["Skill Alignment"] * 10,
        },
        {
          subject: "Redundancy",
          A: parseAuditResult.scores["Redundancy"] * 10,
        },
        {
          subject: "Readability",
          A: parseAuditResult.scores["Readability"] * 10,
        },
      ]
    : [];

  const barData = parseAuditResult
    ? [
        {
          name: "Your Score",
          score: parseAuditResult.overallScore,
          fill: "#8884d8",
        },
        { name: "Industry Avg", score: 75, fill: "#82ca9d" }, // Placeholder average
      ]
    : [];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen bg-gradient-to-br from-indigo-50 via-gray-50 to-teal-50 text-gray-900 dark:from-indigo-900 dark:via-gray-900 dark:to-teal-900 dark:text-gray-100"
    >
      <div className="mx-auto max-w-4xl px-6 py-16">
        {/* Header Section */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-3 flex items-center justify-center gap-3 text-5xl font-extrabold text-indigo-900 dark:text-teal-300">
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              📊
            </motion.span>
            Resume & Cover Letter Audit
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Elevate your application with an AI-powered audit. Upload your PDF
            or DOCX to receive a detailed scorecard, personalized suggestions,
            and industry benchmarks.
          </p>
          <span
            className="mt-3 inline-flex cursor-pointer items-center text-sm text-teal-600 hover:underline dark:text-teal-400"
            title="Learn how our AI analyzes formatting, keywords, tone, and more to optimize your document for success."
          >
            <Info className="mr-1 h-4 w-4" /> Learn More
          </span>
        </motion.div>

        {/* Form Section */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-xl dark:border-gray-700 dark:bg-gray-800"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Label
              htmlFor="file-upload"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Upload File (PDF or DOCX)
            </Label>
            <div
              className="mt-2 w-full rounded-lg border border-dashed border-gray-300 p-6 text-center transition-all duration-300 hover:border-teal-500"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const droppedFile = e.dataTransfer.files?.[0];
                if (
                  droppedFile &&
                  (droppedFile.type === "application/pdf" ||
                    droppedFile.name.endsWith(".docx"))
                ) {
                  setFile(droppedFile);
                  toast.success("File uploaded successfully!", { icon: "✔️" });
                } else {
                  toast.error("Please upload a PDF or DOCX file.", {
                    icon: "❌",
                  });
                }
              }}
            >
              <input
                id="file-upload"
                type="file"
                accept=".pdf,.docx"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Upload className="mx-auto h-10 w-10 text-gray-400" />
                </motion.div>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  {file ? file.name : "Drag and drop or click to upload"}
                </p>
              </label>
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Supports PDF and DOCX files up to 5MB.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Label
              htmlFor="doc-type"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Select Document Type
            </Label>
            <select
              id="doc-type"
              value={docType}
              onChange={(e) => setDocType(e.target.value as "resume" | "cover")}
              className="mt-2 w-full rounded-lg border border-gray-300 p-3 transition-all duration-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700"
            >
              <option value="resume">Resume</option>
              <option value="cover">Cover Letter</option>
            </select>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Label
              htmlFor="job-desc"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Job Description
            </Label>
            <Textarea
              id="job-desc"
              placeholder="Paste the job description for tailored insights..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={6}
              className="mt-2 w-full rounded-lg border border-gray-300 p-3 transition-all duration-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Enhance accuracy by adding the job posting text (optional).
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-gradient-to-r from-teal-600 to-indigo-600 py-3 font-semibold text-white transition-all duration-300 hover:from-teal-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-400 dark:from-teal-500 dark:to-indigo-500 dark:hover:from-teal-600 dark:hover:to-indigo-600"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="mr-2 h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Auditing...
                </span>
              ) : (
                "Run Audit"
              )}
            </Button>
          </motion.div>
        </motion.form>

        {/* Result Section */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 rounded-2xl border border-gray-200 bg-white p-8 shadow-xl dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-indigo-900 dark:text-teal-300">
                🧠 AI Scorecard
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(result);
                  toast.success("Copied to clipboard!", { icon: "📋" });
                }}
                className="border-teal-600 text-teal-600 transition-all duration-300 hover:bg-teal-100 dark:border-teal-400 dark:text-teal-400 dark:hover:bg-teal-900"
              >
                Copy
              </Button>
            </div>

            {/* Overall Score with Custom Progress Bar */}
            {parseAuditResult && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="mb-6"
              >
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                  Overall Score: {parseAuditResult.overallScore}/100
                </h3>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${parseAuditResult.overallScore}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-teal-600 dark:bg-teal-500"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Percentile: Top {parseAuditResult.percentile}% for your
                  industry
                </p>
              </motion.div>
            )}

            {/* Render Parsed AI Response with Markdown and Interactivity */}
            {parseAuditResult && (
              <div className="space-y-6">
                {/* Metrics Scores */}
                <div>
                  <h3 className="mb-3 text-lg font-semibold text-gray-700 dark:text-gray-300">
                    Score Breakdown
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(parseAuditResult.scores).map(
                      ([metric, score]) => (
                        <div
                          key={metric}
                          className="flex items-center justify-between rounded-lg bg-gray-50 p-2 dark:bg-gray-900"
                        >
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {metric}
                          </span>
                          <span className="text-sm font-semibold text-teal-600 dark:text-teal-400">
                            {score}/10
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {/* Strengths */}
                <div>
                  <button
                    onClick={() => toggleSection("strengths")}
                    className="flex w-full items-center justify-between rounded-lg bg-teal-50 p-3 text-left text-lg font-semibold text-teal-800 dark:bg-teal-900 dark:text-teal-300"
                  >
                    Strengths
                    <motion.span
                      animate={{ rotate: expandedSections.strengths ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      ▼
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {expandedSections.strengths && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2 rounded-lg bg-gray-50 p-4 dark:bg-gray-900"
                      >
                        <div className="prose prose-sm dark:prose-invert">
                          <ReactMarkdown>
                            {parseAuditResult.strengths}
                          </ReactMarkdown>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Weaknesses */}
                <div>
                  <button
                    onClick={() => toggleSection("weaknesses")}
                    className="flex w-full items-center justify-between rounded-lg bg-red-50 p-3 text-left text-lg font-semibold text-red-800 dark:bg-red-900 dark:text-red-300"
                  >
                    Weaknesses
                    <motion.span
                      animate={{
                        rotate: expandedSections.weaknesses ? 180 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      ▼
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {expandedSections.weaknesses && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2 rounded-lg bg-gray-50 p-4 dark:bg-gray-900"
                      >
                        <div className="prose prose-sm dark:prose-invert">
                          <ReactMarkdown>
                            {parseAuditResult.weaknesses}
                          </ReactMarkdown>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Suggestions */}
                <div>
                  <button
                    onClick={() => toggleSection("suggestions")}
                    className="flex w-full items-center justify-between rounded-lg bg-indigo-50 p-3 text-left text-lg font-semibold text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300"
                  >
                    Suggestions for Improvement
                    <motion.span
                      animate={{
                        rotate: expandedSections.suggestions ? 180 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      ▼
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {expandedSections.suggestions && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2 rounded-lg bg-gray-50 p-4 dark:bg-gray-900"
                      >
                        <div className="prose prose-sm dark:prose-invert">
                          <ReactMarkdown>
                            {parseAuditResult.suggestions}
                          </ReactMarkdown>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Keyword Gap Analysis (if present) */}
                {parseAuditResult.keywordGap && (
                  <div>
                    <button
                      onClick={() => toggleSection("keywordGap")}
                      className="flex w-full items-center justify-between rounded-lg bg-yellow-50 p-3 text-left text-lg font-semibold text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                    >
                      Keyword Gap Analysis
                      <motion.span
                        animate={{
                          rotate: expandedSections.keywordGap ? 180 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        ▼
                      </motion.span>
                    </button>
                    <AnimatePresence>
                      {expandedSections.keywordGap && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-2 rounded-lg bg-gray-50 p-4 dark:bg-gray-900"
                        >
                          <div className="prose prose-sm dark:prose-invert">
                            <ReactMarkdown>
                              {parseAuditResult.keywordGap}
                            </ReactMarkdown>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* ATS Tips */}
                {parseAuditResult.atsTips && (
                  <div>
                    <button
                      onClick={() => toggleSection("atsTips")}
                      className="flex w-full items-center justify-between rounded-lg bg-purple-50 p-3 text-left text-lg font-semibold text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                    >
                      ATS Tips
                      <motion.span
                        animate={{ rotate: expandedSections.atsTips ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        ▼
                      </motion.span>
                    </button>
                    <AnimatePresence>
                      {expandedSections.atsTips && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-2 rounded-lg bg-gray-50 p-4 dark:bg-gray-900"
                        >
                          <div className="prose prose-sm dark:prose-invert">
                            <ReactMarkdown>
                              {parseAuditResult.atsTips}
                            </ReactMarkdown>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Improvement Suggestions Based on Low Scores */}
                {parseAuditResult.lowScoringAreas.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-8 rounded-lg bg-teal-50 p-6 dark:bg-teal-900"
                  >
                    <h3 className="mb-4 text-lg font-semibold text-teal-800 dark:text-teal-300">
                      🔍 Key Areas to Improve
                    </h3>
                    <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                      Based on your audit, here are the areas where your{" "}
                      {docType} scored 5 or below, along with tailored
                      suggestions to improve:
                    </p>
                    <ul className="space-y-3">
                      {parseAuditResult.lowScoringAreas.map(
                        ({ metric, score }) => (
                          <li
                            key={metric}
                            className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-800"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-gray-700 dark:text-gray-300">
                                {metric}
                              </span>
                              <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                                {score}/10
                              </span>
                            </div>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                              {metric === "Formatting" &&
                                "Consider standardizing your layout with consistent fonts and spacing."}
                              {metric === "Keywords" &&
                                "Add more job-specific keywords to align with the role you're applying for."}
                              {metric === "Grammar" &&
                                "Run a grammar check to correct spelling and punctuation errors."}
                              {metric === "Length" &&
                                `Ensure your ${docType} is the appropriate length (resume: 1-2 pages, cover letter: 3-4 paragraphs).`}
                              {metric === "Visual Hierarchy" &&
                                "Improve readability with better spacing and section headings."}
                              {metric === "Tone" &&
                                "Adopt a more confident and formal tone suitable for the role."}
                              {metric === "Action Language" &&
                                "Use more active verbs and quantify your achievements (e.g., 'increased sales by 20%')."}
                              {metric === "ATS Compatibility" &&
                                "Avoid tables or complex formatting that might confuse Applicant Tracking Systems."}
                              {metric === "Personalisation" &&
                                "Highlight your unique value proposition to stand out."}
                              {metric === "Impact Quantification" &&
                                "Include measurable results to demonstrate your impact (e.g., 'reduced costs by 15%')."}
                              {metric === "Skill Alignment" &&
                                "Align your listed skills more closely with the job requirements."}
                              {metric === "Redundancy" &&
                                "Remove repetitive phrases and overused buzzwords."}
                              {metric === "Readability" &&
                                "Simplify long sentences and avoid jargon to improve clarity."}
                            </p>
                          </li>
                        ),
                      )}
                    </ul>
                  </motion.div>
                )}

                {/* Charts (Moved to End) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="mt-10 space-y-8"
                >
                  {/* Radar Chart */}
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
                      📊 Score Breakdown (Radar View)
                    </h3>
                    <ResponsiveContainer width="100%" height={400}>
                      <RadarChart data={radarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Tooltip />
                        <Radar
                          name="Score"
                          dataKey="A"
                          stroke="#8884d8"
                          fill="#8884d8"
                          fillOpacity={0.6}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Bar Chart */}
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
                      📈 Industry Benchmark
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={barData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="score" />
                      </BarChart>
                    </ResponsiveContainer>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      Your overall score compared to the industry average.
                    </p>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
