import { ContentCard } from "@/components/content/content-card";
import { MetadataRow } from "@/components/ui/metadata-row";
import { StatusBadge } from "@/components/ui/status-badge";
import { Tag } from "@/components/ui/tag";
import type { PublicProjectItem } from "@/lib/content/projects";
import { projectStatusPresentation } from "@/lib/content/policies";

export function ProjectCard({ item }: Readonly<{ item: PublicProjectItem }>) {
  const status = projectStatusPresentation[item.metadata.status];
  const dates = [
    item.metadata.completed_at
      ? {
          label: "Completed",
          value: (
            <time dateTime={item.metadata.completed_at}>
              {item.metadata.completed_at}
            </time>
          ),
        }
      : undefined,
    item.metadata.published_at
      ? {
          label: "Published",
          value: (
            <time dateTime={item.metadata.published_at}>
              {item.metadata.published_at}
            </time>
          ),
        }
      : undefined,
  ].filter((value) => value !== undefined);

  return (
    <ContentCard
      eyebrow="Project"
      href={`/projects/${item.metadata.slug}`}
      linkLabel="View Project"
      summary={item.metadata.summary}
      title={item.metadata.title}
    >
      <div className="cluster">
        <StatusBadge label={status.label} status={item.metadata.status} />
        {item.topics.slice(0, 2).map((topic) => (
          <Tag key={topic.id}>{topic.label}</Tag>
        ))}
      </div>
      {dates.length > 0 ? <MetadataRow items={dates} /> : null}
    </ContentCard>
  );
}
