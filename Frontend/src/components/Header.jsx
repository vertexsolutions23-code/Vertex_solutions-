import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { GOOGLE_FORM_URL, PHONE_TEL } from "../data/constants.js";

const MEGA_ITEMS = [
  ["/tax-advisory", "Tax Advisory", "Income tax, TDS, PAN/TAN & accounting"],
  ["/gst-services", "GST Services", "Registration, returns & consultancy"],
  ["/company-registration", "Company Registration", "Pvt Ltd, LLP, Partnership, MSME, ROC"],
  ["/startup-india", "Startup India", "DPIIT recognition & funding readiness"],
  ["/trademark-registration", "Trademark Registration", "Brand & IP protection"],
  ["/iso-certification", "ISO Certification", "Quality & process standards"],
  ["/digital-signature-certificate", "Digital Signature (DSC)", "Class 3 DSC issuance"],
  ["/government-subsidy", "Government Subsidy", "Scheme mapping & loan assistance"],
  ["/business-advisory", "Business Advisory", "Structuring & growth planning"],
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header id="site-header" className={scrolled ? "scrolled" : ""}>
      <div className="container">
        <Link to="/" className="logo" onClick={() => setMobileOpen(false)}>
          <span className="logo-mark"><img src="/favicon.svg" alt="Vertex Solutions logo" /></span>
          <span className="logo-text">
            <span className="name">Vertex Solutions</span><br />
            <span className="tag">Tax &amp; Business Advisory</span>
          </span>
        </Link>

        <nav
          className="main-nav"
          style={
            mobileOpen
              ? { display: "flex", position: "fixed", inset: 0, top: 70, background: "rgba(10,11,13,0.98)", flexDirection: "column", alignItems: "flex-start", padding: 30, zIndex: 999, overflowY: "auto" }
              : undefined
          }
        >
          <ul style={mobileOpen ? { flexDirection: "column", alignItems: "flex-start", gap: 4, width: "100%" } : undefined}>
            <li><NavLink to="/about" onClick={() => setMobileOpen(false)}>About</NavLink></li>
            <li className="has-mega">
              <NavLink to="/services" onClick={() => setMobileOpen(false)}>Services ▾</NavLink>
              <div className="mega" style={mobileOpen ? { position: "static", opacity: 1, visibility: "visible", transform: "none", width: "100%", marginTop: 6, gridTemplateColumns: "1fr" } : undefined}>
                {MEGA_ITEMS.map(([href, title, desc]) => (
                  <Link key={href} to={href} onClick={() => setMobileOpen(false)}>
                    <span className="t">{title}</span>
                    <span className="d">{desc}</span>
                  </Link>
                ))}
              </div>
            </li>
            <li><NavLink to="/government-subsidy" onClick={() => setMobileOpen(false)}>Subsidy</NavLink></li>
            <li><NavLink to="/blogs" onClick={() => setMobileOpen(false)}>Blogs</NavLink></li>
            <li><NavLink to="/faqs" onClick={() => setMobileOpen(false)}>FAQs</NavLink></li>
            <li><NavLink to="/contact" onClick={() => setMobileOpen(false)}>Contact</NavLink></li>
          </ul>
        </nav>

        <div className="cta-group">
          <a className="btn btn-ghost" href={PHONE_TEL}>Call Now</a>
          <a className="btn btn-gold" href={GOOGLE_FORM_URL}>Free Consultation</a>
          <button className="hamb" aria-label="Menu" onClick={() => setMobileOpen(o => !o)}>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
