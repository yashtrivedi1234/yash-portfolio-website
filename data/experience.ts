export interface ExperienceItem {
  title: string;
  organization: string;
  location?: string;
  period: string;
  description: string;
  type: "work" | "freelance" | "internship" | "education" | "certification" | "achievement";
  technologies?: string[];
}

export const experienceItems: ExperienceItem[] = [
  {
    title: "MERN Stack Developer & Trainer",
    organization: "CodingClave Development LLP",
    location: "Lucknow, India",
    period: "May 2026 – Present",
    description:
      "Architecting production web platforms with Next.js (App Router), TypeScript, PostgreSQL, and Prisma ORM via SSR/ISR and server actions. Engineering edge infrastructure with Cloudflare CDN, DNS, WAF, and SSL/TLS for DDoS protection and 99.9%+ uptime. Mentoring B.Tech, BCA, and MCA students in MERN stack and DSA — curriculum design, capstone reviews, and best-practice code reviews.",
    type: "work",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Cloudflare"],
  },
  {
    title: "MERN Stack Developer",
    organization: "Code Crafter Web Solutions Pvt. Ltd.",
    location: "Lucknow, India",
    period: "Nov 2025 – Apr 2026",
    description:
      "Owned end-to-end delivery of 14+ client websites and 1 CRM in the MERN stack — schema design to production UI. Designed an AI customer support chatbot with Groq LLM and LangChain for real-time, context-aware retrieval responses. Optimized page load ~30% via asset compression, code-splitting, and lazy loading; secured admin routes with JWT and RBAC.",
    type: "work",
    technologies: ["React", "Node.js", "MongoDB", "Groq LLM", "LangChain", "JWT"],
  },
  {
    title: "MERN Stack Developer",
    organization: "DigiCoders Technologies Pvt. Ltd.",
    location: "Lucknow, India",
    period: "Sep 2025 – Nov 2025",
    description:
      "Architected 3 MERN applications — MongoDB schemas, Express APIs, and React UI — secured with JWT auth and bcrypt hashing. Cut UI build time ~25% via a reusable Tailwind CSS component library and modular, scalable component architecture. Integrated REST APIs with React using loading states, error boundaries, and optimistic updates.",
    type: "work",
    technologies: ["React", "Express.js", "MongoDB", "Tailwind CSS", "JWT"],
  },
  {
    title: "Web Developer & Designer Intern",
    organization: "ERA Foundation India",
    location: "Lucknow, India",
    period: "Aug 2025",
    description:
      "Led a 6-member engineering team to ship 4 full-stack prototypes — drove Figma design, MERN delivery, and milestones. Owned \"Lucknow Craftsmen\" end-to-end — DB modelling, Express APIs, and React UI — solving 3 client briefs.",
    type: "internship",
    technologies: ["React", "Node.js", "MongoDB", "Figma", "Express.js"],
  },
  {
    title: "Backend Developer Intern",
    organization: "Xenovate Tech Solutions",
    location: "Remote",
    period: "Jun 2025 – Aug 2025",
    description:
      "Built a FastAPI scraper processing 1,000+ posts/day from 150+ sites at 92% accuracy via Groq LLM + LangChain. Architected end-to-end pipeline (scraper → LLM → React UI) with filtering, pagination, and real-time updates at scale.",
    type: "internship",
    technologies: ["FastAPI", "Python", "Groq LLM", "LangChain", "React"],
  },
  {
    title: "MERN Stack Developer Intern",
    organization: "Unified Mentor Pvt. Ltd.",
    location: "Remote",
    period: "May 2025 – Aug 2025",
    description:
      "Engineered WebRTC + Socket.io video chat — Node signaling and React UI — with sub-50ms latency for 120+ concurrent users. Processed 500+ transactions via Gemini API; fortified auth with JWT + bcrypt; deployed on Render at 99.9% uptime via CI/CD.",
    type: "internship",
    technologies: ["WebRTC", "Socket.io", "Node.js", "React", "Gemini API"],
  },
  {
    title: "B.Tech — Computer Science & Engineering",
    organization: "G.C.R.G Group of Institutions",
    location: "Lucknow, India",
    period: "2023 – 2027",
    description:
      "Pursuing Bachelor of Technology in Computer Science & Engineering with focus on full-stack development, data structures, system design, and software engineering.",
    type: "education",
  },
  {
    title: "Full Stack Web Dev with AI",
    organization: "HCL GUVI",
    period: "2025",
    description: "Comprehensive certification covering full-stack web development with AI integration.",
    type: "certification",
  },
  {
    title: "AI Workshop",
    organization: "Cool Teacher",
    period: "2025",
    description: "Hands-on workshop covering AI fundamentals and practical application development.",
    type: "certification",
  },
  {
    title: "REST APIs with Node.js & Express",
    organization: "LetsUpgrade",
    period: "2025",
    description: "Certification in building RESTful APIs with Node.js and Express.js.",
    type: "certification",
  },
  {
    title: "DevOps Workshop",
    organization: "Physics Wallah",
    period: "2025",
    description: "Workshop covering CI/CD pipelines, deployment strategies, and DevOps fundamentals.",
    type: "certification",
  },
  {
    title: "SEO Fundamentals",
    organization: "WsCube Tech",
    period: "2025",
    description: "Certification in search engine optimization fundamentals and on-page SEO techniques.",
    type: "certification",
  },
  {
    title: "Google Student Ambassador",
    organization: "Communique",
    period: "2025",
    description: "Selected as Google Student Ambassador representing tech community initiatives on campus.",
    type: "achievement",
  },
  {
    title: "AI Pipeline Architecture",
    organization: "Production Systems",
    period: "2025",
    description:
      "Architected AI pipelines via Groq LLM + LangChain processing 1,000+ items/day at 92% accuracy with sub-50ms latency and 99.9% uptime in production.",
    type: "achievement",
    technologies: ["Groq LLM", "LangChain", "FastAPI", "React"],
  },
];

export const experienceSections = [
  { key: "work" as const, label: "Work Experience" },
  { key: "internship" as const, label: "Internships" },
  { key: "education" as const, label: "Education" },
  { key: "certification" as const, label: "Certifications" },
  { key: "achievement" as const, label: "Achievements" },
];
