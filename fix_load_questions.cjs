const fs = require('fs');
const path = 'src/components/admin/CourseEditor.tsx';
let content = fs.readFileSync(path, 'utf8');

const replacement = `
            <h3 className="text-lg font-bold text-gray-900">Exam Questions</h3>
            <div className="flex items-center gap-2">
              <button 
                type="button" 
                onClick={() => setQuestions(defaultQuestions)}
                className="text-brand-navy bg-brand-sage-200/50 hover:bg-brand-sage-200 px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1 transition-colors"
              >
                Load Default Fundamentals Exam
              </button>
              <button 
                type="button" 
                onClick={addQuestion}
                className="text-brand-deep-teal bg-brand-deep-teal/10 hover:bg-brand-deep-teal/20 px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1 transition-colors"
              >
                <Plus size={16} /> Add Question
              </button>
            </div>
`;

content = content.replace(
  /<h3 className="text-lg font-bold text-gray-900">Exam Questions<\/h3>\s*<button[\s\S]*?<\/button>/m,
  replacement
);

fs.writeFileSync(path, content);
