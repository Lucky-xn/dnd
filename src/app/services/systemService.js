import { getDB } from "../db/sqlite.js";

export function addSystem(system) {
  const db = getDB();
  const stmt = db.prepare(`
    INSERT INTO systems (name, description) 
    VALUES (@name, @description)
  `);
  return stmt.run(system);
}

export function getAllSystems() {
  const db = getDB();
  const stmt = db.prepare(`SELECT * FROM systems`);
  return stmt.all();
}

export function getSystemById(id) {
  const db = getDB();
  const stmt = db.prepare(`SELECT * FROM systems WHERE id = ?`);
  return stmt.get(id);
}

export function updateSystem(id, system) {
  const db = getDB();
  const stmt = db.prepare(`
    UPDATE systems 
    SET name = @name, description = @description 
    WHERE id = @id
  `);
  return stmt.run({ ...system, id });
}

export function deleteSystem(id) {
  const db = getDB();
  const stmt = db.prepare(`DELETE FROM systems WHERE id = ?`);
  return stmt.run(id);
}