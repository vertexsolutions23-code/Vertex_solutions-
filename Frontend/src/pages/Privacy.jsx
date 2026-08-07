import Reveal from "../components/Reveal.jsx";
import Seo from "../components/Seo.jsx";
import { PageHero } from "../components/PageBits.jsx";

export default function Privacy() {
  return (
    <>
      <Seo title="Privacy Policy | Vertex Solutions" description="Read Vertex Solutions' privacy policy on how we collect, use and protect your information." path="/privacy-policy" />
      <PageHero crumbs={[["Home", "/"], ["Privacy Policy", null]]} title="Privacy <em>Policy</em>" lead="How Vertex Solutions collects, uses and protects your information." />
      <section>
        <div className="container">
          <Reveal as="div" className="prose">
            <h2>Introduction</h2>
            <p>Vertex Solutions ("we", "us", "our") respects your privacy. This policy explains what information we collect through this website and how it is used.</p>
            <h2>Information We Collect</h2>
            <ul>
              <li>Contact details you submit via our consultation form or contact page</li>
              <li>Information shared during consultations for service delivery</li>
              <li>Basic website usage data for improving user experience</li>
            </ul>
            <h2>How We Use Your Information</h2>
            <ul>
              <li>To respond to consultation requests and provide requested services</li>
              <li>To communicate updates relevant to your engagement</li>
              <li>To improve our website and service offerings</li>
            </ul>
            <h2>Data Sharing</h2>
            <p>We do not sell your personal information. Information may be shared with relevant government authorities strictly as required to deliver registration, filing or compliance services you request.</p>
            <h2>Data Security</h2>
            <p>We take reasonable measures to protect the information you share with us, in line with standard industry practices.</p>
            <h2>Contact</h2>
            <p>For questions about this policy, reach us via the contact details on our Contact page.</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
