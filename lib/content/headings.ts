export type ResearchHeading = Readonly<{
  id: string;
  level: 2 | 3;
  title: string;
}>;

export function headingId(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s-]/gu, "")
    .trim()
    .replace(/[\s-]+/gu, "-");
}

export function researchHeadings(body: string): readonly ResearchHeading[] {
  return [...body.matchAll(/^(#{2,3})\s+(.+)$/gmu)].map((match) => {
    const title = match[2]?.trim() ?? "";
    return {
      id: headingId(title),
      level: match[1] === "##" ? 2 : 3,
      title,
    };
  });
}
