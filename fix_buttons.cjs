const fs = require('fs');
let code = fs.readFileSync('src/components/admin/CourseEditor.tsx', 'utf8');

code = code.replace(
  /onClick=\{\(\) => insertSectionAfter\(null\)\}\s*className="p-2\.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-full transition-colors"\s*title="Add Title and Description"/g,
  "onClick={() => insertItemAfter('title')}\n                  className=\"p-2.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-full transition-colors\"\n                  title=\"Add Title and Description\""
);

code = code.replace(
  /className="p-2\.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-full transition-colors"\s*title="Add Image"/g,
  "onClick={() => insertItemAfter('image')}\n                  className=\"p-2.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-full transition-colors\"\n                  title=\"Add Image\""
);

code = code.replace(
  /className="p-2\.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-full transition-colors"\s*title="Add Video"/g,
  "onClick={() => insertItemAfter('video')}\n                  className=\"p-2.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-full transition-colors\"\n                  title=\"Add Video\""
);

code = code.replace(
  /onClick=\{\(\) => insertSectionAfter\(null\)\}\s*className="p-2\.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-full transition-colors"\s*title="Add Section"/g,
  "onClick={() => insertItemAfter('section')}\n                  className=\"p-2.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-full transition-colors\"\n                  title=\"Add Section\""
);

fs.writeFileSync('src/components/admin/CourseEditor.tsx', code);
