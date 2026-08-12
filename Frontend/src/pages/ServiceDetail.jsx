import { Link } from "react-router-dom";
import Reveal from "../components/Reveal.jsx";
import Seo from "../components/Seo.jsx";
import { CheckIcon, DocIcon } from "../components/Icons.jsx";
import {
  PageHero,
  SectionHead,
  BenefitsGrid,
  ProcessTimeline,
  DocList,
  ServiceSidebar,
  CtaBanner,
} from "../components/PageBits.jsx";
import FaqAccordion from "../components/FaqAccordion.jsx";
import { services } from "../data/services.js";
import { GOOGLE_FORM_URL } from "../data/constants.js";
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

              {data.price && (
                <div className="price-strip">
                  <div className="price-strip-head">
                    <span className="price-label">Starting Price</span>
                    <span className="price-value">{data.price}</span>
                  </div>
                  <p>{data.priceNote}</p>
                  <a className="btn btn-gold" href={GOOGLE_FORM_URL}>Get Free Consultation</a>
                </div>
              )}

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

      {data.eligibility && (
        <section>
          <div className="container">
            <SectionHead
              eyebrow={data.eligibility.eyebrow || "Eligibility"}
              title={data.eligibility.title || "Who can get ISO certified?"}
              sub={data.eligibility.sub || "ISO certification is open to businesses of all sizes and industries — here is what qualifies and what is not required."}
            />

            <div className="scheme-cols grid-3">
              {data.eligibility.cards.map((card) => (
                <div className="scheme-col" key={card.title}>
                  <h5>{card.title}</h5>
                  <ul>
                    {card.points.map((p) => (
                      <li key={p}>
                        <CheckIcon />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="scheme-col">
                <h5>{data.eligibility.ctaTitle}</h5>
                <p className="scheme-col-note">{data.eligibility.ctaText}</p>
                <Link
                  className="btn btn-ghost-dark scheme-cta"
                  style={{ marginTop: 14 }}
                  to={`/contact?consultation=${encodeURIComponent(
                    data.eligibility.consultation || "ISO Certification"
                  )}#consultation-form`}
                >
                  Book Free Consultation
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {data.schemes && (
        <section>
          <div className="container">
            <SectionHead
              eyebrow="Active Schemes"
              title="Subsidy schemes we handle end-to-end"
              sub="Criteria, eligibility and documents for each scheme below. Book a free consultation to map the schemes your business qualifies for."
            />

            <div className="scheme-list">
              {data.schemes.map(([name, tagline, benefits, eligibility, docs]) => (
                <Reveal as="div" className="scheme-card" key={name}>
                  <div className="scheme-head">
                    <div className="scheme-head-txt">
                      <h4>{name}</h4>
                      <p>{tagline}</p>
                    </div>
                    <Link
                      className="btn btn-ghost-dark scheme-cta"
                      to={`/contact?consultation=${encodeURIComponent(
                        "Government Subsidy"
                      )}&service=${encodeURIComponent(
                        name
                      )}#consultation-form`}
                      aria-label={`Check eligibility for ${name}`}
                    >
                      Check Eligibility
                    </Link>
                  </div>

                  <div className="grid-3 scheme-cols">
                    <div className="scheme-col">
                      <h5>Key Benefits</h5>
                      <ul>
                        {benefits.map((b) => (
                          <li key={b}><CheckIcon />{b}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="scheme-col">
                      <h5>Eligibility Criteria</h5>
                      <ul>
                        {eligibility.map((e) => (
                          <li key={e}><CheckIcon />{e}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="scheme-col">
                      <h5>Documents Required</h5>
                      <ul>
                        {docs.map((d) => (
                          <li key={d}><DocIcon />{d}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

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

      {data.subPageLinks && (
        <section style={{ background: "var(--paper-soft)" }}>
          <div className="container">
            <SectionHead
              eyebrow="DSC Catalogue"
              title={data.subPageLinks.title}
              sub={data.subPageLinks.sub}
            />

            <div className="standards-grid">
              {data.subPageLinks.items.map(([to, label, desc]) => (
                <Link
                  key={to}
                  to={to}
                  className="sub-svc-card standards-card"
                  aria-label={`Explore ${label}`}
                >
                  <h4>{label}</h4>
                  <p>{desc}</p>
                  <span className="iso-cta">Explore DSC</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {data.dscTypes && (
        <section style={{ background: "var(--paper-soft)" }}>
          <div className="container">
            <SectionHead
              eyebrow="DSC Type & Platform"
              title="Which DSC is required on which platform?"
              sub="Not every certificate works on every portal. Find the DSC type that matches the platforms you file on — clicking any card books a free consultation with your selection pre-filled."
            />

            <div className="standards-grid">
              {data.dscTypes.map(([label, platforms, desc]) => (
                <Link
                  key={label}
                  className="sub-svc-card standards-card"
                  to={`/contact?consultation=${encodeURIComponent(
                    "Digital Signature Certificate (DSC)"
                  )}&service=${encodeURIComponent(
                    label
                  )}#consultation-form`}
                  aria-label={`Book consultation for ${label}`}
                >
                  <h4>{label}</h4>
                  <p>{desc}</p>
                  <ul className="dsc-platforms">
                    {platforms.map((p) => (
                      <li key={p}><CheckIcon />{p}</li>
                    ))}
                  </ul>
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