const fs = require('fs');
let code = fs.readFileSync('src/components/admin/CourseEditor.tsx', 'utf8');

const newRender = '<div className="flex-1 space-y-3">\\n' +
'                        <input\\n' +
'                          type="text"\\n' +
'                          value={q.sectionTitle || \'\'}\\n' +
'                          onChange={(e) => updateQuestion(qIndex, \'sectionTitle\', e.target.value)}\\n' +
'                          className="w-full px-0 py-2 text-xl font-normal border-0 border-b border-gray-200 focus:border-brand-blue focus:ring-0 bg-transparent"\\n' +
'                          placeholder={q.type === \'title\' ? "Title" : "Untitled Section"}\\n' +
'                        />\\n' +
'                        {q.type === \'title\' && (\\n' +
'                          <input\\n' +
'                            type="text"\\n' +
'                            value={q.description || \'\'}\\n' +
'                            onChange={(e) => updateQuestion(qIndex, \'description\', e.target.value)}\\n' +
'                            className="w-full px-0 py-1 text-sm border-0 border-b border-gray-200 focus:border-brand-blue focus:ring-0 bg-transparent text-gray-500"\\n' +
'                            placeholder="Description (optional)"\\n' +
'                          />\\n' +
'                        )}\\n' +
'                        {q.type === \'image\' && (\\n' +
'                          <input\\n' +
'                            type="text"\\n' +
'                            value={q.imageUrl || \'\'}\\n' +
'                            onChange={(e) => updateQuestion(qIndex, \'imageUrl\', e.target.value)}\\n' +
'                            className="w-full px-0 py-1 text-sm border-0 border-b border-gray-200 focus:border-brand-blue focus:ring-0 bg-transparent"\\n' +
'                            placeholder="Image URL"\\n' +
'                          />\\n' +
'                        )}\\n' +
'                        {q.type === \'video\' && (\\n' +
'                          <input\\n' +
'                            type="text"\\n' +
'                            value={q.videoUrl || \'\'}\\n' +
'                            onChange={(e) => updateQuestion(qIndex, \'videoUrl\', e.target.value)}\\n' +
'                            className="w-full px-0 py-1 text-sm border-0 border-b border-gray-200 focus:border-brand-blue focus:ring-0 bg-transparent"\\n' +
'                            placeholder="Video URL (YouTube/Vimeo)"\\n' +
'                          />\\n' +
'                        )}\\n' +
'                      </div>';

code = code.replace(
  /<div className="flex-1 space-y-3">\s*<input\s*type="text"\s*value=\{q\.sectionTitle \|\| ''\}\s*onChange=\{\(e\) => updateQuestion\(qIndex, 'sectionTitle', e\.target\.value\)\}\s*className="w-full px-0 py-2 text-xl font-normal border-0 border-b border-gray-200 focus:border-brand-blue focus:ring-0 bg-transparent"\s*placeholder="Untitled Section"\s*\/>\s*<\/div>/,
  newRender
);

fs.writeFileSync('src/components/admin/CourseEditor.tsx', code);
