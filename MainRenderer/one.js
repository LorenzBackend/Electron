console.log('From one.js');
const { BrowserWindow } = require('@electron/remote')
const path = require('path');
const url = require('url');

const newWindowBtn = document.getElementById('newWindowBtn');
newWindowBtn.addEventListener('click', function(event) {
   let window3 = new BrowserWindow({
        webPreferences: {
          contextIsolation: false,
          nodeIntegration: true,
          nodeIntegrationInWorker: true
      }
      });

      window3.loadURL(
        url.format({
          pathname: path.join(__dirname, "three.html"),
          protocol: "file",
          slashes: true,
        })
      );

      window3.webContents.openDevTools();
    
})