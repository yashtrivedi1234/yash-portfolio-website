import { ServiceCard } from "@/components/ServiceCard";
import { SectionHeading } from "@/components/SectionHeading";
import { CTA } from "@/components/CTA";
import { JsonLd } from "@/components/JsonLd";
import { services } from "@/data/services";
import { siteConfig } from "@/data/site";
import { createPageMetadata, createBreadcrumbSchema } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: `Web Development Services | ${siteConfig.name}`,
  description: `Professional web development services by ${siteConfig.name}. Website development, Next.js apps, landing pages, SEO optimization, and more.`,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
        ])}
      />

      <div className="pt-24 pb-20 sm:pt-32 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Services"
            title="Web Development Services"
            description="Comprehensive web development services to help your business establish a strong online presence and achieve your digital goals."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <CTA
          title="Let's Build Something Great"
          description="Ready to start your next project? Get in touch for a free consultation and project estimate."
        />
      </div>
    </>
  );
}
