import { getSiteConfig } from "@/lib/data";
import { getDefaultSiteConfig } from "@/lib/site-config";

export function getFaviconType(url: string): string {
  const path = url.split("?")[0].toLowerCase();
  if (path.endsWith(".svg")) return "image/svg+xml";
  if (path.endsWith(".png")) return "image/png";
  if (path.endsWith(".webp")) return "image/webp";
  if (path.endsWith(".ico")) return "image/x-icon";
  if (path.endsWith(".jpg") || path.endsWith(".jpeg")) return "image/jpeg";
  return "image/png";
}

export function resolveFaviconUrl(favicon: string, baseUrl: string): string {
  if (!favicon) {
    const base = baseUrl.replace(/\/$/, "");
    return `${base}/logo.svg`;
  }
  if (favicon.startsWith("http://") || favicon.startsWith("https://")) {
    return favicon;
  }
  const base = baseUrl.replace(/\/$/, "");
  return `${base}${favicon.startsWith("/") ? favicon : `/${favicon}`}`;
}

export async function fetchFaviconResponse(): Promise<Response> {
  let config;
  try {
    config = await getSiteConfig();
  } catch {
    config = getDefaultSiteConfig();
  }

  const faviconUrl = resolveFaviconUrl(config.seo.favicon, config.portfolioUrl);
  const fallbackUrl = resolveFaviconUrl("/logo.svg", config.portfolioUrl);

  for (const url of [faviconUrl, fallbackUrl]) {
    try {
      const res = await fetch(url, { next: { revalidate: 60 } });
      if (!res.ok) continue;

      const buffer = await res.arrayBuffer();
      const contentType = res.headers.get("content-type") ?? getFaviconType(url);

      return new Response(buffer, {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
        },
      });
    } catch {
      continue;
    }
  }

  return new Response(null, { status: 404 });
}
