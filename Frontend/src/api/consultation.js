const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

export async function submitConsultation(payload) {
  const res = await fetch(`${API_BASE}/api/consultation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Something went wrong. Please try again later.");
  }

  return data;
}
