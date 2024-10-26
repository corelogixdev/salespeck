const { app, BrowserWindow } = require('electron');
const path = require('path');
const expressApp = require('./server/app'); // Link to the Express app
const config = require('./config.js'); // Link to the Express app

require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true, // Enable Node.js in Electron renderer process
    },
  });

  win.loadURL('http://localhost:'+config.port); // Serve Express on localhost:3000
}

app.whenReady().then(() => {
  expressApp.listen(3000, () => {
    console.log('Express server listening on http://localhost:'+config.port);
  });
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
