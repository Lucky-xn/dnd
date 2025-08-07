import { addCharacter, getAllCharacters } from "../services/characterService";

export async function addNewCharacter(data) {
  // Aqui você valida os dados...
  if (!data.nome || typeof data.hp !== 'number') throw new Error('Dados inválidos');
  // ...e chama o service
  return addCharacter(data);
}

export async function listAllCharacters() {
  return getAllCharacters();
}