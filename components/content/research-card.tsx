import { ContentCard } from "@/components/content/content-card";
import { MetadataRow } from "@/components/ui/metadata-row";
import { StatusBadge } from "@/components/ui/status-badge";
import { Tag } from "@/components/ui/tag";

type ResearchStatus =
  "active" | "archived" | "completed" | "preliminary" | "technical-validation";

type ResearchCardProps = Readonly<{
  authors: readonly string[];
  dateLabel?: string;
  format: string;
  href: string;
  itemDate: string;
  status: ResearchStatus;
  summary: string;
  title: string;
  topic: string;
}>;

export function ResearchCard({
  authors,
  dateLabel = "Published",
  format,
  href,
  itemDate,
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
            label: dateLabel,
            value: <time dateTime={itemDate}>{itemDate}</time>,
          },
        ]}
      />
    </ContentCard>
  );
}
