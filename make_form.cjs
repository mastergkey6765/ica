const fs = require('fs');

const title = fs.readFileSync('title_block.txt', 'utf8');
let outcomes = fs.readFileSync('outcomes_block.txt', 'utf8');
let modules = fs.readFileSync('modules_block.txt', 'utf8');
let exam = fs.readFileSync('exam_block.txt', 'utf8');

// Strip trailing divs from outcomes, modules, exam
outcomes = outcomes.replace(/(<\/div>\s*)+$/, '');
modules = modules.replace(/(<\/div>\s*)+$/, '');
exam = exam.replace(/(<\/div>\s*)+$/, '');

const qaBlock = `
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
`;

const formContent = `
      <form onSubmit={handleSave} className="space-y-8">
        <div className={activeTab === 'details' ? 'block' : 'hidden'}>
          ${title}
          <div className="border-t border-gray-100 pt-6">
            <div className="flex items-center justify-between mb-4">
              ${outcomes}
            </div>
          </div>
        </div>

        <div className={activeTab === 'lessons' ? 'block' : 'hidden'}>
          <div className="pt-2">
            <div className="flex items-center justify-between mb-4">
              ${modules}
            </div>
          </div>
        </div>

        <div className={activeTab === 'exam' ? 'block' : 'hidden'}>
          <div className="pt-2">
            <div className="flex items-center justify-between mb-4">
              ${exam}
            </div>
          </div>
        </div>

        <div className={activeTab === 'qa' ? 'block' : 'hidden'}>
          <div className="pt-2">
            <div className="flex items-center justify-between mb-4">
              ${qaBlock}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-gray-100 mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 bg-brand-deep-teal hover:bg-brand-deep-teal/90 rounded-xl text-white font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : null}
            Save Course
          </button>
        </div>
      </form>
`;

let code = fs.readFileSync('src/components/admin/CourseEditor.tsx', 'utf8');
const formStart = code.indexOf('<form onSubmit={handleSave} className="space-y-8">');
const formEnd = code.indexOf('</form>') + '</form>'.length;

const finalCode = code.substring(0, formStart) + formContent + code.substring(formEnd);
fs.writeFileSync('src/components/admin/CourseEditor.tsx', finalCode);

