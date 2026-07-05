import { notFound, redirect } from "next/navigation";
import { getProjectBySlug } from "@/lib/data";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { getProjects } = await import("@/lib/data");
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  if (project.liveUrl && project.liveUrl !== "#") {
    redirect(project.liveUrl);
  }

  notFound();
}
