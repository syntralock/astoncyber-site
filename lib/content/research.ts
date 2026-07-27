import { evaluateSafeMdxBody } from "./mdx.ts";
import {
  type ContentRepositoryOptions,
  loadContentRepository,
  publicItems,
  type PublicResearchItem,
  type ResolvedResearchItem as InternalResearchItem,
} from "./repository.ts";
import type { TaxonomyReference } from "./schema.ts";

export type {
  ContentRepositoryOptions,
  InternalResearchItem,
  PublicResearchItem as ResolvedResearchItem,
};

export async function loadResearchCollection(
  options: ContentRepositoryOptions = {},
): Promise<readonly InternalResearchItem[]> {
  return (await loadContentRepository(options)).research;
}

export async function getPublicResearch(
  options: ContentRepositoryOptions = {},
): Promise<readonly PublicResearchItem[]> {
  const items = publicItems((await loadContentRepository(options)).research);
  return [...items].sort((left, right) => {
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

export async function getPublicResearchTopics(
  options: ContentRepositoryOptions = {},
) {
  const items = await getPublicResearch(options);
  const topics = new Map<
    string,
    Readonly<{
      items: readonly PublicResearchItem[];
      topic: TaxonomyReference;
    }>
  >();

  for (const item of items) {
    for (const topic of item.topics) {
      const current = topics.get(topic.id);
      topics.set(topic.id, {
        topic,
        items: [...(current?.items ?? []), item],
      });
    }
  }

  return [...topics.values()].sort((left, right) =>
    left.topic.label.localeCompare(right.topic.label),
  );
}

export async function getPublicResearchByTopic(
  slug: string,
  options: ContentRepositoryOptions = {},
) {
  const topics = await getPublicResearchTopics(options);
  return topics.find(({ topic }) => topic.id === slug);
}

export async function evaluateResearchBody(item: PublicResearchItem) {
  return evaluateSafeMdxBody(item.body);
}

export async function validateContentRepository(
  options: ContentRepositoryOptions = {},
) {
  return loadContentRepository(options);
}
