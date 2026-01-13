/**
 * All-in-One Update Testing Script
 * 
 * This script automates the entire local update testing process:
 * 1. Builds the app
 * 2. Sets up local update server
 * 3. Copies files automatically
 * 4. Provides instructions
 * 
 * Usage: node test-update.js [version]
 * Example: node test-update.js 1.0.8
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

const PROJECT_ROOT = path.join(__dirname, '..');
const UPDATE_DIR = path.join(__dirname, 'local-update-server');
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

// Step 3: Setup update server directory
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
    { src: 'latest.yml', dest: 'latest.yml' }
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
    let filePath = path.join(UPDATE_DIR, req.url === '/' ? 'latest.yml' : req.url);
    
    // Security: prevent directory traversal
    filePath = path.normalize(filePath);
    if (!filePath.startsWith(UPDATE_DIR)) {
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
  log('\n1. Modify main.js (temporarily for testing):', 'yellow');
  log('   Change line ~111 from:', 'yellow');
  log('   url: `https://gitlab.com/api/v4/projects/...`', 'yellow');
  log('   To:', 'yellow');
  log('   url: "http://localhost:8000"', 'green');
  log('\n2. Run your app:', 'yellow');
  log('   Option A - Already installed: Just launch the installed app', 'cyan');
  log('   Option B - Dev mode: npm run dev (in another terminal)', 'cyan');
  log('   Option C - Install now: npm run build → install dist/openmenu.exe', 'cyan');
  log('\n3. Keep THIS server running while testing!', 'yellow');
  log('   The app will check this server for updates', 'cyan');
  log('\n4. To test an update:', 'yellow');
  log('   - Press Ctrl+C to stop this server', 'cyan');
  log('   - Run: node test-update.js 1.0.8 (with new version)', 'cyan');
  log('   - Server restarts automatically', 'cyan');
  log('   - Your app will detect the update!', 'cyan');
  log('\n5. Remember to revert main.js after testing!', 'red');
  log('\n' + '='.repeat(60), 'blue');
  log(`\n📦 Current Version: ${currentVersion}`, 'cyan');
  log(`📡 Update Server: http://localhost:${PORT}`, 'cyan');
  log(`📁 Files Location: ${UPDATE_DIR}`, 'cyan');
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
