const fs = require('fs');
let code = fs.readFileSync('src/pages/CoursePlayer.tsx', 'utf8');

code = code.replace(
  "const [answers, setAnswers] = useState<Record<number, number>>({});",
  "const [answers, setAnswers] = useState<Record<number, any>>({});"
);

const submitExamLogic = `  const handleSubmitExam = async () => {
    if (!enrollment) return;
    
    // Check required fields
    const missingRequired = examQuestions.findIndex((q, index) => {
      if (q.isSection || q.type === 'title') return false;
      if (q.isRequired !== false) {
         const ans = answers[index];
         if (ans === undefined || ans === null || ans === '') return true;
      }
      return false;
    });

    if (missingRequired !== -1) {
      const qNum = examQuestions.slice(0, missingRequired).filter(qu => !qu.isSection && qu.type !== 'title').length + 1;
      alert(\`Please answer required question \${qNum} before submitting.\`);
      return;
    }

    setLoading(true);
    try {
      let totalPointsEarned = 0;
      let totalPossiblePoints = 0;
      
      examQuestions.forEach((q, index) => {
        if (!q.isSection && q.type !== 'title') {
           const points = q.points !== undefined ? q.points : 5;
           totalPossiblePoints += points;
           
           if (!q.type || q.type === 'multiple_choice') {
             if (answers[index] === q.correctOption) {
                 totalPointsEarned += points;
             }
           } else {
             // For text answers, if they answered something, give full points for now
             if (answers[index] && String(answers[index]).trim() !== '') {
                 totalPointsEarned += points;
             }
           }
        }
      });

      const score = totalPossiblePoints > 0 ? Math.round((totalPointsEarned / totalPossiblePoints) * 100) : 100;
      const passed = score >= 90; // 90% passing grade

      setExamScore(score);
      setExamPassed(passed);`;

code = code.replace(/  const handleSubmitExam = async \(\) => \{\n    if \(\!enrollment\) return;\n    setLoading\(true\);\n    try \{\n      let correctAnswers = 0;\n      examQuestions\.forEach\(\(q, index\) => \{\n        if \(answers\[index\] === q\.correctOption\) correctAnswers\+\+;\n      \}\);\n\n      const score = Math\.round\(\n        \(correctAnswers \/ actualQuestions\.length\) \* 100,\n      \);\n      const passed = score >= 70; \/\/ 70% passing grade\n      setExamScore\(score\);\n      setExamPassed\(passed\);/s, submitExamLogic);

fs.writeFileSync('src/pages/CoursePlayer.tsx', code);
