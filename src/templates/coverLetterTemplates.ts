// export const coverLetterTemplates = [
//   {
//     id: "classic",
//     name: "Classic Formal",
//     prompt: (details: {
//       name: string;
//       role: string;
//       company: string;
//       achievements?: string;
//     }) =>
//       `Write a formal cover letter for ${details.name}, applying for the role of ${details.role} at ${details.company}. Highlight these achievements: ${details.achievements || "None provided"}.`,
//   },
//   {
//     id: "creative",
//     name: "Creative & Engaging",
//     prompt: (details) =>
//       `Compose a creative and engaging cover letter for ${details.name} for the position ${details.role} at ${details.company}. Emphasize the applicant's background, skills, and passion for the role.`,
//   },
//   {
//     id: "professional",
//     name: "Professional & Direct",
//     prompt: (details) =>
//       `Write a professional cover letter for ${details.name} for the position of ${details.role} at ${details.company}. The letter should be clear, concise, and focus on the applicant's qualifications.`,
//   },
//   // You can add more templates as needed
// ];

type CoverLetterDetails = {
  name: string;
  role: string;
  company: string;
  achievements?: string;
};

export const coverLetterTemplates = [
  {
    id: "classic",
    name: "Classic Formal",
    prompt: (details: CoverLetterDetails) =>
      `Write a formal cover letter for ${details.name}, applying for the role of ${details.role} at ${details.company}. Highlight these achievements: ${details.achievements || "None provided"}.`,
  },
  {
    id: "creative",
    name: "Creative & Engaging",
    prompt: (details: CoverLetterDetails) =>
      `Compose a creative and engaging cover letter for ${details.name} for the position ${details.role} at ${details.company}. Emphasize the applicant's background, skills, and passion for the role.`,
  },
  {
    id: "professional",
    name: "Professional & Direct",
    prompt: (details: CoverLetterDetails) =>
      `Write a professional cover letter for ${details.name} for the position of ${details.role} at ${details.company}. The letter should be clear, concise, and focus on the applicant's qualifications.`,
  },
];
