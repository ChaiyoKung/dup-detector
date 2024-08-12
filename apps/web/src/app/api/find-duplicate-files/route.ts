import { FileHash, FindDuplicateFiles } from "@dup-detector/modules";
import { NextRequest, NextResponse } from "next/server";
import { extractErrorMessage } from "../../../../utils/extract-error-message";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const dirPath = searchParams.get("dirPath");
  if (!dirPath) {
    return NextResponse.json({ message: "required 'dirPath' query params" }, { status: 400 });
  }

  try {
    const findDuplicateFiles = new FindDuplicateFiles(new FileHash());
    const ignoreDirs: string[] = [...FindDuplicateFiles.defaultIgnoreDirs, ".next"];
    const duplicatedFiles = await findDuplicateFiles.find(dirPath, ignoreDirs);
    return NextResponse.json({ data: duplicatedFiles });
  } catch (error) {
    console.error(error);
    const errorMessage = extractErrorMessage(error);
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
