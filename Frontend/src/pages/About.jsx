import Reveal from "../components/Reveal.jsx";
import Seo from "../components/Seo.jsx";
import FounderAvatar from "../components/FounderAvatar.jsx";
import { PageHero, SectionHead, BenefitsGrid, CtaBanner } from "../components/PageBits.jsx";

export default function About() {
  return (
    <>
      <Seo
        title="About Us | Vertex Solutions"
        description="Learn about Vertex Solutions, a Tax & Business Advisory and Consulting firm founded by Mr. Abhishek Agarwal in Jaipur."
        path="/about"
      />
      <PageHero
        crumbs={[["Home", "/"], ["About Us", null]]}
        title="The firm behind your <em>compliance &amp; growth</em>"
        lead="Vertex Solutions is a Tax & Business Advisory and Consulting firm based in Sanganer, Jaipur, founded on the principle that compliance should never slow a business down."
      />

      <section>
        <div className="container">
          <div className="about-grid">
            <Reveal as="div" className="about-visual">
              <FounderAvatar className="about-img" />
              <div className="quote">
                <p>&ldquo;We measure success by how little our clients have to worry about compliance.&rdquo;</p>
                <div className="who">Mr. Abhishek Agarwal, Founder</div>
              </div>
            </Reveal>
            <Reveal>
              <div className="eyebrow">Our Story</div>
              <h2 style={{ fontSize: "1.9rem", marginBottom: 16 }}>Built on expert advisory, run with a founder's mindset</h2>
              <p style={{ color: "var(--mist)", fontSize: 15, marginBottom: 14 }}>Vertex Solutions was established by Mr. Abhishek Agarwal to give businesses in Jaipur access to the same calibre of tax and compliance advisory typically reserved for large enterprises — delivered with the responsiveness of a boutique firm.</p>
              <p style={{ color: "var(--mist)", fontSize: 15, marginBottom: 14 }}>Today, the firm supports founders, MSMEs and established companies across income tax, GST, company registration, ISO and trademark filings, and government subsidy schemes, with every engagement personally reviewed for accuracy and compliance.</p>
              <p style={{ color: "var(--mist)", fontSize: 15 }}>Our approach is simple: understand the business first, then build a compliance and growth roadmap around it — not the other way around.</p>
              <div className="why-list">
                <div className="why-item"><div className="n">Mission</div><h4>Simplify compliance</h4><p>Make regulatory processes clear, predictable and stress-free for every client.</p></div>
                <div className="why-item"><div className="n">Vision</div><h4>Enable growth</h4><p>Be the advisory partner businesses turn to at every stage of their journey.</p></div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--paper-soft)" }}>
        <div className="container">
          <SectionHead eyebrow="Our Values" title="What guides every engagement" />
          <BenefitsGrid
            items={[
              ["Transparency", "Clear pricing and timelines from the first conversation, no hidden steps."],
              ["Accuracy", "Every filing reviewed by qualified professionals before submission."],
              ["Responsiveness", "Direct access to your point of contact, not a ticketing queue."],
              ["Proactive Advisory", "We flag deadlines and opportunities before they become urgent."],
            ]}
          />
        </div>
      </section>

      <section>
        <div className="container">
          <SectionHead eyebrow="Our Team" title="The people behind your compliance &amp; growth" />
          <Reveal as="div" className="grid-3">
            <div className="team-card">
              <FounderAvatar className="team-photo" alt="Mr. Abhishek Agarwal" />
              <h4>Mr. Abhishek Agarwal</h4>
              <div className="team-role">Founder, Vertex Solutions</div>
              <p>Founder leading the firm&rsquo;s tax, GST and government subsidy consulting practice — setting the advisory standards, reviewing every engagement and building long-term compliance roadmaps for clients.</p>
            </div>
            <div className="team-card">
              <img className="team-photo" src="/AadeshJainCA.jpeg" alt="CA Aadesh Jain" />
              <h4>CA Aadesh Jain</h4>
              <div className="team-role">Chartered Accountant</div>
              <p>Handles income tax filings and planning, GST returns and compliance, statutory &amp; tax audits, TDS, bookkeeping and financial advisory for businesses across every stage.</p>
            </div>
            <div className="team-card">
              <img className="team-photo" src="/Adv.GovindAgarwal.jpeg" alt="Adv. Govind Agarwal" />
              <h4>Adv. Govind Agarwal</h4>
              <div className="team-role">Advocate &amp; Legal Advisor</div>
              <p>Handles GST registration and compliance matters along with trademark registration and protection for businesses.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBanner heading="Want to know how we can help your business?" sub="Book a free consultation with our advisory team today." />
    </>
  );
}
