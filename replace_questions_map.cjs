const fs = require('fs');
const path = 'src/components/admin/CourseEditor.tsx';
let content = fs.readFileSync(path, 'utf8');

const targetStr = `{questions.map((q, qIndex) => (
              <div key={qIndex} className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-col gap-3 relative group">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex gap-4 mb-2">
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
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeQuestion(qIndex)}
                    className="p-2 text-red-400 hover:text-red-600 bg-white rounded-lg border border-gray-200 shadow-sm shrink-0"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <div className="mt-2 pl-4 border-l-2 border-brand-sage-200">
                  <label className="block text-xs font-semibold text-gray-500 mb-2">Options & Correct Answer (Select the radio button for the correct one)</label>
                  {q.options.map((opt, oIndex) => (
                    <div key={oIndex} className="flex items-center gap-2 mb-2">
                      <input
                        type="radio"
                        name={\`correct-\${qIndex}\`}
                        checked={q.correctOption === oIndex}
                        onChange={() => updateQuestion(qIndex, 'correctOption', oIndex)}
                        className="w-4 h-4 text-brand-deep-teal focus:ring-brand-deep-teal cursor-pointer"
                        title="Mark as correct answer"
                      />
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                        className={\`flex-1 px-3 py-1.5 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-brand-deep-teal \${q.correctOption === oIndex ? 'border-brand-deep-teal bg-brand-light-gray/20 font-medium' : 'border-gray-300'}\`}
                        placeholder={\`Option \${oIndex + 1}\`}
                      />
                      <button
                        type="button"
                        onClick={() => removeOption(qIndex, oIndex)}
                        disabled={q.options.length <= 2}
                        className="p-1.5 text-red-400 hover:text-red-600 disabled:opacity-30"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addOption(qIndex)}
                    className="mt-1 text-xs font-semibold text-brand-deep-teal hover:text-brand-navy flex items-center gap-1"
                  >
                    <Plus size={14} /> Add Option
                  </button>
                </div>
              </div>
            ))}`;

const replacementStr = `{questions.map((q, qIndex) => q.isSection ? (
              <div key={qIndex} className="bg-brand-sage-200/30 p-4 rounded-xl border border-brand-sage-200 flex items-center gap-4 relative group">
                <div className="flex flex-col gap-1">
                  <button type="button" onClick={() => moveQuestionUp(qIndex)} className="text-gray-400 hover:text-brand-deep-teal disabled:opacity-30" disabled={qIndex === 0}><ChevronUp size={20} /></button>
                  <button type="button" onClick={() => moveQuestionDown(qIndex)} className="text-gray-400 hover:text-brand-deep-teal disabled:opacity-30" disabled={qIndex === questions.length - 1}><ChevronDown size={20} /></button>
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-brand-navy mb-1">Section Title</label>
                  <input
                    type="text"
                    value={q.sectionTitle || ''}
                    onChange={(e) => updateQuestion(qIndex, 'sectionTitle', e.target.value)}
                    className="w-full px-4 py-2 text-base font-bold border border-brand-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-deep-teal bg-white"
                    placeholder="e.g. Bonus Questions"
                  />
                </div>
                <div className="flex items-center gap-2 mt-5">
                  <button
                    type="button"
                    onClick={() => removeQuestion(qIndex)}
                    className="p-2 text-red-400 hover:text-red-600 bg-white rounded-lg border border-gray-200 shadow-sm shrink-0"
                    title="Remove Section"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ) : (
              <div key={qIndex} className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-col gap-3 relative group">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-1 mt-6">
                    <button type="button" onClick={() => moveQuestionUp(qIndex)} className="text-gray-400 hover:text-brand-deep-teal disabled:opacity-30" disabled={qIndex === 0}><ChevronUp size={20} /></button>
                    <button type="button" onClick={() => moveQuestionDown(qIndex)} className="text-gray-400 hover:text-brand-deep-teal disabled:opacity-30" disabled={qIndex === questions.length - 1}><ChevronDown size={20} /></button>
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Question {questions.slice(0, qIndex).filter(qu => !qu.isSection).length + 1}</label>
                    <textarea
                      value={q.question}
                      onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-brand-deep-teal resize-y h-16"
                      placeholder="Enter question text here..."
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeQuestion(qIndex)}
                    className="p-2 mt-6 text-red-400 hover:text-red-600 bg-white rounded-lg border border-gray-200 shadow-sm shrink-0"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <div className="mt-2 pl-12 border-l-2 border-brand-sage-200 ml-3">
                  <label className="block text-xs font-semibold text-gray-500 mb-2">Options & Correct Answer (Select the radio button for the correct one)</label>
                  {q.options.map((opt, oIndex) => (
                    <div key={oIndex} className="flex items-center gap-2 mb-2">
                      <input
                        type="radio"
                        name={\`correct-\${qIndex}\`}
                        checked={q.correctOption === oIndex}
                        onChange={() => updateQuestion(qIndex, 'correctOption', oIndex)}
                        className="w-4 h-4 text-brand-deep-teal focus:ring-brand-deep-teal cursor-pointer"
                        title="Mark as correct answer"
                      />
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                        className={\`flex-1 px-3 py-1.5 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-brand-deep-teal \${q.correctOption === oIndex ? 'border-brand-deep-teal bg-brand-light-gray/20 font-medium' : 'border-gray-300'}\`}
                        placeholder={\`Option \${oIndex + 1}\`}
                      />
                      <button
                        type="button"
                        onClick={() => removeOption(qIndex, oIndex)}
                        disabled={q.options.length <= 2}
                        className="p-1.5 text-red-400 hover:text-red-600 disabled:opacity-30"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <div className="flex items-center justify-between mt-2">
                    <button
                      type="button"
                      onClick={() => addOption(qIndex)}
                      className="text-xs font-semibold text-brand-deep-teal hover:text-brand-navy flex items-center gap-1"
                    >
                      <Plus size={14} /> Add Option
                    </button>
                    <button
                      type="button"
                      onClick={() => insertSectionAfter(qIndex)}
                      className="text-xs font-semibold text-brand-blue hover:text-brand-blue/80 flex items-center gap-1"
                    >
                      <Plus size={14} /> Add Section Below
                    </button>
                  </div>
                </div>
              </div>
            ))}`;

content = content.replace(targetStr, replacementStr);
fs.writeFileSync(path, content);
