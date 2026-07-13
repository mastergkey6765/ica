const fs = require('fs');
const path = 'src/pages/CoursePlayer.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  /    \{\n        "question": "BONUS Question 1:/,
  `    {
        "isSection": true,
        "sectionTitle": "Bonus Questions",
        "question": "",
        "options": [],
        "correctOption": 0
    },
    {
        "question": "BONUS Question 1:`
);

fs.writeFileSync(path, content);
