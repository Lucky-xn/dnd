const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  addNewCharacter: (p) => ipcRenderer.invoke('add-character', p),
  listAllCharacters: () => ipcRenderer.invoke('list-characters'),

  selectImg: () => ipcRenderer.invoke('select-image'),
  deleteImg: (p) => ipcRenderer.invoke('delete-image', p),
});