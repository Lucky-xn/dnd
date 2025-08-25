import { ipcMain } from "electron";
import * as characterApi from "../api/characters.js";
import { createValidatedHandler, createBatchHandler } from "../utils/ipc.js";
import { 
  characterSchema, 
  idSchema, 
  attributeManipulationSchema 
} from "../validation/schemas.js";

ipcMain.handle('characters:create', createValidatedHandler(
  async (data) => characterApi.addNewCharacter(data),
  characterSchema
));

ipcMain.handle('characters:list', createValidatedHandler(
  async () => characterApi.listAllCharacters()
));

ipcMain.handle('characters:get', createValidatedHandler(
  async (payload) => {
    // Need to implement this in the API
    const characterService = await import("../services/characterService.js");
    return characterService.getCharacterById(payload.id);
  },
  idSchema
));

ipcMain.handle('characters:update', createValidatedHandler(
  async (payload) => {
    const { id, ...data } = payload;
    const characterService = await import("../services/characterService.js");
    return characterService.updateCharacter({ id, ...data });
  },
  characterSchema.required({ id: true })
));

ipcMain.handle('characters:remove', createValidatedHandler(
  async (payload) => {
    const characterService = await import("../services/characterService.js");
    return characterService.deleteCharacter(payload.id);
  },
  idSchema
));

ipcMain.handle('characters:manipulateAttributes', createValidatedHandler(
  createBatchHandler(
    async (attributes) => characterApi.manipulateCharacterAttributes(attributes),
    attributeManipulationSchema
  )
));