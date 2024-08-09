import { type PathLike } from "node:fs";
import { stat } from "node:fs/promises";
import { FileHash } from "./file-hash";

export interface FileHashCache {
  get(key: string): Promise<string | undefined>;
  set(key: string, value: string): Promise<void>;
}

export class FileHashWithCache extends FileHash {
  constructor(private readonly fileHashCache: FileHashCache) {
    super();
  }

  public async getCacheKeyFromPath(path: PathLike): Promise<string> {
    const fileStat = await stat(path);
    return [path, fileStat.mtimeMs].join(":");
  }

  public override async getHash(filePath: string): Promise<string> {
    const cacheKey = await this.getCacheKeyFromPath(filePath);
    let fileHash = await this.fileHashCache.get(cacheKey);
    if (fileHash === undefined) {
      fileHash = await this.calculateHash(filePath);
      await this.fileHashCache.set(cacheKey, fileHash);
    }
    return fileHash;
  }
}
