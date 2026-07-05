import { PrismaClient } from "@prisma/client";
import { blogPosts } from "../data/blog";

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < blogPosts.length; i++) {
    const post = blogPosts[i];
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage ?? null,
        published: true,
        publishedAt: new Date(post.publishedAt),
        sortOrder: i,
      },
      create: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage ?? null,
        published: true,
        publishedAt: new Date(post.publishedAt),
        sortOrder: i,
      },
    });
  }

  console.log(`Seeded ${blogPosts.length} blog posts.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
