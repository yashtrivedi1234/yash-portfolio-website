import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Syne } from "next/font/google";
import { RootJsonLd } from "@/components/RootJsonLd";
import { Analytics } from "@/components/Analytics";
import { getSiteConfig } from "@/lib/data";
import { getDefaultSiteConfig } from "@/lib/site-config";
import { getFaviconType, resolveFaviconUrl } from "@/lib/favicon";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["700"],
});

export async function generateViewport(): Promise<Viewport> {
  try {
    const config = await getSiteConfig();
    return { themeColor: config.seo.themeColor, width: "device-width", initialScale: 1 };
  } catch {
    return { themeColor: getDefaultSiteConfig().seo.themeColor, width: "device-width", initialScale: 1 };
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  const faviconUrl = resolveFaviconUrl(config.seo.favicon, config.portfolioUrl);
  const faviconType = getFaviconType(faviconUrl);
  const appleIconUrl = resolveFaviconUrl(
    config.manifest.iconUrl || config.seo.favicon,
    config.portfolioUrl
  );

  return {
    title: { default: config.seo.title, template: `%s | ${config.name}` },
    description: config.seo.description,
    keywords: [...config.seo.keywords],
    authors: [{ name: config.seo.author }],
    creator: config.seo.author,
    publisher: config.seo.publisher,
    metadataBase: new URL(config.portfolioUrl),
    alternates: { canonical: config.portfolioUrl },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    verification: {
      google: "BwlnA0OBAVBwlNSpRNJ6yxOWNyW71RZ8U3oEWcV51Ms",
    },
    openGraph: {
      title: config.seo.title,
      description: config.seo.description,
      url: config.portfolioUrl,
      siteName: config.name,
      images: [{ url: config.seo.ogImage, width: 1200, height: 630, alt: config.seo.title }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: config.seo.title,
      description: config.seo.description,
      images: [config.seo.ogImage],
    },
    icons: {
      icon: [{ url: faviconUrl, type: faviconType }],
      apple: [{ url: appleIconUrl, type: getFaviconType(appleIconUrl) }],
      shortcut: faviconUrl,
    },
    other: {
      "application-name": config.name,
      "apple-mobile-web-app-title": config.name,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${syne.variable} scroll-smooth`}>
      <head>
        <RootJsonLd />
      </head>
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
