const fs = require('fs');
let html = fs.readFileSync('form.html', 'utf8');
const match = html.match(/var FB_PUBLIC_LOAD_DATA_ = (\[.*?\]);\s*<\/script>/s);
if (match) {
  const data = JSON.parse(match[1]);
  console.log("Title:", data[1][8]);
  console.log("Description:", data[1][0]);
}
