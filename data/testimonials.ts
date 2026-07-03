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
    name: "Sarah Chen",
    role: "CEO",
    company: "StartupFlow",
    content:
      "Alex delivered an exceptional website that exceeded our expectations. The attention to detail, performance optimization, and SEO implementation helped us increase organic traffic by 150% within three months.",
    avatar: "/images/avatars/avatar-1.svg",
    rating: 5,
  },
  {
    name: "Michael Rodriguez",
    role: "Product Manager",
    company: "TechVentures",
    content:
      "Working with Alex was a seamless experience. They transformed our outdated platform into a modern, fast web application. Communication was excellent throughout the entire project.",
    avatar: "/images/avatars/avatar-2.svg",
    rating: 5,
  },
  {
    name: "Emily Watson",
    role: "Marketing Director",
    company: "BrandCraft Agency",
    content:
      "Alex built our agency portfolio and three client landing pages. Every project was delivered on time with outstanding quality. Highly recommend for any web development needs.",
    avatar: "/images/avatars/avatar-3.svg",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "Founder",
    company: "DataPulse",
    content:
      "The dashboard Alex created for our SaaS product is intuitive and blazing fast. Our users love the new interface, and the codebase is clean and maintainable.",
    avatar: "/images/avatars/avatar-4.svg",
    rating: 5,
  },
];
