import { ipcMain, dialog, app } from 'electron';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { createValidatedHandler } from '../utils/ipc.js';
import { z } from 'zod';

const DESTINY = path.join(app.getPath('userData'), 'Characters');

const pathSchema = z.object({
  path: z.string().min(1, 'Path is required')
});

ipcMain.handle('images:select', createValidatedHandler(
  async () => {
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
    const ext = path.extname(selectedFile);
    const fileName = `${uuidv4()}${ext}`;
    const destiny = path.join(DESTINY, fileName);

    fs.mkdirSync(DESTINY, { recursive: true });
    fs.copyFileSync(selectedFile, destiny);

    return `file://${destiny}`;
  }
));

ipcMain.handle('images:delete', createValidatedHandler(
  async (payload) => {
    try {
      const actualPath = payload.path.startsWith('file://') ? payload.path.replace('file://', '') : payload.path;

      if (fs.existsSync(actualPath)) {
        fs.unlinkSync(actualPath);
      }
      return true;
    } catch (error) {
      console.error('Error deleting image: ', error);
      return false;
    }
  },
  pathSchema
));