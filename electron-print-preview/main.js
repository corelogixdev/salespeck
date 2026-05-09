/**
 * Main Process — Print Preview Implementation
 * -------------------------------------------
 * Targets Electron v20+ with Promise-based APIs.
 * Uses a custom protocol (app-print://) to serve generated PDFs securely
 * into a renderer <iframe> without file:// cross-origin restrictions.
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const { app, BrowserWindow, ipcMain, protocol } = require('electron');

// =============================================================================
// 1. Register custom protocol BEFORE app is ready
// =============================================================================
protocol.registerSchemesAsPrivileged([
  { scheme: 'app-print', privileges: { secure: true, standard: true, supportFetchAPI: true } }
]);

// =============================================================================
// 2. Temp-file tracking & cleanup state
// =============================================================================
const previewTokenMap = new Map();   // token -> absoluteFilePath
const printPreviewTempFiles = new Set(); // all known temp PDFs

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,      // Security: keep Node out of renderer
      contextIsolation: true,      // Security: isolate preload context
      // sandbox: false // important for print preview to work properly, as it needs to access the filesystem for temp PDFs
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// =============================================================================
// 3. PDF Cleanup utilities
// =============================================================================

/**
 * Delete a single temp PDF and untrack it.
 */
function cleanupTempPdf(filePath) {
  if (!filePath) return;
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      printPreviewTempFiles.delete(filePath);
      console.log('[PrintPreview] Cleaned up temp PDF:', filePath);
    }
  } catch (err) {
    console.error('[PrintPreview] Failed to cleanup temp PDF:', err.message);
  }
}

/**
 * Delete ALL tracked temp PDFs. Called on app quit.
 */
function cleanupAllTempPdfs() {
  console.log(`[PrintPreview] Cleaning up ${printPreviewTempFiles.size} temp PDF(s)...`);
  for (const filePath of Array.from(printPreviewTempFiles)) {
    cleanupTempPdf(filePath);
  }
  previewTokenMap.clear();
}

// =============================================================================
// 4. App lifecycle — protocol handler + window creation
// =============================================================================

app.whenReady().then(() => {
  /**
   * Handle app-print://<token> requests from the renderer iframe.
   * Looks up the token, reads the temp PDF from disk, and streams it back.
   */
  protocol.handle('app-print', async (request) => {
    const url = new URL(request.url);
    const token = url.hostname; // app-print://token
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
});

// =============================================================================
// 5. IPC Handlers
// =============================================================================

/**
 * IPC: generate-print-preview
 * ----------------------------
 * Generates a PDF of the calling window via webContents.printToPDF(),
 * writes it to os.tmpdir(), creates a secure token, and returns a
 * custom-protocol URL that the renderer can load into an <iframe>.
 */
ipcMain.handle('generate-print-preview', async (event) => {
  const senderWindow = BrowserWindow.fromWebContents(event.sender);
  if (!senderWindow || senderWindow.isDestroyed()) {
    throw new Error('Sender window not available');
  }

  try {
    // Unique filename to prevent collisions across processes
    const pdfPath = path.join(
      os.tmpdir(),
      `electron-preview-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.pdf`
    );

    // Generate PDF buffer from the current renderer view
    const data = await senderWindow.webContents.printToPDF({
      marginsType: 1,        // 0=default, 1=no margins, 2=minimum …
      printBackground: true, // Critical: includes CSS backgrounds & colors
      preferCSSPageSize: true,
    });

    // Persist buffer to temp directory
    fs.writeFileSync(pdfPath, data);
    printPreviewTempFiles.add(pdfPath);

    // Create a secure one-time token for this file
    const token = `preview-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    previewTokenMap.set(token, pdfPath);

    // Auto-expire token and file after 10 minutes to prevent disk bloat
    setTimeout(() => {
      previewTokenMap.delete(token);
      cleanupTempPdf(pdfPath);
    }, 10 * 60 * 1000);

    const previewUrl = `app-print://${token}`;
    console.log('[PrintPreview] Generated:', previewUrl);
    return { success: true, previewUrl };
  } catch (err) {
    console.error('[PrintPreview] Generation failed:', err.message);
    throw new Error(err.message || 'Could not generate print preview.');
  }
});

/**
 * IPC: trigger-print
 * -------------------
 * Opens the native OS print dialog for the calling window.
 * Honors CSS @media print styles because printBackground is true.
 */
ipcMain.handle('trigger-print', async (event) => {
  const senderWindow = BrowserWindow.fromWebContents(event.sender);
  if (!senderWindow || senderWindow.isDestroyed()) {
    throw new Error('Sender window not available');
  }
  try {
    await senderWindow.webContents.print({
      silent: false,           // Show OS dialog
      printBackground: true,   // Respect background-color / images
      preferCSSPageSize: true,
    });
    return { success: true };
  } catch (err) {
    throw new Error(err.message || 'Print failed or was cancelled.');
  }
});

/**
 * IPC: close-preview-window (optional helper)
 * Allows a dedicated preview window to request its own close.
 */
ipcMain.on('close-preview-window', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win && !win.isDestroyed()) {
    win.close();
  }
});

// =============================================================================
// 6. Global cleanup on application exit
// =============================================================================

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// Aggressive cleanup of temporary preview PDFs on app quit
app.on('before-quit', cleanupAllTempPdfs);
app.on('will-quit', cleanupAllTempPdfs);
