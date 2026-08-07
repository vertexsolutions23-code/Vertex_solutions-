import { Router } from "express";
import { sendConsultationEmail } from "../mailer.js";

const CONSULTATION_OPTIONS = [
  "GST Registration",
  "GST Return",
  "Income Tax",
  "Company Incorporation",
  "Startup India Registration",
  "Trademark Registration",
  "ISO Certification",
  "Digital Signature Certificate (DSC)",
  "Business Advisory",
  "Subsidy & Government Loans",
  "Other",
];

const router = Router();

function validate(payload) {
  const errors = {};

  const fullName = String(payload.fullName ?? "").trim();
  const mobile = String(payload.mobile ?? "").trim();
  const businessName = String(payload.businessName ?? "").trim();
  const email = String(payload.email ?? "").trim();
  const consultation = String(payload.consultation ?? "").trim();
  const message = String(payload.message ?? "").trim();

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

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    errors.email = "Enter a valid email address";
  }

  if (!consultation) errors.consultation = "Please select what you need consultation for";
  else if (!CONSULTATION_OPTIONS.includes(consultation)) {
    errors.consultation = "Invalid consultation type";
  }

  if (message.length > 2000) errors.message = "Message must be under 2000 characters";

  return { errors, clean: { fullName, mobile, businessName, email, consultation, message } };
}

router.post("/consultation", async (req, res) => {
  try {
    const { errors, clean } = validate(req.body || {});

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    await sendConsultationEmail(clean);

    return res.status(200).json({
      success: true,
      message: "Request received. Our advisor will contact you shortly.",
    });
  } catch (err) {
    console.error("Consultation email error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong. Please try again later." });
  }
});

export default router;