import { unlink } from "fs/promises";
import trash from "trash";

export async function deleteFile(path: string, softDelete = false): Promise<void> {
  if (softDelete) return trash(path);
  return unlink(path);
}
