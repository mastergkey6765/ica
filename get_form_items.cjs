const fs = require('fs');
let html = fs.readFileSync('form.html', 'utf8');
const match = html.match(/var FB_PUBLIC_LOAD_DATA_ = (\[.*?\]);\s*<\/script>/s);
if (match) {
  const data = JSON.parse(match[1]);
  const items = data[1][1];
  
  let result = [];
  
  // Try to find section headers too. Sometimes sections are type 8. 
  // Let's just dump the raw items structure to see if there's any text representing sections.
  items.forEach(item => {
    result.push({
      type: item[3],
      title: item[1]
    });
  });
  
  fs.writeFileSync('form_all_items.json', JSON.stringify(result, null, 2));
}
