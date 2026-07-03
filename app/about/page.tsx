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
    content: `I'm ${siteConfig.name}, a ${siteConfig.role} based in ${siteConfig.location}. I've shipped 15+ production web platforms and 1 CRM across MERN and Next.js stacks — from MongoDB schema design to Cloudflare-protected deployment.`,
  },
  {
    title: "What I Do",
    content:
      "I build full-stack web applications, AI-powered pipelines, and real-time platforms. My work spans e-commerce systems, video calling apps, CRM platforms, and LLM-integrated chatbots — always with a focus on performance, security, and production-grade UX.",
  },
  {
    title: "Key Highlights",
    content:
      "Delivered 15+ production platforms in React.js, Next.js, Node.js, and MongoDB. Led a 6-member engineering team at ERA Foundation. Architected AI pipelines via Groq LLM + LangChain processing 1,000+ items/day at 92% accuracy with sub-50ms latency and 99.9% uptime.",
  },
  {
    title: "My Development Approach",
    content:
      "I follow RESTful architecture, JWT/RBAC security patterns, and scalable component design. Every project moves from schema design through API development to optimized frontend delivery — with SSR/ISR where it matters, edge infrastructure via Cloudflare, and CI/CD for reliable deployments.",
  },
  {
    title: "Tools I Use",
    content:
      "My stack includes Next.js (App Router, Server Actions), React.js, TypeScript, Node.js, Express.js, FastAPI, PostgreSQL with Prisma, MongoDB with Mongoose, Tailwind CSS, and AI tooling like LangChain, Groq LLM, and Gemini API. I deploy on Vercel, Render, and Cloudflare.",
  },
  {
    title: "Mentoring & Leadership",
    content:
      "At CodingClave Development LLP, I mentor B.Tech, BCA, and MCA students in MERN stack and DSA — designing curriculum, reviewing capstone projects, and conducting best-practice code reviews. I previously led a 6-member team at ERA Foundation to ship 4 full-stack prototypes.",
  },
  {
    title: "Professional Goals",
    content:
      "I'm focused on building scalable full-stack systems, deepening AI integration expertise, and contributing to high-impact engineering teams. Currently pursuing B.Tech in Computer Science & Engineering at G.C.R.G Group of Institutions, Lucknow (2023–2027).",
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
