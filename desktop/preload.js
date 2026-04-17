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
    }
});