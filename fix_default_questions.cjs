const fs = require('fs');

const path = 'src/pages/CoursePlayer.tsx';
let content = fs.readFileSync(path, 'utf8');

// Find the start of defaultQuestions
const startIndex = content.indexOf('  export const defaultQuestions = [');
if (startIndex !== -1) {
  // Find the end of the array. It ends around line 380, before `const examQuestions = ` or `// Timer Effect`.
  // Wait, I can just use a regex or string replacement.
  
  // Actually, I can just remove `export ` from the inner one, and put it at the top level.
  // The easiest way is: 
  content = content.replace("  export const defaultQuestions = [", "  const defaultQuestions = [");
  
  // Now I will extract the whole array from "const defaultQuestions = [" to "];\n  // Timer Effect"
  // Wait, how does it end?
  // Let's find out how it ends.
}

fs.writeFileSync(path, content);
