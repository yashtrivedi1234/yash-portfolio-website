import dynamic from "next/dynamic";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { CTA } from "@/components/CTA";
import { Button } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { StatCounter } from "@/components/StatCounter";
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

const TechMarquee = dynamic(
  () => import("@/components/TechMarquee").then((m) => m.TechMarquee),
  { loading: () => <div className="h-16 border-y border-slate-800/80 bg-slate-900/40" /> }
);

const FeaturedProjectsBento = dynamic(
  () => import("@/components/FeaturedProjectsBento").then((m) => m.FeaturedProjectsBento),
  { loading: () => <div className="grid min-h-[420px] gap-6 md:grid-cols-2 lg:grid-cols-3" /> }
);

const TestimonialsCarousel = dynamic(
  () => import("@/components/TestimonialsCarousel").then((m) => m.TestimonialsCarousel),
  { loading: () => <div className="mx-auto h-64 max-w-3xl animate-pulse rounded-2xl bg-slate-800/40" /> }
);

const FAQ = dynamic(
  () => import("@/components/FAQ").then((m) => m.FAQ),
  { loading: () => <div className="mx-auto h-48 max-w-3xl animate-pulse rounded-2xl bg-slate-800/40" /> }
);

export const revalidate = 60;

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
          availability: config.availability,
          navbar: config.navbar,
        }}
      />

      <TechMarquee items={techStackStrip} ariaLabel={config.labels.techStackMarquee} />

      <section id="about-section" className="section-band py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <SectionHeading
                  label={sections.about.label}
                  title={sections.about.title || `Passionate ${config.role}`}
                  description={config.longBio}
                  align="left"
                  className="mb-0"
                />
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                  <Button href="/about">{config.buttons.learnMoreAboutMe}</Button>
                  <Button href="/skills" variant="outline">{config.buttons.viewSkills}</Button>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2">
                {config.stats.map((stat) => (
                  <div key={stat.label} className="glass-card rounded-2xl p-4 text-center transition-transform duration-300 hover:-translate-y-1 sm:p-6">
                    <div className="text-2xl font-bold text-gradient sm:text-3xl">
                      <StatCounter value={stat.value} />
                    </div>
                    <div className="mt-1 text-sm text-slate-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section id="projects-section" className="section-band-alt py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <SectionHeading label={sections.projects.label} title={sections.projects.title} description={sections.projects.description} />
            <div className="mt-10">
              <FeaturedProjectsBento projects={featuredProjects} labels={config.labels} />
            </div>
            <div className="mt-12 text-center">
              <Button href="/projects" variant="outline" size="lg">{config.buttons.viewAllProjects}</Button>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section id="services-section" className="section-band py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <SectionHeading label={sections.services.label} title={sections.services.title} description={sections.services.description} />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.slice(0, 6).map((service) => (
                <ServiceCard key={service.title} service={service} getStartedLabel={config.labels.getStarted} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button href="/services" variant="outline" size="lg">{config.buttons.viewAllServices}</Button>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section id="experience-section" className="section-band-alt py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <SectionHeading label={sections.experience.label} title={sections.experience.title} description={sections.experience.description} />
            <ExperienceTimeline items={workExperience} />
            <div className="text-center">
              <Button href="/experience" variant="outline" size="lg">{config.buttons.viewFullExperience}</Button>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section id="achievements-section" className="section-band py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <SectionHeading label={sections.achievements.label} title={sections.achievements.title} description={sections.achievements.description} />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {config.stats.map((stat) => (
                <div key={`ach-${stat.label}`} className="glass-card group p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/30">
                  <div className="text-4xl font-bold text-gradient">
                    <StatCounter value={stat.value} />
                  </div>
                  <div className="mt-2 text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section id="testimonials-section" className="section-band-alt py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <SectionHeading label={sections.testimonials.label} title={sections.testimonials.title} description={sections.testimonials.description} />
            <div className="mt-10">
              <TestimonialsCarousel testimonials={testimonials} />
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section id="faq-section" className="section-band py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <SectionHeading label={sections.faq.label} title={sections.faq.title} description={sections.faq.description} />
            <div className="mt-10">
              <FAQ faqs={faqs} />
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-band-alt py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <CTA config={{ ...config.cta, availability: config.availability }} />
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
