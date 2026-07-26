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

export function CoreComponentExamples() {
  return (
    <section
      className="specimen-section stack-xl"
      aria-labelledby="components-title"
    >
      <div className="stack-sm">
        <Text className="text-foreground-muted" variant="eyebrow">
          Phase 4 components
        </Text>
        <Heading id="components-title" level={2}>
          Core component examples
        </Heading>
        <Text className="text-foreground-secondary">
          Static, non-production examples for validating reusable research
          interface patterns.
        </Text>
      </div>

      <div className="component-example-group stack-md">
        <Heading level={3} variant="h4">
          Interface primitives
        </Heading>
        <div className="cluster">
          <Link href="#components-title" variant="standalone">
            Example link
          </Link>
          <Button>Example action</Button>
          <Button variant="secondary">Secondary action</Button>
          <Tag>Example topic</Tag>
          <StatusBadge status="active" />
        </div>
        <MetadataRow
          items={[
            { label: "Type", value: "Example" },
            { label: "Updated", value: "Placeholder date" },
          ]}
        />
      </div>

      <div className="component-card-grid">
        <ContentCard
          eyebrow="Content"
          href="#components-title"
          summary="Neutral supporting text for the reusable content-card pattern."
          title="Content card example"
        >
          <Tag>Placeholder</Tag>
        </ContentCard>
        <ResearchCard
          authors={["Example author"]}
          format="Research note"
          href="#components-title"
          itemDate="2026-01-01"
          status="preliminary"
          summary="Non-production material used only to demonstrate structured research metadata."
          title="Research card example"
          topic="Example topic"
        />
      </div>

      <div className="component-card-grid">
        <EmptyState
          action={
            <Link href="#components-title" variant="standalone">
              Return to examples
            </Link>
          }
          description="No example items are available in this static state."
          title="Empty state"
        />
        <ErrorState
          action={<Button variant="secondary">Try example again</Button>}
          description="The example could not be displayed."
          title="Error state"
        />
      </div>
    </section>
  );
}
