const fs = require('fs');
let code = fs.readFileSync('src/components/admin/CourseEditor.tsx', 'utf8');

code = code.replace(
  'const [questions,\n        qa, setQuestions] = useState<QuestionData[]>(',
  'const [questions, setQuestions] = useState<QuestionData[]>('
);

fs.writeFileSync('src/components/admin/CourseEditor.tsx', code);
