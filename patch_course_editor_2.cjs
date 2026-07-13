const fs = require('fs');
let code = fs.readFileSync('src/components/admin/CourseEditor.tsx', 'utf8');

if (!code.includes('qa?: { question: string; answer: string }[]')) {
    code = code.replace(
      'tags?: string[];\n}',
      'tags?: string[];\n  qa?: { question: string; answer: string }[];\n}'
    );
}

if (!code.includes('const [qa, setQa] = useState')) {
    code = code.replace(
      'const [isSubmitting, setIsSubmitting] = useState(false);',
      'const [qa, setQa] = useState<{ question: string; answer: string }[]>(initialData?.qa || []);\n  const [isSubmitting, setIsSubmitting] = useState(false);\n\n  const addQA = () => setQa([...qa, { question: \'\', answer: \'\' }]);\n  const removeQA = (index: number) => setQa(qa.filter((_, i) => i !== index));\n  const updateQA = (index: number, field: \'question\' | \'answer\', value: string) => {\n    const newQA = [...qa];\n    newQA[index][field] = value;\n    setQa(newQA);\n  };'
    );
}

if (!code.includes('qa,')) {
    code = code.replace(
      'tags,\n      updatedAt',
      'tags,\n      qa,\n      updatedAt'
    );
}

if (!code.includes('Q&A / FAQs')) {
    // Wait, Q&A / FAQs tab button is already there. Let's just append the tab content.
}

const qaBlock = `
        </div>
        
        <div className={activeTab === 'qa' ? 'block' : 'hidden'}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Q&A / FAQs</h3>
            <button
              type="button"
              onClick={addQA}
              className="text-brand-deep-teal text-sm font-semibold flex items-center gap-1 hover:text-brand-navy"
            >
              <Plus size={16} /> Add Q&A
            </button>
          </div>
          <div className="space-y-4">
            {qa.length === 0 && (
               <p className="text-sm text-gray-500 italic">No Q&A added yet. Add common questions and answers.</p>
            )}
            {qa.map((item, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-col gap-3">
                <div className="flex items-start gap-4">
                  <div className="flex-1 space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Question</label>
                      <input
                        type="text"
                        value={item.question}
                        onChange={(e) => updateQA(index, 'question', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-brand-deep-teal"
                        placeholder="e.g. Is this course for beginners?"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Answer</label>
                      <textarea
                        value={item.answer}
                        onChange={(e) => updateQA(index, 'answer', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-brand-deep-teal resize-y h-24"
                        placeholder="Type the answer here..."
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeQA(index)}
                    className="p-2 text-red-400 hover:text-red-600 bg-white rounded-lg border border-gray-200 shadow-sm shrink-0"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
`;

code = code.replace(
  '</div>\n        <div className="flex justify-end pt-6 border-t border-gray-100 mt-6">',
  `${qaBlock}        </div>\n        <div className="flex justify-end pt-6 border-t border-gray-100 mt-6">`
);

fs.writeFileSync('src/components/admin/CourseEditor.tsx', code);
