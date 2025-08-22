import { getDB } from "../db/sqlite.js";

export function addSkill(skill) {
  const db = getDB();
  const stmt = db.prepare(`
    INSERT INTO skills (name) 
    VALUES (@name)
  `);
  return stmt.run(skill);
}

export function getAllSkills() {
  const db = getDB();
  const stmt = db.prepare(`SELECT * FROM skills`);
  return stmt.all();
}

export function getSkillById(id) {
  const db = getDB();
  const stmt = db.prepare(`SELECT * FROM skills WHERE id = ?`);
  return stmt.get(id);
}

export function updateSkill(id, skill) {
  const db = getDB();
  const stmt = db.prepare(`
    UPDATE skills 
    SET name = @name 
    WHERE id = @id
  `);
  return stmt.run({ ...skill, id });
}

export function deleteSkill(id) {
  const db = getDB();
  const stmt = db.prepare(`DELETE FROM skills WHERE id = ?`);
  return stmt.run(id);
}

export function getSkillsBySystem(systemId) {
  const db = getDB();
  const stmt = db.prepare(`
    SELECT s.* FROM skills s
    INNER JOIN skill_rel_sistems srs ON s.id = srs.skill_id
    WHERE srs.sistem_id = ?
  `);
  return stmt.all(systemId);
}

export function linkSkillToSystem(skillId, systemId) {
  const db = getDB();
  const stmt = db.prepare(`
    INSERT INTO skill_rel_sistems (skill_id, sistem_id) 
    VALUES (?, ?)
  `);
  return stmt.run(skillId, systemId);
}

export function unlinkSkillFromSystem(skillId, systemId) {
  const db = getDB();
  const stmt = db.prepare(`
    DELETE FROM skill_rel_sistems 
    WHERE skill_id = ? AND sistem_id = ?
  `);
  return stmt.run(skillId, systemId);
}