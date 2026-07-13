const fs = require('fs');
const path = 'src/components/admin/CourseEditor.tsx';
let content = fs.readFileSync(path, 'utf8');

const targetStr = `<label className="block text-xs font-semibold text-gray-500 mb-1">Question {qIndex + 1}</label>
                    <textarea
                      value={q.question}
                      onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-brand-deep-teal resize-y h-16"
                      placeholder="Enter question text here..."
                    />`;

const replacementStr = `<div className="flex gap-4 mb-2">
                      <div className="flex-1">
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Question {qIndex + 1}</label>
                        <textarea
                          value={q.question}
                          onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-brand-deep-teal resize-y h-16"
                          placeholder="Enter question text here..."
                        />
                      </div>
                      <div className="w-1/3">
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Section (Optional)</label>
                        <input
                          type="text"
                          value={q.section || ''}
                          onChange={(e) => updateQuestion(qIndex, 'section', e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-brand-deep-teal"
                          placeholder="e.g. Bonus Questions"
                        />
                      </div>
                    </div>`;

content = content.replace(targetStr, replacementStr);

const targetOptionsStr = `<label className="block text-xs font-semibold text-gray-500 mb-2">Options & Correct Answer</label>`;
const replacementOptionsStr = `<label className="block text-xs font-semibold text-gray-500 mb-2">Options & Correct Answer (Select the radio button for the correct one)</label>`;

content = content.replace(targetOptionsStr, replacementOptionsStr);

fs.writeFileSync(path, content);
