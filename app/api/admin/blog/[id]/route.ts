import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApi } from "@/lib/admin-api";
import { sanitizeBlogPayload } from "@/lib/sanitize-api";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Params) {
  const { error } = await requireAdminApi();
  if (error) return error;

  const { id } = await params;
  const body = sanitizeBlogPayload(await request.json());
  const existing = await prisma.blogPost.findUnique({ where: { id } });

  const post = await prisma.blogPost.update({
    where: { id },
    data: {
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt,
      content: body.content,
      coverImage: body.coverImage,
      published: body.published,
      publishedAt:
        body.published && !existing?.publishedAt
          ? new Date()
          : body.published
            ? existing?.publishedAt
            : null,
      sortOrder: body.sortOrder,
    },
  });

  return NextResponse.json({ post });
}

export async function DELETE(_request: Request, { params }: Params) {
  const { error } = await requireAdminApi();
  if (error) return error;

  const { id } = await params;
  await prisma.blogPost.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
