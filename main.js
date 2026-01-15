const path = require('path');
const fs = require('fs');
require('dotenv').config();
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
require('./server/app'); // DON'T REMOVE THIS. THIS LINKS TO THE EXPRESS APP
const { autoUpdater } = require('electron-updater');
const config = require('./installEnv.js'); // Link to the Express app
const logi = require('./utils/logi.js');

app.setAppLogsPath();
//log starting app and date time to log file
logi('Starting OpenMenu Desktop...');
logi('Date:', new Date().toISOString());

// Read package.json to get the version
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json')));
process.env.npm_package_version = packageJson.version;


// Now require models after configuring the database path
// const db = require('./models');

// require('electron-reload')(__dirname, {
//   electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
// });

let mainWindow = null;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false, // Disable Node.js integration in renderer process
      contextIsolation: true, // Enable context isolation
    },
    // remove the menu bar
    //autoHideMenuBar: true,
  });

  // Handle new window creation (like _blank targets)
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    // Create a new window
    const newWindow = new BrowserWindow({
      autoHideMenuBar: true,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: false,
        contextIsolation: true,
      }
    });

    // Maximize the window after it's created
    newWindow.maximize();
    newWindow.loadURL(url);

    return { action: 'deny' }; // Prevent default window creation since we created our own
  });


  //to open dev tools
  //win.webContents.openDevTools();
  const serverUrl = `${config.SERVER_IP || 'localhost'}:${config.port || 3000}`;
  mainWindow.loadURL(`http://${serverUrl}`); // Serve Express on localhost:3000
  ipcMain.on('close-app', () => {
    mainWindow.close();
  });
  return mainWindow;
}


// Listen for IPC messages from the renderer process
ipcMain.on('perform-action', (event, arg) => {
  // Here you can execute any logic or code you want in the main process
  // For example, you might want to send a response back
  if (arg.message === 'close-app') {
    console.log('Closing the app...');
    app.quit();
  }
  event.reply('action-response', 'Action completed successfully!');
});

ipcMain.on('switch-server', async (event, serverIp) => {
  try {
    // Update SERVER_IP in .settings file
    config.updateSetting('SERVER_IP', serverIp);
    logi('Switching server to:', serverIp);
    const existingWindows = BrowserWindow.getAllWindows();
    let win = createWindow();
    // await new Promise(resolve => setTimeout(resolve, 1500));
    existingWindows.forEach(window => {
      window.close();
    });
    win.focus();
    logi('Server switched to:', serverIp);
  } catch (error) {
    logi('Error switching server:', error.message);
  }
});

app.whenReady().then(() => {
  createWindow();

  // Get update URL from .settings file (runtime config)
  const updateUrl = config.update_url;
  //const updateUrl = "http://localhost:8000"; //local update server

  if (!updateUrl) {
    logi('Warning: Update URL not configured. Auto-updates disabled.');
    return;
  }

  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = false;
  autoUpdater.logger = require('electron-log');
  autoUpdater.logger.transports.file.level = 'debug';

  // Suppress 404 errors in electron-log
  const originalError = autoUpdater.logger.error;
  autoUpdater.logger.error = function (...args) {
    const message = args.join(' ');
    // Don't log 404 errors - they're expected when update server is not available
    if (message.includes('404') || message.includes('Not Found')) {
      return;
    }
    return originalError.apply(this, args);
  };

  // Enable update checking in development mode (for testing)
  // This allows testing updates even when app is not packed
  if (!app.isPackaged) {
    autoUpdater.forceDevUpdateConfig = true;
  }

  const updaterConfig = {
    provider: 'generic',
    url: updateUrl
  };

  // Only add token if provided in process.env (from .env if developer created it)
  // installEnv.js never touches .env, but if dotenv.config() was called elsewhere,
  // we can use it here
  if (process.env.GITLAB_TOKEN) {
    updaterConfig.requestHeaders = {
      'PRIVATE-TOKEN': process.env.GITLAB_TOKEN
    };
  }

  autoUpdater.setFeedURL(updaterConfig);
  logi(`Current version: ${packageJson.version}`);
  logi(`Update URL: ${updateUrl}`);

  // Check for updates - errors will be handled by the error event handler
  // Wrap in promise catch to prevent unhandled rejections
  try {
    const updateCheck = autoUpdater.checkForUpdatesAndNotify();
    if (updateCheck && typeof updateCheck.catch === 'function') {
      updateCheck.catch((error) => {
        // Error is already logged by the error event handler
        // This just prevents unhandled promise rejection warnings
        // Suppress 404 and dev-app-update.yml errors as they're expected
        const errorMsg = error.message || '';
        if (!errorMsg.includes('404') &&
          !errorMsg.includes('Not Found') &&
          !(errorMsg.includes('dev-app-update.yml') && errorMsg.includes('ENOENT'))) {
          logi('Update check promise rejected:', errorMsg || error);
        }
      });
    }
  } catch (error) {
    logi('Failed to initiate update check:', error.message);
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// In development, hot-reload renderer when EJS templates change
if (!app.isPackaged) {
  const viewsDir = path.join(__dirname, 'views');
  try {
    fs.watch(viewsDir, { recursive: true }, (eventType, filename) => {
      if (!filename) return;
      if (filename.endsWith('.ejs') && mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.reload();
      }
    });
  } catch (err) {
    logi('EJS hot-reload watcher error:', err.message);
  }
}

autoUpdater.on('error', (error) => {
  // Suppress 404 errors - they're expected when update server is not running
  if (error.message && (error.message.includes('404') || error.message.includes('Not Found'))) {
    // Silently ignore - update server might not be running
    return;
  }

  // Suppress dev-app-update.yml errors in development - file will be served by update server
  if (error.message && error.message.includes('dev-app-update.yml') && error.message.includes('ENOENT')) {
    // Silently ignore - this is expected, the file is served by the update server
    return;
  }

  logi('Error in auto-updater:', error);
  if (error.message && error.message.includes('EPERM')) {
    logi('Permission error: Please ensure the application has write permissions to the specified directory.');
  } else if (error.message && error.message.includes('ENOENT')) {
    logi('File not found error: Please check the file paths and ensure the files exist.');
  } else {
    logi('Update check failed:', error.message || error);
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
    message: 'A new version of openmenu is available. Do you want to download it now?',
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
    message: 'A new version of openmenu is available. Do you want to install it now?',
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

        // delete all files from the directory
        fs.readdir(appDir, (err, files) => {
          if (!err) {
            for (const file of files) {
              fs.unlink(path.join(appDir, file), err => {
                if (err) { }
              });
            }
          }
        });
        setTimeout(() => {
          autoUpdater.quitAndInstall(false, true); // Explicitly quit and install
        }, 2000);
        // app.quit();
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
