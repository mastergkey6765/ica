const fs = require('fs');
let html = fs.readFileSync('form.html', 'utf8');
const match = html.match(/var FB_PUBLIC_LOAD_DATA_ = (\[.*?\]);\s*<\/script>/s);
if (match) {
  const data = JSON.parse(match[1]);
  const items = data[1][1];
  
  items.forEach(item => {
    if (item[3] === 8) {
      console.log("Section Header:", item[1]);
    } else if (item[3] === 9) {
      console.log("Title/Description:", item[1]);
    } else if (item[3] !== 0 && item[3] !== 2 && item[3] !== 4) {
      console.log("Other:", item[3], item[1]);
    }
  });
}
