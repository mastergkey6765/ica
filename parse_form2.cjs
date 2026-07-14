const fs = require('fs');
let html = fs.readFileSync('form.html', 'utf8');
const match = html.match(/var FB_PUBLIC_LOAD_DATA_ = (\[.*?\]);\s*<\/script>/s);
if (match) {
  const data = JSON.parse(match[1]);
  const items = data[1][1];
  let c = 0;
  items.forEach(item => {
    // 2 is multiple choice, 0 is short answer
    if (item[3] === 2) {
      c++;
    } else if (item[3] === 0) {
      c++;
    } else if (item[3] === 4) { // check boxes
      c++;
    }
  });
  console.log("Total questions: " + c);
}
