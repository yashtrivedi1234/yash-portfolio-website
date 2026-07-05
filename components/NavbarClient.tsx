"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { SiteConfig } from "@/lib/site-config";

interface NavbarClientProps {
  config: Pick<SiteConfig, "name" | "navLinks" | "navbar">;
}

function isLinkActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavbarClient({ config }: NavbarClientProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

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
      isLinkActive(pathname, href)
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
            className="group text-xl font-bold tracking-tight text-white transition-colors hover:text-violet-400"
          >
            {config.name.split(" ")[0]}
            <span className="text-violet-400 transition-transform group-hover:animate-pulse">.</span>
          </Link>

          <ul className="hidden items-center gap-0.5 md:flex">
            {config.navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass(link.href)}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <Link
              href={config.navbar.hireMeHref}
              className="inline-flex items-center rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-violet-500 hover:to-indigo-500 hover:shadow-violet-500/30 active:translate-y-0"
            >
              {config.navbar.hireMeLabel}
            </Link>
          </div>

          <button
            type="button"
            className="relative z-50 rounded-lg p-2 text-slate-300 transition-colors hover:bg-slate-800 md:hidden"
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

      {/* Mobile menu overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <div
        className={cn(
          "fixed top-[57px] right-0 left-0 z-40 border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl transition-all duration-300 md:hidden",
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
              className="block rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3.5 text-center text-base font-medium text-white shadow-lg shadow-violet-500/20"
              onClick={() => setIsOpen(false)}
            >
              {config.navbar.hireMeLabel}
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
