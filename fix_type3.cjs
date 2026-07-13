const fs = require('fs');
let code = fs.readFileSync('src/components/admin/CourseEditor.tsx', 'utf8');

code = code.replace(
  `<select className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-sm text-gray-700 focus:ring-2 focus:ring-brand-blue focus:border-transparent cursor-pointer">
                            <option value="multiple_choice">Multiple choice</option>
                            <option value="short_answer">Short answer</option>
                            <option value="paragraph">Paragraph</option>
                         </select>`,
  `<select 
                            value={q.type || 'multiple_choice'}
                            onChange={(e) => updateQuestion(qIndex, 'type', e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-sm text-gray-700 focus:ring-2 focus:ring-brand-blue focus:border-transparent cursor-pointer">
                            <option value="multiple_choice">Multiple choice</option>
                            <option value="short_answer">Short answer</option>
                            <option value="paragraph">Paragraph</option>
                         </select>`
);

code = code.replace(
  '<div className="space-y-3 pl-2">\n                      {q.options.map((opt, oIndex) => (',
  '<div className="space-y-3 pl-2">\n                      {(!q.type || q.type === "multiple_choice") && q.options.map((opt, oIndex) => ('
);

code = code.replace(
  `                      ))}
                      <div className="flex items-center gap-3 pl-1 pt-2">
                         <input type="radio" disabled className="w-5 h-5 border-gray-300" />
                         <button
                          type="button"
                          onClick={() => addOption(qIndex)}
                          className="text-sm text-gray-500 hover:text-gray-800 font-medium"
                        >
                          Add option
                        </button>
                      </div>`,
  `                      ))}
                      {(!q.type || q.type === "multiple_choice") && (
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
                      )}
                      {q.type === "short_answer" && (
                        <div className="mt-4">
                          <input type="text" disabled placeholder="Short answer text" className="w-full max-w-md border-0 border-b border-gray-300 border-dotted bg-transparent px-0 py-2 text-sm text-gray-500" />
                        </div>
                      )}
                      {q.type === "paragraph" && (
                        <div className="mt-4">
                          <input type="text" disabled placeholder="Long answer text" className="w-full border-0 border-b border-gray-300 border-dotted bg-transparent px-0 py-2 text-sm text-gray-500" />
                        </div>
                      )}`
);


fs.writeFileSync('src/components/admin/CourseEditor.tsx', code);
