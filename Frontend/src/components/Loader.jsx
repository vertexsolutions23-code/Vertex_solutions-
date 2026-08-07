import { useEffect, useState } from "react";

export default function Loader() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHide(true), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div id="loader" className={hide ? "hide" : ""}>
      <div className="apex">
        <svg viewBox="0 0 48 48"><path d="M6 38 L24 8 L42 38" /></svg>
      </div>
      <p>Vertex Solutions</p>
    </div>
  );
}
