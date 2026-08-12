import Reveal from "../components/Reveal.jsx";
import Seo from "../components/Seo.jsx";
import { PageHero, ServiceCard, CtaBanner } from "../components/PageBits.jsx";
import { allServicesForHub } from "../data/homeData.js";
import { itemListLd } from "../data/seo.js";

export default function Services() {
  const serviceItems = allServicesForHub.map(([name, description, href]) => ({ name, description, href }));
  return (
    <>
      <Seo
        title="Our Services | Vertex Solutions"
        description="Explore Vertex Solutions' complete range of tax, GST, company registration, startup, trademark, ISO, government subsidy, financing, business and investment advisory services."
        path="/services"
        jsonLd={[itemListLd(serviceItems)]}
      />
      <PageHero
        crumbs={[["Home", "/"], ["Services", null]]}
        title="One firm. Every <em>compliance</em> service you need."
        lead="From your first registration to ongoing statutory filings, explore the complete range of tax, compliance and business advisory services offered by Vertex Solutions."
      />
      <section className="services">
        <div className="container">
          <Reveal as="div" className="service-grid">
            {allServicesForHub.map(([t, d, href]) => <ServiceCard key={t} to={href} title={t} desc={d} />)}
          </Reveal>
        </div>
      </section>
      <CtaBanner heading="Not sure which service you need?" sub="Talk to our team — we'll map the right services to your business in one free consultation." />
    </>
  );
}
