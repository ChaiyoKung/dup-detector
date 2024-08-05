import { describe, it, expect } from "bun:test";
import { FileCache } from "./file-cache";
import { rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cacheDir = ".dup-detector";

describe(FileCache.name, () => {
  it("should create cache file", () => {
    const file = "cache-1.test.cache";
    const cachePath = join(cacheDir, file);

    expect(() => new FileCache(file)).not.toThrowError();

    rmSync(cachePath);
  });

  it("should load cache file", () => {
    const file = "cache-2.test.cache";
    const cachePath = join(cacheDir, file);
    writeFileSync(cachePath, JSON.stringify([]));

    expect(() => new FileCache(file)).not.toThrowError();

    rmSync(cachePath);
  });
});
