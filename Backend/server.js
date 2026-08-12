import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import consultationRouter from "./src/routes/consultation.js";
import newsletterRouter from "./src/routes/newsletter.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Correct client IPs when running behind Render/Vercel proxies (required for
// accurate per-IP rate limiting).
app.set("trust proxy", 1);

app.use(helmet());
app.use(
  cors({
    origin: [
      "https://www.rajasthanservices.com",
      "https://rajasthanservices.com",
      "https://vertex-solutions-d2v6.onrender.com",
      /^http:\/\/localhost(:\d+)?$/,
    ],
  })
);
app.use(express.json({ limit: "32kb" }));

const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests. Please try again later." },
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", consultationRouter);
app.use("/api", newsletterRouter);

app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Not found" });
});

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error("Unexpected error:", err.message || err);
  res.status(500).json({ success: false, message: "Something went wrong. Please try again later." });
});

app.listen(PORT, () => {
  console.log(`Vertex Solutions backend running on http://localhost:${PORT}`);
});