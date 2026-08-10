import { ResearchCard } from "@/components/content/research-card";
import { classNames } from "@/lib/class-names";
import type { ResolvedResearchItem } from "@/lib/content/research";

type ResearchArchiveProps = Readonly<{
  headingLevel?: 2 | 3;
  items: readonly ResolvedResearchItem[];
  variant?: "archive" | "featured";
}>;

export function ResearchArchive({
  headingLevel,
  items,
  variant = "archive",
}: ResearchArchiveProps) {
  return (
    <div
      className={classNames(
        "research-archive",
        variant === "featured" && "research-archive-featured",
      )}
    >
      {items.map((item) => (
        <ResearchCard
          authors={item.authors.map((author) => author.name)}
          format={item.metadata.research_type}
          href={`/research/${item.metadata.slug}`}
          headingLevel={headingLevel}
          itemDate={item.metadata.published_at ?? ""}
          key={item.metadata.slug}
          status={item.metadata.status}
          summary={item.metadata.summary}
          title={item.metadata.title}
          topic={item.topics[0]?.label ?? ""}
          variant={variant === "featured" ? "featured" : "default"}
        />
      ))}
    </div>
  );
}
