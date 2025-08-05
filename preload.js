const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  addPersonagem: (personagem) => ipcRenderer.invoke('add-personagem', personagem),
  getPersonagens: () => ipcRenderer.invoke('get-personagens'),
});