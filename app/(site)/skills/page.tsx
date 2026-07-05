import { SkillCard } from "@/components/SkillCard";
import { SectionHeading } from "@/components/SectionHeading";
import { CTA } from "@/components/CTA";
import { JsonLd } from "@/components/JsonLd";
import { getSkillCategories, getTechStackStrip, getSiteConfig } from "@/lib/data";
import { getBreadcrumbLabels } from "@/lib/breadcrumbs";
import { createPageMetadata, createBreadcrumbSchema } from "@/lib/seo";

export async function generateMetadata() {
  const config = await getSiteConfig();
  return createPageMetadata({
    title: `${config.pageTitles.skillsPrefix} | ${config.name}`,
    description: config.pageHeadings.skills.description ?? "",
    path: "/skills",
    config,
  });
}

export default async function SkillsPage() {
  const [skillCategories, techStackStrip, config] = await Promise.all([
    getSkillCategories(),
    getTechStackStrip(),
    getSiteConfig(),
  ]);
  const heading = config.pageHeadings.skills;
  const crumbs = getBreadcrumbLabels(config);

  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: crumbs.home, url: "/" },
          { name: crumbs.skills, url: "/skills" },
        ], config)}
      />

      <div className="pt-24 pb-20 sm:pt-32 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading label={heading.label} title={heading.title} description={heading.description} />
          <div className="mb-16 flex flex-wrap justify-center gap-3">
            {techStackStrip.map((tech) => (
              <span key={tech.name} className="rounded-full border border-violet-500/30 bg-violet-500/10 px-5 py-2 text-sm font-medium text-violet-300">
                {tech.name}
              </span>
            ))}
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {skillCategories.map((category) => (
              <SkillCard key={category.category} category={category} />
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <CTA
          config={{ ...config.cta, availability: config.availability }}
          title={config.pageCta.skills.title}
          description={config.pageCta.skills.description}
        />
      </div>
    </>
  );
}
