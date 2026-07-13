const fs = require('fs');

const path = 'src/pages/CoursePlayer.tsx';
let content = fs.readFileSync(path, 'utf8');

const startIdx = content.indexOf('const defaultQuestions = [');
const endIdx = content.indexOf('  // Timer Effect');

if (startIdx !== -1 && endIdx !== -1) {
  const code = content.substring(startIdx, endIdx);
  content = content.substring(0, startIdx) + content.substring(endIdx);
  content = content.replace('export default function CoursePlayer() {', `export ${code}\nexport default function CoursePlayer() {`);
  fs.writeFileSync(path, content);
  console.log("Extracted");
} else {
  console.log("Not found", startIdx, endIdx);
}
