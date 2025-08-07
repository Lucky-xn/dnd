import { ipcMain, dialog, app } from 'electron';
import fs from 'fs';
import path from 'path';

// Pasta segura no sistema do usuário
const DESTINY = path.join(app.getPath('userData'), 'Characters');

ipcMain.handle('select-image', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      { name: 'Imagens', extensions: ['jpg', 'jpeg', 'png'] }
    ]
  });

  if (result.canceled || result.filePaths.length === 0) {
    return null;
  }

  const selectedFile = result.filePaths[0];
  const fileName = path.basename(selectedFile);
  const destiny = path.join(DESTINY, fileName);

  fs.mkdirSync(DESTINY, { recursive: true });
  fs.copyFileSync(selectedFile, destiny);

  return `file://${path.join(DESTINY, fileName)}`;
});