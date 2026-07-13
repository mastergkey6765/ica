const fs = require('fs');
let html = fs.readFileSync('new_form.html', 'utf8');
const match = html.match(/var FB_PUBLIC_LOAD_DATA_ = (\[.*?\]);\s*<\/script>/s);
if (match) {
  const data = JSON.parse(match[1]);
  const formMetadata = data[1];
  const items = data[1][1];
  items.forEach(item => {
    console.log("Type:", item[3], "Title:", item[1]);
  });
}
