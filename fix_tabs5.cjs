const fs = require('fs');
const path = 'src/components/admin/CourseEditor.tsx';
let lines = fs.readFileSync(path, 'utf8').split('\n');

for(let i = lines.length - 1; i >= 0; i--) {
  if (lines[i].includes('<div className="flex justify-end pt-6 border-t border-gray-100 mt-6">')) {
     lines.splice(i, 0, "        </div>");
     break;
  }
}
fs.writeFileSync(path, lines.join('\n'));
