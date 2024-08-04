import { findDuplicateFiles } from "./find-duplicate-files";

const ignoredDirs = [
  "node_modules",
  ".git",
  "dist",
  "build",
  "logs",
  "coverage",
  ".vscode",
  ".idea",
  ".cache",
  "tmp",
  "temp",
  "venv",
];

async function main() {
  const dirPath = process.argv[2] ?? ".";

  console.log(`find duplicated files in "${dirPath}"`);
  const duplicatedFiles = await findDuplicateFiles(dirPath, ignoredDirs);
  if (duplicatedFiles.length === 0) {
    console.log("No duplicate files found");
    return;
  }

  console.log("Duplicate files found:");
  for (const [index, fileList] of duplicatedFiles.entries()) {
    console.log(`\nFile no.${index + 1}:`);
    for (const filePath of fileList) {
      console.log(" - " + filePath);
    }
  }
}

main();
