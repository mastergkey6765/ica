const fs = require('fs');
let code = fs.readFileSync('src/components/admin/CourseEditor.tsx', 'utf8');

code = code.replace(
  "type?: 'multiple_choice' | 'short_answer' | 'paragraph' | 'image' | 'video' | 'title';",
  "type?: 'multiple_choice' | 'short_answer' | 'paragraph' | 'image' | 'video' | 'title' | 'section';"
);

fs.writeFileSync('src/components/admin/CourseEditor.tsx', code);
