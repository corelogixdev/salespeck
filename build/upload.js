require('dotenv').config();
const { execSync } = require('child_process');
const fs = require('fs');

console.log('Uploading executable...');
execSync(`curl --verbose --header "PRIVATE-TOKEN: ${process.env.GITLAB_TOKEN}" --upload-file dist/openmenu.exe "https://gitlab.com/api/v4/projects/${process.env.CI_PROJECT_ID}/packages/generic/openmenu/release/openmenu.exe"`, {stdio: 'inherit'});

console.log('Uploading latest.yml...');
if (!fs.existsSync('dist/latest.yml')) {
  console.error('Error: latest.yml file is missing in the dist directory.');
  process.exit(1);
}
execSync(`curl --verbose --header "PRIVATE-TOKEN: ${process.env.GITLAB_TOKEN}" --upload-file dist/latest.yml "https://gitlab.com/api/v4/projects/${process.env.CI_PROJECT_ID}/packages/generic/openmenu/release/latest.yml"`, {stdio: 'inherit'});

console.log('Upload complete.');
