import { Router } from "express";
import rateLimit from "express-rate-limit";
import { sendNewsletterEmail } from "../mailer.js";

const router = Router();

const subscribeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests. Please try again later." },
});

router.post("/newsletter", subscribeLimiter, async (req, res) => {
  try {
    const email = String(req.body?.email ?? "").trim().toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email address." });
    }

    if (email.length > 254) {
      return res.status(400).json({ success: false, message: "Email address is too long." });
    }

    await sendNewsletterEmail(email);

    return res.status(200).json({
      success: true,
      message: "Thank you for subscribing! Stay tuned for updates.",
    });
  } catch (err) {
    console.error("Newsletter email error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong. Please try again later." });
  }
});

export default router;