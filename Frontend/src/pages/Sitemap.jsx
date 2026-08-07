import { Link } from "react-router-dom";
import Reveal from "../components/Reveal.jsx";
import Seo from "../components/Seo.jsx";
import { PageHero } from "../components/PageBits.jsx";

export default function Sitemap() {
  return (
    <>
      <Seo title="Sitemap | Vertex Solutions" description="Full sitemap of the Vertex Solutions website." path="/sitemap" />
      <PageHero crumbs={[["Home", "/"], ["Sitemap", null]]} title="Site<em>map</em>" lead="A complete overview of every page on the Vertex Solutions website." />
      <section>
        <div className="container">
          <div className="sitemap-grid">
            <Reveal as="div" className="sitemap-col">
              <h5>Main</h5>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/blogs">Blogs</Link></li>
                <li><Link to="/faqs">FAQs</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </Reveal>
            <Reveal as="div" className="sitemap-col">
              <h5>Services</h5>
              <ul>
                <li><Link to="/tax-advisory">Tax Advisory</Link></li>
                <li><Link to="/gst-services">GST Services</Link></li>
                <li><Link to="/company-registration">Company Registration</Link></li>
                <li><Link to="/startup-india">Startup India</Link></li>
                <li><Link to="/trademark-registration">Trademark Registration</Link></li>
                <li><Link to="/iso-certification">ISO Certification</Link></li>
                <li><Link to="/digital-signature-certificate">Digital Signature Certificate</Link></li>
                <li><Link to="/government-subsidy">Government Subsidy</Link></li>
                <li><Link to="/business-advisory">Business Advisory</Link></li>
              </ul>
            </Reveal>
            <Reveal as="div" className="sitemap-col">
              <h5>Legal</h5>
              <ul>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li><Link to="/terms-conditions">Terms &amp; Conditions</Link></li>
                <li><Link to="/sitemap">Sitemap</Link></li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
