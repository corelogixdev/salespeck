const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  performAction: (data) => ipcRenderer.send('perform-action', data),
  onActionResponse: (callback) => ipcRenderer.on('action-response', (event, response) => {
    callback(response);
  }),
});