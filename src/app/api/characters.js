import { addCharacter, getAllCharacters, characterManipulationAttributes } from "../services/characterService.js";

export async function addNewCharacter(data) {
  return addCharacter(data);
}

export async function listAllCharacters() {
  return getAllCharacters();
}

export async function manipulateCharacterAttributes(character) {
  return characterManipulationAttributes(character);
}