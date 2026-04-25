const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'app/page.js',
  'components/Sidebar.js',
  'components/DashboardStats.js',
  'components/TaskCard.js',
  'components/FilterBar.js',
  'components/TaskForm.js',
  'components/CategoryManager.js',
  'components/SearchBar.js',
  'components/TaskList.js'
];

const replacements = {
  // Backgrounds
  'bg-gray-50': 'bg-slate-50',
  'bg-gray-100': 'bg-slate-100',
  'bg-gray-200': 'bg-slate-200',
  'bg-gray-300': 'bg-slate-300',

  // Borders
  'border-gray-100': 'border-slate-200',
  'border-gray-200': 'border-slate-300',
  'border-gray-300': 'border-slate-400',

  // Text
  'text-gray-400': 'text-slate-500',
  'text-gray-500': 'text-slate-600',
  'text-gray-600': 'text-slate-700',
  'text-gray-700': 'text-slate-800',
  'text-gray-800': 'text-slate-900',
  'text-gray-900': 'text-slate-900',

  // Shadows
  'shadow-sm"': 'shadow-sm shadow-slate-200/50"',
  'shadow-sm hover:shadow-md': 'shadow-sm shadow-slate-200/50 hover:shadow-md hover:shadow-slate-200/50'
};

filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.log(`[!] File not found: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // We need to apply replacements carefully. Using regex to avoid partial words
  for (const [key, value] of Object.entries(replacements)) {
    // Escape string for regex
    const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedKey, 'g');
    content = content.replace(regex, value);
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[✓] Updated ${file}`);
  } else {
    console.log(`[-] No changes in ${file}`);
  }
});

console.log('Done!');
