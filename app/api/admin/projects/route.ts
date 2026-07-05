import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApi } from "@/lib/admin-api";
import { projectDbDefaults, sanitizeProjectPayload } from "@/lib/sanitize-api";
import { slugify } from "@/lib/utils";

async function uniqueProjectSlug(title: string): Promise<string> {
  const base = slugify(title) || `project-${Date.now()}`;
  let candidate = base;
  let suffix = 2;

  while (await prisma.project.findUnique({ where: { slug: candidate } })) {
    candidate = `${base}-${suffix++}`;
  }

  return candidate;
}

export async function GET() {
  const { error } = await requireAdminApi();
  if (error) return error;
  const rows = await prisma.project.findMany({
    orderBy: { sortOrder: "asc" },
    select: { id: true, title: true, image: true, liveUrl: true },
  });
  return NextResponse.json({ projects: rows });
}

export async function POST(request: Request) {
  const { error } = await requireAdminApi();
  if (error) return error;

  const body = sanitizeProjectPayload(await request.json());
  if (!body.title || !body.image || !body.liveUrl) {
    return NextResponse.json({ error: "Project name, image, and live URL are required" }, { status: 400 });
  }

  const count = await prisma.project.count();
  const slug = await uniqueProjectSlug(body.title);
  const defaults = projectDbDefaults(body.title, slug);
  const project = await prisma.project.create({
    data: {
      ...defaults,
      image: body.image,
      liveUrl: body.liveUrl,
      sortOrder: count,
    },
    select: { id: true, title: true, image: true, liveUrl: true },
  });
  return NextResponse.json({ project });
}
