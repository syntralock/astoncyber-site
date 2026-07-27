import {
  type ContentRepositoryOptions,
  loadContentRepository,
  publicItems,
  type PublicLabItem,
  resolvePublicRelationships,
  type ResolvedLabItem,
} from "./repository.ts";
import { evaluateSafeMdxBody } from "./mdx.ts";
import type { Metadata } from "next";

export type { PublicLabItem, ResolvedLabItem };

export async function loadLabCollection(
  options: ContentRepositoryOptions = {},
) {
  return (await loadContentRepository(options)).labs;
}

export async function getPublicLabs(options: ContentRepositoryOptions = {}) {
  const items = publicItems((await loadContentRepository(options)).labs);
  return [...items].sort(
    (left, right) =>
      (right.metadata.published_at ?? "").localeCompare(
        left.metadata.published_at ?? "",
      ) || left.metadata.slug.localeCompare(right.metadata.slug),
  );
}

export async function getPublicLabBySlug(
  slug: string,
  options: ContentRepositoryOptions = {},
) {
  return (await getPublicLabs(options)).find(
    (item) => item.metadata.slug === slug,
  );
}

export async function getPublicLabStaticParams(
  options: ContentRepositoryOptions = {},
) {
  return (await getPublicLabs(options)).map((item) => ({
    slug: item.metadata.slug,
  }));
}

export async function resolvePublicLabRelationships(
  slug: string,
  options: ContentRepositoryOptions = {},
) {
  return resolvePublicRelationships("labs", slug, options);
}

export async function evaluateLabBody(item: { body: string }) {
  return evaluateSafeMdxBody(item.body);
}

export function metadataForPublicLab(item: PublicLabItem): Metadata {
  return { description: item.metadata.summary, title: item.metadata.title };
}
