import type { MetadataRoute } from "next";
import { getSiteConfig } from "@/lib/data";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const config = await getSiteConfig();

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
        src: config.manifest.iconUrl,
        sizes: "any",
        type: config.manifest.iconUrl.endsWith(".svg") ? "image/svg+xml" : "image/png",
      },
    ],
  };
}
