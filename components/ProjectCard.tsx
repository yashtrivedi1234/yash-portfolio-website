import Image from "next/image";
import type { Project } from "@/data/projects";
import { Button } from "@/components/Button";

interface ProjectCardProps {
  project: Project;
}

const statusColors: Record<string, string> = {
  Completed: "bg-green-500/10 text-green-400 border-green-500/30",
  "In Progress": "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  Featured: "bg-violet-500/10 text-violet-400 border-violet-500/30",
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm transition-all duration-300 hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/5">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} - ${project.category}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`rounded-full border px-3 py-1 text-xs font-medium ${statusColors[project.status]}`}>
            {project.status}
          </span>
          <span className="rounded-full border border-slate-600/50 bg-slate-900/80 px-3 py-1 text-xs font-medium text-slate-300 backdrop-blur-sm">
            {project.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white group-hover:text-violet-400 transition-colors">
            {project.title}
          </h3>
          <span className="text-sm text-slate-500">{project.year}</span>
        </div>

        <p className="mb-4 text-slate-400 line-clamp-2">{project.description}</p>

        <div className="mb-6 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-lg bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Button href={project.liveUrl} size="sm" external>
            Live Demo
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Button>
          {project.githubUrl && (
            <Button href={project.githubUrl} variant="outline" size="sm" external>
              GitHub
            </Button>
          )}
          <Button href={`/projects/${project.slug}`} variant="ghost" size="sm">
            View Details
          </Button>
        </div>
      </div>
    </article>
  );
}
