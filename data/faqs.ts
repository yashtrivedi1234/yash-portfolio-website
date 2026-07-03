export interface FAQ {
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    question: "What services do you offer as a full-stack developer?",
    answer:
      "I offer full-stack web development including MERN and Next.js applications, AI chatbot integration (Groq LLM, LangChain), real-time platforms (WebRTC, Socket.io), e-commerce systems, CRM development, API design, performance optimization, and Cloudflare edge infrastructure setup.",
  },
  {
    question: "What technologies do you specialize in?",
    answer:
      "I specialize in React.js, Next.js (App Router, SSR/ISR), TypeScript, Node.js, Express.js, MongoDB, PostgreSQL (Prisma ORM), Tailwind CSS, and AI tooling including LangChain, Groq LLM, and Gemini API. I also work with Cloudflare CDN/WAF, Vercel, Render, and CI/CD pipelines.",
  },
  {
    question: "Do you have experience with AI integrations?",
    answer:
      "Yes. I've built AI customer support chatbots with Groq LLM and LangChain, FastAPI scrapers processing 1,000+ items/day at 92% accuracy, and transaction pipelines via Gemini API — all deployed in production with sub-50ms latency and 99.9% uptime.",
  },
  {
    question: "Do you work remotely?",
    answer:
      "Yes, I'm based in Sitapur, Uttar Pradesh and work remotely with teams across India. I've completed remote internships at Xenovate Tech Solutions and Unified Mentor, and currently work with companies in Lucknow.",
  },
  {
    question: "What is your development process?",
    answer:
      "My process covers schema design, REST API development, frontend implementation with loading states and error boundaries, JWT/RBAC security, performance optimization (code-splitting, lazy loading, CDN), and CI/CD deployment with automated rollback.",
  },
  {
    question: "Do you offer mentoring or training?",
    answer:
      "Yes. At CodingClave Development LLP, I mentor B.Tech, BCA, and MCA students in MERN stack and DSA — including curriculum design, capstone reviews, and production-grade code reviews.",
  },
  {
    question: "How do you ensure performance and security?",
    answer:
      "I implement JWT/RBAC authentication, bcrypt hashing, Cloudflare CDN/WAF for DDoS protection, asset compression, code-splitting, lazy loading, and Core Web Vitals optimization. Production deployments maintain 99.9%+ uptime via CI/CD with automated rollback.",
  },
  {
    question: "Are you available for full-time or freelance work?",
    answer:
      "Yes, I'm available for full-time roles, freelance projects, and mentoring opportunities. Reach out via email at yashtrivedi.contact@gmail.com or through the contact form on this site.",
  },
];
