import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { ServiceCard } from "@/components/ServiceCard";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Button } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import {
  getSiteConfig,
  getFeaturedProjects,
  getServices,
  getExperienceItems,
  getTestimonials,
  getFaqs,
  getTechStackStrip,
} from "@/lib/data";
import { createPageMetadata, createFAQSchema } from "@/lib/seo";

export async function generateMetadata() {
  const config = await getSiteConfig();
  return createPageMetadata({
    title: `${config.name} | ${config.pageTitles.homeSuffix}`,
    description: config.seo.description,
    path: "/",
    config,
  });
}

export default async function HomePage() {
  const [config, featuredProjects, services, experienceItems, testimonials, faqs, techStackStrip] =
    await Promise.all([
      getSiteConfig(),
      getFeaturedProjects(),
      getServices(),
      getExperienceItems(),
      getTestimonials(),
      getFaqs(),
      getTechStackStrip(),
    ]);

  const workExperience = experienceItems.filter((item) => item.type === "work").slice(0, 2);
  const sections = config.homeSections;

  return (
    <>
      <JsonLd data={createFAQSchema(faqs)} />

      <Hero
        config={{
          name: config.name,
          role: config.role,
          shortBio: config.shortBio,
          resumeLink: config.resumeLink,
          socialLinks: config.socialLinks,
          hero: config.hero,
          buttons: config.buttons,
          heroCode: config.heroCode,
        }}
      />

      <section className="border-y border-slate-800/80 bg-slate-900/40 py-10 backdrop-blur-sm" aria-label={config.labels.techStackMarquee}>
        <div className="marquee-track overflow-hidden">
          <div className="animate-marquee flex w-max gap-8">
            {[...techStackStrip, ...techStackStrip].map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="flex items-center gap-2 whitespace-nowrap text-lg font-medium text-slate-400"
              >
                <span className="h-2 w-2 rounded-full bg-violet-500" />
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="about-section" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                label={sections.about.label}
                title={sections.about.title || `Passionate ${config.role}`}
                description={config.longBio}
                align="left"
                className="mb-0"
              />
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/about">{config.buttons.learnMoreAboutMe}</Button>
                <Button href="/skills" variant="outline">{config.buttons.viewSkills}</Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {config.stats.map((stat) => (
                <div key={stat.label} className="glass-card rounded-2xl p-6 text-center transition-transform duration-300 hover:-translate-y-1">
                  <div className="text-3xl font-bold text-gradient">{stat.value}</div>
                  <div className="mt-1 text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900/30 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading label={sections.projects.label} title={sections.projects.title} description={sections.projects.description} />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} labels={config.labels} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button href="/projects" variant="outline" size="lg">{config.buttons.viewAllProjects}</Button>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading label={sections.services.label} title={sections.services.title} description={sections.services.description} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((service) => (
              <ServiceCard key={service.title} service={service} getStartedLabel={config.labels.getStarted} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button href="/services" variant="outline" size="lg">{config.buttons.viewAllServices}</Button>
          </div>
        </div>
      </section>

      <section className="bg-slate-900/30 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading label={sections.experience.label} title={sections.experience.title} description={sections.experience.description} />
          <ExperienceTimeline items={workExperience} />
          <div className="text-center">
            <Button href="/experience" variant="outline" size="lg">{config.buttons.viewFullExperience}</Button>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading label={sections.achievements.label} title={sections.achievements.title} description={sections.achievements.description} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {config.stats.map((stat) => (
              <div key={stat.label} className="glass-card group p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/30">
                <div className="text-4xl font-bold text-gradient">{stat.value}</div>
                <div className="mt-2 text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900/30 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading label={sections.testimonials.label} title={sections.testimonials.title} description={sections.testimonials.description} />
          <Testimonials testimonials={testimonials} />
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading label={sections.faq.label} title={sections.faq.title} description={sections.faq.description} />
          <FAQ faqs={faqs} />
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CTA config={{ ...config.cta, availability: config.availability }} />
        </div>
      </section>
    </>
  );
}
