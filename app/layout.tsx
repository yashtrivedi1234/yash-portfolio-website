import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Syne } from "next/font/google";
import { RootJsonLd } from "@/components/RootJsonLd";
import { ToastProvider } from "@/components/ToastProvider";
import { getSiteConfig } from "@/lib/data";
import { getDefaultSiteConfig } from "@/lib/site-config";
import "./globals.css";

function getFaviconType(url: string): string {
  if (url.endsWith(".svg")) return "image/svg+xml";
  if (url.endsWith(".png")) return "image/png";
  if (url.endsWith(".webp")) return "image/webp";
  if (url.endsWith(".ico")) return "image/x-icon";
  return "image/png";
}

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
  weight: ["600", "700", "800"],
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
  const faviconType = getFaviconType(config.seo.favicon);

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
      icon: [{ url: config.seo.favicon, type: faviconType }],
      apple: config.manifest.iconUrl,
      shortcut: config.seo.favicon,
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
        <ToastProvider />
      </body>
    </html>
  );
}
