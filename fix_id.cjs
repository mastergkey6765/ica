const fs = require('fs');
let code = fs.readFileSync('src/components/admin/CourseEditor.tsx', 'utf8');

code = code.replace(
  /<div key=\{qIndex\} onClick=\{\(\) => setActiveQuestionIndex\(qIndex\)\}/g,
  '<div key={qIndex} id={`question-${qIndex}`} onClick={() => setActiveQuestionIndex(qIndex)}'
);

fs.writeFileSync('src/components/admin/CourseEditor.tsx', code);
