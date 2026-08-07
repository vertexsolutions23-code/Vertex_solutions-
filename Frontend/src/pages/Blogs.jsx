import Reveal from "../components/Reveal.jsx";
import Seo from "../components/Seo.jsx";
import { PageHero, CtaBanner } from "../components/PageBits.jsx";
import { CardIcon } from "../components/Icons.jsx";
import { blogPosts } from "../data/homeData.js";

export default function Blogs() {
  return (
    <>
      <Seo
        title="Blog | Tax, GST & Business Insights | Vertex Solutions"
        description="Articles on GST, income tax, startup India, MSME, company registration, trademarks, ISO and government schemes from Vertex Solutions."
        path="/blogs"
      />
      <PageHero
        crumbs={[["Home", "/"], ["Blogs", null]]}
        title="Insights on tax, <em>compliance</em> &amp; business growth"
        lead="Practical, jargon-free articles from our advisory team on GST, income tax, startups, MSME, trademarks and government schemes."
      />
      <section>
        <div className="container">
          <Reveal as="div" className="blog-grid">
            {blogPosts.map(([cat, title, desc]) => (
              <div className="blog-card" key={title}>
                <div className="blog-thumb"><div className="ic"><CardIcon /></div></div>
                <div className="blog-body">
                  <div className="blog-cat">{cat}</div>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                  <span className="blog-read">Read more →</span>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
      <CtaBanner heading="Have a specific tax or compliance question?" sub="Skip the search — talk to our advisory team directly." />
    </>
  );
}
