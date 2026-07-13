const fs = require('fs');
const path = 'src/components/admin/CourseEditor.tsx';
let content = fs.readFileSync(path, 'utf8');

const funcs = `
  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const insertSectionAfter = (index: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(index + 1, 0, {
      question: '',
      options: [],
      correctOption: 0,
      isSection: true,
      sectionTitle: 'New Section'
    });
    setQuestions(newQuestions);
  };

  const moveQuestionUp = (index: number) => {
    if (index === 0) return;
    const newQuestions = [...questions];
    const temp = newQuestions[index - 1];
    newQuestions[index - 1] = newQuestions[index];
    newQuestions[index] = temp;
    setQuestions(newQuestions);
  };

  const moveQuestionDown = (index: number) => {
    if (index === questions.length - 1) return;
    const newQuestions = [...questions];
    const temp = newQuestions[index + 1];
    newQuestions[index + 1] = newQuestions[index];
    newQuestions[index] = temp;
    setQuestions(newQuestions);
  };
`;

content = content.replace(
  /  const removeQuestion = \(index: number\) => {\n    setQuestions\(questions\.filter\(\(_, i\) => i !== index\)\);\n  };/,
  funcs
);

fs.writeFileSync(path, content);
