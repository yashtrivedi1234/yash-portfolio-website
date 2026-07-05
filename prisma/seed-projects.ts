import { PrismaClient } from "@prisma/client";
import { projects, toProjectDbRow } from "../data/projects";

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < projects.length; i++) {
    const row = toProjectDbRow(projects[i], i);
    await prisma.project.upsert({
      where: { slug: row.slug },
      update: {
        title: row.title,
        image: row.image,
        liveUrl: row.liveUrl,
        sortOrder: row.sortOrder,
        featured: row.featured,
      },
      create: row,
    });
  }

  console.log(`Seeded ${projects.length} projects.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
