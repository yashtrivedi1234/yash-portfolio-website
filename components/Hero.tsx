import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { SocialIcon } from "@/components/SocialIcon";
import type { SiteConfig } from "@/lib/site-config";

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  const isEmail = href.startsWith("mailto:");
  return (
    <a
      href={href}
      {...(isEmail ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      className="rounded-xl border border-transparent bg-slate-800/50 p-3 text-slate-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-500/30 hover:bg-violet-500/15 hover:text-violet-400 hover:shadow-lg hover:shadow-violet-500/10"
      aria-label={label}
    >
      {children}
    </a>
  );
}

interface HeroProps {
  config: Pick<
    SiteConfig,
    "name" | "role" | "shortBio" | "resumeLink" | "socialLinks" | "hero" | "buttons" | "heroCode"
  >;
}

export function Hero({ config }: HeroProps) {
  const { hero } = config;

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-center overflow-hidden pt-24 pb-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-[28rem] w-[28rem] rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-[28rem] w-[28rem] rounded-full bg-indigo-600/15 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 lg:order-1">
            <div
              className="animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-400"
              style={{ animationDelay: "0.05s" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              {hero.badgeText}
            </div>

            <h1
              className="animate-fade-in-up text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.1]"
              style={{ animationDelay: "0.15s" }}
            >
              {hero.greetingPrefix}{" "}
              <span className="text-gradient">{config.name}</span>
              {hero.roleConnector}
              <span className="text-slate-300">{config.role}</span>{" "}
              <span className="text-slate-400">{hero.headlineSuffix}</span>
            </h1>

            <p
              className="animate-fade-in-up mt-6 max-w-xl text-lg leading-relaxed text-slate-400 sm:text-xl"
              style={{ animationDelay: "0.25s" }}
            >
              {config.shortBio} {hero.extraBio}
            </p>

            <div
              className="animate-fade-in-up mt-8 flex flex-wrap gap-3 sm:gap-4"
              style={{ animationDelay: "0.35s" }}
            >
              <Button href="/projects" size="lg">
                {config.buttons.viewMyWork}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                {config.buttons.contactMe}
              </Button>
              <Button href={config.resumeLink} variant="secondary" size="lg" external>
                {config.buttons.downloadResume}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </Button>
            </div>

            <div
              className="animate-fade-in-up mt-10 flex items-center gap-3"
              style={{ animationDelay: "0.45s" }}
            >
              {config.socialLinks.map((social) => (
                <SocialLink key={social.name} href={social.href} label={social.name}>
                  <SocialIcon icon={social.icon} />
                </SocialLink>
              ))}
            </div>
          </div>

          <div className="order-1 animate-fade-in-up lg:order-2" style={{ animationDelay: "0.2s" }}>
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-violet-600/25 to-indigo-600/25 blur-2xl" />
              <div className="glass-card relative overflow-hidden rounded-2xl shadow-2xl shadow-violet-500/5">
                <div className="flex items-center gap-2 border-b border-slate-700/50 bg-slate-800/60 px-4 py-3">
                  <div className="h-3 w-3 rounded-full bg-red-500/90" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/90" />
                  <div className="h-3 w-3 rounded-full bg-green-500/90" />
                  <span className="ml-2 font-mono text-xs text-slate-500">{hero.codeWindowTitle}</span>
                </div>
                <div className="animate-shimmer p-6 font-mono text-sm leading-relaxed">
                  <p><span className="text-violet-400">const</span> <span className="text-indigo-300">{config.heroCode.variableName}</span> = {"{"}</p>
                  <p className="pl-4"><span className="text-slate-400">name:</span> <span className="text-green-400">&quot;{config.name}&quot;</span>,</p>
                  <p className="pl-4"><span className="text-slate-400">role:</span> <span className="text-green-400">&quot;{config.role}&quot;</span>,</p>
                  <p className="pl-4"><span className="text-slate-400">skills:</span> <span className="text-green-400">[{hero.codeSkills.map((s) => `"${s}"`).join(", ")}]</span>,</p>
                  <p className="pl-4"><span className="text-slate-400">available:</span> <span className="text-green-400">{config.heroCode.availableValue}</span></p>
                  <p>{"}"};</p>
                </div>
              </div>
              <div className="animate-float absolute -right-3 -bottom-3 overflow-hidden rounded-2xl border-4 border-slate-900 shadow-2xl shadow-violet-500/20 sm:-right-4 sm:-bottom-4">
                <Image
                  src={hero.profileImage}
                  alt={`${config.name} - ${config.role}`}
                  width={128}
                  height={128}
                  className="h-24 w-24 object-cover sm:h-28 sm:w-28"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Link
        href="#about-section"
        className="animate-bounce-subtle absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-slate-500 transition-colors hover:text-violet-400"
        aria-label="Scroll to explore"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Explore</span>
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </Link>
    </section>
  );
}
