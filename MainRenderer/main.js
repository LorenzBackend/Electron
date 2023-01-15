console.log('From main.js');
const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
require('@electron/remote/main').enable('@electron/remote')

let window1, window2;

function createWindow() {
  window1 = new BrowserWindow({
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
  }
  });
  window2 = new BrowserWindow({
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      nodeIntegrationInWorker: true
  }
  });

  window1.loadURL(
    url.format({
      pathname: path.join(__dirname, "one.html"),
      protocol: "file",
      slashes: true,
    })
  );

  window2.loadURL(
    url.format({
      pathname: path.join(__dirname, "two.html"),
      protocol: "file",
      slashes: true,
    })
  );

window1.webContents.openDevTools();
window2.webContents.openDevTools();

  window1.on("closed", () => {
    window = null;
  })

  window2.on("closed", () => {
    window = null;
  })
}


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
