import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApi } from "@/lib/admin-api";
import { sanitizeTestimonialPayload } from "@/lib/sanitize-api";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Params) {
  const { error } = await requireAdminApi();
  if (error) return error;

  const { id } = await params;
  const body = sanitizeTestimonialPayload(await request.json());
  const testimonial = await prisma.testimonial.update({
    where: { id },
    data: {
      name: body.name,
      role: body.role,
      company: body.company,
      content: body.content,
      avatar: body.avatar,
      rating: body.rating,
      sortOrder: body.sortOrder,
    },
  });
  return NextResponse.json({ testimonial });
}

export async function DELETE(_request: Request, { params }: Params) {
  const { error } = await requireAdminApi();
  if (error) return error;

  const { id } = await params;
  await prisma.testimonial.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
