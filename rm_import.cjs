const fs = require('fs');
let code = fs.readFileSync('src/components/admin/CourseEditor.tsx', 'utf8');

code = code.replace(
  `                <button
                  type="button"
                  className="p-2.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-full transition-colors"
                  title="Import Questions"
                >
                  <FileDown size={22} />
                </button>`,
  ""
);

fs.writeFileSync('src/components/admin/CourseEditor.tsx', code);
