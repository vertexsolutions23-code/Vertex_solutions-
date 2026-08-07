import { Router } from "express";
import { sendNewsletterEmail } from "../mailer.js";

const router = Router();

router.post("/newsletter", async (req, res) => {
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