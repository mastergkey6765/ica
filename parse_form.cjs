const fs = require('fs');
let html = fs.readFileSync('form.html', 'utf8');

const match = html.match(/var FB_PUBLIC_LOAD_DATA_ = (\[.*?\]);\s*<\/script>/s);
if (match) {
  const data = JSON.parse(match[1]);
  const items = data[1][1];
  
  const parsedQuestions = [];
  
  items.forEach(item => {
    // 2 is multiple choice
    if (item[3] === 2) {
      const title = item[1];
      const optionsArray = item[4][0][1];
      const options = optionsArray.map(opt => opt[0]);
      parsedQuestions.push({
        question: title,
        options: options,
        correctOption: 0 // Will need manual or default correct answers
      });
    } else if (item[3] === 0) {
      // Short answer
    }
  });

  fs.writeFileSync('parsed_questions.json', JSON.stringify(parsedQuestions, null, 2));
  console.log("Parsed " + parsedQuestions.length + " multiple choice questions.");
} else {
  console.log("Failed to find data.");
}
