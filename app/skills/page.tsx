import { SkillCard } from "@/components/SkillCard";
import { SectionHeading } from "@/components/SectionHeading";
import { CTA } from "@/components/CTA";
import { JsonLd } from "@/components/JsonLd";
import { skillCategories, techStackStrip } from "@/data/skills";
import { siteConfig } from "@/data/site";
import { createPageMetadata, createBreadcrumbSchema } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: `Skills | ${siteConfig.name}`,
  description: `Technical skills and expertise of ${siteConfig.name}. Proficient in Next.js, React, TypeScript, Node.js, and modern web development technologies.`,
  path: "/skills",
});

export default function SkillsPage() {
  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Skills", url: "/skills" },
        ])}
      />

      <div className="pt-24 pb-20 sm:pt-32 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Expertise"
            title="Skills & Technologies"
            description="A comprehensive overview of my technical skills across frontend, backend, databases, tools, and other areas of web development."
          />

          <div className="mb-16 flex flex-wrap justify-center gap-3">
            {techStackStrip.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-violet-500/30 bg-violet-500/10 px-5 py-2 text-sm font-medium text-violet-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {skillCategories.map((category) => (
              <SkillCard key={category.category} category={category} />
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <CTA
          title="Need a Skilled Developer?"
          description="Let's discuss how my technical expertise can help bring your project to life."
        />
      </div>
    </>
  );
}
