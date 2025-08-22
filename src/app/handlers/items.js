import { ipcMain } from "electron";
import * as itemApi from "../api/items.js";

ipcMain.handle('add-item', async (event, data) => {
  return itemApi.addNewItem(data);
});

ipcMain.handle('list-items', async () => {
  return itemApi.listAllItems();
});

ipcMain.handle('get-item', async (event, id) => {
  return itemApi.getItem(id);
});

ipcMain.handle('update-item', async (event, id, data) => {
  return itemApi.updateExistingItem(id, data);
});

ipcMain.handle('delete-item', async (event, id) => {
  return itemApi.removeItem(id);
});

ipcMain.handle('get-inventory', async (event, characterId) => {
  return itemApi.getInventory(characterId);
});

ipcMain.handle('add-to-inventory', async (event, characterId, itemId) => {
  return itemApi.addToInventory(characterId, itemId);
});

ipcMain.handle('remove-from-inventory', async (event, characterId, itemId) => {
  return itemApi.removeFromInventory(characterId, itemId);
});