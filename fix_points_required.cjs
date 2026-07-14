const fs = require('fs');
let code = fs.readFileSync('src/components/admin/CourseEditor.tsx', 'utf8');

if (!code.includes('points?: number;')) {
  code = code.replace(
    "export interface QuestionData {\n  question: string;",
    "export interface QuestionData {\n  question: string;\n  points?: number;\n  isRequired?: boolean;"
  );
}

// Add default 5 points and required true to new questions
code = code.replace(
  "const newQ = { question: 'New Question', options: ['Option 1', 'Option 2'], correctOption: 0 };",
  "const newQ = { question: 'New Question', options: ['Option 1', 'Option 2'], correctOption: 0, points: 5, isRequired: true };"
);

// Add to insertItemAfter
code = code.replace(
  "correctOption: 0,\n      isSection",
  "correctOption: 0,\n      points: 5,\n      isRequired: true,\n      isSection"
);

fs.writeFileSync('src/components/admin/CourseEditor.tsx', code);
