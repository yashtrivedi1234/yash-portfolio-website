export interface Service {
  title: string;
  description: string;
  icon: string;
  benefits: string[];
}

export const services: Service[] = [
  {
    title: "Website Development",
    description:
      "End-to-end website development from concept to deployment with modern technologies.",
    icon: "globe",
    benefits: ["Custom design", "Responsive layouts", "Fast performance", "SEO ready"],
  },
  {
    title: "Frontend Development",
    description:
      "Pixel-perfect, interactive frontends built with React, Next.js, and modern CSS.",
    icon: "layout",
    benefits: ["React & Next.js", "Component architecture", "State management", "Animations"],
  },
  {
    title: "Next.js Development",
    description:
      "High-performance Next.js applications with SSR, SSG, and App Router expertise.",
    icon: "zap",
    benefits: ["App Router", "Server components", "API routes", "Optimized builds"],
  },
  {
    title: "React Development",
    description:
      "Scalable React applications with clean architecture and reusable components.",
    icon: "code",
    benefits: ["Hooks & context", "TypeScript", "Testing ready", "Performance tuned"],
  },
  {
    title: "Landing Page Development",
    description:
      "Conversion-focused landing pages designed to capture leads and drive results.",
    icon: "target",
    benefits: ["High conversion", "A/B test ready", "Fast loading", "Mobile optimized"],
  },
  {
    title: "Portfolio Website Development",
    description:
      "Stunning developer portfolios that showcase your skills and attract opportunities.",
    icon: "briefcase",
    benefits: ["Modern design", "Project showcase", "SEO optimized", "Easy to update"],
  },
  {
    title: "Business Website Development",
    description:
      "Professional business websites that establish credibility and grow your brand.",
    icon: "building",
    benefits: ["Brand identity", "Contact forms", "Service pages", "Google ready"],
  },
  {
    title: "Web App UI Development",
    description:
      "Intuitive and accessible user interfaces for web applications and dashboards.",
    icon: "monitor",
    benefits: ["Dashboard UI", "Data tables", "Form systems", "Accessibility"],
  },
  {
    title: "Website Speed Optimization",
    description:
      "Performance audits and optimizations to achieve 90+ Lighthouse scores.",
    icon: "gauge",
    benefits: ["Core Web Vitals", "Image optimization", "Code splitting", "Caching"],
  },
  {
    title: "On-Page SEO Implementation",
    description:
      "Comprehensive on-page SEO to improve search rankings and organic traffic.",
    icon: "search",
    benefits: ["Meta tags", "Schema markup", "Content structure", "Internal linking"],
  },
  {
    title: "Technical SEO Setup",
    description:
      "Technical SEO foundation including sitemaps, robots.txt, and structured data.",
    icon: "settings",
    benefits: ["Sitemap", "Robots.txt", "JSON-LD", "Canonical URLs"],
  },
  {
    title: "Website Redesign",
    description:
      "Modern redesigns that refresh your brand and improve user experience.",
    icon: "refresh",
    benefits: ["UI refresh", "UX improvements", "Mobile first", "Performance boost"],
  },
  {
    title: "Responsive Website Development",
    description:
      "Fully responsive websites that look perfect on every device and screen size.",
    icon: "smartphone",
    benefits: ["Mobile first", "Tablet ready", "Fluid layouts", "Touch friendly"],
  },
];
