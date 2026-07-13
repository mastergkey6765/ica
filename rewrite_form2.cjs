const fs = require('fs');
let code = fs.readFileSync('src/components/admin/CourseEditor.tsx', 'utf8');

const titleCategoryToTags = code.substring(
  code.indexOf('<div className="grid grid-cols-1 md:grid-cols-2 gap-6">'),
  code.indexOf('<div className="border-t border-gray-100 pt-6">', code.indexOf('tags.join'))
);

const outcomesMatch = code.match(/<h3 className="text-lg font-bold text-gray-900">Learning Outcomes<\/h3>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/);
const outcomesBlock = outcomesMatch[0];

const modulesMatch = code.match(/<h3 className="text-lg font-bold text-gray-900">Course Content \(Modules\)<\/h3>[\s\S]*?(?=<div className={activeTab === 'exam' \? 'block' : 'hidden'}>|<div className="border-t border-gray-100 pt-6">\s*<div className="flex items-center justify-between mb-4">\s*<h3 className="text-lg font-bold text-gray-900">Exam Questions<\/h3>)/);
let modulesBlock = modulesMatch[0];
// Clean up extra divs at the end of modulesBlock if needed
modulesBlock = modulesBlock.trim();
if (modulesBlock.endsWith('</div>\n        </div>')) {
   // It's probably fine as long as we put it inside the tab.
}

const examMatch = code.match(/<h3 className="text-lg font-bold text-gray-900">Exam Questions<\/h3>[\s\S]*?(?=<\/form>|<div className="flex justify-end pt-6 border-t border-gray-100 mt-6">)/);
let examBlock = examMatch[0];
examBlock = examBlock.trim();
// clean up trailing divs from examBlock
while (examBlock.endsWith('</div>')) {
  examBlock = examBlock.substring(0, examBlock.lastIndexOf('</div>')).trim();
}

const formStart = code.indexOf('<form onSubmit={handleSave} className="space-y-8">') + '<form onSubmit={handleSave} className="space-y-8">'.length;
const formEnd = code.indexOf('<div className="flex justify-end pt-6 border-t border-gray-100 mt-6">');

const newFormContent = `
        <div className={activeTab === 'details' ? 'block' : 'hidden'}>
          ${titleCategoryToTags}
          <div className="border-t border-gray-100 pt-6">
            <div className="flex items-center justify-between mb-4">
              ${outcomesBlock}
        </div>

        <div className={activeTab === 'lessons' ? 'block' : 'hidden'}>
          <div className="border-t border-gray-100 pt-6">
            <div className="flex items-center justify-between mb-4">
              ${modulesBlock}
            </div>
          </div>
        </div>

        <div className={activeTab === 'exam' ? 'block' : 'hidden'}>
          <div className="border-t border-gray-100 pt-6">
            <div className="flex items-center justify-between mb-4">
              ${examBlock}
            </div>
          </div>
        </div>
        
        <div className={activeTab === 'qa' ? 'block' : 'hidden'}>
          <div className="border-t border-gray-100 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Q&A / FAQs</h3>
              <button
                type="button"
                onClick={addQA}
                className="text-brand-deep-teal text-sm font-semibold flex items-center gap-1 hover:text-brand-navy"
              >
                <Plus size={16} /> Add Q&A
              </button>
            </div>
            <div className="space-y-4">
              {qa.length === 0 && (
                 <p className="text-sm text-gray-500 italic">No Q&A added yet. Add common questions and answers.</p>
              )}
              {qa.map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-col gap-3">
                  <div className="flex items-start gap-4">
                    <div className="flex-1 space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Question</label>
                        <input
                          type="text"
                          value={item.question}
                          onChange={(e) => updateQA(index, 'question', e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-brand-deep-teal"
                          placeholder="e.g. Is this course for beginners?"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Answer</label>
                        <textarea
                          value={item.answer}
                          onChange={(e) => updateQA(index, 'answer', e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-brand-deep-teal resize-y h-24"
                          placeholder="Type the answer here..."
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeQA(index)}
                      className="p-2 text-red-400 hover:text-red-600 bg-white rounded-lg border border-gray-200 shadow-sm shrink-0"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
`;

const finalCode = code.substring(0, formStart) + newFormContent + code.substring(formEnd);

fs.writeFileSync('src/components/admin/CourseEditor.tsx', finalCode);
