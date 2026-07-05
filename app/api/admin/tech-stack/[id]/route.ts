import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApi } from "@/lib/admin-api";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Params) {
  const { error } = await requireAdminApi();
  if (error) return error;

  const { id } = await params;
  const body = await request.json();
  const item = await prisma.techStackItem.update({
    where: { id },
    data: { name: body.name, sortOrder: body.sortOrder },
  });
  return NextResponse.json({ item });
}

export async function DELETE(_request: Request, { params }: Params) {
  const { error } = await requireAdminApi();
  if (error) return error;

  const { id } = await params;
  await prisma.techStackItem.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
