import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

import { compileSafeMdx } from "../lib/content/mdx.ts";

const contentDirectory = path.join(process.cwd(), "content", "research");
const entries = await readdir(contentDirectory);
const mdxFiles = entries.filter((entry) => entry.endsWith(".mdx"));

if (mdxFiles.length === 0) {
  throw new Error("At least one research MDX proof file is required.");
}

await Promise.all(
  mdxFiles.map(async (file) => {
    const source = await readFile(path.join(contentDirectory, file), "utf8");
    await compileSafeMdx(source);
  }),
);

console.log(`Validated ${mdxFiles.length} MDX file(s).`);
