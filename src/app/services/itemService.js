import { getDB } from "../db/sqlite.js";

export function addItem(item) {
  const db = getDB();
  const stmt = db.prepare(`
    INSERT INTO itens (name, quantidade) 
    VALUES (@name, @quantidade)
  `);
  return stmt.run(item);
}

export function getAllItems() {
  const db = getDB();
  const stmt = db.prepare(`SELECT * FROM itens`);
  return stmt.all();
}

export function getItemById(id) {
  const db = getDB();
  const stmt = db.prepare(`SELECT * FROM itens WHERE id = ?`);
  return stmt.get(id);
}

export function updateItem(id, item) {
  const db = getDB();
  const stmt = db.prepare(`
    UPDATE itens 
    SET name = @name, quantidade = @quantidade 
    WHERE id = @id
  `);
  return stmt.run({ ...item, id });
}

export function deleteItem(id) {
  const db = getDB();
  const stmt = db.prepare(`DELETE FROM itens WHERE id = ?`);
  return stmt.run(id);
}

export function getCharacterInventory(characterId) {
  const db = getDB();
  const stmt = db.prepare(`
    SELECT i.* FROM itens i
    INNER JOIN characters_inventory ci ON i.id = ci.item_id
    WHERE ci.character_id = ?
  `);
  return stmt.all(characterId);
}

export function addItemToCharacter(characterId, itemId) {
  const db = getDB();
  const stmt = db.prepare(`
    INSERT INTO characters_inventory (character_id, item_id) 
    VALUES (?, ?)
  `);
  return stmt.run(characterId, itemId);
}

export function removeItemFromCharacter(characterId, itemId) {
  const db = getDB();
  const stmt = db.prepare(`
    DELETE FROM characters_inventory 
    WHERE character_id = ? AND item_id = ?
  `);
  return stmt.run(characterId, itemId);
}