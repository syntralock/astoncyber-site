import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import type { PublicRelationshipSet } from "@/lib/content/repository";

export function RelatedPublications({
  relationships,
}: Readonly<{ relationships: PublicRelationshipSet }>) {
  const items = [
    ...relationships.research.map((item) => ({
      href: `/research/${item.metadata.slug}`,
      kind: "Research",
      summary: item.metadata.summary,
      title: item.metadata.title,
    })),
    ...relationships.projects.map((item) => ({
      href: `/projects/${item.metadata.slug}`,
      kind: "Project",
      summary: item.metadata.summary,
      title: item.metadata.title,
    })),
    ...relationships.labs.map((item) => ({
      href: `/labs/${item.metadata.slug}`,
      kind: "Lab",
      summary: item.metadata.summary,
      title: item.metadata.title,
    })),
  ];

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="stack-md" aria-labelledby="related-content-title">
      <Heading id="related-content-title" level={2} variant="h3">
        Related work
      </Heading>
      <ul className="related-publication-list">
        {items.map((item) => (
          <li
            className="surface-base stack-sm"
            key={`${item.kind}-${item.href}`}
          >
            <Text className="text-foreground-muted" variant="eyebrow">
              {item.kind}
            </Text>
            <Heading level={3} variant="h4">
              <Link href={item.href}>{item.title}</Link>
            </Heading>
            <Text className="text-foreground-secondary" variant="small">
              {item.summary}
            </Text>
          </li>
        ))}
      </ul>
    </section>
  );
}
