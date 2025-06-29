// "use client";

// import { useState, useEffect } from "react";
// import { useUser } from "@clerk/nextjs";
// import { loadStripe } from "@stripe/stripe-js";

// export default function ChatBot() {
//   const { isSignedIn, user } = useUser();
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState<
//     { from: "user" | "bot"; text: string }[]
//   >([]);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   // fetch profile/isPro on mount
//   // const [isPro, setIsPro] = useState(false);
//   // useEffect(() => {
//   //   if (!isSignedIn) return;
//   //   fetch(`/api/profile/${user!.id}`)
//   //     .then((r) => r.json())
//   //     .then((p) => setIsPro(p.isPro))
//   //     .catch(() => {});
//   // }, [isSignedIn, user]);

//   const [isPro, setIsPro] = useState(false);

//   useEffect(() => {
//     if (process.env.NODE_ENV === "development") {
//       setIsPro(true);
//       return;
//     }
//     if (!isSignedIn) return;
//     fetch(`/api/profile/${user!.id}`)
//       .then((r) => r.json())
//       .then((p) => setIsPro(p.isPro))
//       .catch(() => {});
//   }, [isSignedIn, user]);

//   const handleSend = async () => {
//     if (!input.trim()) return;
//     setMessages((m) => [...m, { from: "user", text: input }]);
//     setInput("");
//     setLoading(true);
//     const res = await fetch("/api/chatbot", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ message: input }),
//     });
//     const data = await res.json();
//     if (res.ok) {
//       setMessages((m) => [...m, { from: "bot", text: data.reply }]);
//     } else {
//       setError(data.error || "Chat failed");
//     }
//     setLoading(false);
//   };

//   const subscribe = async () => {
//     const res = await fetch("/api/subscribe", { method: "POST" });
//     const { url } = await res.json();
//     const stripe = await loadStripe(
//       process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
//     );
//     stripe!.redirectToCheckout({ sessionId: url.split("session_id=")[1] });
//   };

//   if (!isSignedIn) {
//     return <p className="p-4">Sign in to use the chat.</p>;
//   }

//   if (!isPro) {
//     return (
//       <div className="rounded border p-4 text-center">
//         <p>You need a Pro subscription to use the AI chat.</p>
//         <button
//           onClick={subscribe}
//           className="mt-2 rounded bg-teal-600 px-4 py-2 text-white"
//         >
//           Subscribe
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-xl space-y-4 rounded border p-4">
//       <div className="h-64 space-y-2 overflow-auto">
//         {messages.map((m, i) => (
//           <div
//             key={i}
//             className={m.from === "bot" ? "text-gray-700" : "text-blue-600"}
//           >
//             <strong>{m.from === "bot" ? "AI" : user?.firstName}:</strong>{" "}
//             {m.text}
//           </div>
//         ))}
//       </div>
//       {error && <p className="text-red-600">{error}</p>}
//       <div className="flex gap-2">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           className="flex-1 rounded border px-2 py-1"
//           placeholder="Ask me anything…"
//         />
//         <button
//           onClick={handleSend}
//           disabled={loading}
//           className="rounded bg-teal-600 px-4 py-1 text-white disabled:opacity-50"
//         >
//           {loading ? "…" : "Send"}
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
// import { loadStripe } from "@stripe/stripe-js";

export default function ChatBot() {
  const { isSignedIn, user } = useUser();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { from: "user" | "bot"; text: string }[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { from: "user", text: input }]);
    setInput("");
    setLoading(true);
    const res = await fetch("/api/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessages((m) => [...m, { from: "bot", text: data.reply }]);
    } else {
      setError(data.error || "Chat failed");
    }
    setLoading(false);
  };

  // const subscribe = async () => {
  //   const res = await fetch("/api/subscribe", { method: "POST" });
  //   const { url } = await res.json();
  //   const stripe = await loadStripe(
  //     process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  //   );
  //   stripe!.redirectToCheckout({ sessionId: url.split("session_id=")[1] });
  // };

  if (!isSignedIn) {
    return <p className="p-4">Sign in to use the chat.</p>;
  }

  return (
    <div className="mx-auto max-w-xl space-y-4 rounded border p-4">
      <div className="h-64 space-y-2 overflow-auto">
        {messages.map((m, i) => (
          <div
            key={i}
            className={m.from === "bot" ? "text-gray-700" : "text-blue-600"}
          >
            <strong>{m.from === "bot" ? "AI" : user?.firstName}:</strong>{" "}
            {m.text}
          </div>
        ))}
      </div>
      {error && <p className="text-red-600">{error}</p>}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 rounded border px-2 py-1"
          placeholder="Ask me anything…"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="rounded bg-teal-600 px-4 py-1 text-white disabled:opacity-50"
        >
          {loading ? "…" : "Send"}
        </button>
      </div>
    </div>
  );
}
