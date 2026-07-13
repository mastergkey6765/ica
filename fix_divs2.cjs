const fs = require('fs');
let code = fs.readFileSync('src/components/admin/CourseEditor.tsx', 'utf8');

code = code.replace(
  '              </div>\n            </div>\n          </div></div>\n          </div>\n        </div>',
  '              </div>\n            </div>\n          </div>\n        </div>'
);

fs.writeFileSync('src/components/admin/CourseEditor.tsx', code);
