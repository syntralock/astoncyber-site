import { ContentCard } from "@/components/content/content-card";
import { MetadataRow } from "@/components/ui/metadata-row";
import { StatusBadge } from "@/components/ui/status-badge";
import { Tag } from "@/components/ui/tag";

type ResearchStatus = "active" | "archived" | "completed" | "preliminary";

type ResearchCardProps = Readonly<{
  authors: readonly string[];
  format: string;
  href: string;
  publishedAt: string;
  status: ResearchStatus;
  summary: string;
  title: string;
  topic: string;
}>;

export function ResearchCard({
  authors,
  format,
  href,
  publishedAt,
  status,
  summary,
  title,
  topic,
}: ResearchCardProps) {
  return (
    <ContentCard
      eyebrow={format}
      href={href}
      linkLabel="Read research"
      summary={summary}
      title={title}
    >
      <div className="cluster">
        <StatusBadge status={status} />
        <Tag>{topic}</Tag>
      </div>
      <MetadataRow
        items={[
          { label: "Authors", value: authors.join(", ") },
          {
            label: "Published",
            value: <time dateTime={publishedAt}>{publishedAt}</time>,
          },
        ]}
      />
    </ContentCard>
  );
}
