const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1500,
    height: 1000,
    icon: path.join(__dirname, 'assets', 'iconcar.png'),
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadURL('http://localhost:3001/register');
}

app.whenReady().then(() => {
  createWindow();
});
