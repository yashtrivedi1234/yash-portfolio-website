import { Button } from "@/components/Button";
import type { SiteConfig } from "@/lib/site-config";

interface CTAProps {
  config: SiteConfig["cta"] & { availability?: string };
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function CTA({
  config,
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CTAProps) {
  const resolvedTitle = title ?? config.title;
  const resolvedDescription =
    description ?? `${config.description} ${config.availability ? config.availability : ""}`.trim();
  const resolvedPrimaryLabel = primaryLabel ?? config.primaryLabel;
  const resolvedPrimaryHref = primaryHref ?? config.primaryHref;
  const resolvedSecondaryLabel = secondaryLabel ?? config.secondaryLabel;
  const resolvedSecondaryHref = secondaryHref ?? config.secondaryHref;

  return (
    <section className="relative overflow-hidden rounded-3xl border border-violet-500/25 bg-gradient-to-br from-violet-600/15 via-slate-900/90 to-indigo-600/15 p-8 shadow-2xl shadow-violet-500/10 sm:p-14">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-600/15 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.08),transparent_70%)]" />
      </div>
      <div className="relative text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{resolvedTitle}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-400">{resolvedDescription}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href={resolvedPrimaryHref} size="lg">
            {resolvedPrimaryLabel}
          </Button>
          <Button href={resolvedSecondaryHref} variant="outline" size="lg">
            {resolvedSecondaryLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
