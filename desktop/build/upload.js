require('dotenv').config();
const { execSync } = require('child_process');
const fs = require('fs');
const config = require('../installEnv.js');

// Get CI_PROJECT_ID from .settings file
const CI_PROJECT_ID = config.CI_PROJECT_ID;
// Get GITLAB_TOKEN from .env file (dev credentials only, never in .settings)
const GITLAB_TOKEN = process.env.GITLAB_TOKEN;

if (!CI_PROJECT_ID) {
  console.error('Error: CI_PROJECT_ID is not defined in .settings file.');
  process.exit(1);
}

if (!GITLAB_TOKEN) {
  console.error('Error: GITLAB_TOKEN is not defined in .env file.');
  process.exit(1);
}

console.log('Uploading executable...');
// Requires GitLab generic package folder: packages/generic/stitchcore/release
// Create it once in the project Package Registry if the first upload fails.
const packageBase = `https://gitlab.com/api/v4/projects/${CI_PROJECT_ID}/packages/generic/stitchcore/release`;
execSync(`curl --verbose --header "PRIVATE-TOKEN: ${GITLAB_TOKEN}" --upload-file dist/stitchcore.exe "${packageBase}/stitchcore.exe"`, {stdio: 'inherit'});

console.log('Uploading latest.yml...');
if (!fs.existsSync('dist/latest.yml')) {
  console.error('Error: latest.yml file is missing in the dist directory.');
  process.exit(1);
}
execSync(`curl --verbose --header "PRIVATE-TOKEN: ${GITLAB_TOKEN}" --upload-file dist/latest.yml "${packageBase}/latest.yml"`, {stdio: 'inherit'});

console.log('Upload complete.');
