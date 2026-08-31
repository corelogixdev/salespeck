const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  performAction: (data) => ipcRenderer.send('perform-action', data),
  onActionResponse: (callback) => ipcRenderer.on('action-response', (event, response) => {
    callback(response);
  }),
});

contextBridge.exposeInMainWorld('electron', {
    send: (channel, data) => {
        ipcRenderer.send(channel, data);
    },
    receive: (channel, func) => {
        ipcRenderer.on(channel, (event, ...args) => func(...args));
    },
    printPreview: () => {
        ipcRenderer.send('print-preview');
    },
    generateReportPdf: (url) => {
        ipcRenderer.send('generate-report-pdf', url);
    },
    onReportPdfGenerated: (func) => {
        ipcRenderer.on('report-pdf-generated', (event, ...args) => func(...args));
    },
    /**
     * Fetch list of system installed printers.
     */
    getPrinters: () => ipcRenderer.invoke('get-printers'),
    /**
     * Generate a PDF preview of the current window.
     * Returns { success: true, previewUrl: 'app-print://token' }
     */
    generatePrintPreview: () => ipcRenderer.invoke('generate-print-preview'),
    /**
     * Trigger native OS print or direct print for the current window with optional settings.
     */
    triggerPrint: (options) => ipcRenderer.invoke('trigger-print', options),
    /**
     * Print original content window from inside a print preview dialog.
     */
    triggerPrintOriginal: () => ipcRenderer.invoke('trigger-print-original'),
    /**
     * One-shot: generate PDF preview AND open the dedicated preview window.
     */
    openPrintPreviewWindow: () => ipcRenderer.invoke('open-print-preview-window'),
    /**
     * Open the given PDF file path in the system's default PDF viewer.
     */
    openPdfInViewer: (filePath) => ipcRenderer.invoke('open-pdf-in-viewer', filePath),
    /**
     * Native folder picker (returns absolute path or null if cancelled).
     */
    selectDirectory: (defaultPath) => ipcRenderer.invoke('select-directory', defaultPath),
    /**
     * Reveal a path in the OS file manager.
     */
    openPath: (targetPath) => ipcRenderer.invoke('open-path', targetPath),
});