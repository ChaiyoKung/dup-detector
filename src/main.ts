import { createReadStream } from "node:fs";
import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { createHash } from "node:crypto";

async function traverseDirectory(path: string): Promise<Array<string>> {
  const fileList: Array<string> = [];

  const dirents = await readdir(path, { withFileTypes: true });
  for (const dirent of dirents) {
    const fullPath = join(dirent.parentPath, dirent.name);
    if (dirent.isDirectory()) {
      fileList.push(...(await traverseDirectory(fullPath)));
    } else {
      fileList.push(fullPath);
    }
  }

  return fileList;
}

function calculateFileHash(filePath: string) {
  return new Promise<string>((resolve, reject) => {
    const hash = createHash("sha256");
    const stream = createReadStream(filePath);
    stream.on("error", reject);
    stream.on("data", (data) => hash.update(data));
    stream.on("end", () => resolve(hash.digest("hex")));
  });
}

function mapToObject<V>(map: Map<string, V>) {
  return Object.fromEntries(map.entries());
}

async function findDuplicateFiles(dirPath: string) {
  const filePaths = await traverseDirectory(dirPath);
  const fileHashes = new Map<string, Array<string>>();

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

async function main() {
  const dirPath = process.argv[2];
  const duplicatedFiles = await findDuplicateFiles(dirPath);
  console.log(duplicatedFiles);
}

main();
