import Image from "next/image";
import type { Project } from "@/data/projects";
import type { SiteConfig } from "@/lib/site-config";
import { Button } from "@/components/Button";

interface ProjectCardProps {
  project: Project;
  labels: SiteConfig["labels"];
}

export function ProjectCard({ project, labels }: ProjectCardProps) {
  return (
    <article className="group glass-card card-hover overflow-hidden rounded-2xl">
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block aspect-video overflow-hidden border-b border-slate-800/80 shadow-inner shadow-black/20"
      >
        <Image
          src={project.image}
          alt={labels.liveDemo}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </a>

      <div className="p-4">
        <Button href={project.liveUrl} size="sm" external className="w-full justify-center">
          {labels.liveDemo}
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </Button>
      </div>
    </article>
  );
}
