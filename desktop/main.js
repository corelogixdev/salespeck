const fs = require('fs');
const os = require('os');
const path = require('path');
require('dotenv').config();
const { app, BrowserWindow, ipcMain, dialog, shell, Menu, protocol } = require('electron');
// Defer autoUpdater requirement to after app is ready or inside a try-catch
let autoUpdater;
try {
  autoUpdater = require('electron-updater').autoUpdater;
} catch (e) {
  console.error('AutoUpdater load error:', e.message);
}
const config = require('./installEnv.js'); // Link to the Express app
const logi = require('./utils/logi.js');
const { getLogDirectory } = require('./utils/logi.js');
const prismaStartupBootstrap = require('./utils/prismaStartupBootstrap');

// ---------------------------------------------------------------------------
// Custom Print Preview — Protocol & Temp File Tracking
// ---------------------------------------------------------------------------
protocol.registerSchemesAsPrivileged([
  { scheme: 'app-print', privileges: { secure: true, standard: true, supportFetchAPI: true } }
]);

const previewTokenMap = new Map();
const printPreviewTempFiles = new Set();

function cleanupTempPdf(filePath) {
  if (!filePath) return;
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      printPreviewTempFiles.delete(filePath);
      logi('[PrintPreview] Cleaned up temp PDF:', filePath);
    }
  } catch (err) {
    logi('[PrintPreview] Failed to cleanup temp PDF:', err.message);
  }
}

function cleanupAllTempPdfs() {
  logi(`[PrintPreview] Cleaning up ${printPreviewTempFiles.size} temp PDF(s)...`);
  for (const filePath of Array.from(printPreviewTempFiles)) {
    cleanupTempPdf(filePath);
  }
  previewTokenMap.clear();
}

// Aggressive cleanup on app quit
app.on('before-quit', cleanupAllTempPdfs);
app.on('will-quit', cleanupAllTempPdfs);

// app.setAppLogsPath();
//log starting app and date time to log file
logi('Starting OpenMenu Desktop...');
logi('Date:', new Date().toISOString());

// Read package.json to get the version
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json')));
process.env.npm_package_version = packageJson.version;


// Now require models after configuring the database path
// const db = require('./models');

// require('electron-reload')(__dirname, {
//   electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
// });

let mainWindow = null;
const singleInstanceLock = app.requestSingleInstanceLock();

function buildStartupErrorDetail(error) {
  const rawMessage = error?.message || String(error);
  const compactMessage = rawMessage.replace(/\s+/g, ' ').trim();

  if (compactMessage.includes('no such table')) {
    return `Database setup failed.\n\n${compactMessage}\n\nTry opening the logs folder for the full startup trace.`;
  }

  if (compactMessage.includes('Database migration failed')) {
    return `Database migration failed during startup.\n\n${compactMessage}\n\nTry opening the logs folder for the full startup trace.`;
  }

  return compactMessage;
}

async function showStartupErrorDialog(error) {
  const rawMessage = error?.message || String(error);
  const logDir = getLogDirectory();
  const detail = buildStartupErrorDetail(error);

  logi('Startup bootstrap failed:', rawMessage);

  const result = await dialog.showMessageBox({
    type: 'error',
    title: 'Startup Failed',
    message: 'OpenMenu could not start.',
    detail: `${detail}\n\nLogs folder:\n${logDir}`,
    buttons: ['Open Logs Folder', 'Close'],
    defaultId: 0,
    cancelId: 1,
    noLink: true,
  });

  if (result.response === 0) {
    try {
      fs.mkdirSync(logDir, { recursive: true });
      await shell.openPath(logDir);
    } catch (openError) {
      logi('Failed to open logs folder:', openError.message || openError);
    }
  }
}

if (!singleInstanceLock) {
  app.quit();
}

app.on('second-instance', () => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }
    mainWindow.focus();
  }
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 900,
    icon: path.join(__dirname, 'assets', 'img', 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false, // Disable Node.js integration in renderer process
      contextIsolation: true, // Enable context isolation
      // sandbox: false // important for print preview to work properly, as it needs to access the filesystem for temp PDFs
    },
    // remove the menu bar
    //autoHideMenuBar: true,
  });

  // Handle new window creation (like _blank targets) - always reuse main window
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.loadURL(url);
    }
    return { action: 'deny' }; // Prevent creation of additional BrowserWindows
  });

  // ---------------------------------------------------------------------------
  // Custom Print Preview — intercept ALL print attempts reliably
  // ---------------------------------------------------------------------------
  // Strategy A: before-input-event (synchronous preventDefault)
  mainWindow.webContents.on('before-input-event', (event, input) => {
    // Print shortcut
    const isPrintShortcut = (input.control || input.meta) && input.key.toLowerCase() === 'p';
    if (isPrintShortcut && !input.alt && !input.shift) {
      event.preventDefault();
      setImmediate(() => {
        generateAndShowPreview(mainWindow).catch((err) => {
          logi('[PrintPreview] Ctrl+P preview failed:', err.message);
          dialog.showErrorBox('Print Preview Failed', err.message || 'Could not generate preview.');
        });
      });
    }

    // DevTools shortcuts (F12 or Ctrl+Shift+I)
    const isF12 = input.key === 'F12';
    const isCtrlShiftI = input.control && input.shift && input.key.toLowerCase() === 'i';
    
    if ((isF12 || isCtrlShiftI) && input.type === 'keyDown') {
      mainWindow.webContents.toggleDevTools();
    }
  });

  // Strategy B: inject a renderer-side guard on every page load.
  // This catches window.print() calls and Ctrl+P when before-input-event fails.
  mainWindow.webContents.on('dom-ready', () => {
    mainWindow.webContents.executeJavaScript(`
      (function() {
        if (window.__printPreviewGuardInstalled) return;
        window.__printPreviewGuardInstalled = true;

        // Override window.print() so any code that calls it gets our preview
        var originalPrint = window.print;
        window.print = function() {
          if (window.electron && window.electron.openPrintPreviewWindow) {
            window.electron.openPrintPreviewWindow().catch(function(err) {
              console.error('Print preview failed:', err);
            });
          } else {
            originalPrint.apply(this, arguments);
          }
        };

        // Keyboard guard for Ctrl+P / Cmd+P
        document.addEventListener('keydown', function(e) {
          if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
            e.preventDefault();
            e.stopPropagation();
            if (window.electron && window.electron.openPrintPreviewWindow) {
              window.electron.openPrintPreviewWindow().catch(function(err) {
                console.error('Print preview failed:', err);
              });
            }
          }
        }, true);
      })();
    `).catch(() => {});
  });

  //to open dev tools
  //win.webContents.openDevTools();
  const serverUrl = `${config.SERVER_IP || 'localhost'}:${config.port || 3000}`;
  mainWindow.loadURL(`http://${serverUrl}`); // Serve Express on localhost:3000
  ipcMain.on('close-app', () => {
    mainWindow.close();
  });
  return mainWindow;
}


// Listen for IPC messages from the renderer process
ipcMain.on('perform-action', (event, arg) => {
  // Here you can execute any logic or code you want in the main process
  // For example, you might want to send a response back
  if (arg.message === 'close-app') {
    console.log('Closing the app...');
    app.quit();
  }
  event.reply('action-response', 'Action completed successfully!');
});

ipcMain.on('switch-server', async (event, serverIp) => {
  try {
    // Update SERVER_IP in .settings file
    config.updateSetting('SERVER_IP', serverIp);
    logi('Switching server to:', serverIp);
    const existingWindows = BrowserWindow.getAllWindows();
    let win = createWindow();
    // await new Promise(resolve => setTimeout(resolve, 1500));
    existingWindows.forEach(window => {
      window.close();
    });
    win.focus();
    logi('Server switched to:', serverIp);
  } catch (error) {
    logi('Error switching server:', error.message);
  }
});

// Focus lock for barcode scanning - prevents window minimize and preserves maximize state
let focusLockActive = false;
let focusLockTimer = null;
let wasMaximized = false;

ipcMain.on('lock-window-focus', (event) => {
  if (!mainWindow || mainWindow.isDestroyed()) return;

  focusLockActive = true;

  // Clear any existing timer
  if (focusLockTimer) {
    clearTimeout(focusLockTimer);
  }

  // Remember if window was maximized before locking
  wasMaximized = mainWindow.isMaximized();

  // Keep window focused and on top during scanning
  if (!mainWindow.isVisible()) {
    mainWindow.show();
  }
  if (mainWindow.isMinimized()) {
    mainWindow.restore();
  }

  // Restore maximized state if it was maximized
  if (wasMaximized && !mainWindow.isMaximized()) {
    mainWindow.maximize();
  }

  mainWindow.focus();
  mainWindow.setAlwaysOnTop(true, 'screen-saver');

  // Auto-release lock after 2 seconds of no activity
  focusLockTimer = setTimeout(() => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.setAlwaysOnTop(false);
      focusLockActive = false;
    }
  }, 2000);
});

ipcMain.on('unlock-window-focus', (event) => {
  if (!mainWindow || mainWindow.isDestroyed()) return;

  focusLockActive = false;
  if (focusLockTimer) {
    clearTimeout(focusLockTimer);
    focusLockTimer = null;
  }
  mainWindow.setAlwaysOnTop(false);
});

// Maximize window on request (e.g., after login)
ipcMain.on('maximize-window', (event) => {
  if (!mainWindow || mainWindow.isDestroyed()) return;
  mainWindow.maximize();
});

/**
 * IPC: generate-print-preview
 * Generates a PDF of the sender window, saves it to temp, and returns
 * a secure app-print:// URL that can be loaded into an iframe.
 */
ipcMain.handle('generate-print-preview', async (event) => {
  const senderWindow = BrowserWindow.fromWebContents(event.sender);
  if (!senderWindow || senderWindow.isDestroyed()) {
    throw new Error('Sender window not available');
  }

  try {
    const pdfPath = path.join(
      os.tmpdir(),
      `openmenu-preview-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.pdf`
    );

    const data = await senderWindow.webContents.printToPDF({
      marginsType: 1,
      printBackground: true,
      preferCSSPageSize: true,
    });

    fs.writeFileSync(pdfPath, data);
    printPreviewTempFiles.add(pdfPath);

    const token = `preview-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    previewTokenMap.set(token, pdfPath);

    // Auto-expire after 10 minutes
    setTimeout(() => {
      previewTokenMap.delete(token);
      cleanupTempPdf(pdfPath);
    }, 10 * 60 * 1000);

    const previewUrl = `app-print://${token}`;
    logi('[PrintPreview] Generated:', previewUrl);
    return { success: true, previewUrl };
  } catch (err) {
    logi('[PrintPreview] Generation failed:', err.message);
    throw new Error(err.message || 'Could not generate print preview.');
  }
});

/**
 * IPC: trigger-print
 * Opens the native OS print dialog for the sender window.
 */
ipcMain.handle('trigger-print', async (event) => {
  const senderWindow = BrowserWindow.fromWebContents(event.sender);
  if (!senderWindow || senderWindow.isDestroyed()) {
    throw new Error('Sender window not available');
  }
  try {
    await senderWindow.webContents.print({
      silent: false,
      printBackground: true,
      preferCSSPageSize: true,
    });
    return { success: true };
  } catch (err) {
    throw new Error(err.message || 'Print failed or was cancelled.');
  }
});

/**
 * IPC: trigger-print-original
 * Called from a preview window to print the ORIGINAL content window
 * (the one that generated the preview), not the preview window itself.
 */
ipcMain.handle('trigger-print-original', async (event) => {
  const previewWin = BrowserWindow.fromWebContents(event.sender);
  if (!previewWin || previewWin.isDestroyed()) {
    throw new Error('Preview window not available');
  }

  const originalId = previewWin._originalWindowId;
  if (!originalId) {
    throw new Error('Original window reference not found');
  }

  const originalWin = BrowserWindow.fromId(originalId);
  if (!originalWin || originalWin.isDestroyed()) {
    throw new Error('Original window is no longer available');
  }

  try {
    await originalWin.webContents.print({
      silent: false,
      printBackground: true,
      preferCSSPageSize: true,
    });
    return { success: true };
  } catch (err) {
    throw new Error(err.message || 'Print failed or was cancelled.');
  }
});

/**
 * IPC: close-preview-window
 * Allows a dedicated preview window to close itself.
 */
ipcMain.on('close-preview-window', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win && !win.isDestroyed()) win.close();
});

/**
 * Open a dedicated print-preview window and load the given app-print:// URL.
 * This is a helper; renderer pages can also call generatePrintPreview()
 * and then ask the main process to open the window.
 */
/**
 * Shared helper: generate PDF from a window and open the preview window.
 */
async function generateAndShowPreview(sourceWindow) {
  const pdfPath = path.join(
    os.tmpdir(),
    `openmenu-preview-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.pdf`
  );

  logi('[PrintPreview] Generating PDF to:', pdfPath);

  const data = await sourceWindow.webContents.printToPDF({
    marginsType: 1,
    printBackground: true,
    preferCSSPageSize: true,
  });

  fs.writeFileSync(pdfPath, data);
  printPreviewTempFiles.add(pdfPath);

  logi('[PrintPreview] PDF generated, size:', data.length);
  openPrintPreviewWindow(sourceWindow, data, pdfPath);
}

function openPrintPreviewWindow(parentWindow, pdfBuffer, filePath) {
  const previewWin = new BrowserWindow({
    width: 900,
    height: 1100,
    parent: parentWindow || undefined,
    title: 'Print Preview',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  if (parentWindow && !parentWindow.isDestroyed()) {
    previewWin._originalWindowId = parentWindow.id;
  }

  // Embed the PDF as a base64 data URI inside the iframe.
  // This avoids file:// CORS issues and custom protocol complexity.
  const pdfBase64 = pdfBuffer.toString('base64');
  const pdfDataUrl = 'data:application/pdf;base64,' + pdfBase64;
  const safePath = (filePath || '').replace(/\\/g, '\\\\').replace(/"/g, '\\"');

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Print Preview</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f0f2f5;height:100vh;display:flex;flex-direction:column;overflow:hidden}
  .toolbar{background:#fff;border-bottom:1px solid #d1d5db;padding:10px 16px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-shrink:0}
  .toolbar-title{font-size:15px;font-weight:600;color:#111827}
  .btn{padding:6px 14px;border:1px solid #d1d5db;border-radius:6px;background:#fff;color:#374151;font-size:13px;font-weight:500;cursor:pointer;transition:all .15s ease}
  .btn:hover:not(:disabled){background:#f9fafb;border-color:#9ca3af}
  .btn:disabled{opacity:.55;cursor:not-allowed}
  .btn-primary{background:#2563eb;color:#fff;border-color:#2563eb}
  .btn-primary:hover:not(:disabled){background:#1d4ed8;border-color:#1d4ed8}
  .preview-container{flex:1;padding:16px;overflow:auto;display:flex;justify-content:center;background:#e5e7eb}
  iframe{width:100%;max-width:850px;height:100%;border:none;background:#fff;box-shadow:0 4px 6px -1px rgba(0,0,0,.1);border-radius:4px}
</style>
</head>
<body>
<div class="toolbar">
  <div class="toolbar-title">📄 Print Preview</div>
  <div>
    <button id="btnPrint" class="btn btn-primary">🖨️ Print</button>
    <button id="btnClose" class="btn">Close</button>
  </div>
</div>
<div class="preview-container">
  <iframe id="pdfFrame" src="${pdfDataUrl}"></iframe>
</div>
<script>
  document.getElementById('btnPrint').addEventListener('click', function() {
    if (window.electron && window.electron.openPdfInViewer) {
      window.electron.openPdfInViewer("${safePath}").catch(function(err) {
        alert('Could not open PDF viewer: ' + (err.message || 'Unknown error'));
      });
    } else {
      alert('Preview API not available');
    }
  });
  document.getElementById('btnClose').addEventListener('click', function() {
    if (window.electron && window.electron.send) {
      window.electron.send('close-preview-window');
    } else {
      window.close();
    }
  });
</script>
</body>
</html>`;
  previewWin.loadURL('data:text/html;base64,' + Buffer.from(html).toString('base64'));

  return previewWin;
}

/**
 * IPC: open-print-preview-window
 * One-shot: generate PDF + open preview window.
 */
ipcMain.handle('open-print-preview-window', async (event) => {
  const senderWindow = BrowserWindow.fromWebContents(event.sender);
  if (!senderWindow || senderWindow.isDestroyed()) {
    throw new Error('Sender window not available');
  }

  try {
    await generateAndShowPreview(senderWindow);
    return { success: true };
  } catch (err) {
    logi('[PrintPreview] Generation failed:', err.message);
    throw new Error(err.message || 'Could not generate print preview.');
  }
});

/**
 * IPC: open-pdf-in-viewer
 * Opens the temp PDF in the system's default PDF viewer.
 * This gives the user a real print preview + print dialog on Windows.
 */
ipcMain.handle('open-pdf-in-viewer', async (event, filePath) => {
  if (!filePath || !fs.existsSync(filePath)) {
    throw new Error('PDF file not found');
  }
  try {
    const result = await shell.openPath(filePath);
    if (result) {
      logi('[PrintPreview] openPath returned:', result);
    }
    return { success: true };
  } catch (err) {
    throw new Error(err.message || 'Could not open PDF viewer.');
  }
});

ipcMain.on('generate-report-pdf', async (event, url) => {
  let hiddenWin;
  try {
    hiddenWin = new BrowserWindow({
      show: false,
      width: 1200,
      height: 800,
      webPreferences: {
        contextIsolation: true,
        nodeIntegration: false,
      }
    });

    const serverUrl = `${config.SERVER_IP || 'localhost'}:${config.port || 3000}`;
    const absoluteUrl = (url && String(url).startsWith('http')) ? url : `http://${serverUrl}${url || ''}`;

    await hiddenWin.loadURL(absoluteUrl);
    // Give a short delay for fonts/styles to settle
    await new Promise(resolve => setTimeout(resolve, 800));

    const data = await hiddenWin.webContents.printToPDF({
      marginsType: 1,
      printBackground: true,
      preferCSSPageSize: true,
      pageSize: 'A4',
    });

    const tempPdfDir = path.join(os.tmpdir(), 'openmenu-pdfs');
    try { fs.mkdirSync(tempPdfDir, { recursive: true }); } catch (e) {}
    const fileName = `report-${Date.now()}.pdf`;
    const pdfPath = path.join(tempPdfDir, fileName);
    fs.writeFileSync(pdfPath, data);

    event.reply('report-pdf-generated', { success: true, url: `/temp-pdfs/${fileName}` });
  } catch (err) {
    logi('Generate report PDF error:', err.message);
    event.reply('report-pdf-generated', { success: false, error: err.message || 'Could not generate PDF.' });
  } finally {
    if (hiddenWin && !hiddenWin.isDestroyed()) {
      hiddenWin.close();
    }
  }
});

app.whenReady().then(async () => {
  try {
    await prismaStartupBootstrap();
    require('./server/app'); // Keep server startup after DB bootstrap.

    // Register custom protocol handler for serving PDF previews to renderer iframes
    protocol.handle('app-print', async (request) => {
      const url = new URL(request.url);
      const token = url.hostname;
      const filePath = previewTokenMap.get(token);
      if (filePath && fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath);
        return new Response(data, {
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Length': data.length,
          },
        });
      }
      return new Response('PDF not found', { status: 404 });
    });

    createWindow();

    // Remove the default menu bar in ALL modes.
    // The default Electron menu has a Ctrl+P Print accelerator that bypasses
    // before-input-event and opens the broken native print dialog on Windows.
    Menu.setApplicationMenu(null);
  } catch (error) {
    await showStartupErrorDialog(error);
    app.quit();
  }

  // Get update URL from .settings file (runtime config)
  const updateUrl = config.update_url;

  if (!updateUrl) {
    logi('Warning: Update URL not configured. Auto-updates disabled.');
    return;
  }

  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = false;
  autoUpdater.logger = require('electron-log');
  autoUpdater.logger.transports.file.level = 'debug';

  // Suppress 404 errors in electron-log
  const originalError = autoUpdater.logger.error;
  autoUpdater.logger.error = function (...args) {
    const message = args.join(' ');
    // Don't log 404 errors - they're expected when update server is not available
    if (message.includes('404') || message.includes('Not Found')) {
      return;
    }
    return originalError.apply(this, args);
  };

  // Enable update checking in development mode (for testing)
  // This allows testing updates even when app is not packed
  if (!app.isPackaged) {
    autoUpdater.forceDevUpdateConfig = true;
  }

  const updaterConfig = {
    provider: 'generic',
    url: updateUrl
  };

  // Only add token if provided in process.env (from .env if developer created it)
  // installEnv.js never touches .env, but if dotenv.config() was called elsewhere,
  // we can use it here
  if (process.env.GITLAB_TOKEN) {
    updaterConfig.requestHeaders = {
      'PRIVATE-TOKEN': process.env.GITLAB_TOKEN
    };
  }

  autoUpdater.setFeedURL(updaterConfig);
  logi(`Current version: ${packageJson.version}`);
  logi(`Update URL: ${updateUrl}`);

  // Check for updates - errors will be handled by the error event handler
  // Wrap in promise catch to prevent unhandled rejections
  try {
    const updateCheck = autoUpdater.checkForUpdatesAndNotify();
    if (updateCheck && typeof updateCheck.catch === 'function') {
      updateCheck.catch((error) => {
        // Error is already logged by the error event handler
        // This just prevents unhandled promise rejection warnings
        // Suppress 404 and dev-app-update.yml errors as they're expected
        const errorMsg = error.message || '';
        if (!errorMsg.includes('404') &&
          !errorMsg.includes('Not Found') &&
          !(errorMsg.includes('dev-app-update.yml') && errorMsg.includes('ENOENT'))) {
          logi('Update check promise rejected:', errorMsg || error);
        }
      });
    }
  } catch (error) {
    logi('Failed to initiate update check:', error.message);
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// In development, hot-reload renderer when EJS templates change
if (!app.isPackaged) {
  const viewsDir = path.join(__dirname, 'views');
  try {
    fs.watch(viewsDir, { recursive: true }, (eventType, filename) => {
      if (!filename) return;
      if (filename.endsWith('.ejs') && mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.reload();
      }
    });
  } catch (err) {
    logi('EJS hot-reload watcher error:', err.message);
  }
}

autoUpdater.on('error', (error) => {
  const errorMsg = error.message || String(error);
  
  // Suppress common expected network errors
  if (errorMsg.includes('404') || errorMsg.includes('Not Found') || 
     (errorMsg.includes('dev-app-update.yml') && errorMsg.includes('ENOENT'))) {
    return;
  }

  logi('Auto-updater error:', errorMsg);
  
  if (errorMsg.includes('EPERM')) {
    logi('Permission error: Application lacks write permissions for updates.');
  } else if (errorMsg.includes('ENOENT')) {
    logi('File not found during update check.');
  }
});

autoUpdater.on('checking-for-update', () => {
  logi('Checking for update...');
});

autoUpdater.on('update-available', (info) => {
  logi('Update available:');
  logi(info);
  const options = {
    type: 'question',
    buttons: ['Download Now', 'Do Not Download'],
    defaultId: 0,
    title: 'Update Available',
    message: 'A new version of openmenu is available. Do you want to download it now?',
    detail: 'You can choose to download the update now or skip it.'
  };

  dialog.showMessageBox(null, options).then((response) => {
    if (response.response === 0) {
      autoUpdater.downloadUpdate();
    } else {
      logi('User chose not to download the update.');
    }
  });
});

autoUpdater.on('update-not-available', (info) => {
  logi('Update not available:');
  logi(info);
});

autoUpdater.on('update-downloaded', (info) => {
  logi('Update downloaded:');
  logi(info);
  const options = {
    type: 'question',
    buttons: ['Install Now', 'Later'],
    defaultId: 0,
    title: 'Update Available',
    message: 'A new version of openmenu is available. Do you want to install it now?',
    detail: 'The update will be installed the next time you restart the application if you choose "Later".'
  };
  const appDir = path.join(app.getPath('exe'), '..'); // Get the app directory
  logi('appDir:', appDir);
  dialog.showMessageBox(null, options).then((response) => {
    if (response.response === 0) {
      try {
        logi('quitAndInstall new version');
        //C:\Users\IT LAND\AppData\Local\Programs\openmenu

        // Remove old files manually
        //deleteOldFiles(appDir); // This function will delete the old files

        // delete all files from the directory
        fs.readdir(appDir, (err, files) => {
          if (!err) {
            for (const file of files) {
              fs.unlink(path.join(appDir, file), err => {
                if (err) { }
              });
            }
          }
        });
        setTimeout(() => {
          autoUpdater.quitAndInstall(false, true); // Explicitly quit and install
        }, 2000);
        // app.quit();
      } catch (err) {
        logi('Error during quitAndInstall:', err.message);
      }
    }
  });
});

// Global Safety Nets to prevent silent hangs/crashes
process.on('uncaughtException', (error) => {
  logi('CRITICAL: Uncaught Exception:', error.message || error);
  logi(error.stack);
  // We don't quit immediately to allow the user to see the hang/error if possible
});

process.on('unhandledRejection', (reason, promise) => {
  logi('CRITICAL: Unhandled Rejection at:', promise, 'reason:', reason);
});

// Remove redundant error handler on line 477
