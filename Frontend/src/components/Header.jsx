import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { GOOGLE_FORM_URL, PHONE_TEL } from "../data/constants.js";

const MEGA_ITEMS = [
  ["/income-tax", "Income Tax", "ITR filing, notices & hearing support"],
  ["/tax-advisory", "Tax Advisory", "Tax planning, TDS & PAN/TAN compliance"],
  ["/accounting", "Accounting", "Bookkeeping, statements & audit support"],
  ["/gst-services", "GST Services", "Registration, returns & consultancy"],
  ["/company-registration", "Company Registration", "Pvt Ltd, LLP, Partnership, MSME, ROC"],
  ["/startup-india", "Startup Registration", "DPIIT recognition & funding readiness"],
  ["/trademark-registration", "Trademark Registration", "Brand & IP protection"],
  ["/iso-certification", "ISO Certification", "Quality & process standards"],
  ["/digital-signature-certificate", "Digital Signature (DSC)", "Class 3 DSC issuance"],
  ["/government-subsidy", "Government Subsidy", "Scheme mapping & loan assistance"],
  ["/business-advisory", "Business Advisory", "Structuring & growth planning"],
  ["/project-report-financing", "Project Report & Financing", "Loan reports, CMA data & financing"],
  ["/corporate-financing", "Corporate Financing", "Debt structuring & lender coordination"],
  ["/investment-insurance", "Investment & Insurance", "SIP, term & medical insurance advisory"],
];

const CALC_ITEMS = [
  ["/calculators/emi", "EMI Calculator", "Loan EMI, interest & total payable"],
  ["/calculators/tax", "Advanced Tax Calculator", "Income tax estimate — old vs new regime"],
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const close = () => setMobileOpen(false);

  return (
    <>
      <header id="site-header" className={scrolled ? "scrolled" : ""}>
        <div className="container">
          <Link to="/" className="logo" onClick={close}>
            <span className="logo-mark"><img src="/favicon.svg" alt="Vertex Solutions logo" /></span>
            <span className="logo-text">
              <span className="name">Vertex Solutions</span><br />
              <span className="tag">Tax &amp; Business Advisory</span>
            </span>
          </Link>

          <nav className="main-nav">
            <ul>
              <li><NavLink to="/about">About</NavLink></li>
              <li className="has-mega">
                <NavLink to="/services">Services ▾</NavLink>
                <div className="mega services">
                  {MEGA_ITEMS.map(([href, title, desc]) => (
                    <Link key={href} to={href}>
                      <span className="t">{title}</span>
                      <span className="d">{desc}</span>
                    </Link>
                  ))}
                </div>
              </li>
              <li><NavLink to="/digital-signature-certificate">DSC</NavLink></li>
              <li><NavLink to="/iso-certification">ISO</NavLink></li>
              <li className="has-mega">
                <span className="nav-trigger">Calculators ▾</span>
                <div className="mega compact">
                  {CALC_ITEMS.map(([href, title, desc]) => (
                    <Link key={href} to={href} onClick={close}>
                      <span className="t">{title}</span>
                      <span className="d">{desc}</span>
                    </Link>
                  ))}
                </div>
              </li>
              <li><NavLink to="/blogs">Blogs</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
          </nav>

          <div className="cta-group">
            <a className="btn btn-ghost" href={PHONE_TEL}>Call Now</a>
            <a className="btn btn-gold" href={GOOGLE_FORM_URL}>Free Consultation</a>
            <button className={`hamb${mobileOpen ? " open" : ""}`} aria-label="Menu" onClick={() => setMobileOpen(o => !o)}>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="mobile-menu">
          <ul>
            <li><NavLink to="/about" onClick={close}>About</NavLink></li>
            <li className="m-sub">
              <span>Services</span>
              <ul>
                {MEGA_ITEMS.map(([href, title, desc]) => (
                  <li key={href}>
                    <Link to={href} onClick={close}>
                      <span className="t">{title}</span>
                      <span className="d">{desc}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li><NavLink to="/digital-signature-certificate" onClick={close}>DSC</NavLink></li>
            <li><NavLink to="/iso-certification" onClick={close}>ISO</NavLink></li>
            <li className="m-sub">
              <span>Calculators</span>
              <ul>
                {CALC_ITEMS.map(([href, title, desc]) => (
                  <li key={href}>
                    <Link to={href} onClick={close}>
                      <span className="t">{title}</span>
                      <span className="d">{desc}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li><NavLink to="/blogs" onClick={close}>Blogs</NavLink></li>
            <li><NavLink to="/contact" onClick={close}>Contact</NavLink></li>
          </ul>
          <div className="mobile-menu-cta">
            <a className="btn btn-gold" href={GOOGLE_FORM_URL}>Free Consultation</a>
          </div>
        </div>
      )}
    </>
  );
}
