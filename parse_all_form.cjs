const fs = require('fs');
let html = fs.readFileSync('form.html', 'utf8');
const match = html.match(/var FB_PUBLIC_LOAD_DATA_ = (\[.*?\]);\s*<\/script>/s);
if (match) {
  const data = JSON.parse(match[1]);
  const items = data[1][1];
  
  const parsedQuestions = [];
  
  items.forEach(item => {
    const title = item[1];
    if (item[3] === 2 || item[3] === 4) { // Multiple choice or checkboxes
      if (item[4] && item[4][0] && item[4][0][1]) {
        const optionsArray = item[4][0][1];
        const options = optionsArray.map(opt => opt[0]);
        // Let's check if the title has BONUS or Section like formatting
        let isSection = false;
        let qText = title;
        if (title.startsWith("BONUS")) {
          // It's a bonus question, maybe we should have added a section before it?
          // I will do this manually or via logic.
        }

        parsedQuestions.push({
          question: qText,
          options: options,
          correctOption: 0, // Will default to 0, need manual fixing if possible or leave it
          isSection: false
        });
      }
    } else if (item[3] === 0) { // Short answer
       // Not supported in this UI usually, skip or maybe just title?
       console.log("Short answer found: ", title);
    } else {
       // other types?
       console.log("Other type:", item[3], title);
    }
  });

  fs.writeFileSync('parsed_all_questions.json', JSON.stringify(parsedQuestions, null, 2));
  console.log("Parsed " + parsedQuestions.length + " multiple choice/checkbox questions.");
} else {
  console.log("Failed to find data.");
}
