import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApi } from "@/lib/admin-api";
import { sanitizeProjectPayload } from "@/lib/sanitize-api";

export async function GET() {
  const { error } = await requireAdminApi();
  if (error) return error;
  const projects = await prisma.project.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json({ projects });
}

export async function POST(request: Request) {
  const { error } = await requireAdminApi();
  if (error) return error;

  const body = sanitizeProjectPayload(await request.json());
  const count = await prisma.project.count();
  const project = await prisma.project.create({
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
      sortOrder: count,
    },
  });
  return NextResponse.json({ project });
}
