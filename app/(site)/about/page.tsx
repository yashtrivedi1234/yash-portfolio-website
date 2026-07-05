import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { CTA } from "@/components/CTA";
import { JsonLd } from "@/components/JsonLd";
import { RevealOnScroll } from "@/components/RevealOnScroll";
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
  const aboutPage = config.aboutPage;
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
          <RevealOnScroll>
            <div className="mb-16 flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:gap-12">
              <div className="relative shrink-0">
                <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-violet-600/30 to-indigo-600/30 blur-xl" />
                <div className="relative overflow-hidden rounded-full border-4 border-slate-800 shadow-2xl shadow-violet-500/20">
                  <Image
                    src={config.hero.profileImage}
                    alt={config.name}
                    width={200}
                    height={200}
                    className="h-40 w-40 object-cover sm:h-48 sm:w-48"
                    priority
                  />
                </div>
              </div>
              <div className="flex-1 text-center lg:text-left">
                <SectionHeading
                  label={heading.label}
                  title={heading.title}
                  description={config.longBio}
                  align="left"
                  className="mb-6 lg:mx-0"
                />
                <div className="space-y-4">
                  <div>
                    <p className="mb-2 text-sm font-medium text-violet-400">{aboutPage.currentlyLearningLabel}</p>
                    <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
                      {aboutPage.currentlyLearning.map((item) => (
                        <span key={item} className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-sm text-violet-300">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-indigo-400">{aboutPage.focusLabel}</p>
                    <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
                      {aboutPage.focusAreas.map((item) => (
                        <span key={item} className="rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1 text-sm text-slate-300">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          <div className="mx-auto max-w-3xl space-y-12">
            {config.aboutSections.map((section, i) => (
              <RevealOnScroll key={section.title} delay={i * 60}>
                <article>
                  <h2 className="mb-4 text-2xl font-bold tracking-tight text-white">{section.title}</h2>
                  <p className="text-lg leading-relaxed text-slate-400">{section.content}</p>
                </article>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll delay={100}>
            <div className="mt-16 flex flex-wrap justify-center gap-4">
              <Link href="/projects" className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-sm font-medium text-white transition-all hover:scale-[1.02] hover:from-violet-500 hover:to-indigo-500">
                {config.buttons.viewProjects}
              </Link>
              <Link href="/contact" className="rounded-xl border border-slate-600 px-6 py-3 text-sm font-medium text-slate-200 transition-all hover:border-violet-500 hover:text-violet-400">
                {config.buttons.getInTouch}
              </Link>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <div className="mt-20">
              <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-white">{config.buttons.skillsOverview}</h2>
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
          </RevealOnScroll>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <CTA config={{ ...config.cta, availability: config.availability }} />
      </div>
    </>
  );
}
