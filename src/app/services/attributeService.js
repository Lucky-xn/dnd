import { getDB } from "../db/sqlite.js";

export function addAttribute(attribute) {
  const db = getDB();
  const stmt = db.prepare(`
    INSERT INTO attributes (name) 
    VALUES (@name)
  `);
  return stmt.run(attribute);
}

export function getAllAttributes() {
  const db = getDB();
  const stmt = db.prepare(`SELECT * FROM attributes`);
  return stmt.all();
}

export function getAttributeById(id) {
  const db = getDB();
  const stmt = db.prepare(`SELECT * FROM attributes WHERE id = ?`);
  return stmt.get(id);
}

export function updateAttribute(id, attribute) {
  const db = getDB();
  const stmt = db.prepare(`
    UPDATE attributes 
    SET name = @name 
    WHERE id = @id
  `);
  return stmt.run({ ...attribute, id });
}

export function deleteAttribute(id) {
  const db = getDB();
  const stmt = db.prepare(`DELETE FROM attributes WHERE id = ?`);
  return stmt.run(id);
}

export function getAttributesBySystem(systemId) {
  const db = getDB();
  const stmt = db.prepare(`
    SELECT a.* FROM attributes a
    INNER JOIN attributes_rel_systems ars ON a.id = ars.attribute_id
    WHERE ars.system_id = ?
  `);
  return stmt.all(systemId);
}

export function linkAttributeToSystem(attributeId, systemId) {
  const db = getDB();
  const stmt = db.prepare(`
    INSERT INTO attributes_rel_systems (attribute_id, system_id) 
    VALUES (?, ?)
  `);
  return stmt.run(attributeId, systemId);
}

export function unlinkAttributeFromSystem(attributeId, systemId) {
  const db = getDB();
  const stmt = db.prepare(`
    DELETE FROM attributes_rel_systems
    WHERE attribute_id = ? AND system_id = ?
  `);
  return stmt.run(attributeId, systemId);
}