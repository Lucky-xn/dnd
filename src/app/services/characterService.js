import { getDB } from "../db/sqlite.js";

export function addCharacter(personagem) {
  const db = getDB();
  const stmt = db.prepare(`
    INSERT INTO characters (img, name, race, class, origin, created_at) 
    VALUES (@img, @name, @race, @class, @origin, CURRENT_TIMESTAMP)
  `);
  const info = stmt.run(personagem);
  return info.lastInsertRowid;
}

export function getAllCharacters() {
  const db = getDB();
  const stmt = db.prepare(`
    SELECT * FROM characters
  `);
  return stmt.all();
}