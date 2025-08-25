/**
 * @description Popula o banco de dados com dados iniciais, se necessário.
 * @param {import("better-sqlite3").Database} db - A instância do banco de dados.
 */
export function createSchema(db) {
  // First, run migration for existing databases
  runMigrations(db);

  const create = db.transaction(() => {
      db.prepare(`CREATE TABLE IF NOT EXISTS systems (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        description TEXT
      )`).run();

      db.prepare(`CREATE TABLE IF NOT EXISTS attributes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
      )`).run();

      db.prepare(`CREATE TABLE IF NOT EXISTS attributes_rel_systems (
        attribute_id INTEGER,
        system_id INTEGER,
        PRIMARY KEY (attribute_id, system_id),
        FOREIGN KEY (attribute_id) REFERENCES attributes(id) ON DELETE CASCADE,
        FOREIGN KEY (system_id) REFERENCES systems(id) ON DELETE CASCADE
      )`).run();

      db.prepare(`CREATE TABLE IF NOT EXISTS skills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
      )`).run();

      db.prepare(`CREATE TABLE IF NOT EXISTS skill_rel_systems (
        skill_id INTEGER,
        system_id INTEGER,
        PRIMARY KEY (skill_id, system_id),
        FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE,
        FOREIGN KEY (system_id) REFERENCES systems(id) ON DELETE CASCADE
      )`).run();

      db.prepare(`CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        quantity INTEGER
      )`).run();

      db.prepare(`CREATE TABLE IF NOT EXISTS characters (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          system_id INTEGER,
          img TEXT,
          name TEXT,
          race TEXT,
          class TEXT,
          origin TEXT,
          alignment TEXT,
          hp INTEGER,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (system_id) REFERENCES systems(id) ON DELETE CASCADE
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
        FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE
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

/**
 * @description Runs database migrations for schema changes
 * @param {import("better-sqlite3").Database} db - A instância do banco de dados.
 */
function runMigrations(db) {
  // Check if old 'itens' table exists and migrate to 'items'
  const tablesResult = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='itens'").get();
  
  if (tablesResult) {
    // Migrate itens table to items
    const migration = db.transaction(() => {
      // Create new items table
      db.prepare(`CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        quantity INTEGER
      )`).run();
      
      // Copy data from itens to items, renaming quantidade to quantity
      db.prepare(`INSERT INTO items (id, name, quantity) 
                  SELECT id, name, quantidade FROM itens`).run();
      
      // Update foreign key references in characters_inventory
      // SQLite doesn't support ALTER TABLE for foreign keys, so we need to recreate the table
      db.prepare(`CREATE TABLE characters_inventory_temp (
        character_id INTEGER,
        item_id INTEGER,
        PRIMARY KEY (character_id, item_id),
        FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE,
        FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE
      )`).run();
      
      // Copy existing inventory data
      db.prepare(`INSERT INTO characters_inventory_temp 
                  SELECT * FROM characters_inventory`).run();
      
      // Drop old tables
      db.prepare(`DROP TABLE characters_inventory`).run();
      db.prepare(`DROP TABLE itens`).run();
      
      // Rename temp table
      db.prepare(`ALTER TABLE characters_inventory_temp RENAME TO characters_inventory`).run();
    });
    
    migration();
    console.log('Database migration completed: itens -> items');
  }
}