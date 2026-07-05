import { ServiceCard } from "@/components/ServiceCard";
import { SectionHeading } from "@/components/SectionHeading";
import { CTA } from "@/components/CTA";
import { JsonLd } from "@/components/JsonLd";
import { getServices, getSiteConfig } from "@/lib/data";
import { getBreadcrumbLabels } from "@/lib/breadcrumbs";
import { createPageMetadata, createBreadcrumbSchema } from "@/lib/seo";

export async function generateMetadata() {
  const config = await getSiteConfig();
  return createPageMetadata({
    title: `${config.pageTitles.servicesTitle} | ${config.name}`,
    description: config.pageHeadings.services.description ?? "",
    path: "/services",
    config,
  });
}

export default async function ServicesPage() {
  const [services, config] = await Promise.all([getServices(), getSiteConfig()]);
  const heading = config.pageHeadings.services;
  const crumbs = getBreadcrumbLabels(config);

  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: crumbs.home, url: "/" },
          { name: crumbs.services, url: "/services" },
        ], config)}
      />

      <div className="pt-24 pb-20 sm:pt-32 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading label={heading.label} title={heading.title} description={heading.description} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} getStartedLabel={config.labels.getStarted} />
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <CTA
          config={{ ...config.cta, availability: config.availability }}
          title={config.pageCta.services.title}
          description={config.pageCta.services.description}
        />
      </div>
    </>
  );
}
