import { dirname, join } from "node:path";
import { readFileSync, copyFileSync, createWriteStream } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { encode, decode } from "./base85.js";

import log from "npmlog";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

export default function compile(dataPath, buildPath) {
    log.info("compile", "Loading data");
    const data = new Uint8Array(readFileSync(join(dataPath, "data.zip")));
    copyFileSync(join(__dirname, "client/jsvfs.js"), join(buildPath, "jsvfs.js"));
	copyFileSync(require.resolve("jszip/dist/jszip.min.js"), join(buildPath, "jszip.js"))
    log.verbose("compile", "Writing data");
    createWriteStream(join(buildPath, "data.js")).end(createData(data));
    log.info("compile", "Done");
}

function createData(data) {
    return readFileSync(join(__dirname, "client/data.template.js"), { encoding: "utf8" })
        .replace("DATA", encode(data.buffer).replaceAll("\\", "\\\\"))
		.replace("DECODE", decode.toString());
}