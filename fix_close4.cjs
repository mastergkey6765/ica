const fs = require('fs');
const path = 'src/pages/CoursePlayer.tsx';
let lines = fs.readFileSync(path, 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('                        ))}')) {
    if (lines[i-1].includes('</div>') && lines[i-2].includes('</div>')) {
      // We found the spot
      lines.splice(i, 0, '                          </div>');
      break;
    }
  }
}

fs.writeFileSync(path, lines.join('\n'));
