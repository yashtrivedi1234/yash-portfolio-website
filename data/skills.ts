export interface Skill {
  name: string;
  level: number;
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
      { name: "JavaScript (ES6+)", level: 92 },
      { name: "TypeScript", level: 90 },
      { name: "Python", level: 82 },
      { name: "SQL", level: 85 },
    ],
  },
  {
    category: "Frontend",
    description: "Building responsive, interactive UIs with modern React ecosystems.",
    skills: [
      { name: "React.js", level: 92 },
      { name: "Next.js", level: 90 },
      { name: "Redux Toolkit", level: 85 },
      { name: "Zustand", level: 82 },
      { name: "Tailwind CSS", level: 93 },
      { name: "Framer Motion", level: 80 },
      { name: "HTML5 & CSS3", level: 90 },
      { name: "Vite", level: 85 },
      { name: "Figma", level: 78 },
    ],
  },
  {
    category: "Backend & APIs",
    description: "Server-side logic, REST APIs, real-time systems, and secure authentication.",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Express.js", level: 88 },
      { name: "FastAPI", level: 82 },
      { name: "REST APIs", level: 90 },
      { name: "WebSockets (Socket.io)", level: 85 },
      { name: "WebRTC", level: 83 },
      { name: "JWT / RBAC", level: 88 },
      { name: "OAuth 2.0", level: 80 },
    ],
  },
  {
    category: "Databases & ORMs",
    description: "Relational and NoSQL databases with modern ORM tooling.",
    skills: [
      { name: "MongoDB (Mongoose)", level: 88 },
      { name: "PostgreSQL (Prisma)", level: 85 },
      { name: "MySQL", level: 80 },
      { name: "Redis", level: 75 },
    ],
  },
  {
    category: "Cloud, DevOps & AI",
    description: "Deployment, infrastructure, and AI-powered application development.",
    skills: [
      { name: "Cloudflare (CDN/WAF)", level: 85 },
      { name: "Vercel", level: 88 },
      { name: "Render", level: 82 },
      { name: "CI/CD", level: 83 },
      { name: "LangChain", level: 85 },
      { name: "Groq LLM", level: 87 },
      { name: "Gemini API", level: 80 },
      { name: "Git & GitHub", level: 90 },
    ],
  },
  {
    category: "Core Concepts",
    description: "Foundational computer science and software engineering principles.",
    skills: [
      { name: "Data Structures & Algorithms", level: 88 },
      { name: "System Design", level: 82 },
      { name: "OOP & Design Patterns", level: 85 },
      { name: "Performance Optimization", level: 87 },
      { name: "Agile / Scrum", level: 80 },
    ],
  },
];

export const techStackStrip = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "MongoDB",
  "PostgreSQL",
  "Tailwind CSS",
  "LangChain",
  "Cloudflare",
  "Prisma",
];
