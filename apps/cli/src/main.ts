import { Command } from "commander";
import { findDuplicateFiles } from "./find-duplicate-files";
import { logger } from "./logger";
import { ignoredDirs } from "./configs/ignore-dirs";

interface Options {
  dir: string;
}

const program = new Command();

program.requiredOption("-d, --dir <path>", "specify the directory path", ".").action(async () => {
  const options = program.opts<Options>();

  console.time("Done");

  logger.info(`find duplicated files in "${options.dir}"`);
  const duplicatedFiles = await findDuplicateFiles(options.dir, ignoredDirs);
  if (duplicatedFiles.length === 0) {
    logger.info("No duplicate files found");
    process.exit(0);
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
});

program.parse(process.argv);
