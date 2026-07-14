const fs = require('fs');
let code = fs.readFileSync('src/components/admin/CourseEditor.tsx', 'utf8');

// Add examTitle and examDescription to CourseData
code = code.replace(
  'qa?: { question: string; answer: string }[];',
  'qa?: { question: string; answer: string }[];\n  examTitle?: string;\n  examDescription?: string;'
);

// Add to state
code = code.replace(
  'const [qa, setQa] = useState<{ question: string; answer: string }[]>(initialData?.qa || []);',
  'const [qa, setQa] = useState<{ question: string; answer: string }[]>(initialData?.qa || []);\n  const [examTitle, setExamTitle] = useState(initialData?.examTitle || initialData?.title || \'ICA Fundamentals of TDI Course Exam\');\n  const [examDescription, setExamDescription] = useState(initialData?.examDescription || \'This Exam addresses all four modules...\');'
);

// Add to handleSave
code = code.replace(
  'tags,\n        outcomes: outcomes.filter(o => o.trim() !== \'\'),',
  'tags,\n        examTitle,\n        examDescription,\n        outcomes: outcomes.filter(o => o.trim() !== \'\'),'
);

fs.writeFileSync('src/components/admin/CourseEditor.tsx', code);
