import type { MetadataRoute } from "next";
import { getProjects, getBlogPosts, getSiteConfig } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [config, projects, blogPosts] = await Promise.all([
    getSiteConfig(),
    getProjects(),
    getBlogPosts(),
  ]);
  const baseUrl = config.portfolioUrl;

  const staticPages = config.navLinks.map((l) => l.href).concat(["/privacy-policy", "/terms-and-conditions"]);

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));

  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  return [...staticEntries, ...projectEntries, ...blogEntries];
}
