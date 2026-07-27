import { EmptyState } from "@/components/content/empty-state";
import { LabCard } from "@/components/content/lab-card";
import { Heading } from "@/components/ui/heading";
import type { PublicLabItem } from "@/lib/content/labs";

export function LabCollection({
  items,
}: Readonly<{ items: readonly PublicLabItem[] }>) {
  return (
    <section className="stack-lg" aria-labelledby="published-labs-title">
      <Heading id="published-labs-title" level={2}>
        Published Labs
      </Heading>
      {items.length > 0 ? (
        <ul className="collection-card-grid">
          {items.map((item) => (
            <li key={item.metadata.slug}>
              <LabCard item={item} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          description="Labs contain security tools, utilities, prototypes, experiments, detection content, and other creative technical work. No public Labs are currently available."
          title="No public Labs"
        />
      )}
    </section>
  );
}
