import type { ReactNode } from "react";

import { Heading } from "@/components/ui/heading";
import { MetadataRow } from "@/components/ui/metadata-row";
import { Text } from "@/components/ui/text";
import type { ResolvedResearchItem } from "@/lib/content/research";

type ResearchDetailProps = Readonly<{
  children?: ReactNode;
  item: ResolvedResearchItem;
}>;

export function ResearchDetail({ children, item }: ResearchDetailProps) {
  const date =
    item.metadata.published_at ?? item.metadata.updated_at ?? "Not published";

  return (
    <article className="layout-reading stack-xl">
      <header className="stack-lg">
        <Text className="text-foreground-muted" variant="eyebrow">
          {item.metadata.research_type.replaceAll("-", " ")}
        </Text>
        <Heading level={1}>{item.metadata.title}</Heading>
        <Text className="text-foreground-secondary" variant="lead">
          {item.metadata.summary}
        </Text>
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
          ]}
        />
      </header>
      <div className="stack-lg">{children}</div>
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
