import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApi } from "@/lib/admin-api";
import { mergeSiteConfig } from "@/lib/site-config";

export async function GET() {
  const { error } = await requireAdminApi();
  if (error) return error;

  const settings = await prisma.siteSettings.findUnique({ where: { id: "default" } });
  const data = mergeSiteConfig(settings?.data as Record<string, unknown> | undefined);
  return NextResponse.json({ data });
}

export async function PUT(request: Request) {
  const { error } = await requireAdminApi();
  if (error) return error;

  const data = await request.json();
  const settings = await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: { data },
    create: { id: "default", data },
  });

  return NextResponse.json({ data: settings.data });
}
