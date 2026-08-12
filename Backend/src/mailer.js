import nodemailer from "nodemailer";

let transporter = null;

// Fail fast (instead of hanging for ~2 minutes) when SMTP is unreachable.
const SMTP_TIMEOUTS = {
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 30000,
};

function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST || process.env.EMAIL_HOST;
  const port = Number(process.env.SMTP_PORT || process.env.EMAIL_PORT || 587);
  const user = process.env.SMTP_USER || process.env.EMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS;

  if (host && user && pass) {
    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      ...SMTP_TIMEOUTS,
    });
    return transporter;
  }

  // Legacy Gmail config — still supported so local dev keeps working.
  if (!user || !pass) {
    throw new Error(
      "Email is not configured. Set SMTP_HOST/SMTP_USER/SMTP_PASS (Brevo recommended) " +
        "or EMAIL_USER/EMAIL_PASS (Gmail App Password)."
    );
  }

  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
    ...SMTP_TIMEOUTS,
  });

  return transporter;
}

function getFromAddress() {
  return process.env.MAIL_FROM || process.env.SMTP_USER || process.env.EMAIL_USER;
}

function getAdminAddress() {
  return process.env.ADMIN_EMAIL || getFromAddress();
}

// Brevo REST API — HTTPS, works from any network (SMTP relay can be blocked
// from datacenter IPs, e.g. Render). Used when BREVO_API_KEY is set.
async function sendViaBrevoApi({ to, replyTo, subject, text }) {
  const key = process.env.BREVO_API_KEY;
  const from = process.env.BREVO_FROM || process.env.ADMIN_EMAIL || process.env.SMTP_USER;

  if (!key) {
    throw new Error("BREVO_API_KEY is not set");
  }
  if (!from) {
    throw new Error("BREVO_FROM is not set (use a verified sender in Brevo)");
  }

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": key,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      sender: { email: from },
      to: [{ email: to }],
      replyTo: { email: replyTo },
      subject,
      textContent: text,
    }),
    signal: AbortSignal.timeout(15000),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Brevo API error ${res.status}: ${body.slice(0, 300)}`);
  }
}

// Defense in depth: even if a caller skips route-level validation, user input
// must never reach email headers raw (header-injection guard).
function safeReplyTo(email) {
  const value = String(email ?? "").trim().replace(/[\r\n]+/g, "").slice(0, 254);
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) ? value : getFromAddress();
}

export function sendConsultationEmail(payload) {
  const subject = "New Free Consultation Request | Vertex Solutions";
  const submittedAt = new Date().toLocaleString("en-IN", {
    dateStyle: "full",
    timeStyle: "long",
  });

  const text = [
    "A new consultation request has been received.",
    "----------------------------------------",
    "",
    `Full Name: ${payload.fullName}`,
    `Mobile Number: ${payload.mobile}`,
    `Business Name: ${payload.businessName}`,
    `Email: ${payload.email || "-"}`,
    `Need Consultation For: ${payload.consultation}`,
    `Message: ${payload.message || "-"}`,
    "",
    `Submitted At: ${submittedAt}`,
    "",
    "----------------------------------------",
  ].join("\n");

  if (process.env.BREVO_API_KEY) {
    return sendViaBrevoApi({
      to: getAdminAddress(),
      replyTo: safeReplyTo(payload.email),
      subject,
      text,
    });
  }

  return getTransporter().sendMail({
    from: `"Vertex Solutions Website" <${getFromAddress()}>`,
    to: getAdminAddress(),
    replyTo: safeReplyTo(payload.email),
    subject,
    text,
  });
}

export function sendNewsletterEmail(email) {
  const submittedAt = new Date().toLocaleString("en-IN", {
    dateStyle: "full",
    timeStyle: "long",
  });

  const text = [
    "A new newsletter subscription has been received.",
    "",
    "----------------------------------------",
    "",
    `Email: ${email}`,
    "",
    `Submitted At: ${submittedAt}`,
    "",
    "----------------------------------------",
  ].join("\n");

  if (process.env.BREVO_API_KEY) {
    return sendViaBrevoApi({
      to: getAdminAddress(),
      replyTo: safeReplyTo(email),
      subject: "New Newsletter Subscription | Vertex Solutions",
      text,
    });
  }

  return getTransporter().sendMail({
    from: `"Vertex Solutions Website" <${getFromAddress()}>`,
    to: getAdminAddress(),
    replyTo: safeReplyTo(email),
    subject: "New Newsletter Subscription | Vertex Solutions",
    text,
  });
}