const fs = require('fs');
const path = 'src/components/admin/CourseEditor.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add Q&A to activeTab
content = content.replace(
  `const [activeTab, setActiveTab] = useState<'details' | 'lessons' | 'exam'>('details');`,
  `const [activeTab, setActiveTab] = useState<'details' | 'lessons' | 'exam' | 'qa'>('details');`
);

// 2. Add the Q&A tab button
const tabTarget = `        <button
          type="button"
          onClick={() => setActiveTab('exam')}
          className={\`px-6 py-3 text-sm font-bold border-b-2 transition-colors \${activeTab === 'exam' ? 'border-brand-deep-teal text-brand-deep-teal' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}\`}
        >
          Exam Questions
        </button>
      </div>`;
const tabReplacement = `        <button
          type="button"
          onClick={() => setActiveTab('exam')}
          className={\`px-6 py-3 text-sm font-bold border-b-2 transition-colors \${activeTab === 'exam' ? 'border-brand-deep-teal text-brand-deep-teal' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}\`}
        >
          Exam Questions
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('qa')}
          className={\`px-6 py-3 text-sm font-bold border-b-2 transition-colors \${activeTab === 'qa' ? 'border-brand-deep-teal text-brand-deep-teal' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}\`}
        >
          Q&A / FAQs
        </button>
      </div>`;
content = content.replace(tabTarget, tabReplacement);

// 3. Add the Q&A section rendering
const qaTarget = `        <div className="flex justify-end pt-6 border-t border-gray-100 mt-6">`;
const qaReplacement = `        <div className={activeTab === 'qa' ? 'block' : 'hidden'}>
          <div className="mt-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Course Q&A / FAQs</h3>
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 bg-brand-sage-200 text-brand-navy rounded-lg font-bold hover:bg-brand-sage-300 transition-colors"
              >
                <Plus size={20} />
                Add FAQ
              </button>
            </div>
            <div className="bg-brand-sage-200/30 p-8 rounded-2xl border border-brand-sage-200 text-center">
              <p className="text-brand-navy font-medium">Q&A section is separated from Exam Questions.</p>
              <p className="text-sm text-gray-500 mt-2">You can add course FAQs here.</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end pt-6 border-t border-gray-100 mt-6">`;
content = content.replace(qaTarget, qaReplacement);

fs.writeFileSync(path, content);
