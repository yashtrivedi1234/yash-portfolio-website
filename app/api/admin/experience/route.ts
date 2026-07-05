import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApi } from "@/lib/admin-api";

export async function GET() {
  const { error } = await requireAdminApi();
  if (error) return error;
  const items = await prisma.experience.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const { error } = await requireAdminApi();
  if (error) return error;

  const body = await request.json();
  const count = await prisma.experience.count();
  const item = await prisma.experience.create({
    data: {
      title: body.title,
      organization: body.organization,
      location: body.location ?? null,
      period: body.period,
      description: body.description,
      type: body.type ?? "work",
      technologies: body.technologies ?? [],
      sortOrder: count,
    },
  });
  return NextResponse.json({ item });
}
