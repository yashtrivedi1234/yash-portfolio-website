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
import { siteConfig } from "@/data/site";
import { getFeaturedProjects } from "@/data/projects";
import { services } from "@/data/services";
import { experienceItems } from "@/data/experience";
import { testimonials } from "@/data/testimonials";
import { faqs } from "@/data/faqs";
import { techStackStrip } from "@/data/skills";
import { createPageMetadata, createFAQSchema } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: `${siteConfig.name} | Full-Stack Developer Portfolio`,
  description: siteConfig.seo.description,
  path: "/",
});

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();
  const workExperience = experienceItems.filter((item) => item.type === "work").slice(0, 2);

  return (
    <>
      <JsonLd data={createFAQSchema(faqs)} />

      <Hero />

      {/* Tech Stack Strip */}
      <section className="border-y border-slate-800 bg-slate-900/30 py-8" aria-label="Tech stack">
        <div className="overflow-hidden">
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

      {/* About Preview */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                label="About Me"
                title={`Passionate ${siteConfig.role}`}
                description={siteConfig.longBio}
                align="left"
                className="mb-0"
              />
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/about">Learn More About Me</Button>
                <Button href="/skills" variant="outline">
                  View Skills
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {siteConfig.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 text-center backdrop-blur-sm"
                >
                  <div className="text-3xl font-bold text-violet-400">{stat.value}</div>
                  <div className="mt-1 text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="bg-slate-900/30 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Portfolio"
            title="Featured Projects"
            description="A selection of my recent work showcasing modern web development, clean design, and performance optimization."
          />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button href="/projects" variant="outline" size="lg">
              View All Projects
            </Button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Services"
            title="What I Can Do For You"
            description="Professional web development services tailored to help your business grow online."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button href="/services" variant="outline" size="lg">
              View All Services
            </Button>
          </div>
        </div>
      </section>

      {/* Experience Preview */}
      <section className="bg-slate-900/30 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Experience"
            title="Work Experience"
            description="My professional journey building production platforms, AI pipelines, and real-time applications across India."
          />
          <ExperienceTimeline items={workExperience} />
          <div className="text-center">
            <Button href="/experience" variant="outline" size="lg">
              View Full Experience
            </Button>
          </div>
        </div>
      </section>

      {/* Achievements / Stats */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Achievements"
            title="By The Numbers"
            description="Key milestones from shipping 15+ production platforms, leading engineering teams, and building AI pipelines."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {siteConfig.stats.map((stat) => (
              <div
                key={stat.label}
                className="group rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/80 to-slate-900/40 p-8 text-center backdrop-blur-sm transition-all hover:border-violet-500/30"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="mt-2 text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-900/30 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Testimonials"
            title="Work Highlights"
            description="Impact across companies I've worked with — from production platforms to AI pipelines and team leadership."
          />
          <Testimonials testimonials={testimonials} />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="FAQ"
            title="Frequently Asked Questions"
            description="Common questions about my services, process, and expertise as a web developer."
          />
          <FAQ faqs={faqs} />
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CTA />
        </div>
      </section>
    </>
  );
}
