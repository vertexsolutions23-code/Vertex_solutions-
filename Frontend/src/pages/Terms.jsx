import Reveal from "../components/Reveal.jsx";
import Seo from "../components/Seo.jsx";
import { PageHero } from "../components/PageBits.jsx";

export default function Terms() {
  return (
    <>
      <Seo title="Terms & Conditions | Vertex Solutions" description="Terms and conditions for using the Vertex Solutions website and engaging our tax and business advisory services." path="/terms-conditions" />
      <PageHero crumbs={[["Home", "/"], ["Terms & Conditions", null]]} title="Terms &amp; <em>Conditions</em>" lead="The terms governing use of this website and engagement with Vertex Solutions." />
      <section>
        <div className="container">
          <Reveal as="div" className="prose">
            <h2>Acceptance of Terms</h2>
            <p>By using this website, you agree to the following terms and conditions.</p>
            <h2>Services</h2>
            <p>Services described on this website are subject to a separate engagement discussion and, where applicable, government processing timelines outside our control.</p>
            <h2>Fees</h2>
            <p>Service fees are communicated during consultation and are not published on this website unless explicitly stated.</p>
            <h2>Client Responsibilities</h2>
            <p>Clients are responsible for providing accurate and complete information and documents required for the requested service.</p>
            <h2>Limitation of Liability</h2>
            <p>While we exercise due care and professional diligence, Vertex Solutions is not liable for delays or outcomes arising from government processing, incomplete client information, or changes in law.</p>
            <h2>Governing Law</h2>
            <p>These terms are governed by the laws of India, with jurisdiction in Jaipur, Rajasthan.</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
