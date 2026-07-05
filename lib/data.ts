import { cache } from "react";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { getDefaultSiteConfig, mergeSiteConfig, type SiteConfig } from "@/lib/site-config";
import { projects as staticProjects, type Project } from "@/data/projects";
import { services as staticServices, type Service } from "@/data/services";
import { skillCategories as staticSkillCategories, techStackStrip as staticTechStack, type SkillCategory, type TechStackMarqueeItem } from "@/data/skills";
import { experienceItems as staticExperience, type ExperienceItem } from "@/data/experience";
import { testimonials as staticTestimonials, type Testimonial } from "@/data/testimonials";
import { faqs as staticFaqs, type FAQ } from "@/data/faqs";
import { blogPosts as staticBlogPosts, type BlogPost } from "@/data/blog";

export type { SiteConfig } from "@/lib/site-config";
export type { BlogPost } from "@/data/blog";

const REVALIDATE_SECONDS = 60;

const getDbConnected = unstable_cache(
  async (): Promise<boolean> => {
    try {
      if (!process.env.DATABASE_URL) return false;
      await prisma.$queryRaw`SELECT 1`;
      return true;
    } catch {
      return false;
    }
  },
  ["db-connected"],
  { revalidate: REVALIDATE_SECONDS }
);

async function isDbConnected(): Promise<boolean> {
  return getDbConnected();
}

async function loadSiteConfig(): Promise<SiteConfig> {
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

async function loadProjects(): Promise<Project[]> {
  if (!(await isDbConnected())) return staticProjects;

  try {
    const rows = await prisma.project.findMany({ orderBy: { sortOrder: "asc" } });
    if (rows.length === 0) return staticProjects;
    return rows.map((p) => ({
      slug: p.slug,
      title: p.title,
      image: p.image,
      liveUrl: p.liveUrl,
    }));
  } catch {
    return staticProjects;
  }
}

async function loadServices(): Promise<Service[]> {
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

async function loadSkillCategories(): Promise<SkillCategory[]> {
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

async function loadTechStackStrip(): Promise<TechStackMarqueeItem[]> {
  if (!(await isDbConnected())) return staticTechStack.map((item) => ({ ...item }));

  try {
    const rows = await prisma.techStackItem.findMany({ orderBy: { sortOrder: "asc" } });
    if (rows.length === 0) return staticTechStack.map((item) => ({ ...item }));
    return rows.map((t) => ({
      name: t.name,
      logo: t.logo ?? undefined,
    }));
  } catch {
    return staticTechStack.map((item) => ({ ...item }));
  }
}

async function loadExperienceItems(): Promise<ExperienceItem[]> {
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

async function loadTestimonials(): Promise<Testimonial[]> {
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

async function loadFaqs(): Promise<FAQ[]> {
  if (!(await isDbConnected())) return staticFaqs;

  try {
    const rows = await prisma.faq.findMany({ orderBy: { sortOrder: "asc" } });
    if (rows.length === 0) return staticFaqs;
    return rows.map((f) => ({ question: f.question, answer: f.answer }));
  } catch {
    return staticFaqs;
  }
}

async function loadBlogPosts(publishedOnly = true): Promise<BlogPost[]> {
  if (!(await isDbConnected())) return staticBlogPosts;

  try {
    const rows = await prisma.blogPost.findMany({
      where: publishedOnly ? { published: true } : undefined,
      orderBy: [{ publishedAt: "desc" }, { sortOrder: "asc" }],
    });
    if (rows.length === 0 && publishedOnly) return staticBlogPosts;
    return rows.map((post) => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage,
      publishedAt: (post.publishedAt ?? post.createdAt).toISOString(),
    }));
  } catch {
    return staticBlogPosts;
  }
}

export const SITE_CONFIG_CACHE_TAG = "site-config";

const getSiteConfigCached = unstable_cache(loadSiteConfig, ["site-config"], {
  revalidate: REVALIDATE_SECONDS,
  tags: [SITE_CONFIG_CACHE_TAG],
});
const getProjectsCached = unstable_cache(loadProjects, ["projects"], { revalidate: REVALIDATE_SECONDS });
const getServicesCached = unstable_cache(loadServices, ["services"], { revalidate: REVALIDATE_SECONDS });
const getSkillCategoriesCached = unstable_cache(loadSkillCategories, ["skill-categories"], { revalidate: REVALIDATE_SECONDS });
const getTechStackStripCached = unstable_cache(loadTechStackStrip, ["tech-stack"], { revalidate: REVALIDATE_SECONDS });
const getExperienceItemsCached = unstable_cache(loadExperienceItems, ["experience"], { revalidate: REVALIDATE_SECONDS });
const getTestimonialsCached = unstable_cache(loadTestimonials, ["testimonials"], { revalidate: REVALIDATE_SECONDS });
const getFaqsCached = unstable_cache(loadFaqs, ["faqs"], { revalidate: REVALIDATE_SECONDS });
const getBlogPostsCached = unstable_cache(
  () => loadBlogPosts(true),
  ["blog-posts"],
  { revalidate: REVALIDATE_SECONDS }
);

export const getSiteConfig = cache(getSiteConfigCached);
export const getProjects = cache(getProjectsCached);
export const getServices = cache(getServicesCached);
export const getSkillCategories = cache(getSkillCategoriesCached);
export const getTechStackStrip = cache(getTechStackStripCached);
export const getExperienceItems = cache(getExperienceItemsCached);
export const getTestimonials = cache(getTestimonialsCached);
export const getFaqs = cache(getFaqsCached);
export const getBlogPosts = cache(getBlogPostsCached);

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects.slice(0, 6);
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
