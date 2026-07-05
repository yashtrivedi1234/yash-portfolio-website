import { prisma } from "@/lib/db";
import { getDefaultSiteConfig, mergeSiteConfig, type SiteConfig } from "@/lib/site-config";
import { projects as staticProjects, type Project } from "@/data/projects";
import { services as staticServices, type Service } from "@/data/services";
import { skillCategories as staticSkillCategories, techStackStrip as staticTechStack, type SkillCategory } from "@/data/skills";
import { experienceItems as staticExperience, type ExperienceItem } from "@/data/experience";
import { testimonials as staticTestimonials, type Testimonial } from "@/data/testimonials";
import { faqs as staticFaqs, type FAQ } from "@/data/faqs";

export type { SiteConfig } from "@/lib/site-config";

async function isDbConnected() {
  try {
    if (!process.env.DATABASE_URL) return false;
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}

export async function getSiteConfig(): Promise<SiteConfig> {
  const defaults = getDefaultSiteConfig();
  if (!(await isDbConnected())) return defaults;

  try {
    const settings = await prisma.siteSettings.findUnique({ where: { id: "default" } });
    if (!settings?.data) return defaults;
    return mergeSiteConfig(settings.data as Record<string, unknown>);
  } catch {
    return defaults;
  }
}

export async function getProjects(): Promise<Project[]> {
  if (!(await isDbConnected())) return staticProjects;

  try {
    const rows = await prisma.project.findMany({ orderBy: { sortOrder: "asc" } });
    if (rows.length === 0) return staticProjects;
    return rows.map((p) => ({
      title: p.title,
      slug: p.slug,
      description: p.description,
      longDescription: p.longDescription,
      image: p.image,
      techStack: p.techStack,
      category: p.category,
      year: p.year,
      status: p.status as Project["status"],
      featured: p.featured,
      liveUrl: p.liveUrl,
      features: p.features,
    }));
  } catch {
    return staticProjects;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter((p) => p.featured);
}

export async function getServices(): Promise<Service[]> {
  if (!(await isDbConnected())) return staticServices;

  try {
    const rows = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });
    if (rows.length === 0) return staticServices;
    return rows.map((s) => ({
      title: s.title,
      description: s.description,
      icon: s.icon,
      benefits: s.benefits,
    }));
  } catch {
    return staticServices;
  }
}

export async function getSkillCategories(): Promise<SkillCategory[]> {
  if (!(await isDbConnected())) return staticSkillCategories;

  try {
    const rows = await prisma.skillCategory.findMany({
      include: { skills: { orderBy: { sortOrder: "asc" } } },
      orderBy: { sortOrder: "asc" },
    });
    if (rows.length === 0) return staticSkillCategories;
    return rows.map((c) => ({
      category: c.category,
      description: c.description,
      skills: c.skills.map((s) => ({ name: s.name })),
    }));
  } catch {
    return staticSkillCategories;
  }
}

export async function getTechStackStrip(): Promise<string[]> {
  if (!(await isDbConnected())) return [...staticTechStack];

  try {
    const rows = await prisma.techStackItem.findMany({ orderBy: { sortOrder: "asc" } });
    if (rows.length === 0) return [...staticTechStack];
    return rows.map((t) => t.name);
  } catch {
    return [...staticTechStack];
  }
}

export async function getExperienceItems(): Promise<ExperienceItem[]> {
  if (!(await isDbConnected())) return staticExperience;

  try {
    const rows = await prisma.experience.findMany({ orderBy: { sortOrder: "asc" } });
    if (rows.length === 0) return staticExperience;
    return rows.map((e) => ({
      title: e.title,
      organization: e.organization,
      location: e.location ?? undefined,
      period: e.period,
      description: e.description,
      type: e.type as ExperienceItem["type"],
      technologies: e.technologies.length > 0 ? e.technologies : undefined,
    }));
  } catch {
    return staticExperience;
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!(await isDbConnected())) return staticTestimonials;

  try {
    const rows = await prisma.testimonial.findMany({ orderBy: { sortOrder: "asc" } });
    if (rows.length === 0) return staticTestimonials;
    return rows.map((t) => ({
      name: t.name,
      role: t.role,
      company: t.company,
      content: t.content,
      avatar: t.avatar,
      rating: t.rating,
    }));
  } catch {
    return staticTestimonials;
  }
}

export async function getFaqs(): Promise<FAQ[]> {
  if (!(await isDbConnected())) return staticFaqs;

  try {
    const rows = await prisma.faq.findMany({ orderBy: { sortOrder: "asc" } });
    if (rows.length === 0) return staticFaqs;
    return rows.map((f) => ({ question: f.question, answer: f.answer }));
  } catch {
    return staticFaqs;
  }
}

export async function getAdminStats() {
  const [projects, services, messages, unread] = await Promise.all([
    prisma.project.count(),
    prisma.service.count(),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { read: false } }),
  ]);
  return { projects, services, messages, unread };
}
