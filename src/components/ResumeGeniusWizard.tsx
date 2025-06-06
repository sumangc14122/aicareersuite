"use client";

import { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import { motion } from "framer-motion";

export default function ResumeGeniusWizard() {
  const [step, setStep] = useState(1);
  const [meta, setMeta] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    country: "",
  });
  const [rawText, setRawText] = useState("");
  const [transcript, setTranscript] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [resume, setResume] = useState<any>(null);

  async function handleParse(type: string, payload: any) {
    const { text } = (
      await axios.post("/api/genius-resume/parse", { type, ...payload })
    ).data;
    setRawText(text);
  }

  async function handleVoice(audioBase64: string) {
    const { transcript } = (
      await axios.post("/api/genius-resume/voice", { audioBase64 })
    ).data;
    setTranscript(transcript);
  }

  async function handleGenerate() {
    const { resume } = (
      await axios.post("/api/genius-resume/generate", {
        rawText,
        transcript,
        jobUrl,
        skills,
        meta,
      })
    ).data;
    setResume(resume);
    setStep(6);
  }

  // Utility: record audio and return base64 string
  async function recordAudio(stream: MediaStream) {
    return new Promise<string>((resolve) => {
      const recorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];
      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = async () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        const base64 = await new Promise<string>((res) => {
          const r = new FileReader();
          r.onload = () => res(r.result as string);
          r.readAsDataURL(blob);
        });
        resolve(base64);
      };
      recorder.start();
      setTimeout(() => recorder.stop(), 5000); // 5s max
    });
  }

  return (
    <div className="mx-auto max-w-lg p-4">
      {/* Step headers */}
      <div className="mb-4 flex text-sm text-gray-600">
        {["You", "Import", "Voice", "Skills", "Generate", "Preview"].map(
          (l, i) => (
            <div
              key={i}
              className={`flex-1 text-center ${step === i + 1 ? "font-bold" : ""}`}
            >
              {l}
            </div>
          ),
        )}
      </div>

      {/* 1. Meta */}
      {step === 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="mb-2 text-xl">Tell us about you</h2>
          {Object.keys(meta).map((k) => (
            <input
              key={k}
              placeholder={k}
              className="mb-2 block w-full border p-2"
              value={(meta as any)[k]}
              onChange={(e) => setMeta({ ...meta, [k]: e.target.value })}
            />
          ))}
          <button onClick={() => setStep(2)} className="btn">
            Next
          </button>
        </motion.div>
      )}

      {/* 2. PDF/URL Import */}
      {step === 2 && (
        <motion.div initial={{ x: 100 }} animate={{ x: 0 }}>
          <h2 className="mb-2 text-xl">Import résumé or job link</h2>
          <Dropzone
            onDrop={async (files) => {
              const file = files[0];
              const base64 = await new Promise<string>((res) => {
                const r = new FileReader();
                r.onload = () => res(r.result as string);
                r.readAsDataURL(file);
              });
              await handleParse("pdf", { file: base64 });
              setStep(3);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                className="mb-2 cursor-pointer border-2 border-dashed p-6 text-center"
              >
                <input {...getInputProps()} />
                Drag & drop PDF here or click
              </div>
            )}
          </Dropzone>
          <div className="mb-2 text-center">
            — or paste a job/LinkedIn URL —
          </div>
          <input
            placeholder="https://…"
            className="mb-2 w-full border p-2"
            value={jobUrl}
            onChange={(e) => setJobUrl(e.target.value)}
          />
          <button
            onClick={() => {
              handleParse(jobUrl.includes("linkedin") ? "linkedin" : "jobUrl", {
                url: jobUrl,
              });
              setStep(3);
            }}
            className="btn"
          >
            Import Text
          </button>
        </motion.div>
      )}

      {/* 3. Voice Kick-Off */}
      {step === 3 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="mb-2 text-xl">Or record your achievements</h2>
          <button
            onClick={async () => {
              const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
              });
              const audioBase64 = await recordAudio(stream);
              await handleVoice(audioBase64);
              setStep(4);
            }}
            className="btn"
          >
            Record 5s
          </button>
          {transcript && <p className="mt-2 italic">“{transcript}”</p>}
        </motion.div>
      )}

      {/* 4. Skills Selection */}
      {step === 4 && (
        <motion.div initial={{ x: 100 }} animate={{ x: 0 }}>
          <h2 className="mb-2 text-xl">Pick your skills</h2>
          {rawText
            .split(/\W+/)
            .filter((w) => w.length > 3)
            .slice(0, 20)
            .map((skill) => (
              <button
                key={skill}
                className={`m-1 border px-2 py-1 ${skills.includes(skill) ? "bg-blue-200" : ""}`}
                onClick={() =>
                  setSkills(
                    skills.includes(skill)
                      ? skills.filter((s) => s !== skill)
                      : [...skills, skill],
                  )
                }
              >
                {skill}
              </button>
            ))}
          <button onClick={() => setStep(5)} className="btn mt-4">
            Next
          </button>
        </motion.div>
      )}

      {/* 5. Generate */}
      {step === 5 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="mb-2 text-xl">Ready to build?</h2>
          <button onClick={handleGenerate} className="btn">
            Build Resume
          </button>
        </motion.div>
      )}

      {/* 6. Preview */}
      {step === 6 && resume && (
        <motion.div initial={{ y: 100 }} animate={{ y: 0 }}>
          <h2 className="mb-2 text-2xl">Your AI-Powered Résumé</h2>
          <p>
            <strong>ATS Score:</strong> {resume.atsScore}
          </p>
          <h3>Summary</h3>
          <p>{resume.summary}</p>
          <h3>Experience</h3>
          {resume.experiences.map((we: any, i: number) => (
            <div key={i} className="mb-2">
              <strong>
                {we.position} @ {we.company}
              </strong>
              <p>{we.description}</p>
            </div>
          ))}
          <h3>Education</h3>
          {resume.educations.map((ed: any, i: number) => (
            <div key={i}>
              <strong>
                {ed.degree} @ {ed.school}
              </strong>
            </div>
          ))}
          {/* Next: integrate Swipe Arena, Template Picker, Live ATS Re-score, Share buttons, etc. */}
        </motion.div>
      )}
    </div>
  );
}
