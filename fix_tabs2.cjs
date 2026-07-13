const fs = require('fs');
const path = 'src/components/admin/CourseEditor.tsx';
let content = fs.readFileSync(path, 'utf8');

// Undo the extra closing divs added by fix_tabs.cjs
const buttonsReplacement = `</div>
        </div>
        
        <div className="flex justify-end pt-6 border-t border-gray-100 mt-6">`;
const buttonsTarget = `<div className="flex justify-end pt-6 border-t border-gray-100 mt-6">`;

content = content.replace(buttonsReplacement, buttonsTarget);
fs.writeFileSync(path, content);
