import type { Skill, SkillCategory } from "@/data/skills";

interface SkillCardProps {
  category: SkillCategory;
}

export function SkillCard({ category }: SkillCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm transition-all hover:border-violet-500/30">
      <h3 className="mb-2 text-xl font-semibold text-white">{category.category}</h3>
      <p className="mb-6 text-sm text-slate-400">{category.description}</p>
      <div className="space-y-4">
        {category.skills.map((skill: Skill) => (
          <div key={skill.name}>
            <div className="mb-1.5 flex justify-between text-sm">
              <span className="font-medium text-slate-300">{skill.name}</span>
              <span className="text-slate-500">{skill.level}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 transition-all duration-1000"
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
