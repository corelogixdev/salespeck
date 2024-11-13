require('dotenv').config();
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');
const expressApp = require('./server/app'); // Link to the Express app
const config = require('./config.js'); // Link to the Express app
const logi = require('./utils/logi.js');
// require('electron-reload')(__dirname, {
//   electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
// });
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 900,
    //start max
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false, // Disable Node.js integration in renderer process
      contextIsolation: true, // Enable context isolation
    },
  });

  //to open dev tools
  win.webContents.openDevTools();
  win.loadURL('http://localhost:'+config.port); // Serve Express on localhost:3000
  ipcMain.on('close-app', () => {
    win.close();
  });

}

// Listen for IPC messages from the renderer process
ipcMain.on('perform-action', (event, arg) => {
  //console.log('Action received from frontend:', arg);
  // Here you can execute any logic or code you want in the main process
  // For example, you might want to send a response back
  if(arg.message === 'close-app') {
    console.log('Closing the app...');
    app.quit();
  }
  event.reply('action-response', 'Action completed successfully!');
});

app.whenReady().then(() => {
  createWindow();
  autoUpdater.setFeedURL({
    provider: 'generic',
    url: 'https://gitlab.com/atta_devgiant/openmenu-desktop/-/packages',
    requestHeaders: {
      'PRIVATE-TOKEN': process.env.GITLAB_TOKEN
    }
  });
  autoUpdater.checkForUpdatesAndNotify();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

autoUpdater.on('error', (error) => {
  logi('Error in auto-updater:', error);
});

autoUpdater.on('checking-for-update', () => {
  logi('Checking for update...');
});

autoUpdater.on('checking-for-update', () => {
  logi('Checking for update...');
});

autoUpdater.on('update-available', (info) => {
  logi('Update available:', info);
});

autoUpdater.on('update-not-available', (info) => {
  logi('Update not available:', info);
});

autoUpdater.on('update-downloaded', (info) => {
  logi('Update downloaded:', info);
  const options = {
    type: 'question',
    buttons: ['Install Now', 'Later'],
    defaultId: 0,
    title: 'Update Available',
    message: 'A new version of OpenMenu is available. Do you want to install it now?',
    detail: 'The update will be installed the next time you restart the application if you choose "Later".'
  };

  dialog.showMessageBox(null, options).then((response) => {
    if (response.response === 0) {
      autoUpdater.quitAndInstall();
    }
  });
});
