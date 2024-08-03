import { createReadStream, type PathLike } from "node:fs";
import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { createHash } from "node:crypto";

async function traverseDirectory(path: PathLike, ignoredDirs: Array<string> = []): Promise<Array<string>> {
  const fileList: Array<string> = [];

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

function calculateFileHash(path: PathLike) {
  return new Promise<string>((resolve, reject) => {
    const hash = createHash("sha256");
    const stream = createReadStream(path);
    stream.on("error", reject);
    stream.on("data", (data) => hash.update(data));
    stream.on("end", () => resolve(hash.digest("hex")));
  });
}

function mapToObject<V>(map: Map<string, V>) {
  return Object.fromEntries(map.entries());
}

async function findDuplicateFiles(dirPath: PathLike, ignoredDirs: Array<string> = []) {
  const fileHashes = new Map<string, Array<string>>();

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

  return mapToObject(fileHashes);
}

const ignoredDirs = [
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
];

async function main() {
  const dirPath = process.argv[2] ?? ".";
  const duplicatedFiles = await findDuplicateFiles(dirPath, ignoredDirs);
  for (const [fileHash, fileList] of Object.entries(duplicatedFiles)) {
    const isDuplicated = fileList.length > 1;
    if (!isDuplicated) continue;

    console.log(fileHash);
    for (const filePath of fileList) {
      console.log(" - " + filePath);
    }
  }
}

main();
