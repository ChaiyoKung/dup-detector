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

function setToArray<T>(set: Set<T>) {
  return Array.from(set);
}

async function findDuplicateFiles(dirPath: PathLike, ignoredDirs: Array<string> = []) {
  const fileHashes = new Map<string, Array<string>>();
  const duplicates = new Set<Array<string>>();

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

  console.log(`find duplicated files in "${dirPath}"`);
  const duplicatedFiles = await findDuplicateFiles(dirPath, ignoredDirs);
  if (duplicatedFiles.length === 0) {
    console.log("No duplicate files found");
    return;
  }

  console.log("Duplicate files found:");
  for (const [index, fileList] of duplicatedFiles.entries()) {
    console.log(`\nFile no.${index + 1}:`);
    for (const filePath of fileList) {
      console.log(" - " + filePath);
    }
  }
}

main();
