import { 
  addItem, 
  getAllItems, 
  getItemById, 
  updateItem, 
  deleteItem,
  getCharacterInventory,
  addItemToCharacter,
  removeItemFromCharacter
} from "../services/itemService.js";

export async function addNewItem(data) {
  return addItem(data);
}

export async function listAllItems() {
  return getAllItems();
}

export async function getItem(id) {
  return getItemById(id);
}

export async function updateExistingItem(id, data) {
  return updateItem(id, data);
}

export async function removeItem(id) {
  return deleteItem(id);
}

export async function getInventory(characterId) {
  return getCharacterInventory(characterId);
}

export async function addToInventory(characterId, itemId) {
  return addItemToCharacter(characterId, itemId);
}

export async function removeFromInventory(characterId, itemId) {
  return removeItemFromCharacter(characterId, itemId);
}