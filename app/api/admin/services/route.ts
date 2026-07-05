import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApi } from "@/lib/admin-api";

export async function GET() {
  const { error } = await requireAdminApi();
  if (error) return error;
  const services = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json({ services });
}

export async function POST(request: Request) {
  const { error } = await requireAdminApi();
  if (error) return error;

  const body = await request.json();
  const count = await prisma.service.count();
  const service = await prisma.service.create({
    data: {
      title: body.title,
      description: body.description,
      icon: body.icon ?? "globe",
      benefits: body.benefits ?? [],
      sortOrder: count,
    },
  });
  return NextResponse.json({ service });
}
