require('dotenv').config();
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '../dist');
const files = fs.readdirSync(distDir);

files.forEach(file => {
  const filePath = path.join(distDir, file);
  console.log(`Uploading ${file}...`);
  execSync(`curl --verbose --header "PRIVATE-TOKEN: ${process.env.GITLAB_TOKEN}" --upload-file ${filePath} "https://gitlab.com/api/v4/projects/${process.env.CI_PROJECT_ID}/packages/generic/openmenu/release/${file}"`, {stdio: 'inherit'});
});

console.log('Upload complete.');
