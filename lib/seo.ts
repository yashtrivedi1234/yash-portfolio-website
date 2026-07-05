import type { Metadata } from "next";
import { getDefaultSiteConfig, type SiteConfig } from "@/lib/site-config";

const staticDefaults = getDefaultSiteConfig();

export function getBaseUrl(config?: SiteConfig): string {
  return config?.portfolioUrl ?? staticDefaults.portfolioUrl;
}

function resolveAssetUrl(baseUrl: string, assetPath: string): string {
  if (assetPath.startsWith("http://") || assetPath.startsWith("https://")) {
    return assetPath;
  }
  return `${baseUrl}${assetPath.startsWith("/") ? assetPath : `/${assetPath}`}`;
}

interface PageSEOOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: "website" | "article";
  noIndex?: boolean;
  config?: SiteConfig;
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  ogImage,
  ogType = "website",
  noIndex = false,
  config,
}: PageSEOOptions): Metadata {
  const c = config ?? staticDefaults;
  const baseUrl = getBaseUrl(c);
  const url = `${baseUrl}${path}`;
  const image = ogImage ?? c.seo.ogImage;
  const allKeywords = keywords ?? c.seo.keywords;

  return {
    title,
    description,
    keywords: [...allKeywords],
    authors: [{ name: c.seo.author }],
    creator: c.seo.author,
    publisher: c.seo.publisher,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      title,
      description,
      url,
      siteName: c.name,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      locale: "en_US",
      type: ogType,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    other: {
      "application-name": c.name,
      "apple-mobile-web-app-title": c.name,
    },
  };
}

export function createPersonSchema(config?: SiteConfig) {
  const c = config ?? staticDefaults;
  const url = getBaseUrl(c);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: c.name,
    jobTitle: c.role,
    url,
    image: resolveAssetUrl(url, c.hero?.profileImage ?? "/images/profile.png"),
    email: c.email,
    sameAs: [c.github, c.linkedin, c.leetcode].filter(Boolean),
    knowsAbout: c.seo.keywords.slice(0, 8),
  };
}

export function createWebsiteSchema(config?: SiteConfig) {
  const c = config ?? staticDefaults;
  const url = getBaseUrl(c);
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${c.name} Portfolio`,
    url,
    description: c.seo.description,
    author: { "@type": "Person", name: c.name },
  };
}

export function createBreadcrumbSchema(
  items: { name: string; url: string }[],
  config?: SiteConfig
) {
  const baseUrl = getBaseUrl(config);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
}

export function createFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function createProjectSchema(
  project: {
    title: string;
    description: string;
    slug: string;
    image: string;
    year: string;
    techStack: string[];
    liveUrl: string;
  },
  config?: SiteConfig
) {
  const c = config ?? staticDefaults;
  const baseUrl = getBaseUrl(c);
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: `${baseUrl}/projects/${project.slug}`,
    image: resolveAssetUrl(baseUrl, project.image),
    dateCreated: project.year,
    creator: {
      "@type": "Person",
      name: c.name,
    },
    keywords: project.techStack.join(", "),
    isAccessibleForFree: true,
    license: project.liveUrl,
  };
}
