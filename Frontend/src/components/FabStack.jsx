import { useEffect, useState } from "react";
import { ArrowUpIcon, PhoneIcon, WhatsAppIcon } from "./Icons.jsx";
import { PHONE_TEL, WA_LINK } from "../data/constants.js";

export default function FabStack() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fab-stack">
      <button
        className={`fab top${show ? " show" : ""}`}
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUpIcon />
      </button>
      <a className="fab call" href={PHONE_TEL} aria-label="Call Vertex Solutions">
        <PhoneIcon />
      </a>
      <a className="fab whatsapp" href={WA_LINK} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <WhatsAppIcon />
      </a>
    </div>
  );
}
