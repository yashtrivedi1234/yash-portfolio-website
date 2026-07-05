import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApi } from "@/lib/admin-api";
import { projectDbDefaults, sanitizeProjectPayload } from "@/lib/sanitize-api";

export async function GET() {
  const { error } = await requireAdminApi();
  if (error) return error;
  const rows = await prisma.project.findMany({
    orderBy: { sortOrder: "asc" },
    select: { id: true, image: true, liveUrl: true },
  });
  return NextResponse.json({ projects: rows });
}

export async function POST(request: Request) {
  const { error } = await requireAdminApi();
  if (error) return error;

  const body = sanitizeProjectPayload(await request.json());
  if (!body.image || !body.liveUrl) {
    return NextResponse.json({ error: "Image and live URL are required" }, { status: 400 });
  }

  const count = await prisma.project.count();
  const defaults = projectDbDefaults(count);
  const project = await prisma.project.create({
    data: {
      ...defaults,
      image: body.image,
      liveUrl: body.liveUrl,
      sortOrder: count,
    },
    select: { id: true, image: true, liveUrl: true },
  });
  return NextResponse.json({ project });
}
