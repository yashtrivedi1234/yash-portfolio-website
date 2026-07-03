import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

const baseUrl = siteConfig.portfolioUrl;

export function getBaseUrl(): string {
  return baseUrl;
}

interface PageSEOOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: "website" | "article";
  noIndex?: boolean;
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  ogImage,
  ogType = "website",
  noIndex = false,
}: PageSEOOptions): Metadata {
  const url = `${baseUrl}${path}`;
  const image = ogImage ?? siteConfig.seo.ogImage;
  const allKeywords = keywords ?? siteConfig.seo.keywords;

  return {
    title,
    description,
    keywords: [...allKeywords],
    authors: [{ name: siteConfig.seo.author }],
    creator: siteConfig.seo.author,
    publisher: siteConfig.seo.publisher,
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
      siteName: siteConfig.name,
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
      "application-name": siteConfig.name,
      "apple-mobile-web-app-title": siteConfig.name,
    },
  };
}

export function createPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    url: baseUrl,
    image: `${baseUrl}/profile.svg`,
    email: siteConfig.email,
    sameAs: [
      siteConfig.github,
      siteConfig.linkedin,
      siteConfig.leetcode,
    ],
    knowsAbout: [
      "Full Stack Development",
      "MERN Stack",
      "Next.js",
      "React",
      "TypeScript",
      "AI Integration",
      "System Design",
    ],
  };
}

export function createWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${siteConfig.name} Portfolio`,
    url: baseUrl,
    description: siteConfig.seo.description,
    author: {
      "@type": "Person",
      name: siteConfig.name,
    },
  };
}

export function createBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
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

export function createProjectSchema(project: {
  title: string;
  description: string;
  slug: string;
  image: string;
  year: string;
  techStack: string[];
  liveUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: `${baseUrl}/projects/${project.slug}`,
    image: `${baseUrl}${project.image}`,
    dateCreated: project.year,
    creator: {
      "@type": "Person",
      name: siteConfig.name,
    },
    keywords: project.techStack.join(", "),
    isAccessibleForFree: true,
    license: project.liveUrl,
  };
}
