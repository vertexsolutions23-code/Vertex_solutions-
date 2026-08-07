import "dotenv/config";
import express from "express";
import cors from "cors";
import consultationRouter from "./src/routes/consultation.js";
import newsletterRouter from "./src/routes/newsletter.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "32kb" }));

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
  console.error("Unexpected error:", err);
  res.status(500).json({ success: false, message: "Something went wrong. Please try again later." });
});

app.listen(PORT, () => {
  console.log(`Vertex Solutions backend running on http://localhost:${PORT}`);
});
