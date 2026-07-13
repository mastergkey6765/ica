const fs = require('fs');
let code = fs.readFileSync('src/pages/CoursePlayer.tsx', 'utf8');

const newSectionRender = '<div key={qIndex} className="mt-8 mb-6">\\n' +
'                            <h3 className="text-2xl font-extrabold text-brand-navy pb-2 border-b-2 border-brand-sage-200">\\n' +
'                              {q.sectionTitle}\\n' +
'                            </h3>\\n' +
'                            {q.description && <p className="mt-2 text-gray-600 whitespace-pre-wrap">{q.description}</p>}\\n' +
'                            {q.imageUrl && <img src={q.imageUrl} alt={q.sectionTitle || \'Image\'} className="mt-4 rounded-xl max-w-full h-auto" />}\\n' +
'                            {q.videoUrl && (\\n' +
'                                <div className="mt-4 aspect-video rounded-xl overflow-hidden">\\n' +
'                                   <ReactPlayer url={q.videoUrl} width="100%" height="100%" controls />\\n' +
'                                </div>\\n' +
'                            )}\\n' +
'                          </div>';

code = code.replace(
  /<div key=\{qIndex\}>\s*<h3 className="text-xl font-extrabold text-brand-navy mb-4 mt-8 pb-2 border-b-2 border-brand-sage-200">\s*\{q\.sectionTitle\}\s*<\/h3>\s*<\/div>/,
  newSectionRender
);

fs.writeFileSync('src/pages/CoursePlayer.tsx', code);
