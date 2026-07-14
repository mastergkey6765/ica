const fs = require('fs');

const path = 'src/components/admin/CourseEditor.tsx';
let content = fs.readFileSync(path, 'utf8');

const target = '<div className="flex justify-end pt-6 border-t border-gray-100">';
const questionsUI = `
        <div className="border-t border-gray-100 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Exam Questions</h3>
            <button 
              type="button" 
              onClick={addQuestion}
              className="text-brand-deep-teal text-sm font-semibold flex items-center gap-1 hover:text-brand-navy"
            >
              <Plus size={16} /> Add Question
            </button>
          </div>
          <div className="space-y-6">
            {questions.length === 0 && (
               <p className="text-sm text-gray-500 italic">No questions added yet. Add questions to create an exam for this course.</p>
            )}
            {questions.map((q, qIndex) => (
              <div key={qIndex} className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-col gap-3 relative group">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Question {qIndex + 1}</label>
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
                    className="p-2 text-red-400 hover:text-red-600 bg-white rounded-lg border border-gray-200 shadow-sm shrink-0"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <div className="mt-2 pl-4 border-l-2 border-brand-sage-200">
                  <label className="block text-xs font-semibold text-gray-500 mb-2">Options & Correct Answer</label>
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
            ))}
          </div>
        </div>

`;

content = content.replace(target, questionsUI + target);

fs.writeFileSync(path, content);
console.log("Injected questions UI");
