import type { MetadataRoute } from "next";
import { getSiteConfig } from "@/lib/data";
import { getFaviconType, resolveFaviconUrl } from "@/lib/favicon";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const config = await getSiteConfig();
  const iconUrl = resolveFaviconUrl(
    config.seo.favicon || config.manifest.iconUrl,
    config.portfolioUrl
  );

  return {
    name: config.manifest.name,
    short_name: config.manifest.shortName,
    description: config.manifest.description,
    start_url: "/",
    display: "standalone",
    background_color: config.manifest.backgroundColor,
    theme_color: config.seo.themeColor,
    icons: [
      {
        src: iconUrl,
        sizes: "any",
        type: getFaviconType(iconUrl),
      },
    ],
  };
}
