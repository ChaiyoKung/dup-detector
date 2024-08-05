import { createReadStream, type PathLike } from "node:fs";
import { stat } from "node:fs/promises";
import { createHash } from "node:crypto";

export function calculateFileHash(path: PathLike) {
  return new Promise<string>((resolve, reject) => {
    const hash = createHash("sha256");
    const stream = createReadStream(path);
    stream.on("error", reject);
    stream.on("data", (data) => hash.update(data));
    stream.on("end", () => resolve(hash.digest("hex")));
  });
}

export async function getFileCacheKey(path: PathLike) {
  const fileStat = await stat(path);
  return [path, fileStat.mtimeMs].join(":");
}
