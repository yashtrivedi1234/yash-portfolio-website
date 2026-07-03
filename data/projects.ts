export interface Project {
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  image: string;
  techStack: string[];
  category: string;
  year: string;
  status: "Completed" | "In Progress" | "Featured";
  featured: boolean;
  liveUrl: string;
  githubUrl?: string;
  features: string[];
}

export const projects: Project[] = [
  {
    title: "Modern Business Website",
    slug: "modern-business-website",
    description:
      "A fast, responsive, and SEO-friendly business website built with Next.js and Tailwind CSS.",
    longDescription:
      "A complete business website designed with modern UI, optimized performance, responsive layouts, and SEO-friendly structure. Built for a growing startup to establish their online presence with conversion-focused landing pages and blog integration.",
    image: "/images/projects/business-website.svg",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "SEO"],
    category: "Website Development",
    year: "2026",
    status: "Completed",
    featured: true,
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/alexmorgan-dev/modern-business-website",
    features: [
      "Responsive design",
      "SEO optimized pages",
      "Fast loading performance",
      "Modern UI components",
      "Clean reusable components",
    ],
  },
  {
    title: "E-Commerce Dashboard",
    slug: "ecommerce-dashboard",
    description:
      "A feature-rich admin dashboard for managing products, orders, and analytics in real-time.",
    longDescription:
      "An intuitive e-commerce dashboard with real-time analytics, inventory management, order tracking, and customer insights. Designed with a focus on usability and performance for small to medium businesses.",
    image: "/images/projects/ecommerce-dashboard.svg",
    techStack: ["React", "TypeScript", "Node.js", "MongoDB"],
    category: "Web Application",
    year: "2025",
    status: "Featured",
    featured: true,
    liveUrl: "https://example.com/ecommerce-dashboard",
    githubUrl: "https://github.com/alexmorgan-dev/ecommerce-dashboard",
    features: [
      "Real-time analytics",
      "Inventory management",
      "Order tracking system",
      "Customer insights",
      "Responsive admin panel",
    ],
  },
  {
    title: "Portfolio Builder SaaS",
    slug: "portfolio-builder-saas",
    description:
      "A SaaS platform enabling developers to create stunning portfolio websites in minutes.",
    longDescription:
      "A drag-and-drop portfolio builder with customizable templates, theme options, and one-click deployment. Built to help developers and creatives showcase their work professionally without writing code.",
    image: "/images/projects/portfolio-saas.svg",
    techStack: ["Next.js", "React", "Tailwind CSS", "Supabase"],
    category: "SaaS Application",
    year: "2025",
    status: "Completed",
    featured: true,
    liveUrl: "https://example.com/portfolio-builder",
    features: [
      "Drag-and-drop editor",
      "Customizable templates",
      "One-click deployment",
      "Theme customization",
      "Analytics integration",
    ],
  },
  {
    title: "Task Management App",
    slug: "task-management-app",
    description:
      "A collaborative task management application with real-time updates and team workspaces.",
    longDescription:
      "A productivity-focused task management app with kanban boards, team collaboration, deadline tracking, and notification system. Designed for remote teams to stay organized and productive.",
    image: "/images/projects/task-app.svg",
    techStack: ["React", "Node.js", "Express.js", "PostgreSQL"],
    category: "Web Application",
    year: "2024",
    status: "Completed",
    featured: false,
    liveUrl: "https://example.com/task-app",
    githubUrl: "https://github.com/alexmorgan-dev/task-management-app",
    features: [
      "Kanban boards",
      "Team collaboration",
      "Deadline tracking",
      "Real-time updates",
      "Notification system",
    ],
  },
  {
    title: "Restaurant Landing Page",
    slug: "restaurant-landing-page",
    description:
      "An elegant landing page for a fine dining restaurant with online reservation system.",
    longDescription:
      "A visually stunning restaurant website featuring menu showcase, online reservations, gallery, and location map. Optimized for mobile users and local SEO to drive foot traffic.",
    image: "/images/projects/restaurant.svg",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    category: "Landing Page",
    year: "2024",
    status: "Completed",
    featured: false,
    liveUrl: "https://example.com/restaurant",
    githubUrl: "https://github.com/alexmorgan-dev/restaurant-landing",
    features: [
      "Online reservations",
      "Menu showcase",
      "Image gallery",
      "Local SEO optimized",
      "Mobile-first design",
    ],
  },
  {
    title: "AI Content Generator",
    slug: "ai-content-generator",
    description:
      "An AI-powered content generation tool for marketers and content creators.",
    longDescription:
      "A web application that leverages AI to generate blog posts, social media content, and marketing copy. Features include template library, content history, and export options.",
    image: "/images/projects/ai-content.svg",
    techStack: ["Next.js", "TypeScript", "OpenAI API", "Tailwind CSS"],
    category: "Web Application",
    year: "2026",
    status: "In Progress",
    featured: false,
    liveUrl: "https://example.com/ai-content",
    features: [
      "AI content generation",
      "Template library",
      "Content history",
      "Export options",
      "Multi-format support",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
