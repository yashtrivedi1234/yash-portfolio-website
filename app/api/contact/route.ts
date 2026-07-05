import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendContactAutoReply, sendContactNotification } from "@/lib/email";
import { sanitizeContactPayload } from "@/lib/sanitize-api";

export async function POST(request: Request) {
  try {
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

    try {
      await Promise.all([
        sendContactNotification(payload),
        sendContactAutoReply(payload),
      ]);
    } catch (emailError) {
      console.error("Email delivery failed:", emailError);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
