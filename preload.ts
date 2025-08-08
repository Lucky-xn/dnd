const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  addNewCharacter: (p: Object) => ipcRenderer.invoke('add-character', p),
  listAllCharacters: () => ipcRenderer.invoke('list-characters'),

  selectImg: () => ipcRenderer.invoke('select-image'),
  deleteImg: (p: String) => ipcRenderer.invoke('delete-image', p),
});