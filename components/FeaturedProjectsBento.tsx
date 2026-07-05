import type { Project } from "@/data/projects";
import type { SiteConfig } from "@/lib/site-config";
import { ProjectCard } from "@/components/ProjectCard";
import { TiltCard } from "@/components/TiltCard";
import { cn } from "@/lib/utils";

interface FeaturedProjectsBentoProps {
  projects: Project[];
  labels: SiteConfig["labels"];
}

export function FeaturedProjectsBento({ projects, labels }: FeaturedProjectsBentoProps) {
  const items = projects.slice(0, 3);
  const layouts = [
    "lg:col-span-2 lg:row-span-2",
    "lg:col-span-1",
    "lg:col-span-1",
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
      {items.map((project, i) => (
        <TiltCard key={project.slug} className={cn("h-full", layouts[i])}>
          <ProjectCard project={project} labels={labels} featured={i === 0} />
        </TiltCard>
      ))}
    </div>
  );
}
