import { ipcMain } from "electron";
import * as skillApi from "../api/skills.js";
import { createValidatedHandler } from "../utils/ipc.js";
import { 
  skillSchema, 
  idSchema, 
  systemIdSchema, 
  linkSkillSchema 
} from "../validation/schemas.js";

ipcMain.handle('skill:create', createValidatedHandler(
  async (data) => skillApi.addNewSkill(data),
  skillSchema
));

ipcMain.handle('skill:list', createValidatedHandler(
  async () => skillApi.listAllSkills()
));

ipcMain.handle('skill:get', createValidatedHandler(
  async (payload) => skillApi.getSkill(payload.id),
  idSchema
));

ipcMain.handle('skill:update', createValidatedHandler(
  async (payload) => {
    const { id, ...data } = payload;
    return skillApi.updateExistingSkill(id, data);
  },
  skillSchema.required({ id: true })
));

ipcMain.handle('skill:remove', createValidatedHandler(
  async (payload) => skillApi.removeSkill(payload.id),
  idSchema
));

ipcMain.handle('skill:listBySystem', createValidatedHandler(
  async (payload) => skillApi.getSystemSkills(payload.systemId),
  systemIdSchema
));

ipcMain.handle('skill:link', createValidatedHandler(
  async (payload) => skillApi.linkSkill(payload.skillId, payload.systemId),
  linkSkillSchema
));

ipcMain.handle('skill:unlink', createValidatedHandler(
  async (payload) => skillApi.unlinkSkill(payload.skillId, payload.systemId),
  linkSkillSchema
));