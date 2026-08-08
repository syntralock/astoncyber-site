import type { ReactNode } from "react";

import { Heading } from "@/components/ui/heading";
import { ResearchOutline } from "@/components/content/research-outline";
import { Link } from "@/components/ui/link";
import { MetadataRow } from "@/components/ui/metadata-row";
import { StatusBadge } from "@/components/ui/status-badge";
import { Tag } from "@/components/ui/tag";
import { Text } from "@/components/ui/text";
import type { ResolvedResearchItem } from "@/lib/content/research";
import type { ResearchHeading } from "@/lib/content/headings";
import { researchHeadings } from "@/lib/content/headings";

type ResearchDetailProps = Readonly<{
  children?: ReactNode;
  headings?: readonly ResearchHeading[];
  item: ResolvedResearchItem;
}>;

export function ResearchDetail({
  children,
  headings,
  item,
}: ResearchDetailProps) {
  const outlineHeadings = headings ?? researchHeadings(item.body);
  const date =
    item.metadata.published_at ?? item.metadata.updated_at ?? "Not published";

  return (
    <article className="layout-reading stack-xl">
      <header className="stack-lg">
        <Text className="text-foreground-muted" variant="eyebrow">
          {item.metadata.research_type.replaceAll("-", " ")}
        </Text>
        <Heading level={1}>{item.metadata.title}</Heading>
        {item.metadata.subtitle ? (
          <Text className="text-foreground-secondary" variant="bodyLarge">
            {item.metadata.subtitle}
          </Text>
        ) : null}
        <Text className="text-foreground-secondary" variant="lead">
          {item.metadata.summary}
        </Text>
        <div className="cluster">
          <StatusBadge status={item.metadata.status} />
          {item.topics.map((topic) => (
            <Tag href={`/research/topics/${topic.id}`} key={topic.id}>
              {topic.label}
            </Tag>
          ))}
        </div>
        <MetadataRow
          items={[
            {
              label: "Authors",
              value: item.authors.map((author) => author.name).join(", "),
            },
            {
              label: item.metadata.published_at ? "Published" : "Validated",
              value: date,
            },
            {
              label: "Disclosure",
              value:
                item.metadata.disclosure_status?.replaceAll("-", " ") ??
                "Not published",
            },
            ...(item.metadata.revision
              ? [{ label: "Revision", value: item.metadata.revision }]
              : []),
          ]}
        />
        {item.authors.some((author) => author.affiliation) ? (
          <div className="stack-sm">
            {item.authors.map((author) =>
              author.affiliation ? (
                <Text
                  className="text-foreground-secondary"
                  key={author.id}
                  variant="small"
                >
                  {author.name}: {author.affiliation}
                </Text>
              ) : null,
            )}
          </div>
        ) : null}
      </header>
      {item.metadata.publication_note ? (
        <aside className="surface-base research-publication-note stack-sm">
          <Heading level={2} variant="h4">
            Publication note
          </Heading>
          <Text>{item.metadata.publication_note}</Text>
        </aside>
      ) : null}
      <ResearchOutline headings={outlineHeadings} />
      <div className="research-body">{children}</div>
      {item.metadata.artifact ? (
        <section
          className="surface-raised research-download stack-md"
          aria-labelledby="download-title"
        >
          <Heading id="download-title" level={2} variant="h3">
            Download
          </Heading>
          <Text className="text-foreground-secondary">
            Original author manuscript in Microsoft Word format.
          </Text>
          <Link href={item.metadata.artifact.path} variant="standalone">
            {item.metadata.artifact.label}
          </Link>
        </section>
      ) : null}
      <footer className="surface-base stack-sm">
        <Heading level={2} variant="h4">
          Citation
        </Heading>
        <Text>{item.metadata.citation.label}</Text>
        <Text className="text-foreground-muted" variant="caption">
          {item.metadata.citation.publisher}
          {item.metadata.citation.year
            ? `, ${item.metadata.citation.year}`
            : ""}
        </Text>
      </footer>
    </article>
  );
}
