import { getDB } from "../db/slqite.js";

export function insertPersonagem(personagem) {
  const db = getDB();
  const stmt = db.prepare(`
    INSERT INTO personagens (nome, hp, raca, ca) 
    VALUES (@nome, @hp, @raca, @ca)
  `);
  const info = stmt.run(personagem);
  return info.lastInsertRowid;
}

export function getAllPersonagens() {
  const db = getDB();
  const stmt = db.prepare(`
    SELECT * FROM personagens
  `);
  return stmt.all();
}