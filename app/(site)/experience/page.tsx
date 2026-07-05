import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { SectionHeading } from "@/components/SectionHeading";
import { CTA } from "@/components/CTA";
import { JsonLd } from "@/components/JsonLd";
import { getExperienceItems, getSiteConfig } from "@/lib/data";
import { getBreadcrumbLabels } from "@/lib/breadcrumbs";
import { createPageMetadata, createBreadcrumbSchema } from "@/lib/seo";

export async function generateMetadata() {
  const config = await getSiteConfig();
  return createPageMetadata({
    title: `${config.pageTitles.experiencePrefix} | ${config.name}`,
    description: config.pageHeadings.experience.description ?? "",
    path: "/experience",
    config,
  });
}

export default async function ExperiencePage() {
  const [experienceItems, config] = await Promise.all([getExperienceItems(), getSiteConfig()]);
  const heading = config.pageHeadings.experience;
  const crumbs = getBreadcrumbLabels(config);

  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: crumbs.home, url: "/" },
          { name: crumbs.experience, url: "/experience" },
        ], config)}
      />

      <div className="pt-24 pb-20 sm:pt-32 sm:pb-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading label={heading.label} title={heading.title} description={heading.description} />

          {config.experienceSections.map((section) => {
            const items = experienceItems.filter((item) => item.type === section.key);
            if (items.length === 0) return null;
            return (
              <ExperienceTimeline key={section.key} title={section.label} items={items} />
            );
          })}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <CTA config={{ ...config.cta, availability: config.availability }} />
      </div>
    </>
  );
}
