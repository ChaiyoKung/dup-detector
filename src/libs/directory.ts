import { type PathLike } from "node:fs";
import { readdir } from "node:fs/promises";
import { resolve } from "node:path";

export async function* traverseDirectory(path: PathLike, ignoredDirs: string[] = []): AsyncGenerator<string> {
  const dirents = await readdir(path, { withFileTypes: true });
  for (const dirent of dirents) {
    const fullPath = resolve(dirent.parentPath, dirent.name);
    if (dirent.isDirectory()) {
      if (ignoredDirs.includes(dirent.name)) continue;
      yield* traverseDirectory(fullPath, ignoredDirs);
    } else {
      yield fullPath;
    }
  }
}
