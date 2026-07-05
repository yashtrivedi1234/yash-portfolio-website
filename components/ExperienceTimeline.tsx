import type { ExperienceItem } from "@/data/experience";

interface ExperienceTimelineProps {
  items: ExperienceItem[];
  title?: string;
}

const typeColors: Record<string, string> = {
  work: "bg-violet-500 shadow-violet-500/50",
  freelance: "bg-indigo-500 shadow-indigo-500/50",
  internship: "bg-blue-500 shadow-blue-500/50",
  education: "bg-emerald-500 shadow-emerald-500/50",
  certification: "bg-amber-500 shadow-amber-500/50",
  achievement: "bg-pink-500 shadow-pink-500/50",
};

export function ExperienceTimeline({ items, title }: ExperienceTimelineProps) {
  if (items.length === 0) return null;

  return (
    <div className="mb-16">
      {title && (
        <h3 className="mb-8 text-2xl font-bold text-white">{title}</h3>
      )}
      <div className="relative space-y-8 before:absolute before:top-2 before:left-[7px] before:h-[calc(100%-16px)] before:w-1 before:rounded-full before:bg-gradient-to-b before:from-violet-500 before:via-violet-500/40 before:to-transparent md:before:left-[11px]">
        {items.map((item, index) => (
          <article key={index} className="group relative pl-8 md:pl-12">
            <div
              className={`absolute top-2 left-0 h-4 w-4 rounded-full border-4 border-slate-950 shadow-lg ${typeColors[item.type] ?? "bg-slate-500"}`}
            />
            <div className="glass-card rounded-2xl p-4 transition-all duration-300 group-hover:border-violet-500/30 group-hover:shadow-lg group-hover:shadow-violet-500/5 sm:p-6">
              <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h4 className="text-lg font-semibold text-white transition-colors group-hover:text-violet-300">
                    {item.title}
                  </h4>
                  <p className="text-violet-400">{item.organization}</p>
                </div>
                <span className="shrink-0 rounded-full border border-slate-700 bg-slate-800/80 px-3 py-1 text-sm text-slate-400">
                  {item.period}
                </span>
              </div>
              {item.location && (
                <p className="mb-3 text-sm text-slate-500">{item.location}</p>
              )}
              <p className="leading-relaxed text-slate-400">{item.description}</p>
              {item.technologies && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-slate-700/50 bg-slate-800/60 px-2.5 py-1 text-xs font-medium text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
