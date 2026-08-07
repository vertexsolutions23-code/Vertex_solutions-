import nodemailer from "nodemailer";

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  const { EMAIL_USER, EMAIL_PASS } = process.env;
  if (!EMAIL_USER || !EMAIL_PASS) {
    throw new Error(
      "EMAIL_USER and EMAIL_PASS environment variables are required. " +
        "Check your .env file (Gmail requires an App Password, not the normal password)."
    );
  }

  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  return transporter;
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
    from: `"Vertex Solutions Website" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    replyTo: process.env.EMAIL_USER,
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
    from: `"Vertex Solutions Website" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    replyTo: email,
    subject: "New Newsletter Subscription | Vertex Solutions",
    text,
  });
}
