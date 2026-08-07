import { useState } from "react";
import { PlusIcon, SearchIcon } from "./Icons.jsx";

function FaqItem({ q, a, open, onToggle }) {
  return (
    <div className={`faq-item${open ? " open" : ""}`}>
      <button className="faq-q" onClick={onToggle}>
        <span>{q}</span>
        <span className="plus"><PlusIcon /></span>
      </button>
      <div className="faq-a" style={{ maxHeight: open ? "500px" : 0 }}>
        <p>{a}</p>
      </div>
    </div>
  );
}

export default function FaqAccordion({ faqs, withSearch = false, categories = null }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [query, setQuery] = useState("");

  const toggle = (key) => setOpenIndex(openIndex === key ? null : key);

  const matches = (q, a) =>
    !query || q.toLowerCase().includes(query.toLowerCase()) || a.toLowerCase().includes(query.toLowerCase());

  return (
    <div className="faq-wrap">
      {withSearch && (
        <div className="faq-search">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search a question — e.g. GST, incorporation, subsidy..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      )}

      {categories ? (
        categories.map(([cat, items]) => (
          <div key={cat}>
            <div className="faq-cat">{cat}</div>
            {items.map(([q, a], i) => {
              const key = `${cat}-${i}`;
              if (!matches(q, a)) return null;
              return <FaqItem key={key} q={q} a={a} open={openIndex === key} onToggle={() => toggle(key)} />;
            })}
          </div>
        ))
      ) : (
        faqs.map(([q, a], i) => {
          if (!matches(q, a)) return null;
          return <FaqItem key={i} q={q} a={a} open={openIndex === i} onToggle={() => toggle(i)} />;
        })
      )}
    </div>
  );
}
