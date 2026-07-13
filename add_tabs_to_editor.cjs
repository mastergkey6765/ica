const fs = require('fs');
const path = 'src/components/admin/CourseEditor.tsx';
let content = fs.readFileSync(path, 'utf8');

if (!content.includes('const [activeTab, setActiveTab] = useState')) {
  // Insert activeTab state
  content = content.replace(
    'const [questions, setQuestions] = useState<QuestionData[]>(',
    `const [activeTab, setActiveTab] = useState<'details' | 'lessons' | 'exam'>('details');\n  const [questions, setQuestions] = useState<QuestionData[]>(`
  );
  
  // Replace the render to include tabs and conditionally render sections
  const tabsJSX = `
      <div className="flex space-x-1 border-b border-gray-200 mb-6">
        <button
          type="button"
          onClick={() => setActiveTab('details')}
          className={\`px-6 py-3 text-sm font-bold border-b-2 transition-colors \${activeTab === 'details' ? 'border-brand-deep-teal text-brand-deep-teal' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}\`}
        >
          Course Details
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('lessons')}
          className={\`px-6 py-3 text-sm font-bold border-b-2 transition-colors \${activeTab === 'lessons' ? 'border-brand-deep-teal text-brand-deep-teal' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}\`}
        >
          Lessons & Modules
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('exam')}
          className={\`px-6 py-3 text-sm font-bold border-b-2 transition-colors \${activeTab === 'exam' ? 'border-brand-deep-teal text-brand-deep-teal' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}\`}
        >
          Exam Questions
        </button>
      </div>
      
      <form onSubmit={handleSave} className="space-y-8">
        <div className={activeTab === 'details' ? 'block' : 'hidden'}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">`;
          
  content = content.replace(
    /<form onSubmit={handleSave} className="space-y-8">\n\s*<div className="grid grid-cols-1 md:grid-cols-2 gap-6">/,
    tabsJSX
  );
  
  // We need to wrap the lessons section
  const lessonsTarget = `<div className="mt-8 border-t pt-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Lessons & Modules</h3>`;
              
  const lessonsReplacement = `</div>
        </div>

        <div className={activeTab === 'lessons' ? 'block' : 'hidden'}>
          <div className="mt-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Lessons & Modules</h3>`;
              
  content = content.replace(lessonsTarget, lessonsReplacement);
  
  // We need to wrap the exam section
  const examTarget = `<div className="mt-8 border-t pt-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Exam Questions</h3>`;
              
  const examReplacement = `</div>
        </div>
        
        <div className={activeTab === 'exam' ? 'block' : 'hidden'}>
          <div className="mt-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Exam Questions</h3>`;
              
  content = content.replace(examTarget, examReplacement);
  
  // We need to fix the Save/Cancel buttons to be at the bottom, not inside the hidden div.
  // Currently they are just after the exam section. We might not need to do anything since the div isn't closed there.
  // Wait, I didn't close the exam div before the buttons.
  const buttonsTarget = `<div className="flex justify-end gap-3 mt-10 pt-6 border-t border-gray-100">`;
  const buttonsReplacement = `</div>
        </div>
        
        <div className="flex justify-end gap-3 mt-10 pt-6 border-t border-gray-100">`;
        
  content = content.replace(buttonsTarget, buttonsReplacement);
  
  fs.writeFileSync(path, content);
  console.log("Tabs added successfully!");
} else {
  console.log("Already has tabs or couldn't find hook.");
}
