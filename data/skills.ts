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
    category: "Frontend",
    description: "Building beautiful, responsive, and interactive user interfaces.",
    skills: [
      { name: "HTML", level: 95 },
      { name: "CSS", level: 92 },
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 88 },
      { name: "React", level: 90 },
      { name: "Next.js", level: 92 },
      { name: "Tailwind CSS", level: 93 },
    ],
  },
  {
    category: "Backend",
    description: "Developing robust server-side logic and RESTful APIs.",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 82 },
      { name: "REST APIs", level: 88 },
    ],
  },
  {
    category: "Database Knowledge",
    description: "Working with relational and NoSQL databases for data management.",
    skills: [
      { name: "MongoDB", level: 80 },
      { name: "PostgreSQL", level: 78 },
      { name: "MySQL", level: 75 },
      { name: "Firebase", level: 82 },
      { name: "Supabase", level: 80 },
    ],
  },
  {
    category: "Tools",
    description: "Essential development tools and platforms for efficient workflows.",
    skills: [
      { name: "Git", level: 90 },
      { name: "GitHub", level: 92 },
      { name: "VS Code", level: 95 },
      { name: "Postman", level: 85 },
      { name: "Figma", level: 78 },
      { name: "Vercel", level: 90 },
      { name: "Netlify", level: 85 },
    ],
  },
  {
    category: "Other",
    description: "Additional expertise in optimization, SEO, and deployment.",
    skills: [
      { name: "SEO", level: 85 },
      { name: "Performance Optimization", level: 88 },
      { name: "Responsive Design", level: 93 },
      { name: "UI/UX Basics", level: 80 },
      { name: "Website Deployment", level: 90 },
    ],
  },
];

export const techStackStrip = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Tailwind CSS",
  "MongoDB",
  "PostgreSQL",
  "Git",
  "Vercel",
];
