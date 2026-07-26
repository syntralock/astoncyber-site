import { access, readFile } from "node:fs/promises";
import path from "node:path";

import {
  generateResearchRss,
  generateResearchSitemapEntries,
} from "../lib/content/generated.ts";
import { evaluateSafeMdx } from "../lib/content/mdx.ts";
import {
  getPublicResearch,
  validateContentRepository,
} from "../lib/content/research.ts";

const research = await validateContentRepository();
const fixtures = research.filter(
  (item) => item.metadata.visibility === "fixture",
);

if (fixtures.length !== 1) {
  throw new Error(
    `Phase 5 requires exactly one technical research fixture; found ${fixtures.length}.`,
  );
}

const fixture = fixtures[0];
if (!fixture) {
  throw new Error("Phase 5 technical fixture could not be loaded.");
}

const fixtureSource = await readFile(fixture.filePath, "utf8");
await evaluateSafeMdx(fixtureSource);

const publicResearch = await getPublicResearch();
const rss = generateResearchRss(publicResearch);
const sitemapEntries = generateResearchSitemapEntries(publicResearch);

for (const item of research) {
  if (
    item.metadata.visibility !== "public" &&
    (rss.includes(item.metadata.slug) ||
      sitemapEntries.some((entry) => entry.url.includes(item.metadata.slug)))
  ) {
    throw new Error(
      `${item.filePath}: non-public content entered a generated public output`,
    );
  }

  if (item.metadata.artifact) {
    const artifactPath = path.join(
      process.cwd(),
      "public",
      item.metadata.artifact.path,
    );
    try {
      await access(artifactPath);
    } catch (error) {
      throw new Error(
        `${item.filePath}: downloadable artifact does not exist at ${artifactPath}`,
        { cause: error },
      );
    }
  }
}

console.log(
  `Validated ${research.length} research file(s): ${publicResearch.length} public, ${fixtures.length} fixture.`,
);
