import { getDB } from "../db/sqlite.js";

export function addCharacterSheet(characterSheet) {
  const db = getDB();
  const stmt = db.prepare(`
    INSERT INTO characters_sheet (character_id, level, current_hp) 
    VALUES (@character_id, @level, @current_hp)
  `);
  return stmt.run(characterSheet);
}

export function getCharacterSheet(characterId) {
  const db = getDB();
  const stmtPrincipalInfo = db.prepare(`
    SELECT c.id, c.system_id, c.image, c.name, c.class, c.race, c.origin, c.alignment, cs.level, c.hp, cs.current_hp FROM characters_sheet cs
    JOIN characters c ON cs.character_id = c.id
    WHERE c.id = ?
  `);

  const stmtAttributes = db.prepare(`
    SELECT a.name, a.value FROM character_attributes a
    JOIN characters_sheet cs ON a.character_sheet_id = cs.id
    WHERE cs.character_id = ?
  `);

  const data = [{ 'info': stmtPrincipalInfo.get(characterId), 'attributes': stmtAttributes.all(characterId) }];

  return data;
}

export function updateCharacterSheet(characterId, characterSheet) {
  const db = getDB();
  const stmt = db.prepare(`
    UPDATE characters_sheet 
    SET level = @level, current_hp = @current_hp 
    WHERE character_id = @character_id
  `);
  return stmt.run({ ...characterSheet, character_id: characterId });
}

export function deleteCharacterSheet(characterId) {
  const db = getDB();
  const stmt = db.prepare(`DELETE FROM characters_sheet WHERE character_id = ?`);
  return stmt.run(characterId);
}

export function getAllCharacterSheets() {
  const db = getDB();
  const stmt = db.prepare(`
    SELECT cs.*, c.name as character_name 
    FROM characters_sheet cs
    INNER JOIN characters c ON cs.character_id = c.id
  `);
  return stmt.all();
}