import { app, BrowserWindow } from "electron";
import { fileURLToPath } from "url";
import { dirname } from "path";

import path from "path";
import initDB from "./src/app/db/sqlite.js";

import "./src/app/hendlers/characters.js";
import "./src/app/hendlers/selectFileImg.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 1700,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.js"),
      webSecurity: false,
    },
  });

  win.loadURL("http://localhost:5173");
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  initDB();
  createWindow();
});
