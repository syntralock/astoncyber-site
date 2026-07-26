import type { Metadata } from "next";

import { EmptyState } from "@/components/content/empty-state";
import { InstitutionalPage } from "@/components/layout/institutional-page";

export const metadata: Metadata = {
  title: "People",
  description: "Published Aston Cyber person profiles.",
};

export default function PeoplePage() {
  return (
    <InstitutionalPage
      eyebrow="People"
      introduction="Person profiles are published only after their content has been reviewed and approved."
      title="People"
    >
      <EmptyState
        description="Profiles will appear here only when approved person content is available."
        title="No person profiles are currently published"
      />
    </InstitutionalPage>
  );
}
