const fs = require('fs');
let code = fs.readFileSync('src/components/admin/CourseEditor.tsx', 'utf8');

// Add activeQuestionIndex state
code = code.replace(
  "const [examDescription, setExamDescription] = useState(initialData?.examDescription || 'This Exam addresses all four modules...');",
  "const [examDescription, setExamDescription] = useState(initialData?.examDescription || 'This Exam addresses all four modules...');\n  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number | null>(null);"
);

// Update addQuestion
code = code.replace(
  "const addQuestion = () => {\n    setQuestions([...questions, { question: 'New Question', options: ['Option 1', 'Option 2'], correctOption: 0 }]);\n  };",
  `const addQuestion = () => {
    const newQ = { question: 'New Question', options: ['Option 1', 'Option 2'], correctOption: 0 };
    if (activeQuestionIndex !== null) {
      const newQuestions = [...questions];
      newQuestions.splice(activeQuestionIndex + 1, 0, newQ);
      setQuestions(newQuestions);
      setActiveQuestionIndex(activeQuestionIndex + 1);
    } else {
      setQuestions([...questions, newQ]);
      setActiveQuestionIndex(questions.length);
    }
  };`
);

// Update insertSectionAfter to not require an index parameter explicitly if we want it from toolbar
code = code.replace(
  "const insertSectionAfter = (index: number) => {",
  "const insertSectionAfter = (index: number | null) => {\n    const targetIndex = index !== null ? index : (activeQuestionIndex !== null ? activeQuestionIndex : questions.length - 1);"
);
code = code.replace(
  "newQuestions.splice(index + 1, 0, {",
  "newQuestions.splice(targetIndex + 1, 0, {"
);
code = code.replace(
  "setQuestions(newQuestions);\n  };",
  "setQuestions(newQuestions);\n    setActiveQuestionIndex(targetIndex + 1);\n  };"
);

// Make the exam flex container stretch, so sticky works
code = code.replace(
  "className=\"flex flex-col lg:flex-row gap-6 items-start relative\"",
  "className=\"flex flex-col lg:flex-row gap-6 items-stretch relative\""
);

// Make the toolbar stick nicely
code = code.replace(
  "className=\"hidden lg:flex flex-col gap-3 bg-white p-2 rounded-xl shadow-md border border-gray-200 sticky top-32 z-10 w-14 items-center\"",
  "className=\"hidden lg:flex flex-col gap-3 bg-white p-2 rounded-xl shadow-md border border-gray-200 sticky top-[10rem] z-10 w-14 items-center transition-all\""
);

// We need to add an active state to the question cards
code = code.replace(
  "className=\"bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-4 relative group focus-within:border-l-4 focus-within:border-l-brand-blue transition-all\"",
  "onClick={() => setActiveQuestionIndex(qIndex)}\n                    className={`bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-4 relative group transition-all cursor-pointer ${activeQuestionIndex === qIndex ? 'border-l-4 border-l-brand-blue ring-1 ring-brand-blue/20' : 'hover:border-l-4 hover:border-l-gray-300'}`}"
);

code = code.replace(
  "className=\"bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-6 relative group focus-within:border-l-4 focus-within:border-l-brand-blue transition-all\"",
  "onClick={() => setActiveQuestionIndex(qIndex)}\n                    className={`bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-6 relative group transition-all cursor-pointer ${activeQuestionIndex === qIndex ? 'border-l-4 border-l-brand-blue ring-1 ring-brand-blue/20' : 'hover:border-l-4 hover:border-l-gray-300'}`}"
);

// Allow clicking header to make active index null
code = code.replace(
  "className=\"bg-white rounded-xl shadow-sm border border-gray-200 border-t-[8px] border-t-brand-blue relative p-6\"",
  "onClick={() => setActiveQuestionIndex(null)}\n                  className={`bg-white rounded-xl shadow-sm border border-t-[8px] border-t-brand-blue relative p-6 cursor-pointer transition-all ${activeQuestionIndex === null ? 'border-brand-blue/50 ring-1 ring-brand-blue/20' : 'border-gray-200'}`}"
);


fs.writeFileSync('src/components/admin/CourseEditor.tsx', code);
