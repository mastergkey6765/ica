const fs = require('fs');
const path = 'src/components/admin/CourseEditor.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  `export interface QuestionData {
  question: string;
  options: string[];
  correctOption: number;
  section?: string;
}`,
  `export interface QuestionData {
  question: string;
  options: string[];
  correctOption: number;
  isSection?: boolean;
  sectionTitle?: string;
}`
);

fs.writeFileSync(path, content);
