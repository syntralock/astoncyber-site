import { z } from "zod";

export const contentSlugSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "must be a lowercase slug");

export const contentVisibilitySchema = z.enum(["public", "draft", "fixture"]);

export const researchStatusSchema = z.enum([
  "active",
  "archived",
  "completed",
  "preliminary",
  "technical-validation",
]);

export const researchTypeSchema = z.enum([
  "experiment",
  "research-paper",
  "technical-report",
  "white-paper",
]);

export const disclosureStatusSchema = z.enum([
  "coordinating",
  "disclosed",
  "not-applicable",
]);

export const citationSchema = z
  .object({
    label: z.string().min(1),
    publisher: z.literal("Aston Cyber"),
    year: z.number().int().min(2000).max(9999).optional(),
  })
  .strict();

export const researchMetadataSchema = z
  .object({
    title: z.string().min(1),
    slug: contentSlugSchema,
    summary: z.string().min(1),
    research_type: researchTypeSchema,
    status: researchStatusSchema,
    visibility: contentVisibilitySchema,
    published_at: z.iso.date().optional(),
    updated_at: z.iso.date().optional(),
    authors: z.array(contentSlugSchema).min(1),
    contributors: z.array(contentSlugSchema).default([]),
    topics: z.array(contentSlugSchema).min(1),
    tags: z.array(contentSlugSchema).min(1),
    featured: z.boolean().default(false),
    disclosure_status: disclosureStatusSchema.optional(),
    citation: citationSchema,
  })
  .strict()
  .superRefine((metadata, context) => {
    if (
      metadata.published_at &&
      metadata.updated_at &&
      metadata.updated_at < metadata.published_at
    ) {
      context.addIssue({
        code: "custom",
        message: "updated_at must not precede published_at",
        path: ["updated_at"],
      });
    }

    if (metadata.visibility === "public") {
      if (!metadata.published_at) {
        context.addIssue({
          code: "custom",
          message: "public research requires published_at",
          path: ["published_at"],
        });
      }

      if (!metadata.disclosure_status) {
        context.addIssue({
          code: "custom",
          message: "public research requires disclosure_status",
          path: ["disclosure_status"],
        });
      }

      if (metadata.status === "technical-validation") {
        context.addIssue({
          code: "custom",
          message: "public research cannot use technical-validation status",
          path: ["status"],
        });
      }
    }

    if (metadata.visibility === "fixture") {
      if (metadata.status !== "technical-validation") {
        context.addIssue({
          code: "custom",
          message: "fixtures require technical-validation status",
          path: ["status"],
        });
      }

      if (metadata.published_at) {
        context.addIssue({
          code: "custom",
          message: "fixtures must not define published_at",
          path: ["published_at"],
        });
      }

      if (metadata.disclosure_status) {
        context.addIssue({
          code: "custom",
          message: "fixtures must not define disclosure_status",
          path: ["disclosure_status"],
        });
      }

      if (metadata.featured) {
        context.addIssue({
          code: "custom",
          message: "fixtures must not be featured",
          path: ["featured"],
        });
      }
    }
  });

export const authorReferenceSchema = z
  .object({
    id: contentSlugSchema,
    name: z.string().min(1),
  })
  .strict();

export const taxonomyReferenceSchema = z
  .object({
    id: contentSlugSchema,
    label: z.string().min(1),
  })
  .strict();

export const authorRegistrySchema = z.array(authorReferenceSchema);
export const taxonomyRegistrySchema = z.array(taxonomyReferenceSchema);

export type AuthorReference = z.infer<typeof authorReferenceSchema>;
export type ContentVisibility = z.infer<typeof contentVisibilitySchema>;
export type ResearchMetadata = z.infer<typeof researchMetadataSchema>;
export type TaxonomyReference = z.infer<typeof taxonomyReferenceSchema>;
