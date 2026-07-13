const fs = require('fs');
const path = 'src/components/admin/CourseEditor.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  /import { Loader2, ArrowLeft, Plus, Trash2, GripVertical } from 'lucide-react';/,
  `import { Loader2, ArrowLeft, Plus, Trash2, GripVertical, ChevronUp, ChevronDown } from 'lucide-react';`
);

fs.writeFileSync(path, content);
