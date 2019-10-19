const { app, BrowserWindow, globalShortcut } = require('electron')


function createWindow () {
  let win = new BrowserWindow({
    width: 800,
    height: 250,
    webPreferences: {
      devTools: false,
      nodeIntegration: true
    }
  })

  let webContents = win.webContents;
  webContents.on('did-finish-load', () => {
    webContents.setZoomFactor(1);
    webContents.setVisualZoomLevelLimits(1, 1);
    webContents.setLayoutZoomLevelLimits(0, 0);
  });

globalShortcut.register('F10', () => {
  win.webContents.send('running', true);
});

globalShortcut.register('F11', () => {
  win.webContents.send('running', false);
});

  // and load the index.html of the app.
  win.setMenu(null)
  win.setMaximizable(false)
  win.setResizable(false)
  win.loadFile('index.html');
}

app.on('ready', createWindow)