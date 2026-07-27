import { z } from "zod";

import {
  labMaturities,
  licenseRegistry,
  projectStatuses,
  publicationVisibilities,
  validateExternalHttpsUrl,
  validateRepositoryUrl,
  validateResourceDeclaration,
} from "./policies.ts";

const nonEmptyStringSchema = z.string().trim().min(1);

export const contentSlugSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "must be a lowercase slug");

export const contentVisibilitySchema = z.enum(publicationVisibilities);
export const projectStatusSchema = z.enum(projectStatuses);
export const labMaturitySchema = z.enum(labMaturities);
export const licenseIdentifierSchema = z.enum(
  Object.keys(licenseRegistry) as [
    keyof typeof licenseRegistry,
    ...(keyof typeof licenseRegistry)[],
  ],
);

function uniqueSlugList() {
  return z.array(contentSlugSchema).superRefine((values, context) => {
    const seen = new Set<string>();
    for (const [index, value] of values.entries()) {
      if (seen.has(value)) {
        context.addIssue({
          code: "custom",
          message: `duplicate reference "${value}"`,
          path: [index],
        });
      }
      seen.add(value);
    }
  });
}

export const researchStatusSchema = z.enum([
  "active",
  "archived",
  "completed",
  "preliminary",
  "published",
  "technical-validation",
]);

export const researchTypeSchema = z.enum([
  "case-study",
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
    label: nonEmptyStringSchema,
    publisher: z.literal("Aston Cyber"),
    year: z.number().int().min(2000).max(9999).optional(),
  })
  .strict();

export const researchArtifactSchema = z
  .object({
    label: nonEmptyStringSchema,
    path: z.string().regex(/^\/downloads\/[a-zA-Z0-9_./-]+$/u),
    media_type: z.literal(
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ),
  })
  .strict();

const relationshipFields = {
  related_labs: uniqueSlugList().default([]),
  related_projects: uniqueSlugList().default([]),
};

export const researchMetadataSchema = z
  .object({
    title: nonEmptyStringSchema,
    subtitle: nonEmptyStringSchema.optional(),
    slug: contentSlugSchema,
    summary: nonEmptyStringSchema,
    project: nonEmptyStringSchema.optional(),
    research_type: researchTypeSchema,
    status: researchStatusSchema,
    visibility: contentVisibilitySchema,
    published_at: z.iso.date().optional(),
    updated_at: z.iso.date().optional(),
    revision: z
      .string()
      .regex(/^\d+\.\d+$/u)
      .optional(),
    publication_note: nonEmptyStringSchema.optional(),
    keywords: z.array(nonEmptyStringSchema).default([]),
    artifact: researchArtifactSchema.optional(),
    authors: uniqueSlugList().min(1),
    contributors: uniqueSlugList().default([]),
    topics: uniqueSlugList().min(1),
    tags: uniqueSlugList().min(1),
    featured: z.boolean().default(false),
    disclosure_status: disclosureStatusSchema.optional(),
    citation: citationSchema,
    ...relationshipFields,
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
      if (metadata.status !== "published") {
        context.addIssue({
          code: "custom",
          message: "public research requires published status",
          path: ["status"],
        });
      }
    }
  });

export const resourceSchema = z
  .object({
    label: nonEmptyStringSchema,
    path: z
      .string()
      .regex(
        /^\/downloads\/(?:projects|labs)\/[a-zA-Z0-9_.\/-]+$/u,
        "must be an approved public Project or Lab download path",
      )
      .refine(
        (value) => !value.split("/").includes(".."),
        "must not contain path traversal",
      )
      .refine(
        (value) => value === value.replace(/\/+/gu, "/"),
        "must use a normalized path",
      ),
    media_type: nonEmptyStringSchema,
  })
  .strict()
  .superRefine((resource, context) => {
    if (!validateResourceDeclaration(resource.path, resource.media_type)) {
      context.addIssue({
        code: "custom",
        message: "resource extension and MIME type are not an approved pair",
        path: ["media_type"],
      });
    }
  });

const commonPublicationFields = {
  title: nonEmptyStringSchema,
  slug: contentSlugSchema,
  summary: nonEmptyStringSchema,
  visibility: contentVisibilitySchema,
  contributors: uniqueSlugList().min(1),
  topics: uniqueSlugList().min(1),
  tags: uniqueSlugList().min(1),
  technologies: uniqueSlugList().default([]),
  repository_url: nonEmptyStringSchema
    .refine(validateRepositoryUrl, "must be an approved HTTPS repository URL")
    .optional(),
  license: licenseIdentifierSchema.optional(),
  resources: z
    .array(resourceSchema)
    .superRefine((resources, context) => {
      const seen = new Set<string>();
      for (const [index, resource] of resources.entries()) {
        if (seen.has(resource.path)) {
          context.addIssue({
            code: "custom",
            message: `duplicate resource "${resource.path}"`,
            path: [index, "path"],
          });
        }
        seen.add(resource.path);
      }
    })
    .default([]),
  related_research: uniqueSlugList().default([]),
  ...relationshipFields,
  featured: z.boolean().default(false),
};

export const projectMetadataSchema = z
  .object({
    ...commonPublicationFields,
    status: projectStatusSchema,
    published_at: z.iso.date().optional(),
    completed_at: z.iso.date().optional(),
    project_url: nonEmptyStringSchema
      .refine(validateExternalHttpsUrl, "must be a safe absolute HTTPS URL")
      .optional(),
  })
  .strict()
  .superRefine((metadata, context) => {
    for (const [index, resource] of metadata.resources.entries()) {
      if (!resource.path.startsWith("/downloads/projects/")) {
        context.addIssue({
          code: "custom",
          message: "Project resources must use the Project download location",
          path: ["resources", index, "path"],
        });
      }
    }
    if (
      metadata.published_at &&
      metadata.completed_at &&
      metadata.published_at < metadata.completed_at
    ) {
      context.addIssue({
        code: "custom",
        message: "published_at must not precede completed_at",
        path: ["published_at"],
      });
    }
    if (
      metadata.visibility === "public" &&
      !metadata.published_at &&
      !metadata.completed_at
    ) {
      context.addIssue({
        code: "custom",
        message: "public Projects require published_at or completed_at",
        path: ["published_at"],
      });
    }
  });

export const labMetadataSchema = z
  .object({
    ...commonPublicationFields,
    maturity: labMaturitySchema,
    published_at: z.iso.date().optional(),
  })
  .strict()
  .superRefine((metadata, context) => {
    for (const [index, resource] of metadata.resources.entries()) {
      if (!resource.path.startsWith("/downloads/labs/")) {
        context.addIssue({
          code: "custom",
          message: "Lab resources must use the Lab download location",
          path: ["resources", index, "path"],
        });
      }
    }
    if (metadata.visibility === "public" && !metadata.published_at) {
      context.addIssue({
        code: "custom",
        message: "public Labs require published_at",
        path: ["published_at"],
      });
    }
  });

export const authorReferenceSchema = z
  .object({
    affiliation: nonEmptyStringSchema.optional(),
    id: contentSlugSchema,
    name: nonEmptyStringSchema,
  })
  .strict();

export const taxonomyReferenceSchema = z
  .object({
    id: contentSlugSchema,
    label: nonEmptyStringSchema,
  })
  .strict();

export const technologyReferenceSchema = z
  .object({
    id: contentSlugSchema,
    name: nonEmptyStringSchema,
  })
  .strict();

export const authorRegistrySchema = z.array(authorReferenceSchema);
export const taxonomyRegistrySchema = z.array(taxonomyReferenceSchema);
export const technologyRegistrySchema = z.array(technologyReferenceSchema);

export type AuthorReference = z.infer<typeof authorReferenceSchema>;
export type ContentVisibility = z.infer<typeof contentVisibilitySchema>;
export type LabMetadata = z.infer<typeof labMetadataSchema>;
export type ProjectMetadata = z.infer<typeof projectMetadataSchema>;
export type ResearchMetadata = z.infer<typeof researchMetadataSchema>;
export type Resource = z.infer<typeof resourceSchema>;
export type TaxonomyReference = z.infer<typeof taxonomyReferenceSchema>;
export type TechnologyReference = z.infer<typeof technologyReferenceSchema>;
