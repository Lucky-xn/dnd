import { ipcMain } from "electron";
import * as itemApi from "../api/items.js";
import { createValidatedHandler } from "../utils/ipc.js";
import { 
  itemSchema, 
  idSchema, 
  characterIdSchema, 
  inventorySchema 
} from "../validation/schemas.js";

ipcMain.handle('items:create', createValidatedHandler(
  async (data) => itemApi.addNewItem(data),
  itemSchema
));

ipcMain.handle('items:list', createValidatedHandler(
  async () => itemApi.listAllItems()
));

ipcMain.handle('items:get', createValidatedHandler(
  async (payload) => itemApi.getItem(payload.id),
  idSchema
));

ipcMain.handle('items:update', createValidatedHandler(
  async (payload) => {
    const { id, ...data } = payload;
    return itemApi.updateExistingItem(id, data);
  },
  itemSchema.required({ id: true })
));

ipcMain.handle('items:remove', createValidatedHandler(
  async (payload) => itemApi.removeItem(payload.id),
  idSchema
));

ipcMain.handle('characters:listInventory', createValidatedHandler(
  async (payload) => itemApi.getInventory(payload.characterId),
  characterIdSchema
));

ipcMain.handle('characters:addItem', createValidatedHandler(
  async (payload) => itemApi.addToInventory(payload.characterId, payload.itemId),
  inventorySchema
));

ipcMain.handle('characters:removeItem', createValidatedHandler(
  async (payload) => itemApi.removeFromInventory(payload.characterId, payload.itemId),
  inventorySchema
));