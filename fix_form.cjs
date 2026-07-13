const fs = require('fs');
let code = fs.readFileSync('src/components/admin/CourseEditor.tsx', 'utf8');

// I will just use regex to replace everything inside <form>...</form>
// Actually, it's safer to just replace the whole file with a correctly structured version.
// Wait, I can extract the parts:
// - grid (details)
// - learning outcomes
// - course content
// - exam questions

// Since I have access to the file, let me just fix the divs.
// Let's count divs from line 271 to the end.

