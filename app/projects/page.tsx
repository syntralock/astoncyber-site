import type { Metadata } from "next";

import { ProjectCollection } from "@/components/content/project-collection";
import { InstitutionalPage } from "@/components/layout/institutional-page";
import { getPublicProjects } from "@/lib/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Completed and substantially complete cybersecurity work published by Aston Cyber.",
};

export default async function ProjectsPage() {
  return (
    <InstitutionalPage
      contentClassName="institutional-page-content-wide"
      eyebrow="Projects"
      introduction="Durable bodies of completed or substantially complete cybersecurity work."
      title="Projects"
    >
      <ProjectCollection items={await getPublicProjects()} />
    </InstitutionalPage>
  );
}
