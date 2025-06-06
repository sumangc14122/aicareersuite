"use client";
import React, { useRef, useState } from "react";

interface AudioRecorderProps {
  onAudioComplete: (blob: Blob) => void;
}

export default function AudioRecorder({ onAudioComplete }: AudioRecorderProps) {
  const recorderRef = useRef<MediaRecorder>();
  const [chunks, setChunks] = useState<BlobPart[]>([]);
  const [recording, setRecording] = useState(false);

  const start = async () => {
    setChunks([]);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const rec = new MediaRecorder(stream);
    rec.ondataavailable = (e) => setChunks((c) => [...c, e.data]);
    rec.start();
    recorderRef.current = rec;
    setRecording(true);
  };

  const stop = () => {
    const rec = recorderRef.current;
    if (!rec) return;
    rec.onstop = () => {
      const blob = new Blob(chunks, { type: "audio/webm" });
      onAudioComplete(blob);
    };
    rec.stop();
    setRecording(false);
  };

  return (
    <button
      onMouseDown={start}
      onMouseUp={stop}
      onTouchStart={start}
      onTouchEnd={stop}
      className={`rounded px-4 py-2 ${
        recording ? "bg-red-500 text-white" : "bg-gray-200"
      }`}
    >
      {recording ? "Recording…" : "Hold to Record"}
    </button>
  );
}
