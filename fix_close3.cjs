const fs = require('fs');
const path = 'src/pages/CoursePlayer.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  /                            <\/div>\n                          <\/div>\n                        \}\)\}/g,
  `                            </div>\n                          </div>\n                          </div>\n                        })}`
);

fs.writeFileSync(path, content);
