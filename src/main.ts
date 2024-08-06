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
  ".dup-detector",
];

async function main() {
  console.time("Done");
  const dirPath = process.argv[2] ?? ".";

  console.log(`find duplicated files in "${dirPath}"`);
  const duplicatedFiles = await findDuplicateFiles(dirPath, ignoredDirs);
  if (duplicatedFiles.length === 0) {
    console.log("No duplicate files found");
    return;
  }

  console.log("Duplicate files found:");
  for (let i = 0; i < duplicatedFiles.length; i++) {
    console.log(`\nFile no.${i + 1}:`);
    for (const filePath of duplicatedFiles[i]) {
      console.log(" - " + filePath);
    }
  }

  console.log(""); // new line
  console.timeEnd("Done");
}

main();
