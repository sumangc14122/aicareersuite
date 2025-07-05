// "use client";

// import React, { useState, useEffect, useRef, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useChat } from "ai/react";
// import { Button } from "@/components/ui/button";
// import {
//   MessageSquare, X, Send, Wand2, BookOpen, ShieldQuestion,
//   Copy, Check, ArrowLeft
// } from "lucide-react";
// import ReactMarkdown, { Options } from "react-markdown";
// import remarkGfm from "remark-gfm";
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// // --- CONFIGURATION ---
// const FAQ_SUGGESTIONS: { [key: string]: string[] } = {
//   "Core Resume Building": [
//     "Is AI Resume Pro free to use?",
//     "What is the AI Resume Wizard and how does it work?",
//     "What's the difference between the Wizard and the Builder?",
//     "How does the Resume Audit help improve my existing resume?",
//     "Can I use the Resume Lab to rewrite specific sections?",
//   ],
//   "Interview & Application Tools": [
//     "Tell me about the AI Interview Simulator.",
//     "How does the Cover Letter Generator work?",
//     "What can I do with the Smart Job Tracker?",
//     "Where can I find sample questions in the Interview Question Library?",
//   ],
//   "Profile & Networking": [
//     "Explain the Public Profile Hub.",
//     "How do I share a success story?",
//     "What is the purpose of a Resume Review Request?",
//   ],
//   "General Platform Questions": [
//     "Is AI Resume Pro really free to use?",
//     "What are all the features offered on the platform?",
//     "How do I get started?",
//   ]
// };
// const LEGAL_SUGGESTIONS: { [key: string]: string[] } = {
//   "Your Data & Privacy": ["How is my personal data protected on AI Resume Pro?","What is your Privacy Policy?","Explain the Data Policy and how my information is used.","Can I delete all my data from the platform?",],
//   "Platform Rules & Content": ["What are the Terms of Use for this website?","What is the AI Usage Policy?","Tell me about the policy on User-Generated Content.","Are there any restrictions on how I can use the AI tools?",],
// };
// const AI_SUGGESTIONS: { [key: string]: string[] } = {
//   "Resume & CV Crafting": ["Give me 3 powerful bullet points for a sales role.","How do I write a resume summary with no experience?","Should I write a one-page or two-page resume?","What's the best way to list my skills on a resume?",],
//   "Cover Letter Strategy": ["Write a short, impactful opening for a cover letter.","How do I address a cover letter if I don't know the hiring manager's name?","What's a common mistake to avoid in a cover letter?",],
//   "Interview Preparation": ["How should I answer 'What is your greatest weakness'?","Give me some good questions to ask the interviewer at the end.","What is the STAR method for answering behavioral questions?","How do I prepare for a video interview?",],
//   "Career Growth & Networking": ["What are some tips to optimize my LinkedIn profile?","How can I negotiate a higher salary?","Suggest a professional way to follow up after an interview.",],
// };

// // --- TYPE DEFINITIONS & COMPONENTS ---
// type ChatMode = "faq" | "ai" | "legal" | null;

// const CodeBlock = ({ className, children }: { className?: string, children: React.ReactNode }) => {
//   const match = /language-(\w+)/.exec(className || '');
//   return match ? (
//     <SyntaxHighlighter style={vscDarkPlus as any} PreTag="div" language={match[1]}>{String(children).replace(/\n$/, '')}</SyntaxHighlighter>
//   ) : (
//     <code className={`bg-gray-200 dark:bg-gray-700 rounded-sm px-1 py-0.5 ${className}`}>{children}</code>
//   );
// };
// const MarkdownComponents: Options['components'] = {
//   code({ className, children, ...props }) {
//     const isBlock = /language-(\w+)/.exec(className || '');
//     return isBlock ? (<CodeBlock className={className} {...props}>{children}</CodeBlock>) : (<code className={`bg-gray-200 dark:bg-gray-700 rounded-sm px-1 py-0.5 ${className}`} {...props}>{children}</code>);
//   }
// };

// // --- MAIN COMPONENT ---
// const ChatAssistant = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [chatMode, setChatMode] = useState<ChatMode>(null);
//   const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
//   const formRef = useRef<HTMLFormElement>(null);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const {
//     messages, setMessages, input, setInput,
//     handleInputChange, handleSubmit, isLoading
//   } = useChat({
//     api: "/api/chat",
//     body: { mode: chatMode },
//   });

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isLoading]);

//   const resetChat = () => { setChatMode(null); setMessages([]); setInput(''); };
//   const handleOpen = () => setIsOpen(true);
//   const handleClose = () => { setIsOpen(false); resetChat(); };

//   const handleCopy = (content: string, id: string) => {
//     navigator.clipboard.writeText(content);
//     setCopiedMessageId(id);
//     setTimeout(() => setCopiedMessageId(null), 2000);
//   };

//   const handleSuggestionClick = (prompt: string) => {
//     setInput(prompt);
//     setTimeout(() => { formRef.current?.requestSubmit(); }, 50);
//   };

//   const startChat = (mode: ChatMode) => {
//     setChatMode(mode);
//     setMessages([{
//       id: 'welcome-message', role: 'assistant',
//       content:
//         mode === 'faq' ? "Welcome! Ask about any feature or choose a suggestion to learn more." :
//         mode === 'legal' ? "Welcome! Ask about our policies or select a topic." :
//         "Welcome! I'm your AI Career Assistant. Ask me any career-related question.",
//     }]);
//   };

//   const currentSuggestions: { [key: string]: string[] } = useMemo(() => {
//     switch (chatMode) {
//       case 'faq': return FAQ_SUGGESTIONS;
//       case 'legal': return LEGAL_SUGGESTIONS;
//       case 'ai': return AI_SUGGESTIONS;
//       default: return {};
//     }
//   }, [chatMode]);

//   return (
//     <>
//       <div className="fixed bottom-5 right-5 z-[100]">
//         <AnimatePresence>{!isOpen && ( <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Button onClick={handleOpen} className="rounded-full h-16 w-16 bg-blue-600 shadow-lg hover:bg-blue-700 hover:scale-105 transition-transform" aria-label="Open chat"><MessageSquare className="h-8 w-8 text-white" /></Button></motion.div>)}</AnimatePresence>
//       </div>
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}
//             className="fixed bottom-5 right-5 z-[100] w-[90vw] max-w-sm flex flex-col rounded-2xl border border-gray-200 bg-gray-50 shadow-2xl dark:border-gray-700 dark:bg-gray-900"
//           >
//             <div className="flex-shrink-0 flex items-center justify-between border-b border-gray-200 p-3 dark:border-gray-700">
//               <div className="flex items-center gap-1">
//                 <Button variant="ghost" size="icon" onClick={resetChat} className="h-8 w-8" title="Back to Mode Selection"><ArrowLeft className="h-4 w-4 text-gray-500" /></Button>
//                 <Wand2 className="h-6 w-6 text-blue-500" /><h3 className="font-semibold text-gray-800 dark:text-white">AI Career Assistant</h3>
//               </div>
//               <Button variant="ghost" size="icon" onClick={handleClose} className="h-8 w-8" title="Close Chat"><X className="h-5 w-5 text-gray-500" /></Button>
//             </div>
//             <div className="flex-grow h-96 overflow-y-auto p-4 space-y-4 bg-white dark:bg-gray-800">
//               {messages.map((m) => (
//                 <div key={m.id} className={`flex items-start gap-2.5 group ${m.role === "user" ? "justify-end" : "justify-start"}`}>
//                   <div className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm whitespace-pre-wrap shadow-sm ${ m.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"}`}>
//                     <ReactMarkdown className="prose prose-sm dark:prose-invert max-w-none prose-p:my-0 prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5" remarkPlugins={[remarkGfm]} components={MarkdownComponents}>{m.content}</ReactMarkdown>
//                   </div>
//                   {m.role === 'assistant' && messages.length > 1 && !isLoading && (<Button variant="ghost" size="icon" className="h-6 w-6 ml-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleCopy(m.content, m.id)}>{copiedMessageId === m.id ? (<Check className="h-4 w-4 text-green-500" />) : (<Copy className="h-4 w-4 text-gray-400 hover:text-gray-600" />)}</Button>)}
//                 </div>
//               ))}
//               {isLoading && (<div className="flex justify-start"><div className="rounded-2xl bg-gray-200 px-4 py-2 text-sm dark:bg-gray-700"><div className="flex items-center gap-1.5"><span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]"></span><span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]"></span><span className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></span></div></div></div>)}
//               <div ref={messagesEndRef} />
//             </div>
//             <div className="flex-shrink-0 border-t border-gray-200 p-4 dark:border-gray-700">
//               {chatMode === null ? (
//                 <div className="flex flex-col gap-2">
//                   <p className="text-sm font-medium text-center text-gray-600 dark:text-gray-300 mb-2">How can I help you?</p>
//                   <Button variant="outline" className="justify-start hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => startChat("faq")}><BookOpen className="mr-2 h-4 w-4" /> Feature Questions</Button>
//                   <Button variant="outline" className="justify-start hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => startChat("legal")}><ShieldQuestion className="mr-2 h-4 w-4" /> Legal & Policy</Button>
//                   <Button variant="outline" className="justify-start hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => startChat("ai")}><Wand2 className="mr-2 h-4 w-4" /> General Career Advice</Button>
//                 </div>
//               ) : (
//                 <>
//                   {/* FIX: The condition to show suggestions is now based on the conversation state, not history length. */}
//                   {!isLoading && input.length === 0 && (
//                      <div className="mb-3 max-h-48 overflow-y-auto space-y-3 pr-2">
//                        {Object.entries(currentSuggestions).map(([category, prompts]) => (
//                          <div key={category}>
//                            <h4 className="text-xs font-bold uppercase text-gray-400 mb-2 sticky top-0 bg-gray-50 dark:bg-gray-800 py-1">{category}</h4>
//                            <div className="flex flex-col space-y-2">
//                              {prompts.map((prompt: string) => (
//                                <Button key={prompt} variant="outline" size="sm" className="h-auto text-xs text-left justify-start whitespace-normal" onClick={() => handleSuggestionClick(prompt)}>{prompt}</Button>
//                              ))}
//                            </div>
//                          </div>
//                        ))}
//                      </div>
//                   )}
//                   <form ref={formRef} onSubmit={handleSubmit} className="flex gap-2">
//                       <input value={input} onChange={handleInputChange} placeholder="Ask a question..." autoComplete="off" className="flex-grow rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"/>
//                       <Button type="submit" disabled={isLoading} className="rounded-lg bg-blue-600 px-4 text-white hover:bg-blue-700 disabled:bg-blue-400"><Send className="h-4 w-4" /></Button>
//                   </form>
//                 </>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default ChatAssistant;

"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  X,
  Send,
  Wand2,
  BookOpen,
  ShieldQuestion,
  Copy,
  Check,
  ArrowLeft,
  MessageCircle,
} from "lucide-react";
import ReactMarkdown, { Options } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

// --- CONFIGURATION ---
const FAQ_SUGGESTIONS: { [key: string]: string[] } = {
  "Core Resume Building": [
    "Is AI Resume Pro free to use?",
    "What is the AI Resume Wizard and how does it work?",
    "What's the difference between the Wizard and the Builder?",
    "How does the Resume Audit help improve my existing resume?",
    "Can I use the Resume Lab to rewrite specific sections?",
  ],
  "Interview & Application Tools": [
    "Tell me about the AI Interview Simulator.",
    "How does the Cover Letter Generator work?",
    "What can I do with the Smart Job Tracker?",
    "Where can I find sample questions in the Interview Question Library?",
  ],
  "Profile & Networking": [
    "Explain the Public Profile Hub.",
    "How do I share a success story?",
    "What is the purpose of a Resume Review Request?",
  ],
  "General Platform Questions": [
    "Is AI Resume Pro really free to use?",
    "What are all the features offered on the platform?",
    "How do I get started?",
  ],
};
const LEGAL_SUGGESTIONS: { [key: string]: string[] } = {
  "Your Data & Privacy": [
    "How is my personal data protected on AI Resume Pro?",
    "What is your Privacy Policy?",
    "Explain the Data Policy and how my information is used.",
    "Can I delete all my data from the platform?",
  ],
  "Platform Rules & Content": [
    "What are the Terms of Use for this website?",
    "What is the AI Usage Policy?",
    "Tell me about the policy on User-Generated Content.",
    "Are there any restrictions on how I can use the AI tools?",
  ],
};
const AI_SUGGESTIONS: { [key: string]: string[] } = {
  "Resume & CV Crafting": [
    "Give me 3 powerful bullet points for a sales role.",
    "How do I write a resume summary with no experience?",
    "Should I write a one-page or two-page resume?",
    "What's the best way to list my skills on a resume?",
  ],
  "Cover Letter Strategy": [
    "Write a short, impactful opening for a cover letter.",
    "How do I address a cover letter if I don't know the hiring manager's name?",
    "What's a common mistake to avoid in a cover letter?",
  ],
  "Interview Preparation": [
    "How should I answer 'What is your greatest weakness'?",
    "Give me some good questions to ask the interviewer at the end.",
    "What is the STAR method for answering behavioral questions?",
    "How do I prepare for a video interview?",
  ],
  "Career Growth & Networking": [
    "What are some tips to optimize my LinkedIn profile?",
    "How can I negotiate a higher salary?",
    "Suggest a professional way to follow up after an interview.",
  ],
};

// --- TYPE DEFINITIONS & COMPONENTS ---
type ChatMode = "faq" | "ai" | "legal" | null;

const CodeBlock = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const match = /language-(\w+)/.exec(className || "");
  return match ? (
    <SyntaxHighlighter
      style={vscDarkPlus as any}
      PreTag="div"
      language={match[1]}
    >
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <code
      className={`rounded-sm bg-gray-200 px-1 py-0.5 dark:bg-gray-700 ${className}`}
    >
      {children}
    </code>
  );
};
const MarkdownComponents: Options["components"] = {
  code({ className, children, ...props }) {
    const isBlock = /language-(\w+)/.exec(className || "");
    return isBlock ? (
      <CodeBlock className={className} {...props}>
        {children}
      </CodeBlock>
    ) : (
      <code
        className={`rounded-sm bg-gray-200 px-1 py-0.5 dark:bg-gray-700 ${className}`}
        {...props}
      >
        {children}
      </code>
    );
  },
};

// --- MAIN COMPONENT ---
const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTeaserVisible, setIsTeaserVisible] = useState(false);
  const TEASER_DELAY = 15000; // 15 seconds
  // const TEASER_SEEN_KEY = "chatTeaserSeen";

  const [chatMode, setChatMode] = useState<ChatMode>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [showHintScreen, setShowHintScreen] = useState<boolean>(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [suggestionBoxHeight, setSuggestionBoxHeight] = useState(144);
  const isResizingRef = useRef(false);
  const startYRef = useRef(0);
  const startHeightRef = useRef(0);

  const {
    messages,
    setMessages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading,
    append,
  } = useChat({
    api: "/api/chat",
    body: { mode: chatMode },
  });

  useEffect(() => {
    // If the main chat window is already open, do nothing.
    if (isOpen) return;

    // Otherwise, set a timer to show the pop-up. - increased delay
    const timer = setTimeout(() => {
      setIsTeaserVisible(true);
    }, TEASER_DELAY);

    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (messages[messages.length - 1]?.role === "user") {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isResizingRef.current = true;
    startYRef.current = e.clientY;
    startHeightRef.current = suggestionBoxHeight;
    e.preventDefault();
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizingRef.current) return;
    const deltaY = e.clientY - startYRef.current;
    const newHeight = startHeightRef.current - deltaY;

    const minHeight = 80;
    const maxHeight = 300;
    const clampedHeight = Math.max(minHeight, Math.min(newHeight, maxHeight));

    setSuggestionBoxHeight(clampedHeight);
  }, []);

  const handleMouseUp = useCallback(() => {
    isResizingRef.current = false;
  }, []);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isOpen, handleMouseMove, handleMouseUp]);

  const resetChat = () => {
    setChatMode(null);
    setMessages([]);
    setInput("");
  };
  const handleOpen = () => {
    setIsOpen(true);
    if (isTeaserVisible) setIsTeaserVisible(false);
  };
  const handleClose = () => {
    setIsOpen(false);
    resetChat();
  };

  const handleDismissTeaser = () => {
    setIsTeaserVisible(false);
  };

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedMessageId(id);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  const handleSuggestionClick = (prompt: string) => {
    append({ content: prompt, role: "user" });
  };

  const startChat = (mode: ChatMode) => {
    setChatMode(mode);
    setMessages([
      {
        id: "welcome-message",
        role: "assistant",
        content:
          mode === "faq"
            ? "Welcome! Ask about any feature or choose a suggestion to learn more."
            : mode === "legal"
              ? "Welcome! Ask about our policies or select a topic."
              : "Welcome! I'm your AI Career Assistant. Ask me any career-related question.",
      },
    ]);
  };

  const currentSuggestions: { [key: string]: string[] } = useMemo(() => {
    switch (chatMode) {
      case "faq":
        return FAQ_SUGGESTIONS;
      case "legal":
        return LEGAL_SUGGESTIONS;
      case "ai":
        return AI_SUGGESTIONS;
      default:
        return {};
    }
  }, [chatMode]);

  return (
    <>
      <AnimatePresence>
        {isTeaserVisible && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-5 z-[99] w-64 rounded-xl bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 dark:bg-gray-800 dark:ring-white/10"
          >
            <button
              onClick={handleDismissTeaser}
              className="absolute right-2 top-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              aria-label="Dismiss welcome message"
            >
              <X size={18} />
            </button>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
              Need help?
            </p>
            <p className="mb-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
              Ask me anything about resumes, interviews, or our platform
              features!
            </p>
            <Button onClick={handleOpen} className="w-full" size="sm">
              Ask a Question
            </Button>
            {/* This creates the small triangle pointer */}
            <div className="absolute -bottom-2 right-6 h-4 w-4 rotate-45 bg-white dark:bg-gray-800" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-5 right-5 z-[100]">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <Button
                onClick={handleOpen}
                className="h-16 w-16 rounded-full bg-blue-600 shadow-lg transition-transform hover:scale-105 hover:bg-blue-700"
                aria-label="Open chat"
              >
                <MessageSquare className="h-8 w-8 text-white" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-5 right-5 z-[100] flex h-[80vh] max-h-[700px] min-h-[450px] w-[90vw] max-w-sm flex-col rounded-2xl border border-gray-200 bg-gray-50 shadow-2xl dark:border-gray-700 dark:bg-gray-900"
          >
            <div className="flex flex-shrink-0 items-center justify-between border-b border-gray-200 p-3 dark:border-gray-700">
              <div className="flex items-center gap-1">
                {chatMode !== null && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={resetChat}
                    className="h-8 w-8"
                    title="Back to Mode Selection"
                  >
                    <ArrowLeft className="h-4 w-4 text-gray-500" />
                  </Button>
                )}
                <Wand2 className="h-6 w-6 text-blue-500" />
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  AI Career Suite
                </h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="h-8 w-8"
                title="Close Chat"
              >
                <X className="h-5 w-5 text-gray-500" />
              </Button>
            </div>

            <div className="flex-grow space-y-4 overflow-y-auto bg-white p-4 dark:bg-gray-800">
              {messages.map((m) => {
                return (
                  <div
                    key={m.id}
                    className={`group flex items-start gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] whitespace-normal rounded-xl px-3.5 py-2.5 text-xs shadow-sm ${m.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"}`}
                    >
                      {/* FIX: Reduced line-height for more compact text */}
                      <ReactMarkdown
                        className={` ${m.role === "user" && "text-white"} prose-xs prose flex max-w-none flex-col dark:prose-invert prose-p:my-1 prose-p:leading-snug prose-ol:my-2 prose-ul:my-2 prose-li:my-0.5`}
                        remarkPlugins={[remarkGfm]}
                        components={MarkdownComponents}
                      >
                        {m.content}
                      </ReactMarkdown>
                    </div>
                    {m.role === "assistant" &&
                      messages.length > 1 &&
                      !isLoading && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-1 h-6 w-6 flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                          onClick={() => handleCopy(m.content, m.id)}
                        >
                          {copiedMessageId === m.id ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                          )}
                        </Button>
                      )}
                  </div>
                );
              })}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl bg-gray-200 px-4 py-2 text-sm dark:bg-gray-700">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]"></span>
                      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]"></span>
                      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {showHintScreen && !isLoading && (
              <div className="flex-shrink-0 border-t border-gray-200 bg-gray-50 p-4 dark:bg-gray-900">
                {chatMode === null ? (
                  <div className="flex flex-col gap-2">
                    <p className="mb-2 text-center text-sm font-medium text-gray-600 dark:text-gray-300">
                      How can I help you?
                    </p>
                    <Button
                      variant="outline"
                      className="justify-start hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => startChat("faq")}
                    >
                      <BookOpen className="mr-2 h-4 w-4" /> Feature Questions
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => startChat("legal")}
                    >
                      <ShieldQuestion className="mr-2 h-4 w-4" /> Legal & Policy
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => startChat("ai")}
                    >
                      <Wand2 className="mr-2 h-4 w-4" /> General Career Advice
                    </Button>
                  </div>
                ) : (
                  <>
                    {
                      //!isLoading &&
                      // input.length === 0 &&
                      messages.length >= 1 && (
                        // FIX: Added margin-bottom to this container to create space before the input form.
                        <div className="mb-2 flex flex-col items-center gap-2">
                          {/* FIX: Removed margin from handle itself for tighter layout. */}
                          <div
                            className="flex h-full w-full cursor-ns-resize items-center justify-center"
                            onMouseDown={handleMouseDown}
                          >
                            <div
                              className="h-1.5 w-12 cursor-ns-resize rounded-full bg-gray-300 dark:bg-gray-600"
                              title="Drag to resize"
                            />
                          </div>
                          <div
                            style={{ height: `${suggestionBoxHeight}px` }}
                            className="w-full space-y-3 overflow-y-auto pr-2 pt-2"
                          >
                            {Object.entries(currentSuggestions).map(
                              ([category, prompts]) => (
                                <div key={category}>
                                  <h4 className="relative top-0 mb-1.5 bg-gray-50 py-1 text-xs font-bold uppercase text-gray-400 dark:bg-gray-900">
                                    {category}
                                  </h4>
                                  <div className="flex flex-col space-y-2">
                                    {prompts.map((prompt: string) => (
                                      <Button
                                        key={prompt}
                                        variant="outline"
                                        size="sm"
                                        className="h-auto justify-start whitespace-normal border-r-[6px] pb-[1px] pt-[1px] text-left text-xs md:pb-[2px] md:pt-[2px]"
                                        onClick={() =>
                                          handleSuggestionClick(prompt)
                                        }
                                      >
                                        {prompt}
                                      </Button>
                                    ))}
                                  </div>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      )
                    }
                  </>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex gap-1 p-4">
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask a question..."
                autoComplete="off"
                aria-label="Chat input"
                className="w-[67%] flex-grow rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="rounded-lg bg-blue-600 px-4 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                className="rounded-lg bg-blue-600 px-4 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isLoading}
                onClick={() => {
                  setChatMode(null);
                  setShowHintScreen((state) => !state);
                }}
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatAssistant;
