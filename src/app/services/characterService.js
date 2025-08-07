import { getDB } from "../db/sqlite.js";

export function addCharacter(personagem) {
  const db = getDB();
  const stmt = db.prepare(`
    INSERT INTO personagens (nome, hp, raca, ca) 
    VALUES (@nome, @hp, @raca, @ca)
  `);
  const info = stmt.run(personagem);
  return info.lastInsertRowid;
}

export function getAllCharacters() {
  const db = getDB();
  const stmt = db.prepare(`
    SELECT * FROM personagens
  `);
  return stmt.all();
}