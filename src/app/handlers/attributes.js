import { ipcMain } from "electron";
import * as attributeApi from "../api/attributes.js";
import { createValidatedHandler } from "../utils/ipc.js";
import { 
  attributeSchema, 
  idSchema, 
  systemIdSchema, 
  linkAttributeSchema 
} from "../validation/schemas.js";

ipcMain.handle('attribute:create', createValidatedHandler(
  async (data) => attributeApi.addNewAttribute(data),
  attributeSchema
));

ipcMain.handle('attribute:list', createValidatedHandler(
  async (payload) => attributeApi.getSystemAttributes(payload.systemId),
  systemIdSchema
));

ipcMain.handle('attribute:get', createValidatedHandler(
  async (payload) => attributeApi.getAttribute(payload.id),
  idSchema
));

ipcMain.handle('attribute:update', createValidatedHandler(
  async (payload) => {
    const { id, ...data } = payload;
    return attributeApi.updateExistingAttribute(id, data);
  },
  attributeSchema.required({ id: true })
));

ipcMain.handle('attribute:remove', createValidatedHandler(
  async (payload) => attributeApi.removeAttribute(payload.id),
  idSchema
));

ipcMain.handle('attribute:link', createValidatedHandler(
  async (payload) => attributeApi.linkAttribute(payload.attributeId, payload.systemId),
  linkAttributeSchema
));

ipcMain.handle('attribute:unlink', createValidatedHandler(
  async (payload) => attributeApi.unlinkAttribute(payload.attributeId, payload.systemId),
  linkAttributeSchema
));