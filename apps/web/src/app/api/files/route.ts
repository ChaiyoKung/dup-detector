import { contentType } from "mime-types";
import { NextRequest, NextResponse } from "next/server";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { extractErrorMessage } from "../../../../utils/extract-error-message";
import { deleteFile } from "@dup-detector/modules";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const path = searchParams.get("path");
  if (!path) {
    return NextResponse.json({ message: "file not found" }, { status: 404 });
  }

  if (!existsSync(path)) {
    return NextResponse.json({ message: "file not found" }, { status: 404 });
  }

  const type = contentType(path);
  if (!type) {
    return NextResponse.json({ message: "invalid file type" }, { status: 400 });
  }

  try {
    const data = await readFile(path);
    return new NextResponse(data, { headers: { "Content-Type": type } });
  } catch (error) {
    console.error(error);
    const errorMessage = extractErrorMessage(error);
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const path = body.path;
    if (!path) {
      return NextResponse.json({ message: "file not found" }, { status: 404 });
    }

    await deleteFile(decodeURIComponent(path));
    return Response.json({ message: "delete file success" });
  } catch (error) {
    console.error(error);
    const errorMessage = extractErrorMessage(error);
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
