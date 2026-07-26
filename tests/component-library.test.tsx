import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ContentCard } from "@/components/content/content-card";
import { EmptyState } from "@/components/content/empty-state";
import { ErrorState } from "@/components/content/error-state";
import { ResearchCard } from "@/components/content/research-card";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { MetadataRow } from "@/components/ui/metadata-row";
import { StatusBadge } from "@/components/ui/status-badge";
import { Tag } from "@/components/ui/tag";
import { Text } from "@/components/ui/text";

describe("core component library", () => {
  it("renders typed heading and text roles with semantic elements", () => {
    const html = renderToStaticMarkup(
      <>
        <Heading level={2}>Section title</Heading>
        <Text variant="lead">Lead text</Text>
        <Text as="span" variant="caption">
          Caption
        </Text>
      </>,
    );

    expect(html).toContain('<h2 class="type-h2">Section title</h2>');
    expect(html).toContain('<p class="type-lead">Lead text</p>');
    expect(html).toContain('<span class="type-caption">Caption</span>');
  });

  it("uses native controls and safe external-link defaults", () => {
    const html = renderToStaticMarkup(
      <>
        <Link href="/research">Research</Link>
        <Link external href="https://example.com">
          External source
        </Link>
        <Button variant="secondary">Run example</Button>
      </>,
    );

    expect(html).toContain('<a class="component-link" href="/research">');
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain(
      '<button class="button-secondary" type="button">Run example</button>',
    );
  });

  it("renders tags, status text, and semantic metadata", () => {
    const html = renderToStaticMarkup(
      <>
        <Tag>Identity</Tag>
        <Tag href="/topics/cloud">Cloud</Tag>
        <StatusBadge status="preliminary" />
        <MetadataRow
          items={[
            { label: "Authors", value: "Example author" },
            { label: "Type", value: "Research note" },
          ]}
        />
      </>,
    );

    expect(html).toContain('<span class="component-tag">Identity</span>');
    expect(html).toContain('href="/topics/cloud"');
    expect(html).toContain("preliminary");
    expect(html).toContain('aria-hidden="true"');
    expect(html.match(/<dt/g) ?? []).toHaveLength(2);
    expect(html.match(/<dd/g) ?? []).toHaveLength(2);
  });

  it("composes generic and research cards without nested interactive content", () => {
    const genericHtml = renderToStaticMarkup(
      <ContentCard
        href="/writing/example"
        summary="Neutral summary."
        title="Content example"
      />,
    );
    const researchHtml = renderToStaticMarkup(
      <ResearchCard
        authors={["Example author"]}
        format="Research note"
        href="/research/example"
        publishedAt="2026-01-01"
        status="active"
        summary="Neutral research summary."
        title="Research example"
        topic="Identity"
      />,
    );

    expect(genericHtml).toContain("<article");
    expect(genericHtml).toContain('href="/writing/example"');
    expect(researchHtml).toContain("<article");
    expect(researchHtml).toContain('dateTime="2026-01-01"');
    expect(researchHtml).toContain("Example author");
    expect(researchHtml).toContain("Identity");
  });

  it("provides labelled empty and announced error states", () => {
    const emptyHtml = renderToStaticMarkup(
      <EmptyState description="No items." title="Nothing published" />,
    );
    const errorHtml = renderToStaticMarkup(
      <ErrorState description="Try again." title="Unable to load" />,
    );

    expect(emptyHtml).toContain('aria-label="Nothing published"');
    expect(emptyHtml).not.toContain('role="alert"');
    expect(errorHtml).toContain('aria-label="Unable to load"');
    expect(errorHtml).toContain('role="alert"');
  });
});
