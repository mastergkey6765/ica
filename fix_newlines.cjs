const fs = require('fs');
let code = fs.readFileSync('src/pages/CoursePlayer.tsx', 'utf8');

// The string literal that broke was "Question 9: ... "
// We can just fix the whole defaultQuestions array.
// Actually, it's easier to find double quoted strings with newlines and replace newlines with \\n.
code = code.replace(/"([^"]*)"/g, (match, p1) => {
    if (p1.includes('\\n')) {
        return '"' + p1.replace(/\\n/g, '\\\\n') + '"';
    }
    return match;
});

// Wait, the newlines inside the string are actual newlines now!
code = code.replace(/"([^"\\]*(?:\\.[^"\\]*)*)"/g, (match, p1) => {
    if (p1.includes('\n')) {
        return '"' + p1.replace(/\n/g, '\\n') + '"';
    }
    return match;
});

fs.writeFileSync('src/pages/CoursePlayer.tsx', code);
