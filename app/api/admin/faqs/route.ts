import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApi } from "@/lib/admin-api";
import { sanitizeFaqPayload } from "@/lib/sanitize-api";

export async function GET() {
  const { error } = await requireAdminApi();
  if (error) return error;
  const faqs = await prisma.faq.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json({ faqs });
}

export async function POST(request: Request) {
  const { error } = await requireAdminApi();
  if (error) return error;

  const body = sanitizeFaqPayload(await request.json());
  const count = await prisma.faq.count();
  const faq = await prisma.faq.create({
    data: {
      question: body.question,
      answer: body.answer,
      sortOrder: count,
    },
  });
  return NextResponse.json({ faq });
}
