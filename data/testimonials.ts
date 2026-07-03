export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    name: "CodingClave Development LLP",
    role: "Training & Development",
    company: "CodingClave",
    content:
      "Architecting production Next.js platforms with TypeScript, PostgreSQL, and Prisma while mentoring students in MERN stack and DSA — delivering 99.9%+ uptime via Cloudflare edge infrastructure.",
    avatar: "/images/avatars/avatar-1.svg",
    rating: 5,
  },
  {
    name: "Code Crafter Web Solutions",
    role: "MERN Stack Development",
    company: "Code Crafter",
    content:
      "Delivered 14+ client websites and 1 CRM end-to-end. Built an AI chatbot with Groq LLM and LangChain, and improved page load performance by ~30% through compression and code-splitting.",
    avatar: "/images/avatars/avatar-2.svg",
    rating: 5,
  },
  {
    name: "ERA Foundation India",
    role: "Team Leadership",
    company: "ERA Foundation",
    content:
      "Led a 6-member engineering team to ship 4 full-stack prototypes. Owned Lucknow Craftsmen end-to-end — from DB modelling and Express APIs to React UI across 3 client briefs.",
    avatar: "/images/avatars/avatar-3.svg",
    rating: 5,
  },
  {
    name: "Xenovate Tech Solutions",
    role: "Backend & AI Pipeline",
    company: "Xenovate",
    content:
      "Built a FastAPI scraper processing 1,000+ posts/day from 150+ sites at 92% accuracy. Architected the full pipeline from scraper through LLM enrichment to a real-time React UI.",
    avatar: "/images/avatars/avatar-4.svg",
    rating: 5,
  },
];
