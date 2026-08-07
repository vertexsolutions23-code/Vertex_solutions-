import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Reveal from "./Reveal.jsx";
import { CardIcon, CheckIcon, DocIcon } from "./Icons.jsx";
import { GOOGLE_FORM_URL, WA_LINK } from "../data/constants.js";
import { breadcrumbLd } from "../data/seo.js";

export function Breadcrumb({ crumbs }) {
  return (
    <div className="breadcrumb">
      {crumbs.map(([label, href], i) => (
        <span key={i} style={{ display: "contents" }}>
          {href ? <Link to={href}>{label}</Link> : <span style={{ color: "var(--gold-light)" }}>{label}</span>}
          {i < crumbs.length - 1 && <span className="sep">/</span>}
        </span>
      ))}
    </div>
  );
}

export function PageHero({ crumbs, title, lead, ctas }) {
  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd(crumbs))}</script>
      </Helmet>
      <section className="page-hero">
        <div className="container">
          <Breadcrumb crumbs={crumbs} />
          <h1 dangerouslySetInnerHTML={{ __html: title }} />
          <p className="lead">{lead}</p>
          {ctas && <div className="hero-actions">{ctas}</div>}
        </div>
      </section>
    </>
  );
}

export function ServiceCtas() {
  return (
    <>
      <a className="btn btn-gold" href={GOOGLE_FORM_URL}>Get Free Consultation</a>
      <a className="btn btn-ghost" href={WA_LINK} target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
    </>
  );
}

export function CtaBanner({ heading, sub }) {
  return (
    <section className="cta-banner">
      <div className="container">
        <h2 dangerouslySetInnerHTML={{ __html: heading }} />
        <p>{sub}</p>
        <div className="hero-actions">
          <a className="btn btn-gold" href={GOOGLE_FORM_URL}>Book Appointment</a>
          <a className="btn btn-ghost" href={WA_LINK} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
        </div>
      </div>
    </section>
  );
}

export function BenefitsGrid({ items }) {
  return (
    <Reveal className="grid-4">
      {items.map(([t, d]) => (
        <div className="feat-card" key={t}>
          <div className="ic"><CardIcon /></div>
          <h4>{t}</h4>
          <p>{d}</p>
        </div>
      ))}
    </Reveal>
  );
}

export function ProcessTimeline({ steps }) {
  return (
    <Reveal className="timeline">
      <div className="timeline-row">
        {steps.map(([t, d], i) => (
          <div className="t-step" key={t}>
            <div className="dot">{i + 1}</div>
            <h4>{t}</h4>
            <p>{d}</p>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

export function DocList({ docs }) {
  return (
    <Reveal className="doc-list">
      {docs.map((d) => (
        <div className="doc-item" key={d}>
          <DocIcon />
          <span>{d}</span>
        </div>
      ))}
    </Reveal>
  );
}

export function ServiceSidebar({ title, blurb, points }) {
  return (
    <Reveal as="div" className="svc-sidebar">
      <h4>{title}</h4>
      <p>{blurb}</p>
      <a className="btn btn-gold" href={GOOGLE_FORM_URL}>Get Free Consultation</a>
      <a className="btn btn-ghost" style={{ width: "100%" }} href={WA_LINK} target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
      <ul>
        {points.map((p) => (
          <li key={p}><CheckIcon />{p}</li>
        ))}
      </ul>
    </Reveal>
  );
}

export function ServiceCard({ to, title, desc }) {
  return (
    <Link to={to} className="service-card">
      <div className="ic"><CardIcon /></div>
      <h4>{title}</h4>
      <p>{desc}</p>
    </Link>
  );
}

export function SectionHead({ eyebrow, title, sub, center = false }) {
  return (
    <Reveal as="div" className={`sec-head${center ? " center" : ""}`} style={center ? { marginLeft: "auto", marginRight: "auto" } : undefined}>
      <div className="eyebrow">{eyebrow}</div>
      <h2>{title}</h2>
      {sub && <p>{sub}</p>}
    </Reveal>
  );
}
