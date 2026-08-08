import { InstitutionalPage } from "@/components/layout/institutional-page";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  description:
    "The principles that guide Aston Cyber research, engineering, and security practice.",
  pathname: "/ethos",
  title: "Ethos",
});

const principles = [
  {
    body: [
      "Our research agenda is never for sale.",
      "Our conclusions are not shaped by vendor commissions, resale incentives, paid referral arrangements, partnerships, or other commercial interests.",
      "Credibility is earned through independence.",
    ],
    title: "Independence",
  },
  {
    body: [
      "We follow evidence wherever it leads.",
      "When we are uncertain, we say so. When we are wrong, we correct ourselves. When limitations exist, we document them openly.",
      "Confidence should never exceed evidence.",
    ],
    title: "Intellectual honesty",
  },
  {
    body: [
      "We value rigor over speed.",
      "Careful work outlives rapid publication. Accuracy, reproducibility, and thoughtful analysis are more valuable than being first.",
    ],
    title: "Technical excellence",
  },
  {
    body: [
      "Knowledge should be shared whenever responsibly possible.",
      "When research uncovers vulnerabilities or weaknesses, affected organizations deserve the opportunity to understand and remediate those issues before public disclosure.",
      "Responsible disclosure strengthens the ecosystem while protecting those who depend upon it.",
    ],
    title: "Responsible disclosure",
  },
  {
    body: [
      "Progress is rarely the work of one person.",
      "We recognize the contributions of researchers, engineers, reviewers, and collaborators whose work advances the field.",
      "Ideas deserve proper attribution. People deserve proper credit.",
    ],
    title: "Attribution",
  },
] as const;

export default function EthosPage() {
  return (
    <InstitutionalPage
      eyebrow="Research. Engineering. Security."
      introduction="Our work exists to strengthen the foundation of modern computing through independent research, thoughtful engineering, and responsible security practice."
      title="The Aston Cyber Ethos"
    >
      <section className="editorial-prose stack-md" aria-labelledby="preamble">
        <Heading id="preamble" level={2}>
          Preamble
        </Heading>
        <Text>
          Technology has become the foundation upon which modern society
          operates. Businesses, governments, researchers, educators, and
          individuals all depend on digital systems that must be reliable,
          trustworthy, and secure.
        </Text>
        <Text>
          As these systems grow in complexity, so too does the responsibility to
          understand them. Aston Cyber exists to advance that understanding.
        </Text>
        <Text>
          We believe cybersecurity is not merely about preventing failure. It is
          about creating confidence. When systems are secure, people are free to
          innovate, build, discover, and move forward with confidence.
        </Text>
      </section>

      <section className="editorial-prose stack-md" aria-labelledby="why">
        <Heading id="why" level={2}>
          I. Why we exist
        </Heading>
        <Text>
          We believe cybersecurity benefits from rigorous, independent research
          that serves the profession before commercial interests.
        </Text>
        <Text>
          Too much technical content is shaped by products, marketing, or
          commercial incentives. Valuable tools and technologies deserve
          thoughtful evaluation, but research should never begin with a product.
          It should begin with a question.
        </Text>
        <Text>
          Aston Cyber exists to ask difficult questions, pursue evidence
          wherever it leads, and publish honest conclusions that advance the
          field.
        </Text>
        <Text>
          Our purpose is not to sell software. Our purpose is not to generate
          fear. Our purpose is to produce knowledge that others can trust.
        </Text>
      </section>

      <section className="editorial-prose stack-md" aria-labelledby="beliefs">
        <Heading id="beliefs" level={2}>
          II. What we believe
        </Heading>
        <Text variant="bodyLarge">Research is the foundation of progress.</Text>
        <Text>
          Careful observation leads to understanding. Understanding enables
          thoughtful engineering. Thoughtful engineering creates secure systems.
          Secure systems give people the confidence to innovate, collaborate,
          and solve meaningful problems.
        </Text>
        <Text variant="bodyLarge">Security creates freedom.</Text>
        <Text>Research. Engineering. Security.</Text>
        <Text>Each depends upon the one before it.</Text>
      </section>

      <section className="stack-lg" aria-labelledby="principles">
        <Heading id="principles" level={2}>
          III. Our principles
        </Heading>
        {principles.map((principle) => (
          <div className="editorial-prose stack-sm" key={principle.title}>
            <Heading level={3}>{principle.title}</Heading>
            {principle.body.map((paragraph) => (
              <Text key={paragraph}>{paragraph}</Text>
            ))}
            {principle.title === "Responsible disclosure" ? (
              <Text>
                Responsible disclosure and security reports should be sent to{" "}
                <Link href="mailto:security@astoncyber.com">
                  security@astoncyber.com
                </Link>
                . General inquiries should be sent separately to{" "}
                <Link href="mailto:info@astoncyber.com">
                  info@astoncyber.com
                </Link>
                .
              </Text>
            ) : null}
          </div>
        ))}
      </section>

      <section className="editorial-prose stack-md" aria-labelledby="work">
        <Heading id="work" level={2}>
          IV. How we work
        </Heading>
        <Text>
          We ask questions before proposing solutions. We investigate before
          concluding. We publish methods alongside findings whenever possible.
          We distinguish evidence from opinion.
        </Text>
        <Text>
          We avoid unnecessary hype, sensationalism, and fear-based messaging.
          We evaluate technologies, vendors, and methodologies based on
          technical merit rather than popularity or marketing.
        </Text>
        <Text>
          Our goal is not to win arguments. Our goal is to improve
          understanding.
        </Text>
      </section>

      <section
        className="editorial-prose stack-md"
        aria-labelledby="responsibility"
      >
        <Heading id="responsibility" level={2}>
          V. Our responsibility
        </Heading>
        <Text>
          The cybersecurity community depends upon trust. Trust cannot be
          purchased. It cannot be marketed into existence. It cannot be
          demanded.
        </Text>
        <Text>
          It is earned slowly through careful work, honest communication, and
          consistent integrity.
        </Text>
        <Text>
          Every article we publish, every project we release, every presentation
          we give, and every piece of research we conduct contributes to that
          reputation. We accept that responsibility.
        </Text>
      </section>

      <section
        className="editorial-prose stack-md"
        aria-labelledby="commitment"
      >
        <Heading id="commitment" level={2}>
          Our commitment
        </Heading>
        <Text>
          Aston Cyber exists in service of the cybersecurity profession and the
          broader public interest.
        </Text>
        <Text>
          We will protect our independence. We will pursue truth over
          convenience. We will publish responsibly. We will credit generously.
          We will remain intellectually honest.
        </Text>
        <Text>
          We will build knowledge that enables better engineering. We will
          advance engineering that enables stronger security. We believe that
          secure systems create the freedom to innovate.
        </Text>
        <Text>
          If, through decades of careful work, Aston Cyber becomes a name that
          people trust when they seek clarity, evidence, and thoughtful
          technical judgment, then we will have fulfilled our purpose.
        </Text>
      </section>
    </InstitutionalPage>
  );
}
