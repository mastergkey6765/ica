const fs = require('fs');
let code = fs.readFileSync('src/components/admin/CourseEditor.tsx', 'utf8');

code = code.replace(
  /onClick=\{\(\) => insertSectionAfter\(questions\.length - 1\)\}/g,
  "onClick={() => insertSectionAfter(null)}"
);

fs.writeFileSync('src/components/admin/CourseEditor.tsx', code);
