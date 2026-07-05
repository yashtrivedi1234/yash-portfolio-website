import { siteConfig as staticSiteConfig } from "@/data/site";

export interface AboutSection {
  title: string;
  content: string;
}

export interface SectionContent {
  label?: string;
  title: string;
  description?: string;
}

export interface LegalSection {
  title: string;
  content: string;
}

export interface LegalPageContent {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export interface FullSiteConfig {
  name: string;
  role: string;
  shortBio: string;
  longBio: string;
  email: string;
  phone: string;
  location: string;
  resumeLink: string;
  github: string;
  linkedin: string;
  leetcode: string;
  portfolioUrl: string;
  availability: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage: string;
    favicon: string;
    author: string;
    publisher: string;
    themeColor: string;
  };
  stats: { label: string; value: string }[];
  socialLinks: { name: string; href: string; icon: string }[];
  navLinks: { name: string; href: string }[];
  hero: {
    badgeText: string;
    greetingPrefix: string;
    roleConnector: string;
    headlineSuffix: string;
    extraBio: string;
    codeSkills: string[];
    codeWindowTitle: string;
    profileImage: string;
  };
  aboutSections: AboutSection[];
  homeSections: {
    about: SectionContent;
    projects: SectionContent;
    services: SectionContent;
    experience: SectionContent;
    achievements: SectionContent;
    testimonials: SectionContent;
    faq: SectionContent;
  };
  contactPage: SectionContent & {
    contactInfoHeading: string;
    emailLabel: string;
    phoneLabel: string;
    locationLabel: string;
    connectHeading: string;
    responseTimeLabel: string;
    responseTime: string;
    timezoneLabel: string;
    timezone: string;
    form: {
      nameLabel: string;
      emailLabel: string;
      subjectLabel: string;
      messageLabel: string;
      namePlaceholder: string;
      emailPlaceholder: string;
      subjectPlaceholder: string;
      messagePlaceholder: string;
      submitLabel: string;
      sendingLabel: string;
      successMessage: string;
      errorMessage: string;
    };
  };
  cta: {
    title: string;
    description: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
  footer: {
    builtWith: string;
    pagesHeading: string;
    legalHeading: string;
    copyrightSuffix: string;
  };
  legal: {
    privacyPolicy: LegalPageContent;
    termsAndConditions: LegalPageContent;
  };
  navbar: {
    hireMeLabel: string;
    hireMeHref: string;
    adminLoginLabel: string;
    adminLoginHref: string;
  };
  pageHeadings: {
    projects: SectionContent;
    services: SectionContent;
    skills: SectionContent;
    experience: SectionContent;
    about: SectionContent;
    blog: SectionContent;
  };
  experienceSections: { key: string; label: string }[];
  buttons: {
    viewMyWork: string;
    contactMe: string;
    downloadResume: string;
    learnMoreAboutMe: string;
    viewSkills: string;
    viewAllProjects: string;
    viewAllServices: string;
    viewFullExperience: string;
    viewProjects: string;
    getInTouch: string;
    skillsOverview: string;
    goHome: string;
  };
  pageCta: {
    services: { title: string; description: string };
    skills: { title: string; description: string };
  };
  notFound: {
    errorCode: string;
    title: string;
    description: string;
    helperText: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
  labels: {
    liveDemo: string;
    viewDetails: string;
    backToProjects: string;
    aboutProject: string;
    techStack: string;
    keyFeatures: string;
    getStarted: string;
    techStackMarquee: string;
    projectNotFound: string;
    projectMetaKeyword: string;
    lastUpdatedLabel: string;
    problem: string;
    solution: string;
    result: string;
    keyMetrics: string;
    projectGallery: string;
  };
  aboutPage: {
    currentlyLearningLabel: string;
    focusLabel: string;
    currentlyLearning: string[];
    focusAreas: string[];
  };
  mobileHireBar: {
    label: string;
    href: string;
  };
  pageTitles: {
    homeSuffix: string;
    contactSuffix: string;
    aboutSuffix: string;
    servicesTitle: string;
    projectsSuffix: string;
    skillsPrefix: string;
    experiencePrefix: string;
    projectByPrefix: string;
    privacyDescription: string;
    termsDescription: string;
  };
  manifest: {
    name: string;
    shortName: string;
    description: string;
    backgroundColor: string;
    iconUrl: string;
  };
  heroCode: {
    variableName: string;
    availableValue: string;
  };
  adminLogin: {
    title: string;
    subtitle: string;
    emailLabel: string;
    passwordLabel: string;
    emailPlaceholder: string;
    passwordPlaceholder: string;
    submitLabel: string;
    signingInLabel: string;
  };
}

export type SiteConfig = FullSiteConfig;

const defaultAboutSections: AboutSection[] = [
  {
    title: "Who I Am",
    content:
      "I'm Yash Trivedi, a Full-Stack Software Engineer based in Sitapur, Uttar Pradesh, India. I've shipped 15+ production web platforms and 1 CRM across MERN and Next.js stacks — from MongoDB schema design to Cloudflare-protected deployment.",
  },
  {
    title: "What I Do",
    content:
      "I build full-stack web applications, AI-powered pipelines, and real-time platforms. My work spans e-commerce systems, video calling apps, CRM platforms, and LLM-integrated chatbots — always with a focus on performance, security, and production-grade UX.",
  },
  {
    title: "Key Highlights",
    content:
      "Delivered 15+ production platforms in React.js, Next.js, Node.js, and MongoDB. Led a 6-member engineering team at ERA Foundation. Architected AI pipelines via Groq LLM + LangChain processing 1,000+ items/day at 92% accuracy with sub-50ms latency and 99.9% uptime.",
  },
  {
    title: "My Development Approach",
    content:
      "I follow RESTful architecture, JWT/RBAC security patterns, and scalable component design. Every project moves from schema design through API development to optimized frontend delivery — with SSR/ISR where it matters, edge infrastructure via Cloudflare, and CI/CD for reliable deployments.",
  },
  {
    title: "Tools I Use",
    content:
      "My stack includes Next.js (App Router, Server Actions), React.js, TypeScript, Node.js, Express.js, FastAPI, PostgreSQL with Prisma, MongoDB with Mongoose, Tailwind CSS, and AI tooling like LangChain, Groq LLM, and Gemini API. I deploy on Vercel, Render, and Cloudflare.",
  },
  {
    title: "Mentoring & Leadership",
    content:
      "At CodingClave Development LLP, I mentor B.Tech, BCA, and MCA students in MERN stack and DSA — designing curriculum, reviewing capstone projects, and conducting best-practice code reviews. I previously led a 6-member team at ERA Foundation to ship 4 full-stack prototypes.",
  },
  {
    title: "Professional Goals",
    content:
      "I'm focused on building scalable full-stack systems, deepening AI integration expertise, and contributing to high-impact engineering teams. Currently pursuing B.Tech in Computer Science & Engineering at G.C.R.G Group of Institutions, Lucknow (2023–2027).",
  },
];

export function getDefaultSiteConfig(): FullSiteConfig {
  return {
    name: staticSiteConfig.name,
    role: staticSiteConfig.role,
    shortBio: staticSiteConfig.shortBio,
    longBio: staticSiteConfig.longBio,
    email: staticSiteConfig.email,
    phone: staticSiteConfig.phone,
    location: staticSiteConfig.location,
    resumeLink: staticSiteConfig.resumeLink,
    github: staticSiteConfig.github,
    linkedin: staticSiteConfig.linkedin,
    leetcode: staticSiteConfig.leetcode,
    portfolioUrl: staticSiteConfig.portfolioUrl,
    availability: staticSiteConfig.availability,
    seo: {
      title: staticSiteConfig.seo.title,
      description: staticSiteConfig.seo.description,
      keywords: [...staticSiteConfig.seo.keywords],
      ogImage: staticSiteConfig.seo.ogImage,
      favicon: "/logo.svg",
      author: staticSiteConfig.seo.author,
      publisher: staticSiteConfig.seo.publisher,
      themeColor: staticSiteConfig.seo.themeColor,
    },
    stats: staticSiteConfig.stats.map((s) => ({ ...s })),
    socialLinks: staticSiteConfig.socialLinks.map((s) => ({ ...s })),
    navLinks: staticSiteConfig.navLinks.map((s) => ({ ...s })),
    hero: {
      badgeText: "Available for new projects",
      greetingPrefix: "Hi, I'm",
      roleConnector: ", a ",
      headlineSuffix: "building fast, modern, and scalable web applications.",
      extraBio:
        "I specialize in Next.js, React, and TypeScript to deliver high-performance, SEO-friendly websites for businesses and startups.",
      codeSkills: ["MERN", "Next.js", "TypeScript", "AI"],
      codeWindowTitle: "developer.tsx",
      profileImage: "/images/profile.png",
    },
    aboutSections: defaultAboutSections.map((s) => ({ ...s })),
    homeSections: {
      about: { label: "About Me", title: "Passionate Full-Stack Software Engineer", description: "" },
      projects: {
        label: "Portfolio",
        title: "Featured Projects",
        description:
          "A selection of my recent work showcasing modern web development, clean design, and performance optimization.",
      },
      services: {
        label: "Services",
        title: "What I Can Do For You",
        description: "Professional web development services tailored to help your business grow online.",
      },
      experience: {
        label: "Experience",
        title: "Work Experience",
        description:
          "My professional journey building production platforms, AI pipelines, and real-time applications across India.",
      },
      achievements: {
        label: "Achievements",
        title: "By The Numbers",
        description:
          "Key milestones from shipping 15+ production platforms, leading engineering teams, and building AI pipelines.",
      },
      testimonials: {
        label: "Testimonials",
        title: "Work Highlights",
        description:
          "Impact across companies I've worked with — from production platforms to AI pipelines and team leadership.",
      },
      faq: {
        label: "FAQ",
        title: "Frequently Asked Questions",
        description: "Common questions about my services, process, and expertise as a web developer.",
      },
    },
    contactPage: {
      label: "Contact",
      title: "Let's Work Together",
      description: "Have a project in mind? I'd love to hear about it. Send me a message and I'll respond as soon as possible.",
      contactInfoHeading: "Contact Information",
      emailLabel: "Email",
      phoneLabel: "Phone",
      locationLabel: "Location",
      connectHeading: "Connect With Me",
      responseTimeLabel: "Response Time",
      responseTime: "Usually replies within 24 hours",
      timezoneLabel: "Timezone",
      timezone: "IST (UTC+5:30) — Sitapur, India",
      form: {
        nameLabel: "Name",
        emailLabel: "Email",
        subjectLabel: "Subject",
        messageLabel: "Message",
        namePlaceholder: "Your name",
        emailPlaceholder: "your@email.com",
        subjectPlaceholder: "Project inquiry",
        messagePlaceholder: "Tell me about your project...",
        submitLabel: "Send Message",
        sendingLabel: "Sending...",
        successMessage: "Thank you! Your message has been received. I'll get back to you soon.",
        errorMessage: "Something went wrong. Please try again or email me directly.",
      },
    },
    cta: {
      title: "Ready to Start Your Project?",
      description: "Let's work together to build something amazing.",
      primaryLabel: "Get In Touch",
      primaryHref: "/contact",
      secondaryLabel: "View My Work",
      secondaryHref: "/projects",
    },
    footer: {
      builtWith: "Built with Next.js & Tailwind CSS",
      pagesHeading: "Pages",
      legalHeading: "Legal",
      copyrightSuffix: "All rights reserved.",
    },
    legal: {
      privacyPolicy: {
        title: "Privacy Policy",
        lastUpdated: new Date().toISOString().split("T")[0],
        sections: [
          {
            title: "Introduction",
            content:
              'This Privacy Policy describes how we collect, use, and protect your information when you visit our portfolio website.',
          },
          {
            title: "Information We Collect",
            content:
              "When you use our contact form, we may collect your name, email address, subject, and message content. We may also collect standard web analytics data.",
          },
          {
            title: "How We Use Your Information",
            content:
              "We use the information we collect to respond to your inquiries, improve our website, and analyze website traffic.",
          },
          {
            title: "Data Storage",
            content:
              "Contact form submissions are stored securely in our database and email notifications may be sent via SMTP.",
          },
          {
            title: "Your Rights",
            content: "You have the right to request access to, correction of, or deletion of your personal data.",
          },
        ],
      },
      termsAndConditions: {
        title: "Terms & Conditions",
        lastUpdated: new Date().toISOString().split("T")[0],
        sections: [
          {
            title: "Acceptance of Terms",
            content: "By accessing and using this website, you accept and agree to be bound by these Terms and Conditions.",
          },
          {
            title: "Use of Website",
            content: "This website is provided for informational purposes to showcase professional work and services.",
          },
          {
            title: "Intellectual Property",
            content: "All content on this website is intellectual property unless otherwise stated.",
          },
          {
            title: "Services",
            content: "Web development services are subject to separate agreements with defined scope and pricing.",
          },
          {
            title: "Limitation of Liability",
            content: 'This website is provided "as is" without warranties of any kind.',
          },
        ],
      },
    },
    navbar: {
      hireMeLabel: "Hire Me",
      hireMeHref: "/contact",
      adminLoginLabel: "Admin",
      adminLoginHref: "/admin/login",
    },
    pageHeadings: {
      projects: {
        label: "Portfolio",
        title: "My Projects",
        description: "A collection of web development projects showcasing my skills in building modern, performant, and user-friendly applications.",
      },
      services: {
        label: "Services",
        title: "Web Development Services",
        description: "Comprehensive web development services to help your business establish a strong online presence and achieve your digital goals.",
      },
      skills: {
        label: "Expertise",
        title: "Skills & Technologies",
        description: "A comprehensive overview of my technical skills across frontend, backend, databases, tools, and other areas of web development.",
      },
      experience: {
        label: "Career",
        title: "Experience & Background",
        description: "My professional journey including work experience, freelance projects, education, certifications, and achievements.",
      },
      about: {
        label: "About",
        title: "About Me",
        description: "",
      },
      blog: {
        label: "Blog",
        title: "Blog & Articles",
        description: "Thoughts on web development, projects, and lessons learned while building modern applications.",
      },
    },
    experienceSections: [
      { key: "work", label: "Work Experience" },
      { key: "internship", label: "Internships" },
      { key: "education", label: "Education" },
      { key: "certification", label: "Certifications" },
      { key: "achievement", label: "Achievements" },
    ],
    buttons: {
      viewMyWork: "View My Work",
      contactMe: "Contact Me",
      downloadResume: "Download Resume",
      learnMoreAboutMe: "Learn More About Me",
      viewSkills: "View Skills",
      viewAllProjects: "View All Projects",
      viewAllServices: "View All Services",
      viewFullExperience: "View Full Experience",
      viewProjects: "View My Projects",
      getInTouch: "Get In Touch",
      skillsOverview: "Skills Overview",
      goHome: "Go Home",
    },
    pageCta: {
      services: {
        title: "Let's Build Something Great",
        description: "Ready to start your next project? Get in touch for a free consultation and project estimate.",
      },
      skills: {
        title: "Need a Skilled Developer?",
        description: "Let's discuss how my technical expertise can help bring your project to life.",
      },
    },
    notFound: {
      errorCode: "404",
      title: "Page Not Found",
      description: "The page you're looking for doesn't exist or has been moved. Let's get you back on track.",
      helperText: "Or try one of these pages:",
      primaryLabel: "Go Home",
      primaryHref: "/",
      secondaryLabel: "View Projects",
      secondaryHref: "/projects",
    },
    labels: {
      liveDemo: "Live Demo",
      viewDetails: "View Details",
      backToProjects: "Back to Projects",
      aboutProject: "About This Project",
      techStack: "Tech Stack",
      keyFeatures: "Key Features",
      getStarted: "Get Started",
      techStackMarquee: "Tech stack",
      projectNotFound: "Project Not Found",
      projectMetaKeyword: "Web Development Project",
      lastUpdatedLabel: "Last updated:",
      problem: "Problem",
      solution: "Solution",
      result: "Result",
      keyMetrics: "Key Metrics",
      projectGallery: "Project Gallery",
    },
    aboutPage: {
      currentlyLearningLabel: "Currently Learning",
      focusLabel: "Focused On",
      currentlyLearning: ["Next.js 16", "AI Agents", "System Design"],
      focusAreas: ["Full-Stack Engineering", "AI Integration", "Scalable Architectures"],
    },
    mobileHireBar: {
      label: "Available for hire — Let's talk",
      href: "/contact",
    },
    pageTitles: {
      homeSuffix: "Full-Stack Developer Portfolio",
      contactSuffix: "Hire Web Developer",
      aboutSuffix: "Web Developer",
      servicesTitle: "Web Development Services",
      projectsSuffix: "Portfolio",
      skillsPrefix: "Skills",
      experiencePrefix: "Experience",
      projectByPrefix: "Project by",
      privacyDescription: "Privacy policy for {name}'s portfolio website.",
      termsDescription: "Terms and conditions for {name}'s portfolio website.",
    },
    manifest: {
      name: "Yash Trivedi Portfolio",
      shortName: "Yash Trivedi",
      description: "Full-Stack Software Engineer Portfolio",
      backgroundColor: "#020617",
      iconUrl: "/logo.svg",
    },
    heroCode: {
      variableName: "developer",
      availableValue: "true",
    },
    adminLogin: {
      title: "Admin Panel",
      subtitle: "Sign in to manage your portfolio website",
      emailLabel: "Email",
      passwordLabel: "Password",
      emailPlaceholder: "admin@example.com",
      passwordPlaceholder: "Enter your password",
      submitLabel: "Sign In",
      signingInLabel: "Signing in...",
    },
  };
}

export function mergeSiteConfig(partial: Record<string, unknown> | null | undefined): FullSiteConfig {
  const defaults = getDefaultSiteConfig();
  if (!partial) return defaults;

  return {
    ...defaults,
    ...partial,
    seo: { ...defaults.seo, ...(partial.seo as object) },
    hero: { ...defaults.hero, ...(partial.hero as object) },
    homeSections: { ...defaults.homeSections, ...(partial.homeSections as object) },
    contactPage: {
      ...defaults.contactPage,
      ...(partial.contactPage as object),
      form: {
        ...defaults.contactPage.form,
        ...((partial.contactPage as FullSiteConfig["contactPage"])?.form ?? {}),
      },
    },
    cta: { ...defaults.cta, ...(partial.cta as object) },
    footer: { ...defaults.footer, ...(partial.footer as object) },
    legal: {
      privacyPolicy: {
        ...defaults.legal.privacyPolicy,
        ...((partial.legal as FullSiteConfig["legal"])?.privacyPolicy ?? {}),
      },
      termsAndConditions: {
        ...defaults.legal.termsAndConditions,
        ...((partial.legal as FullSiteConfig["legal"])?.termsAndConditions ?? {}),
      },
    },
    stats: (partial.stats as FullSiteConfig["stats"]) ?? defaults.stats,
    socialLinks: (partial.socialLinks as FullSiteConfig["socialLinks"]) ?? defaults.socialLinks,
    navLinks: (partial.navLinks as FullSiteConfig["navLinks"]) ?? defaults.navLinks,
    aboutSections: (partial.aboutSections as FullSiteConfig["aboutSections"]) ?? defaults.aboutSections,
    aboutPage: { ...defaults.aboutPage, ...(partial.aboutPage as object) },
    mobileHireBar: { ...defaults.mobileHireBar, ...(partial.mobileHireBar as object) },
    navbar: { ...defaults.navbar, ...(partial.navbar as object) },
    pageHeadings: { ...defaults.pageHeadings, ...(partial.pageHeadings as object) },
    experienceSections: (partial.experienceSections as FullSiteConfig["experienceSections"]) ?? defaults.experienceSections,
    buttons: { ...defaults.buttons, ...(partial.buttons as object) },
    pageCta: { ...defaults.pageCta, ...(partial.pageCta as object) },
    notFound: { ...defaults.notFound, ...(partial.notFound as object) },
    labels: { ...defaults.labels, ...(partial.labels as object) },
    pageTitles: { ...defaults.pageTitles, ...(partial.pageTitles as object) },
    manifest: { ...defaults.manifest, ...(partial.manifest as object) },
    heroCode: { ...defaults.heroCode, ...(partial.heroCode as object) },
    adminLogin: { ...defaults.adminLogin, ...(partial.adminLogin as object) },
  };
}
