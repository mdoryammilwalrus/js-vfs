import * as path from "node:path";
import * as fs from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

import JSZip from "jszip";
import log from "npmlog";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

export default async function compile(dataPath, buildPath) {
    log.info("compile", "Loading data");
    const data = fs.readFileSync(path.join(dataPath, "data.zip"));
    const zip = await JSZip.loadAsync(data, { createFolders: true });
    fs.copyFileSync(path.join(__dirname, "client/inject.js"), path.join(buildPath, "inject.js"));
    log.verbose("compile", "Writing data");
    fs.createWriteStream(path.join(buildPath, "data.js")).end(await createData(zip));
    log.info("compile", "Done");
}

async function createData(zip) {
    const data = await zip.generateAsync({ type: "uint8array" });
    return fs.readFileSync(path.join(__dirname, "client/data.template.js"), { encoding: "utf8" })
        .replace("DATA", JSON.stringify(Array.from(data)))
        .replace("JSZip", fs.readFileSync(require.resolve("jszip/dist/jszip.min.js"), { encoding: "utf8" }));
}