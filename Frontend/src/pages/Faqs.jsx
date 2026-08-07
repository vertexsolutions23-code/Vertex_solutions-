import Reveal from "../components/Reveal.jsx";
import Seo from "../components/Seo.jsx";
import { PageHero, CtaBanner } from "../components/PageBits.jsx";
import FaqAccordion from "../components/FaqAccordion.jsx";
import { faqCategories } from "../data/homeData.js";
import { faqLd } from "../data/seo.js";

const allFaqs = faqCategories.flatMap(([, items]) => items);

export default function Faqs() {
  return (
    <>
      <Seo
        title="FAQs | Vertex Solutions"
        description="Frequently asked questions about Vertex Solutions' tax, GST, company registration and government subsidy services."
        path="/faqs"
        jsonLd={[faqLd(allFaqs)]}
      />
      <PageHero
        crumbs={[["Home", "/"], ["FAQs", null]]}
        title="Frequently asked <em>questions</em>"
        lead="Answers to the questions we hear most often about tax, GST, registration and government subsidy services."
      />
      <section>
        <div className="container">
          <Reveal>
            <FaqAccordion categories={faqCategories} withSearch />
          </Reveal>
        </div>
      </section>
      <CtaBanner heading="Still have a question?" sub="Our team is happy to walk you through anything specific to your business." />
    </>
  );
}
