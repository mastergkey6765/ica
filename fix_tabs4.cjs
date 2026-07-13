const fs = require('fs');
const path = 'src/components/admin/CourseEditor.tsx';
let content = fs.readFileSync(path, 'utf8');

// The issue is missing a closing div before the <div className="flex justify-end
content = content.replace(
  /        <\/div>\n<div className="flex justify-end pt-6 border-t border-gray-100 mt-6">/g,
  `        </div>\n        </div>\n<div className="flex justify-end pt-6 border-t border-gray-100 mt-6">`
);

fs.writeFileSync(path, content);
