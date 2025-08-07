import Database from "better-sqlite3";
import path from 'path';
import { app } from "electron";

let db;

export default function initDB() {
   const userDataPath = app.getPath('userData');
    db = new Database(path.join(userDataPath, 'appdata.db'));
  
    db.prepare(`CREATE TABLE IF NOT EXISTS itens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      quantidade INTEGER
    )`).run();
  
    db.prepare(`CREATE TABLE IF NOT EXISTS characters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      hp INTEGER,
      race TEXT,
      ca INTEGER
    )`).run();

    return db;
}

export function getDB() {
  return db;
}