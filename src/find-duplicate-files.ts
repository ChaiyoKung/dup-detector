import { type PathLike } from "node:fs";
import { setToArray } from "./utils/set";
import { traverseDirectory } from "./libs/directory";
import { calculateFileHash, getFileCacheKey } from "./libs/file";
import { Cache } from "file-system-cache";

export async function findDuplicateFiles(dirPath: PathLike, ignoredDirs: string[] = []) {
  const fileHashes = new Map<string, string[]>();
  const duplicates = new Set<string[]>();
  const fileHashCache = new Cache({ basePath: "./.dup-detector/.cache" });

  const filePaths = await traverseDirectory(dirPath, ignoredDirs);
  for (const filePath of filePaths) {
    const cacheKey = await getFileCacheKey(filePath);
    let fileHash = await fileHashCache.get(cacheKey);
    if (fileHash === undefined) {
      fileHash = await calculateFileHash(filePath);
      fileHashCache.set(cacheKey, fileHash);
    }

    const existingFiles = fileHashes.get(fileHash);
    if (existingFiles === undefined) {
      fileHashes.set(fileHash, [filePath]);
    } else {
      existingFiles.push(filePath);
    }
  }

  for (const fileList of fileHashes.values()) {
    if (fileList.length > 1) duplicates.add(fileList);
  }

  return setToArray(duplicates);
}
