const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  '<div className="flex flex-col min-h-screen relative w-full overflow-clip">',
  '<div className="flex flex-col min-h-screen relative w-full">'
);
code = code.replace(
  '<div className="flex flex-col min-h-screen relative w-full overflow-x-hidden">',
  '<div className="flex flex-col min-h-screen relative w-full">'
);

fs.writeFileSync('src/App.tsx', code);
