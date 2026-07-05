import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import { ProjectCaseStudy } from "@/components/ProjectCaseStudy";
import { getProjects, getProjectBySlug, getSiteConfig } from "@/lib/data";
import { getBreadcrumbLabels } from "@/lib/breadcrumbs";
import { createPageMetadata, createBreadcrumbSchema, createProjectSchema } from "@/lib/seo";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    const config = await getSiteConfig();
    return { title: config.labels.projectNotFound };
  }

  const config = await getSiteConfig();

  return createPageMetadata({
    title: `${project.title} | ${config.pageTitles.projectByPrefix} ${config.name}`,
    description: project.description,
    path: `/projects/${project.slug}`,
    ogImage: project.image,
    ogType: "article",
    keywords: [...project.techStack, project.category, config.labels.projectMetaKeyword],
    config,
  });
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const [project, config] = await Promise.all([getProjectBySlug(slug), getSiteConfig()]);
  const crumbs = getBreadcrumbLabels(config);
  const labels = config.labels;

  if (!project) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={[
          createBreadcrumbSchema([
            { name: crumbs.home, url: "/" },
            { name: crumbs.projects, url: "/projects" },
            { name: project.title, url: `/projects/${project.slug}` },
          ], config),
          createProjectSchema(project, config),
        ]}
      />

      <article className="pt-24 pb-20 sm:pt-32 sm:pb-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Button href="/projects" variant="ghost" size="sm" className="mb-8">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {labels.backToProjects}
          </Button>

          <header className="mb-8">
            <div className="mb-4 flex flex-wrap gap-3">
              <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-sm text-violet-400">
                {project.status}
              </span>
              <span className="rounded-full border border-slate-600 bg-slate-800/50 px-3 py-1 text-sm text-slate-300">
                {project.category}
              </span>
              <span className="rounded-full border border-slate-600 bg-slate-800/50 px-3 py-1 text-sm text-slate-300">
                {project.year}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{project.title}</h1>
            <p className="mt-4 text-lg text-slate-400 sm:text-xl">{project.description}</p>
          </header>

          <div className="relative mb-10 aspect-video overflow-hidden rounded-2xl border border-slate-800 shadow-xl shadow-black/30">
            <Image
              src={project.image}
              alt={`${project.title} project screenshot`}
              fill
              className="object-cover transition-transform duration-500 hover:scale-[1.02]"
              priority
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          <div className="mb-10 flex flex-wrap gap-4">
            <Button href={project.liveUrl} size="lg" external>
              {labels.liveDemo}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Button>
          </div>

          <ProjectCaseStudy project={project} labels={labels} />

          <div className="prose prose-invert max-w-none">
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-white">{labels.aboutProject}</h2>
              <p className="text-lg leading-relaxed text-slate-400">{project.longDescription}</p>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-white">{labels.techStack}</h2>
              <div className="flex flex-wrap gap-3">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm font-medium text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-white">{labels.keyFeatures}</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-3 text-slate-300"
                  >
                    <svg className="h-5 w-5 shrink-0 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}
