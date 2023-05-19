import { rmSync, mkdirSync } from "node:fs";
import { join } from "node:path";

import { Command } from "commander";
import log from "npmlog";
import packageJSON from "./package.json" assert { type: "json" };
import compile from "./lib/compile.js";
const program = new Command();

program
    .name("js-vfs")
    .version(packageJSON.version);

program.option("-v, --verbose", "enable verbose logging");

program.command("compile")
    .description("compile vfs build")
    .option("-f --file [path]", "path to zip archive of files", "./data.zip")
    .option("-o --output [path]", "output folder", "./build")
    .argument("[path]", "path to folder", ".")
    .action((path, options) => {
        const dir = join(process.cwd(), path);
        log.info("init", "Starting")
        log.verbose("init", "Creating build folder");
        rmSync(join(dir, options.output), { recursive: true, force: true });
        mkdirSync(join(dir, options.output));
        compile(dir, join(process.cwd(), options.output));
    });

program.on('option:verbose', () => {
    log.level = "verbose";
});

program.parse(process.argv);