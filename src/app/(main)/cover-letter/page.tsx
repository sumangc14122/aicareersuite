// "use client";

// import React, { useState } from "react";
// import { coverLetterTemplates } from "@/templates/coverLetterTemplates"; // Path to templates file
// import * as FileSaver from "file-saver";
// import * as docx from "docx";

// export default function CoverLetterPage() {
//   const [details, setDetails] = useState({
//     name: "",
//     role: "",
//     company: "",
//     achievements: "",
//     positionDescription: "",
//     requiredSkills: "",
//   });
//   const [templateId, setTemplateId] = useState(coverLetterTemplates[0].id);
//   const [letter, setLetter] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleGenerate = async () => {
//     setLoading(true);
//     const res = await fetch("/api/generateCoverLetter", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         templateId,
//         details,
//         positionDescription: details.positionDescription,
//         requiredSkills: details.requiredSkills,
//       }),
//     });
//     const data = await res.json();
//     setLetter(data.letter);
//     setLoading(false);
//   };

//   const downloadWord = () => {
//     // Ensure we are using the generated content from the OpenAI response
//     const letterContent = letter || "No letter generated yet";

//     // Split the letter content by newlines to preserve the paragraphs
//     const paragraphs = letterContent.split("\n").map(
//       (line) =>
//         new docx.Paragraph({
//           children: [
//             new docx.TextRun({
//               text: line,
//               font: "Arial",
//               size: 22,
//             }),
//           ],
//           alignment: docx.AlignmentType.LEFT, // Left-aligned text
//         }),
//     );

//     // Create the Word document with formatted content
//     const doc = new docx.Document({
//       sections: [
//         {
//           properties: {},
//           children: [
//             // Title or header for the document (Optional)
//             new docx.Paragraph({
//               children: [
//                 new docx.TextRun({
//                   text: "Cover Letter",
//                   font: "Arial",
//                   size: 24,
//                   bold: true,
//                 }),
//               ],
//               alignment: docx.AlignmentType.CENTER,
//             }),

//             // Space after the title
//             new docx.Paragraph({
//               text: "",
//               spacing: { after: 200 },
//             }),

//             // Insert the generated cover letter content
//             ...paragraphs, // Insert all paragraphs here

//             // Optional closing (signature)
//             // new docx.Paragraph({
//             //   children: [
//             //     new docx.TextRun({
//             //       text: 'Sincerely,\n\n' + (details.name || '[Your Name]'),
//             //       font: 'Arial',
//             //       size: 22,
//             //       bold: true,
//             //     }),
//             //   ],
//             //   alignment: docx.AlignmentType.LEFT,
//             //   spacing: { after: 200 },
//             // }),
//           ],
//         },
//       ],
//     });

//     // Generate the Word document and download it
//     docx.Packer.toBlob(doc).then((blob) => {
//       FileSaver.saveAs(blob, "Cover_Letter.docx");
//     });
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="mb-4 text-2xl font-bold">Cover Letter Generator</h1>

//       <div className="space-y-4">
//         <div>
//           <label className="block font-medium">Your Name</label>
//           <input
//             type="text"
//             className="mt-1 w-full rounded border p-2"
//             value={details.name}
//             onChange={(e) => setDetails({ ...details, name: e.target.value })}
//           />
//         </div>
//         <div>
//           <label className="block font-medium">Role Title</label>
//           <input
//             type="text"
//             className="mt-1 w-full rounded border p-2"
//             value={details.role}
//             onChange={(e) => setDetails({ ...details, role: e.target.value })}
//           />
//         </div>
//         <div>
//           <label className="block font-medium">Company Name</label>
//           <input
//             type="text"
//             className="mt-1 w-full rounded border p-2"
//             value={details.company}
//             onChange={(e) =>
//               setDetails({ ...details, company: e.target.value })
//             }
//           />
//         </div>
//         <div>
//           <label className="block font-medium">
//             Key Achievements (optional)
//           </label>
//           <textarea
//             className="mt-1 w-full rounded border p-2"
//             rows={3}
//             value={details.achievements}
//             onChange={(e) =>
//               setDetails({ ...details, achievements: e.target.value })
//             }
//           />
//         </div>

//         {/* New Input Fields for Position Description and Required Skills */}
//         <div>
//           <label className="block font-medium">Position Description</label>
//           <textarea
//             className="mt-1 w-full rounded border p-2"
//             rows={3}
//             value={details.positionDescription}
//             onChange={(e) =>
//               setDetails({ ...details, positionDescription: e.target.value })
//             }
//           />
//         </div>

//         <div>
//           <label className="block font-medium">Skills Required</label>
//           <textarea
//             className="mt-1 w-full rounded border p-2"
//             rows={3}
//             value={details.requiredSkills}
//             onChange={(e) =>
//               setDetails({ ...details, requiredSkills: e.target.value })
//             }
//           />
//         </div>

//         <div>
//           <label className="block font-medium">Template</label>
//           <select
//             className="mt-1 w-full rounded border p-2"
//             value={templateId}
//             onChange={(e) => setTemplateId(e.target.value)}
//           >
//             {coverLetterTemplates.map((t) => (
//               <option key={t.id} value={t.id}>
//                 {t.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <button
//           className="rounded bg-blue-600 px-4 py-2 text-white"
//           onClick={handleGenerate}
//           disabled={loading}
//         >
//           {loading ? "Generating..." : "Generate Cover Letter"}
//         </button>

//         {letter && (
//           <div className="mt-6">
//             <h2 className="mb-2 text-xl font-semibold">Your Cover Letter</h2>
//             <div className="prose whitespace-pre-wrap rounded border bg-gray-900 p-4 text-white">
//               {letter}
//             </div>
//             {/* Button to download the letter */}
//             <button
//               className="mt-4 rounded bg-green-600 px-4 py-2 text-white"
//               onClick={downloadWord}
//             >
//               Download as Word
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import { coverLetterTemplates } from "@/templates/coverLetterTemplates";
import * as FileSaver from "file-saver";
import * as docx from "docx";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Download, Copy } from "lucide-react";

export default function CoverLetterPage() {
  const [details, setDetails] = useState({
    name: "",
    role: "", // Job title the candidate is applying for
    company: "", // Company the candidate is applying to
    achievements: "", // Candidate's own achievements
    jobDescription: "", // Description of the job they are applying for
    requiredSkills: "", // Skills required for the job
  });
  const [templateId, setTemplateId] = useState(coverLetterTemplates[0].id);
  const [letter, setLetter] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const res = await fetch("/api/generateCoverLetter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        templateId,
        details: {
          name: details.name,
          role: details.role, // Job title for the application
          company: details.company, // Company for the application
          achievements: details.achievements, // Candidate's achievements
          jobDescription: details.jobDescription, // Job description
          requiredSkills: details.requiredSkills, // Required skills for the job
        },
      }),
    });
    const data = await res.json();
    setLetter(data.letter);
    setLoading(false);
  };

  const downloadWord = () => {
    const letterContent = letter || "No letter generated yet";

    const paragraphs = letterContent.split("\n").map(
      (line) =>
        new docx.Paragraph({
          children: [
            new docx.TextRun({
              text: line,
              font: "Arial",
              size: 22,
            }),
          ],
          alignment: docx.AlignmentType.LEFT,
        }),
    );

    const doc = new docx.Document({
      sections: [
        {
          properties: {},
          children: [
            new docx.Paragraph({
              children: [
                new docx.TextRun({
                  text: "Cover Letter",
                  font: "Arial",
                  size: 24,
                  bold: true,
                }),
              ],
              alignment: docx.AlignmentType.CENTER,
            }),
            new docx.Paragraph({
              text: "",
              spacing: { after: 200 },
            }),
            ...paragraphs,
          ],
        },
      ],
    });

    docx.Packer.toBlob(doc).then((blob) => {
      FileSaver.saveAs(blob, "Cover_Letter.docx");
    });
  };

  const copyToClipboard = () => {
    if (letter) {
      navigator.clipboard.writeText(letter);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const isFormComplete =
    details.name.trim().length > 0 &&
    details.role.trim().length > 0 &&
    details.company.trim().length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-100 p-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-3xl rounded-2xl border border-blue-200 bg-white/90 p-6 shadow-2xl backdrop-blur-md md:p-8"
      >
        <h1 className="mb-6 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-center text-3xl font-bold text-transparent md:text-4xl">
          Cover Letter Generator
        </h1>
        <div className="mb-6 h-2 w-full rounded-full bg-gray-200">
          <motion.div
            className="h-2 rounded-full bg-gradient-to-r from-green-400 to-teal-500"
            initial={{ width: "0%" }}
            animate={{
              width: isFormComplete
                ? "100%"
                : `${(Object.values(details).filter(Boolean).length / 6) * 100}%`,
            }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <label className="block text-sm font-medium text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-teal-500"
              value={details.name}
              onChange={(e) => setDetails({ ...details, name: e.target.value })}
              placeholder="Enter your full name"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <label className="block text-sm font-medium text-gray-700">
              {"Job Title You're Applying For"}
            </label>
            <input
              type="text"
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-teal-500"
              value={details.role}
              onChange={(e) => setDetails({ ...details, role: e.target.value })}
              placeholder="E.g., Software Engineer"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <label className="block text-sm font-medium text-gray-700">
              {"Company You're Applying To"}
            </label>
            <input
              type="text"
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-teal-500"
              value={details.company}
              onChange={(e) =>
                setDetails({ ...details, company: e.target.value })
              }
              placeholder="E.g., Google"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <label className="block text-sm font-medium text-gray-700">
              Your Key Achievements (Optional)
            </label>
            <textarea
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-teal-500"
              rows={3}
              value={details.achievements}
              onChange={(e) =>
                setDetails({ ...details, achievements: e.target.value })
              }
              placeholder="List your key achievements"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative"
          >
            <label className="block text-sm font-medium text-gray-700">
              Job Description
            </label>
            <textarea
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-teal-500"
              rows={3}
              value={details.jobDescription}
              onChange={(e) =>
                setDetails({ ...details, jobDescription: e.target.value })
              }
              placeholder="Paste the job description here"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="relative"
          >
            <label className="block text-sm font-medium text-gray-700">
              Skills Required for the Job
            </label>
            <textarea
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-teal-500"
              rows={3}
              value={details.requiredSkills}
              onChange={(e) =>
                setDetails({ ...details, requiredSkills: e.target.value })
              }
              placeholder="List the skills required for the job"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="relative"
          >
            <label className="block text-sm font-medium text-gray-700">
              Template
            </label>
            <select
              className="mt-1 w-full appearance-none rounded-lg border border-gray-300 bg-white p-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-teal-500"
              value={templateId}
              onChange={(e) => setTemplateId(e.target.value)}
            >
              {coverLetterTemplates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#2563eb" }}
            whileTap={{ scale: 0.95 }}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition-all duration-200 disabled:cursor-not-allowed disabled:bg-gray-400"
            onClick={handleGenerate}
            disabled={loading || !isFormComplete}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="mr-2 h-5 w-5 animate-spin text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Generating...
              </span>
            ) : (
              "Generate Cover Letter"
            )}
          </motion.button>

          <AnimatePresence>
            {letter && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 rounded-lg bg-gray-900 p-6 text-white shadow-lg"
              >
                <h2 className="mb-4 bg-gradient-to-r from-teal-400 to-green-500 bg-clip-text text-2xl font-bold text-transparent">
                  Your Cover Letter
                </h2>
                <div className="prose whitespace-pre-wrap text-sm leading-relaxed">
                  {letter}
                </div>
                <div className="mt-4 flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition-all duration-200"
                    onClick={downloadWord}
                  >
                    <Download size={18} /> Download as Word
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-all duration-200"
                    onClick={copyToClipboard}
                  >
                    <Copy size={18} />{" "}
                    {isCopied ? <CheckCircle size={18} /> : "Copy"}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
