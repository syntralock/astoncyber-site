import { ContentCard } from "@/components/content/content-card";
import { MetadataRow } from "@/components/ui/metadata-row";
import { StatusBadge } from "@/components/ui/status-badge";
import { Tag } from "@/components/ui/tag";
import type { PublicLabItem } from "@/lib/content/labs";
import { labMaturityPresentation } from "@/lib/content/policies";

export function LabCard({ item }: Readonly<{ item: PublicLabItem }>) {
  const maturity = labMaturityPresentation[item.metadata.maturity];

  return (
    <ContentCard
      eyebrow="Lab"
      href={`/labs/${item.metadata.slug}`}
      linkLabel="View Lab"
      summary={item.metadata.summary}
      title={item.metadata.title}
    >
      <div className="cluster">
        <StatusBadge label={maturity.label} status={item.metadata.maturity} />
        {item.topics.slice(0, 2).map((topic) => (
          <Tag key={topic.id}>{topic.label}</Tag>
        ))}
      </div>
      {item.metadata.published_at ? (
        <MetadataRow
          items={[
            {
              label: "Published",
              value: (
                <time dateTime={item.metadata.published_at}>
                  {item.metadata.published_at}
                </time>
              ),
            },
          ]}
        />
      ) : null}
    </ContentCard>
  );
}
