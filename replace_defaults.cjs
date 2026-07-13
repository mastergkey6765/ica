const fs = require('fs');
const path = 'src/pages/CoursePlayer.tsx';
let content = fs.readFileSync(path, 'utf8');

const newQuestions = JSON.parse(fs.readFileSync('parsed_all_questions.json', 'utf8'));

// Format it to TS code
const replacement = `export const defaultQuestions: QuestionData[] = ` + JSON.stringify(newQuestions, null, 4) + `;`;

// Replace the old defaultQuestions
const startIndex = content.indexOf('export const defaultQuestions: QuestionData[] = [');
if (startIndex !== -1) {
  // find the end of the array
  let bracketCount = 0;
  let endIndex = -1;
  let started = false;
  for (let i = startIndex; i < content.length; i++) {
    if (content[i] === '[') {
      bracketCount++;
      started = true;
    } else if (content[i] === ']') {
      bracketCount--;
    }
    
    if (started && bracketCount === 0) {
      endIndex = i;
      break;
    }
  }
  
  if (endIndex !== -1) {
    const originalChunk = content.substring(startIndex, endIndex + 2); // include `];`
    content = content.replace(originalChunk, replacement);
    fs.writeFileSync(path, content);
    console.log("Successfully replaced defaultQuestions!");
  } else {
    console.log("Could not find the end of the defaultQuestions array.");
  }
} else {
  console.log("Could not find defaultQuestions array.");
}
