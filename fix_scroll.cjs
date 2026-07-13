const fs = require('fs');
let code = fs.readFileSync('src/components/admin/CourseEditor.tsx', 'utf8');

code = code.replace(
  "setActiveQuestionIndex(targetIndex + 1);",
  `setActiveQuestionIndex(targetIndex + 1);
    setTimeout(() => {
      const el = document.getElementById(\`question-\${targetIndex + 1}\`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);`
);

code = code.replace(
  "setActiveQuestionIndex(activeQuestionIndex + 1);",
  `setActiveQuestionIndex(activeQuestionIndex + 1);
      setTimeout(() => {
        const el = document.getElementById(\`question-\${activeQuestionIndex + 1}\`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);`
);

code = code.replace(
  "setActiveQuestionIndex(questions.length);",
  `setActiveQuestionIndex(questions.length);
      setTimeout(() => {
        const el = document.getElementById(\`question-\${questions.length}\`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);`
);

code = code.replace(
  /<div key=\{qIndex\} className="bg-brand-sage-200\/30/g,
  '<div key={qIndex} id={`question-${qIndex}`} className="bg-brand-sage-200/30'
);

code = code.replace(
  /<div key=\{qIndex\} className="bg-gray-50/g,
  '<div key={qIndex} id={`question-${qIndex}`} className="bg-gray-50'
);

code = code.replace(
  /<div key=\{qIndex\} className="bg-white/g,
  '<div key={qIndex} id={`question-${qIndex}`} className="bg-white'
);

fs.writeFileSync('src/components/admin/CourseEditor.tsx', code);
