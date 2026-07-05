import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import type { SiteConfig } from "@/lib/site-config";
import { Button } from "@/components/Button";

interface ProjectCardProps {
  project: Project;
  labels: SiteConfig["labels"];
}

const statusColors: Record<string, string> = {
  Completed: "bg-green-500/10 text-green-400 border-green-500/30",
  "In Progress": "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  Featured: "bg-violet-500/10 text-violet-400 border-violet-500/30",
};

export function ProjectCard({ project, labels }: ProjectCardProps) {
  return (
    <article className="group glass-card card-hover flex h-full flex-col overflow-hidden rounded-2xl">
      <Link href={`/projects/${project.slug}`} className="relative block aspect-video overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} - ${project.category}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className={`rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm ${statusColors[project.status] ?? "bg-slate-800/80 text-slate-300 border-slate-600"}`}>
            {project.status}
          </span>
          <span className="rounded-full border border-slate-600/50 bg-slate-900/80 px-3 py-1 text-xs font-medium text-slate-300 backdrop-blur-sm">
            {project.category}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-start justify-between gap-3">
          <Link href={`/projects/${project.slug}`}>
            <h3 className="text-xl font-semibold text-white transition-colors group-hover:text-violet-400">
              {project.title}
            </h3>
          </Link>
          <span className="shrink-0 rounded-lg bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-slate-500">
            {project.year}
          </span>
        </div>

        <p className="mb-4 line-clamp-2 flex-grow text-slate-400">{project.description}</p>

        <div className="mb-6 flex flex-wrap gap-2">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-lg border border-slate-700/50 bg-slate-800/60 px-2.5 py-1 text-xs font-medium text-slate-300"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="rounded-lg px-2.5 py-1 text-xs font-medium text-slate-500">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        <div className="mt-auto flex flex-wrap gap-2 border-t border-slate-800/80 pt-4">
          <Button href={project.liveUrl} size="sm" external>
            {labels.liveDemo}
          </Button>
          <Button href={`/projects/${project.slug}`} variant="ghost" size="sm">
            {labels.viewDetails}
          </Button>
        </div>
      </div>
    </article>
  );
}
