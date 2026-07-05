import { isValidEmail, sanitizeInput, type InputFieldType } from "@/lib/character-rules";

const FIELD_TYPES: Record<string, InputFieldType> = {
  name: "personName",
  role: "title",
  shortBio: "longText",
  longBio: "longText",
  email: "email",
  phone: "phone",
  location: "shortText",
  resumeLink: "url",
  github: "url",
  linkedin: "url",
  leetcode: "url",
  portfolioUrl: "url",
  availability: "shortText",
  title: "title",
  description: "longText",
  content: "longText",
  question: "shortText",
  answer: "longText",
  slug: "slug",
  category: "shortText",
  year: "year",
  liveUrl: "url",
  image: "url",
  ogImage: "url",
  favicon: "url",
  profileImage: "url",
  iconUrl: "url",
  avatarUrl: "url",
  logo: "url",
  themeColor: "hexColor",
  backgroundColor: "hexColor",
  href: "path",
  icon: "iconKey",
  builtWith: "shortText",
  badgeText: "shortText",
  greetingPrefix: "shortText",
  roleConnector: "shortText",
  headlineSuffix: "shortText",
  extraBio: "longText",
  codeWindowTitle: "shortText",
  variableName: "iconKey",
  availableValue: "shortText",
  label: "shortText",
  value: "metricLine",
  lastUpdated: "shortText",
  contactInfoHeading: "shortText",
  connectHeading: "shortText",
  emailLabel: "shortText",
  phoneLabel: "shortText",
  locationLabel: "shortText",
  responseTimeLabel: "shortText",
  responseTime: "shortText",
  timezoneLabel: "shortText",
  timezone: "shortText",
  nameLabel: "shortText",
  subjectLabel: "shortText",
  messageLabel: "shortText",
  namePlaceholder: "shortText",
  emailPlaceholder: "shortText",
  subjectPlaceholder: "shortText",
  messagePlaceholder: "shortText",
  submitLabel: "shortText",
  sendingLabel: "shortText",
  successMessage: "longText",
  errorMessage: "longText",
  primaryLabel: "shortText",
  primaryHref: "path",
  secondaryLabel: "shortText",
  secondaryHref: "path",
  pagesHeading: "shortText",
  legalHeading: "shortText",
  copyrightSuffix: "shortText",
  hireMeLabel: "shortText",
  hireMeHref: "path",
  adminLoginLabel: "shortText",
  adminLoginHref: "path",
  viewMyWork: "shortText",
  contactMe: "shortText",
  downloadResume: "shortText",
  learnMoreAboutMe: "shortText",
  viewSkills: "shortText",
  viewAllProjects: "shortText",
  viewAllServices: "shortText",
  viewFullExperience: "shortText",
  viewProjects: "shortText",
  getInTouch: "shortText",
  skillsOverview: "shortText",
  goHome: "shortText",
  errorCode: "shortText",
  organization: "shortText",
  period: "shortText",
  benefits: "longText",
  author: "shortText",
  publisher: "shortText",
  shortName: "shortText",
  key: "iconKey",
  passwordLabel: "shortText",
  subtitle: "shortText",
  signingInLabel: "shortText",
};

const ARRAY_STRING_TYPES: Record<string, InputFieldType> = {
  keywords: "techName",
  codeSkills: "techName",
};

function fieldType(key: string): InputFieldType {
  return FIELD_TYPES[key] ?? "shortText";
}

export function sanitizeDeepConfig<T>(value: T): T {
  if (value === null || value === undefined) return value;

  if (typeof value === "string") {
    return sanitizeInput("shortText", value) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeDeepConfig(item)) as T;
  }

  if (typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
      if (typeof val === "string") {
        out[key] = sanitizeInput(fieldType(key), val);
      } else if (Array.isArray(val) && val.every((v) => typeof v === "string")) {
        const arrayType = ARRAY_STRING_TYPES[key] ?? "shortText";
        out[key] = val.map((v) => sanitizeInput(arrayType, String(v)));
      } else {
        out[key] = sanitizeDeepConfig(val);
      }
    }
    return out as T;
  }

  return value;
}

export function deepMerge(
  base: Record<string, unknown>,
  patch: Record<string, unknown>
): Record<string, unknown> {
  const out: Record<string, unknown> = { ...base };
  for (const [key, val] of Object.entries(patch)) {
    if (
      val &&
      typeof val === "object" &&
      !Array.isArray(val) &&
      typeof out[key] === "object" &&
      out[key] &&
      !Array.isArray(out[key])
    ) {
      out[key] = deepMerge(
        out[key] as Record<string, unknown>,
        val as Record<string, unknown>
      );
    } else if (val !== undefined) {
      out[key] = val;
    }
  }
  return out;
}

export function sanitizeContactPayload(body: Record<string, unknown>) {
  const name = sanitizeInput("personName", String(body.name ?? ""));
  const email = sanitizeInput("email", String(body.email ?? ""));
  const subject = sanitizeInput("shortText", String(body.subject ?? ""));
  const message = sanitizeInput("longText", String(body.message ?? ""));

  if (!name || !email || !subject || !message) {
    throw new Error("All fields are required");
  }
  if (!isValidEmail(email)) {
    throw new Error("Invalid email address");
  }

  return { name, email, subject, message };
}

export function sanitizeLoginPayload(body: Record<string, unknown>) {
  return {
    email: sanitizeInput("email", String(body.email ?? "")),
    password: sanitizeInput("password", String(body.password ?? "")),
  };
}

export function sanitizeProjectPayload(body: Record<string, unknown>) {
  return {
    image: sanitizeInput("url", String(body.image ?? "")),
    liveUrl: sanitizeInput("url", String(body.liveUrl ?? "")),
  };
}

export function projectDbDefaults(count: number, slug?: string) {
  const id = count + 1;
  return {
    title: `Project ${id}`,
    slug: slug ?? `project-${id}-${Date.now()}`,
    description: "",
    longDescription: "",
    techStack: [] as string[],
    category: "",
    year: "",
    status: "Completed",
    featured: false,
    features: [] as string[],
    problem: null,
    solution: null,
    result: null,
    metrics: undefined,
    gallery: [] as string[],
  };
}

export function sanitizeFaqPayload(body: Record<string, unknown>) {
  return {
    question: sanitizeInput("shortText", String(body.question ?? "")),
    answer: sanitizeInput("longText", String(body.answer ?? "")),
  };
}

export function sanitizeTestimonialPayload(body: Record<string, unknown>) {
  return {
    name: sanitizeInput("personName", String(body.name ?? "")),
    role: sanitizeInput("title", String(body.role ?? "")),
    company: sanitizeInput("shortText", String(body.company ?? "")),
    content: sanitizeInput("longText", String(body.content ?? "")),
    avatar: sanitizeInput("url", String(body.avatar ?? "/images/avatars/avatar-1.svg")),
    rating: typeof body.rating === "number" ? Math.min(5, Math.max(1, body.rating)) : 5,
    sortOrder: typeof body.sortOrder === "number" ? body.sortOrder : undefined,
  };
}

export function sanitizeExperiencePayload(body: Record<string, unknown>) {
  const technologies = body.technologies;
  return {
    title: sanitizeInput("title", String(body.title ?? "")),
    organization: sanitizeInput("shortText", String(body.organization ?? "")),
    location: body.location ? sanitizeInput("shortText", String(body.location)) : null,
    period: sanitizeInput("shortText", String(body.period ?? "")),
    description: sanitizeInput("longText", String(body.description ?? "")),
    type: sanitizeInput("shortText", String(body.type ?? "work")),
    technologies: Array.isArray(technologies)
      ? technologies.map((t) => sanitizeInput("techName", String(t)))
      : typeof technologies === "string"
        ? technologies.split(",").map((t) => sanitizeInput("techName", t.trim())).filter(Boolean)
        : [],
    sortOrder: typeof body.sortOrder === "number" ? body.sortOrder : undefined,
  };
}

export function sanitizeServicePayload(body: Record<string, unknown>) {
  const benefits = body.benefits;
  return {
    title: sanitizeInput("title", String(body.title ?? "")),
    description: sanitizeInput("longText", String(body.description ?? "")),
    icon: sanitizeInput("iconKey", String(body.icon ?? "globe")),
    benefits: Array.isArray(benefits)
      ? benefits.map((b) => sanitizeInput("shortText", String(b)))
      : typeof benefits === "string"
        ? benefits.split("\n").map((b) => sanitizeInput("shortText", b.trim())).filter(Boolean)
        : [],
    sortOrder: typeof body.sortOrder === "number" ? body.sortOrder : undefined,
  };
}

export function sanitizeSkillCategoryPayload(body: Record<string, unknown>) {
  return {
    category: sanitizeInput("shortText", String(body.category ?? "")),
    description: sanitizeInput("longText", String(body.description ?? "")),
    sortOrder: typeof body.sortOrder === "number" ? body.sortOrder : undefined,
  };
}

export function sanitizeSkillPayload(body: Record<string, unknown>) {
  return {
    name: sanitizeInput("techName", String(body.name ?? "")),
    categoryId: String(body.categoryId ?? ""),
    sortOrder: typeof body.sortOrder === "number" ? body.sortOrder : undefined,
  };
}

export function sanitizeTechStackPayload(body: Record<string, unknown>) {
  return {
    name: sanitizeInput("techName", String(body.name ?? "")),
    logo: body.logo ? sanitizeInput("url", String(body.logo)) : null,
    sortOrder: typeof body.sortOrder === "number" ? body.sortOrder : undefined,
  };
}

export function sanitizePasswordPayload(body: Record<string, unknown>) {
  return {
    currentPassword: sanitizeInput("password", String(body.currentPassword ?? "")),
    newPassword: sanitizeInput("password", String(body.newPassword ?? "")),
  };
}

export function sanitizeProfilePayload(body: Record<string, unknown>) {
  return {
    name: body.name ? sanitizeInput("personName", String(body.name)) : undefined,
    avatarUrl: body.avatarUrl ? sanitizeInput("url", String(body.avatarUrl)) : undefined,
  };
}
