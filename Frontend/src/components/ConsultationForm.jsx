import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckCircleIcon, CloseIcon } from "./Icons.jsx";
import { submitConsultation } from "../api/consultation.js";

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

const EMPTY_FORM = { fullName: "", mobile: "", businessName: "", email: "", consultation: "", message: "" };

const SUCCESS_MESSAGE =
  "Thank you for contacting Vertex Solutions.\nOur business advisor will contact you shortly.";

const ERROR_MESSAGE = "Something went wrong. Please try again later.";

function buildFormFromParams(searchParams) {
  const consultation = searchParams.get("consultation") || "";
  const standard = searchParams.get("service") || "";
  const email = searchParams.get("email") || "";
  return {
    ...EMPTY_FORM,
    consultation: CONSULTATION_OPTIONS.includes(consultation) ? consultation : "",
    email,
    message: standard ? `Interested in ${standard.replace(/-/g, " ")} certification.` : "",
  };
}

function validate(form) {
  const errors = {};

  if (!form.fullName.trim()) errors.fullName = "Please enter your full name";
  if (!form.mobile.trim()) errors.mobile = "Please enter your mobile number";
  else if (form.mobile.replace(/\D/g, "").length < 10) {
    errors.mobile = "Enter a valid 10-digit mobile number";
  }
  if (!form.businessName.trim()) errors.businessName = "Please enter your business name";
  if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
    errors.email = "Please enter a valid email address";
  }
  if (!form.consultation) errors.consultation = "Please select what you need consultation for";

  return errors;
}

export default function ConsultationForm() {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState(() => buildFormFromParams(searchParams));
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    if (!popup) return;
    const onKey = (e) => e.key === "Escape" && setPopup(null);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [popup]);

  useEffect(() => {
    setForm(buildFormFromParams(searchParams));
  }, [searchParams]);

  const setField = (key) => (e) => {
    const value = e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((er) => (er[key] ? { ...er, [key]: undefined } : er));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      await submitConsultation({
        fullName: form.fullName.trim(),
        mobile: form.mobile.trim(),
        businessName: form.businessName.trim(),
        email: form.email.trim(),
        consultation: form.consultation,
        message: form.message.trim(),
      });
      setForm(EMPTY_FORM);
      setPopup({ type: "success", message: SUCCESS_MESSAGE });
    } catch {
      setPopup({ type: "error", message: ERROR_MESSAGE });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="consult-card">
        <form className="consult-form" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="cf-name">Full Name *</label>
            <input
              id="cf-name"
              type="text"
              placeholder="Your full name"
              value={form.fullName}
              onChange={setField("fullName")}
              autoComplete="name"
              maxLength={120}
              aria-invalid={!!errors.fullName}
            />
            {errors.fullName && <span className="err">{errors.fullName}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="cf-mobile">Mobile Number *</label>
            <input
              id="cf-mobile"
              type="tel"
              placeholder="+91 98765 43210"
              value={form.mobile}
              onChange={setField("mobile")}
              autoComplete="tel"
              maxLength={15}
              aria-invalid={!!errors.mobile}
            />
            {errors.mobile && <span className="err">{errors.mobile}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="cf-business">Business Name *</label>
            <input
              id="cf-business"
              type="text"
              placeholder="Your business / company name"
              value={form.businessName}
              onChange={setField("businessName")}
              autoComplete="organization"
              maxLength={200}
              aria-invalid={!!errors.businessName}
            />
            {errors.businessName && <span className="err">{errors.businessName}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="cf-email">Email (Optional)</label>
            <input
              id="cf-email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={setField("email")}
              autoComplete="email"
              maxLength={254}
              aria-invalid={!!errors.email}
            />
            {errors.email && <span className="err">{errors.email}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="cf-consultation">Need Consultation For *</label>
            <select
              id="cf-consultation"
              value={form.consultation}
              onChange={setField("consultation")}
              className={form.consultation ? "" : "placeholder"}
              aria-invalid={!!errors.consultation}
            >
              <option value="" disabled>
                Select a service…
              </option>
              {CONSULTATION_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {errors.consultation && <span className="err">{errors.consultation}</span>}
          </div>

          <div className="form-field full">
            <label htmlFor="cf-message">Message (Optional)</label>
            <textarea
              id="cf-message"
              rows={4}
              placeholder="Tell us briefly about your requirement…"
              value={form.message}
              onChange={setField("message")}
              maxLength={2000}
            />
          </div>

          <div className="submit-row">
            <button className="btn btn-gold btn-submit" type="submit" disabled={submitting}>
              {submitting ? (
                <>
                  <span className="spinner" aria-hidden="true" />
                  Sending…
                </>
              ) : (
                "Get Free Consultation"
              )}
            </button>
          </div>
        </form>
      </div>

      {popup && (
        <div className="modal-overlay" onClick={() => setPopup(null)} role="dialog" aria-modal="true">
          <div className={`modal-card ${popup.type}`} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" aria-label="Close" onClick={() => setPopup(null)}>
              <CloseIcon />
            </button>
            <div className="modal-icon">
              <CheckCircleIcon />
            </div>
            <h3>{popup.type === "success" ? "Request Received" : "Something Went Wrong"}</h3>
            <p>{popup.message}</p>
            <button className="btn btn-gold modal-btn" onClick={() => setPopup(null)}>
              {popup.type === "success" ? "Done" : "Try Again"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
