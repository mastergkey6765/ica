const fs = require('fs');
let code = fs.readFileSync('src/components/admin/CourseEditor.tsx', 'utf8');

if (!code.includes("type?: 'multiple_choice'")) {
    code = code.replace(
      "  sectionTitle?: string;",
      "  sectionTitle?: string;\n  type?: 'multiple_choice' | 'short_answer' | 'paragraph' | 'image' | 'video' | 'title';\n  imageUrl?: string;\n  videoUrl?: string;\n  description?: string;"
    );
}

fs.writeFileSync('src/components/admin/CourseEditor.tsx', code);
