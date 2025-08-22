/**
 * @description Popula o banco de dados com dados iniciais, se necessário.
 * @param {import("better-sqlite3").Database} db - A instância do banco de dados.
 */
export function seedInitialData(db) {
   const seed = db.transaction(() => {
      const systemCount = db.prepare(`SELECT COUNT(*) as count FROM systems`).get().count;

      if (systemCount === 0) {
        const dndSystem = db.prepare(`INSERT INTO systems (name, description) VALUES (?, ?)`)
          .run(['Dungeons and Dragons', 'Dnd 5e Edition']);

        const dndSystemId = dndSystem.lastInsertRowid;

        const attributes = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];
        const insertAttribute = db.prepare(`INSERT INTO attributes (name) VALUES (?)`);
        const relateAttribute = db.prepare(`INSERT INTO attributes_rel_systems (attribute_id, system_id) VALUES (?, ?)`);

        for (const attr of attributes) {
          const result = insertAttribute.run(attr);
          relateAttribute.run(result.lastInsertRowid, dndSystemId);
        }

        const skills = ['Acrobatics', 'Animal Handling', 'Arcana', 'Athletics', 'Deception', 'History', 'Insight', 'Intimidation', 'Investigation', 'Medicine', 'Nature', 'Perception', 'Performance', 'Persuasion', 'Religion', 'Sleight of Hand', 'Stealth', 'Survival'];
        const insertSkill = db.prepare(`INSERT INTO skills (name) VALUES (?)`);
        const relateSkill = db.prepare(`INSERT INTO skill_rel_systems (skill_id, system_id) VALUES (?, ?)`);

        for (const skill of skills) {
          const result = insertSkill.run(skill);
          relateSkill.run(result.lastInsertRowid, dndSystemId);
        }
      }
    });
    seed();
}