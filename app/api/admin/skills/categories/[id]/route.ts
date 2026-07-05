import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApi } from "@/lib/admin-api";
import { sanitizeSkillCategoryPayload } from "@/lib/sanitize-api";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Params) {
  const { error } = await requireAdminApi();
  if (error) return error;

  const { id } = await params;
  const body = sanitizeSkillCategoryPayload(await request.json());
  const category = await prisma.skillCategory.update({
    where: { id },
    data: { category: body.category, description: body.description, sortOrder: body.sortOrder },
    include: { skills: true },
  });
  return NextResponse.json({ category });
}

export async function DELETE(_request: Request, { params }: Params) {
  const { error } = await requireAdminApi();
  if (error) return error;

  const { id } = await params;
  await prisma.skillCategory.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
