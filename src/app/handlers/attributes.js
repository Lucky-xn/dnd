import { ipcMain } from "electron";
import * as attributeApi from "../api/attributes.js";

ipcMain.handle('add-attribute', async (event, data) => {
  return attributeApi.addNewAttribute(data);
});

ipcMain.handle('attribute:list', async (event, systemId) => {
  return attributeApi.getSystemAttributes(systemId);
});

// ipcMain.handle('list-attributes', async () => {
//   return attributeApi.listAllAttributes();
// });

ipcMain.handle('get-attribute', async (event, id) => {
  return attributeApi.getAttribute(id);
});

ipcMain.handle('update-attribute', async (event, id, data) => {
  return attributeApi.updateExistingAttribute(id, data);
});

ipcMain.handle('delete-attribute', async (event, id) => {
  return attributeApi.removeAttribute(id);
});

ipcMain.handle('link-attribute', async (event, attributeId, systemId) => {
  return attributeApi.linkAttribute(attributeId, systemId);
});

ipcMain.handle('unlink-attribute', async (event, attributeId, systemId) => {
  return attributeApi.unlinkAttribute(attributeId, systemId);
});