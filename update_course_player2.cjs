const fs = require('fs');
const path = 'src/pages/CoursePlayer.tsx';
let content = fs.readFileSync(path, 'utf8');

// First insert actualQuestions
content = content.replace(
  /const examQuestions = course\?\.questions && course\.questions\.length > 0 \? course\.questions : defaultQuestions;/,
  `const examQuestions = course?.questions && course.questions.length > 0 ? course.questions : defaultQuestions;
  const actualQuestions = examQuestions.filter(q => !q.isSection);`
);

// replace score calc
content = content.replace(
  /\(correctAnswers \/ examQuestions\.length\) \* 100/,
  `(correctAnswers / actualQuestions.length) * 100`
);

// replace Questions count
content = content.replace(
  /\{examQuestions\.length\} Multiple Choice/,
  `{actualQuestions.length} Multiple Choice`
);

// replace progress bar
content = content.replace(
  /width: \`\$\{\(Object\.keys\(answers\)\.length \/ examQuestions\.length\) \* 100\}%\`,/,
  `width: \`\${(Object.keys(answers).length / actualQuestions.length) * 100}%\`,`
);

// replace answered count
content = content.replace(
  /\{examQuestions\.length\} answered/,
  `{actualQuestions.length} answered`
);

// replace disabled state logic
content = content.replace(
  /Object\.keys\(answers\)\.length <\s*examQuestions\.length/,
  `Object.keys(answers).length < actualQuestions.length`
);
content = content.replace(
  /Object\.keys\(answers\)\.length < examQuestions\.length/,
  `Object.keys(answers).length < actualQuestions.length`
);

// rewrite the map body
const targetMapStr = `{examQuestions.map((q, qIndex) => (
                          <div key={qIndex}>
                            {q.section && q.section !== examQuestions[qIndex - 1]?.section && (
                              <h3 className="text-xl font-extrabold text-brand-navy mb-4 mt-8 pb-2 border-b-2 border-brand-sage-200">
                                {q.section}
                              </h3>
                            )}
                          <div
                            className="bg-brand-warm-white/30 p-6 rounded-xl border border-gray-100"
                          >
                            <h4 className="text-lg font-bold text-gray-900 mb-6 flex gap-3">
                              <span className="text-brand-deep-teal">
                                {qIndex + 1}.
                              </span>
                              {q.question}
                            </h4>
                            <div className="space-y-3 pl-6">
                              {q.options.map((opt, optIndex) => (
                                <label
                                  key={optIndex}
                                  className={\`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all \${
                                    answers[qIndex] === optIndex
                                      ? "bg-brand-navy/5 border-brand-deep-teal shadow-sm"
                                      : "bg-white border-gray-200 hover:border-brand-deep-teal/40 hover:bg-brand-warm-white"
                                  }\`}
                                >
                                  <input
                                    type="radio"
                                    name={\`question-\${qIndex}\`}
                                    value={optIndex}
                                    checked={answers[qIndex] === optIndex}
                                    onChange={() =>
                                      setAnswers((prev) => ({
                                        ...prev,
                                        [qIndex]: optIndex,
                                      }))
                                    }
                                    className="mt-1 flex-shrink-0 w-4 h-4 text-brand-deep-teal border-gray-300 focus:ring-brand-deep-teal"
                                  />
                                  <span
                                    className={\`text-gray-800 \${answers[qIndex] === optIndex ? "font-medium" : ""}\`}
                                  >
                                    {opt}
                                  </span>
                                </label>
                              ))}
                            </div>
                          </div>
                          </div>
                        ))}`;

const replacementMapStr = `{examQuestions.map((q, qIndex) => q.isSection ? (
                          <div key={qIndex}>
                            <h3 className="text-xl font-extrabold text-brand-navy mb-4 mt-8 pb-2 border-b-2 border-brand-sage-200">
                              {q.sectionTitle}
                            </h3>
                          </div>
                        ) : (
                          <div
                            key={qIndex}
                            className="bg-brand-warm-white/30 p-6 rounded-xl border border-gray-100"
                          >
                            <h4 className="text-lg font-bold text-gray-900 mb-6 flex gap-3">
                              <span className="text-brand-deep-teal">
                                {examQuestions.slice(0, qIndex).filter(qu => !qu.isSection).length + 1}.
                              </span>
                              {q.question}
                            </h4>
                            <div className="space-y-3 pl-6">
                              {q.options.map((opt, optIndex) => (
                                <label
                                  key={optIndex}
                                  className={\`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all \${
                                    answers[qIndex] === optIndex
                                      ? "bg-brand-navy/5 border-brand-deep-teal shadow-sm"
                                      : "bg-white border-gray-200 hover:border-brand-deep-teal/40 hover:bg-brand-warm-white"
                                  }\`}
                                >
                                  <input
                                    type="radio"
                                    name={\`question-\${qIndex}\`}
                                    value={optIndex}
                                    checked={answers[qIndex] === optIndex}
                                    onChange={() =>
                                      setAnswers((prev) => ({
                                        ...prev,
                                        [qIndex]: optIndex,
                                      }))
                                    }
                                    className="mt-1 flex-shrink-0 w-4 h-4 text-brand-deep-teal border-gray-300 focus:ring-brand-deep-teal"
                                  />
                                  <span
                                    className={\`text-gray-800 \${answers[qIndex] === optIndex ? "font-medium" : ""}\`}
                                  >
                                    {opt}
                                  </span>
                                </label>
                              ))}
                            </div>
                          </div>
                        ))}`;

content = content.replace(targetMapStr, replacementMapStr);
fs.writeFileSync(path, content);
