import { ipcMain } from "electron";
import * as characterSheetApi from "../api/characterSheets.js";
import { createValidatedHandler } from "../utils/ipc.js";
import { 
  characterSheetSchema, 
  idSchema 
} from "../validation/schemas.js";

ipcMain.handle('characterSheet:create', createValidatedHandler(
  async (data) => characterSheetApi.addNewCharacterSheet(data),
  characterSheetSchema
));

ipcMain.handle('characterSheet:list', createValidatedHandler(
  async () => characterSheetApi.listAllSheets()
));

ipcMain.handle('characterSheet:get', createValidatedHandler(
  async (payload) => characterSheetApi.getSheet(payload.id),
  idSchema
));

ipcMain.handle('characterSheet:update', createValidatedHandler(
  async (payload) => {
    const { id, ...data } = payload;
    return characterSheetApi.updateSheet(id, data);
  },
  characterSheetSchema.required({ id: true })
));

ipcMain.handle('characterSheet:remove', createValidatedHandler(
  async (payload) => characterSheetApi.removeSheet(payload.id),
  idSchema
));