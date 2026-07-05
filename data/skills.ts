export interface Skill {
  name: string;
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    description: "Core programming languages for full-stack and backend development.",
    skills: [
      { name: "JavaScript (ES6+)" },
      { name: "TypeScript" },
      { name: "Python" },
      { name: "SQL" },
    ],
  },
  {
    category: "Frontend",
    description: "Building responsive, interactive UIs with modern React ecosystems.",
    skills: [
      { name: "React.js" },
      { name: "Next.js" },
      { name: "Redux Toolkit" },
      { name: "Zustand" },
      { name: "Tailwind CSS" },
      { name: "Framer Motion" },
      { name: "HTML5 & CSS3" },
      { name: "Vite" },
      { name: "Figma" },
    ],
  },
  {
    category: "Backend & APIs",
    description: "Server-side logic, REST APIs, real-time systems, and secure authentication.",
    skills: [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "FastAPI" },
      { name: "REST APIs" },
      { name: "WebSockets (Socket.io)" },
      { name: "WebRTC" },
      { name: "JWT / RBAC" },
      { name: "OAuth 2.0" },
    ],
  },
  {
    category: "Databases & ORMs",
    description: "Relational and NoSQL databases with modern ORM tooling.",
    skills: [
      { name: "MongoDB (Mongoose)" },
      { name: "PostgreSQL (Prisma)" },
      { name: "MySQL" },
      { name: "Redis" },
    ],
  },
  {
    category: "Cloud, DevOps & AI",
    description: "Deployment, infrastructure, and AI-powered application development.",
    skills: [
      { name: "Cloudflare (CDN/WAF)" },
      { name: "Vercel" },
      { name: "Render" },
      { name: "CI/CD" },
      { name: "LangChain" },
      { name: "Groq LLM" },
      { name: "Gemini API" },
      { name: "Git & GitHub" },
    ],
  },
  {
    category: "Core Concepts",
    description: "Foundational computer science and software engineering principles.",
    skills: [
      { name: "Data Structures & Algorithms" },
      { name: "System Design" },
      { name: "OOP & Design Patterns" },
      { name: "Performance Optimization" },
      { name: "Agile / Scrum" },
    ],
  },
];

export interface TechStackMarqueeItem {
  name: string;
  logo?: string;
}

export const techStackStrip: TechStackMarqueeItem[] = [
  { name: "Next.js" },
  { name: "React" },
  { name: "TypeScript" },
  { name: "Node.js" },
  { name: "MongoDB" },
  { name: "PostgreSQL" },
  { name: "Tailwind CSS" },
  { name: "LangChain" },
  { name: "Cloudflare" },
  { name: "Prisma" },
];
