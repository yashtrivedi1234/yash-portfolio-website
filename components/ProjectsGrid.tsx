"use client";

import type { Project } from "@/data/projects";
import type { SiteConfig } from "@/lib/site-config";
import { ProjectCard } from "@/components/ProjectCard";
import { TiltCard } from "@/components/TiltCard";
import { RevealOnScroll } from "@/components/RevealOnScroll";

interface ProjectsGridProps {
  projects: Project[];
  labels: SiteConfig["labels"];
  stagger?: boolean;
  tilt?: boolean;
}

export function ProjectsGrid({ projects, labels, stagger = true, tilt = true }: ProjectsGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {projects.map((project, index) => {
        const card = <ProjectCard project={project} labels={labels} />;
        const wrapped = tilt ? <TiltCard className="h-full">{card}</TiltCard> : card;

        if (!stagger) {
          return <div key={project.slug}>{wrapped}</div>;
        }

        return (
          <RevealOnScroll key={project.slug} delay={Math.min(index * 80, 400)}>
            {wrapped}
          </RevealOnScroll>
        );
      })}
    </div>
  );
}
