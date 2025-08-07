import { addCharacter, getAllCharacters } from "../services/characterService.js";

export async function addNewCharacter(data) {
  return addCharacter(data);
}

export async function listAllCharacters() {
  return getAllCharacters();
}