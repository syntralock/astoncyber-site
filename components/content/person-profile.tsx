import type { ReactNode } from "react";

import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

export type PersonProfileData = Readonly<{
  biography: readonly string[];
  name: string;
  role?: string;
}>;

type PersonProfileProps = Readonly<{
  children?: ReactNode;
  person: PersonProfileData;
}>;

export function PersonProfile({ children, person }: PersonProfileProps) {
  return (
    <article className="person-profile stack-xl">
      <header className="stack-sm">
        <Heading level={1}>{person.name}</Heading>
        {person.role ? (
          <Text className="text-foreground-secondary" variant="lead">
            {person.role}
          </Text>
        ) : null}
      </header>
      <div className="editorial-prose stack-md">
        {person.biography.map((paragraph) => (
          <Text key={paragraph}>{paragraph}</Text>
        ))}
      </div>
      {children}
    </article>
  );
}
