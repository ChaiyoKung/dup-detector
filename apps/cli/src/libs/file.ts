import { createReadStream, type PathLike } from "node:fs";
import { stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import { Cache } from "file-system-cache";
import { resolve } from "node:path";

export const fileHashCache = new Cache({ basePath: resolve(__dirname, "../../.dup-detector/.cache") });

export function calculateFileHash(path: PathLike) {
  return new Promise<string>((resolve, reject) => {
    const hash = createHash("sha256");
    const stream = createReadStream(path);
    stream.on("error", reject);
    stream.on("data", (data) => hash.update(data));
    stream.on("end", () => resolve(hash.digest("hex")));
  });
}

export async function getCacheKeyFromPath(path: PathLike) {
  const fileStat = await stat(path);
  return [path, fileStat.mtimeMs].join(":");
}

export async function getFileHash(filePath: string) {
  const cacheKey = await getCacheKeyFromPath(filePath);
  let fileHash = await fileHashCache.get(cacheKey);
  if (fileHash === undefined) {
    fileHash = await calculateFileHash(filePath);
    await fileHashCache.set(cacheKey, fileHash);
  }
  return fileHash;
}
