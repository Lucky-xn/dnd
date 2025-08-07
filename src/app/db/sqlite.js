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
      img TEXT,
      name TEXT,
      race TEXT,
      class TEXT,
      origin TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`).run();

    db.prepare(`CREATE TABLE IF NOT EXISTS characters_sheet (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      character_id INTEGER,
      level INTEGER,
      hp INTEGER,
      strength INTEGER,
      dexterity INTEGER,
      constitution INTEGER,
      intelligence INTEGER,
      wisdom INTEGER,
      charisma INTEGER,
      FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE
    )`).run();

    return db;
}

export function getDB() {
  return db;
}