/**
 * All-in-One Update Testing Script
 *
 * This script automates the entire local update testing process:
 * 1. Builds the app
 * 2. Copies update files to project root
 * 3. Starts a local HTTP server
 *
 * Usage: node test-update.js [version]
 * Example: node test-update.js 1.0.8
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

const PROJECT_ROOT = __dirname;
// Keep update files in project root for simplicity
const UPDATE_DIR = PROJECT_ROOT;
const DIST_DIR = path.join(PROJECT_ROOT, 'dist');
const PORT = 8000;

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step, message) {
  log(`\n[${step}] ${message}`, 'cyan');
}

// Step 1: Update version if provided
function updateVersion(newVersion) {
  if (!newVersion) return;

  logStep('1', `Updating version to ${newVersion}...`);
  try {
    const packageJsonPath = path.join(PROJECT_ROOT, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const oldVersion = packageJson.version;
    packageJson.version = newVersion;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
    log(`✓ Version updated: ${oldVersion} → ${newVersion}`, 'green');
  } catch (error) {
    log(`✗ Failed to update version: ${error.message}`, 'red');
    process.exit(1);
  }
}

// Step 2: Build the app
function buildApp() {
  logStep('2', 'Building the application...');
  try {
    execSync('npm run build', { stdio: 'inherit', cwd: PROJECT_ROOT });
    log('✓ Build completed successfully!', 'green');
  } catch (error) {
    log('✗ Build failed!', 'red');
    process.exit(1);
  }
}

// Step 3: Setup update server directory (project root)
function setupUpdateServer() {
  logStep('3', 'Setting up local update server...');

  if (!fs.existsSync(UPDATE_DIR)) {
    fs.mkdirSync(UPDATE_DIR, { recursive: true });
    log(`✓ Created directory: ${UPDATE_DIR}`, 'green');
  }
}

// Step 4: Copy build files
function copyBuildFiles() {
  logStep('4', 'Copying build files to update server...');

  const filesToCopy = [
    { src: 'openmenu.exe', dest: 'openmenu.exe' },
    { src: 'latest.yml', dest: 'latest.yml' },
    { src: 'latest.yml', dest: 'dev-app-update.yml' } // For development mode (Electron dev config)
  ];

  let copied = 0;
  filesToCopy.forEach(({ src, dest }) => {
    const srcPath = path.join(DIST_DIR, src);
    const destPath = path.join(UPDATE_DIR, dest);

    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      const stats = fs.statSync(destPath);
      log(`✓ Copied ${dest} (${(stats.size / 1024).toFixed(2)} KB)`, 'green');
      copied++;
    } else {
      log(`⚠ File not found: ${src}`, 'yellow');
    }
  });

  if (copied === 0) {
    log('✗ No files copied! Build might have failed.', 'red');
    process.exit(1);
  }

  return copied;
}

// Step 5: Start HTTP server
function startServer() {
  logStep('5', `Starting local update server on port ${PORT}...`);

  const server = http.createServer((req, res) => {
    // Parse URL and remove query parameters (e.g., ?noCache=xxx)
    let requestedPath = req.url.split('?')[0]; // Remove query string

    // Handle root path
    if (requestedPath === '/' || requestedPath === '') {
      requestedPath = '/latest.yml';
    }

    // Remove leading slash for path.join
    const cleanPath = requestedPath.startsWith('/') ? requestedPath.substring(1) : requestedPath;
    let filePath = path.join(UPDATE_DIR, cleanPath);

    // Security: prevent directory traversal
    filePath = path.normalize(filePath);
    const normalizedUpdateDir = path.normalize(UPDATE_DIR);

    // Use resolve to ensure consistent path comparison on Windows
    const resolvedFilePath = path.resolve(filePath);
    const resolvedUpdateDir = path.resolve(normalizedUpdateDir);

    if (!resolvedFilePath.startsWith(resolvedUpdateDir)) {
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

    const contentType = contentTypes[ext] || 'application/octet-stream';
    const stat = fs.statSync(filePath);

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stat.size,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });

    if (req.method === 'OPTIONS') {
      res.end();
      return;
    }

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      log(`\n✗ Port ${PORT} is already in use!`, 'red');
      log('   Stop the other server or change PORT in the script.', 'yellow');
    } else {
      log(`\n✗ Server error: ${err.message}`, 'red');
    }
    process.exit(1);
  });

  server.listen(PORT, () => {
    log(`✓ Server running at: http://localhost:${PORT}`, 'green');
    showInstructions();
  });

  // Graceful shutdown
  process.on('SIGINT', () => {
    log('\n\n👋 Shutting down server...', 'yellow');
    server.close(() => {
      log('✓ Server stopped.', 'green');
      process.exit(0);
    });
  });

  return server;
}

// Show instructions
function showInstructions() {
  const packageJson = JSON.parse(fs.readFileSync(path.join(PROJECT_ROOT, 'package.json'), 'utf8'));
  const currentVersion = packageJson.version;

  log('\n' + '='.repeat(60), 'blue');
  log('🚀 UPDATE SERVER READY!', 'green');
  log('='.repeat(60), 'blue');
  log('\n⚠️  IMPORTANT: This is the UPDATE SERVER only!', 'yellow');
  log('   Your app runs separately (in another terminal or installed)', 'yellow');
  log('\n📋 Next Steps:', 'cyan');
  log('\n1. Temporarily change update URL in main.js:', 'yellow');
  log('   //const updateUrl = config.update_url;', 'yellow');
  log('   const updateUrl = \"http://localhost:8000\";', 'green');
  log('\n2. Run your app:', 'yellow');
  log('   Option A - Already installed: launch the installed app', 'cyan');
  log('   Option B - Dev mode: npm run dev (in another terminal)', 'cyan');
  log('   Option C - Install now: npm run build → install dist/openmenu.exe', 'cyan');
  log('\n3. Keep THIS server running while testing!', 'yellow');
  log('   The app will check this server for updates', 'cyan');
  log('\n4. To test another update:', 'yellow');
  log('   - Press Ctrl+C to stop this server', 'cyan');
  log('   - Run: node test-update.js 1.0.8 (with new version)', 'cyan');
  log('   - Server restarts automatically', 'cyan');
  log('   - Your app will detect the new version!', 'cyan');
  log('\n5. After testing, revert main.js:', 'red');
  log('   const updateUrl = config.update_url;', 'green');
  log('   //const updateUrl = \"http://localhost:8000\";', 'yellow');
  log('\n' + '='.repeat(60), 'blue');
  log(`\n📦 Current Version: ${currentVersion}`, 'cyan');
  log(`📡 Update Server: http://localhost:${PORT}`, 'cyan');
  log(`📁 Files Location (root): ${UPDATE_DIR}`, 'cyan');
  log('\n💡 TIP: Keep this terminal open! Server must stay running.', 'yellow');
  log('⏹️  Press Ctrl+C to stop the server\n', 'yellow');
}

// Main execution
function main() {
  const args = process.argv.slice(2);
  const newVersion = args[0];

  log('\n' + '='.repeat(60), 'blue');
  log('🔧 UPDATE TESTING AUTOMATION', 'cyan');
  log('='.repeat(60), 'blue');

  try {
    // Step 1: Update version if provided
    if (newVersion) {
      updateVersion(newVersion);
    }

    // Step 2: Build
    buildApp();

    // Step 3: Setup server directory
    setupUpdateServer();

    // Step 4: Copy files
    copyBuildFiles();

    // Step 5: Start server
    startServer();

  } catch (error) {
    log(`\n✗ Error: ${error.message}`, 'red');
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { main };

