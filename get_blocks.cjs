const fs = require('fs');
let code = fs.readFileSync('src/components/admin/CourseEditor.tsx', 'utf8');

// I will output the variables to a file to manually inspect them.
fs.writeFileSync('title_block.txt', code.substring(code.indexOf('<div className="grid grid-cols-1 md:grid-cols-2 gap-6">'), code.indexOf('<div className="border-t border-gray-100 pt-6">', code.indexOf('tags.join'))));

const out = code.match(/<h3 className="text-lg font-bold text-gray-900">Learning Outcomes<\/h3>[\s\S]*?(?=<\/div>\s*<\/div>\s*<\/div>\s*<div className={activeTab === 'lessons')/);
if (out) fs.writeFileSync('outcomes_block.txt', out[0]);

const mod = code.match(/<h3 className="text-lg font-bold text-gray-900">Course Content \(Modules\)<\/h3>[\s\S]*?(?=<\/div>\s*<\/div>\s*<\/div>\s*<div className={activeTab === 'exam')/);
if (mod) fs.writeFileSync('modules_block.txt', mod[0]);

const exam = code.match(/<h3 className="text-lg font-bold text-gray-900">Exam Questions<\/h3>[\s\S]*?(?=<\/div>\s*<\/div>\s*<\/div>\s*<div className={activeTab === 'qa')/);
if (exam) fs.writeFileSync('exam_block.txt', exam[0]);

