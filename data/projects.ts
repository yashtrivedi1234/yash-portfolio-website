export interface ProjectMetric {
  label: string;
  value: string;
}

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
  features: string[];
  problem?: string;
  solution?: string;
  result?: string;
  metrics?: ProjectMetric[];
  gallery?: string[];
}

function projectImage(label: string) {
  return `https://placehold.co/1200x675/0f172a/a78bfa?font=inter&text=${encodeURIComponent(label)}`;
}

export const projects: Project[] = [
  {
    title: "MaurMart",
    slug: "maurmart",
    description:
      "Full-featured e-commerce platform with real-time inventory, Razorpay payments, and JWT/RBAC admin auth.",
    longDescription:
      "MaurMart is a production-grade e-commerce platform built on the MERN stack. It features MongoDB schema design, Express REST APIs, JWT/RBAC admin authentication, Razorpay payment integration, and Socket.io for real-time inventory updates. The React storefront uses Redux Toolkit and Framer Motion with Core Web Vitals optimization via Cloudinary CDN and Vite builds.",
    image: projectImage("MaurMart"),
    techStack: ["MERN", "Redux Toolkit", "Socket.io", "Razorpay", "Tailwind CSS"],
    category: "E-Commerce Platform",
    year: "2026",
    status: "In Progress",
    featured: true,
    liveUrl: "#",
    features: [
      "MongoDB schema design & Express REST APIs",
      "JWT/RBAC admin authentication",
      "Razorpay payment integration",
      "Socket.io real-time inventory",
      "Redux Toolkit + Framer Motion storefront",
    ],
    problem:
      "Local retailers needed a scalable online storefront with real-time stock visibility and secure payments without rebuilding their entire ops stack.",
    solution:
      "Built a MERN e-commerce platform with JWT/RBAC admin, Razorpay checkout, and Socket.io inventory sync — optimized for Core Web Vitals via Cloudinary CDN.",
    result:
      "End-to-end commerce flow from catalog to payment with admin dashboards ready for production rollout and real-time inventory updates.",
    metrics: [
      { label: "Payment Gateway", value: "Razorpay" },
      { label: "Real-time Sync", value: "Socket.io" },
      { label: "Stack", value: "MERN" },
    ],
    gallery: [projectImage("MaurMart Dashboard"), projectImage("MaurMart Storefront")],
  },
  {
    title: "Video Calling Chat App",
    slug: "video-calling-chat-app",
    description:
      "Real-time video calling platform with WebRTC, screen sharing, and group chat for 120+ concurrent users.",
    longDescription:
      "A real-time communication platform built with MERN stack featuring Node + WebRTC signaling with peer connections, video calls, screen sharing, and group chat for 120+ concurrent users. Secured with JWT + bcrypt and deployed on Render via CI/CD pipeline at 99.9% uptime SLA with automated rollback.",
    image: projectImage("Video Chat App"),
    techStack: ["MERN", "WebRTC", "Stream API", "Socket.io", "Tailwind CSS"],
    category: "Real-Time Platform",
    year: "2025",
    status: "Featured",
    featured: true,
    liveUrl: "#",
    features: [
      "WebRTC peer connections & signaling",
      "Video calls & screen sharing",
      "Group chat for 120+ users",
      "JWT + bcrypt session security",
      "99.9% uptime on Render via CI/CD",
    ],
    problem:
      "Teams needed reliable video calls with screen sharing and group chat that could handle high concurrency without sacrificing security.",
    solution:
      "Implemented WebRTC signaling on Node.js with JWT-secured sessions, Socket.io messaging, and CI/CD deployment on Render with automated rollback.",
    result:
      "Production-ready communication platform supporting 120+ concurrent users with 99.9% uptime SLA.",
    metrics: [
      { label: "Concurrent Users", value: "120+" },
      { label: "Uptime SLA", value: "99.9%" },
      { label: "Security", value: "JWT + bcrypt" },
    ],
    gallery: [projectImage("Video Call UI"), projectImage("Group Chat")],
  },
  {
    title: "AI Customer Support Chatbot",
    slug: "ai-customer-support-chatbot",
    description:
      "Context-aware AI chatbot powered by Groq LLM and LangChain for real-time customer support.",
    longDescription:
      "An intelligent customer support chatbot designed with Groq LLM and LangChain for real-time, context-aware retrieval responses. Built during tenure at Code Crafter Web Solutions as part of client deliverables.",
    image: projectImage("AI Support Bot"),
    techStack: ["Node.js", "Groq LLM", "LangChain", "React", "MongoDB"],
    category: "AI Integration",
    year: "2025",
    status: "Completed",
    featured: true,
    liveUrl: "#",
    features: [
      "Groq LLM + LangChain pipeline",
      "Context-aware retrieval responses",
      "Real-time chat interface",
      "Production-grade error handling",
    ],
    problem:
      "Client support teams were overwhelmed by repetitive queries that needed instant, context-aware answers.",
    solution:
      "Built a Groq LLM + LangChain RAG pipeline with a React chat UI for real-time, context-aware customer support.",
    result:
      "Reduced manual support load with automated, accurate responses integrated into the client's existing workflow.",
    metrics: [
      { label: "LLM Provider", value: "Groq" },
      { label: "Framework", value: "LangChain" },
      { label: "Response", value: "Real-time" },
    ],
  },
  {
    title: "Lucknow Craftsmen",
    slug: "lucknow-craftsmen",
    description:
      "Full-stack marketplace platform connecting local artisans — owned end-to-end from DB to React UI.",
    longDescription:
      "A full-stack prototype built at ERA Foundation India to showcase local craftsmen. Led DB modelling, Express APIs, and React UI — solving 3 client briefs as part of a 6-member engineering team that shipped 4 prototypes.",
    image: projectImage("Lucknow Craftsmen"),
    techStack: ["React", "Node.js", "Express.js", "MongoDB", "Figma"],
    category: "Web Application",
    year: "2025",
    status: "Completed",
    featured: false,
    liveUrl: "#",
    features: [
      "End-to-end DB modelling & APIs",
      "Responsive React UI",
      "Figma-driven design system",
      "Multi-client brief delivery",
    ],
  },
  {
    title: "AI Content Scraper Pipeline",
    slug: "ai-content-scraper-pipeline",
    description:
      "FastAPI scraper processing 1,000+ posts/day from 150+ sites at 92% accuracy with LLM enrichment.",
    longDescription:
      "An end-to-end data pipeline built at Xenovate Tech Solutions — FastAPI scraper feeding into Groq LLM + LangChain for content enrichment, with a React UI featuring filtering, pagination, and real-time updates at scale.",
    image: projectImage("AI Scraper Pipeline"),
    techStack: ["FastAPI", "Python", "Groq LLM", "LangChain", "React"],
    category: "AI Pipeline",
    year: "2025",
    status: "Completed",
    featured: false,
    liveUrl: "#",
    features: [
      "1,000+ posts/day from 150+ sites",
      "92% accuracy via Groq LLM",
      "Filtering & pagination",
      "Real-time React UI updates",
    ],
    problem:
      "Content teams needed automated ingestion from 150+ sources with LLM enrichment at scale.",
    solution:
      "Built a FastAPI scraper pipeline with Groq LLM + LangChain enrichment and a React dashboard for filtering and pagination.",
    result:
      "Processing 1,000+ posts/day at 92% accuracy with sub-50ms enrichment latency.",
    metrics: [
      { label: "Posts / Day", value: "1,000+" },
      { label: "Sources", value: "150+" },
      { label: "Accuracy", value: "92%" },
    ],
  },
  {
    title: "Client CRM Platform",
    slug: "client-crm-platform",
    description:
      "Custom CRM built on MERN stack with JWT-secured admin routes and optimized performance.",
    longDescription:
      "A production CRM delivered as part of 14+ client websites at Code Crafter Web Solutions. Features schema design, Express REST APIs, React admin dashboard, JWT/RBAC security, and ~30% page load improvement via compression and code-splitting.",
    image: projectImage("Client CRM"),
    techStack: ["React", "Node.js", "MongoDB", "Express.js", "JWT"],
    category: "Web Application",
    year: "2025",
    status: "Completed",
    featured: false,
    liveUrl: "#",
    features: [
      "Custom CRM schema & APIs",
      "JWT/RBAC admin routes",
      "30% page load optimization",
      "Code-splitting & lazy loading",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
