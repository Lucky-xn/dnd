const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  addPersonagem: (p) => ipcRenderer.invoke('add-personagem', p),
  getPersonagens: () => ipcRenderer.invoke('get-personagens'),

  selecionarArquivo: () => ipcRenderer.invoke('selecionar-arquivo'),
});