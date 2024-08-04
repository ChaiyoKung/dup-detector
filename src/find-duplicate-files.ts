import { type PathLike } from "node:fs";
import { setToArray } from "./utils/set";
import { traverseDirectory } from "./libs/directory";
import { calculateFileHash } from "./libs/file";

export async function findDuplicateFiles(dirPath: PathLike, ignoredDirs: string[] = []) {
  const fileHashes = new Map<string, string[]>();
  const duplicates = new Set<string[]>();

  const filePaths = await traverseDirectory(dirPath, ignoredDirs);
  for (const filePath of filePaths) {
    const fileHash = await calculateFileHash(filePath);

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
