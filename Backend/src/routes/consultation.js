import { Router } from "express";
import rateLimit from "express-rate-limit";
import { sendConsultationEmail } from "../mailer.js";
import { appendLeadToSheet } from "../sheets.js";

const CONSULTATION_OPTIONS = [
  "GST Registration",
  "GST Return",
  "Income Tax",
  "Company Incorporation",
  "Startup Registration",
  "Trademark Registration",
  "ISO Certification",
  "Digital Signature Certificate (DSC)",
  "Business Advisory",
  "Subsidy & Government Loans",
  "Investment & Insurance Advisory",
  "Other",
];

const router = Router();

const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests. Please try again later." },
});

function asString(value, max) {
  const str = typeof value === "string" ? value : "";
  return str.trim().slice(0, max);
}

function validate(payload) {
  const errors = {};

  const fullName = asString(payload?.fullName, 120);
  const mobile = asString(payload?.mobile, 20);
  const businessName = asString(payload?.businessName, 200);
  const email = asString(payload?.email, 254);
  const consultation = asString(payload?.consultation, 60);
  const message = asString(payload?.message, 2000);

  if (!fullName) errors.fullName = "Full name is required";
  else if (fullName.length > 120) errors.fullName = "Full name must be under 120 characters";

  if (!mobile) errors.mobile = "Mobile number is required";
  else {
    const digits = mobile.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 13) {
      errors.mobile = "Enter a valid mobile number";
    }
  }

  if (!businessName) errors.businessName = "Business name is required";
  else if (businessName.length > 200) errors.businessName = "Business name must be under 200 characters";

  if (email && (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))) {
    errors.email = "Enter a valid email address";
  }

  if (!consultation) errors.consultation = "Please select what you need consultation for";
  else if (!CONSULTATION_OPTIONS.includes(consultation)) {
    errors.consultation = "Invalid consultation type";
  }

  if (message.length > 2000) errors.message = "Message must be under 2000 characters";

  return { errors, clean: { fullName, mobile: mobile.replace(/\D/g, "").slice(0, 13), businessName, email, consultation, message } };
}

router.post("/consultation", submitLimiter, async (req, res) => {
  try {
    const { errors, clean } = validate(req.body || {});

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const [emailResult, sheetResult] = await Promise.allSettled([
      sendConsultationEmail(clean),
      appendLeadToSheet(clean),
    ]);

    if (sheetResult.status === "rejected") {
      console.error("Google Sheets append error:", sheetResult.reason?.message || sheetResult.reason);
    }

    // Email is the critical path — a Google Sheets failure is logged but
    // must never stop the email from being sent or fail the request.
    if (emailResult.status === "rejected") {
      throw emailResult.reason;
    }

    return res.status(200).json({
      success: true,
      message: "Request received. Our advisor will contact you shortly.",
    });
  } catch (err) {
    console.error("Consultation email error:", err?.message || err);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong. Please try again later." });
  }
});

export default router;