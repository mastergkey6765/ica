import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../lib/AuthContext";
import {
  Loader2,
  CheckCircle2,
  Lock,
  PlayCircle,
  Award,
  FileText,
  HelpCircle,
  MonitorPlay,
  ArrowLeft,
} from "lucide-react";
import ReactPlayer from "react-player";
const Player: any = ReactPlayer;
import { generateCertificate } from "../lib/generateCertificate";

export const defaultQuestions: any = [
  {
    "question": "Please Enter Your Email Address* (Your digital master diploma will be sent here for you to have color print out  on 100# White Card Stock)",
    "type": "short_answer",
    "options": [],
    "correctOption": 0,
    "points": 5,
    "isRequired": true
  },
  {
    "question": "Please enter your Full Name as you wish it to appear on your Advanced TDI license program (train-the-trainer). Note that the letters CATDIT will be automatically added to your name signifying Certified Advanced Transactional Dementia Intelligence™ Trainer.",
    "type": "short_answer",
    "options": [],
    "correctOption": 0,
    "points": 5,
    "isRequired": true
  },
  {
    "question": "1. A dementia coach under the TDI business model of dementia care is certified in",
    "type": "multiple_choice",
    "options": [
      "2 accredited courses",
      "3 accredited courses plus dementia coaching",
      "4 accredited courses",
      "4 accredited courses plus credit for other approved training and amp; work experience"
    ],
    "correctOption": 0,
    "points": 5,
    "isRequired": true
  },
  {
    "question": "2. Transactional Analysis (TA) is a theory in psychology that is used in",
    "type": "multiple_choice",
    "options": [
      "a) Counseling, therapy, psychiatry, and coaching",
      "b) Business communication/leadership, such as teamwork",
      "c) Dementia care/management in Lord’s Theory",
      "d) All of the above"
    ],
    "correctOption": 0,
    "points": 5,
    "isRequired": true
  },
  {
    "question": "3. The brain is hard-wired from birth to death with feelings",
    "type": "multiple_choice",
    "options": [
      "a) Sad, glad, mad, scared",
      "b) Sad and glad",
      "c) Feelings vary from person to person",
      "d) Only (a) above",
      "e) All of the above apply"
    ],
    "correctOption": 0,
    "points": 5,
    "isRequired": true
  },
  {
    "question": "4. TA ( Transactional Analysis) is based on 3 ego states",
    "type": "multiple_choice",
    "options": [
      "a) Parent, Adult, Children ego states",
      "b) Parent, Here and Now, Child ego states",
      "c) Parent, Adult, Child ego states",
      "d) None of the above option",
      "e) All of the above"
    ],
    "correctOption": 0,
    "points": 5,
    "isRequired": true
  },
  {
    "question": "5. The most important aspect in dementia care is for the care provider to",
    "type": "multiple_choice",
    "options": [
      "a) Gain knowledge about dementia care",
      "b) Be confident and ready to serve",
      "c) Gain the trust of the person living with dementia",
      "d) Gain the trust your person and amp; form a healthy symbiosis",
      "e) None of the above",
      "f) All of the above"
    ],
    "correctOption": 0,
    "points": 5,
    "isRequired": true
  },
  {
    "question": "",
    "type": "title",
    "sectionTitle": "Module 2",
    "options": [],
    "correctOption": 0,
    "points": 0,
    "isRequired": false,
    "isSection": true
  },
  {
    "question": "1. Eric Berne’s ego states help us understand our behavior and that of others",
    "type": "multiple_choice",
    "options": [
      "a) We gain great self-awareness and autonomy",
      "b) An understanding of life positions (OK Corral)",
      "c) Both (a) and (b) above"
    ],
    "correctOption": 0,
    "points": 5,
    "isRequired": true
  },
  {
    "question": "2. Maslow’s Theory of Hierarchy states basic human needs which also apply to someone living with dementia",
    "type": "multiple_choice",
    "options": [
      "a) True",
      "b) False",
      "c) Neither, as it depends on the stage of their journey with dementia"
    ],
    "correctOption": 0,
    "points": 5,
    "isRequired": true
  },
  {
    "question": "3. Who stated “Stay blue and people will respond well to you. Turn red and it’s better not said.”",
    "type": "multiple_choice",
    "options": [
      "a) Dr. Ethelle Lord",
      "b) Abe Wagner",
      "c) Eric Berne",
      "d) Unknown author"
    ],
    "correctOption": 0,
    "points": 5,
    "isRequired": true
  },
  {
    "question": "4. The best ego state to invite, remain in, and provide dementia care from is",
    "type": "multiple_choice",
    "options": [
      "a) I’m OK, You’re not OK",
      "b) I’m Ok, You’re OK",
      "c) I’m not OK, You’re not OK",
      "d) You’re OK, I’m not OK",
      "e) Only (a) and (b) above",
      "f) All of the above",
      "g) None of the above"
    ],
    "correctOption": 0,
    "points": 5,
    "isRequired": true
  },
  {
    "question": "5. Lord’s Theory offers the first clear and easy way to understand the psychology of the dementia brain using Transactional Analysis",
    "type": "multiple_choice",
    "options": [
      "a) True",
      "b) False",
      "c) Neither, as it depends on the philosophy of each care provider"
    ],
    "correctOption": 0,
    "points": 5,
    "isRequired": true
  },
  {
    "question": "",
    "type": "title",
    "sectionTitle": "Module 3",
    "options": [],
    "correctOption": 0,
    "points": 0,
    "isRequired": false,
    "isSection": true
  },
  {
    "question": "1. Person-centered care is critical to adopt and practice. Research emphasizes the importance of communication and collaboration. There are 4 elements to person-centered care:",
    "type": "multiple_choice",
    "options": [
      "a) Trust, patience, knowledge, controlling",
      "b) Patient, trustworthy, positive, happy",
      "Knowledge of the person, flexibility & adaptability, involving the person in decisions that concern their care and wellbeing, and creating a positive environment",
      "d) All of the above",
      "e) None of the above, as this is the responsibility of the dementia coach"
    ],
    "correctOption": 0,
    "points": 5,
    "isRequired": true
  },
  {
    "question": "2. Communication throughout the dementia journey is crucial for the person living with dementia. This means effective communication lessens the symptoms of dementia, improves social interactions, and increases the person’s sense of self and belonging",
    "type": "multiple_choice",
    "options": [
      "a) True",
      "b) False",
      "c) Neither, as it depends on the level of care needed",
      "d) False, because it depends on the stage of their dementia diagnosis"
    ],
    "correctOption": 0,
    "points": 5,
    "isRequired": true
  },
  {
    "question": "3. The OK Corral offers 4 life positions. Only one of the positions is ideal in life, especially the life of the person living with dementia and for the best possible quality of work for the care providers",
    "type": "multiple_choice",
    "options": [
      "a) I’m OK, You’re OK (because we are both OK)",
      "b) I’m OK, You’re not OK (because you’re are living with dementia)",
      "c) I’m not OK, You’re not OK (because life happens)",
      "d) I’m not OK, You’re OK (because you only live in the present with dementia)",
      "e) None of the above",
      "g) All of the above"
    ],
    "correctOption": 0,
    "points": 5,
    "isRequired": true
  },
  {
    "question": "4. If your person who is 89 years old is asking, for the 5 th  time, that he wants to speak to his mother. Do you:",
    "type": "multiple_choice",
    "options": [
      "a) Explain, with great compassion, that his mother is in heaven now and at peace.",
      "b) Tell him she will be coming by to pick him up and invite him to go to have something to drink.",
      "c) Ask him to tell you about what he remembers of his mother in order to distract him.",
      "d) Redirect him as quickly as possible and return him to a quiet place.",
      "e) Call him by his first name, ask him to listen to you, and validate his feeling of love for his mother and her love for him.",
      "f) None of the above"
    ],
    "correctOption": 0,
    "points": 5,
    "isRequired": true
  },
  {
    "question": "5. Contamination of one or more ego states in dementia means that one ego state intrudes on another ego state, disrupting the clear functioning of the Parent and/or Adult ego states:",
    "type": "multiple_choice",
    "options": [
      "a) True",
      "b) False",
      "c) Neither, as it depends on the establishment of a healthy symbiotic relationship"
    ],
    "correctOption": 0,
    "points": 5,
    "isRequired": true
  },
  {
    "question": "6. Retrogenesis is the process where dementia corresponds to developmental ages as per Reisberg, et.al., 2002, which consists of 9 stages from having no difficulty in day-to-day functioning to a severe cognitive decline affecting speech, physical movement, and requiring 24/7 care:",
    "type": "multiple_choice",
    "options": [
      "a) True",
      "b) False"
    ],
    "correctOption": 0,
    "points": 5,
    "isRequired": true
  },
  {
    "question": "",
    "type": "title",
    "sectionTitle": "Bonus Questions:",
    "options": [],
    "correctOption": 0,
    "points": 0,
    "isRequired": false,
    "isSection": true
  },
  {
    "question": "1. The TDI business model of dementia care offers a new perspective in dementia communication. For example, care assistants in long-term care communities work a 6-hour shift but are paid for 8 hours of work, and families enjoy a level of trust in the services of their person:",
    "type": "multiple_choice",
    "options": [
      "a) True",
      "b) False"
    ],
    "correctOption": 0,
    "points": 5,
    "isRequired": true
  },
  {
    "question": "2. Dementia naturally contaminates ego states and disrupts the clear functioning of two ego states. This naturally results in irrational or distorted thinking and behavior:",
    "type": "multiple_choice",
    "options": [
      "a) True",
      "b) Contaminatesonly the Parent and Adult ego states",
      "c) Contaminates only the Parent and Adult ego states",
      "d) Contaminates all three ego states (Parent, Adult, Child)"
    ],
    "correctOption": 0,
    "points": 5,
    "isRequired": true
  }
];


export default function CoursePlayer() {
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [course, setCourse] = useState<any>(null);
  const [enrollment, setEnrollment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [examMode, setExamMode] = useState(false);
  const [examPassed, setExamPassed] = useState<boolean | null>(null);
  const [activeModuleIndex, setActiveModuleIndex] = useState<number | null>(
    null,
  );

  // Exam States
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes
  const [examStarted, setExamStarted] = useState(false);
  const [examScore, setExamScore] = useState<number | null>(null);
  const [examCertId, setExamCertId] = useState<string | null>(null);

    // Timer Effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (examStarted && timeLeft > 0 && examPassed === null) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && examPassed === null) {
      handleSubmitExam();
    }
    return () => clearInterval(timer);
  }, [examStarted, timeLeft, examPassed]);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        if (!id) return;

        // Let's use standard default courses if none in DB for demo purposes
        const courseDoc = await getDoc(doc(db, "courses", id));
        if (courseDoc.exists()) {
          setCourse({ id: courseDoc.id, ...courseDoc.data() });
        } else {
          // Fallback to simple title
          setCourse({
            id,
            title: "Course " + id,
            description: "Learn the fundamentals.",
          });
        }

        if (currentUser) {
          const q = query(
            collection(db, "enrollments"),
            where("userId", "==", currentUser.uid),
            where("courseId", "==", id),
          );
          const snap = await getDocs(q);
          if (!snap.empty) {
            setEnrollment({ id: snap.docs[0].id, ...snap.docs[0].data() });
          }
        }
      } catch (err) {
        console.error("Error fetching course data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseData();
  }, [id, currentUser]);

  const handleEnroll = async () => {
    if (!currentUser) {
      navigate("/auth");
      return;
    }

    // Simulate payment / instant enrollment
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, "enrollments"), {
        userId: currentUser.uid,
        courseId: id,
        status: "enrolled",
        progress: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      setEnrollment({
        id: docRef.id,
        userId: currentUser.uid,
        courseId: id,
        status: "enrolled",
        progress: 0,
      });
    } catch (err) {
      console.error("Enrollment error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteModule = async (
    index?: number,
    totalModules?: number,
  ) => {
    if (!enrollment) return;
    setLoading(true);
    let newProgress = 100;

    if (typeof index === "number" && typeof totalModules === "number") {
      newProgress = Math.round(((index + 1) / totalModules) * 100);
    }

    try {
      await updateDoc(doc(db, "enrollments", enrollment.id), {
        progress: newProgress,
        updatedAt: serverTimestamp(),
      });
      setEnrollment({ ...enrollment, progress: newProgress });
    } catch (err) {
      console.error("Progress error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleTakeExam = async (pass: boolean) => {
    // Legacy mock function, left for compatibility, replaced by handleSubmitExam
  };

  const examQuestions = course?.questions && course.questions.length > 0 ? course.questions : defaultQuestions;
  const actualQuestions = examQuestions.filter(q => !q.isSection);
  const handleSubmitExam = async () => {
    if (!enrollment) return;
    
    // Check required fields
    const missingRequired = examQuestions.findIndex((q, index) => {
      if (q.isSection || q.type === 'title') return false;
      if (q.isRequired !== false) {
         const ans = answers[index];
         if (ans === undefined || ans === null || ans === '') return true;
      }
      return false;
    });

    if (missingRequired !== -1) {
      const qNum = examQuestions.slice(0, missingRequired).filter(qu => !qu.isSection && qu.type !== 'title').length + 1;
      alert(`Please answer required question ${qNum} before submitting.`);
      return;
    }

    setLoading(true);
    try {
      let totalPointsEarned = 0;
      let totalPossiblePoints = 0;
      
      examQuestions.forEach((q, index) => {
        if (!q.isSection && q.type !== 'title') {
           const points = q.points !== undefined ? q.points : 5;
           totalPossiblePoints += points;
           
           if (!q.type || q.type === 'multiple_choice') {
             if (answers[index] === q.correctOption) {
                 totalPointsEarned += points;
             }
           } else {
             // For text answers, if they answered something, give full points for now
             if (answers[index] && String(answers[index]).trim() !== '') {
                 totalPointsEarned += points;
             }
           }
        }
      });

      const score = totalPossiblePoints > 0 ? Math.round((totalPointsEarned / totalPossiblePoints) * 100) : 100;
      const passed = score >= 90; // 90% passing grade

      setExamScore(score);
      setExamPassed(passed);

      const updates: any = {
        examScore: score,
        updatedAt: serverTimestamp(),
      };

      if (passed) {
        updates.status = "completed";
        // Generate Certificate
        const certDoc = await addDoc(collection(db, "userCertificates"), {
          userId: currentUser!.uid,
          courseId: id,
          courseTitle: course?.title || "Certification",
          score,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        setExamCertId(certDoc.id);
      }

      await updateDoc(doc(db, "enrollments", enrollment.id), updates);
      setEnrollment({ ...enrollment, ...updates });
    } catch (err) {
      console.error("Exam error:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 size={40} className="animate-spin text-brand-deep-teal" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 text-brand-deep-teal hover:text-brand-navy font-semibold mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Dashboard
      </Link>
      <div className="bg-white rounded-3xl shadow-sm border border-brand-sage-200 overflow-hidden">
        {/* Header */}
        <div className="bg-brand-navy p-8 sm:p-12 text-white">
          <h1 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            {course?.title}
          </h1>
          <p className="text-brand-sage-200 text-lg leading-relaxed max-w-2xl">
            {course?.description}
          </p>
        </div>

        {/* Content */}
        <div className="p-8 sm:p-12">
          {!enrollment ? (
            <div className="text-center py-12">
              <Lock size={48} className="mx-auto text-gray-400 mb-6" />
              <h2 className="text-2xl font-bold text-brand-navy mb-4">
                Enroll to Access this Course
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Secure your spot today and get lifetime access to all course
                materials and certification.
              </p>
              <button
                onClick={handleEnroll}
                className="bg-brand-gold hover:bg-brand-gold-hover text-brand-navy font-bold px-8 py-4 rounded-full shadow-sm transition-all inline-flex items-center gap-2 text-lg"
              >
                Enroll Now (Mock Payment)
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Modules View */}
              {!examMode && (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-brand-navy">
                      Course Content
                    </h2>
                    <span className="font-semibold text-brand-deep-teal">
                      {enrollment.progress}% Complete
                    </span>
                  </div>

                  <div className="space-y-4">
                    {activeModuleIndex !== null && course?.modules ? (
                      <div className="bg-white rounded-xl overflow-hidden border border-brand-sage-200">
                        <div className="p-4 bg-brand-light-gray border-b border-gray-200 flex justify-between items-center">
                          <button
                            onClick={() => setActiveModuleIndex(null)}
                            className="text-brand-deep-teal font-semibold text-sm hover:underline"
                          >
                            &larr; Back to Modules
                          </button>
                          <h3 className="font-bold text-gray-900">
                            {course.modules[activeModuleIndex].title}
                          </h3>
                        </div>
                        <div className="p-6 md:p-8">
                          {course.modules[activeModuleIndex].type ===
                          "video" ? (
                            <div className="aspect-video bg-black rounded-lg overflow-hidden relative shadow-md border border-gray-200 flex items-center justify-center">
                              {course.modules[activeModuleIndex].videoUrl ? (
                                (() => {
                                  let raw =
                                    course.modules[activeModuleIndex].videoUrl;
                                  if (!raw || typeof raw !== "string")
                                    return null;

                                  let url = raw;
                                  if (raw.includes("<iframe")) {
                                    const match =
                                      raw.match(/src=["'](.*?)["']/);
                                    if (match) url = match[1];
                                  } else if (
                                    !url.startsWith("http") &&
                                    !url.startsWith("<")
                                  ) {
                                    url = "https://" + url;
                                  }

                                  // Check if it's Vimeo or YouTube to use a native iframe for better performance and smooth streaming
                                  let isEmbed = false;
                                  if (url.includes("vimeo.com")) {
                                    const vimeoIdMatch = url.match(
                                      /vimeo\.com\/(?:video\/)?(\d+)/,
                                    );
                                    if (vimeoIdMatch) {
                                      url = `https://player.vimeo.com/video/${vimeoIdMatch[1]}?autoplay=0&title=0&byline=0&portrait=0`;
                                      isEmbed = true;
                                    }
                                  } else if (
                                    url.includes("youtube.com") ||
                                    url.includes("youtu.be")
                                  ) {
                                    let ytId = "";
                                    if (url.includes("youtube.com/watch")) {
                                      const ytIdMatch = url.match(/v=([^&]+)/);
                                      if (ytIdMatch) ytId = ytIdMatch[1];
                                    } else if (url.includes("youtu.be/")) {
                                      const ytIdMatch =
                                        url.match(/youtu\.be\/([^?]+)/);
                                      if (ytIdMatch) ytId = ytIdMatch[1];
                                    }
                                    if (ytId) {
                                      url = `https://www.youtube.com/embed/${ytId}?rel=0`;
                                      isEmbed = true;
                                    }
                                  }

                                  if (isEmbed) {
                                    return (
                                      <iframe
                                        src={url}
                                        className="absolute top-0 left-0 w-full h-full"
                                        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                                        allowFullScreen
                                        frameBorder="0"
                                      />
                                    );
                                  }

                                  const Player: any = ReactPlayer;
                                  return (
                                    <Player
                                      className="absolute top-0 left-0"
                                      url={url}
                                      width="100%"
                                      height="100%"
                                      controls={true}
                                      playsinline={true}
                                      fallback={
                                        <div className="flex items-center justify-center w-full h-full text-white bg-gray-900 border border-brand-sage-200">
                                          Loading video player...
                                        </div>
                                      }
                                    />
                                  );
                                })()
                              ) : (
                                <div className="text-white bg-gray-900 w-full h-full flex flex-col justify-center items-center">
                                  <PlayCircle
                                    size={48}
                                    className="text-gray-600 mb-4"
                                  />
                                  <p className="text-gray-400">
                                    Video yet to be uploaded
                                  </p>
                                </div>
                              )}
                            </div>
                          ) : course.modules[activeModuleIndex].type ===
                              "pdf" &&
                            course.modules[activeModuleIndex].pdfUrl ? (
                            <div className="aspect-[4/3] w-full border border-gray-200 rounded-lg shadow-sm">
                              <iframe
                                src={course.modules[activeModuleIndex].pdfUrl}
                                title={course.modules[activeModuleIndex].title}
                                className="w-full h-full rounded-lg"
                              />
                            </div>
                          ) : course.modules[activeModuleIndex].type ===
                            "text" ? (
                            <div className="prose max-w-none text-gray-800 whitespace-pre-wrap bg-white p-6 rounded-lg border border-gray-100 shadow-sm leading-relaxed">
                              {course.modules[activeModuleIndex].textContent ||
                                "No text content provided."}
                            </div>
                          ) : course.modules[activeModuleIndex].type ===
                            "quiz" ? (
                            <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200">
                              <HelpCircle
                                size={48}
                                className="mx-auto text-brand-sage-200 mb-4"
                              />
                              <h4 className="text-xl font-bold text-gray-900 mb-2">
                                Quiz Module
                              </h4>
                              <p className="text-gray-500">
                                Quiz implementation is pending active content.
                              </p>
                            </div>
                          ) : (
                            <div className="text-center py-12 text-gray-500">
                              Content is not available for this module.
                            </div>
                          )}

                          <div className="mt-10 flex justify-end">
                            <button
                              onClick={() => {
                                handleCompleteModule(
                                  activeModuleIndex,
                                  course.modules.length,
                                );
                                setActiveModuleIndex(null);
                              }}
                              className="bg-brand-deep-teal hover:bg-brand-navy text-white px-8 py-3 rounded-full font-bold transition-colors shadow-sm"
                            >
                              Mark as Complete
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : course?.modules && course.modules.length > 0 ? (
                      course.modules.map((mod: any, index: number) => {
                        const isCompleted =
                          enrollment.progress >=
                          ((index + 1) / course.modules.length) * 100;

                        let Icon = PlayCircle;
                        if (mod.type === "text") Icon = FileText;
                        if (mod.type === "pdf") Icon = FileText;
                        if (mod.type === "quiz") Icon = HelpCircle;
                        if (mod.type === "video") Icon = MonitorPlay;

                        return (
                          <div
                            key={mod.id || index}
                            className="p-6 rounded-xl border border-brand-sage-200 flex items-center justify-between bg-brand-warm-white/50 hover:border-brand-deep-teal transition-colors group cursor-pointer"
                            onClick={() => setActiveModuleIndex(index)}
                          >
                            <div className="flex items-center gap-4">
                              <Icon
                                size={32}
                                className={`${isCompleted ? "text-brand-deep-teal" : "text-gray-400 group-hover:text-brand-deep-teal"} transition-colors`}
                              />
                              <div>
                                <h3 className="font-bold text-gray-900 group-hover:text-brand-deep-teal transition-colors">
                                  {mod.title}
                                </h3>
                                <p className="text-sm text-gray-500 capitalize">
                                  {mod.type} • {mod.duration}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              {isCompleted ? (
                                <CheckCircle2
                                  size={24}
                                  className="text-green-500"
                                />
                              ) : (
                                <div className="hidden sm:block text-sm font-semibold text-brand-deep-teal group-hover:underline">
                                  Start Module
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="p-6 rounded-xl border border-brand-sage-200 flex items-center justify-between bg-brand-warm-white/50">
                        <div className="flex items-center gap-4">
                          <MonitorPlay
                            size={32}
                            className="text-brand-deep-teal"
                          />
                          <div>
                            <h3 className="font-bold text-gray-900">
                              Module 1: The Foundations
                            </h3>
                            <p className="text-sm text-gray-500">
                              Video • 45 mins
                            </p>
                          </div>
                        </div>
                        {enrollment.progress >= 100 ? (
                          <CheckCircle2 size={24} className="text-green-500" />
                        ) : (
                          <button
                            onClick={() => handleCompleteModule()}
                            className="bg-brand-deep-teal hover:bg-brand-navy text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
                          >
                            Mark Complete
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {enrollment.progress === 100 &&
                    enrollment.status !== "completed" && (
                      <div className="mt-12 bg-green-50 rounded-2xl p-8 text-center border border-green-100">
                        <Award
                          size={48}
                          className="mx-auto text-green-600 mb-4"
                        />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          You're ready for the exam!
                        </h3>
                        <p className="text-gray-600 mb-6">
                          Take the final assessment to earn your official
                          certification.
                        </p>
                        <button
                          onClick={() => setExamMode(true)}
                          className="bg-brand-navy hover:bg-brand-navy/90 text-white font-bold px-8 py-3 rounded-full transition-colors"
                        >
                          Start Final Exam
                        </button>
                      </div>
                    )}

                  {enrollment.status === "completed" && (
                    <div className="mt-12 bg-brand-gold/10 rounded-2xl p-8 text-center border border-brand-gold/30">
                      <Award
                        size={48}
                        className="mx-auto text-brand-gold mb-4"
                      />
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Congratulations!
                      </h3>
                      <p className="text-gray-600 mb-0">
                        You've successfully completed the course and earned your
                        certification.
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* Exam View */}
              {examMode && (
                <div className="max-w-3xl mx-auto py-8">
                  <h2 className="text-3xl font-bold text-brand-navy mb-8 text-center">
                    {course?.examTitle || "Final Assessment"}
                  </h2>

                  {examPassed === null && !examStarted ? (
                    <div className="space-y-6 bg-white p-8 rounded-2xl border border-gray-200 text-center shadow-sm">
                      <HelpCircle
                        size={48}
                        className="mx-auto text-brand-deep-teal mb-4"
                      />
                      <h3 className="text-xl font-bold text-gray-900">
                        {course?.examTitle || "Ready to take the exam?"}
                      </h3>
                      {course?.examDescription && <p className="text-gray-600 text-left max-w-2xl mx-auto whitespace-pre-wrap">{course.examDescription}</p>}
                      <ul className="text-gray-600 text-left max-w-md mx-auto space-y-3 mb-6 bg-brand-warm-white p-6 rounded-xl border border-gray-100">
                        <li>
                          • <strong>Duration:</strong> 15 minutes
                        </li>
                        <li>
                          • <strong>Questions:</strong>{" "}
                          {actualQuestions.length} Multiple Choice
                        </li>
                        <li>
                          • <strong>Passing Score:</strong> 70%
                        </li>
                        <li>• You can retake the exam if you do not pass.</li>
                      </ul>
                      <button
                        onClick={() => {
                          setExamStarted(true);
                          setTimeLeft(15 * 60);
                          setAnswers({});
                        }}
                        className="bg-brand-deep-teal text-white px-8 py-3 rounded-full font-bold hover:bg-brand-navy transition-colors text-lg w-full sm:w-auto"
                      >
                        Start Exam
                      </button>
                    </div>
                  ) : examPassed === null && examStarted ? (
                    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm relative">
                      {/* Timer & Progress Header */}
                      <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100 sticky top-0 bg-white z-10 pt-4">
                        <div className="w-1/2 bg-gray-200 rounded-full h-2 mr-6 hidden sm:block">
                          <div
                            className="bg-brand-deep-teal h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${(Object.keys(answers).length / actualQuestions.length) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-gray-500 hidden sm:block">
                          {Object.keys(answers).length} of{" "}
                          {actualQuestions.length} answered
                        </span>

                        <div
                          className={`font-mono text-xl font-bold px-4 py-2 rounded-lg ${timeLeft < 60 ? "bg-red-100 text-red-600 animate-pulse" : "bg-brand-warm-white text-brand-navy border border-gray-200"}`}
                        >
                          {formatTime(timeLeft)}
                        </div>
                      </div>

                      <div className="space-y-10">
                        {examQuestions.map((q, qIndex) => q.isSection ? (
                          <div key={qIndex} className="mt-8 mb-6">
                            <h3 className="text-2xl font-extrabold text-brand-navy pb-2 border-b-2 border-brand-sage-200">
                              {q.sectionTitle}
                            </h3>
                            {q.description && <p className="mt-2 text-gray-600 whitespace-pre-wrap">{q.description}</p>}
                            {q.imageUrl && <img src={q.imageUrl} alt={q.sectionTitle || 'Image'} className="mt-4 rounded-xl max-w-full h-auto" />}
                            {q.videoUrl && (
                                <div className="mt-4 aspect-video rounded-xl overflow-hidden">
                                   <Player url={q.videoUrl} width="100%" height="100%" controls />
                                </div>
                            )}
                          </div>
                        ) : (
                          <div
                            key={qIndex}
                            className="bg-brand-warm-white/30 p-6 rounded-xl border border-gray-100"
                          >
                            <h4 className="text-lg font-bold text-gray-900 mb-6 flex gap-3">
                              <span className="text-brand-deep-teal">
                                {examQuestions.slice(0, qIndex).filter(qu => !qu.isSection).length + 1}.
                              </span>
                              {q.question}
                              {q.isRequired !== false && <span className="text-red-500 ml-1">*</span>}
                            </h4>
                            <div className="space-y-3 pl-6">
                              {(!q.type || q.type === 'multiple_choice') ? q.options.map((opt, optIndex) => (
                                <label
                                  key={optIndex}
                                  className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                                    answers[qIndex] === optIndex
                                      ? "bg-brand-navy/5 border-brand-deep-teal shadow-sm"
                                      : "bg-white border-gray-200 hover:border-brand-deep-teal/40 hover:bg-brand-warm-white"
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name={`question-${qIndex}`}
                                    value={optIndex}
                                    checked={answers[qIndex] === optIndex}
                                    onChange={() =>
                                      setAnswers((prev) => ({
                                        ...prev,
                                        [qIndex]: optIndex,
                                      }))
                                    }
                                    className="mt-1 flex-shrink-0 w-4 h-4 text-brand-deep-teal border-gray-300 focus:ring-brand-deep-teal"
                                  />
                                  <span
                                    className={`text-gray-800 ${answers[qIndex] === optIndex ? "font-medium" : ""}`}
                                  >
                                    {opt}
                                  </span>
                                </label>
                              )) : q.type === 'short_answer' ? (
                                <input
                                  type="text"
                                  value={answers[qIndex] || ''}
                                  onChange={(e) => setAnswers(prev => ({...prev, [qIndex]: e.target.value}))}
                                  className="w-full max-w-md border-0 border-b border-gray-300 bg-transparent px-0 py-2 focus:ring-0 focus:border-brand-deep-teal"
                                  placeholder="Your answer"
                                />
                              ) : q.type === 'paragraph' ? (
                                <textarea
                                  value={answers[qIndex] || ''}
                                  onChange={(e) => setAnswers(prev => ({...prev, [qIndex]: e.target.value}))}
                                  className="w-full border border-gray-300 rounded-lg bg-white px-4 py-3 focus:ring-2 focus:ring-brand-deep-teal/20 focus:border-brand-deep-teal h-32"
                                  placeholder="Your answer"
                                />
                              ) : null}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-10 pt-6 border-t border-gray-100 flex justify-end">
                        <button
                          onClick={handleSubmitExam}
                          disabled={
                            Object.keys(answers).length < actualQuestions.length && timeLeft > 0
                          }
                          className="bg-brand-deep-teal text-white px-10 py-4 rounded-xl font-bold hover:bg-brand-navy transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                        >
                          {Object.keys(answers).length < actualQuestions.length
                            ? "Answer all questions to submit"
                            : "Submit Exam"}
                        </button>
                      </div>
                    </div>
                  ) : examPassed ? (
                    <div className="text-center space-y-6 bg-white p-12 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -mt-20 -mr-20"></div>
                      <CheckCircle2
                        size={80}
                        className="mx-auto text-green-500 relative z-10"
                      />
                      <div className="relative z-10">
                        <h3 className="text-3xl font-bold font-heading text-gray-900 mb-2">
                          Exam Passed!
                        </h3>
                        <p className="text-xl font-bold text-brand-navy bg-brand-warm-white inline-block px-6 py-2 rounded-lg mb-4">
                          Score: {examScore}%
                        </p>
                        <p className="text-gray-600 mb-8 max-w-sm mx-auto">
                          Congratulations! Your official certificate has been
                          generated and added to your dashboard.
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10">
                        {examCertId && (
                          <button
                            onClick={() => {
                              generateCertificate(
                                currentUser?.displayName ||
                                  currentUser?.email ||
                                  "Student",
                                course?.title || "Certification",
                                new Date(),
                                examCertId,
                              );
                            }}
                            className="inline-block bg-brand-gold text-brand-navy px-8 py-4 rounded-full font-bold hover:bg-brand-gold-hover transition shadow-lg w-full sm:w-auto"
                          >
                            Download Certificate
                          </button>
                        )}
                        <Link
                          to="/dashboard"
                          className="inline-block bg-brand-navy text-white px-8 py-4 rounded-full font-bold hover:bg-brand-navy/90 transition shadow-lg w-full sm:w-auto"
                        >
                          Go to Dashboard
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center space-y-6 bg-white p-12 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full blur-3xl -mt-20 -mr-20"></div>
                      <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto text-4xl font-bold relative z-10">
                        !
                      </div>
                      <div className="relative z-10">
                        <h3 className="text-3xl font-bold font-heading text-gray-900 mb-2">
                          Did Not Pass
                        </h3>
                        <p className="text-xl font-bold text-red-600 bg-red-50 inline-block px-6 py-2 rounded-lg mb-4">
                          Score: {examScore}%
                        </p>
                        <p className="text-gray-600 mb-8 max-w-sm mx-auto">
                          You need 70% or higher to pass. Please review the
                          course materials and try again when you are ready.
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setExamPassed(null);
                          setExamStarted(false);
                          setExamScore(null);
                        }}
                        className="inline-block bg-brand-gold text-brand-navy px-8 py-4 rounded-full font-bold hover:bg-brand-gold-hover transition shadow-lg relative z-10"
                      >
                        Retake Exam
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
