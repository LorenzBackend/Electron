const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
const Menu = electron.Menu;

let window;

function createWindow() {
  window = new BrowserWindow({
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

  window.on("ready-to-show", () => {
    window.show();
  });
  window.on("closed", () => {
    window = null;
  });
}

app.on("ready", function () {
  createWindow();
  const template = [
    {
      label: "demo",
      submenu: [
        {
          label: "submenu1",
        },
        {
          label: "submenu1",
        },
      ],
    },
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
});

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
