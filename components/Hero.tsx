import Image from "next/image";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/Button";

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-lg bg-slate-800/50 p-2.5 text-slate-400 transition-all hover:bg-violet-500/20 hover:text-violet-400"
      aria-label={label}
    >
      {children}
    </a>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-24 pb-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              Available for new projects
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                {siteConfig.name}
              </span>
              , a {siteConfig.role} building fast, modern, and scalable web applications.
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-slate-400 sm:text-xl">
              {siteConfig.shortBio} I specialize in Next.js, React, and TypeScript to deliver
              high-performance, SEO-friendly websites for businesses and startups.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/projects" size="lg">
                View My Work
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Contact Me
              </Button>
              <Button href={siteConfig.resumeLink} variant="secondary" size="lg" external>
                Download Resume
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-3">
              {siteConfig.socialLinks.map((social) => (
                <SocialLink key={social.name} href={social.href} label={social.name}>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    {social.icon === "github" && (
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    )}
                    {social.icon === "linkedin" && (
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    )}
                    {social.icon === "leetcode" && (
                      <path d="M16.102 17.93l-2.697 2.607.732.732 3.686-3.686a.512.512 0 00-.732-.732l-3.686 3.686.732.732 2.697-2.607a10.252 10.252 0 002.305-6.352C18.411 5.015 14.396 1 9.411 1S.411 5.015.411 10c0 2.396.835 4.597 2.228 6.337L.411 19.175l.732.732 2.228-2.228A10.22 10.22 0 009.411 19c4.985 0 9-4.015 9-9 0-2.396-.835-4.597-2.309-6.07zM9.411 17.5a7.5 7.5 0 110-15 7.5 7.5 0 010 15z" />
                    )}
                    {social.icon === "email" && (
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    )}
                  </svg>
                </SocialLink>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-violet-600/20 to-indigo-600/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
                <div className="flex items-center gap-2 border-b border-slate-700/50 bg-slate-800/50 px-4 py-3">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="ml-2 font-mono text-xs text-slate-500">developer.tsx</span>
                </div>
                <div className="p-6 font-mono text-sm leading-relaxed">
                  <p><span className="text-violet-400">const</span> <span className="text-indigo-300">developer</span> = {"{"}</p>
                  <p className="pl-4"><span className="text-slate-400">name:</span> <span className="text-green-400">&quot;{siteConfig.name}&quot;</span>,</p>
                  <p className="pl-4"><span className="text-slate-400">role:</span> <span className="text-green-400">&quot;{siteConfig.role}&quot;</span>,</p>
                  <p className="pl-4"><span className="text-slate-400">skills:</span> <span className="text-green-400">[&quot;MERN&quot;, &quot;Next.js&quot;, &quot;TypeScript&quot;, &quot;AI&quot;]</span>,</p>
                  <p className="pl-4"><span className="text-slate-400">available:</span> <span className="text-green-400">true</span></p>
                  <p>{"}"};</p>
                </div>
              </div>
              <div className="absolute -right-4 -bottom-4 overflow-hidden rounded-2xl border-4 border-slate-900 shadow-2xl">
                <Image
                  src="/profile.svg"
                  alt={`${siteConfig.name} - ${siteConfig.role}`}
                  width={120}
                  height={120}
                  className="h-28 w-28 object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
