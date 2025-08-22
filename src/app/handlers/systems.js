import { ipcMain } from "electron";
import * as systemApi from "../api/systems.js";

ipcMain.handle('add-system', async (event, data) => {
  return systemApi.addNewSystem(data);
});

ipcMain.handle('list-systems', async () => {
  return systemApi.listAllSystems();
});

ipcMain.handle('get-system', async (event, id) => {
  return systemApi.getSystem(id);
});

ipcMain.handle('update-system', async (event, id, data) => {
  return systemApi.updateExistingSystem(id, data);
});

ipcMain.handle('delete-system', async (event, id) => {
  return systemApi.removeSystem(id);
});