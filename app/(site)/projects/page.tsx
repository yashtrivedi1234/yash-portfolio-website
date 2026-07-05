import { ProjectsGrid } from "@/components/ProjectsGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { CTA } from "@/components/CTA";
import { JsonLd } from "@/components/JsonLd";
import { getProjects, getSiteConfig } from "@/lib/data";
import { getBreadcrumbLabels } from "@/lib/breadcrumbs";
import { createPageMetadata, createBreadcrumbSchema } from "@/lib/seo";

export async function generateMetadata() {
  const config = await getSiteConfig();
  const crumbs = getBreadcrumbLabels(config);
  return createPageMetadata({
    title: `${crumbs.projects} | ${config.name} ${config.pageTitles.projectsSuffix}`,
    description: config.pageHeadings.projects.description ?? "",
    path: "/projects",
    config,
  });
}

export default async function ProjectsPage() {
  const [projects, config] = await Promise.all([getProjects(), getSiteConfig()]);
  const heading = config.pageHeadings.projects;
  const crumbs = getBreadcrumbLabels(config);

  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: crumbs.home, url: "/" },
          { name: crumbs.projects, url: "/projects" },
        ], config)}
      />

      <div className="section-band-alt pt-24 pb-20 sm:pt-32 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading label={heading.label} title={heading.title} description={heading.description} />
          {projects.length === 0 ? (
            <div className="glass-card mx-auto mt-10 max-w-lg rounded-2xl p-10 text-center">
              <p className="text-lg font-medium text-white">No projects yet</p>
              <p className="mt-2 text-sm text-slate-400">Check back soon — new work is on the way.</p>
            </div>
          ) : (
            <div className="mt-10">
              <ProjectsGrid projects={projects} labels={config.labels} />
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <CTA config={{ ...config.cta, availability: config.availability }} />
      </div>
    </>
  );
}
