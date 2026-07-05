export interface Project {
  slug: string;
  image: string;
  liveUrl: string;
}

function projectImage(label: string) {
  return `https://placehold.co/1200x675/0f172a/a78bfa?font=inter&text=${encodeURIComponent(label)}`;
}

export const projects: Project[] = [
  { slug: "maurmart", image: projectImage("MaurMart"), liveUrl: "#" },
  { slug: "video-calling-chat-app", image: projectImage("Video Chat App"), liveUrl: "#" },
  { slug: "ai-customer-support-chatbot", image: projectImage("AI Chatbot"), liveUrl: "#" },
  { slug: "ecommerce-dashboard", image: projectImage("E-Commerce Dashboard"), liveUrl: "#" },
  { slug: "portfolio-website", image: projectImage("Portfolio Website"), liveUrl: "#" },
  { slug: "task-management-app", image: projectImage("Task Manager"), liveUrl: "#" },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
