const fs = require('fs');
let code = fs.readFileSync('src/pages/CoursePlayer.tsx', 'utf8');

code = code.replace(
  /{q\.options\.map\(\(opt, optIndex\) => \(/g,
  `{(!q.type || q.type === 'multiple_choice') ? q.options.map((opt, optIndex) => (`
);

code = code.replace(
  /                                  <\/span>\n                                <\/label>\n                              \)\)}\n                            <\/div>/g,
  `                                  </span>
                                </label>
                              )) : q.type === 'short_answer' ? (
                                <input
                                  type="text"
                                  value={answers[qIndex] || ''}
                                  onChange={(e) => setAnswers(prev => ({...prev, [qIndex]: e.target.value}))}
                                  className="w-full max-w-md border-0 border-b border-gray-300 bg-transparent px-0 py-2 focus:ring-0 focus:border-brand-deep-teal"
                                  placeholder="Your answer"
                                />
                              ) : q.type === 'paragraph' ? (
                                <textarea
                                  value={answers[qIndex] || ''}
                                  onChange={(e) => setAnswers(prev => ({...prev, [qIndex]: e.target.value}))}
                                  className="w-full border border-gray-300 rounded-lg bg-white px-4 py-3 focus:ring-2 focus:ring-brand-deep-teal/20 focus:border-brand-deep-teal h-32"
                                  placeholder="Your answer"
                                />
                              ) : null}
                            </div>`
);

fs.writeFileSync('src/pages/CoursePlayer.tsx', code);
