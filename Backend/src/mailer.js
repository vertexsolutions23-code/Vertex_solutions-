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

  return getTransporter().sendMail({
    from: `"Vertex Solutions Website" <${getFromAddress()}>`,
    to: getAdminAddress(),
    replyTo: payload.email || getFromAddress(),
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

  return getTransporter().sendMail({
    from: `"Vertex Solutions Website" <${getFromAddress()}>`,
    to: getAdminAddress(),
    replyTo: email,
    subject: "New Newsletter Subscription | Vertex Solutions",
    text,
  });
}