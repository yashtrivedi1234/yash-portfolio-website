"use client";

import { TechIcon } from "@/lib/tech-icons";

interface TechMarqueeProps {
  items: string[];
  ariaLabel: string;
}

export function TechMarquee({ items, ariaLabel }: TechMarqueeProps) {
  const track = [...items, ...items];

  return (
    <section
      className="border-y border-slate-800/80 bg-slate-900/40 py-8 backdrop-blur-sm"
      aria-label={ariaLabel}
    >
      <div className="marquee-track overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-10 px-4">
          {track.map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="group flex items-center gap-3 whitespace-nowrap text-slate-400 transition-colors hover:text-violet-300"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700/80 bg-slate-800/60 text-violet-400 transition-all duration-300 group-hover:scale-110 group-hover:border-violet-500/40 group-hover:bg-violet-500/10">
                <TechIcon name={tech} className="h-5 w-5" />
              </span>
              <span className="text-base font-medium sm:text-lg">{tech}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
