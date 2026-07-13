const fs = require('fs');
let code = fs.readFileSync('src/components/admin/CourseEditor.tsx', 'utf8');

code = code.replace(/<\/div><\/div>\s*<\/div>\s*<\/div>\s*<div className=\{activeTab === 'qa' \? 'block' : 'hidden'\}>/, '</div>\n            </div>\n          </div>\n        </div>\n\n        <div className={activeTab === \'qa\' ? \'block\' : \'hidden\'}>');

fs.writeFileSync('src/components/admin/CourseEditor.tsx', code);
