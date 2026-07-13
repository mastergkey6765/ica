const fs = require('fs');
const path = 'src/components/admin/CourseEditor.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  `export interface QuestionData {
  question: string;
  options: string[];
  correctOption: number;
}`,
  `export interface QuestionData {
  question: string;
  options: string[];
  correctOption: number;
  section?: string;
}`
);

fs.writeFileSync(path, content);
