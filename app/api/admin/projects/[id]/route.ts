import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApi } from "@/lib/admin-api";
import { sanitizeProjectPayload } from "@/lib/sanitize-api";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Params) {
  const { error } = await requireAdminApi();
  if (error) return error;

  const { id } = await params;
  const body = sanitizeProjectPayload(await request.json());
  if (!body.image || !body.liveUrl) {
    return NextResponse.json({ error: "Image and live URL are required" }, { status: 400 });
  }

  const project = await prisma.project.update({
    where: { id },
    data: {
      image: body.image,
      liveUrl: body.liveUrl,
    },
    select: { id: true, image: true, liveUrl: true },
  });
  return NextResponse.json({ project });
}

export async function DELETE(_request: Request, { params }: Params) {
  const { error } = await requireAdminApi();
  if (error) return error;

  const { id } = await params;
  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
