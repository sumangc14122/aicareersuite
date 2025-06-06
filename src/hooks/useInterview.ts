// // // // // import { useState, useRef } from 'react';

// // // // // interface InterviewDetails {
// // // // //   role: string;
// // // // //   jobDescription: string;
// // // // //   userInfo: string;
// // // // //   persona: string;
// // // // // }
// // // // // interface EQMetrics { confidence: number; enthusiasm: number; empathy: number; }
// // // // // interface FeedbackSections {
// // // // //   situation: string;
// // // // //   task: string;
// // // // //   action: string;
// // // // //   result: string;
// // // // //   suggestions: string[];
// // // // // }

// // // // // interface Competencies {
// // // // //   technical: number;
// // // // //   behavioral: number;
// // // // //   situational: number;
// // // // //   leadership: number;
// // // // //   communication: number;
// // // // //   cultureFit: number;
// // // // // }

// // // // // export function useInterview() {
// // // // //   const [details, setDetails] = useState<InterviewDetails>({
// // // // //     role: '',
// // // // //     jobDescription: '',
// // // // //     userInfo: '',
// // // // //     persona: 'General / Neutral',
// // // // //   });
// // // // //   const [question, setQuestion] = useState('');
// // // // //   const [askedQuestions, setAskedQuestions] = useState<string[]>([]);
// // // // //   const [questionNumber, setQuestionNumber] = useState(1);
// // // // //   const [careerConfidenceScore, setCareerConfidenceScore] = useState(0);
// // // // //   const [totalScore, setTotalScore] = useState(0);
// // // // //   const [feedbackSections, setFeedbackSections] = useState<FeedbackSections | null>(null);
// // // // //   const [transcript, setTranscript] = useState('');
// // // // //   const [typedAnswer, setTypedAnswer] = useState('');
// // // // //   const [listening, setListening] = useState(false);
// // // // //   const [audioFeedbackEnabled, setAudioFeedbackEnabled] = useState(true);
// // // // //   const [eqMetrics, setEQMetrics] = useState<EQMetrics>({ confidence: 0, enthusiasm: 0, empathy: 0 });
// // // // //   const [isAIAnswer, setIsAIAnswer] = useState(false);
// // // // //   const [isEvaluating, setIsEvaluating] = useState(false);
// // // // //   const [hint, setHint] = useState<string | null>(null);
// // // // //   const [repeated, setRepeated] = useState(false);
// // // // //   const [followUpActive, setFollowUpActive] = useState(false);
// // // // //   const [followUpQuestion, setFollowUpQuestion] = useState('');
// // // // //   const recognitionRef = useRef<SpeechRecognition | null>(null);
// // // // //   const [competencies, setCompetencies] = useState<Competencies>({
// // // // //     technical: 0,
// // // // //     behavioral: 0,
// // // // //     situational: 0,
// // // // //     leadership: 0,
// // // // //     communication: 0,
// // // // //     cultureFit: 0,
// // // // //   });
// // // // //   async function fetchNextQuestion() {
// // // // //     const res = await fetch('/api/interview-simulator/question', {
// // // // //       method: 'POST',
// // // // //       headers: { 'Content-Type': 'application/json' },
// // // // //       body: JSON.stringify({ ...details, questionNumber }),
// // // // //     });
// // // // //     const { question: q } = await res.json();
// // // // //     setRepeated(askedQuestions.includes(q));
// // // // //     setAskedQuestions(prev => [...prev, q]);
// // // // //     setQuestion(q);

// // // // //     if (audioFeedbackEnabled) {
// // // // //       speechSynthesis.cancel();
// // // // //       const utt = new SpeechSynthesisUtterance(q);
// // // // //       if (details.persona.startsWith('Legacy:')) {
// // // // //         utt.rate = 0.9;
// // // // //         utt.pitch = 1.1;
// // // // //       }
// // // // //       speechSynthesis.speak(utt);
// // // // //     }
// // // // //   }

// // // // //   function startInterview(d: InterviewDetails) {
// // // // //     setDetails(d);
// // // // //     setAskedQuestions([]);
// // // // //     setRepeated(false);
// // // // //     setQuestionNumber(1);
// // // // //     setTotalScore(0);
// // // // //     setCareerConfidenceScore(0);
// // // // //     setFeedbackSections(null);
// // // // //     setTranscript('');
// // // // //     setTypedAnswer('');
// // // // //     setEQMetrics({ confidence: 0, enthusiasm: 0, empathy: 0 });
// // // // //     setIsAIAnswer(false);
// // // // //     setHint(null);
// // // // //     setFollowUpActive(false);
// // // // //     fetchNextQuestion();
// // // // //   }

// // // // //   async function submitAnswer(answer: string) {
// // // // //     setIsEvaluating(true);
// // // // //     const res = await fetch('/api/interview-simulator/feedback', {
// // // // //       method: 'POST',
// // // // //       headers: { 'Content-Type': 'application/json' },
// // // // //       body: JSON.stringify({ ...details, question, transcript: answer }),
// // // // //     });
// // // // //     const data = await res.json();
// // // // //     const { situation, task, action, result, suggestions, score, eq, competencies: comp, isAIAnswer: aiFlag } = data;

// // // // //     setFeedbackSections({ situation, task, action, result, suggestions });
// // // // //     setCareerConfidenceScore(score);
// // // // //     setTotalScore(prev => prev + score);
// // // // //     setEQMetrics(eq);
// // // // //     setIsAIAnswer(!!aiFlag);
// // // // //     setIsEvaluating(false);
// // // // //     setCompetencies(data.competencies);
// // // // //     setCompetencies(comp);

// // // // //     // dynamic follow-up
// // // // //     const lowResult = result.toLowerCase().includes('not') || result.toLowerCase().includes('unclear');
// // // // //     if (lowResult) {
// // // // //       setFollowUpQuestion('Can you elaborate on the outcome or results of that situation?');
// // // // //       setFollowUpActive(true);
// // // // //     } else {
// // // // //       setFollowUpActive(false);
// // // // //     }
// // // // //   }

// // // // //     // // Drill-question generator
// // // // //     // async function generateDrillQuestion(area: string) {
// // // // //     //   const res = await fetch('/api/interview-simulator/drill', {
// // // // //     //     method: 'POST', headers: { 'Content-Type': 'application/json' },
// // // // //     //     body: JSON.stringify({ area, ...details }),
// // // // //     //   });
// // // // //     //   const { question: drillQ } = await res.json();
// // // // //     //   // Immediately show as hint
// // // // //     //   setHint(drillQ);
// // // // //     // }

// // // // //   async function fetchHint() {
// // // // //     const res = await fetch('/api/interview-simulator/hint', {
// // // // //       method: 'POST',
// // // // //       headers: { 'Content-Type': 'application/json' },
// // // // //       body: JSON.stringify({ question, ...details }),
// // // // //     });
// // // // //     const { hint } = await res.json();
// // // // //     setHint(hint);
// // // // //   }

// // // // //   function nextQuestion() {
// // // // //     if (followUpActive) return;
// // // // //     const next = questionNumber + 1;
// // // // //     if (next <= 5) {
// // // // //       setQuestionNumber(next);
// // // // //       setFeedbackSections(null);
// // // // //       setTranscript('');
// // // // //       setTypedAnswer('');
// // // // //       setIsAIAnswer(false);
// // // // //       setHint(null);
// // // // //       fetchNextQuestion();
// // // // //     }
// // // // //   }

// // // // //   function submitFollowUp(answer: string) {
// // // // //     setFollowUpActive(false);
// // // // //     nextQuestion();
// // // // //   }

// // // // //   function startRecording() {
// // // // //     const recog = new window.webkitSpeechRecognition();
// // // // //     recog.lang = 'en-US';
// // // // //     recog.continuous = false;
// // // // //     recog.onresult = e => setTranscript(e.results[0][0].transcript);
// // // // //     recog.onend = () => setListening(false);
// // // // //     recog.start();
// // // // //     recognitionRef.current = recog;
// // // // //     setListening(true);
// // // // //   }

// // // // //   function stopRecording() {
// // // // //     recognitionRef.current?.stop();
// // // // //     setListening(false);
// // // // //     if (!followUpActive) submitAnswer(transcript);
// // // // //     else submitFollowUp(transcript);
// // // // //   }

// // // // //   function submitTypedAnswer() {
// // // // //     if (!followUpActive) submitAnswer(typedAnswer);
// // // // //     else submitFollowUp(typedAnswer);
// // // // //   }

// // // // //   function toggleFeedbackAudio() {
// // // // //     setAudioFeedbackEnabled(x => !x);
// // // // //     speechSynthesis.cancel();
// // // // //   }

// // // // //   function shareTotalScore() {
// // // // //     const url = 'https://www.airesumepro.app/interview-simulator';
// // // // //     const text = `I just scored ${totalScore}/500 on @AIResumePro Interview Simulator! 🎯 Try it now: ${url} #CareerConfidence #InterviewPrep #AI`;
// // // // //     window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
// // // // //   }

// // // // //   function copySession() {
// // // // //     const txt = `Q${questionNumber}: ${question}\nA: ${transcript}\nFeedback: ${feedbackSections?.result}`;
// // // // //     navigator.clipboard.writeText(txt);
// // // // //     alert('Copied!');
// // // // //   }

// // // // //   return {
// // // // //     question,
// // // // //     questionNumber,
// // // // //     feedbackSections,
// // // // //     careerConfidenceScore,
// // // // //     totalScore,
// // // // //     transcript,
// // // // //     typedAnswer,
// // // // //     listening,
// // // // //     audioFeedbackEnabled,
// // // // //     eqMetrics,
// // // // //     isAIAnswer,
// // // // //     isEvaluating,
// // // // //     hint,
// // // // //     repeated,
// // // // //     followUpActive,
// // // // //     followUpQuestion,
// // // // //     setTypedAnswer,
// // // // //     startInterview,
// // // // //     startRecording,
// // // // //     stopRecording,
// // // // //     submitTypedAnswer,
// // // // //     toggleFeedbackAudio,
// // // // //     nextQuestion,
// // // // //     shareTotalScore,
// // // // //     copySession,
// // // // //     fetchHint,
// // // // //     // generateDrillQuestion,
// // // // //     setDetails,         // pass personalization & persona
// // // // //     competencies
// // // // //   };
// // // // // }

// // // // import { useState, useRef } from 'react';

// // // // interface InterviewDetails { role: string; jobDescription: string; userInfo: string; persona: string; }
// // // // interface EQMetrics { confidence: number; enthusiasm: number; empathy: number; }
// // // // interface FeedbackSections { situation: string; task: string; action: string; result: string; suggestions: string[]; }
// // // // interface Competencies { technical: number; behavioral: number; situational: number; leadership: number; communication: number; cultureFit: number; }

// // // // export function useInterview() {
// // // //   const [details, setDetails] = useState<InterviewDetails>({ role: '', jobDescription: '', userInfo: '', persona: 'General / Neutral' });
// // // //   const [question, setQuestion] = useState('');
// // // //   const [askedQuestions, setAskedQuestions] = useState<string[]>([]);
// // // //   const [questionNumber, setQuestionNumber] = useState(1);
// // // //   const [careerConfidenceScore, setCareerConfidenceScore] = useState(0);
// // // //   const [totalScore, setTotalScore] = useState(0);
// // // //   const [feedbackSections, setFeedbackSections] = useState<FeedbackSections | null>(null);
// // // //   const [transcript, setTranscript] = useState('');
// // // //   const [typedAnswer, setTypedAnswer] = useState('');
// // // //   const [listening, setListening] = useState(false);
// // // //   const [audioFeedbackEnabled, setAudioFeedbackEnabled] = useState(true);
// // // //   const [eqMetrics, setEQMetrics] = useState<EQMetrics>({ confidence: 0, enthusiasm: 0, empathy: 0 });
// // // //   const [isAIAnswer, setIsAIAnswer] = useState(false);
// // // //   const [isEvaluating, setIsEvaluating] = useState(false);
// // // //   const [hint, setHint] = useState<string | null>(null);
// // // //   const [repeated, setRepeated] = useState(false);
// // // //   const [followUpActive, setFollowUpActive] = useState(false);
// // // //   const [followUpQuestion, setFollowUpQuestion] = useState('');
// // // //   const recognitionRef = useRef<SpeechRecognition | null>(null);
// // // //   const [competencies, setCompetencies] = useState<Competencies>({ technical: 0, behavioral: 0, situational: 0, leadership: 0, communication: 0, cultureFit: 0 });

// // // //   // Fetch & speak next question
// // // //   async function fetchNextQuestion() {
// // // //     const res = await fetch('/api/interview-simulator/question', {
// // // //       method: 'POST', headers: { 'Content-Type': 'application/json' },
// // // //       body: JSON.stringify({ ...details, questionNumber }),
// // // //     });
// // // //     const { question: q } = await res.json();
// // // //     setRepeated(askedQuestions.includes(q));
// // // //     setAskedQuestions(prev => [...prev, q]);
// // // //     setQuestion(q);

// // // //     if (audioFeedbackEnabled) {
// // // //       speechSynthesis.cancel();
// // // //       const utt = new SpeechSynthesisUtterance(q);
// // // //       if (details.persona.startsWith('Legacy:')) { utt.rate = 0.9; utt.pitch = 1.1; }
// // // //       speechSynthesis.speak(utt);
// // // //     }
// // // //   }

// // // //   function startInterview(d: InterviewDetails) {
// // // //     setDetails(d);
// // // //     setAskedQuestions([]);
// // // //     setRepeated(false);
// // // //     setQuestionNumber(1);
// // // //     setTotalScore(0);
// // // //     setCareerConfidenceScore(0);
// // // //     setFeedbackSections(null);
// // // //     setTranscript('');
// // // //     setTypedAnswer('');
// // // //     setEQMetrics({ confidence: 0, enthusiasm: 0, empathy: 0 });
// // // //     setIsAIAnswer(false);
// // // //     setHint(null);
// // // //     setFollowUpActive(false);
// // // //     fetchNextQuestion();
// // // //   }

// // // //   // Submit user answer to AI
// // // //   async function submitAnswer(answer: string) {
// // // //     setIsEvaluating(true);
// // // //     const res = await fetch('/api/interview-simulator/feedback', {
// // // //       method: 'POST', headers: { 'Content-Type': 'application/json' },
// // // //       body: JSON.stringify({ ...details, question, transcript: answer }),
// // // //     });
// // // //     const data = await res.json();
// // // //     const { situation, task, action, result, suggestions, score, eq, competencies: comp, isAIAnswer: aiFlag } = data;

// // // //     setFeedbackSections({ situation, task, action, result, suggestions });
// // // //     setCareerConfidenceScore(score);
// // // //     setTotalScore(prev => prev + score);
// // // //     setEQMetrics(eq);
// // // //     setIsAIAnswer(!!aiFlag);
// // // //     setCompetencies(comp);
// // // //     setIsEvaluating(false);

// // // //     // follow-up logic
// // // //     const low = result.toLowerCase().includes('not') || result.toLowerCase().includes('unclear');
// // // //     if (low) {
// // // //       setFollowUpQuestion('Can you elaborate on the outcome or results of that situation?');
// // // //       setFollowUpActive(true);
// // // //     } else {
// // // //       setFollowUpActive(false);
// // // //     }
// // // //   }

// // // //   // Recording controls now auto-submit on end
// // // //   function startRecording() {
// // // //     const recog = new (window as any).webkitSpeechRecognition();
// // // //     recog.lang = 'en-US';
// // // //     recog.continuous = false;

// // // //     recog.onresult = e => {
// // // //       setTranscript(e.results[0][0].transcript);
// // // //     };

// // // //     recog.onend = () => {
// // // //       setListening(false);
// // // //       if (!followUpActive) submitAnswer(recog.resultString || transcript);
// // // //       else submitFollowUp(recog.resultString || transcript);
// // // //     };

// // // //     recog.start();
// // // //     recognitionRef.current = recog;
// // // //     setListening(true);
// // // //   }

// // // //   function stopRecording() {
// // // //     recognitionRef.current?.stop();
// // // //   }

// // // //   // function submitFollowUp(answer: string) {
// // // //   //   setFollowUpActive(false);
// // // //   //   nextQuestion();
// // // //   // }
// // // //   function submitFollowUp(answer: string) {
// // // //     console.log('Follow-up answer:', answer);
// // // //     setFollowUpActive(false);
// // // //     nextQuestion();
// // // //   }

// // // //   function submitTypedAnswer() {
// // // //     if (!followUpActive) submitAnswer(typedAnswer);
// // // //     else submitFollowUp(typedAnswer);
// // // //   }

// // // //   async function fetchHint() {
// // // //     const res = await fetch('/api/interview-simulator/hint', {
// // // //       method: 'POST', headers: { 'Content-Type': 'application/json' },
// // // //       body: JSON.stringify({ question, ...details }),
// // // //     });
// // // //     const { hint } = await res.json();
// // // //     setHint(hint);
// // // //   }

// // // //   function nextQuestion() {
// // // //     if (followUpActive) return;
// // // //     const nxt = questionNumber + 1;
// // // //     if (nxt <= 5) {
// // // //       setQuestionNumber(nxt);
// // // //       setFeedbackSections(null);
// // // //       setTranscript('');
// // // //       setTypedAnswer('');
// // // //       setIsAIAnswer(false);
// // // //       setHint(null);
// // // //       fetchNextQuestion();
// // // //     }
// // // //   }

// // // //   function toggleFeedbackAudio() {
// // // //     setAudioFeedbackEnabled(x => !x);
// // // //     speechSynthesis.cancel();
// // // //   }

// // // //   function shareTotalScore() {
// // // //     const url = window.location.href;
// // // //     const text = `I scored ${totalScore}/500 on AI Interview Simulator! Try it: ${url}`;
// // // //     window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
// // // //   }

// // // //   function copySession() {
// // // //     const txt = `Q${questionNumber}: ${question}\nA: ${transcript}\n`;
// // // //     navigator.clipboard.writeText(txt);
// // // //     alert('Copied!');
// // // //   }

// // // //   return {
// // // //     question,
// // // //     questionNumber,
// // // //     feedbackSections,
// // // //     careerConfidenceScore,
// // // //     totalScore,
// // // //     transcript,
// // // //     typedAnswer,
// // // //     listening,
// // // //     audioFeedbackEnabled,
// // // //     eqMetrics,
// // // //     isAIAnswer,
// // // //     isEvaluating,
// // // //     hint,
// // // //     repeated,
// // // //     followUpActive,
// // // //     followUpQuestion,
// // // //     setTypedAnswer,
// // // //     startInterview,
// // // //     startRecording,
// // // //     stopRecording,
// // // //     submitTypedAnswer,
// // // //     toggleFeedbackAudio,
// // // //     nextQuestion,
// // // //     shareTotalScore,
// // // //     copySession,
// // // //     fetchHint,
// // // //     setDetails,
// // // //     competencies,
// // // //   };
// // // // }

// // // import { useState, useRef } from 'react';

// // // interface InterviewDetails {
// // //   role: string;
// // //   jobDescription: string;
// // //   userInfo: string;
// // //   persona: string;
// // // }
// // // interface EQMetrics {
// // //   confidence: number;
// // //   enthusiasm: number;
// // //   empathy: number;
// // // }
// // // interface FeedbackSections {
// // //   situation: string;
// // //   task: string;
// // //   action: string;
// // //   result: string;
// // //   suggestions: string[];
// // // }
// // // interface Competencies {
// // //   technical: number;
// // //   behavioral: number;
// // //   situational: number;
// // //   leadership: number;
// // //   communication: number;
// // //   cultureFit: number;
// // // }

// // // // @ts-ignore: Extend window for compatibility
// // // const SpeechRecognition =
// // //   typeof window !== 'undefined' &&
// // //   (window.SpeechRecognition || (window as any).webkitSpeechRecognition);

// // // export function useInterview() {
// // //   const [details, setDetails] = useState<InterviewDetails>({
// // //     role: '',
// // //     jobDescription: '',
// // //     userInfo: '',
// // //     persona: 'General / Neutral',
// // //   });
// // //   const [question, setQuestion] = useState('');
// // //   const [askedQuestions, setAskedQuestions] = useState<string[]>([]);
// // //   const [questionNumber, setQuestionNumber] = useState(1);
// // //   const [careerConfidenceScore, setCareerConfidenceScore] = useState(0);
// // //   const [totalScore, setTotalScore] = useState(0);
// // //   const [feedbackSections, setFeedbackSections] = useState<FeedbackSections | null>(null);
// // //   const [transcript, setTranscript] = useState('');
// // //   const [typedAnswer, setTypedAnswer] = useState('');
// // //   const [listening, setListening] = useState(false);
// // //   const [audioFeedbackEnabled, setAudioFeedbackEnabled] = useState(true);
// // //   const [eqMetrics, setEQMetrics] = useState<EQMetrics>({
// // //     confidence: 0,
// // //     enthusiasm: 0,
// // //     empathy: 0,
// // //   });
// // //   const [isAIAnswer, setIsAIAnswer] = useState(false);
// // //   const [isEvaluating, setIsEvaluating] = useState(false);
// // //   const [hint, setHint] = useState<string | null>(null);
// // //   const [repeated, setRepeated] = useState(false);
// // //   const [followUpActive, setFollowUpActive] = useState(false);
// // //   const [followUpQuestion, setFollowUpQuestion] = useState('');
// // //   const recognitionRef = useRef<SpeechRecognition | null>(null);
// // //   const [competencies, setCompetencies] = useState<Competencies>({
// // //     technical: 0,
// // //     behavioral: 0,
// // //     situational: 0,
// // //     leadership: 0,
// // //     communication: 0,
// // //     cultureFit: 0,
// // //   });

// // //   async function fetchNextQuestion() {
// // //     const res = await fetch('/api/interview-simulator/question', {
// // //       method: 'POST',
// // //       headers: { 'Content-Type': 'application/json' },
// // //       body: JSON.stringify({ ...details, questionNumber }),
// // //     });
// // //     const { question: q } = await res.json();
// // //     setRepeated(askedQuestions.includes(q));
// // //     setAskedQuestions(prev => [...prev, q]);
// // //     setQuestion(q);

// // //     if (audioFeedbackEnabled && typeof window !== 'undefined') {
// // //       speechSynthesis.cancel();
// // //       const utt = new SpeechSynthesisUtterance(q);
// // //       if (details.persona.startsWith('Legacy:')) {
// // //         utt.rate = 0.9;
// // //         utt.pitch = 1.1;
// // //       }
// // //       speechSynthesis.speak(utt);
// // //     }
// // //   }

// // //   function startInterview(d: InterviewDetails) {
// // //     setDetails(d);
// // //     setAskedQuestions([]);
// // //     setRepeated(false);
// // //     setQuestionNumber(1);
// // //     setTotalScore(0);
// // //     setCareerConfidenceScore(0);
// // //     setFeedbackSections(null);
// // //     setTranscript('');
// // //     setTypedAnswer('');
// // //     setEQMetrics({ confidence: 0, enthusiasm: 0, empathy: 0 });
// // //     setIsAIAnswer(false);
// // //     setHint(null);
// // //     setFollowUpActive(false);
// // //     fetchNextQuestion();
// // //   }

// // //   async function submitAnswer(answer: string) {
// // //     setIsEvaluating(true);
// // //     const res = await fetch('/api/interview-simulator/feedback', {
// // //       method: 'POST',
// // //       headers: { 'Content-Type': 'application/json' },
// // //       body: JSON.stringify({ ...details, question, transcript: answer }),
// // //     });
// // //     const data = await res.json();
// // //     const {
// // //       situation,
// // //       task,
// // //       action,
// // //       result,
// // //       suggestions,
// // //       score,
// // //       eq,
// // //       competencies: comp,
// // //       isAIAnswer: aiFlag,
// // //     } = data;

// // //     setFeedbackSections({ situation, task, action, result, suggestions });
// // //     setCareerConfidenceScore(score);
// // //     setTotalScore(prev => prev + score);
// // //     setEQMetrics(eq);
// // //     setIsAIAnswer(!!aiFlag);
// // //     setCompetencies(comp);
// // //     setIsEvaluating(false);

// // //     const low = result.toLowerCase().includes('not') || result.toLowerCase().includes('unclear');
// // //     if (low) {
// // //       setFollowUpQuestion('Can you elaborate on the outcome or results of that situation?');
// // //       setFollowUpActive(true);
// // //     } else {
// // //       setFollowUpActive(false);
// // //     }
// // //   }

// // //   function startRecording() {
// // //     if (!SpeechRecognition) return;
// // //     const recog = new SpeechRecognition();
// // //     recog.lang = 'en-US';
// // //     recog.continuous = false;

// // //     recog.onresult = e => {
// // //       const resultText = e.results[0][0].transcript;
// // //       setTranscript(resultText);
// // //       if (!followUpActive) submitAnswer(resultText);
// // //       else {
// // //         setFollowUpActive(false);
// // //         nextQuestion();
// // //       }
// // //     };

// // //     recog.onend = () => {
// // //       setListening(false);
// // //     };

// // //     recog.start();
// // //     recognitionRef.current = recog;
// // //     setListening(true);
// // //   }

// // //   function stopRecording() {
// // //     recognitionRef.current?.stop();
// // //     setListening(false);
// // //   }

// // //   function submitTypedAnswer() {
// // //     if (!followUpActive) submitAnswer(typedAnswer);
// // //     else {
// // //       setFollowUpActive(false);
// // //       nextQuestion();
// // //     }
// // //   }

// // //   async function fetchHint() {
// // //     const res = await fetch('/api/interview-simulator/hint', {
// // //       method: 'POST',
// // //       headers: { 'Content-Type': 'application/json' },
// // //       body: JSON.stringify({ question, ...details }),
// // //     });
// // //     const { hint } = await res.json();
// // //     setHint(hint);
// // //   }

// // //   function nextQuestion() {
// // //     if (followUpActive) return;
// // //     const nxt = questionNumber + 1;
// // //     if (nxt <= 5) {
// // //       setQuestionNumber(nxt);
// // //       setFeedbackSections(null);
// // //       setTranscript('');
// // //       setTypedAnswer('');
// // //       setIsAIAnswer(false);
// // //       setHint(null);
// // //       fetchNextQuestion();
// // //     }
// // //   }

// // //   function toggleFeedbackAudio() {
// // //     setAudioFeedbackEnabled(x => !x);
// // //     if (typeof window !== 'undefined') {
// // //       speechSynthesis.cancel();
// // //     }
// // //   }

// // //   function shareTotalScore() {
// // //     const url = window.location.href;
// // //     const text = `I scored ${totalScore}/500 on AI Interview Simulator! Try it: ${url}`;
// // //     window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
// // //   }

// // //   function copySession() {
// // //     const txt = `Q${questionNumber}: ${question}\nA: ${transcript}\n`;
// // //     navigator.clipboard.writeText(txt);
// // //     alert('Copied!');
// // //   }

// // //   return {
// // //     question,
// // //     questionNumber,
// // //     feedbackSections,
// // //     careerConfidenceScore,
// // //     totalScore,
// // //     transcript,
// // //     typedAnswer,
// // //     listening,
// // //     audioFeedbackEnabled,
// // //     eqMetrics,
// // //     isAIAnswer,
// // //     isEvaluating,
// // //     hint,
// // //     repeated,
// // //     followUpActive,
// // //     followUpQuestion,
// // //     setTypedAnswer,
// // //     startInterview,
// // //     startRecording,
// // //     stopRecording,
// // //     submitTypedAnswer,
// // //     toggleFeedbackAudio,
// // //     nextQuestion,
// // //     shareTotalScore,
// // //     copySession,
// // //     fetchHint,
// // //     setDetails,
// // //     competencies,
// // //   };
// // // }

// // import { useState, useRef } from "react";

// // interface InterviewDetails {
// //   role: string;
// //   jobDescription: string;
// //   userInfo: string;
// //   persona: string;
// // }
// // interface EQMetrics {
// //   confidence: number;
// //   enthusiasm: number;
// //   empathy: number;
// // }
// // interface FeedbackSections {
// //   situation: string;
// //   task: string;
// //   action: string;
// //   result: string;
// //   suggestions: string[];
// // }
// // interface Competencies {
// //   technical: number;
// //   behavioral: number;
// //   situational: number;
// //   leadership: number;
// //   communication: number;
// //   cultureFit: number;
// // }

// // // Safe fallback for SpeechRecognition including webkit variant
// // type SpeechRecognitionConstructor = new () => SpeechRecognition;
// // const SpeechRecognition: SpeechRecognitionConstructor | undefined =
// //   typeof window !== "undefined"
// //     ? window.SpeechRecognition ||
// //       (
// //         window as unknown as {
// //           webkitSpeechRecognition?: SpeechRecognitionConstructor;
// //         }
// //       ).webkitSpeechRecognition
// //     : undefined;

// // export function useInterview() {
// //   const [details, setDetails] = useState<InterviewDetails>({
// //     role: "",
// //     jobDescription: "",
// //     userInfo: "",
// //     persona: "General / Neutral",
// //   });
// //   const [question, setQuestion] = useState("");
// //   const [askedQuestions, setAskedQuestions] = useState<string[]>([]);
// //   const [questionNumber, setQuestionNumber] = useState(1);
// //   const [careerConfidenceScore, setCareerConfidenceScore] = useState(0);
// //   const [totalScore, setTotalScore] = useState(0);
// //   const [feedbackSections, setFeedbackSections] =
// //     useState<FeedbackSections | null>(null);
// //   const [transcript, setTranscript] = useState("");
// //   const [typedAnswer, setTypedAnswer] = useState("");
// //   const [listening, setListening] = useState(false);
// //   const [audioFeedbackEnabled, setAudioFeedbackEnabled] = useState(true);
// //   const [eqMetrics, setEQMetrics] = useState<EQMetrics>({
// //     confidence: 0,
// //     enthusiasm: 0,
// //     empathy: 0,
// //   });
// //   const [isAIAnswer, setIsAIAnswer] = useState(false);
// //   const [isEvaluating, setIsEvaluating] = useState(false);
// //   const [hint, setHint] = useState<string | null>(null);
// //   const [repeated, setRepeated] = useState(false);
// //   const [followUpActive, setFollowUpActive] = useState(false);
// //   const [followUpQuestion, setFollowUpQuestion] = useState("");
// //   const recognitionRef = useRef<SpeechRecognition | null>(null);
// //   const [competencies, setCompetencies] = useState<Competencies>({
// //     technical: 0,
// //     behavioral: 0,
// //     situational: 0,
// //     leadership: 0,
// //     communication: 0,
// //     cultureFit: 0,
// //   });

// //   async function fetchNextQuestion() {
// //     const res = await fetch("/api/interview-simulator/question", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ ...details, questionNumber }),
// //     });
// //     const { question: q } = await res.json();
// //     setRepeated(askedQuestions.includes(q));
// //     setAskedQuestions((prev) => [...prev, q]);
// //     setQuestion(q);

// //     if (audioFeedbackEnabled && typeof window !== "undefined") {
// //       speechSynthesis.cancel();
// //       const utt = new SpeechSynthesisUtterance(q);
// //       if (details.persona.startsWith("Legacy:")) {
// //         utt.rate = 0.9;
// //         utt.pitch = 1.1;
// //       }
// //       speechSynthesis.speak(utt);
// //     }
// //   }

// //   function startInterview(d: InterviewDetails) {
// //     setDetails(d);
// //     setAskedQuestions([]);
// //     setRepeated(false);
// //     setQuestionNumber(1);
// //     setTotalScore(0);
// //     setCareerConfidenceScore(0);
// //     setFeedbackSections(null);
// //     setTranscript("");
// //     setTypedAnswer("");
// //     setEQMetrics({ confidence: 0, enthusiasm: 0, empathy: 0 });
// //     setIsAIAnswer(false);
// //     setHint(null);
// //     setFollowUpActive(false);
// //     fetchNextQuestion();
// //   }

// //   async function submitAnswer(answer: string) {
// //     setIsEvaluating(true);
// //     const res = await fetch("/api/interview-simulator/feedback", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ ...details, question, transcript: answer }),
// //     });
// //     const data = await res.json();
// //     const {
// //       situation,
// //       task,
// //       action,
// //       result,
// //       suggestions,
// //       score,
// //       eq,
// //       competencies: comp,
// //       isAIAnswer: aiFlag,
// //     } = data;

// //     setFeedbackSections({ situation, task, action, result, suggestions });
// //     setCareerConfidenceScore(score);
// //     setTotalScore((prev) => prev + score);
// //     setEQMetrics(eq);
// //     setIsAIAnswer(!!aiFlag);
// //     setCompetencies(comp);
// //     setIsEvaluating(false);

// //     const low =
// //       result.toLowerCase().includes("not") ||
// //       result.toLowerCase().includes("unclear");
// //     if (low) {
// //       setFollowUpQuestion(
// //         "Can you elaborate on the outcome or results of that situation?",
// //       );
// //       setFollowUpActive(true);
// //     } else {
// //       setFollowUpActive(false);
// //     }
// //   }

// //   function startRecording() {
// //     if (!SpeechRecognition) return;
// //     const recog = new SpeechRecognition();
// //     recog.lang = "en-US";
// //     recog.continuous = false;

// //     recog.onresult = (e) => {
// //       const resultText = e.results[0][0].transcript;
// //       setTranscript(resultText);
// //       if (!followUpActive) submitAnswer(resultText);
// //       else {
// //         setFollowUpActive(false);
// //         nextQuestion();
// //       }
// //     };

// //     recog.onend = () => {
// //       setListening(false);
// //     };

// //     recog.start();
// //     recognitionRef.current = recog;
// //     setListening(true);
// //   }

// //   function stopRecording() {
// //     recognitionRef.current?.stop();
// //     setListening(false);
// //   }

// //   function submitTypedAnswer() {
// //     if (!followUpActive) submitAnswer(typedAnswer);
// //     else {
// //       setFollowUpActive(false);
// //       nextQuestion();
// //     }
// //   }

// //   async function fetchHint() {
// //     const res = await fetch("/api/interview-simulator/hint", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ question, ...details }),
// //     });
// //     const { hint } = await res.json();
// //     setHint(hint);
// //   }

// //   function nextQuestion() {
// //     if (followUpActive) return;
// //     const nxt = questionNumber + 1;
// //     if (nxt <= 5) {
// //       setQuestionNumber(nxt);
// //       setFeedbackSections(null);
// //       setTranscript("");
// //       setTypedAnswer("");
// //       setIsAIAnswer(false);
// //       setHint(null);
// //       fetchNextQuestion();
// //     }
// //   }

// //   function toggleFeedbackAudio() {
// //     setAudioFeedbackEnabled((x) => !x);
// //     if (typeof window !== "undefined") {
// //       speechSynthesis.cancel();
// //     }
// //   }

// //   function shareTotalScore() {
// //     const url = window.location.href;
// //     const text = `I scored ${totalScore}/500 on AI Interview Simulator! Try it: ${url}`;
// //     window.open(
// //       `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
// //       "_blank",
// //     );
// //   }

// //   function copySession() {
// //     const txt = `Q${questionNumber}: ${question}\nA: ${transcript}\n`;
// //     navigator.clipboard.writeText(txt);
// //     alert("Copied!");
// //   }

// //   return {
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
// //     competencies,
// //   };
// // }

// import { useState, useRef } from "react";

// interface InterviewDetails {
//   role: string;
//   jobDescription: string;
//   userInfo: string;
//   persona: string;
// }
// interface EQMetrics {
//   confidence: number;
//   enthusiasm: number;
//   empathy: number;
// }
// interface FeedbackSections {
//   situation: string;
//   task: string;
//   action: string;
//   result: string;
//   suggestions: string[];
// }
// interface Competencies {
//   technical: number;
//   behavioral: number;
//   situational: number;
//   leadership: number;
//   communication: number;
//   cultureFit: number;
// }

// // Runtime-safe SpeechRecognition constructor (native or webkit)
// const SpeechRecognition = typeof window !== "undefined"
//   ? (
//       (window as Window & {
//         SpeechRecognition?: new () => SpeechRecognition;
//         webkitSpeechRecognition?: new () => SpeechRecognition;
//       }).SpeechRecognition ||
//       (window as Window & {
//         SpeechRecognition?: new () => SpeechRecognition;
//         webkitSpeechRecognition?: new () => SpeechRecognition;
//       }).webkitSpeechRecognition
//     )
//   : undefined;

// export function useInterview() {
//   const [details, setDetails] = useState<InterviewDetails>({
//     role: "",
//     jobDescription: "",
//     userInfo: "",
//     persona: "General / Neutral",
//   });
//   const [question, setQuestion] = useState<string>("");
//   const [askedQuestions, setAskedQuestions] = useState<string[]>([]);
//   const [questionNumber, setQuestionNumber] = useState<number>(1);
//   const [careerConfidenceScore, setCareerConfidenceScore] = useState<number>(0);
//   const [totalScore, setTotalScore] = useState<number>(0);
//   const [feedbackSections, setFeedbackSections] = useState<FeedbackSections | null>(null);
//   const [transcript, setTranscript] = useState<string>("");
//   const [typedAnswer, setTypedAnswer] = useState<string>("");
//   const [listening, setListening] = useState<boolean>(false);
//   const [audioFeedbackEnabled, setAudioFeedbackEnabled] = useState<boolean>(true);
//   const [eqMetrics, setEQMetrics] = useState<EQMetrics>({ confidence: 0, enthusiasm: 0, empathy: 0 });
//   const [isAIAnswer, setIsAIAnswer] = useState<boolean>(false);
//   const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
//   const [hint, setHint] = useState<string | null>(null);
//   const [repeated, setRepeated] = useState<boolean>(false);
//   const [followUpActive, setFollowUpActive] = useState<boolean>(false);
//   const [followUpQuestion, setFollowUpQuestion] = useState<string>("");
//   const recognitionRef = useRef<InstanceType<typeof SpeechRecognition> | null>(null);
//   const [competencies, setCompetencies] = useState<Competencies>({
//     technical: 0,
//     behavioral: 0,
//     situational: 0,
//     leadership: 0,
//     communication: 0,
//     cultureFit: 0,
//   });

//   async function fetchNextQuestion() {
//     const res = await fetch("/api/interview-simulator/question", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ ...details, questionNumber }),
//     });
//     const { question: q } = await res.json();
//     setRepeated(askedQuestions.includes(q));
//     setAskedQuestions(prev => [...prev, q]);
//     setQuestion(q);

//     if (audioFeedbackEnabled && typeof window !== "undefined") {
//       speechSynthesis.cancel();
//       const utt = new SpeechSynthesisUtterance(q);
//       if (details.persona.startsWith("Legacy:")) {
//         utt.rate = 0.9;
//         utt.pitch = 1.1;
//       }
//       speechSynthesis.speak(utt);
//     }
//   }

//   function startInterview(d: InterviewDetails) {
//     setDetails(d);
//     setAskedQuestions([]);
//     setRepeated(false);
//     setQuestionNumber(1);
//     setTotalScore(0);
//     setCareerConfidenceScore(0);
//     setFeedbackSections(null);
//     setTranscript("");
//     setTypedAnswer("");
//     setEQMetrics({ confidence: 0, enthusiasm: 0, empathy: 0 });
//     setIsAIAnswer(false);
//     setHint(null);
//     setFollowUpActive(false);
//     fetchNextQuestion();
//   }

//   async function submitAnswer(answer: string) {
//     setIsEvaluating(true);
//     const res = await fetch("/api/interview-simulator/feedback", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ ...details, question, transcript: answer }),
//     });
//     const data = await res.json();
//     const {
//       situation,
//       task,
//       action,
//       result,
//       suggestions,
//       score,
//       eq,
//       competencies: comp,
//       isAIAnswer: aiFlag,
//     } = data;

//     setFeedbackSections({ situation, task, action, result, suggestions });
//     setCareerConfidenceScore(score);
//     setTotalScore(prev => prev + score);
//     setEQMetrics(eq);
//     setIsAIAnswer(!!aiFlag);
//     setCompetencies(comp);
//     setIsEvaluating(false);

//     const low = result.toLowerCase().includes("not") || result.toLowerCase().includes("unclear");
//     if (low) {
//       setFollowUpQuestion("Can you elaborate on the outcome or results of that situation?");
//       setFollowUpActive(true);
//     } else {
//       setFollowUpActive(false);
//     }
//   }

//   function startRecording() {
//     if (!SpeechRecognition) return;
//     const recog = new SpeechRecognition();
//     recog.lang = "en-US";
//     recog.continuous = false;

//     recog.onresult = (e: SpeechRecognitionEvent) => {
//       const resultText = e.results[0][0].transcript;
//       setTranscript(resultText);
//       if (!followUpActive) {
//         submitAnswer(resultText);
//       } else {
//         setFollowUpActive(false);
//         nextQuestion();
//       }
//     };

//     recog.onend = () => {
//       setListening(false);
//     };

//     recog.start();
//     recognitionRef.current = recog;
//     setListening(true);
//   }

//   function stopRecording() {
//     recognitionRef.current?.stop();
//     setListening(false);
//   }

//   function submitTypedAnswer() {
//     if (!followUpActive) {
//       submitAnswer(typedAnswer);
//     } else {
//       setFollowUpActive(false);
//       nextQuestion();
//     }
//   }

//   async function fetchHint() {
//     const res = await fetch("/api/interview-simulator/hint", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ question, ...details }),
//     });
//     const { hint } = await res.json();
//     setHint(hint);
//   }

//   function nextQuestion() {
//     if (followUpActive) return;
//     const nxt = questionNumber + 1;
//     if (nxt <= 5) {
//       setQuestionNumber(nxt);
//       setFeedbackSections(null);
//       setTranscript("");
//       setTypedAnswer("");
//       setIsAIAnswer(false);
//       setHint(null);
//       fetchNextQuestion();
//     }
//   }

//   function toggleFeedbackAudio() {
//     setAudioFeedbackEnabled(x => !x);
//     if (typeof window !== "undefined") {
//       speechSynthesis.cancel();
//     }
//   }

//   function shareTotalScore() {
//     const url = window.location.href;
//     const text = `I scored ${totalScore}/500 on AI Interview Simulator! Try it: ${url}`;
//     window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, "_blank");
//   }

//   function copySession() {
//     const txt = `Q${questionNumber}: ${question}\nA: ${transcript}\n`;
//     navigator.clipboard.writeText(txt);
//     alert("Copied!");
//   }

//   return {
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
//   };
// }

import { useState, useRef, useEffect } from "react";

// —————————————————————————————
// Browser speech‐recognition shims & types
// —————————————————————————————
type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

// Minimal interface covering what you actually use in the code:
interface SpeechRecognitionInstance {
  lang: string;
  continuous: boolean;
  onresult:
    | ((this: SpeechRecognitionInstance, ev: SpeechRecognitionEvent) => any)
    | null;
  onend:
    | ((this: SpeechRecognitionInstance, ev: SpeechRecognitionEvent) => any)
    | null;
  onerror:
    | ((
        this: SpeechRecognitionInstance,
        ev: SpeechRecognitionErrorEvent,
      ) => any)
    | null;
  start(): void;
  stop(): void;
}

// Declare globals so TypeScript knows about them:
declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }

  // These two are missing in lib.dom.d.ts in some configs:
  interface SpeechRecognitionEvent extends Event {
    readonly results: SpeechRecognitionResultList;
    readonly resultIndex: number;
  }
  interface SpeechRecognitionErrorEvent extends Event {
    readonly error: string;
  }
}

// Grab whichever constructor the browser provides (or undefined)
const SpeechRecognition: SpeechRecognitionConstructor | undefined =
  typeof window !== "undefined"
    ? window.SpeechRecognition || window.webkitSpeechRecognition
    : undefined;

// —————————————————————————————
// Hook types for Interview Simulator
// —————————————————————————————
interface InterviewDetails {
  role: string;
  jobDescription: string;
  userInfo: string;
  persona: string;
}
interface EQMetrics {
  confidence: number;
  enthusiasm: number;
  empathy: number;
}
interface FeedbackSections {
  situation: string;
  task: string;
  action: string;
  result: string;
  suggestions: string[];
}
interface Competencies {
  technical: number;
  behavioral: number;
  situational: number;
  leadership: number;
  communication: number;
  cultureFit: number;
}

// —————————————————————————————
// The useInterview hook
// —————————————————————————————
export function useInterview() {
  const [details, setDetails] = useState<InterviewDetails>({
    role: "",
    jobDescription: "",
    userInfo: "",
    persona: "General / Neutral",
  });
  const [question, setQuestion] = useState<string>("");
  const [askedQuestions, setAskedQuestions] = useState<string[]>([]);
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [careerConfidenceScore, setCareerConfidenceScore] = useState<number>(0);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [feedbackSections, setFeedbackSections] =
    useState<FeedbackSections | null>(null);
  const [transcript, setTranscript] = useState<string>("");
  const [typedAnswer, setTypedAnswer] = useState<string>("");
  const [listening, setListening] = useState<boolean>(false);
  const [audioFeedbackEnabled, setAudioFeedbackEnabled] =
    useState<boolean>(true);
  const [eqMetrics, setEQMetrics] = useState<EQMetrics>({
    confidence: 0,
    enthusiasm: 0,
    empathy: 0,
  });
  const [isAIAnswer, setIsAIAnswer] = useState<boolean>(false);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [hint, setHint] = useState<string | null>(null);
  const [repeated, setRepeated] = useState<boolean>(false);
  const [followUpActive, setFollowUpActive] = useState<boolean>(false);
  const [followUpQuestion, setFollowUpQuestion] = useState<string>("");
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const [competencies, setCompetencies] = useState<Competencies>({
    technical: 0,
    behavioral: 0,
    situational: 0,
    leadership: 0,
    communication: 0,
    cultureFit: 0,
  });

  // on unmount, stop any in‐flight recognition
  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  // advance to next question
  function nextQuestion() {
    if (followUpActive) return;
    const nxt = questionNumber + 1;
    if (nxt <= 5) {
      setQuestionNumber(nxt);
      setFeedbackSections(null);
      setTranscript("");
      setTypedAnswer("");
      setIsAIAnswer(false);
      setHint(null);
      fetchNextQuestion();
    }
  }

  // get the next question from your API
  async function fetchNextQuestion() {
    const res = await fetch("/api/interview-simulator/question", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...details, questionNumber }),
    });
    const { question: q } = await res.json();
    setRepeated(askedQuestions.includes(q));
    setAskedQuestions((prev) => [...prev, q]);
    setQuestion(q);

    if (audioFeedbackEnabled && typeof window !== "undefined") {
      speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(q);
      if (details.persona.startsWith("Legacy:")) {
        utt.rate = 0.9;
        utt.pitch = 1.1;
      }
      speechSynthesis.speak(utt);
    }
  }

  // start a new interview session
  function startInterview(d: InterviewDetails) {
    setDetails(d);
    setAskedQuestions([]);
    setRepeated(false);
    setQuestionNumber(1);
    setTotalScore(0);
    setCareerConfidenceScore(0);
    setFeedbackSections(null);
    setTranscript("");
    setTypedAnswer("");
    setEQMetrics({ confidence: 0, enthusiasm: 0, empathy: 0 });
    setIsAIAnswer(false);
    setHint(null);
    setFollowUpActive(false);
    fetchNextQuestion();
  }

  // submit the user’s answer for feedback
  async function submitAnswer(answer: string) {
    setIsEvaluating(true);
    const res = await fetch("/api/interview-simulator/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...details, question, transcript: answer }),
    });
    const data = await res.json();
    const {
      situation,
      task,
      action,
      result,
      suggestions,
      score,
      eq,
      competencies: comp,
      isAIAnswer: aiFlag,
    } = data;

    setFeedbackSections({ situation, task, action, result, suggestions });
    setCareerConfidenceScore(score);
    setTotalScore((prev) => prev + score);
    setEQMetrics(eq);
    setIsAIAnswer(!!aiFlag);
    setCompetencies(comp);
    setIsEvaluating(false);

    const low =
      result.toLowerCase().includes("not") ||
      result.toLowerCase().includes("unclear");
    if (low) {
      setFollowUpQuestion(
        "Can you elaborate on the outcome or results of that situation?",
      );
      setFollowUpActive(true);
    } else {
      setFollowUpActive(false);
    }
  }

  // begin voice recording via browser API
  function startRecording() {
    if (!SpeechRecognition) {
      alert("Speech recognition not supported");
      return;
    }
    const recog = new SpeechRecognition();
    recog.lang = "en-US";
    recog.continuous = false;

    recog.onresult = (e) => {
      const text = e.results[0][0].transcript;
      setTranscript(text);
      if (!followUpActive) submitAnswer(text);
      else {
        setFollowUpActive(false);
        nextQuestion();
      }
    };
    recog.onend = () => setListening(false);
    recog.onerror = () => {
      setListening(false);
      alert("Recognition error");
    };

    recog.start();
    recognitionRef.current = recog;
    setListening(true);
  }

  function stopRecording() {
    recognitionRef.current?.stop();
    setListening(false);
  }

  function submitTypedAnswer() {
    if (!followUpActive) submitAnswer(typedAnswer);
    else {
      setFollowUpActive(false);
      nextQuestion();
    }
  }

  // request a STAR‐formatted hint
  async function fetchHint() {
    const res = await fetch("/api/interview-simulator/hint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, ...details }),
    });
    const { hint } = await res.json();
    setHint(hint);
  }

  function toggleFeedbackAudio() {
    setAudioFeedbackEnabled((x) => !x);
    if (typeof window !== "undefined") speechSynthesis.cancel();
  }

  function shareTotalScore() {
    const url = window.location.href;
    const text = `I scored ${totalScore}/500 on AI Interview Simulator! Try it: ${url}`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
      "_blank",
    );
  }

  function copySession() {
    const txt = `Q${questionNumber}: ${question}\nA: ${transcript}\n`;
    navigator.clipboard.writeText(txt);
    alert("Copied!");
  }

  return {
    question,
    questionNumber,
    feedbackSections,
    careerConfidenceScore,
    totalScore,
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
  };
}
