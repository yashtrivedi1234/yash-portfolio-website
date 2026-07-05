import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendContactAutoReply, sendContactNotification } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    await prisma.contactMessage.create({
      data: { name, email, subject, message },
    });

    const payload = { name, email, subject, message };

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
