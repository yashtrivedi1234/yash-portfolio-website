import type { ExperienceItem } from "@/data/experience";

interface ExperienceTimelineProps {
  items: ExperienceItem[];
  title?: string;
}

const typeColors: Record<string, string> = {
  work: "bg-violet-500",
  freelance: "bg-indigo-500",
  internship: "bg-blue-500",
  education: "bg-emerald-500",
  certification: "bg-amber-500",
  achievement: "bg-pink-500",
};

export function ExperienceTimeline({ items, title }: ExperienceTimelineProps) {
  if (items.length === 0) return null;

  return (
    <div className="mb-16">
      {title && (
        <h3 className="mb-8 text-2xl font-bold text-white">{title}</h3>
      )}
      <div className="relative space-y-8 before:absolute before:top-2 before:left-[7px] before:h-[calc(100%-16px)] before:w-0.5 before:bg-slate-800 md:before:left-[11px]">
        {items.map((item, index) => (
          <article key={index} className="relative pl-8 md:pl-12">
            <div
              className={`absolute top-2 left-0 h-4 w-4 rounded-full border-4 border-slate-950 ${typeColors[item.type]}`}
            />
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm transition-all hover:border-violet-500/30">
              <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                  <p className="text-violet-400">{item.organization}</p>
                </div>
                <span className="shrink-0 rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-400">
                  {item.period}
                </span>
              </div>
              {item.location && (
                <p className="mb-3 text-sm text-slate-500">{item.location}</p>
              )}
              <p className="text-slate-400">{item.description}</p>
              {item.technologies && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-slate-300"
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
