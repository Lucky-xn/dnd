import { 
  addCharacterSheet, 
  getCharacterSheet, 
  updateCharacterSheet, 
  deleteCharacterSheet,
  getAllCharacterSheets
} from "../services/characterSheetService.js";

export async function addNewCharacterSheet(data) {
  return addCharacterSheet(data);
}

export async function getSheet(characterId) {
  return getCharacterSheet(characterId);
}

export async function updateSheet(characterId, data) {
  return updateCharacterSheet(characterId, data);
}

export async function removeSheet(characterId) {
  return deleteCharacterSheet(characterId);
}

export async function listAllSheets() {
  return getAllCharacterSheets();
}