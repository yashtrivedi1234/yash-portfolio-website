import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApi } from "@/lib/admin-api";
import { sanitizeInput } from "@/lib/character-rules";
import { sanitizeSkillCategoryPayload } from "@/lib/sanitize-api";

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

  const raw = await request.json();
  const body = sanitizeSkillCategoryPayload(raw);
  const count = await prisma.skillCategory.count();
  const category = await prisma.skillCategory.create({
    data: {
      category: body.category,
      description: body.description,
      sortOrder: count,
      skills: raw.skills?.length
        ? {
            create: raw.skills.map((s: { name: string }, i: number) => ({
              name: sanitizeInput("techName", String(s.name)),
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
