import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApi } from "@/lib/admin-api";

export async function PUT(request: Request) {
  const { error, session } = await requireAdminApi();
  if (error) return error;

  const { name, avatarUrl } = await request.json();

  const admin = await prisma.admin.update({
    where: { id: session!.adminId },
    data: {
      ...(name && { name }),
      ...(avatarUrl && { avatarUrl }),
    },
  });

  return NextResponse.json({
    admin: { name: admin.name, email: admin.email, avatarUrl: admin.avatarUrl },
  });
}
