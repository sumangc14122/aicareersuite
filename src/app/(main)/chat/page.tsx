// src/app/chat/page.tsx
import React from "react";
import ChatInterface from "@/components/ChatInterface";

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
      <h1 className="mb-6 text-center text-3xl font-bold text-gray-800 dark:text-gray-100">
        AI Career Chatbot
      </h1>
      <ChatInterface />
    </div>
  );
}
