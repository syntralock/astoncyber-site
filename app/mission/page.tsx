import { InstitutionalPage } from "@/components/layout/institutional-page";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  description: "Why Aston Cyber exists.",
  pathname: "/mission",
  title: "Mission",
});

export default function MissionPage() {
  return (
    <InstitutionalPage
      contentClassName="institutional-page-content-wide"
      eyebrow="Mission"
      introduction="Aston Cyber exists to advance the practice of cybersecurity through research, engineering, and education."
      title="Why Aston Cyber exists"
    >
      <div className="layout-three mission-focus">
        <section className="focus-item stack-md" aria-labelledby="work-title">
          <Heading className="focus-item-heading" id="work-title" level={2}>
            Understand consequential problems
          </Heading>
          <Text>
            Investigate security questions whose answers affect important
            systems, decisions, and people.
          </Text>
        </section>

        <section className="focus-item stack-md" aria-labelledby="vision-title">
          <Heading className="focus-item-heading" id="vision-title" level={2}>
            Engineer practical responses
          </Heading>
          <Text>
            Turn sound understanding into controls, architectures, workflows,
            and decisions that organizations can operate and explain.
          </Text>
        </section>

        <section
          className="focus-item stack-md"
          aria-labelledby="framework-title"
        >
          <Heading
            className="focus-item-heading"
            id="framework-title"
            level={2}
          >
            Share useful knowledge
          </Heading>
          <Text>
            Publish research and lessons when doing so can responsibly improve
            the practice of cybersecurity beyond a single engagement.
          </Text>
        </section>
      </div>

      <div className="mission-conclusion cluster">
        <Link href="/about" variant="standalone">
          About Aston Cyber
        </Link>
        <Link href="/ethos" variant="standalone">
          Read the Aston Cyber Ethos
        </Link>
      </div>
    </InstitutionalPage>
  );
}
