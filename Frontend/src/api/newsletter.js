const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

export async function submitNewsletter(email) {
  const res = await fetch(`${API_BASE}/api/newsletter`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Something went wrong. Please try again later.");
  }

  return data;
}