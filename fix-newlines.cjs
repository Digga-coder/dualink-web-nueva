const fs = require('fs');
const path = require('path');

const files = [
  'src/sections/Navigation.tsx',
  'src/sections/Hero.tsx',
  'src/sections/Intro.tsx',
  'src/sections/Services.tsx',
  'src/sections/Process.tsx',
  'src/sections/Cases.tsx',
  'src/sections/Contact.tsx',
];

files.forEach(f => {
  const fullPath = path.join(process.cwd(), f);
  let content = fs.readFileSync(fullPath, 'utf8');
  // Replace literal \n (backslash + n) with actual newline in specific patterns
  content = content.replace(/'react'\\nimport/g, "'react'\nimport");
  content = content.replace(/'lucide-react'\\n/g, "'lucide-react'\n");
  content = content.replace(/'framer-motion'\\n/g, "'framer-motion'\n");
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('Fixed', f);
});
