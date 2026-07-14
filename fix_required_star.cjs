const fs = require('fs');
let code = fs.readFileSync('src/pages/CoursePlayer.tsx', 'utf8');

code = code.replace(
  '{q.question}',
  '{q.question}\n                              {q.isRequired !== false && <span className="text-red-500 ml-1">*</span>}'
);

fs.writeFileSync('src/pages/CoursePlayer.tsx', code);
