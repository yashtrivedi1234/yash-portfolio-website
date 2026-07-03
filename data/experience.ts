export interface ExperienceItem {
  title: string;
  organization: string;
  location?: string;
  period: string;
  description: string;
  type: "work" | "freelance" | "internship" | "education" | "certification" | "achievement";
  technologies?: string[];
}

export const experienceItems: ExperienceItem[] = [
  {
    title: "Senior Full-Stack Developer",
    organization: "TechFlow Solutions",
    location: "San Francisco, CA (Remote)",
    period: "2023 – Present",
    description:
      "Leading development of client-facing web applications using Next.js and React. Mentoring junior developers and establishing coding standards for the engineering team.",
    type: "work",
    technologies: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL"],
  },
  {
    title: "Full-Stack Developer",
    organization: "DigitalCraft Agency",
    location: "New York, NY",
    period: "2021 – 2023",
    description:
      "Built and maintained 20+ client websites and web applications. Collaborated with designers to deliver pixel-perfect implementations with excellent performance scores.",
    type: "work",
    technologies: ["React", "Next.js", "Tailwind CSS", "MongoDB", "Express.js"],
  },
  {
    title: "Frontend Developer",
    organization: "StartupHub Inc.",
    location: "Austin, TX",
    period: "2019 – 2021",
    description:
      "Developed responsive user interfaces for SaaS products. Implemented component libraries and improved frontend performance by 40%.",
    type: "work",
    technologies: ["React", "JavaScript", "CSS", "Redux"],
  },
  {
    title: "Freelance Web Developer",
    organization: "Self-Employed",
    location: "Remote",
    period: "2020 – Present",
    description:
      "Delivered 35+ freelance projects for startups, agencies, and small businesses including portfolios, landing pages, and business websites.",
    type: "freelance",
    technologies: ["Next.js", "React", "WordPress", "Tailwind CSS"],
  },
  {
    title: "Web Development Intern",
    organization: "InnovateTech Labs",
    location: "San Francisco, CA",
    period: "Summer 2019",
    description:
      "Assisted in building internal tools and client prototypes. Gained hands-on experience with modern web development workflows and agile methodologies.",
    type: "internship",
    technologies: ["JavaScript", "React", "HTML", "CSS"],
  },
  {
    title: "B.S. Computer Science",
    organization: "University of California",
    location: "Berkeley, CA",
    period: "2015 – 2019",
    description:
      "Graduated with honors. Focused on software engineering, web technologies, and database systems. Active member of the Web Development Club.",
    type: "education",
  },
  {
    title: "AWS Certified Developer – Associate",
    organization: "Amazon Web Services",
    period: "2024",
    description:
      "Validated expertise in developing and maintaining applications on the AWS platform.",
    type: "certification",
  },
  {
    title: "Meta Front-End Developer Professional Certificate",
    organization: "Meta (Coursera)",
    period: "2023",
    description:
      "Comprehensive certification covering React, JavaScript, HTML/CSS, and responsive design principles.",
    type: "certification",
  },
  {
    title: "Open Source Contributor",
    organization: "GitHub",
    period: "2022 – Present",
    description:
      "Active contributor to open-source projects with 500+ GitHub stars across repositories. Maintains popular React component libraries.",
    type: "achievement",
  },
  {
    title: "Hackathon Winner – DevCon 2024",
    organization: "DevCon Conference",
    period: "2024",
    description:
      "First place in the 48-hour hackathon for building an AI-powered accessibility tool for web developers.",
    type: "achievement",
  },
];

export const experienceSections = [
  { key: "work" as const, label: "Work Experience" },
  { key: "freelance" as const, label: "Freelance Projects" },
  { key: "internship" as const, label: "Internships" },
  { key: "education" as const, label: "Education" },
  { key: "certification" as const, label: "Certifications" },
  { key: "achievement" as const, label: "Achievements" },
];
