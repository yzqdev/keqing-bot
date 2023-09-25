import { mkdirSync, readdirSync, readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

/**
 * 文件夹是否存在
 * @param dirPath
 */
export const ensureDirExistSync = (dirPath: string): void => {
  try {
    readdirSync(dirPath);
  } catch (err) {
    mkdirSync(dirPath, { recursive: true });
  }
};

/**
 * 获取files文件夹
 * @param dirPath files下级文件夹
 * @param fileName 文件名称
 */
export function readVendorFile(dirPath: string = "", fileName: string) {
  return readFileSync(
    join(
      dirname(fileURLToPath(import.meta.url)),
      "../files",
      dirPath,
      fileName,
    ),
  );
}

export function getPup(dirPath: string, fileName: string) {
  return join(process.cwd(), "files", dirPath, fileName);
}
