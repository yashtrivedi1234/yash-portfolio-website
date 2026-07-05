import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApi } from "@/lib/admin-api";

export async function GET() {
  const { error } = await requireAdminApi();
  if (error) return error;
  const testimonials = await prisma.testimonial.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json({ testimonials });
}

export async function POST(request: Request) {
  const { error } = await requireAdminApi();
  if (error) return error;

  const body = await request.json();
  const count = await prisma.testimonial.count();
  const testimonial = await prisma.testimonial.create({
    data: {
      name: body.name,
      role: body.role,
      company: body.company,
      content: body.content,
      avatar: body.avatar ?? "/images/avatars/avatar-1.svg",
      rating: body.rating ?? 5,
      sortOrder: count,
    },
  });
  return NextResponse.json({ testimonial });
}
