const fs = require('fs');
let code = fs.readFileSync('src/components/admin/CourseEditor.tsx', 'utf8');

code = code.replace(
  /\{\/\* Sticky Right Toolbar \*\/\}\s*<div className="hidden lg:flex flex-col gap-3 bg-white p-2 rounded-xl shadow-md border border-gray-200 sticky top-\[10rem\] z-10 w-14 items-center transition-all">/,
  "{/* Sticky Right Toolbar */}\n              <div className=\"hidden lg:block w-14 relative shrink-0\">\n                <div className=\"flex flex-col gap-3 bg-white p-2 rounded-xl shadow-md border border-gray-200 sticky top-32 z-10 items-center transition-all\">"
);

code = code.replace(
  /<Layout size=\{22\} \/>\s*<\/button>\s*<\/div>\s*<\/div>\s*<\/div>/,
  "<Layout size={22} />\n                </button>\n              </div>\n              </div>\n            </div>\n          </div>"
);

fs.writeFileSync('src/components/admin/CourseEditor.tsx', code);
