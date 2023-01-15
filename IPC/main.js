const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
const ipc = electron.ipcMain;
const dialog = electron.dialog;

let window;

function createWindow() {
  window = new BrowserWindow({
    frame: false,
    show: false,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
    },
  });
  window.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file",
      slashes: true,
    })
  );

  window.on('ready-to-show', () => {
    window.show();
  })
  window.on("closed", () => {
    window = null;
  });
}

ipc.on('open-error-dialog', function(event) {
  dialog.showErrorBox('An error Message', 'Demo of an error Message');
  event.sender.send('opened-error-dialog', 'Main process opened the error dialog')
})
app.on("ready", createWindow);

app.on("active", () => {
  if (window === null) {
    createWindow();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
