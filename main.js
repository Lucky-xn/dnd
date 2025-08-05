import { app, BrowserWindow, ipcMain } from 'electron';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let db;

function createWindow() {
  const win = new BrowserWindow({
    width: 1700,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js')
    },
  });

  win.loadURL('http://localhost:5173');
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  const userDataPath = app.getPath('userData');
  db = new Database(path.join(userDataPath, 'appdata.db'));

  db.prepare(`CREATE TABLE IF NOT EXISTS itens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    quantidade INTEGER
  )`).run();

  db.prepare(`CREATE TABLE IF NOT EXISTS personagens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    hp INTEGER,
    raca TEXT,
    ca INTEGER
  )`).run();

  createWindow();
});

ipcMain.handle('add-personagem', (event, personagem) => {
  const stmt = db.prepare(`
    INSERT INTO personagens (nome, hp, raca, ca) 
    VALUES (@nome, @hp, @raca, @ca)
  `);
  const info = stmt.run(personagem);
  return info.lastInsertRowid;
});

ipcMain.handle('get-personagens', () => {
  const stmt = db.prepare(`
    SELECT * FROM personagens
  `);
  return stmt.all();
});