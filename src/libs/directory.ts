import { type PathLike } from "node:fs";
import { readdir } from "node:fs/promises";
import { join } from "node:path";

export async function traverseDirectory(path: PathLike, ignoredDirs: string[] = []): Promise<string[]> {
  const fileList: string[] = [];

  const dirents = await readdir(path, { withFileTypes: true });
  for (const dirent of dirents) {
    const fullPath = join(dirent.parentPath, dirent.name);
    if (dirent.isDirectory()) {
      if (ignoredDirs.includes(dirent.name)) continue;
      fileList.push(...(await traverseDirectory(fullPath, ignoredDirs)));
    } else {
      fileList.push(fullPath);
    }
  }

  return fileList;
}
