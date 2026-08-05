/**
 * Local installed update test helper.
 *
 * This script:
 * 1. Temporarily bumps package.json version for the update build
 * 2. Builds the installer
 * 3. Copies update files to the local update server folder
 * 4. Temporarily points the installed app .settings update_url to localhost
 * 5. Starts a local HTTP update server
 * 6. Restores local workspace files and installed app settings on exit
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');
const os = require('os');
const dotenv = require('dotenv');

const PROJECT_ROOT = __dirname;
const UPDATE_DIR = PROJECT_ROOT;
const DIST_DIR = path.join(PROJECT_ROOT, 'dist');
const PACKAGE_JSON_PATH = path.join(PROJECT_ROOT, 'package.json');
const INSTALLED_SETTINGS_PATH = path.join(process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming'), 'stitchcore', '.settings');
const LOCAL_UPDATE_URL = 'http://localhost:8000';
const PORT = 8000;

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

let originalPackageJsonContent = null;
let originalInstalledSettingsContent = null;
let installedSettingsExisted = false;
let cleanupDone = false;

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step, message) {
  log(`\n[${step}] ${message}`, 'cyan');
}

function backupFilesOnce() {
  if (originalPackageJsonContent === null && fs.existsSync(PACKAGE_JSON_PATH)) {
    originalPackageJsonContent = fs.readFileSync(PACKAGE_JSON_PATH, 'utf8');
  }

  if (originalInstalledSettingsContent === null) {
    installedSettingsExisted = fs.existsSync(INSTALLED_SETTINGS_PATH);
    if (installedSettingsExisted) {
      originalInstalledSettingsContent = fs.readFileSync(INSTALLED_SETTINGS_PATH, 'utf8');
    }
  }
}

function restorePackageVersionOnly() {
  if (originalPackageJsonContent === null) {
    return;
  }

  fs.writeFileSync(PACKAGE_JSON_PATH, originalPackageJsonContent);
  log('✓ Restored package.json version to original (for local workspace)', 'green');
}

function restoreInstalledSettings() {
  try {
    if (originalInstalledSettingsContent !== null) {
      fs.mkdirSync(path.dirname(INSTALLED_SETTINGS_PATH), { recursive: true });
      fs.writeFileSync(INSTALLED_SETTINGS_PATH, originalInstalledSettingsContent);
      log('✓ Restored installed app .settings file', 'green');
      return;
    }

    if (!installedSettingsExisted && fs.existsSync(INSTALLED_SETTINGS_PATH)) {
      fs.unlinkSync(INSTALLED_SETTINGS_PATH);
      log('✓ Removed temporary installed app .settings file', 'green');
    }
  } catch (error) {
    log(`⚠ Failed to restore installed app .settings: ${error.message}`, 'yellow');
  }
}

function cleanupAndExit(exitCode = 0) {
  if (cleanupDone) {
    process.exit(exitCode);
  }

  cleanupDone = true;
  try {
    restorePackageVersionOnly();
    restoreInstalledSettings();
  } finally {
    process.exit(exitCode);
  }
}

function parseSettingsFile(content) {
  if (!content || !content.trim()) {
    return {};
  }

  return dotenv.parse(content);
}

function writeSettingsFile(settingsPath, settings) {
  const body = Object.entries(settings)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  fs.mkdirSync(path.dirname(settingsPath), { recursive: true });
  fs.writeFileSync(settingsPath, `${body}\n`);
}

function pointInstalledAppToLocalUpdateServer() {
  backupFilesOnce();
  try {
    const existingSettings = fs.existsSync(INSTALLED_SETTINGS_PATH)
      ? parseSettingsFile(fs.readFileSync(INSTALLED_SETTINGS_PATH, 'utf8'))
      : {};

    existingSettings.update_url = LOCAL_UPDATE_URL;
    writeSettingsFile(INSTALLED_SETTINGS_PATH, existingSettings);

    log(`✓ Updated installed app .settings update_url to ${LOCAL_UPDATE_URL}`, 'green');
    log(`  Installed settings path: ${INSTALLED_SETTINGS_PATH}`, 'cyan');
  } catch (error) {
    throw new Error(`Failed to update installed app .settings: ${error.message}`);
  }
}

function updateVersion(newVersion) {
  if (!newVersion) {
    return;
  }

  logStep('1', `Updating version to ${newVersion}...`);
  backupFilesOnce();

  const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));
  const oldVersion = packageJson.version;
  packageJson.version = newVersion;
  fs.writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(packageJson, null, 2) + '\n');
  log(`✓ Version updated: ${oldVersion} → ${newVersion}`, 'green');
}

function buildApp() {
  logStep('2', 'Building the application...');
  execSync('npm run build', { stdio: 'inherit', cwd: PROJECT_ROOT });
  log('✓ Build completed successfully!', 'green');
}

function setupUpdateServer() {
  logStep('3', 'Setting up local update server...');
  if (!fs.existsSync(UPDATE_DIR)) {
    fs.mkdirSync(UPDATE_DIR, { recursive: true });
  }
}

function copyBuildFiles() {
  logStep('4', 'Copying build files to update server...');

  const filesToCopy = [
    { src: 'stitchcore.exe', dest: 'stitchcore.exe' },
    { src: 'latest.yml', dest: 'latest.yml' },
    { src: 'latest.yml', dest: 'dev-app-update.yml' }
  ];

  let copied = 0;
  for (const { src, dest } of filesToCopy) {
    const srcPath = path.join(DIST_DIR, src);
    const destPath = path.join(UPDATE_DIR, dest);

    if (!fs.existsSync(srcPath)) {
      log(`⚠ File not found: ${src}`, 'yellow');
      continue;
    }

    fs.copyFileSync(srcPath, destPath);
    const stats = fs.statSync(destPath);
    log(`✓ Copied ${dest} (${(stats.size / 1024).toFixed(2)} KB)`, 'green');
    copied++;
  }

  if (copied === 0) {
    throw new Error('No build files were copied. Build may have failed.');
  }
}

function createUpdateServer() {
  return http.createServer((req, res) => {
    let requestedPath = req.url.split('?')[0];
    if (requestedPath === '/' || requestedPath === '') {
      requestedPath = '/latest.yml';
    }

    const cleanPath = requestedPath.startsWith('/') ? requestedPath.slice(1) : requestedPath;
    const filePath = path.resolve(path.join(UPDATE_DIR, cleanPath));
    const resolvedUpdateDir = path.resolve(UPDATE_DIR);

    if (!filePath.startsWith(resolvedUpdateDir)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }

    if (!fs.existsSync(filePath)) {
      res.writeHead(404);
      res.end('File not found');
      return;
    }

    const ext = path.extname(filePath);
    const contentTypes = {
      '.yml': 'text/yaml',
      '.yaml': 'text/yaml',
      '.exe': 'application/octet-stream',
      '.blockmap': 'application/octet-stream'
    };

    const stat = fs.statSync(filePath);
    res.writeHead(200, {
      'Content-Type': contentTypes[ext] || 'application/octet-stream',
      'Content-Length': stat.size,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });

    if (req.method === 'OPTIONS') {
      res.end();
      return;
    }

    fs.createReadStream(filePath).pipe(res);
  });
}

function showInstructions() {
  const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));

  log('\n' + '='.repeat(60), 'blue');
  log('🚀 LOCAL INSTALLED UPDATE TEST READY!', 'green');
  log('='.repeat(60), 'blue');
  log('\nThe installed app is now pointed to the local update server.', 'yellow');
  log(`Installed app .settings: ${INSTALLED_SETTINGS_PATH}`, 'cyan');
  log(`Local update URL: ${LOCAL_UPDATE_URL}`, 'cyan');
  log('\nNext steps:', 'cyan');
  log('1. Close any dev app windows.', 'yellow');
  log('2. Open the installed StitchCore app.', 'yellow');
  log('3. Accept the update from 1.0.7 to the new version.', 'yellow');
  log('4. Reopen the app and verify migration + startup.', 'yellow');
  log('\nKeep this server terminal open during the test.', 'yellow');
  log(`\n📦 Workspace Version: ${packageJson.version}`, 'cyan');
  log(`📡 Update Server: ${LOCAL_UPDATE_URL}`, 'cyan');
  log(`📁 Files Location: ${UPDATE_DIR}`, 'cyan');
  log('\nPress Ctrl+C when finished. The script will restore the installed app update URL.\n', 'yellow');
}

function startServer() {
  logStep('5', `Starting local update server on port ${PORT}...`);
  const server = createUpdateServer();

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      log(`\n✗ Port ${PORT} is already in use!`, 'red');
      log('   Stop the other local update server or reuse it before starting a new one.', 'yellow');
    } else {
      log(`\n✗ Server error: ${error.message}`, 'red');
    }
    cleanupAndExit(1);
  });

  server.listen(PORT, () => {
    log(`✓ Server running at: ${LOCAL_UPDATE_URL}`, 'green');
    showInstructions();
  });

  process.on('SIGINT', () => {
    log('\n\nShutting down local update server...', 'yellow');
    server.close(() => {
      log('✓ Server stopped.', 'green');
      cleanupAndExit(0);
    });
  });
}

function main() {
  const args = process.argv.slice(2);
  const newVersion = args[0];

  log('\n' + '='.repeat(60), 'blue');
  log('🔧 LOCAL INSTALLED UPDATE TEST', 'cyan');
  log('='.repeat(60), 'blue');

  try {
    backupFilesOnce();
    if (newVersion) {
      updateVersion(newVersion);
    }

    buildApp();
    restorePackageVersionOnly();
    setupUpdateServer();
    copyBuildFiles();

    logStep('5', 'Pointing installed app to the local update server...');
    pointInstalledAppToLocalUpdateServer();

    startServer();
  } catch (error) {
    log(`\n✗ Error: ${error.message}`, 'red');
    cleanupAndExit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };
