import { ipcMain } from "electron";
import * as characterSheetApi from "../api/characterSheets.js";

ipcMain.handle('add-character-sheet', async (event, data) => {
  return characterSheetApi.addNewCharacterSheet(data);
});

ipcMain.handle('get-character-sheet', async (event, characterId) => {
  return characterSheetApi.getSheet(characterId);
});

ipcMain.handle('update-character-sheet', async (event, characterId, data) => {
  return characterSheetApi.updateSheet(characterId, data);
});

ipcMain.handle('delete-character-sheet', async (event, characterId) => {
  return characterSheetApi.removeSheet(characterId);
});

ipcMain.handle('list-character-sheets', async () => {
  return characterSheetApi.listAllSheets();
});