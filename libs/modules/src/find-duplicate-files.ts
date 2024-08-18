import { setToArray } from "./utils/set";
import { traverseDirectory } from "./directory";
import { FileHash } from "./file-hash";

export class FindDuplicateFiles {
  static defaultIgnoreDirs: string[] = [
    "node_modules",
    ".git",
    "dist",
    "build",
    "logs",
    "coverage",
    ".vscode",
    ".idea",
    ".cache",
    "tmp",
    "temp",
    "venv",
    ".nx",
    ".dup-detector",
  ];

  constructor(private readonly fileHash: FileHash) {}

  public async find(
    dirPath: string,
    ignoredDirs: string[] = FindDuplicateFiles.defaultIgnoreDirs
  ): Promise<string[][]> {
    const fileHashes = new Map<string, string[]>();
    const duplicates = new Set<string[]>();

    for await (const filePath of traverseDirectory(dirPath, ignoredDirs)) {
      const fileHash = await this.fileHash.getHash(filePath);
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
