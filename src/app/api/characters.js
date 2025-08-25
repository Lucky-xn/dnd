import { 
  addCharacter, 
  getAllCharacters, 
  getCharacterById,
  updateCharacter,
  deleteCharacter,
  characterManipulationAttributes 
} from "../services/characterService.js";

export async function addNewCharacter(data) {
  return addCharacter(data);
}

export async function listAllCharacters() {
  return getAllCharacters();
}

export async function getCharacter(id) {
  return getCharacterById(id);
}

export async function updateExistingCharacter(id, data) {
  return updateCharacter({ id, ...data });
}

export async function removeCharacter(id) {
  return deleteCharacter(id);
}

export async function manipulateCharacterAttributes(character) {
  return characterManipulationAttributes(character);
}