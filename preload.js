const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // Expose APIs to renderer process if needed
});
