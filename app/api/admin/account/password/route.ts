import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApi } from "@/lib/admin-api";
import { hashPassword, verifyPassword } from "@/lib/auth";
import { sanitizePasswordPayload } from "@/lib/sanitize-api";

export async function PUT(request: Request) {
  const { error, session } = await requireAdminApi();
  if (error) return error;

  const { currentPassword, newPassword } = sanitizePasswordPayload(await request.json());

  if (!currentPassword || !newPassword || newPassword.length < 6) {
    return NextResponse.json({ error: "New password must be at least 6 characters" }, { status: 400 });
  }

  const admin = await prisma.admin.findUnique({ where: { id: session!.adminId } });
  if (!admin || !(await verifyPassword(currentPassword, admin.passwordHash))) {
    return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 });
  }

  await prisma.admin.update({
    where: { id: admin.id },
    data: { passwordHash: await hashPassword(newPassword) },
  });

  return NextResponse.json({ success: true });
}
