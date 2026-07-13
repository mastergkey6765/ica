const fs = require('fs');
const path = 'src/pages/CoursePlayer.tsx';
let content = fs.readFileSync(path, 'utf8');

// The original defaultQuestions array has a Bonus Question 1 and Bonus Question 2.
// Let's insert the section header before Bonus Question 1.
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

// We need to also remove the "section": "Bonus Questions" from the question itself, 
// since I earlier added it to BONUS Question 1 and BONUS Question 2 using add_sections.cjs!
// Wait, did I? Yes, I ran:
// `"section": "Bonus Questions",\n        "question": "BONUS Question 1`
content = content.replace(/"section": "Bonus Questions",\s*"question": "BONUS Question 1/g, '"question": "BONUS Question 1');
content = content.replace(/"section": "Bonus Questions",\s*"question": "BONUS Question 2/g, '"question": "BONUS Question 2');

fs.writeFileSync(path, content);
