const fs = require('fs');
const content = fs.readFileSync('src/components/admin/CourseEditor.tsx', 'utf8');
console.log(content.match(/const \[questions, setQuestions\] = useState[\s\S]*?\);/)[0]);
