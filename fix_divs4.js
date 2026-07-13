const fs = require('fs');
let text = fs.readFileSync('src/components/admin/CourseEditor.tsx', 'utf-8');
text = text.replace('</div></div>', '</div>');
fs.writeFileSync('src/components/admin/CourseEditor.tsx', text);
