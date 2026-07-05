import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApi } from "@/lib/admin-api";
import { sanitizeBlogPayload } from "@/lib/sanitize-api";

export async function GET() {
  const { error } = await requireAdminApi();
  if (error) return error;
  const posts = await prisma.blogPost.findMany({
    orderBy: [{ publishedAt: "desc" }, { sortOrder: "asc" }],
  });
  return NextResponse.json({ posts });
}

export async function POST(request: Request) {
  const { error } = await requireAdminApi();
  if (error) return error;

  const body = sanitizeBlogPayload(await request.json());
  if (!body.title || !body.slug) {
    return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
  }

  const count = await prisma.blogPost.count();
  const post = await prisma.blogPost.create({
    data: {
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt,
      content: body.content,
      coverImage: body.coverImage,
      published: body.published,
      publishedAt: body.published ? new Date() : null,
      sortOrder: count,
    },
  });

  return NextResponse.json({ post });
}
