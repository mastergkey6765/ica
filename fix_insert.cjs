const fs = require('fs');
let code = fs.readFileSync('src/components/admin/CourseEditor.tsx', 'utf8');

const newInsertFunction = `  const insertItemAfter = (type: 'multiple_choice' | 'title' | 'image' | 'video' | 'section') => {
    const targetIndex = activeQuestionIndex !== null ? activeQuestionIndex : questions.length - 1;
    const newQuestions = [...questions];
    newQuestions.splice(targetIndex + 1, 0, {
      question: type === 'multiple_choice' ? 'New Question' : '',
      options: type === 'multiple_choice' ? ['Option 1'] : [],
      correctOption: 0,
      isSection: type === 'section' || type === 'title',
      sectionTitle: type === 'section' ? 'New Section' : (type === 'title' ? 'New Title' : ''),
      type: type,
      imageUrl: '',
      videoUrl: '',
      description: ''
    });
    setQuestions(newQuestions);
    setActiveQuestionIndex(targetIndex + 1);
  };`;

code = code.replace(
  "  const insertSectionAfter = (index: number | null) => {\n    const targetIndex = index !== null ? index : (activeQuestionIndex !== null ? activeQuestionIndex : questions.length - 1);\n    const newQuestions = [...questions];\n    newQuestions.splice(targetIndex + 1, 0, {\n      question: '',\n      options: [],\n      correctOption: 0,\n      isSection: true,\n      sectionTitle: 'New Section'\n    });\n    setQuestions(newQuestions);\n    setActiveQuestionIndex(targetIndex + 1);\n  };",
  newInsertFunction
);

fs.writeFileSync('src/components/admin/CourseEditor.tsx', code);
