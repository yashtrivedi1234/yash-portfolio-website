import { Button } from "@/components/Button";
import { siteConfig } from "@/data/site";

interface CTAProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function CTA({
  title = "Ready to Start Your Project?",
  description = `Let's work together to build something amazing. ${siteConfig.availability}`,
  primaryLabel = "Get In Touch",
  primaryHref = "/contact",
  secondaryLabel = "View My Work",
  secondaryHref = "/projects",
}: CTAProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-600/10 via-slate-900 to-indigo-600/10 p-8 sm:p-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-indigo-600/10 blur-3xl" />
      </div>
      <div className="relative text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">{description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href={primaryHref} size="lg">
            {primaryLabel}
          </Button>
          <Button href={secondaryHref} variant="outline" size="lg">
            {secondaryLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
