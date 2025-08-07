const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  addNewCharacter: (p) => ipcRenderer.invoke('add-character', p),
  listAllCharacters: () => ipcRenderer.invoke('list-characters'),

  selecionarArquivo: () => ipcRenderer.invoke('selecionar-arquivo'),
});