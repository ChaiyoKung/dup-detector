import { Command } from "commander";
import { FileHashWithCache, FindDuplicateFiles } from "@dup-detector/modules";
import { logger } from "./logger";
import { resolve } from "node:path";
import { FileSystemCacheAdapter } from "./file-system-cache-adapter";
import { FileSystemCache } from "file-system-cache";

interface Options {
  dir: string;
}

const fileHashCache = new FileSystemCache({ basePath: resolve(__dirname, "../.dup-detector/.cache") });
const fileHashWithCache = new FileHashWithCache(new FileSystemCacheAdapter(fileHashCache));
const findDuplicateFiles = new FindDuplicateFiles(fileHashWithCache);

const program = new Command();

program.requiredOption("-d, --dir <path>", "specify the directory path", ".").action(async () => {
  const options = program.opts<Options>();

  console.time("Done");

  logger.info(`find duplicated files in "${options.dir}"`);
  const ignoreDirs: string[] = [...FindDuplicateFiles.defaultIgnoreDirs, ".dup-detector"];
  const duplicatedFiles = await findDuplicateFiles.find(options.dir, ignoreDirs);
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
});

program.parse(process.argv);
