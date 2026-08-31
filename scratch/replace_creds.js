const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(srcDir);

let changedFiles = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  content = content.replace(/karunamoyeemasarada@gmail\.com/g, 'arnab@masarada.com');
  content = content.replace(/admin123456/g, 'ramakrishna@1998');
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    changedFiles++;
    console.log(`Updated: ${file}`);
  }
});

console.log(`\nSuccessfully updated ${changedFiles} files.`);
