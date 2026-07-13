const fs = require('fs');
const path = 'src/components/admin/CourseEditor.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  /const \[questions, setQuestions\] = useState<QuestionData\[\]>\([\s\S]*?\);/,
  `const [questions, setQuestions] = useState<QuestionData[]>(
    initialData?.questions && initialData.questions.length > 0 
      ? initialData.questions 
      : defaultQuestions
  );`
);

fs.writeFileSync(path, content);
