import { ipcMain } from "electron";
import * as systemApi from "../api/systems.js";

ipcMain.handle('add-system', async (event, data) => {
  return systemApi.addNewSystem(data);
});

ipcMain.handle('system:list', async () => {
  return systemApi.listAllSystems();
});

ipcMain.handle('system:get', async (event, id) => {
  return systemApi.getSystem(id);
});

ipcMain.handle('update-system', async (event, id, data) => {
  return systemApi.updateExistingSystem(id, data);
});

ipcMain.handle('delete-system', async (event, id) => {
  return systemApi.removeSystem(id);
});