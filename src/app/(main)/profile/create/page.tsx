"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function ProfileCreatePage() {
  const { user } = useUser();
  const router = useRouter();

  // form state
  const [name, setName] = useState("");
  // const [profilePicture, setProfilePicture] = useState("");
  const [tagline, setTagline] = useState("");
  const [bio, setBio] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [socialLink, setSocialLink] = useState("");
  const [industry, setIndustry] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [coverLetterUrl, setCoverLetterUrl] = useState("");
  const [skills, setSkills] = useState("");
  // const [setProjects] = useState('[{"name":"","link":""}]');
  // const [setProjects] = useState('[{"name":"","link":""}]');
  const [projects, setProjects] = useState('[{"name":"","link":""}]');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return console.error("No user ID");

    try {
      const res = await axios.post("/api/profile", {
        userId: user.id,
        name,
        tagline,
        bio,
        jobTitle,
        socialLink,
        industry,
        resumeUrl,
        coverLetterUrl,
        skills,
        projects,
        isPublic,
      });
      if (res.status === 200) {
        // Redirect after save
        router.push(`/profile/${user.id}`);
      } else {
        console.error("Failed to save profile:", res.data);
      }
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  // const [projects, setProjects] = useState('[{"name":"","link":""}]');

  const [isPublic, setIsPublic] = useState(false);

  // track whether we've loaded an existing profile
  const [loaded, setLoaded] = useState(false);

  // // Fetch existing profile on mount
  // useEffect(() => {
  //   if (!user?.id) return;
  //   axios
  //     .get(`/api/profile?userId=${user.id}`)
  //     .then((res) => {
  //       const data = res.data;
  //       if (data && data.userId) {
  //         // prefill form
  //         setName(data.name || "");
  //         // setProfilePicture(data.profilePicture || "");
  //         setTagline(data.tagline || "");
  //         setBio(data.bio || "");
  //         setJobTitle(data.jobTitle || "");
  //         setSocialLink(data.socialLink || "");
  //         setIndustry(data.industry || "");
  //         setResumeUrl(data.resumeUrl || "");
  //         setCoverLetterUrl(data.coverLetterUrl || "");
  //         setSkills(data.skills || "");
  //         setProjects(data.projects || '[{"name":"","link":""}]');
  //         setIsPublic(data.isPublic);
  //       }
  //     })
  //     .catch(() => {
  //       /* no profile yet */
  //     })
  //     .finally(() => {
  //       setLoaded(true);
  //     });
  // }, [user]);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!user?.id) return console.error("No user ID");

  //   // const payload = {
  //   //   userId: user.id,
  //   //   name,
  //   //   profilePicture,
  //   //   tagline,
  //   //   bio,
  //   //   jobTitle,
  //   //   socialLink,
  //   //   industry,
  //   //   resumeUrl,
  //   //   coverLetterUrl,
  //   //   skills,
  //   //   projects,
  //   //   isPublic,
  //   // };

  //   try {
  //     // const res = await axios.post("/api/profile", payload);
  //     router.push(`/profile/${user.id}`);
  //   } catch (err) {
  //     console.error("Save failed:", err);
  //   }
  // };

  // Fetch existing profile on mount
  useEffect(() => {
    if (!user?.id) return;
    axios
      .get(`/api/profile?userId=${user.id}`)
      .then((res) => {
        const data = res.data;
        if (data && data.userId) {
          // prefill form
          setName(data.name || "");
          // setProfilePicture(data.profilePicture || "");
          setTagline(data.tagline || "");
          setBio(data.bio || "");
          setJobTitle(data.jobTitle || "");
          setSocialLink(data.socialLink || "");
          setIndustry(data.industry || "");
          setResumeUrl(data.resumeUrl || "");
          setCoverLetterUrl(data.coverLetterUrl || "");
          setSkills(data.skills || "");
          setProjects(data.projects || '[{"name":"","link":""}]');
          setIsPublic(data.isPublic);
        }
      })
      .catch(() => {
        /* no profile yet */
      })
      .finally(() => {
        setLoaded(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Don’t render form until we’ve attempted to load
  if (!loaded) return <p className="p-8 text-center">Loading…</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl overflow-hidden rounded-xl bg-white shadow-lg">
        <div className="px-6 py-8">
          <h1 className="mb-6 text-center text-3xl font-semibold text-gray-800">
            {name ? "Edit Your Profile" : "Create Your Professional Profile"}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Hero Section */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="tagline" className="mb-2 block text-sm font-bold">
                Your Tagline
              </label>
              <input
                type="text"
                id="tagline"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
                placeholder="e.g., Software Engineer | Problem Solver | Lifelong Learner"
              />
            </div>

            {/* About Section */}
            <div className="mb-6">
              <label
                htmlFor="bio"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Short Bio
              </label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
                placeholder="A brief introduction about yourself and your professional journey."
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                htmlFor="jobTitle"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Current Job Title
              </label>
              <input
                type="text"
                id="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
                placeholder="e.g., Senior Project Manager"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="socialLink"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Social Link
              </label>
              <input
                type="url"
                id="socialLink"
                value={socialLink}
                onChange={(e) => setSocialLink(e.target.value)}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="industry"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Industry
              </label>
              <input
                type="text"
                id="industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
                placeholder="e.g., Technology, Finance, Education"
              />
            </div>

            {/* Resume & Cover Letter */}
            <div className="mb-4">
              <label
                htmlFor="resumeUrl"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Resume URL
              </label>
              <input
                type="url"
                id="resumeUrl"
                value={resumeUrl}
                onChange={(e) => setResumeUrl(e.target.value)}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
                placeholder="Link to your resume (PDF, DOCX)"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="coverLetterUrl"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Cover Letter URL
              </label>
              <input
                type="url"
                id="coverLetterUrl"
                value={coverLetterUrl}
                onChange={(e) => setCoverLetterUrl(e.target.value)}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
                placeholder="Link to your cover letter (PDF, DOCX)"
              />
            </div>

            {/* Skills & Projects */}
            <div className="mb-4">
              <label
                htmlFor="skills"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Skills
              </label>
              <input
                type="text"
                id="skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
                placeholder="e.g., JavaScript, React, Project Management"
              />
              <p className="text-xs italic text-gray-500">
                Separate skills with commas.
              </p>
            </div>
            {/* <div className="mb-6">
            <label htmlFor="projects" className="block text-gray-700 text-sm font-bold mb-2">Projects</label>
            <textarea
              id="projects"
              value={projects}
              onChange={(e) => setProjects(e.target.value)}
              rows={3}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-mono text-sm"
              placeholder='e.g., [{"name":"Project A","link":"https://..."}, {"name":"Contribution B","link":"https://..."}]'
            ></textarea>
            <p className="text-gray-500 text-xs italic">Enter your projects in JSON format.</p>
          </div> */}

            {/* Public Profile Option */}
            <div className="mb-6 flex items-center">
              <input
                type="checkbox"
                id="isPublic"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <label
                htmlFor="isPublic"
                className="ml-2 block text-sm font-bold text-gray-700"
              >
                Make profile public
              </label>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="focus:shadow-outline w-full rounded bg-green-500 px-4 py-3 font-bold text-white hover:bg-green-700 focus:outline-none"
            >
              Save Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
