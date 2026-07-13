const fs = require('fs');
let code = fs.readFileSync('src/components/admin/CourseEditor.tsx', 'utf8');

// Replace module start
code = code.replace(
  '<div className="border-t border-gray-100 pt-6">\n          <div className="flex items-center justify-between mb-4">\n            <h3 className="text-lg font-bold text-gray-900">Course Content (Modules)</h3>',
  '</div>\n\n        <div className={activeTab === \'lessons\' ? \'block\' : \'hidden\'}>\n          <div className="flex items-center justify-between mb-4">\n            <h3 className="text-lg font-bold text-gray-900">Course Content (Modules)</h3>'
);

// Replace exam start
code = code.replace(
  '<div className="border-t border-gray-100 pt-6">\n          <div className="flex items-center justify-between mb-4">\n            \n            <h3 className="text-lg font-bold text-gray-900">Exam Questions</h3>',
  '</div>\n\n        <div className={activeTab === \'exam\' ? \'block\' : \'hidden\'}>\n          <div className="flex items-center justify-between mb-4">\n            <h3 className="text-lg font-bold text-gray-900">Exam Questions</h3>'
);

fs.writeFileSync('src/components/admin/CourseEditor.tsx', code);
