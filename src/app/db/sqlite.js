import Database from "better-sqlite3";
import path from 'path';
import { app } from "electron";

import { createSchema } from "./schema.js";
import { seedInitialData } from "./seed.js";

let db;

export default function initDB() {
  if (db) {
    return db;
  }
  try {
    const userDataPath = app.getPath('userData');
    db = new Database(path.join(userDataPath, 'appdata.db'));

    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');

    createSchema(db);
    seedInitialData(db);

  } catch (error) {
    console.error("Error initializing database:", error);
  }
  return db;
}

export function getDB() {
  return db;
}