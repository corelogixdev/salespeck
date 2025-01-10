const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');
const expressApp = require('./server/app'); // Link to the Express app
const config = require('./config.js'); // Link to the Express app
const logi = require('./utils/logi.js');


//log starting app and date time to log file
logi('Starting OpenMenu Desktop...');
logi('Date:', new Date().toISOString());

// Read package.json to get the version
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json')));
process.env.npm_package_version = packageJson.version;

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
  //win.webContents.openDevTools();
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
  const projectId = process.env.CI_PROJECT_ID;

  if (!projectId) {
    logi('Error: CI_PROJECT_ID is not defined in the environment variables.');
    return;
  }
  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = false;
  autoUpdater.logger = require('electron-log');
  autoUpdater.logger.transports.file.level = 'debug';

  autoUpdater.setFeedURL({
    provider: 'generic',
    url: `https://gitlab.com/api/v4/projects/${projectId}/packages/generic/openmenu-desktop/release`,
    requestHeaders: {
      'PRIVATE-TOKEN': process.env.GITLAB_TOKEN
    }
  });
  logi(`Current version: ${packageJson.version}`);
  autoUpdater.checkForUpdatesAndNotify();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

autoUpdater.on('error', (error) => {
  logi('Error in auto-updater:', error);
  if (error.message.includes('EPERM')) {
    logi('Permission error: Please ensure the application has write permissions to the specified directory.');
  } else if (error.message.includes('ENOENT')) {
    logi('File not found error: Please check the file paths and ensure the files exist.');
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
    message: 'A new version of OpenMenu is available. Do you want to download it now?',
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
    message: 'A new version of OpenMenu is available. Do you want to install it now?',
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
        
        autoUpdater.quitAndInstall(false, true); // Explicitly quit and install
      } catch (err) {
        logi('Error during quitAndInstall:', err.message);
      }
    }
  });
});

autoUpdater.on('error', (error) => {
  logi('Update error:');
  logi(error);
  dialog.showErrorBox('Update Failed', 'The update could not be installed. Please try again.');
});

// Function to delete old files
function deleteOldFiles(directory) {
  try {
    // Get all files in the directory
    const files = fs.readdirSync(directory);
    
    // Loop through and remove each file
    files.forEach((file) => {
      const filePath = path.join(directory, file);
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        // If it's a directory, delete recursively
        deleteOldFiles(filePath);
      } else {
        // If it's a file, delete it
        fs.unlinkSync(filePath);
        logi(`Deleted file: ${filePath}`);
      }
    });
  } catch (err) {
    logi('Error deleting old files:', err.message);
  }
}
