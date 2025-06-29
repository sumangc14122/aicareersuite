"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export interface Volunteering {
  role: string;
  organization: string;
  bullets: string[];
  startDate?: string; // <-- ADD
  endDate?: string; // <-- ADD
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
}

export interface Reference {
  name: string;
  contact: string;
}

export interface ResumeJSON {
  personal: {
    fullName: string;
    email: string;
    phone: string;
    city: string;
    country: string;
    linkedinUrl: string;
    jobTitle: string;
  };
  summary: string;
  workExperiences: {
    position: string;
    company: string;
    startDate?: string;
    endDate?: string;
    bullets: string[];
  }[];
  educations: {
    degree: string;
    school: string;
    startDate?: string;
    endDate?: string;
  }[];
  skills: string[];
  volunteering?: Volunteering[];
  certifications?: Certification[];
  references?: Reference[];
}

export interface ATSResult {
  score: number;
  missingKeywords: string[];
  extraKeywords: string[];
}

export function ATSScore({
  resume,
  jobDescription,
  onResult,
  runKey, // Add runKey as a prop
}: {
  resume: ResumeJSON;
  jobDescription: string;
  onResult?: (data: ATSResult) => void;
  runKey: number; // New prop to control fetch
}) {
  const [ats, setAts] = useState<ATSResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);

  const fetchScore = async () => {
    if (!jobDescription) return;
    setLoading(true);
    setAts(null); // Reset previous results
    setAnimatedScore(0); // Reset animated score
    try {
      // console.log("Fetching ATS score, runKey:", runKey); // Debug log
      const res = await axios.post<ATSResult>("/api/wizard/ats-score", {
        resume,
        jobDescription,
      });
      setAts(res.data);
      onResult?.(res.data);
    } catch (e) {
      console.error("ATS fetch error", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScore();
    // eslint-disable-next-line
  }, [runKey]); // Changed to depend on runKey instead of resume and jobDescription

  useEffect(() => {
    if (ats?.score) {
      let currentScore = 0;
      const targetScore = Math.max(0, Math.min(100, ats.score));
      const increment = targetScore / 50; // Adjust for animation speed (50 steps)

      const interval = setInterval(() => {
        currentScore += increment;
        if (currentScore >= targetScore) {
          setAnimatedScore(targetScore);
          clearInterval(interval);
        } else {
          setAnimatedScore(Math.ceil(currentScore));
        }
      }, 20); // Adjust interval timing

      return () => clearInterval(interval);
    }
  }, [ats?.score]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl bg-white px-6 py-8 italic text-gray-700 shadow-lg">
        <svg
          className="h-10 w-10 animate-spin text-blue-600"
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
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <span className="text-lg font-medium">Calculating ATS Score...</span>
        <span className="text-sm text-gray-500">
          Please wait while we analyze your resume.
        </span>
      </div>
    );
  }

  if (!ats)
    return (
      <div className="rounded-xl bg-white px-6 py-8 text-center text-gray-500 shadow-lg">
        No ATS data available. Please provide a job description.
      </div>
    );

  const { score, missingKeywords, extraKeywords } = ats;
  const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = missingKeywords.map(escapeRe).join("|");
  const jdHtml = pattern
    ? jobDescription.replace(
        new RegExp(`\\b(${pattern})\\b`, "gi"),
        `<mark class="bg-red-200 text-red-800 rounded px-1.5 py-0.5 shadow-sm">$1</mark>`,
      )
    : jobDescription;

  const scoreColor =
    score >= 75 ? "bg-green-500" : score >= 50 ? "bg-yellow-500" : "bg-red-500";

  return (
    <div className="space-y-8 rounded-xl bg-gradient-to-br from-gray-50 to-blue-50 p-6 shadow-2xl transition-all duration-500 ease-in-out sm:p-8">
      <div className="flex flex-col items-center justify-between sm:flex-row">
        <h3 className="mb-2 text-2xl font-semibold text-gray-800 sm:mb-0">
          ATS Match Score
        </h3>
        <div
          className="text-3xl font-bold"
          style={{
            color:
              score >= 75 ? "#10B981" : score >= 50 ? "#F59E0B" : "#EF4444",
          }}
        >
          {animatedScore}%
        </div>
      </div>

      <div className="h-6 w-full overflow-hidden rounded-full bg-gray-200 shadow-inner">
        <div
          className={`h-6 ${scoreColor} flex items-center justify-center text-xs font-medium text-white transition-all duration-1000 ease-out`}
          style={{ width: `${animatedScore}%` }}
        >
          {animatedScore > 10 ? `${animatedScore}% Match` : ""}
        </div>
      </div>

      <div className="text-center text-sm text-gray-600">
        You’re missing{" "}
        <strong className="font-semibold text-red-600">
          {missingKeywords.length}
        </strong>{" "}
        of{" "}
        <strong className="font-semibold text-gray-800">
          {
            new Set(
              jobDescription
                .toLowerCase()
                .split(/\W+/)
                .filter((w) => w.length > 2),
            ).size
          }
        </strong>{" "}
        key terms from the job description.
      </div>

      {missingKeywords.length > 0 && (
        <div className="border-t border-gray-200 pt-4">
          <h4 className="mb-3 text-lg font-semibold text-gray-700">
            Missing Keywords:
          </h4>
          <div className="flex flex-wrap gap-3">
            {missingKeywords.map((kw, index) => (
              <span
                key={kw + index}
                className="cursor-default rounded-full bg-red-100 px-4 py-1.5 text-sm font-medium text-red-700 shadow-sm transition-all duration-200 hover:bg-red-200"
              >
                {kw}
              </span>
            ))}
          </div>
          <div className="mt-6">
            <h4 className="mb-3 text-lg font-semibold text-gray-700">
              Context in Job Description:
            </h4>
            <div
              className="prose prose-sm mt-2 max-h-60 overflow-y-auto rounded-lg border border-gray-200 bg-white p-4 text-sm leading-relaxed text-gray-700 shadow-sm"
              dangerouslySetInnerHTML={{ __html: jdHtml }}
            />
          </div>
        </div>
      )}

      {extraKeywords.length > 0 && (
        <div className="border-t border-gray-200 pt-4">
          <h4 className="mb-3 text-lg font-semibold text-gray-700">
            Bonus Keywords (In Your Resume):
          </h4>
          <div className="flex flex-wrap gap-3">
            {extraKeywords.map((kw, index) => (
              <span
                key={kw + index}
                className="cursor-default rounded-full bg-green-100 px-4 py-1.5 text-sm font-medium text-green-700 shadow-sm transition-all duration-200 hover:bg-green-200"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
