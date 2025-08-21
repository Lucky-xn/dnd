/**
 * @description Popula o banco de dados com dados iniciais, se necessário.
 * @param {import("better-sqlite3").Database} db - A instância do banco de dados.
 */
export function createSchema(db) {
   const create = db.transaction(() => {
      db.prepare(`CREATE TABLE IF NOT EXISTS sistems (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        description TEXT
      )`).run();

      db.prepare(`CREATE TABLE IF NOT EXISTS attributes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
      )`).run();

      db.prepare(`CREATE TABLE IF NOT EXISTS attributes_rel_sistems (
        atribute_id INTEGER,
        sistem_id INTEGER,
        PRIMARY KEY (atribute_id, sistem_id),
        FOREIGN KEY (atribute_id) REFERENCES attributes(id) ON DELETE CASCADE,
        FOREIGN KEY (sistem_id) REFERENCES sistems(id) ON DELETE CASCADE
      )`).run();

      db.prepare(`CREATE TABLE IF NOT EXISTS skills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
      )`).run();

      db.prepare(`CREATE TABLE IF NOT EXISTS skill_rel_sistems (
        skill_id INTEGER,
        sistem_id INTEGER,
        PRIMARY KEY (skill_id, sistem_id),
        FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE,
        FOREIGN KEY (sistem_id) REFERENCES sistems(id) ON DELETE CASCADE
      )`).run();

      db.prepare(`CREATE TABLE IF NOT EXISTS itens (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        quantidade INTEGER
      )`).run();

      db.prepare(`CREATE TABLE IF NOT EXISTS characters (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          sistem_id INTEGER,
          img TEXT,
          name TEXT,
          race TEXT,
          class TEXT,
          origin TEXT,
          alignment TEXT,
          hp INTEGER,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (sistem_id) REFERENCES sistems(id) ON DELETE CASCADE
        )`).run();

      db.prepare(`CREATE TABLE IF NOT EXISTS characters_attributes (
        character_id INTEGER,
        attribute_id INTEGER,
        value INTEGER,
        PRIMARY KEY (character_id, attribute_id),
        FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE,
        FOREIGN KEY (attribute_id) REFERENCES attributes(id) ON DELETE CASCADE
      )`).run();

      db.prepare(`CREATE TABLE IF NOT EXISTS characters_skills (
        character_id INTEGER,
        skill_id INTEGER,
        PRIMARY KEY (character_id, skill_id),
        FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE,
        FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
      )`).run();

      db.prepare(`CREATE TABLE IF NOT EXISTS characters_inventory (
        character_id INTEGER,
        item_id INTEGER,
        PRIMARY KEY (character_id, item_id),
        FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE,
        FOREIGN KEY (item_id) REFERENCES itens(id) ON DELETE CASCADE
      )`).run();


      db.prepare(`CREATE TABLE IF NOT EXISTS characters_sheet (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        character_id INTEGER,
        level INTEGER,
        current_hp INTEGER,
        FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE
      )`).run();
    });
    create();
}