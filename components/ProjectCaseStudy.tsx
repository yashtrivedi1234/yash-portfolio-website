import Image from "next/image";
import type { Project } from "@/data/projects";
import type { SiteConfig } from "@/lib/site-config";

interface ProjectCaseStudyProps {
  project: Project;
  labels: SiteConfig["labels"];
}

export function ProjectCaseStudy({ project, labels }: ProjectCaseStudyProps) {
  const hasCaseStudy =
    project.problem || project.solution || project.result || (project.metrics?.length ?? 0) > 0;

  if (!hasCaseStudy) return null;

  const blocks = [
    { key: "problem", title: labels.problem, content: project.problem },
    { key: "solution", title: labels.solution, content: project.solution },
    { key: "result", title: labels.result, content: project.result },
  ].filter((block) => block.content);

  return (
    <div className="space-y-10">
      {project.metrics && project.metrics.length > 0 && (
        <section>
          <h2 className="mb-4 text-2xl font-bold text-white">{labels.keyMetrics}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.metrics.map((metric) => (
              <div
                key={metric.label}
                className="glass-card rounded-2xl p-5 text-center transition-colors hover:border-violet-500/30"
              >
                <div className="text-2xl font-bold text-gradient sm:text-3xl">{metric.value}</div>
                <div className="mt-1 text-sm text-slate-400">{metric.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {blocks.length > 0 && (
        <section className="grid gap-4 md:grid-cols-3">
          {blocks.map((block) => (
            <article key={block.key} className="glass-card rounded-2xl p-6">
              <h2 className="mb-3 text-lg font-semibold text-violet-300">{block.title}</h2>
              <p className="leading-relaxed text-slate-400">{block.content}</p>
            </article>
          ))}
        </section>
      )}

      {project.gallery && project.gallery.length > 0 && (
        <section>
          <h2 className="mb-4 text-2xl font-bold text-white">{labels.projectGallery}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {project.gallery.map((src, i) => (
              <div
                key={src}
                className="relative aspect-video overflow-hidden rounded-2xl border border-slate-800 shadow-lg shadow-black/20"
              >
                <Image
                  src={src}
                  alt={`${project.title} screenshot ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
