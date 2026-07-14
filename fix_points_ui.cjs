const fs = require('fs');
let code = fs.readFileSync('src/components/admin/CourseEditor.tsx', 'utf8');

code = code.replace(
  `                    <div className="flex items-center justify-end gap-3 mt-2 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-1 border-r border-gray-200 pr-3 mr-1">`,
  `                    <div className="flex items-center justify-end gap-4 mt-2 pt-4 border-t border-gray-100 text-sm">
                      <div className="flex items-center gap-2 border-r border-gray-200 pr-4 mr-1">
                        <label className="text-gray-600 font-medium whitespace-nowrap">Points</label>
                        <input
                          type="number"
                          min="0"
                          value={q.points ?? 5}
                          onChange={(e) => updateQuestion(qIndex, 'points', parseInt(e.target.value) || 0)}
                          className="w-16 px-2 py-1 text-center border border-gray-300 rounded focus:border-brand-blue focus:ring-0"
                        />
                      </div>
                      <div className="flex items-center gap-2 border-r border-gray-200 pr-4 mr-1">
                        <label className="text-gray-600 font-medium whitespace-nowrap cursor-pointer flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={q.isRequired !== false}
                            onChange={(e) => updateQuestion(qIndex, 'isRequired', e.target.checked)}
                            className="w-4 h-4 text-brand-blue rounded focus:ring-brand-blue border-gray-300 cursor-pointer"
                          />
                          Required
                        </label>
                      </div>
                      <div className="flex items-center gap-1 border-r border-gray-200 pr-3 mr-1">`
);

fs.writeFileSync('src/components/admin/CourseEditor.tsx', code);
