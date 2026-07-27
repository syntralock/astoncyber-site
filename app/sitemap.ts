import type { MetadataRoute } from "next";

import { generateSiteSitemap } from "@/lib/content/generated";
import {
  getPublicResearch,
  getPublicResearchTopics,
} from "@/lib/content/research";
import { getPublicProjects } from "@/lib/content/projects";
import { getPublicLabs } from "@/lib/content/labs";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [labs, projects, research, topics] = await Promise.all([
    getPublicLabs(),
    getPublicProjects(),
    getPublicResearch(),
    getPublicResearchTopics(),
  ]);
  return generateSiteSitemap({ labs, projects, research, topics });
}
