// src/components/ResumeLab.tsx
"use client";

import { useUser } from "@clerk/nextjs";

// 1️⃣ Move this to the top, before any rendering or imports of <Document>
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/" +
  `${pdfjs.version}/pdf.worker.min.mjs`;

import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// type Suggestion = {
//     id: string;
//     snippet: string;
//     suggestion: string;
//     createdAt: string;
//   };

//   type Annotation = {
//     id: string;
//     snippet: string;
//     comment: string;
//     createdAt: string;
//   };

//   export default function ResumeLab() {
//     // Clerk user info
//     const { user } = useUser();
//     const displayName =
//       user?.firstName && user?.lastName
//         ? `${user.firstName} ${user.lastName}`
//         : user?.firstName || "You";

//     // PDF upload & viewer state
//     const [resumeUrl, setResumeUrl]     = useState("");
//     const [hasUploaded, setHasUploaded] = useState(false);
//     const [uploading, setUploading]     = useState(false);
//     const [numPages, setNumPages]       = useState(0);

//     // Text selection & popups
//     const [selection, setSelection]     = useState("");
//     const [rect, setRect]               = useState<DOMRect | null>(null);

//     // AI suggestion flow
//     const [aiLoading, setAiLoading]     = useState(false);
//     const [aiTemp, setAiTemp]           = useState("");
//     const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

//     // User annotation flow
//     const [isAnnotating, setIsAnnotating]     = useState(false);
//     const [annotationText, setAnnotationText] = useState("");
//     const [annotations, setAnnotations]       = useState<Annotation[]>([]);

//     // Refs
//     const fileInputRef = useRef<HTMLInputElement>(null);
//     const containerRef = useRef<HTMLDivElement>(null);
//     const popupRef     = useRef<HTMLDivElement>(null);

//     // Load persisted suggestions & annotations once
//     useEffect(() => {
//       fetch("/api/suggestions")
//         .then((r) => r.json())
//         .then(setSuggestions)
//         .catch(console.error);
//       fetch("/api/annotations")
//         .then((r) => r.json())
//         .then(setAnnotations)
//         .catch(console.error);
//     }, []);

//     // Track text selection inside PDF pane
//     const handleMouseUp = useCallback(() => {
//       if (isAnnotating) return;
//       const sel = window.getSelection();
//       if (
//         sel &&
//         sel.toString().trim() &&
//         containerRef.current?.contains(sel.anchorNode)
//       ) {
//         try {
//           const r = sel.getRangeAt(0).getBoundingClientRect();
//           setSelection(sel.toString());
//           setRect(r);
//           return;
//         } catch {}
//       }
//       setSelection("");
//       setRect(null);
//     }, [isAnnotating]);

//     useEffect(() => {
//       const el = containerRef.current;
//       el?.addEventListener("mouseup", handleMouseUp);
//       return () => el?.removeEventListener("mouseup", handleMouseUp);
//     }, [handleMouseUp]);

//     // Upload helper
//     const uploadFile = async (file: File) => {
//       const form = new FormData();
//       form.append("file", file);
//       const res  = await fetch("/api/upload", { method: "POST", body: form });
//       const data = await res.json();
//       return data.url as string;
//     };

//     // Handle file selection
//     const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//       const file = e.target.files?.[0];
//       if (!file) return;
//       setUploading(true);
//       try {
//         const url = await uploadFile(file);
//         await fetch("/api/profile/resume", {
//           method: "PATCH",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ resumeUrl: url }),
//         });
//         setResumeUrl(url);
//         setHasUploaded(true);
//       } finally {
//         setUploading(false);
//       }
//     };

//     // Memoize file prop for react-pdf
//     const fileProp = useMemo(() => ({ url: resumeUrl }), [resumeUrl]);

//     // AI suggestion handler
//     const askSuggestion = async () => {
//       if (!selection) return;
//       setAiLoading(true);
//       setAiTemp("");
//       try {
//         const res = await fetch("/api/resume-suggestions", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ snippet: selection }),
//         });
//         const data = await res.json();
//         if (data.error) {
//           setAiTemp(`⚠️ ${data.error}`);
//         } else {
//           setAiTemp(data.suggestion);
//           setSuggestions((prev) => [
//             {
//               id: data.id,
//               snippet: data.snippet,
//               suggestion: data.suggestion,
//               createdAt: data.createdAt,
//             },
//             ...prev,
//           ]);
//         }
//       } catch {
//         setAiTemp("⚠️ Failed to get suggestion");
//       } finally {
//         setAiLoading(false);
//       }
//     };

//     // Save annotation handler
//     const saveAnnotation = async () => {
//       if (!selection || !annotationText) return;
//       try {
//         const res = await fetch("/api/annotations", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ snippet: selection, comment: annotationText }),
//         });
//         const ann = await res.json();
//         setAnnotations((prev) => [ann, ...prev]);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setIsAnnotating(false);
//         setAnnotationText("");
//         setSelection("");
//         setRect(null);
//       }
//     };

//     // Copy helpers
//     const copyToClipboard = (text: string) => navigator.clipboard.writeText(text);

//     // Copy all suggestions + annotations, including timestamps and snippets
//     const copyAll = () => {
//       const lines: string[] = [];
//       suggestions.forEach((s) => {
//         lines.push(`Timestamp: ${new Date(s.createdAt).toLocaleString()}`);
//         lines.push(`Snippet: ${s.snippet}`);
//         lines.push(`AI: ${s.suggestion}`);
//         lines.push(""); // blank line
//       });
//       annotations.forEach((a) => {
//         lines.push(`Timestamp: ${new Date(a.createdAt).toLocaleString()}`);
//         lines.push(`Snippet: ${a.snippet}`);
//         lines.push(`${displayName}: ${a.comment}`);
//         lines.push("");
//       });
//       navigator.clipboard.writeText(lines.join("\n"));
//     };

//     // Clear all client‑side
//     const clearAll = () => {
//       setSuggestions([]);
//       setAnnotations([]);
//     };

//     // Scroll popups into view
//     useEffect(() => {
//       if ((aiTemp || isAnnotating) && popupRef.current) {
//         const r = popupRef.current.getBoundingClientRect();
//         if (r.bottom > window.innerHeight) {
//           window.scrollBy({
//             top: r.bottom - window.innerHeight + 20,
//             behavior: "smooth",
//           });
//         }
//       }
//     }, [aiTemp, isAnnotating]);

//     return (
//       <>
//         {/* Download / Print */}
//         <div className="flex justify-end mb-2">
//           <button
//             onClick={() => window.print()}
//             className="px-3 py-1 bg-green-600 text-white rounded text-xs"
//           >
//             Download PDF
//           </button>
//         </div>

//         <div className="flex space-x-4">
//           {/* Left: PDF + inline UI */}
//           <div className="w-2/3">
//             {/* Upload */}
//             <div className="mb-2">
//               {!hasUploaded ? (
//                 <button
//                   onClick={() => fileInputRef.current?.click()}
//                   disabled={uploading}
//                   className="px-3 py-1 bg-indigo-600 text-white text-xs rounded"
//                 >
//                   {uploading ? "Uploading…" : "Upload PDF"}
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => fileInputRef.current?.click()}
//                   disabled={uploading}
//                   className="text-xs text-teal-600 underline"
//                 >
//                   {uploading ? "Uploading…" : "Change Resume"}
//                 </button>
//               )}
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="application/pdf"
//                 className="hidden"
//                 onChange={onFileChange}
//               />
//             </div>

//             {/* PDF Viewer */}
//             <div
//               ref={containerRef}
//               className="relative border rounded overflow-auto"
//               style={{ height: "75vh" }}
//             >
//               {resumeUrl ? (
//                 <Document
//                   file={fileProp}
//                   onLoadSuccess={({ numPages }) => setNumPages(numPages)}
//                 >
//                   {Array.from({ length: numPages }, (_, i) => (
//                     <Page
//                       key={i}
//                       pageNumber={i + 1}
//                       width={700}
//                       className="mx-auto mb-2"
//                     />
//                   ))}
//                 </Document>
//               ) : (
//                 <div className="h-full flex items-center justify-center text-gray-500 text-xs">
//                   Upload a PDF to start
//                 </div>
//               )}

//               {/* Inline Actions */}
//               {selection && rect && (
//                 <div
//                   style={{
//                     top: rect.top - 28 + window.scrollY,
//                     left: rect.left + window.scrollX,
//                   }}
//                   className="absolute flex space-x-1 z-30"
//                 >
//                   <button
//                     onClick={askSuggestion}
//                     className="bg-blue-600 text-white text-[10px] rounded px-1 py-0.5"
//                   >
//                     {aiLoading ? "…" : "AI"}
//                   </button>
//                   <button
//                     onClick={() => setIsAnnotating(true)}
//                     className="bg-yellow-500 text-white text-[10px] rounded px-1 py-0.5"
//                   >
//                     Note
//                   </button>
//                 </div>
//               )}

//               {/* AI Popup */}
//               {aiTemp && rect && (
//                 <div
//                   ref={popupRef}
//                   style={{
//                     top: rect.bottom + window.scrollY + 6,
//                     left: rect.left + window.scrollX,
//                   }}
//                   className="absolute bg-white p-2 rounded shadow border prose text-xs z-40"
//                 >
//                   <strong>AI:</strong>
//                   <p className="mt-1 whitespace-pre-wrap">{aiTemp}</p>
//                   <button
//                     onClick={() => setAiTemp("")}
//                     className="text-xs text-gray-500 hover:underline"
//                   >
//                     Close
//                   </button>
//                 </div>
//               )}

//               {/* Annotation Form */}
//               {isAnnotating && rect && (
//                 <div
//                   ref={popupRef}
//                   style={{
//                     top: rect.bottom + window.scrollY + 6,
//                     left: rect.left + window.scrollX,
//                   }}
//                   className="absolute bg-white p-2 rounded shadow border text-xs z-40"
//                 >
//                   <div className="italic mb-1">{"selection"}</div>
//                   <textarea
//                     value={annotationText}
//                     onChange={(e) => setAnnotationText(e.target.value)}
//                     placeholder="Your note…"
//                     className="w-48 h-16 p-1 border rounded text-xs"
//                   />
//                   <div className="flex justify-end mt-1 space-x-1">
//                     <button
//                       onClick={() => setIsAnnotating(false)}
//                       className="text-xs text-gray-500 hover:underline"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       onClick={saveAnnotation}
//                       className="px-2 py-0.5 bg-yellow-500 text-white text-xs rounded"
//                     >
//                       Save
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right: Sidebar */}
//           <div
//             className="w-1/3 border-l pl-3 overflow-auto"
//             style={{ height: "75vh" }}
//           >
//             {/* Copy & Clear */}
//             <div className="flex justify-between items-center mb-2">
//               <h2 className="text-xs font-semibold">AI & Notes</h2>
//               <div className="space-x-2">
//                 <button
//                   onClick={copyAll}
//                   className="text-[10px] text-teal-600 hover:underline"
//                 >
//                   Copy All
//                 </button>
//                 <button
//                   onClick={clearAll}
//                   className="text-[10px] text-red-600 hover:underline"
//                 >
//                   Clear All
//                 </button>
//               </div>
//             </div>

//             {/* AI Suggestions */}
//             {suggestions.map((s) => (
//               <div
//                 key={s.id}
//                 className="mb-2 p-1 bg-blue-50 rounded text-xs border-l-4 border-blue-400"
//               >
//                 <span className="inline-block bg-blue-600 text-white text-[8px] px-1 rounded-full mb-1">
//                   AI
//                 </span>
//                 <div className="text-[9px] text-gray-500">
//                   {new Date(s.createdAt).toLocaleString()}
//                 </div>
//                 <blockquote className="italic border-l-2 border-blue-300 pl-1 mt-1">
//                   {s.snippet}
//                 </blockquote>
//                 <p className="mt-1">{s.suggestion}</p>
//                 <button
//                   onClick={() =>
//                     copyToClipboard(
//                       `Timestamp: ${new Date(s.createdAt).toLocaleString()}\nSnippet: ${s.snippet}\nAI: ${s.suggestion}`
//                     )
//                   }
//                   className="text-[10px] text-teal-600 hover:underline"
//                 >
//                   Copy
//                 </button>
//               </div>
//             ))}

//             {/* User Notes */}
//             {annotations.map((a) => (
//               <div
//                 key={a.id}
//                 className="mb-2 p-1 bg-yellow-50 rounded text-xs border-l-4 border-yellow-400"
//               >
//                 <span className="inline-block bg-yellow-500 text-white text-[8px] px-1 rounded-full mb-1">
//                   {displayName}
//                 </span>
//                 <div className="text-[9px] text-gray-500">
//                   {new Date(a.createdAt).toLocaleString()}
//                 </div>
//                 <blockquote className="italic border-l-2 border-yellow-300 pl-1 mt-1">
//                   {a.snippet}
//                 </blockquote>
//                 <p className="mt-1">{a.comment}</p>
//                 <button
//                   onClick={() =>
//                     copyToClipboard(
//                       `Timestamp: ${new Date(a.createdAt).toLocaleString()}\nSnippet: ${a.snippet}\n${displayName}: ${a.comment}`
//                     )
//                   }
//                   className="text-[10px] text-teal-600 hover:underline"
//                 >
//                   Copy
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </>
//     );
//   }

// src/components/ResumeLab.tsx
// "use client";

// import React, {
//   useState,
//   useRef,
//   useEffect,
//   useCallback,
//   useMemo,
// } from "react";
// import { useUser } from "@clerk/nextjs";
// import { Document, Page, pdfjs } from "react-pdf";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// // Point the PDF.js worker at your public asset
// pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

type Suggestion = {
  id: string;
  snippet: string;
  suggestion: string;
  createdAt: string;
};

type Annotation = {
  id: string;
  snippet: string;
  comment: string;
  createdAt: string;
};

export default function ResumeLab() {
  // Clerk user (for displayName on notes)
  const { user } = useUser();
  const displayName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.firstName || "You";

  // PDF + upload state
  const [resumeUrl, setResumeUrl] = useState("");
  const [hasUploaded, setHasUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [numPages, setNumPages] = useState(0);

  // Selection & popups
  const [selection, setSelection] = useState("");
  const [rect, setRect] = useState<DOMRect | null>(null);

  // AI suggestions
  const [aiLoading, setAiLoading] = useState(false);
  const [aiTemp, setAiTemp] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  // User annotations
  const [isAnnotating, setIsAnnotating] = useState(false);
  const [annotationText, setAnnotationText] = useState("");
  const [annotations, setAnnotations] = useState<Annotation[]>([]);

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  // Load both lists once
  useEffect(() => {
    (async () => {
      try {
        const [rS, rA] = await Promise.all([
          fetch("/api/resume-suggestions"),
          fetch("/api/annotations"),
        ]);
        if (rS.ok) {
          const data: Suggestion[] = await rS.json();
          if (Array.isArray(data)) setSuggestions(data);
        }
        if (rA.ok) {
          const data: Annotation[] = await rA.json();
          if (Array.isArray(data)) setAnnotations(data);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  // Track text selections inside the PDF container
  const handleMouseUp = useCallback(() => {
    if (isAnnotating) return; // keep textarea open
    const sel = window.getSelection();
    if (
      sel &&
      sel.toString().trim() &&
      containerRef.current?.contains(sel.anchorNode)
    ) {
      try {
        const r = sel.getRangeAt(0).getBoundingClientRect();
        setSelection(sel.toString());
        setRect(r);
        return;
      } catch (e) {
        console.error(e);
      }
    }
    setSelection("");
    setRect(null);
  }, [isAnnotating]);

  useEffect(() => {
    const el = containerRef.current;
    el?.addEventListener("mouseup", handleMouseUp);
    return () => el?.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseUp]);

  // Upload a PDF file to your /api/upload
  const uploadFile = async (file: File) => {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: form });
    const data = await res.json();
    return data.url as string;
  };

  // Handle input[type=file] change
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadFile(file);
      // Persist to user’s profile
      await fetch("/api/profile/resume", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeUrl: url }),
      });
      setResumeUrl(url);
      setHasUploaded(true);
    } finally {
      setUploading(false);
    }
  };

  // Memoize the file prop so React-PDF doesn’t reload
  const fileProp = useMemo(() => ({ url: resumeUrl }), [resumeUrl]);

  // Ask OpenAI for a rewrite suggestion
  const askSuggestion = async () => {
    if (!selection) return;
    setAiLoading(true);
    setAiTemp("");
    try {
      const res = await fetch("/api/resume-suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ snippet: selection }),
      });
      const data = await res.json();
      if (data.error) {
        setAiTemp(`⚠️ ${data.error}`);
      } else {
        setAiTemp(data.suggestion);
        setSuggestions((prev) => [
          {
            id: data.id,
            snippet: data.snippet,
            suggestion: data.suggestion,
            createdAt: data.createdAt,
          },
          ...prev,
        ]);
      }
    } catch {
      setAiTemp("⚠️ Failed to get suggestion");
    } finally {
      setAiLoading(false);
    }
  };

  // Save a user annotation
  const saveAnnotation = async () => {
    if (!selection || !annotationText) return;
    try {
      const res = await fetch("/api/annotations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ snippet: selection, comment: annotationText }),
      });
      const ann = await res.json();
      if (ann.id) {
        setAnnotations((prev) => [ann, ...prev]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnnotating(false);
      setAnnotationText("");
      setSelection("");
      setRect(null);
    }
  };

  // Copy text helper
  const copyToClipboard = (text: string) => navigator.clipboard.writeText(text);

  // Copy all items with timestamps & snippets
  const copyAll = () => {
    const lines: string[] = [];
    suggestions.forEach((s) => {
      lines.push(`Timestamp: ${new Date(s.createdAt).toLocaleString()}`);
      lines.push(`Snippet: ${s.snippet}`);
      lines.push(`AI: ${s.suggestion}`);
      lines.push("");
    });
    annotations.forEach((a) => {
      lines.push(`Timestamp: ${new Date(a.createdAt).toLocaleString()}`);
      lines.push(`Snippet: ${a.snippet}`);
      lines.push(`${displayName}: ${a.comment}`);
      lines.push("");
    });
    navigator.clipboard.writeText(lines.join("\n"));
  };

  // Clear both lists (client-side only)
  const clearAll = () => {
    setSuggestions([]);
    setAnnotations([]);
  };

  // Ensure popups are in view
  useEffect(() => {
    if ((aiTemp || isAnnotating) && popupRef.current) {
      const r = popupRef.current.getBoundingClientRect();
      if (r.bottom > window.innerHeight) {
        window.scrollBy({
          top: r.bottom - window.innerHeight + 20,
          behavior: "smooth",
        });
      }
    }
  }, [aiTemp, isAnnotating]);

  return (
    <>
      {/* Download / Print */}
      <div className="mb-2 flex justify-center md:justify-end">
        <button
          onClick={() => window.print()}
          className="rounded bg-green-600 px-3 py-1 text-xs text-white"
        >
          Download PDF
        </button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        {/* Left: PDF + inline UI */}
        <div className="flex-[60%]">
          {/* Upload */}
          <div className="mb-2">
            {!hasUploaded ? (
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="rounded bg-indigo-600 px-3 py-1 text-xs text-white"
              >
                {uploading ? "Uploading…" : "Upload PDF"}
              </button>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="text-xs text-teal-600 underline"
              >
                {uploading ? "Uploading…" : "Change Resume"}
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={onFileChange}
            />
          </div>

          {/* PDF Viewer */}
          <div
            ref={containerRef}
            className="relative overflow-auto rounded border"
            style={{ height: "75vh" }}
          >
            {resumeUrl ? (
              <Document
                file={fileProp}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              >
                {Array.from({ length: numPages }, (_, i) => (
                  <Page
                    key={i}
                    pageNumber={i + 1}
                    width={700}
                    className="mx-auto mb-2"
                  />
                ))}
              </Document>
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-gray-500">
                Upload a PDF to start
              </div>
            )}

            {/* Inline Actions */}
            {selection && rect && (
              <div
                style={{
                  top: rect.top - 28 + window.scrollY,
                  left: rect.left + window.scrollX,
                }}
                className="absolute z-30 flex space-x-1"
              >
                <button
                  onClick={askSuggestion}
                  className="rounded bg-blue-600 px-1 py-0.5 text-[10px] text-white"
                >
                  {aiLoading ? "…" : "AI"}
                </button>
                <button
                  onClick={() => setIsAnnotating(true)}
                  className="rounded bg-yellow-500 px-1 py-0.5 text-[10px] text-white"
                >
                  Note
                </button>
              </div>
            )}

            {/* AI Popup */}
            {aiTemp && rect && (
              <div
                ref={popupRef}
                style={{
                  top: rect.bottom + window.scrollY + 6,
                  left: rect.left + window.scrollX,
                }}
                className="prose absolute z-40 rounded border bg-white p-2 text-xs shadow"
              >
                <strong>AI:</strong>
                <p className="mt-1 whitespace-pre-wrap">{aiTemp}</p>
                <button
                  onClick={() => setAiTemp("")}
                  className="text-xs text-gray-500 hover:underline"
                >
                  Close
                </button>
              </div>
            )}

            {/* Annotation Form */}
            {isAnnotating && rect && (
              <div
                ref={popupRef}
                style={{
                  top: rect.bottom + window.scrollY + 6,
                  left: rect.left + window.scrollX,
                }}
                className="absolute z-40 rounded border bg-white p-2 text-xs shadow"
              >
                <div className="mb-1 italic">&quot;{selection}&quot;</div>
                <textarea
                  value={annotationText}
                  onChange={(e) => setAnnotationText(e.target.value)}
                  placeholder="Your note…"
                  className="h-16 w-48 rounded border p-1 text-xs"
                />
                <div className="mt-1 flex justify-end space-x-1">
                  <button
                    onClick={() => setIsAnnotating(false)}
                    className="text-xs text-gray-500 hover:underline"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveAnnotation}
                    className="rounded bg-yellow-500 px-2 py-0.5 text-xs text-white"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Sidebar */}
        <div
          className="flex-[40%] overflow-auto border-l pl-3"
          // style={{ height: "75vh" }}
        >
          {/* Copy & Clear */}
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-xs font-semibold">AI & Notes</h2>
            <div className="space-x-2">
              <button
                onClick={copyAll}
                className="text-[10px] text-teal-600 hover:underline"
              >
                Copy All
              </button>
              <button
                onClick={clearAll}
                className="text-[10px] text-red-600 hover:underline"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* AI Suggestions */}
          {suggestions.map((s) => (
            <div
              key={s.id}
              className="mb-2 rounded border-l-4 border-blue-400 bg-blue-50 p-1 text-xs"
            >
              <span className="mb-1 inline-block rounded-full bg-blue-600 px-1 text-[8px] text-white">
                AI
              </span>
              <div className="text-[9px] text-gray-500">
                {new Date(s.createdAt).toLocaleString()}
              </div>
              <blockquote className="mt-1 border-l-2 border-blue-300 pl-1 italic">
                {s.snippet}
              </blockquote>
              <p className="mt-1">{s.suggestion}</p>
              <button
                onClick={() =>
                  copyToClipboard(
                    `Timestamp: ${new Date(s.createdAt).toLocaleString()}\nSnippet: ${s.snippet}\nAI: ${s.suggestion}`,
                  )
                }
                className="text-[10px] text-teal-600 hover:underline"
              >
                Copy
              </button>
            </div>
          ))}

          {/* User Notes */}
          {annotations.map((a) => (
            <div
              key={a.id}
              className="mb-2 rounded border-l-4 border-yellow-400 bg-yellow-50 p-1 text-xs"
            >
              <span className="mb-1 inline-block rounded-full bg-yellow-500 px-1 text-[8px] text-white">
                {displayName}
              </span>
              <div className="text-[9px] text-gray-500">
                {new Date(a.createdAt).toLocaleString()}
              </div>
              <blockquote className="mt-1 border-l-2 border-yellow-300 pl-1 italic">
                {a.snippet}
              </blockquote>
              <p className="mt-1">{a.comment}</p>
              <button
                onClick={() =>
                  copyToClipboard(
                    `Timestamp: ${new Date(a.createdAt).toLocaleString()}\nSnippet: ${a.snippet}\n${displayName}: ${a.comment}`,
                  )
                }
                className="text-[10px] text-teal-600 hover:underline"
              >
                Copy
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
