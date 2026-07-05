import type { MetadataRoute } from "next";
import { getSiteConfig } from "@/lib/data";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const config = await getSiteConfig();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"],
    },
    sitemap: `${config.portfolioUrl}/sitemap.xml`,
  };
}
