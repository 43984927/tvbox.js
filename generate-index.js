const fs = require('fs');
const path = require('path');

function generateDirectoryListing(dirPath, baseUrl = '') {
  let htmlContent = '<ul>';
  const entities = fs.readdirSync(dirPath);

  for (const entity of entities) {
    const fullPath = path.join(dirPath, entity);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      htmlContent += `<li><b>${entity}/</b>${generateDirectoryListing(fullPath, path.join(baseUrl, entity))}</li>`;
    } else {
      htmlContent += `<li><a href="${path.join(baseUrl, entity)}">${entity}</a></li>`;
    }
  }

  htmlContent += '</ul>';
  return htmlContent;
}

const startDir = '.';
const baseUrl = ''; // You can set the base URL here if needed
const indexHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Directory Index</title>
</head>
<body>
    <h1>Index of ${baseUrl}</h1>
    ${generateDirectoryListing(startDir, baseUrl)}
</body>
</html>`;

fs.writeFileSync(path.join(startDir, 'index.html'), indexHtmlContent);
console.log('Directory index generated successfully.');
