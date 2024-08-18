import { FileSystemCache } from "file-system-cache";
import { FileHashCache } from "./file-hash-with-cache";

export class FileSystemCacheAdapter implements FileHashCache {
  constructor(private readonly fileSystemCache: FileSystemCache) {}

  public async get(key: string): Promise<string | undefined> {
    return this.fileSystemCache.get(key);
  }

  public async set(key: string, value: string): Promise<void> {
    await this.fileSystemCache.set(key, value);
  }
}
