import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApi } from "@/lib/admin-api";
import { sanitizeTechStackPayload } from "@/lib/sanitize-api";

export async function GET() {
  const { error } = await requireAdminApi();
  if (error) return error;
  const items = await prisma.techStackItem.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const { error } = await requireAdminApi();
  if (error) return error;

  const body = sanitizeTechStackPayload(await request.json());
  const count = await prisma.techStackItem.count();
  const item = await prisma.techStackItem.create({
    data: {
      name: body.name,
      logo: body.logo,
      sortOrder: count,
    },
  });
  return NextResponse.json({ item });
}
