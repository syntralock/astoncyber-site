import type { Metadata } from "next";

import { InstitutionalPage } from "@/components/layout/institutional-page";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";

export const metadata: Metadata = {
  title: "Mission",
  description: "The mission, vision, and principles of Aston Cyber.",
};

const principles = [
  "Evidence over assumption.",
  "Research before opinion.",
  "Engineering over marketing.",
  "Clarity over jargon.",
  "Build before recommending.",
  "Long-term thinking over short-term trends.",
  "Open knowledge whenever practical.",
  "Design matters.",
  "Security should enable progress.",
  "Never stop learning.",
] as const;

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
            Our work
          </Heading>
          <Text>
            We investigate emerging challenges, develop practical approaches,
            and publish knowledge that elevates our field.
          </Text>
          <Text>
            Our work is grounded in curiosity, evidence, and thoughtful
            engineering. We believe meaningful progress comes from asking better
            questions, building better systems, and openly sharing what we
            learn.
          </Text>
        </section>

        <section className="focus-item stack-md" aria-labelledby="vision-title">
          <Heading className="focus-item-heading" id="vision-title" level={2}>
            Vision
          </Heading>
          <Text variant="bodyLarge">
            Advance cybersecurity through thoughtful research that improves the
            security of modern computing.
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
            Research, engineering, and education
          </Heading>
          <Text>
            Aston Cyber believes cybersecurity benefits from rigorous,
            independent research that serves the profession before commercial
            interests. Research creates understanding. Engineering applies
            understanding. Secure systems give people the confidence to
            innovate, collaborate, and solve meaningful problems.
          </Text>
          <Text variant="bodyLarge">Security creates freedom.</Text>
        </section>
      </div>

      <section
        className="surface-base mission-principles stack-md"
        aria-labelledby="principles-title"
      >
        <Heading id="principles-title" level={2}>
          Organizational principles
        </Heading>
        <ul className="editorial-list mission-principles-list">
          {principles.map((principle) => (
            <li key={principle}>{principle}</li>
          ))}
        </ul>
      </section>

      <div className="mission-conclusion">
        <Link href="/ethos" variant="standalone">
          Read the Aston Cyber Ethos
        </Link>
      </div>
    </InstitutionalPage>
  );
}
