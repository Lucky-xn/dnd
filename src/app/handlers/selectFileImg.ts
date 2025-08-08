import { ipcMain, dialog, app } from "electron";
import type { IpcMainInvokeEvent } from "electron";
import fs from "fs/promises";
import { constants as fsConst } from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { v4 as uuidv4 } from "uuid";

const DESTINY: string = path.join(app.getPath("userData"), "Imgs/Characters");

const isInsideDestiny = (p: string): boolean => {
  const resolved = path.resolve(p);
  const base = path.resolve(DESTINY);
  const rel = path.relative(base, resolved);
  return !rel.startsWith("..") && !path.isAbsolute(rel);
};

ipcMain.handle("select-image", async (): Promise<string | null> => {
  const result = await dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [{ name: "Imagens", extensions: ["jpg", "jpeg", "png"] }],
  });

  if (result.canceled || result.filePaths.length === 0) return null;

  const selectedFile = result.filePaths[0];
  await fs.mkdir(DESTINY, { recursive: true });

  const ext = path.extname(selectedFile) || ".png";
  const fileName = `${uuidv4()}${ext}`;
  const destiny = path.join(DESTINY, fileName);

  try {
    await fs.copyFile(selectedFile, destiny);
    await fs.access(destiny, fsConst.R_OK);

    return pathToFileURL(destiny).href;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    dialog.showErrorBox(
      "Erro ao copiar imagem",
      `Não foi possível copiar a imagem selecionada para o destino.\n\n${message}`
    );
    return null;
  }
});

ipcMain.handle(
  "delete-image",
  async (
    _event: IpcMainInvokeEvent,
    fileUrlOrPath: unknown
  ): Promise<boolean> => {
    try {
      if (typeof fileUrlOrPath !== "string" || !fileUrlOrPath) return false;
      let filePath: string = fileUrlOrPath;

      if (filePath.startsWith("file://")) {
        filePath = fileURLToPath(filePath);
      }

      if (!isInsideDestiny(filePath)) return false;

      await fs.unlink(filePath).catch(() => {});
      return true;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      dialog.showErrorBox(
        "Error deleting image",
        `Failed to delete the image: ${message}`
      );
      return false;
    }
  }
);
