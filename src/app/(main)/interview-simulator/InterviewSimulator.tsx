// // "use client";
// // import { useInterview } from '@/hooks/useInterview';
// // import { useState } from 'react';
// // import { motion } from 'framer-motion';
// // import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

// // export default function InterviewSimulator() {
// //   const {
// //     question,
// //     questionNumber,
// //     feedbackSections,
// //     careerConfidenceScore,
// //     totalScore,
// //     transcript,
// //     typedAnswer,
// //     listening,
// //     audioFeedbackEnabled,
// //     eqMetrics,
// //     isAIAnswer,
// //     isEvaluating,
// //     hint,
// //     repeated,
// //     followUpActive,
// //     followUpQuestion,
// //     setTypedAnswer,
// //     startInterview,
// //     startRecording,
// //     stopRecording,
// //     submitTypedAnswer,
// //     toggleFeedbackAudio,
// //     nextQuestion,
// //     shareTotalScore,
// //     copySession,
// //     fetchHint,
// //     setDetails,
// //     competencies
// //   } = useInterview();

// //   const [showTypeInput, setShowTypeInput] = useState(false);
// //   const [skipPersonalization, setSkip] = useState(false);
// //   const [details, _setDetails] = useState({
// //     role: '',
// //     jobDescription: '',
// //     userInfo: '',
// //     persona: 'General / Neutral',
// //   });
// //   // sync local details into hook
// //   const updateDetail = (k: string, v: string) => {
// //     _setDetails(prev => ({ ...prev, [k]: v }));
// //     setDetails({ ...details, [k]: v });
// //   };

// //   const initiate = () => startInterview(skipPersonalization ? {
// //     role: '', jobDescription: '', userInfo: '', persona: 'Tech Guru',
// //   } : details);

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
// //       transition={{ duration: 0.5 }} className="p-8 max-w-3xl mx-auto space-y-6"
// //     >
// //       <motion.h1 initial={{ y:-20, opacity:0 }} animate={{ y:0, opacity:1 }} className="text-3xl font-bold">
// //         🎙 AI Interview Simulator
// //       </motion.h1>

// //       {questionNumber === 1 && !question && (
// //         <motion.div initial={{ scale:0.95 }} animate={{ scale:1 }} className="space-y-3">
// //           <label className="flex items-center gap-2">
// //             <input type="checkbox" checked={skipPersonalization} onChange={() => setSkip(x => !x)} />
// //             Skip personalization
// //           </label>

// //           {!skipPersonalization && (
// //             <>
// //               <motion.input
// //                 whileFocus={{ scale:1.02 }}
// //                 placeholder="Job Role"
// //                 value={details.role}
// //                 onChange={e => updateDetail('role', e.target.value)}
// //                 className="border w-full rounded p-3"
// //               />
// //               <motion.textarea
// //                 whileFocus={{ scale:1.02 }}
// //                 placeholder="Job Description"
// //                 value={details.jobDescription}
// //                 onChange={e => updateDetail('jobDescription', e.target.value)}
// //                 className="border w-full rounded p-3"
// //                 rows={3}
// //               />
// //               <motion.textarea
// //                 whileFocus={{ scale:1.02 }}
// //                 placeholder="Your background"
// //                 value={details.userInfo}
// //                 onChange={e => updateDetail('userInfo', e.target.value)}
// //                 className="border w-full rounded p-3"
// //                 rows={3}
// //               />
// // <label className="block mb-2">
// //   Interviewer Persona:
// //   <select
// //     value={details.persona}
// //     onChange={e => updateDetail('persona', e.target.value)}
// //     className="ml-2 border rounded p-1 w-full"
// //   >
// //     <option value="General / Neutral">General / Neutral</option>

// //     <optgroup label="Industry/Role-Specific">
// //       <option>Tech Guru</option>
// //       <option>C-Suite Stress-Test</option>
// //       <option>Finance Strategist</option>
// //       <option>Healthcare Expert</option>
// //       <option>Creative Innovator</option>
// //     </optgroup>

// //     <optgroup label="Behavioral/Coaching">
// //       <option>Culture Fit Coach</option>
// //       <option>Team Synergy Coach</option>
// //       <option>Resilience Mentor</option>
// //     </optgroup>

// //     <optgroup label="Inspirational/Legacy">
// //       <option>Legacy: Steve Jobs</option>
// //       <option>Legacy: Maya Angelou</option>
// //       <option>Legacy: Elon Musk</option>
// //       <option>Legacy: Oprah Winfrey</option>
// //     </optgroup>

// //     <optgroup label="Question-Type Specific">
// //       <option>Case Study Master</option>
// //       <option>Technical Deep-Dive</option>
// //       <option>Hypothetical Scenario Guru</option>
// //     </optgroup>
// //   </select>
// // </label>
// //             </>
// //           )}

// //           <motion.button
// //             onClick={initiate}
// //             whileHover={{ scale:1.05 }}
// //             className="bg-blue-600 text-white px-5 py-2 rounded"
// //           >
// //             Start Interview 🎤
// //           </motion.button>
// //         </motion.div>
// //       )}

// //       {question && (
// //         <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="space-y-4">
// //           <motion.div className="p-4 bg-indigo-50 rounded space-y-2">
// //             <p className="font-semibold">Question {questionNumber}/5:</p>
// //             <p className="whitespace-pre-wrap">{followUpActive ? followUpQuestion : question}</p>
// //             {repeated && <div className="text-yellow-700 bg-yellow-100 p-2 rounded">⚠️ You’ve seen this question before!</div>}
// //             {!followUpActive && (
// //               <motion.button onClick={copySession} whileHover={{ scale:1.02 }} className="text-sm bg-gray-200 px-2 py-1 rounded">
// //                 📋 Copy Q&A
// //               </motion.button>
// //             )}
// //           </motion.div>

// //           {isEvaluating && (
// //             <motion.div animate={{ opacity:[0.5,1,0.5] }} transition={{ repeat:Infinity, duration:1 }} className="p-4 bg-yellow-100 rounded flex items-center gap-2">
// //               <div className="loader h-5 w-5 border-4 border-blue-500 border-t-transparent rounded-full"></div>
// //               <span>Analyzing your response...</span>
// //             </motion.div>
// //           )}

// //           <div className="space-x-2">
// //             {listening ? (
// //               <motion.button onClick={stopRecording} animate={{ scale:[1,1.1,1] }} transition={{ repeat:Infinity, duration:1 }} className="bg-red-500 text-white px-4 py-2 rounded">
// //                 ⏹ Stop Recording
// //               </motion.button>
// //             ) : (
// //               <motion.button onClick={startRecording} whileHover={{ scale:1.05 }} className="bg-green-500 text-white px-4 py-2 rounded">
// //                 ▶️ Start Recording
// //               </motion.button>
// //             )}
// //             <motion.button onClick={() => setShowTypeInput(x => !x)} whileHover={{ scale:1.05 }} className="bg-gray-800 text-white px-4 py-2 rounded">
// //               {showTypeInput ? 'Hide Typing' : 'Type Answer Instead'}
// //             </motion.button>
// //             {!followUpActive && (
// //               <motion.button onClick={fetchHint} whileHover={{ scale:1.05 }} className="bg-blue-200 px-3 py-1 rounded">
// //                 💡 Hint
// //               </motion.button>
// //             )}
// //           </div>

// //           {showTypeInput && (
// //             <motion.div initial={{ height:0 }} animate={{ height:'auto' }} transition={{ duration:0.3 }} className="overflow-hidden space-y-2">
// //               <textarea value={typedAnswer} onChange={e => setTypedAnswer(e.target.value)} className="border w-full rounded p-3" rows={3}/>
// //               <motion.button onClick={submitTypedAnswer} whileHover={{ scale:1.05 }} className="bg-purple-600 text-white px-4 py-2 rounded">
// //                 Submit Answer
// //               </motion.button>
// //             </motion.div>
// //           )}

// //           {hint && (
// //             <motion.div initial={{ x:-20, opacity:0 }} animate={{ x:0, opacity:1 }} transition={{ duration:0.3 }} className="p-3 bg-blue-50 rounded">
// //               <strong>Hint:</strong> {hint}
// //             </motion.div>
// //           )}

// //           {transcript && (
// //             <motion.div initial={{ x:20, opacity:0 }} animate={{ x:0, opacity:1 }} transition={{ duration:0.3 }} className="p-4 bg-yellow-50 rounded">
// //               <strong>Your Answer:</strong>
// //               <p className="whitespace-pre-wrap mt-1">{transcript}</p>
// //             </motion.div>
// //           )}

// //           {feedbackSections && (
// //             <motion.div initial={{ scale:0.95, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ duration:0.4 }} className="p-4 bg-green-50 rounded space-y-3">
// //               {isAIAnswer && <div className="p-2 bg-red-100 rounded">⚠️ This answer may be AI-generated.</div>}
// //               <strong>🚀 Feedback (STAR):</strong>
// //               <ul className="list-disc list-inside space-y-1">
// //                 <li><strong>Situation:</strong> {feedbackSections.situation}</li>
// //                 <li><strong>Task:</strong> {feedbackSections.task}</li>
// //                 <li><strong>Action:</strong> {feedbackSections.action}</li>
// //                 <li><strong>Result:</strong> {feedbackSections.result}</li>
// //               </ul>
// //               <div><strong>Suggestions:</strong>
// //                 <ul className="list-decimal list-inside ml-5">
// //                   {feedbackSections.suggestions.map((s,i)=><li key={i}>{s}</li>)}
// //                 </ul>
// //               </div>

// //               <motion.div whileHover={{ scale:1.02 }} className="grid grid-cols-3 gap-4">
// //                 <div><strong>Confidence:</strong> {eqMetrics.confidence}/100</div>
// //                 <div><strong>Enthusiasm:</strong> {eqMetrics.enthusiasm}/100</div>
// //                 <div><strong>Empathy:</strong> {eqMetrics.empathy}/100</div>
// //               </motion.div>

// //               <div className="mt-4 space-y-1">
// //                 <div>🎯 Score: <strong>{careerConfidenceScore}/100</strong></div>
// //                 <div>🏅 Total: <strong>{totalScore}/500</strong></div>
// //                 <div className="w-full bg-gray-200 rounded-full h-2">
// //                   <motion.div
// //                     initial={{ width: 0 }}
// //                     animate={{ width: `${((questionNumber-1)/5)*100}%` }}
// //                     transition={{ duration:0.5 }}
// //                     className="bg-blue-600 h-2 rounded-full"
// //                   />
// //                 </div>
// //               </div>

// //               <div className="mt-6 bg-white p-4 rounded shadow">
// //           <h3 className="font-semibold mb-2">🔎 Competency Gap Analysis</h3>
// //           <ResponsiveContainer width="100%" height={300}>
// //             <RadarChart
// //               data={[
// //                 { subject: 'Technical', A: competencies.technical },
// //                 { subject: 'Behavioral', A: competencies.behavioral },
// //                 { subject: 'Situational', A: competencies.situational },
// //                 { subject: 'Leadership', A: competencies.leadership },
// //                 { subject: 'Communication', A: competencies.communication },
// //                 { subject: 'Culture Fit', A: competencies.cultureFit },
// //               ]}
// //             >
// //               <PolarGrid />
// //               <PolarAngleAxis dataKey="subject" />
// //               <PolarRadiusAxis angle={30} domain={[0, 100]} />
// //               <Radar
// //                 name="You"
// //                 dataKey="A"
// //                 stroke="#8884d8"
// //                 fill="#8884d8"
// //                 fillOpacity={0.6}
// //               />
// //             </RadarChart>
// //           </ResponsiveContainer>

// //           <p className="text-sm text-gray-600 mt-2">
// //             Focus on areas under 50% to improve—click “Hint” for targeted practice questions!
// //           </p>

// //           <div className="mt-3 flex flex-wrap gap-2">
// //             {Object.entries(competencies).map(([key, val]) =>
// //               val < 50 && (
// //                 <button
// //                   key={key}
// //                   // onClick={() => generateDrillQuestion(key)}
// //                   className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm"
// //                 >
// //                   Practice {key.charAt(0).toUpperCase() + key.slice(1)}
// //                 </button>
// //               )
// //             )}
// //           </div>
// //         </div>
// //               <div className="flex gap-2">
// //                 <motion.button onClick={toggleFeedbackAudio} whileHover={{ scale:1.05 }} className="bg-purple-500 text-white px-3 py-2 rounded">
// //                   {audioFeedbackEnabled ? '🔈 Disable Audio' : '🔊 Enable Audio'}
// //                 </motion.button>
// //                 {!followUpActive && (questionNumber < 5 ? (
// //                   <motion.button onClick={nextQuestion} whileHover={{ scale:1.05 }} className="bg-blue-500 text-white px-3 py-2 rounded">
// //                     Next Question →
// //                   </motion.button>
// //                 ) : (
// //                   <motion.button onClick={shareTotalScore} whileHover={{ scale:1.05 }} className="bg-orange-500 text-white px-3 py-2 rounded">
// //                     🚀 Share My Total Score!
// //                   </motion.button>
// //                 ))}
// //               </div>
// //             </motion.div>
// //           )}
// //         </motion.div>
// //       )}
// //     </motion.div>
// //   );
// // }

// "use client";

// import { useState, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Radar,
//   RadarChart,
//   PolarGrid,
//   PolarAngleAxis,
//   PolarRadiusAxis,
//   ResponsiveContainer,
//   Tooltip,
// } from 'recharts';
// import { Mic, Volume2, VolumeX } from 'lucide-react';
// import { useInterview } from '@/hooks/useInterview';

// export default function InterviewSimulator() {
//   const {
//     question,
//     questionNumber,
//     feedbackSections,
//     careerConfidenceScore,
//     totalScore,
//     transcript,
//     typedAnswer,
//     listening,
//     audioFeedbackEnabled,
//     eqMetrics,
//     isAIAnswer,
//     isEvaluating,
//     hint,
//     repeated,
//     followUpActive,
//     followUpQuestion,
//     setTypedAnswer,
//     startInterview,
//     startRecording,
//     stopRecording,
//     submitTypedAnswer,
//     toggleFeedbackAudio,
//     nextQuestion,
//     shareTotalScore,
//     copySession,
//     fetchHint,
//     setDetails,
//     competencies,
//   } = useInterview();

//   // Local form state (instant updates)
//   const [details, setLocalDetails] = useState({
//     role: '',
//     jobDescription: '',
//     userInfo: '',
//     persona: 'General / Neutral',
//   });
//   const [skipPersonalization, setSkipPersonalization] = useState(false);
//   const [showTypeInput, setShowTypeInput] = useState(false);
//   const syncTimer = useRef<NodeJS.Timeout>();

//   // Update local immediately, sync to hook after 300ms
//   function handleDetailChange(key: keyof typeof details, value: string) {
//     const next = { ...details, [key]: value };
//     setLocalDetails(next);
//     clearTimeout(syncTimer.current);
//     syncTimer.current = setTimeout(() => {
//       setDetails(next);
//     }, 300);
//   }

//   // Start interview using latest local details
//   function initiate() {
//     const payload = skipPersonalization
//       ? { role: '', jobDescription: '', userInfo: '', persona: 'Tech Guru' }
//       : details;
//     startInterview(payload);
//   }

//   // Optional voice commands
//   function handleVoiceCommand() {
//     const Recognition =
//       (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
//     if (!Recognition) return;
//     const recognition = new Recognition();
//     recognition.onresult = (event: any) => {
//       const cmd = event.results[0][0].transcript.toLowerCase();
//       if (cmd.includes('start')) startRecording();
//       if (cmd.includes('stop')) stopRecording();
//       if (cmd.includes('next')) nextQuestion();
//     };
//     recognition.start();
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.5 }}
//       className="min-h-screen bg-gradient-to-br from-gray-100 to-white p-6"
//     >
//       <div className="max-w-3xl mx-auto space-y-6">
//         <motion.h1
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="text-4xl font-bold text-gray-900 flex items-center gap-2"
//         >
//           🎙 AI Interview Simulator
//           <span className="text-sm text-gray-600">({questionNumber}/5)</span>
//         </motion.h1>

//         {/* Setup Section */}
//         {questionNumber === 1 && !question && (
//           <motion.div
//             initial={{ scale: 0.95 }}
//             animate={{ scale: 1 }}
//             className="bg-white p-6 rounded-xl shadow-lg space-y-4"
//           >
//             <label className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 checked={skipPersonalization}
//                 onChange={() => setSkipPersonalization(x => !x)}
//                 className="h-5 w-5 text-blue-600 focus:ring-blue-500"
//               />
//               <span className="text-gray-700">Skip personalization</span>
//               <span className="ml-2 text-xs text-gray-500" title="Quick start without personalization">
//                 (Quick start)
//               </span>
//             </label>

//             <AnimatePresence>
//               {!skipPersonalization && (
//                 <motion.div
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={{ height: 'auto', opacity: 1 }}
//                   exit={{ height: 0, opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-4"
//                 >
//                   <input
//                     placeholder="Job Role"
//                     value={details.role}
//                     onChange={e => handleDetailChange('role', e.target.value)}
//                     className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
//                   />
//                   <textarea
//                     placeholder="Job Description"
//                     value={details.jobDescription}
//                     onChange={e => handleDetailChange('jobDescription', e.target.value)}
//                     rows={3}
//                     className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
//                   />
//                   <textarea
//                     placeholder="Your background"
//                     value={details.userInfo}
//                     onChange={e => handleDetailChange('userInfo', e.target.value)}
//                     rows={3}
//                     className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
//                   />
//                   <label className="block">
//                     <span className="text-gray-700 mb-1">Interviewer Persona:</span>
//                     <select
//                       value={details.persona}
//                       onChange={e => handleDetailChange('persona', e.target.value)}
//                       className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
//                     >
//                       <option value="General / Neutral">General / Neutral</option>
//                       <optgroup label="Industry/Role-Specific">
//                         <option>Tech Guru</option>
//                         <option>C-Suite Stress-Test</option>
//                         <option>Finance Strategist</option>
//                         <option>Healthcare Expert</option>
//                         <option>Creative Innovator</option>
//                       </optgroup>
//                       <optgroup label="Behavioral/Coaching">
//                         <option>Culture Fit Coach</option>
//                         <option>Team Synergy Coach</option>
//                         <option>Resilience Mentor</option>
//                       </optgroup>
//                       <optgroup label="Inspirational/Legacy">
//                         <option>Legacy: Steve Jobs</option>
//                         <option>Legacy: Maya Angelou</option>
//                         <option>Legacy: Elon Musk</option>
//                         <option>Legacy: Oprah Winfrey</option>
//                       </optgroup>
//                       <optgroup label="Question-Type Specific">
//                         <option>Case Study Master</option>
//                         <option>Technical Deep-Dive</option>
//                         <option>Hypothetical Scenario Guru</option>
//                       </optgroup>
//                     </select>
//                   </label>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={initiate}
//               className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
//             >
//               Start Interview 🎤
//             </motion.button>
//           </motion.div>
//         )}

//         {/* Q&A Flow */}
//         {question && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="bg-white p-6 rounded-xl shadow-lg space-y-6"
//           >
//             {/* Question Card */}
//             <motion.div className="p-4 bg-indigo-50 rounded-lg space-y-2">
//               <p className="font-semibold text-gray-800">Question {questionNumber}/5:</p>
//               <p className="whitespace-pre-wrap text-gray-700">
//                 {followUpActive ? followUpQuestion : question}
//               </p>
//               {repeated && (
//                 <div className="text-yellow-700 bg-yellow-100 p-2 rounded text-sm">
//                   ⚠️ You’ve seen this question before!
//                 </div>
//               )}
//               {!followUpActive && (
//                 <button
//                   onClick={copySession}
//                   className="mt-2 text-sm bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300"
//                 >
//                   📋 Copy Q&A
//                 </button>
//               )}
//             </motion.div>

//             {/* Evaluating */}
//             {isEvaluating && (
//               <motion.div
//                 animate={{ opacity: [0.5, 1, 0.5] }}
//                 transition={{ repeat: Infinity, duration: 1 }}
//                 className="p-4 bg-yellow-100 rounded-lg flex items-center gap-2"
//               >
//                 <div className="h-5 w-5 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//                 <span className="text-yellow-800">Analyzing your response...</span>
//               </motion.div>
//             )}

//             {/* Controls */}
//             <div className="flex gap-3">
//   <motion.button
//     animate={listening ? { scale: [1, 1.1, 1] } : undefined}
//     transition={listening ? { repeat: Infinity, duration: 1 } : undefined}
//     onClick={() => listening ? stopRecording() : startRecording()}
//     className={`${listening ? 'bg-red-500' : 'bg-green-500'} text-white px-4 py-2 rounded-lg shadow-md hover:opacity-90 transition-all flex items-center gap-2`}
//   >
//     {listening ? '⏹ Stop Recording' : '▶️ Record Answer'}
//   </motion.button>
//   <motion.button
//     whileHover={{ scale: 1.05 }}
//     onClick={() => setShowTypeInput(x => !x)}
//     className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-900 transition-all"
//   >
//     {showTypeInput ? 'Hide Typing' : 'Type Answer Instead'}
//   </motion.button>
//   {!showTypeInput && !listening && !followUpActive && (
//     <motion.button
//       whileHover={{ scale: 1.05 }}
//       onClick={fetchHint}
//       className="bg-blue-200 text-blue-800 px-3 py-1 rounded-lg hover:bg-blue-300 transition-all"
//     >
//       💡 Hint
//     </motion.button>
//   )}
// </div>

//             {/* Typed Input */}
//             <AnimatePresence>
//               {showTypeInput && (
//                 <motion.div
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={{ height: 'auto', opacity: 1 }}
//                   exit={{ height: 0, opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="overflow-hidden space-y-2"
//                 >
//                   <textarea
//                     value={typedAnswer}
//                     onChange={e => setTypedAnswer(e.target.value)}
//                     rows={3}
//                     className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
//                   />
//                   <button onClick={submitTypedAnswer} className="bg-purple-600 text-white px-4 py-2 rounded-lg">
//                     Submit Answer
//                   </button>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* Transcript */}
//             {transcript && (
//               <motion.div
//                 initial={{ x: 20, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ duration: 0.3 }}
//                 className="p-4 bg-yellow-50 rounded-lg"
//               >
//                 <strong>Your Answer:</strong>
//                 <p className="mt-1 whitespace-pre-wrap">{transcript}</p>
//               </motion.div>
//             )}

//             {/* Feedback & Radar */}
//             {feedbackSections && (
//               <motion.div
//                 initial={{ scale: 0.95, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ duration: 0.4 }}
//                 className="p-6 bg-green-50 rounded-xl shadow-md space-y-4"
//               >
//                 {isAIAnswer && <div className="text-red-600 p-2 bg-red-100 rounded-lg">⚠️ AI-generated</div>}
//                 <ul className="list-disc list-inside space-y-1">
//                   <li><strong>Situation:</strong> {feedbackSections.situation}</li>
//                   <li><strong>Task:</strong> {feedbackSections.task}</li>
//                   <li><strong>Action:</strong> {feedbackSections.action}</li>
//                   <li><strong>Result:</strong> {feedbackSections.result}</li>
//                 </ul>
//                 <div className="grid grid-cols-3 gap-4 text-center">
//                   <div>Confidence: {eqMetrics.confidence}/100</div>
//                   <div>Enthusiasm: {eqMetrics.enthusiasm}/100</div>
//                   <div>Empathy: {eqMetrics.empathy}/100</div>
//                 </div>
//                 <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
//                   <motion.div
//                     initial={{ width: 0 }}
//                     animate={{ width: `${((questionNumber - 1) / 5) * 100}%` }}
//                     className="bg-blue-600 h-2"
//                   />
//                 </div>
//                 <div className="bg-white p-4 rounded-lg shadow">
//                   <h3 className="text-lg font-semibold mb-2">Competency Gap Analysis</h3>
//                   <ResponsiveContainer width="100%" height={200}>
//                     <RadarChart data={Object.entries(competencies).map(([k,v])=>({ subject:k, A:v }))}>
//                       <PolarGrid />
//                       <PolarAngleAxis dataKey="subject" />
//                       <PolarRadiusAxis domain={[0,100]} />
//                       <Tooltip />
//                       <Radar name="You" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
//                     </RadarChart>
//                   </ResponsiveContainer>
//                 </div>
//                 <div className="flex gap-2">
//                   <button onClick={toggleFeedbackAudio} className="bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
//                     {audioFeedbackEnabled ? <Volume2/> : <VolumeX/>}
//                     {audioFeedbackEnabled ? 'Disable Audio' : 'Enable Audio'}
//                   </button>
//                   {questionNumber < 5 ? (
//                     <button onClick={nextQuestion} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Next Question →</button>
//                   ) : (
//                     <button onClick={shareTotalScore} className="bg-orange-500 text-white px-4 py-2 rounded-lg">🚀 Share My Total Score!</button>
//                   )}
//                 </div>
//               </motion.div>
//             )}
//           </motion.div>
//         )}
//       </div>
//     </motion.div>
//   );
// }

"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Volume2, VolumeX } from "lucide-react";
import { useInterview } from "@/hooks/useInterview";

export default function InterviewSimulator() {
  const {
    question,
    questionNumber,
    feedbackSections,
    // careerConfidenceScore,
    // totalScore,
    transcript,
    typedAnswer,
    listening,
    audioFeedbackEnabled,
    eqMetrics,
    isAIAnswer,
    isEvaluating,
    hint,
    repeated,
    followUpActive,
    followUpQuestion,
    setTypedAnswer,
    startInterview,
    startRecording,
    stopRecording,
    submitTypedAnswer,
    toggleFeedbackAudio,
    nextQuestion,
    shareTotalScore,
    copySession,
    fetchHint,
    setDetails,
    competencies,
  } = useInterview();

  // Local form state (instant updates)
  const [details, setLocalDetails] = useState({
    role: "",
    jobDescription: "",
    userInfo: "",
    persona: "General / Neutral",
  });
  const [skipPersonalization, setSkipPersonalization] = useState(false);
  const [showTypeInput, setShowTypeInput] = useState(false);
  const syncTimer = useRef<NodeJS.Timeout>();

  // Update local immediately, sync to hook after 300ms
  function handleDetailChange(key: keyof typeof details, value: string) {
    const next = { ...details, [key]: value };
    setLocalDetails(next);
    clearTimeout(syncTimer.current);
    syncTimer.current = setTimeout(() => {
      setDetails(next);
    }, 300);
  }

  // Kick off the interview
  function initiate() {
    const payload = skipPersonalization
      ? { role: "", jobDescription: "", userInfo: "", persona: "Tech Guru" }
      : details;
    startInterview(payload);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-100 to-white p-6"
    >
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Title */}
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-4xl font-bold text-gray-900"
        >
          🎙 AI Interview Simulator
          <span className="text-sm text-gray-600">({questionNumber}/5)</span>
        </motion.h1>

        {/* Setup */}
        {questionNumber === 1 && !question && (
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="space-y-4 rounded-xl bg-white p-6 shadow-lg"
          >
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={skipPersonalization}
                onChange={() => setSkipPersonalization((x) => !x)}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">Skip personalization</span>
              <span className="ml-2 text-xs text-gray-500">(Quick start)</span>
            </label>

            <AnimatePresence>
              {!skipPersonalization && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <input
                    placeholder="Job Role"
                    value={details.role}
                    onChange={(e) => handleDetailChange("role", e.target.value)}
                    className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    placeholder="Job Description"
                    value={details.jobDescription}
                    onChange={(e) =>
                      handleDetailChange("jobDescription", e.target.value)
                    }
                    rows={3}
                    className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    placeholder="Your background"
                    value={details.userInfo}
                    onChange={(e) =>
                      handleDetailChange("userInfo", e.target.value)
                    }
                    rows={3}
                    className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500"
                  />
                  <label className="block">
                    <span className="mb-1 text-gray-700">
                      Interviewer Persona:
                    </span>
                    <select
                      value={details.persona}
                      onChange={(e) =>
                        handleDetailChange("persona", e.target.value)
                      }
                      className="w-full rounded-lg border p-2 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="General / Neutral">
                        General / Neutral
                      </option>
                      <optgroup label="Industry/Role-Specific">
                        <option>Tech Guru</option>
                        <option>C-Suite Stress-Test</option>
                        <option>Finance Strategist</option>
                        <option>Healthcare Expert</option>
                        <option>Creative Innovator</option>
                      </optgroup>
                      <optgroup label="Behavioral/Coaching">
                        <option>Culture Fit Coach</option>
                        <option>Team Synergy Coach</option>
                        <option>Resilience Mentor</option>
                      </optgroup>
                      <optgroup label="Inspirational/Legacy">
                        <option>Legacy: Steve Jobs</option>
                        <option>Legacy: Maya Angelou</option>
                        <option>Legacy: Elon Musk</option>
                        <option>Legacy: Oprah Winfrey</option>
                      </optgroup>
                      <optgroup label="Question-Type Specific">
                        <option>Case Study Master</option>
                        <option>Technical Deep-Dive</option>
                        <option>Hypothetical Scenario Guru</option>
                      </optgroup>
                    </select>
                  </label>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={initiate}
              className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700"
            >
              Start Interview 🎤
            </motion.button>
          </motion.div>
        )}

        {/* Q&A Flow */}
        {question && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6 rounded-xl bg-white p-6 shadow-lg"
          >
            {/* Question */}
            <motion.div className="space-y-2 rounded-lg bg-indigo-50 p-4">
              <p className="font-semibold text-gray-800">
                Question {questionNumber}/5:
              </p>
              <p className="whitespace-pre-wrap text-gray-700">
                {followUpActive ? followUpQuestion : question}
              </p>
              {repeated && (
                <div className="rounded bg-yellow-100 p-2 text-sm text-yellow-700">
                  ⚠️ You’ve seen this question before!
                </div>
              )}
              {!followUpActive && (
                <button
                  onClick={copySession}
                  className="mt-2 rounded bg-gray-200 px-3 py-1 text-sm text-gray-800 hover:bg-gray-300"
                >
                  📋 Copy Q&A
                </button>
              )}
            </motion.div>

            {/* Evaluating Spinner */}
            {isEvaluating && (
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="flex items-center gap-2 rounded-lg bg-yellow-100 p-4"
              >
                <div className="h-5 w-5 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
                <span className="text-yellow-800">
                  Analyzing your response...
                </span>
              </motion.div>
            )}

            {/* Controls */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <motion.button
                animate={listening ? { scale: [1, 1.1, 1] } : undefined}
                transition={
                  listening ? { repeat: Infinity, duration: 1 } : undefined
                }
                onClick={() => (listening ? stopRecording() : startRecording())}
                className={`${
                  listening ? "bg-red-500" : "bg-green-500"
                } flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-white shadow-md transition-all hover:opacity-90`}
              >
                {listening ? "⏹ Stop Recording" : "▶️ Record Answer"}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowTypeInput((x) => !x)}
                className="rounded-lg bg-gray-800 px-4 py-2 text-white shadow-md transition-all hover:bg-gray-900"
              >
                {showTypeInput ? "Hide Typing" : "Type Answer Instead"}
              </motion.button>

              {!showTypeInput && !listening && !followUpActive && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={fetchHint}
                  className="rounded-lg bg-blue-200 px-3 py-1 text-blue-800 transition-all hover:bg-blue-300"
                >
                  💡 Hint
                </motion.button>
              )}
            </div>

            {/* Show Hint */}
            {hint && !isEvaluating && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg bg-blue-50 p-3 text-gray-700"
              >
                💡 <strong>Hint:</strong> {hint}
              </motion.div>
            )}

            {/* Typed Input */}
            <AnimatePresence>
              {showTypeInput && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2 overflow-hidden"
                >
                  <textarea
                    value={typedAnswer}
                    onChange={(e) => setTypedAnswer(e.target.value)}
                    rows={3}
                    className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={submitTypedAnswer}
                    className="rounded-lg bg-purple-600 px-4 py-2 text-white"
                  >
                    Submit Answer
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Transcript */}
            {transcript && (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="rounded-lg bg-yellow-50 p-4"
              >
                <strong>Your Answer:</strong>
                <p className="mt-1 whitespace-pre-wrap">{transcript}</p>
              </motion.div>
            )}

            {/* Feedback & Radar */}
            {feedbackSections && (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="space-y-4 rounded-xl bg-green-50 p-6 shadow-md"
              >
                {isAIAnswer && (
                  <div className="rounded-lg bg-red-100 p-2 text-red-600">
                    ⚠️ AI-generated
                  </div>
                )}
                <ul className="list-inside list-disc space-y-1 dark:text-gray-800">
                  <li>
                    <strong>Situation:</strong> {feedbackSections.situation}
                  </li>
                  <li>
                    <strong>Task:</strong> {feedbackSections.task}
                  </li>
                  <li>
                    <strong>Action:</strong> {feedbackSections.action}
                  </li>
                  <li>
                    <strong>Result:</strong> {feedbackSections.result}
                  </li>
                </ul>

                <div className="grid grid-cols-3 gap-4 text-center dark:text-gray-800">
                  <div>Confidence: {eqMetrics.confidence}/100</div>
                  <div>Enthusiasm: {eqMetrics.enthusiasm}/100</div>
                  <div>Empathy: {eqMetrics.empathy}/100</div>
                </div>

                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((questionNumber - 1) / 5) * 100}%` }}
                    className="h-2 bg-blue-600"
                  />
                </div>

                <div className="rounded-lg bg-white p-4 shadow">
                  <h3 className="mb-2 text-lg font-semibold">
                    Competency Gap Analysis
                  </h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <RadarChart
                      data={Object.entries(competencies).map(([k, v]) => ({
                        subject: k,
                        A: v,
                      }))}
                    >
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis domain={[0, 100]} />
                      <Tooltip />
                      <Radar
                        name="You"
                        dataKey="A"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.6}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={toggleFeedbackAudio}
                    className="flex items-center gap-2 rounded-lg bg-purple-500 px-4 py-2 text-white"
                  >
                    {audioFeedbackEnabled ? <Volume2 /> : <VolumeX />}
                    {audioFeedbackEnabled ? "Disable Audio" : "Enable Audio"}
                  </button>
                  {questionNumber < 5 ? (
                    <button
                      onClick={nextQuestion}
                      className="rounded-lg bg-blue-500 px-4 py-2 text-white"
                    >
                      Next Question →
                    </button>
                  ) : (
                    <button
                      onClick={shareTotalScore}
                      className="rounded-lg bg-orange-500 px-4 py-2 text-white"
                    >
                      🚀 Share My Total Score!
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
