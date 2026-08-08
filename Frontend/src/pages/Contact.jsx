import Reveal from "../components/Reveal.jsx";
import Seo from "../components/Seo.jsx";
import ConsultationForm from "../components/ConsultationForm.jsx";
import { PageHero, SectionHead } from "../components/PageBits.jsx";
import { PinIcon, PhoneIcon, MailIcon, ClockIcon } from "../components/Icons.jsx";
import { ADDRESS, PHONE } from "../data/constants.js";
import { contactPageLd } from "../data/seo.js";

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact Us | Vertex Solutions"
        description="Contact Vertex Solutions in Sanganer, Jaipur — call, WhatsApp or book a free consultation for tax, GST and business advisory services."
        path="/contact"
        jsonLd={[contactPageLd()]}
      />
      <PageHero
        crumbs={[["Home", "/"], ["Contact Us", null]]}
        title="Let's talk about your <em>business</em>"
        lead="Reach out for a free consultation, or visit our office in Sanganer, Jaipur."
      />
      <section id="consultation-form" className="consult-section">
        <div className="container">
          <SectionHead
            eyebrow="Free Consultation"
            title="Book your free business consultation"
            sub="Fill in the form below and our business advisor will contact you shortly."
            center
          />
          <ConsultationForm />
        </div>
      </section>
      <section>
        <div className="container">
          <div className="contact-grid">
            <Reveal as="div" className="contact-info">
              <div className="info-card"><div className="ic"><PinIcon /></div><div><h4>Office Address</h4><p>{ADDRESS}</p></div></div>
              <div className="info-card"><div className="ic"><PhoneIcon /></div><div><h4>Call / WhatsApp</h4><p>{PHONE}</p></div></div>
              <div className="info-card"><div className="ic"><MailIcon /></div><div><h4>Email</h4><p>vertexsolutions23@gmail.com</p></div></div>
              <div className="info-card"><div className="ic"><ClockIcon /></div><div><h4>Working Hours</h4><p>Mon – Sat: 10:00 AM – 7:00 PM</p></div></div>
              <a className="btn btn-gold" href="#consultation-form" style={{ justifyContent: "center" }}>Open Consultation Form</a>
            </Reveal>
            <Reveal as="div" className="map-wrap">
              <iframe loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Vertex Solutions office location" src="https://www.google.com/maps?q=The+Coronation+FS+Reality+Sanganer+Jaipur+302029&output=embed"></iframe>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
