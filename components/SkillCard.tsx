import type { SkillCategory } from "@/data/skills";

interface SkillCardProps {
  category: SkillCategory;
}

export function SkillCard({ category }: SkillCardProps) {
  return (
    <div className="glass-card group rounded-2xl p-6 transition-all duration-300 hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5 sm:p-7">
      <h3 className="mb-2 text-xl font-semibold text-white transition-colors group-hover:text-violet-300">
        {category.category}
      </h3>
      <p className="mb-6 text-sm leading-relaxed text-slate-400">{category.description}</p>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span
            key={skill.name}
            className="rounded-full border border-slate-700/80 bg-slate-800/50 px-3.5 py-1.5 text-sm font-medium text-slate-300 transition-colors group-hover:border-violet-500/20 group-hover:text-slate-200"
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
}
