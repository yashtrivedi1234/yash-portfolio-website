export interface Project {
  slug: string;
  title: string;
  image: string;
  liveUrl: string;
}

function projectImage(label: string) {
  return `https://placehold.co/1200x675/0f172a/a78bfa?font=inter&text=${encodeURIComponent(label)}`;
}

export const projects: Project[] = [
  {
    slug: "maurmart",
    title: "MaurMart",
    image: projectImage("MaurMart"),
    liveUrl: "https://github.com/yashtrivedi1234",
  },
  {
    slug: "video-calling-chat-app",
    title: "Video Calling Chat App",
    image: projectImage("Video Chat App"),
    liveUrl: "https://github.com/yashtrivedi1234",
  },
  {
    slug: "ai-customer-support-chatbot",
    title: "AI Customer Support Chatbot",
    image: projectImage("AI Chatbot"),
    liveUrl: "https://github.com/yashtrivedi1234",
  },
  {
    slug: "ecommerce-dashboard",
    title: "E-Commerce Dashboard",
    image: projectImage("E-Commerce Dashboard"),
    liveUrl: "https://github.com/yashtrivedi1234",
  },
  {
    slug: "portfolio-website",
    title: "Portfolio Website",
    image: projectImage("Portfolio Website"),
    liveUrl: "https://yashtrivedi.dev",
  },
  {
    slug: "task-management-app",
    title: "Task Management App",
    image: projectImage("Task Manager"),
    liveUrl: "https://github.com/yashtrivedi1234",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

function projectDefaults(title: string, slug: string, sortOrder: number) {
  return {
    title,
    slug,
    description: "",
    longDescription: "",
    techStack: [] as string[],
    category: "",
    year: new Date().getFullYear().toString(),
    status: "Completed",
    featured: sortOrder < 3,
    features: [] as string[],
    problem: null,
    solution: null,
    result: null,
    gallery: [] as string[],
    sortOrder,
  };
}

export function toProjectDbRow(project: Project, sortOrder: number) {
  return {
    ...projectDefaults(project.title, project.slug, sortOrder),
    image: project.image,
    liveUrl: project.liveUrl,
  };
}
