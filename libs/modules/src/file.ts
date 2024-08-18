import { unlink } from "fs/promises";

export async function deleteFile(path: string): Promise<void> {
  return unlink(path);
}
