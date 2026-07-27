import type { ReactNode } from "react";

import { RelatedPublications } from "@/components/content/related-publications";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { MetadataRow } from "@/components/ui/metadata-row";
import { StatusBadge } from "@/components/ui/status-badge";
import { Tag } from "@/components/ui/tag";
import { Text } from "@/components/ui/text";
import {
  licenseRegistry,
  projectStatusPresentation,
} from "@/lib/content/policies";
import type { PublicProjectItem } from "@/lib/content/projects";
import type { PublicRelationshipSet } from "@/lib/content/repository";

type ProjectDetailProps = Readonly<{
  children?: ReactNode;
  item: PublicProjectItem;
  relationships: PublicRelationshipSet;
}>;

export function ProjectDetail({
  children,
  item,
  relationships,
}: ProjectDetailProps) {
  const status = projectStatusPresentation[item.metadata.status];
  const metadataItems = [
    {
      label: "Contributors",
      value: item.contributors
        .map((contributor) => contributor.name)
        .join(", "),
    },
    ...(item.metadata.completed_at
      ? [{ label: "Completed", value: item.metadata.completed_at }]
      : []),
    ...(item.metadata.published_at
      ? [{ label: "Published", value: item.metadata.published_at }]
      : []),
    ...(item.metadata.license
      ? [
          {
            label: "License",
            value: licenseRegistry[item.metadata.license].name,
          },
        ]
      : []),
  ];

  return (
    <article className="layout-reading stack-xl">
      <header className="stack-lg">
        <Text className="text-foreground-muted" variant="eyebrow">
          Project
        </Text>
        <Heading level={1}>{item.metadata.title}</Heading>
        <Text className="text-foreground-secondary" variant="lead">
          {item.metadata.summary}
        </Text>
        <div className="cluster">
          <StatusBadge label={status.label} status={item.metadata.status} />
          {item.topics.map((topic) => (
            <Tag key={topic.id}>{topic.label}</Tag>
          ))}
        </div>
        <Text className="text-foreground-secondary" variant="small">
          {status.description}
        </Text>
        <MetadataRow items={metadataItems} />
        {item.tags.length > 0 || item.technologies.length > 0 ? (
          <div className="stack-sm" aria-label="Project classifications">
            <div className="cluster">
              {item.technologies.map((technology) => (
                <Tag key={technology.id}>{technology.name}</Tag>
              ))}
              {item.tags.map((tag) => (
                <Tag key={tag.id}>{tag.label}</Tag>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      {item.metadata.repository_url || item.metadata.project_url ? (
        <section
          className="surface-base stack-sm"
          aria-labelledby="links-title"
        >
          <Heading id="links-title" level={2} variant="h3">
            Project links
          </Heading>
          <div className="cluster">
            {item.metadata.repository_url ? (
              <Link external href={item.metadata.repository_url}>
                View source repository
              </Link>
            ) : null}
            {item.metadata.project_url ? (
              <Link external href={item.metadata.project_url}>
                Visit Project website
              </Link>
            ) : null}
          </div>
        </section>
      ) : null}

      <div className="research-body">{children}</div>

      {item.metadata.resources.length > 0 ? (
        <section
          className="surface-raised stack-md"
          aria-labelledby="resources-title"
        >
          <Heading id="resources-title" level={2} variant="h3">
            Resources
          </Heading>
          <ul className="resource-list">
            {item.metadata.resources.map((resource) => (
              <li key={resource.path}>
                <Link href={resource.path}>{resource.label}</Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <RelatedPublications relationships={relationships} />
    </article>
  );
}
