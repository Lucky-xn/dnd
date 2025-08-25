import { ipcMain } from "electron";
import * as systemApi from "../api/systems.js";
import { createValidatedHandler } from "../utils/ipc.js";
import { systemSchema, idSchema } from "../validation/schemas.js";

// Standardized IPC channels using singular:action format
ipcMain.handle('system:create', createValidatedHandler(
  async (data) => systemApi.addNewSystem(data),
  systemSchema
));

ipcMain.handle('system:list', createValidatedHandler(
  async () => systemApi.listAllSystems()
));

ipcMain.handle('system:get', createValidatedHandler(
  async (payload) => systemApi.getSystem(payload.id),
  idSchema
));

ipcMain.handle('system:update', createValidatedHandler(
  async (payload) => {
    const { id, ...data } = payload;
    return systemApi.updateExistingSystem(id, data);
  },
  systemSchema.required({ id: true })
));

ipcMain.handle('system:remove', createValidatedHandler(
  async (payload) => systemApi.removeSystem(payload.id),
  idSchema
));

ipcMain.handle('system:listAttributes', createValidatedHandler(
  async (payload) => {
    // This should call the attribute API to get system attributes
    const attributeApi = await import("../api/attributes.js");
    return attributeApi.getSystemAttributes(payload.id);
  },
  idSchema
));

ipcMain.handle('system:listSkills', createValidatedHandler(
  async (payload) => {
    // This should call the skill API to get system skills
    const skillApi = await import("../api/skills.js");
    return skillApi.getSystemSkills(payload.id);
  },
  idSchema
));