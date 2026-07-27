import { EmptyState } from "@/components/content/empty-state";
import { ProjectCard } from "@/components/content/project-card";
import { Heading } from "@/components/ui/heading";
import type { PublicProjectItem } from "@/lib/content/projects";

export function ProjectCollection({
  items,
}: Readonly<{ items: readonly PublicProjectItem[] }>) {
  return (
    <section className="stack-lg" aria-labelledby="published-projects-title">
      <Heading id="published-projects-title" level={2}>
        Published Projects
      </Heading>
      {items.length > 0 ? (
        <ul className="collection-card-grid">
          {items.map((item) => (
            <li key={item.metadata.slug}>
              <ProjectCard item={item} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          description="Projects are durable bodies of completed or substantially complete cybersecurity work. No public Projects are currently available."
          title="No public Projects"
        />
      )}
    </section>
  );
}
