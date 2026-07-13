const fs = require('fs');
const path = 'src/components/admin/CourseEditor.tsx';
let content = fs.readFileSync(path, 'utf8');

const targetStr = `              <button 
                type="button" 
                onClick={addQuestion}
                className="text-brand-deep-teal bg-brand-deep-teal/10 hover:bg-brand-deep-teal/20 px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1 transition-colors"
              >
                <Plus size={16} /> Add Question
              </button>`;

const replacementStr = `              <button 
                type="button" 
                onClick={addQuestion}
                className="text-brand-deep-teal bg-brand-deep-teal/10 hover:bg-brand-deep-teal/20 px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1 transition-colors"
              >
                <Plus size={16} /> Add Question
              </button>
              <button 
                type="button" 
                onClick={() => insertSectionAfter(questions.length - 1)}
                className="text-brand-blue bg-brand-blue/10 hover:bg-brand-blue/20 px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1 transition-colors"
              >
                <Plus size={16} /> Add Section
              </button>`;

content = content.replace(targetStr, replacementStr);
fs.writeFileSync(path, content);
