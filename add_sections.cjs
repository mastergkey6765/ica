const fs = require('fs');
const path = 'src/pages/CoursePlayer.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  /"question": "BONUS Question 1/g,
  `"section": "Bonus Questions",\n        "question": "BONUS Question 1`
);
content = content.replace(
  /"question": "BONUS Question 2/g,
  `"section": "Bonus Questions",\n        "question": "BONUS Question 2`
);

fs.writeFileSync(path, content);
