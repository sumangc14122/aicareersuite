// // src/components/ChatInterface.tsx
// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { useUser } from "@clerk/nextjs";
// import { loadStripe } from "@stripe/stripe-js";
// import useSWR from "swr";
// import ReactMarkdown from "react-markdown";
// import { Trash2 } from "lucide-react";

// const TOPICS = [
//   { value: "Resume optimization", label: "Optimize my resume" },
//   { value: "Interview prep", label: "Interview questions" },
//   { value: "Coding challenges", label: "Practice coding" },
//   { value: "Career advice", label: "General career advice" },
// ];

// async function fetcher(url: string) {
//   const res = await fetch(url);
//   if (!res.ok) throw new Error("Fetch error");
//   return res.json();
// }

// export default function ChatInterface() {
//   const { isSignedIn, user } = useUser();
//   const [isPro, setIsPro] = useState(false);
//   const [isSending, setIsSending] = useState(false);

//   // ── Sessions & selection ─────────────────────────────────────────────────
//   const { data: sessions = [], mutate: reloadSessions } = useSWR(
//     "/api/chat-sessions",
//     fetcher,
//   );
//   const [selectedId, setSelectedId] = useState<string | null>(null);

//   // ── Messages for current session ─────────────────────────────────────────
//   const { data: messages = [], mutate: reloadMessages } = useSWR(
//     selectedId ? `/api/chat-sessions/${selectedId}/messages` : null,
//     fetcher,
//   );

//   // ── New-session form state ───────────────────────────────────────────────
//   const [newName, setNewName] = useState("");
//   const [newTopic, setNewTopic] = useState(TOPICS[0].value);

//   // ── Delete-modals state ─────────────────────────────────────────────────
//   const [showDelSess, setShowDelSess] = useState(false);
//   const [delSessId, setDelSessId] = useState<string | null>(null);
//   const [showDelMsg, setShowDelMsg] = useState(false);
//   const [delMsgId, setDelMsgId] = useState<string | null>(null);

//   // ── Chat input ───────────────────────────────────────────────────────────
//   const [input, setInput] = useState("");

//   // ── Bypass pro in dev else fetch profile.isPro ──────────────────────────
//   useEffect(() => {
//     if (process.env.NODE_ENV === "development") {
//       return void setIsPro(true);
//     }
//     if (!isSignedIn) return;
//     fetch(`/api/profile/${user!.id}`)
//       .then((r) => r.json())
//       .then((p) => setIsPro(p.isPro))
//       .catch(() => setIsPro(false));
//   }, [isSignedIn, user]);

//   // ── Auto-select first session when loaded ────────────────────────────────
//   useEffect(() => {
//     if (sessions.length && !selectedId) {
//       setSelectedId(sessions[0].id);
//     }
//   }, [sessions, selectedId]);

//   // ── Auto-scroll to bottom on new messages ────────────────────────────────
//   const scrollRef = useRef<HTMLDivElement>(null);
//   useEffect(() => {
//     scrollRef.current?.scrollTo({
//       top: scrollRef.current.scrollHeight,
//       behavior: "smooth",
//     });
//   }, [messages]);

//   // ── Handlers ─────────────────────────────────────────────────────────────

//   // create
//   const createSession = async () => {
//     if (!newName.trim()) return;
//     await fetch("/api/chat-sessions", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name: newName.trim(), topic: newTopic }),
//     });
//     setNewName("");
//     reloadSessions();
//   };

//   interface Message {
//     id: string | number;
//     role: "assistant" | "user";
//     createdAt: string | Date;
//     content: string;
//   }

//   // send
//   const sendMessage = async () => {
//     // if (!input.trim() || !selectedId) return;
//     // await fetch(`/api/chat-sessions/${selectedId}/messages`, {
//     if (!input.trim() || !selectedId || isSending) return;
//     setIsSending(true);
//     try {
//       await fetch(`/api/chat-sessions/${selectedId}/messages`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ content: input.trim() }),
//       });
//       setInput("");
//       reloadMessages();
//     } finally {
//       setIsSending(false);
//     }
//   };

//   // prompt delete session
//   const onDelSess = (id: string) => {
//     setDelSessId(id);
//     setShowDelSess(true);
//   };
//   // confirm delete session
//   const confirmDelSess = async () => {
//     if (!delSessId) return;
//     const res = await fetch(`/api/chat-sessions/${delSessId}`, {
//       method: "DELETE",
//     });
//     if (res.ok) {
//       if (delSessId === selectedId) setSelectedId(null);
//       reloadSessions();
//     } else {
//       console.error("Failed to delete session", await res.text());
//     }
//     setShowDelSess(false);
//     setDelSessId(null);
//   };

//   // prompt delete message
//   const onDelMsg = (id: string) => {
//     setDelMsgId(id);
//     setShowDelMsg(true);
//   };
//   // confirm delete message
//   const confirmDelMsg = async () => {
//     if (!selectedId || !delMsgId) return;
//     await fetch(`/api/chat-sessions/${selectedId}/messages/${delMsgId}`, {
//       method: "DELETE",
//     });
//     reloadMessages();
//     setShowDelMsg(false);
//     setDelMsgId(null);
//   };

//   // subscribe
//   const subscribe = async () => {
//     const res = await fetch("/api/subscribe", { method: "POST" });
//     const { url } = await res.json();
//     const stripe = await loadStripe(
//       process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
//     );
//     stripe!.redirectToCheckout({
//       sessionId: url.split("session_id=")[1],
//     });
//   };

//   // ── Access gates ──────────────────────────────────────────────────────────
//   if (!isSignedIn) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
//         <p className="text-xl font-semibold text-gray-800">
//           Please sign in to access the chat.
//         </p>
//       </div>
//     );
//   }
//   if (!isPro) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
//         <div className="max-w-md rounded-xl bg-white p-6 text-center shadow-lg">
//           <p className="mb-6 text-lg text-gray-700">
//             Chat is for <strong>Pro</strong> users only.
//           </p>
//           <button
//             onClick={subscribe}
//             className="rounded-lg bg-teal-500 px-6 py-3 text-white hover:bg-teal-600"
//           >
//             Upgrade to Pro
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ── Main layout ───────────────────────────────────────────────────────────
//   return (
//     <div className="flex h-screen flex-col gap-6 bg-gradient-to-br from-pink-100 to-purple-100 p-4 md:flex-row">
//       {/* ─ Sidebar ────────────────────────────────────────────────────────────── */}
//       <aside className="w-full rounded-xl bg-white/90 p-6 shadow-lg md:w-80">
//         <h2 className="mb-6 text-2xl font-bold">Your Sessions</h2>

//         {/* new session */}
//         <div className="mb-6 space-y-4">
//           <div>
//             <label className="mb-2 block text-sm font-medium">
//               Session Name
//             </label>
//             <input
//               value={newName}
//               onChange={(e) => setNewName(e.target.value)}
//               placeholder="e.g. Resume Chat"
//               className="w-full rounded-lg border bg-gray-50 px-4 py-2 focus:ring-2 focus:ring-teal-500"
//             />
//           </div>
//           <div>
//             <label className="mb-2 block text-sm font-medium">Topic</label>
//             <select
//               value={newTopic}
//               onChange={(e) => setNewTopic(e.target.value)}
//               className="w-full rounded-lg border bg-gray-50 px-4 py-2 focus:ring-2 focus:ring-teal-500"
//             >
//               {TOPICS.map((t) => (
//                 <option key={t.value} value={t.value}>
//                   {t.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <button
//             onClick={createSession}
//             disabled={!newName.trim()}
//             className="w-full rounded-lg bg-teal-500 py-2 text-white hover:bg-teal-600 disabled:bg-gray-400"
//           >
//             Create Session
//           </button>
//         </div>

//         {/* session list */}
//         {sessions.length === 0 ? (
//           <p className="text-sm text-gray-500">No sessions yet.</p>
//         ) : (
//           <div className="max-h-[50vh] space-y-2 overflow-auto">
//             {/* {sessions.map((s) => ( */}
//             {sessions.map((s: { id: string; name: string }) => (
//               <div
//                 key={s.id}
//                 className={`flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 ${
//                   s.id === selectedId ? "bg-teal-100" : "hover:bg-gray-100"
//                 }`}
//                 onClick={() => setSelectedId(s.id)}
//               >
//                 <span className="truncate">{s.name}</span>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     onDelSess(s.id);
//                   }}
//                   className="p-1 text-red-500 hover:text-red-700"
//                 >
//                   <Trash2 size={16} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </aside>

//       {/* ─ Chat pane ──────────────────────────────────────────────────────────── */}
//       <div className="flex flex-1 flex-col rounded-xl bg-white/90 p-6 shadow-lg">
//         {!selectedId ? (
//           <div className="flex flex-1 items-center justify-center">
//             <p className="text-lg text-gray-500">
//               Select or create a session to start.
//             </p>
//           </div>
//         ) : (
//           <>
//             {/* messages (flex-grow + scroll) */}
//             {/* <div ref={scrollRef} className="flex-1 space-y-4 overflow-auto">
//               {messages.map((m: any) => (
//                 <div
//                   key={m.id}
//                   className={`flex ${
//                     m.role === "assistant" ? "justify-start" : "justify-end"
//                   }`}
//                 >
//                   <div
//                     className={`relative max-w-[75%] rounded-lg p-3 shadow-md ${
//                       m.role === "assistant" ? "bg-gray-100" : "bg-teal-100"
//                     }`}
//                   >
//                     <div className="mb-1 flex items-center text-xs text-gray-600">
//                       <span className="mr-2">
//                         {new Date(m.createdAt).toLocaleTimeString([], {
//                           hour: "2-digit",
//                           minute: "2-digit",
//                         })}
//                       </span>
//                       <span>
//                         {m.role === "assistant" ? "AI" : user!.firstName}
//                       </span>
//                     </div>
//                     <div className="prose">
//                       <ReactMarkdown>{m.content}</ReactMarkdown>
//                     </div>
//                     <button
//                       onClick={() => onDelMsg(m.id)}
//                       className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
//                     >
//                       <Trash2 size={14} />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div> */}

//             <div ref={scrollRef} className="flex-1 space-y-4 overflow-auto">
//               {messages.map((m: Message) => (
//                 <div
//                   key={m.id}
//                   className={`flex ${
//                     m.role === "assistant" ? "justify-start" : "justify-end"
//                   }`}
//                 >
//                   <div
//                     className={`relative max-w-[75%] rounded-lg p-3 shadow-md ${
//                       m.role === "assistant" ? "bg-gray-100" : "bg-teal-100"
//                     }`}
//                   >
//                     <div className="mb-1 flex items-center text-xs text-gray-600">
//                       <span className="mr-2">
//                         {new Date(m.createdAt).toLocaleTimeString([], {
//                           hour: "2-digit",
//                           minute: "2-digit",
//                         })}
//                       </span>
//                       <span>
//                         {m.role === "assistant" ? "AI" : user!.firstName}
//                       </span>
//                     </div>
//                     <div className="prose">
//                       <ReactMarkdown>{m.content}</ReactMarkdown>
//                     </div>
//                     <button
//                       // onClick={() => onDelMsg(m.id)}
//                       onClick={() => onDelMsg(String(m.id))}
//                       className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
//                     >
//                       <Trash2 size={14} />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* input bar (fixed height) */}
//             <div className="mt-4 flex flex-shrink-0 gap-4">
//               <textarea
//                 rows={2}
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 className="flex-1 resize-none rounded-lg border bg-gray-50 px-4 py-2 focus:ring-2 focus:ring-teal-500"
//                 placeholder="Type your message…"
//               />
//               {/* <button
//                 onClick={sendMessage}
//                 disabled={!input.trim()}
//                 className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:bg-gray-400"
//               >
//                 Send
//               </button> */}
//               +{" "}
//               <button
//                 onClick={sendMessage}
//                 disabled={!input.trim() || isSending}
//                 className={`rounded-lg px-6 py-2 text-white transition-colors ${
//                   isSending
//                     ? "cursor-wait bg-gray-400"
//                     : "bg-teal-500 hover:bg-teal-600 disabled:bg-gray-400"
//                 } `}
//               >
//                 {isSending ? "Sending…" : "Send"}
//               </button>
//             </div>
//           </>
//         )}
//       </div>

//       {/* ─ Delete-Session Modal ───────────────────────────────────────────────── */}
//       {showDelSess && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//           <div className="w-80 rounded-lg bg-white p-6 shadow-xl">
//             <h3 className="mb-4 text-lg font-semibold">Delete Session?</h3>
//             <p className="mb-6 text-sm">
//               This will remove the session <em>and all its messages</em>.
//             </p>
//             <div className="flex justify-end space-x-2">
//               <button
//                 onClick={() => setShowDelSess(false)}
//                 className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmDelSess}
//                 className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ─ Delete-Message Modal ───────────────────────────────────────────────── */}
//       {showDelMsg && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//           <div className="w-80 rounded-lg bg-white p-6 shadow-xl">
//             <h3 className="mb-4 text-lg font-semibold">Delete Message?</h3>
//             <p className="mb-6 text-sm">
//               This will remove the selected message.
//             </p>
//             <div className="flex justify-end space-x-2">
//               <button
//                 onClick={() => setShowDelMsg(false)}
//                 className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmDelMsg}
//                 className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";
import React, { useState, useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import useSWR from "swr";
import ReactMarkdown from "react-markdown";
import { Trash2 } from "lucide-react";

const TOPICS = [
  { value: "Resume optimization", label: "Optimize my resume" },
  { value: "Interview prep", label: "Interview questions" },
  { value: "Coding challenges", label: "Practice coding" },
  { value: "Career advice", label: "General career advice" },
];

async function fetcher(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Fetch error");
  return res.json();
}

interface Session {
  id: string;
  name: string;
}

interface Message {
  id: string | number;
  role: "assistant" | "user";
  createdAt: string | Date;
  content: string;
}

export default function ChatInterface() {
  const { isSignedIn, user } = useUser();
  const [isSending, setIsSending] = useState(false);

  // Sessions & selection
  const { data: sessions = [], mutate: reloadSessions } = useSWR<Session[]>(
    "/api/chat-sessions",
    fetcher,
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Messages for current session
  const { data: messages = [], mutate: reloadMessages } = useSWR<Message[]>(
    selectedId ? `/api/chat-sessions/${selectedId}/messages` : null,
    fetcher,
  );

  // New-session form state
  const [newName, setNewName] = useState("");
  const [newTopic, setNewTopic] = useState(TOPICS[0].value);

  // Delete-modals state
  const [showDelSess, setShowDelSess] = useState(false);
  const [delSessId, setDelSessId] = useState<string | null>(null);
  const [showDelMsg, setShowDelMsg] = useState(false);
  const [delMsgId, setDelMsgId] = useState<string | null>(null);

  // Chat input
  const [input, setInput] = useState("");

  // Auto-select first session when loaded
  useEffect(() => {
    if (sessions.length && !selectedId) {
      setSelectedId(sessions[0].id);
    }
  }, [sessions, selectedId]);

  // Auto-scroll to bottom on new messages
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  // Handlers

  // create
  const createSession = async () => {
    if (!newName.trim()) return;
    try {
      await fetch("/api/chat-sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName.trim(), topic: newTopic }),
      });
      setNewName("");
      reloadSessions();
    } catch (error) {
      console.error("Failed to create session:", error);
    }
  };

  // send
  const sendMessage = async () => {
    if (!input.trim() || !selectedId || isSending) return;
    setIsSending(true);
    try {
      await fetch(`/api/chat-sessions/${selectedId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: input.trim() }),
      });
      setInput("");
      reloadMessages();
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
    }
  };

  // prompt delete session
  const onDelSess = (id: string) => {
    setDelSessId(id);
    setShowDelSess(true);
  };
  // confirm delete session
  const confirmDelSess = async () => {
    if (!delSessId) return;
    const res = await fetch(`/api/chat-sessions/${delSessId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      if (delSessId === selectedId) setSelectedId(null);
      reloadSessions();
    } else {
      console.error("Failed to delete session", await res.text());
    }
    setShowDelSess(false);
    setDelSessId(null);
  };

  // prompt delete message
  const onDelMsg = (id: string) => {
    setDelMsgId(id);
    setShowDelMsg(true);
  };
  // confirm delete message
  const confirmDelMsg = async () => {
    if (!selectedId || !delMsgId) return;
    await fetch(`/api/chat-sessions/${selectedId}/messages/${delMsgId}`, {
      method: "DELETE",
    });
    reloadMessages();
    setShowDelMsg(false);
    setDelMsgId(null);
  };

  // Access gates
  if (!isSignedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
        <p className="text-xl font-semibold text-gray-800">
          Please sign in to access the chat.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-max flex-col gap-6 bg-gradient-to-br from-pink-100 to-purple-100 p-4 md:flex-row">
      {/* Sidebar */}
      <aside className="w-full rounded-xl bg-white/90 p-6 shadow-lg md:w-80">
        <h2 className="mb-6 text-2xl font-bold dark:text-black">
          Your Sessions
        </h2>

        {/* new session */}
        <div className="mb-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium dark:text-black">
              Session Name
            </label>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. Resume Chat"
              className="w-full rounded-lg border bg-gray-50 px-4 py-2 dark:text-black"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium dark:text-black">
              Topic
            </label>
            <select
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
              className="w-full rounded-lg border bg-gray-50 px-4 py-2 dark:text-black"
            >
              {TOPICS.map((t) => (
                <option
                  key={t.value}
                  value={t.value}
                  className="text-sm dark:text-black"
                >
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={createSession}
            disabled={!newName.trim()}
            className="w-full rounded-lg bg-teal-500 py-2 text-white hover:bg-teal-600 disabled:bg-gray-400"
          >
            Create Session
          </button>
        </div>

        {/* session list */}
        {sessions.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-black">
            No sessions yet.
          </p>
        ) : (
          <div className="max-h-[50vh] space-y-2 overflow-auto">
            {sessions.map((s) => (
              <div
                key={s.id}
                className={`flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 ${
                  s.id === selectedId ? "bg-teal-100" : "hover:bg-gray-100"
                }`}
                onClick={() => setSelectedId(s.id)}
              >
                <span className="truncate dark:text-black">{s.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelSess(s.id);
                  }}
                  className="p-1 text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* Chat pane */}
      <div className="flex flex-1 flex-col rounded-xl bg-white/90 p-6 shadow-lg">
        {!selectedId ? (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-lg text-gray-500 dark:text-black">
              Select or create a session to start.
            </p>
          </div>
        ) : (
          <>
            {/* messages (flex-grow + scroll) */}
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-auto">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${
                    m.role === "assistant" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`relative max-w-[75%] rounded-lg p-3 shadow-md ${
                      m.role === "assistant" ? "bg-gray-100" : "bg-teal-100"
                    }`}
                  >
                    <div className="mb-1 flex items-center text-xs text-gray-600">
                      <span className="mr-2 dark:text-black">
                        {new Date(m.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <span>
                        {m.role === "assistant" ? "AI" : user!.firstName}
                      </span>
                    </div>
                    <div className="prose">
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                    <button
                      onClick={() => onDelMsg(String(m.id))}
                      className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* input bar (fixed height) */}
            <div className="mt-4 flex flex-shrink-0 gap-4">
              <textarea
                rows={2}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 resize-none rounded-lg border bg-gray-50 px-4 py-2 dark:text-black"
                placeholder="Type your message…"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isSending}
                className={`rounded-lg px-6 py-2 text-white transition-colors dark:text-black ${
                  isSending
                    ? "cursor-wait bg-gray-400"
                    : "bg-teal-500 hover:bg-teal-600 disabled:bg-gray-400"
                }`}
              >
                {isSending ? "Sending…" : "Send"}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Delete-Session Modal */}
      {showDelSess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-80 rounded-lg bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-lg font-semibold dark:text-black">
              Delete Session?
            </h3>
            <p className="mb-6 text-sm dark:text-black">
              This will remove the session <em>and all its messages</em>.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDelSess(false)}
                className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300 dark:text-black"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelSess}
                className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete-Message Modal */}
      {showDelMsg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-80 rounded-lg bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-lg font-semibold dark:text-black">
              Delete Message?
            </h3>
            <p className="mb-6 text-sm dark:text-black">
              This will remove the selected message.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDelMsg(false)}
                className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300 dark:text-black"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelMsg}
                className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
