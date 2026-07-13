const fs = require('fs');
let code = fs.readFileSync('src/components/admin/CourseEditor.tsx', 'utf8');

// Also need to import specific icons for the sidebar
if (!code.includes('Image as ImageIcon')) {
    code = code.replace(
      'Loader2, ArrowLeft, Plus, Trash2, GripVertical, ChevronUp, ChevronDown',
      'Loader2, ArrowLeft, Plus, Trash2, GripVertical, ChevronUp, ChevronDown, Image as ImageIcon, PlaySquare, Type, Layout, FileDown, PlusCircle'
    );
}

const originalExamStart = code.indexOf('<div className={activeTab === \'exam\' ? \'block\' : \'hidden\'}>');
const examStart = code.indexOf('<div className="pt-2">', originalExamStart);
const examEnd = code.indexOf('</div>\n          </div>\n        </div>\n\n        <div className={activeTab === \'qa\' ? \'block\' : \'hidden\'}>');

const examContent = code.substring(examStart, examEnd);

const newExamTab = `
          <div className="pt-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Exam Questions Configuration</h3>
              <div className="flex items-center gap-2">
                <button 
                  type="button" 
                  onClick={() => setQuestions(defaultQuestions)}
                  className="text-brand-navy bg-brand-sage-200/50 hover:bg-brand-sage-200 px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1 transition-colors"
                >
                  Load Default Fundamentals Exam
                </button>
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-6 items-start relative">
              {/* Main Content Area */}
              <div className="flex-1 space-y-6 w-full pb-20">
                {/* Form Title & Description Header Block */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 border-t-[8px] border-t-brand-blue relative p-6">
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={examTitle}
                      onChange={(e) => setExamTitle(e.target.value)}
                      className="w-full px-0 py-2 text-3xl font-normal text-gray-900 border-0 border-b border-transparent hover:border-gray-200 focus:border-brand-blue focus:ring-0 transition-colors bg-transparent placeholder-gray-400"
                      placeholder="Exam Title"
                    />
                    <textarea
                      value={examDescription}
                      onChange={(e) => setExamDescription(e.target.value)}
                      className="w-full px-0 py-2 text-sm text-gray-600 border-0 border-b border-transparent hover:border-gray-200 focus:border-brand-blue focus:ring-0 transition-colors bg-transparent resize-y h-32 placeholder-gray-400"
                      placeholder="Exam Description"
                    />
                  </div>
                </div>

                {questions.length === 0 && (
                   <p className="text-sm text-gray-500 italic bg-white p-6 rounded-xl border border-gray-200 shadow-sm">No questions added yet. Use the toolbar on the right to add content.</p>
                )}
                
                {questions.map((q, qIndex) => q.isSection ? (
                  <div key={qIndex} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-4 relative group focus-within:border-l-4 focus-within:border-l-brand-blue transition-all">
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-300 cursor-grab">
                       <GripVertical size={20} />
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex-1 space-y-3">
                        <input
                          type="text"
                          value={q.sectionTitle || ''}
                          onChange={(e) => updateQuestion(qIndex, 'sectionTitle', e.target.value)}
                          className="w-full px-0 py-2 text-xl font-normal border-0 border-b border-gray-200 focus:border-brand-blue focus:ring-0 bg-transparent"
                          placeholder="Untitled Section"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-1 border-r border-gray-200 pr-3 mr-1">
                          <button type="button" onClick={() => moveQuestionUp(qIndex)} className="p-1.5 text-gray-400 hover:text-gray-700 rounded-md hover:bg-gray-100 disabled:opacity-30" disabled={qIndex === 0} title="Move Up"><ChevronUp size={18} /></button>
                          <button type="button" onClick={() => moveQuestionDown(qIndex)} className="p-1.5 text-gray-400 hover:text-gray-700 rounded-md hover:bg-gray-100 disabled:opacity-30" disabled={qIndex === questions.length - 1} title="Move Down"><ChevronDown size={18} /></button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeQuestion(qIndex)}
                          className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100 transition-colors"
                          title="Delete Section"
                        >
                          <Trash2 size={20} />
                        </button>
                    </div>
                  </div>
                ) : (
                  <div key={qIndex} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-6 relative group focus-within:border-l-4 focus-within:border-l-brand-blue transition-all">
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-300 cursor-grab">
                       <GripVertical size={20} />
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-4 mt-2">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={q.question}
                          onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                          className="w-full px-4 py-3 text-base bg-gray-50 border-b border-gray-300 focus:border-brand-blue focus:ring-0 focus:bg-gray-100 transition-colors rounded-t-md"
                          placeholder="Question"
                        />
                      </div>
                      <div className="w-full md:w-64">
                         <select className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-sm text-gray-700 focus:ring-2 focus:ring-brand-blue focus:border-transparent cursor-pointer">
                            <option value="multiple_choice">Multiple choice</option>
                            <option value="short_answer">Short answer</option>
                            <option value="paragraph">Paragraph</option>
                         </select>
                      </div>
                    </div>

                    <div className="space-y-3 pl-2">
                      {q.options.map((opt, oIndex) => (
                        <div key={oIndex} className="flex items-center gap-3 group/opt">
                          <input
                            type="radio"
                            name={\`correct-preview-\${qIndex}\`}
                            checked={q.correctOption === oIndex}
                            onChange={() => updateQuestion(qIndex, 'correctOption', oIndex)}
                            className="w-5 h-5 text-brand-blue focus:ring-brand-blue border-gray-300 cursor-pointer"
                            title="Mark as correct answer"
                          />
                          <input
                            type="text"
                            value={opt}
                            onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                            className="flex-1 px-0 py-1.5 text-sm border-0 border-b border-transparent hover:border-gray-200 focus:border-brand-blue focus:ring-0 bg-transparent"
                            placeholder={\`Option \${oIndex + 1}\`}
                          />
                          <button
                            type="button"
                            onClick={() => removeOption(qIndex, oIndex)}
                            disabled={q.options.length <= 2}
                            className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100 opacity-0 group-hover/opt:opacity-100 transition-all disabled:opacity-0"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                      <div className="flex items-center gap-3 pl-1 pt-2">
                         <input type="radio" disabled className="w-5 h-5 border-gray-300" />
                         <button
                          type="button"
                          onClick={() => addOption(qIndex)}
                          className="text-sm text-gray-500 hover:text-gray-800 font-medium"
                        >
                          Add option
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 mt-2 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-1 border-r border-gray-200 pr-3 mr-1">
                          <button type="button" onClick={() => moveQuestionUp(qIndex)} className="p-1.5 text-gray-400 hover:text-gray-700 rounded-md hover:bg-gray-100 disabled:opacity-30" disabled={qIndex === 0} title="Move Up"><ChevronUp size={18} /></button>
                          <button type="button" onClick={() => moveQuestionDown(qIndex)} className="p-1.5 text-gray-400 hover:text-gray-700 rounded-md hover:bg-gray-100 disabled:opacity-30" disabled={qIndex === questions.length - 1} title="Move Down"><ChevronDown size={18} /></button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeQuestion(qIndex)}
                        className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100 transition-colors"
                        title="Delete Question"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sticky Right Toolbar */}
              <div className="hidden lg:flex flex-col gap-3 bg-white p-2 rounded-xl shadow-md border border-gray-200 sticky top-32 z-10 w-14 items-center">
                <button
                  type="button"
                  onClick={addQuestion}
                  className="p-2.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-full transition-colors"
                  title="Add Question"
                >
                  <PlusCircle size={22} />
                </button>
                <button
                  type="button"
                  className="p-2.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-full transition-colors"
                  title="Import Questions"
                >
                  <FileDown size={22} />
                </button>
                <button
                  type="button"
                  onClick={() => insertSectionAfter(questions.length - 1)}
                  className="p-2.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-full transition-colors"
                  title="Add Title and Description"
                >
                  <Type size={22} />
                </button>
                <button
                  type="button"
                  className="p-2.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-full transition-colors"
                  title="Add Image"
                >
                  <ImageIcon size={22} />
                </button>
                <button
                  type="button"
                  className="p-2.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-full transition-colors"
                  title="Add Video"
                >
                  <PlaySquare size={22} />
                </button>
                <button
                  type="button"
                  onClick={() => insertSectionAfter(questions.length - 1)}
                  className="p-2.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-full transition-colors"
                  title="Add Section"
                >
                  <Layout size={22} />
                </button>
              </div>
            </div>
          </div>
`;

code = code.replace(examContent, newExamTab);

fs.writeFileSync('src/components/admin/CourseEditor.tsx', code);
