import { Link } from "react-router-dom";
import Reveal from "../components/Reveal.jsx";
import Seo from "../components/Seo.jsx";
import {
  PageHero,
  ServiceCtas,
  SectionHead,
  BenefitsGrid,
  ProcessTimeline,
  DocList,
  ServiceSidebar,
  CtaBanner,
} from "../components/PageBits.jsx";
import FaqAccordion from "../components/FaqAccordion.jsx";
import { services } from "../data/services.js";
import {
  serviceLd,
  faqLd,
  breadcrumbLd,
} from "../data/seo.js";

export default function ServiceDetail({ slug }) {
  const data = services[slug];

  if (!data) return null;

  const breadcrumbs = [
    ["Home", "/"],
    ["Services", "/services"],
    [data.crumbLabel, `/${slug}`],
  ];

  const jsonLd = [
    serviceLd(
      slug,
      data.crumbLabel,
      data.metaDesc,
      `/${slug}`
    ),
    breadcrumbLd(breadcrumbs),
    ...(data.faqs?.length ? [faqLd(data.faqs)] : []),
  ];

  return (
    <>
      <Seo
        title={data.metaTitle}
        description={data.metaDesc}
        path={`/${slug}`}
        jsonLd={jsonLd}
      />

      <PageHero
        crumbs={[
          ["Home", "/"],
          ["Services", "/services"],
          [data.crumbLabel, null],
        ]}
        title={data.title}
        lead={data.lead}
        ctas={[]}
      />

      <section>
        <div className="container">
          <div className="svc-wrap">
            <Reveal as="div" className="svc-main">
              <div className="eyebrow">{data.eyebrow}</div>

              <h2 style={{ fontSize: "1.9rem", marginBottom: 16 }}>
                Overview
              </h2>

              {data.overview.map((p, i) => (
                <p key={i}>{p}</p>
              ))}

              {data.subServices && (
                <>
                  <h3>What&rsquo;s Included</h3>

                  <div className="grid-3">
                    {data.subServices.map(([t, d]) => (
                      <div className="sub-svc-card" key={t}>
                        <h4>{t}</h4>
                        <p>{d}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </Reveal>

            <ServiceSidebar
              title={data.sidebarTitle}
              blurb={data.sidebarBlurb}
              points={data.sidebarPoints}
            />
          </div>
        </div>
      </section>

      {data.standards && (
        <section style={{ background: "var(--paper-soft)" }}>
          <div className="container">
            <SectionHead
              eyebrow="Standards We Cover"
              title="ISO certificates we can help you achieve"
              sub="Click any certification below to book a free consultation — your selection is pre-filled on the consultation form."
            />

            <div className="standards-grid">
              {data.standards.map(([label, desc]) => (
                <Link
                  key={label}
                  className="sub-svc-card standards-card"
                  to={`/contact?consultation=${encodeURIComponent(
                    "ISO Certification"
                  )}&service=${encodeURIComponent(
                    label
                  )}#consultation-form`}
                  aria-label={`Book consultation for ${label}`}
                >
                  <h4>{label}</h4>
                  <p>{desc}</p>
                  <span className="iso-cta">
                    Book Consultation
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section style={{ background: "var(--paper-soft)" }}>
        <div className="container">
          <SectionHead
            eyebrow="Why It Matters"
            title="Key benefits"
          />

          <BenefitsGrid items={data.benefits} />
        </div>
      </section>

      <section>
        <div className="container">
          <SectionHead
            eyebrow="Our Process"
            title="How we get it done"
          />

          <ProcessTimeline steps={data.steps} />
        </div>
      </section>

      <section style={{ background: "var(--paper-soft)" }}>
        <div className="container">
          <SectionHead
            eyebrow="Documentation"
            title="Documents required"
          />

          <DocList docs={data.docs} />
        </div>
      </section>

      <section>
        <div className="container">
          <SectionHead
            eyebrow="FAQs"
            title="Common questions"
            center
          />

          <Reveal>
            <FaqAccordion faqs={data.faqs} />
          </Reveal>
        </div>
      </section>

      <CtaBanner
        heading={`Ready to get started with ${data.crumbLabel.toLowerCase()}?`}
        sub="Book a free consultation and our team will guide you through every step."
      />
    </>
  );
}