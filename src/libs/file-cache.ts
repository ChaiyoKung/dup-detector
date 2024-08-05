import { writeFileSync, readFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

export class FileCache {
  private cache: Map<string, string> = new Map<string, string>();
  public readonly cacheDir: string = ".dup-detector";
  public readonly cachePath: string;

  constructor(
    private readonly filePath: string,
    private readonly cacheFileEncoding: BufferEncoding = "utf-8"
  ) {
    this.cachePath = join(this.cacheDir, this.filePath);
    this.initCacheFile();
  }

  private loadCache() {
    try {
      const data = readFileSync(this.cachePath, { encoding: this.cacheFileEncoding });
      this.cache = new Map<string, string>(JSON.parse(data));
    } catch (error) {
      if (error instanceof Error && error.name === "ENOENT") {
        console.error("Error reading cache file:", error.message);
      } else {
        throw error;
      }
    }
  }

  private saveCache() {
    try {
      const data = JSON.stringify(Array.from(this.cache));
      writeFileSync(this.cachePath, data, { encoding: this.cacheFileEncoding });
    } catch (error) {
      if (error instanceof Error && error.name === "ENOENT") {
        console.error("Error writing cache file:", error.message);
      } else {
        throw error;
      }
    }
  }

  private createCacheDir() {
    try {
      mkdirSync(this.cacheDir);
    } catch (error) {
      if (error instanceof Error && error.name === "ENOENT") {
        console.error("Error writing cache dir:", error.message);
      } else {
        throw error;
      }
    }
  }

  private initCacheFile() {
    if (!existsSync(this.cacheDir)) {
      this.createCacheDir();
    }

    if (existsSync(this.cachePath)) {
      this.loadCache();
    } else {
      this.saveCache();
    }
  }

  public async set(key: string, value: string) {
    this.cache.set(key, value);
    this.saveCache();
  }

  public get(key: string) {
    return this.cache.get(key);
  }

  public delete(key: string) {
    this.cache.delete(key);
    this.saveCache();
  }

  public clear() {
    this.cache.clear();
    this.saveCache();
  }
}
