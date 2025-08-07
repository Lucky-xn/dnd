import { ipcMain } from "electron";
import * as characterApi from "../api/characters.js";

ipcMain.handle('add-character', async (event, data) => {
  return characterApi.addNewCharacter(data);
});

ipcMain.handle('list-characters', async () => {
  return characterApi.listAllCharacters();
});