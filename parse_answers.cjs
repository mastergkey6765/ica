const fs = require('fs');
let html = fs.readFileSync('form.html', 'utf8');
const match = html.match(/var FB_PUBLIC_LOAD_DATA_ = (\[.*?\]);\s*<\/script>/s);
if (match) {
  const data = JSON.parse(match[1]);
  const items = data[1][1];
  
  items.forEach((item, idx) => {
    if (item[3] === 2 || item[3] === 4) { // Multiple choice or checkboxes
      if (item[4] && item[4][0] && item[4][0][1]) {
        console.log("Q:", item[1]);
        console.log("Feedback/Answers:", JSON.stringify(item[4][0]));
      }
    }
  });
}
