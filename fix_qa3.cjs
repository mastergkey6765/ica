const fs = require('fs');
let code = fs.readFileSync('src/components/admin/CourseEditor.tsx', 'utf8');

code = code.replace(
  'modules,\n        questions,\n        updatedAt: serverTimestamp()',
  'modules,\n        questions,\n        qa,\n        updatedAt: serverTimestamp()'
);

fs.writeFileSync('src/components/admin/CourseEditor.tsx', code);
