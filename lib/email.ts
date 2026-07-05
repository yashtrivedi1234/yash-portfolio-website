import nodemailer from "nodemailer";

export interface ContactEmailPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return {
    host,
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    auth: { user, pass },
  };
}

function getTransporter() {
  const config = getSmtpConfig();
  if (!config) return null;
  return nodemailer.createTransport(config);
}

export function isEmailConfigured() {
  return getSmtpConfig() !== null;
}

export async function sendContactNotification(payload: ContactEmailPayload) {
  const transporter = getTransporter();
  if (!transporter) return { sent: false, reason: "SMTP not configured" };

  const from = process.env.SMTP_FROM ?? process.env.SMTP_USER!;
  const to = process.env.SMTP_TO ?? process.env.SMTP_USER!;

  await transporter.sendMail({
    from,
    to,
    replyTo: payload.email,
    subject: `[Portfolio Contact] ${payload.subject}`,
    text: [
      `New contact form submission`,
      ``,
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Subject: ${payload.subject}`,
      ``,
      `Message:`,
      payload.message,
    ].join("\n"),
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #7c3aed;">New Contact Form Submission</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #64748b;">Name</td><td style="padding: 8px 0;"><strong>${escapeHtml(payload.name)}</strong></td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;">Email</td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(payload.email)}">${escapeHtml(payload.email)}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;">Subject</td><td style="padding: 8px 0;">${escapeHtml(payload.subject)}</td></tr>
        </table>
        <div style="margin-top: 20px; padding: 16px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #7c3aed;">
          <p style="margin: 0; white-space: pre-wrap; color: #334155;">${escapeHtml(payload.message)}</p>
        </div>
      </div>
    `,
  });

  return { sent: true };
}

export async function sendContactAutoReply(payload: ContactEmailPayload) {
  const transporter = getTransporter();
  if (!transporter) return { sent: false, reason: "SMTP not configured" };

  const from = process.env.SMTP_FROM ?? process.env.SMTP_USER!;

  await transporter.sendMail({
    from,
    to: payload.email,
    subject: "Thanks for reaching out — Yash Trivedi",
    text: [
      `Hi ${payload.name},`,
      ``,
      `Thank you for contacting me! I've received your message regarding "${payload.subject}" and will get back to you as soon as possible.`,
      ``,
      `Best regards,`,
      `Yash Trivedi`,
      `Full-Stack Software Engineer`,
    ].join("\n"),
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #7c3aed;">Thanks for reaching out!</h2>
        <p>Hi <strong>${escapeHtml(payload.name)}</strong>,</p>
        <p>Thank you for contacting me! I've received your message regarding <strong>"${escapeHtml(payload.subject)}"</strong> and will get back to you as soon as possible.</p>
        <p style="color: #64748b;">Best regards,<br><strong>Yash Trivedi</strong><br>Full-Stack Software Engineer</p>
      </div>
    `,
  });

  return { sent: true };
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendTestEmail() {
  const transporter = getTransporter();
  if (!transporter) return { sent: false, reason: "SMTP not configured" };

  const from = process.env.SMTP_FROM ?? process.env.SMTP_USER!;
  const to = process.env.SMTP_TO ?? process.env.SMTP_USER!;

  await transporter.sendMail({
    from,
    to,
    subject: "[Portfolio] SMTP test email",
    text: "Your portfolio SMTP settings are working correctly.",
    html: `<p>Your portfolio <strong>SMTP settings are working correctly</strong>.</p>`,
  });

  return { sent: true, to };
}

export async function verifyEmailConnection() {
  const transporter = getTransporter();
  if (!transporter) return { ok: false, error: "SMTP not configured" };

  try {
    await transporter.verify();
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Verification failed" };
  }
}
