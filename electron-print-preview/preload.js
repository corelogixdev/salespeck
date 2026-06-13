/**
 * Preload Script — Secure Context Bridge
 * --------------------------------------
 * Exposes ONLY the specific IPC methods the renderer needs.
 * No raw Node.js APIs, no fs, no ipcRenderer direct access.
 */

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  /**
   * Generate a PDF preview of the current window.
   * Invokes the main process and returns a Promise resolving to:
   *   { success: true, previewUrl: 'app-print://token' }
   * or rejects with an Error if generation fails.
   */
  generatePrintPreview: () => ipcRenderer.invoke('generate-print-preview'),

  /**
   * Trigger the native OS print dialog for the current window.
   * Returns a Promise resolving to { success: true }.
   */
  triggerPrint: () => ipcRenderer.invoke('trigger-print'),

  /**
   * Ask the main process to close the current BrowserWindow.
   * Useful for dedicated preview windows.
   */
  closePreviewWindow: () => ipcRenderer.send('close-preview-window'),
});
