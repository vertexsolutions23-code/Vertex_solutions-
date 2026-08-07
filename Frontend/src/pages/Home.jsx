import { Link } from "react-router-dom";
import Reveal from "../components/Reveal.jsx";
import Counter from "../components/Counter.jsx";
import FaqAccordion from "../components/FaqAccordion.jsx";
import Seo from "../components/Seo.jsx";
import FounderAvatar from "../components/FounderAvatar.jsx";
import { SealIcon, CheckIcon, PinIcon, PhoneIcon, ClockIcon } from "../components/Icons.jsx";
import { ServiceCard, SectionHead, ProcessTimeline, CtaBanner } from "../components/PageBits.jsx";
import { GOOGLE_FORM_URL, ADDRESS, PHONE } from "../data/constants.js";
import { homeServices, industries, testimonials, homeFaqs, processSteps } from "../data/homeData.js";
import { organizationLd, websiteLd, faqLd } from "../data/seo.js";

export default function Home() {
  return (
    <>
      <Seo
        title="Vertex Solutions | Tax Advisory & Business Consulting, Jaipur"
        description="Vertex Solutions, led by CA Abhishek Agarwal, is Jaipur's trusted partner for GST, income tax, company registration, startup India, ISO, trademark and government subsidy advisory."
        path="/"
        jsonLd={[organizationLd(), websiteLd(), faqLd(homeFaqs)]}
      />
      <section className="hero" id="top">
        <div className="hero-glow"></div>
        <div className="container">
          <div className="hero-grid">
            <div className="sr in">
              <div className="eyebrow" style={{ color: "var(--gold-light)" }}>CA-Led Advisory &middot; Jaipur, Rajasthan</div>
              <h1>Compliance made <em>effortless</em>. Growth made <em>possible</em>.</h1>
              <p className="lead">Vertex Solutions is a Tax & Business Advisory and Consulting firm helping founders and enterprises across Jaipur navigate GST, income tax, company registration, and government subsidy schemes — with clarity, speed and complete transparency.</p>
              <div className="hero-actions">
                <a className="btn btn-gold" href={GOOGLE_FORM_URL}>Get Free Consultation</a>
                <Link className="btn btn-ghost-dark" to="/services">Explore Services</Link>
              </div>
              <div className="hero-meta">
                <div><div className="num">20+</div><div className="lbl">Advisory Services</div></div>
                <div><div className="num">500+</div><div className="lbl">Businesses Served</div></div>
                <div><div className="num">10+ yrs</div><div className="lbl">Combined Expertise</div></div>
                <div><div className="num">100%</div><div className="lbl">Transparent Process</div></div>
              </div>
            </div>
            <div className="hero-card sr in">
              <div className="seal"><SealIcon /></div>
              <h3>Talk to Our Tax & Business Advisors</h3>
              <p>A single consultation to map your compliance, registration and subsidy roadmap — no obligation.</p>
              <ul>
                <li><CheckIcon /> Personalised tax &amp; GST review</li>
                <li><CheckIcon /> Eligible subsidy scheme mapping</li>
                <li><CheckIcon /> Clear, upfront documentation list</li>
              </ul>
              <div className="divider"></div>
              <div className="founder">
                <FounderAvatar />
                <div><div className="founder-name">CA Abhishek Agarwal</div><div className="founder-role">Founder, Vertex Solutions</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="trust-strip">
        <div className="marquee-track">
          {[...Array(2)].flatMap((_, k) =>
            ["Income Tax", "GST Advisory", "Company Incorporation", "Startup India", "Trademark", "ISO Certification", "MSME Registration", "Government Subsidy"].map((t, i) => (
              <span key={`${k}-${i}`}>{t}</span>
            ))
          )}
        </div>
      </div>

      <section id="about">
        <div className="container">
          <div className="about-grid">
            <Reveal as="div" className="about-visual">
              <FounderAvatar
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "inherit",
                  zIndex: 0,
                }}
              />
              <div className="quote">
                <p>&ldquo;Every filing deadline met, every scheme explored — that is the standard we hold ourselves to.&rdquo;</p>
                <div className="who">CA Abhishek Agarwal, Founder</div>
              </div>
            </Reveal>
            <Reveal>
              <div className="eyebrow">About Vertex Solutions</div>
              <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)", marginBottom: 18 }}>A Tax & Business Advisory and Consulting firm, built for the modern business owner</h2>
              <p style={{ color: "var(--mist)", fontSize: 15.5, marginBottom: 16 }}>Vertex Solutions was founded to close the gap between complex regulatory requirements and the everyday realities of running a business. Under the leadership of CA Abhishek Agarwal, our team works with startups, MSMEs and established enterprises across Jaipur to manage taxation, statutory compliance, registrations and access to government schemes.</p>
              <p style={{ color: "var(--mist)", fontSize: 15.5, marginBottom: 16 }}>We believe advisory should be proactive, not reactive — which is why every engagement begins with a clear roadmap, transparent pricing and a dedicated point of contact who understands your business.</p>
              <Link className="btn btn-dark" to="/about">More About Us</Link>
              <div className="why-list">
                <div className="why-item"><div className="n">01</div><h4>Tax & Business Advisory Led</h4><p>Every engagement is reviewed by qualified professionals, not junior staff alone.</p></div>
                <div className="why-item"><div className="n">02</div><h4>End-to-End Compliance</h4><p>From incorporation to annual filings, one firm handles the entire lifecycle.</p></div>
                <div className="why-item"><div className="n">03</div><h4>Subsidy &amp; Scheme Expertise</h4><p>We actively map government subsidy and loan schemes relevant to your sector.</p></div>
                <div className="why-item"><div className="n">04</div><h4>Transparent Timelines</h4><p>Defined process stages and document checklists — no surprises mid-way.</p></div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="services" id="services">
        <div className="container">
          <SectionHead eyebrow="What We Do" title="Complete tax, compliance & business advisory under one roof" sub="From your first registration to ongoing statutory compliance, Vertex Solutions supports every stage of your business journey." />
          <Reveal as="div" className="service-grid">
            {homeServices.map(([t, d, href]) => <ServiceCard key={t} to={href} title={t} desc={d} />)}
          </Reveal>
          <Reveal as="div" style={{ marginTop: 20, textAlign: "center" }}>
            <Link className="btn btn-ghost" style={{ borderColor: "var(--hairline)", color: "#fff" }} to="/services">View All Services</Link>
          </Reveal>
        </div>
      </section>

      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <Counter target={500} suffix="+" label="Clients Served" />
            <Counter target={20} suffix="+" label="Services Offered" />
            <Counter target={98} suffix="%" label="On-Time Filings" />
            <Counter target={10} suffix="+" label="Years Combined Experience" />
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <SectionHead eyebrow="How We Work" title="A defined process, from consultation to compliance" />
          <ProcessTimeline steps={processSteps} />
        </div>
      </section>

      <section className="industries">
        <div className="container">
          <SectionHead eyebrow="Industries Served" title="Advisory tailored to your sector" />
          <Reveal as="div" className="ind-grid">
            {industries.map((i) => <div className="ind-chip" key={i}>{i}</div>)}
          </Reveal>
        </div>
      </section>

      <section style={{ padding: 0 }}>
        <div className="split-band">
          <Reveal as="div" className="band-panel dark">
            <span className="tag-chip">Government Subsidy</span>
            <h3>Unlock subsidy &amp; loan schemes built for your business</h3>
            <p>We assess eligibility across central and state subsidy schemes, prepare applications, and coordinate with lending institutions — so you access support you may not know you qualify for.</p>
            <Link className="btn btn-gold" to="/government-subsidy">Check Subsidy Eligibility</Link>
          </Reveal>
          <Reveal as="div" className="band-panel light">
            <span className="tag-chip">Startup India</span>
            <h3>Startup India recognition, done right</h3>
            <p>From DPIIT recognition to structuring for future funding rounds, we help early-stage founders build a compliant, investor-ready foundation from day one.</p>
            <Link className="btn btn-dark" to="/startup-india">Register Under Startup India</Link>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container">
          <SectionHead eyebrow="Client Experience" title="Trusted by founders and businesses across Jaipur" center />
          <Reveal as="div" className="test-grid">
            {testimonials.map(([q, n, r, ini]) => (
              <div className="test-card" key={n}>
                <div className="stars">★★★★★</div>
                <p>&ldquo;{q}&rdquo;</p>
                <div className="test-who">
                  <div className="test-avatar">{ini}</div>
                  <div><div className="test-name">{n}</div><div className="test-role">{r}</div></div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="faq" id="faq">
        <div className="container">
          <SectionHead eyebrow="Questions" title="Frequently asked questions" center />
          <Reveal>
            <FaqAccordion faqs={homeFaqs} withSearch />
          </Reveal>
        </div>
      </section>

      <CtaBanner heading="Ready to simplify your tax &amp; compliance journey?" sub="Book a free consultation with our advisory team and get a clear roadmap for your business." />

      <section id="contact">
        <div className="container">
          <SectionHead eyebrow="Get In Touch" title="Visit us or reach out directly" />
          <div className="contact-grid">
            <Reveal as="div" className="contact-info">
              <div className="info-card"><div className="ic"><PinIcon /></div><div><h4>Office Address</h4><p>{ADDRESS}</p></div></div>
              <div className="info-card"><div className="ic"><PhoneIcon /></div><div><h4>Call / WhatsApp</h4><p>{PHONE}</p></div></div>
              <div className="info-card"><div className="ic"><ClockIcon /></div><div><h4>Working Hours</h4><p>Mon – Sat: 10:00 AM – 7:00 PM</p></div></div>
            </Reveal>
            <Reveal as="div" className="map-wrap">
              <iframe loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Vertex Solutions office location" src="https://www.google.com/maps?q=The+Coronation+FS+Reality+Sanganer+Jaipur+302029&output=embed"></iframe>
            </Reveal>
          </div>
          <Reveal as="div" style={{ textAlign: "center", marginTop: 32 }}>
            <Link className="btn btn-dark" to="/contact">Go to Full Contact Page</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
