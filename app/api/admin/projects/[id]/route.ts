import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApi } from "@/lib/admin-api";
import { sanitizeProjectPayload } from "@/lib/sanitize-api";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Params) {
  const { error } = await requireAdminApi();
  if (error) return error;

  const { id } = await params;
  const body = sanitizeProjectPayload(await request.json());
  const project = await prisma.project.update({
    where: { id },
    data: {
      title: body.title,
      slug: body.slug,
      description: body.description,
      longDescription: body.longDescription,
      image: body.image,
      techStack: body.techStack,
      category: body.category,
      year: body.year,
      status: body.status,
      featured: body.featured,
      liveUrl: body.liveUrl,
      features: body.features,
      problem: body.problem,
      solution: body.solution,
      result: body.result,
      metrics: body.metrics ?? undefined,
      gallery: body.gallery,
      sortOrder: body.sortOrder,
    },
  });
  return NextResponse.json({ project });
}

export async function DELETE(_request: Request, { params }: Params) {
  const { error } = await requireAdminApi();
  if (error) return error;

  const { id } = await params;
  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
