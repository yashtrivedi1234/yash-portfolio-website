import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin-api";
import { sendTestEmail, verifyEmailConnection } from "@/lib/email";

export async function POST() {
  const { error } = await requireAdminApi();
  if (error) return error;

  const verification = await verifyEmailConnection();
  if (!verification.ok) {
    return NextResponse.json(
      { ok: false, error: verification.error ?? "SMTP connection failed" },
      { status: 400 }
    );
  }

  const result = await sendTestEmail();
  if (!result.sent) {
    return NextResponse.json(
      { ok: false, error: result.reason ?? "Failed to send test email" },
      { status: 400 }
    );
  }

  return NextResponse.json({
    ok: true,
    message: `Test email sent to ${result.to}`,
  });
}
