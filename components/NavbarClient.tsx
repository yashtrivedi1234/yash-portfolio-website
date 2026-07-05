"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { SiteConfig } from "@/lib/site-config";

interface NavbarClientProps {
  config: Pick<SiteConfig, "name" | "navLinks" | "navbar">;
}

const HOME_SECTION_MAP: Record<string, string> = {
  "about-section": "/about",
  "projects-section": "/projects",
  "services-section": "/services",
  "experience-section": "/experience",
  "testimonials-section": "/contact",
  "faq-section": "/contact",
};

function isLinkActive(pathname: string, href: string, activeSectionHref?: string | null) {
  if (pathname === "/" && activeSectionHref) {
    return href === activeSectionHref;
  }
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavbarClient({ config }: NavbarClientProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const isHome = pathname === "/";
  const [homeActiveHref, setHomeActiveHref] = useState<string | null>(null);
  const [prevIsHome, setPrevIsHome] = useState(isHome);

  if (isHome !== prevIsHome) {
    setPrevIsHome(isHome);
    setHomeActiveHref(null);
  }

  const activeSectionHref = isHome ? homeActiveHref : null;

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;

    const sectionIds = Object.keys(HOME_SECTION_MAP);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const id = visible[0].target.id;
          setHomeActiveHref(HOME_SECTION_MAP[id] ?? null);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const linkClass = (href: string, mobile = false) =>
    cn(
      "rounded-lg font-medium transition-all duration-200",
      mobile ? "block px-4 py-3 text-base" : "px-3 py-2 text-sm",
      isLinkActive(pathname, href, activeSectionHref)
        ? mobile
          ? "bg-violet-500/15 text-violet-300"
          : "bg-violet-500/15 text-violet-300 shadow-sm shadow-violet-500/10"
        : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
    );

  return (
    <>
      <header
        className={cn(
          "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
          scrolled || isOpen
            ? "border-b border-slate-800/60 bg-slate-950/85 shadow-lg shadow-black/10 backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="group font-display text-xl font-bold tracking-tight text-white transition-colors hover:text-violet-400"
          >
            {config.name.split(" ")[0]}
            <span className="text-violet-400 transition-transform group-hover:animate-pulse">.</span>
          </Link>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {config.navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass(link.href)}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Link
              href={config.navbar.hireMeHref}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:from-violet-500 hover:to-indigo-500 hover:shadow-violet-500/30 active:translate-y-0"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              {config.navbar.hireMeLabel}
            </Link>
          </div>

          <button
            type="button"
            className="relative z-50 rounded-lg p-2 text-slate-300 transition-colors hover:bg-slate-800 lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <div
        className={cn(
          "fixed top-14 right-0 left-0 z-40 max-h-[calc(100dvh-3.5rem)] overflow-y-auto border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl transition-all duration-300 lg:hidden",
          isOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        )}
      >
        <ul className="flex flex-col gap-1 px-4 py-4">
          {config.navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={linkClass(link.href, true)} onClick={() => setIsOpen(false)}>
                {link.name}
              </Link>
            </li>
          ))}
          <li className="pt-3">
            <Link
              href={config.navbar.hireMeHref}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3.5 text-center text-base font-medium text-white shadow-lg shadow-violet-500/20"
              onClick={() => setIsOpen(false)}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              {config.navbar.hireMeLabel}
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
