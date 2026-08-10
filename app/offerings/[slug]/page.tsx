import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { OfferingDetail } from "@/components/content/offering-detail";
import { getOffering, offerings } from "@/lib/offerings";
import { createPageMetadata } from "@/lib/site-metadata";

type OfferingPageProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

export function generateStaticParams() {
  return offerings.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: OfferingPageProps): Promise<Metadata> {
  const offering = getOffering((await params).slug);

  if (!offering) {
    return {};
  }

  return createPageMetadata({
    description: offering.description,
    pathname: `/offerings/${offering.slug}`,
    title: offering.title,
  });
}

export default async function OfferingPage({ params }: OfferingPageProps) {
  const offering = getOffering((await params).slug);

  if (!offering) {
    notFound();
  }

  return <OfferingDetail offering={offering} />;
}
