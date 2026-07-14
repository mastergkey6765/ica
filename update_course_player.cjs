const fs = require('fs');
let code = fs.readFileSync('src/pages/CoursePlayer.tsx', 'utf8');

code = code.replace(
  '<h2 className="text-3xl font-bold text-brand-navy mb-8 text-center">\n                    Final Assessment\n                  </h2>',
  '<h2 className="text-3xl font-bold text-brand-navy mb-8 text-center">\n                    {course?.examTitle || "Final Assessment"}\n                  </h2>'
);

code = code.replace(
  '<h3 className="text-xl font-bold text-gray-900">\n                        Ready to take the exam?\n                      </h3>',
  '<h3 className="text-xl font-bold text-gray-900">\n                        {course?.examTitle || "Ready to take the exam?"}\n                      </h3>\n                      {course?.examDescription && <p className="text-gray-600 text-left max-w-2xl mx-auto whitespace-pre-wrap">{course.examDescription}</p>}'
);

fs.writeFileSync('src/pages/CoursePlayer.tsx', code);
