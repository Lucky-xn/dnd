import { getDB } from "../db/sqlite.js";

export function addCharacter(personagem) {
  const db = getDB();
  const stmt = db.prepare(`
    INSERT INTO characters (name, hp, race, ca) 
    VALUES (@nome, @hp, @raca, @ca)
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