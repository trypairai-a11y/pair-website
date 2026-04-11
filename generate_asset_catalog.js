const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath, callback);
    } else {
      callback(filePath);
    }
  });
}

const imageExtensions = /\.(png|jpg|jpeg|gif|webp|svg|riv)$/i;
const assets = {};
let totalCount = 0;

walkDir('public', (filePath) => {
  if (imageExtensions.test(filePath)) {
    const relativePath = filePath.replace(/^public\//, '');
    const dir = path.dirname(relativePath);
    
    if (!assets[dir]) {
      assets[dir] = [];
    }
    
    assets[dir].push(path.basename(relativePath));
    totalCount++;
  }
});

// Sort directories
const sortedDirs = Object.keys(assets).sort();

let markdown = `# Asset Catalog\n\n**Total Assets:** ${totalCount}\n\n`;
markdown += `## Summary by Directory\n\n`;
markdown += `| Directory | Count |\n`;
markdown += `|-----------|-------|\n`;

sortedDirs.forEach(dir => {
  const count = assets[dir].length;
  const displayDir = dir === '.' ? 'root' : dir;
  markdown += `| \`${displayDir}\` | ${count} |\n`;
});

markdown += `\n## Detailed Asset List\n\n`;

sortedDirs.forEach(dir => {
  const displayDir = dir === '.' ? 'root' : dir;
  markdown += `### ${displayDir}\n\n`;
  
  assets[dir].sort().forEach(file => {
    const fullPath = dir === '.' ? `public/${file}` : `public/${dir}/${file}`;
    markdown += `- \`${fullPath}\`\n`;
  });
  
  markdown += `\n`;
});

fs.writeFileSync('ASSET_CATALOG.md', markdown);
console.log(`Catalog generated: ${totalCount} assets`);
