import { ipcMain } from "electron";
import * as characterApi from "../api/characters.js";

ipcMain.handle('characters:create', async (event, data) => {
  return characterApi.addNewCharacter(data);
});

ipcMain.handle('characters:list', async () => {
  return characterApi.listAllCharacters();
});

ipcMain.handle('characters:manipulateAttributes', async (event, character) => {
  return characterApi.manipulateCharacterAttributes(character);
});