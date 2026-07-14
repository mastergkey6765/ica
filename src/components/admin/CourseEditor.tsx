import { useState } from 'react';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { defaultQuestions } from '../../pages/CoursePlayer';
import { Loader2, ArrowLeft, Plus, Trash2, GripVertical, ChevronUp, ChevronDown, Image as ImageIcon, PlaySquare, Type, Layout, FileDown, PlusCircle } from 'lucide-react';

interface ModuleItem {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'text' | 'quiz' | 'pdf';
  contentPreview?: string;
  videoUrl?: string;
  pdfUrl?: string;
  textContent?: string;
}

export interface QuestionData {
  question: string;
  points?: number;
  isRequired?: boolean;
  options: string[];
  correctOption: number;
  isSection?: boolean;
  sectionTitle?: string;
  type?: 'multiple_choice' | 'short_answer' | 'paragraph' | 'image' | 'video' | 'title' | 'section';
  imageUrl?: string;
  videoUrl?: string;
  description?: string;
}

export interface CourseData {
  id?: string;
  title: string;
  category: string;
  description: string;
  duration: string;
  certified: boolean;
  image: string;
  outcomes: string[];
  modules?: ModuleItem[];
  questions?: QuestionData[];
  cost?: string;
  highlighted?: boolean;
  tags?: string[];
  qa?: { question: string; answer: string }[];
  examTitle?: string;
  examDescription?: string;
}

interface CourseEditorProps {
  initialData?: CourseData;
  onClose: () => void;
}

export default function CourseEditor({ initialData, onClose }: CourseEditorProps) {
  const [title, setTitle] = useState(initialData?.title || 'ICA Fundamentals of TDI Course Exam');
  const [category, setCategory] = useState(initialData?.category || 'For Professionals');
  const [description, setDescription] = useState(initialData?.description || 'This Exam addresses all four modules of the Fundamentals of TDI course. To pass you will need to achieve a score of 90% correct answers or better. There is also a Bonus Question included at the end. This Exam is self-grading, meaning that when you press Submit, the Exam platform will automatically email you your test results to the email you list below. Should you fall short of the needed 90% score, you will need to leave the Exam form and re-enter from the original Exam link as you did to arrive here, and simply retake the Exam. ICA tracks all exam submissions related to your email address and a passing score will automatically trigger your Certification Diploma to be sent to the Email Address that you share with us via this Exam Form in the space indicated below. We welcome your feedback in the form of questions or comments. This helps us improve our training and clarify any confusion for learners. Direct your feedback to Info@ICAcares.com at your convenience. Thank you ~ ICA Team.');
  const [duration, setDuration] = useState(initialData?.duration || '12 Weeks');
  const [certified, setCertified] = useState(initialData?.certified || false);
  const [image, setImage] = useState(initialData?.image || 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1000&auto=format&fit=crop');
  const [cost, setCost] = useState(initialData?.cost || '');
  const [highlighted, setHighlighted] = useState(initialData?.highlighted || false);
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  
  const [outcomes, setOutcomes] = useState<string[]>(initialData?.outcomes || ['']);
  const [modules, setModules] = useState<ModuleItem[]>(initialData?.modules || []);
  const [activeTab, setActiveTab] = useState<'details' | 'lessons' | 'exam' | 'qa'>('details');
  const [questions, setQuestions] = useState<QuestionData[]>(
    initialData?.questions && initialData.questions.length > 0 
      ? initialData.questions 
      : defaultQuestions
  );
  
  const [qa, setQa] = useState<{ question: string; answer: string }[]>(initialData?.qa || []);
  const [examTitle, setExamTitle] = useState(initialData?.examTitle || initialData?.title || 'ICA Fundamentals of TDI Course Exam');
  const [examDescription, setExamDescription] = useState(initialData?.examDescription || 'This Exam addresses all four modules...');
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addQA = () => setQa([...qa, { question: '', answer: '' }]);
  const removeQA = (index: number) => setQa(qa.filter((_, i) => i !== index));
  const updateQA = (index: number, field: 'question' | 'answer', value: string) => {
    const newQA = [...qa];
    newQA[index][field] = value;
    setQa(newQA);
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // split by comma
    const val = e.target.value;
    const items = val.split(',').map(t => t.trim()).filter(Boolean);
    setTags(items);
  };

  const handleOutcomeChange = (index: number, value: string) => {
    const newOutcomes = [...outcomes];
    newOutcomes[index] = value;
    setOutcomes(newOutcomes);
  };

  const addOutcome = () => {
    setOutcomes([...outcomes, '']);
  };

  const removeOutcome = (index: number) => {
    if (outcomes.length <= 1) return;
    setOutcomes(outcomes.filter((_, i) => i !== index));
  };

  const addModule = () => {
    setModules([...modules, { id: Date.now().toString(), title: 'New Module', duration: '15 mins', type: 'video' }]);
  };

  const updateModule = (index: number, key: keyof ModuleItem, value: any) => {
    const newModules = [...modules];
    newModules[index] = { ...newModules[index], [key]: value };
    setModules(newModules);
  };

  const removeModule = (index: number) => {
    setModules(modules.filter((_, i) => i !== index));
  };

  const addQuestion = () => {
    const newQ = { question: 'New Question', options: ['Option 1', 'Option 2'], correctOption: 0, points: 5, isRequired: true };
    if (activeQuestionIndex !== null) {
      const newQuestions = [...questions];
      newQuestions.splice(activeQuestionIndex + 1, 0, newQ);
      setQuestions(newQuestions);
      setActiveQuestionIndex(activeQuestionIndex + 1);
      setTimeout(() => {
        const el = document.getElementById(`question-${activeQuestionIndex + 1}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
    } else {
      setQuestions([...questions, newQ]);
      setActiveQuestionIndex(questions.length);
      setTimeout(() => {
        const el = document.getElementById(`question-${questions.length}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
    }
  };

  const updateQuestion = (index: number, key: keyof QuestionData, value: any) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], [key]: value };
    setQuestions(newQuestions);
  };


  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const insertItemAfter = (type: 'multiple_choice' | 'title' | 'image' | 'video' | 'section') => {
    const targetIndex = activeQuestionIndex !== null ? activeQuestionIndex : questions.length - 1;
    const newQuestions = [...questions];
    newQuestions.splice(targetIndex + 1, 0, {
      question: type === 'multiple_choice' ? 'New Question' : '',
      options: type === 'multiple_choice' ? ['Option 1'] : [],
      correctOption: 0,
      points: 5,
      isRequired: true,
      isSection: type === 'section' || type === 'title',
      sectionTitle: type === 'section' ? 'New Section' : (type === 'title' ? 'New Title' : ''),
      type: type,
      imageUrl: '',
      videoUrl: '',
      description: ''
    });
    setQuestions(newQuestions);
    setActiveQuestionIndex(targetIndex + 1);
    setTimeout(() => {
      const el = document.getElementById(`question-${targetIndex + 1}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
  };

  const moveQuestionUp = (index: number) => {
    if (index === 0) return;
    const newQuestions = [...questions];
    const temp = newQuestions[index - 1];
    newQuestions[index - 1] = newQuestions[index];
    newQuestions[index] = temp;
    setQuestions(newQuestions);
  };

  const moveQuestionDown = (index: number) => {
    if (index === questions.length - 1) return;
    const newQuestions = [...questions];
    const temp = newQuestions[index + 1];
    newQuestions[index + 1] = newQuestions[index];
    newQuestions[index] = temp;
    setQuestions(newQuestions);
  };


  const addOption = (qIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.push(`Option ${newQuestions[qIndex].options.length + 1}`);
    setQuestions(newQuestions);
  };

  const updateOption = (qIndex: number, oIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const removeOption = (qIndex: number, oIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options = newQuestions[qIndex].options.filter((_, i) => i !== oIndex);
    if (newQuestions[qIndex].correctOption >= newQuestions[qIndex].options.length) {
      newQuestions[qIndex].correctOption = Math.max(0, newQuestions[qIndex].options.length - 1);
    }
    setQuestions(newQuestions);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Please provide title and description.');
      return;
    }

    setIsSubmitting(true);
    try {
      const data = {
        title,
        category,
        description,
        duration,
        certified,
        image,
        cost,
        highlighted,
        tags,
        examTitle,
        examDescription,
        outcomes: outcomes.filter(o => o.trim() !== ''),
        modules,
        questions,
        qa,
        updatedAt: serverTimestamp()
      };

      if (initialData?.id) {
        await updateDoc(doc(db, 'courses', initialData.id), data);
      } else {
        await addDoc(collection(db, 'courses'), {
          ...data,
          createdAt: serverTimestamp()
        });
      }
      onClose();
    } catch (error) {
      handleFirestoreError(error, initialData?.id ? OperationType.UPDATE : OperationType.CREATE, 'courses');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-brand-sage-200">
      <div className="flex items-center justify-between border-b pb-4 mb-6">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-brand-deep-teal transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-2xl font-bold font-heading text-brand-navy">
            {initialData?.id ? 'Edit Course' : 'Create Course'}
          </h2>
        </div>
      </div>

      
      <div className="flex space-x-1 border-b border-gray-200 mb-6">
        <button
          type="button"
          onClick={() => setActiveTab('details')}
          className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'details' ? 'border-brand-deep-teal text-brand-deep-teal' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
        >
          Course Details
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('lessons')}
          className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'lessons' ? 'border-brand-deep-teal text-brand-deep-teal' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
        >
          Lessons & Modules
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('exam')}
          className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'exam' ? 'border-brand-deep-teal text-brand-deep-teal' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
        >
          Exam Questions
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('qa')}
          className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'qa' ? 'border-brand-deep-teal text-brand-deep-teal' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
        >
          Q&A / FAQs
        </button>
      </div>
      
      
      <form onSubmit={handleSave} className="space-y-8">
        <div className={activeTab === 'details' ? 'block' : 'hidden'}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-brand-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-deep-teal bg-brand-warm-white/50 text-lg font-medium"
              placeholder="Course Title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-brand-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-deep-teal"
              placeholder="e.g. For Families"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Duration</label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-4 py-2 border border-brand-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-deep-teal"
              placeholder="e.g. 12 Weeks or Self-paced"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Image URL</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-4 py-2 border border-brand-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-deep-teal"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Cost / Price</label>
            <input
              type="text"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className="w-full px-4 py-2 border border-brand-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-deep-teal"
              placeholder="e.g. $199 or Free"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Tags (comma separated)</label>
            <input
              type="text"
              value={tags.join(', ')}
              onChange={(e) => {
                const val = e.target.value;
                setTags(val.split(',').map(tag => tag.trim()).filter(t => t.length > 0) || val === '' ? val.split(',').map(tag => tag.trim()) : []);
                // This is a bit simplistic, we can just split and trim
              }}
              onBlur={(e) => {
                  const val = e.target.value;
                  setTags(val.split(',').map(tag => tag.trim()).filter(Boolean));
              }}
              className="w-full px-4 py-2 border border-brand-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-deep-teal"
              placeholder="e.g. Caregiving, Professional, Certificate"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-brand-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-deep-teal resize-none h-32"
              placeholder="Detailed course description..."
              required
            />
          </div>
          
          <div className="md:col-span-2 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 flex items-center gap-3 bg-brand-light-gray p-4 rounded-lg">
               <input 
                 type="checkbox" 
                 id="certifiedToggle"
                 checked={certified}
                 onChange={(e) => setCertified(e.target.checked)}
                 className="w-5 h-5 text-brand-deep-teal rounded focus:ring-brand-deep-teal"
               />
               <label htmlFor="certifiedToggle" className="font-semibold text-brand-navy">
                 Official Certification program
               </label>
            </div>
            
            <div className="flex-1 flex items-center gap-3 bg-brand-light-gray p-4 rounded-lg">
               <input 
                 type="checkbox" 
                 id="highlightedToggle"
                 checked={highlighted}
                 onChange={(e) => setHighlighted(e.target.checked)}
                 className="w-5 h-5 text-brand-deep-teal rounded focus:ring-brand-deep-teal"
               />
               <label htmlFor="highlightedToggle" className="font-semibold text-brand-navy">
                 Highlight/Feature this course
               </label>
            </div>
          </div>
        </div>

        
          
          <div className="border-t border-gray-100 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Learning Outcomes</h3>
            <button 
              type="button" 
              onClick={addOutcome}
              className="text-brand-deep-teal text-sm font-semibold flex items-center gap-1 hover:text-brand-navy"
            >
              <Plus size={16} /> Add Outcome
            </button>
          </div>
          <div className="space-y-3">
            {outcomes.map((outcome, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={outcome}
                  onChange={(e) => handleOutcomeChange(index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-brand-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-deep-teal"
                  placeholder="e.g. Mastery of TDI Framework"
                />
                <button
                  type="button"
                  onClick={() => removeOutcome(index)}
                  className="p-2 text-red-400 hover:text-red-600 transition-colors disabled:opacity-30"
                  disabled={outcomes.length <= 1}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          
            </div>
          </div>
        </div>

        <div className={activeTab === 'lessons' ? 'block' : 'hidden'}>
          <div className="pt-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Course Content (Modules)</h3>
            <button 
              type="button" 
              onClick={addModule}
              className="text-brand-deep-teal text-sm font-semibold flex items-center gap-1 hover:text-brand-navy"
            >
              <Plus size={16} /> Add Module
            </button>
          </div>
          <div className="space-y-4">
            {modules.length === 0 && (
               <p className="text-sm text-gray-500 italic">No modules added yet. Add modules to show in the course player.</p>
            )}
            {modules.map((mod, index) => (
              <div key={mod.id} className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-col gap-3 relative group">
                <div className="flex items-start gap-4">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Module Title</label>
                      <input
                        type="text"
                        value={mod.title}
                        onChange={(e) => updateModule(index, 'title', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-brand-deep-teal"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Duration</label>
                      <input
                        type="text"
                        value={mod.duration}
                        onChange={(e) => updateModule(index, 'duration', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-brand-deep-teal"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Content Type</label>
                      <select
                        value={mod.type}
                        onChange={(e) => updateModule(index, 'type', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-brand-deep-teal bg-white"
                      >
                        <option value="video">Video</option>
                        <option value="text">Text Article</option>
                        <option value="quiz">Quiz</option>
                        <option value="pdf">PDF Document</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeModule(index)}
                    className="p-2 text-red-400 hover:text-red-600 bg-white rounded-lg border border-gray-200 shadow-sm shrink-0"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* Dynamic Content Fields Based on Type */}
                <div className="w-full pt-2 border-t border-gray-200 mt-2">
                  {mod.type === 'video' && (
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Video URL (YouTube/Vimeo/MP4)</label>
                      <input
                        type="text"
                        value={mod.videoUrl || ''}
                        onChange={(e) => updateModule(index, 'videoUrl', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-brand-deep-teal"
                        placeholder="https://..."
                      />
                    </div>
                  )}
                  {mod.type === 'pdf' && (
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">PDF File URL</label>
                      <input
                        type="text"
                        value={mod.pdfUrl || ''}
                        onChange={(e) => updateModule(index, 'pdfUrl', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-brand-deep-teal"
                        placeholder="https://..."
                      />
                    </div>
                  )}
                  {mod.type === 'text' && (
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Text Content</label>
                      <textarea
                        value={mod.textContent || ''}
                        onChange={(e) => updateModule(index, 'textContent', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-brand-deep-teal resize-y h-24"
                        placeholder="Type or paste the article content here..."
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          
            </div>
          </div>
        </div>

        <div className={activeTab === 'exam' ? 'block' : 'hidden'}>
          
          <div className="pt-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Exam Questions Configuration</h3>
              <div className="flex items-center gap-2">
                <button 
                  type="button" 
                  onClick={() => setQuestions(defaultQuestions)}
                  className="text-brand-navy bg-brand-sage-200/50 hover:bg-brand-sage-200 px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1 transition-colors"
                >
                  Load Default Fundamentals Exam
                </button>
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-6 items-stretch relative">
              {/* Main Content Area */}
              <div className="flex-1 space-y-6 w-full pb-20">
                {/* Form Title & Description Header Block */}
                <div onClick={() => setActiveQuestionIndex(null)}
                  className={`bg-white rounded-xl shadow-sm border border-t-[8px] border-t-brand-blue relative p-6 cursor-pointer transition-all ${activeQuestionIndex === null ? 'border-brand-blue/50 ring-1 ring-brand-blue/20' : 'border-gray-200'}`}>
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={examTitle}
                      onChange={(e) => setExamTitle(e.target.value)}
                      className="w-full px-0 py-2 text-3xl font-normal text-gray-900 border-0 border-b border-transparent hover:border-gray-200 focus:border-brand-blue focus:ring-0 transition-colors bg-transparent placeholder-gray-400"
                      placeholder="Exam Title"
                    />
                    <textarea
                      value={examDescription}
                      onChange={(e) => setExamDescription(e.target.value)}
                      className="w-full px-0 py-2 text-sm text-gray-600 border-0 border-b border-transparent hover:border-gray-200 focus:border-brand-blue focus:ring-0 transition-colors bg-transparent resize-y h-32 placeholder-gray-400"
                      placeholder="Exam Description"
                    />
                  </div>
                </div>

                {questions.length === 0 && (
                   <p className="text-sm text-gray-500 italic bg-white p-6 rounded-xl border border-gray-200 shadow-sm">No questions added yet. Use the toolbar on the right to add content.</p>
                )}
                
                {questions.map((q, qIndex) => q.isSection ? (
                  <div key={qIndex} id={`question-${qIndex}`} onClick={() => setActiveQuestionIndex(qIndex)}
                    className={`bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-4 relative group transition-all cursor-pointer ${activeQuestionIndex === qIndex ? 'border-l-4 border-l-brand-blue ring-1 ring-brand-blue/20' : 'hover:border-l-4 hover:border-l-gray-300'}`}>
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-300 cursor-grab">
                       <GripVertical size={20} />
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex-1 space-y-3">
                        <input
                          type="text"
                          value={q.sectionTitle || ''}
                          onChange={(e) => updateQuestion(qIndex, 'sectionTitle', e.target.value)}
                          className="w-full px-0 py-2 text-xl font-normal border-0 border-b border-gray-200 focus:border-brand-blue focus:ring-0 bg-transparent"
                          placeholder={q.type === 'title' ? "Title" : "Untitled Section"}
                        />
                        {q.type === 'title' && (
                          <input
                            type="text"
                            value={q.description || ''}
                            onChange={(e) => updateQuestion(qIndex, 'description', e.target.value)}
                            className="w-full px-0 py-1 text-sm border-0 border-b border-gray-200 focus:border-brand-blue focus:ring-0 bg-transparent text-gray-500"
                            placeholder="Description (optional)"
                          />
                        )}
                        {q.type === 'image' && (
                          <input
                            type="text"
                            value={q.imageUrl || ''}
                            onChange={(e) => updateQuestion(qIndex, 'imageUrl', e.target.value)}
                            className="w-full px-0 py-1 text-sm border-0 border-b border-gray-200 focus:border-brand-blue focus:ring-0 bg-transparent"
                            placeholder="Image URL"
                          />
                        )}
                        {q.type === 'video' && (
                          <input
                            type="text"
                            value={q.videoUrl || ''}
                            onChange={(e) => updateQuestion(qIndex, 'videoUrl', e.target.value)}
                            className="w-full px-0 py-1 text-sm border-0 border-b border-gray-200 focus:border-brand-blue focus:ring-0 bg-transparent"
                            placeholder="Video URL (YouTube/Vimeo)"
                          />
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-1 border-r border-gray-200 pr-3 mr-1">
                          <button type="button" onClick={() => moveQuestionUp(qIndex)} className="p-1.5 text-gray-400 hover:text-gray-700 rounded-md hover:bg-gray-100 disabled:opacity-30" disabled={qIndex === 0} title="Move Up"><ChevronUp size={18} /></button>
                          <button type="button" onClick={() => moveQuestionDown(qIndex)} className="p-1.5 text-gray-400 hover:text-gray-700 rounded-md hover:bg-gray-100 disabled:opacity-30" disabled={qIndex === questions.length - 1} title="Move Down"><ChevronDown size={18} /></button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeQuestion(qIndex)}
                          className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100 transition-colors"
                          title="Delete Section"
                        >
                          <Trash2 size={20} />
                        </button>
                    </div>
                  </div>
                ) : (
                  <div key={qIndex} id={`question-${qIndex}`} onClick={() => setActiveQuestionIndex(qIndex)}
                    className={`bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-6 relative group transition-all cursor-pointer ${activeQuestionIndex === qIndex ? 'border-l-4 border-l-brand-blue ring-1 ring-brand-blue/20' : 'hover:border-l-4 hover:border-l-gray-300'}`}>
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-300 cursor-grab">
                       <GripVertical size={20} />
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-4 mt-2">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={q.question}
                          onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                          className="w-full px-4 py-3 text-base bg-gray-50 border-b border-gray-300 focus:border-brand-blue focus:ring-0 focus:bg-gray-100 transition-colors rounded-t-md"
                          placeholder="Question"
                        />
                      </div>
                      <div className="w-full md:w-64">
                         <select 
                            value={q.type || 'multiple_choice'}
                            onChange={(e) => updateQuestion(qIndex, 'type', e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-sm text-gray-700 focus:ring-2 focus:ring-brand-blue focus:border-transparent cursor-pointer">
                            <option value="multiple_choice">Multiple choice</option>
                            <option value="short_answer">Short answer</option>
                            <option value="paragraph">Paragraph</option>
                         </select>
                      </div>
                    </div>

                    <div className="space-y-3 pl-2">
                      {(!q.type || q.type === "multiple_choice") && q.options.map((opt, oIndex) => (
                        <div key={oIndex} className="flex items-center gap-3 group/opt">
                          <input
                            type="radio"
                            name={`correct-preview-${qIndex}`}
                            checked={q.correctOption === oIndex}
                            onChange={() => updateQuestion(qIndex, 'correctOption', oIndex)}
                            className="w-5 h-5 text-brand-blue focus:ring-brand-blue border-gray-300 cursor-pointer"
                            title="Mark as correct answer"
                          />
                          <input
                            type="text"
                            value={opt}
                            onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                            className="flex-1 px-0 py-1.5 text-sm border-0 border-b border-transparent hover:border-gray-200 focus:border-brand-blue focus:ring-0 bg-transparent"
                            placeholder={`Option ${oIndex + 1}`}
                          />
                          <button
                            type="button"
                            onClick={() => removeOption(qIndex, oIndex)}
                            disabled={q.options.length <= 2}
                            className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100 opacity-0 group-hover/opt:opacity-100 transition-all disabled:opacity-0"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                      {(!q.type || q.type === "multiple_choice") && (
                        <div className="flex items-center gap-3 pl-1 pt-2">
                           <input type="radio" disabled className="w-5 h-5 border-gray-300" />
                           <button
                            type="button"
                            onClick={() => addOption(qIndex)}
                            className="text-sm text-gray-500 hover:text-gray-800 font-medium"
                          >
                            Add option
                          </button>
                        </div>
                      )}
                      {q.type === "short_answer" && (
                        <div className="mt-4">
                          <input type="text" disabled placeholder="Short answer text" className="w-full max-w-md border-0 border-b border-gray-300 border-dotted bg-transparent px-0 py-2 text-sm text-gray-500" />
                        </div>
                      )}
                      {q.type === "paragraph" && (
                        <div className="mt-4">
                          <input type="text" disabled placeholder="Long answer text" className="w-full border-0 border-b border-gray-300 border-dotted bg-transparent px-0 py-2 text-sm text-gray-500" />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-end gap-4 mt-2 pt-4 border-t border-gray-100 text-sm">
                      <div className="flex items-center gap-2 border-r border-gray-200 pr-4 mr-1">
                        <label className="text-gray-600 font-medium whitespace-nowrap">Points</label>
                        <input
                          type="number"
                          min="0"
                          value={q.points ?? 5}
                          onChange={(e) => updateQuestion(qIndex, 'points', parseInt(e.target.value) || 0)}
                          className="w-16 px-2 py-1 text-center border border-gray-300 rounded focus:border-brand-blue focus:ring-0"
                        />
                      </div>
                      <div className="flex items-center gap-2 border-r border-gray-200 pr-4 mr-1">
                        <label className="text-gray-600 font-medium whitespace-nowrap cursor-pointer flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={q.isRequired !== false}
                            onChange={(e) => updateQuestion(qIndex, 'isRequired', e.target.checked)}
                            className="w-4 h-4 text-brand-blue rounded focus:ring-brand-blue border-gray-300 cursor-pointer"
                          />
                          Required
                        </label>
                      </div>
                      <div className="flex items-center gap-1 border-r border-gray-200 pr-3 mr-1">
                          <button type="button" onClick={() => moveQuestionUp(qIndex)} className="p-1.5 text-gray-400 hover:text-gray-700 rounded-md hover:bg-gray-100 disabled:opacity-30" disabled={qIndex === 0} title="Move Up"><ChevronUp size={18} /></button>
                          <button type="button" onClick={() => moveQuestionDown(qIndex)} className="p-1.5 text-gray-400 hover:text-gray-700 rounded-md hover:bg-gray-100 disabled:opacity-30" disabled={qIndex === questions.length - 1} title="Move Down"><ChevronDown size={18} /></button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeQuestion(qIndex)}
                        className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100 transition-colors"
                        title="Delete Question"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sticky Right Toolbar */}
              <div className="hidden lg:block w-14 relative shrink-0">
                <div className="flex flex-col gap-3 bg-white p-2 rounded-xl shadow-md border border-gray-200 sticky top-32 z-10 items-center transition-all">
                <button
                  type="button"
                  onClick={addQuestion}
                  className="p-2.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-full transition-colors"
                  title="Add Question"
                >
                  <PlusCircle size={22} />
                </button>

                <button
                  type="button"
                  onClick={() => insertItemAfter('title')}
                  className="p-2.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-full transition-colors"
                  title="Add Title and Description"
                >
                  <Type size={22} />
                </button>
                <button
                  type="button"
                  onClick={() => insertItemAfter('image')}
                  className="p-2.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-full transition-colors"
                  title="Add Image"
                >
                  <ImageIcon size={22} />
                </button>
                <button
                  type="button"
                  onClick={() => insertItemAfter('video')}
                  className="p-2.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-full transition-colors"
                  title="Add Video"
                >
                  <PlaySquare size={22} />
                </button>
                <button
                  type="button"
                  onClick={() => insertItemAfter('section')}
                  className="p-2.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-full transition-colors"
                  title="Add Section"
                >
                  <Layout size={22} />
                </button>
              </div>
              </div>
            </div>
          </div>
        </div>

        <div className={activeTab === 'qa' ? 'block' : 'hidden'}>
          <div className="pt-2">
            <div className="flex items-center justify-between mb-4">
              
              <h3 className="text-lg font-bold text-gray-900">Q&A / FAQs</h3>
              <button
                type="button"
                onClick={addQA}
                className="text-brand-deep-teal text-sm font-semibold flex items-center gap-1 hover:text-brand-navy"
              >
                <Plus size={16} /> Add Q&A
              </button>
            </div>
            <div className="space-y-4">
              {qa.length === 0 && (
                 <p className="text-sm text-gray-500 italic">No Q&A added yet. Add common questions and answers.</p>
              )}
              {qa.map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-col gap-3">
                  <div className="flex items-start gap-4">
                    <div className="flex-1 space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Question</label>
                        <input
                          type="text"
                          value={item.question}
                          onChange={(e) => updateQA(index, 'question', e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-brand-deep-teal"
                          placeholder="e.g. Is this course for beginners?"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Answer</label>
                        <textarea
                          value={item.answer}
                          onChange={(e) => updateQA(index, 'answer', e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-brand-deep-teal resize-y h-24"
                          placeholder="Type the answer here..."
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeQA(index)}
                      className="p-2 text-red-400 hover:text-red-600 bg-white rounded-lg border border-gray-200 shadow-sm shrink-0"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-gray-100 mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 bg-brand-deep-teal hover:bg-brand-deep-teal/90 rounded-xl text-white font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : null}
            Save Course
          </button>
        </div>
      </form>

    </div>
  );
}
