import { setToArray } from "./utils/set";
import { traverseDirectory } from "./libs/directory";
import { getFileHash } from "./libs/file";

export async function findDuplicateFiles(dirPath: string, ignoredDirs: string[] = []) {
  const fileHashes = new Map<string, string[]>();
  const duplicates = new Set<string[]>();

  for await (const filePath of traverseDirectory(dirPath, ignoredDirs)) {
    const fileHash = await getFileHash(filePath);
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
