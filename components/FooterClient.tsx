"use client";

import Link from "next/link";
import { SocialIcon } from "@/components/SocialIcon";
import type { SiteConfig } from "@/lib/site-config";

interface FooterClientProps {
  config: Pick<SiteConfig, "name" | "shortBio" | "socialLinks" | "navLinks" | "footer" | "legal">;
}

export function FooterClient({ config }: FooterClientProps) {
  const year = new Date().getFullYear();

  const legalLinks = [
    { name: config.legal.privacyPolicy.title, href: "/privacy-policy" },
    { name: config.legal.termsAndConditions.title, href: "/terms-and-conditions" },
  ];

  return (
    <footer className="relative border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="group inline-block text-2xl font-bold text-white">
              {config.name.split(" ")[0]}
              <span className="text-violet-400 transition-transform group-hover:animate-pulse">.</span>
            </Link>
            <p className="mt-4 max-w-md leading-relaxed text-slate-400">{config.shortBio}</p>
            <div className="mt-6 flex gap-3">
              {config.socialLinks.map((social) => {
                const isEmail = social.href.startsWith("mailto:");
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    {...(isEmail ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                    className="rounded-xl border border-transparent bg-slate-800/50 p-3 text-slate-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-500/30 hover:bg-violet-500/15 hover:text-violet-400"
                    aria-label={social.name}
                  >
                    <SocialIcon icon={social.icon} />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {config.footer.pagesHeading}
            </h3>
            <ul className="space-y-2.5">
              {config.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block text-slate-400 transition-all duration-200 hover:translate-x-1 hover:text-violet-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {config.footer.legalHeading}
            </h3>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block text-slate-400 transition-all duration-200 hover:translate-x-1 hover:text-violet-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800/80 pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">
            &copy; {year} {config.name}. {config.footer.copyrightSuffix}
          </p>
          <p className="text-sm text-slate-500">{config.footer.builtWith}</p>
        </div>
      </div>
    </footer>
  );
}
