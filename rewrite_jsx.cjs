const fs = require('fs');
let code = fs.readFileSync('src/components/admin/CourseEditor.tsx', 'utf8');

// There are invalid characters. I will strip them!
code = code.replace(/\\n/g, '\n');
code = code.replace(/\\'/g, "'");

// wait, the error is probably because the previous sed -i 's/\\n/\n/g' did not work as expected
// I'll just restore everything from scratch if I could.
fs.writeFileSync('src/components/admin/CourseEditor.tsx', code);
