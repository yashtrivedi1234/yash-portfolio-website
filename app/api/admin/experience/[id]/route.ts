import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApi } from "@/lib/admin-api";
import { sanitizeExperiencePayload } from "@/lib/sanitize-api";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Params) {
  const { error } = await requireAdminApi();
  if (error) return error;

  const { id } = await params;
  const body = sanitizeExperiencePayload(await request.json());
  const item = await prisma.experience.update({
    where: { id },
    data: {
      title: body.title,
      organization: body.organization,
      location: body.location,
      period: body.period,
      description: body.description,
      type: body.type,
      technologies: body.technologies,
      sortOrder: body.sortOrder,
    },
  });
  return NextResponse.json({ item });
}

export async function DELETE(_request: Request, { params }: Params) {
  const { error } = await requireAdminApi();
  if (error) return error;

  const { id } = await params;
  await prisma.experience.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
