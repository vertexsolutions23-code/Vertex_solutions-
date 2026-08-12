import { google } from "googleapis";

const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const SHEET_NAME = process.env.GOOGLE_SHEET_NAME || "Leads";

let auth = null;

function getAuth() {
  if (auth) return auth;

  const key = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!SHEET_ID) {
    throw new Error("GOOGLE_SHEET_ID is not set");
  }
  if (!SERVICE_ACCOUNT_EMAIL) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_EMAIL is not set");
  }
  if (!key) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY is not set");
  }

  let raw = key.trim();

  // Support a base64-encoded single-line value (avoids multiline issues in hosts like Render)
  if (!raw.startsWith("{") && !raw.startsWith("-----BEGIN")) {
    try {
      raw = Buffer.from(raw, "base64").toString("utf8").trim();
    } catch {
      // fall through and use the value as-is
    }
  }

  // Support a raw PEM private key (literal "\n" sequences from .env are normalized)
  if (raw.startsWith("-----BEGIN")) {
    const pem = (raw.match(/-----BEGIN PRIVATE KEY-----[\s\S]*?-----END PRIVATE KEY-----/) || [raw])[0];
    auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: SERVICE_ACCOUNT_EMAIL,
        private_key: pem.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    return auth;
  }

  const credentials = JSON.parse(raw);
  if (credentials.client_email && credentials.client_email !== SERVICE_ACCOUNT_EMAIL) {
    throw new Error(
      "GOOGLE_SERVICE_ACCOUNT_EMAIL does not match the JSON key's client_email"
    );
  }

  auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: credentials.client_email || SERVICE_ACCOUNT_EMAIL,
      private_key: credentials.private_key.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return auth;
}

// Google Sheets treats values starting with =, +, -, @ (or with leading
// tabs/CR) as formulas. Strip those prefixes so attacker input can never
// execute formulas like =IMPORTRANGE or =HYPERLINK inside the sheet.
function sanitizeCell(value) {
  const str = String(value ?? "");
  return str.replace(/^[=+\-@\t\r]+/, "").slice(0, 2000);
}

export async function appendLeadToSheet(payload) {
  const now = new Date();

  const row = [
    sanitizeCell(payload.fullName),
    sanitizeCell(payload.email),
    sanitizeCell(payload.mobile),
    sanitizeCell(payload.businessName),
    sanitizeCell(payload.consultation),
    sanitizeCell(payload.message),
    now.toLocaleDateString("en-IN"),
    now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
  ];

  const sheets = google.sheets({ version: "v4", auth: getAuth() });
  const append = () =>
    sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A:H`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [row] },
    });

  try {
    await append();
  } catch (err) {
    // Create the "Leads" tab automatically the first time, then retry
    if (!String(err?.message ?? "").includes("Unable to parse range")) throw err;
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SHEET_ID,
      requestBody: {
        requests: [{ addSheet: { properties: { title: SHEET_NAME } } }],
      },
    });
    await append();
  }
}
