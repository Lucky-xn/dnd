/* global require */
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // Characters
  addNewCharacter: (p) => ipcRenderer.invoke('add-character', p),
  listAllCharacters: () => ipcRenderer.invoke('list-characters'),

  // Images
  selectImg: () => ipcRenderer.invoke('select-image'),
  deleteImg: (p) => ipcRenderer.invoke('delete-image', p),

  // Systems
  addNewSystem: (p) => ipcRenderer.invoke('add-system', p),
  listAllSystems: () => ipcRenderer.invoke('list-systems'),
  getSystem: (id) => ipcRenderer.invoke('get-system', id),
  updateSystem: (id, p) => ipcRenderer.invoke('update-system', id, p),
  deleteSystem: (id) => ipcRenderer.invoke('delete-system', id),

  // Attributes
  addNewAttribute: (p) => ipcRenderer.invoke('add-attribute', p),
  listAllAttributes: () => ipcRenderer.invoke('list-attributes'),
  getAttribute: (id) => ipcRenderer.invoke('get-attribute', id),
  updateAttribute: (id, p) => ipcRenderer.invoke('update-attribute', id, p),
  deleteAttribute: (id) => ipcRenderer.invoke('delete-attribute', id),
  getSystemAttributes: (systemId) => ipcRenderer.invoke('get-system-attributes', systemId),
  linkAttribute: (attributeId, systemId) => ipcRenderer.invoke('link-attribute', attributeId, systemId),
  unlinkAttribute: (attributeId, systemId) => ipcRenderer.invoke('unlink-attribute', attributeId, systemId),

  // Skills
  addNewSkill: (p) => ipcRenderer.invoke('add-skill', p),
  listAllSkills: () => ipcRenderer.invoke('list-skills'),
  getSkill: (id) => ipcRenderer.invoke('get-skill', id),
  updateSkill: (id, p) => ipcRenderer.invoke('update-skill', id, p),
  deleteSkill: (id) => ipcRenderer.invoke('delete-skill', id),
  getSystemSkills: (systemId) => ipcRenderer.invoke('get-system-skills', systemId),
  linkSkill: (skillId, systemId) => ipcRenderer.invoke('link-skill', skillId, systemId),
  unlinkSkill: (skillId, systemId) => ipcRenderer.invoke('unlink-skill', skillId, systemId),

  // Items
  addNewItem: (p) => ipcRenderer.invoke('add-item', p),
  listAllItems: () => ipcRenderer.invoke('list-items'),
  getItem: (id) => ipcRenderer.invoke('get-item', id),
  updateItem: (id, p) => ipcRenderer.invoke('update-item', id, p),
  deleteItem: (id) => ipcRenderer.invoke('delete-item', id),
  getInventory: (characterId) => ipcRenderer.invoke('get-inventory', characterId),
  addToInventory: (characterId, itemId) => ipcRenderer.invoke('add-to-inventory', characterId, itemId),
  removeFromInventory: (characterId, itemId) => ipcRenderer.invoke('remove-from-inventory', characterId, itemId),

  // Character Sheets
  addNewCharacterSheet: (p) => ipcRenderer.invoke('add-character-sheet', p),
  getCharacterSheet: (characterId) => ipcRenderer.invoke('get-character-sheet', characterId),
  updateCharacterSheet: (characterId, p) => ipcRenderer.invoke('update-character-sheet', characterId, p),
  deleteCharacterSheet: (characterId) => ipcRenderer.invoke('delete-character-sheet', characterId),
  listAllCharacterSheets: () => ipcRenderer.invoke('list-character-sheets'),
});