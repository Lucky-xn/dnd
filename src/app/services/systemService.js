import { getDB } from "../db/sqlite.js";

export function addSystem(system) {
  const db = getDB();
  const stmt = db.prepare(`
    INSERT INTO sistems (name, description) 
    VALUES (@name, @description)
  `);
  return stmt.run(system);
}

export function getAllSystems() {
  const db = getDB();
  const stmt = db.prepare(`SELECT * FROM sistems`);
  return stmt.all();
}

export function getSystemById(id) {
  const db = getDB();
  const stmt = db.prepare(`SELECT * FROM sistems WHERE id = ?`);
  return stmt.get(id);
}

export function updateSystem(id, system) {
  const db = getDB();
  const stmt = db.prepare(`
    UPDATE sistems 
    SET name = @name, description = @description 
    WHERE id = @id
  `);
  return stmt.run({ ...system, id });
}

export function deleteSystem(id) {
  const db = getDB();
  const stmt = db.prepare(`DELETE FROM sistems WHERE id = ?`);
  return stmt.run(id);
}