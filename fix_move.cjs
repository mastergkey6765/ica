const fs = require('fs');
let code = fs.readFileSync('src/components/admin/CourseEditor.tsx', 'utf8');

code = code.replace(
  "  const moveQuestionUp = (index: number) => {\\n    if (index === 0) return;\\n    const newQuestions = [...questions];\\n    const temp = newQuestions[index - 1];\\n    newQuestions[index - 1] = newQuestions[index];\\n    newQuestions[index] = temp;\\n    setQuestions(newQuestions);\\n  };",
  "  const moveQuestionUp = (index: number) => {\\n    if (index === 0) return;\\n    const newQuestions = [...questions];\\n    const temp = newQuestions[index - 1];\\n    newQuestions[index - 1] = newQuestions[index];\\n    newQuestions[index] = temp;\\n    setQuestions(newQuestions);\\n    if (activeQuestionIndex === index) setActiveQuestionIndex(index - 1);\\n    else if (activeQuestionIndex === index - 1) setActiveQuestionIndex(index);\\n  };"
);

code = code.replace(
  "  const moveQuestionDown = (index: number) => {\\n    if (index === questions.length - 1) return;\\n    const newQuestions = [...questions];\\n    const temp = newQuestions[index + 1];\\n    newQuestions[index + 1] = newQuestions[index];\\n    newQuestions[index] = temp;\\n    setQuestions(newQuestions);\\n  };",
  "  const moveQuestionDown = (index: number) => {\\n    if (index === questions.length - 1) return;\\n    const newQuestions = [...questions];\\n    const temp = newQuestions[index + 1];\\n    newQuestions[index + 1] = newQuestions[index];\\n    newQuestions[index] = temp;\\n    setQuestions(newQuestions);\\n    if (activeQuestionIndex === index) setActiveQuestionIndex(index + 1);\\n    else if (activeQuestionIndex === index + 1) setActiveQuestionIndex(index);\\n  };"
);

fs.writeFileSync('src/components/admin/CourseEditor.tsx', code);
