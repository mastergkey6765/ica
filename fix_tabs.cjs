const fs = require('fs');
const path = 'src/components/admin/CourseEditor.tsx';
let content = fs.readFileSync(path, 'utf8');

const buttonsTarget = `<div className="flex justify-end pt-6 border-t border-gray-100">`;
const buttonsReplacement = `</div>
        </div>
        
        <div className="flex justify-end pt-6 border-t border-gray-100 mt-6">`;

content = content.replace(buttonsTarget, buttonsReplacement);
fs.writeFileSync(path, content);
