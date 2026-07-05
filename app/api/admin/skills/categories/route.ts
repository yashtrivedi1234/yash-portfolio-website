import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApi } from "@/lib/admin-api";

export async function GET() {
  const { error } = await requireAdminApi();
  if (error) return error;

  const categories = await prisma.skillCategory.findMany({
    include: { skills: { orderBy: { sortOrder: "asc" } } },
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json({ categories });
}

export async function POST(request: Request) {
  const { error } = await requireAdminApi();
  if (error) return error;

  const body = await request.json();
  const count = await prisma.skillCategory.count();
  const category = await prisma.skillCategory.create({
    data: {
      category: body.category,
      description: body.description ?? "",
      sortOrder: count,
      skills: body.skills?.length
        ? {
            create: body.skills.map((s: { name: string }, i: number) => ({
              name: s.name,
              level: 0,
              sortOrder: i,
            })),
          }
        : undefined,
    },
    include: { skills: true },
  });
  return NextResponse.json({ category });
}
