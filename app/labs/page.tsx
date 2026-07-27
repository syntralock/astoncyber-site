import type { Metadata } from "next";

import { LabCollection } from "@/components/content/lab-collection";
import { InstitutionalPage } from "@/components/layout/institutional-page";
import { getPublicLabs } from "@/lib/content/labs";

export const metadata: Metadata = {
  title: "Labs",
  description:
    "Security tools, prototypes, experiments, and creative technical work published by Aston Cyber.",
};

export default async function LabsPage() {
  return (
    <InstitutionalPage
      contentClassName="institutional-page-content-wide"
      eyebrow="Labs"
      introduction="Security tools, prototypes, experiments, detection content, and other creative technical work, with maturity stated explicitly."
      title="Labs"
    >
      <LabCollection items={await getPublicLabs()} />
    </InstitutionalPage>
  );
}
