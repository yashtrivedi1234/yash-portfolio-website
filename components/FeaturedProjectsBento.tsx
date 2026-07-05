import type { Project } from "@/data/projects";
import type { SiteConfig } from "@/lib/site-config";
import { ProjectsGrid } from "@/components/ProjectsGrid";

interface FeaturedProjectsBentoProps {
  projects: Project[];
  labels: SiteConfig["labels"];
}

export function FeaturedProjectsBento({ projects, labels }: FeaturedProjectsBentoProps) {
  return <ProjectsGrid projects={projects.slice(0, 6)} labels={labels} stagger={false} tilt />;
}
