import { ipcMain } from "electron";
import * as skillApi from "../api/skills.js";

ipcMain.handle('add-skill', async (event, data) => {
  return skillApi.addNewSkill(data);
});

ipcMain.handle('list-skills', async () => {
  return skillApi.listAllSkills();
});

ipcMain.handle('get-skill', async (event, id) => {
  return skillApi.getSkill(id);
});

ipcMain.handle('update-skill', async (event, id, data) => {
  return skillApi.updateExistingSkill(id, data);
});

ipcMain.handle('delete-skill', async (event, id) => {
  return skillApi.removeSkill(id);
});

ipcMain.handle('get-system-skills', async (event, systemId) => {
  return skillApi.getSystemSkills(systemId);
});

ipcMain.handle('link-skill', async (event, skillId, systemId) => {
  return skillApi.linkSkill(skillId, systemId);
});

ipcMain.handle('unlink-skill', async (event, skillId, systemId) => {
  return skillApi.unlinkSkill(skillId, systemId);
});