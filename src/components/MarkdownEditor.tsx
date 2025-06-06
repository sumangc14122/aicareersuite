// src/components/MarkdownEditor.tsx
"use client";

import React from "react";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";

// import the core CSS
import "react-markdown-editor-lite/lib/index.css";
// optional: syntax highlighting
import "highlight.js/styles/github.css";

// dynamically import so SSR doesn’t break
const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export default function MarkdownEditor({ value, onChange }: Props) {
  return (
    <MdEditor
      value={value}
      style={{ height: "300px" }}
      renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
      // configure toolbar: remove anything you don’t need
      config={{
        view: {
          menu: true,
          md: true,
          html: false,
        },
        canView: {
          fullScreen: false,
          hideMenu: false,
        },
        // Only these tools:
        toolbar: [
          "bold",
          "italic",
          "strikethrough",
          "|",
          "quote",
          "code",
          "|",
          "unordered-list",
          "ordered-list",
          "|",
          "link",
          "code-block",
          "|",
          "table",
          "clear",
          "help",
        ],
      }}
      onChange={({ text }) => onChange(text)}
    />
  );
}
