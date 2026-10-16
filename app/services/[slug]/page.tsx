import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceDetail } from "@/components/content/service-detail";
import { getService, services } from "@/lib/services";
import { createPageMetadata } from "@/lib/site-metadata";

type ServicePageProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const service = getService((await params).slug);

  if (!service) {
    return {};
  }

  return createPageMetadata({
    description: service.description,
    pathname: `/services/${service.slug}`,
    title: service.title,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const service = getService((await params).slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetail service={service} />;
}
