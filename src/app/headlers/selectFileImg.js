import { ipcMain, dialog, app } from 'electron';
import fs from 'fs';
import path from 'path';

// Pasta segura no sistema do usuário
const DESTINO = path.join(app.getPath('userData'), 'Characters');

ipcMain.handle('selecionar-arquivo', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      { name: 'Imagens', extensions: ['jpg', 'jpeg', 'png'] }
    ]
  });

  if (result.canceled || result.filePaths.length === 0) {
    return null;
  }

  const arquivoSelecionado = result.filePaths[0];
  const nomeArquivo = path.basename(arquivoSelecionado);
  const destino = path.join(DESTINO, nomeArquivo);

  fs.mkdirSync(DESTINO, { recursive: true });
  fs.copyFileSync(arquivoSelecionado, destino);

  return `file://${path.join(DESTINO, nomeArquivo)}`;
});