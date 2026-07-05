import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApi } from "@/lib/admin-api";

export async function POST(request: Request) {
  const { error } = await requireAdminApi();
  if (error) return error;

  const body = await request.json();
  const count = await prisma.skill.count({ where: { categoryId: body.categoryId } });
  const skill = await prisma.skill.create({
    data: {
      name: body.name,
      level: 0,
      categoryId: body.categoryId,
      sortOrder: count,
    },
  });
  return NextResponse.json({ skill });
}
