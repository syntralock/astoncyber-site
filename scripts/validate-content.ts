import { access } from "node:fs/promises";
import path from "node:path";

import {
  generateResearchRss,
  generateResearchSitemapEntries,
} from "../lib/content/generated.ts";
import { getPublicResearch } from "../lib/content/research.ts";
import { loadContentRepository } from "../lib/content/repository.ts";

const repository = await loadContentRepository();
const publicResearch = await getPublicResearch();
const rss = generateResearchRss(publicResearch);
const sitemapEntries = generateResearchSitemapEntries(publicResearch);

for (const item of repository.research) {
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
  `Validated ${repository.research.length} research, ${repository.projects.length} project, and ${repository.labs.length} lab file(s): ${publicResearch.length} public research.`,
);
