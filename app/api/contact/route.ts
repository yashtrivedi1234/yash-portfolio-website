import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendContactAutoReply, sendContactNotification, isEmailConfigured } from "@/lib/email";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { sanitizeContactPayload } from "@/lib/sanitize-api";

const CONTACT_LIMIT = 3;
const CONTACT_WINDOW_MS = 15 * 60 * 1000;

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rate = checkRateLimit(`contact:${ip}`, CONTACT_LIMIT, CONTACT_WINDOW_MS);
    if (!rate.allowed) {
      return NextResponse.json(
        {
          error: `Too many messages. Please try again in ${rate.retryAfterSec} seconds.`,
        },
        { status: 429, headers: { "Retry-After": String(rate.retryAfterSec ?? 60) } }
      );
    }

    const body = await request.json();
    let payload;
    try {
      payload = sanitizeContactPayload(body);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Invalid input";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const { name, email, subject, message } = payload;

    await prisma.contactMessage.create({
      data: { name, email, subject, message },
    });

    const emailConfigured = isEmailConfigured();
    let adminSent = false;
    let userSent = false;

    if (emailConfigured) {
      const [adminResult, userResult] = await Promise.all([
        sendContactNotification(payload).catch(() => ({ sent: false as const })),
        sendContactAutoReply(payload).catch(() => ({ sent: false as const })),
      ]);
      adminSent = adminResult.sent;
      userSent = userResult.sent;
    }

    let warning: string | undefined;
    if (!emailConfigured) {
      warning =
        "Your message was saved, but email is not configured on the server yet. The site owner will still see it in the admin panel.";
    } else if (!adminSent && !userSent) {
      warning =
        "Your message was saved, but confirmation emails could not be sent. Please try again later or email directly.";
    } else if (!userSent) {
      warning =
        "Your message was saved and the owner was notified, but we could not send you a confirmation email.";
    } else if (!adminSent) {
      warning =
        "Your message was saved and you should receive a confirmation email, but the owner notification failed.";
    }

    return NextResponse.json({
      success: true,
      saved: true,
      email: { configured: emailConfigured, adminSent, userSent },
      warning,
    });
  } catch {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
