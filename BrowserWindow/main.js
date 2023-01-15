const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");

let window, dimWindow, colorWindow, framelessWindow;
let parentWindow, childWindow;

function createWindow() {
  /*
  window = new BrowserWindow();
  dimWindow = new BrowserWindow({width: 400, height: 400, maxWidth: 600, maxHeight: 600});
  colorWindow = new BrowserWindow({backgroundColor: '228b22'});
  framelessWindow = new BrowserWindow({backgroundColor: '800000', frame: false});
  */
  parentWindow = new BrowserWindow({title: 'Parent'});
  childWindow = new BrowserWindow({parent: parentWindow, title: 'Child', modal: true});

  /*
  window.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file",
      slashes: true,
    })
  );


  window.on("closed", () => {
    window = null;
  });
  */
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
