const fs = require('fs');
let code = fs.readFileSync('src/pages/CoursePlayer.tsx', 'utf8');

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

const idxStart = code.indexOf('  const handleSubmitExam = async () => {');
if (idxStart !== -1) {
   const idxEnd = code.indexOf('      setExamPassed(passed);', idxStart);
   if (idxEnd !== -1) {
      code = code.substring(0, idxStart) + submitExamLogic + code.substring(idxEnd + '      setExamPassed(passed);'.length);
   }
}

fs.writeFileSync('src/pages/CoursePlayer.tsx', code);
