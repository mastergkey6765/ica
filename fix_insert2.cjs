const fs = require('fs');
let code = fs.readFileSync('src/components/admin/CourseEditor.tsx', 'utf8');

const regex = /  const insertSectionAfter = \([\s\S]*?setQuestions\(newQuestions\);\n  };/;

const newInsertFunction = `  const insertItemAfter = (type: 'multiple_choice' | 'title' | 'image' | 'video' | 'section') => {
    const targetIndex = activeQuestionIndex !== null ? activeQuestionIndex : questions.length - 1;
    const newQuestions = [...questions];
    newQuestions.splice(targetIndex + 1, 0, {
      question: type === 'multiple_choice' ? 'New Question' : '',
      options: type === 'multiple_choice' ? ['Option 1'] : [],
      correctOption: 0,
      isSection: type === 'section' || type === 'title',
      sectionTitle: type === 'section' ? 'New Section' : (type === 'title' ? 'New Title' : ''),
      type: type,
      imageUrl: '',
      videoUrl: '',
      description: ''
    });
    setQuestions(newQuestions);
    setActiveQuestionIndex(targetIndex + 1);
  };`;

code = code.replace(regex, newInsertFunction);

fs.writeFileSync('src/components/admin/CourseEditor.tsx', code);
