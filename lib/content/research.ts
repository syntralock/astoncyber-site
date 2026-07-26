import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

import { parse } from "yaml";
import type { ZodType } from "zod";

import { compileSafeMdx, parseResearchSource } from "./mdx.ts";
import {
  authorRegistrySchema,
  type AuthorReference,
  type ResearchMetadata,
  taxonomyRegistrySchema,
  type TaxonomyReference,
} from "./schema.ts";

export type ResolvedResearchItem = Readonly<{
  authors: readonly AuthorReference[];
  body: string;
  compiledCode: string;
  contributors: readonly AuthorReference[];
  filePath: string;
  metadata: ResearchMetadata;
  tags: readonly TaxonomyReference[];
  topics: readonly TaxonomyReference[];
}>;

export type ContentRepositoryOptions = Readonly<{
  contentRoot?: string;
}>;

type ReferenceRegistries = Readonly<{
  authors: ReadonlyMap<string, AuthorReference>;
  tags: ReadonlyMap<string, TaxonomyReference>;
  topics: ReadonlyMap<string, TaxonomyReference>;
}>;

const defaultContentRoot = path.join(process.cwd(), "content");

async function readYaml(filePath: string) {
  try {
    return parse(await readFile(filePath, "utf8"));
  } catch (error) {
    throw new Error(`${filePath}: ${errorMessage(error)}`, { cause: error });
  }
}

async function parseRegistry<T>(filePath: string, schema: ZodType<T>) {
  try {
    return await schema.parseAsync(await readYaml(filePath));
  } catch (error) {
    throw new Error(`${filePath}: ${errorMessage(error)}`, { cause: error });
  }
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

function createUniqueRegistry<T extends { id: string }>(
  values: readonly T[],
  filePath: string,
) {
  const registry = new Map<string, T>();

  for (const value of values) {
    if (registry.has(value.id)) {
      throw new Error(`${filePath}: duplicate reference id "${value.id}"`);
    }
    registry.set(value.id, value);
  }

  return registry;
}

async function loadReferenceRegistries(
  contentRoot: string,
): Promise<ReferenceRegistries> {
  const referencesRoot = path.join(contentRoot, "references");
  const authorsPath = path.join(referencesRoot, "authors.yml");
  const topicsPath = path.join(referencesRoot, "topics.yml");
  const tagsPath = path.join(referencesRoot, "tags.yml");

  const [authors, topics, tags] = await Promise.all([
    parseRegistry(authorsPath, authorRegistrySchema),
    parseRegistry(topicsPath, taxonomyRegistrySchema),
    parseRegistry(tagsPath, taxonomyRegistrySchema),
  ]);

  return {
    authors: createUniqueRegistry(authors, authorsPath),
    topics: createUniqueRegistry(topics, topicsPath),
    tags: createUniqueRegistry(tags, tagsPath),
  };
}

function resolveReferences<T>(
  ids: readonly string[],
  registry: ReadonlyMap<string, T>,
  kind: string,
  filePath: string,
) {
  return ids.map((id) => {
    const value = registry.get(id);
    if (!value) {
      throw new Error(`${filePath}: unresolved ${kind} reference "${id}"`);
    }
    return value;
  });
}

export async function loadResearchCollection(
  options: ContentRepositoryOptions = {},
): Promise<readonly ResolvedResearchItem[]> {
  const contentRoot = options.contentRoot ?? defaultContentRoot;
  const researchRoot = path.join(contentRoot, "research");
  const [entries, references] = await Promise.all([
    readdir(researchRoot, { withFileTypes: true }),
    loadReferenceRegistries(contentRoot),
  ]);

  const invalidEntry = entries.find(
    (entry) => entry.isDirectory() || !entry.name.endsWith(".mdx"),
  );
  if (invalidEntry) {
    throw new Error(
      `${path.join(researchRoot, invalidEntry.name)}: research collection entries must be MDX files`,
    );
  }

  const files = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => path.join(researchRoot, entry.name))
    .sort();

  if (files.length === 0) {
    throw new Error(
      `${researchRoot}: at least one research MDX file is required`,
    );
  }

  const parsedItems = await Promise.all(
    files.map(async (filePath) => {
      try {
        const source = await readFile(filePath, "utf8");
        const parsed = parseResearchSource(source);
        const compiled = await compileSafeMdx(source);
        return { ...parsed, compiledCode: compiled.code, filePath };
      } catch (error) {
        throw new Error(`${filePath}: ${errorMessage(error)}`, {
          cause: error,
        });
      }
    }),
  );

  const slugs = new Map<string, string>();
  for (const item of parsedItems) {
    const previousFile = slugs.get(item.metadata.slug);
    if (previousFile) {
      throw new Error(
        `${item.filePath}: duplicate research slug "${item.metadata.slug}" also used by ${previousFile}`,
      );
    }
    slugs.set(item.metadata.slug, item.filePath);
  }

  return parsedItems.map((item) => ({
    ...item,
    authors: resolveReferences(
      item.metadata.authors,
      references.authors,
      "author",
      item.filePath,
    ),
    contributors: resolveReferences(
      item.metadata.contributors,
      references.authors,
      "contributor",
      item.filePath,
    ),
    topics: resolveReferences(
      item.metadata.topics,
      references.topics,
      "topic",
      item.filePath,
    ),
    tags: resolveReferences(
      item.metadata.tags,
      references.tags,
      "tag",
      item.filePath,
    ),
  }));
}

export async function getPublicResearch(
  options: ContentRepositoryOptions = {},
) {
  const items = await loadResearchCollection(options);
  return items
    .filter((item) => item.metadata.visibility === "public")
    .sort((left, right) => {
      const dateOrder = (right.metadata.published_at ?? "").localeCompare(
        left.metadata.published_at ?? "",
      );
      return dateOrder || left.metadata.slug.localeCompare(right.metadata.slug);
    });
}

export async function getPublicResearchBySlug(
  slug: string,
  options: ContentRepositoryOptions = {},
) {
  const items = await getPublicResearch(options);
  return items.find((item) => item.metadata.slug === slug);
}

export async function validateContentRepository(
  options: ContentRepositoryOptions = {},
) {
  return loadResearchCollection(options);
}
