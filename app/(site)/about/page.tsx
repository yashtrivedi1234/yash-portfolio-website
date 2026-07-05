import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { CTA } from "@/components/CTA";
import { JsonLd } from "@/components/JsonLd";
import { getSiteConfig, getSkillCategories } from "@/lib/data";
import { getBreadcrumbLabels } from "@/lib/breadcrumbs";
import { createPageMetadata, createBreadcrumbSchema } from "@/lib/seo";

export async function generateMetadata() {
  const config = await getSiteConfig();
  return createPageMetadata({
    title: `About ${config.name} | ${config.pageTitles.aboutSuffix}`,
    description: config.longBio,
    path: "/about",
    config,
  });
}

export default async function AboutPage() {
  const config = await getSiteConfig();
  const skillCategories = await getSkillCategories();
  const heading = config.pageHeadings.about;
  const crumbs = getBreadcrumbLabels(config);

  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: crumbs.home, url: "/" },
          { name: crumbs.about, url: "/about" },
        ], config)}
      />

      <div className="pt-24 pb-20 sm:pt-32 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label={heading.label}
            title={heading.title}
            description={config.longBio}
          />

          <div className="mx-auto max-w-3xl space-y-12">
            {config.aboutSections.map((section) => (
              <article key={section.title}>
                <h2 className="mb-4 text-2xl font-bold text-white">{section.title}</h2>
                <p className="text-lg leading-relaxed text-slate-400">{section.content}</p>
              </article>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-4">
            <Link href="/projects" className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-sm font-medium text-white transition-all hover:from-violet-500 hover:to-indigo-500">
              {config.buttons.viewProjects}
            </Link>
            <Link href="/contact" className="rounded-xl border border-slate-600 px-6 py-3 text-sm font-medium text-slate-200 transition-all hover:border-violet-500 hover:text-violet-400">
              {config.buttons.getInTouch}
            </Link>
          </div>

          <div className="mt-20">
            <h2 className="mb-8 text-center text-2xl font-bold text-white">{config.buttons.skillsOverview}</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {skillCategories.flatMap((cat) =>
                cat.skills.map((skill) => (
                  <span key={skill.name} className="rounded-full border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm text-slate-300">
                    {skill.name}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <CTA config={{ ...config.cta, availability: config.availability }} />
      </div>
    </>
  );
}
