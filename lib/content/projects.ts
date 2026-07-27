import {
  type ContentRepositoryOptions,
  loadContentRepository,
  publicItems,
  type PublicProjectItem,
  resolvePublicRelationships,
  type ResolvedProjectItem,
} from "./repository.ts";
import { evaluateSafeMdxBody } from "./mdx.ts";
import type { Metadata } from "next";

export type { PublicProjectItem, ResolvedProjectItem };

export async function loadProjectCollection(
  options: ContentRepositoryOptions = {},
) {
  return (await loadContentRepository(options)).projects;
}

export async function getPublicProjects(
  options: ContentRepositoryOptions = {},
) {
  const items = publicItems((await loadContentRepository(options)).projects);
  return [...items].sort((left, right) => {
    const leftDate =
      left.metadata.published_at ?? left.metadata.completed_at ?? "";
    const rightDate =
      right.metadata.published_at ?? right.metadata.completed_at ?? "";
    return (
      rightDate.localeCompare(leftDate) ||
      left.metadata.slug.localeCompare(right.metadata.slug)
    );
  });
}

export async function getPublicProjectBySlug(
  slug: string,
  options: ContentRepositoryOptions = {},
) {
  return (await getPublicProjects(options)).find(
    (item) => item.metadata.slug === slug,
  );
}

export async function getPublicProjectStaticParams(
  options: ContentRepositoryOptions = {},
) {
  return (await getPublicProjects(options)).map((item) => ({
    slug: item.metadata.slug,
  }));
}

export async function resolvePublicProjectRelationships(
  slug: string,
  options: ContentRepositoryOptions = {},
) {
  return resolvePublicRelationships("projects", slug, options);
}

export async function evaluateProjectBody(item: { body: string }) {
  return evaluateSafeMdxBody(item.body);
}

export function metadataForPublicProject(item: PublicProjectItem): Metadata {
  return { description: item.metadata.summary, title: item.metadata.title };
}
