import type { ReactNode } from "react";

import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

type InstitutionalPageProps = Readonly<{
  children: ReactNode;
  eyebrow?: string;
  introduction: string;
  title: string;
}>;

export function InstitutionalPage({
  children,
  eyebrow,
  introduction,
  title,
}: InstitutionalPageProps) {
  return (
    <Container className="institutional-page">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: title }]} />
      <header className="institutional-page-header stack-md">
        {eyebrow ? (
          <Text className="text-accent" variant="eyebrow">
            {eyebrow}
          </Text>
        ) : null}
        <Heading level={1}>{title}</Heading>
        <Text className="text-foreground-secondary" variant="lead">
          {introduction}
        </Text>
      </header>
      <div className="institutional-page-content stack-xl">{children}</div>
    </Container>
  );
}
