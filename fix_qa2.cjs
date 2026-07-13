const fs = require('fs');
let code = fs.readFileSync('src/components/admin/CourseEditor.tsx', 'utf8');

code = code.replace(/questions,\n\s*qa,/g, 'questions,');

fs.writeFileSync('src/components/admin/CourseEditor.tsx', code);
