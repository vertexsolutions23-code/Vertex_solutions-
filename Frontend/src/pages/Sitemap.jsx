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
                <li><Link to="/income-tax">Income Tax</Link></li>
                <li><Link to="/tax-advisory">Tax Advisory</Link></li>
                <li><Link to="/accounting">Accounting</Link></li>
                <li><Link to="/gst-services">GST Services</Link></li>
                <li><Link to="/company-registration">Company Registration</Link></li>
                <li><Link to="/startup-india">Startup Registration</Link></li>
                <li><Link to="/trademark-registration">Trademark Registration</Link></li>
                <li><Link to="/iso-certification">ISO Certification</Link></li>
                <li><Link to="/digital-signature-certificate">Digital Signature Certificate</Link></li>
                <li><Link to="/class-3-individual-dsc">Class 3 Individual DSC</Link></li>
                <li><Link to="/class-3-individual-combo-dsc">Class 3 Individual Combo DSC</Link></li>
                <li><Link to="/class-3-organisation-signing-dsc">Class 3 Organisation Signing DSC</Link></li>
                <li><Link to="/class-3-organisation-combo-dsc">Class 3 Organisation Combo DSC</Link></li>
                <li><Link to="/dgft-dsc">DGFT DSC</Link></li>
                <li><Link to="/class-2-document-signer">Class 2 Document Signer</Link></li>
                <li><Link to="/class-3-document-signer-hsm">Class 3 Document Signer (HSM)</Link></li>
                <li><Link to="/foreign-class-3-individual-dsc">Foreign Class 3 Individual DSC</Link></li>
                <li><Link to="/foreign-class-3-organisation-combo-dsc">Foreign Organisation Combo DSC</Link></li>
                <li><Link to="/government-subsidy">Government Subsidy</Link></li>
                <li><Link to="/business-advisory">Business Advisory</Link></li>
                <li><Link to="/project-report-financing">Project Report &amp; Financing</Link></li>
                <li><Link to="/corporate-financing">Corporate Financing</Link></li>
                <li><Link to="/investment-insurance">Investment &amp; Insurance Advisory</Link></li>
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
