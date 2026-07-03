import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import { projects, getProjectBySlug } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { createPageMetadata, createBreadcrumbSchema, createProjectSchema } from "@/lib/seo";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return createPageMetadata({
    title: `${project.title} | Project by ${siteConfig.name}`,
    description: project.description,
    path: `/projects/${project.slug}`,
    ogImage: project.image,
    ogType: "article",
    keywords: [...project.techStack, project.category, "Web Development Project"],
  });
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={[
          createBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Projects", url: "/projects" },
            { name: project.title, url: `/projects/${project.slug}` },
          ]),
          createProjectSchema(project),
        ]}
      />

      <article className="pt-24 pb-20 sm:pt-32 sm:pb-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Button href="/projects" variant="ghost" size="sm" className="mb-8">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
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
            <h1 className="text-4xl font-bold text-white sm:text-5xl">{project.title}</h1>
            <p className="mt-4 text-xl text-slate-400">{project.description}</p>
          </header>

          <div className="relative mb-10 aspect-video overflow-hidden rounded-2xl border border-slate-800">
            <Image
              src={project.image}
              alt={`${project.title} project screenshot`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          <div className="mb-10 flex flex-wrap gap-4">
            <Button href={project.liveUrl} size="lg" external>
              Live Demo
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Button>
            {project.githubUrl && (
              <Button href={project.githubUrl} variant="outline" size="lg" external>
                GitHub Repository
              </Button>
            )}
          </div>

          <div className="prose prose-invert max-w-none">
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-white">About This Project</h2>
              <p className="text-lg leading-relaxed text-slate-400">{project.longDescription}</p>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-white">Tech Stack</h2>
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
              <h2 className="mb-4 text-2xl font-bold text-white">Key Features</h2>
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
