import { createReadStream, type PathLike } from "node:fs";
import { createHash } from "node:crypto";

export class FileHash {
  public async calculateFileHash(path: PathLike): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const hash = createHash("sha256");
      const stream = createReadStream(path);
      stream.on("error", reject);
      stream.on("data", (data) => hash.update(data));
      stream.on("end", () => resolve(hash.digest("hex")));
    });
  }

  public async getFileHash(filePath: string): Promise<string> {
    return this.calculateFileHash(filePath);
  }
}
