import { ipcMain } from "electron";
import { insertPersonagem, getAllPersonagens } from "../services/personagemService.js";

ipcMain.handle('add-personagem', async (event, personagem) => {
  return insertPersonagem(personagem);
});

ipcMain.handle('get-personagens', async () => {
  return getAllPersonagens();
});