import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LinkedInIcon, InstaIcon, WhatsAppIcon } from "./Icons.jsx";
import { WA_LINK } from "../data/constants.js";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubscribe(e) {
    e.preventDefault();

    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }

    navigate(`/contact?email=${encodeURIComponent(trimmed)}#consultation-form`);
  }

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo">
              <span className="logo-mark"><img src="/favicon.png" alt="Vertex Solutions logo" /></span>
              <span className="logo-text"><span className="name">Vertex Solutions</span></span>
            </Link>
            <p>A Tax & Business Advisory and Consulting firm based in Sanganer, Jaipur — supporting founders and enterprises with compliance, registration and subsidy advisory.</p>
            <div className="social-row">
              <a href="#" aria-label="LinkedIn"><LinkedInIcon /></a>
              <a href="#" aria-label="Instagram"><InstaIcon /></a>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><WhatsAppIcon /></a>
            </div>
          </div>

          <div className="footer-col">
            <h5>Quick Links</h5>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/government-subsidy">Government Subsidy</Link></li>
              <li><Link to="/blogs">Blogs</Link></li>
              <li><Link to="/faqs">FAQs</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Services</h5>
            <ul>
              <li><Link to="/tax-advisory">Tax Advisory</Link></li>
              <li><Link to="/gst-services">GST Services</Link></li>
              <li><Link to="/company-registration">Company Registration</Link></li>
              <li><Link to="/startup-india">Startup India</Link></li>
              <li><Link to="/trademark-registration">Trademark Registration</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Stay Updated</h5>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 12 }}>
              Compliance deadlines &amp; scheme updates, occasionally.
            </p>
            <form className="newsletter" onSubmit={handleSubscribe} noValidate>
              <input type="email" placeholder="Your email" value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }} required />
              <button type="submit">Join</button>
            </form>
            {error && (
              <p className="newsletter-note error" role="alert">
                {error}
              </p>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Vertex Solutions. All rights reserved.</span>
          <span style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-conditions">Terms &amp; Conditions</Link>
            <Link to="/sitemap">Sitemap</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
