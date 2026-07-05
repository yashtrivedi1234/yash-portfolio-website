import Link from "next/link";
import { Button } from "@/components/Button";
import { getSiteConfig } from "@/lib/data";

export default async function NotFound() {
  const config = await getSiteConfig();

  return (
    <div className="relative flex min-h-[80vh] flex-col items-center justify-center px-4 pt-24 text-center">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-64 w-64 rounded-full bg-violet-600/10 blur-3xl" />
      </div>

      <p className="relative text-8xl font-bold text-gradient sm:text-9xl">{config.notFound.errorCode}</p>
      <h1 className="relative mt-4 text-3xl font-bold text-white sm:text-4xl">{config.notFound.title}</h1>
      <p className="relative mt-4 max-w-md leading-relaxed text-slate-400">{config.notFound.description}</p>

      <div className="relative mt-10 flex flex-wrap justify-center gap-4">
        <Button href={config.notFound.primaryHref} size="lg">
          {config.notFound.primaryLabel}
        </Button>
        <Button href={config.notFound.secondaryHref} variant="outline" size="lg">
          {config.notFound.secondaryLabel}
        </Button>
      </div>

      <nav className="relative mt-14" aria-label="Helpful links">
        <p className="mb-4 text-sm text-slate-500">{config.notFound.helperText}</p>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          {config.navLinks.slice(1, 4).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg border border-slate-800 bg-slate-900/50 px-4 py-2 text-violet-400 transition-colors hover:border-violet-500/30 hover:bg-violet-500/10"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
