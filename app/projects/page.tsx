import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";
import { CTA } from "@/components/CTA";
import { JsonLd } from "@/components/JsonLd";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { createPageMetadata, createBreadcrumbSchema } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: `Projects | ${siteConfig.name} Portfolio`,
  description: `Explore web development projects by ${siteConfig.name}. Modern websites, web applications, and SaaS products built with Next.js, React, and TypeScript.`,
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Projects", url: "/projects" },
        ])}
      />

      <div className="pt-24 pb-20 sm:pt-32 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Portfolio"
            title="My Projects"
            description="A collection of web development projects showcasing my skills in building modern, performant, and user-friendly applications."
          />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <CTA />
      </div>
    </>
  );
}
