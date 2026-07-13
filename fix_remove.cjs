const fs = require('fs');
let code = fs.readFileSync('src/components/admin/CourseEditor.tsx', 'utf8');

code = code.replace(
  "  const removeQuestion = (index: number) => {\\n    setQuestions(questions.filter((_, i) => i !== index));\\n  };",
  "  const removeQuestion = (index: number) => {\\n    setQuestions(questions.filter((_, i) => i !== index));\\n    if (activeQuestionIndex === index) setActiveQuestionIndex(null);\\n    else if (activeQuestionIndex !== null && activeQuestionIndex > index) setActiveQuestionIndex(activeQuestionIndex - 1);\\n  };"
);

fs.writeFileSync('src/components/admin/CourseEditor.tsx', code);
