// // // // src/components/GenericTemplate.tsx
// // // "use client"; // Add this if any child component (even if not directly rendered here but part of the type definition chain) uses client hooks.
// // //               // However, for server-side string rendering with ReactDOMServer, this component itself should ideally be free of client hooks if possible.
// // //               // If TEMPLATES or ATSScore (the component, not just the type) were imported and used client features, that could be an issue for older Next.js build analysis.
// // //               // For now, assuming this component as written is mostly for display based on props.

// // // import React from "react";
// // // import { ResumeJSON, Volunteering, Certification, Reference } from "./ATSScore"; // Make sure to import sub-types if needed
// // // import { TemplateStyle, TEMPLATES } from "./Templates";

// // // export type TemplateID =
// // //   | "split-panel"
// // //   | "timeline"
// // //   | "card-stack"
// // //   | "modern-minimal"
// // //   | "elegant-grid"
// // //   | "plain"
// // //   | "market-leading"
// // //   | "linkedin-style";

// // // interface Props {
// // //   templateId: TemplateID;
// // //   data: ResumeJSON;
// // // }

// // // const formatDateRange = (startDate?: string, endDate?: string): string => {
// // //   if (!startDate && !endDate) return "";
// // //   if (startDate && !endDate && startDate) return `${startDate} - Present`;
// // //   if (startDate && endDate) return `${startDate} - ${endDate}`;
// // //   if (startDate) return startDate;
// // //   if (endDate) return endDate; // Should ideally not happen without start date
// // //   return "";
// // // };

// // // export default function GenericTemplate({ templateId, data }: Props) {
// // //   const template = TEMPLATES.find((t) => t.id === templateId) || TEMPLATES[0];
// // //   const { personal, summary, skills, workExperiences, educations, volunteering, certifications, references } = data;

// // //   // Common class definitions
// // //   const commonTextClass = "text-gray-700 leading-relaxed";
// // //   const sectionItemClass = "mb-4 py-3 border-b border-gray-200/60 last:border-b-0 item-no-break"; // Added item-no-break
// // //   const strongTextClass = "text-gray-800 font-semibold";
// // //   const companyTextClass = "text-gray-600 italic";
// // //   const dateTextClass = "text-sm text-gray-500";
// // //   const listClass = "list-none ml-0 mt-2 space-y-1";

// // //   // Animations are typically for screen, will be ignored by print CSS or server-side rendering to string
// // //   // const listItemAnimation = "animate-fadeIn";
// // //   // const bulletItemAnimation = "animate-fadeInUp";

// // //   const renderHeader = () => (
// // //     <header className={`p-6 sm:p-8 ${template.headerBg} border-b border-gray-200/80 shadow-sm section-no-break`}>
// // //       <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 tracking-tight">{personal?.fullName || "Your Name"}</h1>
// // //       <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 mt-3">
// // //         {personal?.email && <a href={`mailto:${personal.email}`} className="hover:text-blue-600">{personal.email}</a>}
// // //         {personal?.phone && <span>{personal.phone}</span>}
// // //         {personal?.city && personal?.country && <span>{`${personal.city}, ${personal.country}`}</span>}
// // //         {personal?.linkedinUrl && (
// // //           <a
// // //             href={personal.linkedinUrl}
// // //             target="_blank"
// // //             rel="noopener noreferrer"
// // //             className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
// // //           >
// // //             LinkedIn Profile
// // //           </a>
// // //         )}
// // //       </div>
// // //     </header>
// // //   );

// // //   const renderSection = (title: string, content: React.ReactNode, customClasses: string = "") => (
// // //     <section className={`mb-6 sm:mb-8 group ${customClasses} section-no-break`}>
// // //       <h2
// // //         className={`text-xl font-semibold uppercase tracking-wider ${template.accentBg} p-3 sm:p-4 rounded-t-lg border-b-2 border-gray-300/70 text-gray-800`}
// // //       >
// // //         {title}
// // //       </h2>
// // //       <div className="p-3 sm:p-4 bg-white rounded-b-lg shadow-sm">
// // //         {content}
// // //       </div>
// // //     </section>
// // //   );

// // //   const renderListItem = (item: string, index: number) => (
// // //     <li key={index} className="mb-1.5 text-gray-700 leading-relaxed item-no-break">{item}</li>
// // //   );

// // //   const renderBulletItem = (bullet: string, index: number) => (
// // //      <li key={index} className="mb-1.5 text-gray-700 leading-relaxed relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-blue-500 before:font-bold item-no-break">
// // //         {bullet}
// // //     </li>
// // //   );

// // //   const renderSharedSections = (isSidebar: boolean = false) => (
// // //     <>
// // //       {volunteering && volunteering.length > 0 &&
// // //         renderSection(
// // //           "Volunteering",
// // //           volunteering.map((v, i) => (
// // //             <div key={`vol-${i}`} className={`${sectionItemClass} ${isSidebar ? 'py-2' : ''}`}>
// // //               <h3 className={`${strongTextClass} ${isSidebar ? 'text-md' : 'text-lg'}`}>{v.role}</h3>
// // //               <p className={`${companyTextClass} ${isSidebar ? 'text-sm' : 'text-md'}`}>{v.organization}</p>
// // //               {(v.startDate || v.endDate) && <p className={dateTextClass}>{formatDateRange(v.startDate, v.endDate)}</p>}
// // //               {v.bullets && v.bullets.length > 0 && <ul className={`${listClass} mt-1.5`}>{v.bullets.map(renderBulletItem)}</ul>}
// // //             </div>
// // //           )),
// // //           isSidebar ? "bg-gray-50 rounded-lg shadow-sm" : ""
// // //         )}
// // //       {certifications && certifications.length > 0 &&
// // //         renderSection(
// // //           "Certifications",
// // //           certifications.map((c, i) => (
// // //             <div key={`cert-${i}`} className={`${sectionItemClass} ${isSidebar ? 'py-2' : ''}`}>
// // //               <p><strong className={strongTextClass}>{c.title}</strong></p>
// // //               {isSidebar ? <p className={companyTextClass}>{c.issuer}</p> : <span className={companyTextClass}>, {c.issuer}</span>}
// // //               <p className={dateTextClass}>{c.date}</p>
// // //             </div>
// // //           )),
// // //           isSidebar ? "bg-gray-50 rounded-lg shadow-sm" : ""
// // //         )}
// // //       {references && references.length > 0 &&
// // //         renderSection(
// // //           "References",
// // //           references.map((r, i) => (
// // //             <div key={`ref-${i}`} className={`${sectionItemClass} ${isSidebar ? 'py-2' : ''}`}>
// // //               <p><strong className={strongTextClass}>{r.name}</strong></p>
// // //               <p className={commonTextClass}>{r.contact}</p>
// // //             </div>
// // //           )),
// // //           isSidebar ? "bg-gray-50 rounded-lg shadow-sm" : ""
// // //         )}
// // //     </>
// // //   );

// // //   const renderContent = () => {
// // //     switch (template.layout) {
// // //       case "single-column":
// // //       case "plain":
// // //         return (
// // //           <div className="p-6 sm:p-8 space-y-6">
// // //             {summary && renderSection("Summary", <p className={`${commonTextClass} text-justify`}>{summary}</p>)}
// // //             {skills && skills.length > 0 && renderSection("Skills", <ul className="list-disc list-inside ml-0 columns-1 sm:columns-2 gap-x-6 text-gray-700">{skills.map(renderListItem)}</ul>)}
// // //             {workExperiences && workExperiences.length > 0 &&
// // //               renderSection(
// // //                 "Work Experience",
// // //                 workExperiences.map((we, i) => (
// // //                   <div key={`work-${i}`} className={`${sectionItemClass} group/item`}>
// // //                     <h3 className={`${strongTextClass} text-lg`}>{we.position}</h3>
// // //                     <p className={`${companyTextClass} text-md`}>{we.company}</p>
// // //                     <p className={dateTextClass}>{formatDateRange(we.startDate, we.endDate)}</p>
// // //                     {we.bullets && we.bullets.length > 0 && <ul className={`${listClass} mt-2`}>{we.bullets.map(renderBulletItem)}</ul>}
// // //                   </div>
// // //                 ))
// // //               )}
// // //             {educations && educations.length > 0 &&
// // //               renderSection(
// // //                 "Education",
// // //                 educations.map((ed, i) => (
// // //                   <div key={`edu-${i}`} className={`${sectionItemClass}`}>
// // //                     <p><strong className={strongTextClass}>{ed.degree}</strong>, <span className={companyTextClass}>{ed.school}</span></p>
// // //                     <p className={dateTextClass}>{formatDateRange(ed.startDate, ed.endDate)}</p>
// // //                   </div>
// // //                 ))
// // //               )}
// // //             {renderSharedSections()}
// // //           </div>
// // //         );
// // //       case "two-column":
// // //         return (
// // //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 p-6 sm:p-8">
// // //             <div className="md:col-span-1 space-y-6"> {/* Sidebar */}
// // //               {skills && skills.length > 0 && renderSection("Skills", <ul className="list-disc list-inside ml-0 text-gray-700 space-y-1">{skills.map(renderListItem)}</ul>, "bg-gray-50 rounded-lg shadow-sm")}
// // //               {renderSharedSections(true)} {/* Pass true for sidebar styling */}
// // //             </div>
// // //             <div className="md:col-span-2 space-y-6"> {/* Main content */}
// // //               {summary && renderSection("Summary", <p className={`${commonTextClass} text-justify`}>{summary}</p>)}
// // //               {workExperiences && workExperiences.length > 0 &&
// // //                 renderSection( "Work Experience", workExperiences.map(/* same as single-column */))
// // //               }
// // //               {educations && educations.length > 0 &&
// // //                 renderSection( "Education", educations.map(/* same as single-column */))
// // //               }
// // //             </div>
// // //           </div>
// // //         );
// // //       case "timeline":
// // //          return (
// // //           <div className="p-6 sm:p-8">
// // //             {summary && renderSection("Summary", <p className={`${commonTextClass} text-justify`}>{summary}</p>)}
// // //             {workExperiences && workExperiences.length > 0 &&
// // //               renderSection(
// // //                 "Work Experience",
// // //                 <div className="relative border-l-2 border-blue-500/50 pl-8 py-4 space-y-8"> {/* Container for timeline style */}
// // //                   {workExperiences.map((we, i) => (
// // //                     <div key={`work-tl-${i}`} className="relative item-no-break"> {/* Individual timeline item */}
// // //                       <div className="absolute w-5 h-5 bg-blue-500 rounded-full -left-[43px] top-1 border-4 border-white ring-1 ring-blue-500/50"></div>
// // //                       <h3 className={`${strongTextClass} text-lg`}>{we.position}</h3>
// // //                       <p className={`${companyTextClass} text-md`}>{we.company}</p>
// // //                       <p className={`${dateTextClass} mb-1`}>{formatDateRange(we.startDate, we.endDate)}</p>
// // //                       {we.bullets && we.bullets.length > 0 && <ul className={`${listClass} mt-2`}>{we.bullets.map(renderBulletItem)}</ul>}
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               )}
// // //             {educations && educations.length > 0 &&
// // //               renderSection(
// // //                 "Education",
// // //                 <div className="relative border-l-2 border-green-500/50 pl-8 py-4 space-y-6"> {/* Container for timeline style */}
// // //                   {educations.map((ed, i) => (
// // //                     <div key={`edu-tl-${i}`} className="relative item-no-break"> {/* Individual timeline item */}
// // //                       <div className="absolute w-5 h-5 bg-green-500 rounded-full -left-[43px] top-1 border-4 border-white ring-1 ring-green-500/50"></div>
// // //                       <p><strong className={strongTextClass}>{ed.degree}</strong></p>
// // //                       <p className={companyTextClass}>{ed.school}</p>
// // //                       <p className={dateTextClass}>{formatDateRange(ed.startDate, ed.endDate)}</p>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               )}
// // //              {skills && skills.length > 0 && renderSection("Skills", <ul className="list-disc list-inside ml-0 columns-1 sm:columns-2 gap-x-6 text-gray-700">{skills.map(renderListItem)}</ul>)}
// // //              {renderSharedSections()}
// // //           </div>
// // //         );
// // //       case "card":
// // //         return (
// // //           <div className="p-6 sm:p-8 space-y-6 bg-gray-50">
// // //             {summary &&
// // //               renderSection( "Summary", <div className="p-4 bg-white shadow-lg rounded-xl"><p className={`${commonTextClass} text-justify`}>{summary}</p></div> )
// // //             }
// // //             {skills && skills.length > 0 &&
// // //               renderSection( "Skills", <div className="p-4 bg-white shadow-lg rounded-xl"><ul className="list-disc list-inside columns-1 sm:columns-2 gap-x-6 text-gray-700">{skills.map(renderListItem)}</ul></div> )
// // //             }
// // //             {workExperiences && workExperiences.length > 0 &&
// // //               renderSection( "Work Experience", workExperiences.map((we, i) => (
// // //                   <div key={`work-card-${i}`} className="p-4 sm:p-5 mb-4 bg-white shadow-lg rounded-xl item-no-break">
// // //                     <h3 className={`${strongTextClass} text-lg`}>{we.position}</h3>
// // //                     <p className={`${companyTextClass} text-md`}>{we.company}</p>
// // //                     <p className={`${dateTextClass} mb-1`}>{formatDateRange(we.startDate, we.endDate)}</p>
// // //                     {we.bullets && we.bullets.length > 0 && <ul className={`${listClass} mt-2`}>{we.bullets.map(renderBulletItem)}</ul>}
// // //                   </div>
// // //                 ))
// // //               )
// // //             }
// // //              {educations && educations.length > 0 &&
// // //               renderSection( "Education", educations.map((ed, i) => (
// // //                   <div key={`edu-card-${i}`} className="p-4 sm:p-5 mb-4 bg-white shadow-lg rounded-xl item-no-break">
// // //                     <p><strong className={strongTextClass}>{ed.degree}</strong>, <span className={companyTextClass}>{ed.school}</span></p>
// // //                     <p className={dateTextClass}>{formatDateRange(ed.startDate, ed.endDate)}</p>
// // //                   </div>
// // //                 ))
// // //               )
// // //             }
// // //             {renderSharedSections(false)} {/* Assuming cards are main content, not sidebar styled */}
// // //           </div>
// // //         );
// // //       case "market-leading":
// // //         return (
// // //           <div className="p-6 sm:p-8 space-y-6">
// // //             {summary && renderSection("Professional Summary", <p className={`${commonTextClass} text-justify leading-normal`}>{summary.replace(/[^a-zA-Z0-9\s.,'()-]/g, "")}</p>)}
// // //             {skills && skills.length > 0 &&
// // //               renderSection( "Core Competencies", <ul className="list-none columns-1 sm:columns-2 md:columns-3 gap-x-6 text-gray-700">
// // //                   {skills.map((s, i) => ( <li key={i} className="mb-2 p-2 bg-gray-100 rounded-md shadow-sm">{s}</li> ))}
// // //                 </ul>
// // //               )
// // //             }
// // //             {workExperiences && workExperiences.length > 0 &&
// // //               renderSection( "Professional Experience", workExperiences.map((we, i) => (
// // //                   <div key={`work-ml-${i}`} className={`${sectionItemClass} group/item py-4`}>
// // //                     <h3 className={`${strongTextClass} text-lg block`}>{we.position} | <span className={companyTextClass}>{we.company}</span></h3>
// // //                     <p className={`${dateTextClass} mb-1`}>{formatDateRange(we.startDate, we.endDate)}</p>
// // //                     {we.bullets && we.bullets.length > 0 && <ul className={`${listClass} mt-3`}>{we.bullets.map(renderBulletItem)}</ul>}
// // //                   </div>
// // //                 ))
// // //               )
// // //             }
// // //             {educations && educations.length > 0 &&
// // //               renderSection( "Education", educations.map((ed, i) => (
// // //                   <div key={`edu-ml-${i}`} className={`${sectionItemClass} py-3`}>
// // //                     <p><strong className={`${strongTextClass} text-md`}>{ed.degree}</strong>, <span className={companyTextClass}>{ed.school}</span></p>
// // //                     <p className={dateTextClass}>{formatDateRange(ed.startDate, ed.endDate)}</p>
// // //                   </div>
// // //                 ))
// // //               )
// // //             }
// // //             {renderSharedSections()}
// // //           </div>
// // //         );
// // //       case "linkedin-style":
// // //         return (
// // //           <div className="p-6 sm:p-8 space-y-6 bg-gray-50">
// // //              {summary && renderSection("Summary", <p className={`${commonTextClass} p-4 bg-white rounded-lg shadow-md text-justify`}>{summary}</p>)}
// // //             {workExperiences && workExperiences.length > 0 &&
// // //               renderSection( "Experience", workExperiences.map((we, i) => (
// // //                   <div key={`work-li-${i}`} className="p-4 mb-4 bg-white rounded-lg shadow-md group/item item-no-break">
// // //                     <h3 className={`${strongTextClass} text-xl mb-0.5`}>{we.position}</h3>
// // //                     <p className={`${companyTextClass} text-md`}>{we.company}</p>
// // //                     <p className={`${dateTextClass} mb-2`}>{formatDateRange(we.startDate, we.endDate)}</p>
// // //                     {we.bullets && we.bullets.length > 0 && <ul className={`${listClass} mt-2`}>{we.bullets.map(renderBulletItem)}</ul>}
// // //                   </div>
// // //                 ))
// // //               )
// // //             }
// // //             {educations && educations.length > 0 &&
// // //               renderSection( "Education", educations.map((ed, i) => (
// // //                   <div key={`edu-li-${i}`} className="p-4 mb-4 bg-white rounded-lg shadow-md item-no-break">
// // //                     <p><strong className={`${strongTextClass} text-lg`}>{ed.degree}</strong></p>
// // //                     <p className={companyTextClass}>{ed.school}</p>
// // //                     <p className={dateTextClass}>{formatDateRange(ed.startDate, ed.endDate)}</p>
// // //                   </div>
// // //                 ))
// // //               )
// // //             }
// // //             {skills && skills.length > 0 && renderSection("Skills",  <div className="p-4 bg-white rounded-lg shadow-md"><ul className="list-disc list-inside columns-1 sm:columns-2 gap-x-6 text-gray-700">{skills.map(renderListItem)}</ul></div>)}
// // //             {renderSharedSections()}
// // //           </div>
// // //         );
// // //       default:
// // //         return <div className="p-6 text-center text-gray-500">Template layout not recognized.</div>;
// // //     }
// // //   };

// // //   return (
// // //     // Added id="resumePreviewContent" to the root div for potential direct styling from globals.css if needed,
// // //     // though targeting #resumePreviewContentWrapper in print CSS is now preferred for server-side.
// // //     <div id="resumePreviewContent" className="bg-white text-gray-900 print:p-0 print:text-black font-sans antialiased text-base">
// // //       {renderHeader()}
// // //       <main> {/* Removed transition/opacity classes as they are for screen */}
// // //           {renderContent()}
// // //       </main>
// // //     </div>
// // //   );
// // // }

// // // src/components/GenericTemplate.tsx
// // "use client";

// // import React from "react";
// // import { ResumeJSON, Volunteering, Certification, Reference } from "./ATSScore";
// // import { TemplateStyle, TEMPLATES } from "./Templates";

// // export type TemplateID =
// //   | "split-panel"
// //   | "timeline"
// //   | "card-stack"
// //   | "modern-minimal"
// //   | "elegant-grid"
// //   | "plain"
// //   | "market-leading"
// //   | "linkedin-style"
// //   | "grid";

// // interface Props {
// //   templateId: TemplateID;
// //   data: ResumeJSON;
// // }

// // const formatDateRange = (startDate?: string, endDate?: string): string => {
// //   if (!startDate && !endDate) return "";
// //   if (startDate && !endDate && startDate) return `${startDate} - Present`;
// //   if (startDate && endDate) return `${startDate} - ${endDate}`;
// //   if (startDate) return startDate;
// //   if (endDate) return endDate;
// //   return "";
// // };

// // export default function GenericTemplate({ templateId, data }: Props) {
// //   const template = TEMPLATES.find((t) => t.id === templateId) || TEMPLATES[0];
// //   const { personal, summary, skills, workExperiences, educations, volunteering, certifications, references } = data;

// //   const commonTextClass = "text-gray-700 leading-relaxed";
// //   const sectionItemClass = "mb-4 py-3 border-b border-gray-200/60 last:border-b-0 item-no-break";
// //   const strongTextClass = "text-gray-800 font-semibold";
// //   const companyTextClass = "text-gray-600 italic";
// //   const dateTextClass = "text-sm text-gray-500";
// //   const listClass = "list-none ml-0 mt-2 space-y-1";

// //   const renderHeader = () => (
// //     <header className={`p-6 sm:p-8 ${template.headerBg} border-b border-gray-200/80 shadow-sm section-no-break print-header`}>
// //       <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 tracking-tight print-h1">{personal?.fullName || "Your Name"}</h1>
// //       <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 mt-3">
// //         {personal?.email && <a href={`mailto:${personal.email}`} className="hover:text-blue-600">{personal.email}</a>}
// //         {personal?.phone && <span>{personal.phone}</span>}
// //         {personal?.city && personal?.country && <span>{`${personal.city}, ${personal.country}`}</span>}
// //         {personal?.linkedinUrl && (
// //           <a href={personal.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 hover:underline font-medium">
// //             LinkedIn Profile
// //           </a>
// //         )}
// //       </div>
// //     </header>
// //   );

// //   const renderSection = (title: string, content: React.ReactNode, customClasses: string = "") => (
// //     <section className={`mb-6 sm:mb-8 group ${customClasses} section-no-break print-section`}>
// //       <h2 className={`text-xl font-semibold uppercase tracking-wider ${template.accentBg} p-3 sm:p-4 rounded-t-lg border-b-2 border-gray-300/70 text-gray-800 print-h2`}>
// //         {title}
// //       </h2>
// //       <div className="p-3 sm:p-4 bg-white rounded-b-lg shadow-sm print-section-content">
// //         {content}
// //       </div>
// //     </section>
// //   );

// //   const renderListItem = (item: string, index: number) => (
// //     <li key={`skill-item-${index}`} className="mb-1.5 text-gray-700 leading-relaxed item-no-break">{item}</li>
// //   );

// //   const renderBulletItem = (bullet: string, index: number, parentKey: string) => (
// //      <li key={`${parentKey}-bullet-${index}`} className="mb-1.5 text-gray-700 leading-relaxed relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-blue-500 before:font-bold item-no-break">
// //         {bullet}
// //     </li>
// //   );

// //   const renderContent = () => {
// //     // Define reusable mapped item arrays
// //     const workExperienceItems = workExperiences?.map((we, i) => (
// //         <div key={`work-${i}`} className={`${sectionItemClass} group/item`}>
// //             <h3 className={`${strongTextClass} text-lg print-h3`}>{we.position}</h3>
// //             <p className={`${companyTextClass} text-md`}>{we.company}</p>
// //             <p className={dateTextClass}>{formatDateRange(we.startDate, we.endDate)}</p>
// //             {we.bullets && we.bullets.length > 0 && <ul className={`${listClass} mt-2`}>{we.bullets.map((b, bi) => renderBulletItem(b, bi, `work-${i}`))}</ul>}
// //         </div>
// //     ));

// //     const educationItems = educations?.map((ed, i) => (
// //         <div key={`edu-${i}`} className={`${sectionItemClass}`}>
// //             <p><strong className={strongTextClass}>{ed.degree}</strong>, <span className={companyTextClass}>{ed.school}</span></p>
// //             <p className={dateTextClass}>{formatDateRange(ed.startDate, ed.endDate)}</p>
// //         </div>
// //     ));

// //     const volunteeringItems = (isCardStyle: boolean = false, isSidebar: boolean = false) =>
// //       volunteering?.map((v, i) => (
// //         <div key={`vol-${i}`} className={isCardStyle ? "p-4 sm:p-5 mb-4 bg-white shadow-lg rounded-xl item-no-break" : `${sectionItemClass} ${isSidebar ? 'py-2' : ''}`}>
// //           <h3 className={`${strongTextClass} ${isSidebar ? 'text-md' : 'text-lg'} print-h3`}>{v.role}</h3>
// //           <p className={`${companyTextClass} ${isSidebar ? 'text-sm' : 'text-md'}`}>{v.organization}</p>
// //           {(v.startDate || v.endDate) && <p className={dateTextClass}>{formatDateRange(v.startDate, v.endDate)}</p>}
// //           {v.bullets && v.bullets.length > 0 && <ul className={`${listClass} mt-1.5`}>{v.bullets.map((b, bi) => renderBulletItem(b, bi, `vol-${i}`))}</ul>}
// //         </div>
// //       ));

// //     const certificationItems = (isCardStyle: boolean = false, isSidebar: boolean = false) =>
// //       certifications?.map((c, i) => (
// //         <div key={`cert-${i}`} className={isCardStyle ? "p-4 sm:p-5 mb-4 bg-white shadow-lg rounded-xl item-no-break" : `${sectionItemClass} ${isSidebar ? 'py-2' : ''}`}>
// //            {isSidebar || isCardStyle ? (
// //               <>
// //                   <p><strong className={strongTextClass}>{c.title}</strong></p>
// //                   <p className={companyTextClass}>{c.issuer}</p>
// //               </>
// //            ) : (
// //               <p><strong className={strongTextClass}>{c.title}</strong>, <span className={companyTextClass}>{c.issuer}</span></p>
// //            )}
// //           <p className={dateTextClass}>{c.date}</p>
// //         </div>
// //       ));

// //     const referenceItems = (isCardStyle: boolean = false, isSidebar: boolean = false) =>
// //       references?.map((r, i) => (
// //         <div key={`ref-${i}`} className={isCardStyle ? "p-4 sm:p-5 mb-4 bg-white shadow-lg rounded-xl item-no-break" : `${sectionItemClass} ${isSidebar ? 'py-2' : ''}`}>
// //           <p><strong className={strongTextClass}>{r.name}</strong></p>
// //           <p className={commonTextClass}>{r.contact}</p>
// //         </div>
// //       ));

// //     // --- Layout specific rendering ---
// //     switch (template.layout) {
// //       case "single-column":
// //       case "plain":
// //         return (
// //           <div className="p-6 sm:p-8 space-y-6">
// //             {summary && renderSection("Summary", <p className={`${commonTextClass} text-justify`}>{summary}</p>)}
// //             {skills && skills.length > 0 && renderSection("Skills", <ul className="list-disc list-inside ml-0 columns-1 sm:columns-2 gap-x-6 text-gray-700">{skills.map(renderListItem)}</ul>)}
// //             {workExperiences && workExperiences.length > 0 && renderSection("Work Experience", workExperienceItems)}
// //             {educations && educations.length > 0 && renderSection("Education", educationItems)}
// //             {volunteering && volunteering.length > 0 && renderSection("Volunteering", volunteeringItems())}
// //             {certifications && certifications.length > 0 && renderSection("Certifications", certificationItems())}
// //             {references && references.length > 0 && renderSection("References", referenceItems())}
// //           </div>
// //         );

// //       case "market-leading":
// //         return (
// //           <div className="p-6 sm:p-8 space-y-6">
// //             {summary && renderSection("Professional Summary", <p className={`${commonTextClass} text-justify leading-normal`}>{summary.replace(/[^a-zA-Z0-9\s.,'()-]/g, "")}</p>)}
// //             {skills && skills.length > 0 &&
// //               renderSection( "Core Competencies", <ul className="list-none columns-1 sm:columns-2 md:columns-3 gap-x-6 text-gray-700">
// //                   {skills.map((s, i) => ( <li key={`skill-ml-${i}`} className="mb-2 p-2 bg-gray-100 rounded-md shadow-sm item-no-break">{s}</li> ))}
// //                 </ul>
// //               )
// //             }
// //             {workExperiences && workExperiences.length > 0 &&
// //               renderSection( "Professional Experience", workExperiences.map((we, i) => (
// //                   <div key={`work-ml-${i}`} className={`${sectionItemClass} py-4 group/item`}>
// //                     <h3 className={`${strongTextClass} text-lg block print-h3`}>
// //                         {we.position}
// //                         <span className={companyTextClass}> | {we.company}</span>
// //                     </h3>
// //                     <p className={`${dateTextClass} mb-1`}>{formatDateRange(we.startDate, we.endDate)}</p>
// //                     {we.bullets && we.bullets.length > 0 && <ul className={`${listClass} mt-3`}>{we.bullets.map((b, bi) => renderBulletItem(b, bi, `work-ml-${i}`))}</ul>}
// //                   </div>
// //                 )))
// //             }
// //             {educations && educations.length > 0 &&
// //               renderSection( "Education", educations.map((ed, i) => (
// //                   <div key={`edu-ml-${i}`} className={`${sectionItemClass} py-3`}>
// //                     <p><strong className={`${strongTextClass} text-md`}>{ed.degree}</strong>, <span className={companyTextClass}>{ed.school}</span></p>
// //                     <p className={dateTextClass}>{formatDateRange(ed.startDate, ed.endDate)}</p>
// //                   </div>
// //                 )))
// //             }
// //             {volunteering && volunteering.length > 0 && renderSection("Volunteering", volunteeringItems())}
// //             {certifications && certifications.length > 0 &&
// //               renderSection("Certifications", certifications.map((c, i) => ( // Slightly different for market-leading
// //                 <div key={`cert-ml-${i}`} className={`${sectionItemClass} py-3`}>
// //                   <p><strong className={strongTextClass}>{c.title}</strong><span className={companyTextClass}> | {c.issuer}</span></p>
// //                   <p className={dateTextClass}>{c.date}</p>
// //                 </div>
// //               )))
// //             }
// //             {references && references.length > 0 && renderSection("References", referenceItems())}
// //           </div>
// //         );

// //       case "two-column":
// //         return (
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 p-6 sm:p-8">
// //             <div className="md:col-span-1 space-y-6"> {/* Sidebar */}
// //               {skills && skills.length > 0 && renderSection("Skills", <ul className="list-disc list-inside ml-0 text-gray-700 space-y-1">{skills.map(renderListItem)}</ul>, "bg-gray-50 rounded-lg shadow-sm")}
// //               {certifications && certifications.length > 0 && renderSection("Certifications", certificationItems(false, true), "bg-gray-50 rounded-lg shadow-sm")}
// //               {references && references.length > 0 && renderSection("References", referenceItems(false, true), "bg-gray-50 rounded-lg shadow-sm")}
// //             </div>
// //             <div className="md:col-span-2 space-y-6"> {/* Main content */}
// //               {summary && renderSection("Summary", <p className={`${commonTextClass} text-justify`}>{summary}</p>)}
// //               {workExperiences && workExperiences.length > 0 && renderSection("Work Experience", workExperienceItems)}
// //               {educations && educations.length > 0 && renderSection("Education", educationItems)}
// //               {volunteering && volunteering.length > 0 && renderSection("Volunteering", volunteeringItems())}
// //             </div>
// //           </div>
// //         );

// //       case "timeline":
// //          return (
// //           <div className="p-6 sm:p-8">
// //             {summary && renderSection("Summary", <p className={`${commonTextClass} text-justify`}>{summary}</p>)}
// //             {workExperiences && workExperiences.length > 0 &&
// //               renderSection( "Work Experience", <div className="relative border-l-2 border-blue-500/50 pl-8 py-4 space-y-8">
// //                   {workExperiences.map((we, i) => (
// //                     <div key={`work-tl-${i}`} className="relative item-no-break">
// //                       <div className="absolute w-5 h-5 bg-blue-500 rounded-full -left-[43px] top-1 border-4 border-white ring-1 ring-blue-500/50"></div>
// //                       <h3 className={`${strongTextClass} text-lg print-h3`}>{we.position}</h3>
// //                       <p className={`${companyTextClass} text-md`}>{we.company}</p>
// //                       <p className={`${dateTextClass} mb-1`}>{formatDateRange(we.startDate, we.endDate)}</p>
// //                       {we.bullets && we.bullets.length > 0 && <ul className={`${listClass} mt-2`}>{we.bullets.map((b, bi) => renderBulletItem(b, bi, `work-tl-${i}`))}</ul>}
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //             {educations && educations.length > 0 &&
// //               renderSection("Education", <div className="relative border-l-2 border-green-500/50 pl-8 py-4 space-y-6">
// //                   {educations.map((ed, i) => (
// //                     <div key={`edu-tl-${i}`} className="relative item-no-break">
// //                       <div className="absolute w-5 h-5 bg-green-500 rounded-full -left-[43px] top-1 border-4 border-white ring-1 ring-green-500/50"></div>
// //                       <p><strong className={strongTextClass}>{ed.degree}</strong></p>
// //                       <p className={companyTextClass}>{ed.school}</p>
// //                       <p className={dateTextClass}>{formatDateRange(ed.startDate, ed.endDate)}</p>
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //             {skills && skills.length > 0 && renderSection("Skills", <ul className="list-disc list-inside ml-0 columns-1 sm:columns-2 gap-x-6 text-gray-700">{skills.map(renderListItem)}</ul>)}
// //             {volunteering && volunteering.length > 0 && renderSection("Volunteering", volunteeringItems())}
// //             {certifications && certifications.length > 0 && renderSection("Certifications", certificationItems())}
// //             {references && references.length > 0 && renderSection("References", referenceItems())}
// //           </div>
// //         );

// //       case "card":
// //       case "linkedin-style":
// //         const cardWrapperClass = "p-4 mb-4 bg-white rounded-lg shadow-md item-no-break";
// //         const isLinkedIn = template.id === 'linkedin-style';
// //         return (
// //           <div className="p-6 sm:p-8 space-y-6 bg-gray-50">
// //             {summary && renderSection("Summary", <div className={cardWrapperClass}><p className={`${commonTextClass} text-justify`}>{summary}</p></div>)}
// //             {skills && skills.length > 0 && renderSection("Skills",  <div className={cardWrapperClass}><ul className="list-disc list-inside columns-1 sm:columns-2 gap-x-6 text-gray-700">{skills.map(renderListItem)}</ul></div>)}
// //             {workExperiences && workExperiences.length > 0 &&
// //               renderSection(isLinkedIn ? "Experience" : "Work Experience", workExperiences.map((we, i) => (
// //                   <div key={`work-card-${i}`} className={cardWrapperClass}>
// //                     <h3 className={`${strongTextClass} ${isLinkedIn ? 'text-xl mb-0.5' :'text-lg'} print-h3`}>{we.position}</h3>
// //                     <p className={`${companyTextClass} text-md`}>{we.company}</p>
// //                     <p className={`${dateTextClass} mb-1`}>{formatDateRange(we.startDate, we.endDate)}</p>
// //                     {we.bullets && we.bullets.length > 0 && <ul className={`${listClass} mt-2`}>{we.bullets.map((b, bi) => renderBulletItem(b, bi, `work-card-${i}`))}</ul>}
// //                   </div>
// //                 )))
// //             }
// //             {educations && educations.length > 0 &&
// //               renderSection("Education", educations.map((ed, i) => (
// //                   <div key={`edu-card-${i}`} className={cardWrapperClass}>
// //                     <p><strong className={`${strongTextClass} ${isLinkedIn ? 'text-lg' :'text-md'}`}>{ed.degree}</strong></p>
// //                     <p className={companyTextClass}>{isLinkedIn ? ed.school : `, ${ed.school}`}</p>
// //                     <p className={dateTextClass}>{formatDateRange(ed.startDate, ed.endDate)}</p>
// //                   </div>
// //                 )))
// //             }
// //             {volunteering && volunteering.length > 0 && renderSection("Volunteering", volunteeringItems(true))}
// //             {certifications && certifications.length > 0 && renderSection("Certifications", certificationItems(true))}
// //             {references && references.length > 0 && renderSection("References", referenceItems(true))}
// //           </div>
// //         );
// //       default:
// //         const _exhaustiveCheck: never = template.layout;
// //         return <div className="p-6 text-center text-gray-500">Template layout not recognized: {_exhaustiveCheck}</div>;
// //     }
// //   };

// //   return (
// //     <div id="resumePreviewContent" className="bg-white text-gray-900 font-sans antialiased text-base">
// //       {renderHeader()}
// //       <main>
// //           {renderContent()}
// //       </main>
// //     </div>
// //   );
// // }

// // src/components/GenericTemplate.tsx
// "use client";

// import React from "react";
// import { ResumeJSON } from "./ATSScore";
// import { TEMPLATES } from "./Templates";

// export type TemplateID =
//   | "split-panel"
//   | "timeline"
//   | "card-stack"
//   | "modern-minimal"
//   | "elegant-grid"
//   | "plain"
//   | "market-leading"
//   | "linkedin-style"
//   | "grid";

// interface Props {
//   templateId: TemplateID;
//   data: ResumeJSON;
// }

// const formatDateRange = (startDate?: string, endDate?: string): string => {
//   if (!startDate && !endDate) return "";
//   if (startDate && !endDate && startDate) return `${startDate} - Present`;
//   if (startDate && endDate) return `${startDate} - ${endDate}`;
//   if (startDate) return startDate;
//   if (endDate) return endDate;
//   return "";
// };

// export default function GenericTemplate({ templateId, data }: Props) {
//   const template = TEMPLATES.find((t) => t.id === templateId) || TEMPLATES[0];
//   const {
//     personal,
//     summary,
//     skills,
//     workExperiences,
//     educations,
//     volunteering,
//     certifications,
//     references,
//   } = data;

//   const commonTextClass = "text-gray-700 leading-relaxed";
//   const sectionItemClass =
//     "mb-4 py-3 border-b border-gray-200/60 last:border-b-0 item-no-break";
//   const strongTextClass = "text-gray-800 font-semibold";
//   const companyTextClass = "text-gray-600 italic";
//   const dateTextClass = "text-sm text-gray-500";
//   const listClass = "list-none ml-0 mt-2 space-y-1";

//   const renderHeader = () => (
//     <header
//       className={`p-6 sm:p-8 ${template.headerBg} section-no-break print-header border-b border-gray-200/80 shadow-sm`}
//     >
//       <h1 className="print-h1 text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">
//         {personal?.fullName || "Your Name"}
//       </h1>
//       <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
//         {personal?.email && (
//           <a href={`mailto:${personal.email}`} className="hover:text-blue-600">
//             {personal.email}
//           </a>
//         )}
//         {personal?.phone && <span>{personal.phone}</span>}
//         {personal?.city && personal?.country && (
//           <span>{`${personal.city}, ${personal.country}`}</span>
//         )}
//         {personal?.linkedinUrl && (
//           <a
//             href={personal.linkedinUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
//           >
//             LinkedIn Profile
//           </a>
//         )}
//       </div>
//     </header>
//   );

//   const renderSection = (
//     title: string,
//     content: React.ReactNode,
//     customClasses: string = "",
//   ) => (
//     <section
//       className={`group mb-6 sm:mb-8 ${customClasses} section-no-break print-section`}
//     >
//       <h2
//         className={`text-xl font-semibold uppercase tracking-wider ${template.accentBg} print-h2 rounded-t-lg border-b-2 border-gray-300/70 p-3 text-gray-800 sm:p-4`}
//       >
//         {title}
//       </h2>
//       <div className="print-section-content rounded-b-lg bg-white p-3 shadow-sm sm:p-4">
//         {content}
//       </div>
//     </section>
//   );

//   const renderListItem = (item: string, index: number) => (
//     <li
//       key={`skill-item-${index}`}
//       className="item-no-break mb-1.5 leading-relaxed text-gray-700"
//     >
//       {item}
//     </li>
//   );

//   const renderBulletItem = (
//     bullet: string,
//     index: number,
//     parentKey: string,
//   ) => (
//     <li
//       key={`${parentKey}-bullet-${index}`}
//       className="item-no-break relative mb-1.5 pl-4 leading-relaxed text-gray-700 before:absolute before:left-0 before:font-bold before:text-blue-500 before:content-['•']"
//     >
//       {bullet}
//     </li>
//   );

//   const renderContent = () => {
//     const workExperienceItems = workExperiences?.map((we, i) => (
//       <div key={`work-${i}`} className={`${sectionItemClass} group/item`}>
//         <h3 className={`${strongTextClass} print-h3 text-lg`}>{we.position}</h3>
//         <p className={`${companyTextClass} text-md`}>{we.company}</p>
//         <p className={dateTextClass}>
//           {formatDateRange(we.startDate, we.endDate)}
//         </p>
//         {we.bullets && we.bullets.length > 0 && (
//           <ul className={`${listClass} mt-2`}>
//             {we.bullets.map((b, bi) => renderBulletItem(b, bi, `work-${i}`))}
//           </ul>
//         )}
//       </div>
//     ));

//     const educationItems = educations?.map((ed, i) => (
//       <div key={`edu-${i}`} className={`${sectionItemClass}`}>
//         <p>
//           <strong className={strongTextClass}>{ed.degree}</strong>,{" "}
//           <span className={companyTextClass}>{ed.school}</span>
//         </p>
//         <p className={dateTextClass}>
//           {formatDateRange(ed.startDate, ed.endDate)}
//         </p>
//       </div>
//     ));

//     const volunteeringItems = (
//       isCardStyle: boolean = false,
//       isSidebar: boolean = false,
//     ) =>
//       volunteering?.map((v, i) => (
//         <div
//           key={`vol-${i}`}
//           className={
//             isCardStyle
//               ? "item-no-break mb-4 rounded-xl bg-white p-4 shadow-lg sm:p-5"
//               : `${sectionItemClass} ${isSidebar ? "py-2" : ""}`
//           }
//         >
//           <h3
//             className={`${strongTextClass} ${isSidebar ? "text-md" : "text-lg"} print-h3`}
//           >
//             {v.role}
//           </h3>
//           <p
//             className={`${companyTextClass} ${isSidebar ? "text-sm" : "text-md"}`}
//           >
//             {v.organization}
//           </p>
//           {(v.startDate || v.endDate) && (
//             <p className={dateTextClass}>
//               {formatDateRange(v.startDate, v.endDate)}
//             </p>
//           )}
//           {v.bullets && v.bullets.length > 0 && (
//             <ul className={`${listClass} mt-1.5`}>
//               {v.bullets.map((b, bi) => renderBulletItem(b, bi, `vol-${i}`))}
//             </ul>
//           )}
//         </div>
//       ));

//     const certificationItems = (
//       isCardStyle: boolean = false,
//       isSidebar: boolean = false,
//     ) =>
//       certifications?.map((c, i) => (
//         <div
//           key={`cert-${i}`}
//           className={
//             isCardStyle
//               ? "item-no-break mb-4 rounded-xl bg-white p-4 shadow-lg sm:p-5"
//               : `${sectionItemClass} ${isSidebar ? "py-2" : ""}`
//           }
//         >
//           {isSidebar || isCardStyle ? (
//             <>
//               <p>
//                 <strong className={strongTextClass}>{c.title}</strong>
//               </p>
//               <p className={companyTextClass}>{c.issuer}</p>
//             </>
//           ) : (
//             <p>
//               <strong className={strongTextClass}>{c.title}</strong>,{" "}
//               <span className={companyTextClass}>{c.issuer}</span>
//             </p>
//           )}
//           <p className={dateTextClass}>{c.date}</p>
//         </div>
//       ));

//     const referenceItems = (
//       isCardStyle: boolean = false,
//       isSidebar: boolean = false,
//     ) =>
//       references?.map((r, i) => (
//         <div
//           key={`ref-${i}`}
//           className={
//             isCardStyle
//               ? "item-no-break mb-4 rounded-xl bg-white p-4 shadow-lg sm:p-5"
//               : `${sectionItemClass} ${isSidebar ? "py-2" : ""}`
//           }
//         >
//           <p>
//             <strong className={strongTextClass}>{r.name}</strong>
//           </p>
//           <p className={commonTextClass}>{r.contact}</p>
//         </div>
//       ));

//     switch (template.layout) {
//       case "single-column":
//       case "plain":
//         return (
//           <div className="space-y-6 p-6 sm:p-8">
//             {summary &&
//               renderSection(
//                 "Summary",
//                 <p className={`${commonTextClass} text-justify`}>{summary}</p>,
//               )}
//             {skills &&
//               skills.length > 0 &&
//               renderSection(
//                 "Skills",
//                 <ul className="ml-0 list-inside list-disc columns-1 gap-x-6 text-gray-700 sm:columns-2">
//                   {skills.map(renderListItem)}
//                 </ul>,
//               )}
//             {workExperiences &&
//               workExperiences.length > 0 &&
//               renderSection("Work Experience", workExperienceItems)}
//             {educations &&
//               educations.length > 0 &&
//               renderSection("Education", educationItems)}
//             {volunteering &&
//               volunteering.length > 0 &&
//               renderSection("Volunteering", volunteeringItems())}
//             {certifications &&
//               certifications.length > 0 &&
//               renderSection("Certifications", certificationItems())}
//             {references &&
//               references.length > 0 &&
//               renderSection("References", referenceItems())}
//           </div>
//         );

//       case "market-leading":
//         return (
//           <div className="space-y-6 p-6 sm:p-8">
//             {summary &&
//               renderSection(
//                 "Professional Summary",
//                 <p className={`${commonTextClass} text-justify leading-normal`}>
//                   {summary.replace(/[^a-zA-Z0-9\s.,'()-]/g, "")}
//                 </p>,
//               )}
//             {skills &&
//               skills.length > 0 &&
//               renderSection(
//                 "Core Competencies",
//                 <ul className="list-none columns-1 gap-x-6 text-gray-700 sm:columns-2 md:columns-3">
//                   {skills.map((s, i) => (
//                     <li
//                       key={`skill-ml-${i}`}
//                       className="item-no-break mb-2 rounded-md bg-gray-100 p-2 shadow-sm"
//                     >
//                       {s}
//                     </li>
//                   ))}
//                 </ul>,
//               )}
//             {workExperiences &&
//               workExperiences.length > 0 &&
//               renderSection(
//                 "Professional Experience",
//                 workExperiences.map((we, i) => (
//                   <div
//                     key={`work-ml-${i}`}
//                     className={`${sectionItemClass} group/item py-4`}
//                   >
//                     <h3 className={`${strongTextClass} print-h3 block text-lg`}>
//                       {we.position}
//                       <span className={companyTextClass}> | {we.company}</span>
//                     </h3>
//                     <p className={`${dateTextClass} mb-1`}>
//                       {formatDateRange(we.startDate, we.endDate)}
//                     </p>
//                     {we.bullets && we.bullets.length > 0 && (
//                       <ul className={`${listClass} mt-3`}>
//                         {we.bullets.map((b, bi) =>
//                           renderBulletItem(b, bi, `work-ml-${i}`),
//                         )}
//                       </ul>
//                     )}
//                   </div>
//                 )),
//               )}
//             {educations &&
//               educations.length > 0 &&
//               renderSection(
//                 "Education",
//                 educations.map((ed, i) => (
//                   <div
//                     key={`edu-ml-${i}`}
//                     className={`${sectionItemClass} py-3`}
//                   >
//                     <p>
//                       <strong className={`${strongTextClass} text-md`}>
//                         {ed.degree}
//                       </strong>
//                       , <span className={companyTextClass}>{ed.school}</span>
//                     </p>
//                     <p className={dateTextClass}>
//                       {formatDateRange(ed.startDate, ed.endDate)}
//                     </p>
//                   </div>
//                 )),
//               )}
//             {volunteering &&
//               volunteering.length > 0 &&
//               renderSection("Volunteering", volunteeringItems())}
//             {certifications &&
//               certifications.length > 0 &&
//               renderSection(
//                 "Certifications",
//                 certifications.map((c, i) => (
//                   <div
//                     key={`cert-ml-${i}`}
//                     className={`${sectionItemClass} py-3`}
//                   >
//                     <p>
//                       <strong className={strongTextClass}>{c.title}</strong>
//                       <span className={companyTextClass}> | {c.issuer}</span>
//                     </p>
//                     <p className={dateTextClass}>{c.date}</p>
//                   </div>
//                 )),
//               )}
//             {references &&
//               references.length > 0 &&
//               renderSection("References", referenceItems())}
//           </div>
//         );

//       case "two-column":
//         return (
//           <div className="grid grid-cols-1 gap-6 p-6 sm:gap-8 sm:p-8 md:grid-cols-3">
//             <div className="space-y-6 md:col-span-1">
//               {skills &&
//                 skills.length > 0 &&
//                 renderSection(
//                   "Skills",
//                   <ul className="ml-0 list-inside list-disc space-y-1 text-gray-700">
//                     {skills.map(renderListItem)}
//                   </ul>,
//                   "bg-gray-50 rounded-lg shadow-sm",
//                 )}
//               {certifications &&
//                 certifications.length > 0 &&
//                 renderSection(
//                   "Certifications",
//                   certificationItems(false, true),
//                   "bg-gray-50 rounded-lg shadow-sm",
//                 )}
//               {references &&
//                 references.length > 0 &&
//                 renderSection(
//                   "References",
//                   referenceItems(false, true),
//                   "bg-gray-50 rounded-lg shadow-sm",
//                 )}
//             </div>
//             <div className="space-y-6 md:col-span-2">
//               {summary &&
//                 renderSection(
//                   "Summary",
//                   <p className={`${commonTextClass} text-justify`}>
//                     {summary}
//                   </p>,
//                 )}
//               {workExperiences &&
//                 workExperiences.length > 0 &&
//                 renderSection("Work Experience", workExperienceItems)}
//               {educations &&
//                 educations.length > 0 &&
//                 renderSection("Education", educationItems)}
//               {volunteering &&
//                 volunteering.length > 0 &&
//                 renderSection("Volunteering", volunteeringItems())}
//             </div>
//           </div>
//         );

//       case "timeline":
//         return (
//           <div className="p-6 sm:p-8">
//             {summary &&
//               renderSection(
//                 "Summary",
//                 <p className={`${commonTextClass} text-justify`}>{summary}</p>,
//               )}
//             {workExperiences &&
//               workExperiences.length > 0 &&
//               renderSection(
//                 "Work Experience",
//                 <div className="relative space-y-8 border-l-2 border-blue-500/50 py-4 pl-8">
//                   {workExperiences.map((we, i) => (
//                     <div
//                       key={`work-tl-${i}`}
//                       className="item-no-break relative"
//                     >
//                       <div className="absolute -left-[43px] top-1 h-5 w-5 rounded-full border-4 border-white bg-blue-500 ring-1 ring-blue-500/50"></div>
//                       <h3 className={`${strongTextClass} print-h3 text-lg`}>
//                         {we.position}
//                       </h3>
//                       <p className={`${companyTextClass} text-md`}>
//                         {we.company}
//                       </p>
//                       <p className={`${dateTextClass} mb-1`}>
//                         {formatDateRange(we.startDate, we.endDate)}
//                       </p>
//                       {we.bullets && we.bullets.length > 0 && (
//                         <ul className={`${listClass} mt-2`}>
//                           {we.bullets.map((b, bi) =>
//                             renderBulletItem(b, bi, `work-tl-${i}`),
//                           )}
//                         </ul>
//                       )}
//                     </div>
//                   ))}
//                 </div>,
//               )}
//             {educations &&
//               educations.length > 0 &&
//               renderSection(
//                 "Education",
//                 <div className="relative space-y-6 border-l-2 border-green-500/50 py-4 pl-8">
//                   {educations.map((ed, i) => (
//                     <div key={`edu-tl-${i}`} className="item-no-break relative">
//                       <div className="absolute -left-[43px] top-1 h-5 w-5 rounded-full border-4 border-white bg-green-500 ring-1 ring-green-500/50"></div>
//                       <p>
//                         <strong className={strongTextClass}>{ed.degree}</strong>
//                       </p>
//                       <p className={companyTextClass}>{ed.school}</p>
//                       <p className={dateTextClass}>
//                         {formatDateRange(ed.startDate, ed.endDate)}
//                       </p>
//                     </div>
//                   ))}
//                 </div>,
//               )}
//             {skills &&
//               skills.length > 0 &&
//               renderSection(
//                 "Skills",
//                 <ul className="ml-0 list-inside list-disc columns-1 gap-x-6 text-gray-700 sm:columns-2">
//                   {skills.map(renderListItem)}
//                 </ul>,
//               )}
//             {volunteering &&
//               volunteering.length > 0 &&
//               renderSection("Volunteering", volunteeringItems())}
//             {certifications &&
//               certifications.length > 0 &&
//               renderSection("Certifications", certificationItems())}
//             {references &&
//               references.length > 0 &&
//               renderSection("References", referenceItems())}
//           </div>
//         );

//       case "card":
//       case "linkedin-style":
//         const cardWrapperClass =
//           "p-4 mb-4 bg-white rounded-lg shadow-md item-no-break";
//         const isLinkedIn = template.id === "linkedin-style";
//         return (
//           <div className="space-y-6 bg-gray-50 p-6 sm:p-8">
//             {summary &&
//               renderSection(
//                 "Summary",
//                 <div className={cardWrapperClass}>
//                   <p className={`${commonTextClass} text-justify`}>{summary}</p>
//                 </div>,
//               )}
//             {skills &&
//               skills.length > 0 &&
//               renderSection(
//                 "Skills",
//                 <div className={cardWrapperClass}>
//                   <ul className="list-inside list-disc columns-1 gap-x-6 text-gray-700 sm:columns-2">
//                     {skills.map(renderListItem)}
//                   </ul>
//                 </div>,
//               )}
//             {workExperiences &&
//               workExperiences.length > 0 &&
//               renderSection(
//                 isLinkedIn ? "Experience" : "Work Experience",
//                 workExperiences.map((we, i) => (
//                   <div key={`work-card-${i}`} className={cardWrapperClass}>
//                     <h3
//                       className={`${strongTextClass} ${isLinkedIn ? "mb-0.5 text-xl" : "text-lg"} print-h3`}
//                     >
//                       {we.position}
//                     </h3>
//                     <p className={`${companyTextClass} text-md`}>
//                       {we.company}
//                     </p>
//                     <p className={`${dateTextClass} mb-1`}>
//                       {formatDateRange(we.startDate, we.endDate)}
//                     </p>
//                     {we.bullets && we.bullets.length > 0 && (
//                       <ul className={`${listClass} mt-2`}>
//                         {we.bullets.map((b, bi) =>
//                           renderBulletItem(b, bi, `work-card-${i}`),
//                         )}
//                       </ul>
//                     )}
//                   </div>
//                 )),
//               )}
//             {educations &&
//               educations.length > 0 &&
//               renderSection(
//                 "Education",
//                 educations.map((ed, i) => (
//                   <div key={`edu-card-${i}`} className={cardWrapperClass}>
//                     <p>
//                       <strong
//                         className={`${strongTextClass} ${isLinkedIn ? "text-lg" : "text-md"}`}
//                       >
//                         {ed.degree}
//                       </strong>
//                     </p>
//                     <p className={companyTextClass}>
//                       {isLinkedIn ? ed.school : `, ${ed.school}`}
//                     </p>
//                     <p className={dateTextClass}>
//                       {formatDateRange(ed.startDate, ed.endDate)}
//                     </p>
//                   </div>
//                 )),
//               )}
//             {volunteering &&
//               volunteering.length > 0 &&
//               renderSection("Volunteering", volunteeringItems(true))}
//             {certifications &&
//               certifications.length > 0 &&
//               renderSection("Certifications", certificationItems(true))}
//             {references &&
//               references.length > 0 &&
//               renderSection("References", referenceItems(true))}
//           </div>
//         );

//       case "grid":
//         return (
//           <div className="grid grid-cols-1 gap-6 p-6 sm:p-8 md:grid-cols-2">
//             {summary &&
//               renderSection(
//                 "Summary",
//                 <p className={`${commonTextClass} text-justify`}>{summary}</p>,
//               )}
//             {skills &&
//               skills.length > 0 &&
//               renderSection(
//                 "Skills",
//                 <ul className="ml-0 list-inside list-disc text-gray-700">
//                   {skills.map(renderListItem)}
//                 </ul>,
//               )}
//             {workExperiences &&
//               workExperiences.length > 0 &&
//               renderSection("Work Experience", workExperienceItems)}
//             {educations &&
//               educations.length > 0 &&
//               renderSection("Education", educationItems)}
//             {volunteering &&
//               volunteering.length > 0 &&
//               renderSection("Volunteering", volunteeringItems())}
//             {certifications &&
//               certifications.length > 0 &&
//               renderSection("Certifications", certificationItems())}
//             {references &&
//               references.length > 0 &&
//               renderSection("References", referenceItems())}
//           </div>
//         );

//       default:
//         const _exhaustiveCheck: never = template.layout;
//         return (
//           <div className="p-6 text-center text-gray-500">
//             Template layout not recognized: {String(_exhaustiveCheck)}
//           </div>
//         );
//     }
//   };

//   return (
//     <div
//       id="resumePreviewContent"
//       className="bg-white font-sans text-base text-gray-900 antialiased"
//     >
//       {renderHeader()}
//       <main>{renderContent()}</main>
//     </div>
//   );
// }

"use client";

import React from "react";
import { ResumeJSON } from "./ATSScore";
import { TEMPLATES } from "./Templates";

export type TemplateID =
  | "split-panel"
  | "timeline"
  | "card-stack"
  | "modern-minimal"
  | "elegant-grid"
  | "plain"
  | "market-leading"
  | "linkedin-style"
  | "grid";

interface Props {
  templateId: TemplateID;
  data: ResumeJSON;
}

const formatDateRange = (startDate?: string, endDate?: string): string => {
  if (!startDate && !endDate) return "";
  if (startDate && !endDate && startDate) return `${startDate} - Present`;
  if (startDate && endDate) return `${startDate} - ${endDate}`;
  if (startDate) return startDate;
  if (endDate) return endDate;
  return "";
};

export default function GenericTemplate({ templateId, data }: Props) {
  const template = TEMPLATES.find((t) => t.id === templateId) || TEMPLATES[0];
  const {
    personal,
    summary,
    skills,
    workExperiences,
    educations,
    volunteering,
    certifications,
    references,
  } = data;

  const commonTextClass = "text-gray-700 leading-relaxed";
  const sectionItemClass =
    "mb-4 py-3 border-b border-gray-200/60 last:border-b-0 item-no-break";
  const strongTextClass = "text-gray-800 font-semibold";
  const companyTextClass = "text-gray-600 italic";
  const dateTextClass = "text-sm text-gray-500";
  const listClass = "list-none ml-0 mt-2 space-y-1";

  const renderHeader = () => (
    <header
      className={`p-6 sm:p-8 ${template.headerBg} section-no-break print-header border-b border-gray-200/80 shadow-sm`}
    >
      <h1 className="print-h1 text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">
        {personal?.fullName || "Your Name"}
      </h1>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
        {personal?.email && (
          <a href={`mailto:${personal.email}`} className="hover:text-blue-600">
            {personal.email}
          </a>
        )}
        {personal?.phone && <span>{personal.phone}</span>}
        {personal?.city && personal?.country && (
          <span>{`${personal.city}, ${personal.country}`}</span>
        )}
        {personal?.linkedinUrl && (
          <a
            href={personal.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
          >
            LinkedIn Profile
          </a>
        )}
      </div>
    </header>
  );

  const renderSection = (
    title: string,
    content: React.ReactNode,
    customClasses: string = "",
  ) => (
    <section
      className={`group mb-6 sm:mb-8 ${customClasses} section-no-break print-section`}
    >
      <h2
        className={`text-xl font-semibold uppercase tracking-wider ${template.accentBg} print-h2 rounded-t-lg border-b-2 border-gray-300/70 p-3 text-gray-800 sm:p-4`}
      >
        {title}
      </h2>
      <div className="print-section-content rounded-b-lg bg-white p-3 shadow-sm sm:p-4">
        {content}
      </div>
    </section>
  );

  const renderListItem = (item: string, index: number) => (
    <li
      key={`skill-item-${index}`}
      className="item-no-break mb-1.5 leading-relaxed text-gray-700"
    >
      {item}
    </li>
  );

  const renderBulletItem = (
    bullet: string,
    index: number,
    parentKey: string,
  ) => (
    <li
      key={`${parentKey}-bullet-${index}`}
      className="item-no-break relative mb-1.5 pl-4 leading-relaxed text-gray-700 before:absolute before:left-0 before:font-bold before:text-blue-500 before:content-['•']"
    >
      {bullet}
    </li>
  );

  const renderContent = () => {
    const workExperienceItems = workExperiences?.map((we, i) => (
      <div key={`work-${i}`} className={`${sectionItemClass} group/item`}>
        <h3 className={`${strongTextClass} print-h3 text-lg`}>{we.position}</h3>
        <p className={`${companyTextClass} text-md`}>{we.company}</p>
        <p className={dateTextClass}>
          {formatDateRange(we.startDate, we.endDate)}
        </p>
        {we.bullets && we.bullets.length > 0 && (
          <ul className={`${listClass} mt-2`}>
            {we.bullets.map((b, bi) => renderBulletItem(b, bi, `work-${i}`))}
          </ul>
        )}
      </div>
    ));

    const educationItems = educations?.map((ed, i) => (
      <div key={`edu-${i}`} className={`${sectionItemClass}`}>
        <p>
          <strong className={strongTextClass}>{ed.degree}</strong>,{" "}
          <span className={companyTextClass}>{ed.school}</span>
        </p>
        <p className={dateTextClass}>
          {formatDateRange(ed.startDate, ed.endDate)}
        </p>
      </div>
    ));

    const volunteeringItems = (
      isCardStyle: boolean = false,
      isSidebar: boolean = false,
    ) =>
      // volunteering?.map((v, i) => (
      //   <div
      //     key={`vol-${i}`}
      //     className={
      //       isCardStyle
      //         ? "item-no-break mb-4 rounded-xl bg-white p-4 shadow-lg sm:p-5"
      //         : `${sectionItemClass} ${isSidebar ? "py-2" : ""}`
      //     }
      //   >
      //     <h3
      //       className={`${strongTextClass} ${isSidebar ? "text-md" : "text-lg"} print-h3`}
      //     >
      //       {v.role}
      //     </h3>
      //     <p
      //       className={`${companyTextClass} ${isSidebar ? "text-sm" : "text-md"}`}
      //     >
      //       {v.organization}
      //     </p>
      //     {(v.startDate || v.endDate) && (
      //       <p className={dateTextClass}>
      //         {formatDateRange(v.startDate, v.endDate)}
      //       </p>
      //     )}
      //     {v.bullets && v.bullets.length > 0 && (
      //       <ul className={`${listClass} mt-1.5`}>
      //         {v.bullets.map((b, bi) => renderBulletItem(b, bi, `vol-${i}`))} // Error: &apos;we&apos; is not defined
      //       </ul>
      //     )}
      //   </div>
      // ));
      volunteering?.map((v, i) => (
        <div
          key={`vol-${i}`}
          className={
            isCardStyle
              ? "item-no-break mb-4 rounded-xl bg-white p-4 shadow-lg sm:p-5"
              : `${sectionItemClass} ${isSidebar ? "py-2" : ""}`
          }
        >
          <h3
            className={`${strongTextClass} ${isSidebar ? "text-md" : "text-lg"} print-h3`}
          >
            {v.role}
          </h3>
          <p
            className={`${companyTextClass} ${isSidebar ? "text-sm" : "text-md"}`}
          >
            {v.organization}
          </p>
          {(v.startDate || v.endDate) && (
            <p className={dateTextClass}>
              {formatDateRange(v.startDate, v.endDate)}
            </p>
          )}
          {v.bullets && v.bullets.length > 0 && (
            <ul className={`${listClass} mt-1.5`}>
              {v.bullets.map((b, bi) => renderBulletItem(b, bi, `vol-${i}`))}
            </ul>
          )}
        </div>
      ));

    const certificationItems = (
      isCardStyle: boolean = false,
      isSidebar: boolean = false,
    ) =>
      certifications?.map((c, i) => (
        <div
          key={`cert-${i}`}
          className={
            isCardStyle
              ? "item-no-break mb-4 rounded-xl bg-white p-4 shadow-lg sm:p-5"
              : `${sectionItemClass} ${isSidebar ? "py-2" : ""}`
          }
        >
          {isSidebar || isCardStyle ? (
            <>
              <p>
                <strong className={strongTextClass}>{c.title}</strong>
              </p>
              <p className={companyTextClass}>{c.issuer}</p>
            </>
          ) : (
            <p>
              <strong className={strongTextClass}>{c.title}</strong>,{" "}
              <span className={companyTextClass}>{c.issuer}</span>
            </p>
          )}
          <p className={dateTextClass}>{c.date}</p>
        </div>
      ));

    const referenceItems = (
      isCardStyle: boolean = false,
      isSidebar: boolean = false,
    ) =>
      references?.map((r, i) => (
        <div
          key={`ref-${i}`}
          className={
            isCardStyle
              ? "item-no-break mb-4 rounded-xl bg-white p-4 shadow-lg sm:p-5"
              : `${sectionItemClass} ${isSidebar ? "py-2" : ""}`
          }
        >
          <p>
            <strong className={strongTextClass}>{r.name}</strong>
          </p>
          <p className={commonTextClass}>{r.contact}</p>
        </div>
      ));

    switch (template.layout) {
      case "single-column":
      case "plain": {
        const workExperienceItems = workExperiences?.map((we, i) => (
          <div key={`work-${i}`} className={`${sectionItemClass} group/item`}>
            <h3 className={`${strongTextClass} print-h3 text-lg`}>
              {we.position}
            </h3>
            <p className={`${companyTextClass} text-md`}>{we.company}</p>
            <p className={dateTextClass}>
              {formatDateRange(we.startDate, we.endDate)}
            </p>
            {we.bullets && we.bullets.length > 0 && (
              <ul className={`${listClass} mt-2`}>
                {we.bullets.map((b, bi) =>
                  renderBulletItem(b, bi, `work-${i}`),
                )}
              </ul>
            )}
          </div>
        ));

        const educationItems = educations?.map((ed, i) => (
          <div key={`edu-${i}`} className={`${sectionItemClass}`}>
            <p>
              <strong className={strongTextClass}>{ed.degree}</strong>,{" "}
              <span className={companyTextClass}>{ed.school}</span>
            </p>
            <p className={dateTextClass}>
              {formatDateRange(ed.startDate, ed.endDate)}
            </p>
          </div>
        ));

        return (
          <div className="space-y-6 p-6 sm:p-8">
            {summary &&
              renderSection(
                "Summary",
                <p className={`${commonTextClass} text-justify`}>{summary}</p>,
              )}
            {skills &&
              skills.length > 0 &&
              renderSection(
                "Skills",
                <ul className="ml-0 list-inside list-disc columns-1 gap-x-6 text-gray-700 sm:columns-2">
                  {skills.map(renderListItem)}
                </ul>,
              )}
            {workExperiences &&
              workExperiences.length > 0 &&
              renderSection("Work Experience", workExperienceItems)}
            {educations &&
              educations.length > 0 &&
              renderSection("Education", educationItems)}
            {volunteering &&
              volunteering.length > 0 &&
              renderSection("Volunteering", volunteeringItems())}
            {certifications &&
              certifications.length > 0 &&
              renderSection("Certifications", certificationItems())}
            {references &&
              references.length > 0 &&
              renderSection("References", referenceItems())}
          </div>
        );
      }

      case "market-leading":
        return (
          <div className="space-y-6 p-6 sm:p-8">
            {summary &&
              renderSection(
                "Professional Summary",
                <p className={`${commonTextClass} text-justify leading-normal`}>
                  {summary.replace(/[^a-zA-Z0-9\s.,'()-]/g, "")}
                </p>,
              )}
            {skills &&
              skills.length > 0 &&
              renderSection(
                "Core Competencies",
                <ul className="list-none columns-1 gap-x-6 text-gray-700 sm:columns-2 md:columns-3">
                  {skills.map((s, i) => (
                    <li
                      key={`skill-ml-${i}`}
                      className="item-no-break mb-2 rounded-md bg-gray-100 p-2 shadow-sm"
                    >
                      {s}
                    </li>
                  ))}
                </ul>,
              )}
            {workExperiences &&
              workExperiences.length > 0 &&
              renderSection(
                "Professional Experience",
                workExperiences.map((we, i) => (
                  <div
                    key={`work-ml-${i}`}
                    className={`${sectionItemClass} group/item py-4`}
                  >
                    <h3 className={`${strongTextClass} print-h3 block text-lg`}>
                      {we.position}
                      <span className={companyTextClass}> | {we.company}</span>
                    </h3>
                    <p className={`${dateTextClass} mb-1`}>
                      {formatDateRange(we.startDate, we.endDate)}
                    </p>
                    {we.bullets && we.bullets.length > 0 && (
                      <ul className={`${listClass} mt-3`}>
                        {we.bullets.map((b, bi) =>
                          renderBulletItem(b, bi, `work-ml-${i}`),
                        )}
                      </ul>
                    )}
                  </div>
                )),
              )}
            {educations &&
              educations.length > 0 &&
              renderSection(
                "Education",
                educations.map((ed, i) => (
                  <div
                    key={`edu-ml-${i}`}
                    className={`${sectionItemClass} py-3`}
                  >
                    <p>
                      <strong className={`${strongTextClass} text-md`}>
                        {ed.degree}
                      </strong>
                      , <span className={companyTextClass}>{ed.school}</span>
                    </p>
                    <p className={dateTextClass}>
                      {formatDateRange(ed.startDate, ed.endDate)}
                    </p>
                  </div>
                )),
              )}
            {volunteering &&
              volunteering.length > 0 &&
              renderSection("Volunteering", volunteeringItems())}
            {certifications &&
              certifications.length > 0 &&
              renderSection(
                "Certifications",
                certifications.map((c, i) => (
                  <div
                    key={`cert-ml-${i}`}
                    className={`${sectionItemClass} py-3`}
                  >
                    <p>
                      <strong className={strongTextClass}>{c.title}</strong>
                      <span className={companyTextClass}> | {c.issuer}</span>
                    </p>
                    <p className={dateTextClass}>{c.date}</p>
                  </div>
                )),
              )}
            {references &&
              references.length > 0 &&
              renderSection("References", referenceItems())}
          </div>
        );

      case "two-column":
        return (
          <div className="grid grid-cols-1 gap-6 p-6 sm:gap-8 sm:p-8 md:grid-cols-3">
            <div className="space-y-6 md:col-span-1">
              {skills &&
                skills.length > 0 &&
                renderSection(
                  "Skills",
                  <ul className="ml-0 list-inside list-disc space-y-1 text-gray-700">
                    {skills.map(renderListItem)}
                  </ul>,
                  "bg-gray-50 rounded-lg shadow-sm",
                )}
              {certifications &&
                certifications.length > 0 &&
                renderSection(
                  "Certifications",
                  certificationItems(false, true),
                  "bg-gray-50 rounded-lg shadow-sm",
                )}
              {references &&
                references.length > 0 &&
                renderSection(
                  "References",
                  referenceItems(false, true),
                  "bg-gray-50 rounded-lg shadow-sm",
                )}
            </div>
            <div className="space-y-6 md:col-span-2">
              {summary &&
                renderSection(
                  "Summary",
                  <p className={`${commonTextClass} text-justify`}>
                    {summary}
                  </p>,
                )}
              {workExperiences &&
                workExperiences.length > 0 &&
                renderSection("Work Experience", workExperienceItems)}
              {educations &&
                educations.length > 0 &&
                renderSection("Education", educationItems)}
              {volunteering &&
                volunteering.length > 0 &&
                renderSection("Volunteering", volunteeringItems())}
            </div>
          </div>
        );

      case "timeline":
        return (
          <div className="p-6 sm:p-8">
            {summary &&
              renderSection(
                "Summary",
                <p className={`${commonTextClass} text-justify`}>{summary}</p>,
              )}
            {workExperiences &&
              workExperiences.length > 0 &&
              renderSection(
                "Work Experience",
                <div className="relative space-y-8 border-l-2 border-blue-500/50 py-4 pl-8">
                  {workExperiences.map((we, i) => (
                    <div
                      key={`work-tl-${i}`}
                      className="item-no-break relative"
                    >
                      <div className="absolute -left-[43px] top-1 h-5 w-5 rounded-full border-4 border-white bg-blue-500 ring-1 ring-blue-500/50"></div>
                      <h3 className={`${strongTextClass} print-h3 text-lg`}>
                        {we.position}
                      </h3>
                      <p className={`${companyTextClass} text-md`}>
                        {we.company}
                      </p>
                      <p className={`${dateTextClass} mb-1`}>
                        {formatDateRange(we.startDate, we.endDate)}
                      </p>
                      {we.bullets && we.bullets.length > 0 && (
                        <ul className={`${listClass} mt-2`}>
                          {we.bullets.map((b, bi) =>
                            renderBulletItem(b, bi, `work-tl-${i}`),
                          )}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>,
              )}
            {educations &&
              educations.length > 0 &&
              renderSection(
                "Education",
                <div className="relative space-y-6 border-l-2 border-green-500/50 py-4 pl-8">
                  {educations.map((ed, i) => (
                    <div key={`edu-tl-${i}`} className="item-no-break relative">
                      <div className="absolute -left-[43px] top-1 h-5 w-5 rounded-full border-4 border-white bg-green-500 ring-1 ring-green-500/50"></div>
                      <p>
                        <strong className={strongTextClass}>{ed.degree}</strong>
                      </p>
                      <p className={companyTextClass}>{ed.school}</p>
                      <p className={dateTextClass}>
                        {formatDateRange(ed.startDate, ed.endDate)}
                      </p>
                    </div>
                  ))}
                </div>,
              )}
            {skills &&
              skills.length > 0 &&
              renderSection(
                "Skills",
                <ul className="ml-0 list-inside list-disc columns-1 gap-x-6 text-gray-700 sm:columns-2">
                  {skills.map(renderListItem)}
                </ul>,
              )}
            {volunteering &&
              volunteering.length > 0 &&
              renderSection("Volunteering", volunteeringItems())}
            {certifications &&
              certifications.length > 0 &&
              renderSection("Certifications", certificationItems())}
            {references &&
              references.length > 0 &&
              renderSection("References", referenceItems())}
          </div>
        );

      case "card":
      case "linkedin-style": {
        const cardWrapperClass =
          "p-4 mb-4 bg-white rounded-lg shadow-md item-no-break";
        const isLinkedIn = template.id === "linkedin-style";
        return (
          <div className="space-y-6 bg-gray-50 p-6 sm:p-8">
            {summary &&
              renderSection(
                "Summary",
                <div className={cardWrapperClass}>
                  <p className={`${commonTextClass} text-justify`}>{summary}</p>
                </div>,
              )}
            {skills &&
              skills.length > 0 &&
              renderSection(
                "Skills",
                <div className={cardWrapperClass}>
                  <ul className="list-inside list-disc columns-1 gap-x-6 text-gray-700 sm:columns-2">
                    {skills.map(renderListItem)}
                  </ul>
                </div>,
              )}
            {workExperiences &&
              workExperiences.length > 0 &&
              renderSection(
                isLinkedIn ? "Experience" : "Work Experience",
                workExperiences.map((we, i) => (
                  <div key={`work-card-${i}`} className={cardWrapperClass}>
                    <h3
                      className={`${strongTextClass} ${isLinkedIn ? "mb-0.5 text-xl" : "text-lg"} print-h3`}
                    >
                      {we.position}
                    </h3>
                    <p className={`${companyTextClass} text-md`}>
                      {we.company}
                    </p>
                    <p className={`${dateTextClass} mb-1`}>
                      {formatDateRange(we.startDate, we.endDate)}
                    </p>
                    {we.bullets && we.bullets.length > 0 && (
                      <ul className={`${listClass} mt-2`}>
                        {we.bullets.map((b, bi) =>
                          renderBulletItem(b, bi, `work-card-${i}`),
                        )}
                      </ul>
                    )}
                  </div>
                )),
              )}
            {educations &&
              educations.length > 0 &&
              renderSection(
                "Education",
                educations.map((ed, i) => (
                  <div key={`edu-card-${i}`} className={cardWrapperClass}>
                    <p>
                      <strong
                        className={`${strongTextClass} ${isLinkedIn ? "text-lg" : "text-md"}`}
                      >
                        {ed.degree}
                      </strong>
                    </p>
                    <p className={companyTextClass}>
                      {isLinkedIn ? ed.school : `, ${ed.school}`}
                    </p>
                    <p className={dateTextClass}>
                      {formatDateRange(ed.startDate, ed.endDate)}
                    </p>
                  </div>
                )),
              )}
            {volunteering &&
              volunteering.length > 0 &&
              renderSection("Volunteering", volunteeringItems(true))}
            {certifications &&
              certifications.length > 0 &&
              renderSection("Certifications", certificationItems(true))}
            {references &&
              references.length > 0 &&
              renderSection("References", referenceItems(true))}
          </div>
        );
      }

      case "grid":
        return (
          <div className="grid grid-cols-1 gap-6 p-6 sm:p-8 md:grid-cols-2">
            {summary &&
              renderSection(
                "Summary",
                <p className={`${commonTextClass} text-justify`}>{summary}</p>,
              )}
            {skills &&
              skills.length > 0 &&
              renderSection(
                "Skills",
                <ul className="ml-0 list-inside list-disc text-gray-700">
                  {skills.map(renderListItem)}
                </ul>,
              )}
            {workExperiences &&
              workExperiences.length > 0 &&
              renderSection("Work Experience", workExperienceItems)}
            {educations &&
              educations.length > 0 &&
              renderSection("Education", educationItems)}
            {volunteering &&
              volunteering.length > 0 &&
              renderSection("Volunteering", volunteeringItems())}
            {certifications &&
              certifications.length > 0 &&
              renderSection("Certifications", certificationItems())}
            {references &&
              references.length > 0 &&
              renderSection("References", referenceItems())}
          </div>
        );

      default: {
        const _exhaustiveCheck: never = template.layout;
        return (
          <div className="p-6 text-center text-gray-500">
            Template layout not recognized: {String(_exhaustiveCheck)}
          </div>
        );
      }
    }
  };

  return (
    <div
      id="resumePreviewContent"
      className="bg-white font-sans text-base text-gray-900 antialiased"
    >
      {renderHeader()}
      <main>{renderContent()}</main>
    </div>
  );
}
