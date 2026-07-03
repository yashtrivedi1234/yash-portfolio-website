import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { SectionHeading } from "@/components/SectionHeading";
import { CTA } from "@/components/CTA";
import { JsonLd } from "@/components/JsonLd";
import { experienceItems, experienceSections } from "@/data/experience";
import { siteConfig } from "@/data/site";
import { createPageMetadata, createBreadcrumbSchema } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: `Experience | ${siteConfig.name}`,
  description: `Professional experience, education, and achievements of ${siteConfig.name}. Full-stack developer with expertise in Next.js, React, and modern web technologies.`,
  path: "/experience",
});

export default function ExperiencePage() {
  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Experience", url: "/experience" },
        ])}
      />

      <div className="pt-24 pb-20 sm:pt-32 sm:pb-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Career"
            title="Experience & Background"
            description="My professional journey including work experience, freelance projects, education, certifications, and achievements."
          />

          {experienceSections.map((section) => {
            const items = experienceItems.filter((item) => item.type === section.key);
            return (
              <ExperienceTimeline
                key={section.key}
                title={section.label}
                items={items}
              />
            );
          })}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <CTA />
      </div>
    </>
  );
}
