const fs = require('fs');
const path = 'src/components/admin/CourseEditor.tsx';
let content = fs.readFileSync(path, 'utf8');

const targetStr = `            ))}
          </div>
        </div>
<div className="flex justify-end pt-6 border-t border-gray-100 mt-6">`;
const replacementStr = `            ))}
          </div>
        </div>
        </div>
<div className="flex justify-end pt-6 border-t border-gray-100 mt-6">`;

content = content.replace(targetStr, replacementStr);
fs.writeFileSync(path, content);
