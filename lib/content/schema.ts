import { z } from "zod";

export const researchMetadataSchema = z
  .object({
    title: z.string().min(1),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    summary: z.string().min(1),
    status: z.literal("placeholder"),
    published_at: z.iso.date(),
    authors: z.array(z.string().min(1)).min(1),
    topics: z.array(z.string().min(1)).min(1),
    draft: z.literal(true),
  })
  .strict();

export type ResearchMetadata = z.infer<typeof researchMetadataSchema>;
