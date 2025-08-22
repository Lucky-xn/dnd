import { getDB } from "../db/sqlite.js";

const defaultCharacter = {
  system_id: 1,
  img: null,
  name: null,
  race: null,
  class: null,
  origin: null,
  alignment: null,
  hp: 0,
  level: 0
};

/**
 * Função genérica para gerenciar relações N-para-N de um personagem.
 * @param {string} sql - A query SQL a ser executada.
 * @param {Array} items - O array de itens (atributos, perícias, etc.).
 * @param {number} characterId - O ID do personagem.
 */
function executeRelationTransaction(sql, items, characterId) {
  const db = getDB();
  const stmt = db.prepare(sql);

  const executeMany = db.transaction((itemList) => {
    for (const item of itemList) {
      stmt.run({ ...item, character_id: characterId });
    }
  });

  executeMany(items);
}

export function addCharacter(character) {
  const db = getDB();
  const createCharacter = db.transaction((char) => {
    const newCharacter = { ...defaultCharacter, ...char };
    const stmtCharacterInfo = db.prepare(`
        INSERT INTO characters (system_id, img, name, race, class, origin, alignment, hp) 
        VALUES (@system_id, @img, @name, @race, @class, @origin, @alignment, @hp)
      `);
    const info = stmtCharacterInfo.run(newCharacter);
    const characterId = info.lastInsertRowid;
    const stmtCharacterSheet = db.prepare(`
        INSERT INTO characters_sheet (character_id, level, current_hp) 
        VALUES (@character_id, @level, @current_hp)
      `);
    stmtCharacterSheet.run({
      character_id: characterId,
      level: newCharacter.level || 0,
      current_hp: newCharacter.hp
    });
    return characterId;
  });
  return createCharacter(character);
}

export function updateCharacter(character) {
  const db = getDB();
  const fields = Object.keys(character).filter(key => key !== "id");
  if (fields.length === 0) return;
  const setClause = fields.map(key => `${key} = @${key}`).join(', ');
  const stmt = db.prepare(`UPDATE characters SET ${setClause} WHERE id = @id`);
  stmt.run(character);
}

export function deleteCharacter(characterId) {
  const db = getDB();
  const stmt = db.prepare(`DELETE FROM characters WHERE id = @id`);
  stmt.run({ id: characterId });
}

export function insertAttributes(character) {
  const sql = `INSERT INTO characters_attributes (character_id, attribute_id, value) VALUES (@character_id, @id, @value)`;
  executeRelationTransaction(sql, character.attributes, character.id);
}

export function updateCharacterAttributes(character) {
  const sql = `UPDATE characters_attributes SET value = @value WHERE character_id = @character_id AND attribute_id = @id`;
  executeRelationTransaction(sql, character.attributes, character.id);
}

/**
 * Sincroniza as perícias de um personagem. Remove todas as antigas e insere as novas.
 * @param {number} characterId - O ID do personagem.
 * @param {Array<{id: number}>} skills - Array de objetos de perícia, cada um com uma propriedade 'id'.
 */
export function syncCharacterSkills(characterId, skills) {
  const db = getDB();

  const sync = db.transaction(() => {
    db.prepare(`DELETE FROM characters_skills WHERE character_id = ?`).run(characterId);
    const insertStmt = db.prepare(`
      INSERT INTO characters_skills (character_id, skill_id) 
      VALUES (@character_id, @id)
    `);
    for (const skill of skills) {
      insertStmt.run({ character_id: characterId, id: skill.id });
    }
  });
  sync();
}

export function getAllCharacters() {
  const db = getDB();
  const stmt = db.prepare(`
        SELECT c.id, c.system_id, c.name, c.img, c.race, c.class, cs.level, cs.current_hp 
        FROM characters c
        LEFT JOIN characters_sheet cs ON c.id = cs.character_id
    `);
  return stmt.all();
}