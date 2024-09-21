import * as esbuild from "esbuild";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const run = async () => {
    const outputDir = path.join(__dirname, "/../dist");
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    const files = fs.readdirSync(outputDir);
    await Promise.all(files.map(file => {
        return fs.promises.unlink(path.join(outputDir, file));
    }));

    await Promise.all([
        fs.promises.copyFile(path.join(__dirname, "/../src/style.css"), path.join(outputDir, "style.css")),
        fs.promises.copyFile(path.join(__dirname, "/../src/index.html"), path.join(outputDir, "index.html"))
    ]);
    
    return esbuild.build({
        entryPoints: ["src/index.ts"],
        bundle: true,
        minify: true,
        sourcemap: false,
        outfile: "dist/index.js",
    });
};

run().catch((error) => {console.error(error); process.exit(1)});
