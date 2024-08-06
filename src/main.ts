import { findDuplicateFiles } from "./find-duplicate-files";
import { logger } from "./logger";

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

  logger.info(`find duplicated files in "${dirPath}"`);
  const duplicatedFiles = await findDuplicateFiles(dirPath, ignoredDirs);
  if (duplicatedFiles.length === 0) {
    logger.info("No duplicate files found");
    return;
  }

  logger.info("Duplicate files found:");
  for (let i = 0; i < duplicatedFiles.length; i++) {
    logger.info(`\nFile no.${i + 1}:`);
    for (const filePath of duplicatedFiles[i]) {
      logger.info(" - " + filePath);
    }
  }

  console.log(""); // new line
  console.timeEnd("Done");
}

main();
