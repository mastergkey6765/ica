const fs = require('fs');
let code = fs.readFileSync('src/components/admin/CourseEditor.tsx', 'utf8');

code = code.replace(
  "    setQuestions(newQuestions);\\n    setActiveQuestionIndex(targetIndex + 1);\\n  };\\n\\n  const removeQuestion",
  "    setQuestions(newQuestions);\\n  };\\n\\n  const removeQuestion"
);

fs.writeFileSync('src/components/admin/CourseEditor.tsx', code);
