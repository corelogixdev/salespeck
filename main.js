const { app, BrowserWindow } = require('electron');
const path = require('path');
const expressApp = require('./server/app'); // Link to the Express app

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true, // Enable Node.js in Electron renderer process
    },
  });

  win.loadURL('http://localhost:3000'); // Serve Express on localhost:3000
}

app.whenReady().then(() => {
  expressApp.listen(3000, () => {
    console.log('Express server listening on http://localhost:3000');
  });
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
