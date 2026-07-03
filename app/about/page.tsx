import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { CTA } from "@/components/CTA";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/data/site";
import { skillCategories } from "@/data/skills";
import { createPageMetadata, createBreadcrumbSchema } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: `About ${siteConfig.name} | Web Developer`,
  description: `Learn about ${siteConfig.name}, a professional ${siteConfig.role} specializing in Next.js, React, and modern web development. Discover my background, approach, and career goals.`,
  path: "/about",
});

const aboutSections = [
  {
    title: "Who I Am",
    content: `I'm ${siteConfig.name}, a dedicated ${siteConfig.role} based in ${siteConfig.location}. With over 5 years of experience in web development, I've helped dozens of businesses and startups establish a strong online presence through modern, performant web applications.`,
  },
  {
    title: "What I Do",
    content:
      "I design and develop custom websites, web applications, and digital products using cutting-edge technologies. From landing pages to complex SaaS platforms, I deliver solutions that are fast, accessible, and optimized for search engines.",
  },
  {
    title: "My Development Approach",
    content:
      "I believe in clean code, user-centered design, and iterative development. Every project starts with understanding your goals, followed by careful planning, regular communication, and thorough testing before deployment.",
  },
  {
    title: "Tools I Use",
    content:
      "My primary toolkit includes Next.js, React, TypeScript, Node.js, and Tailwind CSS. For deployment, I use Vercel and Netlify. I also work with Figma for design collaboration, Git for version control, and various SEO and performance tools.",
  },
  {
    title: "Why Work With Me",
    content:
      "I combine technical expertise with a strong focus on business outcomes. Clients choose me for my reliability, clear communication, attention to detail, and commitment to delivering projects on time and within budget.",
  },
  {
    title: "Personal Journey",
    content:
      "My journey into web development started during university when I built my first website for a campus club. That experience sparked a passion for creating digital experiences that solve real problems. Since then, I've continuously evolved my skills to stay at the forefront of web technology.",
  },
  {
    title: "Professional Goals",
    content:
      "I'm focused on mastering full-stack development, contributing to open-source projects, and helping businesses leverage modern web technologies. My goal is to become a go-to developer for companies seeking high-quality, scalable web solutions.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
        ])}
      />

      <div className="pt-24 pb-20 sm:pt-32 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="About"
            title={`About ${siteConfig.name}`}
            description={siteConfig.longBio}
          />

          <div className="mx-auto max-w-3xl space-y-12">
            {aboutSections.map((section) => (
              <article key={section.title}>
                <h2 className="mb-4 text-2xl font-bold text-white">{section.title}</h2>
                <p className="text-lg leading-relaxed text-slate-400">{section.content}</p>
              </article>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-4">
            <Link
              href="/projects"
              className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-sm font-medium text-white transition-all hover:from-violet-500 hover:to-indigo-500"
            >
              View My Projects
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-slate-600 px-6 py-3 text-sm font-medium text-slate-200 transition-all hover:border-violet-500 hover:text-violet-400"
            >
              Get In Touch
            </Link>
          </div>

          <div className="mt-20">
            <h2 className="mb-8 text-center text-2xl font-bold text-white">Skills Overview</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {skillCategories.flatMap((cat) =>
                cat.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="rounded-full border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm text-slate-300"
                  >
                    {skill.name}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <CTA />
      </div>
    </>
  );
}
