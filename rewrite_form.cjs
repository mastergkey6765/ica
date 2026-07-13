const fs = require('fs');
let code = fs.readFileSync('src/components/admin/CourseEditor.tsx', 'utf8');

// The form starts at <form onSubmit={handleSave} className="space-y-8">
// Let's find all the parts and re-assemble them correctly.
// I will just use regex to match blocks.

const titleCategoryToTags = code.substring(
  code.indexOf('<div className="grid grid-cols-1 md:grid-cols-2 gap-6">'),
  code.indexOf('<div className="border-t border-gray-100 pt-6">', code.indexOf('tags.join'))
);

const outcomesMatch = code.match(/<h3 className="text-lg font-bold text-gray-900">Learning Outcomes<\/h3>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/);
const outcomesBlock = outcomesMatch ? outcomesMatch[0] : '';
console.log('Found outcomes?', !!outcomesMatch);

const modulesMatch = code.match(/<h3 className="text-lg font-bold text-gray-900">Course Content \(Modules\)<\/h3>[\s\S]*?(?=<div className={activeTab === 'exam' \? 'block' : 'hidden'}>|<div className="border-t border-gray-100 pt-6">\s*<div className="flex items-center justify-between mb-4">\s*<h3 className="text-lg font-bold text-gray-900">Exam Questions<\/h3>)/);
const modulesBlock = modulesMatch ? modulesMatch[0] : '';
console.log('Found modules?', !!modulesMatch);

const examMatch = code.match(/<h3 className="text-lg font-bold text-gray-900">Exam Questions<\/h3>[\s\S]*?(?=<\/form>|<div className="flex justify-end pt-6 border-t border-gray-100 mt-6">)/);
const examBlock = examMatch ? examMatch[0] : '';
console.log('Found exam?', !!examMatch);

