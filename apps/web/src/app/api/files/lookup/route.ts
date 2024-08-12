import { lookup } from "mime-types";
import { NextRequest, NextResponse } from "next/server";
import { existsSync } from "node:fs";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const path = searchParams.get("path");
  if (!path) {
    return NextResponse.json({ message: "file not found" }, { status: 404 });
  }

  if (!existsSync(path)) {
    return NextResponse.json({ message: "file not found" }, { status: 404 });
  }

  const type = lookup(path);
  if (!type) {
    return NextResponse.json({ message: "invalid file type" }, { status: 400 });
  }

  return NextResponse.json({ data: type });
}
