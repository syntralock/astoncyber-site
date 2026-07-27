import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";

import { parse } from "yaml";
import type { ZodType } from "zod";

import { compileSafeMdxBody, parseMdxSource } from "./mdx.ts";
import {
  authorRegistrySchema,
  type AuthorReference,
  labMetadataSchema,
  type LabMetadata,
  projectMetadataSchema,
  type ProjectMetadata,
  researchMetadataSchema,
  type ResearchMetadata,
  taxonomyRegistrySchema,
  type TaxonomyReference,
  technologyRegistrySchema,
  type TechnologyReference,
} from "./schema.ts";

export type ContentCollection = "labs" | "projects" | "research";

export type ContentRepositoryOptions = Readonly<{
  contentRoot?: string;
  publicRoot?: string;
}>;

type ResolvedItemBase<TMetadata> = Readonly<{
  body: string;
  compiledCode: string;
  contributors: readonly AuthorReference[];
  filePath: string;
  metadata: TMetadata;
  tags: readonly TaxonomyReference[];
  technologies: readonly TechnologyReference[];
  topics: readonly TaxonomyReference[];
}>;

export type ResolvedResearchItem = ResolvedItemBase<ResearchMetadata> &
  Readonly<{ authors: readonly AuthorReference[] }>;
export type ResolvedProjectItem = ResolvedItemBase<ProjectMetadata>;
export type ResolvedLabItem = ResolvedItemBase<LabMetadata>;

export type PublicContentItem<T extends { filePath: string }> = Omit<
  T,
  "filePath"
>;
export type PublicResearchItem = PublicContentItem<ResolvedResearchItem>;
export type PublicProjectItem = PublicContentItem<ResolvedProjectItem>;
export type PublicLabItem = PublicContentItem<ResolvedLabItem>;

export type ContentRepository = Readonly<{
  labs: readonly ResolvedLabItem[];
  projects: readonly ResolvedProjectItem[];
  research: readonly ResolvedResearchItem[];
}>;

export type PublicRelationshipSet = Readonly<{
  labs: readonly PublicLabItem[];
  projects: readonly PublicProjectItem[];
  research: readonly PublicResearchItem[];
}>;

type ReferenceRegistries = Readonly<{
  authors: ReadonlyMap<string, AuthorReference>;
  tags: ReadonlyMap<string, TaxonomyReference>;
  technologies: ReadonlyMap<string, TechnologyReference>;
  topics: ReadonlyMap<string, TaxonomyReference>;
}>;

const defaultContentRoot = path.join(process.cwd(), "content");
const defaultPublicRoot = path.join(process.cwd(), "public");

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

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
  const technologiesPath = path.join(referencesRoot, "technologies.yml");

  const [authors, topics, tags, technologies] = await Promise.all([
    parseRegistry(authorsPath, authorRegistrySchema),
    parseRegistry(topicsPath, taxonomyRegistrySchema),
    parseRegistry(tagsPath, taxonomyRegistrySchema),
    parseRegistry(technologiesPath, technologyRegistrySchema),
  ]);

  return {
    authors: createUniqueRegistry(authors, authorsPath),
    topics: createUniqueRegistry(topics, topicsPath),
    tags: createUniqueRegistry(tags, tagsPath),
    technologies: createUniqueRegistry(technologies, technologiesPath),
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

async function collectionFiles(
  contentRoot: string,
  collection: ContentCollection,
) {
  const collectionRoot = path.join(contentRoot, collection);
  let entries;
  try {
    entries = await readdir(collectionRoot, { withFileTypes: true });
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      error.code === "ENOENT" &&
      collection !== "research"
    ) {
      return [];
    }
    throw new Error(`${collectionRoot}: ${errorMessage(error)}`, {
      cause: error,
    });
  }

  const invalidEntry = entries.find(
    (entry) => entry.isDirectory() || !entry.name.endsWith(".mdx"),
  );
  if (invalidEntry) {
    throw new Error(
      `${path.join(collectionRoot, invalidEntry.name)}: ${collection} collection entries must be MDX files`,
    );
  }

  const files = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => path.join(collectionRoot, entry.name))
    .sort();

  if (collection === "research" && files.length === 0) {
    throw new Error(
      `${collectionRoot}: at least one research MDX file is required`,
    );
  }
  return files;
}

async function parseCollection<T>(
  contentRoot: string,
  collection: ContentCollection,
  schema: ZodType<T>,
) {
  const files = await collectionFiles(contentRoot, collection);
  const items = await Promise.all(
    files.map(async (filePath) => {
      try {
        const source = await readFile(filePath, "utf8");
        const parsed = parseMdxSource(source, schema);
        return {
          ...parsed,
          compiledCode: await compileSafeMdxBody(parsed.body),
          filePath,
        };
      } catch (error) {
        throw new Error(`${filePath}: ${errorMessage(error)}`, {
          cause: error,
        });
      }
    }),
  );

  const slugs = new Map<string, string>();
  for (const item of items) {
    const slug = (item.metadata as { slug: string }).slug;
    const previousFile = slugs.get(slug);
    if (previousFile) {
      throw new Error(
        `${item.filePath}: duplicate ${collection} slug "${slug}" also used by ${previousFile}`,
      );
    }
    slugs.set(slug, item.filePath);
  }
  return items;
}

async function validateResources(
  items: readonly (ResolvedProjectItem | ResolvedLabItem)[],
  publicRoot: string,
) {
  const normalizedPublicRoot = path.resolve(publicRoot);
  for (const item of items) {
    for (const resource of item.metadata.resources) {
      const filePath = path.resolve(
        normalizedPublicRoot,
        resource.path.replace(/^\/+/u, ""),
      );
      if (
        filePath !== normalizedPublicRoot &&
        !filePath.startsWith(`${normalizedPublicRoot}${path.sep}`)
      ) {
        throw new Error(`${item.filePath}: resource path leaves public root`);
      }
      try {
        await access(filePath);
      } catch (error) {
        throw new Error(
          `${item.filePath}: resource does not exist at ${resource.path}`,
          { cause: error },
        );
      }
    }
  }
}

function relationshipLists(
  collection: ContentCollection,
  item: ResolvedResearchItem | ResolvedProjectItem | ResolvedLabItem,
) {
  const lists: [ContentCollection, readonly string[]][] = [
    ["labs", item.metadata.related_labs],
    ["projects", item.metadata.related_projects],
  ];
  if (collection !== "research" && "related_research" in item.metadata) {
    lists.push(["research", item.metadata.related_research]);
  }
  return lists;
}

function validateRelationships(repository: ContentRepository) {
  const indexes = {
    labs: new Map(repository.labs.map((item) => [item.metadata.slug, item])),
    projects: new Map(
      repository.projects.map((item) => [item.metadata.slug, item]),
    ),
    research: new Map(
      repository.research.map((item) => [item.metadata.slug, item]),
    ),
  } as const;

  const allCollections = Object.keys(indexes) as ContentCollection[];
  for (const collection of allCollections) {
    for (const item of repository[collection]) {
      for (const [targetCollection, slugs] of relationshipLists(
        collection,
        item,
      )) {
        for (const slug of slugs) {
          if (targetCollection === collection && slug === item.metadata.slug) {
            throw new Error(
              `${item.filePath}: relationship must not reference itself "${slug}"`,
            );
          }
          const target = indexes[targetCollection].get(slug);
          if (!target) {
            const actualCollection = allCollections.find((candidate) =>
              indexes[candidate].has(slug),
            );
            const detail = actualCollection
              ? ` belongs to ${actualCollection}, not ${targetCollection}`
              : " does not exist";
            throw new Error(
              `${item.filePath}: ${targetCollection} relationship "${slug}"${detail}`,
            );
          }
          if (
            item.metadata.visibility === "public" &&
            target.metadata.visibility !== "public"
          ) {
            throw new Error(
              `${item.filePath}: public content cannot reference non-public ${targetCollection} "${slug}"`,
            );
          }
        }
      }
    }
  }
}

function withoutFilePath<T extends { filePath: string }>({
  filePath: _filePath,
  ...item
}: T): PublicContentItem<T> {
  void _filePath;
  return item;
}

export async function loadContentRepository(
  options: ContentRepositoryOptions = {},
): Promise<ContentRepository> {
  const contentRoot = options.contentRoot ?? defaultContentRoot;
  const publicRoot = options.publicRoot ?? defaultPublicRoot;
  const [references, researchItems, projectItems, labItems] = await Promise.all(
    [
      loadReferenceRegistries(contentRoot),
      parseCollection(contentRoot, "research", researchMetadataSchema),
      parseCollection(contentRoot, "projects", projectMetadataSchema),
      parseCollection(contentRoot, "labs", labMetadataSchema),
    ],
  );

  const research: ResolvedResearchItem[] = researchItems.map((item) => ({
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
    technologies: [],
  }));
  const projects: ResolvedProjectItem[] = projectItems.map((item) => ({
    ...item,
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
    technologies: resolveReferences(
      item.metadata.technologies,
      references.technologies,
      "technology",
      item.filePath,
    ),
  }));
  const labs: ResolvedLabItem[] = labItems.map((item) => ({
    ...item,
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
    technologies: resolveReferences(
      item.metadata.technologies,
      references.technologies,
      "technology",
      item.filePath,
    ),
  }));

  const repository = { labs, projects, research };
  await validateResources([...projects, ...labs], publicRoot);
  validateRelationships(repository);
  return repository;
}

export function publicItems<
  T extends ResolvedLabItem | ResolvedProjectItem | ResolvedResearchItem,
>(items: readonly T[]): readonly PublicContentItem<T>[] {
  return items
    .filter((item) => item.metadata.visibility === "public")
    .map(withoutFilePath);
}

export async function resolvePublicRelationships(
  collection: ContentCollection,
  slug: string,
  options: ContentRepositoryOptions = {},
): Promise<PublicRelationshipSet | undefined> {
  const repository = await loadContentRepository(options);
  const item = repository[collection].find(
    (candidate) =>
      candidate.metadata.slug === slug &&
      candidate.metadata.visibility === "public",
  );
  if (!item) {
    return undefined;
  }

  const relationships: {
    labs: PublicLabItem[];
    projects: PublicProjectItem[];
    research: PublicResearchItem[];
  } = { labs: [], projects: [], research: [] };

  for (const [targetCollection, slugs] of relationshipLists(collection, item)) {
    const targets = slugs
      .map((targetSlug) =>
        repository[targetCollection].find(
          (candidate) =>
            candidate.metadata.slug === targetSlug &&
            candidate.metadata.visibility === "public",
        ),
      )
      .filter((target) => target !== undefined)
      .map(withoutFilePath);

    if (targetCollection === "labs") {
      relationships.labs = targets as PublicLabItem[];
    } else if (targetCollection === "projects") {
      relationships.projects = targets as PublicProjectItem[];
    } else {
      relationships.research = targets as PublicResearchItem[];
    }
  }

  return relationships;
}
