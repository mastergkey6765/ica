const fs = require('fs');
let code = fs.readFileSync('src/pages/CoursePlayer.tsx', 'utf8');
const match = code.match(/export const defaultQuestions = \[([\s\S]*?)\n  \];/);
if (match) {
  // It's a JS array string
  const arrayStr = "[" + match[1] + "\n]";
  try {
    // Just parse it loosely or evaluate
    const evalCode = `module.exports = ${arrayStr}`;
    fs.writeFileSync('temp_q.cjs', evalCode);
    const q = require('./temp_q.cjs');
    q.forEach((q, i) => console.log(i + ": " + q.question.substring(0, 50)));
  } catch (e) { console.error(e) }
}
