import type { Project } from "@/data/projects";
import type { SiteConfig } from "@/lib/site-config";
import { ProjectCard } from "@/components/ProjectCard";
import { TiltCard } from "@/components/TiltCard";

interface FeaturedProjectsBentoProps {
  projects: Project[];
  labels: SiteConfig["labels"];
}

export function FeaturedProjectsBento({ projects, labels }: FeaturedProjectsBentoProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.slice(0, 6).map((project) => (
        <TiltCard key={project.slug} className="h-full">
          <ProjectCard project={project} labels={labels} />
        </TiltCard>
      ))}
    </div>
  );
}
