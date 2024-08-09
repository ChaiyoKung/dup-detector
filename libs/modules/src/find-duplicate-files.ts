import { setToArray } from "./utils/set";
import { traverseDirectory } from "./directory";
import { FileHash } from "./file-hash";

export class FindDuplicateFiles {
  constructor(private readonly fileHash: FileHash) {}

  public async findDuplicateFiles(dirPath: string, ignoredDirs: string[] = []): Promise<string[][]> {
    const fileHashes = new Map<string, string[]>();
    const duplicates = new Set<string[]>();

    for await (const filePath of traverseDirectory(dirPath, ignoredDirs)) {
      const fileHash = await this.fileHash.getFileHash(filePath);
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
}
