import { resolve } from "node:path";

import sharp from "sharp";

const projectRoot = process.cwd();
const source = resolve(
  projectRoot,
  "public/images/home/systems-modernization-hero-source.png",
);

for (const [filename, width] of [
  ["systems-modernization-hero-1600.webp", 1600],
  ["systems-modernization-hero-960.webp", 960],
]) {
  await sharp(source)
    .resize({ fit: "inside", withoutEnlargement: true, width })
    .webp({ effort: 6, quality: 82, smartSubsample: true })
    .toFile(resolve(projectRoot, "public/images/home", filename));
}
