import type { SiteConfig } from "@/lib/site-config";

export function getBreadcrumbLabels(config: SiteConfig) {
  const home = config.navLinks.find((link) => link.href === "/")?.name ?? "Home";

  return {
    home,
    about: config.pageHeadings.about.label ?? "About",
    projects: config.pageHeadings.projects.label ?? "Projects",
    services: config.pageHeadings.services.label ?? "Services",
    skills: config.pageHeadings.skills.label ?? "Skills",
    experience: config.pageHeadings.experience.label ?? "Experience",
    contact: config.contactPage.label ?? "Contact",
    privacy: config.legal.privacyPolicy.title,
    terms: config.legal.termsAndConditions.title,
  };
}

export function formatPageTitleText(template: string, name: string): string {
  return template.replaceAll("{name}", name);
}
