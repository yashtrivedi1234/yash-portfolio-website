import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApi } from "@/lib/admin-api";

export async function GET() {
  const { error } = await requireAdminApi();
  if (error) return error;
  const projects = await prisma.project.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json({ projects });
}

export async function POST(request: Request) {
  const { error } = await requireAdminApi();
  if (error) return error;

  const body = await request.json();
  const count = await prisma.project.count();
  const project = await prisma.project.create({
    data: {
      title: body.title,
      slug: body.slug,
      description: body.description,
      longDescription: body.longDescription ?? body.description,
      image: body.image ?? "/images/projects/ecommerce-dashboard.svg",
      techStack: body.techStack ?? [],
      category: body.category ?? "Web Application",
      year: body.year ?? new Date().getFullYear().toString(),
      status: body.status ?? "Completed",
      featured: body.featured ?? false,
      liveUrl: body.liveUrl ?? "#",
      features: body.features ?? [],
      problem: body.problem || null,
      solution: body.solution || null,
      result: body.result || null,
      metrics: body.metrics ?? null,
      gallery: body.gallery ?? [],
      sortOrder: count,
    },
  });
  return NextResponse.json({ project });
}
