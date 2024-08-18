import { FileHashWithCache, FileSystemCacheAdapter, FindDuplicateFiles } from "@dup-detector/modules";
import { NextRequest, NextResponse } from "next/server";
import { extractErrorMessage } from "../../../../utils/extract-error-message";
import { FileSystemCache } from "file-system-cache";
import { resolve } from "node:path";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const dirPath = searchParams.get("dirPath");
  if (!dirPath) {
    return NextResponse.json({ message: "required 'dirPath' query params" }, { status: 400 });
  }

  try {
    const fileHashCache = new FileSystemCache({ basePath: resolve(process.cwd(), ".dup-detector/.cache") });
    const fileHashWithCache = new FileHashWithCache(new FileSystemCacheAdapter(fileHashCache));
    const findDuplicateFiles = new FindDuplicateFiles(fileHashWithCache);
    const duplicatedFiles = await findDuplicateFiles.find(dirPath);
    return NextResponse.json({ data: duplicatedFiles });
  } catch (error) {
    console.error(error);
    const errorMessage = extractErrorMessage(error);
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
