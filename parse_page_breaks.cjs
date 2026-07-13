const fs = require('fs');
let html = fs.readFileSync('form.html', 'utf8');
const match = html.match(/var FB_PUBLIC_LOAD_DATA_ = (\[.*?\]);\s*<\/script>/s);
if (match) {
  const data = JSON.parse(match[1]);
  const formMetadata = data[1];
  
  // Try to find sections
  // In a Google Form payload, `data[1][8]` or something similar might contain pages.
  console.log("data[1] length:", data[1].length);
  // data[1][1] is the array of items.
  const items = data[1][1];
  items.forEach((item, index) => {
     if(item[3] === 8) {
         console.log("Section Header at index", index, item[1]);
     }
  });
}
