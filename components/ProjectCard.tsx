import Image from "next/image";
import type { Project } from "@/data/projects";
import type { SiteConfig } from "@/lib/site-config";

interface ProjectCardProps {
  project: Project;
  labels: SiteConfig["labels"];
}

function ExternalLinkIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
}

function getHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function ProjectCard({ project, labels }: ProjectCardProps) {
  const hasLiveUrl = Boolean(project.liveUrl && project.liveUrl !== "#");

  const body = (
    <>
      <div className="relative aspect-video overflow-hidden border-b border-slate-800/80 bg-slate-900/50">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
        {hasLiveUrl ? (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
            <span className="inline-flex items-center gap-2 rounded-full bg-violet-600/95 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-violet-900/40 backdrop-blur-sm">
              {labels.liveDemo}
              <ExternalLinkIcon className="h-3.5 w-3.5" />
            </span>
          </div>
        ) : null}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-violet-300">
          {project.title}
        </h3>
        {hasLiveUrl ? (
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-slate-400">
            <span className="truncate">{getHostname(project.liveUrl)}</span>
            <ExternalLinkIcon className="h-3.5 w-3.5 shrink-0 opacity-60" />
          </p>
        ) : (
          <p className="mt-1.5 text-sm text-slate-500">Live link coming soon</p>
        )}
      </div>
    </>
  );

  if (!hasLiveUrl) {
    return (
      <article className="glass-card overflow-hidden rounded-2xl border border-slate-800/80 opacity-80">
        {body}
      </article>
    );
  }

  return (
    <article className="group glass-card overflow-hidden rounded-2xl border border-slate-800/80 transition-all duration-300 hover:border-violet-500/35 hover:shadow-xl hover:shadow-violet-500/10">
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.title} — ${labels.liveDemo}`}
        className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
      >
        {body}
      </a>
    </article>
  );
}
