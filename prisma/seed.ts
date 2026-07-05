import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { getDefaultSiteConfig } from "../lib/site-config";
import { projects } from "../data/projects";
import { services } from "../data/services";
import { skillCategories, techStackStrip } from "../data/skills";
import { experienceItems } from "../data/experience";
import { testimonials } from "../data/testimonials";
import { faqs } from "../data/faqs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "yashtrivedi.contact@gmail.com";
  const password = process.env.ADMIN_PASSWORD ?? "admin123";
  const name = process.env.ADMIN_NAME ?? "Yash Trivedi";

  await prisma.admin.upsert({
    where: { email },
    update: { name, avatarUrl: "/images/profile.png" },
    create: {
      email,
      name,
      avatarUrl: "/images/profile.png",
      passwordHash: await bcrypt.hash(password, 12),
    },
  });

  const siteConfig = getDefaultSiteConfig();

  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: { data: siteConfig as object },
    create: { id: "default", data: siteConfig as object },
  });

  await prisma.project.deleteMany();
  await prisma.project.createMany({
    data: projects.map((p, i) => ({
      title: p.title,
      slug: p.slug,
      description: p.description,
      longDescription: p.longDescription,
      image: p.image,
      techStack: p.techStack,
      category: p.category,
      year: p.year,
      status: p.status,
      featured: p.featured,
      liveUrl: p.liveUrl,
      features: p.features,
      sortOrder: i,
    })),
  });

  await prisma.service.deleteMany();
  await prisma.service.createMany({
    data: services.map((s, i) => ({
      title: s.title,
      description: s.description,
      icon: s.icon,
      benefits: s.benefits,
      sortOrder: i,
    })),
  });

  await prisma.skillCategory.deleteMany();
  for (let i = 0; i < skillCategories.length; i++) {
    const cat = skillCategories[i];
    await prisma.skillCategory.create({
      data: {
        category: cat.category,
        description: cat.description,
        sortOrder: i,
        skills: {
          create: cat.skills.map((s, j) => ({
            name: s.name,
            level: 0,
            sortOrder: j,
          })),
        },
      },
    });
  }

  await prisma.experience.deleteMany();
  await prisma.experience.createMany({
    data: experienceItems.map((e, i) => ({
      title: e.title,
      organization: e.organization,
      location: e.location ?? null,
      period: e.period,
      description: e.description,
      type: e.type,
      technologies: e.technologies ?? [],
      sortOrder: i,
    })),
  });

  await prisma.testimonial.deleteMany();
  await prisma.testimonial.createMany({
    data: testimonials.map((t, i) => ({
      name: t.name,
      role: t.role,
      company: t.company,
      content: t.content,
      avatar: t.avatar,
      rating: t.rating,
      sortOrder: i,
    })),
  });

  await prisma.faq.deleteMany();
  await prisma.faq.createMany({
    data: faqs.map((f, i) => ({
      question: f.question,
      answer: f.answer,
      sortOrder: i,
    })),
  });

  await prisma.techStackItem.deleteMany();
  await prisma.techStackItem.createMany({
    data: techStackStrip.map((item, i) => ({ name: item.name, sortOrder: i })),
  });

  console.log("Database seeded successfully!");
  console.log(`Admin login: ${email} / ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
