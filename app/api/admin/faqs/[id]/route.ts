import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApi } from "@/lib/admin-api";
import { sanitizeFaqPayload } from "@/lib/sanitize-api";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Params) {
  const { error } = await requireAdminApi();
  if (error) return error;

  const { id } = await params;
  const body = sanitizeFaqPayload(await request.json());
  const faq = await prisma.faq.update({
    where: { id },
    data: { question: body.question, answer: body.answer },
  });
  return NextResponse.json({ faq });
}

export async function DELETE(_request: Request, { params }: Params) {
  const { error } = await requireAdminApi();
  if (error) return error;

  const { id } = await params;
  await prisma.faq.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
